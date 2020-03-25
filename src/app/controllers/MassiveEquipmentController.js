import excelToJson from 'convert-excel-to-json';
import { resolve } from 'path';

import Equipment from '../models/Equipment';

class MassiveEquipmentController {
  async store(req, res) {
    const file = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', 'file');

    const fileConvertedToJson = excelToJson({
      sourceFile: file,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: 'partnumber',
        B: 'series',
        C: 'model',
      },
    });

    const equipmentsToCreate = await fileConvertedToJson.Sheet1.map(e => e);

    const createEquipment = async equipment => {
      const { partnumber, series, model } = equipment;

      const equipmentExists = await Equipment.findOne({
        where: { partnumber, series },
      });

      if (equipmentExists) {
        return {
          error: 'Equipamento já existe',
          id: equipmentExists.id,
          partnumber,
          series,
        };
      }

      const partnumber_serie = `1S${partnumber}${series}`;
      const { id } = await Equipment.create({
        partnumber,
        series,
        model,
        partnumber_serie,
      });

      return { id, partnumber, series, model };
    };

    const createdEquipments = equipmentsToCreate.map(async equip => {
      const result = await createEquipment(equip);
      return result;
    });

    (async () => {
      const result = await Promise.all(createdEquipments);
      return res.json(result);
    })();
  }
}

export default new MassiveEquipmentController();
