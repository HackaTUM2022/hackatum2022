import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Mongodb environment variables
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

// Mongoose options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    // Authentication
    auth: {
        username: MONGO_INITDB_ROOT_USERNAME,
        password: MONGO_INITDB_ROOT_PASSWORD,
    },
};

const dbConnectionURL = {
    LOCAL_DB_URL: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
    REMOTE_DB_URL: process.env.MONGODB_URI,
};
mongoose.connect(dbConnectionURL.LOCAL_DB_URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, `Mongodb Connection Error:${dbConnectionURL.LOCALURL}`));
db.once('open', () => {
    // we're connected !
    console.log('Mongodb connection successful');
});

export default db;
