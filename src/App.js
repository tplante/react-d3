import React, { Component } from "react";
import BarChart from "./BarChart";
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [5, 10, 1, 3]
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    setTimeout(() => {
      this.setState({
        data: [Math.random(), Math.random(), Math.random(), Math.random()]
      });
    }, 1500);
  }

  render() {
    this.updateData();
    return (
      <div className="App">
        <div className="App-header">
          <h1>React and d3</h1>
        </div>
        <div>
          <BarChart data={this.state.data} size={[500, 500]} />
        </div>
      </div>
    );
  }
}
export default App;
