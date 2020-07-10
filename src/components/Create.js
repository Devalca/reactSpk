import React, { Component } from "react";
import firebase from "../Firebase";
import HeaderThree from "../components/Header/HeaderThree";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("siswa");
    this.state = {
      kode: "",
      alternatif: "",
      isOpen: false,
      que1: 1,
      que2: 1,
      que3: 1,
      que4: 1,
      que5: 1,
      nilai: [1, 2, 3, 4, 5],
      atribut: ["cost", "benefit"],
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleque1 = (e) => {
    this.setState({ que1: e.target.value }, () => {
      console.log(this.state.que1);
    });
  };

  handleque2 = (e) => {
    this.setState({ que2: e.target.value }, () => {
      console.log(this.state.que2);
    });
  };

  handleque3 = (e) => {
    this.setState({ que3: e.target.value }, () => {
      console.log(this.state.que3);
    });
  };

  handleque4 = (e) => {
    this.setState({ que4: e.target.value }, () => {
      console.log(this.state.que4);
    });
  };

  handleque5 = (e) => {
    this.setState({ que5: e.target.value }, () => {
      console.log(this.state.que5);
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { kode, alternatif, que1, que2, que3, que4, que5 } = this.state;
    const nilai = [
      parseInt(que1),
      parseInt(que2),
      parseInt(que3),
      parseInt(que4),
      parseInt(que5),
    ];
    this.ref
      .add({
        kode,
        alternatif,
        nilai,
      })
      .then((docRef) => {
        this.setState({
          kode: "",
          alternatif: "",
          // que1,
          // que2,
          // que3,
          // que4,
          // que5,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { kode, alternatif } = this.state;
    return (
      <div>
        <HeaderThree />
        <div
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "50px",
          }}
        >
          <div className="card">
            <div className="card-header">Tambah Data Siswa</div>
            <div className="card-body">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="kode">Kode:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="kode"
                        value={kode}
                        onChange={this.onChange}
                        placeholder="Masukan Kode"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="alternatif">Nama Alternatif:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="alternatif"
                        value={alternatif}
                        onChange={this.onChange}
                        placeholder="Masukan Nama Alternatif"
                      />
                    </div>
                    {/* PERTANYAAN 1 */}
                    <label className="D-block">Pertanyaan 1</label>
                    <div className="form-group">
                      <div className="btn-group">
                        <label className="D-block">Nilai:</label>
                        <select
                          className="form-control mr-3 ml-2"
                          onClick={this.handleque1}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* PERTANYAAN 2 */}
                    <label className="D-block">Pertanyaan 2</label>
                    <div className="form-group">
                      <div className="btn-group">
                        <label className="D-block">Nilai:</label>
                        <select
                          className="form-control mr-3 ml-2"
                          onClick={this.handleque2}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* PERTANYAAN 3 */}
                    <label className="D-block">Pertanyaan 3</label>
                    <div className="form-group">
                      <div className="btn-group">
                        <label className="D-block">Nilai:</label>
                        <select
                          className="form-control mr-3 ml-2"
                          onClick={this.handleque3}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* PERTANYAAN 4 */}
                    <label className="D-block">Pertanyaan 4</label>
                    <div className="form-group">
                      <div className="btn-group">
                        <label className="D-block">Nilai:</label>
                        <select
                          className="form-control mr-3 ml-2"
                          onClick={this.handleque4}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* PERTANYAAN 5 */}
                    <label className="D-block">Pertanyaan 5</label>
                    <div className="form-group">
                      <div className="btn-group">
                        <label className="D-block">Nilai:</label>
                        <select
                          className="form-control mr-3 ml-2"
                          onClick={this.handleque5}
                        >
                          {this.state.nilai.map((n, index) => (
                            <option key={index} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
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
      </div>
    );
  }
}

export default Create;
