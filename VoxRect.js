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
	with (global) {
		eval(Node.fsHandle.readFileSync(__dirname + '/VoxRect.config').toString());
	}
}

{
	Express.serverHandle.get('/', function(requestHandle, responseHandle) {
		responseHandle.status(302);
		
		responseHandle.set({
			'Location': '/index.html'
		});
		
		responseHandle.end();
	});
	
	Express.serverHandle.get('/index.html', function(requestHandle, responseHandle) {
		var Mustache_objectHandle = {
			'objectMain': {
				'strRandom': '',
				'strMotd': ''
			}
		};
		
		{
			var hashHande = Node.cryptoHandle.createHash('sha512');
			
			{
				hashHande.update(Node.cryptoHandle.randomBytes(256));
			}
			
			var strBase = hashHande.digest('base64');
			
			{
				strBase = strBase.replace(new RegExp('\\+', 'g'), '');
				strBase = strBase.replace(new RegExp('\\/', 'g'), '');
			}
			
			Mustache_objectHandle.objectMain.strRandom = strBase.substr(0, 32);
		}
		
		{
			Mustache_objectHandle.objectMain.strMotd = process.env.strMotd;
		}
		
		var FilesystemRead_bufferHandle = null;
		
		var functionFilesystemRead = function() {
			Node.fsHandle.readFile(__dirname + '/assets/index.html', function(errorHandle, bufferHandle) {
				if (errorHandle !== null) {
					responseHandle.end();
					
					return;
				}
				
				{
					FilesystemRead_bufferHandle = bufferHandle;
				}
				
				functionSuccess();
			});
		};
		
		var functionSuccess = function() {
			var strData = FilesystemRead_bufferHandle.toString();

			{
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
				
				strData = Mustache.mustacheHandle.render(strData, Mustache_objectHandle);
			}
			
			{
				strData = Hypertextminfier.hypertextminfierHandle.minify(strData, {
					'removeComments': true,
					'removeCommentsFromCDATA': true,
					'removeCDATASectionsFromCDATA': false,
					'collapseWhitespace': true,
					'conservativeCollapse': true,
					'collapseBooleanAttributes': false,
					'removeAttributeQuotes': false,
					'removeRedundantAttributes': false,
					'useShortDoctype': false,
					'removeEmptyAttributes': false,
					'removeOptionalTags': false,
					'removeEmptyElements': false
				});
			}
			
			responseHandle.status(200);
			
			responseHandle.set({
				'Content-Length': Buffer.byteLength(strData, 'utf-8'),
				'Content-Type': Mime.mimeHandle.lookup('html'),
				'Content-Disposition': 'inline; filename="' + requestHandle.path.substr(requestHandle.path.lastIndexOf('/') + 1) + '";'
			});
			
			responseHandle.write(strData);
			
			responseHandle.end();
		};
		
		functionFilesystemRead();
	});
	
	Express.serverHandle.use('/', Express.expressHandle.static(__dirname + '/assets'));
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
			'path': '/host.xml?intPort=' + encodeURIComponent(process.env.intSocketPort) + '&strName=' + encodeURIComponent(process.env.strName) + '&strMap=' + encodeURIComponent(process.env.strMap) + '&strCapacity=' + encodeURIComponent(process.env.strCapacity),
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