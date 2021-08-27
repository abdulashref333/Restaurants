const { User } = require('../model/users');
const bcrypt = require('bcrypt');

module.exports = {
  signUp: async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    
    try{
      await user.save();
      const token = await user.genrateToken();
      res.send({user, token});
    } catch(e){
      res.status(400).send({error:e});
    }
  },
  logIn: async(req, res) => {
    // find the user from data base useing uniqe identifire like email ...
    try{
      const user = await User.findOne({email:req.body.email});
      if (!user) return res.status(404).send({error:'Email or password is incorrect!'});
    
      const isPassed = await bcrypt.compare(req.body.password, user.password);
      if (!isPassed) return res.status(404).send({error:'Email or password is incorrect!'});
    
      // generate jwt
      const token = await user.genrateToken();
      res.json({user,token});

    } catch(e){
      res.status(500).send({error:e});
    }
  },
  getUserById: async(req, res) => {
    try {
      const userId = req.params.id;
      if(!userId) return res.status(404).send('please send correct id');
      const user = await User.findById(userId);
      if(!user) return res.status(404).send('please send the correct id');
    
      res.send(user);
      
    } catch (error) {
      res.status(500).send(error);
    }
  }

}