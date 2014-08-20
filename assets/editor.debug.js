'use strict';

var Constants = {
	intGameLoop: 16,
	
	intPlayerHealth: 100,
	dblPlayerMovement: [ 0.03, 0.03, 0.03 ],
	dblPlayerSize: [ 0.9, 1.6, 0.9 ],
	dblPlayerGravity: [ 0.0, 0.0, 0.0 ],
	dblPlayerMaxvel: [ 0.12, 0.26, 0.12 ],
	dblPlayerFriction: [ 0.8, 0.8, 0.8 ],
	dblPlayerHitbox: [ 0.4, 0.9, 0.4 ]
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
			jQuery('#idWorld_Save')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-disk'
					}
				})
				.off('click')
				.on('click', function() {
					{
						jQuery('#idWorld_Json')
							.val(World.save())
						;
					}
				})
			;
		}
		
		{
			jQuery('#idWorld_Load')
				.button({
					'disabled': false,
					'icons': {
						'primary': 'ui-icon-folder-open'
					}
				})
				.off('click')
				.on('click', function() {
					{
						World.load(jQuery('#idWorld_Json').val());
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

var Voxel = require('../libs/Voxel.js')(Constants);
var Input = require('../libs/Input.js')(Constants);
var Physics = require('../libs/Physics.js')(Constants);
var World = require('../libs/World.js')(Constants, Voxel);
var Player = require('../libs/Player.js')(Constants, Voxel, Physics);

window.addEventListener('load', function () {
	{
		Gui.init();
	}
	
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
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelBrick');
					
				} else if (Gui.intChooserType === 1) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelDirt');
					
				} else if (Gui.intChooserType === 2) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelGrass');
					
				} else if (Gui.intChooserType === 3) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelPlank');
					
				} else if (Gui.intChooserType === 4) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelStone');
					
				}
				
			} else if (Gui.strChooserCategory === 'categorySpecial') {
				if (Voxel.voxelhighlightHandle.positionCreate === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelSpawnRed');
					
				} else if (Gui.intChooserType === 1) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelSpawnBlue');

				} else if (Gui.intChooserType === 2) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelFlagRed');
					
				} else if (Gui.intChooserType === 3) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelFlagBlue');
					
				} else if (Gui.intChooserType === 4) {
					World.updateType(Voxel.voxelhighlightHandle.positionCreate, 'voxelSeparator');
					
				}
				
			} else if (Gui.strChooserCategory === 'categoryDestroy') {
				if (Voxel.voxelhighlightHandle.positionDestroy === null) {
					return;
				}
				
				if (Gui.intChooserType === 0) {
					World.updateType(Voxel.voxelhighlightHandle.positionDestroy, '');
				}
				
			}
		});

		Voxel.voxelengineHandle.on('tick', function(intDelta) {
			{
				Input.update();
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

				if (jQuery('#idPhaseBuild').css('display') === 'inline-block') {
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
		World.init();
	}
	
	{
		Player.init();
		
		Player.initController();
	}
	
	{
		Physics.init();
		
		Physics.functionVoxelcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
			if (intCoordinateY === 0) {
				return true;
				
			} else if (World.strType[[ intCoordinateX, intCoordinateY, intCoordinateZ ]] !== undefined) {
				return true;
				
			}
			
			return false;
		}
	}
	
	{
		Player.playerHandle['1'].dblPosition[0] = 0.0;
		Player.playerHandle['1'].dblPosition[1] = 8.0;
		Player.playerHandle['1'].dblPosition[2] = 0.0;
		
		Player.playerHandle['1'].dblVerlet[0] = Player.playerHandle['1'].dblPosition[0];
		Player.playerHandle['1'].dblVerlet[1] = Player.playerHandle['1'].dblPosition[1];
		Player.playerHandle['1'].dblVerlet[2] = Player.playerHandle['1'].dblPosition[2];
	}
}, false);