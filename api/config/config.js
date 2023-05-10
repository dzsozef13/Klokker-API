require("dotenv-flow").config();
const port = process.env.PORT || 4000;
const dbHost = process.env.DBHOST;
const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const testUser = {
    email: 'test@klokker.com',
    password: '12345678'
};

const tokenSecret = process.env.TOKEN_SECRET;

module.exports = { 
    port, 
    dbHost,
    dbOptions,
    tokenSecret,
    testUser
};