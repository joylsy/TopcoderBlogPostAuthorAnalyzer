'use strict';
const request = require('request');
const convert = require('xml-js');


const IBMWatson = require('../ibmwatson');
const ibmwatson = new IBMWatson;


const topcoder_blogs_url = 'https://www.topcoder.com/blog/feed/';

class Topcoder {
    getListofLastestBlogPosts() {
        return new Promise(function(resolve, reject) {
        let options = {
          uri: topcoder_blogs_url
          };  
          request.get(options, function(err, resp, body) {
              if (err) {
                  reject(err);
              } else {
                  if (body != null)
                  {  
                    const result1 = convert.xml2json(body, {compact: true, spaces: 4});  
                    resolve(JSON.parse(result1)); 
                  }
              }
          })
        })
      }
   
      getLatestPostAuthorPersonalityInsight(data){
        let challengejson = { "author": "",
                "title":"",
                "link" :"",
                "personality_response":{} };           
        let contentItems = {};
        let channel = data.rss.channel;
        let profilejson = {};
        let blogTitle = "";
        let author = "";
        let content = "";
        let guid = "" ;
        let watsonresponse = [];
        let lasti = data.rss.channel.item.length;
        //lasti = 3;
        let noOfNulls = 0;
        console.log("Personality Insights");
        return new Promise(function(resolve,reject){   
          for(let i = 0; i < lasti; i++) { 
            author =  channel.item[i]["dc:creator"]._cdata;
            blogTitle = channel.item[i]["title"]._text;    
            content = channel.item[i]["content:encoded"]._cdata;
            guid = channel.item[i]["guid"]._text;
            profilejson = 
            {"contentItems": [
                    {
                    "content": content,
                    "contenttype": "text/html",
                    "language": "en",
                    "sourceid": "Topcoder Blog API",
                    }
                ]
            }            
            //console.log("i:",i);
            //console.log("author",author);
            challengejson.author = author;
            challengejson.title = blogTitle;
            challengejson.link = guid;
            ibmwatson.getPersonalityInsightResponse(profilejson,challengejson)
            .then(ibmresponse => 
            {  
                if (ibmresponse != null)
                { 
                    //challengejson.personality_response = ibmresponse;                                             
                    watsonresponse.push(ibmresponse);
                    console.log("watson responded to challenge:", ibmresponse.author + '- ' +
                    ibmresponse.title);
                    if (watsonresponse.length + noOfNulls == lasti)
                    {
                        resolve(watsonresponse);
                    }                                
                } 
                else 
                {
                    console.log("ibmresponse is null for",author);
                }
            }).catch(ibmerror => 
            {
                reject(ibmerror);
            })  

        }}); 
      }

}

module.exports = Topcoder;