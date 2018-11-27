import bcrypt from 'bcryptjs';

import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const { data } = args;
    const emailTaken = await prisma.exists.User({ email: data.email });

    if (emailTaken) {
      throw new Error('Email is taken');
    }

    const password = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user(
      {
        where: {
          email: data.email
        }
      },
      null
    );

    if (!user) {
      throw new Error('There was a problem with your login');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error('There was a problem with your login');
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: userId
        }
      },
      info
    );
  }
};

export default Mutation;
