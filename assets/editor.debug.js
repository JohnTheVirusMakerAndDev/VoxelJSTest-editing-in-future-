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
				
				if (Settings.strChooserType === 'typeBrick') {
					jQuery(this).find('select').next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').find('option').eq(0)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select')
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserType === 'typeDirt') {
					jQuery(this).find('select').next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').find('option').eq(1)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select')
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserType === 'typeGrass') {
					jQuery(this).find('select').next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').find('option').eq(2)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select')
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserType === 'typePlank') {
					jQuery(this).find('select').next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').find('option').eq(3)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select')
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserType === 'typeStone') {
					jQuery(this).find('select').next()
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
					jQuery(this).find('select').find('option').eq(4)
					    .prop({
					        'selected': true
					    })
					;
					
					jQuery(this).find('select')
						.selectmenu('refresh')
					;
					
				} else if (Settings.strChooserType === 'typeDestroy') {
					jQuery(this).find('button')
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
				'width': 100
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
				var strJson = '';
				
				{	
					strJson = JSON.stringify({
						'intMapDatabase': Settings.intMapDatabase
					});
				}
				
				jQuery(this)
					.val(strJson)
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
					'primary': 'ui-icon-check' // TODO: change icon
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
					'primary': 'ui-icon-check' // TODO: change icon
				}
			})
			.off('click')
			.on('click', function() {
				{
				    for (var intCoordinate in Settings.intMapDatabase) {
						var intType = Settings.intMapDatabase[intCoordinate];
						
						{
							Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), 0);
						}
				    }
				}
				
				{
					var objectMap = JSON.parse(jQuery('#idMap_Json').val());
					
					{
						Settings.intMapDatabase = objectMap.intMapDatabase;
					}
				}
				
				{
				    for (var intCoordinate in Settings.intMapDatabase) {
						var intType = Settings.intMapDatabase[intCoordinate];
						
						{
							Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), intType);
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
	strChooserType: '',

	intMapDatabase: {},
	
	init: function() {
		{
			Settings.strMode = 'modeMenu';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.strChooserType = '';
		}
		
		{
			Settings.intMapDatabase = {};
		}
	},
	
	dispel: function() {
		{
			Settings.strMode = '';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.strChooserType = '';
		}
		
		{
			Settings.intMapDatabase = {};
		}
	}
};

var Voxel = {
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	minecraftskinFunction: null,
	
	init: function() {
		{
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './textures/',
				'generate': function(intX, intY, intZ) {
					if (intY === 0) {
						return 64;
					}
					
					return 0;
				},
				'materials': [ 'brick', 'dirt', 'grass', 'plank', 'stone' ],
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
					
					return true;
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
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.strChooserType = 'typeBrick';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 50) {
								{
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.strChooserType = 'typeDirt';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 51) {
								{
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.strChooserType = 'typeGrass';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 52) {
								{
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.strChooserType = 'typePlank';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 53) {
								{
									Settings.strChooserCategory = 'categoryCreate';
									
									Settings.strChooserType = 'typeStone';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 54) {
								{
									Settings.strChooserCategory = 'categoryDestroy';
									
									Settings.strChooserType = 'typeDestroy';
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
			Player.minecraftskinHandle = Voxel.minecraftskinFunction('./skins/blue.png');
			
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
						if (Settings.strChooserType === 'typeBrick') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('brick'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('brick');
							
						} else if (Settings.strChooserType === 'typeDirt') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('dirt'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('dirt');
							
						} else if (Settings.strChooserType === 'typeGrass') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('grass'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('grass');
							
						} else if (Settings.strChooserType === 'typePlank') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('plank'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('plank');
							
						} else if (Settings.strChooserType === 'typeStone') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('stone'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('stone');
							
						}
					}
				}
				
			} else if (Settings.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Voxel.voxelhighlightHandle.positionDestroy[1] !== 0) {
						if (Settings.strChooserType === 'typeDestroy') {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
							
							delete Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionDestroy];
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
							delete Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionDestroy];
						}
					}
				}
				
			}
		});
	}
});