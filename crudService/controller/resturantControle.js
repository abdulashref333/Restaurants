const {Resturant} = require('../model/resturant');

module.exports = {
  getResturantsByQuery: async (req, res, next) => {
    try {
      let resturantName = req.query.name;
      let resturantCity = req.query.city;
      let resturants;
      
      if(resturantName && !resturantCity){
        const $regex = RegExp(`${resturantName}`);
        resturants = await Resturant.find({name: $regex}).exec();
        
      }else if(resturantCity && !resturantName){
        resturants = await Resturant.find({'address.city': resturantCity}).exec();
        
      }else if( resturantName && resturantCity){
        const $regex = RegExp(`${resturantName}`);
        resturants = await Resturant.find({name: $regex, 'address.city': resturantCity}).exec();
      }else{
        resturants = await Resturant.find({});
      }
      res.send(resturants);  
  
    } catch (error) {
      res.status(500).send({error});
    }
  },
  getResturantById: async (req, res, next) => {
    try {
      const resturant = await Resturant.find({_id: req.params.id});
      res.send(resturant);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  creatResturant: async (req, res, next) => {
    try {

      console.log('req body: ', req.body)
      const resturant = new Resturant({
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        userId: req.userId
      })
      // console.log('resturant : ', resturant)
      await resturant.save();
      res.send({resturant});
  
    } catch (error) {
      res.status(500).send({error})
    }
  },
  updateResturant: async (req, res) => {
    try {

      const resturantId = req.params.id;
      const updates = [];
      const body = req.body;
      const resturant = await Resturant.findById(resturantId);
      
      if(body.name){
        updates.push({name: body.name});
      }
      if(body.description){
        updates.push({description: body.description});
      }
      if(body.address){
        updates.push({address: body.address})
      }
      console.log('i am here...', updates)
      
      updates.forEach(update => {
        if(update.name){
          resturant.name = update.name;
        }else if( update.description){
          resturant.description = update.description;
        }else{
         //update address array. 
          resturant.address = update.address;
        }
      })
  
      const updatedResturant = await Resturant.findOneAndUpdate({_id:resturantId}, resturant, {new: true});
      res.json(updatedResturant);
  
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteResturant: async (req, res) =>{
    try {
      const resturantId = req.params
      
      if(!resturantId) return res.status(400).send({error: 'id was not found'});
      let resturant = await Resturant.find({_id: req.params.id, userId:req.userId}).exec();
      
      if(!resturant.length) return res.status(401).send({error: 'no resturant with this id'});
  
      resturant = await Resturant.findByIdAndRemove(req.params.id).exec();
      res.send({sucess:true});
  
    } catch (error) {
      res.status(500).send({error})
    }
  }
}