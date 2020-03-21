import * as Yup from 'yup';

import Request from '../models/Request';

class RequestController {
  async store(req, res) {
    const schema = Yup.object().shape({
      request: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { request } = req.body;

    const requestExist = await Request.findOne({
      where: { request },
    });

    if (requestExist) {
      return res.status(400).json({ error: 'Request ja existe' });
    }

    const { id } = await Request.create(req.body);

    return res.json({
      id,
      request,
    });
  }
}

export default new RequestController();
