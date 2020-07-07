import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("siswa");
    this.unsubscribe = null;
    this.state = {
      alter: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const alter = [];
    querySnapshot.forEach((doc) => {
      const { kode, alternatif} = doc.data();
      alter.push({
        key: doc.id,
        doc,
        kode,
        alternatif,
      });
    });
    this.setState({
      alter,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sistem Pemilihan Keputusan</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create">Tambah Data</Link>
            </h4>
            <h4>
              <Link to="/result">Perhitungan</Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Alternatif</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alter.map((alter) => (
                  <tr>
                    <td>
                      <Link to={`/show/${alter.key}`}>{alter.kode}</Link>
                    </td>
                    <td>{alter.alternatif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
