import * as BABYLON from 'babylonjs'
import bindAll from 'lodash/fp/bindAll'
import first from 'lodash/fp/first'
import isEmpty from 'lodash/fp/isEmpty'
import isNil from 'lodash/fp/isNil'
import join from 'lodash/fp/join'
import merge from 'lodash/fp/merge'
import noop from 'lodash/fp/noop'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'

import PingPongMorph from '../helpers/PingPongMorph'

const joinClasses = join(' ')

const styles = ({ vOffset }) => ({
  canvas: {
    position: 'absolute',
  },
  div: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})

const offset = Math.PI / 2
const rotationAmount = Math.PI / 4
const maxRotation = offset + rotationAmount
const minRotation = offset - rotationAmount

class Creature3D extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Creature3D.prototype), this)
    this.state = {}
    this.rotator = new PingPongMorph({ min: minRotation, max: maxRotation, steps: 500 })
  }

  componentWillMount = () => {
    window.addEventListener('resize', this.onResizeCanvas)
  }

  onCanvasLoaded = canvas => {
    if (!canvas) return
    if (this.canvas) return

    this.canvas = canvas
    this.setupBabylon()
  }

  onDivLoaded = ref => {
    if (!ref) return
    this.setState({
      height: ref.clientHeight,
      width: ref.clientWidth,
    })
  }

  onResizeCanvas = () => {
    if (!this.engine) return
    this.engine.resize()
  }

  setupBabylon() {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio)
    this.engine.loadingScreen = new LoadingScreen()
    const rootURL = `${process.env.PUBLIC_URL}/models/`
    BABYLON.SceneLoader.Load(rootURL, 'fox.babylon', this.engine, scene => {
      scene.clearColor = new BABYLON.Color4(0.98, 0.98, 0.98, 0.0)
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
    const { scene } = this
    const genome = this.props.genome
    if (!scene || !genome) return
    const { head } = genome

    window.scene = scene
    const mesh = first(scene.meshes)
    const morphTargetManager = mesh.morphTargetManager
    mesh.rotation.y = this.rotator.nextValue()

    morphTargetManager.influences[0] = genome.body.power
    morphTargetManager.influences[1] = genome.arms.power
    morphTargetManager.influences[2] = genome.legs.power
    morphTargetManager.influences[3] = head.cheeks
    morphTargetManager.influences[4] = head.ears
    morphTargetManager.influences[5] = head.chin

    const [skin, nose, ears, eyes] = head.colors
    const [mSkin, mNose, mEars, mEyes] = scene.materials
    mSkin.ambientColor = new BABYLON.Color3(skin.red, skin.green, skin.blue)
    mNose.ambientColor = new BABYLON.Color3(nose.red, nose.green, nose.blue)
    mEars.ambientColor = new BABYLON.Color3(ears.red, ears.green, ears.blue)
    mEyes.ambientColor = new BABYLON.Color3(eyes.red, eyes.green, eyes.blue)
    scene.render()
  }

  render() {
    const { classes, className, genome, onClick } = this.props
    const { height, width } = this.state
    const divClassName = joinClasses([classes.div, className])

    if (isNil(height) || isNil(width) || isEmpty(genome)) return <div className={divClassName} ref={this.onDivLoaded} />

    return (
      <div className={divClassName} onClick={onClick || noop}>
        <canvas width={width} height={height} ref={this.onCanvasLoaded} className={classes.canvas} />
      </div>
    )
  }
}

class LoadingScreen {
  displayLoadingUI = () => {}
  hideLoadingUI = () => {}
}

export default withStyles(styles)(Creature3D)
