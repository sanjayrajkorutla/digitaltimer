// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {count: 0, startOrPause: false, timerLimitInMinutes: 25}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, count} = this.state
    const isTimerCompleted = count === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({startOrPause: false})
    } else {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {startOrPause, count, timerLimitInMinutes} = this.state
    const isTimerCompleted = count === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({count: 0})
    }
    if (startOrPause) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({startOrPause: !prevState.startOrPause}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, count} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - count
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {count, startOrPause, timerLimitInMinutes} = this.state
    const labelText = startOrPause ? 'Running' : 'Paused'
    const startOrPauseImageUrl = startOrPause
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = startOrPause ? 'pause icon' : 'play icon'
    const isButtonsDisabled = count > 0
    return (
      <div className="container">
        <h1 className="heading">digital Timer</h1>
        <div className="clock-container">
          <div className="back-img">
            <div className="circle">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controller-container">
              <button
                className="timer-controller-btn"
                onClick={this.onStartOrPauseTimer}
                type="button"
              >
                <img
                  alt={startOrPauseAltText}
                  className="timer-controller-icon"
                  src={startOrPauseImageUrl}
                />
                <p className="timer-controller-label">
                  {startOrPause ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                className="timer-controller-btn"
                onClick={this.onResetTimer}
                type="button"
              >
                <img
                  alt="reset icon"
                  className="timer-controller-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
            </div>
            <div className="timer-limit-controller-container">
              <p className="limit-label">Set Timer limit</p>
              <div className="timer-limit-controller">
                <button
                  className="limit-controller-button"
                  disabled={isButtonsDisabled}
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  type="button"
                >
                  -
                </button>
                <div className="limit-label-and-value-container">
                  <p className="limit-value">{timerLimitInMinutes}</p>
                </div>
                <button
                  className="limit-controller-button"
                  disabled={isButtonsDisabled}
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
