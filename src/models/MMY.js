const mongoose = require('mongoose');

const MMYSchema = new mongoose.Schema({
  make: {
    type: String,
    
  },
  models: [
    {
      name: {
        type: String,
        
      },
      years: [
        {
          year: {
            type: String,
           
          },
        },
      ],
    },
  ],
});

const MMY = mongoose.models.MMY || mongoose.model('MMY', MMYSchema)

module.exports = MMY;
