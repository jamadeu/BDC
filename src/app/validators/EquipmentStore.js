import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      partnumber: Yup.string().required(),
      series: Yup.string().required(),
      model: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Dados inválidos', messages: error.inner });
  }
};
