import Navigation from "../models/Navigation"
import User from "../models/User"
class NavigationController{

  constructor() { }
  
  async store(req, res){
    const { session, email_address, products, url_base, categories} = req.body
    let navigation = await Navigation.create({ session, url_base, categories, email_address, products});

    countUserInfos(session, email_address, products, categories);
    return res.status(200).send(navigation)
   }

  async index(req, res){
    const { session } = req.params;
    let navigations = await Navigation.findOne({ session }).select('-_id');
    if(navigations) {
      return res.status(200).send(navigations)
    }else{
      return res.status(400).send({message: 'navigation not found'})   
    } 
   }

   async destroy(req, res){
    const { navigation_id } = req.body;
    await Navigation.findByIdAndDelete({_id : navigation_id})
    return res.status(200).send();
  }
}

async function countUserInfos(session, email_address, products, categories) {
 
  let user = await User.findOne({ email_address })
  if (user) {
    if (user.qtd_navigations) user.qtd_navigations++
    else user.qtd_navigations = 1
    if(user.qtd_sessions) user.qtd_sessions++
    else user.qtd_sessions = 1

    //products_view
    if(user.products_view){
      for(let i=0; i < products.length; i++){
        let product = products[i]
        for (let j = 0; j < user.products_view.length; j++) {
          const element = user.products_view[j];
          if(element){
            element.qtd++
            
            break 
          }else{
            let product = categories[i]
            user.categories_view.push({
              "categorie": product,
              "qtd": 1
          })
          }
                    
        }
      }
    }else {
      user.products_view = []
      for (let i = 0; i < products.length; i++) {
          let product = products[i]
          user.products_view.push({
              "sku": product,
              "qtd": 1
          })
      }
    }

    //categories_view
    if(user.categories_view){
      for(let i=0; i < categories.length; i++){ 
        let categorie = categories[i];                                       
        for(let j = 0; j < user.categories_view.length; j++){
          const element = user.categories_view[i];
          if(element){
            element.qtd++
            break 
          }else{
            let categorie = categories[i]
            user.categories_view.push({
              "categorie": categorie,
              "qtd": 1
          })
          }
        }                                    
      }
    }else{
      user.categories_view = []
      for (let i = 0; i < categories.length; i++) {
          let categorie = categories[i]
          user.categories_view.push({
              "categorie": categorie,
              "qtd": 1
          })
      }
    }
  }
  await user.save()
}
export default new NavigationController(); 