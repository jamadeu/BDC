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
    const equipment = await factory.attrs('Equipment');

    await request(app)
      .post('/equipment')
      .send(equipment);

    const response = await request(app)
      .post('/equipment')
      .send(equipment);

    expect(response.status).toBe(400);
  });

  it('should be able to show a equipment by id with request history', async () => {
    const locality = await factory.create('Locality');
    const user = await factory.create('User');
    const equipment = await factory.create('Equipment');
    const requestBdc = await factory.create('Request', {
      locality: locality.id,
      user: user.id,
      equipments: [equipment.id],
    });

    const expectedResult = {
      id: equipment.id,
      partnumber: equipment.partnumber,
      series: equipment.series,
      model: equipment.model,
      requests: [
        {
          id: requestBdc.id,
          request: requestBdc.request,
          reserveds_date: requestBdc.reserveds_date,
          seal: requestBdc.seal,
          expedition_date: requestBdc.expedition_date,
          invoice: requestBdc.invoice,
          user: {
            id: user.id,
            login: user.login,
          },
          locality: {
            id: locality.id,
            locality: locality.locality,
          },
        },
      ],
    };

    const response = await request(app).get(`/equipment/${equipment.id}`);

    expect(response.body).toMatchObject(expectedResult);
  });
});
