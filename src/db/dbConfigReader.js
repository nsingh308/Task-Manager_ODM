/**
 * http://usejsdoc.org/
 */
const fs = require('fs');
const path = require('path');

const configDirectoryPath = path.join(__dirname,'../../config/db.json')

var loadConfig = ()=>{
	const dbConfig = fs.readFileSync(configDirectoryPath);
	const {base,host,schema,user,password} = JSON.parse(dbConfig);
	const dbUrl = base+user+':'+password+'@'+host+schema+'?retryWrites=true';
	
	return dbUrl;
}

module.exports={
		loadConfig
}