import React from 'react'
import ReactDOM from 'react-dom'
import Creature from './Creature'

it('renders red without crashing', () => {
  const div = document.createElement('div')
  const gene = {color: 'red'}
  ReactDOM.render(<Creature gene={gene} />, div)
  ReactDOM.unmountComponentAtNode(div)
});
