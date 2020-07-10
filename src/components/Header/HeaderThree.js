import React, { Component } from "react";
import { Link } from "react-router-dom";
// ClassnameclassName Component Header
class HeaderThree extends Component {
  render() {
    return (
      <div className="mb-5">
        <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Tambah Data</a>
          <form className="form-inline">
          <Link to="/">
          <button className="btn btn-light mr-3" type="button">
              Home
            </button>
            </Link>
          </form>
        </nav>
      </div>
    );
  }
}
export default HeaderThree;
