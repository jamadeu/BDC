import excelToJson from 'convert-excel-to-json';
import { resolve } from 'path';

import CreateEquipmentService from '../services/CreateEquipmentService';

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

    const createdEquipments = equipmentsToCreate.map(async equip => {
      const { partnumber, series, model } = equip;

      try {
        const { id } = await CreateEquipmentService.run({
          partnumber,
          series,
          model,
        });
        return { id, partnumber, series, model };
      } catch (error) {
        return {
          error: error.message,
          partnumber,
          series,
        };
      }
    });

    const result = await Promise.all(createdEquipments);
    return res.json(result);
  }
}

export default new MassiveEquipmentController();
