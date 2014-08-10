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
		
		/*{
			jQuery('#idPhaseBuild_Chooser').find('select').find('option').eq(0)
			    .prop({
			        'selected': true
			    })
			;
			
			jQuery('#idPhaseBuild_Chooser').find('select')
				.selectmenu({
					'disabled': false,
					'width': 200
				})
			;

			jQuery('#idPhaseBuild_Chooser').find('select').next()
				.css({
					'vertical-align': 'middle'
				})
			;
		}*/
		
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
						var objectMap = JSON.parse(jQuery('#idMap_Json').val());
						
						{
							Settings.strMapType = objectMap.strMapType;
						}
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
	
	voxelflyHandle: null,
	
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
						
					} else if (Gui.strChooserCategory === 'categorySpecial') {
						return true;
						
					} else if (Gui.strChooserCategory === 'categoryDestroy') {
						return true;
						
					}
					
					return true;
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
			
			Voxel.minecraftskinUpdate = function(minecraftskinHandle, strTeam, strItem, intAnimtime) {
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
					
					minecraftskinHandle.rightArm.rotation.z = 2 * Math.cos((6.666 * intAnimtime) + (0.5 * Math.PI) + Math.PI + dblItem);
					minecraftskinHandle.leftArm.rotation.z = 2 * Math.cos((6.666 * intAnimtime) + (0.5 * Math.PI));
					
					minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((6.666 * intAnimtime) + (0.5 * Math.PI));
					minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((6.666 * intAnimtime) + (0.5 * Math.PI) + Math.PI);
				}
			};
		}
		
		{
			Voxel.voxelflyHandle = require('voxel-fly')(Voxel.voxelengineHandle);
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
			Voxel.voxelflyHandle = null;
		}
	}
};

var Input = {
	init: function() {
		{
			jQuery(document.body)
				.off('keydown')
				.on('keydown', function(eventHandle) {
					if (Gui.strMode === 'modeMenu') {
						if (eventHandle.keyCode === 9) {
							{
								Gui.strMode = 'modeGame';
							}
							
							{
								Gui.update();
							}
						}
						
					} else if (Gui.strMode === 'modeGame') {
						if (eventHandle.keyCode === 9) {
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
	
	init: function() {
		{
			Player.minecraftskinHandle = Voxel.minecraftskinCreate();
			
			Player.physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinHandle.mesh);

			{
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
			Voxel.voxelengineHandle.control(Player.physicsHandle);
		}
		
		{
			Voxel.voxelflyHandle(Voxel.voxelengineHandle.controls.target());
		}
	},
	
	dispel: function() {
		{
			Player.minecraftskinHandle = null;
			
			Player.physicsHandle = null;
		}
	}
};

jQuery(document).ready(function() {
	{
		Settings.init();
		
		Gui.init();
		
		Voxel.init();
		
		Input.init();
		
		Player.init();
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
	}
});