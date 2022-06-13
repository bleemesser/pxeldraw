import axios from "axios";
import React from "react";
import Nav from './Nav';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.loggedIn = false;
      this.userName = "";
      this.email = "";
      this.loggedInUser = localStorage.getItem("loggedInUser");
    }

    onChangeUserName = (e) => {
      this.userName = e.target.value;
    }
    onChangeEmail = (e) => {
      this.email = e.target.value;
    }
    onSubmitSignup = e => {
      e.preventDefault();
      if (this.userName !== "" && this.email !== "") {
        axios.post('http://localhost:4000/signup', {
            "username": this.userName,
            "email": this.email
          })
          .then(() => {
            alert("successfully signed up, please log in now");
          })
          .catch((err) => {
            console.error(err)
          });
      } else {
        alert("fields cannot be blank!");
      }

    }
    logOut() {
      localStorage.clear();
      window.sessionStorage.clear();
      window.location.reload(false);
    }
    onSubmitLogin = e => {
      e.preventDefault();
      if (this.userName !== "" && this.email !== "") {
        axios.post('http://localhost:4000/login', {
            "username": this.userName,
            "email": this.email
          })
          .then((res) => {
            if (res.data === true) {
              alert("successfully logged in");
              localStorage.setItem("loggedInUser", JSON.stringify(this.userName));
              window.location.reload(false);
            } else if (res.data === false) {
              alert("login failed, this user doesn't exist");
            } else {
              alert("an error occured");
            }
          })
          .catch((err) => {
            console.error(err)
          });
      } else {
        alert("fields cannot be blank!");
      }
    }

  render() {
    return(
      <div>
        <Nav/>
        <div className="Login">
          <p className="titlething">Sign-up:</p>
          <form onSubmit={this.onSubmitSignup}>
              <label className="inputlabel" htmlFor="username"></label><br/>
              <input autoCapitalize="none" className="inputdisp" onChange={this.onChangeUserName} type="text" id="username" name="username"/><br/>
              <label className="inputlabel" htmlFor="email">Email:</label><br/>
              <input className="inputdisp" autoCapitalize="none" onChange={this.onChangeEmail} type="text" id="email" name="email"/><br/>
              <input type='submit' className="submit" value="Sign Up"/>
          </form>
          <p className="titlething">Log-In</p>
          <form onSubmit={this.onSubmitLogin}>
              <label className="inputlabel" htmlFor="username1">Username:</label><br/>
              <input autoCapitalize="none" className="inputdisp" onChange={this.onChangeUserName} type="text" id="username1" name="username"/><br/>
              <label className="inputlabel" htmlFor="email1">Email:</label><br/>
              <input autoCapitalize="none" className="inputdisp" onChange={this.onChangeEmail} type="text" id="email1" name="email"/><br/>
              <input className="submit" type='submit' value="Log In"/>
          </form>
          <button className="centered" onClick={this.logOut}>Log Out</button>
        </div>
    </div>
    )
  }
}

export default Login;