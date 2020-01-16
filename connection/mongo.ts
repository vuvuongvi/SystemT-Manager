import mongoose, { Schema } from 'mongoose';
import user from '../db/user-schema';
let db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
export default mongoose;


