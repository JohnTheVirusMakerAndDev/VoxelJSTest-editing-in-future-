jQuery(document).ready(function() {
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
				'display': 'inline-block'
			})
		;
	}
	
	{
		jQuery('#idPhaseBuild_Chooser')
			.off('update')
			.on('update', function() {
				jQuery(this).find('select').next()
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				jQuery(this).find('button')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				if (Settings.strChooserCategory === 'categoryCreate') {
					jQuery(this).find('select').eq(0).next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').eq(0).find('option').eq(Settings.intChooserType + 0)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select').eq(0)
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserCategory === 'categorySpecial') {
					jQuery(this).find('select').eq(1).next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').eq(1).find('option').eq(Settings.intChooserType + 0)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select').eq(1)
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserCategory === 'categoryDestroy') {
					jQuery(this).find('button').eq(Settings.intChooserType + 0)
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
	}
	
	{
		jQuery('#idMap')
			.css({
				'visibility': 'visible'
			})
		;
	}
	
	{
		jQuery('#idMap_Json')
			.off('update')
			.on('update', function() {
				jQuery(this)
					.val(JSON.stringify(Settings.strMapType))
				;
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
});

var Settings = {
	strMode: '',
	
	strChooserCategory: '',
	intChooserType: 0,

	strMapType: {},
	
	init: function() {
		{
			Settings.strMode = 'modeMenu';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.intChooserType = 0;
		}
		
		{
			Settings.strMapType = {};
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
			Settings.strMapType = {};
		}
	}
};

var Voxel = {
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	minecraftskinFunction: null,
	
	voxelflyHandle: null,
	
	init: function() {
		{
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
					if (Settings.strChooserCategory === 'categoryCreate') {
						return true;
						
					} else if (Settings.strChooserCategory === 'categorySpecial') {
						return true;
						
					} else if (Settings.strChooserCategory === 'categoryDestroy') {
						return true;
						
					}
					
					return true;
				},
				'distance': 8,
				'wireframeLinewidth': 16,
				'wireframeOpacity': 1.0,
				'color': 0xFFFFFF,
				'adjacentActive': function() {
					if (Settings.strChooserCategory === 'categoryCreate') {
						return true;
						
					} if (Settings.strChooserCategory === 'categorySpecial') {
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
			
			Voxel.minecraftskinFunction = null;
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
					if (Settings.strMode === 'modeMenu') {
						if (eventHandle.keyCode === 9) {
							{
								Settings.strMode = 'modeGame';
							}
							
							{
								jQuery('#idMap')
									.css({
										'visibility': 'hidden'
									})
								;
							}
							
							{
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
								jQuery('#idMap')
									.css({
										'visibility': 'visible'
									})
								;
							}
							
							{
								jQuery('#idToolbar')
									.css({
										'display': 'none'
									})
								;
							}
						}
						
						{
							if (eventHandle.keyCode === 49) {
								{
									if (Settings.strChooserCategory !== 'categoryCreate') {
										Settings.intChooserType = -1;
									}
									
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.intChooserType = (Settings.intChooserType + 1) % 5;
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 50) {
								{
									if (Settings.strChooserCategory !== 'categorySpecial') {
										Settings.intChooserType = -1;
									}
									
									Settings.strChooserCategory = 'categorySpecial';
									
									Settings.intChooserType = (Settings.intChooserType + 1) % 5;
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 51) {
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
			Player.minecraftskinHandle = Voxel.minecraftskinFunction('./images/skinRed.png');
			
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
		
		Voxel.init();
		
		Input.init();
		
		Player.init();
	}
	
	{
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Settings.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Voxel.voxelhighlightHandle.positionCreate[1] !== 0) {
						if (Settings.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBrick'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBrick';
							
						} else if (Settings.intChooserType === 1) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelDirt'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelDirt';
							
						} else if (Settings.intChooserType === 2) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelGrass'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelGrass';
							
						} else if (Settings.intChooserType === 3) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelPlank'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelPlank';
							
						} else if (Settings.intChooserType === 4) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelStone'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelStone';
							
						}
					}
				}
				
			} else if (Settings.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Voxel.voxelhighlightHandle.positionCreate[1] !== 0) {
						if (Settings.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelRedSpawn'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelRedSpawn';
							
						} else if (Settings.intChooserType === 1) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelRedFlag'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelRedFlag';
							
						} else if (Settings.intChooserType === 2) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBlueSpawn'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBlueSpawn';
							
						} else if (Settings.intChooserType === 3) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBlueFlag'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBlueFlag';
							
						} else if (Settings.intChooserType === 4) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelSeparator'));
							
							Settings.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelSeparator';
							
						}
					}
				}
				
			} else if (Settings.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Voxel.voxelhighlightHandle.positionDestroy[1] !== 0) {
						if (Settings.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
							
							delete Settings.strMapType[Voxel.voxelhighlightHandle.positionDestroy];
						}
					}
				}
				
			}
		});
	}
});