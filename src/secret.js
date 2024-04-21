require("dotenv").config();

const serverPort = process.env.SERVER_RUNNING_PORT || 1010;
const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lrptk8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

module.exports = { serverPort, mongodbURL };
