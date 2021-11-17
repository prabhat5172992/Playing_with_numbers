import React, { Component } from "react";
import update from 'react-addons-update';

export class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hh: "00",
      mm: "00",
      ss: "00",
      ms: "000",
      breakups: [],
      prName: 'Pause',
      btn: "pr"
    };

    this.updateTimer = this.updateTimer.bind(this);
    this.start = this.start.bind(this);
    this.pr = this.pr.bind(this);
    this.reset = this.reset.bind(this);
  }

  clearState() {
      this.setState({
        hh: "00",
        mm: "00",
        ss: "00",
        ms: "000",
        breakups: [],
        prName: 'Pause',
        btn: "pr"
      })
  }

  start() {
    this.timer = setInterval(this.updateTimer);
    this.setState({
        btn: "start"
    })
  }

  pr() {
    const { hh, mm, ss, ms, prName, breakups } = this.state;
    clearInterval(this.timer);
    if(prName === 'Resume') {
        this.timer = setInterval(this.updateTimer);
    }

    if(prName === 'Pause') {
        const b = update(breakups, {$push: [`${hh}:${mm}:${ss}:${ms}`]});
        this.setState({
            breakups: b
        })
    }
    this.setState({
        prName: prName === 'Pause' ? 'Resume' : 'Pause'
    });
  }

  reset() {
    clearInterval(this.timer);
    this.clearState();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimer() {
    const { ms, ss } = this.state;
    let milliSec = 0;
    let msNum = parseInt(ms);
    let ssNum = parseInt(ss);

    if (msNum < 10) {
      milliSec = `00${msNum + 1}`;
    } else if (msNum < 100) {
      milliSec = `0${msNum + 1}`;
    } else {
      milliSec = msNum + 1;
    }

    if(milliSec > 999 && ssNum < 60) {
        ssNum = (ssNum < 10) ? `0${ss+1}` : (ss+1);
        milliSec = '000';
    }
    this.setState({
        ms: milliSec,
        ss: ssNum,
    })
  }

  render() {
    const { hh, mm, ss, ms, prName, btn, breakups } = this.state;

    return (
      <div>
        <h1>Stop Watch</h1>
        <div className="Time">
            <p>{`${hh}:${mm}:${ss}:${ms}`}</p>
        </div>
        <button onClick={this.start} disabled={btn==='start'}>Start</button>
        <button className="pr" onClick={this.pr} disabled={btn==='pr'}>{prName}</button>
        <button onClick={this.reset}>Reset</button>
        {breakups.map(item => <p key={item} className="Time break">{item}</p> )}
      </div>
    );
  }
}

export default StopWatch;
