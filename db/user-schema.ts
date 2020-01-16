import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})
userSchema.pre('save', function(this: any) {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});
mongoose.model('user', userSchema);
export default userSchema;