import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import 'tachyons';
import Particles from 'react-particles-js';


const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move: {
      speed: 1
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      intput: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
    console.log(this.state.input);
  }

  onDetectClick = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <Particles className='below' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
                       onDetectClick={this.onDetectClick }/>
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
