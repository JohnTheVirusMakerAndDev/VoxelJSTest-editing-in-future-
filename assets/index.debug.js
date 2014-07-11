jQuery(document).ready(function() {
	{
		jQuery('#idLoading')
			.dialog({
				'autoOpen': true,
				'closeOnEscape': false,
				'dialogClass': 'no-titlebar',
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': true,
				'resizable': false,
				'width': 'auto'
			})
		;
	}
	
	{
		jQuery('#idLogin')
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'dialogClass': 'no-close',
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': true,
				'resizable': false,
				'width': 422
			})
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
				'disabled': false,
				'width': 300
			})
		;
		
		jQuery('#idLogin_Team').closest('.ui-dialog').find('.ui-selectmenu-button')
			.css({
				'background': 'none'
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
					jQuery('#idLogin')
						.dialog('close')
					;
					
					jQuery('#idLoading')
						.dialog('open')
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
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'dialogClass': 'no-close',
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': false,
				'resizable': false,
				'width': 313
			})
		;
	}
	
	{
		jQuery('#idInformation_Tab')
			.button({
				'disabled': false,
				'icons': {
					'primary': 'ui-icon-arrowthick-2-e-w'
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
			});
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
		;
	}
});

var Voxel = {
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	minecraftskinFunction: null,
	
	init: function() {
		{
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './textures/',
				'generate': function(x, y, z) {
						return y === -2 ? 1 : 0;
				},
				'controls': {
					'discreteFire': true
				},
				'statsDisabled': true
			});
			
			Voxel.voxelengineHandle.appendTo(document.body);
		}
		
		{
			Voxel.voxelhighlightHandle = require('voxel-highlight')(Voxel.voxelengineHandle);
		}
		
		{
			Voxel.minecraftskinHandle = require('minecraft-skin');
			
			Voxel.minecraftskinFunction = function(strSkin) {
				return Voxel.minecraftskinHandle(Voxel.voxelengineHandle.THREE, strSkin, {
					'scale': new Voxel.voxelengineHandle.THREE.Vector3(0.04, 0.04, 0.04)
				}).mesh
			};
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
	}
};

var Socket = {
	socketHandle: null,

	playerHandle: {},
	
	init: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.playerHandle = {};
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

				Socket.socketHandle.on('loginHandle', function(jsonHandle) {
					console.log('loginHandle');
					console.log(jsonHandle);
					{
						if (jsonHandle.strType === 'typeReject') {
							{
								jQuery('#idLoading')
									.dialog('close')
								;
								
								jQuery('#idLogin')
									.dialog('open')
								;
							}
							
							{
								jQuery('#idLogin_Message')
									.text(jsonHandle.strMessage)
								;
							}
							
							{
								if (jsonHandle.strMessage === '') {
									jQuery('#idLogin').children().slice(0, 3)
										.css({
											'display': 'none'
										})
									;
									
								} else if (jsonHandle.strMessage !== '') {
									jQuery('#idLogin').children().slice(0, 3)
										.css({
											'display': 'block'
										})
									;
									
								}
							}
							
						} else if (jsonHandle.strType === 'typeAccept') {
							{
								jQuery('#idLoading')
									.dialog('close')
								;

								jQuery('#idInformation')
									.dialog('open')
								;
							}
							
						}
					}
				});
				
				Socket.socketHandle.on('onlineHandle', function(jsonHandle) {
					{
						jQuery('#idServer_Players')
							.val(jsonHandle.serverHandle.intPlayerActive + ' / ' + jsonHandle.serverHandle.intPlayerCapacity)
						;
						
						jQuery('#idServer_Map')
							.val(jsonHandle.serverHandle.strMapActive)
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
								if (playerHandle.strTeam === 'teamRed') {
									jQuery('#idTeamRed_Table')
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
									
								} else if (playerHandle.strTeam === 'teamBlue') {
									jQuery('#idTeamBlue_Table')
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
				
				Socket.socketHandle.on('chatHandle', function(jsonHandle) {
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
				});
				
				Socket.socketHandle.on('playerHandle', function(jsonHandle) {
					console.log('playerHandle');
					console.log(jsonHandle);
					{
						var playerOverwrite = {};
						
						for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
							var playerHandle = jsonHandle[intFor1];
							
							{
								dblPositionX = playerHandle.dblPositionX;
								dblPositionY = playerHandle.dblPositionY;
								dblPositionZ = playerHandle.dblPositionZ;
								dblVerletX = playerHandle.dblVerletX;
								dblVerletY = playerHandle.dblVerletY;
								dblVerletZ = playerHandle.dblVerletZ;
								
								if (Socket.playerHandle.hasOwnProperty(playerHandle.strSocket) === true) {
									dblPositionX = 0.5 * (playerHandle.dblPositionX + Socket.playerHandle[playerHandle.strSocket].dblPositionX);
									dblPositionY = 0.5 * (playerHandle.dblPositionY + Socket.playerHandle[playerHandle.strSocket].dblPositionY);
									dblPositionZ = 0.5 * (playerHandle.dblPositionZ + Socket.playerHandle[playerHandle.strSocket].dblPositionZ);
									dblVerletX = dblPositionX - (playerHandle.dblPositionX - playerHandle.dblVerletX);
									dblVerletY = dblPositionY - (playerHandle.dblPositionY - playerHandle.dblVerletY);
									dblVerletZ = dblPositionZ - (playerHandle.dblPositionZ - playerHandle.dblVerletZ);
								}
								
								playerOverwrite[playerHandle.strSocket] = {
									'strSocket': playerHandle.strSocket,
									'dblPositionX': dblPositionX,
									'dblPositionY': dblPositionY,
									'dblPositionZ': dblPositionZ,
									'dblVerletX': dblVerletX,
									'dblVerletY': dblVerletY,
									'dblVerletZ': dblVerletZ
								};
							}
						}
						
						Socket.playerHandle = playerOverwrite;
					}
					
					{
						Socket.socketHandle.emit('playerHandle', {
							'dblPositionX': Player.dblPositionX,
							'dblPositionY': Player.dblPositionY,
							'dblPositionZ': Player.dblPositionZ,
							'dblVerletX': Player.dblVerletX,
							'dblVerletY': Player.dblVerletY,
							'dblVerletZ': Player.dblVerletZ
						});
					}
				});
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
	}
};

var Input = {
	init: function() {
		{
			jQuery(document.body)
				.off('keydown')
				.on('keydown', function(eventHandle) {
					//if (jQuery('#idMessagebox_Chat').is(':focus') === true) {
					//	return;
					//}
					//
					//{
					//	eventHandle.preventDefault();
					//}
					
					if (eventHandle.keyCode === 9) {
						jQuery('#idInformation')
							.dialog('close')
						;
					}
				})
				.off('keyup')
				.on('keyup', function(eventHandle) {
					//if (jQuery('#idMessagebox_Chat').is(':focus') === true) {
					//	return;
					//}
					//
					//{
					//	eventHandle.preventDefault();
					//}
					
				})
			;
		}
	},
	
	dispel: function() {

	},
	
	update: function() {

	}
};

var Player = {
	meshHandle: null,
	physicsHandle: null,
	
	dblPositionX: 0.0,
	dblPositionY: 0.0,
	dblPositionZ: 0.0,
	
	dblVerletX: 0.0,
	dblVerletY: 0.0,
	dblVerletZ: 0.0,
	
	init: function() {
		{
			Player.meshHandle = Voxel.minecraftskinFunction('./skins/logan.png');

			Player.meshHandle.position.set(0, 10, 0);
			
			Player.meshHandle.cameraInside.add(Voxel.voxelengineHandle.camera);
		}
		
		{
			Player.physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.meshHandle);
			
			Player.physicsHandle.yaw = Player.meshHandle;
			Player.physicsHandle.pitch = Player.meshHandle.head;
			Player.physicsHandle.position = Player.meshHandle.position;
			
			Player.physicsHandle.subjectTo(Voxel.voxelengineHandle.gravity);
			
			Player.physicsHandle.blocksCreation = true;
		}
		
		{
			Player.dblPositionX = 0.0;
		
			Player.dblPositionY = 0.0;
		
			Player.dblPositionZ = 0.0;
		}
		
		{
			Player.dblVerletX = 0.0;
		
			Player.dblVerletY = 0.0;
		
			Player.dblVerletZ = 0.0;
		}
		
		{
			Voxel.voxelengineHandle.scene.add(Player.meshHandle);
			
			Voxel.voxelengineHandle.addItem(Player.physicsHandle);
		}
		
		{
			Voxel.voxelengineHandle.control(Player.physicsHandle);
		}
	},
	
	dispel: function() {
		{
			Player.meshHandle = null;
			
			Player.physicsHandle = null;
		}
		
		{
			Player.dblPositionX = 0.0;
		
			Player.dblPositionY = 0.0;
		
			Player.dblPositionZ = 0.0;
		}
		
		{
			Player.dblVerletX = 0.0;
		
			Player.dblVerletY = 0.0;
		
			Player.dblVerletZ = 0.0;
		}
	},
	
	update: function() {
		{
			Player.dblVerletX = Player.dblPositionX;
			
			Player.dblVerletY = Player.dblPositionY;
			
			Player.dblVerletZ = Player.dblPositionZ;
		}
		
		{
			Player.dblPositionX = Player.meshHandle.position.x;
			
			Player.dblPositionY = Player.meshHandle.position.y;
			
			Player.dblPositionZ = Player.meshHandle.position.z;
		}
	}
};

var Enemy = {
	intActive: 0,
	
	itemHandle: [],
	
	init: function() {
		{
			Enemy.intActive = 0;
		}
		
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
			        var itemHandle = Voxel.minecraftskinFunction('./skins/logan.png');
					
					Enemy.itemHandle.push(itemHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Enemy.intActive = 0;
		}
		
		{
			Enemy.itemHandle = [];
		}
	},
	
	update: function() {
		{
			Enemy.intActive = 0;
		}
		
		{
			for (var intFor1 = 0; intFor1 < Enemy.itemHandle.length; intFor1 += 1) {
				var itemHandle = Enemy.itemHandle[intFor1];
				
				{
					Voxel.voxelengineHandle.removeItem(itemHandle);
				}
			}
		}
		
		{
			for (var strSocket in Socket.playerHandle) {
				var playerHandle = Socket.playerHandle[strSocket];
				
				{
					{
						var dblVerletX = playerHandle.dblPositionX;
						var dblVerletY = playerHandle.dblPositionY;
						var dblVerletZ = playerHandle.dblPositionZ;
						
						{
							playerHandle.dblPositionX = playerHandle.dblPositionX + (playerHandle.dblPositionX - playerHandle.dblVerletX) + Voxel.voxelengineHandle[0];
							playerHandle.dblPositionY = playerHandle.dblPositionY + (playerHandle.dblPositionY - playerHandle.dblVerletY) + Voxel.voxelengineHandle[1];
							playerHandle.dblPositionZ = playerHandle.dblPositionZ + (playerHandle.dblPositionZ - playerHandle.dblVerletZ) + Voxel.voxelengineHandle[2];
						}
						
						{
							playerHandle.dblVerletX = dblVerletX;
							playerHandle.dblVerletY = dblVerletY;
							playerHandle.dblVerletZ = dblVerletZ;
						}
					}
					
					{
						var dblVelocityX = playerHandle.dblPositionX - playerHandle.dblVerletX;
						var dblVelocityY = playerHandle.dblPositionY - playerHandle.dblVerletY;
						var dblVelocityZ = playerHandle.dblPositionZ - playerHandle.dblVerletZ;
						
						{
							// TODO: maybe limit velocity
						}
						
						{
							playerHandle.dblPositionX = playerHandle.dblVerletX + dblVelocityX;
							playerHandle.dblPositionY = playerHandle.dblVerletY + dblVelocityY;
							playerHandle.dblPositionZ = playerHandle.dblVerletZ + dblVelocityZ;
						}
					}
				}
				
				{
					// TODO: collision
				}
				
				{
					var itemHandle = Enemy.itemHandle[Enemy.intActive];
					
					{
						itemHandle.position.x = playerHandle.dblPositionX;
						itemHandle.position.y = playerHandle.dblPositionY;
						itemHandle.position.z = playerHandle.dblPositionZ;
					}
					
					Voxel.voxelengineHandle.removeItem(itemHandle);
				}
				
				{
					Enemy.intActive += 1;
				}
			}
		}
	}
};

jQuery(document).ready(function() {
	{
		Voxel.init();
		
		Socket.init();
		
		Input.init();
		
		Player.init();
		
		Enemy.init();
	}
	
	{
		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			 {
				 Player.update();
				 
				 Enemy.update();
			 }
		});
	}
});