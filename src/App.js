import React, { Component } from "react"
import bindAll from "lodash/fp/bindAll"
import concat from "lodash/fp/concat"
import map from "lodash/fp/map"
import set from "lodash/fp/set"
import size from "lodash/fp/size"
import times from "lodash/fp/times"
import styled from "styled-components"
import logo from "./logo.svg"
import Breed from "./Breed"
import Creatures from "./Creatures"
import GenerateCreature from "./GenerateCreature"

const numCreatures = 5
const BreedingGround = styled.div`
  display: flex;
  justify-content: space-between;
`

const generateCreature = () =>
  GenerateCreature([
    "hue",
    "saturation",
    "luminosity",
    "height",
    "width",
    "x",
    "y"
  ])

const setMutation = set("mutationRate", 0.005)

class App extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(App.prototype), this)

    this.state = {
      parents: [],
      generations: [
        {
          children: map(setMutation, times(generateCreature, numCreatures)),
          suitors: map(setMutation, times(generateCreature, numCreatures)),
          number: 0
        }
      ]
    }
  }

  selectParent(parent) {
    const parents = concat(this.state.parents, parent)

    if (size(parents) < 2) return this.setState({ parents })

    const generations = concat(this.state.generations, {
      children: times(() => Breed(parents), numCreatures),
      suitors: map(setMutation, times(generateCreature, numCreatures)),
      number: size(this.state.generations)
    })

    this.setState({
      parents: [],
      generations
    })
  }

  render() {
    const { generations } = this.state

    const breedingGrounds = map(this.renderBreedingGround, generations)

    return <div>{breedingGrounds}</div>
  }

  renderBreedingGround({ children, suitors, number }) {
    return (
      <BreedingGround key={number}>
        <Creatures
          title="Children"
          genomes={children}
          onSelectParent={this.selectParent}
        />
        <Creatures
          title="Suitors"
          genomes={suitors}
          onSelectParent={this.selectParent}
        />
      </BreedingGround>
    )
  }
}

export default App
