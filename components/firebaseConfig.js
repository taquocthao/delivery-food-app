import * as firebase from "firebase";
var config = {
    apiKey: "AIzaSyAIY2rq6sVEyToB3CSNV7tgFbHGSaT7EFk",
    authDomain: "deliverfood-1b663.firebaseapp.com",
    databaseURL: "https://deliverfood-1b663.firebaseio.com",
    projectId: "deliverfood-1b663",
    storageBucket: "deliverfood-1b663.appspot.com",
    messagingSenderId: "1061559856023"
  };
firebase.initializeApp(config);

// export default firebase;
// vì test thử database nên ta export database trong firebase
const database = firebase.database();

export default class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        data : null
      };
    }
    componentDidMount(){
      database.ref("/").on('value', () => {
        console.log("data change");
      });
    }
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      );
    }
  }