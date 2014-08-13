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
				'strIdent': socketHandle.id.substr(1, 8),
				'strTeam': 'teamLogin',
				'strItem': '',
				'strName': '',
				'intScore': 0,
				'intKills': 0,
				'intDeaths': 0,
				'dblPosition': [ 0.0, 0.0, 0.0 ],
				'dblVerlet': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ],
				'dblAcceleration': [ 0.0, 0.0, 0.0 ]
			};
		}
		
		{
			socketHandle.emit('loginHandle', {
				'strType': 'typeReject',
				'strMessage': ''
			});
		}
		
		socketHandle.on('loginHandle', function(jsonHandle) {
			if (jsonHandle.strName === undefined) {
				return;
				
			} else if (jsonHandle.strPassword === undefined) {
				return;
				
			} else if (jsonHandle.strTeam === undefined) {
				return;
				
			}
			
			if (Gameserver.playerHandle[socketHandle.id] === undefined) {
				return;
				
			} else if (Gameserver.playerHandle[socketHandle.id].strTeam !== 'teamLogin') {
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
				socketHandle.emit('loginHandle', {
					'strType': 'typeAccept',
					'strMessage': ''
				});
			}
			
			{
				socketHandle.emit('settingsHandle', {
					'strMapType': Gameserver.strMapType,
					'strPhaseActive': Gameserver.strPhaseActive
				});
			}
			
			{
				Gameserver.functionPlayerRespawn(Gameserver.playerHandle[socketHandle.id]);
			}
		});
		
		socketHandle.on('chatHandle', function(jsonHandle) {
			if (jsonHandle.strMessage === undefined) {
				return;
			}
			
			if (Gameserver.playerHandle[socketHandle.id] === undefined) {
				return;
				
			} else if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
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
					for (var strIdent in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							playerHandle.socketHandle.emit('chatHandle', {
								'strIdent': Gameserver.playerHandle[socketHandle.id].strIdent,
								'strName': Gameserver.playerHandle[socketHandle.id].strName,
								'strMessage': strMessage
							});
						}
					}
				}
			}
		});
		
		socketHandle.on('pingHandle', function(jsonHandle) {
			if (jsonHandle.intTimestamp === undefined) {
				return;
			}
			
			if (Gameserver.playerHandle[socketHandle.id] === undefined) {
				return;
				
			} else if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
				return;
				
			}
			
			{
				var jsonHandle = {
					'serverHandle': {},
					'playerHandle': []
				};
				
				{
					jsonHandle.serverHandle = {
						'strMapActive': Gameserver.strMapActive,
						'strMapAvailable': Gameserver.strMapAvailable,
						'strPhaseActive': Gameserver.strPhaseActive,
						'intPhaseRemaining': Gameserver.intPhaseRemaining,
						'intPhaseRound': Gameserver.intPhaseRound,
						'intScoreRed': Gameserver.intScoreRed,
						'intScoreBlue': Gameserver.intScoreBlue,
						'intPlayerActive': Gameserver.intPlayerActive,
						'intPlayerCapacity': Gameserver.intPlayerCapacity
					};
				}
				
				{
					for (var strIdent in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							jsonHandle.playerHandle.push({
								'strIdent': playerHandle.strIdent,
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
				
			} else if (jsonHandle.dblRotation.length !== 3) {
				return;
				
			}
			
			if (Gameserver.playerHandle[socketHandle.id] === undefined) {
				return;
				
			} else if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
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
				
			    for (var strIdent in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strIdent];
					
			    	if (playerHandle.strIdent === Gameserver.playerHandle[socketHandle.id].strIdent) {
						continue;
						
					} else if (playerHandle.strStatus === 'teamLogin') {
						continue;
						
					}
					
					{
						jsonHandle.push({
							'a': playerHandle.strIdent,
							'b': playerHandle.strTeam,
							'c': playerHandle.strItem,
							'd': playerHandle.dblPosition,
							'e': playerHandle.dblVerlet,
							'f': playerHandle.dblRotation
						});
					}
			    }
			    
				socketHandle.emit('enemyHandle', jsonHandle);
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
			
			if (Gameserver.playerHandle[socketHandle.id] === undefined) {
				return;
				
			} else if (Gameserver.playerHandle[socketHandle.id].strStatus === 'teamLogin') {
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
				for (var strIdent in Gameserver.playerHandle) {
					var playerHandle = Gameserver.playerHandle[strIdent];
					
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
		
		socketHandle.on('weaponHandle', function(jsonHandle) {
			if (jsonHandle.strWeapon === undefined) {
				return;
				
			} else if (jsonHandle.dblRotation === undefined) {
				return;
				
			} else if (jsonHandle.dblRotation.length !== 3) {
				return;
				
			}
			
			{
				if (jsonHandle.strWeapon === 'weaponSword') {
					
					
				} else if (jsonHandle.strWeapon === 'weaponBow') {
					// TODO: lock to only one arrow
					
					var dblPosition = [ 0.0, 0.0, 0.0 ];
					var dblVerlet = [ 0.0, 0.0, 0.0 ];
					var dblAcceleration = [ 0.0, 0.0, 0.0 ];
					
					{
						dblPosition[0] = Gameserver.playerHandle[socketHandle.id].dblPosition[0] + (0.3 * Math.sin(jsonHandle.dblRotation[1] + (0.5 * Math.PI)));
						dblPosition[1] = Gameserver.playerHandle[socketHandle.id].dblPosition[1] + 0.1;
						dblPosition[2] = Gameserver.playerHandle[socketHandle.id].dblPosition[2] + (0.3 * Math.cos(jsonHandle.dblRotation[1] + (0.5 * Math.PI)));
						
						dblVerlet[0] = dblPosition[0];
						dblVerlet[1] = dblPosition[1];
						dblVerlet[2] = dblPosition[2];
						
						dblAcceleration[0] = -1.0 * Math.sin(jsonHandle.dblRotation[1]) * Math.cos(jsonHandle.dblRotation[0]);
						dblAcceleration[1] = 1.0 * Math.sin(jsonHandle.dblRotation[0]);
						dblAcceleration[2] = -1.0 * Math.cos(jsonHandle.dblRotation[1]) * Math.cos(jsonHandle.dblRotation[0]);
					}
					
					Gameserver.itemHandle['itemArrow' + ' - ' + socketHandle.id] = {
						'strIdent': 'itemArrow' + ' - ' + socketHandle.id,
						'strItem': 'itemArrow',
						'dblSize': [ 0.3, 0.3, 0.3 ],
						'dblMaxvel': [ 0.26 ],
						'dblPosition': dblPosition,
						'dblVerlet': dblVerlet,
						'dblAcceleration': dblAcceleration,
						'dblRotation': jsonHandle.dblRotation
					};
					
				}
			}
		});
		
		socketHandle.on('disconnect', function() {
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
	functionPhaseUpdate: null,
	
	intScoreRed: 0,
	intScoreBlue: 0,
	
	playerHandle: {},
	intPlayerActive: 0,
	intPlayerCapacity: 0,
	functionPlayerUpdate: null,
	functionPlayerRespawn: null,
	
	itemHandle: {},
	functionItemLoad: null,
	functionItemUpdate: null,
	
	init: function() {
		{
			Gameserver.strName = process.env.strName;
		}
		
		{
			Gameserver.strLoginPassword = process.env.strLoginPassword;
			
			Gameserver.intLoginPassword = process.env.strLoginPassword === '' ? 0 : 1;
			
			Gameserver.strLoginMotd = process.env.strLoginMotd;
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
					Gameserver.strMapAvailable = [];
					
					Gameserver.strMapActive = '';
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
			Gameserver.strPhaseActive = 'Combat'; // TODO: change backto 'Build'
			
			Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
			
			Gameserver.intPhaseRound = process.env.intPhaseRound;
			
			Gameserver.functionPhaseUpdate = function() {
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
							
							Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
						}
						
					} else if (Gameserver.strPhaseActive === 'Combat') {
						{
							Gameserver.strPhaseActive = 'Build';
							
							Gameserver.intPhaseRemaining = process.env.intPhaseRemaining;
							
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
					
					{
						Gameserver.functionItemLoad();
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
					for (var strIdent in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							playerHandle.socketHandle.emit('settingsHandle', {
								'strMapType': Gameserver.strMapType,
								'strPhaseActive': Gameserver.strPhaseActive
							});
						}
						
						{
							Gameserver.functionPlayerRespawn(playerHandle);
						}
					}
				}
			};
		}
		
		{
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
		}
		
		{
			Gameserver.playerHandle = {};
			
			Gameserver.intPlayerCapacity = process.env.intPlayerCapacity;
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.functionPlayerUpdate = function() {
				{
					Gameserver.intPlayerActive = 0;
					
					for (var strIdent in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							Gameserver.intPlayerActive += 1;
						}
					}
				}
			};
			
			Gameserver.functionPlayerRespawn = function(playerHandle) {
				var dblPosition = [ 0.0, 0.0, 0.0 ];
				
				{
					var intMapSpawn = [];
					
					if (playerHandle.strTeam === 'teamRed') {
						intMapSpawn = Gameserver.intMapRedSpawn[Math.floor(Math.random() * Gameserver.intMapRedSpawn.length)];
						
					} else if (playerHandle.strTeam === 'teamBlue') {
						intMapSpawn = Gameserver.intMapBlueSpawn[Math.floor(Math.random() * Gameserver.intMapBlueSpawn.length)];
						
					}

					dblPosition[0] = intMapSpawn[0] + 0.5;
					dblPosition[1] = intMapSpawn[1] + 2.0;
					dblPosition[2] = intMapSpawn[2] + 0.5;
				}
				
				playerHandle.socketHandle.emit('playerHandle', {
					'strTeam': playerHandle.strTeam,
					'dblPosition': dblPosition
				});
			};
		}
		
		{
			Gameserver.itemHandle = {};
			
			Gameserver.functionItemLoad = function() {
				{
					var dblPosition = [ 0.0, 0.0, 0.0 ];
					var dblVerlet = [ 0.0, 0.0, 0.0 ];
					var dblRotation = [ 0.0, 0.0, 0.0 ];
					
					{
						var intMapRedFlag = Gameserver.intMapRedFlag[Math.floor(Math.random() * Gameserver.intMapRedFlag.length)];
						
						dblPosition[0] = intMapRedFlag[0] + 0.5;
						dblPosition[1] = intMapRedFlag[1] + 1.5;
						dblPosition[2] = intMapRedFlag[2] + 0.5;

						dblVerlet[0] = dblPosition[0];
						dblVerlet[1] = dblPosition[1];
						dblVerlet[2] = dblPosition[2];
						
						dblRotation[1] = (new Date().getTime() * 0.0008) % (2.0 * Math.PI);
					}
					
					Gameserver.itemHandle['itemRedFlag'] = {
						'strIdent': 'itemRedFlag',
						'strItem': 'itemFlag',
						'dblSize': [ 1.0, 1.0, 1.0 ],
						'dblMaxvel': [ 0.12, 0.26, 0.12 ],
						'dblPosition': dblPosition,
						'dblVerlet': dblVerlet,
						'dblAcceleration': [ 0.0, 0.0, 0.0 ],
						'dblRotation': dblRotation
					};
				}
				
				{
					var dblPosition = [ 0.0, 0.0, 0.0 ];
					var dblVerlet = [ 0.0, 0.0, 0.0 ];
					var dblRotation = [ 0.0, 0.0, 0.0 ];
					
					{
						var intMapBlueFlag = Gameserver.intMapBlueFlag[Math.floor(Math.random() * Gameserver.intMapBlueFlag.length)];
						
						dblPosition[0] = intMapBlueFlag[0] + 0.5;
						dblPosition[1] = intMapBlueFlag[1] + 1.5;
						dblPosition[2] = intMapBlueFlag[2] + 0.5;

						dblVerlet[0] = dblPosition[0];
						dblVerlet[1] = dblPosition[1];
						dblVerlet[2] = dblPosition[2];
						
						dblRotation[1] = (new Date().getTime() * 0.0008) % (2.0 * Math.PI);
					}
					
					Gameserver.itemHandle['itemBlueFlag'] = {
						'strIdent': 'itemBlueFlag',
						'strItem': 'itemFlag',
						'dblSize': [ 1.0, 1.0, 1.0 ],
						'dblMaxvel': [ 0.12, 0.26, 0.12 ],
						'dblPosition': dblPosition,
						'dblVerlet': dblVerlet,
						'dblAcceleration': [ 0.0, 0.0, 0.0 ],
						'dblRotation': dblRotation
					};
				}
			};
			
			Gameserver.functionItemUpdate = function() {
				{
					for (var strIdent in Gameserver.itemHandle) {
						var itemHandle = Gameserver.itemHandle[strIdent];
						
						{
							if (itemHandle.strItem === 'itemFlag') {
								{
									itemHandle.dblRotation[1] = (new Date().getTime() * 0.0008) % (2.0 * Math.PI);
								}
								
								{
									itemHandle.dblAcceleration[1] -= 0.01;
								}
								
								{
									Physics.update(itemHandle);
								}
								
								{
									var dblVelocityX = itemHandle.dblPosition[0] - itemHandle.dblVerlet[0];
									var dblVelocityY = itemHandle.dblPosition[1] - itemHandle.dblVerlet[1];
									var dblVelocityZ = itemHandle.dblPosition[2] - itemHandle.dblVerlet[2];

									dblVelocityX *= 0.8;
									dblVelocityY *= 1.0;
									dblVelocityZ *= 0.8;
									
									itemHandle.dblPosition[0] = itemHandle.dblVerlet[0] + dblVelocityX;
									itemHandle.dblPosition[1] = itemHandle.dblVerlet[1] + dblVelocityY;
									itemHandle.dblPosition[2] = itemHandle.dblVerlet[2] + dblVelocityZ;
								}
								
							} else if (itemHandle.strItem === 'itemArrow') {
								{
									itemHandle.dblAcceleration[1] -= 0.001;
								}
								
								{
									Physics.update(itemHandle);
								}
								
								{
									var dblVelocityX = itemHandle.dblPosition[0] - itemHandle.dblVerlet[0];
									var dblVelocityY = itemHandle.dblPosition[1] - itemHandle.dblVerlet[1];
									var dblVelocityZ = itemHandle.dblPosition[2] - itemHandle.dblVerlet[2];

									itemHandle.dblRotation[0] = 0.0;
									itemHandle.dblRotation[1] = Math.atan2(dblVelocityX, dblVelocityZ);
									itemHandle.dblRotation[2] = Math.atan2(dblVelocityY, dblVelocityX);
								}
								
								{
									if (itemHandle.boolCollisionTop === true) {
										// delete Gameserver.itemHandle[strIdent]
										
									} else if (itemHandle.boolCollisionSide === true) {
										// delete Gameserver.itemHandle[strIdent]
										
									} else if (itemHandle.boolCollisionBottom === true) {
										// delete Gameserver.itemHandle[strIdent]
										
									}
								}
								
							}
						}
					}
				}
				
				{
					var jsonHandle = [];

					for (var strIdent in Gameserver.itemHandle) {
						var itemHandle = Gameserver.itemHandle[strIdent];
						
						{
							jsonHandle.push({
								'a': itemHandle.strIdent,
								'b': itemHandle.strItem,
								'c': itemHandle.dblSize,
								'd': itemHandle.dblMaxvel,
								'e': itemHandle.dblPosition,
								'f': itemHandle.dblVerlet,
								'g': itemHandle.dblRotation
							});
						}
				    }
				    
					for (var strIdent in Gameserver.playerHandle) {
						var playerHandle = Gameserver.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							playerHandle.socketHandle.emit('itemHandle', jsonHandle);
						}
					}
				}
			};
		}
		
		{
			Gameserver.functionMapLoad();
		}
		
		{
			Gameserver.functionItemLoad();
		}
		
		{
			var functionInterval = function() {
				{
					Gameserver.functionPhaseUpdate();
					
					Gameserver.functionPlayerUpdate();
				}
			};
			
			setInterval(functionInterval, 1000);
		}
		
		{
			var Interval_intTimestamp = new Date().getTime();
			
			var functionInterval = function() {
				{
					Gameserver.functionItemUpdate();
				}
				
				{
					var intWait = 16 - (new Date().getTime() - Interval_intTimestamp);
					
					if (intWait >= 1) {
						setTimeout(functionInterval, intWait);
						
					} else if (intWait < 1) {
						setImmediate(functionInterval);
						
					}
				}
				
				{
					Interval_intTimestamp = new Date().getTime();
				}
			};
			
			functionInterval();
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
			
			Gameserver.functionPhaseUpdate = null;
		}
		
		{
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
		}
		
		{
			Gameserver.playerHandle = {};
			
			Gameserver.intPlayerCapacity = 0;
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.functionPlayerUpdate = null;
			
			Gameserver.functionPlayerRespawn = null;
		}
		
		{
			Gameserver.itemHandle = {};
			
			Gameserver.functionItemLoad = null;
			
			Gameserver.functionItemUpdate = null;
		}
	}
};

var Physics = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	update: function(physicsHandle) {
		{
			var dblVerletX = physicsHandle.dblPosition[0];
			var dblVerletY = physicsHandle.dblPosition[1];
			var dblVerletZ = physicsHandle.dblPosition[2];

			physicsHandle.dblPosition[0] = physicsHandle.dblPosition[0] + (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]) + physicsHandle.dblAcceleration[0];
			physicsHandle.dblPosition[1] = physicsHandle.dblPosition[1] + (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]) + physicsHandle.dblAcceleration[1];
			physicsHandle.dblPosition[2] = physicsHandle.dblPosition[2] + (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]) + physicsHandle.dblAcceleration[2];
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			physicsHandle.dblVerlet[2] = dblVerletZ;
			
			physicsHandle.dblAcceleration[0] = 0.0;
			physicsHandle.dblAcceleration[1] = 0.0;
			physicsHandle.dblAcceleration[2] = 0.0;
		}
		
		{
			var dblVelocityX = physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0];
			var dblVelocityY = physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1];
			var dblVelocityZ = physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2];
			
			if (physicsHandle.dblMaxvel.length === 1) {
				{
					var dblLength = Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityY * dblVelocityY) + (dblVelocityZ * dblVelocityZ));
					
					if (Math.abs(dblLength) > physicsHandle.dblMaxvel[0]) {
						dblVelocityX *= physicsHandle.dblMaxvel[0] / dblLength;
						dblVelocityY *= physicsHandle.dblMaxvel[0] / dblLength;
						dblVelocityZ *= physicsHandle.dblMaxvel[0] / dblLength;
						
					} else if (Math.abs(dblLength) < 0.0001) {
						dblVelocityX = 0.0;
						dblVelocityY = 0.0;
						dblVelocityZ = 0.0;
						
					}
				}
				
			} else if (physicsHandle.dblMaxvel.length === 3) {
				{
					if (Math.abs(dblVelocityX) > physicsHandle.dblMaxvel[0]) {
						dblVelocityX = (dblVelocityX > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[0];
						
					} else if (Math.abs(dblVelocityX) < 0.0001) {
						dblVelocityX = 0.0;
						
					}
				}
				
				{
					if (Math.abs(dblVelocityY) > physicsHandle.dblMaxvel[1]) {
						dblVelocityY = (dblVelocityY > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[1];
						
					} else if (Math.abs(dblVelocityY) < 0.0001) {
						dblVelocityY = 0.0;
						
					}
				}
				
				{
					if (Math.abs(dblVelocityZ) > physicsHandle.dblMaxvel[2]) {
						dblVelocityZ = (dblVelocityZ > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[2];
						
					} else if (Math.abs(dblVelocityZ) < 0.0001) {
						dblVelocityZ = 0.0;
						
					}
				}
				
			}
			
			physicsHandle.dblPosition[0] = physicsHandle.dblVerlet[0] + dblVelocityX;
			physicsHandle.dblPosition[1] = physicsHandle.dblVerlet[1] + dblVelocityY;
			physicsHandle.dblPosition[2] = physicsHandle.dblVerlet[2] + dblVelocityZ;
		}
		
		{
			physicsHandle.boolCollisionTop = false;
			physicsHandle.boolCollisionSide = false;
			physicsHandle.boolCollisionBottom = false;

			for (var intFor1 = 1; intFor1 > -2; intFor1 -= 1) {
				for (var intFor2 = 1; intFor2 > -2; intFor2 -= 1) {
					for (var intFor3 = 1; intFor3 > -2; intFor3 -= 1) {
						var intX = Math.floor(physicsHandle.dblPosition[0]) + intFor1;
						var intY = Math.floor(physicsHandle.dblPosition[1]) + intFor2;
						var intZ = Math.floor(physicsHandle.dblPosition[2]) + intFor3;
						
						if (intY !== 0) {
							if (Gameserver.strMapType[[intX, intY, intZ ]] === undefined) {
								continue;
								
							} else if (Gameserver.strMapType[[intX, intY, intZ ]] === '') {
								continue;
								
							}
						}
						
						{
							var dblVoxelX = intX + 0.5;
							var dblVoxelY = intY + 0.5;
							var dblVoxelZ = intZ + 0.5;
							
							var dblIntersectX = 0.0;
							var dblIntersectY = 0.0;
							var dblIntersectZ = 0.0;
							
							{
								dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblVoxelX) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * 1.0);
								dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblVoxelY) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * 1.0);
								dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - dblVoxelZ) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * 1.0);
								
								if (dblIntersectX >= 0.0) {
									continue;
		
								} else if (dblIntersectY >= 0.0) {
									continue;
		
								} else if (dblIntersectZ >= 0.0) {
									continue;
		
								}
							}
							
							if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectX) {
								if ((physicsHandle.dblPosition[0] - dblVoxelX) > 0.0) {
									physicsHandle.dblPosition[0] -= dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[0] - dblVoxelX) < 0.0) {
									physicsHandle.dblPosition[0] += dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectY) {
								if ((physicsHandle.dblPosition[1] - dblVoxelY) > 0.0) {
									physicsHandle.dblPosition[1] -= dblIntersectY;
									
									physicsHandle.boolCollisionBottom = true;
									
								} else if ((physicsHandle.dblPosition[1] - dblVoxelY) < 0.0) {
									physicsHandle.dblPosition[1] += dblIntersectY;
									
									physicsHandle.boolCollisionTop = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectZ) {
								if ((physicsHandle.dblPosition[2] - dblVoxelZ) > 0.0) {
									physicsHandle.dblPosition[2] -= dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[2] - dblVoxelZ) < 0.0) {
									physicsHandle.dblPosition[2] += dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							}
						}
					}
				}
			}
		}
	},
	
	updateOverwrite: function(physicsHandle, physicsOverwrite) {
		{
			var dblPositionX = 0.5 * (physicsHandle.dblPosition[0] + physicsOverwrite.dblPosition[0]);
			var dblPositionY = 0.5 * (physicsHandle.dblPosition[1] + physicsOverwrite.dblPosition[1]);
			var dblPositionZ = 0.5 * (physicsHandle.dblPosition[2] + physicsOverwrite.dblPosition[2]);
			
			var dblVerletX = dblPositionX - (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]);
			var dblVerletY = dblPositionY - (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]);
			var dblVerletZ = dblPositionZ - (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]);
			
			physicsHandle.dblPositionX = dblPositionX;
			physicsHandle.dblPositionY = dblPositionY;
			physicsHandle.dblPositionZ = dblPositionZ;
			
			physicsHandle.dblVerletX = dblVerletX;
			physicsHandle.dblVerletY = dblVerletY;
			physicsHandle.dblVerletZ = dblVerletZ;
		}
	}
};

{
	Gameserver.init();
	
	Physics.init();
}

{
	var functionInterval = function() {
		var functionRequest = function() {
			var requestHttp = Node.httpHandle.request({
				'host': 'www.voxel-warriors.com',
				'port': 80,
				'path': '/host.xml?intPort=' + encodeURIComponent(process.env.intExpressPort) + '&strName=' + encodeURIComponent(Gameserver.strName) + '&intLoginPassword=' + encodeURIComponent(Gameserver.intLoginPassword) + '&strMapActive=' + encodeURIComponent(Gameserver.strMapActive) + '&intPlayerCapacity=' + encodeURIComponent(Gameserver.intPlayerCapacity) + '&intPlayerActive=' + encodeURIComponent(Gameserver.intPlayerActive),
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