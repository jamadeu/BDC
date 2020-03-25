import * as Yup from 'yup';

import Equipment from '../models/Equipment';
import Locality from '../models/Locality';
import Request from '../models/Request';
import User from '../models/User';

class RequestController {
  async store(req, res) {
    const schema = Yup.object().shape({
      request: Yup.string().required(),
      locality_id: Yup.number().required(),
      user_id: Yup.number().required(),
      equipments: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { equipments, ...data } = req.body;

    await equipments.map(e => {
      const equipExist = Equipment.findByPk(e);
      if (!equipExist) {
        return res
          .status(400)
          .json({ error: `Equipamento não localizado, id ${e}` });
      }
      return true;
    });

    const requestExist = await Request.findOne({
      where: { request: data.request },
    });

    if (requestExist && data.request !== 'Estoque mínimo') {
      return res.status(400).json({ error: 'Request ja existe' });
    }

    const localityExist = await Locality.findByPk(data.locality_id);
    if (!localityExist) {
      return res.status(400).json({ error: 'Localidade não encontrada' });
    }

    const userExist = await User.findByPk(data.user_id);
    if (!userExist) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const assigned = await Request.create(
      {
        ...data,
        reserveds_date: new Date(),
        /**
         * checar se a data vai ser inputada pelo back-end ou pelo front
         */
      },
      { include: 'equipments' }
    );

    if (equipments && equipments.length > 0) {
      assigned.setEquipments(equipments);
    }

    const { id, request, locality_id, user_id, reserveds_date } = assigned;

    return res.json({
      id,
      request,
      locality_id,
      user_id,
      reserveds_date,
      equipments,
    });
  }

  async index(req, res) {
    const requests = await Request.findAll({
      attributes: [
        'id',
        'request',
        'reserveds_date',
        'seal',
        'expedition_date',
        'invoice',
      ],
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
        {
          model: Equipment,
          as: 'equipments',
          attributes: ['id', 'partnumber', 'series', 'model'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(requests);
  }

  async show(req, res) {
    const request = await Request.findByPk(req.params.id, {
      attributes: [
        'id',
        'request',
        'reserveds_date',
        'seal',
        'expedition_date',
        'invoice',
      ],
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
        {
          model: Equipment,
          as: 'equipments',
          attributes: ['id', 'partnumber', 'series', 'model'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(request);
  }

  async update(req, res) {
    const request = await Request.findByPk(req.params.id);

    if (!request) {
      return res.status(400).json({ error: 'Request não localizada ' });
    }

    const { equipments, ...body } = req.body;

    if (equipments) {
      await equipments.map(e => {
        const equipExist = Equipment.findByPk(e);
        if (!equipExist) {
          return res
            .status(400)
            .json({ error: `Equipamento não localizado, id ${e}` });
        }
        return true;
      });
    }

    await request.update(body);

    if (equipments && equipments.length > 0) {
      request.setEquipments(equipments);
    }

    return res.json(request);
  }
}

export default new RequestController();
