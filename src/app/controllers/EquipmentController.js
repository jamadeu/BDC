import * as Yup from 'yup';

import Equipment from '../models/Equipment';

class EquipmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      partnumber: Yup.string().required(),
      series: Yup.string().required(),
      model: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { partnumber, series } = req.body;
    const equipExists = await Equipment.findOne({
      where: { partnumber, series },
    });

    if (equipExists) {
      return res.status(400).json({ error: 'Equipamento ja existe' });
    }

    const { id, model } = await Equipment.create(req.body);

    return res.json({
      id,
      partnumber,
      series,
      model,
    });
  }
}

export default new EquipmentController();
