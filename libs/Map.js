var Map = {
	strType: {},
	strOrigtype: {},
	
	intSpawnRed: [],
	intSpawnBlue: [],
	intFlagRed: [],
	intFlagBlue: [],
	intSeparator: [],
	
	init: function() {
		{
			Map.strType = {};
			
			Map.strOrigtype = {};
		}
		
		{
			Map.intSpawnRed = [];
			
			Map.intSpawnBlue = [];
			
			Map.intFlagRed = [];
			
			Map.intFlagBlue = [];
			
			Map.intSeparator = [];
		}
	},
	
	dispel: function() {
		{
			Map.strType = {};
			
			Map.strOrigtype = {};
		}
		
		{
			Map.intSpawnRed = [];
			
			Map.intSpawnBlue = [];
			
			Map.intFlagRed = [];
			
			Map.intFlagBlue = [];
			
			Map.intSeparator = [];
		}
	},
	
	save: function() {
		var strJson = '';
		
		{
			strJson = JSON.stringify(Map.strType);
		}
		
		return strJson;
	},
	
	load: function(strJson) {
		{
		    for (var intCoordinate in Map.strType) {
				var strType = Map.strType[intCoordinate];
				
				{
					Map.updateType(JSON.parse('[' + intCoordinate + ']'), '');
				}
		    }
		}
		
		{
			Map.strType = JSON.parse(strJson);
			
			Map.strOrigtype = JSON.parse(strJson);
		}
		
		{
			Map.intSpawnRed = [];
			
			Map.intSpawnBlue = [];
			
			Map.intFlagRed = [];
			
			Map.intFlagBlue = [];
			
			Map.intSeparator = [];
		}
		
		{
		    for (var intCoordinate in Map.strType) {
				var strType = Map.strType[intCoordinate];
				
				{
					if (strType === 'voxelSpawnRed') {
						Map.intSpawnRed.push(JSON.parse('[' + intCoordinate + ']'));
						
					} else if (strType === 'voxelSpawnBlue') {
						Map.intSpawnBlue.push(JSON.parse('[' + intCoordinate + ']'));
						
					} else if (strType === 'voxelFlagRed') {
						Map.intFlagRed.push(JSON.parse('[' + intCoordinate + ']'));
						
						delete Map.strType[intCoordinate];
						
					} else if (strType === 'voxelFlagBlue') {
						Map.intFlagBlue.push(JSON.parse('[' + intCoordinate + ']'));

						delete Map.strType[intCoordinate];
						
					} else if (strType === 'voxelSeparator') {
						Map.intSeparator.push(JSON.parse('[' + intCoordinate + ']'));
						
					}
				}
		    }
		}
		
		{
		    for (var intCoordinate in Map.strType) {
				var strType = Map.strType[intCoordinate];
				
				{
					Map.updateType(JSON.parse('[' + intCoordinate + ']'), strType);
				}
		    }
		}
	},
	
	updateType: function(intCoordinate, strType) {
		{
			if (strType === '') {
				delete Map.strType[intCoordinate];
				
			} else if (strType !== '') {
				Map.strType[intCoordinate] = strType;
				
			}
		}
		
		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			Voxel.voxelengineHandle.setBlock(intCoordinate, Voxel.voxelengineHandle.materials.find(strType));	
		}
	},
	
	updateBlocked: function(intCoordinate) {
		{
			if (Map.strOrigtype[intCoordinate] !== undefined) {
				return true;
			}
		}

		{
	    	for (var intFor1 = -1; intFor1 < 2; intFor1 += 1) {
		    	for (var intFor2 = 1; intFor2 < 3; intFor2 += 1) {
			    	for (var intFor3 = -1; intFor3 < 2; intFor3 += 1) {
					    for (var intFor4 = 0; intFor4 < Map.intSpawnRed.length; intFor4 += 1) {
				    		var intCoordinateX = Map.intSpawnRed[intFor4][0] + intFor1;
				    		var intCoordinateY = Map.intSpawnRed[intFor4][1] + intFor2;
				    		var intCoordinateZ = Map.intSpawnRed[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
					    
					    for (var intFor4 = 0; intFor4 < Map.intSpawnBlue.length; intFor4 += 1) {
				    		var intCoordinateX = Map.intSpawnBlue[intFor4][0] + intFor1;
				    		var intCoordinateY = Map.intSpawnBlue[intFor4][1] + intFor2;
				    		var intCoordinateZ = Map.intSpawnBlue[intFor4][2] + intFor3;
		
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
					    for (var intFor4 = 0; intFor4 < Map.intFlagRed.length; intFor4 += 1) {
				    		var intCoordinateX = Map.intFlagRed[intFor4][0] + intFor1;
				    		var intCoordinateY = Map.intFlagRed[intFor4][1] + intFor2;
				    		var intCoordinateZ = Map.intFlagRed[intFor4][2] + intFor3;
		
				    		if (intCoordinateX === intCoordinate[0]) {
				    			if (intCoordinateY === intCoordinate[1]) {
					    			if (intCoordinateZ === intCoordinate[2]) {
					    				return true;
						    		}
					    		}
				    		}
					    }
					    
					    for (var intFor4 = 0; intFor4 < Map.intFlagBlue.length; intFor4 += 1) {
				    		var intCoordinateX = Map.intFlagBlue[intFor4][0] + intFor1;
				    		var intCoordinateY = Map.intFlagBlue[intFor4][1] + intFor2;
				    		var intCoordinateZ = Map.intFlagBlue[intFor4][2] + intFor3;
		
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