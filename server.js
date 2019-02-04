var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var path = require('path');
var port = process.env.PORT || 4000;

var app = express(); 

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'route-react-sql'
});
 
connection.connect((err) => {
	if (err) throw err;
	console.log('database connected');
});

/*app.get('/', (req, res) => {
	res.send('Welcome to route-react-sql API');
})*/

// CRUD rute_perjalanan table
// get data
app.get('/rute', (req, res) => {
	connection.query('SELECT * FROM rute_perjalanan ORDER BY no', function (err, result, fields) {
		if (err) console.log(err);
		res.json(result);
	})
});



// delete data
app.get('/rute/delete/:no', (req, res) => {
	var sql = `DELETE FROM rute_perjalanan WHERE no = ?`;
	connection.query(sql, req.params.no, (err, result, fields) => {
		if (err) console.log(err);
		res.send('Delete no ' + req.params.no + ' success!');
	})
})

// insert data 
app.get('/rute/add', (req, res) => {
	var { no, perjalanan, start_lat, start_lon, end_lat, end_lon } = req.query;
	var sql = `INSERT INTO rute_perjalanan (no, perjalanan, start_latitude, start_longitude, end_latitude, end_longitude) VALUES (${no}, '${perjalanan}', '${start_lat}', '${start_lon}', '${end_lat}', '${end_lon}')`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send('successfully added perjalanan');
	}) 
})

// update data
app.get('/rute/update/:no', (req, res) => {
	let noUpdate = req.params.no;
	var { no, perjalanan, start_lat, start_lon, end_lat, end_lon } = req.query;
	var sql = `UPDATE rute_perjalanan SET no = ${no}, perjalanan = '${perjalanan}', start_latitude = '${start_lat}', start_longitude = '${start_lon}', end_latitude = '${end_lat}', end_longitude = '${end_lon}' WHERE no = ${noUpdate}`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send('Updated');
	})
})

// CRUD waypoints table
// insert data 
app.get('/waypoints/add', (req, res) => {
	var { no_rute, lat, lon } = req.query;
	var sql = `INSERT INTO waypoints (no_rute, latitude, longitude) VALUES (${no_rute}, '${lat}', '${lon}')`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send('successfully added waypoint');
	}) 
})

//get data
app.get('/waypoints', (req, res) => {
	connection.query('SELECT * FROM waypoints ORDER BY no_rute', function (err, result, fields) {
		if (err) console.log(err);
		res.json(result);
	})
});

// delete data
app.get('/waypoints/delete/:id', (req, res) => {
	var sql = `DELETE FROM waypoints WHERE id = ?`;
	connection.query(sql, req.params.id, (err, result) => {
		if (err) console.log(err);
		res.send('Delete a waypoint success!');
	})
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);