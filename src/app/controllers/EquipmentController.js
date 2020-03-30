import { Op } from 'sequelize';
import * as Yup from 'yup';

import Equipment from '../models/Equipment';
import Locality from '../models/Locality';
import Request from '../models/Request';
import User from '../models/User';
import CreateEquipmentService from '../services/CreateEquipmentService';

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

    const { partnumber, series, model } = req.body;

    try {
      const { id, partnumber_serie } = await CreateEquipmentService.run({
        partnumber,
        series,
        model,
      });

      return res.json({
        id,
        partnumber,
        series,
        model,
        partnumber_serie,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
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

  async index(req, res) {
    const { scan } = req.query;

    const equipment = await Equipment.findAll({
      where: {
        partnumber_serie: {
          [Op.endsWith]: scan,
        },
      },
      attributes: ['id', 'partnumber', 'series', 'model'],
    });

    if (!equipment) {
      return res.status(400).json({ error: 'Equipamento não localizado' });
    }

    /**
     * Função está retornando um array de objetos com os equipamentos encontrados,
     * Melhor retornar apenas o json de 1 equipamento?
     * E se localizar mais de 1 equipamento
     */

    return res.json(equipment);
  }
}

export default new EquipmentController();
