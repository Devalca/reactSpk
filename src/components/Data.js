import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import HeaderThree from "../components/Header/HeaderThree";

class Data extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("data_kriteria");
    this.unsubscribe = null;
    this.state = {
      alter: [],
      kode: "",
      kriteria: "",
      bobot: "",
      que: 1,
      que2: "benefit",
      nilai: [1, 2, 3, 4, 5],
      nilaiKode: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      atribut: ["benefit"],
      showing: false,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const alter = [];
    querySnapshot.forEach((doc) => {
      const { kode, kriteria, bobot, atribut } = doc.data();
      alter.push({
        key: doc.id,
        doc,
        kode,
        kriteria,
        bobot,
        atribut,
      });
    });
    this.setState({
      alter,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleque1 = (e) => {
    this.setState({ que2: e.target.value }, () => {
      console.log(this.state.que2);
    });
  };

  handleque2 = (e) => {
    this.setState({ que: e.target.value }, () => {
      console.log(this.state.que);
    });
  };

  handleque3 = (e) => {
    this.setState({ kode: e.target.value }, () => {
      console.log(this.state.kode);
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { kode, kriteria, atribut, bobot } = this.state;

    this.ref
      .doc(kode)
      .set({ kode, kriteria, atribut: this.state.que2, bobot: parseInt(this.state.que) })
      .then((docRef) => {
        this.setState({
          kode: "",
          kriteria: "",
          atribut: this.state.atribut,
          bobot: "",
          que: 1,
        });
        this.props.history.push("/");
        alert("Data Berhasil Di Tambahkan");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { kode, kriteria, atribut, bobot } = this.state;
    const { showing } = this.state;
    return (
      <div>
        <div>
          <HeaderThree />
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-body">
                <button
                  className="btn btn-primary mb-4"
                  onClick={() => this.setState({ showing: !showing })}
                >
                  Tambah Data
                </button>
                <table className="table table-stripe table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>Kode</th>
                      <th>Nama Kriteria</th>
                      <th>Atribut</th>
                      <th>Bobot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.alter.map((alter, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`/showkrit/${alter.key}`}>
                            {alter.kode}
                          </Link>
                        </td>
                        <td>{alter.kriteria}</td>
                        <td>{alter.atribut}</td>
                        <td>{alter.bobot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {showing ? (
          <div
            style={{
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingBottom: "50px",
            }}
          >
            <div className="card">
              <div className="card-header">Tambah Data Kriteria</div>
              <div className="card-body">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="kode">Kode:</label>
                        <select
                          className="form-control"
                          onClick={this.handleque3}
                        >
                          {this.state.nilaiKode.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="kriteria">Nama Kriteria:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kriteria"
                          value={kriteria}
                          required="required"
                          onChange={this.onChange}
                          placeholder="Masukan Nama kriteria"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="atribut">Atribut:</label>
                        <select
                          className="form-control"
                          onClick={this.handleque}
                        >
                          {this.state.atribut.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bobot">Bobot:</label>
                        <select
                          className="form-control"
                          onClick={this.handleque2}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Tambah Data
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Data;
