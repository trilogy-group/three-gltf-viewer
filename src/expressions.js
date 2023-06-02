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


  export class Expressions {
    constructor (morphMeshes) {
        this.currentExpressionName = null
        this.expressions = expressions
        this.morphMeshes = morphMeshes
        this.blendshape  = {'eyeBlinkLeft': 0, 'eyeLookDownLeft': 1, 'eyeLookInLeft': 2, 'eyeLookOutLeft': 3, 'eyeLookUpLeft': 4, 'eyeSquintLeft': 5, 'eyeWideLeft': 6, 'eyeBlinkRight': 7, 'eyeLookDownRight': 8, 'eyeLookInRight': 9, 'eyeLookOutRight': 10, 'eyeLookUpRight': 11, 'eyeSquintRight': 12, 'eyeWideRight': 13, 'jawForward': 14, 'jawLeft': 15, 'jawRight': 16, 'jawOpen': 17, 'mouthClose': 18, 'mouthFunnel': 19, 'mouthPucker': 20, 'mouthRight': 21, 'mouthLeft': 22, 'mouthSmileLeft': 23, 'mouthSmileRight': 24, 'mouthFrownRight': 25, 'mouthFrownLeft': 26, 'mouthDimpleLeft': 27, 'mouthDimpleRight': 28, 'mouthStretchLeft': 29, 'mouthStretchRight': 30, 'mouthRollLower': 31, 'mouthRollUpper': 32, 'mouthShrugLower': 33, 'mouthShrugUpper': 34, 'mouthPressLeft': 35, 'mouthPressRight': 36, 'mouthLowerDownLeft': 37, 'mouthLowerDownRight': 38, 'mouthUpperUpLeft': 39, 'mouthUpperUpRight': 40, 'browDownLeft': 41, 'browDownRight': 42, 'browInnerUp': 43, 'browOuterUpLeft': 44, 'browOuterUpRight': 45, 'cheekPuff': 46, 'cheekSquintLeft': 47, 'cheekSquintRight': 48, 'noseSneerLeft': 49, 'noseSneerRight': 50, 'tongueOut': 51, 'ae_ax_ah_01': 52, 'aa_02': 53, 'ao_03': 54, 'ey_eh_uh_04': 55, 'er_05': 56, 'y_iy_ih_ix_06': 57, 'w_uw_07': 58, 'ow_08': 59, 'aw_09': 60, 'oy_': 61, 'ay_11': 62, 
        'h_12': 63, 'r_13': 64, 'l_14': 65, 's_z_15': 66, 'sh_ch_jh_zh_16': 67, 'th_dh_17': 68, 'f_v_18': 69, 'd_t_n_19': 70, 'k_g_ng_': 71, 'p_b_m_21': 72}
    }
  randomFacialMovements(morphMeshes, blendShape){
    let startValue = morphMeshes[0].morphTargetInfluences
    
    const randomMovements = [["browDownLeft", "browDownRight"], ["browInnerUp"], ["browOuterUpLeft", "browOuterUpRight"], ["cheekSquintLeft", "cheekSquintRight"], ["noseSneerLeft", "noseSneerRight"]]                         
    const randomMovement = randomMovements[Math.floor(Math.random() * randomMovements.length)];
  
    for (let i = 0; i < randomMovement.length; i ++){
      const move = randomMovement[i]
      this.animateMeshes(morphMeshes, blendShape[move], startValue[blendShape[move]], 1, 250, startValue[blendShape[move]]);
    }
  }
  
  
  randomEyeMovements(morphMeshes, blendShape, reverse = false, motionType = false){
    const randomMovementPairs = {"lookUpRight"  : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookInLeft", "eyeLookOutRight"],
                                 "lookUpLeft"   : ["eyeLookUpLeft", "eyeLookUpRight", "eyeLookOutLeft", "eyeLookInRight"],
                                 "lookRight"    : ["eyeLookInLeft", "eyeLookOutRight"],
                                 "lookLeft"     : ["eyeLookOutLeft", "eyeLookInRight"],
                                 "lookDownRight": ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookInLeft", "eyeLookOutRight"],
                                 "lookDownLeft" : ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight"],
                                }
  
    const lookStrightBlendshapes = ["eyeLookDownLeft", "eyeLookDownRight", "eyeLookOutLeft", "eyeLookInRight", "eyeLookInLeft", "eyeLookOutRight", "eyeLookUpLeft", "eyeLookUpRight"]
  
    const motion       = motionType ? motionType : Object.keys(randomMovementPairs)[Math.floor(Math.random() * Object.keys(randomMovementPairs).length)]
    const motionShapes = reverse ? []  : randomMovementPairs[motion];
  
    for (let i= 0; i < lookStrightBlendshapes.length; i++) {
      let startValue = morphMeshes[0].morphTargetInfluences[blendShape[lookStrightBlendshapes[i]]]
      let endValue   = motionShapes.includes(lookStrightBlendshapes[i]) ? 1 : 0
      endValue = reverse ? 0 : endValue
      if (startValue!==endValue) {
        this.animateMeshes(morphMeshes, blendShape[lookStrightBlendshapes[i]], startValue, endValue, 600, false);
      }
    }
  }
  
  async executeRandomEyeMovements(morphMeshes, blendShape, n, pause = 1200) {
    await new Promise((resolve) => setTimeout(resolve, pause));
    for (let i = 0; i < n; i++) {
      randomEyeMovements(morphMeshes, blendShape);
      await new Promise((resolve) => setTimeout(resolve, pause));
    }
    randomEyeMovements(morphMeshes, blendShape, true);
  }
  
  async sad(morphMeshes, blendShape){
    this.currentExpressionName = 'sad'
    console.log('run sad')
  
    let startValue = morphMeshes[0].morphTargetInfluences
    runSad(false)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.animateMeshes(morphMeshes, blendShape["noseSneerLeft"], startValue[blendShape["noseSneerLeft"]], 0.8, 300, 0);
    this.animateMeshes(morphMeshes, blendShape["noseSneerRight"], startValue[blendShape["noseSneerRight"]], 0.8, 300, 0);
  
    function runSad(reverse){
      console.log('runsad')
      let expression = this.expressions.sad
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  curious(morphMeshes, blendShape){
    this.currentExpressionName = 'curious'
    console.log('run curious')
  
    runCurious(false)
    function runCurious(reverse){
      let startValue = morphMeshes[0].morphTargetInfluences
      let expression = this.expressions.curious
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  thoughtful(morphMeshes, blendShape){
    this.currentExpressionName = 'thoughtful'
    console.log('run thoughtful')
  
    runThoughtful(false)
  
    async function runThoughtful(reverse){ 
  
      let startValue = morphMeshes[0].morphTargetInfluences
      let expression = this.expressions.thoughtful
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
  
      randomEyeMovements(morphMeshes, blendShape, false, "lookUpRight")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      blink(morphMeshes, blendShape)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      randomEyeMovements(morphMeshes, blendShape, false, "lookUpLeft")
      blink(morphMeshes, blendShape)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      randomEyeMovements(morphMeshes, blendShape, true, "lookUpLeft")
  
    }
  }
  
  async attentive(morphMeshes, blendShape, lipsing = false, timeout = 2000){
    this.currentExpressionName = 'attentive'
    console.log('run attentive')

    runAttentive(false)
    await new Promise((resolve) => setTimeout(resolve, timeout))
    neutral(morphMeshes, blendShape)
  
    function runAttentive(reverse){
      let startValue = morphMeshes[0].morphTargetInfluences
      let expression = this.expressions.attentive
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  
  }
  
  
  async pleased(morphMeshes, blendShape, pause = 2500){
    this.currentExpressionName = 'pleased'
    console.log('run pleased')

    runPleased(false)
    await new Promise((resolve) => setTimeout(resolve, pause))
    runPleased(true)
  
    function runPleased(reverse){
      let startValue = morphMeshes[0].morphTargetInfluences
      let expression = this.expressions.pleased
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  
  async happySurprise(morphMeshes, blendShape){
    this.currentExpressionName = 'happySurprise'
    console.log('run happysurprise')
  
    let startValue = morphMeshes[0].morphTargetInfluences
  
    runHappySurprise(false)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    runHappySurprise(true)
    smile(morphMeshes, blendShape, false, 2000)
  
    function runHappySurprise(reverse){
      if (reverse){
        let expression = this.expressions.happySurpriseReverse
        for (let i = 0; i < expression.length; i ++) {
          const obj = expression[i]
          this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
        }
      }
      else {
        let expression = this.expressions.happySurprise
        for (let i = 0; i < expression.length; i ++) {
          const obj = expression[i]
          this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
        }
      }
    }
     
  }
  
  async smile(morphMeshes, blendShape, lipsing = true, pause = 2000){
    this.currentExpressionName = 'smile'
    console.log('run smile')
  
    let startValue = morphMeshes[0].morphTargetInfluences
  
    let duration = 200
    runSmile(false)
    await new Promise((resolve) => setTimeout(resolve, pause))
    runSmile(true)
    neutral(morphMeshes, blendShape)
  
    function runSmile(reverse){
      let expression = this.expressions.smile
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  async smile2(morphMeshes, blendShape, lipsing = true, pause = 2000){
    this.currentExpressionName = 'smile2'
    console.log('run smile2')
  
    let startValue = morphMeshes[0].morphTargetInfluences
  
    let duration = 200
    runSmile2(false)
    await new Promise((resolve) => setTimeout(resolve, pause))
    runSmile2(true)
    neutral(morphMeshes, blendShape)
  
    function runSmile2(reverse){
      let expression = this.expressions.smile2
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  async delighted(morphMeshes, blendShape, lipsing = false, pause = 1500){
    console.log('run delighted')
    this.currentExpressionName = 'delighted'
  
    let startValue = morphMeshes[0].morphTargetInfluences
  
    runDelighted(false)
    await new Promise((resolve) => setTimeout(resolve, pause))
    runDelighted(true)
    smile(morphMeshes, blendShape, false, 2000)
  
    function runDelighted(reverse){
      let expression = this.expressions.delighted
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue : 0, 400, false);
      }
    }
  }
  
  neutral(morphMeshes, blendShape, reverse = false){
    this.currentExpressionName = 'neutral'

    console.log('run neutral')
  
    let startValue = morphMeshes[0].morphTargetInfluences
    runNeutral(reverse)
  
    function runNeutral(reverse){
      let expression = this.expressions.neutral
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , !reverse ? obj.endValue: 0, 200, false);
      }
    }
  }
  
  async smirk(morphMeshes, blendShape, lipsing = true, pause = 2000){
    this.currentExpressionName = 'smirk'
    console.log('run smirk')
  
    let startValue = morphMeshes[0].morphTargetInfluences
    let duration = 500
    const change = Math.random() > 0.5;
    runSmirk(false)
    await new Promise((resolve) => setTimeout(resolve, pause))
    runSmirk(true)
    neutral(morphMeshes, blendShape)
  
    function runSmirk(reverse){
      let expression = this.expressions.smirk
      for (let i = 0; i < expression.length; i ++) {
        const shape = change ? expression[i].shape.replace("Left", "temp").replace("Right", "Left").replace("temp", "Right") : expression[i].shape
        this.animateMeshes(morphMeshes, blendShape[shape] , startValue[blendShape[shape]] , !reverse ? expression[i].endValue : 0, duration, false);
      }
    }
  }
  
  killAnimation(morphMeshes, blendShape, currentExpressionName, nextExpressionName = ""){
    if (currentExpressionName) {
      let startValue     = morphMeshes[0].morphTargetInfluences
      let expression     = this.expressions[currentExpressionName]
      let nextExpression = this.expressions[nextExpressionName]
        
      const duration = 200
      for (let i = 0; i < expression.length; i ++) {
        const obj = expression[i]
        if (nextExpression !== "" && nextExpression.includes(obj.shape)){
          continue
        }
        this.animateMeshes(morphMeshes, blendShape[obj.shape] , startValue[blendShape[obj.shape]] , 0, duration, false);
      }
      if (!nextExpression){
        console.log("animation killed without next expression")
        this.currentExpressionName = null
      }
      return true
    }
  }
  
  blink(morphMeshes, blendShape){
    let startValue = morphMeshes[0].morphTargetInfluences
    runBlink(morphMeshes, blendShape)
    async function runBlink(morphMeshes, blendShape) {
      if (Math.random() < 0.5){
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 200, 0);
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 200, 0);
      }else { //blink twice
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
        await new Promise((resolve) => setTimeout(resolve, 300))
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkLeft"], startValue[blendShape["eyeBlinkLeft"]], 1, 150, 0),
        this.animateMeshes(morphMeshes, blendShape["eyeBlinkRight"], startValue[blendShape["eyeBlinkRight"]], 1, 150, 0)
      }
    }
  }

  async animateMeshes(morphMeshes, blendShapeValue, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
    await Promise.all(morphMeshes.map((morphMesh) => {
      return this.animateMorphTarget(morphMesh,  blendShapeValue, startValue, endValue, duration, finalValue, interp);
    }));
  }
  
  animateMorphTarget(mesh, index, startValue, endValue, duration, finalValue = false, interp = 'lerp') {
    if (startValue === endValue){
      return
    }
    const startTime = performance.now();
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
      }
    const update = ()=> {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
        console.log("aaaa")
      const currentValue = interp === 'lerp' ? this.lerp(startValue, endValue, progress) : this.easeOutQuart(startValue, endValue, progress)
      mesh.morphTargetInfluences[index] = currentValue;
  
      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (finalValue !== false) {
        // Reverse the animation by swapping startValue and endValue
        this.animateMorphTarget(mesh, index, endValue, finalValue, duration, false);
        // mesh.morphTargetInfluences[index] = startValue;
      }
    }
  
    update();
  }

  lerp(start, end, t) {
    console.log("leeerp")
    return start * (1 - t) + end * t;
  }
  
  easeOutQuart(start, end, t) {
    t = 1-t
    return end * (1 - t ** 4) + start * t ** 4
  }
  
  easeOutExpo(start, end, t){
    return start * (1 - Math.pow(2, -10 * t)) + end * Math.pow(2, -10 * t);
  }

}