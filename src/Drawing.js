import bindAll from 'lodash/fp/bindAll'
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

  onEmptyDivLoaded = ref => {
    if (ref === null) return

    this.setState({
      height: ref.clientHeight,
      width: ref.clientWidth,
    })
  }

  render() {
    const { classes } = this.props
    const { creature } = this.state

    if (!creature) return <div className={classes.root} />

    return (
      <div className={classes.root}>
        <Creature3D className={classes.Creature3D} genome={creature.genome} />
      </div>
    )
  }
}
export default withStyles(styles)(Drawing)
