import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import userModels from '../../db/user-schema';
export default {
  Query: {
    user: async (parent, {id}, {models: {userModel}, me}, info) => {
      if(!me) throw new AuthenticationError('You are not authenticated');
      const user = await userModels.findOne({_id: id}).exec()
        .then((data) => {
          console.log(data);
        })
      return user;
    },
    login: async (parent, {name, password}, {models: {userModel}}, info) => {
      const user = await userModel.findOne({ name }).exec();
      if (!user) throw new AuthenticationError('Invalid credentials');
      const matchPasswords = bcrypt.compareSync(password, user.password);
      if (!matchPasswords) throw new AuthenticationError('Invalid credentials');
      const token = jwt.sign({id: user.id}, 'riddlemethis', {expiresIn: 24 * 10 * 50});
      return {
        token
      }
    }
  },
  Mutation: {
    createUser: async (parent, {name, password}, {models: {userModel}}, info) => {
      const user = await userModel.create({name, password});
      return user;
    }
  },
}