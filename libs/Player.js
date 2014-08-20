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
			Player.minecraftskinController = Voxel.minecraftskinCreate();
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
				'strTeam': 'teamLogin',
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
	
	update: function() {
		{
			if (Player.playerHandle.hasOwnProperty('1') === true) {
				Player.playerHandle['1'].dblRotation[0] = 0.0;
				Player.playerHandle['1'].dblRotation[1] = Player.minecraftskinController.mesh.rotation.y;
				Player.playerHandle['1'].dblRotation[2] = Player.minecraftskinController.mesh.head.rotation.x;
			}
		}
		
		{
			for (var strIdent in Player.playerHandle) {
				var playerHandle = Player.playerHandle[strIdent];
				
				{
					playerHandle.dblSize = Constants.dblPlayerSize;
					playerHandle.dblGravity = Constants.dblPlayerGravity;
					playerHandle.dblMaxvel = Constants.dblPlayerMaxvel;
					playerHandle.dblFriction = Constants.dblPlayerFriction;
					
					Physics.update(playerHandle);
					Physics.updateVoxelcol(playerHandle);
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