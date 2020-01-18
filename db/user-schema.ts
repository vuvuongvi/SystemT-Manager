import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
let userSchema = new Schema({
  name: String,
  password: String
})
userSchema.pre('save', function(this: any) { 
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});
let userModal = mongoose.model('user', userSchema);
export default userModal;