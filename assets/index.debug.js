jQuery(document).ready(function() {
	{
		jQuery('#idWestside')
			.css({
				'display': 'block'
			})
		;
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
		jQuery('#idEastside')
			.css({
				'display': 'block'
			})
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
		jQuery('#idToolbar')
			.css({
				'display': 'none'
			})
		;
	}
	
	{
		jQuery('#idPhaseBuild')
			.css({
				'display': 'none'
			})
		;
	}
	
	{
		jQuery('#idPhaseBuild_Chooser')
			.off('update')
			.on('update', function() {
				jQuery(this).find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;

				if (Settings.strChooserCategory === 'categoryCreate') {
					jQuery(this).find('button').eq(Settings.intChooserType + 0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
				} else if (Settings.strChooserCategory === 'categoryDestroy') {
					jQuery(this).find('button').eq(Settings.intChooserType + 1)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
				}
			})
		;
	
		jQuery('#idPhaseBuild_Chooser')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idPhaseCombat')
			.css({
				'display': 'none'
			})
		;
	}
	
	{
		jQuery('#idPhaseCombat_Chooser')
			.off('update')
			.on('update', function() {
				jQuery(this).find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				if (Settings.strChooserCategory === 'categoryWeapon') {
					jQuery(this).find('button').eq(Settings.intChooserType + 0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
				}
			})
		;
		
		jQuery('#idPhaseCombat_Chooser')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idModal')
			.css({
				'visibility': 'visible'
			})
		;
	}
	
	{
		jQuery('#idLoading')
			.css({
				'visibility': 'visible'
			})
		;
	}
	
	{
		jQuery('#idLogin')
			.css({
				'visibility': 'hidden'
			})
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
			.selectmenu({
				'disabled': false
			})
			.off('update')
			.on('update', function() {
				jQuery(this).next()
					.css({
						'width': '100%',
						'box-sizing': 'border-box',
						'background': 'none'
					})
				;
				
				jQuery(this).next().find('.ui-selectmenu-text')
					.css({
						'padding': '0.4em 1em 0.4em 62px',
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
					jQuery('#idLoading')
						.css({
							'visibility': 'visible'
						})
					;
				}
				
				{
					jQuery('#idLogin')
						.css({
							'visibility': 'hidden'
						})
					;
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
		jQuery('#idInformation')
			.css({
				'visibility': 'hidden'
			})
		;
	}
	
	{
		jQuery('#idInformation_Tab')
			.button({
				'disabled': false,
				'icons': {
					'primary': 'ui-icon-triangle-2-e-w'
				}
			})
			.off('click')
			.on('click', function() {
				{
					jQuery(document.body)
						.trigger(jQuery.Event('keydown', {
							'keyCode': 9
						}))
					;
					
					jQuery(document.body)
						.trigger(jQuery.Event('keyup', {
							'keyCode': 9
						}))
					;
				}
			})
		;
	}
	
	{
		jQuery('#idInformation_Esc')
			.button({
				'disabled': false,
				'icons': {
					'primary': 'ui-icon-close'
				}
			})
		;
	}
});

var Settings = {
	strMode: '',

	strChooserCategory: '',
	intChooserType: '',

	strPhaseActive: '',
	
	init: function() {
		{
			Settings.strMode = 'modeMenu';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.intChooserType = 0;
		}
		
		{
			Settings.strPhaseActive = '';
		}
	},
	
	dispel: function() {
		{
			Settings.strMode = '';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.intChooserType = 0;
		}
		
		{
			Settings.strPhaseActive = '';
		}
	}
};

var Voxel = {
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	minecraftskinFunction: null,
	minecraftskinRed: null,
	minecraftskinBlue: null,
	
	aabbHandle: null,
	
	init: function() {
		{
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './images/',
				'generate': function(intX, intY, intZ) {
					return 0;
				},
				'materials': [ 'voxelVoid', 'voxelBrick', 'voxelDirt', 'voxelGrass', 'voxelPlank', 'voxelStone', 'voxelRedSpawn', 'voxelRedFlag', 'voxelBlueSpawn', 'voxelBlueFlag', 'voxelSeparator' ],
				'controls': {
					'discreteFire': true
				},
				'statsDisabled': true
			});
			
			Voxel.voxelengineHandle.appendTo(document.body);
		}
		
		{
			// TODO: commit changes to voxel-highlight
			Voxel.voxelhighlightHandle = require('voxel-highlight')(Voxel.voxelengineHandle, {
				'enabled': function() {
					if (Settings.strChooserCategory === 'categoryCreate') {
						return true;
						
					} else if (Settings.strChooserCategory === 'categoryDestroy') {
						return true;
						
					}
					
					return false;
				},
				'distance': 8,
				'wireframeLinewidth': 16,
				'wireframeOpacity': 1.0,
				'color': 0xFFFFFF,
				'adjacentActive': function() {
					if (Settings.strChooserCategory === 'categoryCreate') {
						return true;
					}
					
					return false;
				},
				'selectActive': function() {
					return false;
				}
			});
			
			Voxel.voxelhighlightHandle.positionCreate = null;
			Voxel.voxelhighlightHandle.positionDestroy = null;
			
			Voxel.voxelhighlightHandle.on('highlight-adjacent', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionCreate = positionHandle;
			});
			
			Voxel.voxelhighlightHandle.on('remove-adjacent', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionCreate = null;
			});
			
			Voxel.voxelhighlightHandle.on('highlight', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionDestroy = positionHandle;
			});
			
			Voxel.voxelhighlightHandle.on('remove', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionDestroy = null;
			});
		}
		
		{
			Voxel.minecraftskinHandle = require('minecraft-skin');
			
			Voxel.minecraftskinFunction = function(strSkin) {
				return Voxel.minecraftskinHandle(Voxel.voxelengineHandle.THREE, strSkin, {
					'scale': new Voxel.voxelengineHandle.THREE.Vector3(0.04, 0.04, 0.04)
				});
			};
			
			Voxel.minecraftskinRed = new Image();
			Voxel.minecraftskinRed.src = './images/skinRed.png';
			
			Voxel.minecraftskinBlue = new Image();
			Voxel.minecraftskinBlue.src = './images/skinBlue.png';
		}
		
		{
			Voxel.aabbHandle = require('aabb-3d');
		}
	},
	
	dispel: function() {
		{
			Voxel.voxelengineHandle = null;
		}
		
		{
			Voxel.voxelhighlightHandle = null;
		}
		
		{
			Voxel.minecraftskinHandle = null;
			
			Voxel.minecraftskinFunction = null;
		}
		
		{
			Voxel.aabbHandle = null;
		}
	}
};

var Socket = {
	socketHandle: null,

	playerHandle: {},
	
	intPing: 0,
	
	init: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.playerHandle = {};
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
				
				Socket.socketHandle.on('pingHandle', function(jsonHandle) {
					{
						jQuery('#idServer_Ping')
							.val(new Date().getTime() - Socket.intPing)
						;
						
						jQuery('#idServer_Players')
							.val(jsonHandle.serverHandle.intPlayerActive + ' / ' + jsonHandle.serverHandle.intPlayerCapacity)
						;
						
						jQuery('#idServer_Map')
							.val(jsonHandle.serverHandle.strMapActive)
						;
						
						jQuery('#idServer_Phase')
							.html(jsonHandle.serverHandle.strPhaseActive + '<div style="padding:0.8em 0.0em 0.0em 0.0em; font-size:10px;">with ' + jsonHandle.serverHandle.intPhaseRemaining + ' seconds remainin and ' + jsonHandle.serverHandle.intPhaseRound + ' rounds left</div>')
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
						for (var intFor1 = 0; intFor1 < jsonHandle.playerHandle.length; intFor1 += 1) {
							var playerHandle = jsonHandle.playerHandle[intFor1];
							
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
						
						jQuery('#idTeamRed_Score')
							.val(jsonHandle.serverHandle.intScoreRed)
						;
						
						jQuery('#idTeamBlue_Score')
							.val(jsonHandle.serverHandle.intScoreBlue)
						;
					}
				});

				Socket.socketHandle.on('loginHandle', function(jsonHandle) {
					{
						if (jsonHandle.strType === 'typeReject') {
							{
								jQuery('#idLoading')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
								jQuery('#idLogin')
									.css({
										'visibility': 'visible'
									})
								;
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
								jQuery('#idModal')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
								jQuery('#idLoading')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
								jQuery('#idLogin')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
								jQuery('#idInformation')
									.css({
										'visibility': 'visible'
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
				
				Socket.socketHandle.on('playerHandle', function(jsonHandle) {
					{
						var playerOverwrite = {};
						
						for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
							var playerHandle = jsonHandle[intFor1];

							{
								playerHandle.strSocket = playerHandle.a;
								playerHandle.strTeam = playerHandle.b;
								playerHandle.dblPosition = playerHandle.c;
								playerHandle.dblVerlet = playerHandle.d;
								playerHandle.dblBodyyaw = playerHandle.e;
								playerHandle.dblHeadpitch = playerHandle.f;
							}
							
							{
								var dblPositionX = playerHandle.dblPosition[0];
								var dblPositionY = playerHandle.dblPosition[1];
								var dblPositionZ = playerHandle.dblPosition[2];
								
								var dblVerletX = playerHandle.dblVerlet[0];
								var dblVerletY = playerHandle.dblVerlet[1];
								var dblVerletZ = playerHandle.dblVerlet[2];
								
								if (Socket.playerHandle.hasOwnProperty(playerHandle.strSocket) === true) {
									dblPositionX = 0.5 * (playerHandle.dblPosition[0] + Socket.playerHandle[playerHandle.strSocket].dblPosition[0]);
									dblPositionY = 0.5 * (playerHandle.dblPosition[1] + Socket.playerHandle[playerHandle.strSocket].dblPosition[1]);
									dblPositionZ = 0.5 * (playerHandle.dblPosition[2] + Socket.playerHandle[playerHandle.strSocket].dblPosition[2]);
									
									dblVerletX = dblPositionX - (playerHandle.dblPosition[0] - playerHandle.dblVerlet[0]);
									dblVerletY = dblPositionY - (playerHandle.dblPosition[1] - playerHandle.dblVerlet[1]);
									dblVerletZ = dblPositionZ - (playerHandle.dblPosition[2] - playerHandle.dblVerlet[2]);
								}
								
								playerOverwrite[playerHandle.strSocket] = {
									'strSocket': playerHandle.strSocket,
									'strTeam': playerHandle.strTeam,
									'dblPosition': [ dblPositionX, dblPositionY, dblPositionZ ],
									'dblVerlet': [ dblVerletX, dblVerletY, dblVerletZ ],
									'dblBodyyaw': playerHandle.dblBodyyaw,
									'dblHeadpitch': playerHandle.dblHeadpitch,
									'intWalktime': 0
								};
							}
						}
						
						Socket.playerHandle = playerOverwrite;
					}
				});
				
				Socket.socketHandle.on('voxelHandle', function(jsonHandle) {
					{
						Voxel.voxelengineHandle.setBlock(jsonHandle.intCoordinate, Voxel.voxelengineHandle.materials.find(jsonHandle.strType));
					}
				});
				
				Socket.socketHandle.on('resetHandle', function(jsonHandle) {
					{
						Player.strTeam = jsonHandle.strPlayerTeam;
					}
					
					{
						Player.minecraftskinHandle.mesh.position.set(jsonHandle.dblPlayerPosition[0], jsonHandle.dblPlayerPosition[1], jsonHandle.dblPlayerPosition[2]);
					}
					
					{
					    for (var intCoordinate in jsonHandle.strMapType) {
							var strType = jsonHandle.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), Voxel.voxelengineHandle.materials.find(strType));
							}
					    }
					}
					
					{
						Settings.strPhaseActive = jsonHandle.strPhaseActive;
					}
					
					{
						if (jsonHandle.strPhaseActive === 'Build') {
							{
								jQuery('#idPhaseBuild')
									.css({
										'display': 'inline-block'
									})
								;
								
								jQuery('#idPhaseCombat')
									.css({
										'display': 'none'
									})
								;
							}
							
						} else if (jsonHandle.strPhaseActive === 'Combat') {
							{
								jQuery('#idPhaseBuild')
									.css({
										'display': 'none'
									})
								;
								
								jQuery('#idPhaseCombat')
									.css({
										'display': 'inline-block'
									})
								;
							}
							
						}
					}
				});
				
				setInterval(function() {
					{
						Socket.intPing = new Date().getTime();
					}
					
					{
						Socket.socketHandle.emit('pingHandle', {});
					}
				}, 1000);
			});
		}
	},
	
	dispel: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.playerHandle = {};
		}
		
		{
			Socket.intPing = 0;
		}
	}
};

var Input = {
	init: function() {
		{
			jQuery(document.body)
				.off('keydown')
				.on('keydown', function(eventHandle) {
					if (Settings.strMode === 'modeMenu') {
						if (eventHandle.keyCode === 9) {
							{
								Settings.strMode = 'modeGame';
							}
							
							{
								jQuery('#idInformation')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
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
										'display': 'block'
									})
								;
							}
						}
						
					} else if (Settings.strMode === 'modeGame') {
						if (eventHandle.keyCode === 9) {
							{
								Settings.strMode = 'modeMenu';
							}
							
							{
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
								
								jQuery('#idToolbar')
									.css({
										'display': 'none'
									})
								;
							}
						}
						
						if (Settings.strPhaseActive === 'Build') {
							if (eventHandle.keyCode === 49) {
								{
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.intChooserType = 0;
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 50) {
								{
									Settings.strChooserCategory = 'categoryDestroy';
									
									Settings.intChooserType = 0;
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							}
							
						} else if (Settings.strPhaseActive === 'Combat') {
							if (eventHandle.keyCode === 49) {
								{
									Settings.strChooserCategory = 'categoryWeapon';
									
									Settings.intChooserType = 0;
								}
								
								{
									jQuery('#idPhaseCombat_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 50) {
								{
									Settings.strChooserCategory = 'categoryWeapon';
									
									Settings.intChooserType = 1;
								}
								
								{
									jQuery('#idPhaseCombat_Chooser')
										.trigger('update')
									;
								}
								
							}
							
						}
						
					}
				})
				.off('keyup')
				.on('keyup', function(eventHandle) {

				})
			;
		}
	},
	
	dispel: function() {
		
	}
};

var Player = {
	minecraftskinHandle: null,
	physicsHandle: null,
	
	strTeam: '',
	
	dblPosition: [ 0.0, 0.0, 0.0 ],
	dblVerlet: [ 0.0, 0.0, 0.0 ],
	
	intWalktime: 0,
	
	init: function() {
		{
			Player.minecraftskinHandle = Voxel.minecraftskinFunction();
			
			Player.physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinHandle.mesh);

			{
				Player.minecraftskinHandle.strTeam = '';
				
				Player.minecraftskinHandle.mesh.position.set(0, 1, 0);
				
				Player.minecraftskinHandle.mesh.cameraInside.add(Voxel.voxelengineHandle.camera);
			}
			
			{
				Player.physicsHandle.blocksCreation = true;

				Player.physicsHandle.position = Player.minecraftskinHandle.mesh.position;
				Player.physicsHandle.yaw = Player.minecraftskinHandle.mesh;
				Player.physicsHandle.pitch = Player.minecraftskinHandle.mesh.head;
				
				Player.physicsHandle.subjectTo(Voxel.voxelengineHandle.gravity);
			}
			
			Voxel.voxelengineHandle.scene.add(Player.minecraftskinHandle.mesh);
			
			Voxel.voxelengineHandle.addItem(Player.physicsHandle);
		}
		
		{
			Player.strTeam = '';
		}
		
		{
			Player.dblPosition[0] = 0.0;
			Player.dblPosition[1] = 0.0;
			Player.dblPosition[2] = 0.0;

			Player.dblVerlet[0] = 0.0;
			Player.dblVerlet[1] = 0.0;
			Player.dblVerlet[2] = 0.0;
		}
		
		{
			Player.intWalktime = 0; 
		}
		
		{
			Voxel.voxelengineHandle.control(Player.physicsHandle);
		}
	},
	
	dispel: function() {
		{
			Player.minecraftskinHandle = null;
			
			Player.physicsHandle = null;
		}
		
		{
			Player.strTeam = '';
		}
		
		{
			Player.dblPosition[0] = 0.0;
			Player.dblPosition[1] = 0.0;
			Player.dblPosition[2] = 0.0;

			Player.dblVerlet[0] = 0.0;
			Player.dblVerlet[1] = 0.0;
			Player.dblVerlet[2] = 0.0;
		}
		
		{
			Player.intWalktime = 0; 
		}
	},
	
	update: function() {
		{
			if (Player.minecraftskinHandle.strTeam !== Player.strTeam) {
				if (Player.strTeam === 'teamRed') {
					Player.minecraftskinHandle.setImage(Voxel.minecraftskinRed);
					
				} else if (Player.strTeam === 'teamBlue') {
					Player.minecraftskinHandle.setImage(Voxel.minecraftskinBlue);
					
				}
				
				Player.minecraftskinHandle.strTeam = Player.strTeam;
			}
		}
		
		{
			Player.dblVerlet[0] = Player.dblPosition[0];
			Player.dblVerlet[1] = Player.dblPosition[1];
			Player.dblVerlet[2] = Player.dblPosition[2];

			Player.dblPosition[0] = Player.minecraftskinHandle.mesh.position.x;
			Player.dblPosition[1] = Player.minecraftskinHandle.mesh.position.y;
			Player.dblPosition[2] = Player.minecraftskinHandle.mesh.position.z;
		}
		
		{
			var intWalktime = new Date().getTime() / 1000;
			
			{
				var dblVelocityX = Player.dblPosition[0] - Player.dblVerlet[0];
				var dblVelocityY = Player.dblPosition[1] - Player.dblVerlet[1];
				var dblVelocityZ = Player.dblPosition[2] - Player.dblVerlet[2];
				
				if (Math.abs(dblVelocityX) < 0.0001) {
					if (Math.abs(dblVelocityZ) < 0.0001) {
						Player.intWalktime = intWalktime;
					}
				}
			}
			
			var intTimediff = Player.intWalktime - intWalktime;
			
			{
				// http://djazz.mine.nu/lab/minecraft_items/
	
				Player.minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI) + (Math.PI));
				Player.minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI));
				
				Player.minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI));
				Player.minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI) + (Math.PI));
			}
		}
	}
};

var Enemy = {
	minecraftskinHandle: [],
	
	init: function() {
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var minecraftskinHandle = Voxel.minecraftskinFunction();
					
					{
						minecraftskinHandle.strTeam = '';
					}
					
					Enemy.minecraftskinHandle.push(minecraftskinHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Enemy.minecraftskinHandle = [];
		}
	},
	
	update: function() {
		var intActive = 0;
		
		{
			for (var strSocket in Socket.playerHandle) {
				var playerHandle = Socket.playerHandle[strSocket];
				
				{
					var dblVerletX = playerHandle.dblPosition[0];
					var dblVerletY = playerHandle.dblPosition[1];
					var dblVerletZ = playerHandle.dblPosition[2];
					
					playerHandle.dblPosition[0] = playerHandle.dblPosition[0] + (playerHandle.dblPosition[0] - playerHandle.dblVerlet[0]) + Voxel.voxelengineHandle.gravity[0];
					playerHandle.dblPosition[1] = playerHandle.dblPosition[1] + (playerHandle.dblPosition[1] - playerHandle.dblVerlet[1]) + Voxel.voxelengineHandle.gravity[1];
					playerHandle.dblPosition[2] = playerHandle.dblPosition[2] + (playerHandle.dblPosition[2] - playerHandle.dblVerlet[2]) + Voxel.voxelengineHandle.gravity[2];
					
					playerHandle.dblVerlet[0] = dblVerletX;
					playerHandle.dblVerlet[1] = dblVerletY;
					playerHandle.dblVerlet[2] = dblVerletZ;
				}
				
				{
					var dblVelocityX = playerHandle.dblPosition[0] - playerHandle.dblVerlet[0];
					var dblVelocityY = playerHandle.dblPosition[1] - playerHandle.dblVerlet[1];
					var dblVelocityZ = playerHandle.dblPosition[2] - playerHandle.dblVerlet[2];
					
					if (dblVelocityX > Voxel.voxelengineHandle.controls.max_speed) {
						dblVelocityX = Voxel.voxelengineHandle.controls.max_speed;
						
					} else if (dblVelocityX < -Voxel.voxelengineHandle.controls.max_speed) {
						dblVelocityX = -Voxel.voxelengineHandle.controls.max_speed;
						
					} else if (Math.abs(dblVelocityX) < 0.0001) {
						dblVelocityX = 0.0;
						
					}
					
					if (dblVelocityY > Voxel.voxelengineHandle.controls.jump_max_speed) {
						dblVelocityY = Voxel.voxelengineHandle.controls.jump_max_speed;
						
					} else if (dblVelocityY < -Voxel.voxelengineHandle.controls.jump_max_speed) {
						dblVelocityY = -Voxel.voxelengineHandle.controls.jump_max_speed;
						
					} else if (Math.abs(dblVelocityY) < 0.0001) {
						dblVelocityY = 0.0;
						
					}
					
					if (dblVelocityZ > Voxel.voxelengineHandle.controls.max_speed) {
						dblVelocityZ = Voxel.voxelengineHandle.controls.max_speed;
						
					} else if (dblVelocityZ < -Voxel.voxelengineHandle.controls.max_speed) {
						dblVelocityZ = -Voxel.voxelengineHandle.controls.max_speed;
						
					} else if (Math.abs(dblVelocityZ) < 0.0001) {
						dblVelocityZ = 0.0;
						
					}

					playerHandle.dblPosition[0] = playerHandle.dblVerlet[0] + dblVelocityX;
					playerHandle.dblPosition[1] = playerHandle.dblVerlet[1] + dblVelocityY;
					playerHandle.dblPosition[2] = playerHandle.dblVerlet[2] + dblVelocityZ;
				}

				{
					var minecraftskinHandle = Enemy.minecraftskinHandle[intActive];
					
					{
						intActive += 1;
					}
					
					{
						if (minecraftskinHandle.strTeam !== playerHandle.strTeam) {
							if (playerHandle.strTeam === 'teamRed') {
								minecraftskinHandle.setImage(Voxel.minecraftskinRed);
								
							} else if (playerHandle.strTeam === 'teamBlue') {
								minecraftskinHandle.setImage(Voxel.minecraftskinBlue);
								
							}
							
							minecraftskinHandle.strTeam = playerHandle.strTeam;
						}
					}
					
					{
//						var pos = this.avatar.position
//						var d = this.dimensions
//												  return aabb(
//												    [pos.x - (d[0]/2), pos.y, pos.z - (d[2]/2)],
//												    this.dimensions
//												  )
//						var aabbHandle = aabb();
//
//						var vec = {
//							'x': playerHandle.dblPosition[0] - playerHandle.dblVerlet[0],
//							'y': playerHandle.dblPosition[1] - playerHandle.dblVerlet[1],
//							'z': playerHandle.dblPosition[2] - playerHandle.dblVerlet[2]
//						};
//
//						var resting = {
//							'x': false,
//							'y': false,
//							'z': false
//						};
//
//						var collisionHandle = Voxel.voxelengineHandle.potentialCollisionSet();
//
//						for (var intFor1 = 0; intFor1 < collisionHandle.length; intFor1 += 1) {
//							{
//								collisionHandle[intFor1].collide(minecraftskinHandle.mesh, bbox, world_desired, resting)
//							}
//						}
//
//						Voxel.voxelengineHandle.collideVoxels(bbox, vec3, function(intAxis, tile, coords, dir, edge) {
//							if (Math.abs(vec[axes[axis]]) < Math.abs(edge)) {
//								return;
//							}
//							
//							vec[axes[axis]] = edge
//						    resting[axes[axis]] = dir
//							
//							
//							return true;
//						});
					}

					{
						minecraftskinHandle.mesh.position.x = playerHandle.dblPosition[0];
						minecraftskinHandle.mesh.position.y = playerHandle.dblPosition[1];
						minecraftskinHandle.mesh.position.z = playerHandle.dblPosition[2];
	
						minecraftskinHandle.mesh.rotation.y = playerHandle.dblBodyyaw;
	
						minecraftskinHandle.mesh.head.rotation.x = playerHandle.dblHeadpitch;
					}
					
					{
						var intWalktime = new Date().getTime() / 1000;
						
						{
							var dblVelocityX = playerHandle.dblPosition[0] - playerHandle.dblVerlet[0];
							var dblVelocityY = playerHandle.dblPosition[1] - playerHandle.dblVerlet[1];
							var dblVelocityZ = playerHandle.dblPosition[2] - playerHandle.dblVerlet[2];
							
							if (Math.abs(dblVelocityX) < 0.0001) {
								if (Math.abs(dblVelocityZ) < 0.0001) {
									playerHandle.intWalktime = intWalktime;
								}
							}
						}
						
						var intTimediff = playerHandle.intWalktime - intWalktime;
						
						{
							// http://djazz.mine.nu/lab/minecraft_items/
				
							minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI) + (Math.PI));
							minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI));
							
							minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI));
							minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.6662 * intTimediff * 10) + (0.5 * Math.PI) + (Math.PI));
						}
					}
				}
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < intActive; intFor1 += 1) {
				var minecraftskinHandle = Enemy.minecraftskinHandle[intFor1];

				if (minecraftskinHandle.mesh.parent !== undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.add(minecraftskinHandle.mesh);
				}
			}
			
			for (var intFor1 = intActive; intFor1 < Enemy.minecraftskinHandle.length; intFor1 += 1) {
				var minecraftskinHandle = Enemy.minecraftskinHandle[intFor1];

				if (minecraftskinHandle.mesh.parent === undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.remove(minecraftskinHandle.mesh);
				}
			}
		}
	}
};

jQuery(document).ready(function() {
	{
		Settings.init();
		
		Voxel.init();
		
		Socket.init();
		
		Input.init();
		
		Player.init();
		
		Enemy.init();
	}
	
	{
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Settings.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Settings.intChooserType === 0) {
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionCreate,
							'strType': 'voxelDirt'
						});
					}
				}
						
			} else if (Settings.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Settings.intChooserType === 0) {
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionDestroy,
							'strType': ''
						});
					}
				}
				
			} else if (Settings.strChooserCategory === 'categoryWeapon') {
				if (Settings.intChooserType === 0) {
					
				} else if (Settings.intChooserType === 1) {
					
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Player.update();
				 
				Enemy.update();
			}
			 
			{
				if (Socket.socketHandle !== null) {
					Socket.socketHandle.emit('playerHandle', {
						'a': Player.dblPosition,
						'b': Player.dblVerlet,
						'c': Player.minecraftskinHandle.mesh.rotation.y,
						'd': Player.minecraftskinHandle.mesh.head.rotation.x
					});
				}
			}
		});
	}
});