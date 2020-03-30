import Equipment from '../models/Equipment';

class CreateEquipmentService {
  async run({ partnumber, series, model }) {
    const equipExists = await Equipment.findOne({
      where: { partnumber, series },
    });

    if (equipExists) {
      throw new Error('Equipamento ja existe');
    }

    const partnumber_serie = `1S${partnumber}${series}`;

    const equipment = await Equipment.create({
      partnumber,
      series,
      model,
      partnumber_serie,
    });

    return equipment;
  }
}

export default new CreateEquipmentService();
