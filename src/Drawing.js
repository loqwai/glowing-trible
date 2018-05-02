import * as BABYLON from 'babylonjs'
import bindAll from 'lodash/fp/bindAll'
import first from 'lodash/fp/first'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'

import Creature3D from './Creature3D'
import GenerateSuitors from './logic/GenerateSuitors'
import TweenMorph from './helpers/TweenMorph'
import PingPongMorph from './helpers/PingPongMorph'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  Creature3D: {
    flex: 1,
  },
}

class Drawing extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Drawing.prototype), this)
    this.state = {}
    const rotMin = Math.PI / 4
    const rotMax = rotMin + rotMin
    this.morphs = {
      rotation: new PingPongMorph({ min: rotMin, max: rotMax, steps: 1000 }),
      cheeks: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      chin: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      ears: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      eyes: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      colors: {
        skin: {
          red: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          green: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          blue: new TweenMorph({ from: 0, to: 0, steps: 100 }),
        },
        nose: {
          red: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          green: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          blue: new TweenMorph({ from: 0, to: 0, steps: 100 }),
        },
        ears: {
          red: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          green: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          blue: new TweenMorph({ from: 0, to: 0, steps: 100 }),
        },
        eyes: {
          red: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          green: new TweenMorph({ from: 0, to: 0, steps: 100 }),
          blue: new TweenMorph({ from: 0, to: 0, steps: 100 }),
        },
      },
    }
    this.initialize()
  }

  initialize = async () => {
    const [creature] = await GenerateSuitors(1)
    const { head } = creature.genome
    this.morphs = {
      ...this.morphs,
      cheeks: this.morphs.cheeks.newTo(head.cheeks),
      chin: this.morphs.chin.newTo(head.chin),
      ears: this.morphs.ears.newTo(head.ears),
      eyes: this.morphs.eyes.newTo(head.eyes.position),
      colors: {
        skin: {
          red: this.morphs.colors.skin.red.newTo(head.colors[0].red),
          green: this.morphs.colors.skin.green.newTo(head.colors[0].green),
          blue: this.morphs.colors.skin.blue.newTo(head.colors[0].blue),
        },
        nose: {
          red: this.morphs.colors.nose.red.newTo(head.colors[1].red),
          green: this.morphs.colors.nose.green.newTo(head.colors[1].green),
          blue: this.morphs.colors.nose.blue.newTo(head.colors[1].blue),
        },
        ears: {
          red: this.morphs.colors.ears.red.newTo(head.colors[2].red),
          green: this.morphs.colors.ears.green.newTo(head.colors[2].green),
          blue: this.morphs.colors.ears.blue.newTo(head.colors[2].blue),
        },
        eyes: {
          red: this.morphs.colors.eyes.red.newTo(head.colors[3].red),
          green: this.morphs.colors.eyes.green.newTo(head.colors[3].green),
          blue: this.morphs.colors.eyes.blue.newTo(head.colors[3].blue),
        },
      },
    }
    this.setState({ creature })
    setTimeout(this.initialize, 3000)
  }

  onResizeCanvas = () => {
    if (!this.engine) return
    this.engine.resize()
  }

  componentWillMount = () => {
    window.addEventListener('resize', this.onResizeCanvas)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResizeWindow)
  }

  onCanvasLoaded = canvas => {
    if (!canvas) return
    if (this.canvas) return

    this.canvas = canvas
    this.setupBabylon()
  }

  onEmptyDivLoaded = ref => {
    if (ref === null) return

    this.setState({
      height: ref.clientHeight,
      width: ref.clientWidth,
    })
  }

  setupBabylon() {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio)
    const rootURL = `${process.env.PUBLIC_URL}/models/`
    BABYLON.SceneLoader.Load(rootURL, 'fox.babylon', this.engine, scene => {
      scene.clearColor = new BABYLON.Color3(1.0, 1.0, 1.0)
      scene.ambientColor = new BABYLON.Color3(1.0, 1.0, 1.0)
      window.scene = scene

      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
      light.intensity = 0.7

      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(this.canvas, true)

      this.scene = scene
      this.engine.runRenderLoop(this.renderDrawing)
    })
  }

  renderDrawing() {
    const { morphs, scene } = this
    if (!morphs) return
    if (!scene) return

    const mesh = first(scene.meshes)
    const morphTargetManager = mesh.morphTargetManager

    mesh.rotation.y = morphs.rotation.nextValue()
    morphTargetManager.influences[0] = morphs.cheeks.nextValue()
    morphTargetManager.influences[1] = morphs.ears.nextValue()
    morphTargetManager.influences[2] = morphs.chin.nextValue()
    morphTargetManager.influences[3] = morphs.eyes.nextValue()

    const { skin, nose, ears, eyes } = morphs.colors
    const [mSkin, mNose, mEars, mEyes] = scene.materials
    mSkin.ambientColor = new BABYLON.Color3(skin.red.nextValue(), skin.green.nextValue(), skin.blue.nextValue())
    mNose.ambientColor = new BABYLON.Color3(nose.red.nextValue(), nose.green.nextValue(), nose.blue.nextValue())
    mEars.ambientColor = new BABYLON.Color3(ears.red.nextValue(), ears.green.nextValue(), ears.blue.nextValue())
    mEyes.ambientColor = new BABYLON.Color3(eyes.red.nextValue(), eyes.green.nextValue(), eyes.blue.nextValue())
    scene.render()
  }

  render() {
    const { classes } = this.props
    const { creature, height, width } = this.state

    if (!width || !height || !creature) return <div className={classes.root} ref={this.onEmptyDivLoaded} />

    /* <canvas className={classes.root} width={width} height={height} ref={this.onCanvasLoaded} /> */
    return (
      <div className={classes.root}>
        <Creature3D className={classes.Creature3D} genome={creature.genome} />
      </div>
    )
  }
}
export default withStyles(styles)(Drawing)
