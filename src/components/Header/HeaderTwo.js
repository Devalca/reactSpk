import React, { Component } from "react";
import { Link } from "react-router-dom";
// ClassNaclassName Component Header
class HeaderTwo extends Component {
  render() {
    return (
      <div className="mb-5">
        <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Tabel Perhitungan Peringkat</a>
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
export default HeaderTwo;
