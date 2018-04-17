class PingPongMorph {
  constructor({ min, max, step }) {
    this.min = min
    this.max = max
    this.step = step
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
