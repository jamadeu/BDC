/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Equipment', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register a new equipment', async () => {
    const equipment = await factory.attrs('Equipment');

    const response = await request(app)
      .post('/equipment')
      .send(equipment);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(200);
  });

  it('should not be able to register a new equipment without partnumber', async () => {
    const equipment = await factory.attrs('Equipment', {
      partnumber: '',
    });

    const response = await request(app)
      .post('/equipment')
      .send(equipment);

    expect(response.status).toBe(400);
  });

  it('should not be able to register a new equipment with partnumber and series duplicated', async () => {
    const { partnumber, series, model } = await factory.create('Equipment');

    // await request(app)
    //   .post('/equipment')
    //   .send(equipment);

    const response = await request(app)
      .post('/equipment')
      .send({
        partnumber,
        series,
        model,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  it('should not be able to show a equipment with a invalid id', async () => {
    const id = 'a';
    const response = await request(app).get(`/equipment/${id}`);

    expect(response.status).toBe(400);
  });

  it('should be able to show a equipment by id whit request history', async () => {
    const equipment = await factory.create('Equipment');

    const response = await request(app).get(`/equipment/${equipment.id}`);

    const keys = ['id', 'partnumber', 'series', 'model', 'requests'];

    expect(response.status).toBe(200);
    expect(response.body).toContainAllKeys(keys);
  });

  it('should be able to list 1 equipment by series', async () => {
    const equipment = await factory.attrs('Equipment');

    await request(app)
      .post('/equipment')
      .send(equipment);

    const response = await request(app).get(
      `/equipment?scan=${equipment.series}`
    );

    expect(response.status).toBe(200);
  });

  it('should not be able to list equipment by a series not registered', async () => {
    const response = await request(app).get('/equipment?scan=serie');

    expect(response.status).toBe(400);
  });
});
