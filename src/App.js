import React, { Component } from 'react';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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

const initialState = {
  intput: '',
  imageUrl: '',
  boxex: [],
  route: 'signin',
  isSingedIn: false,
  user: {
    id: 0,
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
};

const host = 'https://stunning-gunnison-41668.herokuapp.com';

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    fetch(`${host}/`);
  }

  render() {
    const { route, isSingedIn } = this.state;
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
    const {user, boxes, imageUrl} = this.state;
    switch(route) {
      case 'home':
        return <div>
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange}
                               onDetectClick={this.onDetectClick }/>
                <FaceRecognition boxes={boxes}
                                 imageUrl={imageUrl}/>
           </div>;
      case 'register':
        return <Register onRouteChange={this.onRouteChange}
                         loadUser={this.loadUser}/>;
      case 'signin':
      default:
        return <SignIn onRouteChange={this.onRouteChange}
                       loadUser={this.loadUser}/>;
    }
  }

  loadUser = ({id, name, email, entries, joined}) => {
    this.setState({user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    })
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSingedIn: true });
    } else {
      this.setState(initialState);
    }

    this.setState({ route: route });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  regionInfoToBoxParams = (regionInfo, h, w) => {
    const clarifaiFace = regionInfo.bounding_box;
    const {bottom_row, left_col, right_col, top_row} = clarifaiFace;

    return {
      top: top_row * h,
      left: left_col * w,
      bot: (1-bottom_row) * h,
      right: (1-right_col) * w
    };
  }

  calculateFaceLocation = (resp) => {
    try {
      if (!resp.outputs[0].data.regions[0])
        return Promise.reject();
    } catch (e) {
      return Promise.reject();
    }

    const image = document.getElementById('inputimage');
    const w = Number(image.width);
    const h = Number(image.height);

    const boxList = [];

    for (let i = 0; i < resp.outputs[0].data.regions.length; i++) {
      boxList.push(
        this.regionInfoToBoxParams(
          resp.outputs[0].data.regions[i].region_info, h, w)
      );
    }

    return Promise.resolve(boxList);
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  updateRanking = (data) => {
    fetch(`${host}/image`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: this.state.user.id})
    })
      .then(response => response.json())
      .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
      .catch(console.log);

    return data;
  }

  isValidURL = (string) => {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res != null;
  };

  onDetectClick = () => {
    const inputUrl = this.state.input;
    if (inputUrl === undefined || !this.isValidURL(inputUrl))
      return;

    this.setState({ imageUrl: inputUrl });

    fetch(`${host}/imageUrl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ imageUrl: inputUrl })
    })
      .then(response => response.json())
      .then(this.calculateFaceLocation)
      .then(this.updateRanking)
      .then(this.displayFaceBox)
      .catch(console.log);
  }
}

export default App;
