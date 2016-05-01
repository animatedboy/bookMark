var appConfig = {
	"dev":{
		"dbURL":process.env.OPENSHIFT_MONGODB_DB_URL+'bookmark',
		"port":4008
	}
};
module.exports = appConfig;