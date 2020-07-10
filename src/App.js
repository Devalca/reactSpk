import React, { Component } from "react";
import "./App.css";
import firebase from "./Firebase";
import HeaderOne from "./components/Header/HeaderOne";

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
      const { kode, alternatif } = doc.data();
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
      <div>
        <HeaderOne />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-stripe table-bordered">
              <thead className="table-primary">
                  <tr>
                    <th>Kode</th>
                    <th>Nama Alternatif</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.alter.map((alter, index) => (
                    <tr key={index}>
                      <td>
                       {alter.kode}
                      </td>
                      <td>{alter.alternatif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
