jQuery(document).ready(function() {
	{
		jQuery('#idLoading')
			.dialog({
				'autoOpen': false,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': true,
				'resizable': false,
				'width': 'auto',
				'create': function() {
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
					
					jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
						.hide()
					;
				}
			})
		;
	}
	
	{
		jQuery('#idLogin')
			.dialog({
				'autoOpen': true,
				'closeOnEscape': false,
				'height': 'auto',
				'minHeight': 0,
				'minWidth': 0,
				'modal': true,
				'resizable': false,
				'width': 422,
				'create': function() {
					jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
						.css({
							'line-height': '125%'
						})
					;
					
					jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
						.hide()
					;
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
			.each(function() {
				jQuery(this).closest('.ui-dialog').find('.ui-selectmenu-button')
					.css({
						'background': 'none'
					})
				;
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
					jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar')
						.css({
							'line-height': '125%'
						})
					;
					
					jQuery(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close')
						.hide()
					;
				}
			})
		;
	}
	
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
});