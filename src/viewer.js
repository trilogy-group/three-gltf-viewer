import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  Color,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  LoaderUtils,
  LoadingManager,
  PMREMGenerator,
  PerspectiveCamera,
  REVISION,
  Scene,
  SkeletonHelper,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  LinearToneMapping,
  ACESFilmicToneMapping
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GUI } from 'dat.gui';
import { environments } from './environments.js';

const expressions = {
  blink: {
    eyeBlinkLeft: 1,
    eyeBlinkRight: 1
  },
  smile: {
    eyeLookUpLeft: 0.2,
    eyeLookUpRight: 0.2,
    eyeSquintLeft: 0.2,
    eyeSquintRight: 0.2,
    jawOpen: 0.28,
    mouthClose: 0.1,
    mouthSmileLeft: 1,
    mouthSmileRight: 1,
    mouthShrugLower: 0.08,
    mouthPressLeft: 0.11,
    mouthPressRight: 0.11,
    browInnerUp: 0.2,
    cheekPuff: 0.5,
  },
  happy: {
    eyeLookUpLeft: 0.2,
    eyeLookUpRight: 0.2,
    eyeSquintLeft: 0.2,
    eyeSquintRight: 0.2,
    jawOpen: 0.28,
    mouthClose: 0.1,
    mouthSmileLeft: 1,
    mouthSmileRight: 1,
    mouthShrugLower: 0.08,
    mouthPressLeft: 0.11,
    mouthPressRight: 0.11,
    browInnerUp: 0.2,
    cheekPuff: 0.5,
  },
  surprised: {
    mouthSmileLeft: 0.5,
    mouthSmileRight: 0.5,
    jawOpen: 0.4,  
    eyeWideLeft: 0.45,
    eyeWideRight: 0.45,
    browOuterUpLeft: 0.6,
    browOuterUpRight: 0.6,
    browInnerUp: 0.9
  },
  happySurprised: {
    mouthSmileLeft: 0.9,
    mouthSmileRight: 0.9,
    jawOpen: 0.4,  
    eyeWideLeft: 1,
    eyeWideRight: 1,
    browOuterUpLeft: 0.6,
    browOuterUpRight: 0.6,
  },
  happySurprisedReverse: {
    eyeWideLeft: 1,
    eyeWideRight: 1,
    browOuterUpLeft: 0.6,
    browOuterUpRight: 0.6,
  },
  pleased: {
    eyeLookUpLeft: 0.1,
    eyeLookUpRight: 0.1,
    eyeSquintLeft: 0.15,
    eyeSquintRight: 0.15,
    jawOpen: 0.15,
    mouthClose: 0.05,
    mouthSmileLeft: 0.8,
    mouthSmileRight: 0.8,
    mouthShrugLower: 0.4,
    mouthPressLeft: 0.07,
    mouthPressRight: 0.07,
    browInnerUp: 0.15,
    cheekPuff: 0.3,
  },
  attentive: {
    eyeLookUpLeft: 0.15,
    eyeLookUpRight: 0.15,
    eyeWideLeft: 0.3,
    eyeWideRight: 0.3,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.4,
    mouthDimpleLeft: 0.4,
    mouthDimpleRight: 0.4,
    mouthSmileLeft: 0.8,
    mouthSmileRight: 0.8,
    mouthStretchLeft: 0.2,
    mouthStretchRight: 0.2,
    browInnerUp: 0.7,
    browOuterUpLeft: 0.15,
    browOuterUpRight: 0.15,
    cheekPuff: 0.3,
  },
  thoughtful: {
    eyeLookUpRight: 0.4,
    eyeLookUpLeft: 0.4,
    eyeSquintLeft: 0.9,
    eyeSquintRight: 0.9,
    mouthPucker: 0.35,
    mouthSmileLeft: 0.55,
    mouthSmileRight: 0.55,
    mouthShrugLower: 0.1, 
    mouthClose: 0.03,
    browDownLeft: 0.75,
    browDownRight: 0.75,
    browOuterUpLeft: 1,
    browOuterUpRight: 1,
    cheekSquintLeft: 0.5,
    cheekSquintRight: 0.5,
    mouthDimpleRight: 0.3,
    mouthDimpleLeft: 0.3,
    browInnerUp: 0.4
  },
  curious: {
    eyeLookUpLeft: 0.7,
    eyeLookUpRight: 0.7,
    mouthPressLeft: 0.5,
    mouthPressRight: 0.5,
    browInnerUp: 0.6,
    browOuterUpLeft: 0.4,
    browOuterUpRight: 0.4,
  },
  sad :{
    browDownLeft: 0.7,
    browDownRight: 0.7,
    browInnerUp: 1,
    mouthFrownLeft: 0.9,
    mouthFrownRight: 0.9
  },
  sad2: {
    eyeSquintLeft: 0.6,
    eyeSquintRight: 0.6,
    eyeLookDownLeft: 0.3,
    eyeLookDownRight: 0.3,
    mouthFrownLeft: 1,
    mouthFrownRight: 1,
    mouthDimpleLeft: 0.2,
    mouthDimpleRight: 0.2,
    mouthStretchLeft: 0.4,
    mouthStretchRight: 0.4,
    mouthShrugUpper: 0.6,
    mouthLowerDownLeft: 0.2,
    mouthLowerDownRight: 0.2,
    browDownLeft: 0.4,
    browDownRight: 0.4,
    browInnerUp: 0.5,
    cheekPuff: 0.15,
    cheekSquintLeft: 0.6,
    cheekSquintRight: 0.6,
  },
  smirkLeft: {
    eyeLookUpRight: 0.2,
    eyeLookUpLeft: 0.2,
    eyeSquintRight: 0.2,
    eyeSquintLeft: 0.2,
    mouthClose: 0.1,
    mouthPucker: 0.5,
    mouthLeft: 0.65,
    mouthSmileLeft: 0.45,
    mouthSmileRight: 0.08,
    mouthStretchRight: 0.05,
    mouthUpperUpLeft: 0.15,
    browDownLeft: 0.3,
    browInnerUp: 0.4,
    cheekSquintLeft: 0.5,
    noseSneerLeft: 0.2,
    jawLeft: 0.15,
  },
  smirkRight: {
    eyeLookUpRight: 0.2,
    eyeLookUpLeft: 0.2,
    eyeSquintRight: 0.2,
    eyeSquintLeft: 0.2,
    mouthClose: 0.1,
    mouthPucker: 0.5,
    mouthRight: 0.65,
    mouthSmileRight: 0.45,
    mouthSmileLeft: 0.08,
    mouthStretchLeft: 0.05,
    mouthUpperUpRight: 0.15,
    browDownRight: 0.3,
    browInnerUp: 0.4,
    cheekSquintRight: 0.5,
    noseSneerRight: 0.2,
    jawRight: 0.15,
  },
  delighted: {
    mouthFunnel: 1,
    mouthSmileLeft: 1,
    mouthSmileRight: 1,
    mouthDimpleLeft: 0.7,
    mouthDimpleRight: 0.7,
    mouthStretchLeft: 1,
    mouthStretchRight: 1,
    browInnerUp: 1,
    browOuterUpLeft: 0.3,
    browOuterUpRight: 0.3,
    cheekSquintLeft: 0.3,
    cheekSquintRight: 0.3,
    eyeSquintRight: 0.2,
    eyeSquintLeft: 0.2,
    noseSneerRight: 0.1,
    noseSneerLeft: 0.1,
    jawOpen: 0.2,
  },
  neutral: {
    eyeSquintRight: 0.25,
    eyeSquintLeft: 0.25,
    eyeLookUpRight: 0.2,
    eyeLookUpLeft: 0.2,
    jawOpen: 0.15,
    mouthRollLower: 0.15,
    mouthSmileLeft: 0.25,
    mouthSmileRight: 0.25,
    mouthDimpleLeft: 0.05,
    mouthDimpleRight: 0.05,
    mouthPressLeft: 0.35,
    mouthPressRight: 0.35,
    browInnerUp: 0.4,
  },
  lookUpRight: {
    eyeLookUpLeft: 0.9,
    eyeLookUpRight: 0.9,
    eyeLookInLeft: 0.9,
    eyeLookOutRight: 0.9,
    browInnerUp: 0.8,
    browOuterUpLeft: 0.8,
    browOuterUpRight: 0.8,
  },
  lookUpLeft: {
    eyeLookUpLeft: 0.9,
    eyeLookUpRight: 0.9,
    eyeLookOutLeft: 0.9,
    eyeLookInRight: 0.9,
    browInnerUp: 0.8,
    browOuterUpLeft: 0.8,
    browOuterUpRight: 0.8,
  },
  lookDownRight: {
    eyeLookDownLeft: 0.9,
    eyeLookDownRight: 0.9,
    eyeLookInLeft: 0.9,
    eyeLookOutRight: 0.9,
    eyeBlinkRight: 0.1,
    eyeBlinkLeft: 0.1,
  },
  lookDownLeft: {
    eyeLookDownLeft: 0.9,
    eyeLookDownRight: 0.9,
    eyeLookOutLeft: 0.9,
    eyeLookInRight: 0.9,
    eyeBlinkRight: 0.1,
    eyeBlinkLeft: 0.1,
  }, 
  playful: {
    eyeSquintLeft: 0.25,
    eyeSquintRight: 0.25,
    jawForward: 0.3,
    jawOpen: 0.4,
    mouthLeft: 0.25,
    mouthRight: 0.25,
    mouthSmileLeft: 0.5,
    mouthSmileRight: 0.5,
    mouthShrugLower: 0.1,
    mouthPressLeft: 0.1,
    mouthPressRight: 0.1,
    browInnerUp: 0.1,
    cheekPuff: 0.15,
    tongueOut: 0.8
  }
}
let pushing = false

// let blendShape = {'eyeBlinkLeft': 0, 'eyeLookDownLeft': 1, 'eyeLookInLeft': 2, 'eyeLookOutLeft': 3, 'eyeLookUpLeft': 4, 'eyeSquintLeft': 5, 'eyeWideLeft': 6, 'eyeBlinkRight': 7, 'eyeLookDownRight': 8, 'eyeLookInRight': 9, 'eyeLookOutRight': 10, 'eyeLookUpRight': 11, 'eyeSquintRight': 12, 'eyeWideRight': 13, 'jawForward': 14, 'jawLeft': 15, 'jawRight': 16, 'jawOpen': 17, 'mouthClose': 18, 'mouthFunnel': 19, 'mouthPucker': 20, 'mouthRight': 21, 'mouthLeft': 22, 'mouthSmileLeft': 23, 'mouthSmileRight': 24, 'mouthFrownRight': 25, 'mouthFrownLeft': 26, 'mouthDimpleLeft': 27, 'mouthDimpleRight': 28, 'mouthStretchLeft': 29, 'mouthStretchRight': 30, 'mouthRollLower': 31, 'mouthRollUpper': 32, 'mouthShrugLower': 33, 'mouthShrugUpper': 34, 'mouthPressLeft': 35, 'mouthPressRight': 36, 'mouthLowerDownLeft': 37, 'mouthLowerDownRight': 38, 'mouthUpperUpLeft': 39, 'mouthUpperUpRight': 40, 'browDownLeft': 41, 'browDownRight': 42, 'browInnerUp': 43, 'browOuterUpLeft': 44, 'browOuterUpRight': 45, 'cheekPuff': 46, 'cheekSquintLeft': 47, 'cheekSquintRight': 48, 'noseSneerLeft': 49, 'noseSneerRight': 50, 'tongueOut': 51, 'ae_ax_ah_01': 52, 'aa_02': 53, 'ao_03': 54, 'ey_eh_uh_04': 55, 'er_05': 56, 'y_iy_ih_ix_06': 57, 'w_uw_07': 58, 'ow_08': 59, 'aw_09': 60, 'oy_': 61, 'ay_11': 62, 
// 'h_12': 63, 'r_13': 64, 'l_14': 65, 's_z_15': 66, 'sh_ch_jh_zh_16': 67, 'th_dh_17': 68, 'f_v_18': 69, 'd_t_n_19': 70, 'k_g_ng_': 71, 'p_b_m_21': 72}

const blendShape = {
  browDownLeft: 0,
  browDownRight: 1,
  browInnerUp: 2,
  browOuterUpLeft: 3,
  browOuterUpRight: 4,
  cheekPuff: 5,
  cheekSquintLeft: 6,
  cheekSquintRight: 7,
  eyeBlinkLeft: 8,
  eyeBlinkRight: 9,
  eyeLookDownLeft: 10,
  eyeLookDownRight: 11,
  eyeLookInLeft: 12,
  eyeLookInRight: 13,
  eyeLookOutLeft: 14,
  eyeLookOutRight: 15,
  eyeLookUpLeft: 16,
  eyeLookUpRight: 17,
  eyeSquintLeft: 18,
  eyeSquintRight: 19,
  eyeWideLeft: 20,
  eyeWideRight: 21,
  jawForward: 22,
  jawLeft: 23,
  jawOpen: 24,
  jawRight: 25,
  mouthClose: 26,
  mouthClose_Substract: 27,
  mouthDimpleLeft: 28,
  mouthDimpleRight: 29,
  mouthFrownLeft: 30,
  mouthFrownRight: 31,
  mouthFunnel: 32,
  mouthLeft: 33,
  mouthLowerDownLeft: 34,
  mouthLowerDownRight: 35,
  mouthPressLeft: 36,
  mouthPressRight: 37,
  mouthPucker: 38,
  mouthRight: 39,
  mouthRollLower: 40,
  mouthRollUpper: 41,
  mouthShrugLower: 42,
  mouthShrugUpper: 43,
  mouthSmileLeft: 44,
  mouthSmileRight: 45,
  mouthStretchLeft: 46,
  mouthStretchRight: 47,
  mouthUpperUpLeft: 48,
  mouthUpperUpRight: 49,
  noseSneerLeft: 50,
  noseSneerRight: 51,
  tongueOut: 52}

let viseme_map = {
    "b": "p_b_m_21", "p": "p_b_m_21", "m": "p_b_m_21", "d": "d_t_n_19", "t": "d_t_n_19", "n": "d_t_n_19", "s": "s_z_15", "z": "s_z_15", "f": "f_v_18", "v": "f_v_18", "k": "k_g_ng_", "g": "k_g_ng_", "ŋ": "k_g_ng_", "i": "y_iy_ih_ix_06", "y": "y_iy_ih_ix_06", "r": "r_13", "u": "w_uw_07", "w": "w_uw_07", "E": "ey_eh_uh_04", "e": "ey_eh_uh_04", "A": "aa_02", "a": "aa_02", "O": "ao_03", "o": "ao_03", "e": "ae_ax_ah_01", "æ": "ae_ax_ah_01", "ʌ": "ae_ax_ah_01", "ɑ": "ae_ax_ah_01", "o": "ow_08", "ʊ": "ow_08", "sil": "mouthClose", "S": "s_z_15", "T": "d_t_n_19", "@":"ey_eh_uh_04"
}

let lipSyncRunning   = false
let currentAnimation = null
Cache.enabled        = true;

const DEFAULT_CAMERA = '[default]';

const MANAGER = new LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
const DRACO_LOADER = new DRACOLoader( MANAGER ).setDecoderPath( `${THREE_PATH}/examples/jsm/libs/draco/gltf/` );
const KTX2_LOADER = new KTX2Loader( MANAGER ).setTranscoderPath( `${THREE_PATH}/examples/jsm/libs/basis/` );

const IS_IOS = isIOS();

const Preset = {ASSET_GENERATOR: 'assetgenerator'};

Cache.enabled = true;

export class Viewer {

  constructor (el, options) {
    this.el = el;
    this.options = options;

    this.lights = [];
    this.content = null;
    this.mixer = null;
    this.clips = [];
    this.gui = null;

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

    this.backgroundColor = new Color(this.state.bgColor);

    this.scene = new Scene();
    this.scene.background = this.backgroundColor;

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
    this.addGUI();
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

    const baseURL = LoaderUtils.extractUrlBase(url);

    // Load.
    return new Promise((resolve, reject) => {

      // Intercept and override relative URLs.
      MANAGER.setURLModifier((url, path) => {

        // URIs in a glTF file may be escaped, or not. Assume that assetMap is
        // from an un-escaped source, and decode all URIs before lookups.
        // See: https://github.com/donmccurdy/three-gltf-viewer/issues/146
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

      const blobURLs = [];

      loader.load(url, (gltf) => {

        window.VIEWER.json = gltf;

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];

        if (!scene) {
          // Valid, but not supported by this viewer.
          throw new Error(
            'This model contains no scene, and cannot be viewed here. However,'
            + ' it may contain individual 3D resources.'
          );
        }

        this.setContent(scene, clips);

        blobURLs.forEach(URL.revokeObjectURL);

        // See: https://github.com/google/draco/issues/349
        // DRACOLoader.releaseDecoderModule();

        resolve(gltf);

      }, undefined, reject);

    });

  }

  /**
   * @param {THREE.Object3D} object
   * @param {Array<THREE.AnimationClip} clips
   */
  setContent ( object, clips ) {

    this.clear();

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
        // TODO(https://github.com/mrdoob/three.js/pull/18235): Clean up.
        node.material.depthWrite = !node.material.transparent;
      }
    });


    this.setClips(clips);

    this.updateLights();
    this.updateGUI();
    this.updateEnvironment();
    this.updateDisplay();

    window.VIEWER.scene = this.content;
    this.runExpression('happy', 10**10, 400)
  }


  async runExpression (expressionName, pause = 5000, duration = 400, nextExpressionName = null){
    let startValue = this.morphMeshes[0].morphTargetInfluences
    let expression = expressions[expressionName]
    
    if (this.currentExpression){ //kill the current running expression 
      this.killAnimation(this.currentExpression, expressionName)
    }
    this.currentExpression = expressionName // update the current running expression
  
    Object.keys(expression).forEach((v, i) => { //run the animation for the new expression
      this.animateMeshes(blendShape[v] , startValue[blendShape[v]] , expression[v], duration, false);
    })
    
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
      let expression     = name === "all"     ? Object.keys(blendShape).forEach((key) => obj[key] = 0) : expressions[name]
      let nextExpression = nextExpressionName ? expressions[nextExpressionName] : {}
      console.log(expression)
      const duration = 200
      Object.keys(expression).forEach((v, i) => { //run the animation for the new expression
        if (!nextExpression.includes(v)){
          this.animateMeshes(blendShape[v], startValue[blendShape[v]] , 0, duration, false);
        }
      })

    }
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

  updateEnvironment () {

    const environment = environments.filter((entry) => entry.name === this.state.environment)[0];

    this.getCubeMapTexture( environment ).then(( { envMap } ) => {

      this.scene.environment = envMap;
      this.scene.background = this.state.background ? envMap : this.backgroundColor;

    });

  }

  getCubeMapTexture ( environment ) {
    const { id, path } = environment;

    // neutral (THREE.RoomEnvironment)
    if ( id === 'neutral' ) {

      return Promise.resolve( { envMap: this.neutralEnvironment } );

    }

    // none
    if ( id === '' ) {

      return Promise.resolve( { envMap: null } );

    }

    return new Promise( ( resolve, reject ) => {

      new EXRLoader()
        .load( path, ( texture ) => {

          const envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;
          this.pmremGenerator.dispose();

          resolve( { envMap } );

        }, undefined, reject );

    });

  }

  updateDisplay () {
    if (this.skeletonHelpers.length) {
      this.skeletonHelpers.forEach((helper) => this.scene.remove(helper));
    }

    traverseMaterials(this.content, (material) => {
      material.wireframe = this.state.wireframe;
    });

    this.content.traverse((node) => {
      if (node.isMesh && node.skeleton && this.state.skeleton) {
        const helper = new SkeletonHelper(node.skeleton.bones[0].parent);
        helper.material.linewidth = 3;
        this.scene.add(helper);
        this.skeletonHelpers.push(helper);
      }
    });

    if (this.state.grid !== Boolean(this.gridHelper)) {
      if (this.state.grid) {
        this.gridHelper = new GridHelper();
        this.axesHelper = new AxesHelper();
        this.axesHelper.renderOrder = 999;
        this.axesHelper.onBeforeRender = (renderer) => renderer.clearDepth();
        this.scene.add(this.gridHelper);
        this.scene.add(this.axesHelper);
      } else {
        this.scene.remove(this.gridHelper);
        this.scene.remove(this.axesHelper);
        this.gridHelper = null;
        this.axesHelper = null;
        this.axesRenderer.clear();
      }
    }
  }

  updateBackground () {

    this.backgroundColor.setHex(this.state.bgColor);

  }

  /**
   * Adds AxesHelper.
   *
   * See: https://stackoverflow.com/q/16226693/1314762
   */
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

  addGUI () {

    const gui = this.gui = new GUI({autoPlace: false, width: 450, hideable: true});
    // Display controls.
    const dispFolder = gui.addFolder('Display');
    const envBackgroundCtrl = dispFolder.add(this.state, 'background');
    envBackgroundCtrl.onChange(() => this.updateEnvironment());

    const wireframeCtrl = dispFolder.add(this.state, 'wireframe');
    wireframeCtrl.onChange(() => this.updateDisplay());
    const skeletonCtrl = dispFolder.add(this.state, 'skeleton');
    skeletonCtrl.onChange(() => this.updateDisplay());
    const gridCtrl = dispFolder.add(this.state, 'grid');
    gridCtrl.onChange(() => this.updateDisplay());
    dispFolder.add(this.controls, 'screenSpacePanning');
    const bgColorCtrl = dispFolder.addColor(this.state, 'bgColor');
    bgColorCtrl.onChange(() => this.updateBackground());

    // Lighting controls.
    const lightFolder = gui.addFolder('Lighting');
    const envMapCtrl = lightFolder.add(this.state, 'environment', environments.map((env) => env.name));
    envMapCtrl.onChange(() => this.updateEnvironment());
    [
      lightFolder.add(this.state, 'toneMapping', {Linear: LinearToneMapping, 'ACES Filmic': ACESFilmicToneMapping}),
      lightFolder.add(this.state, 'exposure', -10, 10, 0.01),
      lightFolder.add(this.state, 'punctualLights').listen(),
      lightFolder.add(this.state, 'ambientIntensity', 0, 2),
      lightFolder.addColor(this.state, 'ambientColor'),
      lightFolder.add(this.state, 'directIntensity', 0, 4), // TODO(#116)
      lightFolder.addColor(this.state, 'directColor')
    ].forEach((ctrl) => ctrl.onChange(() => this.updateLights()));

    // Animation controls.
    this.animFolder = gui.addFolder('Animation');
    this.animFolder.domElement.style.display = 'none';
    const playbackSpeedCtrl = this.animFolder.add(this.state, 'playbackSpeed', 0, 1);
    playbackSpeedCtrl.onChange((speed) => {
      if (this.mixer) this.mixer.timeScale = speed;
    });
    this.animFolder.add({playAll: () => this.playAllClips()}, 'playAll');

    // Morph target controls.
    this.morphFolder = gui.addFolder('Morph Targets');
    this.morphFolder.domElement.style.display = 'none';

    // Camera controls.
    this.cameraFolder = gui.addFolder('Cameras');
    this.cameraFolder.domElement.style.display = 'none';

    // Stats.
    const perfFolder = gui.addFolder('Performance');
    const perfLi = document.createElement('li');
    this.stats.dom.style.position = 'static';
    perfLi.appendChild(this.stats.dom);
    perfLi.classList.add('gui-stats');
    perfFolder.__ul.appendChild( perfLi );

    const guiWrap = document.createElement('div');
    this.el.appendChild( guiWrap );
    guiWrap.classList.add('gui-wrap');
    guiWrap.appendChild(gui.domElement);
    gui.open();


  }

  async animateMeshes(blendShapeIndex, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
    await Promise.all(this.morphMeshes.map((morphMesh, i) => {
      if (i !== this.morphMeshes.length - 1) {
        return this.animateMorphTarget(i, blendShapeIndex, startValue, endValue, duration, finalValue, interp);
      }
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

  updateGUI () {
    this.cameraFolder.domElement.style.display = 'none';

    this.morphCtrls.forEach((ctrl) => ctrl.remove());
    this.morphCtrls.length = 0;
    this.morphFolder.domElement.style.display = 'none';

    this.animCtrls.forEach((ctrl) => ctrl.remove());
    this.animCtrls.length = 0;
    this.animFolder.domElement.style.display = 'none';

    const cameraNames = [];
    this.morphMeshes = [];
    this.content.traverse((node) => {
      if (node.isMesh && node.morphTargetInfluences) {
        this.morphMeshes.push(node);
      }
      if (node.isCamera) {
        node.name = node.name || `VIEWER__camera_${cameraNames.length + 1}`;
        cameraNames.push(node.name);
      }
    });

    if (cameraNames.length) {
      this.cameraFolder.domElement.style.display = '';
      if (this.cameraCtrl) this.cameraCtrl.remove();
      const cameraOptions = [DEFAULT_CAMERA].concat(cameraNames);
      this.cameraCtrl = this.cameraFolder.add(this.state, 'camera', cameraOptions);
      this.cameraCtrl.onChange((name) => this.setCamera(name));
    }
    if (this.morphMeshes.length) {
      this.morphFolder.domElement.style.display = '';
      this.morphMeshes.forEach((mesh, meshIndex) => {
        if (mesh.morphTargetInfluences.length) {
          const nameCtrl = this.morphFolder.add({name: mesh.name || 'Untitled'}, 'name');
          this.morphCtrls.push(nameCtrl);
        }
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          const ctrl = this.morphFolder.add(mesh.morphTargetInfluences, i, 0, 1, 0.01).listen();
          Object.keys(mesh.morphTargetDictionary).forEach((key) => {
            if (key && mesh.morphTargetDictionary[key] === i) ctrl.name(key);
          });
          this.morphCtrls.push(ctrl);
          // const newExpression = []
  
          // Update blend shapes for all other meshes when mesh 0 is updated
          if (meshIndex === 0) {
            ctrl.onChange((value) => {
              for (let j = 1; j < this.morphMeshes.length - 1; j++) {
                this.morphMeshes[j].morphTargetInfluences[i] = value;
              }
            });
          }

        }
      });

    }

    if (this.clips.length) {
      this.animFolder.domElement.style.display = '';
      const actionStates = this.state.actionStates = {};
      this.clips.forEach((clip, clipIndex) => {
        clip.name = `${clipIndex + 1}. ${clip.name}`;

        // Autoplay the first clip.
        let action;
        if (clipIndex === 0) {
          actionStates[clip.name] = true;
          action = this.mixer.clipAction(clip);
          action.play();
        } else {
          actionStates[clip.name] = false;
        }

        // Play other clips when enabled.
        const ctrl = this.animFolder.add(actionStates, clip.name).listen();
        ctrl.onChange((playAnimation) => {
          action = action || this.mixer.clipAction(clip);
          action.setEffectiveTimeScale(1);
          playAnimation ? action.play() : action.stop();
        });
        this.animCtrls.push(ctrl);
      });
    }
  }

  clear () {

    if ( !this.content ) return;

    this.scene.remove( this.content );

    // dispose geometry
    this.content.traverse((node) => {

      if ( !node.isMesh ) return;

      node.geometry.dispose();

    } );

    // dispose textures
    traverseMaterials( this.content, (material) => {

      for ( const key in material ) {

        if ( key !== 'envMap' && material[ key ] && material[ key ].isTexture ) {

          material[ key ].dispose();

        }

      }

    } );

  }

};

function traverseMaterials (object, callback) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}

// https://stackoverflow.com/a/9039885/1314762
function isIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function easeOutQuart(start, end, t) {
  t = 1-t
  return end * (1 - t ** 4) + start * t ** 4
}