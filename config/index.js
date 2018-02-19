'use strict';
//process.env.VCAP_APPLICATION
//const cfenv = require('cfenv');
//const appEnv = cfenv.getAppEnv();

//const callbackURL = process.env.CF_APP_URL || (appEnv.isLocal ? 'http://localhost:3000' : appEnv.url);

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
