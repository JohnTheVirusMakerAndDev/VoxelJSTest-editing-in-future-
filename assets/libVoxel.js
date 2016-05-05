'use strict';

var Constants = {};

var Voxel = {
	browserify: function(constantsHandle) {
		Constants = constantsHandle;
	},
	
	voxelengineHandle: null,
	
	voxelhighlightHandle: null,
	
	minecraftskinHandle: null,
	
	minecraftitemHandle: {},
	minecraftitemMaterial: null,
	
	init: function(functionGenerate) {
		{
			Voxel.voxelengineHandle = require('voxel-engine')({
				'texturePath': './images/',
				'generate': functionGenerate,
				'materials': [ 'voxelVoid', 'voxelBrick', 'voxelDirt', 'voxelGrass', 'voxelPlank', 'voxelStone', 'voxelSpawnRed', 'voxelSpawnBlue', 'voxelFlagRed', 'voxelFlagBlue', 'voxelSeparator' ],
				'controls': {
					'discreteFire': true
				},
				'fogDisabled': false,
				'statsDisabled': true
			});
			
			Voxel.voxelengineHandle.appendTo(window.document.body);
		}
		
		{
			Voxel.voxelhighlightHandle = require('voxel-highlight')(Voxel.voxelengineHandle, {
				'enabled': function() {
					return false;
				},
				'distance': 8,
				'wireframeLinewidth': 16,
				'wireframeOpacity': 1.0,
				'color': 0xFFFFFF,
				'adjacentActive': function() {
					return false;
				},
				'selectActive': function() {
					return false;
				}
			});
			
			Voxel.voxelhighlightHandle.positionCreate = null;
			Voxel.voxelhighlightHandle.positionDestroy = null;
			
			Voxel.voxelhighlightHandle.on('highlight-adjacent', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionCreate = positionHandle;
			});
			
			Voxel.voxelhighlightHandle.on('remove-adjacent', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionCreate = null;
			});
			
			Voxel.voxelhighlightHandle.on('highlight', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionDestroy = positionHandle;
			});
			
			Voxel.voxelhighlightHandle.on('remove', function(positionHandle) {
				Voxel.voxelhighlightHandle.positionDestroy = null;
			});
		}
		
		{
			Voxel.minecraftskinHandle = require('minecraft-skin');
		}
		
		{
			Voxel.minecraftitemHandle = {};
			
			Voxel.minecraftitemMaterial = new Voxel.voxelengineHandle.THREE.MeshBasicMaterial({
				'vertexColors': Voxel.voxelengineHandle.THREE.FaceColors
			});
		}
	},
	
	dispel: function() {
		{
			Voxel.voxelengineHandle = null;
		}
		
		{
			Voxel.voxelhighlightHandle = null;
		}
		
		{
			Voxel.minecraftskinHandle = null;
		}
		
		{
			Voxel.minecraftitemHandle = {};
			
			Voxel.minecraftitemMaterial = null;
		}
	},
	
	minecraftskinCreate: function() {
		var minecraftskinHandle = Voxel.minecraftskinHandle(Voxel.voxelengineHandle.THREE, '', {
			'scale': new Voxel.voxelengineHandle.THREE.Vector3(Constants.dblGameScale, Constants.dblGameScale, Constants.dblGameScale)
		});
		
		{
			minecraftskinHandle.strTeam = '';
			
			minecraftskinHandle.strItem = '';
		}
		
		{
			minecraftskinHandle.meshPickaxe = Voxel.minecraftitemCreate('itemPickaxe', 1.0);
			
			minecraftskinHandle.meshPickaxe.position.x = 0.0 + 6.0;
			minecraftskinHandle.meshPickaxe.position.y = 0.0 - 9.5;
			minecraftskinHandle.meshPickaxe.position.z = 0.0;
			
			minecraftskinHandle.meshPickaxe.rotation.x = 0.0;
			minecraftskinHandle.meshPickaxe.rotation.y = 0.0;
			minecraftskinHandle.meshPickaxe.rotation.z = 1.25 * Math.PI;
		}
		
		{
			minecraftskinHandle.meshSword = Voxel.minecraftitemCreate('itemSword', 1.0);
			
			minecraftskinHandle.meshSword.position.x = 0.0 + 7.0;
			minecraftskinHandle.meshSword.position.y = 0.0 - 9.5;
			minecraftskinHandle.meshSword.position.z = 0.0;
			
			minecraftskinHandle.meshSword.rotation.x = 0.0;
			minecraftskinHandle.meshSword.rotation.y = 0.0;
			minecraftskinHandle.meshSword.rotation.z = 1.25 * Math.PI;
		}
		
		{
			minecraftskinHandle.meshBow = Voxel.minecraftitemCreate('itemBow', 1.0);
			
			minecraftskinHandle.meshBow.position.x = 0.0;
			minecraftskinHandle.meshBow.position.y = 0.0 - 7.5;
			minecraftskinHandle.meshBow.position.z = 0.0;
			
			minecraftskinHandle.meshBow.rotation.x = 0.0;
			minecraftskinHandle.meshBow.rotation.y = 0.0;
			minecraftskinHandle.meshBow.rotation.z = 1.25 * Math.PI;
		}
		
		return minecraftskinHandle;
	},
	
	minecraftskinUpdate: function(minecraftskinHandle, playerHandle) {
		{
			if (minecraftskinHandle.strTeam !== playerHandle.strTeam) {
				if (playerHandle.strTeam === 'teamRed') {
					minecraftskinHandle.setImage(jQuery('#idSkinRed').get(0));
					
				} else if (playerHandle.strTeam === 'teamBlue') {
					minecraftskinHandle.setImage(jQuery('#idSkinBlue').get(0));
					
				}
				
				minecraftskinHandle.strTeam = playerHandle.strTeam;
			}
		}
		
		{
			if (minecraftskinHandle.strItem !== playerHandle.strItem) {
				minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshPickaxe);
				minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshSword);
				minecraftskinHandle.rightArm.remove(minecraftskinHandle.meshBow);
				
				if (playerHandle.strItem === 'itemPickaxe') {
					minecraftskinHandle.rightArm.add(minecraftskinHandle.meshPickaxe);
					
				} else if (playerHandle.strItem === 'itemSword') {
					minecraftskinHandle.rightArm.add(minecraftskinHandle.meshSword);
					
				} else if (playerHandle.strItem === 'itemBow') {
					minecraftskinHandle.rightArm.add(minecraftskinHandle.meshBow);
					
				}
				
				minecraftskinHandle.strItem = playerHandle.strItem;
			}
		}
		
		{
			if (playerHandle.strItem === '') {
				minecraftskinHandle.rightArm.rotation.z = 2.0 * Math.cos((0.08 * playerHandle.intWalk) + (1.5 * Math.PI));
				minecraftskinHandle.leftArm.rotation.z = 2.0 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				
				minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (1.5 * Math.PI));
				
			} else if (playerHandle.strItem === 'itemPickaxe') {
				var dblWeapon = 0.0;
				
				if (playerHandle.intWeapon === 0) {
					dblWeapon = 0.47 * Math.PI;
					
				} else if (playerHandle.intWeapon !== 0) {
					var dblProgress = 1.0 - (parseFloat(playerHandle.intWeapon) / parseFloat(Constants.intInteractionPickaxeDuration));
					
					if (dblProgress < 0.3) {
						dblProgress = (dblProgress - 0.0) / 0.3;
						
						dblWeapon = (0.47 * Math.PI) + (dblProgress * 0.5 * Math.PI);
						
					} else if (dblProgress < 0.7) {
						dblProgress = (dblProgress - 0.3) / 0.4;
						
						dblWeapon = (0.97 * Math.PI) - (dblProgress * 1.0 * Math.PI);
						
					} else if (dblProgress < 1.0) {
						dblProgress = (dblProgress - 0.7) / 0.3;

						dblWeapon = (-0.03 * Math.PI) + (dblProgress * 0.5 * Math.PI);
						
					}
					
				}
				
				minecraftskinHandle.rightArm.rotation.z = minecraftskinHandle.mesh.head.rotation.x + dblWeapon;
				minecraftskinHandle.leftArm.rotation.z = 2.0 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				
				minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (1.5 * Math.PI));
				
			} else if (playerHandle.strItem === 'itemSword') {
				var dblWeapon = 0.0;
				
				if (playerHandle.intWeapon === 0) {
					dblWeapon = 0.47 * Math.PI;
					
				} else if (playerHandle.intWeapon !== 0) {
					var dblProgress = 1.0 - (parseFloat(playerHandle.intWeapon) / parseFloat(Constants.intInteractionSwordDuration));
					
					if (dblProgress < 0.3) {
						dblProgress = (dblProgress - 0.0) / 0.3;
						
						dblWeapon = (0.47 * Math.PI) + (dblProgress * 0.5 * Math.PI);
						
					} else if (dblProgress < 0.7) {
						dblProgress = (dblProgress - 0.3) / 0.4;
						
						dblWeapon = (0.97 * Math.PI) - (dblProgress * 1.0 * Math.PI);
						
					} else if (dblProgress < 1.0) {
						dblProgress = (dblProgress - 0.7) / 0.3;

						dblWeapon = (-0.03 * Math.PI) + (dblProgress * 0.5 * Math.PI);
						
					}
					
				}
				
				minecraftskinHandle.rightArm.rotation.z = minecraftskinHandle.mesh.head.rotation.x + dblWeapon;
				minecraftskinHandle.leftArm.rotation.z = 2.0 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				
				minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (1.5 * Math.PI));
				
			} else if (playerHandle.strItem === 'itemBow') {
				minecraftskinHandle.rightArm.rotation.z = minecraftskinHandle.mesh.head.rotation.x + (0.47 * Math.PI);
				minecraftskinHandle.leftArm.rotation.z = 2.0 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				
				minecraftskinHandle.rightLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (0.5 * Math.PI));
				minecraftskinHandle.leftLeg.rotation.z = 1.4 * Math.cos((0.08 * playerHandle.intWalk) + (1.5 * Math.PI));
				
			}
		}
	},
	
	minecraftitemCreate: function(strItem, dblScale) {
		var strFingerprint = '';
		
		strFingerprint += strItem + ';';
		strFingerprint += dblScale + ';';
		
		if (Voxel.minecraftitemHandle[strFingerprint] === undefined) {
			var contextHandle = window.document.createElement('canvas').getContext('2d');
			
			{
				if (strItem === 'itemFlagRed') {
					contextHandle.drawImage(jQuery('#idItemFlagRed').get(0), 0, 0);

				} else if (strItem === 'itemFlagBlue') {
					contextHandle.drawImage(jQuery('#idItemFlagBlue').get(0), 0, 0);
					
				} else if (strItem === 'itemPickaxe') {
					contextHandle.drawImage(jQuery('#idItemPickaxe').get(0), 0, 0);
					
				} else if (strItem === 'itemSword') {
					contextHandle.drawImage(jQuery('#idItemSword').get(0), 0, 0);

				} else if (strItem === 'itemBow') {
					contextHandle.drawImage(jQuery('#idItemBow').get(0), 0, 0);

				} else if (strItem === 'itemArrow') {
					contextHandle.drawImage(jQuery('#idItemArrow').get(0), 0, 0);
					
				}
			}
			
			var geometryHandle = new Voxel.voxelengineHandle.THREE.Geometry();
			
			{
				for (var intFor1 = 0; intFor1 < 16; intFor1 += 1) {
					for (var intFor2 = 0; intFor2 < 16; intFor2 += 1) {
						var intColor = contextHandle.getImageData(intFor1, intFor2, 1, 1).data

						if (intColor[3] === 0) {
							continue;
						}
						
						{
							var cubegeometryHandle = new Voxel.voxelengineHandle.THREE.CubeGeometry(dblScale, dblScale, dblScale);
							
							for (var intFor3 = 0; intFor3 < cubegeometryHandle.faces.length; intFor3 += 1) {
								if (cubegeometryHandle.faces[intFor3] === undefined) {
									continue;
								}
								
								{
									cubegeometryHandle.faces[intFor3].color = new Voxel.voxelengineHandle.THREE.Color((intColor[0] << 16) + (intColor[1] << 8) + (intColor[2] << 0));
								}
							}
							
							for (var intFor3 = 0; intFor3 < cubegeometryHandle.vertices.length; intFor3 += 1) {
								if (cubegeometryHandle.vertices[intFor3] === undefined) {
									continue;
								}
								
								{
									cubegeometryHandle.vertices[intFor3].x += dblScale * (8 - intFor1);
									cubegeometryHandle.vertices[intFor3].y += dblScale * (8 - intFor2);
									cubegeometryHandle.vertices[intFor3].z += 0.0;
								}
							}
							
							Voxel.voxelengineHandle.THREE.GeometryUtils.merge(geometryHandle, cubegeometryHandle);
						}
					}
				}
			}
			
			{
				Voxel.minecraftitemHandle[strFingerprint] = geometryHandle;
			}
		}
		
		return new Voxel.voxelengineHandle.THREE.Mesh(Voxel.minecraftitemHandle[strFingerprint], Voxel.minecraftitemMaterial);
	}
};

module.exports = Voxel;