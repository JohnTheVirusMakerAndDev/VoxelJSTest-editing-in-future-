'use strict';

var Constants = {};
var Voxel = {};

var World = {
	browserify: function(constantsHandle, voxelHandle) {
		Constants = constantsHandle;
		Voxel = voxelHandle;
	},
	
	worldPast: {},
	worldHandle: {},
	
	intSpawnRed: [],
	intSpawnBlue: [],
	intFlagRed: [],
	intFlagBlue: [],
	intSeparator: [],
	
	init: function() {
		{
			World.worldPast = {};
			
			World.worldHandle = {};
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
			World.worldPast = {};
			
			World.worldHandle = {};
		}
		
		{
			World.intSpawnRed = [];
			
			World.intSpawnBlue = [];
			
			World.intFlagRed = [];
			
			World.intFlagBlue = [];
			
			World.intSeparator = [];
		}
	},
	
	saveBuffer: function() {
		var bufferHandle = new Buffer(256 * Object.keys(World.worldHandle).length);
		var intBuffer = 0;
		
		{
		    for (var strCoordinate in World.worldHandle) {
				var worldHandle = World.worldHandle[strCoordinate];
				
				{
					intBuffer = World.saveBufferpart(worldHandle, bufferHandle, intBuffer);
				}
		    }
		}
		
		return bufferHandle.slice(0, intBuffer).toString('base64');
	},
	
	loadBuffer: function(strBuffer) {
		var bufferHandle = new Buffer(strBuffer, 'base64');
		
		{
			World.worldPast = World.worldHandle;
			
			World.worldHandle = {};
		}
		
		{
			var intBuffer = 0;
			
			{
				do {
					if (intBuffer >= bufferHandle.length) {
						break;
					}
					
					var worldHandle = {};
					
					{
						intBuffer = World.loadBufferpart(worldHandle, bufferHandle, intBuffer);
					}
					
					{
						World.worldHandle[(worldHandle.intCoordinate[0] << 20) + (worldHandle.intCoordinate[1] << 10) + (worldHandle.intCoordinate[2] << 0)] = worldHandle;
					}
				} while (true);
			}
		}
		
		{
			World.intSpawnRed = [];
			
			World.intSpawnBlue = [];
			
			World.intFlagRed = [];
			
			World.intFlagBlue = [];
			
			World.intSeparator = [];
		}
		
		{
		    for (var strCoordinate in World.worldHandle) {
				var worldHandle = World.worldHandle[strCoordinate];
				
				{
					if (worldHandle.strType === 'voxelSpawnRed') {
						World.intSpawnRed.push(worldHandle.intCoordinate);
						
					} else if (worldHandle.strType === 'voxelSpawnBlue') {
						World.intSpawnBlue.push(worldHandle.intCoordinate);
						
					} else if (worldHandle.strType === 'voxelFlagRed') {
						World.intFlagRed.push(worldHandle.intCoordinate);
						
					} else if (worldHandle.strType === 'voxelFlagBlue') {
						World.intFlagBlue.push(worldHandle.intCoordinate);
						
					} else if (worldHandle.strType === 'voxelSeparator') {
						World.intSeparator.push(worldHandle.intCoordinate);
						
					}
				}
		    }
		}
	},
	
	saveBufferpart: function(worldHandle, bufferHandle, intBuffer) {
		{
			bufferHandle.writeInt16LE(worldHandle.intCoordinate[0], intBuffer + 0);
			bufferHandle.writeInt16LE(worldHandle.intCoordinate[1], intBuffer + 2);
			bufferHandle.writeInt16LE(worldHandle.intCoordinate[2], intBuffer + 4);
			
			intBuffer += 6;
		}

		{
			bufferHandle.writeInt16LE(worldHandle.strType.length, intBuffer);
			
			intBuffer += 2;
			
			bufferHandle.write(worldHandle.strType, intBuffer, worldHandle.strType.length, 'ascii');
			
			intBuffer += worldHandle.strType.length;
		}
		
		{
			bufferHandle.writeInt16LE(worldHandle.boolBlocked === true ? 1 : 0, intBuffer);
			
			intBuffer += 2;
		}
		
		return intBuffer;
	},
	
	loadBufferpart: function(worldHandle, bufferHandle, intBuffer) {
		{
			worldHandle.intCoordinate = [ 0, 0, 0 ];
			
			worldHandle.intCoordinate[0] = bufferHandle.readInt16LE(intBuffer + 0);
			worldHandle.intCoordinate[1] = bufferHandle.readInt16LE(intBuffer + 2);
			worldHandle.intCoordinate[2] = bufferHandle.readInt16LE(intBuffer + 4);
			
			intBuffer += 6;
		}
		
		{
			var intLength = bufferHandle.readInt16LE(intBuffer);

			intBuffer += 2;
			
			worldHandle.strType = bufferHandle.toString('ascii', intBuffer, intBuffer + intLength);
			
			intBuffer += intLength;
		}
		
		{
			worldHandle.boolBlocked = bufferHandle.readInt16LE(intBuffer) === 1 ? true : false;
			
			intBuffer += 2;
		}
		
		return intBuffer;
	},
	
	update: function() {
		{
			World.updateLogic();
		}
		
		{
			if (Voxel !== null) {
				World.updateGraphics();
			}
		}
	},
		
	updateLogic: function() {
		
	},
	
	updateGraphics: function() {
		{
			if (World.worldPast !== null) {
				{
				    for (var strCoordinate in World.worldPast) {
						var worldHandle = World.worldPast[strCoordinate];
						
						{
							Voxel.voxelengineHandle.setBlock(worldHandle.intCoordinate, 0);	
						}
				    }
				    
				    for (var strCoordinate in World.worldHandle) {
						var worldHandle = World.worldHandle[strCoordinate];
						
						{
							Voxel.voxelengineHandle.setBlock(worldHandle.intCoordinate, Voxel.voxelengineHandle.materials.find(worldHandle.strType));	
						}
				    }
			    }
				
				{
					World.worldPast = null;
				}
			}
		}
	},
	
	updateCreate: function(intCoordinate, strType, boolBlocked) {
		{
			World.worldHandle[(intCoordinate[0] << 20) + (intCoordinate[1] << 10) + (intCoordinate[2] << 0)] = {
				'intCoordinate': intCoordinate,
				'strType': strType,
				'boolBlocked': boolBlocked
			};
		}
		
		{
			if (Voxel !== null) {
				Voxel.voxelengineHandle.setBlock(intCoordinate, Voxel.voxelengineHandle.materials.find(strType));
			}
		}
	},
	
	updateDestroy: function(intCoordinate) {
		{
			delete World.worldHandle[(intCoordinate[0] << 20) + (intCoordinate[1] << 10) + (intCoordinate[2] << 0)];
		}
		
		{
			if (Voxel !== null) {
				Voxel.voxelengineHandle.setBlock(intCoordinate, 0);
			}
		}
	},
	
	updateBlocked: function(intCoordinate) {
		{
			if (World.worldHandle[(intCoordinate[0] << 20) + (intCoordinate[1] << 10) + (intCoordinate[2] << 0)] !== undefined) {
				if (World.worldHandle[(intCoordinate[0] << 20) + (intCoordinate[1] << 10) + (intCoordinate[2] << 0)].boolBlocked === true) {
					return true;
				}
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

module.exports = World;