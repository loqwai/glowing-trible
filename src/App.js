import React, { Component } from "react"
import map from "lodash/fp/map"
import times from "lodash/fp/times"
import set from "lodash/fp/set"
import styled from "styled-components"
import logo from "./logo.svg"
import Breed from "./Breed"
import Creatures from "./Creatures"
import GenerateCreature from "./GenerateCreature"

const numCreatures = 5
const BreedingGround = styled.div`
  display: flex;
`

const generateCreature = () => GenerateCreature(["red", "green", "blue"])

const setMutation = set("mutationRate", 0.00000000000000001)

class App extends Component {
  constructor() {
    super()
    this.state = {
      children: map(setMutation, times(generateCreature, numCreatures)),
      parents: map(setMutation, times(generateCreature, numCreatures))
    }
  }

  render() {
    const { children, parents } = this.state

    const doBreed = () =>
      this.setState({
        children: map(() => Breed(children), children)
      })

    return (
      <div>
        <BreedingGround>
          <Creatures genomes={children} />
          <Creatures genomes={parents} />
        </BreedingGround>
        <button onClick={doBreed}>Breed</button>
      </div>
    )
  }
}

export default App
