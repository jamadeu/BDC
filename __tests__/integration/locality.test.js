/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Locality', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register a new locality', async () => {
    const locality = await factory.attrs('Locality');

    const response = await request(app)
      .post('/locality')
      .send(locality);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a new locality without locality', async () => {
    const response = await request(app)
      .post('/locality')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to register a new locality with duplicated locality', async () => {
    const locality = await factory.attrs('Locality');

    await request(app)
      .post('/locality')
      .send(locality);

    const response = await request(app)
      .post('/locality')
      .send(locality);

    expect(response.status).toBe(400);
  });

  it('should not be able to register a new user with login is not a string', async () => {
    const locality = factory.attrs('Locality', {
      locality: 1,
    });

    const response = await request(app)
      .post('/locality')
      .send(locality);

    expect(response.status).toBe(400);
  });

  it('should be able to list all users', async () => {
    const createdLocality = await factory.createMany('Locality', 5);
    const localities = await createdLocality.map(locality => {
      return {
        id: locality.id,
        locality: locality.locality,
      };
    });
    const response = await request(app).get('/locality');

    expect(response.body).toMatchObject(localities);
  });
});
