import React, { Component } from "react";
import { Link } from "react-router-dom";
// ClassclassName Component Header
class HeaderOne extends Component {
  render() {
    return (
      <div className="mb-5">
        <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Sistem Pemilihan Keputusan</a>
          <form className="form-inline">
          <Link to="/create">
          <button className="btn btn-light mr-3" type="button">
              Tambah Data
            </button>
            </Link>
            <Link to="/Result">
            <button className="btn btn-light" type="button">
              Perhitungan Data
            </button>
              </Link>
          </form>
        </nav>
      </div>
    );
  }
}
export default HeaderOne;
