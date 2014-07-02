var Node = {
	childprocessHandle: null,
	
	cryptoHandle: null,
	
	fsHandle: null,
	
	httpHandle: null,
	
	pathHandle: null,
	
	init: function() {
		Node.childprocessHandle = require('child_process');
		
		Node.cryptoHandle = require('crypto');
		
		Node.fsHandle = require('fs');

		Node.httpHandle = require('http');

		Node.pathHandle = require('path');
	},
	
	dispel: function() {
		Node.childprocessHandle = null;
		
		Node.cryptoHandle = null;
		
		Node.fsHandle = null;
		
		Node.httpHandle = null;
		
		Node.pathHandle = null;
	}
};

{
	Node.init();
}

{
	with (global) {
		eval(Node.fsHandle.readFileSync(__dirname + '/NodeGen.config').toString());
		
		eval(Node.fsHandle.readFileSync(__dirname + '/NodeGen.js').toString());
	}
}

{
	Socket.serverHandle.on('connection', function(socketHandle) {
		socketHandle.on('disconnect', function() {
			
		});
	});
}

//TODO: insert domain / start immediately
setInterval(function () {
	var functionRequest = function() {
		var requestHttp = Node.httpHandle.request({
			'host': '127.0.0.1',
			'port': 26866,
			'path': '/host.xml?intPort=' + encodeURIComponent(process.env.intSocketPort) + '&strName=' + encodeURIComponent(process.env.strName) + '&strMap=' + encodeURIComponent(process.env.strMap) + '&strCapacity=' + encodeURIComponent(process.env.strCapacity) + '&strMotd=' + encodeURIComponent(process.env.strMotd),
			'method': 'GET'
		}, function(responseHttp) {
			var strContent = '';
			
			responseHttp.setEncoding('UTF-8');
			
			responseHttp.on('data', function(strData) {
				strContent += strData;
			});
			
			responseHttp.on('end', function() {
				functionSuccess();
			});
		});
		
		requestHttp.on('error', function(errorHandle) {
			console.log(errorHandle);
			functionError();
		});
		
		requestHttp.end();
	};
	
	var Errorsuccess_intTimestamp = new Date().getTime();
	
	var functionError = function() {
		var dateHandle = new Date();

		console.log('');
		console.log('------------------------------------------------------------');
		console.log('- Timestamp: ' + dateHandle.toISOString());
		console.log('- Origin: VoxRect');
		console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
		console.log('- Status: Error');
		console.log('------------------------------------------------------------');
	};
	
	var functionSuccess = function() {
		var dateHandle = new Date();

		console.log('');
		console.log('------------------------------------------------------------');
		console.log('- Timestamp: ' + dateHandle.toISOString());
		console.log('- Origin: VoxRect');
		console.log('- Duration: ' + (dateHandle.getTime() - Errorsuccess_intTimestamp));
		console.log('- Status: Success');
		console.log('------------------------------------------------------------');
	};
	
	functionRequest();
}, 5 * 60 * 1000);