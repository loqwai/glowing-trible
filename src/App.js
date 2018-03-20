import React, { Component } from "react"
import times from "lodash/fp/times"
import logo from "./logo.svg"
import Creatures from "./Creatures"

class App extends Component {
  render() {
    const genomes = times(i => ({ luminosity: i / 10 }), 10)

    return <Creatures genomes={genomes} />
  }
}

export default App
