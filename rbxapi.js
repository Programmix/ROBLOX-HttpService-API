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

function sendRes(res, status, err) {
	var success = (status === 200);
	var jsonRes = { success: success };
	
	if (err) jsonRes.error = err.message;
	
	res.status(status).json(jsonRes);
}

function validateAuthentication(authKey, res) {
	var authKeyCorrect = (authKey == REQUEST_AUTH_KEY);
	
	if (!authKeyCorrect) res.status(400).json({ success: false, error: "Invalid authorization key.");
	return authKeyCorrect;
}


groups.post("/setRank", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthentication = validateAuthentication(authKey, res);
	if (!isAuthenticated) return;
	
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
	
	rbx.setRank(setRankOptions)
	.then(() => res.status(200).json({ success: true }))
	.catch(err => res.status(500).json({ success: false, error: err.message }));
});

groups.post("/handleJoinRequest", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthentication = validateAuthentication(authKey, res);
	if (!isAuthenticated) return;
	
	var groupId = body.groupId;
	var username = body.username;
	var accept = body.accept;
	
	var handleJoinRequestOptions = {
		group: groupId,
		username: username,
		accept: accept
	};
	
	
	rbx.handleJoinRequest(handleJoinRequestOptions)
	.then(() => res.status(200).json({ success: true }))
	.catch(err => res.status(500).json({ success: false, error: err.message }));
});

groups.post("/exile", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthentication = validateAuthentication(authKey, res);
	if (!isAuthenticated) return;
	
	var groupId = body.groupId;
	var userId = body.userId;
	var deletePosts = body.deletePosts;
	
	var exileOptions = {
		group: groupId,
		target: userId,
		deleteAllPosts: deletePosts
	};
	
	
	rbx.exile(exileOptions)
	.then(() => res.status(200).json({ success: true }))
	.catch(err => res.status(500).json({ success: false, error: err.message }));
});

groups.post("/shout", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthentication = validateAuthentication(authKey, res);
	if (!isAuthenticated) return;
	
	var groupId = body.groupId;
	var message = body.message;
	
	var shoutOptions = {
		group: groupId,
		message: message
	};
	
	
	rbx.shout(shoutOptions)
	.then(() => res.status(200).json({ success: true }))
	.catch(err => res.status(500).json({ success: false, error: err.message }));
});

groups.post("/post", function(req, res) {
	var body = req.body;
	var authKey = body.authKey;
	
	var isAuthentication = validateAuthentication(authKey, res);
	if (!isAuthenticated) return;
	
	var groupId = body.groupId;
	var message = body.message;
	
	var postOptions = {
		group: groupId,
		message: message
	};
	
	
	rbx.post(postOptions)
	.then(() => res.status(200).json({ success: true }))
	.catch(err => res.status(500).json({ success: false, error: err.message }));
});


// START SERVER

app.use(bodyParser.json());
app.use("/api/rbx", rbxapi);
rbxapi.use("/groups", groups);

app.listen(PORT, function() {
	console.log("Server listening on port " + PORT + ".");
});

//
