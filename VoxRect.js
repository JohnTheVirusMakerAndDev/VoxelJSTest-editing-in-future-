var Node = {
	childprocessHandle: null,
	
	cryptoHandle: null,
	
	fsHandle: null,
	
	httpHandle: null,
	
	pathHandle: null,
	
	init: function() {
		Node.childprocessHandle = require('child_process');
		
		Node.cryptoHandle = require('crypto');
		
		Node.fsHandle = require('fs');

		Node.httpHandle = require('http');

		Node.pathHandle = require('path');
	},
	
	dispel: function() {
		Node.childprocessHandle = null;
		
		Node.cryptoHandle = null;
		
		Node.fsHandle = null;
		
		Node.httpHandle = null;
		
		Node.pathHandle = null;
	}
};

{
	Node.init();
}

{
	with (global) {
		eval(Node.fsHandle.readFileSync(__dirname + '/NodeGen.config').toString());
		
		eval(Node.fsHandle.readFileSync(__dirname + '/NodeGen.js').toString());
	}
}

{
	with (global) {
		eval(Node.fsHandle.readFileSync(__dirname + '/VoxRect.config').toString());
	}
}

{
	Express.serverHandle.get('/', function(requestHandle, responseHandle) {
		responseHandle.status(302);
		
		responseHandle.set({
			'Location': '/index.html'
		});
		
		responseHandle.end();
	});
	
	Express.serverHandle.get('/index.html', function(requestHandle, responseHandle) {
		var Mustache_objectHandle = {
			'objectMain': {
				'strRandom': ''
			},
			'objectGameserver': {
				'strName': '',
				'strMap': '',
				'strCapacity': '',
				'intPassword': 0,
				'strMotd': ''
			},
			'objectFilesystemSkins': []
		};
		
		{
			var hashHande = Node.cryptoHandle.createHash('sha512');
			
			{
				hashHande.update(Node.cryptoHandle.randomBytes(256));
			}
			
			var strBase = hashHande.digest('base64');
			
			{
				strBase = strBase.replace(new RegExp('\\+', 'g'), '');
				strBase = strBase.replace(new RegExp('\\/', 'g'), '');
			}
			
			Mustache_objectHandle.objectMain.strRandom = strBase.substr(0, 32);
		}
		
		{
			Mustache_objectHandle.objectGameserver.strName = Gameserver.strName;
			Mustache_objectHandle.objectGameserver.strMap = Gameserver.strMap;
			Mustache_objectHandle.objectGameserver.intCapacity = Gameserver.intCapacity;
			Mustache_objectHandle.objectGameserver.strMotd = Gameserver.strMotd;
			Mustache_objectHandle.objectGameserver.intActive = Gameserver.intActive;
			Mustache_objectHandle.objectGameserver.strPassword = Gameserver.strPassword;
			Mustache_objectHandle.objectGameserver.intPassword = Gameserver.intPassword;
			Mustache_objectHandle.objectGameserver.strMotd = Gameserver.strMotd;
		}
		
		var functionFilesystemDir = function() {
			Node.fsHandle.readdir(__dirname + '/assets/skins', function(errorHandle, dirHandle) {
				if (errorHandle !== null) {
					responseHandle.end();
					
					return;
				}
				
				{
					for (var intFor1 = 0; intFor1 < dirHandle.length; intFor1 += 1) {
						var strSkin = dirHandle[intFor1];
						
						{
							strSkin = strSkin.replace(new RegExp('\\.png', 'g'), '');
						}
						
						{
							Mustache_objectHandle.objectFilesystemSkins.push(strSkin);
						}
					}
				}
				
				functionFilesystemRead();
			});
		};
		
		var FilesystemRead_bufferHandle = null;
		
		var functionFilesystemRead = function() {
			Node.fsHandle.readFile(__dirname + '/assets/index.html', function(errorHandle, bufferHandle) {
				if (errorHandle !== null) {
					responseHandle.end();
					
					return;
				}
				
				{
					FilesystemRead_bufferHandle = bufferHandle;
				}
				
				functionSuccess();
			});
		};
		
		var functionSuccess = function() {
			var strData = FilesystemRead_bufferHandle.toString();

			{
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
				
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
			}
			
			{
				strData = Hypertextminfier.hypertextminfierHandle.minify(strData, {
					'removeComments': true,
					'removeCommentsFromCDATA': true,
					'removeCDATASectionsFromCDATA': false,
					'collapseWhitespace': true,
					'conservativeCollapse': true,
					'collapseBooleanAttributes': false,
					'removeAttributeQuotes': false,
					'removeRedundantAttributes': false,
					'useShortDoctype': false,
					'removeEmptyAttributes': false,
					'removeOptionalTags': false,
					'removeEmptyElements': false
				});
			}
			
			responseHandle.status(200);
			
			responseHandle.set({
				'Content-Length': Buffer.byteLength(strData, 'utf-8'),
				'Content-Type': Mime.mimeHandle.lookup('html'),
				'Content-Disposition': 'inline; filename="' + requestHandle.path.substr(requestHandle.path.lastIndexOf('/') + 1) + '";'
			});
			
			responseHandle.write(strData);
			
			responseHandle.end();
		};
		
		functionFilesystemDir();
	});
	
	Express.serverHandle.use('/', Express.expressHandle.static(__dirname + '/assets'));
}

{
	Socket.serverHandle.on('connection', function(socketHandle) {
		socketHandle.on('disconnect', function() {
			
		});
	});
}

var Gameserver = {
	strName: '',
	strMap: '',
	intCapacity: 0,
	intActive: 0,
	strPassword: '',
	intPassword: 0,
	strMotd: '',
	
	objectPlayer: {},
	
	init: function() {
		Gameserver.strName = process.env.strName;
		Gameserver.strMap = '';
		Gameserver.intCapacity = process.env.intCapacity;
		Gameserver.intActive = 0;
		Gameserver.strPassword = process.env.strPassword;
		Gameserver.intPassword = (process.env.strPassword === '') ? (0) : (1);
		Gameserver.strMotd = process.env.strMotd;
		
		Gameserver.objectPlayer = {};
	},
	
	dispel: function() {
		Gameserver.strName = '';
		Gameserver.strMap = '';
		Gameserver.intCapacity = 0;
		Gameserver.intActive = 0;
		Gameserver.strPassword = '';
		Gameserver.intPassword = 0;
		Gameserver.strMotd = '';
		
		Gameserver.objectPlayer = {};
	}
};

{
	Gameserver.init();
}

//TODO: insert domain / start immediately
setInterval(function () {
	var functionRequest = function() {
		var requestHttp = Node.httpHandle.request({
			'host': '127.0.0.1',
			'port': 26866,
			'path': '/host.xml?intPort=' + encodeURIComponent(process.env.intSocketPort) + '&strName=' + encodeURIComponent(Gameserver.strName) + '&strMap=' + encodeURIComponent(Gameserver.strMap) + '&intCapacity=' + encodeURIComponent(Gameserver.intCapacity) + '&intActive=' + encodeURIComponent(Gameserver.intActive) + '&intPassword=' + encodeURIComponent(Gameserver.intPassword),
			'method': 'GET'
		}, function(responseHttp) {
			var strContent = '';
			
			responseHttp.setEncoding('UTF-8');
			
			responseHttp.on('data', function(strData) {
				strContent += strData;
			});
			
			responseHttp.on('end', function() {
				functionSuccess();
			});
		});
		
		requestHttp.on('error', function(errorHandle) {
			console.log(errorHandle);
			functionError();
		});
		
		requestHttp.end();
	};
	
	var Errorsuccess_intTimestamp = new Date().getTime();
	
	var functionError = function() {
		var dateHandle = new Date();

		console.log('');
		console.log('------------------------------------------------------------');
		console.log('- Timestamp: ' + dateHandle.toISOString());
		console.log('- Origin: VoxRect');
		console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
		console.log('- Status: Error');
		console.log('------------------------------------------------------------');
	};
	
	var functionSuccess = function() {
		var dateHandle = new Date();

		console.log('');
		console.log('------------------------------------------------------------');
		console.log('- Timestamp: ' + dateHandle.toISOString());
		console.log('- Origin: VoxRect');
		console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
		console.log('- Status: Success');
		console.log('------------------------------------------------------------');
	};
	
	functionRequest();
}, 5 * 60 * 1000);