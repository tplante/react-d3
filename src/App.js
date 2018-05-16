import React, { Component } from 'react';
import BarChart from './BarChart';

const initialData = [{
  key: 'Option 1',
  value: 1
}, {
  key: 'Option 2',
  value: 2
}, {
  key: 'Option 3',
  value: 3
}];

class App extends Component {
  constructor() {
    super();
    this.state = { data: initialData };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    setTimeout(() => {
      const data = initialData;
      data.map(d => {
        d.value = Math.random();
      });
      this.setState({ data: data });
    }, 2000);
  }

  render() {
    this.updateData();
    const args = {
      data: this.state.data,
      width: 960,
      height: 540
    };
    return <BarChart args={args} />;
  }
}
export default App;
