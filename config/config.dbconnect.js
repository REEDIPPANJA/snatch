const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.URL);
    debug('MongoDB connected successfully!');
  } catch (err) {
    debug('Error while connecting to DB:', err);
    throw err; // Let the caller decide what to do on error
  }
};

module.exports = dbConnect;
