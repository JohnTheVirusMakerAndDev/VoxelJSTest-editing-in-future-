'use strict';

var Constants = {};
var Voxel = {};

var World = {
	strType: {},
	strOrigtype: {},
	
	intSpawnRed: [],
	intSpawnBlue: [],
	intFlagRed: [],
	intFlagBlue: [],
	intSeparator: [],
	
	init: function() {
		{
			World.strType = {};
			
			World.strOrigtype = {};
		}
		
		{
			World.intSpawnRed = [];
			
			World.intSpawnBlue = [];
			
			World.intFlagRed = [];
			
			World.intFlagBlue = [];
			
			World.intSeparator = [];
		}
	},
	
	dispel: function() {
		{
			World.strType = {};
			
			World.strOrigtype = {};
		}
		
		{
			World.intSpawnRed = [];
			
			World.intSpawnBlue = [];
			
			World.intFlagRed = [];
			
			World.intFlagBlue = [];
			
			World.intSeparator = [];
		}
	},
	
	save: function() {
		var strJson = '';
		
		{
			strJson = JSON.stringify(World.strType);
		}
		
		return strJson;
	},
	
	load: function(strJson) {
		{
		    for (var intCoordinate in World.strType) {
				var strType = World.strType[intCoordinate];
				
				var intCoordinateX = JSON.parse('[' + intCoordinate + ']')[0];
				var intCoordinateY = JSON.parse('[' + intCoordinate + ']')[1];
				var intCoordinateZ = JSON.parse('[' + intCoordinate + ']')[2];
				
				{
					World.updateType([ intCoordinateX, intCoordinateY, intCoordinateZ ], '');
				}
		    }
		}
		
		{
			World.strType = JSON.parse(strJson);
			
			World.strOrigtype = JSON.parse(strJson);
		}
		
		{
			World.intSpawnRed = [];
			
			World.intSpawnBlue = [];
			
			World.intFlagRed = [];
			
			World.intFlagBlue = [];
			
			World.intSeparator = [];
		}
		
		{
		    for (var intCoordinate in World.strType) {
				var strType = World.strType[intCoordinate];

				var intCoordinateX = JSON.parse('[' + intCoordinate + ']')[0];
				var intCoordinateY = JSON.parse('[' + intCoordinate + ']')[1];
				var intCoordinateZ = JSON.parse('[' + intCoordinate + ']')[2];
				
				{
					if (strType === 'voxelSpawnRed') {
						World.intSpawnRed.push([ intCoordinateX, intCoordinateY, intCoordinateZ ]);
						
					} else if (strType === 'voxelSpawnBlue') {
						World.intSpawnBlue.push([ intCoordinateX, intCoordinateY, intCoordinateZ ]);
						
					} else if (strType === 'voxelFlagRed') {
						World.intFlagRed.push([ intCoordinateX, intCoordinateY, intCoordinateZ ]);
						
						delete World.strType[[ intCoordinateX, intCoordinateY, intCoordinateZ ]];
						
					} else if (strType === 'voxelFlagBlue') {
						World.intFlagBlue.push([ intCoordinateX, intCoordinateY, intCoordinateZ ]);
						
						delete World.strType[[ intCoordinateX, intCoordinateY, intCoordinateZ ]];
						
					} else if (strType === 'voxelSeparator') {
						World.intSeparator.push([ intCoordinateX, intCoordinateY, intCoordinateZ ]);
						
					}
				}
		    }
		}
		
		{
		    for (var intCoordinate in World.strType) {
				var strType = World.strType[intCoordinate];

				var intCoordinateX = JSON.parse('[' + intCoordinate + ']')[0];
				var intCoordinateY = JSON.parse('[' + intCoordinate + ']')[1];
				var intCoordinateZ = JSON.parse('[' + intCoordinate + ']')[2];
				
				{
					World.updateType([ intCoordinateX, intCoordinateY, intCoordinateZ ], strType);
				}
		    }
		}
	},
	
	updateType: function(intCoordinate, strType) {
		{
			if (strType === '') {
				delete World.strType[intCoordinate];
				
			} else if (strType !== '') {
				World.strType[intCoordinate] = strType;
				
			}
		}
		
		if (Voxel === null) {
			return;
		}
		
		{
			Voxel.voxelengineHandle.setBlock(intCoordinate, Voxel.voxelengineHandle.materials.find(strType));	
		}
	},
	
	updateBlocked: function(intCoordinate) {
		{
			if (World.strOrigtype[intCoordinate] !== undefined) {
				return true;
			}
		}

		{
	    	for (var intFor1 = -1; intFor1 < 2; intFor1 += 1) {
		    	for (var intFor2 = 1; intFor2 < 3; intFor2 += 1) {
			    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    for (var intFor4 = 0; intFor4 < World.intSpawnRed.length; intFor4 += 1) {
				    		var intCoordinateX = World.intSpawnRed[intFor4][0] + intFor1;
				    		var intCoordinateY = World.intSpawnRed[intFor4][1] + intFor2;
				    		var intCoordinateZ = World.intSpawnRed[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
					    
					    for (var intFor4 = 0; intFor4 < World.intSpawnBlue.length; intFor4 += 1) {
				    		var intCoordinateX = World.intSpawnBlue[intFor4][0] + intFor1;
				    		var intCoordinateY = World.intSpawnBlue[intFor4][1] + intFor2;
				    		var intCoordinateZ = World.intSpawnBlue[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
			    	}
		    	}
	    	}

	    	for (var intFor1 = -1; intFor1 < 2; intFor1 += 1) {
		    	for (var intFor2 = 0; intFor2 < 2; intFor2 += 1) {
			    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    for (var intFor4 = 0; intFor4 < World.intFlagRed.length; intFor4 += 1) {
				    		var intCoordinateX = World.intFlagRed[intFor4][0] + intFor1;
				    		var intCoordinateY = World.intFlagRed[intFor4][1] + intFor2;
				    		var intCoordinateZ = World.intFlagRed[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
					    
					    for (var intFor4 = 0; intFor4 < World.intFlagBlue.length; intFor4 += 1) {
				    		var intCoordinateX = World.intFlagBlue[intFor4][0] + intFor1;
				    		var intCoordinateY = World.intFlagBlue[intFor4][1] + intFor2;
				    		var intCoordinateZ = World.intFlagBlue[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
			    	}
		    	}
	    	}
		}
		
		return false;
	}
};

module.exports = function(constantsHandle, voxelHandle) {
	Constants = constantsHandle;
	Voxel = voxelHandle;
	
	return World;
};