var NodeConf = {};

{
	NodeConf.boolExpress = true;
	
	NodeConf.intExpressPort = 15897;
	
	NodeConf.boolExpressUpload = false;
	
	NodeConf.strExpressSession = '';
	
	NodeConf.strExpressSecret = '';
}

{
	NodeConf.boolHypertextmin = true;
}

{
	NodeConf.boolMime = true;
}

{
	NodeConf.boolMustache = true;
}

{
	NodeConf.boolSocket = true;
	
	NodeConf.intSocketPort = 0;
}

module.exports = function() {
	return NodeConf;
};