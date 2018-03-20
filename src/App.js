import React, { Component } from "react"
import times from "lodash/fp/times"
import logo from "./logo.svg"
import Creatures from "./Creatures"
import "./App.css"

class App extends Component {
  render() {
    const genomes = times(i => ({ luminosity: i / 10 }), 10)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Creatures genomes={genomes} />
      </div>
    )
  }
}

export default App
