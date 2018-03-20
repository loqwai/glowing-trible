import React, { Component } from "react"
import logo from "./logo.svg"
import Creature from "./Creature"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Creature genome={{ luminosity: 0.8 }} />
      </div>
    )
  }
}

export default App
