import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../Firebase";

class Result extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("siswa");
    this.unsubscribe = null;
    this.state = {
      alter: [],
      que1: [],
      que2: [],
      que3: [],
      que4: [],
      que5: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const alter = [];
    querySnapshot.forEach((doc) => {
      const { kode, alternatif, nilai } = doc.data();
      alter.push({
        key: doc.id,
        doc,
        kode,
        alternatif,
        nilai,
      });
    });
    this.setState({
      alter,
    });
    let que1 = [...this.state.que1];
    let que2 = [...this.state.que2];
    let que3 = [...this.state.que3];
    let que4 = [...this.state.que4];
    let que5 = [...this.state.que5];
    for (const item of this.state.alter) {
      que1.push(item.nilai[0] * item.nilai[0]);
      que2.push(item.nilai[1] * item.nilai[1]);
      que3.push(item.nilai[2] * item.nilai[2]);
      que4.push(item.nilai[3] * item.nilai[3]);
      que5.push(item.nilai[4] * item.nilai[4]);
    }
    this.setState({
      que1,
      que2,
      que3,
      que4,
      que5,
    });
    let mtk1 = [];
    let mtk2 = [];
    let mtk3 = [];
    let mtk4 = [];
    let mtk5 = [];
    for (const item of this.state.alter) {
      mtk1.push(
        item.nilai[0] / Math.sqrt(this.state.que1.reduce((n, x, i) => n + x, 0))
      );
      mtk2.push(
        item.nilai[1] / Math.sqrt(this.state.que2.reduce((n, x, i) => n + x, 0))
      );
      mtk3.push(
        item.nilai[2] / Math.sqrt(this.state.que3.reduce((n, x, i) => n + x, 0))
      );
      mtk4.push(
        item.nilai[3] / Math.sqrt(this.state.que4.reduce((n, x, i) => n + x, 0))
      );
      mtk5.push(
        item.nilai[4] / Math.sqrt(this.state.que5.reduce((n, x, i) => n + x, 0))
      );
    }
    this.setState({
      mtk1,
      mtk2,
      mtk3,
      mtk4,
      mtk5,
    });
    // let sorrt1 = [Math.max.apply(null, mtk1)];
    // let sorrt2 = Math.max.apply(null, mtk2);
    // let sorrt3 = Math.max.apply(null, mtk3);
    // let sorrt4 = Math.max.apply(null, mtk4);
    // let sorrt5 = Math.max.apply(null, mtk5);
    // this.setState({
    //   mtk1: sorrt1,
    //   mtk2: sorrt2,
    //   mtk3: sorrt3,
    //   mtk4: sorrt4,
    //   mtk5: sorrt5,
    // });
    // let sortt = [...mtk1];
    // sortt = sortt.sort((a, b) => b - a);
    // this.setState({
    //   mtk1: sortt,
    // });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Tabel Nilai</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/" className="btn btn-primary">
                HOME
              </Link>
            </h4>
            <label>1. Tabel Kuadrat</label>
            <table id="nilai" class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>que1</th>
                  <th>que2</th>
                  <th>que3</th>
                  <th>que4</th>
                  <th>que5</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alter.map((alter, index) => (
                  <tr>
                    <td>
                      <Link to={`/show/${alter.key}`}>{alter.kode}</Link>
                    </td>
                    <td>{alter.nilai[0] * alter.nilai[0]}</td>
                    <td>{alter.nilai[1] * alter.nilai[1]}</td>
                    <td>{alter.nilai[2] * alter.nilai[2]}</td>
                    <td>{alter.nilai[3] * alter.nilai[3]}</td>
                    <td>{alter.nilai[4] * alter.nilai[4]}</td>
                  </tr>
                ))}
                <td>Total</td>
                <td> {this.state.que1.reduce((n, x, i) => n + x, 0)}</td>
                <td> {this.state.que2.reduce((n, x, i) => n + x, 0)}</td>
                <td> {this.state.que3.reduce((n, x, i) => n + x, 0)}</td>
                <td> {this.state.que4.reduce((n, x, i) => n + x, 0)}</td>
                <td> {this.state.que5.reduce((n, x, i) => n + x, 0)}</td>
              </tbody>
            </table>
            <label>2. Tabel Normalisasi</label>
            <table id="nilai" class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>que1</th>
                  <th>que2</th>
                  <th>que3</th>
                  <th>que4</th>
                  <th>que5</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alter.map((alter, index) => (
                  <tr>
                    <td>
                      <Link to={`/show/${alter.key}`}>{alter.kode}</Link>
                    </td>
                    <td>
                      {(
                        alter.nilai[0] /
                        Math.sqrt(this.state.que1.reduce((n, x, i) => n + x, 0))
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        alter.nilai[1] /
                        Math.sqrt(this.state.que2.reduce((n, x, i) => n + x, 0))
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        alter.nilai[2] /
                        Math.sqrt(this.state.que3.reduce((n, x, i) => n + x, 0))
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        alter.nilai[3] /
                        Math.sqrt(this.state.que4.reduce((n, x, i) => n + x, 0))
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        alter.nilai[4] /
                        Math.sqrt(this.state.que5.reduce((n, x, i) => n + x, 0))
                      ).toFixed(5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <label>3. Tabel Normalisasi Terbobot</label>
            <table id="nilai" class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>que1</th>
                  <th>que2</th>
                  <th>que3</th>
                  <th>que4</th>
                  <th>que5</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alter.map((alter, index) => (
                  <tr>
                    <td>
                      <Link to={`/show/${alter.key}`}>{alter.kode}</Link>
                    </td>
                    <td>
                      {(
                        (alter.nilai[0] /
                          Math.sqrt(
                            this.state.que1.reduce((n, x, i) => n + x, 0)
                          )) *
                        5
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        (alter.nilai[1] /
                          Math.sqrt(
                            this.state.que2.reduce((n, x, i) => n + x, 0)
                          )) *
                        3
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        (alter.nilai[2] /
                          Math.sqrt(
                            this.state.que3.reduce((n, x, i) => n + x, 0)
                          )) *
                        4
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        (alter.nilai[3] /
                          Math.sqrt(
                            this.state.que4.reduce((n, x, i) => n + x, 0)
                          )) *
                        2
                      ).toFixed(5)}
                    </td>
                    <td>
                      {(
                        (alter.nilai[4] /
                          Math.sqrt(
                            this.state.que5.reduce((n, x, i) => n + x, 0)
                          )) *
                        5
                      ).toFixed(5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <label>4. Tabel Matriks Solusi Ideal</label>
            <table id="nilai" class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>que1 (cost)</th>
                  <th>que2 (benefit)</th>
                  <th>que3 (cost)</th>
                  <th>que4 (benefit)</th>
                  <th>que5 (benefit)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>positif</td>
                  <td>{(Math.min.apply(null, this.state.mtk1).toFixed(5))}</td>
                  <td>{(Math.max.apply(null, this.state.mtk2).toFixed(5))}</td>
                  <td>{(Math.min.apply(null, this.state.mtk3).toFixed(5))}</td>
                  <td>{(Math.max.apply(null, this.state.mtk4).toFixed(5))}</td>
                  <td>{(Math.max.apply(null, this.state.mtk5).toFixed(5))}</td>
                </tr>
                <tr>
                  <td>Negatif</td>
                  <td>{(Math.max.apply(null, this.state.mtk1).toFixed(5))}</td>
                  <td>{(Math.min.apply(null, this.state.mtk2).toFixed(5))}</td>
                  <td>{(Math.max.apply(null, this.state.mtk3).toFixed(5))}</td>
                  <td>{(Math.min.apply(null, this.state.mtk4).toFixed(5))}</td>
                  <td>{(Math.min.apply(null, this.state.mtk5).toFixed(5))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
