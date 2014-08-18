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
	},
	
	hashbase: function(strData) {
		var hashHande = Node.cryptoHandle.createHash('sha512');
		
		{
			hashHande.update(strData);
		}
		
		var strBase = hashHande.digest('base64');
		
		{
			strBase = strBase.replace(new RegExp('\\+', 'g'), '');
			strBase = strBase.replace(new RegExp('\\/', 'g'), '');
		}
		
		return strBase;
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
				'strRandom': Node.hashbase(Node.cryptoHandle.randomBytes(64)).substr(0, 32)
			},
			'objectGameserver': {
				'intLoginPassword': Gameserver.intLoginPassword,
				'strLoginMotd': Gameserver.strLoginMotd
			}
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
		
		functionFilesystemRead();
	});
	
	Express.serverHandle.use('/', Express.expressHandle.static(__dirname + '/assets'));
}

{
	Socket.serverHandle.on('connection', function(socketHandle) {
		{
			socketHandle.strIdent = socketHandle.id.substr(1, 8);
		}
		
		{
			var strIdent = socketHandle.strIdent;
			
			Player.playerHandle[strIdent] = {
				'strIdent': strIdent,
				'strTeam': 'teamLogin',
				'strItem': '',
				'strName': '',
				'intScore': 0,
				'intKills': 0,
				'intDeaths': 0,
				'intHealth': 0,
				'dblPosition': [ 0.0, 0.0, 0.0 ],
				'dblVerlet': [ 0.0, 0.0, 0.0 ],
				'dblAcceleration': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ],
				'intJumpcount': 0,
				'intInteractionWalk': 0,
				'intInteractionWeapon': 0
			};
		}
		
		{
			Player.playerHandle[socketHandle.strIdent].socketHandle = socketHandle;
		}
		
		{
			socketHandle.emit('loginHandle', {
				'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
				'strType': 'typeReject',
				'strMessage': ''
			});
		}
		
		{
			socketHandle.on('loginHandle', function(jsonHandle) {
				if (jsonHandle.strName === undefined) {
					return;
					
				} else if (jsonHandle.strPassword === undefined) {
					return;
					
				} else if (jsonHandle.strTeam === undefined) {
					return;
					
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strTeam !== 'teamLogin') {
					return;
					
				}
				
				{
					if (Gameserver.intPlayerActive === Gameserver.intPlayerCapacity) {
						socketHandle.emit('loginHandle', {
							'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
							'strType': 'typeReject',
							'strMessage': 'server full'
						});
						
						return;
						
					} else if (jsonHandle.strName === '') {
						socketHandle.emit('loginHandle', {
							'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
							'strType': 'typeReject',
							'strMessage': 'name invalid'
						});
						
						return;
						
					} else if (jsonHandle.strPassword !== Gameserver.strLoginPassword) {
						socketHandle.emit('loginHandle', {
							'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
							'strType': 'typeReject',
							'strMessage': 'password wrong'
						});
						
						return;
						
					} else if (([ 'Red', 'Blue' ]).indexOf(jsonHandle.strTeam) === -1) {
						socketHandle.emit('loginHandle', {
							'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
							'strType': 'typeReject',
							'strMessage': 'team invalid'
						});
						
						return;
						
					}
				}
				
				{
					if (jsonHandle.strTeam === 'Red') {
						Player.playerHandle[socketHandle.strIdent].strTeam = 'teamRed';
						
					} else if (jsonHandle.strTeam === 'Blue') {
						Player.playerHandle[socketHandle.strIdent].strTeam = 'teamBlue';
						
					}
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].strName = jsonHandle.strName;
				}
				
				{
					socketHandle.emit('loginHandle', {
						'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
						'strType': 'typeAccept',
						'strMessage': ''
					});
				}
				
				{
					socketHandle.emit('gameserverHandle', {
						'strMapType': Gameserver.strMapType,
						'strPhaseActive': Gameserver.strPhaseActive
					});
				}
				
				{
					Gameserver.functionPlayerRespawn(Player.playerHandle[socketHandle.strIdent]);
				}
			});
			
			socketHandle.on('chatHandle', function(jsonHandle) {
				if (jsonHandle.strMessage === undefined) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strStatus === 'teamLogin') {
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
						for (var strIdent in Player.playerHandle) {
							var playerHandle = Player.playerHandle[strIdent];
							
							if (playerHandle.strTeam === 'teamLogin') {
								continue;
							}
							
							{
								playerHandle.socketHandle.emit('chatHandle', {
									'strIdent': Player.playerHandle[socketHandle.strIdent].strIdent,
									'strName': Player.playerHandle[socketHandle.strIdent].strName,
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
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strStatus === 'teamLogin') {
					return;
					
				}
				
				{
					// TODO: strMapAvailable is empty?
					
					socketHandle.emit('pingHandle', {
						'strMapActive': Gameserver.strMapActive,
						'strMapAvailable': Gameserver.strMapAvailable,
						'strPhaseActive': Gameserver.strPhaseActive,
						'intPhaseRemaining': Gameserver.intPhaseRemaining,
						'intPhaseRound': Gameserver.intPhaseRound,
						'intScoreRed': Gameserver.intScoreRed,
						'intScoreBlue': Gameserver.intScoreBlue,
						'intPlayerActive': Gameserver.intPlayerActive,
						'intPlayerCapacity': Gameserver.intPlayerCapacity
					});
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
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strStatus === 'teamLogin') {
					return;
					
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].strItem = jsonHandle.strItem;
					Player.playerHandle[socketHandle.strIdent].dblPosition = jsonHandle.dblPosition;
					Player.playerHandle[socketHandle.strIdent].dblVerlet = jsonHandle.dblVerlet;
					Player.playerHandle[socketHandle.strIdent].dblRotation = jsonHandle.dblRotation;
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
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strStatus === 'teamLogin') {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].intInteractionWeapon > 0) {
					return;
					
				} else if (Gameserver.strMapOrigtype[jsonHandle.intCoordinate] !== undefined) {
					return;
					
				} else if (Gameserver.strMapBlocked.indexOf(JSON.stringify(jsonHandle.intCoordinate)) !== -1) {
					return;
					
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].intInteractionWeapon = Constants.intInteractionPickaxeDuration;
				}
				
				{
					if (jsonHandle.strType === '') {
						delete Gameserver.strMapType[jsonHandle.intCoordinate];
						
					} else if (jsonHandle.strType !== '') {
						Gameserver.strMapType[jsonHandle.intCoordinate] = jsonHandle.strType;
						
					}
				}
	
				{
					for (var strIdent in Player.playerHandle) {
						var playerHandle = Player.playerHandle[strIdent];
						
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
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].strStatus === 'teamLogin') {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].intInteractionWeapon > 0) {
					return;
					
				}
				
				{
					if (jsonHandle.strWeapon === 'weaponSword') {
						{
							Player.playerHandle[socketHandle.strIdent].intInteractionWeapon = Constants.intInteractionSwordDuration;
						}
						
						{
							var strPlayer = Player.playerHandle[socketHandle.strIdent].strIdent;
							var dblPosition = [ 0.0, 0.0, 0.0 ];
							var dblVerlet = [ 0.0, 0.0, 0.0 ];
							var dblAcceleration = [ 0.0, 0.0, 0.0 ];
							var dblRotation = [ 0.0, 0.0, 0.0 ];
							
							{
								dblRotation[0] = Player.playerHandle[socketHandle.strIdent].dblRotation[0];
								dblRotation[1] = Player.playerHandle[socketHandle.strIdent].dblRotation[1];
								dblRotation[2] = Player.playerHandle[socketHandle.strIdent].dblRotation[2];
							}
							
							{
								var physicsHit = {
									'dblPosition': [ 0.0, 0.0, 0.0 ],
									'dblAcceleration': [ 0.0, 0.0, 0.0 ]
								};
								
								{
									physicsHit.dblPosition[0] = Player.playerHandle[socketHandle.strIdent].dblPosition[0];
									physicsHit.dblPosition[1] = Player.playerHandle[socketHandle.strIdent].dblPosition[1] + (0.25 * Constants.dblPlayerSize[1]);
									physicsHit.dblPosition[2] = Player.playerHandle[socketHandle.strIdent].dblPosition[2];
		
									physicsHit.dblAcceleration[0] = -1.0 * Math.sin(dblRotation[1]) * Math.cos(dblRotation[2]);
									physicsHit.dblAcceleration[1] = -1.0 * Math.sin(dblRotation[2] + (1.0 * Math.PI));
									physicsHit.dblAcceleration[2] = -1.0 * Math.cos(dblRotation[1]) * Math.cos(dblRotation[2]);
								}
								
								for (var strIdent in Player.playerHandle) {
									var playerHandle = Player.playerHandle[strIdent];
									
									if (playerHandle.strTeam === 'teamLogin') {
										continue;
										
									} else if (playerHandle.strIdent === Player.playerHandle[socketHandle.strIdent].strIdent) {
										continue;
										
									}
									
									{
										playerHandle.dblSize = Constants.dblPlayerHitbox;
										
										if (Physics.updateRaycol(physicsHit, playerHandle) === false) {
											continue;
										}
									}
									
									{
										var dblHitX = playerHandle.dblPosition[0] - Player.playerHandle[socketHandle.strIdent].dblPosition[0];
										var dblHitY = playerHandle.dblPosition[1] - Player.playerHandle[socketHandle.strIdent].dblPosition[1];
										var dblHitZ = playerHandle.dblPosition[2] - Player.playerHandle[socketHandle.strIdent].dblPosition[2];
										
										if (Math.sqrt((dblHitX * dblHitX) + (dblHitY * dblHitY) + (dblHitZ * dblHitZ)) > Constants.dblInteractionSwordRange) {
											continue;
										}
									}
									
									{
										Gameserver.functionPlayerHit(playerHandle, {
											'strIdent': 'itemSword',
											'strPlayer': strPlayer,
											'dblPosition': dblPosition,
											'dblVerlet': dblVerlet,
											'dblAcceleration': dblAcceleration,
											'dblRotation': dblRotation
										});
									}
								}
							}
						}
						
					} else if (jsonHandle.strWeapon === 'weaponBow') {
						{
							Player.playerHandle[socketHandle.strIdent].intInteractionWeapon = Constants.intInteractionBowDuration;
						}
						
						{
							var strIdent = 'itemArrow' + ' - ' + Node.hashbase(Node.cryptoHandle.randomBytes(16)).substr(0, 8);
							var strPlayer = Player.playerHandle[socketHandle.strIdent].strIdent;
							var dblPosition = [ 0.0, 0.0, 0.0 ];
							var dblVerlet = [ 0.0, 0.0, 0.0 ];
							var dblAcceleration = [ 0.0, 0.0, 0.0 ];
							var dblRotation = [ 0.0, 0.0, 0.0 ];
							
							{
								dblPosition[0] = Player.playerHandle[socketHandle.strIdent].dblPosition[0] + (0.25 * Math.sin(Player.playerHandle[socketHandle.strIdent].dblRotation[1] + (0.5 * Math.PI)));
								dblPosition[1] = Player.playerHandle[socketHandle.strIdent].dblPosition[1] + (0.1);
								dblPosition[2] = Player.playerHandle[socketHandle.strIdent].dblPosition[2] + (0.25 * Math.cos(Player.playerHandle[socketHandle.strIdent].dblRotation[1] + (0.5 * Math.PI)));
								
								dblVerlet[0] = dblPosition[0];
								dblVerlet[1] = dblPosition[1];
								dblVerlet[2] = dblPosition[2];
								
								dblAcceleration[0] = -1.0 * Math.sin(Player.playerHandle[socketHandle.strIdent].dblRotation[1]) * Math.cos(Player.playerHandle[socketHandle.strIdent].dblRotation[2]);
								dblAcceleration[1] = -1.0 * Math.sin(Player.playerHandle[socketHandle.strIdent].dblRotation[2] + (1.0 * Math.PI));
								dblAcceleration[2] = -1.0 * Math.cos(Player.playerHandle[socketHandle.strIdent].dblRotation[1]) * Math.cos(Player.playerHandle[socketHandle.strIdent].dblRotation[2]);
								
								dblRotation[0] = Player.playerHandle[socketHandle.strIdent].dblRotation[0];
								dblRotation[1] = Player.playerHandle[socketHandle.strIdent].dblRotation[1];
								dblRotation[2] = Player.playerHandle[socketHandle.strIdent].dblRotation[2];
							}
							
							Item.itemHandle[strIdent] = {
								'strIdent': strIdent,
								'strPlayer': strPlayer,
								'strItem': 'itemArrow',
								'dblPosition': dblPosition,
								'dblVerlet': dblVerlet,
								'dblAcceleration': dblAcceleration,
								'dblRotation': dblRotation
							};
						}
						
					}
				}
			});
			
			socketHandle.on('disconnect', function() {
				{
					delete Player.playerHandle[socketHandle.strIdent];
				}
			});
		}
	});
}

var Constants = {
	intGameloopInterval: 16,
	
	intPlayerHealth: 100,
	dblPlayerMovement: [ 0.03, 0.18, 0.03 ],
	dblPlayerSize: [ 0.9, 1.6, 0.9 ],
	dblPlayerGravity: [ 0.0, -0.01, 0.0 ],
	dblPlayerMaxvel: [ 0.08, 0.26, 0.08 ],
	dblPlayerFriction: [ 0.8, 1.0, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ],
	
	intInteractionPickaxeDuration: 500,
	intInteractionSwordDuration: 500,
	intInteractionSwordDamage: 20,
	dblInteractionSwordImpact: [ 0.09, 0.09, 0.09 ],
	dblInteractionSwordRange: 2.0,
	intInteractionBowDuration: 500,
	intInteractionBowDamage: 20,
	dblInteractionBowImpact: [ 0.09, 0.09, 0.09 ],
	
	dblFlagSize: [ 1.0, 1.0, 1.0 ],
	dblFlagGravity: [ 0.0, -0.01, 0.0 ],
	dblFlagMaxvel: [ 0.08, 0.26, 0.08 ],
	dblFlagFriction: [ 0.8, 1.0, 0.8 ],
	dblFlagRotate: 0.02,
	
	dblArrowSize: [ 0.3, 0.3, 0.3],
	dblArrowGravity: [ 0.0, -0.001, 0.0 ],
	dblArrowMaxvel: [ 0.26 ],
	dblArrowFriction: [ 1.0, 1.0, 1.0 ]
};

var Gameserver = {
	strName: '',
	
	strLoginPassword: '',
	intLoginPassword: 0,
	strLoginMotd: '',
	
	strMapActive: '',
	strMapAvailable: [],
	strMapType: {},
	strMapOrigtype: {},
	intMapSpawnRed: [],
	intMapSpawnBlue: [],
	intMapFlagRed: [],
	intMapFlagBlue: [],
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
	
	intPlayerActive: 0,
	intPlayerCapacity: 0,
	functionPlayerRespawn: null,
	functionPlayerHit: null,
	
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
			
			Gameserver.intMapSpawnRed = [];
			
			Gameserver.intMapSpawnBlue = [];
			
			Gameserver.intMapFlagRed = [];
			
			Gameserver.intMapFlagBlue = [];
			
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
					
					Gameserver.intMapSpawnRed = [];
					
					Gameserver.intMapSpawnBlue = [];
					
					Gameserver.intMapFlagRed = [];
					
					Gameserver.intMapFlagBlue = [];
					
					Gameserver.intMapSeparator = [];
					
					Gameserver.strMapBlocked = [];
				}
				
				{
				    for (var intCoordinate in Gameserver.strMapType) {
						var strType = Gameserver.strMapType[intCoordinate];
						
						{
							if (strType === 'voxelSpawnRed') {
								Gameserver.intMapSpawnRed.push(JSON.parse('[' + intCoordinate + ']'));
								
							} else if (strType === 'voxelSpawnBlue') {
								Gameserver.intMapSpawnBlue.push(JSON.parse('[' + intCoordinate + ']'));
								
							} else if (strType === 'voxelFlagRed') {
								Gameserver.intMapFlagRed.push(JSON.parse('[' + intCoordinate + ']'));
								
								delete Gameserver.strMapType[intCoordinate];
								
							} else if (strType === 'voxelFlagBlue') {
								Gameserver.intMapFlagBlue.push(JSON.parse('[' + intCoordinate + ']'));

								delete Gameserver.strMapType[intCoordinate];
								
							} else if (strType === 'voxelSeparator') {
								Gameserver.intMapSeparator.push(JSON.parse('[' + intCoordinate + ']'));
								
							}
						}
				    }
				}
				
				{
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapSpawnRed.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapSpawnRed[intFor1][0];
					    		var intY = Gameserver.intMapSpawnRed[intFor1][1];
					    		var intZ = Gameserver.intMapSpawnRed[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 2, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapSpawnBlue.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapSpawnBlue[intFor1][0];
					    		var intY = Gameserver.intMapSpawnBlue[intFor1][1];
					    		var intZ = Gameserver.intMapSpawnBlue[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 2, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapFlagRed.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapFlagRed[intFor1][0];
					    		var intY = Gameserver.intMapFlagRed[intFor1][1];
					    		var intZ = Gameserver.intMapFlagRed[intFor1][2];
					    		
					    		{
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 0, intZ + intFor3 ]));
							    	
							    	Gameserver.strMapBlocked.push(JSON.stringify([ intX + intFor2, intY + 1, intZ + intFor3 ]));
					    		}
					    	}
				    	}
				    }
				    
				    for (var intFor1 = 0; intFor1 < Gameserver.intMapFlagBlue.length; intFor1 += 1) {
				    	for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    		var intX = Gameserver.intMapFlagBlue[intFor1][0];
					    		var intY = Gameserver.intMapFlagBlue[intFor1][1];
					    		var intZ = Gameserver.intMapFlagBlue[intFor1][2];
					    		
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
						Item.initFlags();
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
					for (var strIdent in Player.playerHandle) {
						var playerHandle = Player.playerHandle[strIdent];
						
						if (playerHandle.strTeam === 'teamLogin') {
							continue;
						}
						
						{
							playerHandle.socketHandle.emit('gameserverHandle', {
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
			Gameserver.intPlayerCapacity = process.env.intPlayerCapacity;
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.functionPlayerRespawn = function(playerHandle) {
				{
					playerHandle.intHealth = Constants.intPlayerHealth;
				}
				
				{
					var intMapSpawn = [];
					
					if (playerHandle.strTeam === 'teamRed') {
						intMapSpawn = Gameserver.intMapSpawnRed[Math.floor(Math.random() * Gameserver.intMapSpawnRed.length)];
						
					} else if (playerHandle.strTeam === 'teamBlue') {
						intMapSpawn = Gameserver.intMapSpawnBlue[Math.floor(Math.random() * Gameserver.intMapSpawnBlue.length)];
						
					}

					playerHandle.dblPosition[0] = intMapSpawn[0] + 0.5;
					playerHandle.dblPosition[1] = intMapSpawn[1] + 2.0;
					playerHandle.dblPosition[2] = intMapSpawn[2] + 0.5;

					playerHandle.dblVerlet[0] = playerHandle.dblPosition[0];
					playerHandle.dblVerlet[1] = playerHandle.dblPosition[1];
					playerHandle.dblVerlet[2] = playerHandle.dblPosition[2];
				}
				
				{
					playerHandle.socketHandle.emit('playerHandle', {
						'strTeam': playerHandle.strTeam,
						'intHealth': playerHandle.intHealth,
						'dblPosition': playerHandle.dblPosition,
						'dblVerlet': playerHandle.dblVerlet,
						'dblAcceleration': playerHandle.dblAcceleration
					});
				}
			};
			
			Gameserver.functionPlayerHit = function(playerHandle, itemHandle) {
				{
					if (itemHandle.strIdent.indexOf('itemSword') === 0) {
						playerHandle.intHealth -= Constants.intInteractionSwordDamage;
						
					} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
						playerHandle.intHealth -= Constants.intInteractionBowDamage;
						
					}
				}
				
				{
					if (playerHandle.intHealth >= 1) {
						{
							if (itemHandle.strIdent.indexOf('itemSword') === 0) {
								playerHandle.dblAcceleration[0] = -1.0 * Constants.dblInteractionSwordImpact[0] * Math.sin(itemHandle.dblRotation[1]) * Math.cos(itemHandle.dblRotation[2]);
								playerHandle.dblAcceleration[1] = -1.0 * Constants.dblInteractionSwordImpact[1] * Math.sin(itemHandle.dblRotation[2] + (1.0 * Math.PI));
								playerHandle.dblAcceleration[2] = -1.0 * Constants.dblInteractionSwordImpact[2] * Math.cos(itemHandle.dblRotation[1]) * Math.cos(itemHandle.dblRotation[2]);

							} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
								playerHandle.dblAcceleration[0] = -1.0 * Constants.dblInteractionBowImpact[0] * Math.sin(itemHandle.dblRotation[1]) * Math.cos(itemHandle.dblRotation[2]);
								playerHandle.dblAcceleration[1] = -1.0 * Constants.dblInteractionBowImpact[1] * Math.sin(itemHandle.dblRotation[2] + (1.0 * Math.PI));
								playerHandle.dblAcceleration[2] = -1.0 * Constants.dblInteractionBowImpact[2] * Math.cos(itemHandle.dblRotation[1]) * Math.cos(itemHandle.dblRotation[2]);
								
							}
						}
						
						{
							playerHandle.socketHandle.emit('playerHandle', {
								'strTeam': playerHandle.strTeam,
								'intHealth': playerHandle.intHealth,
								'dblPosition': playerHandle.dblPosition,
								'dblVerlet': playerHandle.dblVerlet,
								'dblAcceleration': playerHandle.dblAcceleration
							});
						}
						
					} else if (playerHandle.intHealth < 1) {
						{
							playerHandle.intDeaths += 1;
						}
						
						{
							Gameserver.functionPlayerRespawn(playerHandle);
						}
						
						{
							for (var strIdent in Player.playerHandle) {
								var playerHandle = Player.playerHandle[strIdent];
								
								if (playerHandle.strTeam === 'teamLogin') {
									continue;
									
								} else if (playerHandle.strIdent !== itemHandle.strPlayer) {
									continue;
									
								}
								
								{
									playerHandle.intKills += 1;
								}
							}
						}
						
					}
				}
			};
		}
		
		{
			Gameserver.functionMapLoad();
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
			
			Gameserver.intMapSpawnRed = [];
			
			Gameserver.intMapSpawnBlue = [];
			
			Gameserver.intMapFlagRed = [];
			
			Gameserver.intMapFlagBlue = [];
			
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
			Gameserver.intPlayerCapacity = 0;
			
			Gameserver.intPlayerActive = 0;
			
			Gameserver.functionPlayerRespawn = null;
			
			Gameserver.functionPlayerHit = null;
		}
	}
};

{
	with (global) {
		eval(Node.fsHandle.readFileSync(__dirname + '/libs/Player.js').toString());
		
		eval(Node.fsHandle.readFileSync(__dirname + '/libs/Item.js').toString());
		
		eval(Node.fsHandle.readFileSync(__dirname + '/libs/Physics.js').toString());
	}
}

{
	Gameserver.init();
}

{
	Player.init();
}

{
	Item.init();
	
	Item.initFlags();
}

{
	Physics.init();
	
	Physics.functionVoxelcol = function(intX, intY, intZ) {
		if (intY === 0) {
			return true;
			
		} else if (Gameserver.strMapType[[intX, intY, intZ ]] !== undefined) {
			return true;
			
		}
		
		return false;
	}
}

{
	var Animationframe_intTimestamp = new Date().getTime();
	
	var functionAnimationframe = function() {
		{	
			{
				Player.update();
			}
			
			{
				var jsonHandle = [];

				for (var strIdent in Player.playerHandle) {
					var playerHandle = Player.playerHandle[strIdent];
					
					{
						jsonHandle.push({
							'a': playerHandle.strIdent,
							'b': playerHandle.strTeam,
							'c': playerHandle.strItem,
							'd': playerHandle.strName,
							'e': playerHandle.intScore,
							'f': playerHandle.intKills,
							'g': playerHandle.intDeaths,
							'h': playerHandle.dblPosition,
							'i': playerHandle.dblVerlet,
							'j': playerHandle.dblRotation
						});
					}
			    }
			    
				for (var strIdent in Player.playerHandle) {
					var playerHandle = Player.playerHandle[strIdent];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						playerHandle.socketHandle.emit('enemyHandle', jsonHandle);
					}
				}
			}
		}
		
		{
			{
				Item.update();
			}
			
			{
				var jsonHandle = [];

				for (var strIdent in Item.itemHandle) {
					var itemHandle = Item.itemHandle[strIdent];
					
					{
						jsonHandle.push({
							'a': itemHandle.strIdent,
							'b': itemHandle.dblPosition,
							'c': itemHandle.dblVerlet,
							'd': itemHandle.dblRotation
						});
					}
			    }
			    
				for (var strIdent in Player.playerHandle) {
					var playerHandle = Player.playerHandle[strIdent];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						playerHandle.socketHandle.emit('itemHandle', jsonHandle);
					}
				}
			}
		}
		
		{
			var intWait = Constants.intGameloopInterval - (new Date().getTime() - Animationframe_intTimestamp);
			
			if (intWait >= 1) {
				setTimeout(functionAnimationframe, intWait);
				
			} else if (intWait < 1) {
				setImmediate(functionAnimationframe);
				
			}
		}
		
		{
			Animationframe_intTimestamp = new Date().getTime();
		}
	};
	
	setTimeout(functionAnimationframe, Constants.intGameloopInterval);
}

{
	var functionInterval = function() {
		{
			{
				Gameserver.intPlayerActive = 0;
			}
			
			{
				for (var strIdent in Player.playerHandle) {
					var playerHandle = Player.playerHandle[strIdent];
					
					if (playerHandle.strTeam === 'teamLogin') {
						continue;
					}
					
					{
						Gameserver.intPlayerActive += 1;
					}
				}
			}
		}
		
		{
			Gameserver.functionPhaseUpdate();
		}
	};
	
	setInterval(functionInterval, 1000);
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


// TODO: put this back in
/*
{
	for (var strIdent in Item.itemHandle) {
		var itemHandle = Item.itemHandle[strIdent];
		
		if (itemHandle.strItem !== 'itemArrow') {
			continue;
		}
		
		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];
				
				if (playerHandle.strTeam === 'teamLogin') {
					continue;
					
				} else if (playerHandle.strIdent === itemHandle.strPlayer) {
					continue;
					
				}
				
				{
					itemHandle.dblSize = Constants.dblArrowSize;
					
					playerHandle.dblSize = Constants.dblPlayerHitbox;
					
					if (Physics.updateObjectcol(itemHandle, playerHandle) === false) {
						continue;
					}
				}
				
				{
					Gameserver.functionPlayerHit(playerHandle, itemHandle);
				}
				
				{
					delete Item.itemHandle[itemHandle.strIdent];
				}
				
				{
					break;
				}
			}
		}
	}
}
*/