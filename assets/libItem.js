'use strict';

var Constants = {};
var Voxel = {};
var Physics = {};

var Item = {
	browserify: function(constantsHandle, voxelHandle, physicsHandle) {
		Constants = constantsHandle;
		Voxel = voxelHandle;
		Physics = physicsHandle;
	},
	
	itemHandle: {},
	
	functionFlagInit: null,
	functionFlagPlayer: null,
	meshFlag: [],
	
	meshArrow: [],
	
	init: function() {
		{
			Item.itemHandle = {};
		}

		if (Voxel === null) {
			return;
		}
		
		{
			Item.functionFlagInit = function(itemHandle) {
				
			};
			
			Item.functionFlagPlayer = function(itemHandle) {
				
			};
			
			for (var intFor1 = 0; intFor1 < 2; intFor1 += 1) {
				{
					var meshHandle = {};
					
					if (Voxel !== null) {
						if (intFor1 === 0) {
							meshHandle = Voxel.minecraftitemCreate('itemFlagRed', Constants.dblGameScale);
							
						} else if (intFor1 === 1) {
							meshHandle = Voxel.minecraftitemCreate('itemFlagBlue', Constants.dblGameScale);
							
						}
					}
					
					Item.meshFlag.push(meshHandle);
				}
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var meshHandle = {};
					
					if (Voxel !== null) {
						meshHandle = Voxel.minecraftitemCreate('itemArrow', Constants.dblGameScale);
					}
					
					Item.meshArrow.push(meshHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Item.itemHandle = {};
		}
		
		{
			Item.functionFlagInit = null;
			
			Item.functionFlagPlayer = null;
			
			Item.meshFlag = [];
		}
		
		{
			Item.meshArrow = [];
		}
	},
	
	initFlag: function(itemHandle) {
		{
			if (Item.itemHandle['itemFlag - teamRed'] === undefined) {
				var strIdent = 'itemFlag - teamRed';
				
				Item.itemHandle[strIdent] = {
					'strIdent': strIdent,
					'strPlayer': 'playerInitial',
					'dblPosition': [ 0.0, 0.0, 0.0 ],
					'dblVerlet': [ 0.0, 0.0, 0.0 ],
					'dblAcceleration': [ 0.0, 0.0, 0.0 ],
					'dblRotation': [ 0.0, 0.0, 0.0 ]
				};
				
				Item.functionFlagInit(Item.itemHandle[strIdent]);
			}

			if (Item.itemHandle['itemFlag - teamBlue'] === undefined) {
				var strIdent = 'itemFlag - teamBlue';
				
				Item.itemHandle[strIdent] = {
					'strIdent': strIdent,
					'strPlayer': 'playerInitial',
					'dblPosition': [ 0.0, 0.0, 0.0 ],
					'dblVerlet': [ 0.0, 0.0, 0.0 ],
					'dblAcceleration': [ 0.0, 0.0, 0.0 ],
					'dblRotation': [ 0.0, 0.0, 0.0 ]
				};
				
				Item.functionFlagInit(Item.itemHandle[strIdent]);
			}	
		}
		
		{
			if (itemHandle !== undefined) {
				itemHandle.strPlayer = 'playerInitial';
				
				Item.functionFlagInit(itemHandle);
			}
		}
	},
	
	saveBuffer: function() {
		var bufferHandle = new Buffer(256 * Object.keys(Item.itemHandle).length);
		var intBuffer = 0;

		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					intBuffer = Item.saveBufferpart(itemHandle, bufferHandle, intBuffer);
				}
		    }
	    }

		return bufferHandle.slice(0, intBuffer).toString('base64');
	},
	
	loadBuffer: function(strBuffer) {
		var bufferHandle = new Buffer(strBuffer, 'base64');
		
		{
			Item.itemHandle = {};
		}
		
		{
			var intBuffer = 0;
			
			{
				do {
					if (intBuffer >= bufferHandle.length) {
						break;
					}
					
					var itemHandle = {};
					
					{
						intBuffer = Item.loadBufferpart(itemHandle, bufferHandle, intBuffer);
					}
					
					{
						Item.itemHandle[itemHandle.strIdent] = itemHandle;
					}
				} while (true);
			}
		}
	},
	
	saveBufferpart: function(itemHandle, bufferHandle, intBuffer) {
		{
			bufferHandle.writeInt16LE(itemHandle.strIdent.length, intBuffer);
			
			intBuffer += 2;
			
			bufferHandle.write(itemHandle.strIdent, intBuffer, itemHandle.strIdent.length, 'ascii');
			
			intBuffer += itemHandle.strIdent.length;
		}
		
		{
			bufferHandle.writeInt16LE(itemHandle.strPlayer.length, intBuffer);
			
			intBuffer += 2;
			
			bufferHandle.write(itemHandle.strPlayer, intBuffer, itemHandle.strPlayer.length, 'ascii');
			
			intBuffer += itemHandle.strPlayer.length;
		}
		
		{
			bufferHandle.writeFloatLE(itemHandle.dblPosition[0], intBuffer + 0);
			bufferHandle.writeFloatLE(itemHandle.dblPosition[1], intBuffer + 4);
			bufferHandle.writeFloatLE(itemHandle.dblPosition[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(itemHandle.dblVerlet[0], intBuffer + 0);
			bufferHandle.writeFloatLE(itemHandle.dblVerlet[1], intBuffer + 4);
			bufferHandle.writeFloatLE(itemHandle.dblVerlet[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(itemHandle.dblAcceleration[0], intBuffer + 0);
			bufferHandle.writeFloatLE(itemHandle.dblAcceleration[1], intBuffer + 4);
			bufferHandle.writeFloatLE(itemHandle.dblAcceleration[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			bufferHandle.writeFloatLE(itemHandle.dblRotation[0], intBuffer + 0);
			bufferHandle.writeFloatLE(itemHandle.dblRotation[1], intBuffer + 4);
			bufferHandle.writeFloatLE(itemHandle.dblRotation[2], intBuffer + 8);
			
			intBuffer += 12;
		}
		
		return intBuffer;
	},
	
	loadBufferpart: function(itemHandle, bufferHandle, intBuffer) {
		{
			var intLength = bufferHandle.readInt16LE(intBuffer);

			intBuffer += 2;
			
			itemHandle.strIdent = bufferHandle.toString('ascii', intBuffer, intBuffer + intLength);
			
			intBuffer += intLength;
		}
		
		{
			var intLength = bufferHandle.readInt16LE(intBuffer);

			intBuffer += 2;
			
			itemHandle.strPlayer = bufferHandle.toString('ascii', intBuffer, intBuffer + intLength);
			
			intBuffer += intLength;
		}
		
		{
			itemHandle.dblPosition = [ 0.0, 0.0, 0.0 ];
			
			itemHandle.dblPosition[0] = bufferHandle.readFloatLE(intBuffer + 0);
			itemHandle.dblPosition[1] = bufferHandle.readFloatLE(intBuffer + 4);
			itemHandle.dblPosition[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			itemHandle.dblVerlet = [ 0.0, 0.0, 0.0 ];
			
			itemHandle.dblVerlet[0] = bufferHandle.readFloatLE(intBuffer + 0);
			itemHandle.dblVerlet[1] = bufferHandle.readFloatLE(intBuffer + 4);
			itemHandle.dblVerlet[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			itemHandle.dblAcceleration = [ 0.0, 0.0, 0.0 ];
			
			itemHandle.dblAcceleration[0] = bufferHandle.readFloatLE(intBuffer + 0);
			itemHandle.dblAcceleration[1] = bufferHandle.readFloatLE(intBuffer + 4);
			itemHandle.dblAcceleration[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		{
			itemHandle.dblRotation = [ 0.0, 0.0, 0.0 ];
			
			itemHandle.dblRotation[0] = bufferHandle.readFloatLE(intBuffer + 0);
			itemHandle.dblRotation[1] = bufferHandle.readFloatLE(intBuffer + 4);
			itemHandle.dblRotation[2] = bufferHandle.readFloatLE(intBuffer + 8);
			
			intBuffer += 12;
		}
		
		return intBuffer;
	},
	
	update: function() {
		{
			Item.updateLogic();
		}
		
		{
			if (Voxel !== null) {
				Item.updateGraphics();
			}
		}
	},
		
	updateLogic: function() {
		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					if (itemHandle.strIdent.indexOf('itemFlag') === 0) {
						{
							itemHandle.dblSize = Constants.dblFlagSize;
							itemHandle.dblGravity = Constants.dblFlagGravity;
							itemHandle.dblMaxvel = Constants.dblFlagMaxvel;
							itemHandle.dblFriction = Constants.dblFlagFriction;
	
							Physics.update(itemHandle);
							Physics.updateWorldcol(itemHandle, false);
						}
						
						{
							itemHandle.dblRotation[1] = (itemHandle.dblRotation[1] + Constants.dblFlagRotate) % (2.0 * Math.PI);
						}
						
						{
							Item.functionFlagPlayer(itemHandle);
						}
						
					} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
						{
							itemHandle.dblSize = Constants.dblArrowSize;
							itemHandle.dblGravity = Constants.dblArrowGravity;
							itemHandle.dblMaxvel = Constants.dblArrowMaxvel;
							itemHandle.dblFriction = Constants.dblArrowFriction;
							
							Physics.update(itemHandle);
							Physics.updateWorldcol(itemHandle, false);
						}
						
						{
							var dblVelocityX = itemHandle.dblPosition[0] - itemHandle.dblVerlet[0];
							var dblVelocityY = itemHandle.dblPosition[1] - itemHandle.dblVerlet[1];
							var dblVelocityZ = itemHandle.dblPosition[2] - itemHandle.dblVerlet[2];
	
							itemHandle.dblRotation[0] = 0.0;
							itemHandle.dblRotation[1] = Math.atan2(dblVelocityX, dblVelocityZ) + (1.0 * Math.PI);
							itemHandle.dblRotation[2] = Math.atan2(dblVelocityY, Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityZ * dblVelocityZ)));
						}
						
						{
							if (itemHandle.boolCollisionTop === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							} else if (itemHandle.boolCollisionSide === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							} else if (itemHandle.boolCollisionBottom === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							}
						}
						
					}
				}
			}
		}	
	},
	
	updateGraphics: function() {
		{
			for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
				var meshHandle = Item.meshArrow[intFor1];

				if (meshHandle.parent === undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.remove(meshHandle);
				}
			}
		}
		
		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					var meshHandle = null;
					
					{
						if (itemHandle.strIdent === 'itemFlag - teamRed') {
							meshHandle = Item.meshFlag[0];
							
						} else if (itemHandle.strIdent === 'itemFlag - teamBlue') {
							meshHandle = Item.meshFlag[1];
							
						} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
							for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
								if (Item.meshArrow[intFor1].parent !== undefined) {
									continue;
								}
								
								{
									meshHandle = Item.meshArrow[intFor1];
								}
								
								{
									break;
								}
							}
							
						}
					}
					
					{
						if (meshHandle.parent === undefined) {
							Voxel.voxelengineHandle.scene.add(meshHandle);
						}
					}
					
					{
						if (itemHandle.strIdent.indexOf('itemFlag') === 0) {
							meshHandle.position.x = itemHandle.dblPosition[0];
							meshHandle.position.y = itemHandle.dblPosition[1];
							meshHandle.position.z = itemHandle.dblPosition[2];
							
							meshHandle.rotation.x = itemHandle.dblRotation[0];
							meshHandle.rotation.y = itemHandle.dblRotation[1];
							meshHandle.rotation.z = itemHandle.dblRotation[2];

						} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
							meshHandle.position.x = itemHandle.dblPosition[0];
							meshHandle.position.y = itemHandle.dblPosition[1];
							meshHandle.position.z = itemHandle.dblPosition[2];
							
							meshHandle.rotation.x = itemHandle.dblRotation[0];
							meshHandle.rotation.y = itemHandle.dblRotation[1] + (0.5 * Math.PI);
							meshHandle.rotation.z = itemHandle.dblRotation[2] + (1.25 * Math.PI);
							
						}
					}
				}
			}
		}
	}
};

module.exports = Item;