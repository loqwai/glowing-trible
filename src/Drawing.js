import React, { Component } from 'react'

import * as BABYLON from 'babylonjs'

class Scene extends Component {

  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize()
    }
  }

  componentDidMount = () => {
    this.engine = new BABYLON.Engine(
        this.canvas,
        true,
        this.props.engineOptions,
        this.props.adaptToDeviceRatio
    )
    BABYLON.SceneLoader.Load("models/", "fox.babylon", this.engine, (scene) => {
      this.scene = scene
      const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene)
      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(this.canvas, true)
      this.camera = camera
      var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;      
      // Resize the babylon engine when the window is resized
      window.addEventListener('resize', this.onResizeWindow);

      this.engine.runRenderLoop(() => {
           scene.render()
      })
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResizeWindow)
  }

  onCanvasLoaded =  (c) => {
    if (c !== null) {
      this.canvas = c
    }
  }

  render () {
    let { width, height} = this.props

    let opts = {}

    if (width !== undefined && height !== undefined) {
      opts.width = width
      opts.height = height
    }

    return (
      <canvas
        ref={this.onCanvasLoaded}
      />
    )
  }
}
export default Scene
