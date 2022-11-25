import {Schema, model} from 'mongoose'

const NavigationSchema = new Schema({
  session: String, 
  email_address: String,
  url_base: String,
  categories:[String],
  products:[String],
  user:{
    type: Schema.Types.ObjectId,
    ref:'User'
  }
})
NavigationSchema.index({ session: 1 })
export default model('Navigation', NavigationSchema);

