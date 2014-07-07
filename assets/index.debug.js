jQuery(document).ready(function() {
	{
		jQuery('#idLoading')
			.dialog({
				'autoOpen': true,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': false,
				'resizable': false,
				'width': 'auto',
				'create': function() {
					{
						jQuery(this).closest('.ui-dialog')
							.css({
								'border': 'none',
								'background': 'none'
							})
						;
						
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
							.css({
								'display': 'none'
							})
						;
					}
					
					{
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
							.hide()
						;
					}
				}
			})
		;
	}
	
	{
		jQuery('#idLogin')
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': false,
				'resizable': false,
				'width': 422,
				'create': function() {
					{
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
							.css({
								'line-height': '125%'
							})
						;
						
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
							.hide()
						;
					}
				}
			})
		;
	}
	
	{
		jQuery('#idOnline')
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': false,
				'resizable': false,
				'width': 422,
				'create': function() {
					{
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
							.css({
								'line-height': '125%'
							})
						;
						
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
							.hide()
						;
					}
				}
			})
		;
	}

	{
		jQuery('#idLogin_Team').find('option').eq(Math.round(Math.random()))
		    .prop({
		        'selected': true
		    })
		;
		
		jQuery('#idLogin_Team')
			.selectmenu({
				'disabled': false,
				'width': 300
			})
		;
		
		jQuery('#idLogin_Team').closest('.ui-dialog').find('.ui-selectmenu-button')
			.css({
				'background': 'none'
			})
		;
	}
	
	{
		jQuery('#idLogin_Login')
			.button({
				'disabled': false,
				'icons': {
					'primary': 'ui-icon-check'
				}
			})
			.off('click')
			.on('click', function() {
				{
					jQuery('.ui-dialog').find('.ui-dialog-content')
						.dialog('close')
					;
				}
				
				{
					jQuery('#idLoading')
						.dialog('open')
					;
				}
				
				{
					Socket.socketHandle.emit('loginHandle', {
						'strName': jQuery('#idLogin_Name').val(),
						'strPassword': jQuery('#idLogin_Password').val(),
						'strTeam': jQuery('#idLogin_Team').val()
					});
				}
			});
		;
	}
	
	{
		jQuery('#idMenu')
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': false,
				'resizable': false,
				'width': 640,
				'create': function() {
					{
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
							.css({
								'line-height': '125%'
							})
						;
						
						jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
							.hide()
						;
					}
				}
			})
		;
	}

	{
		Socket.init();
	}
});

var Socket = {
	socketHandle: null,

	playerHandle: {},
	
	init: function() {
		Socket.socketHandle = null;
		
		Socket.playerHandle = {};
		
		{
			jQuery.getScript('/socket.io/socket.io.js', function() {
				Socket.socketHandle = io('/', {
					'reconnection': true,
					'reconnectionDelay': 1000,
					'reconnectionDelayMax': 5000,
					'timeout': 5000
				});

				Socket.socketHandle.on('loginHandle', function(jsonHandle) {
					console.log('loginHandle');
					console.log(jsonHandle);
					
					{
						jQuery('.ui-dialog').find('.ui-dialog-content')
							.dialog('close')
						;
					}
					
					{
						if (jsonHandle.strType === 'typeReject') {
							{
								jQuery('#idLogin')
									.dialog('open')
								;
								
								jQuery('#idOnline')
									.dialog('option', 'position', {
										'my': 'left top',
										'at': 'right top',
										'of': '#idLogin'
									})
									.dialog('open')
								;
							}
							
							{
								jQuery('#idLogin_Message')
									.text(jsonHandle.strMessage)
								;
							}
							
							{
								if (jsonHandle.strMessage === '') {
									jQuery('#idLogin').children().slice(0, 4)
										.css({
											'display': 'none'
										})
									;
									
								} else if (jsonHandle.strMessage !== '') {
									jQuery('#idLogin').children().slice(0, 4)
										.css({
											'display': 'block'
										})
									;
									
								}
							}
							
							{
								jQuery('#idLogin')
									.dialog('open')
								;
							}
							
						} else if (jsonHandle.strType === 'typeAccept') {
							
	
						}
					}
				});
				
				Socket.socketHandle.on('onlineHandle', function(jsonHandle) {
					console.log('onlineHandle');
					console.log(jsonHandle);
					
					{
						jQuery('#idOnline_RedServer')
							.text('Red' + ' ' + jsonHandle.serverHandle.intScoreRed)
						;

						jQuery('#idOnline_BlueServer')
							.text('Blue' + ' ' + jsonHandle.serverHandle.intScoreBlue)
						;
					}
					
					{
						jQuery('#idOnline_RedPlayer')
							.empty()
						;

						jQuery('#idOnline_BluePlayer')
							.empty()
						;
					}
					
					{
						for (var intFor1 = 0; intFor1 < jsonHandle.playerHandle.length; intFor1 += 1) {
							var playerHandle = jsonHandle.playerHandle[intFor1];
							
							{
								if (playerHandle.strTeam === 'teamRed') {
									jQuery('#idOnline_RedPlayer')
										.append(jQuery('<div></div>')
											.text(playerHandle.strName + ' ' + playerHandle.intScore + ' ' + playerHandle.intKills + ' ' + playerHandle.intDeaths)
										)
									;
									
								} else if (playerHandle.strTeam === 'teamBlue') {
									jQuery('#idOnline_BluePlayer')
										.append(jQuery('<div></div>')
											.text(playerHandle.strName + ' ' + playerHandle.intScore + ' ' + playerHandle.intKills + ' ' + playerHandle.intDeaths)
										)
									;
									
								}	
							}
						}
					}
				});
				
				Socket.socketHandle.on('chatHandle', function(jsonHandle) {
					console.log('chatHandle');
					console.log(jsonHandle);

				});
			});
		}
	},
	
	dispel: function() {
		Socket.socketHandle = null;
		
		Socket.playerHandle = {};
	}
};

var Voxel = {
	voxelengineHandle: null,

	voxelplayerHandle: null,

	voxelhighlightHandle: null,
	
	init: function() {
		Voxel.voxelengineHandle = require('voxel-engine')({
			'texturePath': './textures/',
			'generate': function(x, y, z) {
					return y === -10 ? 1 : 0;
			},
			'controls': {
				'discreteFire': true
			},
			'statsDisabled': true
		});
		
		Voxel.voxelplayerHandle = require('voxel-player')(Voxel.voxelengineHandle);
		
		Voxel.voxelhighlightHandle = require('voxel-highlight')(Voxel.voxelengineHandle);

		{
			Voxel.voxelengineHandle.appendTo(jQuery('#idVoxel').get(0));
		}
		
		{
			var self = Voxel.voxelplayerHandle('./skins/logan.png');
			
			self.yaw.position.set(2, 14, 4);
			
			self.possess();
		}
	},
	
	dispel: function() {
		Voxel.voxelengineHandle = null;
		
		Voxel.voxelplayerHandle = null;
		
		Voxel.voxelhighlightHandle = null;
	}
};