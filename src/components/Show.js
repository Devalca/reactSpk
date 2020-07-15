import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import HeaderOne from "../components/Header/HeaderOne";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alter: {},
      key: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("siswa")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          alter: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("siswa")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div>
        <HeaderOne />
        <div
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "50px",
          }}
        >
          <div className="card">
            <div className="card-header">Warning!</div>
            <div className="card-body">
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <p>APAKAH ANDA YAKIN INGIN MENGHAPUS SISWA INI?</p>
                    <p>Klik tombol hapus untuk melanjutkan atau klik tombol kembali untuk membatalkan</p>
                    <button
                      onClick={this.delete.bind(this, this.state.key)}
                      class="btn btn-danger mr-5"
                    >
                      Hapus
                    </button>
                    <Link to="/">
                      <button className="btn btn-primary" type="button">
                        Kembali
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
