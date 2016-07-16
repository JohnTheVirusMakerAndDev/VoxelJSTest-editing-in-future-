'use strict';

var NodeConf = require(__dirname + '/NodeConf.js')();
var NodeRect = require(__dirname + '/NodeRect.js')();

var Node = NodeRect.Node;
var Aws = NodeRect.Aws;
var Express = NodeRect.Express;
var Geoip = NodeRect.Geoip;
var Hypertextmin = NodeRect.Hypertextmin;
var Mime = NodeRect.Mime;
var Multer = NodeRect.Multer;
var Mustache = NodeRect.Mustache;
var Phantom = NodeRect.Phantom;
var Postgres = NodeRect.Postgres;
var Recaptcha = NodeRect.Recaptcha;
var Socket = NodeRect.Socket;
var Xml = NodeRect.Xml;

var VoxConf = require(__dirname + '/VoxConf.js')();

{
	Express.serverHandle.use(function(requestHandle, responseHandle, functionNext) {
		var strName = '';
		var strPassword = '';
		
		{
			var strAuthorization = requestHandle.get('Authorization');
			
			if (strAuthorization !== undefined) {
				var strEncoded = strAuthorization.split(' ');
				
				if (strEncoded.length === 2) {
					var strDecoded = new Buffer(strEncoded[1], 'base64').toString().split(':');
					
					if (strDecoded.length === 2) {
						strName = strDecoded[0];
						strPassword = strDecoded[1];
					}
				}
			}
		}
		
		{
			if (VoxConf.strLoginPassword === '') {
				functionNext();
				
				return;
				
			} else if (VoxConf.strLoginPassword === strPassword) {
				functionNext();
				
				return;
				
			}
		}
		
		{
			responseHandle.status(401);
			
			responseHandle.set({
				'WWW-Authenticate': 'Basic realm="' + VoxConf.strName + '"'
			});
			
			responseHandle.end();
		}
	});
	
	Express.serverHandle.use(function(requestHandle, responseHandle, functionNext) {
		responseHandle.header('Access-Control-Allow-Origin', '*');
		
		functionNext();
	});
	
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
		
		var functionPreprocess = function() {
			{
				// ...
			}
			
			functionFilesystemRead();
		};
		
		var FilesystemRead_bufferHandle = null;
		
		var functionFilesystemRead = function() {
			Node.fsHandle.readFile(__dirname + '/assets/index.html', function(errorHandle, bufferHandle) {
				if (errorHandle !== null) {
					functionError();
					
					return;
				}
				
				{
					FilesystemRead_bufferHandle = bufferHandle;
				}
				
				functionSuccess();
			});
		};
		
		var functionError = function() {
			responseHandle.end();
		};
		
		var functionSuccess = function() {
			var strData = FilesystemRead_bufferHandle.toString();
			
			{
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
				
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
			}
			
			{
				strData = Hypertextmin.hypertextminHandle.minify(strData, {
					'removeComments': true,
					'removeCommentsFromCDATA': true,
					'collapseWhitespace': true,
					'conservativeCollapse': true
				});
			}
			
			responseHandle.status(200);
			
			responseHandle.set({
				'Content-Length': Buffer.byteLength(strData, 'utf-8'),
				'Content-Type': Mime.mimeHandle.lookup('html'),
				'Content-Disposition': 'inline; filename="' + requestHandle.path.substr(requestHandle.path.lastIndexOf('/') + 1) + '";'
			});
			
			responseHandle.write(new Buffer(strData, 'utf-8'));
			
			responseHandle.end();
		};
		
		functionPreprocess();
	});
	
	Express.serverHandle.use('/', Express.expressHandle.static(__dirname + '/assets', {
		'etag': false,
		'lastModified': false
	}));
}

{
	Socket.serverHandle.on('connection', function(socketHandle) {
		{
			socketHandle.strIdent = socketHandle.id.substr(2, 8);
		}
		
		{
			var strIdent = socketHandle.strIdent;
			
			Player.playerHandle[strIdent] = {
				'strIdent': strIdent,
				'strTeam': '',
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
				'intWalk': 0,
				'intWeapon': 0
			};
		}
		
		{
			Player.playerHandle[socketHandle.strIdent].socketHandle = socketHandle;
		}
		
		{
			socketHandle.emit('worldHandle', {
				'strBuffer': World.saveBuffer()
			});
		}
		
		{
			socketHandle.emit('loginHandle', {
				'strType': 'typeReject',
				'strMessage': ''
			});
		}
		
		{
			socketHandle.on('loginHandle', function(objectData) {
				if (objectData.strName === undefined) {
					return;
					
				} else if (objectData.strTeam === undefined) {
					return;
					
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (objectData.strTeam.replace(new RegExp('(teamRed)|(teamBlue)', ''), '') !== '') {
					return;
					
				}
				
				{
					if (Gameserver.intPlayerActive === Gameserver.intPlayerCapacity) {
						socketHandle.emit('loginHandle', {
							'strType': 'typeReject',
							'strMessage': 'server full'
						});
						
						return;
						
					} else if (objectData.strName === '') {
						socketHandle.emit('loginHandle', {
							'strType': 'typeReject',
							'strMessage': 'name invalid'
						});
						
						return;
						
					}
				}
				
				{
					if (objectData.strName.length > 20) {
						objectData.strName = objectData.strName.substr(1, 20) + ' ... ';
					}
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].strTeam = objectData.strTeam;
					
					Player.playerHandle[socketHandle.strIdent].strName = objectData.strName;
				}
				
				{
					socketHandle.emit('loginHandle', {
						'strType': 'typeAccept',
						'strMessage': ''
					});
				}
				
				{
					Gameserver.playerRespawn(Player.playerHandle[socketHandle.strIdent]);
				}
			});
			
			socketHandle.on('pingHandle', function(objectData) {
				if (objectData.intTimestamp === undefined) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
				}
				
				{
					socketHandle.emit('pingHandle', {
						'strPhaseActive': Gameserver.strPhaseActive,
						'intPhaseRound': Gameserver.intPhaseRound,
						'intPhaseRemaining': Gameserver.intPhaseRemaining,
						'strWorldAvailable': Gameserver.strWorldAvailable,
						'strWorldActive': Gameserver.strWorldActive,
						'intPlayerActive': Gameserver.intPlayerActive,
						'intPlayerCapacity': Gameserver.intPlayerCapacity,
						'intScoreRed': Gameserver.intScoreRed,
						'intScoreBlue': Gameserver.intScoreBlue
					});
				}
			});
			
			socketHandle.on('chatHandle', function(objectData) {
				if (objectData.strMessage === undefined) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (objectData.strMessage === '') {
					return;
					
				}
				
				{
					if (objectData.strMessage.length > 140) {
						objectData.strMessage = objectData.strMessage.substr(1, 140) + ' ... ';
					}
				}
				
				{
					Socket.serverHandle.emit('chatHandle', {
						'strName': Player.playerHandle[socketHandle.strIdent].strName,
						'strMessage': objectData.strMessage
					});
				}
			});
			
			socketHandle.on('worldCreate', function(objectData) {
				if (objectData.intCoordinate === undefined) {
					return;
					
				} else if (objectData.intCoordinate.length !== 3) {
					return;
					
				} else if (objectData.strType === undefined) {
					return;
					
				} else if (objectData.boolBlocked === undefined) {
					return;
					
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].intWeapon > 0) {
					return;
					
				} else if (World.updateBlocked(objectData.intCoordinate) === true) {
					return;
					
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].intWeapon = Constants.intInteractionPickaxeDuration;
				}
				
				{
					var dblPosition = [ 0.0, 0.0, 0.0 ];
					var dblSize = [ 0.0, 0.0, 0.0 ];
					
					{
						dblPosition[0] = objectData.intCoordinate[0] + (0.5 * Constants.dblGameBlocksize);
						dblPosition[1] = objectData.intCoordinate[1] + (0.5 * Constants.dblGameBlocksize);
						dblPosition[2] = objectData.intCoordinate[2] + (0.5 * Constants.dblGameBlocksize);
						
						dblSize[0] = 1.25 * Constants.dblGameBlocksize;
						dblSize[1] = 1.25 * Constants.dblGameBlocksize;
						dblSize[2] = 1.25 * Constants.dblGameBlocksize;
					}
					
					Physics.updateObjectcol({
						'dblPosition': dblPosition,
						'dblSize': dblSize
					}, function(functionObjectcol) {
						var playerHandle = null;
						
						{
							if (functionObjectcol.strIdent === undefined) {
								functionObjectcol.strIdent = Object.keys(Player.playerHandle);
							}
						}
						
						{
							do {
								playerHandle = Player.playerHandle[functionObjectcol.strIdent.pop()];
								
								if (playerHandle === undefined) {
									return null;
								}
								
								break;
							} while (true);
						}
						
						{
							playerHandle.dblSize = Constants.dblPlayerHitbox;
						}
						
						return playerHandle;
					}, function(playerHandle) {
						{
							objectData.strType = '';
							
							objectData.boolBlocked = true;
						}
					});
				}
				
				if (objectData.strType !== 'voxelDirt') {
					return;
					
				} else if (objectData.boolBlocked !== false) {
					return;
					
				}
				
				{
					World.updateCreate(objectData.intCoordinate, objectData.strType, objectData.boolBlocked);
				}
				
				{
					Socket.serverHandle.emit('worldCreate', {
						'intCoordinate': objectData.intCoordinate,
						'strType': objectData.strType,
						'boolBlocked': objectData.boolBlocked
					});
				}
			});
			
			socketHandle.on('worldDestroy', function(objectData) {
				if (objectData.intCoordinate === undefined) {
					return;
					
				} else if (objectData.intCoordinate.length !== 3) {
					return;
					
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].intWeapon > 0) {
					return;
					
				} else if (World.updateBlocked(objectData.intCoordinate) === true) {
					return;
					
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].intWeapon = Constants.intInteractionPickaxeDuration;
				}
				
				{
					World.updateDestroy(objectData.intCoordinate);
				}
				
				{
					Socket.serverHandle.emit('worldDestroy', {
						'intCoordinate': objectData.intCoordinate
					});
				}
			});
			
			socketHandle.on('playerHandle', function(objectData) {
				var bufferHandle = new Buffer(objectData.strBuffer, 'base64');
				
				try {
					Player.loadBufferpart({}, bufferHandle, 0);
				} catch (errorHandle) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
				}
				
				{
					var playerHandle = {};
					
					{
						Player.loadBufferpart(playerHandle, bufferHandle, 0);
					}
					
					{
						Player.playerHandle[socketHandle.strIdent].dblPosition = playerHandle.dblPosition;
						Player.playerHandle[socketHandle.strIdent].dblVerlet = playerHandle.dblVerlet;
						Player.playerHandle[socketHandle.strIdent].dblAcceleration = playerHandle.dblAcceleration;
						Player.playerHandle[socketHandle.strIdent].dblRotation = playerHandle.dblRotation;
					}
				}
			});
			
			socketHandle.on('itemHandle', function(objectData) {
				if (objectData.strItem === undefined) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (objectData.strItem.replace(new RegExp('(itemPickaxe)|(itemSword)|(itemBow)', ''), '') !== '') {
					return;
					
				}
				
				{
					Player.playerHandle[socketHandle.strIdent].strItem = objectData.strItem;
				}
			});
			
			socketHandle.on('weaponHandle', function(objectData) {
				if (objectData.strWeapon === undefined) {
					return;
				}
				
				if (Player.playerHandle[socketHandle.strIdent] === undefined) {
					return;
					
				} else if (Player.playerHandle[socketHandle.strIdent].intWeapon > 0) {
					return;
					
				}
				
				{
					if (objectData.strWeapon === 'weaponSword') {
						Player.playerHandle[socketHandle.strIdent].intWeapon = Constants.intInteractionSwordDuration;
						
					} else if (objectData.strWeapon === 'weaponBow') {
						Player.playerHandle[socketHandle.strIdent].intWeapon = Constants.intInteractionBowDuration;
						
					}
				}
				
				{
					if (objectData.strWeapon === 'weaponSword') {
						var strIdent = 'itemSword' + ' - ' + Node.hashbase(Node.cryptoHandle.randomBytes(16)).substr(0, 8);
						var strPlayer = Player.playerHandle[socketHandle.strIdent].strIdent;
						var dblPosition = [ 0.0, 0.0, 0.0 ];
						var dblVerlet = [ 0.0, 0.0, 0.0 ];
						var dblAcceleration = [ 0.0, 0.0, 0.0 ];
						var dblRotation = [ 0.0, 0.0, 0.0 ];
						
						{
							dblPosition[0] = Player.playerHandle[socketHandle.strIdent].dblPosition[0];
							dblPosition[1] = Player.playerHandle[socketHandle.strIdent].dblPosition[1] + (0.25 * Constants.dblPlayerSize[1]);
							dblPosition[2] = Player.playerHandle[socketHandle.strIdent].dblPosition[2];
							
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
						
						var itemHandle = {
							'strIdent': strIdent,
							'strPlayer': strPlayer,
							'dblPosition': dblPosition,
							'dblVerlet': dblVerlet,
							'dblAcceleration': dblAcceleration,
							'dblRotation': dblRotation
						};
						
						{
							itemHandle.dblSize = [ 0.0, 0.0, 0.0 ];
							
							Physics.updateRaycol(itemHandle, function(functionRaycol) {
								var playerHandle = null;
								
								{
									if (functionRaycol.strIdent === undefined) {
										functionRaycol.strIdent = Object.keys(Player.playerHandle);
									}
								}
								
								{
									do {
										playerHandle = Player.playerHandle[functionRaycol.strIdent.pop()];
										
										if (playerHandle === undefined) {
											return null;
										}
										
										if (playerHandle.strIdent === itemHandle.strPlayer) {
											continue;
										}
										
										var dblDistanceX = playerHandle.dblPosition[0] - itemHandle.dblPosition[0];
										var dblDistanceY = playerHandle.dblPosition[1] - itemHandle.dblPosition[1];
										var dblDistanceZ = playerHandle.dblPosition[2] - itemHandle.dblPosition[2];
										
										if (Math.sqrt((dblDistanceX * dblDistanceX) + (dblDistanceY * dblDistanceY) + (dblDistanceZ * dblDistanceZ)) > Constants.dblInteractionSwordRange) {
											continue;
										}
										
										break;
									} while (true);
								}
								
								{
									playerHandle.dblSize = Constants.dblPlayerHitbox;
								}
								
								return playerHandle;
							}, function(playerHandle) {
								{
									Gameserver.playerHit(playerHandle, itemHandle);
								}
							});
						}
						
					} else if (objectData.strWeapon === 'weaponBow') {
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
							'dblPosition': dblPosition,
							'dblVerlet': dblVerlet,
							'dblAcceleration': dblAcceleration,
							'dblRotation': dblRotation
						};
						
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
	intGameLoop: 16,
	dblGameScale: 0.04,
	dblGameBlocksize: 1.0,
	
	intPlayerHealth: 100,
	dblPlayerMovement: [ 0.03, 0.18, 0.03 ],
	dblPlayerSize: [ 0.9, 1.6, 0.9 ],
	dblPlayerGravity: [ 0.0, -0.01, 0.0 ],
	dblPlayerMaxvel: [ 0.08, 0.26, 0.08 ],
	dblPlayerFriction: [ 0.8, 1.0, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ],
	
	intInteractionPickaxeDuration: 30,
	intInteractionSwordDuration: 30,
	intInteractionSwordDamage: 20,
	dblInteractionSwordImpact: [ 0.11, 0.11, 0.11 ],
	dblInteractionSwordRange: 2.0,
	intInteractionBowDuration: 30,
	intInteractionBowDamage: 20,
	dblInteractionBowImpact: [ 0.11, 0.11, 0.11 ],
	
	dblFlagSize: [ 1.0, 1.0, 1.0 ],
	dblFlagGravity: [ 0.0, -0.01, 0.0 ],
	dblFlagMaxvel: [ 0.08, 0.26, 0.08 ],
	dblFlagFriction: [ 0.8, 1.0, 0.8 ],
	dblFlagRotate: 0.02,
	
	dblArrowSize: [ 0.3, 0.3, 0.3 ],
	dblArrowGravity: [ 0.0, -0.001, 0.0 ],
	dblArrowMaxvel: [ 0.36 ],
	dblArrowFriction: [ 1.0, 1.0, 1.0 ]
};

var Gameserver = {
	strName: '',
	
	strLoginPassword: '',
	intLoginPassword: 0,
	strLoginMotd: '',
	
	strPhaseActive: '',
	intPhaseRound: 0,
	intPhaseRemaining: 0,
	
	strWorldAvailable: [],
	strWorldActive: '',
	strWorldFingerprint: '',
	
	intPlayerActive: 0,
	intPlayerCapacity: 0,
	
	intScoreRed: 0,
	intScoreBlue: 0,
	
	init: function() {
		{
			Gameserver.strName = VoxConf.strName;
		}
		
		{
			Gameserver.strLoginPassword = VoxConf.strLoginPassword;
			
			Gameserver.intLoginPassword = VoxConf.strLoginPassword === '' ? 0 : 1;
			
			Gameserver.strLoginMotd = VoxConf.strLoginMotd;
		}
		
		{
			Gameserver.strPhaseActive = 'Build';
			
			Gameserver.intPhaseRound = VoxConf.intPhaseRound;
			
			Gameserver.intPhaseRemaining = VoxConf.intPhaseRemaining;
		}
		
		{
			Gameserver.strWorldAvailable = VoxConf.strWorldAvailable;
			
			Gameserver.strWorldActive = Gameserver.strWorldAvailable[(Gameserver.strWorldAvailable.indexOf(Gameserver.strWorldActive) + 1) % Gameserver.strWorldAvailable.length];
			
			Gameserver.strWorldFingerprint = '';
		}
		
		{
			Gameserver.intPlayerCapacity = VoxConf.intPlayerCapacity;
			
			Gameserver.intPlayerActive = 0;
		}
		
		{
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
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
			Gameserver.strPhaseActive = '';
			
			Gameserver.intPhaseRound = 0;
			
			Gameserver.intPhaseRemaining = 0;
		}
		
		{
			Gameserver.strWorldAvailable = [];
			
			Gameserver.strWorldActive = '';
			
			Gameserver.strWorldFingerprint = '';
		}
		
		{
			Gameserver.intPlayerCapacity = 0;
			
			Gameserver.intPlayerActive = 0;
		}
		
		{
			Gameserver.intScoreRed = 0;
			
			Gameserver.intScoreBlue = 0;
		}
	},
	
	phaseUpdate: function() {
		{
			Gameserver.intPhaseRemaining = Math.max(0, Gameserver.intPhaseRemaining - Constants.intGameLoop);
		}
		
		{
			if (Gameserver.intPhaseRemaining === 0) {
				{
					if (Gameserver.strPhaseActive === 'Build') {
						{
							Gameserver.strPhaseActive = 'Combat';
							
							Gameserver.intPhaseRound -= 0;
							
							Gameserver.intPhaseRemaining = VoxConf.intPhaseRemaining;
						}
						
					} else if (Gameserver.strPhaseActive === 'Combat') {
						{
							Gameserver.strPhaseActive = 'Build';
							
							Gameserver.intPhaseRound -= 1;
							
							Gameserver.intPhaseRemaining = VoxConf.intPhaseRemaining;
						}
						
					}
				}
				
				{
					if (Gameserver.intPhaseRound === 0) {
						{
							Gameserver.strPhaseActive = 'Build';
							
							Gameserver.intPhaseRound = VoxConf.intPhaseRound;
							
							Gameserver.intPhaseRemaining = VoxConf.intPhaseRemaining;
						}
						
						{
							Gameserver.strWorldActive = Gameserver.strWorldAvailable[(Gameserver.strWorldAvailable.indexOf(Gameserver.strWorldActive) + 1) % Gameserver.strWorldAvailable.length];
							
							Gameserver.strWorldFingerprint = '';
						}
						
						{
							Gameserver.intScoreRed = 0;
							
							Gameserver.intScoreBlue = 0;
						}
					}
				}
			}
		}
	},
	
	worldUpdate: function() {
		{
			var boolGood = true;
			
			if (Gameserver.strWorldFingerprint.indexOf(Gameserver.strWorldActive) !== 0) {
				{
					boolGood = false;
				}
				
				{
					World.loadBuffer(Node.fsHandle.readFileSync(__dirname + '/worlds/' + Gameserver.strWorldActive + '.txt').toString());
				}
				
				{
				    for (var intFor1 = 0; intFor1 < World.intFlagRed.length; intFor1 += 1) {
						var intCoordinate = World.intFlagRed[intFor1];
						
						{
							World.updateDestroy(intCoordinate);
						}
				    }
					
				    for (var intFor1 = 0; intFor1 < World.intFlagBlue.length; intFor1 += 1) {
						var intCoordinate = World.intFlagBlue[intFor1];
						
						{
							World.updateDestroy(intCoordinate);
						}
				    }
				}
				
			} else if (Gameserver.strWorldFingerprint.indexOf(Gameserver.strWorldActive + ' - ' + Gameserver.strPhaseActive) !== 0) {
				{
					boolGood = false;
				}
				
				{
					if (Gameserver.strPhaseActive === 'Build') {
					    for (var intFor1 = 0; intFor1 < World.intSeparator.length; intFor1 += 1) {
							var intCoordinate = World.intSeparator[intFor1];
							
							{
								World.updateCreate(intCoordinate, 'voxelSeparator', true);
							}
					    }
						
					} else if (Gameserver.strPhaseActive === 'Combat') {
					    for (var intFor1 = 0; intFor1 < World.intSeparator.length; intFor1 += 1) {
							var intCoordinate = World.intSeparator[intFor1];
							
							{
								World.updateDestroy(intCoordinate);
							}
					    }
						
					}
				}
				
			}
			
			if (boolGood === false) {
				{
					Gameserver.strWorldFingerprint = Gameserver.strWorldActive + ' - ' + Gameserver.strPhaseActive + ' - ' + Gameserver.intPhaseRound;
				}
				
				{
					Item.initFlag(Item.itemHandle['itemFlag - teamRed']);
					
					Item.initFlag(Item.itemHandle['itemFlag - teamBlue']);
				}
				
				{
					Socket.serverHandle.emit('worldHandle', {
						'strBuffer': World.saveBuffer()
					});
				}
				
				{
					for (var strIdent in Player.playerHandle) {
						var playerHandle = Player.playerHandle[strIdent];
						
						if (playerHandle.strTeam === '') {
							continue;
						}
						
						{
							Gameserver.playerRespawn(playerHandle);
						}
					}
				}
			}
		}
	},
	
	playerUpdate: function() {
		{
			Gameserver.intPlayerActive = Object.keys(Player.playerHandle).length;
		}
		
		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];
				
				if (playerHandle.strTeam === '') {
					continue;
				}
				
				{
					if (playerHandle.intHealth < 1) {
						{
							playerHandle.intDeaths += 1;
						}
						
						{
							Gameserver.playerRespawn(playerHandle);
						}
						
					} else if (playerHandle.dblPosition[1] < (2.0 * Constants.dblGameBlocksize)) {
						{
							playerHandle.intDeaths += 1;
						}
						
						{
							Gameserver.playerRespawn(playerHandle);
						}
						
					}
				}
			}
		}
	},
	
	playerRespawn: function(playerHandle) {
		{
			playerHandle.strItem = '';
		}
		
		{
			playerHandle.intHealth = Constants.intPlayerHealth;
		}
		
		{
			var intSpawn = [];
			
			if (playerHandle.strTeam === 'teamRed') {
				intSpawn = World.intSpawnRed[Math.floor(Math.random() * World.intSpawnRed.length)];
				
			} else if (playerHandle.strTeam === 'teamBlue') {
				intSpawn = World.intSpawnBlue[Math.floor(Math.random() * World.intSpawnBlue.length)];
				
			}
			
			playerHandle.dblPosition[0] = intSpawn[0] + 0.5;
			playerHandle.dblPosition[1] = intSpawn[1] + 2.0;
			playerHandle.dblPosition[2] = intSpawn[2] + 0.5;
			
			playerHandle.dblVerlet[0] = playerHandle.dblPosition[0];
			playerHandle.dblVerlet[1] = playerHandle.dblPosition[1];
			playerHandle.dblVerlet[2] = playerHandle.dblPosition[2];
		}
		
		{
			playerHandle.socketHandle.emit('playerRespawn', {
				'dblPosition': playerHandle.dblPosition,
				'dblVerlet': playerHandle.dblVerlet
			});
		}
		
		{
			if (Item.itemHandle['itemFlag - teamRed'].strPlayer === playerHandle.strIdent) {
				{
					Item.itemHandle['itemFlag - teamRed'].strPlayer = 'playerDropped';
				}
				
			} else if (Item.itemHandle['itemFlag - teamBlue'].strPlayer === playerHandle.strIdent) {
				{
					Item.itemHandle['itemFlag - teamBlue'].strPlayer = 'playerDropped';
				}
				
			}
		}
	},
	
	playerHit: function(playerHandle, itemHandle) {
		{
			if (itemHandle.strIdent.indexOf('itemSword') === 0) {
				playerHandle.intHealth -= Constants.intInteractionSwordDamage;
				
			} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
				playerHandle.intHealth -= Constants.intInteractionBowDamage;
				
			}
		}
		
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
			playerHandle.socketHandle.emit('playerHit', {
				'dblAcceleration': playerHandle.dblAcceleration
			});
		}
		
		{
			if (playerHandle.intHealth < 1) {
				if (Player.playerHandle[itemHandle.strPlayer] !== undefined) {
					Player.playerHandle[itemHandle.strPlayer].intKills += 1;
				}
			}
		}
	},
	
	itemUpdate: function() {
		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					if (itemHandle.strPlayer !== 'playerInitial') {
						if (itemHandle.strPlayer !== 'playerDropped') {
							if (Player.playerHandle[itemHandle.strPlayer] === undefined) {
								itemHandle.strPlayer = 'playerDropped';
							}
						}
					}
				}
				
				{
					if (itemHandle.strIdent.indexOf('itemFlag') === 0) {
						{
							itemHandle.dblSize = Constants.dblFlagSize;
							
							Physics.updateObjectcol(itemHandle, function(functionObjectcol) {
								var playerHandle = null;
								
								{
									if (functionObjectcol.strIdent === undefined) {
										functionObjectcol.strIdent = Object.keys(Player.playerHandle);
									}
								}
								
								{
									do {
										playerHandle = Player.playerHandle[functionObjectcol.strIdent.pop()];
										
										if (playerHandle === undefined) {
											return null;
										}
										
										if (playerHandle.strTeam === '') {
											continue;
										}
										
										break;
									} while (true);
								}
								
								{
									playerHandle.dblSize = Constants.dblPlayerHitbox;
								}
								
								return playerHandle;
							}, function(playerHandle) {
								{
									if (itemHandle.strPlayer === 'playerInitial') {
										if (itemHandle.strIdent.indexOf(playerHandle.strTeam) === -1) {
											{
												itemHandle.strPlayer = playerHandle.strIdent;
											}
											
										} else if (itemHandle.strIdent.indexOf(playerHandle.strTeam) !== -1) {
											{
												if (Item.itemHandle['itemFlag - teamBlue'].strPlayer === playerHandle.strIdent) {
													{
														Item.initFlag(Item.itemHandle['itemFlag - teamBlue']);
													}
													
													{
														Gameserver.intScoreRed += 1;
														
														playerHandle.intScore += 1;
													}
													
												} else if (Item.itemHandle['itemFlag - teamRed'].strPlayer === playerHandle.strIdent) {
													{
														Item.initFlag(Item.itemHandle['itemFlag - teamRed']);
													}
													
													{
														Gameserver.intScoreBlue += 1;
														
														playerHandle.intScore += 1;
													}
													
												}
											}
											
										}
										
									} else if (itemHandle.strPlayer === 'playerDropped') {
										if (itemHandle.strIdent.indexOf(playerHandle.strTeam) === -1) {
											{
												itemHandle.strPlayer = playerHandle.strIdent;
											}
											
										} else if (itemHandle.strIdent.indexOf(playerHandle.strTeam) !== -1) {
											{
												Item.initFlag(itemHandle);
											}
											
										}
										
									}
								}
							});
						}
						
					} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
						{
							itemHandle.dblSize = Constants.dblArrowSize;
							
							Physics.updateObjectcol(itemHandle, function(functionObjectcol) {
								var playerHandle = null;
								
								{
									if (functionObjectcol.strIdent === undefined) {
										functionObjectcol.strIdent = Object.keys(Player.playerHandle);
									}
								}
								
								{
									do {
										playerHandle = Player.playerHandle[functionObjectcol.strIdent.pop()];
										
										if (playerHandle === undefined) {
											return null;
										}
										
										if (playerHandle.strTeam === '') {
											continue;
											
										} else if (playerHandle.strIdent === itemHandle.strPlayer) {
											continue;
											
										}
										
										break;
									} while (true);
								}
								
								{
									playerHandle.dblSize = Constants.dblPlayerHitbox;
								}
								
								return playerHandle;
							}, function(playerHandle) {
								{
									Gameserver.playerHit(playerHandle, itemHandle);
								}
								
								{
									delete Item.itemHandle[itemHandle.strIdent];
								}
							});
						}
						
					}
				}
			}
		}
	}
};

var Physics = require(__dirname + '/assets/libPhysics.js');

Physics.browserify(Constants);

var World = require(__dirname + '/assets/libWorld.js');
var Player = require(__dirname + '/assets/libPlayer.js');
var Item = require(__dirname + '/assets/libItem.js');

World.browserify(Constants, null);
Player.browserify(Constants, null, Physics);
Item.browserify(Constants, null, Physics);

{
	Gameserver.init();
}

{
	Physics.init();
	
	Physics.functionWorldcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
		if (intCoordinateY === 0) {
			return true;
			
		} else if (World.worldHandle[(intCoordinateX << 20) + (intCoordinateY << 10) + (intCoordinateZ << 0)] !== undefined) {
			return true;
			
		}
		
		return false;
	}
}

{
	World.init();
}

{
	Player.init();
}

{
	Item.init();
	
	Item.functionFlagInit = function(itemHandle) {
		{
			var intCoordinate = [ 0, 0, 0 ];
			
			if (itemHandle.strIdent.indexOf('teamRed') !== -1) {
				intCoordinate = World.intFlagRed[Math.floor(Math.random() * World.intFlagRed.length)];
				
			} else if (itemHandle.strIdent.indexOf('teamBlue') !== -1) {
				intCoordinate = World.intFlagBlue[Math.floor(Math.random() * World.intFlagBlue.length)];
				
			}
			
			itemHandle.dblPosition[0] = intCoordinate[0] + 0.5;
			itemHandle.dblPosition[1] = intCoordinate[1] + 0.5;
			itemHandle.dblPosition[2] = intCoordinate[2] + 0.5;
			
			itemHandle.dblVerlet[0] = itemHandle.dblPosition[0];
			itemHandle.dblVerlet[1] = itemHandle.dblPosition[1];
			itemHandle.dblVerlet[2] = itemHandle.dblPosition[2];
		}
	};
	
	Item.functionFlagPlayer = function(itemHandle) {
		{
			if (Player.playerHandle[itemHandle.strPlayer] !== undefined) {
				itemHandle.dblPosition[0] = Player.playerHandle[itemHandle.strPlayer].dblPosition[0];
				itemHandle.dblPosition[1] = Player.playerHandle[itemHandle.strPlayer].dblPosition[1] + 1.0;
				itemHandle.dblPosition[2] = Player.playerHandle[itemHandle.strPlayer].dblPosition[2];
				
				itemHandle.dblVerlet[0] = itemHandle.dblPosition[0];
				itemHandle.dblVerlet[1] = itemHandle.dblPosition[1];
				itemHandle.dblVerlet[2] = itemHandle.dblPosition[2];
			}
		}
	};
}

{
	var Animationframe_intTimestamp = new Date().getTime();
	
	var functionAnimationframe = function() {
		{
			if (Gameserver.intPlayerActive === 0) {
				{
					Gameserver.strPhaseActive = 'Build';
					
					Gameserver.intPhaseRound = VoxConf.intPhaseRound;
					
					Gameserver.intPhaseRemaining = VoxConf.intPhaseRemaining;
				}
				
				{
					Gameserver.strWorldFingerprint = '';
				}
				
				{
					Gameserver.intScoreRed = 0;
					
					Gameserver.intScoreBlue = 0;
				}
				
			} else if (Gameserver.intPlayerActive !== 0) {
				{
					Gameserver.phaseUpdate();
				}
				
				{
					World.update();
					
					Gameserver.worldUpdate();
				}
				
			}
		}
		
		{
			Player.update();
			
			Gameserver.playerUpdate();
		}
		
		{
			Item.update();
			
			Gameserver.itemUpdate();
		}
		
		{
			Socket.serverHandle.emit('playerHandle', {
				'strBuffer': Player.saveBuffer()
			});
			
			Socket.serverHandle.emit('itemHandle', {
				'strBuffer': Item.saveBuffer()
			});
		}
		
		{
			var intWait = Constants.intGameLoop - (new Date().getTime() - Animationframe_intTimestamp);
			
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
	
	setTimeout(functionAnimationframe, Constants.intGameLoop);
}

{
	var functionInterval = function() {
		var functionAdvertise = function() {
			if (VoxConf.boolAdvertise === true) {
				functionRequest();
				
			} else if (VoxConf.boolAdvertise === true) {
				functionSuccess();
				
			}
		};
		
		var functionRequest = function() {
			var requestHttp = Node.httpHandle.request({
				'host': 'www.voxel-warriors.com',
				'port': 80,
				'path': '/host.xml?intPort=' + encodeURIComponent(NodeConf.intExpressPort) + '&strName=' + encodeURIComponent(Gameserver.strName) + '&intLoginPassword=' + encodeURIComponent(Gameserver.intLoginPassword) + '&strWorldActive=' + encodeURIComponent(Gameserver.strWorldActive) + '&intPlayerCapacity=' + encodeURIComponent(Gameserver.intPlayerCapacity) + '&intPlayerActive=' + encodeURIComponent(Gameserver.intPlayerActive),
				'method': 'GET'
			}, function(responseHttp) {
				responseHttp.setEncoding('UTF-8');
				
				responseHttp.on('data', function(strData) {
					
				});
				
				responseHttp.on('end', function() {
					functionSuccess();
				});
			});
			
			requestHttp.on('error', function(errorHandle) {
				functionError();
			});
			
			requestHttp.setTimeout(60 * 1000, function() {
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
		
		functionAdvertise();
	};
	
	setInterval(functionInterval, 5 * 60 * 1000);
	
	functionInterval();
}