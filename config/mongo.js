const mongoose  = require('mongoose');
const config = require('./index.js');

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`; // Connection String to connect with mongo

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})