import React, { Component } from "react";
import update from 'react-addons-update';

export class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hh: "00",
      mm: "00",
      ss: "00",
      ms: "0",
      mss: "00",
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
        ms: "0",
        mss:"00",
        breakups: [],
        prName: 'Pause',
        btn: "pr"
      })
  }

  start() {
    this.timer = setInterval(this.updateTimer, 10);
    this.setState({
        btn: "start"
    })
  }

  pr() {
    const { hh, mm, ss, ms, mss, prName, breakups } = this.state;
    clearInterval(this.timer);
    if(prName === 'Resume') {
        this.timer = setInterval(this.updateTimer, 10);
    }

    if(prName === 'Pause') {
        const b = update(breakups, {$push: [`${hh}:${mm}:${ss}:${ms}${mss}`]});
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
    const { hh, mm, ms, ss, mss } = this.state;
    let msNum = parseInt(ms);
    let ssNum = parseInt(ss);
    let mssNum = parseInt(mss);
    let mmNum = parseInt(mm);
    let hhNum = parseInt(hh);;

    if (mssNum < 9) {
      mssNum = `0${mssNum + 1}`;
    } else if(mssNum < 99){
      mssNum += 1;
      if(mssNum%10 === 0) {
        msNum = msNum < 9 ? msNum + 1 : 0;
      }
    } else {
        if(ssNum < 59) {
            ssNum += 1;
        } else {
            if(mmNum < 59) {
                mmNum += 1;
            } else {
                hhNum += 1;
                mmNum = "00";
            }
            ssNum = "00";
        }
        mssNum = "00";
    }

    if(ssNum < 10) {
        ssNum = `0${ssNum}`;
    }
    if(mmNum < 10) {
        mmNum = `0${mmNum}`;
    }
    if(hhNum < 10) {
        hhNum = `0${hhNum}`;
    }

    this.setState({
        ms: msNum,
        ss: ssNum,
        mss: mssNum,
        hh: hhNum,
        mm: mmNum,
    })
  }

  render() {
    const { hh, mm, ss, ms, mss, prName, btn, breakups } = this.state;

    return (
      <div>
        <h1>Stop Watch</h1>
        <div className="Time">
            <span>{`${hh}:`}</span>
            <span>{`${mm}:`}</span>
            <span>{`${ss}.`}</span>
            <span>{`${ms}`}</span>
            <span className="break">{`${mss}`}</span>
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
