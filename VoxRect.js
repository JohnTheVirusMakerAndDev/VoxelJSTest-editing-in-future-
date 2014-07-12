var Node = {
	childprocessHandle: null,
	
	cryptoHandle: null,
	
	fsHandle: null,
	
	httpHandle: null,
	
	pathHandle: null,
	
	init: function() {
		{
			Node.childprocessHandle = require('child_process');
		}
		
		{
			Node.cryptoHandle = require('crypto');
		}
		
		{
			Node.fsHandle = require('fs');
		}

		{
			Node.httpHandle = require('http');
		}

		{
			Node.pathHandle = require('path');
		}
	},
	
	dispel: function() {
		{
			Node.childprocessHandle = null;
		}
		
		{
			Node.cryptoHandle = null;
		}
		
		{
			Node.fsHandle = null;
		}
		
		{
			Node.httpHandle = null;
		}
		
		{
			Node.pathHandle = null;
		}
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
				strName: '',
				strLoginPassword: '',
				intLoginPassword: 0,
				strLoginMotd: '',
				intPlayerActive: 0,
				intPlayerCapacity: 0,
				strMapActive: '',
				strMapAvailable: []
			}
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
			Mustache_objectHandle.objectGameserver.strLoginPassword = Gameserver.strLoginPassword;
			Mustache_objectHandle.objectGameserver.intLoginPassword = Gameserver.intLoginPassword;
			Mustache_objectHandle.objectGameserver.strLoginMotd = Gameserver.strLoginMotd;
			Mustache_objectHandle.objectGameserver.intPlayerActive = Gameserver.intPlayerActive;
			Mustache_objectHandle.objectGameserver.intPlayerCapacity = Gameserver.intPlayerCapacity;
			Mustache_objectHandle.objectGameserver.strMapActive = Gameserver.strMapActive;
			Mustache_objectHandle.objectGameserver.strMapAvailable = Gameserver.strMapAvailable;
		}
		
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
		
		functionFilesystemRead();
	});
	
	Express.serverHandle.use('/', Express.expressHandle.static(__dirname + '/assets'));
}

{
	Socket.serverHandle.on('connection', function(socketHandle) {
		{
			var strSocket = '';
			
			{
				strSocket = socketHandle.id.substr(1, 8);
			}
			
			Gameserver.playerHandle[socketHandle.id] = {
				'strSocket': strSocket,
				'strTeam': 'teamLogin',
				'strName': '',
				'intScore': 0,
				'intKills': 0,
				'intDeaths': 0,
				'dblPosition': [ 0.0, 0.0, 0.0 ],
				'dblVerlet': [ 0.0, 0.0, 0.0 ],
				'dblBodyyaw': 0.0,
				'dblHeadpitch': 0.0
			};
		}
		
		{
			socketHandle.emit('loginHandle', {
				'strType': 'typeReject',
				'strMessage': ''
			});
		}
		
		socketHandle.on('onlineHandle', function(jsonHandle) {
			{
				var jsonHandle = {
					'serverHandle': {},
					'playerHandle': []
				};
				
				{
					jsonHandle.serverHandle = {
						'intPlayerCapacity': Gameserver.intPlayerCapacity,
						'intPlayerActive': Gameserver.intPlayerActive,
						'strMapActive': Gameserver.strMapActive,
						'strMapAvailable': Gameserver.strMapAvailable,
						'intScoreRed': Gameserver.intScoreRed,
						'intScoreBlue': Gameserver.intScoreBlue
					};
				}
				
				{
					for (var strSocket in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strSocket];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							jsonHandle.playerHandle.push({
								'strSocket': playerHandle.strSocket,
								'strTeam': playerHandle.strTeam,
								'strName': playerHandle.strName,
								'intScore': playerHandle.intScore,
								'intKills': playerHandle.intKills,
								'intDeaths': playerHandle.intDeaths
							});
						}
					}
				}
				
				socketHandle.emit('onlineHandle', jsonHandle);
			}
		});
		
		socketHandle.on('loginHandle', function(jsonHandle) {
			if (Gameserver.playerHandle[socketHandle.id].strTeam !== 'teamLogin') {
				return;
			}
			
			{
				if (Gameserver.intPlayerActive === Gameserver.intPlayerCapacity) {
					socketHandle.emit('loginHandle', {
						'strType': 'typeReject',
						'strMessage': 'server full'
					});
					
					return;
					
				} else if (jsonHandle.strName === '') {
					socketHandle.emit('loginHandle', {
						'strType': 'typeReject',
						'strMessage': 'name invalid'
					});
					
					return;
					
				} else if (jsonHandle.strPassword !== Gameserver.strLoginPassword) {
					socketHandle.emit('loginHandle', {
						'strType': 'typeReject',
						'strMessage': 'password wrong'
					});
					
					return;
					
				} else if (([ 'Red', 'Blue' ]).indexOf(jsonHandle.strTeam) === -1) {
					socketHandle.emit('loginHandle', {
						'strType': 'typeReject',
						'strMessage': 'team invalid'
					});
					
					return;
					
				}
			}
			
			{
				Gameserver.intPlayerActive += 1;
			}
			
			{
				if (jsonHandle.strTeam === 'Red') {
					Gameserver.playerHandle[socketHandle.id].strTeam = 'teamRed';
					
				} else if (jsonHandle.strTeam === 'Blue') {
					Gameserver.playerHandle[socketHandle.id].strTeam = 'teamBlue';
					
				}
			}
			
			{
				Gameserver.playerHandle[socketHandle.id].strName = jsonHandle.strName;
			}
			
			{
				socketHandle.emit('loginHandle', {
					'strType': 'typeAccept',
					'strMessage': ''
				});
			}
			
			{
				socketHandle.emit('playerHandle', {});
			}
		});
		
		socketHandle.on('chatHandle', function(jsonHandle) {
			if (jsonHandle.strMessage === undefined) {
				return;
			}
			
			if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
				return;
				
			} else if (jsonHandle.strMessage === '') {
				return;
				
			}
			
			{
				var strMessage = jsonHandle.strMessage;
				
				{
					if (strMessage.length > 140) {
						strMessage = strMessage.substr(1, 140) + ' ' + '...';
					}
				}
				
				{
					Socket.serverHandle.emit('chatHandle', {
						'strSocket': Gameserver.playerHandle[socketHandle.id].strSocket,
						'strName': Gameserver.playerHandle[socketHandle.id].strName,
						'strMessage': strMessage
					});
				}
			}
		});
		
		socketHandle.on('playerHandle', function(jsonHandle) {
			{
				jsonHandle.dblPosition = jsonHandle.a;
				jsonHandle.dblVerlet = jsonHandle.b;
				jsonHandle.dblBodyyaw = jsonHandle.c;
				jsonHandle.dblHeadpitch = jsonHandle.d;
			}
			
			if (jsonHandle.dblPosition === undefined) {
				return;
				
			} else if (jsonHandle.dblPosition.length !== 3) {
				return;
				
			} else if (jsonHandle.dblVerlet === undefined) {
				return;
				
			} else if (jsonHandle.dblVerlet.length !== 3) {
				return;
				
			} else if (jsonHandle.dblBodyyaw === undefined) {
				return;
				
			} else if (jsonHandle.dblHeadpitch === undefined) {
				return;
				
			}
			
			if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
				return;
			} 
			
			{
				Gameserver.playerHandle[socketHandle.id].dblPosition = jsonHandle.dblPosition;
				Gameserver.playerHandle[socketHandle.id].dblVerlet = jsonHandle.dblVerlet;
				Gameserver.playerHandle[socketHandle.id].dblBodyyaw = jsonHandle.dblBodyyaw;
				Gameserver.playerHandle[socketHandle.id].dblHeadpitch = jsonHandle.dblHeadpitch;
			}
			
			{
				var jsonHandle = [];
				
			    for (var strSocket in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strSocket];
					
			    	if (playerHandle.strSocket === Gameserver.playerHandle[socketHandle.id].strSocket) {
						continue;
					}
					
					{
						jsonHandle.push({
							'a': playerHandle.strSocket,
							'b': playerHandle.dblPosition,
							'c': playerHandle.dblVerlet,
							'd': playerHandle.dblBodyyaw,
							'e': playerHandle.dblHeadpitch
						});
					}
			    }
			    
				socketHandle.emit('playerHandle', jsonHandle);
			}
		});
		
		socketHandle.on('disconnect', function() {
			{
				if (Gameserver.playerHandle[socketHandle.id].strTeam !== 'teamLogin') {
					Gameserver.intPlayerActive -= 1;
				}
			}
			
			{
				delete Gameserver.playerHandle[socketHandle.id];
			}
		});
	});
}

var Gameserver = {
	strName: '',
	strLoginPassword: '',
	intLoginPassword: 0,
	strLoginMotd: '',
	intPlayerActive: 0,
	intPlayerCapacity: 0,
	strMapActive: '',
	strMapAvailable: [],
	intScoreRed: 0,
	intScoreBlue: 0,
	
	playerHandle: {},
	
	init: function() {
		{
			Gameserver.strName = process.env.strName;
			
			Gameserver.strLoginPassword = process.env.strLoginPassword;
			
			Gameserver.intLoginPassword = 0;
			
			Gameserver.strLoginMotd = process.env.strLoginMotd;
			
			Gameserver.intPlayerCapacity = process.env.intPlayerCapacity;
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.strMapActive = '';
			
			Gameserver.strMapAvailable = [];
			
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
		}
		
		{
			Gameserver.playerHandle = {};
		}
		
		{
			if (process.env.strLoginPassword === '') {
				Gameserver.intLoginPassword = 0;
				
			} else if (process.env.strLoginPassword !== '') {
				Gameserver.intLoginPassword = 1;
				
			}
		}
		
		{
			var dirHandle = Node.fsHandle.readdirSync(__dirname + '/assets/maps');
			
			for (var intFor1 = 0; intFor1 < dirHandle.length; intFor1 += 1) {
				var strMap = dirHandle[intFor1];
				
				{
					strMap = strMap.replace(new RegExp('\\.json', 'g'), '');
				}
				
				{
					Gameserver.strMapAvailable.push(strMap);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Gameserver.strName = '';
			
			Gameserver.strLoginPassword = '';
			
			Gameserver.intLoginPassword = 0;
			
			Gameserver.strLoginMotd = '';
			
			Gameserver.intPlayerCapacity = 0
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.strMapActive = '';
			
			Gameserver.strMapAvailable = [];
			
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
		}
		
		{
			Gameserver.playerHandle = {};
		}
	}
};

{
	Gameserver.init();
}

{
	var functionInterval = function() {
		var functionRequest = function() {
			var requestHttp = Node.httpHandle.request({
				'host': '127.0.0.1', //TODO: insert domain
				'port': 26866,
				'path': '/host.xml?intPort=' + encodeURIComponent(process.env.intSocketPort) + '&strName=' + encodeURIComponent(Gameserver.strName) + '&intLoginPassword=' + encodeURIComponent(Gameserver.intLoginPassword) + '&intPlayerCapacity=' + encodeURIComponent(Gameserver.intPlayerCapacity) + '&intPlayerActive=' + encodeURIComponent(Gameserver.intPlayerActive) + '&strMapActive=' + encodeURIComponent(Gameserver.strMapActive),
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
	};
	
	setInterval(functionInterval, 5 * 60 * 1000);
	
	functionInterval();
}