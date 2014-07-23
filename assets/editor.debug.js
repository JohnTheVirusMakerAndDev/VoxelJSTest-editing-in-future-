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
				jQuery(this).find('a')
					.css({
						'background': 'none',
						'background-color': '#F2F2F2'
					})
				;
				
				if (Settings.strChooser === 'chooserCreate') {
					jQuery(this).find('a').eq(0)
						.css({
							'background': 'none',
							'background-color': '#FFFFFF'
						})
					;
					
				} else if (Settings.strChooser === 'chooserDestroy') {
					jQuery(this).find('a').eq(1)
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
					var objectHandle = {
						'intMapDatabase': {}
					};
					
					if (Voxel.voxelengineHandle !== null) {
						for (var intFor1 = -64; intFor1 < 64; intFor1 += 1) {
							for (var intFor2 = -64; intFor2 < 64; intFor2 += 1) {
								for (var intFor3 = -64; intFor3 < 64; intFor3 += 1) {
									var intType = Voxel.voxelengineHandle.getBlock([intFor1, intFor2, intFor3]);
									
									if (intType === 0) {
										continue;
										
									} else if (intType === 64) {
										continue;
										
									}
									
									{
										objectHandle.intMapDatabase[intFor1 + ':' + intFor2 + ':' + intFor3] = intType;
									}
								}
							}
						}
					}
					
					strJson = JSON.stringify(objectHandle);
				}
				
				jQuery(this)
					.text(strJson)
				;
			})
		;

		jQuery('#idMap_Json')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idMap_Generate')
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
});

var Settings = {
	strMode: '',
	strChooser: '',
	
	init: function() {
		{
			Settings.strMode = 'modeMenu';
			
			Settings.strChooser = '';
		}
	},
	
	dispel: function() {
		{
			Settings.strMode = '';
			
			Settings.strChooser = '';
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
					if (Settings.strChooser === 'chooserCreate') {
						return true;
						
					} else if (Settings.strChooser === 'chooserDestroy') {
						return true;
						
					}
					
					return true;
				},
				'distance': 8,
				'wireframeLinewidth': 16,
				'wireframeOpacity': 1.0,
				'color': 0xFFFFFF,
				'adjacentActive': function() {
					if (Settings.strChooser === 'chooserCreate') {
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
									Settings.strChooser = 'chooserCreate';
								}
								
								{
									jQuery('#idPhaseBuild_Chooser')
										.trigger('update')
									;
								}
								
							} else if (eventHandle.keyCode === 50) {
								{
									Settings.strChooser = 'chooserDestroy';
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
			if (Settings.strChooser === 'chooserCreate') {
				{
					if (Voxel.voxelhighlightHandle.positionCreate !== null) {
						{
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('dirt'));
						}
					}
				}
				
			} else if (Settings.strChooser === 'chooserDestroy') {
				{
					if (Voxel.voxelhighlightHandle.positionDestroy !== null) {
						{
							Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
						}
					}
				}
				
			}
		});
	}
});