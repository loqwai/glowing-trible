import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

import * as BABYLON from 'babylonjs'

const styles = {
  root: {
    flex: 1,
  },
}

class Scene extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize()
    }
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
      height: ref.offsetHeight,
      width: ref.offsetWidth,
    })
  }

  setupBabylon() {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio)
    BABYLON.SceneLoader.Load('models/', 'fox.babylon', this.engine, scene => {
      this.scene = scene
      const morphTargetManager = scene.meshes[0].morphTargetManager
      window.morphTargetManager = morphTargetManager
      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(this.canvas, true)
      this.camera = camera
      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7
      // Resize the babylon engine when the window is resized
      window.addEventListener('resize', this.onResizeWindow)

      this.engine.runRenderLoop(() => {
        scene.render()
        morphTargetManager.influences[0] = Math.random()
        morphTargetManager.influences[1] = Math.random()
        morphTargetManager.influences[2] = Math.random()
      })
    })
  }

  render() {
    const { classes } = this.props
    const { width, height } = this.state

    if (!width || !height) return <div className={classes.root} ref={this.onEmptyDivLoaded} />

    return <canvas className={classes.root} width={width} height={height} ref={this.onCanvasLoaded} />
  }
}
export default withStyles(styles)(Scene)
