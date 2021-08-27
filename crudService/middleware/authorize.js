const got = require('got');
const AUTHENTICATION_URL = 'http://localhost:3000';

module.exports = {
  authorize: async (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).send({error:'unauthorized..'})
    const {body, statusCode} = await got(AUTHENTICATION_URL+'/api/auth/me', {
      headers: {authorization: req.headers.authorization},
      responseType: 'json'
    })
    
    console.log('resbonse: ', {body, statusCode});
    if( statusCode !== 200 || !body.userId) return res.status(401).send({error:'unautorized user'});
    req.userId = body.userId;
    next();
  }
}

