class TweenMorph {
  constructor({ from, to, steps }) {
    this.from = from
    this.to = to
    this.step = Math.abs(to - from) / steps
    this.steps = steps
    this.direction = to > from ? 1 : -1
    this.value = from
  }

  currentValue = () => this.value

  nextValue() {
    const tmpValue = this._value()

    if (this.direction > 0 && tmpValue > this.to) {
      this.value = this.to
      return this.value
    }

    if (this.direction < 0 && tmpValue < this.to) {
      this.value = this.to
      return this.value
    }

    this.value = this._value()
    return this.value
  }

  newTo(to) {
    return new TweenMorph({
      from: this.value,
      to: to,
      steps: this.steps,
    })
  }

  _value() {
    return this.direction * this.step + this.value
  }
}

export default TweenMorph
