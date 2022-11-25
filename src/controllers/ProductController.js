import Product from "../models/Product";

class ProductController{

  async store(req, res){ //POST
    const { sku, name, defaultImage, price } = req.body;
    let product = await Product.create({ sku, name, defaultImage, price })
    product = JSON.parse(JSON.stringify(product));
    delete product._id
    return res.status(200).send(product)
  }

  async index(req,res){//GET
    const { sku } = req.params;
    const products = await Product.findOne({sku}).select('-_id');
    if(products){return res.status(200).send(products);
    }else return res.status(404).send({message: "product not found"});
  }

  async destroy(req, res){//DELETE
    const  product_id  = req.body;
    await Product.findByIdAndDelete({_id : product_id});
    return res.status(200).send();
  }
}
export default new ProductController();