var Settings = {
	strMapType: {},
	
	strPhaseActive: '',
	
	init: function() {
		{
			Settings.strMapType = {};
			
			Settings.strPhaseActive = '';
		}
	},
	
	dispel: function() {
		{
			Settings.strMapType = {};
			
			Settings.strPhaseActive = '';
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
						Gui.strMode = 'modeLoading';
					}
					
					{
						Gui.update();
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
				if (Settings.strPhaseActive === 'Build') {
					{
						jQuery('#idPhaseBuild')
							.css({
								'display': 'inline-block'
							})
						;
					}
					
				} else if (Settings.strPhaseActive === 'Combat') {
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
	}
};

var Voxel = {
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	minecraftskinCreate: null,
	minecraftskinUpdate: null,
	
	itemCreate: null,
	itemGeometry: {},
	itemMaterial: null,
	
	init: function() {
		{
			// TODO: override dependencies
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './images/',
				'generate': function(intX, intY, intZ) {
					return 0;
				},
				'materials': [ 'voxelVoid', 'voxelBrick', 'voxelDirt', 'voxelGrass', 'voxelPlank', 'voxelStone', 'voxelRedSpawn', 'voxelRedFlag', 'voxelBlueSpawn', 'voxelBlueFlag', 'voxelSeparator' ],
				'controls': {
					'walkMaxSpeed': 0.008,
					'runMaxSpeed': 0.008,
					'jumpMaxSpeed': 0.007,
					'jumpMaxTimer': 1,
					'jumpSpeed': 0.007,
					'jumpSpeedMove': 0.1,
					'accelTimer': 1,
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
					if (Gui.strChooserCategory === 'categoryCreate') {
						return true;
						
					} else if (Gui.strChooserCategory === 'categoryDestroy') {
						return true;
						
					}
					
					return false;
				},
				'distance': 8,
				'wireframeLinewidth': 16,
				'wireframeOpacity': 1.0,
				'color': 0xFFFFFF,
				'adjacentActive': function() {
					if (Gui.strChooserCategory === 'categoryCreate') {
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
			
			Voxel.minecraftskinCreate = function() {
				var minecraftskinHandle = Voxel.minecraftskinHandle(Voxel.voxelengineHandle.THREE, '', {
					'scale': new Voxel.voxelengineHandle.THREE.Vector3(0.04, 0.04, 0.04)
				});
				
				{
					minecraftskinHandle.strTeam = '';
					
					minecraftskinHandle.strItem = '';
				}
				
				{
					minecraftskinHandle.meshPickaxe = Voxel.itemCreate('itemPickaxe');
					
					minecraftskinHandle.meshPickaxe.position.x = 6.0;
					minecraftskinHandle.meshPickaxe.position.y = 0.0 - 21.0;
					minecraftskinHandle.meshPickaxe.position.z = 0.0;
					
					minecraftskinHandle.meshPickaxe.rotation.x = 0.0;
					minecraftskinHandle.meshPickaxe.rotation.y = 0.0;
					minecraftskinHandle.meshPickaxe.rotation.z = 0.25 * Math.PI;
				}
				
				{
					minecraftskinHandle.meshSword = Voxel.itemCreate('itemSword');
					
					minecraftskinHandle.meshSword.position.x = 6.0;
					minecraftskinHandle.meshSword.position.y = 0.0 - 21.0;
					minecraftskinHandle.meshSword.position.z = 0.0;
					
					minecraftskinHandle.meshSword.rotation.x = 0.0;
					minecraftskinHandle.meshSword.rotation.y = 0.0;
					minecraftskinHandle.meshSword.rotation.z = 0.25 * Math.PI;
				}
				
				{
					minecraftskinHandle.meshBow = Voxel.itemCreate('itemBow');
					
					minecraftskinHandle.meshBow.position.x = 0.0;
					minecraftskinHandle.meshBow.position.y = 0.0 - 18.0;
					minecraftskinHandle.meshBow.position.z = 0.0;
					
					minecraftskinHandle.meshBow.rotation.x = 0.0;
					minecraftskinHandle.meshBow.rotation.y = 0.0;
					minecraftskinHandle.meshBow.rotation.z = 0.25 * Math.PI;
				}
				
				return minecraftskinHandle;
			};
			
			Voxel.minecraftskinUpdate = function(minecraftskinHandle, strTeam, strItem, intWalktime) {
				{
					if (minecraftskinHandle.strTeam !== strTeam) {
						if (strTeam === 'teamRed') {
							minecraftskinHandle.setImage(jQuery('#idSkinRed').get(0));
							
						} else if (strTeam === 'teamBlue') {
							minecraftskinHandle.setImage(jQuery('#idSkinBlue').get(0));
							
						}
						
						minecraftskinHandle.strTeam = strTeam;
					}
				}
				
				{
					if (minecraftskinHandle.strItem !== strItem) {
						minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshPickaxe);
						minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshSword);
						minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshBow);
						
						if (strItem === 'itemPickaxe') {
							minecraftskinHandle.rightArm.add(minecraftskinHandle.meshPickaxe);
							
						} else if (strItem === 'itemSword') {
							minecraftskinHandle.rightArm.add(minecraftskinHandle.meshSword);
							
						} else if (strItem === 'itemBow') {
							minecraftskinHandle.rightArm.add(minecraftskinHandle.meshBow);
							
						}
						
						minecraftskinHandle.strItem = strItem;
					}
				}
				
				{
					var dblItem = 0.0;
					
					if (strItem !== '') {
						dblItem = 0.1 * Math.PI;
					}
					
					minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI) + Math.PI + dblItem);
					minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
					
					minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
					minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI) + Math.PI);
				}
			};
		}
		
		{
			Voxel.itemCreate = function(strItem) {
				if (Voxel.itemGeometry[strItem] === undefined) {
					var contextHandle = document.createElement('canvas').getContext('2d');
					
					{
						if (strItem === 'itemPickaxe') {
							contextHandle.drawImage(jQuery('#idItemPickaxe').get(0), 0, 0);
							
						} else if (strItem === 'itemSword') {
							contextHandle.drawImage(jQuery('#idItemSword').get(0), 0, 0);

						} else if (strItem === 'itemBow') {
							contextHandle.drawImage(jQuery('#idItemBow').get(0), 0, 0);

						} else if (strItem === 'itemRedFlag') {
							contextHandle.drawImage(jQuery('#idItemRedFlag').get(0), 0, 0);

						} else if (strItem === 'itemBlueFlag') {
							contextHandle.drawImage(jQuery('#idItemBlueFlag').get(0), 0, 0);
							
						}
					}
					
					var geometryHandle = new Voxel.voxelengineHandle.THREE.Geometry();
					
					{
						for (var intFor1 = 0; intFor1 < 16; intFor1 += 1) {
							for (var intFor2 = 0; intFor2 < 16; intFor2 += 1) {
								var intColor = contextHandle.getImageData(intFor1, intFor2, intFor1 + 1, intFor2 + 1).data
	
								if (intColor[3] === 0) {
									continue;
								}
								
								{
									var cubegeometryHandle = new Voxel.voxelengineHandle.THREE.CubeGeometry(1, 1, 1);
									
									for (var intFor3 = 0; intFor3 < cubegeometryHandle.faces.length; intFor3 += 1) {
										if (cubegeometryHandle.faces[intFor3] === undefined) {
											continue;
										}
										
										{
											cubegeometryHandle.faces[intFor3].color = new Voxel.voxelengineHandle.THREE.Color((intColor[0] << 16) + (intColor[1] << 8) + (intColor[2] << 0));
										}
									}
									
									for (var intFor3 = 0; intFor3 < cubegeometryHandle.vertices.length; intFor3 += 1) {
										if (cubegeometryHandle.vertices[intFor3] === undefined) {
											continue;
										}
										
										{
											cubegeometryHandle.vertices[intFor3].x += intFor1;
											cubegeometryHandle.vertices[intFor3].y += intFor2;
											cubegeometryHandle.vertices[intFor3].z += 0.0;
										}
									}
									
									Voxel.voxelengineHandle.THREE.GeometryUtils.merge(geometryHandle, cubegeometryHandle);
								}
							}
						}
					}
					
					{
						Voxel.itemGeometry[strItem] = geometryHandle;
					}
				}
				
				return new Voxel.voxelengineHandle.THREE.Mesh(Voxel.itemGeometry[strItem], Voxel.itemMaterial);
			};
			
			Voxel.itemGeometry = {};
			
			Voxel.itemMaterial = new Voxel.voxelengineHandle.THREE.MeshBasicMaterial({
				'vertexColors': Voxel.voxelengineHandle.THREE.FaceColors
			});
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
			
			Voxel.minecraftskinCreate = null;

			Voxel.minecraftskinUpdate = null;
		}
		
		{
			Voxel.itemCreate = null;
			
			Voxel.itemGeometry = {};
			
			Voxel.itemMaterial = null;
		}
	}
};

var Socket = {
	socketHandle: null,
	
	intPing: 0,

	playerHandle: {},
	
	itemHandle: {},
	
	init: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.intPing = 0;
		}
		
		{
			Socket.playerHandle = {};
		}
		
		{
			Socket.itemHandle = {};
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
								Gui.strMode = 'modeLogin';
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
								Gui.strMode = 'modeMenu';
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
								playerHandle.strItem = playerHandle.c;
								playerHandle.dblPosition = playerHandle.d;
								playerHandle.dblVerlet = playerHandle.e;
								playerHandle.dblRotation = playerHandle.f;
							}
							
							{
								if (Socket.playerHandle.hasOwnProperty(playerHandle.strSocket) === true) {
									Physics.updateOverwrite(playerHandle, Socket.playerHandle[playerHandle.strSocket]);
								}
							}
							
							{
								playerOverwrite[playerHandle.strSocket] = {
									'strSocket': playerHandle.strSocket,
									'strTeam': playerHandle.strTeam,
									'strItem': playerHandle.strItem,
									'dblPosition': playerHandle.dblPosition,
									'dblVerlet': playerHandle.dblVerlet,
									'dblRotation': playerHandle.dblRotation
								};
								
								playerOverwrite[playerHandle.strSocket].dblAcceleration = [ 0.0, 0.0, 0.0 ];

								playerOverwrite[playerHandle.strSocket].boolCollisionTop = false;
								playerOverwrite[playerHandle.strSocket].boolCollisionSide = false;
								playerOverwrite[playerHandle.strSocket].boolCollisionBottom = false;
								
								playerOverwrite[playerHandle.strSocket].intWalktime = 0;
							}
						}
						
						Socket.playerHandle = playerOverwrite;
					}
				});

				
				Socket.socketHandle.on('itemHandle', function(jsonHandle) {
					{
						var itemOverwrite = {};
						
						/*for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
							var itemHandle = jsonHandle[intFor1];

							{
								itemHandle.strItem = itemHandle.a;
								itemHandle.dblPosition = itemHandle.b;
								itemHandle.dblVerlet = itemHandle.c;
								itemHandle.dblRotation = itemHandle.d;
							}
							
							{
								if (Socket.itemHandle.hasOwnProperty(itemHandle.strSocket) === true) {
									Physics.updateOverwrite(itemHandle, Socket.itemHandle[itemHandle.strSocket]);
								}
							}
							
							{
								itemOverwrite[itemHandle.strSocket] = {
									'strSocket': itemHandle.strSocket,
									'strTeam': itemHandle.strTeam,
									'strItem': itemHandle.strItem,
									'dblPosition': itemHandle.dblPosition,
									'dblVerlet': itemHandle.dblVerlet,
									'dblRotation': itemHandle.dblRotation,
								};
							}
						}*/
						
						Socket.itemHandle = itemOverwrite;
					}
				});
				
				Socket.socketHandle.on('voxelHandle', function(jsonHandle) {
					{
						if (jsonHandle.strType === '') {
							delete Settings.strMapType[jsonHandle.intCoordinate];
							
						} else if (jsonHandle.strType !== '') {
							Settings.strMapType[jsonHandle.intCoordinate] = jsonHandle.strType;
							
						}
					}
					
					{
						Voxel.voxelengineHandle.setBlock(jsonHandle.intCoordinate, Voxel.voxelengineHandle.materials.find(jsonHandle.strType));
					}
				});
				
				Socket.socketHandle.on('resetHandle', function(jsonHandle) {
					{
						Player.strTeam = jsonHandle.strPlayerTeam;
					}
					
					{
						Player.dblPosition[0] = jsonHandle.dblPlayerPosition[0];
						Player.dblPosition[1] = jsonHandle.dblPlayerPosition[1];
						Player.dblPosition[2] = jsonHandle.dblPlayerPosition[2];

						Player.dblVerlet[0] = Player.dblPosition[0];
						Player.dblVerlet[1] = Player.dblPosition[1];
						Player.dblVerlet[2] = Player.dblPosition[2];

						Player.dblAcceleration[0] = 0.0;
						Player.dblAcceleration[1] = 0.0;
						Player.dblAcceleration[2] = 0.0;
					}
					
					{
						Settings.strMapType = jsonHandle.strMapType;
						
					    for (var intCoordinate in Settings.strMapType) {
							var strType = Settings.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), Voxel.voxelengineHandle.materials.find(strType));
							}
					    }
					}
					
					{
						Settings.strPhaseActive = jsonHandle.strPhaseActive;
					}
					
					{
						Gui.update();
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
			Socket.intPing = 0;
		}
		
		{
			Socket.playerHandle = {};
		}
		
		{
			Socket.itemHandle = {};
		}
	}
};

var Input = {
	boolUp: false,
	boolPressedUp: false,
	boolPreviousUp: false,

	boolLeft: false,
	boolPressedLeft: false,
	boolPreviousLeft: false,

	boolDown: false,
	boolPressedDown: false,
	boolPreviousDown: false,

	boolRight: false,
	boolPressedRight: false,
	boolPreviousRight: false,

	boolSpace: false,
	boolPressedSpace: false,
	boolPreviousSpace: false,

	boolShift: false,
	boolPressedShift: false,
	boolPreviousShift: false,
	
	init: function() {
		{
			Input.boolUp = false;
			
			Input.boolPressedUp = false;
			
			Input.boolPreviousUp = false;
		}
		
		{
			Input.boolLeft = false;
			
			Input.boolPressedLeft = false;
			
			Input.boolPreviousLeft = false;
		}
		
		{
			Input.boolDown = false;
			
			Input.boolPressedDown = false;
			
			Input.boolPreviousDown = false;
		}
		
		{
			Input.boolRight = false;
			
			Input.boolPressedRight = false;
			
			Input.boolPreviousRight = false;
		}
		
		{
			Input.boolSpace = false;
			
			Input.boolPressedSpace = false;
			
			Input.boolPreviousSpace = false;
		}
		
		{
			Input.boolShift = false;
			
			Input.boolPressedShift = false;
			
			Input.boolPreviousShift = false;
		}
		
		{
			jQuery(document.body)
				.off('keydown')
				.on('keydown', function(eventHandle) {
					if (jQuery('#idMessagebox_Chat').is(':focus') === true) {
						return;
						
					} else if (jQuery('#idLogin_Name').is(':focus') === true) {
						return;
						
					} else if (jQuery('#idLogin_Password').is(':focus') === true) {
						return;
						
					}
					
					{
						eventHandle.preventDefault();
					}
					
					{
						if ((eventHandle.keyCode === 38) | (eventHandle.keyCode === 87)) {
							Input.boolUp = true;
							
						} else if ((eventHandle.keyCode === 37) | (eventHandle.keyCode === 65)) {
							Input.boolLeft = true;
							
						} else if ((eventHandle.keyCode === 40) | (eventHandle.keyCode === 83)) {
							Input.boolDown = true;
							
						} else if ((eventHandle.keyCode === 39) | (eventHandle.keyCode === 68)) {
							Input.boolRight = true;
							
						} else if (eventHandle.keyCode === 32) {
							Input.boolSpace = true;
							
						} else if (eventHandle.keyCode === 16) {
							Input.boolShift = true;
							
						}
					}
					
					{
						if (Gui.strMode === 'modeMenu') {
							if (eventHandle.keyCode === 69) {
								{
									Gui.strMode = 'modeGame';
								}
								
								{
									Gui.update();
								}
							}
							
						} else if (Gui.strMode === 'modeGame') {
							if (eventHandle.keyCode === 69) {
								{
									Gui.strMode = 'modeMenu';
								}
								
								{
									Gui.update();
								}
							}
							
							if (Settings.strPhaseActive === 'Build') {
								if (eventHandle.keyCode === 49) {
									{
										Gui.strChooserCategory = 'categoryCreate';
										
										Gui.intChooserType = 0;
									}
									
									{
										Gui.update();
									}
									
									{
										Player.strItem = 'itemPickaxe';
									}
									
								} else if (eventHandle.keyCode === 50) {
									{
										Gui.strChooserCategory = 'categoryDestroy';
										
										Gui.intChooserType = 0;
									}
									
									{
										Gui.update();
									}
									
									{
										Player.strItem = 'itemPickaxe';
									}
									
								}
								
							} else if (Settings.strPhaseActive === 'Combat') {
								if (eventHandle.keyCode === 49) {
									{
										Gui.strChooserCategory = 'categoryWeapon';
										
										Gui.intChooserType = 0;
									}
									
									{
										Gui.update();
									}
									
									{
										Player.strItem = 'itemSword';
									}
									
								} else if (eventHandle.keyCode === 50) {
									{
										Gui.strChooserCategory = 'categoryWeapon';
										
										Gui.intChooserType = 1;
									}
									
									{
										Gui.update();
									}
									
									{
										Player.strItem = 'itemBow';
									}
									
								}
								
							}
							
						}
					}
				})
				.off('keyup')
				.on('keyup', function(eventHandle) {
					if (jQuery('#idMessagebox_Chat').is(':focus') === true) {
						return;
						
					} else if (jQuery('#idLogin_Name').is(':focus') === true) {
						return;
						
					} else if (jQuery('#idLogin_Password').is(':focus') === true) {
						return;
						
					}
					
					{
						eventHandle.preventDefault();
					}
	
					{
						if ((eventHandle.keyCode === 38) | (eventHandle.keyCode === 87)) {
							Input.boolUp = false;
	
						} else if ((eventHandle.keyCode === 37) | (eventHandle.keyCode === 65)) {
							Input.boolLeft = false;
	
						} else if ((eventHandle.keyCode === 40) | (eventHandle.keyCode === 83)) {
							Input.boolDown = false;
	
						} else if ((eventHandle.keyCode === 39) | (eventHandle.keyCode === 68)) {
							Input.boolRight = false;
							
						} else if (eventHandle.keyCode === 32) {
							Input.boolSpace = false;
							
						} else if (eventHandle.keyCode === 16) {
							Input.boolShift = false;
							
						}
					}
				})
			;
		}
	},
	
	dispel: function() {
		{
			Input.boolUp = false;
			
			Input.boolPressedUp = false;
			
			Input.boolPreviousUp = false;
		}
		
		{
			Input.boolLeft = false;
			
			Input.boolPressedLeft = false;
			
			Input.boolPreviousLeft = false;
		}
		
		{
			Input.boolDown = false;
			
			Input.boolPressedDown = false;
			
			Input.boolPreviousDown = false;
		}
		
		{
			Input.boolRight = false;
			
			Input.boolPressedRight = false;
			
			Input.boolPreviousRight = false;
		}
		
		{
			Input.boolSpace = false;
			
			Input.boolPressedSpace = false;
			
			Input.boolPreviousSpace = false;
		}
		
		{
			Input.boolShift = false;
			
			Input.boolPressedShift = false;
			
			Input.boolPreviousShift = false;
		}
	},
	
	update: function() {
		{
			Input.boolPressedUp = false;
			
			if (Input.boolUp === true) {
				if (Input.boolPreviousUp === false) {
					Input.boolPressedUp = true;
				}
			}
			
			Input.boolPreviousUp = Input.boolUp;
		}
		
		{
			Input.boolPressedLeft = false;
			
			if (Input.boolLeft === true) {
				if (Input.boolPreviousLeft === false) {
					Input.boolPressedLeft = true;
				}
			}
			
			Input.boolPreviousLeft = Input.boolLeft;
		}
		
		{
			Input.boolPressedDown = false;
			
			if (Input.boolDown === true) {
				if (Input.boolPreviousDown === false) {
					Input.boolPressedDown = true;
				}
			}
			
			Input.boolPreviousDown = Input.boolDown;
		}
		
		{
			Input.boolPressedRight = false;
			
			if (Input.boolRight === true) {
				if (Input.boolPreviousRight === false) {
					Input.boolPressedRight = true;
				}
			}
			
			Input.boolPreviousRight = Input.boolRight;
		}
		
		{
			Input.boolPressedSpace = false;
			
			if (Input.boolSpace === true) {
				if (Input.boolPreviousSpace === false) {
					Input.boolPressedSpace = true;
				}
			}
			
			Input.boolPreviousSpace = Input.boolSpace;
		}
		
		{
			Input.boolPressedShift = false;
			
			if (Input.boolShift === true) {
				if (Input.boolPreviousShift === false) {
					Input.boolPressedShift = true;
				}
			}
			
			Input.boolPreviousShift = Input.boolShift;
		}
	}
};

var Player = {
	minecraftskinHandle: null,
	
	physicsHandle: null,
	
	strTeam: '',
	strItem: '',
	
	dblPosition: [ 0.0, 0.0, 0.0 ],
	dblVerlet: [ 0.0, 0.0, 0.0 ],
	dblAcceleration: [ 0.0, 0.0, 0.0 ],
	
	boolCollisionTop: false,
	boolCollisionSide: false,
	boolCollisionBottom: false,

	intJumpcount: 0,
	
	intWalktime: 0,
	
	init: function() {
		{
			Player.minecraftskinHandle = Voxel.minecraftskinCreate();
			
			{
				Player.minecraftskinHandle.mesh.position.set(0, 0, 0);
				
				Player.minecraftskinHandle.mesh.cameraInside.add(Voxel.voxelengineHandle.camera);
			}
			
			Voxel.voxelengineHandle.scene.add(Player.minecraftskinHandle.mesh);
		}
		
		{
			Player.physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinHandle.mesh);
			
			{
				Player.physicsHandle.blocksCreation = true;
				
				Player.physicsHandle.position = Player.minecraftskinHandle.mesh.position;
				Player.physicsHandle.yaw = Player.minecraftskinHandle.mesh;
				Player.physicsHandle.pitch = Player.minecraftskinHandle.mesh.head;
			}
			
			Voxel.voxelengineHandle.control(Player.physicsHandle);
		}
		
		{
			Player.strTeam = '';
			
			Player.strItem = '';
		}
		
		{
			Player.dblPosition[0] = 0.0;
			Player.dblPosition[1] = 0.0;
			Player.dblPosition[2] = 0.0;

			Player.dblVerlet[0] = Player.dblPosition[0];
			Player.dblVerlet[1] = Player.dblPosition[1];
			Player.dblVerlet[2] = Player.dblPosition[2];

			Player.dblAcceleration[0] = 0.0;
			Player.dblAcceleration[1] = 0.0;
			Player.dblAcceleration[2] = 0.0;
		}
		
		{
			Player.boolCollisionTop = false;
			
			Player.boolCollisionSide = false;
			
			Player.boolCollisionBottom = false;
		}
		
		{
			Player.intJumpcount = 0;
		}
		
		{
			Player.intWalktime = 0; 
		}
	},
	
	dispel: function() {
		{
			Player.minecraftskinHandle = null;
		}
		
		{
			Player.physicsHandle = null;
		}
		
		{
			Player.strTeam = '';
			
			Player.strItem = '';
		}
		
		{
			Player.dblPosition[0] = 0.0;
			Player.dblPosition[1] = 0.0;
			Player.dblPosition[2] = 0.0;

			Player.dblVerlet[0] = 0.0;
			Player.dblVerlet[1] = 0.0;
			Player.dblVerlet[2] = 0.0;

			Player.dblAcceleration[0] = 0.0;
			Player.dblAcceleration[1] = 0.0;
			Player.dblAcceleration[2] = 0.0;
		}
		
		{
			Player.boolCollisionTop = false;
			
			Player.boolCollisionSide = false;
			
			Player.boolCollisionBottom = false;
		}
		
		{
			Player.intJumpcount = 0;
		}
		
		{
			Player.intWalktime = 0; 
		}
	},
	
	update: function() {
		{
			if (Input.boolUp === true) {
				var dblRotationX = Math.sin(Player.minecraftskinHandle.mesh.rotation.y);
				var dblRotationZ = Math.cos(Player.minecraftskinHandle.mesh.rotation.y);

				Player.dblAcceleration[0] -= 0.03 * dblRotationX;
				Player.dblAcceleration[2] -= 0.03 * dblRotationZ;
			}
			
			if (Input.boolDown === true) {
				var dblRotationX = Math.sin(Player.minecraftskinHandle.mesh.rotation.y);
				var dblRotationZ = Math.cos(Player.minecraftskinHandle.mesh.rotation.y);

				Player.dblAcceleration[0] += 0.03 * dblRotationX;
				Player.dblAcceleration[2] += 0.03 * dblRotationZ;
			}
			
			if (Input.boolLeft === true) {
				var dblRotationX = Math.sin(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
				var dblRotationZ = Math.cos(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));

				Player.dblAcceleration[0] -= 0.03 * dblRotationX;
				Player.dblAcceleration[2] -= 0.03 * dblRotationZ;
			}
			
			if (Input.boolRight === true) {
				var dblRotationX = Math.sin(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
				var dblRotationZ = Math.cos(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));

				Player.dblAcceleration[0] += 0.03 * dblRotationX;
				Player.dblAcceleration[2] += 0.03 * dblRotationZ;
			}
			
			if (Input.boolSpace === true) {
				if (Player.intJumpcount > 0) {
					{
						Player.intJumpcount -= 1;
					}
					
					{
						Player.dblAcceleration[1] += 1.0;
					}
				}
			}
		}
		
		{
			var dblVelocityX = Player.dblPosition[0] - Player.dblVerlet[0];
			var dblVelocityY = Player.dblPosition[1] - Player.dblVerlet[1];
			var dblVelocityZ = Player.dblPosition[2] - Player.dblVerlet[2];

			dblVelocityX *= 0.8;
			dblVelocityY *= 1.0;
			dblVelocityZ *= 0.8;
			
			Player.dblPosition[0] = Player.dblVerlet[0] + dblVelocityX;
			Player.dblPosition[1] = Player.dblVerlet[1] + dblVelocityY;
			Player.dblPosition[2] = Player.dblVerlet[2] + dblVelocityZ;
		}
		
		{
			Player.dblAcceleration[1] -= 0.01;
		}
		
		{
			Physics.update(Player);
		}
		
		{
			if (Player.boolCollisionBottom === true) {
				Player.intJumpcount = 1;
			}
		}

		{
			Player.minecraftskinHandle.mesh.position.x = Player.dblPosition[0];
			Player.minecraftskinHandle.mesh.position.y = Player.dblPosition[1] - 0.5;
			Player.minecraftskinHandle.mesh.position.z = Player.dblPosition[2];
		}
		
		{
			var dblVelocityX = Player.dblPosition[0] - Player.dblVerlet[0];
			var dblVelocityY = Player.dblPosition[1] - Player.dblVerlet[1];
			var dblVelocityZ = Player.dblPosition[2] - Player.dblVerlet[2];
			
			if (Math.abs(dblVelocityX) < 0.0001) {
				if (Math.abs(dblVelocityZ) < 0.0001) {
					Player.intWalktime = new Date().getTime() / 1000;
				}
			}
		}
		
		{
			Voxel.minecraftskinUpdate(Player.minecraftskinHandle, Player.strTeam, Player.strItem, Player.intWalktime - new Date().getTime() / 1000);
		}
	}
};

var Enemy = {
	minecraftskinHandle: [],
	
	init: function() {
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var minecraftskinHandle = Voxel.minecraftskinCreate();
					
					{
						minecraftskinHandle.mesh.position.set(0, 0, 0);
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

				if (minecraftskinHandle.mesh.parent === undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.remove(minecraftskinHandle.mesh);
				}
			}
		}
		
		{
			for (var strSocket in Socket.playerHandle) {
				var playerHandle = Socket.playerHandle[strSocket];

				{
					playerHandle.dblAcceleration[1] -= 0.01;
				}
				
				{
					Physics.update(playerHandle);
				}

				{
					var minecraftskinHandle = null;
					
					{
						for (var intFor1 = 0; intFor1 < Enemy.minecraftskinHandle.length; intFor1 += 1) {
							if (Enemy.minecraftskinHandle[intFor1].mesh.parent !== undefined) {
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
						Voxel.voxelengineHandle.scene.add(minecraftskinHandle.mesh);
					}

					{
						minecraftskinHandle.mesh.position.x = playerHandle.dblPosition[0];
						minecraftskinHandle.mesh.position.y = playerHandle.dblPosition[1] - 0.5;
						minecraftskinHandle.mesh.position.z = playerHandle.dblPosition[2];

						minecraftskinHandle.mesh.head.rotation.x = playerHandle.dblRotation[0];
						
						minecraftskinHandle.mesh.rotation.y = playerHandle.dblRotation[1];
					}
					
					{
						var dblVelocityX = playerHandle.dblPosition[0] - playerHandle.dblVerlet[0];
						var dblVelocityY = playerHandle.dblPosition[1] - playerHandle.dblVerlet[1];
						var dblVelocityZ = playerHandle.dblPosition[2] - playerHandle.dblVerlet[2];
						
						if (Math.abs(dblVelocityX) < 0.0001) {
							if (Math.abs(dblVelocityZ) < 0.0001) {
								playerHandle.intWalktime = new Date().getTime() / 1000;
							}
						}
					}
					
					{
						Voxel.minecraftskinUpdate(minecraftskinHandle, playerHandle.strTeam, playerHandle.strItem, playerHandle.intWalktime - new Date().getTime() / 1000);
					}
				}
			}
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
			
			if (dblVelocityX > 0.12) {
				dblVelocityX = 0.12;
				
			} else if (dblVelocityX < -0.12) {
				dblVelocityX = -0.12;
				
			} else if (Math.abs(dblVelocityX) < 0.0001) {
				dblVelocityX = 0.0;
				
			}
			
			if (dblVelocityY > 0.18) {
				dblVelocityY = 0.18;
				
			} else if (dblVelocityY < -0.18) {
				dblVelocityY = -0.18;
				
			} else if (Math.abs(dblVelocityY) < 0.0001) {
				dblVelocityY = 0.0;
				
			}
			
			if (dblVelocityZ > 0.12) {
				dblVelocityZ = 0.12;
				
			} else if (dblVelocityZ < -0.12) {
				dblVelocityZ = -0.12;
				
			} else if (Math.abs(dblVelocityZ) < 0.0001) {
				dblVelocityZ = 0.0;
				
			}
			
			physicsHandle.dblPosition[0] = physicsHandle.dblVerlet[0] + dblVelocityX;
			physicsHandle.dblPosition[1] = physicsHandle.dblVerlet[1] + dblVelocityY;
			physicsHandle.dblPosition[2] = physicsHandle.dblVerlet[2] + dblVelocityZ;
		}
		
		{
			physicsHandle.boolCollisionTop = false;
			physicsHandle.boolCollisionSide = false;
			physicsHandle.boolCollisionBottom = false;
			
			for (var intFor1 = -1; intFor1 < 2; intFor1 += 1) {
				for (var intFor2 = -1; intFor2 < 2; intFor2 += 1) {
					for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
						var intX = Math.floor(physicsHandle.dblPosition[0]) + intFor1;
						var intY = Math.floor(physicsHandle.dblPosition[1]) + intFor2;
						var intZ = Math.floor(physicsHandle.dblPosition[2]) + intFor3;
						
						if (intY !== 0) {
							if (Settings.strMapType[[intX, intY, intZ ]] === undefined) {
								continue;
								
							} else if (Settings.strMapType[[intX, intY, intZ ]] === '') {
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
								dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblVoxelX) - 1.0;
								dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblVoxelY) - 1.0;
								dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - dblVoxelZ) - 1.0;
								
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

jQuery(document).ready(function() {
	{
		Settings.init();
		
		Gui.init();
		
		Voxel.init();
		
		Socket.init();
		
		Input.init();
		
		Player.init();
		
		Enemy.init();
		
		Physics.init();
	}
	
	{
		Gui.update();
	}
	
	{
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Gui.intChooserType === 0) {
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionCreate,
							'strType': 'voxelDirt'
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Gui.intChooserType === 0) {
						Socket.socketHandle.emit('voxelHandle', {
							'intCoordinate': Voxel.voxelhighlightHandle.positionDestroy,
							'strType': ''
						});
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryWeapon') {
				if (Gui.intChooserType === 0) {
					
				} else if (Gui.intChooserType === 1) {
					
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
				
				Player.update();
				
				Enemy.update();
			}
			 
			{
				if (Socket.socketHandle !== null) {
					Socket.socketHandle.emit('playerHandle', {
						'a': Player.strItem,
						'b': Player.dblPosition,
						'c': Player.dblVerlet,
						'd': [ Player.minecraftskinHandle.mesh.head.rotation.x, Player.minecraftskinHandle.mesh.rotation.y, 0.0 ]
					});
				}
			}
		});
	}
});