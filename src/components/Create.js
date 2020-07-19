import React, { Component } from "react";
import firebase from "../Firebase";
import HeaderThree from "../components/Header/HeaderThree";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("siswa");
    this.bon = firebase.firestore().collection("data_kriteria");
    this.unsubscribeTwo = null;
    this.state = {
      kode: "",
      alternatif: "",
      perta: [],
      kriter: [],
      bon: [],
      isOpen: false,
      que: [],
      nilai: [1, 2, 3, 4, 5],
    };
  }

  onCollectionUpdateTwo = (querySnapshot) => {
    const kriter = [];
    querySnapshot.forEach((doc) => {
      const { kode, kriteria, bobot, atribut } = doc.data();
      kriter.push({
        key: doc.id,
        doc,
        kode,
        kriteria,
        bobot,
        atribut,
      });
    });

    let baru = [];
    for (let i = 0; i < kriter.length; i++) {
      if (i === 0) {
        baru.push(true);
      } else {
        baru.push(false);
      }
    }

    this.setState({
      kriter,
      que: baru,
    });

    const perta = [];
    for (let i = 0; i < this.state.kriter.length; i++) {
      const element = this.state.kriter[i];
      perta.push(element.kriteria);
    }

    this.setState({
      perta,
    });
  };

  componentDidMount() {
    this.unsubscribeTwo = this.bon.onSnapshot(this.onCollectionUpdateTwo);
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  juk = () => {
  alert(`
  - Masukan Kode dengan Awalan SI di tambah nomor ex : SI1
  - Masukan nama alternatif untuk nama siswa
  - Pilih bobot nilai 1 - 5
  - Keterangan bobot Nilai : 
    - 10 - 20 : 1
    - 30 - 40 : 2
    - 50 - 60 : 3
    - 70 - 80 : 4
    - 90 - 100 : 5
  `)  
  };

  handleque1 = (e, index) => {
    let bon = [...this.state.bon];
    let que = [...this.state.que];
    que[index + 1] = true;
    if (bon[index] != undefined) {
      bon[index] = parseInt(e.target.value);
    } else {
      bon.push(parseInt(e.target.value));
    }

    this.setState({
      bon,
      que,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { kode, alternatif, nilai } = this.state;
    if (kode != "") {
      this.ref
        .add({
          kode,
          alternatif,
          nilai: this.state.bon,
        })
        .then((docRef) => {
          this.setState({
            kode: "",
            alternatif: "",
          });
          this.props.history.push("/home");
          alert("Data Berhasil Di input");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("Silahkan Lengkapi Data");
    }
  };

  render() {
    const { kode, alternatif } = this.state;
    return (
      <div>
        <HeaderThree />
        <div
          style={{
            paddingLeft: "300px",
            paddingRight: "300px",
            paddingBottom: "50px",
          }}
        >
          <button className="btn btn-primary mb-4" onClick={this.juk}>
            Petunjuk
          </button>
          <div className="card">
            <div className="card-header bg-primary">
              <a style={{ color: "white" }}>Tambah Data Siswa</a>
            </div>
            <div className="card-body">
              <div className="panel panel-default">
                <div
                  className="panel-body"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                    {this.state.kriter.map((loopQue, index) => (
                      <div key={index}>
                        <label className="D-block">
                          Pertanyaan {loopQue.kriteria}
                        </label>
                        <div className="form-group">
                          <div className="btn-group">
                            <label className="D-block">Nilai:</label>
                            <select
                              defaultValue="kosong"
                              disabled={!this.state.que[index]}
                              className="form-control mr-3 ml-2"
                              onChange={(e) => this.handleque1(e, index)}
                            >
                              <option disabled value="kosong">
                                Pilih
                              </option>
                              {this.state.nilai.map((n, index) => (
                                <option key={index} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
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
