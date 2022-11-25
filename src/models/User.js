import {Schema, model} from 'mongoose';
const UserSchema = new Schema({
  email_address : String,
  origin : String,
  created_at : { type: Date, default: Date.now },
  updated_at: Date,
  qtd_sessions: Number,
  qtd_navigations: Number,
  categories_view: [{
    "categories": String,
    "qtd": Number 
  }],
  products_view:[{
    "sku": String,
    "qtd": Number
  }],

});

UserSchema.index({ email_address: 1 });

export default model('User', UserSchema);