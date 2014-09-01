'use strict';

var Constants = {};
var Voxel = {};
var Physics = {};

var Player = {
	playerHandle: {},
	
	minecraftskinController: null,
	
	minecraftskinEnemy: [],
	
	init: function() {
		{
			Player.playerHandle = {};
		}

		if (Voxel === null) {
			return;
		}
		
		{
			var minecraftskinHandle = Voxel.minecraftskinCreate();
			
			Player.minecraftskinController = minecraftskinHandle;
		}
		
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var minecraftskinHandle = Voxel.minecraftskinCreate();
					
					Player.minecraftskinEnemy.push(minecraftskinHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Player.playerHandle = {};
		}

		if (Voxel === null) {
			return;
		}
		
		{
			Player.minecraftskinController = null;
		}
		
		{
			Player.minecraftskinEnemy = [];
		}
	},
	
	initController: function() {
		{
			var strIdent = '1';
			
			Player.playerHandle[strIdent] = {
				'strIdent': strIdent,
				'strTeam': '',
				'strItem': '',
				'strName': '',
				'intScore': 0,
				'intKills': 0,
				'intDeaths': 0,
				'intHealth': 0,
				'dblPosition': [ 0.0, 0.0, 0.0 ],
				'dblVerlet': [ 0.0, 0.0, 0.0 ],
				'dblAcceleration': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ],
				'intJumpcount': 0,
				'intInteractionWalk': 0,
				'intInteractionWeapon': 0
			};
		}
		
		{
			Player.minecraftskinController.mesh.cameraInside.add(Voxel.voxelengineHandle.camera);
		}
		
		{
			var physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinController.mesh);
			
			{
				physicsHandle.blocksCreation = true;
				
				physicsHandle.position = Player.minecraftskinController.mesh.position;
				
				physicsHandle.roll = null;
				physicsHandle.yaw = Player.minecraftskinController.mesh;
				physicsHandle.pitch = Player.minecraftskinController.mesh.head;
			}
			
			Voxel.voxelengineHandle.control(physicsHandle);
		}
	},
	
	saveBuffer: function() {
		var bufferHandle = new Buffer(256 * Object.keys(Player.playerHandle).length);
		var intBuffer = 0;

		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];
				
				{
					intBuffer = Player.saveBufferpart(playerHandle, bufferHandle, intBuffer);
				}
		    }
	    }

		return bufferHandle.slice(0, intBuffer).toString('base64');
	},
	
	loadBuffer: function(strBuffer) {
		var bufferHandle = new Buffer(strBuffer, 'base64');
		
		{
			Player.playerHandle = {};
		}
		
		{
			var intBuffer = 0;
			
			{
				do {
					if (intBuffer >= bufferHandle.length) {
						break;
					}
					
					var playerHandle = {};
					
					{
						intBuffer = Player.loadBufferpart(playerHandle, bufferHandle, intBuffer);
					}
					
					{
						Player.playerHandle[playerHandle.strIdent] = playerHandle;
					}
				} while (true);
			}
		}
	},
	
	saveBufferpart: function(playerHandle, bufferHandle, intBuffer) {
		{
			bufferHandle.writeInt16LE(playerHandle.strIdent.length, intBuffer);
			
			intBuffer += 2;
			
			bufferHandle.write(playerHandle.strIdent, intBuffer, playerHandle.strIdent.length, 'ascii');
			
			intBuffer += playerHandle.strIdent.length;
		}
		
		{
			var intTeam = 0;
			
			if (playerHandle.strTeam === 'teamRed') {
				intTeam = 1;
				
			} else if (playerHandle.strTeam === 'teamBlue') {
				intTeam = 2;
				
			}
			
			bufferHandle.writeInt16LE(intTeam, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			var intItem = 0;
			
			if (playerHandle.strItem === 'itemPickaxe') {
				intItem = 1;
				
			} else if (playerHandle.strItem === 'itemSword') {
				intItem = 2;
				
			} else if (playerHandle.strItem === 'itemBow') {
				intItem = 3;
				
			}
			
			bufferHandle.writeInt16LE(intItem, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.strName.length, intBuffer);
			
			intBuffer += 2;
			
			bufferHandle.write(playerHandle.strName, intBuffer, playerHandle.strName.length, 'ascii');
			
			intBuffer += playerHandle.strName.length;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intScore, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intKills, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intDeaths, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intHealth, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeFloatLE(playerHandle.dblPosition[0], intBuffer + 0);
			bufferHandle.writeFloatLE(playerHandle.dblPosition[1], intBuffer + 4);
			bufferHandle.writeFloatLE(playerHandle.dblPosition[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(playerHandle.dblVerlet[0], intBuffer + 0);
			bufferHandle.writeFloatLE(playerHandle.dblVerlet[1], intBuffer + 4);
			bufferHandle.writeFloatLE(playerHandle.dblVerlet[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(playerHandle.dblAcceleration[0], intBuffer + 0);
			bufferHandle.writeFloatLE(playerHandle.dblAcceleration[1], intBuffer + 4);
			bufferHandle.writeFloatLE(playerHandle.dblAcceleration[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(playerHandle.dblRotation[0], intBuffer + 0);
			bufferHandle.writeFloatLE(playerHandle.dblRotation[1], intBuffer + 4);
			bufferHandle.writeFloatLE(playerHandle.dblRotation[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intJumpcount, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intInteractionWalk, intBuffer);
			
			intBuffer += 2;
		}
		
		{
			bufferHandle.writeInt16LE(playerHandle.intInteractionWalk, intBuffer);
			
			intBuffer += 2;
		}
		
		return intBuffer;
	},
	
	loadBufferpart: function(playerHandle, bufferHandle, intBuffer) {
		{
			var intLength = bufferHandle.readInt16LE(intBuffer);

			intBuffer += 2;
			
			playerHandle.strIdent = bufferHandle.toString('ascii', intBuffer, intBuffer + intLength);
			
			intBuffer += intLength;
		}
		
		{
			playerHandle.strTeam = '';
			
			var intTeam = bufferHandle.readInt16LE(intBuffer);
			
			if (intTeam === 1) {
				playerHandle.strTeam = 'teamRed';
				
			} else if (intTeam === 2) {
				playerHandle.strTeam = 'teamBlue';
				
			}
			
			intBuffer += 2;
		}
		
		{
			playerHandle.strItem = '';
			
			var intItem = bufferHandle.readInt16LE(intBuffer);
			
			if (intItem === 1) {
				playerHandle.strItem = 'itemPickaxe';
				
			} else if (intItem === 2) {
				playerHandle.strItem = 'itemSword';
				
			} else if (intItem === 3) {
				playerHandle.strItem = 'itemBow';
				
			}
			
			intBuffer += 2;
		}
		
		{
			var intLength = bufferHandle.readInt16LE(intBuffer);

			intBuffer += 2;
			
			playerHandle.strName = bufferHandle.toString('ascii', intBuffer, intBuffer + intLength);
			
			intBuffer += intLength;
		}
		
		{
			playerHandle.intScore = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.intKills = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.intDeaths = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.intHealth = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.dblPosition = [ 0.0, 0.0, 0.0 ];
			
			playerHandle.dblPosition[0] = bufferHandle.readFloatLE(intBuffer + 0);
			playerHandle.dblPosition[1] = bufferHandle.readFloatLE(intBuffer + 4);
			playerHandle.dblPosition[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			playerHandle.dblVerlet = [ 0.0, 0.0, 0.0 ];
			
			playerHandle.dblVerlet[0] = bufferHandle.readFloatLE(intBuffer + 0);
			playerHandle.dblVerlet[1] = bufferHandle.readFloatLE(intBuffer + 4);
			playerHandle.dblVerlet[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			playerHandle.dblAcceleration = [ 0.0, 0.0, 0.0 ];
			
			playerHandle.dblAcceleration[0] = bufferHandle.readFloatLE(intBuffer + 0);
			playerHandle.dblAcceleration[1] = bufferHandle.readFloatLE(intBuffer + 4);
			playerHandle.dblAcceleration[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			playerHandle.dblRotation = [ 0.0, 0.0, 0.0 ];
			
			playerHandle.dblRotation[0] = bufferHandle.readFloatLE(intBuffer + 0);
			playerHandle.dblRotation[1] = bufferHandle.readFloatLE(intBuffer + 4);
			playerHandle.dblRotation[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			playerHandle.intJumpcount = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.intInteractionWalk = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		{
			playerHandle.intInteractionWalk = bufferHandle.readInt16LE(intBuffer);
			
			intBuffer += 2;
		}
		
		return intBuffer;
	},
	
	update: function() {
		{
			if (Player.playerHandle['1'] !== undefined) {
				Player.playerHandle['1'].dblRotation[0] = 0.0;
				Player.playerHandle['1'].dblRotation[1] = Player.minecraftskinController.mesh.rotation.y;
				Player.playerHandle['1'].dblRotation[2] = Player.minecraftskinController.mesh.head.rotation.x;
			}
		}
		
		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];

				if (playerHandle.strTeam === '') {
					continue;
				}
				
				{
					playerHandle.dblSize = Constants.dblPlayerSize;
					playerHandle.dblGravity = Constants.dblPlayerGravity;
					playerHandle.dblMaxvel = Constants.dblPlayerMaxvel;
					playerHandle.dblFriction = Constants.dblPlayerFriction;
					
					Physics.update(playerHandle);
					Physics.updateWorldcol(playerHandle);
				}
				
				{
					if (playerHandle.boolCollisionBottom === true) {
						if (Math.abs(playerHandle.dblPosition[1] - playerHandle.dblVerlet[1]) < 0.001) {
							playerHandle.intJumpcount = 1;
						}
					}
				}
				
				{
					var dblVelocityX = playerHandle.dblPosition[0] - playerHandle.dblVerlet[0];
					var dblVelocityY = playerHandle.dblPosition[1] - playerHandle.dblVerlet[1];
					var dblVelocityZ = playerHandle.dblPosition[2] - playerHandle.dblVerlet[2];

					if (Math.abs(dblVelocityX) > 0.01) {
						playerHandle.intInteractionWalk += 1
						
					} else if (Math.abs(dblVelocityZ) > 0.01) {
						playerHandle.intInteractionWalk += 1;
						
					}
					
					if (Math.abs(dblVelocityX) < 0.01) {
						if (Math.abs(dblVelocityZ) < 0.01) {
							playerHandle.intInteractionWalk = 0;
						}
					}
					
					if (playerHandle.intInteractionWeapon > 0) {
						playerHandle.intInteractionWeapon -= 1;
					}
				}
			}
		}

		if (Voxel === null) {
			return;
		}
		
		{
			for (var intFor1 = 0; intFor1 < Player.minecraftskinEnemy.length; intFor1 += 1) {
				var minecraftskinHandle = Player.minecraftskinEnemy[intFor1];

				if (minecraftskinHandle.mesh.parent === undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.remove(minecraftskinHandle.mesh);
				}
			}
		}
		
		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];

				if (playerHandle.strTeam === '') {
					continue;
				}
				
				{
					var minecraftskinHandle = null;
					
					{
						if (playerHandle.strIdent === '1') {
							minecraftskinHandle = Player.minecraftskinController;
							
						} else if (playerHandle.strIdent !== '1') {
							for (var intFor1 = 0; intFor1 < Player.minecraftskinEnemy.length; intFor1 += 1) {
								if (Player.minecraftskinEnemy[intFor1].mesh.parent !== undefined) {
									continue;
								}
								
								{
									minecraftskinHandle = Player.minecraftskinEnemy[intFor1];
								}
								
								{
									break;
								}
							}
							
						}
					}
					
					{
						if (minecraftskinHandle.mesh.parent === undefined) {
							Voxel.voxelengineHandle.scene.add(minecraftskinHandle.mesh);
						}
					}

					{
						if (playerHandle.strIdent === '1') {
							minecraftskinHandle.mesh.position.x = playerHandle.dblPosition[0];
							minecraftskinHandle.mesh.position.y = playerHandle.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
							minecraftskinHandle.mesh.position.z = playerHandle.dblPosition[2];
							
						} else if (playerHandle.strIdent !== '1') {
							minecraftskinHandle.mesh.position.x = playerHandle.dblPosition[0];
							minecraftskinHandle.mesh.position.y = playerHandle.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
							minecraftskinHandle.mesh.position.z = playerHandle.dblPosition[2];
							
							minecraftskinHandle.mesh.rotation.y = playerHandle.dblRotation[1];
	
							minecraftskinHandle.mesh.head.rotation.x = playerHandle.dblRotation[2];
							
						}
					}
					
					{
						Voxel.minecraftskinUpdate(minecraftskinHandle, playerHandle);
					}
				}
			}
		}
	}
};

module.exports = function(constantsHandle, voxelHandle, physicsHandle) {
	Constants = constantsHandle;
	Voxel = voxelHandle;
	Physics = physicsHandle;
	
	return Player;
}