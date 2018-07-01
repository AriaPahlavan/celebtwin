import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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

const app = new Clarifai.App({
 apiKey: keys.clarifai
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      intput: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  onDetectClick = () => {
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL,
                       this.state.input)
              .then(
                function(response) {
                  console.log('resp', response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
