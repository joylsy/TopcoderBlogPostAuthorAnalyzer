'use strict';
const request = require('request');

const config = require('../config');
const watson = require('watson-developer-cloud');
const personality_insights = watson.personality_insights({
    username: config.WATSON_PERSONALITY.USERNAME,
    password: config.WATSON_PERSONALITY.PASSWORD,
    version: 'v2',
    headers: {
        'X-Watson-Learning-Opt-Out': 'true'
      }    
  });
  
class IBMWatson {
   getPersonalityInsightResponse(data,identobj){ 
   return new Promise(function(resolve, reject) {
        let params = data;
        let resobj = { "author": "",
        "title":"",
        "link" :"",
        "personality_response":{} };           

        resobj.author = identobj.author;
        resobj.title = identobj.title;
        resobj.link = identobj.link;
        personality_insights.profile(params, function(error, res) {
        if (error){
            reject(error); 
        } 
        else{
            {
              resobj.personality_response = res;   
              resolve(resobj);
            }
        }});                                  
      });
    } 
}     
    

module.exports = IBMWatson;