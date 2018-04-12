import React, { Component } from 'react'

import * as three from 'three'
import * as OBJLoader from 'three-obj-loader'
OBJLoader(three)

class Drawing extends Component {
  componentDidMount () {
    this.three = three
    // Set the scene size.
    const WIDTH = 400;
    const HEIGHT = 300;

    // Set some camera attributes.
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    // Get the DOM element to attach to
    const {renderContainer} = this.refs

    // Create a WebGL renderer, camera
    // and a scene
    const renderer = new this.three.WebGLRenderer()
    const camera =
      new this.three.PerspectiveCamera(
          VIEW_ANGLE,
          ASPECT,
          NEAR,
          FAR
      );

    camera.position.z = 50
    camera.position.y = 50
    const scene = new this.three.Scene()

    // Add the camera to the scene.
    scene.add(camera);

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied
    // DOM element.
    renderContainer.appendChild(renderer.domElement)
    const ambientLight = new this.three.AmbientLight( 0xcccccc, 0.4 )
		scene.add( ambientLight );

    const animate = () => {
      this.cube.rotateY(0.05)
      console.log(camera.position)
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    const loader = new this.three.JSONLoader()
    loader.load(process.env.PUBLIC_URL + '/models/fox.json', (geometry) => {
      console.log(geometry)
      const material = new this.three.MeshLambertMaterial( {
				vertexColors: this.three.FaceColors,
				morphTargets: true,
				overdraw: 0.5
			});
			const cube = new this.three.Mesh( geometry, material );
			cube.scale.set( 1.5, 1.5, 1.5 );
      scene.add(cube)
      window.cube = cube
      this.cube = cube
      camera.lookAt(cube.position)
      animate()
    })

  }

  render() {
    return (
      <div>
        <h1>Drawing</h1>
          <div ref="renderContainer"/>
      </div>
    )
  }
}

export default Drawing
