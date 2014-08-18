var Player = {
	playerHandle: {},
	
	minecraftskinCtrl: null,
	
	minecraftskinEnemy: [],
	
	init: function() {
		{
			Player.playerHandle = {};
		}

		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			Player.minecraftskinCtrl = Voxel.minecraftskinCreate();
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

		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			Player.minecraftskinCtrl = null;
		}
		
		{
			Player.minecraftskinEnemy = [];
		}
	},
	
	initCtrl: function() {
		{
			var strIdent = 'playerCtrl';
			
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
			Player.minecraftskinCtrl.mesh.cameraInside.add(Voxel.voxelengineHandle.camera);
		}
		
		{
			var physicsHandle = Voxel.voxelengineHandle.makePhysical(Player.minecraftskinCtrl.mesh);
			
			{
				physicsHandle.blocksCreation = true;
				
				physicsHandle.position = Player.minecraftskinCtrl.mesh.position;
				
				physicsHandle.roll = null;
				physicsHandle.yaw = Player.minecraftskinCtrl.mesh;
				physicsHandle.pitch = Player.minecraftskinCtrl.mesh.head;
			}
			
			Voxel.voxelengineHandle.control(physicsHandle);
		}
	},
	
	update: function() {
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
					if (playerHandle.strIdent.indexOf('playerCtrl') === 0) {
						playerHandle.dblRotation[0] = 0.0;
						playerHandle.dblRotation[1] = Player.minecraftskinCtrl.mesh.rotation.y;
						playerHandle.dblRotation[2] = Player.minecraftskinCtrl.mesh.head.rotation.x;
					}
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

					if (Math.abs(dblVelocityX) > 0.001) {
						playerHandle.intInteractionWalk += Constants.intGameloopInterval;
						
					} else if (Math.abs(dblVelocityZ) > 0.001) {
						playerHandle.intInteractionWalk += Constants.intGameloopInterval;
						
					}
					
					if (Math.abs(dblVelocityX) < 0.001) {
						if (Math.abs(dblVelocityZ) < 0.001) {
							playerHandle.intInteractionWalk = 0;
						}
					}
					
					if (playerHandle.intInteractionWeapon > 0) {
						playerHandle.intInteractionWeapon = Math.max(0, playerHandle.intInteractionWeapon - Constants.intGameloopInterval);
					}
				}
			}
		}

		if (typeof Voxel === 'undefined') {
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
						if (playerHandle.strIdent.indexOf('playerCtrl') === 0) {
							minecraftskinHandle = Player.minecraftskinCtrl;
							
						} else if (playerHandle.strIdent.indexOf('playerCtrl') !== 0) {
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
						minecraftskinHandle.mesh.position.x = playerHandle.dblPosition[0];
						minecraftskinHandle.mesh.position.y = playerHandle.dblPosition[1] - (0.5 * Constants.dblPlayerSize[1]);
						minecraftskinHandle.mesh.position.z = playerHandle.dblPosition[2];
						
						minecraftskinHandle.mesh.rotation.y = playerHandle.dblRotation[1];

						minecraftskinHandle.mesh.head.rotation.x = playerHandle.dblRotation[2];
					}
					
					{
						Voxel.minecraftskinUpdate(minecraftskinHandle, playerHandle);
					}
				}
			}
		}
	}
};