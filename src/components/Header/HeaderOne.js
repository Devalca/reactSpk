import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";
class HeaderOne extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("siswa");
    this.bon = firebase.firestore().collection("data_kriteria");
    this.unsubscribe = null;
    this.unsubscribeTwo = null;
    this.state = {
      alter: [],
      kriter: [{}],
      showing: false,
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

    if (this.state.alter.length > 1) {
      this.setState({
        showing : true
      })
    }
  };

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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.unsubscribeTwo = this.bon.onSnapshot(this.onCollectionUpdateTwo);
  }

  logout() {
    firebase.auth().signOut();
  }
  render() {
    const { showing } = this.state;
    return (
      <div className="mb-5">
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Sistem Pemilihan Keputusan
          </a>
          <form className="form-inline">
            <Link to="/create">
              <button className="btn btn-light mr-3" type="button">
                Tambah Siswa
              </button>
            </Link>
            <Link to="/data">
              <button className="btn btn-light mr-3" type="button">
                Tambah Kriteria
              </button>
            </Link>
            {showing ? (       
               <Link to="/result">
               <button className="btn btn-light mr-3" type="button">
                 SUM
               </button>
             </Link>
            ) : null}
            <button
              className="btn btn-light"
              type="button"
              onClick={this.logout}
            >
              Logout
            </button>
          </form>
        </nav>
      </div>
    );
  }
}
export default HeaderOne;
