import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  Color,
  DirectionalLight,
  HemisphereLight,
  LoaderUtils,
  LoadingManager,
  PMREMGenerator,
  PerspectiveCamera,
  REVISION,
  Scene,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  LinearToneMapping,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const environments = [
  {
    id: '',
    name: 'None',
    path: null,
  },
  {
    id: 'neutral', // THREE.RoomEnvironment
    name: 'Neutral',
    path: null,
  },
  {
    id: 'venice-sunset',
    name: 'Venice Sunset',
    path: 'https://storage.googleapis.com/donmccurdy-static/venice_sunset_1k.exr',
    format: '.exr'
  },
  {
    id: 'footprint-court',
    name: 'Footprint Court (HDR Labs)',
    path: 'https://storage.googleapis.com/donmccurdy-static/footprint_court_2k.exr',
    format: '.exr'
  }
];

const DEFAULT_CAMERA = '[default]';
const MANAGER = new LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
const DRACO_LOADER = new DRACOLoader( MANAGER ).setDecoderPath( `${THREE_PATH}/examples/jsm/libs/draco/gltf/` );
const KTX2_LOADER = new KTX2Loader( MANAGER ).setTranscoderPath( `${THREE_PATH}/examples/jsm/libs/basis/` );
const Preset = {ASSET_GENERATOR: 'assetgenerator'};

const stopwatch = (() => {
  let startTime = Date.now();

  return {
    getElapsedTime() {
      return (Date.now() - startTime)/1000;
    },
    reset() {
      console.log("resetting")
      startTime = Date.now();
    },
  };
})();
const viseme_map_azure = {
  0: "mouthClose",
  1: "ae_ax_ah_01", // æ, ə, ʌ
  2: "aa_02", // ɑ
  3: "ao_03", // ɔ
  4: "ey_eh_uh_04", // ɛ, ʊ
  5: "er_05", // ɝ
  6: "y_iy_ih_ix_06", // j, i, ɪ
  7: "w_uw_07", // w, u
  8: "ow_08", // o
  9: "aw_09", // aʊ
  10: "oy_10", // ɔɪ
  11: "ay_11", // aɪ
  12: "h_12", // h
  13: "r_13", // ɹ
  14: "l_14", // l
  15: "s_z_15", // s, z
  16: "sh_ch_jh_zh_16", // ʃ, tʃ, dʒ, ʒ
  17: "th_17", // ð
  18: "f_v_18", // f, v
  19: "d_t_n_19", // d, t, n, θ
  20: "k_g_ng_20", // k, g, ŋ
  21: "p_b_m_21", // p, b, m
};
const expressions = {
  "smile": [
      {"shape": "mouthSmileLeft", "endValue": 1},
      {"shape": "mouthSmileRight", "endValue": 1},
      {"shape": "cheekPuff", "endValue": 0.5},
      {"shape": "eyeSquintLeft", "endValue": 0.6},
      {"shape": "eyeSquintRight", "endValue": 0.6},
      {"shape": "jawOpen", "endValue": 0.1},
      {"shape": "mouthStretchLeft", "endValue": 0.3},
      {"shape": "mouthStretchRight", "endValue": 0.3},
  ],
  "happySurprise": [
      {"shape": "mouthSmileLeft", "endValue": 0.9},
      {"shape": "mouthSmileRight", "endValue": 0.9},
      {"shape": "jawOpen", "endValue": 0.4},  
      {"shape": "eyeWideLeft", "endValue": 1},
      {"shape": "eyeWideRight", "endValue": 1},
      {"shape": "browOuterUpLeft", "endValue": 0.6},
      {"shape": "browOuterUpRight", "endValue": 0.6},
  ],
  "happySurpriseReverse": [
      {"shape": "eyeWideLeft", "endValue": 1},
      {"shape": "eyeWideRight", "endValue": 1},
      {"shape": "browOuterUpLeft", "endValue": 0.6},
      {"shape": "browOuterUpRight", "endValue": 0.6},
  ],
  "pleased": [
      {"shape": "eyeSquintLeft", "endValue": 0.6},
      {"shape": "eyeSquintRight", "endValue": 0.6},
      {"shape": "mouthSmileLeft", "endValue": 1},
      {"shape": "mouthSmileRight", "endValue": 1},
      {"shape": "cheekPuff", "endValue": 0.4},
  ],
  "attentive": [
      {"shape": "eyeLookUpLeft", "endValue": 0.1},
      {"shape": "eyeLookUpRight", "endValue": 0.1},
      {"shape": "eyeSquintLeft", "endValue": 0.4},
      {"shape": "eyeSquintRight", "endValue": 0.4},
      {"shape": "mouthDimpleLeft", "endValue": 0.2},
      {"shape": "mouthDimpleRight", "endValue": 0.2},
      {"shape": "mouthStretchLeft", "endValue": 0.2},
      {"shape": "mouthStretchRight", "endValue": 0.2},
      {"shape": "browInnerUp", "endValue": 0.1},
      {"shape": "mouthSmileLeft", "endValue": 1},
      {"shape": "mouthSmileRight", "endValue": 1},
      {"shape": "cheekPuff", "endValue": 0.3},
  ],
  "thoughtful": [
      {"shape": "eyeLookUpLeft", "endValue": 0.6},
      {"shape": "eyeLookUpRight", "endValue": 0.6},
      {"shape": "eyeLookOutLeft", "endValue": 0.2},
      {"shape": "eyeLookOutRight", "endValue": 0.2},
      {"shape": "eyeSquintLeft", "endValue": 0.7},
      {"shape": "eyeSquintRight", "endValue": 0.7},
      {"shape": "mouthPucker", "endValue": 0.6},
      {"shape": "browDownLeft", "endValue": 0.8},
      {"shape": "browDownRight", "endValue": 0.8},
      {"shape": "mouthFrownLeft", "endValue": 0.25},
      {"shape": "mouthFrownRight", "endValue": 0.25},
      {"shape": "mouthStretchLeft", "endValue": 0.3},
      {"shape": "mouthStretchRight", "endValue": 0.3},
      {"shape": "mouthPressLeft", "endValue": 0.2},
      {"shape": "mouthPressRight", "endValue": 0.2},
      {"shape": "cheekSquintLeft", "endValue": 0.2},
      {"shape": "cheekSquintRight", "endValue": 0.2},
      {"shape": "browInnerUp", "endValue": 0.4},
  ],
  "curious": [
      {"shape": "eyeLookUpLeft", "endValue": 1},
      {"shape": "eyeLookUpRight", "endValue": 1},
      {"shape": "mouthPressLeft", "endValue": 0.5},
      {"shape": "mouthPressRight", "endValue": 0.5},
      {"shape": "browInnerUp", "endValue": 0.6},
      {"shape": "browOuterUpLeft", "endValue": 0.4},
      {"shape": "browOuterUpRight", "endValue": 1},
  ],
  "sad": [
      {"shape": "eyeSquintLeft", "endValue": 0.6},
      {"shape": "eyeSquintRight", "endValue": 0.6},
      {"shape": "eyeLookDownLeft", "endValue": 0.3},
      {"shape": "eyeLookDownRight", "endValue": 0.3},
  
      {"shape": "mouthFrownLeft", "endValue": 1},
      {"shape": "mouthFrownRight", "endValue": 1},
  
      {"shape": "mouthDimpleLeft", "endValue": 0.2},
      {"shape": "mouthDimpleRight", "endValue": 0.2},
      {"shape": "mouthStretchLeft", "endValue": 0.4},
      {"shape": "mouthStretchRight", "endValue": 0.4},
  
      {"shape": "mouthShrugUpper", "endValue": 0.6},
      {"shape": "mouthLowerDownLeft", "endValue": 0.2},
      {"shape": "mouthLowerDownRight", "endValue": 0.2},
      {"shape": "browDownLeft", "endValue": 0.4},
      {"shape": "browDownRight", "endValue": 0.4},
  
      {"shape": "browInnerUp", "endValue": 0.5},
      {"shape": "cheekPuff", "endValue": 0.15},
      {"shape": "cheekSquintLeft", "endValue": 0.6},
      {"shape": "cheekSquintRight", "endValue": 0.6},
  ],
  "smirk": [
    {"shape": "eyeLookUpRight", "endValue": 0.2},
    {"shape": "eyeLookUpLeft", "endValue": 0.2},
    {"shape": "eyeSquintRight", "endValue": 0.2},
    {"shape": "eyeSquintLeft", "endValue": 0.2},
    {"shape": "mouthClose", "endValue": 0.1},
    {"shape": "mouthLeft", "endValue": 0.85},
    {"shape": "mouthSmileLeft", "endValue": 0.4},
    {"shape": "browDownLeft", "endValue": 0.3},
    {"shape": "browInnerUp", "endValue": 0.4},
    {"shape": "cheekSquintLeft", "endValue": 0.3},
    {"shape": "noseSneerRight", "endValue": 0.1},
    {"shape": "noseSneerLeft", "endValue": 0.1},
  ],
  "delighted": [
    {"shape": "mouthFunnel", "endValue": 1},
    {"shape": "mouthSmileLeft", "endValue": 1},
    {"shape": "mouthSmileRight", "endValue": 1},
    {"shape": "mouthDimpleLeft", "endValue": 0.7},
    {"shape": "mouthDimpleRight", "endValue": 0.7},
    {"shape": "mouthStretchLeft", "endValue": 1},
    {"shape": "mouthStretchRight", "endValue": 1},
    {"shape": "browInnerUp", "endValue": 1},
    {"shape": "browOuterUpLeft", "endValue": 0.3},
    {"shape": "browOuterUpRight", "endValue": 0.3},
    {"shape": "cheekSquintLeft", "endValue": 0.3},
    {"shape": "cheekSquintRight", "endValue": 0.3},
    {"shape": "eyeSquintRight", "endValue": 0.2},
    {"shape": "eyeSquintLeft", "endValue": 0.2},
    {"shape": "noseSneerRight", "endValue": 0.1},
    {"shape": "noseSneerLeft", "endValue": 0.1},
    {"shape": "jawOpen", "endValue": 0.2},
  ],
  "smile2":[
    {"shape": "mouthFunnel", "endValue": 1},
    {"shape": "mouthSmileLeft", "endValue": 1},
    {"shape": "mouthSmileRight", "endValue": 1},
    {"shape": "mouthDimpleLeft", "endValue": 0.7},
    {"shape": "mouthDimpleRight", "endValue": 0.7},
    {"shape": "mouthStretchLeft", "endValue": 1},
    {"shape": "mouthStretchRight", "endValue": 1},
    {"shape": "browInnerUp", "endValue": 1},
    {"shape": "browOuterUpLeft", "endValue": 0.3},
    {"shape": "browOuterUpRight", "endValue": 0.3},
    {"shape": "cheekSquintLeft", "endValue": 0.3},
    {"shape": "cheekSquintRight", "endValue": 0.3},
    {"shape": "eyeSquintRight", "endValue": 0.2},
    {"shape": "eyeSquintLeft", "endValue": 0.2},
    {"shape": "noseSneerRight", "endValue": 0.1},
    {"shape": "noseSneerLeft", "endValue": 0.1},
  ],
  "neutral": [
    {"shape": "eyeSquintRight", "endValue": 0.25},
    {"shape": "eyeSquintLeft", "endValue": 0.25},
    {"shape": "eyeLookUpRight", "endValue": 0.2},
    {"shape": "eyeLookUpLeft", "endValue": 0.2},
    {"shape": "jawOpen", "endValue": 0.2},
    {"shape": "mouthSmileLeft", "endValue": 0.1},
    {"shape": "mouthSmileRight", "endValue": 0.1},
    {"shape": "mouthDimpleLeft", "endValue": 0.05},
    {"shape": "mouthDimpleRight", "endValue": 0.05},
    {"shape": "browInnerUp", "endValue": 0.1},
  ]
}
let pushing = false

let blendShape = {'eyeBlinkLeft': 0, 'eyeLookDownLeft': 1, 'eyeLookInLeft': 2, 'eyeLookOutLeft': 3, 'eyeLookUpLeft': 4, 'eyeSquintLeft': 5, 'eyeWideLeft': 6, 'eyeBlinkRight': 7, 'eyeLookDownRight': 8, 'eyeLookInRight': 9, 'eyeLookOutRight': 10, 'eyeLookUpRight': 11, 'eyeSquintRight': 12, 'eyeWideRight': 13, 'jawForward': 14, 'jawLeft': 15, 'jawRight': 16, 'jawOpen': 17, 'mouthClose': 18, 'mouthFunnel': 19, 'mouthPucker': 20, 'mouthRight': 21, 'mouthLeft': 22, 'mouthSmileLeft': 23, 'mouthSmileRight': 24, 'mouthFrownRight': 25, 'mouthFrownLeft': 26, 'mouthDimpleLeft': 27, 'mouthDimpleRight': 28, 'mouthStretchLeft': 29, 'mouthStretchRight': 30, 'mouthRollLower': 31, 'mouthRollUpper': 32, 'mouthShrugLower': 33, 'mouthShrugUpper': 34, 'mouthPressLeft': 35, 'mouthPressRight': 36, 'mouthLowerDownLeft': 37, 'mouthLowerDownRight': 38, 'mouthUpperUpLeft': 39, 'mouthUpperUpRight': 40, 'browDownLeft': 41, 'browDownRight': 42, 'browInnerUp': 43, 'browOuterUpLeft': 44, 'browOuterUpRight': 45, 'cheekPuff': 46, 'cheekSquintLeft': 47, 'cheekSquintRight': 48, 'noseSneerLeft': 49, 'noseSneerRight': 50, 'tongueOut': 51, 'ae_ax_ah_01': 52, 'aa_02': 53, 'ao_03': 54, 'ey_eh_uh_04': 55, 'er_05': 56, 'y_iy_ih_ix_06': 57, 'w_uw_07': 58, 'ow_08': 59, 'aw_09': 60, 'oy_': 61, 'ay_11': 62, 
'h_12': 63, 'r_13': 64, 'l_14': 65, 's_z_15': 66, 'sh_ch_jh_zh_16': 67, 'th_dh_17': 68, 'f_v_18': 69, 'd_t_n_19': 70, 'k_g_ng_': 71, 'p_b_m_21': 72}

let viseme_map = {
    "b": "p_b_m_21", "p": "p_b_m_21", "m": "p_b_m_21", "d": "d_t_n_19", "t": "d_t_n_19", "n": "d_t_n_19", "s": "s_z_15", "z": "s_z_15", "f": "f_v_18", "v": "f_v_18", "k": "k_g_ng_", "g": "k_g_ng_", "ŋ": "k_g_ng_", "i": "y_iy_ih_ix_06", "y": "y_iy_ih_ix_06", "r": "r_13", "u": "w_uw_07", "w": "w_uw_07", "E": "ey_eh_uh_04", "e": "ey_eh_uh_04", "A": "aa_02", "a": "aa_02", "O": "ao_03", "o": "ao_03", "e": "ae_ax_ah_01", "æ": "ae_ax_ah_01", "ʌ": "ae_ax_ah_01", "ɑ": "ae_ax_ah_01", "o": "ow_08", "ʊ": "ow_08", "sil": "mouthClose", "S": "s_z_15", "T": "d_t_n_19", "@":"ey_eh_uh_04"
}

let lipSyncRunning   = false
let currentAnimation = null
Cache.enabled        = true;

export class Viewer {

  constructor (el, options, updateVideoPlaying = null) {
    this.el = el;
    this.options = options;
    this.pollyQueue = [];
    this.updateVideoPlaying = updateVideoPlaying;
    this.audioRunning = false
    this.currentExpression = null
    this.lights = [];
    this.content = null;
    this.mixer = null;
    this.clips = [];
    this.lock = false

    if (options.preset) {
      Tinybird.trackEvent('preset', {preset: options.preset});
    }

    this.state = {
      environment: options.preset === Preset.ASSET_GENERATOR
        ? environments.find((e) => e.id === 'footprint-court').name
        : environments[1].name,
      background: false,
      playbackSpeed: 1.0,
      actionStates: {},
      camera: DEFAULT_CAMERA,
      wireframe: false,
      skeleton: false,
      grid: false,

      // Lights
      punctualLights: true,
      exposure: 0.0,
      toneMapping: LinearToneMapping,
      ambientIntensity: 0.3,
      ambientColor: 0xFFFFFF,
      directIntensity: 0.8 * Math.PI, // TODO(#116)
      directColor: 0xFFFFFF,
      bgColor: 0x191919,
    };

    this.prevTime = 0;

    this.stats = new Stats();
    this.stats.dom.height = '48px';
    [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));
    this.morphMeshes = []


    this.scene = new Scene();
    if (this.options.backgroundUrl){
      const textureLoader = new TextureLoader();
      const backgroundTexture = textureLoader.load(this.options.backgroundUrl);
      this.scene.background = backgroundTexture;
    } else{
      this.backgroundColor = new Color(this.state.bgColor);
      this.scene.background = this.backgroundColor;
    }

    const fov = options.preset === Preset.ASSET_GENERATOR
      ? 0.8 * 180 / Math.PI
      : 60;
    this.defaultCamera = new PerspectiveCamera( fov, el.clientWidth / el.clientHeight, 0.01, 1000 );
    this.activeCamera = this.defaultCamera;
    this.scene.add( this.defaultCamera );

    this.renderer = window.renderer = new WebGLRenderer({antialias: true});
    this.renderer.useLegacyLights = false;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor( 0xcccccc );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( el.clientWidth, el.clientHeight );

    this.pmremGenerator = new PMREMGenerator( this.renderer );
    this.pmremGenerator.compileEquirectangularShader();

    this.neutralEnvironment = this.pmremGenerator.fromScene( new RoomEnvironment() ).texture;

    this.controls = new OrbitControls( this.defaultCamera, this.renderer.domElement );
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
    this.controls.screenSpacePanning = true;

    this.el.appendChild(this.renderer.domElement);

    this.cameraCtrl = null;
    this.cameraFolder = null;
    this.animFolder = null;
    this.animCtrls = [];
    this.morphFolder = null;
    this.morphCtrls = [];
    this.skeletonHelpers = [];
    this.gridHelper = null;
    this.axesHelper = null;
    this.chatStatus = 'idle'
    this.addAxesHelper();

    this.animate = this.animate.bind(this);
    requestAnimationFrame( this.animate );

    console.log('constructor executed')
  }

  setChatStatus (newStatus){
    console.log('adasd', this.chatStatus, newStatus)
    this.chatStatus = newStatus;

    if (newStatus === 'sent') {
      this.runExpression('thoughtful', 2500, 400, null)
      setTimeout(() => {
        this.randomEyeMovements(false, "lookUpRight")
        setTimeout(() => {
          this.randomEyeMovements(false, "lookUpLeft")
        }, 1000)
        setTimeout(() => {
          this.randomEyeMovements(true, "lookUpLeft")
        }, 2000)
      }, 1000)
      
    }else if (newStatus === 'responding'){
      this.killAnimation(this.currentExpression, null)
      this.audioRunning = true
      console.log('about to speak')
    }else if (newStatus === 'recording') {
      this.runExpression('attentive', 2500, 400, null)

    } else if (newStatus === 'idle') {
      setTimeout(async ()=> {
        while (this.audioRunning) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        this.runExpression('pleased', 2500, 400)
      }, 3000)
    }
    else{
      // this.runExpression('neutral', 2500, 400, null)
    }

  }

  animate (time) {

    requestAnimationFrame( this.animate );

    const dt = (time - this.prevTime) / 1000;

    this.controls.update();
    this.stats.update();
    this.mixer && this.mixer.update(dt);
    this.render();

    this.prevTime = time;

  }

  render () {

    this.renderer.render( this.scene, this.activeCamera );
    if (this.state.grid) {
      this.axesCamera.position.copy(this.defaultCamera.position)
      this.axesCamera.lookAt(this.axesScene.position)
      this.axesRenderer.render( this.axesScene, this.axesCamera );
    }
  }

  resize () {

    const {clientHeight, clientWidth} = this.el.parentElement;

    this.defaultCamera.aspect = clientWidth / clientHeight;
    this.defaultCamera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);

    this.axesCamera.aspect = this.axesDiv.clientWidth / this.axesDiv.clientHeight;
    this.axesCamera.updateProjectionMatrix();
    this.axesRenderer.setSize(this.axesDiv.clientWidth, this.axesDiv.clientHeight);
  }

  load ( url, rootPath, assetMap ) {
    console.log(url, rootPath, assetMap)

    const baseURL = LoaderUtils.extractUrlBase(url);

    return new Promise((resolve, reject) => {

      MANAGER.setURLModifier((url, path) => {

        const normalizedURL = rootPath + decodeURI(url)
          .replace(baseURL, '')
          .replace(/^(\.?\/)/, '');
          console.log('url:', url);
          console.log('rootPath:', rootPath);
          console.log('baseURL:', baseURL);
          console.log('normalizedURL:', normalizedURL);
        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }

        return (path || '') + url;

      });

      const loader = new GLTFLoader( MANAGER )
        .setCrossOrigin('anonymous')
        .setDRACOLoader( DRACO_LOADER )
        .setKTX2Loader( KTX2_LOADER.detectSupport( this.renderer ) )
        .setMeshoptDecoder( MeshoptDecoder );

        console.log(url)
      const blobURLs = [];
      console.log(url)
      loader.load(url, (gltf) => {
        console.log(url, "gltf url")
        window.VIEWER = window.VIEWER || {};

        window.VIEWER.json = gltf;
        console.log(gltf)

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];

        this.setContent(scene, clips);

        blobURLs.forEach(URL.revokeObjectURL);

        resolve(gltf);

      }, undefined, reject);

    });

  }

  /**
   * @param {THREE.Object3D} object
   * @param {Array<THREE.AnimationClip} clips
   */
  setContent ( object, clips ) {

    object.updateMatrixWorld(); // donmccurdy/three-gltf-viewer#330
    
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter(new Vector3());

    this.controls.reset();

    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    this.controls.maxDistance = size * 10;
    this.defaultCamera.near = size / 100;
    this.defaultCamera.far = size * 100;
    this.defaultCamera.updateProjectionMatrix();
    
    if (this.options.cameraPosition) {

      this.defaultCamera.position.fromArray( this.options.cameraPosition );
      this.defaultCamera.lookAt( new Vector3() );

    } else {

      let avatarPositionsMap = {
        "bottomLeft"  : [-0.15, -2.25, 1],
        "bottomRight" : [ 0.15, -2.25, 1],
        "topLeft"     : [-0.15, -2   , 1],
        "topRight"    : [ 0.15, -2   , 1],
        "center"      : [ 0   , -2.05, 0.87],
        "middleLeft"  : [-0.15, -2.05, 1],
        "middleRight" : [ 0.15, -2.05, 1],
        "middleTop"   : [ 0   , -2   , 1],
        "middleBottom": [ 0   , -2.15, 1],
      }

      let positionMultipliers = avatarPositionsMap[this.options.avatarPosition]
      this.defaultCamera.position.copy(center);
      this.defaultCamera.position.x += size*positionMultipliers[0];
      this.defaultCamera.position.y += size*positionMultipliers[1];
      this.defaultCamera.position.z += size*positionMultipliers[2];
      this.defaultCamera.lookAt(center);
    }

    this.setCamera(DEFAULT_CAMERA);

    this.axesCamera.position.copy(this.defaultCamera.position)
    this.axesCamera.lookAt(this.axesScene.position)
    this.axesCamera.near = size / 100;
    this.axesCamera.far = size * 100;
    this.axesCamera.updateProjectionMatrix();
    this.axesCorner.scale.set(size, size, size);

    this.controls.saveState();

    this.scene.add(object);
    this.content = object;

    this.state.punctualLights = true;

    this.content.traverse((node) => {
      if (node.isLight) {
        this.state.punctualLights = false;
      } else if (node.isMesh) {
        node.material.depthWrite = !node.material.transparent;
      }
    });

    let morphMeshes = []
    this.content.traverse((node) => {
      if (node.isMesh && node.morphTargetInfluences) {
        morphMeshes.push(node);
      }
    });
    this.morphMeshes = morphMeshes


    setInterval(() => {
      this.runLipSync(morphMeshes);
    }, 200);

    this.runExpression('smile', 7000, 400)

    setTimeout(() => {
      this.blink()
    }, 2000); // 10000 milliseconds = 10 seconds
    this.runRandomMovements(morphMeshes)

    this.runSequence()
    

    this.setClips(clips);
    this.updateLights();
    window.VIEWER.scene = this.content;

  }
  async runSequence (){
    setTimeout(() => {
      this.setChatStatus('recording')

      setTimeout(() => {
        this.setChatStatus('sent')
      }, 2000); // 10000 milliseconds = 10 seconds

      setTimeout(() => {
        this.setChatStatus('responding')
      }, 4000); // 10000 milliseconds = 10 seconds

      setTimeout(() => {
        this.pushToPollyQueue("listen, my name is Edi.")
      }, 5000); // 10000 milliseconds = 10 seconds

      setTimeout(() => {
        this.pushToPollyQueue("rusty are you?")
      }, 7000); // 10000 milliseconds = 10 seconds
      
      setTimeout(() => {
        this.setChatStatus('idle');
        console.log(this.morphMeshes[0].morphTargetInfluences)
      }, 7500); // 10000 milliseconds = 10 seconds

      setTimeout(() => {
        this.killAnimation("all")
      }, 10000); // 10000 milliseconds = 10 seconds

    }, 2500); // 10000 milliseconds = 10 seconds
  }

  async clearPollyQueue() {
    this.pollyQueue = [];
  }
  
  async pushToPollyQueue(text) {
    this.audioRunning = true
    if (currentAnimation){
      console.log("killng animation through queue")
      this.killAnimation(this.currentExpression)
    }
    const startPush = new Date()
    while (this.lock) {
      console.log('locked awaiting', text)
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    const startPolly = new Date
    this.lock = true;
    await this.pushPollyQueue(text);
    // console.log("Queue Push call to Polly Generation", new Date() - startPush)
    // console.log("Queue Push trigger to Polly generation", new Date() - startPolly)
    this.lock = false;
  }

  async pushPollyQueue(text) {
    let [visemes, audio] = await Promise.all([
      synthesizeViseme(text),
      synthesizeSpeech(text),
    ]);
    let mapped_blendshapes = getBlendShapes(visemes);
    this.pollyQueue.push({"text":text, "mapped_blendshapes": mapped_blendshapes, "visemes": visemes, "audio": audio})
  }

  async runLipSync(morphMeshes){
    const startValue = 0;
    const endValue = 1;
    if (this.pollyQueue.length > 0 && !lipSyncRunning) {
      lipSyncRunning = true
      console.log('message run')
      const pollyMessages = this.pollyQueue.shift()
      console.log("animation started at ", new Date().toISOString())
      const playAudioPromise = playAudio(pollyMessages.audio)
      const animateLipsPromise = this.animateLipSync(pollyMessages.mapped_blendshapes, startValue, endValue)
      await Promise.all([playAudioPromise, animateLipsPromise]);
      lipSyncRunning = false;
      stopwatch.reset();
      if (!this.pollyQueue.length) {
        this.audioRunning = false
      }
      if (this.updateVideoPlaying && !this.pollyQueue.length){
        this.updateVideoPlaying(false);
      }
    }
  }
  
  async runRandomMovements (morphMeshes){
    const visemes = await getAudioAzureVisemes("hello world how are you");
    console.log(visemes);

    function randomDuration(min, max){
      return Math.floor(Math.random() * (max - min + 1) + min)*1000;
    }
  setInterval(() => {
    if (this.pollyQueue.length === 0 && !lipSyncRunning && !this.lock && this.chatStatus === 'idle') {

      this.executeRandomEyeMovements(3)

      const randValue = Math.random()
      if (randValue < 0.5){
        this.runExpression('attentive', randomDuration(9, 12), 400)

      } else {
        this.runExpression('smile', randomDuration(9, 12), 400)
      } 
    }
  }, 15000);

  // setInterval(() => {
  //   blink(morphMeshes, blendShape)
  // }, 8000); // 10000 milliseconds = 10 seconds

  setInterval(() => {
    this.randomFacialMovements()
  }, randomDuration(2, 4));


  }

  /**
   * @param {Array<THREE.AnimationClip} clips
   */
  setClips ( clips ) {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }

    this.clips = clips;
    if (!clips.length) return;

    this.mixer = new AnimationMixer( this.content );
  }

  playAllClips () {
    this.clips.forEach((clip) => {
      this.mixer.clipAction(clip).reset().play();
      this.state.actionStates[clip.name] = true;
    });
  }

  /**
   * @param {string} name
   */
  setCamera ( name ) {
    if (name === DEFAULT_CAMERA) {
      this.controls.enabled = true;
      this.activeCamera = this.defaultCamera;
    } else {
      this.controls.enabled = false;
      this.content.traverse((node) => {
        if (node.isCamera && node.name === name) {
          this.activeCamera = node;
        }
      });
    }
  }

  updateLights () {
    const state = this.state;
    const lights = this.lights;

    if (state.punctualLights && !lights.length) {
      this.addLights();
    } else if (!state.punctualLights && lights.length) {
      this.removeLights();
    }

    this.renderer.toneMapping = Number(state.toneMapping);
    this.renderer.toneMappingExposure = Math.pow(2, state.exposure);

    if (lights.length === 2) {
      lights[0].intensity = state.ambientIntensity;
      lights[0].color.setHex(state.ambientColor);
      lights[1].intensity = state.directIntensity;
      lights[1].color.setHex(state.directColor);
    }
  }

  addLights () {
    const state = this.state;

    if (this.options.preset === Preset.ASSET_GENERATOR) {
      const hemiLight = new HemisphereLight();
      hemiLight.name = 'hemi_light';
      this.scene.add(hemiLight);
      this.lights.push(hemiLight);
      return;
    }

    const light1  = new AmbientLight(state.ambientColor, state.ambientIntensity);
    light1.name = 'ambient_light';
    this.defaultCamera.add( light1 );

    const light2  = new DirectionalLight(state.directColor, state.directIntensity);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';
    this.defaultCamera.add( light2 );

    this.lights.push(light1, light2);
  }

  removeLights () {

    this.lights.forEach((light) => light.parent.remove(light));
    this.lights.length = 0;
  }

  updateBackground () {

    this.backgroundColor.setHex(this.state.bgColor);

  }

  addAxesHelper () {
    this.axesDiv = document.createElement('div');
    this.el.appendChild( this.axesDiv );
    this.axesDiv.classList.add('axes');

    const {clientWidth, clientHeight} = this.axesDiv;

    this.axesScene = new Scene();
    this.axesCamera = new PerspectiveCamera( 50, clientWidth / clientHeight, 0.1, 10 );
    this.axesScene.add( this.axesCamera );

    this.axesRenderer = new WebGLRenderer( { alpha: true } );
    this.axesRenderer.setPixelRatio( window.devicePixelRatio );
    this.axesRenderer.setSize( this.axesDiv.clientWidth, this.axesDiv.clientHeight );

    this.axesCamera.up = this.defaultCamera.up;

    this.axesCorner = new AxesHelper(5);
    this.axesScene.add( this.axesCorner );
    this.axesDiv.appendChild(this.axesRenderer.domElement);
  }

  async runExpression (expressionName, pause = 5000, duration = 400, nextExpressionName = null){
    let startValue = this.morphMeshes[0].morphTargetInfluences
    let expression = expressions[expressionName]
    
    if (this.currentExpression){ //kill the current running expression 
      this.killAnimation(this.currentExpression, expressionName)
    }
    this.currentExpression = expressionName // update the current running expression
  
    for (let i = 0; i < expression.length; i ++) { //run the animation for the new expression
      const obj = expression[i]
      this.animateMeshes(blendShape[obj.shape] , startValue[blendShape[obj.shape]] , obj.endValue, duration, false);
    }
    
    await new Promise((resolve) => setTimeout(resolve, pause)) //run the expression for the time indicated by pause
    if (nextExpressionName){  // if there is a next expression that must follow. run it 
      this.runExpression(expressionName, pause*2, duration, null)
    } else {
      this.killAnimation(expressionName, null) // if no next next expression after the pause time kill the expression
      this.currentExpression = null            // update the current running expression
    }
  }

  async killAnimation(name, nextExpressionName = null){
    console.log(name, nextExpressionName)
    if (name) {
      let startValue     = this.morphMeshes[0].morphTargetInfluences
      let expression     = name === "all"     ? Object.keys(blendShape).map((key) => ({ "shape": key, "endValue": 1 })) : expressions[name]
      let nextExpression = nextExpressionName ? expressions[nextExpressionName] : []
  
      const duration = 200
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        if (nextExpression.includes(obj.shape)){
          continue
        }
        this.animateMeshes(blendShape[obj.shape], startValue[blendShape[obj.shape]] , 0, duration, false);
      }
    }
  }

  async animateMeshes(blendShapeIndex, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
    await Promise.all(this.morphMeshes.map((morphMesh, i) => {
      return this.animateMorphTarget(i, blendShapeIndex, startValue, endValue, duration, finalValue, interp);
    }));
    }
    
  animateMorphTarget(meshIndex, index, startValue, endValue, duration, finalValue = false, interp = 'lerp') {

    const startTime = performance.now();
    const update = () =>  {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentValue = interp === 'lerp' ? lerp(startValue, endValue, progress) : easeOutQuart(startValue, endValue, progress)
      this.morphMeshes[meshIndex].morphTargetInfluences[index] = currentValue;
    
      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (finalValue !== false) {
        this.animateMorphTarget(meshIndex, index, endValue, finalValue, duration, false);
      }
    }
    update();
    }

  animateLipSync(mapped_blendshapes, startValue, endValue) {
    console.log("animating lipsync start", new Date())
  
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      await new Promise(resolve => setTimeout(resolve, mapped_blendshapes[0].time));
      if (mapped_blendshapes[0].value !== "mouthClose") {
        const duration = mapped_blendshapes[1].time - mapped_blendshapes[0].time;
        await this.animateMeshes(blendShape[mapped_blendshapes[0].value], 0, 1, duration, true);  // animate every mesh for the blendshape 
      }
      for (let i = 1; i < mapped_blendshapes.length; i++) {
        const prev_mapped_blendshape = mapped_blendshapes[i - 1];
        const current_mapped_blendshape = mapped_blendshapes[i];
  
        const next_blendshape_time = mapped_blendshapes[i + 1] ? mapped_blendshapes[i + 1].time : current_mapped_blendshape.time + 250;
        const duration = next_blendshape_time - current_mapped_blendshape.time; // time between start of next viseme and current viseme
  
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime; // time since start of function execution
        const waitTime = Math.max(0, current_mapped_blendshape.time - elapsedTime); //time the lipsync animation relative to function start instead of relative previous call to account for execution time
  
        await new Promise(resolve => setTimeout(resolve, waitTime));
        if (current_mapped_blendshape.value !== "mouthClose") {
          if (prev_mapped_blendshape.value === "mouthClose") {
            await this.animateMeshes(blendShape[current_mapped_blendshape.value], 0, 1, duration, false, 'easeOutExpo');
          } else {
            await Promise.all([
              this.animateMeshes(blendShape[current_mapped_blendshape.value], 0, 1, duration, false, 'easeOutQuart'),
              this.animateMeshes(blendShape[prev_mapped_blendshape.value], 1, 0, duration, false, 'easeOutExpo')
            ]);
          }
        } else if (prev_mapped_blendshape.value !== "mouthClose") {
          await this.animateMeshes(blendShape[prev_mapped_blendshape.value], 1, 0, duration, false);
        }
      }
      resolve(); // Resolve the outer Promise when the animation is complete
    });
  }

  blink(){
    let startValue = this.morphMeshes[0].morphTargetInfluences
      if (Math.random() < 0.5){
        this.animateMeshes(blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 200, 0);
        this.animateMeshes(blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 200, 0);
      }else { //blink twice
        this.animateMeshes(blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
        this.animateMeshes(blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
        setTimeout(()=> {
          this.animateMeshes(blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
          this.animateMeshes(blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
        }, 350)
    }
  }

  randomFacialMovements(){
    let startValue = this.morphMeshes[0].morphTargetInfluences

    const randomMovements = [["browDownLeft", "browDownRight"], ["browInnerUp"], ["browOuterUpLeft", "browOuterUpRight"], ["cheekSquintLeft", "cheekSquintRight"], ["noseSneerLeft", "noseSneerRight"]]                         
    const randomMovement = randomMovements[Math.floor(Math.random() * randomMovements.length)];

    for (let i = 0; i < randomMovement.length; i ++){
      const move = randomMovement[i]
      this.animateMeshes(blendShape[move], startValue[blendShape[move]], 1, 250, startValue[blendShape[move]]);
    }
  }

  randomEyeMovements(reverse = false, motionType = false) {
    const randomMovementPairs = {"lookUpRight"  : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookInLeft", "eyeLookOutRight"],
                                "lookUpLeft"    : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookOutLeft", "eyeLookInRight"],
                                "lookRight"     : ["eyeLookInLeft", "eyeLookOutRight"],
                                "lookLeft"      : ["eyeLookOutLeft", "eyeLookInRight"],
                                "lookDownRight" : ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookInLeft", "eyeLookOutRight"],
                                "lookDownLeft"  : ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight"],
                                }

    const lookStrightBlendshapes = ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight", "eyeLookInLeft", "eyeLookOutRight",    
                                    "eyeLookUpLeft", "eyeLookUpRight"]

    const motion       = motionType ? motionType : Object.keys(randomMovementPairs)[Math.floor(Math.random() * Object.keys(randomMovementPairs).length)]
    const motionShapes = reverse ? []  : randomMovementPairs[motion];

    for (let i= 0; i < lookStrightBlendshapes.length; i++) {
      let startValue = this.morphMeshes[0].morphTargetInfluences[blendShape[lookStrightBlendshapes[i]]]
      let endValue   = motionShapes.includes(lookStrightBlendshapes[i]) ? 1 : 0
      endValue       = reverse ? 0 : endValue
      if (startValue!==endValue) {
        this.animateMeshes(blendShape[lookStrightBlendshapes[i]], startValue, endValue, 600, false);
      }
    }
  }

  async executeRandomEyeMovements(n, pause = 1200) {
    await new Promise((resolve) => setTimeout(resolve, pause));
    for (let i = 0; i < n; i++) {
      this.randomEyeMovements();
      await new Promise((resolve) => setTimeout(resolve, pause));
    }
    this.randomEyeMovements(true);
  }
};

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function easeOutQuart(start, end, t) {
  t = 1-t
  return end * (1 - t ** 4) + start * t ** 4
}

function easeOutExpo(start, end, t){
  return start * (1 - Math.pow(2, -10 * t)) + end * Math.pow(2, -10 * t);
}

function getBlendShapes(visemes){
  let mapped_blendshapes = new Array()
  visemes.forEach(viseme_data=>{
    if (viseme_data.type ==='viseme'){
        let mapped_blendshape = viseme_map[viseme_data.value]
        if (viseme_map[viseme_data.value]){
          mapped_blendshapes.push({
            "time": viseme_data.time,
            "type": "blendshape",
            "value": mapped_blendshape,
          })
        } else{
          console.log(viseme_data.value)
          console.log(viseme_map[viseme_data.value])
        }
      }
  })
  return mapped_blendshapes
}



import { SpeechConfig, SpeechSynthesizer, AudioConfig } from "microsoft-cognitiveservices-speech-sdk";

// Callback function to handle viseme data
function handleViseme(visemeData, e) {
  const audioOffset = e.audioOffset / 10000;
  const visemeId = e.visemeId;
  visemeData.push({ audioOffset, visemeId });
}

async function getAudioAzureVisemes(text) {
  const subscriptionKey = "";
  const region = "eastus";
  const voiceName = "en-US-JennyNeural";

  const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, region);
  const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
  const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  const visemeData = [];
  speechSynthesizer.visemeReceived = (s, e) => handleViseme(visemeData, e);

  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${voiceName}">${text}</voice></speak>`;
  await new Promise((resolve) => {
    speechSynthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        resolve();
      },
      (error) => {
        console.error(error);
        resolve();
      }
    );
  });
  return visemeData;
}

async function synthesizeViseme(text) {
  const startViseme = new Date()
  const response = await fetch(
    "https://1v94u5w0zh.execute-api.us-east-1.amazonaws.com/dev/api/v1/edi/get_visemes",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text": text }),
    }
  );
  // console.log("Visemes. Pure fetch time", new Date() - startViseme)
  const jsonResponse = await response.json();
  // console.log(jsonResponse);
  return jsonResponse;
}


async function synthesizeSpeech(text) {
  const startAudio = new Date()
  const response = await fetch(
    "https://1v94u5w0zh.execute-api.us-east-1.amazonaws.com/dev/api/v1/edi/get_audio",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text": text }),
    }
  );
  // console.log("Audio. Pure fetch time", new Date() - startAudio)
  const base64String = await response.text();
  const binaryData = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
  const audioBlob = new Blob([binaryData], { type: 'audio/mpeg' });
  const audioUrl= URL.createObjectURL(audioBlob);
  return audioUrl;
}


async function playAudio(audioUrl) {
  console.log("starting audio", new Date())
  const audio = new Audio(audioUrl);
  audio.play();
}