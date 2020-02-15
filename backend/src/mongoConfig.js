import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', () => {
    console.log("Connected to MongoDB");
    require('./models/Client')
});