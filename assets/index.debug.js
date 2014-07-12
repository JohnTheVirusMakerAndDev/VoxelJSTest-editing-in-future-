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
				'width': 315
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
				});
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
				
				Socket.socketHandle.on('onlineHandle', function(jsonHandle) {
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

				Socket.socketHandle.on('loginHandle', function(jsonHandle) {
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
								playerHandle.dblPosition = playerHandle.b;
								playerHandle.dblVerlet = playerHandle.c;
								playerHandle.dblBodyyaw = playerHandle.d;
								playerHandle.dblHeadpitch = playerHandle.e;
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
									'dblPosition': [ dblPositionX, dblPositionY, dblPositionZ ],
									'dblVerlet': [ dblVerletX, dblVerletY, dblVerletZ ],
									'dblBodyyaw': playerHandle.dblBodyyaw,
									'dblHeadpitch': playerHandle.dblHeadpitch
								};
							}
						}
						
						Socket.playerHandle = playerOverwrite;
					}
				});
				
				setInterval(function() {
					{
						Socket.intPing = new Date().getTime();
					}
					
					{
						Socket.socketHandle.emit('onlineHandle', {});
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
	minecraftskinHandle: null,
	physicsHandle: null,
	
	dblPosition: [ 0.0, 0.0, 0.0 ],
	dblVerlet: [ 0.0, 0.0, 0.0 ],
	
	intWalktime: 0,
	
	init: function() {
		{
			Player.minecraftskinHandle = Voxel.minecraftskinFunction('./skins/blue.png');
			
			Player.physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinHandle.mesh);

			{
				Player.minecraftskinHandle.mesh.position.set(0, 10, 0); // TODO
				
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
					var minecraftskinHandle = Voxel.minecraftskinFunction('./skins/blue.png');

					{
						Voxel.voxelengineHandle.scene.add(minecraftskinHandle.mesh);
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
		{
			for (var intFor1 = 0; intFor1 < Enemy.minecraftskinHandle.length; intFor1 += 1) {
				var minecraftskinHandle = Enemy.minecraftskinHandle[intFor1];
				
				{
					minecraftskinHandle.visible = false; // TODO: not working because of hierarchy
				}
			}
		}
		
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
				}
				
				{
					// TODO: collision
				}

				{
					var minecraftskinHandle = null;
					
					{
						for (var intFor1 = 0; intFor1 < Enemy.minecraftskinHandle.length; intFor1 += 1) {
							if (Enemy.minecraftskinHandle[intFor1].visible === true) {
								continue;
							}
							
							{
								minecraftskinHandle = Enemy.minecraftskinHandle[intFor1];
							}
							
							{
								break;
							}
						}
					}
					
					{
						minecraftskinHandle.visible = true;
	
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