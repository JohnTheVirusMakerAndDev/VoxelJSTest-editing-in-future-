'use strict';

var Constants = {
	intGameLoop: 16,
	dblGameScale: 0.04,
	dblGameBlocksize: 1.0,
	
	intPlayerHealth: 100,
	dblPlayerMovement: [ 0.03, 0.03, 0.03 ],
	dblPlayerSize: [ 0.9, 1.6, 0.9 ],
	dblPlayerGravity: [ 0.0, 0.0, 0.0 ],
	dblPlayerMaxvel: [ 0.12, 0.26, 0.12 ],
	dblPlayerFriction: [ 0.8, 0.8, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ]
};

var Voxel = require('./libVoxel.js')(Constants);
var Input = require('./libInput.js')(Constants);
var Physics = require('./libPhysics.js')(Constants);
var World = require('./libWorld.js')(Constants, Voxel);
var Player = require('./libPlayer.js')(Constants, Voxel, Physics);

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
			jQuery('#idWorld_Save')
				.off('click')
				.on('click', function() {
					{
						jQuery('#idWorld_Json')
							.val(World.saveBuffer())
						;
					}
				})
			;
		}
		
		{
			jQuery('#idWorld_Load')
				.off('click')
				.on('click', function() {
					{
						World.loadBuffer(jQuery('#idWorld_Json').val());
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
				
				jQuery('#idWorld')
					.css({
						'display': 'none'
					})
				;
			}
			
			{
				if (Gui.strMode === 'modeMenu') {
					jQuery('#idWorld')
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
				jQuery('#idPhaseBuild').find('select')
					.removeClass('btn-primary')
				;
				
				jQuery('#idPhaseBuild').find('a')
					.removeClass('btn-primary')
				;
			}
			
			{
				if (Gui.strChooserCategory === 'categoryCreate') {
					jQuery('#idPhaseBuild').find('select:eq(0)')
						.addClass('btn-primary')
					;
					
					jQuery('#idPhaseBuild').find('select:eq(0)').find('option:eq(' + (Gui.intChooserType + 0) + ')')
					    .prop({
					        'selected': true
					    })
					;
					
				} else if (Gui.strChooserCategory === 'categorySpecial') {
					jQuery('#idPhaseBuild').find('select:eq(1)')
						.addClass('btn-primary')
					;
					
					jQuery('#idPhaseBuild').find('select:eq(1)').find('option:eq(' + (Gui.intChooserType + 0) + ')')
					    .prop({
					        'selected': true
					    })
					;
					
				} else if (Gui.strChooserCategory === 'categoryDestroy') {
					jQuery('#idPhaseBuild').find('a:eq(' + (Gui.intChooserType + 0) + ')')
						.addClass('btn-primary')
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
				Player.playerHandle['1'].strItem = '';
				
			} else if (Gui.strChooserCategory === 'categoryCreate') {
				Player.playerHandle['1'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				Player.playerHandle['1'].strItem = 'itemPickaxe';
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				Player.playerHandle['1'].strItem = 'itemPickaxe';
				
			}
		}
	}
};

window.addEventListener('load', function () {
	{
		Voxel.init(function(intCoordinateX, intCoordinateY, intCoordinateZ) {
			if (intCoordinateY === 0) {
				return 1;
			}
			
			return 0;
		});
		
		Voxel.voxelengineHandle.on('fire', function(targetHandle, stateHandle) {
			if (Gui.strChooserCategory === 'categoryCreate') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelBrick', true);
					
				} else if (Gui.intChooserType === 1) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelDirt', true);
					
				} else if (Gui.intChooserType === 2) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelGrass', true);
					
				} else if (Gui.intChooserType === 3) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelPlank', true);
					
				} else if (Gui.intChooserType === 4) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelStone', true);
					
				}
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelSpawnRed', true);
					
				} else if (Gui.intChooserType === 1) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelSpawnBlue', true);

				} else if (Gui.intChooserType === 2) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelFlagRed', true);
					
				} else if (Gui.intChooserType === 3) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelFlagBlue', true);
					
				} else if (Gui.intChooserType === 4) {
					World.updateCreate(Voxel.voxelhighlightHandle.positionCreate, 'voxelSeparator', true);
					
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					World.updateDestroy(Voxel.voxelhighlightHandle.positionDestroy);
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
			}
			
			{
				World.update();
			}
			
			{
				if (Input.boolUp === true) {
					Player.playerHandle['1'].dblAcceleration[0] -= Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['1'].dblRotation[1]);
					Player.playerHandle['1'].dblAcceleration[1] -= 0.0;
					Player.playerHandle['1'].dblAcceleration[2] -= Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['1'].dblRotation[1]);
				}
				
				if (Input.boolDown === true) {
					Player.playerHandle['1'].dblAcceleration[0] += Constants.dblPlayerMovement[0] * Math.sin(Player.playerHandle['1'].dblRotation[1]);
					Player.playerHandle['1'].dblAcceleration[1] += 0.0;
					Player.playerHandle['1'].dblAcceleration[2] += Constants.dblPlayerMovement[0] * Math.cos(Player.playerHandle['1'].dblRotation[1]);
				}
				
				if (Input.boolLeft === true) {
					Player.playerHandle['1'].dblAcceleration[0] -= Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
					Player.playerHandle['1'].dblAcceleration[1] -= 0.0;
					Player.playerHandle['1'].dblAcceleration[2] -= Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
				}
				
				if (Input.boolRight === true) {
					Player.playerHandle['1'].dblAcceleration[0] += Constants.dblPlayerMovement[2] * Math.sin(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
					Player.playerHandle['1'].dblAcceleration[1] += 0.0;
					Player.playerHandle['1'].dblAcceleration[2] += Constants.dblPlayerMovement[2] * Math.cos(Player.playerHandle['1'].dblRotation[1] + (0.5 * Math.PI));
				}
				
				if (Input.boolSpace === true) {
					Player.playerHandle['1'].dblAcceleration[0] += 0.0;
					Player.playerHandle['1'].dblAcceleration[1] += Constants.dblPlayerMovement[1];
					Player.playerHandle['1'].dblAcceleration[2] += 0.0;
				}
				
				if (Input.boolShift === true) {
					Player.playerHandle['1'].dblAcceleration[0] -= 0.0;
					Player.playerHandle['1'].dblAcceleration[1] -= Constants.dblPlayerMovement[1];
					Player.playerHandle['1'].dblAcceleration[2] += 0.0;
				}
			}
			
			{
				Player.update();
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
			if (jQuery('#idWorld_Json').is(':focus') === true) {
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

				if (jQuery('#idPhaseBuild').css('display') === 'block') {
					if (eventHandle.keyCode === 49) {
						if (Gui.strChooserCategory === 'categoryCreate') {
							Gui.updateChooser('categoryCreate', (Gui.intChooserType + 1) % 5);
							
						} else if (Gui.strChooserCategory !== 'categoryCreate') {
							Gui.updateChooser('categoryCreate', 0);
							
						}
						
					} else if (eventHandle.keyCode === 50) {
						if (Gui.strChooserCategory === 'categorySpecial') {
							Gui.updateChooser('categorySpecial', (Gui.intChooserType + 1) % 5);
							
						} else if (Gui.strChooserCategory !== 'categorySpecial') {
							Gui.updateChooser('categorySpecial', 0);
							
						}
						
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
		Physics.init();
		
		Physics.functionWorldcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
			if (intCoordinateY === 0) {
				return true;
				
			} else if (World.worldHandle[intCoordinateX + ' - ' + intCoordinateY + ' - ' + intCoordinateZ] !== undefined) {
				return true;
				
			}
			
			return false;
		}
	}
	
	{
		World.init();
	}
	
	{
		Player.init();
		
		Player.initController();
	}
	
	{
		Player.playerHandle['1'].strTeam = 'teamRed';
		
		Player.playerHandle['1'].dblPosition[0] = 0.0;
		Player.playerHandle['1'].dblPosition[1] = 8.0;
		Player.playerHandle['1'].dblPosition[2] = 0.0;
		
		Player.playerHandle['1'].dblVerlet[0] = Player.playerHandle['1'].dblPosition[0];
		Player.playerHandle['1'].dblVerlet[1] = Player.playerHandle['1'].dblPosition[1];
		Player.playerHandle['1'].dblVerlet[2] = Player.playerHandle['1'].dblPosition[2];
	}
	
	{
		Gui.init();
	}
}, false);