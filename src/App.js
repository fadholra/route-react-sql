import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [{}],
      /*data: {
        no: 0, 
        perjalanan: 'perjalanan'
      },*/
      no: '',
      perjalanan: '',
      noUpdate: 0
    }
    this.addPerjalanan = this.addPerjalanan.bind(this);
    this.getPerjalanan = this.getPerjalanan.bind(this);
    this.editPerjalanan = this.editPerjalanan.bind(this);
    this.updatePerjalanan = this.updatePerjalanan.bind(this);
    this.deletePerjalanan = this.deletePerjalanan.bind(this); 
    this.handleChangeNo = this.handleChangeNo.bind(this);
    this.handleChangePerjalanan = this.handleChangePerjalanan.bind(this);
  } 

  componentDidMount() {
    this.getPerjalanan();
  }

  addPerjalanan(e) {
    //const { data } = this.state;
    //e.preventDefault();
    fetch(`http://localhost:4000/test/add?no=${this.state.no}&perjalanan=${this.state.perjalanan}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  editPerjalanan(e) {
    var noEdit = e.target.value;
    var data = this.state.datas.find(x => x.no == noEdit);
    this.setState({
      no: data.no,
      perjalanan: data.perjalanan,
      noUpdate: data.no
    })
    console.log(data, "data");
    
  }

  updatePerjalanan(e) {
    var noUpdate = parseInt(this.state.noUpdate);
    var no = parseInt(this.state.no);
    fetch(`http://localhost:4000/test/update/${noUpdate}?no=${no}&perjalanan=${this.state.perjalanan}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  deletePerjalanan(e) {
    //e.preventDefault();
    var noDelete = e.target.value;
    //console.log(noDelete, "no Delete");
    fetch(`http://localhost:4000/test/delete/${noDelete}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  getPerjalanan() {
    fetch('http://localhost:4000/test')
      .then(response => response.json())
      .then(response => { 
        this.setState({ datas: response });
        //console.log(this.state.data);
    });
    this.setState({
      no: '',
      perjalanan: '',
      noUpdate: 0
    })
  }

  handleChangeNo(e) {
    /*
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        no: e.target.value
      }
    }))
    */
    this.setState({
      no: e.target.value
    })
  }

  handleChangePerjalanan(e) {
    /*
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        perjalanan: e.target.value
      }
    }))
    */
    this.setState({
      perjalanan: e.target.value
    })
  }

  render() {

    return (
      <div className="App">
        <h3>Rute Perjalanan</h3>   
        { this.state.datas.map(x => 
          <div className="table">
            <div className="no">{x.no}</div>
            <div className="perjalanan">{x.perjalanan}</div> 
            <button className="btn-delete" value={ x.no } onClick={ this.deletePerjalanan } >delete</button>
            <button className="btn-edit" value={ x.no } onClick={ this.editPerjalanan } >edit</button>
            <button className="btn-route" >route</button>
          </div>)}
        <div className="input-add-update">
          <input className="input-add-no" placeHolder="no..." value={ this.state.no } type="number" onChange={ this.handleChangeNo } />
          <input className="input-add-perjalanan" placeHolder="kegiatan..." value={ this.state.perjalanan } onChange={ this.handleChangePerjalanan } />
          <button className="btn-add" onClick={ this.addPerjalanan } >add</button>
          <button className="btn-update" onClick={ this.updatePerjalanan } >update</button>
        </div>
      </div>
    );
  }
}

export default App;
