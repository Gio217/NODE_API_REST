import User from "../models/User";

class UserController{
  async index(req,res){
    const { email_address } = req.params;
    const user = await User.findOne({ email_address }).select('-_id') 
    if(user){
      console.log(user);
      return res.status(200).send(user);
    }
    else return res.status(404).send({message: 'user not found' });
    
  }
  async store(req, res) {
   const  { email_address, origin, created_at } = req.body;
   let  user = await User.findOne({ email_address });
   if(!user){
    user = await User.create({ email_address, origin, created_at,  });
    user = JSON.parse(JSON.stringify(user));
    delete user._id;
    return res.status(200).send(user);
   }else return res.status(409).send({message: 'user alredy exist'})
  }
  async destroy(req, res){
    const { user_id } = req.body;
    await User.findByIdAndDelete({_id : user_id});
    return res.status(200).send();
  }
}

export default new UserController();