const joi = require('joi')

function validSignup(data) {
  const schema = joi.object({
    name: joi.string().required().min(3).max(50),
    email: joi.string().required().min(5).max(50).email(),
    password: joi.string().required().min(8).max(50)
  });

  return schema.validate(data);
}
function validLogin(data) {
  const schema = joi.object({
    email: joi.string().required().min(5).max(50).email(),
    password: joi.string().required().min(8).max(50)
  });

  return schema.validate(data);
}
module.exports = {
  validateSignupPayload: (req, res, next) => {
    const {error} = validSignup(req.body);
    if(error) return res.status(400).send({error});
    next()
  },
  validateLoginPayload: (req, res, next) => {
    const {error} = validLogin(req.body);
    if(error) return res.status(400).send({error});
    next()
  }
}