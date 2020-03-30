import User from '../models/User';

class UserController {
  async store(req, res) {
    const { login } = req.body;
    const user = await User.findOne({
      where: { login },
    });

    if (user) {
      return res.status(400).json({ error: 'Usuário já existe ' });
    }

    const { id } = await User.create(req.body);

    return res.json({
      id,
      login,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'login'],
    });

    return res.json(users);
  }
}

export default new UserController();
