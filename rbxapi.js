var express = require("express");
var bodyParser = require("body-parser");
var rbx = require("roblox-js");


// CONFIGURATION SECTION //

	// ROBLOX //
	
	// SET THESE FIELDS TO YOUR CREDENTIALS
	var USERNAME = "USERNAME";
	var PASSWORD = "PASSWORD";


	// SERVER //
	
	// BASIC SECURITY TO PREVENT FRAUDULENT REQUESTS //
	var REQUEST_AUTH_KEY = "AUTH_KEY_HERE";
	
	// DO NOT CHANGE UNLESS YOU KNOW WHAT YOU'RE DOING
	var PORT = 8080;
	
	
//


// BOT STUFF //

var loginData = {
	username: USERNAME,
	password: PASSWORD,
	
	success: function() {
		console.log("Successfully logged in as " + USERNAME + ".");
	}
};

rbx.login(loginData);

//


// SERVER STUFF //

var app = express();
var rbxapi = express.Router();
var groups = express.Router();


// HANDLERS

function sendRes(res, success, reason) {
	var jsonRes = {success: success};
	
	if (reason)
		jsonRes.reason = reason;
	
	
	res.json(jsonRes);
}

function validateAuthorization(authKey, res) {
	var authKeyCorrect = (authKey == REQUEST_AUTH_KEY);
	
	if (!authKeyCorrect)
		sendRes(res, false, "Invalid authorization key.");
	
	
	return authKeyCorrect;
}


groups.post("/setRank", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthorized = validateAuthorization(authKey, res);
	
	if (!isAuthorized)
		return;
	
	var groupId = body.groupId;
	var userId = body.userId;
	var roleset = body.roleset;
	
	var setRankOptions = {
		group: groupId,
		target: userId,
		roleset: roleset,
		
		success: function() {
			sendRes(res, true);
		},
		
		failure: function(err) {
			sendRes(res, false, "An error occurred: " + err);
		}
	};
	
	
	rbx.setRank(setRankOptions);
});

groups.post("/handleJoinRequest", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthorized = validateAuthorization(authKey, res);
	
	if (!isAuthorized)
		return;
	
	var groupId = body.groupId;
	var username = body.username;
	var accept = body.accept;
	
	var handleJoinRequestOptions = {
		group: groupId,
		username: username,
		accept: accept,
		
		success: function() {
			sendRes(res, true);
		},
		
		failure: function(err) {
			sendRes(res, false, "An error occurred: " + err);
		}
	};
	
	
	rbx.handleJoinRequest(handleJoinRequestOptions);
});

groups.post("/exile", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthorized = validateAuthorization(authKey, res);
	
	if (!isAuthorized)
		return;
	
	var groupId = body.groupId;
	var userId = body.userId;
	var deletePosts = body.deletePosts;
	
	var exileOptions = {
		group: groupId,
		target: userId,
		deleteAllPosts: deletePosts,
		
		success: function() {
			sendRes(res, true);
		},
		
		failure: function(err) {
			sendRes(res, false, "An error occurred: " + err);
		}
	};
	
	
	rbx.exile(exileOptions);
});

groups.post("/shout", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthorized = validateAuthorization(authKey, res);
	
	if (!isAuthorized)
		return;
	
	var groupId = body.groupId;
	var message = body.message;
	
	var shoutOptions = {
		group: groupId,
		message: message,
		
		success: function() {
			sendRes(res, true);
		},
		
		failure: function(err) {
			sendRes(res, false, "An error occurred: " + err);
		}
	};
	
	
	rbx.shout(shoutOptions);
});

groups.post("/post", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthorized = validateAuthorization(authKey, res);
	
	if (!isAuthorized)
		return;
	
	var groupId = body.groupId;
	var message = body.message;
	
	var postOptions = {
		group: groupId,
		message: message,
		
		success: function() {
			sendRes(res, true);
		},
		
		failure: function(err) {
			sendRes(res, false, "An error occurred: " + err);
		}
	};
	
	
	rbx.post(postOptions);
});


// START SERVER

app.use(bodyParser.json());
app.use("/api/rbx", rbxapi);
rbxapi.use("/groups", groups);

app.listen(PORT, function() {
	console.log("Server listening on port " + PORT + ".");
});

//
