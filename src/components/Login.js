import React, { Component } from "react";
import firebase from "../Firebase";
// import { Link } from "react-router-dom";
// import HeaderOne from "../components/Header/HeaderOne";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }
  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u)
      })
      .catch((err) => {
        alert("Silahkan Periksa lagi Email dan Password Anda!")
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div
        style={{
          paddingTop: "200px",
          paddingLeft: "300px",
          paddingRight: "300px",
        }}
      >
        <div className="card">
          <div className="card-header bg-primary">
            <h2 className="text-center" style={{ color: "white" }}>
              Log in
            </h2>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="login-form">
                    <form method="post">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          required="required"
                          placeholder="Masukan Email"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          onChange={this.handleChange}
                          id="password"
                          placeholder="Masukan Password"
                          value={this.state.password}
                          required="required"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={this.login}
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
