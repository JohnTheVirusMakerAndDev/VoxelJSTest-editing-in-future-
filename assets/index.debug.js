'use strict';

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

require('buffer');

var Voxel = require('./libVoxel.js');
var Physics = require('./libPhysics.js');
var Input = require('./libInput.js');

Voxel.browserify(Constants);
Physics.browserify(Constants);
Input.browserify(Constants);

var World = require('./libWorld.js');
var Player = require('./libPlayer.js');
var Item = require('./libItem.js');

World.browserify(Constants, Voxel);
Player.browserify(Constants, Voxel, Physics);
Item.browserify(Constants, Voxel, Physics);

var Gui = {
	strMode: '',
	
	strChooserCategory: '',
	intChooserType: '',
	
	strFingerprint: '',
	
	init: function() {
		{
			Gui.strMode = 'modeLogin';
		}
		
		{
			Gui.strChooserCategory = '';
			
			Gui.intChooserType = 0;
		}
		
		{
			Gui.strFingerprint = '';
		}
		
		{
			jQuery('#idMessagebox_Chat')
				.off('keyup')
				.on('keyup', function(eventHandle) {
					if (eventHandle.keyCode !== 13) {
						return;
					}
					
					{
						Socket.socketHandle.emit('chatHandle', {
							'strMessage': jQuery('#idMessagebox_Chat').val()
						});
					}
					
					{
						jQuery('#idMessagebox_Chat')
							.val('')
						;
					}
				})
			;
		}

		{
			jQuery('#idLogin_Team').find('option').eq(Math.round(Math.random()))
			    .prop({
			        'selected': true
			    })
			;
		}
		
		{
			jQuery('#idLogin_Login')
				.off('click')
				.on('click', function() {
					{
						Gui.updateMode('modeLoading');
					}
					
					{
						Socket.socketHandle.emit('loginHandle', {
							'strName': jQuery('#idLogin_Name').val(),
							'strTeam': jQuery('#idLogin_Team').val()
						});
					}
				});
			;
		}
	},
	
	dispel: function() {
		{
			Gui.strMode = '';
		}
		
		{
			Gui.strChooserCategory = '';
			
			Gui.intChooserType = 0;
		}
		
		{
			Gui.strFingerprint = '';
		}
	},
	
	update: function() {
		{
			var strFingerprint = '';
			
			strFingerprint += Gui.strMode + ';';
			strFingerprint += Gui.strChooserCategory + ';';
			strFingerprint += Gui.intChooserType + ';';
			
			if (strFingerprint === Gui.strFingerprint) {
				return;
			}
			
			Gui.strFingerprint = strFingerprint;
		}
		
		{
			{
				jQuery('#idCrosshair')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idHealth')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idWestside')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idEastside')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idToolbar')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idLoading')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idLogin')
					.css({
						'display': 'none'
					})
				;
			}
			
			{
				if (Gui.strMode === 'modeLogin') {
					jQuery('#idLogin')
						.css({
							'display': 'block'
						})
					;
					
				} else if (Gui.strMode === 'modeLoading') {
					jQuery('#idLoading')
						.css({
							'display': 'block'
						})
					;
					
				} else if (Gui.strMode === 'modeMenu') {
					jQuery('#idWestside')
						.css({
							'display': 'block'
						})
					;
					
					jQuery('#idEastside')
						.css({
							'display': 'block'
						})
					;
					
				} else if (Gui.strMode === 'modeGame') {
					jQuery('#idCrosshair')
						.css({
							'display': 'block'
						})
					;
					
					jQuery('#idHealth')
						.css({
							'display': 'block'
						})
					;
					
					jQuery('#idToolbar')
						.css({
							'display': 'block'
						})
					;
					
				}
			}
		}
		
		{
			{
				jQuery('#idPhaseBuild').find('a')
					.removeClass('btn-primary')
				;
				
				jQuery('#idPhaseCombat').find('a')
					.removeClass('btn-primary')
				;
			}
			
			{
				if (Gui.strChooserCategory === 'categoryCreate') {
					jQuery('#idPhaseBuild').find('a').eq(Gui.intChooserType + 0)
						.addClass('btn-primary')
					;
					
				} else if (Gui.strChooserCategory === 'categoryDestroy') {
					jQuery('#idPhaseBuild').find('a').eq(Gui.intChooserType + 1)
						.addClass('btn-primary')
					;
					
				} else if (Gui.strChooserCategory === 'categoryWeapon') {
					jQuery('#idPhaseCombat').find('a').eq(Gui.intChooserType + 0)
						.addClass('btn-primary')
					;
					
				}
			}
		}
	},
	
	updateMode: function(strMode) {
		{
			Gui.strMode = strMode;
		}
		
		{
			Gui.update();
		}
	},
	
	updateChooser: function(strChooserCategory, intChooserType) {
		{
			Gui.strChooserCategory = strChooserCategory;
			
			Gui.intChooserType = intChooserType;
		}
		
		{
			if (Gui.strChooserCategory === '') {
				Player.playerHandle['1'].strItem = '';
				
			} else if (Gui.strChooserCategory === 'categoryCreate') {
				Player.playerHandle['1'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				Player.playerHandle['1'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					Player.playerHandle['1'].strItem = 'itemSword';
					
				} else if (Gui.intChooserType === 1) {
					Player.playerHandle['1'].strItem = 'itemBow';
					
				}
				
			}
		}
		
		{
			Socket.socketHandle.emit('itemHandle', {
				'strItem': Player.playerHandle['1'].strItem
			});
		}
		
		{
			Gui.update();
		}
	}
};

var Socket = {
	socketHandle: null,
	
	intPing: 0,
	
	init: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.intPing = 0;
		}
		
		{
			jQuery.getScript('/socket.io/socket.io.js', function() {
				Socket.socketHandle = io({
					'reconnection': true,
					'reconnectionDelay': 1000,
					'reconnectionDelayMax': 5000,
					'timeout': 5000,
					'transports': [ 'websocket' ]
				});
				
				{
					Socket.socketHandle.io.engine.on('open', function() {
						{
							Socket.socketHandle.strIdent = Socket.socketHandle.io.engine.id.substr(0, 8);
						}
					});
					
					Socket.socketHandle.on('loginHandle', function(objectData) {
						{
							if (objectData.strType === 'typeReject') {
								{
									Gui.updateMode('modeLogin');
								}
								
								{
									if (objectData.strMessage === '') {
										jQuery('#idLogin_Message')
											.css({
												'display': 'none'
											})
											.text(objectData.strMessage)
										;
										
									} else if (objectData.strMessage !== '') {
										jQuery('#idLogin_Message')
											.css({
												'display': 'block'
											})
											.text(objectData.strMessage)
										;
										
									}
								}
								
							} else if (objectData.strType === 'typeAccept') {
								{
									Gui.updateMode('modeMenu');
								}
								
							}
						}
					});
					
					Socket.socketHandle.on('pingHandle', function(objectData) {
						{
							jQuery('#idHealth').children('div')
								.css({
									'left': (0.5 * (100 - Player.playerHandle['1'].intHealth)) + '%',
									'right': (0.5 * (100 - Player.playerHandle['1'].intHealth)) + '%'
								})
							;
						}
						
						{
							jQuery('#idServer_Ping')
								.text(new Date().getTime() - Socket.intPing)
							;
							
							jQuery('#idServer_Phase')
								.html(objectData.strPhaseActive + '<div style="padding:5px 0px 0px 0px; font-size:10px;">with ' + Math.floor(objectData.intPhaseRemaining / 1000) + ' seconds remainin and ' + objectData.intPhaseRound + ' rounds left</div>')
							;
							
							jQuery('#idServer_World')
								.text(objectData.strWorldActive)
							;
							
							jQuery('#idServer_Players')
								.text(objectData.intPlayerActive + ' / ' + objectData.intPlayerCapacity)
							;
							
							jQuery('#idTeamRed_Score')
								.text(objectData.intScoreRed)
							;
							
							jQuery('#idTeamBlue_Score')
								.text(objectData.intScoreBlue)
							;
						}
						
						{
							jQuery('#idTeamRed_Table').find('tbody')
								.empty()
							;
	
							jQuery('#idTeamBlue_Table').find('tbody')
								.empty()
							;
						}
						
						{
							for (var strIdent in Player.playerHandle) {
								var playerHandle = Player.playerHandle[strIdent];
								
								{
									var strIdent = '';
									
									if (playerHandle.strTeam === 'teamRed') {
										strIdent = '#idTeamRed_Table';
										
									} else if (playerHandle.strTeam === 'teamBlue') {
										strIdent = '#idTeamBlue_Table';
										
									}
									
									jQuery(strIdent).find('tbody')
										.append(jQuery('<tr></tr>')
											.append(jQuery('<td></td>')
												.text(playerHandle.strName)
											)
											.append(jQuery('<td></td>')
												.text(playerHandle.intScore)
											)
											.append(jQuery('<td></td>')
												.text(playerHandle.intKills)
											)
											.append(jQuery('<td></td>')
												.text(playerHandle.intDeaths)
											)
										)
									;
								}
							}
						}
						
						{
							jQuery('#idTeamRed_Players')
								.text(jQuery('#idTeamRed_Table').find('tbody').find('tr').length)
							;
							
							jQuery('#idTeamBlue_Players')
								.text(jQuery('#idTeamBlue_Table').find('tbody').find('tr').length)
							;
						}
						
						{
							{
								jQuery('#idPhaseBuild')
									.css({
										'display': 'none'
									})
								;
								
								jQuery('#idPhaseCombat')
									.css({
										'display': 'none'
									})
								;
							}
							
							{
								if (objectData.strPhaseActive === 'Build') {
									jQuery('#idPhaseBuild')
										.css({
											'display': 'block'
										})
									;
									
								} else if (objectData.strPhaseActive === 'Combat') {
									jQuery('#idPhaseCombat')
										.css({
											'display': 'block'
										})
									;
									
								}
							}
						}
					});
					
					Socket.socketHandle.on('chatHandle', function(objectData) {
						{
							jQuery('#idMessagebox_Log')
								.append(jQuery('<div></div>')
									.append(jQuery('<span></span>')
										.css({
											'font-weight': 'bold'
										})
										.text(objectData.strName + ':' + ' ')
									)
									.append(jQuery('<span></span>')
										.text(objectData.strMessage)
									)
								)
							;
							
							jQuery('#idMessagebox_Log')
								.scrollTop(jQuery('#idMessagebox_Log').get(0).scrollHeight - jQuery('#idMessagebox_Log').height())
							;
						}
					});
					
					Socket.socketHandle.on('worldHandle', function(objectData) {
						{
						    World.loadBuffer(objectData.strBuffer);
						}
					});
					
					Socket.socketHandle.on('worldCreate', function(objectData) {
						{
							World.updateCreate(objectData.intCoordinate, objectData.strType, objectData.boolBlocked);
						}
					});
					
					Socket.socketHandle.on('worldDestroy', function(objectData) {
						{
							World.updateDestroy(objectData.intCoordinate);
						}
					});
					
					Socket.socketHandle.on('playerHandle', function(objectData) {
						{
							var playerOverwrite = JSON.parse(JSON.stringify(Player.playerHandle));
							
							{
								Player.loadBuffer(objectData.strBuffer);
							}
							
							{
								{
									Player.playerHandle['1'] = playerOverwrite['1'];
								}
								
								{
									if (Player.playerHandle[Socket.socketHandle.strIdent] !== undefined) {
										Player.playerHandle['1'].strTeam = Player.playerHandle[Socket.socketHandle.strIdent].strTeam;
										Player.playerHandle['1'].strItem = Player.playerHandle[Socket.socketHandle.strIdent].strItem;
										Player.playerHandle['1'].strName = Player.playerHandle[Socket.socketHandle.strIdent].strName;
										Player.playerHandle['1'].intScore = Player.playerHandle[Socket.socketHandle.strIdent].intScore;
										Player.playerHandle['1'].intKills = Player.playerHandle[Socket.socketHandle.strIdent].intKills;
										Player.playerHandle['1'].intDeaths = Player.playerHandle[Socket.socketHandle.strIdent].intDeaths;
										Player.playerHandle['1'].intHealth = Player.playerHandle[Socket.socketHandle.strIdent].intHealth;
									}
								}
								
								{
									delete Player.playerHandle[Socket.socketHandle.strIdent];
								}
							}
							
							{
								for (var strIdent in Player.playerHandle) {
									var playerHandle = Player.playerHandle[strIdent];
									
									if (playerHandle.strIdent === '1') {
										continue;
										
									} else if (playerOverwrite[playerHandle.strIdent] === undefined) {
										continue;
										
									}
									
									{
										Physics.updateOverwrite(playerHandle, playerOverwrite[playerHandle.strIdent]);
									}
									
									{
										playerHandle.intWalk = playerOverwrite[playerHandle.strIdent].intWalk;
									}
							    }
							}
						}
					});
					
					Socket.socketHandle.on('playerRespawn', function(objectData) {
						{
							Player.playerHandle['1'].dblPosition[0] = objectData.dblPosition[0];
							Player.playerHandle['1'].dblPosition[1] = objectData.dblPosition[1];
							Player.playerHandle['1'].dblPosition[2] = objectData.dblPosition[2];
							
							Player.playerHandle['1'].dblVerlet[0] = objectData.dblVerlet[0];
							Player.playerHandle['1'].dblVerlet[1] = objectData.dblVerlet[1];
							Player.playerHandle['1'].dblVerlet[2] = objectData.dblVerlet[2];
						}
						
						{
							Gui.updateChooser('', 0);
						}
					});
					
					Socket.socketHandle.on('playerHit', function(objectData) {
						{
							Player.playerHandle['1'].dblAcceleration[0] = objectData.dblAcceleration[0];
							Player.playerHandle['1'].dblAcceleration[1] = objectData.dblAcceleration[1];
							Player.playerHandle['1'].dblAcceleration[2] = objectData.dblAcceleration[2];
						}
					});
					
					Socket.socketHandle.on('itemHandle', function(objectData) {
						{
							var itemOverwrite = JSON.parse(JSON.stringify(Item.itemHandle));
							
							{
								Item.loadBuffer(objectData.strBuffer);
							}
							
							{
								for (var strIdent in Item.itemHandle) {
									var itemHandle = Item.itemHandle[strIdent];
									
									if (itemOverwrite[itemHandle.strIdent] === undefined) {
										continue;
									}
									
									{
										Physics.updateOverwrite(itemHandle, itemOverwrite[itemHandle.strIdent]);
									}
							    }
							}
						}
					});
				}
				
				{
					var functionInterval = function() {
						{
							Socket.intPing = new Date().getTime();
						}
						
						{
							Socket.socketHandle.emit('pingHandle', {
								'intTimestamp': new Date().getTime()
							});
						}
					};
					
					window.setInterval(functionInterval, 1000);
				}
			});
		}
	},
	
	dispel: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.intPing = 0;
		}
	}
};

window.addEventListener('load', function () {
	{
		Voxel.init(function(intCoordinateX, intCoordinateY, intCoordinateZ) {
			return 0;
		});
		
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['1'].intWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intWeapon = Constants.intInteractionPickaxeDuration;
					}
					
					{
						Socket.socketHandle.emit('worldCreate', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionCreate,
							'strType': 'voxelDirt',
							'boolBlocked': false
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['1'].intWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intWeapon = Constants.intInteractionPickaxeDuration;
					}
					
					{
						Socket.socketHandle.emit('worldDestroy', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionDestroy
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['1'].intWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intWeapon = Constants.intInteractionSwordDuration;
					}
					
					{
						Socket.socketHandle.emit('weaponHandle', {
							'strWeapon': 'weaponSword'
						});
					}
					
				} else if (Gui.intChooserType === 1) {
					if (Player.playerHandle['1'].intWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intWeapon = Constants.intInteractionBowDuration;
					}
					
					{
						Socket.socketHandle.emit('weaponHandle', {
							'strWeapon': 'weaponBow'
						});
					}
					
				}
				
			}
		});
		
		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			if (Gui.strMode === 'modeLogin') {
				return;
				
			} else if (Socket.socketHandle === null) {
				return
				
			}
			
			{
				Input.update();
			}
			
			{
				if (Input.boolUp === true) {
					Player.playerHandle['1'].dblAcceleration[0] -= Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['1'].dblRotation[1]);
					Player.playerHandle['1'].dblAcceleration[1] -= 0.0;
					Player.playerHandle['1'].dblAcceleration[2] -= Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['1'].dblRotation[1]);
				}
				
				if (Input.boolDown === true) {
					Player.playerHandle['1'].dblAcceleration[0] += Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['1'].dblRotation[1]);
					Player.playerHandle['1'].dblAcceleration[1] += 0.0;
					Player.playerHandle['1'].dblAcceleration[2] += Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['1'].dblRotation[1]);
				}
				
				if (Input.boolLeft === true) {
					Player.playerHandle['1'].dblAcceleration[0] -= Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
					Player.playerHandle['1'].dblAcceleration[1] -= 0.0;
					Player.playerHandle['1'].dblAcceleration[2] -= Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
				}
				
				if (Input.boolRight === true) {
					Player.playerHandle['1'].dblAcceleration[0] += Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
					Player.playerHandle['1'].dblAcceleration[1] += 0.0;
					Player.playerHandle['1'].dblAcceleration[2] += Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
				}
				
				if (Input.boolSpace === true) {
					if (Player.playerHandle['1'].intJumpcount > 0) {
						{
							Player.playerHandle['1'].dblAcceleration[0] += 0.0;
							Player.playerHandle['1'].dblAcceleration[1] += Constants.dblPlayerMovement[1];
							Player.playerHandle['1'].dblAcceleration[2] += 0.0;
						}
						
						{
							Player.playerHandle['1'].intJumpcount -= 1;
						}
					}
				}
			}
			
			{
				World.update();
			}
			
			{
				Player.update();
			}
			
			{
				Item.update();
			}
			
			{
				Gui.update();
			}
			
			{
				var bufferHandle = new Buffer(256);
				var intBuffer = 0;
				
				{
					intBuffer = Player.saveBufferpart(Player.playerHandle['1'], bufferHandle, intBuffer);
				}
				
				var strBuffer = bufferHandle.slice(0, intBuffer).toString('base64');
			    
				{
					Socket.socketHandle.emit('playerHandle', {
						'strBuffer': strBuffer
					});
				}
			}
		});
		
		Voxel.voxelhighlightHandle.enabled = function() {
			if (Gui.strChooserCategory === 'categoryCreate') {
				return true;
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				return true;
				
			}
			
			return false;
		};
		
		Voxel.voxelhighlightHandle.adjacentActive = function() {
			if (Gui.strChooserCategory === 'categoryCreate') {
				return true;
			}
			
			return false;
		};
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
		Input.init();
		
		Input.functionException = function() {
			if (jQuery('#idMessagebox_Chat').get(0) === window.document.activeElement) {
				return true;
				
			} else if (jQuery('#idLogin_Name').get(0) === window.document.activeElement) {
				return true;
				
			}
			
			return false;
		};
		
		Input.functionKeydown = function(eventHandle) {
			if (Gui.strMode === 'modeMenu') {
				if (eventHandle.keyCode === 69) {
					Gui.updateMode('modeGame');
				}
				
			} else if (Gui.strMode === 'modeGame') {
				if (eventHandle.keyCode === 69) {
					Gui.updateMode('modeMenu');
				}
				
				if (jQuery('#idPhaseBuild').css('display') === 'block') {
					if (eventHandle.keyCode === 49) {
						Gui.updateChooser('categoryCreate', 0);
						
					} else if (eventHandle.keyCode === 50) {
						Gui.updateChooser('categoryDestroy', 0);
						
					}
					
				} else if (jQuery('#idPhaseCombat').css('display') === 'block') {
					if (eventHandle.keyCode === 49) {
						Gui.updateChooser('categoryWeapon', 0);
						
					} else if (eventHandle.keyCode === 50) {
						Gui.updateChooser('categoryWeapon', 1);
						
					}
					
				}
				
			}
		};
		
		Input.functionKeyup = function(eventHandle) {
			
		};
	}
	
	{
		World.init();
	}
	
	{
		Player.init();
		
		Player.initController();
	}
	
	{
		Item.init();
		
		Item.functionFlagInit = function(itemHandle) {
			
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
			
			{
				if (itemHandle.strPlayer === Socket.socketHandle.strIdent) {
					itemHandle.dblPosition[0] = Player.playerHandle['1'].dblPosition[0];
					itemHandle.dblPosition[1] = Player.playerHandle['1'].dblPosition[1] + 1.0;
					itemHandle.dblPosition[2] = Player.playerHandle['1'].dblPosition[2];
					
					itemHandle.dblVerlet[0] = itemHandle.dblPosition[0];
					itemHandle.dblVerlet[1] = itemHandle.dblPosition[1];
					itemHandle.dblVerlet[2] = itemHandle.dblPosition[2];
				}
			}
		};
	}
	
	{
		Gui.init();
	}
	
	{
		Socket.init();
	}
}, false);