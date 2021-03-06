import React, {Component} from 'react';
import {render} from 'react-dom';
import {Motion, spring} from 'react-motion';
import classnames from 'classnames';
import {applyContainerQuery} from '../../lib';

class Button extends Component {
  render() {
    const {isActive, children} = this.props;

    return (
      <button className={classnames('example__btn', {'example__btn--active': isActive})} onClick={this.props.onClick}>
        {children}
      </button>
    );
  }
}

class Demo extends Component {
  render() {
    const items = [0,1,2,3,4].map((n) => (
      <li className={classnames('demo__item', {'demo__item--feature': n === 0})}>
        <div className='demo__item-pic'></div>
        <div className='demo__item-content'></div>
      </li>
    ));

    const width = this.props.width;

    return (
      <Motion defaultStyle={{width}} style={{width: spring(width, [120, 11])}}>{(values) => (
        <div className={classnames('demo__container', this.props.containerQuery)} style={{width: `${values.width}px`}}>
          <div className='demo__logo'></div>
          <div className='demo__intro'>
            <div className='demo__line demo__line-1'></div>
            <div className='demo__line demo__line-2'></div>
            <div className='demo__line demo__line-3'></div>
          </div>
          <ol className='demo__list'>{items}</ol>
        </div>
      )}</Motion>
    );
  }
}

const query = {
  middle: {
    minWidth: 250
  },
  wide: {
    minWidth: 300
  },
};

const Container = applyContainerQuery(Demo, query);

const LAYOUTS = [160, 265, 310];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {layout: 0};
  }

  render() {
    return (
      <div className='container'>
        <div className='controls'>
          <Button onClick={() => this.selectLayout(0)} isActive={this.state.layout === 0}>width &lt; 250</Button>
          <Button onClick={() => this.selectLayout(1)} isActive={this.state.layout === 1}>250 &lt; width &lt; 300</Button>
          <Button onClick={() => this.selectLayout(2)} isActive={this.state.layout === 2}>300 &lt; width</Button>
        </div>
        <Container width={LAYOUTS[this.state.layout]}/>
      </div>
    );
  }

  selectLayout(n) {
    this.setState({layout: n});
  }
}

render(<App/>, document.getElementById('app'));
