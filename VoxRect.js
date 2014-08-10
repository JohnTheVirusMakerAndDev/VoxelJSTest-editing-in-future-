var Node = {
	childprocessHandle: null,
	
	cryptoHandle: null,
	
	fsHandle: null,
	
	httpHandle: null,
	
	httpsHandle: null,
	
	pathHandle: null,
	
	zlibHandle: null,
	
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
			Node.httpsHandle = require('https');
		}

		{
			Node.pathHandle = require('path');
		}

		{
			Node.zlibHandle = require('zlib');
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
			Node.httpsHandle = null;
		}
		
		{
			Node.pathHandle = null;
		}
		
		{
			Node.zlibHandle = null;
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
				intLoginPassword: 0,
				strLoginMotd: ''
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
			Mustache_objectHandle.objectGameserver.intLoginPassword = Gameserver.intLoginPassword;
			Mustache_objectHandle.objectGameserver.strLoginMotd = Gameserver.strLoginMotd;
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
			Gameserver.playerHandle[socketHandle.id] = {
				'socketHandle': socketHandle,
				'strSocket': socketHandle.id.substr(1, 8),
				'strTeam': 'teamLogin',
				'strName': '',
				'intScore': 0,
				'intKills': 0,
				'intDeaths': 0,
				'dblPosition': [ 0.0, 0.0, 0.0 ],
				'dblVerlet': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ]
			};
		}
		
		{
			socketHandle.emit('loginHandle', {
				'strType': 'typeReject',
				'strMessage': ''
			});
		}
		
		socketHandle.on('pingHandle', function(jsonHandle) {
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
						'strPhaseActive': Gameserver.strPhaseActive,
						'intPhaseRemaining': Gameserver.intPhaseRemaining,
						'intPhaseRound': Gameserver.intPhaseRound,
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
				
				socketHandle.emit('pingHandle', jsonHandle);
			}
		});
		
		socketHandle.on('loginHandle', function(jsonHandle) {
			if (jsonHandle.strName === undefined) {
				return;
				
			} else if (jsonHandle.strPassword === undefined) {
				return;
				
			} else if (jsonHandle.strTeam === undefined) {
				return;
				
			}
			
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
				Gameserver.intPlayerActive = 0;
				
				for (var strSocket in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strSocket];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						Gameserver.intPlayerActive += 1;
					}
				}
			}
			
			{
				socketHandle.emit('loginHandle', {
					'strType': 'typeAccept',
					'strMessage': ''
				});
			}
			
			{
				var dblPlayerPosition = [ 0.0, 0.0, 0.0 ];
				
				{
					var intMapSpawn = [];
					
					if (playerHandle.strTeam === 'teamRed') {
						intMapSpawn = Gameserver.intMapRedSpawn[Math.floor(Math.random() * Gameserver.intMapRedSpawn.length)];
						
					} else if (playerHandle.strTeam === 'teamBlue') {
						intMapSpawn = Gameserver.intMapBlueSpawn[Math.floor(Math.random() * Gameserver.intMapBlueSpawn.length)];
						
					}

					dblPlayerPosition[0] = intMapSpawn[0] + 0.5;
					dblPlayerPosition[1] = intMapSpawn[1] + 1.0;
					dblPlayerPosition[2] = intMapSpawn[2] + 0.5;
				}
				
				socketHandle.emit('resetHandle', {
					'strPlayerTeam': Gameserver.playerHandle[socketHandle.id].strTeam,
					'dblPlayerPosition': dblPlayerPosition,
					'strMapType': Gameserver.strMapType,
					'strPhaseActive': Gameserver.strPhaseActive
				});
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
					for (var strSocket in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strSocket];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							playerHandle.socketHandle.emit('chatHandle', {
								'strSocket': Gameserver.playerHandle[socketHandle.id].strSocket,
								'strName': Gameserver.playerHandle[socketHandle.id].strName,
								'strMessage': strMessage
							});
						}
					}
				}
			}
		});
		
		socketHandle.on('playerHandle', function(jsonHandle) {
			{
				jsonHandle.strItem = jsonHandle.a;
				jsonHandle.dblPosition = jsonHandle.b;
				jsonHandle.dblVerlet = jsonHandle.c;
				jsonHandle.dblRotation = jsonHandle.d;
			}
			
			if (jsonHandle.strItem === undefined) {
				return;
				
			} else if (jsonHandle.dblPosition === undefined) {
				return;
				
			} else if (jsonHandle.dblPosition.length !== 3) {
				return;
				
			} else if (jsonHandle.dblVerlet === undefined) {
				return;
				
			} else if (jsonHandle.dblVerlet.length !== 3) {
				return;
				
			} else if (jsonHandle.dblRotation === undefined) {
				return;
				
			}
			
			if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
				return;
			}
			
			{
				Gameserver.playerHandle[socketHandle.id].strItem = jsonHandle.strItem;
				Gameserver.playerHandle[socketHandle.id].dblPosition = jsonHandle.dblPosition;
				Gameserver.playerHandle[socketHandle.id].dblVerlet = jsonHandle.dblVerlet;
				Gameserver.playerHandle[socketHandle.id].dblRotation = jsonHandle.dblRotation;
			}
			
			{
				var jsonHandle = [];
				
			    for (var strSocket in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strSocket];
					
			    	if (playerHandle.strSocket === Gameserver.playerHandle[socketHandle.id].strSocket) {
						continue;
						
					} else if (playerHandle.strStatus === 'teamLogin') {
						continue;
						
					}
					
					{
						jsonHandle.push({
							'a': playerHandle.strSocket,
							'b': playerHandle.strTeam,
							'c': playerHandle.strItem,
							'd': playerHandle.dblPosition,
							'e': playerHandle.dblVerlet,
							'f': playerHandle.dblRotation
						});
					}
			    }
			    
				socketHandle.emit('playerHandle', jsonHandle);
			}
		});
		
		socketHandle.on('voxelHandle', function(jsonHandle) {
			if (jsonHandle.intCoordinate === undefined) {
				return;
				
			} else if (jsonHandle.intCoordinate.length !== 3) {
				return;
				
			} else if (jsonHandle.strType === undefined) {
				return;
				
			}
			
			if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
				return;
				
			} else if (Gameserver.strMapOrigtype[jsonHandle.intCoordinate] !== undefined) {
				return;
				
			} else if (Gameserver.strMapBlocked.indexOf(JSON.stringify(jsonHandle.intCoordinate)) !== -1) {
				return;
				
			}
			
			{
				if (jsonHandle.strType === '') {
					delete Gameserver.strMapType[jsonHandle.intCoordinate];
					
				} else if (jsonHandle.strType !== '') {
					Gameserver.strMapType[jsonHandle.intCoordinate] = jsonHandle.strType;
					
				}
			}

			{
				for (var strSocket in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strSocket];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						playerHandle.socketHandle.emit('voxelHandle', {
							'intCoordinate': jsonHandle.intCoordinate,
							'strType': jsonHandle.strType
						});
					}
				}
			}
		});
		
		socketHandle.on('disconnect', function() {			
			{
				delete Gameserver.playerHandle[socketHandle.id];
			}
			
			{
				Gameserver.intPlayerActive = 0;
				
				for (var strSocket in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strSocket];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						Gameserver.intPlayerActive += 1;
					}
				}
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
	strMapType: {},
	strMapOrigtype: {},
	intMapRedSpawn: [],
	intMapRedFlag: [],
	intMapBlueSpawn: [],
	intMapBlueFlag: [],
	intMapSeparator: [],
	strMapBlocked: [],
	functionMapSwitch: null,
	functionMapLoad: null,
	
	strPhaseActive: '',
	intPhaseRemaining: 0,
	intPhaseRound: 0,
	
	intScoreRed: 0,
	intScoreBlue: 0,
	
	playerHandle: {},
	
	init: function() {
		{
			Gameserver.strName = process.env.strName;
		}
		
		{
			Gameserver.strLoginPassword = process.env.strLoginPassword;
			
			Gameserver.intLoginPassword = 0;
			
			Gameserver.strLoginMotd = process.env.strLoginMotd;
		}
		
		{
			Gameserver.intPlayerCapacity = process.env.intPlayerCapacity;
			
			Gameserver.intPlayerActive = 0;
		}
		
		{
			Gameserver.strMapActive = process.env.strMapActive;
			
			Gameserver.strMapAvailable = [];

			Gameserver.strMapType = {};
			
			Gameserver.strMapOrigtype = {};
			
			Gameserver.intMapRedSpawn = [];
			
			Gameserver.intMapRedFlag = [];
			
			Gameserver.intMapBlueSpawn = [];
			
			Gameserver.intMapBlueFlag = [];
			
			Gameserver.intMapSeparator = [];
			
			Gameserver.strMapBlocked = [];
			
			Gameserver.functionMapSwitch = function() {
				{
					var intIndex = (Gameserver.strMapAvailable.indexOf(Gameserver.strMapActive) + 1) % Gameserver.strMapAvailable.length;
					
					Gameserver.strMapActive = Gameserver.strMapAvailable[intIndex];
				}
			};
			
			Gameserver.functionMapLoad = function() {
				{
					Gameserver.strMapType = JSON.parse(Node.fsHandle.readFileSync(__dirname + '/assets/maps/' + Gameserver.strMapActive + '.json').toString());
					
					Gameserver.strMapOrigtype = JSON.parse(Node.fsHandle.readFileSync(__dirname + '/assets/maps/' + Gameserver.strMapActive + '.json').toString());
					
					Gameserver.intMapRedSpawn = [];
					
					Gameserver.intMapRedFlag = [];
					
					Gameserver.intMapBlueSpawn = [];
					
					Gameserver.intMapBlueFlag = [];
					
					Gameserver.intMapSeparator = [];
					
					Gameserver.strMapBlocked = [];
				}
				
				{
				    for (var intCoordinate in Gameserver.strMapType) {
						var strType = Gameserver.strMapType[intCoordinate];
						
						{
							if (strType === 'voxelRedSpawn') {
								Gameserver.intMapRedSpawn.push(JSON.parse('[' + intCoordinate + ']'));
								
							} else if (strType === 'voxelRedFlag') {
								Gameserver.intMapRedFlag.push(JSON.parse('[' + intCoordinate + ']'));
								
								delete Gameserver.strMapType[intCoordinate];
								
							} else if (strType === 'voxelBlueSpawn') {
								Gameserver.intMapBlueSpawn.push(JSON.parse('[' + intCoordinate + ']'));
								
							} else if (strType === 'voxelBlueFlag') {
								Gameserver.intMapBlueFlag.push(JSON.parse('[' + intCoordinate + ']'));

								delete Gameserver.strMapType[intCoordinate];
								
							} else if (strType === 'voxelSeparator') {
								Gameserver.intMapSeparator.push(JSON.parse('[' + intCoordinate + ']'));
								
							}
						}
				    }
				}
				
				{
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapRedSpawn.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapRedSpawn[intFor1][0];
					    		var intY = Gameserver.intMapRedSpawn[intFor1][1];
					    		var intZ = Gameserver.intMapRedSpawn[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 2, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapRedFlag.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapRedFlag[intFor1][0];
					    		var intY = Gameserver.intMapRedFlag[intFor1][1];
					    		var intZ = Gameserver.intMapRedFlag[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 0, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapBlueSpawn.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapBlueSpawn[intFor1][0];
					    		var intY = Gameserver.intMapBlueSpawn[intFor1][1];
					    		var intZ = Gameserver.intMapBlueSpawn[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 2, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapBlueFlag.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapBlueFlag[intFor1][0];
					    		var intY = Gameserver.intMapBlueFlag[intFor1][1];
					    		var intZ = Gameserver.intMapBlueFlag[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 0, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				}
			};
		}
		
		{
			Gameserver.strPhaseActive = 'Build';
			
			Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
			
			Gameserver.intPhaseRound = process.env.intPhaseRound;
		}
		
		{
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
		
		{
			Gameserver.functionMapLoad();
		}
		
		{
			var functionInterval = function() {
				{
					Gameserver.intPhaseRemaining -= 1;
					
					if (Gameserver.intPhaseRemaining > 0) {
						return;
					}
				}
				
				{
					if (Gameserver.strPhaseActive === 'Build') {
						{
							Gameserver.strPhaseActive = 'Combat';
						}
						
						{
							Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
						}
						
					} else if (Gameserver.strPhaseActive === 'Combat') {
						{
							Gameserver.strPhaseActive = 'Build';
						}
						
						{
							Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
						}
						
						{
							Gameserver.intPhaseRound -= 1;
						}
						
					}
				}
				
				{
					if (Gameserver.intPhaseRound === 0) {
						{
							Gameserver.functionMapSwitch();
							
							Gameserver.functionMapLoad();
						}
						
						{
							Gameserver.strPhaseActive = 'Build';
							
							Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
							
							Gameserver.intPhaseRound = process.env.intPhaseRound;
						}
					}
				}
				
				{
					if (Gameserver.strPhaseActive === 'Build') {
					    for (var intFor1 = 0; intFor1 < Gameserver.intMapSeparator.length; intFor1 += 1) {
							var intCoordinate = Gameserver.intMapSeparator[intFor1];
							
							{
								Gameserver.strMapType[intCoordinate] = 'voxelSeparator';
							}
					    }
						
					} else if (Gameserver.strPhaseActive === 'Combat') {
					    for (var intFor1 = 0; intFor1 < Gameserver.intMapSeparator.length; intFor1 += 1) {
							var intCoordinate = Gameserver.intMapSeparator[intFor1];
							
							{
								delete Gameserver.strMapType[intCoordinate];
							}
					    }
						
					}
				}
				
				{
					for (var strSocket in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strSocket];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							var dblPlayerPosition = [ 0.0, 0.0, 0.0 ];
							
							{
								var intMapSpawn = [];
								
								if (playerHandle.strTeam === 'teamRed') {
									intMapSpawn = Gameserver.intMapRedSpawn[Math.floor(Math.random() * Gameserver.intMapRedSpawn.length)];
									
								} else if (playerHandle.strTeam === 'teamBlue') {
									intMapSpawn = Gameserver.intMapBlueSpawn[Math.floor(Math.random() * Gameserver.intMapBlueSpawn.length)];
									
								}
	
								dblPlayerPosition[0] = intMapSpawn[0] + 0.5;
								dblPlayerPosition[1] = intMapSpawn[1] + 1.0;
								dblPlayerPosition[2] = intMapSpawn[2] + 0.5;
							}

							playerHandle.socketHandle.emit('resetHandle', {
								'strPlayerTeam': playerHandle.strTeam,
								'dblPlayerPosition': dblPlayerPosition,
								'strMapType': Gameserver.strMapType,
								'strPhaseActive': Gameserver.strPhaseActive
							});
						}
					}
				}
			};
			
			setInterval(functionInterval, 1000);
		}
	},
	
	dispel: function() {
		{
			Gameserver.strName = '';
		}
		
		{
			Gameserver.strLoginPassword = '';
			
			Gameserver.intLoginPassword = 0;
			
			Gameserver.strLoginMotd = '';
		}
		
		{
			Gameserver.intPlayerCapacity = 0;
			
			Gameserver.intPlayerActive = 0;
		}
		
		{
			Gameserver.strMapActive = '';
			
			Gameserver.strMapAvailable = [];
			
			Gameserver.strMapType = {};
			
			Gameserver.strMapOrigtype = {};
			
			Gameserver.intMapRedSpawn = [];
			
			Gameserver.intMapRedFlag = [];
			
			Gameserver.intMapBlueSpawn = [];
			
			Gameserver.intMapBlueFlag = [];
			
			Gameserver.intMapSeparator = [];
			
			Gameserver.strMapBlocked = [];
			
			Gameserver.functionMapSwitch = null;
			
			Gameserver.functionMapLoad = null;
		}
		
		{
			Gameserver.strPhaseActive = '';
			
			Gameserver.intPhaseRemaining = 0;
			
			Gameserver.intPhaseRound = 0;
		}
		
		{
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
				'host': 'www.voxel-warriors.com',
				'port': 80,
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
			
			requestHttp.setTimeout(3 * 1000, function() {
				requestHttp.abort();
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