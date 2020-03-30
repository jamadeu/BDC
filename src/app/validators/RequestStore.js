import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      request: Yup.string().required(),
      locality_id: Yup.number().required(),
      user_id: Yup.number().required(),
      equipments: Yup.array().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Dados inválidos', messages: error.inner });
  }
};
