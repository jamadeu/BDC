import { factory } from 'factory-girl';
import faker from 'faker';

import Equipment from '../src/app/models/Equipment';
import Locality from '../src/app/models/Locality';
import Request from '../src/app/models/Request';
import User from '../src/app/models/User';

factory.define('User', User, {
  login: faker.internet.userName(),
});

factory.define('Locality', Locality, {
  locality: faker.address.city(),
});

factory.define('Equipment', Equipment, {
  partnumber: faker.random.word(),
  series: faker.random.word(),
  model: faker.random.word(),
});

factory.define(
  'Request',
  Request,
  () => ({
    request: faker.random.number(),
  }),
  {
    afterBuild: async (model, attrs) => {
      const request = model;

      if (!attrs.locality_id) {
        const locality = await factory.create('Locality');
        request.locality_id = locality.id;
      }

      if (!attrs.user_id) {
        const user = await factory.create('User');
        request.user_id = user.id;
      }

      if (!attrs.equipments) {
        const equipment = await factory.create('Equipment');
        request.equipments = [equipment.id];
      }

      return request;
    },
  }
);

export default factory;
