var Constants = {
	dblPlayerSize: [ 1.0, 1.6, 1.0 ],
	dblPlayerGravity: [ 0.0, -0.01, 0.0 ],
	dblPlayerMaxvel: [ 0.12, 0.26, 0.12 ],
	dblPlayerFriction: [ 0.8, 1.0, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ],

	dblFlagSize: [ 1.0, 1.0, 1.0 ],
	dblFlagGravity: [ 0.0, -0.01, 0.0 ],
	dblFlagMaxvel: [ 0.12, 0.26, 0.12 ],
	dblFlagFriction: [ 0.8, 1.0, 0.8 ],
	
	dblArrowSize: [ 0.3, 0.3, 0.3],
	dblArrowGravity: [ 0.0, -0.001, 0.0 ],
	dblArrowMaxvel: [ 0.26 ],
	dblArrowFriction: [ 1.0, 1.0, 1.0 ]
};

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
					minecraftskinHandle.meshPickaxe = Voxel.itemCreate('itemPickaxe', 1.0);
					
					minecraftskinHandle.meshPickaxe.position.x = 0.0 + 6.0;
					minecraftskinHandle.meshPickaxe.position.y = 0.0 - 9.5;
					minecraftskinHandle.meshPickaxe.position.z = 0.0;
					
					minecraftskinHandle.meshPickaxe.rotation.x = 0.0;
					minecraftskinHandle.meshPickaxe.rotation.y = 0.0;
					minecraftskinHandle.meshPickaxe.rotation.z = 1.25 * Math.PI;
				}
				
				{
					minecraftskinHandle.meshSword = Voxel.itemCreate('itemSword', 1.0);
					
					minecraftskinHandle.meshSword.position.x = 0.0 + 7.0;
					minecraftskinHandle.meshSword.position.y = 0.0 - 9.5;
					minecraftskinHandle.meshSword.position.z = 0.0;
					
					minecraftskinHandle.meshSword.rotation.x = 0.0;
					minecraftskinHandle.meshSword.rotation.y = 0.0;
					minecraftskinHandle.meshSword.rotation.z = 1.25 * Math.PI;
				}
				
				{
					minecraftskinHandle.meshBow = Voxel.itemCreate('itemBow', 1.0);
					
					minecraftskinHandle.meshBow.position.x = 0.0;
					minecraftskinHandle.meshBow.position.y = 0.0 - 6.0;
					minecraftskinHandle.meshBow.position.z = 0.0;
					
					minecraftskinHandle.meshBow.rotation.x = 0.0;
					minecraftskinHandle.meshBow.rotation.y = 0.0;
					minecraftskinHandle.meshBow.rotation.z = 1.25 * Math.PI;
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
					if (strItem === '') {
						minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI));
						minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						
						minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI));
						
					} else if (strItem === 'itemPickaxe') {
						minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI) + (0.1 * Math.PI));
						minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						
						minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI));
						
					} else if (strItem === 'itemSword') {
						minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI) + (0.1 * Math.PI));
						minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						
						minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI));
						
					} else if (strItem === 'itemBow') {
						minecraftskinHandle.rightArm.rotation.z = minecraftskinHandle.mesh.head.rotation.x + (0.47 * Math.PI);
						minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						
						minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (0.5 * Math.PI));
						minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intWalktime) + (1.5 * Math.PI));
						
					}
				}
			};
		}
		
		{
			Voxel.itemCreate = function(strItem, dblScale) {
				if (Voxel.itemGeometry[strItem + ' - ' + dblScale] === undefined) {
					var contextHandle = document.createElement('canvas').getContext('2d');
					
					{
						if (strItem === 'itemPickaxe') {
							contextHandle.drawImage(jQuery('#idItemPickaxe').get(0), 0, 0);
							
						} else if (strItem === 'itemSword') {
							contextHandle.drawImage(jQuery('#idItemSword').get(0), 0, 0);

						} else if (strItem === 'itemBow') {
							contextHandle.drawImage(jQuery('#idItemBow').get(0), 0, 0);

						} else if (strItem === 'itemArrow') {
							contextHandle.drawImage(jQuery('#idItemArrow').get(0), 0, 0);

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
									var cubegeometryHandle = new Voxel.voxelengineHandle.THREE.CubeGeometry(dblScale, dblScale, dblScale);
									
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
											cubegeometryHandle.vertices[intFor3].x += dblScale * (8 - intFor1);
											cubegeometryHandle.vertices[intFor3].y += dblScale * (8 - intFor2);
											cubegeometryHandle.vertices[intFor3].z += 0.0;
										}
									}
									
									Voxel.voxelengineHandle.THREE.GeometryUtils.merge(geometryHandle, cubegeometryHandle);
								}
							}
						}
					}
					
					{
						Voxel.itemGeometry[strItem + ' - ' + dblScale] = geometryHandle;
					}
				}
				
				return new Voxel.voxelengineHandle.THREE.Mesh(Voxel.itemGeometry[strItem + ' - ' + dblScale], Voxel.itemMaterial);
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

	enemyHandle: {},
	
	itemHandle: {},
	
	init: function() {
		{
			Socket.socketHandle = null;
		}
		
		{
			Socket.intPing = 0;
		}
		
		{
			Socket.enemyHandle = {};
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
				
				Socket.socketHandle.on('loginHandle', function(jsonHandle) {
					{
						if (jsonHandle.strType === 'typeReject') {
							{
								Gui.strMode = 'modeLogin';
							}
							
							{
								Gui.update();
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
							
							{
								Gui.update();
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
							.val(jsonHandle.serverHandle.strMapActive)
						;
						
						jQuery('#idServer_Phase')
							.html(jsonHandle.serverHandle.strPhaseActive + '<div style="padding:0.8em 0.0em 0.0em 0.0em; font-size:10px;">with ' + jsonHandle.serverHandle.intPhaseRemaining + ' seconds remainin and ' + jsonHandle.serverHandle.intPhaseRound + ' rounds left</div>')
						;
						
						jQuery('#idServer_Players')
							.val(jsonHandle.serverHandle.intPlayerActive + ' / ' + jsonHandle.serverHandle.intPlayerCapacity)
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
				
				Socket.socketHandle.on('settingsHandle', function(jsonHandle) {
					{
					    for (var intCoordinate in Settings.strMapType) {
							var strType = Settings.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), 0);
							}
					    }
					}
					
					{
						Settings.strMapType = jsonHandle.strMapType;
					}
					
					{
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
						Gui.strChooserCategory = '';
						
						Gui.intChooserType = 0;
					}
					
					{
						Gui.update();
					}
					
					{
						Player.strItem = '';
					}
				});
				
				Socket.socketHandle.on('playerHandle', function(jsonHandle) {
					{
						Player.strTeam = jsonHandle.strTeam;
					}
					
					{
						Player.dblPosition[0] = jsonHandle.dblPosition[0];
						Player.dblPosition[1] = jsonHandle.dblPosition[1];
						Player.dblPosition[2] = jsonHandle.dblPosition[2];

						Player.dblVerlet[0] = Player.dblPosition[0];
						Player.dblVerlet[1] = Player.dblPosition[1];
						Player.dblVerlet[2] = Player.dblPosition[2];

						Player.dblAcceleration[0] = 0.0;
						Player.dblAcceleration[1] = 0.0;
						Player.dblAcceleration[2] = 0.0;
					}
				});
				
				Socket.socketHandle.on('enemyHandle', function(jsonHandle) {
					{
						var enemyOverwrite = {};
						
						for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
							var enemyHandle = jsonHandle[intFor1];

							{
								enemyHandle.strIdent = enemyHandle.a;
								enemyHandle.strTeam = enemyHandle.b;
								enemyHandle.strItem = enemyHandle.c;
								enemyHandle.dblPosition = enemyHandle.d;
								enemyHandle.dblVerlet = enemyHandle.e;
								enemyHandle.dblRotation = enemyHandle.f;
							}
							
							{
								if (Socket.enemyHandle.hasOwnProperty(enemyHandle.strIdent) === true) {
									Physics.updateOverwrite(enemyHandle, Socket.enemyHandle[enemyHandle.strIdent]);
								}
							}
							
							{
								enemyOverwrite[enemyHandle.strIdent] = {
									'strIdent': enemyHandle.strIdent,
									'strTeam': enemyHandle.strTeam,
									'strItem': enemyHandle.strItem,
									'dblPosition': enemyHandle.dblPosition,
									'dblVerlet': enemyHandle.dblVerlet,
									'dblAcceleration': [ 0.0, 0.0, 0.0 ],
									'dblRotation': enemyHandle.dblRotation,
									'intWalktime': 0
								};
							}
						}
						
						Socket.enemyHandle = enemyOverwrite;
					}
				});
				
				Socket.socketHandle.on('itemHandle', function(jsonHandle) {
					{
						var itemOverwrite = {};
						
						for (var intFor1 = 0; intFor1 < jsonHandle.length; intFor1 += 1) {
							var itemHandle = jsonHandle[intFor1];

							{
								itemHandle.strIdent = itemHandle.a;
								itemHandle.strItem = itemHandle.b;
								itemHandle.dblPosition = itemHandle.c;
								itemHandle.dblVerlet = itemHandle.d;
								itemHandle.dblRotation = itemHandle.e;
							}
							
							{
								if (Socket.itemHandle.hasOwnProperty(itemHandle.strIdent) === true) {
									Physics.updateOverwrite(itemHandle, Socket.itemHandle[itemHandle.strIdent]);
								}
							}
							
							{
								itemOverwrite[itemHandle.strIdent] = {
									'strIdent': itemHandle.strIdent,
									'strTeam': itemHandle.strTeam,
									'strItem': itemHandle.strItem,
									'dblPosition': itemHandle.dblPosition,
									'dblVerlet': itemHandle.dblVerlet,
									'dblAcceleration': [ 0.0, 0.0, 0.0 ],
									'dblRotation': itemHandle.dblRotation
								};
							}
						}
						
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
				
				setInterval(function() {
					{
						Socket.intPing = new Date().getTime();
					}
					
					{
						Socket.socketHandle.emit('pingHandle', {
							'intTimestamp': new Date().getTime()
						});
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
			Socket.enemyHandle = {};
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

	intJumpcount: 0,
	
	intWalktime: 0,
	
	init: function() {
		{
			Player.minecraftskinHandle = Voxel.minecraftskinCreate();
			
			{
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
			Player.intJumpcount = 0;
		}
		
		{
			Player.intWalktime = 0; 
		}
	},
	
	update: function() {
		{
			if (Input.boolUp === true) {
				Player.dblAcceleration[0] -= 0.03 * Math.sin(Player.minecraftskinHandle.mesh.rotation.y);
				Player.dblAcceleration[2] -= 0.03 * Math.cos(Player.minecraftskinHandle.mesh.rotation.y);
			}
			
			if (Input.boolDown === true) {
				Player.dblAcceleration[0] += 0.03 * Math.sin(Player.minecraftskinHandle.mesh.rotation.y);
				Player.dblAcceleration[2] += 0.03 * Math.cos(Player.minecraftskinHandle.mesh.rotation.y);
			}
			
			if (Input.boolLeft === true) {
				Player.dblAcceleration[0] -= 0.03 * Math.sin(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
				Player.dblAcceleration[2] -= 0.03 * Math.cos(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
			}
			
			if (Input.boolRight === true) {
				Player.dblAcceleration[0] += 0.03 * Math.sin(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
				Player.dblAcceleration[2] += 0.03 * Math.cos(Player.minecraftskinHandle.mesh.rotation.y + (0.5 * Math.PI));
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
			Player.dblSize = Constants.dblPlayerSize;
			Player.dblGravity = Constants.dblPlayerGravity;
			Player.dblMaxvel = Constants.dblPlayerMaxvel;
			Player.dblFriction = Constants.dblPlayerFriction;
			
			Physics.update(Player);
		}
		
		{
			if (Player.boolCollisionBottom === true) {
				Player.intJumpcount = 1;
			}
		}

		{
			Player.minecraftskinHandle.mesh.position.x = Player.dblPosition[0];
			Player.minecraftskinHandle.mesh.position.y = Player.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
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
			for (var strIdent in Socket.enemyHandle) {
				var enemyHandle = Socket.enemyHandle[strIdent];
				
				{
					enemyHandle.dblSize = Constants.dblPlayerSize;
					enemyHandle.dblGravity = Constants.dblPlayerGravity;
					enemyHandle.dblMaxvel = Constants.dblPlayerMaxvel;
					enemyHandle.dblFriction = Constants.dblPlayerFriction;
					
					Physics.update(enemyHandle);
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
						minecraftskinHandle.mesh.position.x = enemyHandle.dblPosition[0];
						minecraftskinHandle.mesh.position.y = enemyHandle.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
						minecraftskinHandle.mesh.position.z = enemyHandle.dblPosition[2];
						
						minecraftskinHandle.mesh.rotation.y = enemyHandle.dblRotation[1];

						minecraftskinHandle.mesh.head.rotation.x = enemyHandle.dblRotation[2];
					}
					
					{
						var dblVelocityX = enemyHandle.dblPosition[0] - enemyHandle.dblVerlet[0];
						var dblVelocityY = enemyHandle.dblPosition[1] - enemyHandle.dblVerlet[1];
						var dblVelocityZ = enemyHandle.dblPosition[2] - enemyHandle.dblVerlet[2];
						
						if (Math.abs(dblVelocityX) < 0.0001) {
							if (Math.abs(dblVelocityZ) < 0.0001) {
								enemyHandle.intWalktime = new Date().getTime() / 1000;
							}
						}
					}
					
					{
						Voxel.minecraftskinUpdate(minecraftskinHandle, enemyHandle.strTeam, enemyHandle.strItem, enemyHandle.intWalktime - new Date().getTime() / 1000);
					}
				}
			}
		}
	}
};

var Item = {
	meshRedFlag: null,
	
	meshBlueFlag: null,
	
	meshArrow: [],
	
	init: function() {
		{
			Item.meshRedFlag = Voxel.itemCreate('itemRedFlag', 0.04);
			
			Voxel.voxelengineHandle.scene.add(Item.meshRedFlag);
		}
		
		{
			Item.meshBlueFlag = Voxel.itemCreate('itemBlueFlag', 0.04);
			
			Voxel.voxelengineHandle.scene.add(Item.meshBlueFlag);
		}
		
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var meshHandle = Voxel.itemCreate('itemArrow', 0.04);
					
					Item.meshArrow.push(meshHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Item.meshRedFlag = null;
		}
		
		{
			Item.meshBlueFlag = null;
		}
		
		{
			Item.meshArrow = [];
		}
	},
	
	update: function() {
		{
			for (var strIdent in Socket.itemHandle) {
				var itemHandle = Socket.itemHandle[strIdent];
				
				if (itemHandle.strItem !== 'itemFlag') {
					continue;
				}
				
				{
					itemHandle.dblSize = Constants.dblFlagSize;
					itemHandle.dblGravity = Constants.dblFlagGravity;
					itemHandle.dblMaxvel = Constants.dblFlagMaxvel;
					itemHandle.dblFriction = Constants.dblFlagFriction;
					
					Physics.update(itemHandle);
				}

				{
					var meshHandle = null;
					
					{
						if (itemHandle.strIdent === 'itemRedFlag') {
							meshHandle = Item.meshRedFlag;
							
						} else if (itemHandle.strIdent === 'itemBlueFlag') {
							meshHandle = Item.meshBlueFlag;
							
						}
					}
					
					{
						meshHandle.position.x = itemHandle.dblPosition[0];
						meshHandle.position.y = itemHandle.dblPosition[1];
						meshHandle.position.z = itemHandle.dblPosition[2];
						
						meshHandle.rotation.x = itemHandle.dblRotation[0];
						meshHandle.rotation.y = itemHandle.dblRotation[1];
						meshHandle.rotation.z = itemHandle.dblRotation[2];
					}
				}
			}
		}
		
		{
			{
				for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
					var meshHandle = Item.meshArrow[intFor1];

					if (meshHandle.parent === undefined) {
						continue;
					}
					
					{
						Voxel.voxelengineHandle.scene.remove(meshHandle);
					}
				}
			}
			
			{
				for (var strIdent in Socket.itemHandle) {
					var itemHandle = Socket.itemHandle[strIdent];
					
					if (itemHandle.strItem !== 'itemArrow') {
						continue;
					}
					
					{
						itemHandle.dblSize = Constants.dblArrowSize;
						itemHandle.dblGravity = Constants.dblArrowGravity;
						itemHandle.dblMaxvel = Constants.dblArrowMaxvel;
						itemHandle.dblFriction = Constants.dblArrowFriction;
						
						Physics.update(itemHandle);
					}
					
					{
						var dblVelocityX = itemHandle.dblPosition[0] - itemHandle.dblVerlet[0];
						var dblVelocityY = itemHandle.dblPosition[1] - itemHandle.dblVerlet[1];
						var dblVelocityZ = itemHandle.dblPosition[2] - itemHandle.dblVerlet[2];
						
						itemHandle.dblRotation[0] = 0.0;
						itemHandle.dblRotation[1] = Math.atan2(dblVelocityX, dblVelocityZ) + (1.0 * Math.PI);
						itemHandle.dblRotation[2] = Math.atan2(dblVelocityY, Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityZ * dblVelocityZ)));
					}
					
					{
						if (itemHandle.boolCollisionTop === true) {
							continue;
							
						} else if (itemHandle.boolCollisionSide === true) {
							continue;
							
						} else if (itemHandle.boolCollisionBottom === true) {
							continue;
							
						}
					}

					{
						var meshHandle = null;
						
						{
							for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
								if (Item.meshArrow[intFor1].parent !== undefined) {
									continue;
								}
								
								{
									meshHandle = Item.meshArrow[intFor1];
								}
								
								{
									break;
								}
							}
						}
						
						{
							Voxel.voxelengineHandle.scene.add(meshHandle);
						}
						
						{
							meshHandle.position.x = itemHandle.dblPosition[0];
							meshHandle.position.y = itemHandle.dblPosition[1];
							meshHandle.position.z = itemHandle.dblPosition[2];
							
							meshHandle.rotation.x = itemHandle.dblRotation[0];
							meshHandle.rotation.y = itemHandle.dblRotation[1] + (0.5 * Math.PI);
							meshHandle.rotation.z = itemHandle.dblRotation[2] + (1.25 * Math.PI);
						}
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
			physicsHandle.dblAcceleration[0] += physicsHandle.dblGravity[0];
			physicsHandle.dblAcceleration[1] += physicsHandle.dblGravity[1];
			physicsHandle.dblAcceleration[2] += physicsHandle.dblGravity[2];
		}
		
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

			{
				dblVelocityX *= physicsHandle.dblFriction[0];
				dblVelocityY *= physicsHandle.dblFriction[1];
				dblVelocityZ *= physicsHandle.dblFriction[2];
			}
			
			{
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
	},
	
	updateObjectcol: function(physicsHandle, physicsObjectcol) {
		var boolObjectcol = true;
		
		{
			var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - physicsObjectcol.dblPosition[0]) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * physicsObjectcol.dblSize[0]);
			var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - physicsObjectcol.dblPosition[1]) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * physicsObjectcol.dblSize[1]);
			var dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - physicsObjectcol.dblPosition[2]) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * physicsObjectcol.dblSize[2]);

			if (dblIntersectX >= 0.0) {
				boolObjectcol = false;

			} else if (dblIntersectY >= 0.0) {
				boolObjectcol = false;

			} else if (dblIntersectZ >= 0.0) {
				boolObjectcol = false;

			}
		}
		
		return boolObjectcol;
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
		
		Item.init();
		
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
					Socket.socketHandle.emit('weaponHandle', {
						'strWeapon': 'weaponSword'
					});
					
				} else if (Gui.intChooserType === 1) {
					Socket.socketHandle.emit('weaponHandle', {
						'strWeapon': 'weaponBow'
					});
					
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
				
				Player.update();
				
				Enemy.update();
				
				Item.update();
			}
			 
			{
				if (Socket.socketHandle !== null) {
					Socket.socketHandle.emit('playerHandle', {
						'a': Player.strItem,
						'b': Player.dblPosition,
						'c': Player.dblVerlet,
						'd': [ 0.0, Player.minecraftskinHandle.mesh.rotation.y, Player.minecraftskinHandle.mesh.head.rotation.x ]
					});
				}
			}
		});
	}
});