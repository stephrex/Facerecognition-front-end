import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Particles from 'particles-bg';

const initialState = {
      input:'',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email:'',
        joined: '',
        entries: 0,
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  calculateFaceBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {  
   this.setState({input: event.target.value });
  }

  onButtonClick = () => {
    this.setState({ imageUrl: this.state.input })

    const USER_ID = 'btxrnadb1yzz';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '83ea579a467f46d89f1c9d310e55d57d';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": this.state.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                fetch('https://facial-recognition-api.onrender.com/image', {
                    method: 'put',
                    headers: {'content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                  .then(response => response.json())
                  .then(count => {
                    return (
                         const a = this.setState(Object.assign(this.state.user, { entries:count}))
                    console.log(a);
                        )
                   
                  })
                  .catch(console.log)
            }
        this.displayFaceBox(this.calculateFaceBox(result))
        })
        .catch(error =>  <div>{console.log('error', error)} {alert('Can\'t detect face, use another image please')}</div>);
    }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email:data.email,
        joined: data.joined,
        entries: data.entries,
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState(initialState)
    } else if (route === 'home') {
        this.setState({isSignedIn: true})
    }
   this.setState({route:route});
  }

  render () {
    return (
          <div className="App">
            <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
            {this.state.route === 'home'
               ? <div> 
                     <Particles color="#FFFFFF" num={150} type='cobweb' bg={true} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex:-1 }}/>
                     <Logo/>
                     <Rank name={this.state.user.name} entries={this.state.user.entries} />
                     <Imagelinkform 
                       onInputChange={this.onInputChange} 
                       onButtonClick={this.onButtonClick}
                     />
                     <Facerecognition box= {this.state.box} imageUrl={this.state.imageUrl}/> 
                 </div>
               : (
                this.state.route === 'signin' || this.state.route === 'signout'
                ? <div>
                        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  </div>
                : <div>
                      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  </div>
                )
            }
          </div>
    );
  }
}

export default App;
