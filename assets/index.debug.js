jQuery(document).ready(function() {
	{
		jQuery('#idLoading')
			.dialog({
				'autoOpen': true,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': true,
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
				'modal': true,
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
		jQuery('#idLogin_Skin').find('option').eq(0)
		    .prop({
		        'selected': true
		    })
		;
		
		jQuery('#idLogin_Skin')
			.selectmenu({
				'disabled': false,
				'width': 300
			})
		;
		
		jQuery('#idLogin_Skin').closest('.ui-dialog').find('.ui-selectmenu-button')
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
						'strSkin': jQuery('#idLogin_Skin').val()
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
				'modal': true,
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
				
				Socket.socketHandle.on('chatHandle', function(jsonHandle) {

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