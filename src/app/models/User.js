import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
