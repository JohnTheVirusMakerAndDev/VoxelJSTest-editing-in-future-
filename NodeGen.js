var Aws = {
	awsHandle: null,
	
	storageHandle: null,
	
	init: function() {
		{
			Aws.awsHandle = require('aws-sdk');
			
			Aws.awsHandle.config.update({
				'accessKeyId': process.env.strAwsIdent,
				'secretAccessKey': process.env.strAwsKey
			});
		}
		
		{
			Aws.storageHandle = new Aws.awsHandle.S3();
		}
	},
	
	dispel: function() {
		{
			Aws.awsHandle = null;
		}
		
		{
			Aws.storageHandle = null;
		}
	}
};

var Casable = {
	// INFO: only the id must be read in Cas2ValidationReader
	
	casableHandle: null,
	
	clientHandle: null,
	
	init: function() {
		{
			Casable.casableHandle = require('casable');
		}
		
		{
			Casable.clientHandle = Casable.casableHandle.authentication(process.env.strCasableServer, {
				'casVersion': process.env.strCasableVersion,
				'logoutPath': process.env.strCasableLogout
			});
		}
	},
	
	dispel: function() {
		{
			Casable.casableHandle = null;
		}
		
		{
			Casable.clientHandle = null;
		}
	}
};

var Express = {
	expressHandle: null,
	
	compressionHandle: null,
	
	cookieparserHandle: null,
	
	multerHandle: null,
	
	expresssessionHandle: null,
	
	cookiesessionHandle: null,
	
	connectmongoHandle: null,
	
	serverHandle: null,
	
	httpHandle: null,
	
	init: function() {
		{
			Express.expressHandle = require('express');
		}
		
		{
			Express.compressionHandle = require('compression');
		}
		
		{
			Express.cookieparserHandle = require('cookie-parser');
		}
		
		{
			if (process.env.boolExpressUpload === 'true') {
				Express.multerHandle = require('multer');
			}
		}
		
		{
			if (process.env.strExpressSession === 'sessionCookie') {
				Express.expresssessionHandle = require('express-session');
				
				Express.cookiesessionHandle = require('cookie-session');
				
			} else if (process.env.strExpressSession === 'sessionMongo') {
				Express.expresssessionHandle = require('express-session');
				
				Express.connectmongoHandle = require('connect-mongo')(Express.expresssessionHandle);
				
			}
		}
		
		{
			Express.serverHandle = Express.expressHandle();
		}
		
		{
			Express.httpHandle = null;
		}
	},
	
	dispel: function() {
		{
			Express.expressHandle = null;
		}
		
		{
			Express.compressionHandle = null;
		}
		
		{
			Express.cookieparserHandle = null;
		}
		
		{
			Express.multerHandle = null;
		}
		
		{
			Express.expresssessionHandle = null;
		}
		
		{
			Express.cookiesessionHandle = null;
		}
		
		{
			Express.connectmongoHandle = null;
		}
		
		{
			Express.serverHandle = null;
		}
		
		{
			Express.httpHandle = null;
		}
	},
	
	run: function() {
		{
			Express.serverHandle.enable('trust proxy');
			
			Express.serverHandle.use(Express.compressionHandle({
				'threshold': 0
			}));
			
			Express.serverHandle.use(Express.cookieparserHandle());
		}
		
		{
			if (process.env.boolExpressUpload === 'true') {
				Express.serverHandle.use(Express.multerHandle({
					'dest': __dirname + '/tmp',
					'limits': {
						'fileSize': 10 * 1024 * 1024,
						'files': 1
					}
				}));
			}
		}
		
		{
			if (process.env.strExpressSession === 'sessionCookie') {
				Express.serverHandle.use(Express.cookiesessionHandle({
					'secret': process.env.strExpressSecret,
					'cookie': {
						'maxAge': 31 * 24 * 60 * 60 * 1000
					}
				}));
				
			} else if (process.env.strExpressSession === 'sessionMongo') {
				Express.serverHandle.use(Express.expresssessionHandle({
					'secret': process.env.strExpressSecret,
					'cookie': {
						'maxAge': 31 * 24 * 60 * 60 * 1000
					},
					'store': new Express.connectmongoHandle({
						'url': process.env.strMongoServer,
						'collection': 'collectionSession'
					})
				}));
				
			}
		}
		
		{
			Express.httpHandle = Express.serverHandle.listen(process.env.intExpressPort);
		}
		
		{
			var functionInterval = function() {
				var FilesystemRead_strFile = [];
				
				var functionFilesystemRead = function() {
					Node.fsHandle.readdir(__dirname + '/tmp', function(errorHandle, dirHandle) {
						if (errorHandle !== null) {
							functionError();
							
							return;
						}
						
						{
							for (var intFor1 = 0; intFor1 < dirHandle.length; intFor1 += 1) {
								FilesystemRead_strFile.push(dirHandle[intFor1]);
							}
						}
						
						functionFilesystemStatIteratorFirst();
					});
				};
				
				var FilesystemStatIterator_intIndex = 0;
				
				var functionFilesystemStatIteratorFirst = function() {
					{
						var intCount = Math.min(FilesystemRead_strFile.length);
						
						if (FilesystemStatIterator_intIndex < intCount) {
							functionFilesystemStat();
							
							return;
						}
					}
					
					functionSuccess();
				};
				
				var functionFilesystemStatIteratorNext = function() {
					{
						FilesystemStatIterator_intIndex += 1;
					}
					
					functionFilesystemStatIteratorFirst();
				};
				
				var functionFilesystemStat = function() {
					Node.fsHandle.stat(__dirname + '/tmp/' + FilesystemRead_strFile[FilesystemStatIterator_intIndex], function(errorHandle, statHandle) {
						if (errorHandle !== null) {
							functionError();
							
							return;
						}
						
						if (statHandle.ctime.getTime() < new Date().getTime() - (60 * 60 * 1000)) {
							functionFilesystemDelete();
							
							return;
						}
						
						functionFilesystemStatIteratorNext();
					});
				};
				
				var functionFilesystemDelete = function() {
					Node.fsHandle.unlink(__dirname + '/tmp/' + FilesystemRead_strFile[FilesystemStatIterator_intIndex], function(errorHandle) {
						if (errorHandle !== null) {
							functionError();
							
							return;
						}
						
						functionFilesystemStatIteratorNext();
					});
				};
				
				var Errorsuccess_intTimestamp = new Date().getTime();
				
				var functionError = function() {
					var dateHandle = new Date();
					
					console.log('');
					console.log('------------------------------------------------------------');
					console.log('- Timestamp: ' + dateHandle.toISOString());
					console.log('- Origin: NodeGen - Express');
					console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
					console.log('- Status: Error');
					console.log('------------------------------------------------------------');
				};
				
				var functionSuccess = function() {
					var dateHandle = new Date();
					
					console.log('');
					console.log('------------------------------------------------------------');
					console.log('- Timestamp: ' + dateHandle.toISOString());
					console.log('- Origin: NodeGen - Express');
					console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
					console.log('- Status: Success');
					console.log('------------------------------------------------------------');
				};
				
				functionFilesystemRead();
			};
			
			setInterval(functionInterval, 5 * 60 * 1000);
		}
	}
};

var Geoip = {
	geoipHandle: null,
	
	init: function() {
		{
			Geoip.geoipHandle = require('geoip-lite');
		}
	},
	
	dispel: function() {
		{
			Geoip.geoipHandle = null;
		}
	}
};

var Hypertextminfier = {
	hypertextminfierHandle: null,
	
	init: function() {
		{
			Hypertextminfier.hypertextminfierHandle = require('html-minifier');
		}
	},
	
	dispel: function() {
		{
			Hypertextminfier.hypertextminfierHandle = null;
		}
	}
};

var Mime = {
	mimeHandle: null,
	
	init: function() {
		{
			Mime.mimeHandle = require('mime');
		}
	},
	
	dispel: function() {
		{
			Mime.mimeHandle = null;
		}
	}
};

var Mongo = {
	mongoHandle: null,
	
	clientHandle: null,
	
	init: function() {
		{
			Mongo.mongoHandle = require('mongodb');
		}
		
		{
			Mongo.mongoHandle.MongoClient.connect(process.env.strMongoServer, function(errorHandle, clientHandle) {
				Mongo.clientHandle = clientHandle;
			});
		}
	},
	
	dispel: function() {
		{
			Mongo.mongoHandle = null;
		}
		
		{
			Mongo.clientHandle = null;
		}
	}
};

var Mustache = {
	mustacheHandle: null,
	
	init: function() {
		{
			Mustache.mustacheHandle = require('mustache');
		}
	},
	
	dispel: function() {
		{
			Mustache.mustacheHandle = null;
		}
	}
};

var Phantom = {
	// INFO: sudo apt-get install fontconfig
	
	phantomjsHandle: null,
	
	init: function() {
		{
			Phantom.phantomjsHandle = require('phantomjs');
		}
	},
	
	dispel: function() {
		{
			Phantom.phantomjsHandle = null;
		}
	}
};

var Recaptcha = {
	recaptchaHandle: null,
	
	clientHandle: null,
	
	init: function() {
		{
			Recaptcha.recaptchaHandle = require('re-captcha');
		}
		
		{
			Recaptcha.clientHandle = new Recaptcha.recaptchaHandle(process.env.strRecaptchaPublic, process.env.strRecaptchaPrivate);
		}
	},
	
	dispel: function() {
		{
			Recaptcha.recaptchaHandle = null;
		}
		
		{
			Recaptcha.clientHandle = null;
		}
	}
};

var Socket = {
	socketHandle: null,
	
	serverHandle: null,
	
	httpHandle: null,
	
	init: function() {
		{
			Socket.socketHandle = require('socket.io');
		}
		
		{
			Socket.serverHandle = Socket.socketHandle();
		}
		
		{
			Socket.httpHandle = null;
		}
	},
	
	dispel: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.serverHandle = null;
		}
		
		{
			Socket.httpHandle = null;
		}
	},
	
	run: function() {
		{
			if (Express.serverHandle === null) {
				{
					Socket.httpHandle = Node.httpHandle.createServer(function(requestHandle, responseHandle) {
						responseHandle.writeHead(200, {
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'POST, GET'
						});
						
						responseHandle.end();
					});
					
					{
						Socket.serverHandle.attach(Socket.httpHandle);
						
						Socket.serverHandle.origins('*:*');
					}
					
					Socket.httpHandle.listen(process.env.intSocketPort);
				}
				
			} else if (Express.serverHandle !== null) {
				{
					Socket.serverHandle.attach(Express.httpHandle);
					
					Socket.serverHandle.origins('*:*');
				}
		
			}
		}
	}
};

var Sqlite = {
	sqliteHandle: null,
	
	clientHandle: null,
	
	init: function() {
		{
			Sqlite.sqliteHandle = require('sqlite3');
		}
		
		{
			Sqlite.clientHandle = new Sqlite.sqliteHandle.Database(process.env.strSqliteDatabase);
		}
	},
	
	dispel: function() {
		{
			Sqlite.sqliteHandle = null;
		}
		
		{
			Sqlite.clientHandle = null;
		}
	}
};

var Xml = {
	xmldocHandle: null,
	
	init: function() {
		{
			Xml.xmldocHandle = require('xmldoc');
		}
	},
	
	dispel: function() {
		{
			Xml.xmldocHandle = null;
		}
	}
};

{
	if (process.env.boolAws === 'true') {
		Aws.init();
	}
	
	if (process.env.boolCasable === 'true') {
		Casable.init();
	}
	
	if (process.env.boolExpress === 'true') {
		Express.init();
	}
	
	if (process.env.boolGeoip === 'true') {
		Geoip.init();
	}
	
	if (process.env.boolHypertextminfier === 'true') {
		Hypertextminfier.init();
	}
	
	if (process.env.boolMime === 'true') {
		Mime.init();
	}
	
	if (process.env.boolMongo === 'true') {
		Mongo.init();
	}
	
	if (process.env.boolMustache === 'true') {
		Mustache.init();
	}
	
	if (process.env.boolPhantom === 'true') {
		Phantom.init();
	}
	
	if (process.env.boolRecaptcha === 'true') {
		Recaptcha.init();
	}
	
	if (process.env.boolSocket === 'true') {
		Socket.init();
	}
	
	if (process.env.boolSqlite === 'true') {
		Sqlite.init();
	}
	
	if (process.env.boolXml === 'true') {
		Xml.init();
	}
}

{
	if (process.env.boolExpress === 'true') {
		Express.run();
	}
	
	if (process.env.boolSocket === 'true') {
		Socket.run();
	}
}