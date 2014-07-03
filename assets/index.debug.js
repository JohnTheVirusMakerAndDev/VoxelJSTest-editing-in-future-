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
			'stack': true,
			'width': 393,
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
			'stack': true,
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

{
	var voxelengineHandle = require('voxel-engine')({
		'texturePath': __dirname + '\textures',
		'generate': function(x, y, z) {
				return y === -10 ? 1 : 0;
		},
		'controls': {
			'discreteFire': true
		},
		'statsDisabled': true
	});
	
	var voxelplayerHandle = require('voxel-player')(voxelengineHandle);
	
	var voxelhighlightHandle = require('voxel-highlight')(voxelengineHandle);
	
	voxelengineHandle.appendTo(jQuery('#idVoxel').get(0));
	
	

	var substack = voxelplayerHandle(__dirname + '\skins\logan.png');
	substack.yaw.position.set(2, 14, 4);
	substack.possess();
}