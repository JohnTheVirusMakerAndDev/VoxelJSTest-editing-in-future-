'use strict';

var Constants = {};

#define PHYSICS_3D

var Physics = {
	browserify: function(constantsHandle) {
		Constants = constantsHandle;
	},
	
	functionWorldcol: null,
	
	init: function() {
		{
			#ifdef PHYSICS_2D
			Physics.functionWorldcol = function(intCoordinateX, intCoordinateY) {
				return false;
			}
			#endif
			
			#ifdef PHYSICS_3D
			Physics.functionWorldcol = function(intCoordinateX, intCoordinateY, intCoordinateZ) {
				return false;
			}
			#endif
		}
	},
	
	dispel: function() {
		{
			Physics.functionWorldcol = null;
		}
	},
	
	update: function(physicsHandle) {
		{
			#ifdef PHYSICS_2D
			physicsHandle.dblAcceleration[0] += physicsHandle.dblGravity[0];
			physicsHandle.dblAcceleration[1] += physicsHandle.dblGravity[1];
			#endif
			
			#ifdef PHYSICS_3D
			physicsHandle.dblAcceleration[0] += physicsHandle.dblGravity[0];
			physicsHandle.dblAcceleration[1] += physicsHandle.dblGravity[1];
			physicsHandle.dblAcceleration[2] += physicsHandle.dblGravity[2];
			#endif
		}
		
		{
			#ifdef PHYSICS_2D
			var dblVerletX = physicsHandle.dblPosition[0];
			var dblVerletY = physicsHandle.dblPosition[1];
			
			physicsHandle.dblPosition[0] = physicsHandle.dblPosition[0] + (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]) + physicsHandle.dblAcceleration[0];
			physicsHandle.dblPosition[1] = physicsHandle.dblPosition[1] + (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]) + physicsHandle.dblAcceleration[1];
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			
			physicsHandle.dblAcceleration[0] = 0.0;
			physicsHandle.dblAcceleration[1] = 0.0;
			#endif
			
			#ifdef PHYSICS_3D
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
			#endif
		}
		
		{
			#ifdef PHYSICS_2D
			var dblVelocityX = physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0];
			var dblVelocityY = physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1];
			
			{
				dblVelocityX *= physicsHandle.dblFriction[0];
				dblVelocityY *= physicsHandle.dblFriction[1];
			}
			
			{
				if (physicsHandle.dblMaxvel.length === 1) {
					{
						var dblLength = Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityY * dblVelocityY));
						
						if (dblLength > physicsHandle.dblMaxvel[0]) {
							dblVelocityX *= physicsHandle.dblMaxvel[0] / dblLength;
							dblVelocityY *= physicsHandle.dblMaxvel[0] / dblLength;
							
						} else if (dblLength < 0.0001) {
							dblVelocityX = 0.0;
							dblVelocityY = 0.0;
							
						}
					}
					
				} else if (physicsHandle.dblMaxvel.length === 2) {
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
					
				}
			}
			
			physicsHandle.dblPosition[0] = physicsHandle.dblVerlet[0] + dblVelocityX;
			physicsHandle.dblPosition[1] = physicsHandle.dblVerlet[1] + dblVelocityY;
			#endif
			
			#ifdef PHYSICS_3D
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
			#endif
		}
	},
	
	updateOverwrite: function(physicsHandle, physicsOverwrite) {
		{
			#ifdef PHYSICS_2D
			var dblPositionX = 0.5 * (physicsHandle.dblPosition[0] + physicsOverwrite.dblPosition[0]);
			var dblPositionY = 0.5 * (physicsHandle.dblPosition[1] + physicsOverwrite.dblPosition[1]);
			
			var dblVerletX = dblPositionX - (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]);
			var dblVerletY = dblPositionY - (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]);
			
			physicsHandle.dblPosition[0] = dblPositionX;
			physicsHandle.dblPosition[1] = dblPositionY;
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			#endif
			
			#ifdef PHYSICS_3D
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
			#endif
		}
	},
	
	updateWorldcol: function(physicsHandle, boolSmall) {
		{
			#ifdef PHYSICS_2D
			physicsHandle.boolCollisionTop = false;
			
			physicsHandle.boolCollisionRight = false;
			
			physicsHandle.boolCollisionBottom = false;
			
			physicsHandle.boolCollisionLeft = false;
			#endif
			
			#ifdef PHYSICS_3D
			physicsHandle.boolCollisionTop = false;
			
			physicsHandle.boolCollisionSide = false;
			
			physicsHandle.boolCollisionBottom = false;
			#endif
		}
		
		{
			#ifdef PHYSICS_2D
			var intCoordinate = [];
			
			if (boolSmall === true) {
				var dblCoordinateX = physicsHandle.dblPosition[0] / Constants.dblGameBlocksize;
				var dblCoordinateY = physicsHandle.dblPosition[1] / Constants.dblGameBlocksize;
				
				var intCoordinateX = Math.floor(dblCoordinateX);
				var intCoordinateY = Math.floor(dblCoordinateY);
				
				var intShiftX = 0;
				var intShiftY = 0;
				
				if ((dblCoordinateX % 1) < 0.5) {
					intShiftX = -1;
					
				} else if ((dblCoordinateX % 1) >= 0.5) {
					intShiftX = 1;
					
				}
				
				if ((dblCoordinateY % 1) < 0.5) {
					intShiftY = -1;
					
				} else if ((dblCoordinateY % 1) >= 0.5) {
					intShiftY = 1;
					
				}
				
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY ]);
				intCoordinate.push([ intCoordinateX, intCoordinateY + intShiftY ]);
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY + intShiftY ]);
				
			} else if (boolSmall === false) {
				var intCoordinateX = Math.floor(physicsHandle.dblPosition[0] / Constants.dblGameBlocksize);
				var intCoordinateY = Math.floor(physicsHandle.dblPosition[1] / Constants.dblGameBlocksize);
				
				for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
					for (var intFor2 = 0; intFor2 < 3; intFor2 += 1) {
						intCoordinate.push([ intCoordinateX + [ 0, -1, 1 ][intFor1], intCoordinateY + [ 1, 0, -1 ][intFor2] ]);
					}
				}
				
			}
			
			for (var intFor1 = 0; intFor1 < intCoordinate.length; intFor1 += 1) {
				var intCoordinateX = intCoordinate[intFor1][0];
				var intCoordinateY = intCoordinate[intFor1][1];
				
				var dblPositionX = (intCoordinateX * Constants.dblGameBlocksize) + (0.5 * Constants.dblGameBlocksize);
				var dblPositionY = (intCoordinateY * Constants.dblGameBlocksize) + (0.5 * Constants.dblGameBlocksize);
				
				if (Physics.functionWorldcol(intCoordinateX, intCoordinateY) === false) {
					continue;
				}
				
				{
					var dblIntersectX = 0.0;
					var dblIntersectY = 0.0;
					
					{
						dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblPositionX) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * Constants.dblGameBlocksize);
						dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblPositionY) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * Constants.dblGameBlocksize);
						
						if (dblIntersectX >= 0.0) {
							continue;
							
						} else if (dblIntersectY >= 0.0) {
							continue;
							
						}
					}
					
					if (Math.max(dblIntersectX, dblIntersectY) === dblIntersectX) {
						if ((physicsHandle.dblPosition[0] - dblPositionX) > 0.0) {
							physicsHandle.dblPosition[0] -= dblIntersectX;
							
							physicsHandle.boolCollisionLeft = true;
							
						} else if ((physicsHandle.dblPosition[0] - dblPositionX) < 0.0) {
							physicsHandle.dblPosition[0] += dblIntersectX;
							
							physicsHandle.boolCollisionRight = true;
							
						}
						
					} else if (Math.max(dblIntersectX, dblIntersectY) === dblIntersectY) {
						if ((physicsHandle.dblPosition[1] - dblPositionY) > 0.0) {
							physicsHandle.dblPosition[1] -= dblIntersectY;
							
							physicsHandle.boolCollisionTop = true;
							
						} else if ((physicsHandle.dblPosition[1] - dblPositionY) < 0.0) {
							physicsHandle.dblPosition[1] += dblIntersectY;
							
							physicsHandle.boolCollisionBottom = true;
							
						}
						
					}
				}
			}
			#endif
			
			#ifdef PHYSICS_3D
			var intCoordinate = [];
			
			if (boolSmall === true) {
				var dblCoordinateX = physicsHandle.dblPosition[0] / Constants.dblGameBlocksize;
				var dblCoordinateY = physicsHandle.dblPosition[1] / Constants.dblGameBlocksize;
				var dblCoordinateZ = physicsHandle.dblPosition[2] / Constants.dblGameBlocksize;
				
				var intCoordinateX = Math.floor(dblCoordinateX);
				var intCoordinateY = Math.floor(dblCoordinateY);
				var intCoordinateZ = Math.floor(dblCoordinateZ);
				
				var intShiftX = 0;
				var intShiftY = 0;
				var intShiftZ = 0;
				
				if ((dblCoordinateX % 1) < 0.5) {
					intShiftX = -1;
					
				} else if ((dblCoordinateX % 1) >= 0.5) {
					intShiftX = 1;
					
				}
				
				if ((dblCoordinateY % 1) < 0.5) {
					intShiftY = -1;
					
				} else if ((dblCoordinateY % 1) >= 0.5) {
					intShiftY = 1;
					
				}
				
				if ((dblCoordinateZ % 1) < 0.5) {
					intShiftZ = -1;
					
				} else if ((dblCoordinateZ % 1) >= 0.5) {
					intShiftZ = 1;
					
				}
				
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY, intCoordinateZ ]);
				intCoordinate.push([ intCoordinateX, intCoordinateY + intShiftY, intCoordinateZ ]);
				intCoordinate.push([ intCoordinateX, intCoordinateY, intCoordinateZ + intShiftZ ]);
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY + intShiftY, intCoordinateZ ]);
				intCoordinate.push([ intCoordinateX, intCoordinateY + intShiftY, intCoordinateZ + intShiftZ ]);
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY, intCoordinateZ + intShiftZ ]);
				intCoordinate.push([ intCoordinateX + intShiftX, intCoordinateY + intShiftY, intCoordinateZ + intShiftZ ]);
				
			} else if (boolSmall === false) {
				var intCoordinateX = Math.floor(physicsHandle.dblPosition[0] / Constants.dblGameBlocksize);
				var intCoordinateY = Math.floor(physicsHandle.dblPosition[1] / Constants.dblGameBlocksize);
				var intCoordinateZ = Math.floor(physicsHandle.dblPosition[2] / Constants.dblGameBlocksize);
				
				for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
					for (var intFor2 = 0; intFor2 < 3; intFor2 += 1) {
						for (var intFor3 = 0; intFor3 < 3; intFor3 += 1) {
							intCoordinate.push([ intCoordinateX + [ 0, -1, 1 ][intFor1], intCoordinateY + [ -1, 0, 1 ][intFor2], intCoordinateZ + [ 0, -1, 1 ][intFor3] ]);
						}
					}
				}
				
			}
			
			for (var intFor1 = 0; intFor1 < intCoordinate.length; intFor1 += 1) {
				var intCoordinateX = intCoordinate[intFor1][0];
				var intCoordinateY = intCoordinate[intFor1][1];
				var intCoordinateZ = intCoordinate[intFor1][2];
				
				var dblPositionX = intCoordinateX + (0.5 * Constants.dblGameBlocksize);
				var dblPositionY = intCoordinateY + (0.5 * Constants.dblGameBlocksize);
				var dblPositionZ = intCoordinateZ + (0.5 * Constants.dblGameBlocksize);
				
				if (Physics.functionWorldcol(intCoordinateX, intCoordinateY, intCoordinateZ) === false) {
					continue;
				}
				
				{
					var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblPositionX) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * Constants.dblGameBlocksize);
					var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblPositionY) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * Constants.dblGameBlocksize);
					var dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - dblPositionZ) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * Constants.dblGameBlocksize);
					
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
			#endif
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
					#ifdef PHYSICS_2D
					var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - physicsObjectcol.dblPosition[0]) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * physicsObjectcol.dblSize[0]);
					var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - physicsObjectcol.dblPosition[1]) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * physicsObjectcol.dblSize[1]);
					
					if (dblIntersectX >= 0.0) {
						continue;
						
					} else if (dblIntersectY >= 0.0) {
						continue;
						
					}
					#endif
					
					#ifdef PHYSICS_3D
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
					#endif
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
					
					#ifdef PHYSICS_2D
					var intDimensions = 2;
					#endif
					
					#ifdef PHYSICS_3D
					var intDimensions = 3;
					#endif
					
					for (var intFor1 = 0; intFor1 < intDimensions; intFor1 += 1) {
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

module.exports = Physics;