const express = require('express');
const router  = express.Router();

const ADN = require('../models/ADN');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});




// recibe el adn
router.post('/mutation',(req,res)=>{
  ADN.findOne({dna : req.body.dna})
  .then(ADNsearched=>{
    if(ADNsearched){
      res.status(403).json({Error: "Duplicate record"})
    }else{
      if(hasMutation(req.body.dna)){
        ADN.create({dna:req.body.dna, result: "Mutant"})
        .then(dna=>{
          res.status(200).json({Result: "There is a mutation"})
    })
      }else{
        ADN.create({dna:req.body.dna, result: "Normal"})
        .then(dna=>{
        res.status(403).json({Result: "There is no mutation"})
        })
        .catch(err=>{
          return res.status(500).json(err);
        })
      }
      
    }
  })
  .catch(err=>{
    return res.status(500).json(err);
  })
  
});

//historial de busquedas
router.get('/stats',(req, res) =>{
 
  
  var mutantes = ADN.find({result: "Mutant"})
  var normal= ADN.find({result: "Normal"})

  Promise.all([mutantes,normal])
      .then(results=>{
            return res.status(200).json(
              {count_mutations: results[0].length, 
                count_no_mutation: results[1].length , 
                ratio: (results[1].length/results[0].length).toFixed(2)
              })
      })

      .catch(err=> {
          return res.status(403).json(err);
      })
})

//DNA review

function hasMutation (dna){
  var result = false;
  for (let i = 0; i <dna.length-3; i++) {
    for (let e = 0; e < dna[i].length-3; e++) {
      let n= Math.round(dna.length/2)-1
      let m= Math.round(dna[i].length/2)
      //horizontal
      dna[i][e]==dna[i][e+1] && dna[i][e]==dna[i][e+2] && dna[i][e]==dna[i][e+3] ||
      dna[i+n][e]==dna[i+n][e+1] && dna[i+n][e]==dna[i+n][e+2] && dna[i+n][e]==dna[i+n][e+3] ||
      //vertical
      dna[i][e]==dna[i+1][e] && dna[i][e]==dna[i+2][e] && dna[i][e]==dna[i+3][e] ||
      dna[i][e+m]==dna[i+1][e+m] && dna[i][e+m]==dna[i+2][e+m] && dna[i][e+m]==dna[i+3][e+m] ||
      //inclined
      dna[i][e]==dna[i+1][e+1] && dna[i][e]==dna[i+2][e+2] && dna[i][e]==dna[i+3][e+3] ||
      dna[i][e+m]==dna[i+1][e+m-1] && dna[i][e+m]==dna[i+2][e+m-2]&&dna[i][e+m]==dna[i+3][e+m-3]
      
      ? result =true : result =result;
    }
    
  }

  return result
 }


module.exports = router;
