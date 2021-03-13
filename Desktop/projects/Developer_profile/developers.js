const express = require('express');
const router = express.Router();
const axios = require('axios');
const { response } = require('express');


const developers = {};

router.get('/',(req, res)=>{
   
   let all_dev = [];
   Object.keys(developers).forEach((dev_id)=> {
      all_dev.push({id: dev_id, 
                   avatar_url:developers[dev_id].avatar_url});
   })
   
  res.status(200).send(all_dev);
});

router.post('/', (req, res) => {

   const github_id = req.body.github_id;
   const linkedin_id = req.body.linkeddin_id;
  const  codechef_id = req.body.codechef_id;
   const hackerrank_id = req.body.hackerrank_id;
   const twitter_id = req.body.twitter_id;
   const medium_id = req.body.medium_id;

   let id;
   let avatar_url;
   let name ;
   let company;
   let blog ;
   let location ;
   let email;
   let bio;
   let repos = {};
   let reposList =[];

  const promise = axios(`https://api.github.com/users/${github_id}`);
  const rep = axios(`https://api.github.com/users/${github_id}/repos`);
  
  

  Promise.all([promise, rep]).then((responses)=>{
    
        id = responses[0].data.login;
        avatar_url = responses[0].data.avatar_url;
        name = responses[0].data.name;
        company = responses[0].data.company;
        blog = responses[0].data.blog;
        location = responses[0].data.location;
        email = responses[0].data.email;
        bio = responses[0].data.bio;
        


        for(let i=0; i<responses[1].data.length ; i++){
           repos = {
              name : responses[1].data[i].name,
             html_url : responses[1].data[i].html_url,
             description : responses[1].data[i].description,
             updated_at : responses[1].data[i].updated_at
           }
           reposList.push(repos);
        }
       
        
   developers[id] = {
     id,
    avatar_url, 
    name, 
    company, 
    blog, 
    location,
   email,
   bio,
   github_id,
   linkedin_id,
   codechef_id,
   twitter_id,
   medium_id,
   reposList
   }
   console.log(developers[id]);
  res.status(201).send({id});
}).catch(()=>{
   res.status(404).send({
      error : 'Github userName is invalid'});
});

});


router.get('/:id', (req, res)=>{
    
  const id = req.params.id;
   if(developers[id]){
      res.status(200).send(developers[id]);
   }else{
      res.status(404).send({
         error : "User does not exist"
      })
   }

});



 router.delete('/:id', (req, res)=>{
     
    delete developers[req.params.id];
    res.status(204).send({
        developer : 'deleted'
    });

 });


module.exports = router;
