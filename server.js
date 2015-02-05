/*
* Modules
*/
var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib')

/*
* Express
*/
var app = express()
function compile(str, path){
	return stylus(str)
		.set('filename', path)
		.use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
	res.render('index')
})

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  })
})

app.get('/projects', function(req, res){
	res.render('projects', {
		title: "Sam Coe's Projects"
	})
})


//Check for environment and listen
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});