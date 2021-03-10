const express = require('express');
const router = express.Router();
const axios = require('axios');



let developers ={};

router.get('/',(req, res)=>{
   let all_dev = [];
   Object.keys(developers).forEach((dev_id)=> {
      all_dev.push({id: dev_id, 
                   avatar_url:developers[dev_id].avatar_url});
   })
    console.log(all_dev);
  res.status(200).send(all_dev);
});


router.post('/',(req, res)=>{
    const ids = req.body.github_id;
    let user_body = [];
    axios.get(`https://api.github.com/users/${ids}`).then(response =>   user_body = response.data);

    developers[ids] = {
                  
    }
  

});




module.exports = router;
