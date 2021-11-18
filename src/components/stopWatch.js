import React, { Component } from "react";
import update from "react-addons-update";
export class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.init(),
    };

    this.updateTimer = this.updateTimer.bind(this);
    this.start = this.start.bind(this);
    this.split = this.split.bind(this);
    this.reset = this.reset.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.dynamicTitle = this.dynamicTitle.bind(this);
  }

  init() {
    return {
      hh: "00",
      mm: "00",
      ss: "00",
      ms: "0",
      mss: "00",
      breakups: [],
      startDisable: false,
      splitDisable: true,
      resetDisable: true,
      btnActive: "Start",
    };
  }

  componentDidMount() {
    document.addEventListener("visibilitychange", this.changeTitle);
  }

  changeTitle() {
    this.setTitle = setInterval(this.dynamicTitle, 10);
  }

  dynamicTitle() {
    const { hh, mm, ss, ms, mss, startDisable } = this.state;

    if (document.hidden && !startDisable) {
      document.title = `${hh}:${mm}:${ss}:${ms}${mss}`;
    } else {
      document.title = "Play with numbers";
    }
  }

  clearState() {
    this.setState({ ...this.init() });
  }

  start() {
    const { btnActive } = this.state;
    if (btnActive === "Start") {
      this.timer = setInterval(this.updateTimer, 10);
    } else {
      clearInterval(this.timer);
    }

    this.setState({
      btnActive: btnActive === "Start" ? "Pause" : "Start",
      splitDisable: btnActive === "Pause",
      resetDisable: btnActive === "Start",
    });
  }

  split() {
    const { hh, mm, ss, ms, mss, breakups } = this.state;

    const b = update(breakups, { $push: [`${hh}:${mm}:${ss}:${ms}${mss}`] });
    this.setState({
      breakups: b,
    });
  }

  reset() {
    clearInterval(this.timer);
    this.clearState();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.title);
    document.removeEventListener("visibilitychange", this.changeTitle);
  }

  updateTimer() {
    const { hh, mm, ms, ss, mss } = this.state;
    let msNum = parseInt(ms);
    let ssNum = parseInt(ss);
    let mssNum = parseInt(mss);
    let mmNum = parseInt(mm);
    let hhNum = parseInt(hh);

    if (mssNum < 9) {
      mssNum = `0${mssNum + 1}`;
    } else if (mssNum < 99) {
      mssNum += 1;
      if (mssNum % 10 === 0) {
        msNum = msNum < 9 ? msNum + 1 : 0;
      }
    } else {
      if (ssNum < 59) {
        ssNum += 1;
      } else {
        if (mmNum < 59) {
          mmNum += 1;
        } else {
          hhNum += 1;
          mmNum = "00";
        }
        ssNum = "00";
      }
      mssNum = "00";
    }

    if (ssNum < 10) {
      ssNum = `0${ssNum}`;
    }
    if (mmNum < 10) {
      mmNum = `0${mmNum}`;
    }
    if (hhNum < 10) {
      hhNum = `0${hhNum}`;
    }

    this.setState({
      ms: msNum,
      ss: ssNum,
      mss: mssNum,
      hh: hhNum,
      mm: mmNum,
    });
  }

  render() {
    const {
      hh,
      mm,
      ss,
      ms,
      mss,
      btnActive,
      breakups,
      startDisable,
      splitDisable,
      resetDisable,
    } = this.state;

    return (
      <div className="stopwatch">
        <h1>Stop Watch</h1>
        <div className="Time">
          <span>{`${hh}:`}</span>
          <span>{`${mm}:`}</span>
          <span>{`${ss}.`}</span>
          <span>{`${ms}`}</span>
          <span className="break">{`${mss}`}</span>
        </div>
        <button
          className="btnStart"
          onClick={this.start}
          disabled={startDisable}
        >
          {btnActive || "Start"}
        </button>
        <button
          className="btnSplit"
          onClick={this.split}
          disabled={splitDisable}
        >
          Split
        </button>
        <button
          className="btnReset"
          onClick={this.reset}
          disabled={resetDisable}
        >
          Reset
        </button>
        {breakups.map((item) => (
          <p key={item} className="Time break">
            {item}
          </p>
        ))}
      </div>
    );
  }
}

export default StopWatch;
