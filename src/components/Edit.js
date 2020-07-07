import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      kode:'',
      alternatif:''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('siswa').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const alter = doc.data();
        this.setState({
          key: doc.id,
          kode: alter.kode,
          alternatif: alter.alternatif
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({alter:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { kode, alternatif } = this.state;

    const updateRef = firebase.firestore().collection('siswa').doc(this.state.key);
    updateRef.set({
        kode, alternatif
    }).then((docRef) => {
      this.setState({
        key: '',
        kode: '',
        alternatif: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Kode:</label>
                <input type="text" class="form-control" name="kode" value={this.state.kode} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="author">Alternatif:</label>
                <input type="text" class="form-control" name="alternatif" value={this.state.alternatif} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;