'use strict';

if(process.env.NODE_ENV === 'production') {
	module.exports = {
        "WATSON_PERSONALITY":
        {   
            "USERNAME": process.env.WATSON_PERSONALITY_USERNAME,
            "PASSWORD": process.env.WATSON_PERSONALITY_PASSWORD    
        }
	}
} else {
	module.exports = require('./development.json');
}
