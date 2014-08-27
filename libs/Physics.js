'use strict';

var Constants = {};

var Physics = {
	functionWorldcol: null,
	
	init: function() {
		{
			Physics.functionWorldcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
				return false;
			}
		}
	},
	
	dispel: function() {
		{
			Physics.functionWorldcol = null;
		}
	},
	
	update: function(physicsHandle) {
		{
			physicsHandle.dblAcceleration[0] += physicsHandle.dblGravity[0];
			physicsHandle.dblAcceleration[1] += physicsHandle.dblGravity[1];
			physicsHandle.dblAcceleration[2] += physicsHandle.dblGravity[2];
		}
		
		{
			var dblVerletX = physicsHandle.dblPosition[0];
			var dblVerletY = physicsHandle.dblPosition[1];
			var dblVerletZ = physicsHandle.dblPosition[2];

			physicsHandle.dblPosition[0] = physicsHandle.dblPosition[0] + (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]) + physicsHandle.dblAcceleration[0];
			physicsHandle.dblPosition[1] = physicsHandle.dblPosition[1] + (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]) + physicsHandle.dblAcceleration[1];
			physicsHandle.dblPosition[2] = physicsHandle.dblPosition[2] + (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]) + physicsHandle.dblAcceleration[2];
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			physicsHandle.dblVerlet[2] = dblVerletZ;
			
			physicsHandle.dblAcceleration[0] = 0.0;
			physicsHandle.dblAcceleration[1] = 0.0;
			physicsHandle.dblAcceleration[2] = 0.0;
		}
		
		{
			var dblVelocityX = physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0];
			var dblVelocityY = physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1];
			var dblVelocityZ = physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2];

			{
				dblVelocityX *= physicsHandle.dblFriction[0];
				dblVelocityY *= physicsHandle.dblFriction[1];
				dblVelocityZ *= physicsHandle.dblFriction[2];
			}
			
			{
				if (physicsHandle.dblMaxvel.length === 1) {
					{
						var dblLength = Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityY * dblVelocityY) + (dblVelocityZ * dblVelocityZ));
						
						if (dblLength > physicsHandle.dblMaxvel[0]) {
							dblVelocityX *= physicsHandle.dblMaxvel[0] / dblLength;
							dblVelocityY *= physicsHandle.dblMaxvel[0] / dblLength;
							dblVelocityZ *= physicsHandle.dblMaxvel[0] / dblLength;
							
						} else if (dblLength < 0.0001) {
							dblVelocityX = 0.0;
							dblVelocityY = 0.0;
							dblVelocityZ = 0.0;
							
						}
					}
					
				} else if (physicsHandle.dblMaxvel.length === 3) {
					{
						if (Math.abs(dblVelocityX) > physicsHandle.dblMaxvel[0]) {
							dblVelocityX = (dblVelocityX > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[0];
							
						} else if (Math.abs(dblVelocityX) < 0.0001) {
							dblVelocityX = 0.0;
							
						}
					}
					
					{
						if (Math.abs(dblVelocityY) > physicsHandle.dblMaxvel[1]) {
							dblVelocityY = (dblVelocityY > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[1];
							
						} else if (Math.abs(dblVelocityY) < 0.0001) {
							dblVelocityY = 0.0;
							
						}
					}
					
					{
						if (Math.abs(dblVelocityZ) > physicsHandle.dblMaxvel[2]) {
							dblVelocityZ = (dblVelocityZ > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[2];
							
						} else if (Math.abs(dblVelocityZ) < 0.0001) {
							dblVelocityZ = 0.0;
							
						}
					}
	
				}
			}
			
			physicsHandle.dblPosition[0] = physicsHandle.dblVerlet[0] + dblVelocityX;
			physicsHandle.dblPosition[1] = physicsHandle.dblVerlet[1] + dblVelocityY;
			physicsHandle.dblPosition[2] = physicsHandle.dblVerlet[2] + dblVelocityZ;
		}
	},
	
	updateOverwrite: function(physicsHandle, physicsOverwrite) {
		{
			var dblPositionX = 0.5 * (physicsHandle.dblPosition[0] + physicsOverwrite.dblPosition[0]);
			var dblPositionY = 0.5 * (physicsHandle.dblPosition[1] + physicsOverwrite.dblPosition[1]);
			var dblPositionZ = 0.5 * (physicsHandle.dblPosition[2] + physicsOverwrite.dblPosition[2]);
			
			var dblVerletX = dblPositionX - (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]);
			var dblVerletY = dblPositionY - (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]);
			var dblVerletZ = dblPositionZ - (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]);

			physicsHandle.dblPosition[0] = dblPositionX;
			physicsHandle.dblPosition[1] = dblPositionY;
			physicsHandle.dblPosition[2] = dblPositionZ;
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			physicsHandle.dblVerlet[2] = dblVerletZ;
		}
	},
	
	updateWorldcol: function(physicsHandle) {
		{
			physicsHandle.boolCollisionTop = false;
			
			physicsHandle.boolCollisionSide = false;
			
			physicsHandle.boolCollisionBottom = false;
		}
		
		{
			for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
				for (var intFor2 = 0; intFor2 < 3; intFor2 += 1) {
					for (var intFor3 = 0; intFor3 < 3; intFor3 += 1) {
						var intCoordinateX = Math.floor(physicsHandle.dblPosition[0] / Constants.dblWorldBlocksize) + [ 0, -1, 1 ][intFor1];
						var intCoordinateY = Math.floor(physicsHandle.dblPosition[1] / Constants.dblWorldBlocksize) + [ -1, 0, 1 ][intFor2];
						var intCoordinateZ = Math.floor(physicsHandle.dblPosition[2] / Constants.dblWorldBlocksize) + [ 0, -1, 1 ][intFor3];

						var dblPositionX = intCoordinateX + (0.5 * Constants.dblWorldBlocksize);
						var dblPositionY = intCoordinateY + (0.5 * Constants.dblWorldBlocksize);
						var dblPositionZ = intCoordinateZ + (0.5 * Constants.dblWorldBlocksize);
						
						if (Physics.functionWorldcol(intCoordinateX, intCoordinateY, intCoordinateZ) === false) {
							continue;
						}
						
						{
							var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblPositionX) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * Constants.dblWorldBlocksize);
							var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblPositionY) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * Constants.dblWorldBlocksize);
							var dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - dblPositionZ) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * Constants.dblWorldBlocksize);
							
							if (dblIntersectX >= 0.0) {
								continue;
	
							} else if (dblIntersectY >= 0.0) {
								continue;
	
							} else if (dblIntersectZ >= 0.0) {
								continue;
	
							}
							
							if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectX) {
								if ((physicsHandle.dblPosition[0] - dblPositionX) > 0.0) {
									physicsHandle.dblPosition[0] -= dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[0] - dblPositionX) < 0.0) {
									physicsHandle.dblPosition[0] += dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectY) {
								if ((physicsHandle.dblPosition[1] - dblPositionY) > 0.0) {
									physicsHandle.dblPosition[1] -= dblIntersectY;
									
									physicsHandle.boolCollisionBottom = true;
									
								} else if ((physicsHandle.dblPosition[1] - dblPositionY) < 0.0) {
									physicsHandle.dblPosition[1] += dblIntersectY;
									
									physicsHandle.boolCollisionTop = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectZ) {
								if ((physicsHandle.dblPosition[2] - dblPositionZ) > 0.0) {
									physicsHandle.dblPosition[2] -= dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[2] - dblPositionZ) < 0.0) {
									physicsHandle.dblPosition[2] += dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							}
						}
					}
				}
			}
		}
	},
	
	updateObjectcol: function(physicsHandle, functionObjectcol, functionCollision) {
		{
			do {
				var physicsObjectcol = functionObjectcol(functionObjectcol);
				
				if (physicsObjectcol === null) {
					break;
				}

				{
					var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - physicsObjectcol.dblPosition[0]) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * physicsObjectcol.dblSize[0]);
					var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - physicsObjectcol.dblPosition[1]) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * physicsObjectcol.dblSize[1]);
					var dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - physicsObjectcol.dblPosition[2]) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * physicsObjectcol.dblSize[2]);

					if (dblIntersectX >= 0.0) {
						continue;

					} else if (dblIntersectY >= 0.0) {
						continue;

					} else if (dblIntersectZ >= 0.0) {
						continue;

					}
				}
				
				{
					functionCollision(physicsObjectcol);
				}
			} while (true);
		}
	},
	
	updateRaycol: function(physicsHandle, functionRaycol, functionCollision) {
		{
			do {
				var physicsRaycol = functionRaycol(functionRaycol);
				
				if (physicsRaycol === null) {
					break;
				}

				{
					var dblSlabMin = Number.MIN_VALUE;
					var dblSlabMax = Number.MAX_VALUE;
					
					for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
						if (physicsHandle.dblAcceleration[intFor1] === 0.0) {
							continue;
						}
						
						{
							var dblBoxMin = physicsRaycol.dblPosition[intFor1] - (0.5 * physicsRaycol.dblSize[intFor1]);
							var dblBoxMax = physicsRaycol.dblPosition[intFor1] + (0.5 * physicsRaycol.dblSize[intFor1]);
							
							var dblCandidateMin = (dblBoxMin - physicsHandle.dblPosition[intFor1]) / physicsHandle.dblAcceleration[intFor1];
							var dblCandidateMax = (dblBoxMax - physicsHandle.dblPosition[intFor1]) / physicsHandle.dblAcceleration[intFor1];
							
							dblSlabMin = Math.max(dblSlabMin, Math.min(dblCandidateMin, dblCandidateMax));
							dblSlabMax = Math.min(dblSlabMax, Math.max(dblCandidateMin, dblCandidateMax));
						}
					}
					
					if (dblSlabMax < Math.max(0.0, dblSlabMin)) {
						continue;
					}
				}
				
				{
					functionCollision(physicsRaycol);
				}
			} while (true);
		}
	}
};

module.exports = function(constantsHandle) {
	Constants = constantsHandle;
	
	return Physics;
};