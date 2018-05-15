import React, { Component } from 'react';
import {
  scaleLinear,
  max,
  select,
  transition
} from 'd3';

class BarChart extends Component {
  constructor (props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount () {
    this.createBarChart();
  }

  componentDidUpdate () {
    this.createBarChart();
  }

  createBarChart () {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    // Select
    const bar = select(node).selectAll('rect')
      .data(this.props.data);
    // Enter
    bar.enter()
      .append('rect')
      .style('fill', 'steelblue')
      .attr('x', (d, i) => i * 25)
      .attr('width', 25);
    // Update
    bar.transition()
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d));
    // Exit
    bar.exit()
      .remove();
  }

  render () {
    return <svg ref={node => (this.node = node)} width={500} height={500} />;
  }
}

export default BarChart;
