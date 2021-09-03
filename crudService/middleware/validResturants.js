const joi = require('joi')

function validNewRestautant(data) {
  const schema = joi.object({
    name: joi.string().required().min(3),
    age: joi.number(),
    description: joi.string().min(5),
    address: joi.array().items(
      joi.object({
        city: joi.string().required().min(3),
        street: joi.string()
      }).required()
    ).required()
  });

  return schema.validate(data);
}

function validOldRestautant(data) {
  const schema = joi.object({
    name: joi.string().min(3),
    age: joi.number(),
    description: joi.string().min(5),
    address: joi.array().items(
      joi.object({
        city: joi.string().required().min(3),
        street: joi.string()
      })
    ).required()
  });

  return schema.validate(data);
}
module.exports = {
  validateNewRestaurant: (req, res, next) => {
    const {error} = validNewRestautant(req.body);
    if(error) return res.status(400).send({error});
    next()
  },
  validateOldRestaurant: (req, res, next) => {
    const {error} = validOldRestautant(req.body);
    if(error) return res.status(400).send({error});
    next()
  },
}