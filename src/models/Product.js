import {Schema, model} from 'mongoose';
const ProductSchema = new Schema({
  sku : String,
  name: String,
  defaultImage: String,
  price: Number,
});
ProductSchema.index({ sku: 1 })
export default model('Product', ProductSchema);