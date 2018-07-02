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
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      box: {},
      route: 'signin',
      isSingedIn: false,
    }
  }

  render() {
    const {route, isSingedIn } = this.state;
    return (
      <div className="App">
        <Particles className='below'
                   params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange}
                    isSingedIn={isSingedIn}/>
        { this.contentsOf(route) }
      </div>
    );
  }

  contentsOf(route) {
    switch(route) {
      case 'home':
        return <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange}
                               onDetectClick={this.onDetectClick }/>
                <FaceRecognition box={this.state.box}
                                 imageUrl={this.state.imageUrl}/>
           </div>;
      case 'register':
        return <Register onRouteChange={this.onRouteChange} />;
      case 'signin':
      default:
        return <SignIn onRouteChange={this.onRouteChange} />;
    }
}

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSingedIn: true });
    } else {
      this.setState({ isSingedIn: false });
    }

    this.setState({ route: route });
  }

  calculateFaceLocation = (resp) => {
    const clarifaiFace = resp.outputs[0].data.regions[0].region_info.bounding_box;
    const {bottom_row, left_col, right_col, top_row} = clarifaiFace;

    const image = document.getElementById('inputimage');
    const w = Number(image.width);
    const h = Number(image.height);

    return Promise.resolve({
      top: top_row * h,
      left: left_col * w,
      bot: (1-bottom_row) * h,
      right: (1-right_col) * w
    });
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  onDetectClick = () => {
    if (this.state.input === undefined)
      return;

    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
              .then(this.calculateFaceLocation)
              .then(this.displayFaceBox)
              .catch(console.log);
  }
}

export default App;
