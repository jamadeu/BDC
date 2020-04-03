import Equipment from '../models/Equipment';

class CheckEquipmentExistsByIdService {
  async run(id) {
    const equipExists = await Equipment.findByPk(id);

    if (!equipExists) {
      throw new Error(`Equipamento não localizado, id: ${id}`);
    }
  }
}

export default new CheckEquipmentExistsByIdService();
