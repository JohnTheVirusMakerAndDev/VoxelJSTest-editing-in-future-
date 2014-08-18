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
	strMapType: {},
	
	strPhaseActive: '',
	
	init: function() {
		{
			Gameserver.strMapType = {};
		}
		
		{
			Gameserver.strPhaseActive = '';
		}
	},
	
	dispel: function() {
		{
			Gameserver.strMapType = {};
		}
		
		{
			Gameserver.strPhaseActive = '';
		}
	}
};

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
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idMessagebox_Chat')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idServer_Ping')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idServer_Ping')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idServer_Players')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idServer_Players')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idServer_Map')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idServer_Map')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idServer_Phase')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.html('')
					;
				})
			;
			
			jQuery('#idServer_Phase')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idTeamRed_Players')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idTeamRed_Players')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idTeamRed_Score')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idTeamRed_Score')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idTeamBlue_Players')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idTeamBlue_Players')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idTeamBlue_Score')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idTeamBlue_Score')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idLogin_Name')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idLogin_Name')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idLogin_Password')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
						.val('')
					;
				})
			;
			
			jQuery('#idLogin_Password')
				.trigger('update')
			;
		}

		{
			jQuery('#idLogin_Team').find('option').eq(Math.round(Math.random()))
			    .prop({
			        'selected': true
			    })
			;
			
			jQuery('#idLogin_Team')
				.off('update')
				.on('update', function() {
					jQuery(this)
						.css({
							'padding-left': (jQuery(this).prev().width() + 15) + 'px'
						})
					;
				})
			;
			
			jQuery('#idLogin_Team')
				.trigger('update')
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
							'strPassword': jQuery('#idLogin_Password').val(),
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
						'visibility': 'hidden'
					})
				;
				
				jQuery('#idLogin')
					.css({
						'visibility': 'hidden'
					})
				;
			}
			
			{
				if (Gui.strMode === 'modeLogin') {
					jQuery('#idLogin')
						.css({
							'visibility': 'visible'
						})
					;
					
				} else if (Gui.strMode === 'modeLoading') {
					jQuery('#idLoading')
						.css({
							'visibility': 'visible'
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
				if (Gameserver.strPhaseActive === 'Build') {
					{
						jQuery('#idPhaseBuild')
							.css({
								'display': 'inline-block'
							})
						;
					}
					
				} else if (Gameserver.strPhaseActive === 'Combat') {
					{
						jQuery('#idPhaseCombat')
							.css({
								'display': 'inline-block'
							})
						;
					}
					
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
				Player.playerHandle['playerCtrl'].strItem = '';
				
			} else if (Gui.strChooserCategory === 'categoryCreate') {
				Player.playerHandle['playerCtrl'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				Player.playerHandle['playerCtrl'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					Player.playerHandle['playerCtrl'].strItem = 'itemSword';
					
				} else if (Gui.intChooserType === 1) {
					Player.playerHandle['playerCtrl'].strItem = 'itemBow';
					
				}
				
			}
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
					Socket.socketHandle.on('loginHandle', function(jsonHandle) {
						{
							Socket.socketHandle.strIdent = jsonHandle.strIdent;
						}
						
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
					
					Socket.socketHandle.on('pingHandle', function(jsonHandle) {
						{
							jQuery('#idServer_Ping')
								.val(new Date().getTime() - Socket.intPing)
							;
							
							jQuery('#idServer_Map')
								.val(jsonHandle.strMapActive)
							;
							
							jQuery('#idServer_Phase')
								.html(jsonHandle.strPhaseActive + '<div style="padding:0.8em 0.0em 0.0em 0.0em; font-size:10px;">with ' + jsonHandle.intPhaseRemaining + ' seconds remainin and ' + jsonHandle.intPhaseRound + ' rounds left</div>')
							;
							
							jQuery('#idTeamRed_Score')
								.val(jsonHandle.intScoreRed)
							;
							
							jQuery('#idTeamBlue_Score')
								.val(jsonHandle.intScoreBlue)
							;
							
							jQuery('#idServer_Players')
								.val(jsonHandle.intPlayerActive + ' / ' + jsonHandle.intPlayerCapacity)
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
					});
					
					Socket.socketHandle.on('gameserverHandle', function(jsonHandle) {
						{
						    for (var intCoordinate in Gameserver.strMapType) {
								var strType = Gameserver.strMapType[intCoordinate];
								
								{
									Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), 0);
								}
						    }
						}
						
						{
							Gameserver.strMapType = jsonHandle.strMapType;
						}
						
						{
						    for (var intCoordinate in Gameserver.strMapType) {
								var strType = Gameserver.strMapType[intCoordinate];
								
								{
									Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), Voxel.voxelengineHandle.materials.find(strType));
								}
						    }
						}
						
						{
							Gameserver.strPhaseActive = jsonHandle.strPhaseActive;
						}
						
						{
							Gui.updateChooser('', 0);
						}
					});
					
					Socket.socketHandle.on('playerHandle', function(jsonHandle) {
						{
							Player.playerHandle['playerCtrl'].strTeam = jsonHandle.strTeam;
						}
						
						{
							Player.playerHandle['playerCtrl'].intHealth = jsonHandle.intHealth;
						}
						
						{
							Player.playerHandle['playerCtrl'].dblPosition[0] = jsonHandle.dblPosition[0];
							Player.playerHandle['playerCtrl'].dblPosition[1] = jsonHandle.dblPosition[1];
							Player.playerHandle['playerCtrl'].dblPosition[2] = jsonHandle.dblPosition[2];
							
							Player.playerHandle['playerCtrl'].dblVerlet[0] = jsonHandle.dblVerlet[0];
							Player.playerHandle['playerCtrl'].dblVerlet[1] = jsonHandle.dblVerlet[1];
							Player.playerHandle['playerCtrl'].dblVerlet[2] = jsonHandle.dblVerlet[2];
							
							Player.playerHandle['playerCtrl'].dblAcceleration[0] = jsonHandle.dblAcceleration[0];
							Player.playerHandle['playerCtrl'].dblAcceleration[1] = jsonHandle.dblAcceleration[1];
							Player.playerHandle['playerCtrl'].dblAcceleration[2] = jsonHandle.dblAcceleration[2];
						}
						
						{
							// TODO: shoudln't be done here
							
							jQuery('#idHealth').children('div')
								.css({
									'left': (0.5 * (100 - Player.playerHandle['playerCtrl'].intHealth)) + '%',
									'right': (0.5 * (100 - Player.playerHandle['playerCtrl'].intHealth)) + '%'
								})
							;
						}
					});
					
					Socket.socketHandle.on('enemyHandle', function(jsonHandle) {
						{
							var playerOverwrite = {};
							
							// TODO: doesn't look really nice
							playerOverwrite['playerCtrl'] = Player.playerHandle['playerCtrl'];
							
							for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
								var playerHandle = jsonHandle[intFor1];
								
								{
									playerHandle.strIdent = playerHandle.a;
									playerHandle.strTeam = playerHandle.b;
									playerHandle.strItem = playerHandle.c;
									playerHandle.strName = playerHandle.d;
									playerHandle.intScore = playerHandle.e;
									playerHandle.intKills = playerHandle.f;
									playerHandle.intDeaths = playerHandle.g;
									playerHandle.dblPosition = playerHandle.h;
									playerHandle.dblVerlet = playerHandle.i;
									playerHandle.dblRotation = playerHandle.j;
								}
								
								if (playerHandle.strIdent === Socket.socketHandle.strIdent) {
									// TODO: dont throw the information completely away
									
									continue;
								}
								
								{
									if (Player.playerHandle.hasOwnProperty(playerHandle.strIdent) === true) {
										Physics.updateOverwrite(playerHandle, Player.playerHandle[playerHandle.strIdent]);
									}
								}
								
								{
									playerOverwrite[playerHandle.strIdent] = {
										'strIdent': playerHandle.strIdent,
										'strTeam': playerHandle.strTeam,
										'strItem': playerHandle.strItem,
										'strName': playerHandle.strName,
										'intScore': playerHandle.intScore,
										'intKills': playerHandle.intKills,
										'intDeaths': playerHandle.intDeaths,
										'intHealth': 0,
										'dblPosition': playerHandle.dblPosition,
										'dblVerlet': playerHandle.dblVerlet,
										'dblAcceleration': [ 0.0, 0.0, 0.0 ],
										'dblRotation': playerHandle.dblRotation,
										'intJumpcount': 0,
										'intInteractionWalk': 0,
										'intInteractionWeapon': 0
									};
								}
								
								{
									if (Player.playerHandle.hasOwnProperty(playerHandle.strIdent) === true) {
										playerOverwrite[playerHandle.strIdent].intInteractionWalk = Player.playerHandle[playerHandle.strIdent].intInteractionWalk;
										playerOverwrite[playerHandle.strIdent].intInteractionWeapon = Player.playerHandle[playerHandle.strIdent].intInteractionWeapon;
									}
								}
							}
							
							Player.playerHandle = playerOverwrite;
						}
					});
					
					Socket.socketHandle.on('itemHandle', function(jsonHandle) {
						{
							var itemOverwrite = {};
							
							for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
								var itemHandle = jsonHandle[intFor1];
	
								{
									itemHandle.strIdent = itemHandle.a;
									itemHandle.dblPosition = itemHandle.b;
									itemHandle.dblVerlet = itemHandle.c;
									itemHandle.dblRotation = itemHandle.d;
								}
								
								{
									if (Item.itemHandle.hasOwnProperty(itemHandle.strIdent) === true) {
										Physics.updateOverwrite(itemHandle, Item.itemHandle[itemHandle.strIdent]);
									}
								}
								
								{
									itemOverwrite[itemHandle.strIdent] = {
										'strIdent': itemHandle.strIdent,
										'strPlayer': '',
										'dblPosition': itemHandle.dblPosition,
										'dblVerlet': itemHandle.dblVerlet,
										'dblAcceleration': [ 0.0, 0.0, 0.0 ],
										'dblRotation': itemHandle.dblRotation
									};
								}
							}
							
							Item.itemHandle = itemOverwrite;
						}
					});
					
					Socket.socketHandle.on('voxelHandle', function(jsonHandle) {
						{
							if (jsonHandle.strType === '') {
								delete Gameserver.strMapType[jsonHandle.intCoordinate];
								
							} else if (jsonHandle.strType !== '') {
								Gameserver.strMapType[jsonHandle.intCoordinate] = jsonHandle.strType;
								
							}
						}
						
						{
							Voxel.voxelengineHandle.setBlock(jsonHandle.intCoordinate, Voxel.voxelengineHandle.materials.find(jsonHandle.strType));
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

{
	with (global) {
		require('minecraft-skin');
		require('voxel-engine');
		require('voxel-highlight');
		
		var fsHandle = require('fs');

		eval(fsHandle.readFileSync(__dirname + '/../libs/Voxel.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Input.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Player.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Item.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Physics.js').toString());
	}
}

jQuery(document).ready(function() {
	{
		Gameserver.init();
	}
	
	{
		Gui.init();
	}
	
	{
		Socket.init();
	}
	
	{
		Voxel.init();
		
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['playerCtrl'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['playerCtrl'].intInteractionWeapon = Constants.intInteractionPickaxeDuration;
					}
					
					{
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionCreate,
							'strType': 'voxelDirt'
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['playerCtrl'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['playerCtrl'].intInteractionWeapon = Constants.intInteractionPickaxeDuration;
					}
					
					{
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionDestroy,
							'strType': ''
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					if (Player.playerHandle['playerCtrl'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['playerCtrl'].intInteractionWeapon = Constants.intInteractionSwordDuration;
					}
					
					{
						Socket.socketHandle.emit('weaponHandle', {
							'strWeapon': 'weaponSword'
						});
					}
					
				} else if (Gui.intChooserType === 1) {
					if (Player.playerHandle['playerCtrl'].intInteractionWeapon > 0) {
						return;
					}
					
					{
						Player.playerHandle['playerCtrl'].intInteractionWeapon = Constants.intInteractionBowDuration;
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
			{
				Input.update();
			}
				
			{
				{
					if (Input.boolUp === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] -= Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1]);
						Player.playerHandle['playerCtrl'].dblAcceleration[1] -= 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] -= Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1]);
					}
					
					if (Input.boolDown === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] += Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1]);
						Player.playerHandle['playerCtrl'].dblAcceleration[1] += 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1]);
					}
					
					if (Input.boolLeft === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] -= Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
						Player.playerHandle['playerCtrl'].dblAcceleration[1] -= 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] -= Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
					}
					
					if (Input.boolRight === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] += Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
						Player.playerHandle['playerCtrl'].dblAcceleration[1] += 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
					}
					
					if (Input.boolSpace === true) {
						if (Player.playerHandle['playerCtrl'].intJumpcount > 0) {
							{
								Player.playerHandle['playerCtrl'].dblAcceleration[0] += 0.0;
								Player.playerHandle['playerCtrl'].dblAcceleration[1] += Constants.dblPlayerMovement[1];
								Player.playerHandle['playerCtrl'].dblAcceleration[2] += 0.0;
							}
							
							{
								Player.playerHandle['playerCtrl'].intJumpcount -= 1;
							}
						}
					}
				}
				
				{
					Player.update();
				}
			}
			
			{
				Item.update();
			}
			
			{
				if (Gui.strMode !== 'modeLogin') {
					if (Socket.socketHandle !== null) {
						Socket.socketHandle.emit('playerHandle', {
							'a': Player.playerHandle['playerCtrl'].strItem,
							'b': Player.playerHandle['playerCtrl'].dblPosition,
							'c': Player.playerHandle['playerCtrl'].dblVerlet,
							'd': Player.playerHandle['playerCtrl'].dblRotation
						});
					}
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
				
			} else if (jQuery('#idLogin_Password').is(':focus') === true) {
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
				
				if (Gameserver.strPhaseActive === 'Build') {
					if (eventHandle.keyCode === 49) {
						Gui.updateChooser('categoryCreate', 0);
						
					} else if (eventHandle.keyCode === 50) {
						Gui.updateChooser('categoryDestroy', 0);
						
					}
					
				} else if (Gameserver.strPhaseActive === 'Combat') {
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
		Player.init();
		
		Player.initCtrl();
	}
	
	{
		Item.init();
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
});