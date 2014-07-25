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
				var strJson = '';
				
				{	
					strJson = JSON.stringify({
						'intMapRedSpawn': Settings.intMapRedSpawn,
						'intMapRedFlag': Settings.intMapRedFlag,
						'intMapBlueSpawn': Settings.intMapBlueSpawn,
						'intMapBlueFlag': Settings.intMapBlueFlag,
						'intMapSepearator': Settings.intMapSeparator,
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
						Settings.intMapRedSpawn = objectMap.intMapRedSpawn;
						Settings.intMapRedFlag = objectMap.intMapRedFlag;
						Settings.intMapBlueSpawn = objectMap.intMapBlueSpawn;
						Settings.intMapBlueFlag = objectMap.intMapBlueFlag;
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
	intChooserType: 0,

	intMapRedSpawn: [],
	intMapRedFlag: [],
	intMapBlueSpawn: [],
	intMapBlueFlag: [],
	intMapSepearator: [],
	intMapDatabase: {},
	
	init: function() {
		{
			Settings.strMode = 'modeMenu';
		}
		
		{
			Settings.strChooserCategory = '';
			
			Settings.intChooserType = 0;
		}
		
		{
			Settings.intMapRedSpawn = [];
			
			Settings.intMapRedFlag = [];
			
			Settings.intMapBlueSpawn = [];
			
			Settings.intMapBlueFlag = [];
			
			Settings.intMapSeparator = [];
			
			Settings.intMapDatabase = {};
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
			Settings.intMapRedSpawn = [];
			
			Settings.intMapRedFlag = [];
			
			Settings.intMapBlueSpawn = [];
			
			Settings.intMapBlueFlag = [];
			
			Settings.intMapSeparator = [];
			
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
			// TODO: player flyable
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './textures/',
				'generate': function(intX, intY, intZ) {
					if (intY === 0) {
						return 64;
					}
					
					return 0;
				},
				'materials': [ 'brick', 'dirt', 'grass', 'plank', 'stone', 'red spawn', 'red flag', 'blue spawn', 'blue flag', 'separator' ],
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
						if (Settings.intChooserType === 0) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('brick'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('brick');
							
						} else if (Settings.intChooserType === 1) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('dirt'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('dirt');
							
						} else if (Settings.intChooserType === 2) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('grass'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('grass');
							
						} else if (Settings.intChooserType === 3) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('plank'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('plank');
							
						} else if (Settings.intChooserType === 4) {
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('stone'));
							
							Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('stone');
							
						}
					}
				}
				
			} else if (Settings.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate !== null) {
					if (Voxel.voxelhighlightHandle.positionCreate[1] !== 0) {
						if (Settings.intChooserType === 0) {
							{
								Settings.intMapRedSpawn.push(Voxel.voxelhighlightHandle.positionCreate);
							}
							
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('red spawn'));
								
								Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('red spawn');
							}
							
						} else if (Settings.intChooserType === 1) {
							{
								Settings.intMapRedFlag.push(Voxel.voxelhighlightHandle.positionCreate);
							}
							
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('red flag'));
								
								Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('red flag');
							}
							
						} else if (Settings.intChooserType === 2) {
							{
								Settings.intMapBlueSpawn.push(Voxel.voxelhighlightHandle.positionCreate);
							}
							
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('blue spawn'));
								
								Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('blue spawn');
							}
							
						} else if (Settings.intChooserType === 3) {
							{
								Settings.intMapBlueFlag.push(Voxel.voxelhighlightHandle.positionCreate);
							}
							
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('blue flag'));
								
								Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('blue flag');
							}
							
						} else if (Settings.intChooserType === 4) {
							{
								Settings.intMapSeparator.push(Voxel.voxelhighlightHandle.positionCreate);
							}
							
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('separator'));
								
								Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionCreate] = Voxel.voxelengineHandle.materials.find('separator');
							}
							
						}
					}
				}
				
			} else if (Settings.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
					if (Voxel.voxelhighlightHandle.positionDestroy[1] !== 0) {
						if (Settings.intChooserType === 0) {
							{
								Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
								
								delete Settings.intMapDatabase[Voxel.voxelhighlightHandle.positionDestroy];
							}
							
							{
								for (var intFor1 = 0; intFor1 < 5; intFor1 += 1) {
									var intCollection = [];
									
									{
										if (intFor1 === 0) {
											intCollection = Settings.intMapRedSpawn;
											
										} else if (intFor1 === 1) {
											intCollection = Settings.intMapRedFlag;
											
										} else if (intFor1 === 2) {
											intCollection = Settings.intMapBlueSpawn;
											
										} else if (intFor1 === 3) {
											intCollection = Settings.intMapBlueFlag;
											
										} else if (intFor1 === 4) {
											intCollection = Settings.intMapSeparator;
											
										}
									}
									
									{
										var intSearchCollection = -1;
										
										for (var intForSearchCollection = 0; intForSearchCollection < intCollection.length; intForSearchCollection += 1) {
											if (intCollection[intForSearchCollection][0] === Voxel.voxelhighlightHandle.positionDestroy[0]) {
												if (intCollection[intForSearchCollection][1] === Voxel.voxelhighlightHandle.positionDestroy[1]) {
													if (intCollection[intForSearchCollection][2] === Voxel.voxelhighlightHandle.positionDestroy[2]) {
														intSearchCollection = intForSearchCollection;
														
														break;
													}
												}
											}
										}
										
										if (intSearchCollection !== -1) {
											intCollection.splice(intSearchCollection, 1);
										}
									}
								}
							}
						}
					}
				}
				
			}
		});
	}
});