//Website
  // require libraries
const path = require("path");
const express = require("express");
const ejs = require("ejs");

  // initiate express app
const app = express();

  // config express app
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/', express.static("public", { maxAge: 10000 }));

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/include', function (req, res) {
    res.render("pages/include"); // the index.ejs file in "views" folder is used to render
});

app.get('/notfound', function (req, res) {
    res.render("notfound"); // error, we don't have notfound.ejs file in views folder
});

// ----------------handle API-------------------------//
app.get('/ping', function(req, res) {
   // test route, 
  res.send("Hello from express");
});

// catch all route to render the 404 page if the route is not defined 
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, "public","404.html")));

// app.use(function(req, res, next){
//   res.sendFile(path.join(__dirname, "public","404.html"));   
// })

app.listen(5000, function () { console.log("Server is listening on port 5000") });

//Discord Bot Client
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env['key'];

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});

client.login(token);
