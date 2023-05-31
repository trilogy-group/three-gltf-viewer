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
export const environments = [
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

const expressions = {
  "smile": [
      {"shape": "mouthSmileLeft", "endValue": 1},
      {"shape": "mouthSmileRight", "endValue": 1},
      {"shape": "cheekPuff", "endValue": 0.5},
      {"shape": "eyeSquintLeft", "endValue": 0.6},
      {"shape": "eyeSquintRight", "endValue": 0.6},
      {"shape": "mouthOpen", "endValue": 1},
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
      {"shape": "mouthCheekSquintLeft", "endValue": 0.2},
      {"shape": "mouthCheekSquintRight", "endValue": 0.2},
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
let currentAnimation = "pleased"

let lipSyncRunning = false

Cache.enabled = true;

export class Viewer {

  constructor (el, options) {
    this.pollyQueue = [];
    this.el = el;
    this.options = options;

    this.lights = [];
    this.content = null;
    this.mixer = null;
    this.clips = [];
    this.gui = null;

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
      // bgColor:0xFFFFFF,

    };

    this.prevTime = 0;

    this.stats = new Stats();
    this.stats.dom.height = '48px';
    [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));


    this.scene = new Scene();

    const textureLoader = new TextureLoader();
    const backgroundTexture = textureLoader.load('https://raw.githubusercontent.com/BekhruzT/Final-Project-INSA/main/background/img5.png');
    this.scene.background = backgroundTexture;

    // this.backgroundColor = new Color(this.state.bgColor);
    // this.scene.background = this.backgroundColor;

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

    this.addAxesHelper();
    // this.addGUI();
    if (options.kiosk) this.gui.close();

    this.animate = this.animate.bind(this);
    requestAnimationFrame( this.animate );
    window.addEventListener('resize', this.resize.bind(this), false);
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
      loader.load(url, (gltf) => {
        console.log(url)
        console.log(window.viewer)
        window.VIEWER.json = gltf;

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

    // this.clear();

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

      this.defaultCamera.position.copy(center);
      this.defaultCamera.position.y -= size*2.1;
      this.defaultCamera.position.x -= size*0.15;
      this.defaultCamera.position.z += size;
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

    // window.addEventListener('message', (event) => this.pushPollyQueue(text), false);
    setTimeout(() => {
    this.pushPollyQueue("Hey my name is Edi. I will be evaluating your understanding of Conservation of Mass today.", morphMeshes)
    }, 5000);
    setTimeout(() => {
      blink(morphMeshes, blendShape)
    }, 2000); // 10000 milliseconds = 10 seconds
    // smile(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning, 7000);
    attentive(morphMeshes, blendShape)

  
    setInterval(() => {
      this.runLipSync(morphMeshes);
    }, 100);

    this.runRandomMovements(morphMeshes)

    this.setClips(clips);
    this.updateLights();
    window.VIEWER.scene = this.content;

  }

  async runLipSync(morphMeshes){
    const startValue = 0;
    const endValue = 1;
    if (this.pollyQueue.length > 0 && !lipSyncRunning) {
      lipSyncRunning = true
      const pollyMessages = this.pollyQueue.shift()
      const currentTime = new Date();
      console.log(currentTime);
      const playAudioPromise = playAudio(pollyMessages.audio)
      const animateLipsPromise = animateLipSync(pollyMessages.mapped_blendshapes, morphMeshes, blendShape, startValue, endValue)
      await Promise.all([playAudioPromise, animateLipsPromise]);
      lipSyncRunning = false;
      stopwatch.reset();
    }
  }
  
  async pushPollyQueue(text, morphMeshes) {
    pushing = true
    randomEyeMovements(morphMeshes, blendShape, true)

    let [visemes, audio] = await Promise.all([
      synthesizeViseme(text),
      synthesizeSpeech(text),
    ]);
    console.log(text)
    let mapped_blendshapes = getBlendShapes(visemes);
    this.pollyQueue.push({"mapped_blendshapes": mapped_blendshapes, "visemes": visemes, "audio": audio})
    pushing = false 
  }

  async runRandomMovements (morphMeshes){
    function randomDuration(min, max){
      return Math.floor(Math.random() * (max - min + 1) + min)*1000;
    }
    setInterval(() => {
      if (this.pollyQueue.length === 0 && !lipSyncRunning && !pushing && stopwatch.getElapsedTime() > 3) {

        let counter = 0;
        const intervalId = setInterval(() => {
          if (counter >= 3) {
            randomEyeMovements(morphMeshes, blendShape, true);
            return;
          }
          randomEyeMovements(morphMeshes, blendShape);
          counter++;
        }, 1000);
        killAnimation(morphMeshes, blendShape, currentAnimation)
        const randValue = Math.random()
        console.log(currentAnimation)
        // killAnimation(morphMeshes, blendShape, currentAnimation, nextExpression = expressions.smile)
        // smile(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning, randomDuration(6, 10));

        if (randValue < 0.5){
          killAnimation(morphMeshes, blendShape, currentAnimation, expressions.smile)
          smirk(morphMeshes, blendShape, false, randomDuration(2, 4));
        } else {
          killAnimation(morphMeshes, blendShape, currentAnimation, expressions.smile)
          smile(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning, randomDuration(6, 10));
        } 
      }
    }, 4000);

    setInterval(() => {
      blink(morphMeshes, blendShape)
    }, 8000); // 10000 milliseconds = 10 seconds

    // setInterval(() => {
    //   smile(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning);
    //   console.log(stopwatch.getElapsedTime())
    // }, 3000);

    // setInterval(() => {
    //   smile2(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning);
    //   console.log(stopwatch.getElapsedTime())
    // }, 3000);

    // setTimeout(() => {
    //   delighted(morphMeshes, blendShape, this.pollyQueue.length > 0 || lipSyncRunning);
    //   console.log(stopwatch.getElapsedTime())
    // }, 1000);

    // setTimeout(() => {
    //   happySurprise(morphMeshes, blendShape)
    // }, 2000);

    // setTimeout(() => {
    //   pleased(morphMeshes, blendShape)
    // }, 2000);

    // setTimeout(() => {
    //   attentive(morphMeshes, blendShape)
    // }, 2000);

    // setInterval(() => {
    //   curious(morphMeshes, blendShape)
    // }, 4000);

    // setTimeout(() => {
    //   sad(morphMeshes, blendShape)
    // }, 4000);

    // setTimeout(() => {
    //   thoughtful(morphMeshes, blendShape)
    // }, 4000);

    // setInterval(() => {
    //   if (this.pollyQueue.length === 0 && !lipSyncRunning && !pushing && stopwatch.getElapsedTime() > 5) {
    //     randomEyeMovements(morphMeshes, blendShape);
    //   }
    // }, 1000);

    setInterval(() => {
      randomFacialMovements(morphMeshes, blendShape)
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

    const hemiLight = new HemisphereLight();
    hemiLight.name = 'hemi_light';
    this.scene.add(hemiLight);
    this.lights.push(hemiLight);

    const light1  = new AmbientLight(state.ambientColor, state.ambientIntensity);
    light1.name = 'ambient_light';
    this.defaultCamera.add( light1 );
    this.lights.push(light1);

    addDirectionalLight(this, 0.5, 0.5, 0.866, 0.3)
    addDirectionalLight(this, -0.5, 0.5, 0.866, 0.3)
    addDirectionalLight(this, 0.5, -0.5, 0.866, 0.3)
    addDirectionalLight(this, -0.5, -0.5, 0.866, 0.3)

    function addDirectionalLight(obj, x, y, z, intensityFactor = 1, visualize = true){
      const light2  = new DirectionalLight(state.directColor, state.directIntensity*intensityFactor);
      light2.position.set(x, y, z);
      light2.name = 'main_light';
      if (visualize){
        const lightSphereGeometry = new SphereGeometry(0.1); // Adjust the radius (0.1) as needed
        const lightSphereMaterial = new MeshBasicMaterial({ color: 0xFF0000 });
        const lightSphere = new Mesh(lightSphereGeometry, lightSphereMaterial);
        lightSphere.position.set(x, y, z);
        light2.add(lightSphere);
        obj.scene.add(lightSphere);
      }
      obj.scene.add(light2);
      obj.lights.push(light2);
    }
    console.log(this.defaultCamera.position)
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
};

function randomFacialMovements(morphMeshes, blendShape){
  let startValue = morphMeshes[0].morphTargetInfluences

  const randomMovements = [["browDownLeft", "browDownRight"], ["browInnerUp"], ["browOuterUpLeft", "browOuterUpRight"], ["cheekSquintLeft", "cheekSquintRight"], ["noseSneerLeft", "noseSneerRight"], ["eyeSquintLeft", "eyeSquintRight"]]                         
  const randomMovement = randomMovements[Math.floor(Math.random() * randomMovements.length)];

  for (let i = 0; i < randomMovement.length; i ++){
    const move = randomMovement[i]
    if (Math.random() > 0.5) {
      animateMeshes(morphMeshes, blendShape[move], startValue[blendShape[move]], 1, 250, startValue[blendShape[move]]);
    }
  }

}


function randomEyeMovements(morphMeshes, blendShape, reverse = false, motionType = false){
  console.log(reverse)
  const randomMovementPairs = {"lookUpRight"  : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookInLeft", "eyeLookOutRight"],
                               "lookUpLeft"   : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookOutLeft", "eyeLookInRight"],
                               "lookRight"    : ["eyeLookInLeft", "eyeLookOutRight"],
                               "lookLeft"     : ["eyeLookOutLeft", "eyeLookInRight"],
                               "lookDownRight": ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookInLeft", "eyeLookOutRight"],
                               "lookDownLeft" : ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight"],
                              }

  const lookStrightBlendshapes = ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight", "eyeLookInLeft", "eyeLookOutRight", "eyeLookUpLeft", "eyeLookUpRight"]

  const motion       = motionType ? motionType : Object.keys(randomMovementPairs)[Math.floor(Math.random() * Object.keys(randomMovementPairs).length)]
  const motionShapes = Math.random()<0.1 ? []  : randomMovementPairs[motion];

  for (let i= 0; i < lookStrightBlendshapes.length; i++) {
    let startValue = morphMeshes[0].morphTargetInfluences[blendShape[lookStrightBlendshapes[i]]]
    let endValue   = motionShapes.includes(lookStrightBlendshapes[i]) ? 1 : 0
    console.log(startValue, endValue, reverse)
    endValue = reverse ? 0 : endValue
    if (startValue!==endValue) {
      animateMeshes(morphMeshes, blendShape[lookStrightBlendshapes[i]], startValue, endValue, 600, false);
    }
  }
}
async function sad(morphMeshes, blendShape){
  currentAnimation = "sad"

  let startValue = morphMeshes[0].morphTargetInfluences
  runSad(false)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  animateMeshes(morphMeshes, blendShape["noseSneerLeft"], startValue[blendShape["noseSneerLeft"]], 0.8, 300, 0);
  animateMeshes(morphMeshes, blendShape["noseSneerRight"], startValue[blendShape["noseSneerRight"]], 0.8, 300, 0);

  function runSad(reverse){
    console.log('runsad')
    let expression = expressions.sad
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

function curious(morphMeshes, blendShape){
  currentAnimation = "curious"

  runCurious(false)
  function runCurious(reverse){
    let startValue = morphMeshes[0].morphTargetInfluences
    let expression = expressions.curious
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

function thoughtful(morphMeshes, blendShape){
  currentAnimation = "thoughtful"

  runThoughtful(false)


  async function runThoughtful(reverse){
    let startValue = morphMeshes[0].morphTargetInfluences
    let expression = expressions.thoughtful
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }

    randomEyeMovements(morphMeshes, blendShape, false, "lookUpRight")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    blink(morphMeshes, blendShape)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    randomEyeMovements(morphMeshes, blendShape, false, "lookUpLeft")
  }
}

function attentive(morphMeshes, blendShape){
  currentAnimation = "attentive"
  runAttentive(false)
  function runAttentive(reverse){
    let startValue = morphMeshes[0].morphTargetInfluences
    let expression = expressions.attentive
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}


function pleased(morphMeshes, blendShape){
  currentAnimation = "pleased"

  runPleased(false)
  function runPleased(reverse){
    let startValue = morphMeshes[0].morphTargetInfluences
    let expression = expressions.pleased
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}


async function happySurprise(morphMeshes, blendShape){
  let startValue = morphMeshes[0].morphTargetInfluences
  currentAnimation = "happySurprise"

  runHappySurprise(false)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  runHappySurprise(true)
  smile(morphMeshes, blendShape, false, 2000)

  function runHappySurprise(reverse){
    if (reverse){
      let expression = expressions.happySurpriseReverse
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
    else {
      let expression = expressions.happySurprise
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
   
}

async function smile(morphMeshes, blendShape, lipsing = true, pause = 2000){
  let startValue = morphMeshes[0].morphTargetInfluences
  currentAnimation = "smile"

  let duration = 200
  runSmile(false)
  await new Promise((resolve) => setTimeout(resolve, pause))
  runSmile(true)
  neutral(morphMeshes, blendShape)

  function runSmile(reverse){
    let expression = expressions.smile
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

async function smile2(morphMeshes, blendShape, lipsing = true, pause = 2000){
  let startValue = morphMeshes[0].morphTargetInfluences
  currentAnimation = "smile2"

  // if (lipsing && startValue[blendShape["mouthSmileLeft"]] == 1){ // if lipsing starting and currently smiling -> revert the smile
  //   runSmile2(lipsing)
  // }
  // if (!lipsing && startValue[blendShape["mouthSmileLeft"]] < 1){ // if no lipsing and currently not smiling -> the smile
  //   runSmile2(lipsing)
  // }
  // console.log(lipsing, )
  let duration = 200
  runSmile2(false)
  await new Promise((resolve) => setTimeout(resolve, pause))
  runSmile2(true)
  neutral(morphMeshes, blendShape)

  function runSmile2(reverse){
    let expression = expressions.smile2
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

function delighted(morphMeshes, blendShape, lipsing = false, duration = 200){
  let startValue = morphMeshes[0].morphTargetInfluences
  currentAnimation = "delighted"

  runDelighted(lipsing)

  function runDelighted(reverse){
    console.log('delighted')
    let expression = expressions.delighted
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      console.log(obj.shape)
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

function neutral(morphMeshes, blendShape){
  let startValue = morphMeshes[0].morphTargetInfluences
  currentAnimation = "neutral"

  runNeutral(false)

  function runNeutral(reverse){
    let expression = expressions.neutral
    for (let i = 0; i < expression.length; i ++) {
      const obj = expression[i]
      animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
    }
  }
}

async function smirk(morphMeshes, blendShape, lipsing = true, pause = 2000){
  let startValue = morphMeshes[0].morphTargetInfluences
  let duration = 500
  const change = Math.random() > 0.5;
  currentAnimation = "smirk"
  runSmirk(false)
  await new Promise((resolve) => setTimeout(resolve, pause))
  runSmirk(true)
  neutral(morphMeshes, blendShape)

  function runSmirk(reverse){
    let expression = expressions.smirk
    for (let i = 0; i < expression.length; i ++) {
      const shape = change ? expression[i].shape.replace("Left", "temp").replace("Right", "Left").replace("temp", "Right") : expression[i].shape
      animateMeshes(morphMeshes, blendShape[shape] , startValue[blendShape[shape]] , !reverse ? expression[i].endValue : 0, duration, false);
    }
  }
}

function killAnimation(morphMeshes, blendShape, name, nextExpression = ""){
  let startValue = morphMeshes[0].morphTargetInfluences
  let expression = expressions[name]

  const duration = 200
  for (let i = 0; i < expression.length; i ++) {
    const obj = expression[i]
    if (nextExpression !== "" && nextExpression.includes(obj.shape)){
      continue
    }
    animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , 0, duration, false);
  }
}

function blink(morphMeshes, blendShape){
  let startValue = morphMeshes[0].morphTargetInfluences
  runBlink(morphMeshes, blendShape)
  async function runBlink(morphMeshes, blendShape) {
    if (Math.random() < 0.5){
      animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 200, 0);
      animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 200, 0);
    }else { //blink twice
      animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
      animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
      await new Promise((resolve) => setTimeout(resolve, 300))
      animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
      animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
  ;
  }
}
}

async function animateMeshes(morphMeshes, blendShapeValue, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
  await Promise.all(morphMeshes.map((morphMesh) => {
    return animateMorphTarget(morphMesh,  blendShapeValue, startValue, endValue, duration, finalValue, interp);
  }));
}

function animateMorphTarget(mesh, index, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
  if (startValue === endValue){
    return
  }
  const startTime = performance.now();

  function update() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const currentValue = interp === 'lerp' ? lerp(startValue, endValue, progress) : easeOutQuart(startValue, endValue, progress)
    mesh.morphTargetInfluences[index] = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else if (finalValue !== false) {
      // Reverse the animation by swapping startValue and endValue
      animateMorphTarget(mesh, index, endValue, finalValue, duration, false);
      // mesh.morphTargetInfluences[index] = startValue;
    }
  }

  update();
}


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
// Usage example:
function traverseMaterials (object, callback) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
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

function animateLipSync(mapped_blendshapes, morphMeshes, blendShape, startValue, endValue) {
  return new Promise(async (resolve) => {
    const startTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, mapped_blendshapes[0].time));
    if (mapped_blendshapes[0].value !== "mouthClose") {
      const duration = mapped_blendshapes[1].time - mapped_blendshapes[0].time;
      await animateMeshes(morphMeshes, blendShape[mapped_blendshapes[0].value], 0, 1, duration, 0);  // animate every mesh for the blendshape 
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
          animateMeshes(morphMeshes, blendShape[current_mapped_blendshape.value], 0, 1, duration, false, 'easeOutExpo');
        } else {
          await Promise.all([
            animateMeshes(morphMeshes, blendShape[current_mapped_blendshape.value], 0, 1, duration, false, 'easeOutQuart'),
            animateMeshes(morphMeshes, blendShape[prev_mapped_blendshape.value], 1, 0, duration, false, 'easeOutExpo')
          ]);
        }
      } else if (prev_mapped_blendshape.value !== "mouthClose") {
        await animateMeshes(morphMeshes, blendShape[prev_mapped_blendshape.value], 1, 0, duration, false);
      }
    }
    resolve(); // Resolve the outer Promise when the animation is complete
  });
}

const AWS_ACCESS_KEY_ID = "ASIAUCMU474JKLLO6CPZ"
const AWS_SECRET_ACCESS_KEY = "xokG+q1CMgmup6xARxVn0GfboIlJazYIex+taFNJ"
const AWS_SESSION_TOKEN = "IQoJb3JpZ2luX2VjEKr//////////wEaCmFwLXNvdXRoLTEiRzBFAiEA1ttMss7pnLNJ4Fpyec6TyS+f4nfMK2BUUJcjkMBYRx0CIAr3hCjjva/v/B91XIVEC++UALNfCZwiQNdnWZt9mI+CKowECNP//////////wEQAhoMMjgwMDIyMDIzOTU0Igy9NhezpMuzPacvlEYq4AMkPftqz+5huqaCVwTpODEb0joajGUTIrN5wpkbSkuOu/lQ9vWS/o4Lm1EdX56Lo0XcQYLR7cqLGVhby+lNRKstY/Qiyq4wB53hOdGioV0BpBsVtebj6MVthVZNeFUMck9I2Dak5A2HcFMLKnMtL4Jd+6P13LxE9+D5cZCfw+wuazxgCGtd7336dWbLCPccKaYwykdFSzmUG0d/HyVPnQ8Okze27z0tlkxmezYfgl3wxlNY8C7Kfx8ds9fKSk0m9iRE2TEwIKDcYIrcD+DcLfkXyEzfgpKxIUTJz7eNGDOrbGdGqSrojVPOOmks2DRIs6eWgT0wKzgRazMt75bsTLQjvyqx6HPJolCdFN1we+RC6dflvPtPq3GivzmIvy5/Rn1glRJd4vAVkUhOr6KW5D2ekHTpc88TWWGbETjndUaSRW/8QS4n1inKfPuEOghCQQkODeX3W6GBBWlqLBmIKl0Jn8CRgPyEL54kSbsT8AfJYXr+qkKcyMqDBeutQbNaBgtW2B0qxYL4iDqJX7lyfOXRlEoTFMTiXH93u+z0qT/Hn+6Ya5udh+CubFqDagNPFEq1IzBlVFacqgMkHxt5GgTLbJGbaQmXnWvU/LS3bDsZUi6jpvx8zXSZvr34s4EPirMw3JeyowY6lAEsRLS+Dc9mAiPjEEBkjLBj69TqIk7z6lbdpO6sWVIhZOgokVTgW9kUJpkkR1oEGM4H0jJeRlsM1B2kGFJ4v+MadA4F91gAosJ48HL5VniAFA99011kkSf9BQTFf2+U7uS+UpNfb0OIool8bNJ+NxtmhMovRbi7g7ZYCUrSWGurUHFAw3bzz6X3fYXUs0aUthHq94bp"

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    sessionToken: AWS_SESSION_TOKEN,
    region: "us-east-1",
  });
const polly = new AWS.Polly({ apiVersion: "2016-06-10" });

async function synthesizeViseme(text) {
  const response = await fetch(
    "https://tzsqs7b51h.execute-api.us-east-1.amazonaws.com/dev/api/v1/edi/get_visemes",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text": text }),
    }
  );
  
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse;
}


async function synthesizeSpeech(text) {
  const response = await fetch(
    "https://tzsqs7b51h.execute-api.us-east-1.amazonaws.com/dev/api/v1/edi/get_audio",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text": text }),
    }
  );
  const base64String = await response.text();
  const binaryData = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
  const audioBlob = new Blob([binaryData], { type: 'audio/mpeg' });
  const audioUrl= URL.createObjectURL(audioBlob);
  return audioUrl;
}


async function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}
// async function playAudio(audioData) {
//   console.log(audioData)
//   const audioPlayer = document.getElementById("audio-player");
//   const blob = new Blob([audioData], { type: "audio/mp3" });
//   const url = URL.createObjectURL(blob);
//   return new Promise((resolve) => {
//     audioPlayer.src = url;
//     audioPlayer.play();
//     audioPlayer.onended = () => {
//       resolve();
//     };
//   });
// }