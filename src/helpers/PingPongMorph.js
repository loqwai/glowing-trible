class PingPongMorph {
  constructor({ min, max, steps }) {
    this.min = min
    this.max = max
    this.step = Math.abs(max - min) / steps
    this.steps = steps
    this.direction = 1
    this.value = min
  }

  nextValue() {
    const tmpValue = this._value()

    if (tmpValue < this.min || this.max < tmpValue) {
      this.reverse()
    }

    this.value = this._value()
    return this.value
  }

  reverse() {
    this.direction = -1 * this.direction
  }

  _value() {
    return this.direction * this.step + this.value
  }
}

export default PingPongMorph
