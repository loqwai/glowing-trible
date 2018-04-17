import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import curry from 'lodash/fp/curry'
import PingPongMorph from './helpers/PingPongMorph'

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

const ROTATION_SPEED = Math.PI / 100
const MORPH_SPEED = 1 / 100

const wrapRotation = wrap(-1 * Math.PI, Math.PI)

class Scene extends Component {
  constructor() {
    super()
    this.state = {}
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
    BABYLON.SceneLoader.Load('models/', 'fox.babylon', this.engine, scene => {
      scene.clearColor = new BABYLON.Color3(1.0, 1.0, 1.0)
      scene.ambientColor = new BABYLON.Color3(1.0, 1.0, 1.0)

      // uncomment these 4 lines and comment the 2 lines below to see flat shaded no morph
      // const ogFox = scene.meshes[0]
      // const fox = ogFox.clone('fox').convertToFlatShadedMesh()
      // const morphTargetManager = ogFox.morphTargetManager
      // fox.morphTargetManager = morphTargetManager
      const fox = scene.meshes[0]
      const morphTargetManager = fox.morphTargetManager

      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
      light.intensity = 0.7

      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(this.canvas, true)

      const cheek = new PingPongMorph({ min: 0, max: 1, step: MORPH_SPEED })
      const ears = new PingPongMorph({ min: 0, max: 1, step: MORPH_SPEED })
      const chin = new PingPongMorph({ min: 0, max: 1, step: MORPH_SPEED })

      this.engine.runRenderLoop(() => {
        fox.rotation.y = wrapRotation(fox.rotation.y + ROTATION_SPEED)

        morphTargetManager.influences[0] = cheek.nextValue()
        morphTargetManager.influences[1] = ears.nextValue()
        morphTargetManager.influences[2] = chin.nextValue()
        scene.render()
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
