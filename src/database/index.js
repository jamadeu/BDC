import Sequelize from 'sequelize';

import Equipment from '../app/models/Equipment';
import Locality from '../app/models/Locality';
import Request from '../app/models/Request';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [Equipment, Locality, Request, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
