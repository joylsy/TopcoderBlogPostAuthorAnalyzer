// Tokens
const Topcoder = require('./topcoder');
const topcodr = new Topcoder;

const jsonfile = require('jsonfile');
const fileSave = 'topcoder_BlogPostAuthorAnalyzerpersonality_response.json'   


function main() {
  return new Promise(function (resolve, reject) {
    topcodr.getListofLastestBlogPosts()
    .then(response => { 
        topcodr.getLatestPostAuthorPersonalityInsight(response)
        .then(activechallengeresponse => resolve(activechallengeresponse))
        .catch(activechallengeerror => reject(activechallengeerror));
    }).catch (error => reject(error));
  });
}

if (require.main === module)
    main()
    .then((results) => 
    {
      let finalAnswer = {"numberofEntries": results.length,"Results found in JSON FILE:": fileSave};
      console.log('Final answer: ',JSON.stringify(finalAnswer, null, 2));
      jsonfile.writeFile(fileSave, results, function (err) {
        if (err)
        {
          console.log('error saving jsonfile:', err);
        }
       });
     })  
    .catch((error) => console.log('Final error:',error.message));
 

/*
*/

