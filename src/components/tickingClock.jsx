import React, { Component } from "react";
export default class TickingClock extends Component {
  constructor() {
    super();
    this.state = {
      timeVal: new Date().toLocaleTimeString(),
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }
  updateClock() {
    let t = new Date().toTimeString().split(" ")[0];
    let newTime = null;
    let tArr = t.split(":");
    let h = t.substr(0, 2);

    if (h >= 12) {
      newTime =
        h - 12 < 10
          ? `0${h - 12}:${tArr[1]}:${tArr[2]} PM`
          : `${h - 12}:${tArr[1]}:${tArr[2]} PM`;
    } else {
      newTime = `${tArr[0]}:${tArr[1]}:${tArr[2]} AM`;
    }

    this.setState({
      timeVal: newTime,
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { timeVal } = this.state;
    return (
      <div className="Time">
        <p>{timeVal}</p>
      </div>
    );
  }
}
