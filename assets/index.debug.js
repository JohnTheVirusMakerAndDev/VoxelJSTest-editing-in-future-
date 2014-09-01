'use strict';

var Constants = {
	intGameLoop: 16,
	dblGameScale: 0.04,
	
	dblWorldBlocksize: 1.0,
	
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

var Voxel = require('./libVoxel.js')(Constants);
var Input = require('./libInput.js')(Constants);
var Physics = require('./libPhysics.js')(Constants);
var World = require('./libWorld.js')(Constants, Voxel);
var Player = require('./libPlayer.js')(Constants, Voxel, Physics);
var Item = require('./libItem.js')(Constants, Voxel, Physics);

var Gui = {
	strMode: '',
	
	strChooserCategory: '',
	intChooserType: '',
	
	init: function() {
		{
			Gui.strMode = 'modeLogin';
		}
		
		{
			Gui.strChooserCategory = '';
			
			Gui.intChooserType = 0;
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
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-check'
					}
				})
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
		
		{
			jQuery('#idLogin_Switch')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-triangle-2-e-w'
					}
				})
			;
		}
		
		{
			jQuery('#idLogin_Esc')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-close'
					}
				})
			;
		}
		
		{
			Gui.update();
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
	},
	
	update: function() {
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
				jQuery('#idPhaseBuild_Chooser').find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				jQuery('#idPhaseCombat_Chooser').find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
			}
			
			{
				if (Gui.strChooserCategory === 'categoryCreate') {
					jQuery('#idPhaseBuild_Chooser').find('button').eq(Gui.intChooserType + 0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
				} else if (Gui.strChooserCategory === 'categoryDestroy') {
					jQuery('#idPhaseBuild_Chooser').find('button').eq(Gui.intChooserType + 1)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
				} else if (Gui.strChooserCategory === 'categoryWeapon') {
					jQuery('#idPhaseCombat_Chooser').find('button').eq(Gui.intChooserType + 0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
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
			Gui.update();
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
				Socket.socketHandle = io('/', {
					'reconnection': true,
					'reconnectionDelay': 1000,
					'reconnectionDelayMax': 5000,
					'timeout': 5000,
					'transports': [ 'websocket' ]
				});
				
				{
					Socket.socketHandle.io.engine.on('open', function() {
						{
							Socket.socketHandle.strIdent = Socket.socketHandle.io.engine.id.substr(1, 8);
						}
					});
					
					Socket.socketHandle.on('loginHandle', function(jsonHandle) {
						{
							if (jsonHandle.strType === 'typeReject') {
								{
									Gui.updateMode('modeLogin');
								}
								
								{
									jQuery('#idLogin_Message')
										.text(jsonHandle.strMessage)
									;
								}
								
								{
									if (jsonHandle.strMessage === '') {
										jQuery('#idLogin').find('.ui-dialog-content').children().slice(0, 2)
											.css({
												'display': 'none'
											})
										;
										
									} else if (jsonHandle.strMessage !== '') {
										jQuery('#idLogin').find('.ui-dialog-content').children().slice(0, 2)
											.css({
												'display': 'block'
											})
										;
										
									}
								}
								
							} else if (jsonHandle.strType === 'typeAccept') {
								{
									Gui.updateMode('modeMenu');
								}
								
							}
						}
					});
					
					Socket.socketHandle.on('pingHandle', function(jsonHandle) {
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
								.val(new Date().getTime() - Socket.intPing)
							;
							
							jQuery('#idServer_Phase')
								.html(jsonHandle.strPhaseActive + '<div style="padding:0.8em 0.0em 0.0em 0.0em; font-size:10px;">with ' + Math.floor(jsonHandle.intPhaseRemaining / 1000) + ' seconds remainin and ' + jsonHandle.intPhaseRound + ' rounds left</div>')
							;
							
							jQuery('#idServer_World')
								.val(jsonHandle.strWorldActive)
							;
							
							jQuery('#idServer_Players')
								.val(jsonHandle.intPlayerActive + ' / ' + jsonHandle.intPlayerCapacity)
							;
							
							jQuery('#idTeamRed_Score')
								.val(jsonHandle.intScoreRed)
							;
							
							jQuery('#idTeamBlue_Score')
								.val(jsonHandle.intScoreBlue)
							;
						}
						
						{
							jQuery('#idTeamRed_Table').find('tr').slice(1)
								.remove()
							;
	
							jQuery('#idTeamBlue_Table').find('tr').slice(1)
								.remove()
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
									
									jQuery(strIdent)
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
								.val(jQuery('#idTeamRed_Table').find('tr').size() - 1)
							;
							
							jQuery('#idTeamBlue_Players')
								.val(jQuery('#idTeamBlue_Table').find('tr').size() - 1)
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
								if (jsonHandle.strPhaseActive === 'Build') {
									jQuery('#idPhaseBuild')
										.css({
											'display': 'inline-block'
										})
									;
									
								} else if (jsonHandle.strPhaseActive === 'Combat') {
									jQuery('#idPhaseCombat')
										.css({
											'display': 'inline-block'
										})
									;
									
								}
							}
						}
					});
					
					Socket.socketHandle.on('chatHandle', function(jsonHandle) {
						{
							jQuery('#idMessagebox_Log')
								.append(jQuery('<div></div>')
									.css({
										'margin': '0.8em 1.0em 0.8em 1em'
									})
									.append(jQuery('<a></a>')
										.css({
											'font-weight': 'bold'
										})
										.text(jsonHandle.strName + ':' + ' ')
									)
									.append(jQuery('<a></a>')
										.text(jsonHandle.strMessage)
									)
								)
							;
							
							jQuery('#idMessagebox_Log')
								.scrollTop(jQuery('#idMessagebox_Log').get(0).scrollHeight - jQuery('#idMessagebox_Log').height())
							;
						}
					});
					
					Socket.socketHandle.on('worldHandle', function(jsonHandle) {
						{
						    World.loadBuffer(jsonHandle.strBuffer);
						}
					});
					
					Socket.socketHandle.on('worldCreate', function(jsonHandle) {
						{
							World.updateCreate(jsonHandle.intCoordinate, jsonHandle.strType, jsonHandle.boolBlocked);
						}
					});
					
					Socket.socketHandle.on('worldDestroy', function(jsonHandle) {
						{
							World.updateDestroy(jsonHandle.intCoordinate);
						}
					});
					
					Socket.socketHandle.on('playerHandle', function(jsonHandle) {
						{
							var playerOverwrite = JSON.parse(JSON.stringify(Player.playerHandle));
							
							{
								Player.loadBuffer(jsonHandle.strBuffer);
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
										playerHandle.intInteractionWalk = playerOverwrite[playerHandle.strIdent].intInteractionWalk;
									}
							    }
							}
						}
					});
					
					Socket.socketHandle.on('playerRespawn', function(jsonHandle) {
						{
							Player.playerHandle['1'].dblPosition[0] = jsonHandle.dblPosition[0];
							Player.playerHandle['1'].dblPosition[1] = jsonHandle.dblPosition[1];
							Player.playerHandle['1'].dblPosition[2] = jsonHandle.dblPosition[2];
							
							Player.playerHandle['1'].dblVerlet[0] = jsonHandle.dblVerlet[0];
							Player.playerHandle['1'].dblVerlet[1] = jsonHandle.dblVerlet[1];
							Player.playerHandle['1'].dblVerlet[2] = jsonHandle.dblVerlet[2];
						}
						
						{
							Gui.updateChooser('', 0);
						}
					});
					
					Socket.socketHandle.on('playerHit', function(jsonHandle) {
						{
							Player.playerHandle['1'].dblAcceleration[0] = jsonHandle.dblAcceleration[0];
							Player.playerHandle['1'].dblAcceleration[1] = jsonHandle.dblAcceleration[1];
							Player.playerHandle['1'].dblAcceleration[2] = jsonHandle.dblAcceleration[2];
						}
					});
					
					Socket.socketHandle.on('itemHandle', function(jsonHandle) {
						{
							var itemOverwrite = JSON.parse(JSON.stringify(Item.itemHandle));
							
							{
								Item.loadBuffer(jsonHandle.strBuffer);
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
					
					setInterval(functionInterval, 1000);
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
					if (Player.playerHandle['1'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intInteractionWeapon = Constants.intInteractionPickaxeDuration;
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
					if (Player.playerHandle['1'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intInteractionWeapon = Constants.intInteractionPickaxeDuration;
					}
					
					{
						Socket.socketHandle.emit('worldDestroy', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionDestroy
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['1'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intInteractionWeapon = Constants.intInteractionSwordDuration;
					}
					
					{
						Socket.socketHandle.emit('weaponHandle', {
							'strWeapon': 'weaponSword'
						});
					}
					
				} else if (Gui.intChooserType === 1) {
					if (Player.playerHandle['1'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['1'].intInteractionWeapon = Constants.intInteractionBowDuration;
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
				World.update();
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
				Player.update();
			}
			
			{
				Item.update();
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
		Input.init();
		
		Input.functionException = function() {
			if (jQuery('#idMessagebox_Chat').is(':focus') === true) {
				return true;
				
			} else if (jQuery('#idLogin_Name').is(':focus') === true) {
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
				
				if (jQuery('#idPhaseBuild').css('display') === 'inline-block') {
					if (eventHandle.keyCode === 49) {
						Gui.updateChooser('categoryCreate', 0);
						
					} else if (eventHandle.keyCode === 50) {
						Gui.updateChooser('categoryDestroy', 0);
						
					}
					
				} else if (jQuery('#idPhaseCombat').css('display') === 'inline-block') {
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
		Physics.init();
		
		Physics.functionWorldcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
			if (intCoordinateY === 0) {
				return true;

			} else if (World.worldHandle[[ intCoordinateX, intCoordinateY, intCoordinateZ ]] !== undefined) {
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