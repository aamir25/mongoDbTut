var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Connection URL.//Connection object.
var url = 'mongodb://localhost:27017/usersDemo';
var db = mongoose.connection;
var app = express();

var userSchema = mongoose.Schema({
	name : String,
	email : String,
	age : Number,

});
var user = mongoose.model('user', userSchema);//Compiling schema to model.

mongoose.connect(url, {
	useMongoClient : true
});

db.on('error', function(error) {
	console.log("Connection Error : " + error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CREATE
app.post('/users', (request, response) => {
	db.collection('users').save(request.body, (error, result) => {
		if(error) {
			response.send({
				success : false,
				error : error
			});
			return console.log(error);
		}
		console.log("Saved to database.");
		response.send({
			success : true,
			error : false
		});
	});
});

//READ
app.get("/users", (request, response) => {
	user.find(function(error, user) {
 		if(error){
 			response.send({
 				success : false,
 				error : error
 			});
 			return console.error(error);
 		}
 		console.log(user);
		response.send(user);
 	});
});

//UPDATE
app.post('/user/id/:id', (request, response) => {
	user.findById({_id : request.params.id}, (error, user) => {
		if(error) {
			response.send({
				success : false,
				error : error
			});
		}
		user.name = request.body.name;
		user.email = request.body.email;
		user.age = request.body.age;

		user.save((error, user) => {
			if (error) {
				response.send({
					success : false,
					error : error
				});
			}
			response.send({
				success : true,
				error : false
			});
		});
		console.log(user);
	});
});

//DELETE
app.delete('/user/id/:id', (request, response) => {
	user.findByIdAndRemove(request.params.id, (error, user) => {
		if (error) {
			response.send({
				success : false,
				error : error
			});
		}
		response.send({
			success : true,
			error : false
		});
	});
});

app.listen(8080, () => {
	console.log("Listening on port 8080");
});

// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var mongoose = require('mongoose');

// var url = 'mongodb://localhost:27017/mongoDbTut';//Connection URL.
// var db = mongoose.connection;//Connection object.

// //Establish connection to the server.
// mongoose.connect(url, {
// 	useMongoClient : true
// });

// db.on('error', function(error) {
// 	console.log("Connection Error : " + error);
// });
// db.once('open', function() {
// 	console.log("Successfully connected!");
// });

// //Defining schemas for kitty.
// var kittySchema = mongoose.Schema({
// 	name : String
// });

// kittySchema.methods.speak = function() {
// 	var greeting = this.name ? "Meow name is " + this.name + "." : "The program has no name."

// 	console.log(greeting);
// };

// var kitten = mongoose.model('Kitten', kittySchema);//Compiling schema to model.
// var silence = new kitten({ name : 'Silence' });
// var fluffy = new kitten({ name : 'Fluffy'});

// Promise.all([silence.save(), fluffy.save()])
// .then(() => {
// 	kitten.find(function(error, kitten) {
// 		if(error) return console.error(error);
// 		console.log(kitten);
// 	});	
// });

// kitten.find({ name : /^Fluf/}, (error, doc) => {
// 	if(error) return console.error(error);
// 	console.log(doc);
// });

//Establish Connection to the server
// MongoClient.connect(url, function(err, db) {
// 	assert.equal(null, err);
// 	console.log("Connected successfully to the server.");

// 	insertDocuments(db, function() {
// 		findDocuments(db, function() {
// 			db.close();
// 		});
// 	});
// });

// var insertDocuments = function(db, callback) {
	//Get the documents collection
	// var collection = db.collection('documents');
	//Insert some documents
// 	collection.insertMany([
// 			{a : 1}, {b : 2}, {c : 3}
// 		], function(error, result) {
// 			assert.equal(error, null);
// 			assert.equal(3, result.result.n);
// 			assert.equal(3, result.ops.length);
// 			console.log("Inserted 3 documents into the collection");
// 			callback(result);
// 		});
// }

// var findDocuments = function(db, callback) {
	//Get the documents collection
	// var collection = db.collection('documents');
	//Find some documents
// 	collection.find({a : 1}).toArray(function(error, docs) {
// 		assert.equal(error, null);
// 		console.log("Found the following records.");
// 		console.log(docs)
// 		callback(docs);
// 	});
// }