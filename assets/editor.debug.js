var Constants = {
	intGameloopInterval: 16,
	
	intPlayerHealth: 100,
	dblPlayerMovement: [ 0.03, 0.03, 0.03 ],
	dblPlayerSize: [ 0.9, 1.6, 0.9 ],
	dblPlayerGravity: [ 0.0, 0.0, 0.0 ],
	dblPlayerMaxvel: [ 0.12, 0.26, 0.12 ],
	dblPlayerFriction: [ 0.8, 0.8, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ]
};

var Gameserver = {
	strMapType: {},
	
	init: function() {
		{
			Gameserver.strMapType = {};
		}
	},
	
	dispel: function() {
		{
			Gameserver.strMapType = {};
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
							.val(JSON.stringify(Gameserver.strMapType))
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
					    for (var intCoordinate in Gameserver.strMapType) {
							var strType = Gameserver.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), 0);
							}
					    }
					}
					
					{
						Gameserver.strMapType = JSON.parse(jQuery('#idMap_Json').val());
					}
					
					{
					    for (var intCoordinate in Gameserver.strMapType) {
							var strType = Gameserver.strMapType[intCoordinate];
							
							{
								Voxel.voxelengineHandle.setBlock(JSON.parse('[' + intCoordinate + ']'), Voxel.voxelengineHandle.materials.find(strType));
							}
					    }
					}
				})
			;
		}
		
		{
			Gui.update();
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
	},
	
	updateMode: function(strMode) {
		{
			Gui.strMode = strMode;
		}
		
		{
			Gui.update();
		}
	},
	
	updateChooser: function(strChooserCategory, intChooserType) {
		{
			Gui.strChooserCategory = strChooserCategory;
			
			Gui.intChooserType = intChooserType;
		}
		
		{
			Gui.update();
		}
		
		{
			if (Gui.strChooserCategory === '') {
				Player.playerHandle['playerCtrl'].strItem = '';
				
			} else if (Gui.strChooserCategory === 'categoryCreate') {
				Player.playerHandle['playerCtrl'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				Player.playerHandle['playerCtrl'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				Player.playerHandle['playerCtrl'].strItem = 'itemPickaxe';
				
			}
		}
	}
};

{
	with (global) {
		require('minecraft-skin');
		require('voxel-engine');
		require('voxel-highlight');
		
		var fsHandle = require('fs');

		eval(fsHandle.readFileSync(__dirname + '/../libs/Voxel.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Input.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Player.js').toString());
		
		eval(fsHandle.readFileSync(__dirname + '/../libs/Physics.js').toString());
	}
}

jQuery(document).ready(function() {
	{
		Gameserver.init();
	}
	
	{
		Gui.init();
	}
	
	{
		Voxel.init();
		
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelBrick'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelBrick';
					
				} else if (Gui.intChooserType === 1) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelDirt'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelDirt';
					
				} else if (Gui.intChooserType === 2) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelGrass'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelGrass';
					
				} else if (Gui.intChooserType === 3) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelPlank'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelPlank';
					
				} else if (Gui.intChooserType === 4) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelStone'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelStone';
					
				}
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelSpawnRed'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelSpawnRed';
					
				} else if (Gui.intChooserType === 1) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelSpawnBlue'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelSpawnBlue';

				} else if (Gui.intChooserType === 2) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelFlagRed'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelFlagRed';
					
				} else if (Gui.intChooserType === 3) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelFlagBlue'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelFlagBlue';
					
				} else if (Gui.intChooserType === 4) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionCreate, Voxel.voxelengineHandle.materials.find('voxelSeparator'));
					
					Gameserver.strMapType[Voxel.voxelhighlightHandle.positionCreate] = 'voxelSeparator';
					
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					Voxel.voxelengineHandle.setBlock(Voxel.voxelhighlightHandle.positionDestroy, 0);
					
					delete Gameserver.strMapType[Voxel.voxelhighlightHandle.positionDestroy];
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
			}
			
			{
				{
					if (Input.boolUp === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] -= Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1]);
						Player.playerHandle['playerCtrl'].dblAcceleration[1] -= 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] -= Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1]);
					}
					
					if (Input.boolDown === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] += Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1]);
						Player.playerHandle['playerCtrl'].dblAcceleration[1] += 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1]);
					}
					
					if (Input.boolLeft === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] -= Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
						Player.playerHandle['playerCtrl'].dblAcceleration[1] -= 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] -= Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
					}
					
					if (Input.boolRight === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] += Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
						Player.playerHandle['playerCtrl'].dblAcceleration[1] += 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['playerCtrl'].dblRotation[1] + (0.5 * Math.PI));
					}
					
					if (Input.boolSpace === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] += 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[1] += Constants.dblPlayerMovement[1];
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += 0.0;
					}
					
					if (Input.boolShift === true) {
						Player.playerHandle['playerCtrl'].dblAcceleration[0] -= 0.0;
						Player.playerHandle['playerCtrl'].dblAcceleration[1] -= Constants.dblPlayerMovement[1];
						Player.playerHandle['playerCtrl'].dblAcceleration[2] += 0.0;
					}
				}
				
				{
					Player.update();
				}
			}
		});
		
		Voxel.voxelhighlightHandle.enabled = function() {
			if (Gui.strChooserCategory === 'categoryCreate') {
				return true;
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				return true;
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				return true;
				
			}
			
			return false;
		};
		
		Voxel.voxelhighlightHandle.adjacentActive = function() {
			if (Gui.strChooserCategory === 'categoryCreate') {
				return true;
				
			} if (Gui.strChooserCategory === 'categorySpecial') {
				return true;
				
			}
			
			return false;
		};
	}
	
	{
		Input.init();
		
		Input.functionException = function() {
			if (jQuery('#idMap_Json').is(':focus') === true) {
				return true;
			}
			
			return false;
		};
		
		Input.functionKeydown = function(eventHandle) {
			if (Gui.strMode === 'modeMenu') {
				if (eventHandle.keyCode === 69) {
					Gui.updateMode('modeGame');
				}
				
			} else if (Gui.strMode === 'modeGame') {
				if (eventHandle.keyCode === 69) {
					Gui.updateMode('modeMenu');
				}
				
				{
					if (eventHandle.keyCode === 49) {
						Gui.updateChooser('categoryCreate', (Gui.intChooserType + 1) % 5);
						
					} else if (eventHandle.keyCode === 50) {
						Gui.updateChooser('categorySpecial', (Gui.intChooserType + 1) % 5);
						
					} else if (eventHandle.keyCode === 51) {
						Gui.updateChooser('categoryDestroy', 0);
						
					}
				}
				
			}
		};
		
		Input.functionKeyup = function(eventHandle) {
			
		};
	}
	
	{
		{
			Player.init();
			
			Player.initCtrl();
		}
		
		{
			Player.playerHandle['playerCtrl'].dblPosition[0] = 0.0;
			Player.playerHandle['playerCtrl'].dblPosition[1] = 8.0;
			Player.playerHandle['playerCtrl'].dblPosition[2] = 0.0;
			
			Player.playerHandle['playerCtrl'].dblVerlet[0] = Player.playerHandle['playerCtrl'].dblPosition[0];
			Player.playerHandle['playerCtrl'].dblVerlet[1] = Player.playerHandle['playerCtrl'].dblPosition[1];
			Player.playerHandle['playerCtrl'].dblVerlet[2] = Player.playerHandle['playerCtrl'].dblPosition[2];
		}
	}
	
	{
		Physics.init();
		
		Physics.functionVoxelcol = function(intX, intY, intZ) {
			if (intY === 0) {
				return true;
				
			} else if (Gameserver.strMapType[[intX, intY, intZ ]] !== undefined) {
				return true;
				
			}
			
			return false;
		}
	}
	
	{
		// TODO: add a buch of void voxels - this is unusable otherwise
		// TODO: even better -> make voxel-highlight work different
	}
});