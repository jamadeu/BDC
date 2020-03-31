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
  partnumber: faker.random.alphaNumeric(),
  series: faker.random.alphaNumeric(),
  model: faker.random.alphaNumeric(),
});

factory.define('Request', Request, {
  request: faker.random.number(),
  locality_id: 1,
  user_id: 1,
  equipments: [1],
});

export default factory;
