const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adnSchema = new Schema({
  dna: [
      {type: String}
  ],
  result: String
},
{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('ADN', adnSchema)
