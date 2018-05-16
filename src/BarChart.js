import React, { PureComponent } from 'react';
import {
  scaleLinear,
  scaleBand,
  max,
  select,
  transition,
  easeElastic
} from 'd3';

const ANIMATION_DURATION = 1000;

class BarChart extends PureComponent {
  constructor (props) {
    super(props);
    const args = props.args;
    this.width = args.width;
    this.height = args.height;
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount () {
    this.createBarChart();
  }

  componentDidUpdate () {
    this.createBarChart();
  }

  createBarChart () {
    const { width, height, node } = this;
    const data = this.props.args.data;
    const x = scaleBand()
      .domain(data.map(d => d.key))
      .rangeRound([0, width])
      .padding(0.1);
    const y = scaleLinear()
      .domain([0, max(data.map(d => d.value))])
      .range([0, height]);
    const ease = transition()
      .duration(ANIMATION_DURATION)
      .ease(easeElastic);

    // Select
    const bar = select(node)
      .selectAll('rect')
      .data(data);
    // Enter
    bar.enter()
      .append('rect')
      .style('fill', 'steelblue')
      .attr('x', d => x(d.key))
      .attr('y', d => height - y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(d.value));
    // Update
    bar.transition(ease)
      .attr('y', d => height - y(d.value))
      .attr('height', d => y(d.value));
    // Exit
    bar.exit()
      .remove();
  }

  render () {
    const { width, height } = this;
    return (
      <svg
        ref={node => (this.node = node)}
        width={width}
        height={height}
      />
    );
  }
}

export default BarChart;
