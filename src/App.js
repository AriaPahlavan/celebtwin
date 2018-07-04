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
  box: {},
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

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
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

  componentDidMount() { }

  contentsOf(route) {
    const {user, box, imageUrl} = this.state;
    switch(route) {
      case 'home':
        return <div>
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange}
                               onDetectClick={this.onDetectClick }/>
                <FaceRecognition box={box}
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

  calculateFaceLocation = (resp) => {
    if (!resp.outputs[0].data.regions[0])
      return Promise.reject();

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

  updateRanking = (data) => {
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: this.state.user.id})
    })
      .then(response => response.json())
      .then(count => this.setState(Object
                         .assign(this.state.user, {entries: count})))
      .catch(console.log);
    return data;
  }

  onDetectClick = () => {
    if (this.state.input === undefined)
      return;

    this.setState({ imageUrl: this.state.input });

    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ imageUrl: this.state.input })
    })
    .then(response => response.json())
    .then(this.calculateFaceLocation)
    .then(this.updateRanking)
    .then(this.displayFaceBox)
    .catch(console.log);
  }
}

export default App;
