import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import keys from './apiKeys.json';

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

const modelId = "a403429f2ddf4b49b307e318f00e528b";

const app = new Clarifai.App({
 apiKey: keys.clarifai
});

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
    app.models.predict(modelId,
                       "https://samples.clarifai.com/face-det.jpg")
              .then(
                function(response) {
                  console.log('resp', response);
                },
                function(err) {
                  console.log('err', err);
              });
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
