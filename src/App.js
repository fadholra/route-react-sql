import React, { Component } from 'react';
import './App.css';

// default state for App constructor
const stateDefault = {
      no: '',
      perjalanan: '',
      noUpdate: 0,
      startLat: '',
      startLon: '',
      endLat: '',
      endLon: '',
      wayPointNo: '',
      wayPointLat: '',
      wayPointLon: ''
    }

// main component
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      datas: [{}],
      waypoints: [],
      displayMap: []
    }
    
    // binding
    this.addPerjalanan = this.addPerjalanan.bind(this);
    this.editPerjalanan = this.editPerjalanan.bind(this);
    this.updatePerjalanan = this.updatePerjalanan.bind(this);
    this.deletePerjalanan = this.deletePerjalanan.bind(this);
  } 

  componentDidMount() {
    this.getPerjalanan();
  }

  addPerjalanan(e) {
    fetch(`/rute/add?no=${this.state.no}&perjalanan=${this.state.perjalanan}&start_lat=${this.state.startLat}&start_lon=${this.state.startLon}&end_lat=${this.state.endLat}&end_lon=${this.state.endLon}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  editPerjalanan(e) {
    var noEdit = e.target.value;
    var data = this.state.datas.find(x => x.no == noEdit);
    this.setState({
      no: data.no,
      perjalanan: data.perjalanan,
      noUpdate: data.no,
      startLat: data.start_latitude,
      startLon: data.start_longitude,
      endLat: data.end_latitude,
      endLon: data.end_longitude
    })    
  }

  updatePerjalanan(e) {
    var noUpdate = parseInt(this.state.noUpdate);
    var no = parseInt(this.state.no);
    fetch(`/rute/update/${noUpdate}?no=${no}&perjalanan=${this.state.perjalanan}&start_lat=${this.state.startLat}&start_lon=${this.state.startLon}&end_lat=${this.state.endLat}&end_lon=${this.state.endLon}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  deletePerjalanan(e) {
    var noDelete = e.target.value;
    fetch(`/rute/delete/${noDelete}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  getPerjalanan = () => {
    fetch('/rute')
      .then(response => response.json())
      .then(response => { 
        this.setState({ datas: response });
    });
    fetch('/waypoints')
      .then(response => response.json())
      .then(response => { 
        this.setState({ 
          waypoints: response
        });
    });
    this.setState(stateDefault);
  }

  // find specific data and parse to Map 
  routePerjalanan = (e) => {
    var data = this.state.datas.find(x => x.no == e.target.value);
    var waypoints = this.state.waypoints.filter(x => x.no_rute == e.target.value);
    var map = <Map startLat={ data.start_latitude } startLon={ data.start_longitude } endLat={ data.end_latitude } endLon={ data.end_longitude } waypoints={ waypoints } />;
    this.setState({
      displayMap: map
    })
  }

  handleChangeNo = (e) => {
    this.setState({
      no: e.target.value
    })
  }

  handleChangePerjalanan = (e) => {
    this.setState({
      perjalanan: e.target.value
    })
  }

  handleChangeStartLat = (e) => {
    this.setState({
      startLat: e.target.value
    })
  }
  
  handleChangeStartLon = (e) => {
    this.setState({
      startLon: e.target.value
    })
  }
  
  handleChangeEndLat = (e) => {
    this.setState({
      endLat: e.target.value
    })
  }
  
  handleChangeEndLon = (e) => {
    this.setState({
      endLon: e.target.value
    })
  }

  // handle waypoint component
  handleChangeWaypointNo = (e) => {
    this.setState({
      wayPointNo: e.target.value 
    })
  }

  handleChangeWaypointLat = (e) => {
    this.setState({
      wayPointLat: e.target.value
    })
  }

  handleChangeWaypointLon = (e) => {
    this.setState({
      wayPointLon: e.target.value
    })
  }

  addWaypoint = (e) => {
    var s = this.state;
    fetch(`/waypoints/add?no_rute=${s.wayPointNo}&lat=${s.wayPointLat}&lon=${s.wayPointLon}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  deleteWaypoint = (e) => {
    var idDelete = e.target.value;
    fetch(`/delete/${idDelete}`)
      .then(this.getPerjalanan)
      .catch(err => err);
  }

  render() {
    return (
      <div id="App">
        <h3>Rute Perjalanan</h3>   
        { this.state.datas.map(x => 
          <div className="table">
            <div className="no">{x.no}</div>
            <div className="perjalanan">{x.perjalanan}</div> 
            <button className="btn-delete" value={ x.no } onClick={ this.deletePerjalanan } >delete</button>
            <button className="btn-edit" value={ x.no } onClick={ this.editPerjalanan } >edit</button>
            <button className="btn-route" value={ x.no } onClick={ this.routePerjalanan }>route</button>
          </div> )}
        <div id="input-add-update">
          <input className="input-add-no" placeholder="no" value={ this.state.no } type="number" onChange={ this.handleChangeNo } />
          <input className="input-add-perjalanan" placeholder="kegiatan..." value={ this.state.perjalanan } onChange={ this.handleChangePerjalanan } />
          <button className="btn-add" onClick={ this.addPerjalanan } >add</button>
          <button className="btn-update" onClick={ this.updatePerjalanan } >update</button> <br />
          <input className="input-add-start-lat" value={ this.state.startLat } onChange={ this.handleChangeStartLat } placeholder="start latitude..." />
          <input className="input-add-start-lon" value={ this.state.startLon } onChange={ this.handleChangeStartLon } placeholder="start longitude..." /> <br />
          <input className="input-add-end-lat" value={ this.state.endLat } onChange={ this.handleChangeEndLat } placeholder="end latitude..." />
          <input className="input-add-end-lon" value={ this.state.endLon } onChange={ this.handleChangeEndLon } placeholder="end longitude..." />
        </div>
        { this.state.displayMap }
        <WayPoint no={ this.handleChangeWaypointNo } lat={ this.handleChangeWaypointLat } lon={ this.handleChangeWaypointLon } add={ this.addWaypoint } state={ this.state } />
        { this.state.waypoints.map(x => 
          <div className="table">
            <div className="waypoint-no">{ x.no_rute }</div>
            <div className="waypoint-lat">{ x.latitude }</div>
            <div className="waypoint-lon">{ x.longitude }</div>
            <button className="btn-delete-waypoint" value={ x.id } onClick={ this.deleteWaypoint } >delete</button>
          </div> )}
      </div>
    );
  }
}

// add waypoint component
class WayPoint extends Component {
  render() {
    //console.log(this.props.add, "add");
    var props = this.props;
    return (
      <div id="waypoint">
        <h3>Tambah WayPoint</h3>
        <div className="waypoint-input">
          <input className="waypoint-input-no" value={ props.state.wayPointNo } onChange={ props.no } type="number" placeholder="no rute" ></input>
          <input className="waypoint-input-lat" value={ props.state.wayPointLat } onChange={ props.lat } placeholder="waypoint latitude..."></input>
          <input className="waypoint-input-lon" value={ props.state.wayPointLon } onChange={ props.lon } placeholder="waypoint longitude..."></input>          
        </div>
        <button className="btn-add-waypoint" onClick={ props.add }>add</button>
      </div>
    )
  }
}

// map component
class Map extends Component {
  componentDidMount() {    
    this.renderMap();
  }

  // render maps
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB6RKb0Y_vdn0lJc2DTDYZOsaipOxq4tYM&callback=initMap");
    window.initMap = this.initMap;
  }

  // initiate map
  initMap = () => {
    var directionsService = new window.google.maps.DirectionsService;
    var directionsDisplay = new window.google.maps.DirectionsRenderer;
    var map = new window.google.maps.Map(document.getElementById('map'), {
      //Sleman coords
      center: {lat: -7.716165, lng: 110.335403},
      zoom: 10
    });

    directionsDisplay.setMap(map);

    // create waypoint
    var waypts = [];
    this.props.waypoints.map(x => 
      waypts.push({
        location: {
          lat: parseFloat(x.latitude), 
          lng: parseFloat(x.longitude)
        }
      })
    );

    // create start-end point
    var startPoint = {
      lat: parseFloat(this.props.startLat),
      lng: parseFloat(this.props.startLon)
    }

    var endPoint = {
      lat: parseFloat(this.props.endLat),
      lng: parseFloat(this.props.endLon)
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay);

    // show route on map
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: startPoint,  
        destination: endPoint,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  render () {
    
    return (
      <div id="map"></div>
    ) 
  }
}

// add new script
function loadScript(source) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = source
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index);
}

export default App;