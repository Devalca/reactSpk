import React, { Component } from "react";
import "../App.css";
import firebase from "../Firebase";
import HeaderTwo from "../components/Header/HeaderTwo";

class Result extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("siswa");
    this.bon = firebase.firestore().collection("data_kriteria");
    this.unsubscribe = null;
    this.unsubscribeTwo = null;
    this.state = {
      alter: [],
      kriter: [{}],
      jumKuadrat: [],
      bobotKriter: [],
      arrMatriks: [],
      finalCount: [],
      allQue: [],
      sumAll: [],
      totalRank: [],
      show: false
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
    this.setState({
      kriter,
    });

    let bobotKriter = [];
    for (const item of this.state.kriter) {
      bobotKriter.push(item.bobot);
    }

    this.setState({
      bobotKriter,
    });

    console.log(bobotKriter)
  };

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

    let allQue = [...this.state.allQue];
    for (const item of this.state.alter) {
      allQue.push(item.nilai.map((nilai, j) => Math.pow(nilai, 2)));
    }

    this.setState({
      allQue,
    });

    const jumKuadrat = [];
    for (let i = 0; i < this.state.allQue[0].length; i++) {
      let sum = 0;
      for (let a = 0; a < this.state.allQue.length; a++) {
        sum = sum + this.state.allQue[a][i];
      }
      jumKuadrat.push(sum);
    }

    this.setState({
      jumKuadrat,
    });

    let mtk = [];
    for (let i = 0; i < this.state.alter.length; i++) {
      mtk.push(this.state.alter[i].nilai);
    }

    for (let i = 0; i < this.state.bobotKriter.length; i++) {
      const element = this.state.bobotKriter[i];
      console.log(element)
    }

    // console.log(mtk)
    // console.log(this.state.jumKuadrat)
    // console.log(bobotKriter)

    const firstArray = [];
    const newFirstArray = [];
    for (let i = 0; i < mtk.length; i++) {
      for (let j = 0; j < mtk[i].length; j++) {
        firstArray.push(
          (mtk[i][j] / Math.sqrt(this.state.jumKuadrat[j])) * this.state.bobotKriter[j]
        );
        if (firstArray.length >= mtk[0].length) {
          newFirstArray.push(firstArray.splice(0, mtk[0].length));
        }
      }
    }

    let forSum1 = [];
    for (let i = 0; i < mtk.length; i++) {
      for (let j = 0; j < mtk[i].length; j++) {
        forSum1.push(
          (mtk[i][j] / Math.sqrt(this.state.jumKuadrat[j])) * this.state.bobotKriter[j]
        );
      }
    }

    let arrMatriks = newFirstArray.reduce((c, v) => {
      v.forEach((o, i) => {
        c[i] = c[i] || [];
        c[i].push(o);
      });
      return c;
    }, []);

    this.setState({
      arrMatriks,
    });

    // console.log(arrMatriks)

    let forSumPositif = [];
    let forSumNegatif = [];
    for (let i = 0; i < arrMatriks.length; i++) {
      const element = arrMatriks[i];
      forSumPositif.push(Math.max.apply(null, element));
      forSumNegatif.push(Math.min.apply(null, element));
    }

    let p = 0;
    let n = 0;
    let nilaiPositif = [];
    let nilaiNegatif = [];
    for (let i = 0; i < forSum1.length; i++) {
      let positif = [];
      if (forSumPositif[p] === undefined) {
        p = 0;
        positif = Math.pow(forSumPositif[p] - forSum1[i], 2);
      } else {
        positif = Math.pow(forSumPositif[p] - forSum1[i], 2);
      }
      p++;
      nilaiPositif.push(positif);
    }

    for (let i = 0; i < forSum1.length; i++) {
      let negatif = [];
      if (forSumNegatif[n] === undefined) {
        n = 0;
        negatif = Math.pow(forSumNegatif[n] - forSum1[i], 2);
      } else {
        negatif = Math.pow(forSumNegatif[n] - forSum1[i], 2);
      }
      n++;
      nilaiNegatif.push(negatif);
    }

    let sumAll = [];
    for (let i = 0; i < this.state.alter.length; i++) {
      const element = this.state.alter[i].alternatif;
      let mon = { datas: element, posi: [], nega: [] };
      if (nilaiPositif.length >= mtk[0].length) {
        mon.posi.push(nilaiPositif.splice(0, mtk[0].length));
        mon.nega.push(nilaiNegatif.splice(0, mtk[0].length));
      }
      sumAll.push(mon);
    }

    this.setState({
      sumAll,
    });

    let finalCount = [];
    let forRank = [];
    for (let i = 0; i < sumAll.length; i++) {
      const element = sumAll[i].datas;
      let mon = { datas: element, p: [], n: [], rank: [] };
      mon.p.push(Math.sqrt(sumAll[i].posi[0].reduce((a, b) => a + b, 0)));
      mon.n.push(Math.sqrt(sumAll[i].nega[0].reduce((a, b) => a + b, 0)));
      mon.rank.push(
        Math.sqrt(sumAll[i].nega[0].reduce((a, b) => a + b, 0)) /
          (Math.sqrt(sumAll[i].posi[0].reduce((a, b) => a + b, 0)) +
            Math.sqrt(sumAll[i].nega[0].reduce((a, b) => a + b, 0)))
      );
      finalCount.push(mon);
      forRank.push([
        element,
        Math.sqrt(sumAll[i].nega[0].reduce((a, b) => a + b, 0)) /
          (Math.sqrt(sumAll[i].posi[0].reduce((a, b) => a + b, 0)) +
            Math.sqrt(sumAll[i].nega[0].reduce((a, b) => a + b, 0))),
      ]);
    }

    this.setState({
      finalCount,
    });
       
    let b = [];
    for (let i = 0; i < forRank.length; i++) {
      const data = forRank[i][1];
      b.push(data);
    }

    let forRankMax = Math.max.apply(null, b);
    let filterRank = forRank.filter((v) => v[1] === forRankMax);
    let jumjum = [filterRank[0][0], forRankMax]

    this.setState({
      totalRank: jumjum,
    });
  };

  componentDidMount() {
    this.unsubscribeTwo = this.bon.onSnapshot(this.onCollectionUpdateTwo);
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  com

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
                    {this.state.kriter.map((nilai, j) => (
                        <th key={j}>QUE{nilai.kode}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.alter.map((alter, index) => (
                    <tr key={index}>
                      <td>{alter.kode}</td>
                      {alter.nilai.map((nilai, j) => (
                        <td key={j}>{Math.pow(nilai, 2)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    {this.state.jumKuadrat.map((jumKuadrat, index) => (
                      <td>{jumKuadrat}</td>
                    ))}
                  </tr>
                </tbody>
              </table>

              {/* TABEL 2 */}
              <h2>2. Tabel Normalisasi</h2>
              <table className="table table-stripe table-bordered">
              <thead className="table-primary">
                  <tr>
                    <th>Kode</th>
                    {this.state.kriter.map((nilai, j) => (
                        <th key={j}>QUE{nilai.kode}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.alter.map((alter, index) => (
                    <tr key={index}>
                      <td>{alter.kode}</td>
                      {alter.nilai.map((nilai, j) => (
                        <td key={j}>
                          {(nilai / Math.sqrt(this.state.jumKuadrat[j])).toFixed(5)}
                        </td>
                      ))}
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
                    {this.state.kriter.map((nilai, j) => (
                        <th key={j}>QUE{nilai.kode}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.alter.map((alter, index) => (
                    <tr key={index}>
                      <td>{alter.kode}</td>
                      {alter.nilai.map((nilai, j) => (
                        <td key={j}>
                          {(
                            (nilai / Math.sqrt(this.state.jumKuadrat[j])) *
                            this.state.bobotKriter[j]
                          ).toFixed(5)}
                        </td>
                      ))}
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
                    {this.state.kriter.map((nilai, j) => (
                        <th key={j}>QUE{nilai.kode}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Positif</td>
                    {this.state.arrMatriks.map((nilai, j) => (
                      <td key={j}>{Math.max.apply(null, nilai).toFixed(5)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Negatif</td>
                    {this.state.arrMatriks.map((nilai, j) => (
                      <td key={j}>{Math.min.apply(null, nilai).toFixed(5)}</td>
                    ))}
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
                  {this.state.sumAll.map((alter, index) => (
                    <tr key={index}>
                      <td>{alter.datas}</td>
                      <td>
                        {Math.sqrt(
                          alter.posi[0].reduce((a, b) => a + b, 0)
                        ).toFixed(5)}
                      </td>
                      <td>
                        {Math.sqrt(
                          alter.nega[0].reduce((a, b) => a + b, 0)
                        ).toFixed(5)}
                      </td>
                      <td>
                        {(
                          Math.sqrt(alter.nega[0].reduce((a, b) => a + b, 0)) /
                          (Math.sqrt(alter.posi[0].reduce((a, b) => a + b, 0)) +
                            Math.sqrt(alter.nega[0].reduce((a, b) => a + b, 0)))
                        ).toFixed(5)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Dari hasil perhitungan dari tabel - tabel di atas dapat kita
                simpulkan bahwa peringkat pertama adalah :{" "}
                <span style={{ color: "#2979A0" }}>
                  {this.state.totalRank[0]}{" "}
                </span>
                dengan nilai preferensinya adalah :{" "}
                <span style={{ color: "#2979A0" }}>
                  {" "}
                  {parseFloat(this.state.totalRank[1]).toFixed(5)}{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;



    // let allSum1 = []
    // for (let i = 0; i < newFirstArray.length; i++) {
    //   // const element = newFirstArray[i];
    //   for (let j = 0; j < newFirstArray[i].length; j++) {
    //     const element = newFirstArray[i][j];
    //     allSum1.push(element)
    //   }

    // }

    // for (var j = 0; j < newFirstArray.length; j++) {
    //   var arrTemp = []
    //   for (var i = 0; i < newFirstArray.length; i++) {
    //     arrTemp[i] = newFirstArray[i][j];
    //     if (i === newFirstArray.length - 1) {
    //       bonArr.push(arrTemp)
    //     }
    //   }
    // }

    // let arrPost = []
    // for (let i = 0; i < newFirstArray.length; i++) {
    //   // const element = newFirstArray[i];
    //   for (let j = 0; j < newFirstArray[i].length; j++) {
    //     const elementX = newFirstArray[i][j];
    //     if (j == newFirstArray.length) {
    //       arrPost.push(elementX)
    //     }
    //   }
    //   console.log(arrPost)
    // }