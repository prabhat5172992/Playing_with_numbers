import React, { Component } from "react";

export default class IncDecLimit extends Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      temp: 0,
      flag: false,
    };
  }
  
  updateNumber() {
    const { temp } = this.state;
    const obj = {};
    if (temp === 0) {
      for (let i = 1; i <= 10; i++) {
        setTimeout(() => {
          obj["flag"] = true;
          obj["num"] = i;
          obj["temp"] = obj["num"] === 10 ? 10 : 0;
          this.setState({
            ...this.state,
            ...obj,
          },()=>{
            if(obj["temp"] === 10) this.updateNumber();
          });
        }, i * 1000);
      }
    } else if (temp === 10) {
      for (let i = 9, j = 1; i >= 0 && j <= 10; i--, j++) {
        setTimeout(() => {
          obj["num"] = i;
          obj["temp"] = obj["num"] === 0 ? 0 : 10;
          if(obj["num"] === 0) obj["flag"] = false;
          this.setState({
            ...this.state,
            ...obj,
          });
        }, j * 1000);
      }
    }
  }

  render() {
    const { num, flag } = this.state;
    return (
      <div>
        <h1>Increment to a limit then decrement to a limit</h1>
        <p>{num}</p>
        <button
          id="incerase_decrease_one"
          className="rotate-button div-click"
          onClick={() => this.updateNumber()}
          disabled={flag}
        >
          Click Me!
        </button>
      </div>
    );
  }
}
