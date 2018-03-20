import React, { Component } from "react"
import map from "lodash/fp/map"
import times from "lodash/fp/times"
import logo from "./logo.svg"
import Breed from "./Breed"
import Creatures from "./Creatures"

const numCreatures = 84

class App extends Component {
  constructor() {
    super()
    this.state = {
      genomes: times(
        i => ({
          red: i / numCreatures,
          green: i / numCreatures,
          blue: i / numCreatures
        }),
        numCreatures
      )
    }
  }

  render() {
    const { genomes } = this.state

    const doBreed = () =>
      this.setState({
        genomes: map(() => Breed(genomes), genomes)
      })

    return (
      <div>
        <Creatures genomes={genomes} />
        <button onClick={doBreed}>Breed</button>
      </div>
    )
  }
}

export default App
