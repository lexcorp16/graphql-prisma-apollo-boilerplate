import 'cross-fetch/polyfill';

import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import { createUser, getUsers, login, getProfile } from './utils/operations';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Fasoro Alexander',
      email: 'meee@me.com',
      password: 'mysecurepassword'
    }
  };

  const { data } = await client.mutate({
    mutation: createUser,
    variables
  });

  const userexists = await prisma.exists.User({
    id: data.createUser.user.id
  });

  expect(userexists).toBe(true);
});

test('Should expose public author profiles', async () => {
  const { data } = await client.query({
    query: getUsers
  });

  expect(data.users.length).toBe(2);
  expect(data.users[0].email).toBe(null);
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: { email: 'non@existent.com', password: 'badpassword' }
  };

  await expect(
    client.mutate({
      mutation: login,
      variables
    })
  ).rejects.toThrow();
});

test('Should not sign up with invalid password', async () => {
  const variables = {
    data: { name: 'Josh sanders', email: 'josh@me.com', password: 'short' }
  };

  await expect(
    client.mutate({
      mutation: createUser,
      variables
    })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({
    query: getProfile
  });

  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.id).toBe(userOne.user.id);
});
