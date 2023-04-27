require("dotenv-flow").config();
const port = process.env.PORT || 4000;
const dbHost = process.env.DBHOST;
const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

module.exports = { 
    port, 
    dbHost,
    dbOptions
};