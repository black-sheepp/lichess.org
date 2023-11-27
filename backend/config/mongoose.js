const mongoose = require("mongoose");
const env = require("dotenv").config();

const { username, password } = process.env;

const db = mongoose
	.connect(`mongodb+srv://shivamguptanitw:FZ1Op0dbJVHa4YlN@cluster0.fdrwufa.mongodb.net/lichesAPI?retryWrites=true&w=majority`)
	.then(() => console.log("Connected DB!"));

module.exports = db;
