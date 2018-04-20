import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import bindAll from 'lodash/fp/bindAll'
import curry from 'lodash/fp/curry'
import first from 'lodash/fp/first'
import GenerateSuitors from './logic/GenerateSuitors'
import TweenMorph from './helpers/TweenMorph'

import * as BABYLON from 'babylonjs'

const styles = {
  root: {
    flex: 1,
  },
}

const wrap = curry((min, max, n) => {
  if (n > max) return min
  if (n < min) return max
  return n
})

const ROTATION_SPEED = Math.PI / 1000

const wrapRotation = wrap(-1 * Math.PI, Math.PI)

class Drawing extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Drawing.prototype), this)
    this.state = {}
    this.morphs = {
      cheeks: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      chin: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      ears: new TweenMorph({ from: 0, to: 0, steps: 100 }),
      eyes: new TweenMorph({ from: 0, to: 0, steps: 100 }),
    }
    this.initialize()
  }

  initialize = async () => {
    const [creature] = await GenerateSuitors(1)
    this.creature = creature
    const { head } = creature.genome
    this.morphs.cheeks = this.morphs.cheeks.newTo(head.cheeks)
    this.morphs.chin = this.morphs.chin.newTo(head.chin)
    this.morphs.ears = this.morphs.ears.newTo(head.ears)
    this.morphs.eyes = this.morphs.eyes.newTo(head.eyes.position)
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
      // window.scene = scene

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
    if (!scene) return

    const mesh = first(scene.meshes)
    const morphTargetManager = mesh.morphTargetManager

    mesh.rotation.y = wrapRotation(mesh.rotation.y + ROTATION_SPEED)
    morphTargetManager.influences[0] = morphs.cheeks.nextValue()
    morphTargetManager.influences[1] = morphs.ears.nextValue()
    morphTargetManager.influences[2] = morphs.chin.nextValue()
    morphTargetManager.influences[3] = morphs.eyes.nextValue()
    scene.render()
  }

  render() {
    const { classes } = this.props
    const { width, height } = this.state

    if (!width || !height) return <div className={classes.root} ref={this.onEmptyDivLoaded} />

    return <canvas className={classes.root} width={width} height={height} ref={this.onCanvasLoaded} />
  }
}
export default withStyles(styles)(Drawing)
