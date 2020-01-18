import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import userModal from '../../db/user-schema';
export default {
  Query: {
    user: async (parent, { id }, { models: { userModel }, me }, info) => {
      console.log({id});
      if (!me) throw new AuthenticationError('You are not authenticated');
      const user = await userModal.findOne({ _id: id }).exec()
        .then((data) => {
          console.log(data);
        })
      return user;
    },
    login: async (name, data) => {
      console.log(data);
      const obj = {
        name: data.name
      }
      const user = await userModal.findOne(obj).exec()
        .catch((error) => {
          throw new Error(error);
        })
      console.log(user);
      if (!user) throw new AuthenticationError('Invalid credentials');
      const matchPasswords = bcrypt.compareSync(data.password, user.password);
      if (!matchPasswords) throw new AuthenticationError('Invalid credentials');
      const token = jwt.sign({ id: user._id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });
      return {
        token
      }
    }
  },
  Mutation: {
    createUser: async (name, data) => {
      let obj = {
        name: data.name,
        password: data.password
      }
      const user = await userModal.create(obj)
      return user;
    }
  },
}