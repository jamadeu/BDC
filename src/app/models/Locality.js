import Sequelize, { Model } from 'sequelize';

class Locality extends Model {
  static init(sequelize) {
    super.init(
      {
        locality: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Locality;
