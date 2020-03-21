import * as Yup from 'yup';

import Equipment from '../models/Equipment';
import Locality from '../models/Locality';
import Request from '../models/Request';
import User from '../models/User';

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

  async show(req, res) {
    const equipment = await Equipment.findByPk(req.params.id, {
      attributes: ['id', 'partnumber', 'series', 'model'],
      include: [
        {
          model: Request,
          as: 'requests',
          attributes: [
            'id',
            'request',
            'reserveds_date',
            'seal',
            'expedition_date',
            'invoice',
          ],
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'login'],
            },
            {
              model: Locality,
              as: 'locality',
              attributes: ['id', 'locality'],
            },
          ],
        },
      ],
    });

    return res.json(equipment);
  }
}

export default new EquipmentController();
