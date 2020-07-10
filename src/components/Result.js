import React, { Component } from "react";
import "../App.css";
import firebase from "../Firebase";
import HeaderTwo from "../components/Header/HeaderTwo";

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
      tabelTotal: [],
      rank: [],
      totalRank:[]
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
    let tabelTotal = [];
    for (const item of this.state.alter) {
      tabelTotal.push([
        // PUSH KODE
        item.alternatif,

        // PUSH POSITIF
        parseFloat(
          Math.sqrt(
            (item.nilai[0] /
              Math.sqrt(this.state.que1.reduce((n, x, i) => n + x, 0))) *
              5 -
              Math.min.apply(null, this.state.mtk1)
          ) +
            Math.sqrt(
              (item.nilai[1] /
                Math.sqrt(this.state.que2.reduce((n, x, i) => n + x, 0))) *
                3 -
                Math.max.apply(null, this.state.mtk2)
            ) +
            Math.sqrt(
              (item.nilai[2] /
                Math.sqrt(this.state.que3.reduce((n, x, i) => n + x, 0))) *
                4 -
                Math.min.apply(null, this.state.mtk3)
            ) +
            Math.sqrt(
              (item.nilai[3] /
                Math.sqrt(this.state.que4.reduce((n, x, i) => n + x, 0))) *
                2 -
                Math.max.apply(null, this.state.mtk4)
            ) +
            Math.sqrt(
              (item.nilai[4] /
                Math.sqrt(this.state.que5.reduce((n, x, i) => n + x, 0))) *
                5 -
                Math.max.apply(null, this.state.mtk5)
            )
        ) || 0,

        // PUSH NEGATIF
        parseFloat(
          Math.sqrt(
            (item.nilai[0] /
              Math.sqrt(this.state.que1.reduce((n, x, i) => n + x, 0))) *
              5 -
              Math.max.apply(null, this.state.mtk1)
          ) +
            Math.sqrt(
              (item.nilai[1] /
                Math.sqrt(this.state.que2.reduce((n, x, i) => n + x, 0))) *
                3 -
                Math.min.apply(null, this.state.mtk2)
            ) +
            Math.sqrt(
              (item.nilai[2] /
                Math.sqrt(this.state.que3.reduce((n, x, i) => n + x, 0))) *
                4 -
                Math.max.apply(null, this.state.mtk3)
            ) +
            Math.sqrt(
              (item.nilai[3] /
                Math.sqrt(this.state.que4.reduce((n, x, i) => n + x, 0))) *
                2 -
                Math.min.apply(null, this.state.mtk4)
            ) +
            Math.sqrt(
              (item.nilai[4] /
                Math.sqrt(this.state.que5.reduce((n, x, i) => n + x, 0))) *
                5 -
                Math.min.apply(null, this.state.mtk5)
            )
        ) || 0,
      ]);
    }
    this.setState({
      tabelTotal,
    });
    let rank = [];
    for (const item of this.state.tabelTotal) {
      // const name = 
      const data = [
        item[0], parseFloat(item[2] / (item[1] + item[2]))
      ]
      rank.push(data);
    }
    this.setState({
      rank,
    });

    let a = []
    for (let i = 0; i < rank.length; i++) {
      const data = rank[i][1];
      a.push(data)
    }
    const max = Math.max.apply(null, a)
    const ext = rank.filter(v => v[1] === max)
    this.setState({
      totalRank: [ext[0][0], max]
    })
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <HeaderTwo />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              {/* TABEL 1 */}
              <h2>1. Tabel Kuadrat</h2>
              <table className="table table-stripe table-bordered">
                <thead className="table-primary">
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
                    <tr key={index}>
                      <td>
                        {alter.kode}
                      </td>
                      <td>{alter.nilai[0] * alter.nilai[0]}</td>
                      <td>{alter.nilai[1] * alter.nilai[1]}</td>
                      <td>{alter.nilai[2] * alter.nilai[2]}</td>
                      <td>{alter.nilai[3] * alter.nilai[3]}</td>
                      <td>{alter.nilai[4] * alter.nilai[4]}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td> {this.state.que1.reduce((n, x, i) => n + x, 0)}</td>
                    <td> {this.state.que2.reduce((n, x, i) => n + x, 0)}</td>
                    <td> {this.state.que3.reduce((n, x, i) => n + x, 0)}</td>
                    <td> {this.state.que4.reduce((n, x, i) => n + x, 0)}</td>
                    <td> {this.state.que5.reduce((n, x, i) => n + x, 0)}</td>
                  </tr>
                </tbody>
              </table>

              {/* TABEL 2 */}
              <h2>2. Tabel Normalisasi</h2>
              <table className="table table-stripe table-bordered">
                <thead className="table-primary">
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
                    <tr key={index}>
                      <td>
                        {alter.kode}
                      </td>
                      <td>
                        {(
                          alter.nilai[0] /
                          Math.sqrt(
                            this.state.que1.reduce((n, x, i) => n + x, 0)
                          )
                        ).toFixed(5)}
                      </td>
                      <td>
                        {(
                          alter.nilai[1] /
                          Math.sqrt(
                            this.state.que2.reduce((n, x, i) => n + x, 0)
                          )
                        ).toFixed(5)}
                      </td>
                      <td>
                        {(
                          alter.nilai[2] /
                          Math.sqrt(
                            this.state.que3.reduce((n, x, i) => n + x, 0)
                          )
                        ).toFixed(5)}
                      </td>
                      <td>
                        {(
                          alter.nilai[3] /
                          Math.sqrt(
                            this.state.que4.reduce((n, x, i) => n + x, 0)
                          )
                        ).toFixed(5)}
                      </td>
                      <td>
                        {(
                          alter.nilai[4] /
                          Math.sqrt(
                            this.state.que5.reduce((n, x, i) => n + x, 0)
                          )
                        ).toFixed(5)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TABEL 3 */}
              <h2>3. Tabel Normalisasi Terbobot</h2>
              <table className="table table-stripe table-bordered">
                <thead className="table-primary">
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
                    <tr key={index}>
                      <td>
                        {alter.kode}
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

              {/* TABEL 4 */}
              <h2>4. Tabel Matriks Solusi Ideal</h2>
              <table className="table table-stripe table-bordered">
                <thead className="table-primary">
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
                    <td>{Math.min.apply(null, this.state.mtk1).toFixed(5)}</td>
                    <td>{Math.max.apply(null, this.state.mtk2).toFixed(5)}</td>
                    <td>{Math.min.apply(null, this.state.mtk3).toFixed(5)}</td>
                    <td>{Math.max.apply(null, this.state.mtk4).toFixed(5)}</td>
                    <td>{Math.max.apply(null, this.state.mtk5).toFixed(5)}</td>
                  </tr>
                  <tr>
                    <td>Negatif</td>
                    <td>{Math.max.apply(null, this.state.mtk1).toFixed(5)}</td>
                    <td>{Math.min.apply(null, this.state.mtk2).toFixed(5)}</td>
                    <td>{Math.max.apply(null, this.state.mtk3).toFixed(5)}</td>
                    <td>{Math.min.apply(null, this.state.mtk4).toFixed(5)}</td>
                    <td>{Math.min.apply(null, this.state.mtk5).toFixed(5)}</td>
                  </tr>
                </tbody>
              </table>

              {/* TABEL  5 */}
              <h2>5. Tabel Total</h2>
              <table className="table table-stripe table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>Nama</th>
                    <th>Positif</th>
                    <th>Negatif</th>
                    <th>Preferensi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tabelTotal.map((alter, index) => (
                    <tr key={index}>
                      <td>{alter[0]}</td>
                      <td>{alter[1].toFixed(5)}</td>
                      <td>{alter[2].toFixed(5)}</td>
                      <td>{(alter[2] / (alter[1] + alter[2])).toFixed(5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Dari hasil perhitungan dari tabel - tabel di atas dapat kita simpulkan bahwa peringkat pertama adalah : <span style={{color:"#2979A0"}}>{this.state.totalRank[0]}{" "}</span>
                dengan nilai preferensinya adalah : <span style={{color:"#2979A0"}}> {parseFloat(this.state.totalRank[1]).toFixed(5)}{" "} </span>  
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
