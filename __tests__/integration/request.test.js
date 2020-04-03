/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Request', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a new request', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(200);
  });

  it('should  not be able to create a new request with number duplicated', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    await request(app)
      .post('/request')
      .send(requestBdc);

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new request with a equipment invalid id', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: ['a'],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new request with a user invalid id', async () => {
    const equipment = await factory.create('Equipment');
    const locality = await factory.create('Locality');

    const requestBdc = await factory.attrs('Request', {
      user_id: 'a',
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new request with a locality invalid id', async () => {
    const equipment = await factory.create('Equipment');
    const user = await factory.create('User');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: 0,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new request with a user invalid id', async () => {
    const equipment = await factory.create('Equipment');
    const locality = await factory.create('Locality');

    const requestBdc = await factory.attrs('Request', {
      user_id: 0,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new request with a equipments array empty', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [],
    });

    const response = await request(app)
      .post('/request')
      .send(requestBdc);

    expect(response.status).toBe(400);
  });

  it('should be able to list all requests', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.attrs('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    await request(app)
      .post('/request')
      .send(requestBdc);

    const response = await request(app).get('/request');

    expect(response.body).toBeArray();
  });

  it('should be able to show a request by id', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.create('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app).get(`/request/${requestBdc.id}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to show a request with a invalid id', async () => {
    const response = await request(app).get('/request/0');

    expect(response.status).toBe(400);
  });

  it('should not be able to update a request with a invalid id', async () => {
    const response = await request(app).put('/request/0');

    expect(response.status).toBe(400);
  });

  it('should not be able to update a request with equipments invalid id', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.create('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .put(`/request/${requestBdc.id}`)
      .send({ equipments: [0] });

    expect(response.status).toBe(400);
  });

  it('should be able to update a request changing the equipment', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');
    const equipmentToUpdate = await factory.create('Equipment');

    const requestBdc = await factory.create('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .put(`/request/${requestBdc.id}`)
      .send({ equipments: [equipmentToUpdate.id] });

    expect(response.status).toBe(200);
  });

  it('should be able to update a request', async () => {
    const user = await factory.create('User');
    const locality = await factory.create('Locality');
    const equipment = await factory.create('Equipment');

    const requestBdc = await factory.create('Request', {
      user_id: user.id,
      locality_id: locality.id,
      equipments: [equipment.id],
    });

    const response = await request(app)
      .put(`/request/${requestBdc.id}`)
      .send({ seal: 'b005050' });

    expect(response.status).toBe(200);
  });
});
