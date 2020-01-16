import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}).pre('save', function(this: any) {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
})