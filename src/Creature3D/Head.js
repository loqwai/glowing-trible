import * as BABYLON from 'babylonjs'
import bindAll from 'lodash/fp/bindAll'
import first from 'lodash/fp/first'
import isNil from 'lodash/fp/isNil'
import join from 'lodash/fp/join'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'

const joinClasses = join(' ')

const styles = ({ vOffset }) => ({
  canvas: {
    position: 'absolute',
    height: '50%',
    width: '50%',
  },
  div: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})

class Head extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Head.prototype), this)
    this.state = { height: 0, width: 0 }
  }

  componentWillMount = () => {
    window.addEventListener('resize', this.onResizeCanvas)
  }

  onCanvasLoaded = canvas => {
    if (!canvas) return
    this.setState({
      height: canvas.clientHeight,
      width: canvas.clientWidth,
    })
    if (this.canvas) return

    this.canvas = canvas
    this.setupBabylon()
  }

  onResizeCanvas = () => {
    console.log('onResizeCanvas')
    if (!this.engine) return
    this.engine.resize()
  }

  setupBabylon() {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio)
    const rootURL = `${process.env.PUBLIC_URL}/models/`
    BABYLON.SceneLoader.Load(rootURL, 'fox.babylon', this.engine, scene => {
      scene.clearColor = new BABYLON.Color4(1.0, 1.0, 1.0, 0.0)
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
    const head = this.props.genome
    if (!scene || !head) return

    window.scene = scene
    const mesh = first(scene.meshes)
    const morphTargetManager = mesh.morphTargetManager

    morphTargetManager.influences[0] = head.cheeks
    morphTargetManager.influences[1] = head.ears
    morphTargetManager.influences[2] = head.chin
    morphTargetManager.influences[3] = head.eyes.position

    const [skin, nose, ears, eyes] = head.colors
    const [mSkin, mNose, mEars, mEyes] = scene.materials
    mSkin.ambientColor = new BABYLON.Color3(skin.red, skin.green, skin.blue)
    mNose.ambientColor = new BABYLON.Color3(nose.red, nose.green, nose.blue)
    mEars.ambientColor = new BABYLON.Color3(ears.red, ears.green, ears.blue)
    mEyes.ambientColor = new BABYLON.Color3(eyes.red, eyes.green, eyes.blue)
    scene.render()
  }

  render() {
    const { classes, className, genome, vOffset } = this.props
    const { height, width } = this.state

    if (isNil(genome)) return <div className={classes.div} />

    // const top = vOffset / 2 - height
    const doubleOffset = vOffset * 2
    const halfHeight = height / 2
    const top = 50 + doubleOffset - halfHeight
    console.log({ height, top, vOffset })

    return (
      <div className={joinClasses([classes.div, className])}>
        <canvas style={{ top }} width={width} height={height} ref={this.onCanvasLoaded} className={classes.canvas} />
      </div>
    )
  }
}

export default withStyles(styles)(Head)
