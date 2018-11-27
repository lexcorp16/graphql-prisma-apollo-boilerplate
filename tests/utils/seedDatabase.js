import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

export const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('Red098!@#$')
  },
  user: undefined,
  jwt: undefined
};

export const userTwo = {
  input: {
    name: 'Bryan',
    email: 'bryan@example.com',
    password: bcrypt.hashSync('Blue098!@#$')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabase = async () => {
  jest.setTimeout(30000);
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export default seedDatabase;
