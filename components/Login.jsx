import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PasswordField from 'material-ui-password-field';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Signup from './Signup.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

const style = {
  margin: 12,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChangeFn (e) {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state[e.target.id]);
  }

  loginFn () {
    console.log('login clicked');
  }


  render() {
    return (
      <div>
        <h1 style={{margin: '35px'}}>Welcome</h1>
        <TextField
          id="username"
          floatingLabelText="Enter username"
          onChange={this.handleChangeFn.bind(this)}
        />
        <br />
        <PasswordField
          id="password"
          hintText="At least 8 characters"
          floatingLabelText="Enter your password"
          errorText="Your password is too short"/>
        <br/>
        <br/>
        
        <RaisedButton label="Log In" primary={true} style={style} onClick={this.loginFn.bind(this)} />

        <RaisedButton label="Sign Up" primary={true} style={style} containerElement={<Link to="/signup"/>}/>

        <br/>
        <Link to="/signup">Don't have an account?</Link>
        <br/>   
        <br/>
      </div>
    );
  }
}

export default Login;