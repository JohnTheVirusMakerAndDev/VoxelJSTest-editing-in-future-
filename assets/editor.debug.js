var Constants = {
	intPlayerMaxhealth: 100,
	dblPlayerSize: [ 1.0, 1.6, 1.0 ],
	dblPlayerGravity: [ 0.0, 0.0, 0.0 ],
	dblPlayerMaxvel: [ 0.12, 0.26, 0.12 ],
	dblPlayerFriction: [ 0.8, 0.8, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ]
};

var Settings = {
	strMapType: {},
	
	init: function() {
		{
			Settings.strMapType = {};
		}
	},
	
	dispel: function() {
		{
			Settings.strMapType = {};
		}
	}
};

var Gui = {
	strMode: '',
	
	strChooserCategory: '',
	intChooserType: '',
	
	init: function() {
		{
			Gui.strMode = 'modeMenu';
		}
		
		{
			Gui.strChooserCategory = '';
			
			Gui.intChooserType = 0;
		}
		
		{
			jQuery('#idMap_Json')
				.off('update')
				.on('update', function() {
					{
						jQuery(this)
							.val(JSON.stringify(Settings.strMapType))
						;
					}
				})
			;

			jQuery('#idMap_Json')
				.trigger('update')
			;
		}
		
		{
			jQuery('#idMap_Save')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-disk'
					}
				})
				.off('click')
				.on('click', function() {
					{
						jQuery('#idMap_Json')
							.trigger('update')
						;
					}
				})
			;
		}
		
		{
			jQuery('#idMap_Load')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-folder-open'
					}
				})
				.off('click')
				.on('click', function() {
					{
					    for (var intCoordinate in Settings.strMapType) {
							var strType = Settings.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), 0);
							}
					    }
					}
					
					{
						Settings.strMapType = JSON.parse(jQuery('#idMap_Json').val());
					}
					
					{
					    for (var intCoordinate in Settings.strMapType) {
							var strType = Settings.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), Voxel.voxelengineHandle.materials.find(strType));
							}
					    }
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
				
				jQuery('#idToolbar')
					.css({
						'display': 'none'
					})
				;
				
				jQuery('#idMap')
					.css({
						'display': 'none'
					})
				;
			}
			
			{
				if (Gui.strMode === 'modeMenu') {
					jQuery('#idMap')
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
				jQuery('#idPhaseBuild_Chooser').find('select')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				jQuery('#idPhaseBuild_Chooser').find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
			}
			
			{
				if (Gui.strChooserCategory === 'categoryCreate') {
					jQuery('#idPhaseBuild_Chooser').find('select').eq(0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery('#idPhaseBuild_Chooser').find('select').eq(0).find('option').eq(Gui.intChooserType + 0)
					    .prop({
					        'selected': true
					    })
					;
					
				} else if (Gui.strChooserCategory === 'categorySpecial') {
					jQuery('#idPhaseBuild_Chooser').find('select').eq(1)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery('#idPhaseBuild_Chooser').find('select').eq(1).find('option').eq(Gui.intChooserType + 0)
					    .prop({
					        'selected': true
					    })
					;
					
				} else if (Gui.strChooserCategory === 'categoryDestroy') {
					jQuery('#idPhaseBuild_Chooser').find('button').eq(Gui.intChooserType + 0)
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
	
	init: function() {
		{
			// TODO: override dependencies
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './images/',
				'generate': function(intX, intY, intZ) {
					if (intY === 0) {
						return 1;
					}
					
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
						
					} else if (Gui.strChooserCategory === 'categorySpecial') {
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
						
					} if (Gui.strChooserCategory === 'categorySpecial') {
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
			
			Voxel.minecraftskinCreate = null;

			Voxel.minecraftskinUpdate = null;
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
					if (jQuery('#idMap_Json').is(':focus') === true) {
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
							
							{
								if (eventHandle.keyCode === 49) {
									{
										Gui.strChooserCategory = 'categoryCreate';
										
										Gui.intChooserType = (Gui.intChooserType + 1) % 5;
									}
									
									{
										Gui.update();
									}
									
								} else if (eventHandle.keyCode === 50) {
									{
										Gui.strChooserCategory = 'categorySpecial';
										
										Gui.intChooserType = (Gui.intChooserType + 1) % 5;
									}
									
									{
										Gui.update();
									}
									
								} else if (eventHandle.keyCode === 51) {
									{
										Gui.strChooserCategory = 'categoryDestroy';
										
										Gui.intChooserType = 0;
									}
									
									{
										Gui.update();
									}
									
								}
							}
							
						}
					}
				})
				.off('keyup')
				.on('keyup', function(eventHandle) {
					if (jQuery('#idMap_Json').is(':focus') === true) {
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
	
	dblPosition: [ 0.0, 0.0, 0.0 ],
	dblVerlet: [ 0.0, 0.0, 0.0 ],
	dblAcceleration: [ 0.0, 0.0, 0.0 ],
	
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
			Player.dblPosition[0] = 0.0;
			Player.dblPosition[1] = 1.0;
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
	},
	
	dispel: function() {
		{
			Player.minecraftskinHandle = null;
		}
		
		{
			Player.physicsHandle = null;
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
				Player.dblAcceleration[1] += 0.03;
			}
			
			if (Input.boolShift === true) {
				Player.dblAcceleration[1] -= 0.03;
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
			Player.minecraftskinHandle.mesh.position.x = Player.dblPosition[0];
			Player.minecraftskinHandle.mesh.position.y = Player.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
			Player.minecraftskinHandle.mesh.position.z = Player.dblPosition[2];
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
		
		Input.init();
		
		Player.init();
		
		Physics.init();
	}
	
	{
		Gui.update();
	}
	
	{
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Voxel.voxelhighlightHandle.positionCreate[1] !== 0) {
						if (Gui.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBrick'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBrick';
							
						} else if (Gui.intChooserType === 1) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelDirt'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelDirt';
							
						} else if (Gui.intChooserType === 2) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelGrass'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelGrass';
							
						} else if (Gui.intChooserType === 3) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelPlank'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelPlank';
							
						} else if (Gui.intChooserType === 4) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelStone'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelStone';
							
						}
					}
				}
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Voxel.voxelhighlightHandle.positionCreate[1] !== 0) {
						if (Gui.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelRedSpawn'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelRedSpawn';
							
						} else if (Gui.intChooserType === 1) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelRedFlag'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelRedFlag';
							
						} else if (Gui.intChooserType === 2) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBlueSpawn'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBlueSpawn';
							
						} else if (Gui.intChooserType === 3) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBlueFlag'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBlueFlag';
							
						} else if (Gui.intChooserType === 4) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelSeparator'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelSeparator';
							
						}
					}
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Voxel.voxelhighlightHandle.positionDestroy[1] !== 0) {
						if (Gui.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
							
							delete Settings.strMapType[Voxel.voxelhighlightHandle.positionDestroy];
						}
					}
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
				
				Player.update();
			}
		});
	}
});