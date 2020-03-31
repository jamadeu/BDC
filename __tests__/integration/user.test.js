/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register a new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a new user without login', async () => {
    const response = await request(app)
      .post('/user')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to register a new user with duplicated login', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/user')
      .send(user);

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register a new user with login is not a string', async () => {
    const user = factory.attrs('User', {
      login: 1,
    });

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to list all users', async () => {
    const createdUsers = await factory.createMany('User', 5);
    const users = await createdUsers.map(user => {
      return {
        id: user.id,
        login: user.login,
      };
    });
    const response = await request(app).get('/user');

    expect(response.body).toMatchObject(users);
  });
});
