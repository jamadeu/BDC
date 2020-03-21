import * as Yup from 'yup';

import Locality from '../models/Locality';

class LocalityController {
  async store(req, res) {
    const schema = Yup.object().shape({
      locality: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { locality } = req.body;
    const localityExists = await Locality.findOne({
      where: { locality },
    });

    if (localityExists) {
      return res.status(400).json({ error: 'Localidade ja existe' });
    }

    const { id } = await Locality.create(req.body);

    return res.json({
      id,
      locality,
    });
  }

  async index(req, res) {
    const localities = await Locality.findAll({
      attributes: ['id', 'locality'],
    });

    return res.json(localities);
  }
}

export default new LocalityController();
