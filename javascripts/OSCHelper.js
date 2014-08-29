
var OSC = function() {

	var socket = null;
	this.connect = function (url, messageCallback)
	{
		if(socket)
			socket.close();

		if(typeof(WebSocket) == "undefined")
			WebSocket = window.MozWebSocket;

		if(typeof(WebSocket) == "undefined") {
			alert("Websockets not supported by your browser, consider switching to the latest version of Firefox or Chrome.");
			return;
		}

		socket = new WebSocket(url);
		socket.onopen = function(){  
			console.log("Connected!");
		}

		socket.onclose = function(){  
			console.log("disconnected");
		}

		socket.onmessage = function(msg){ 
//			console.log("MSG: " + msg.data);
			var osc = msg.data.split(',');
			messageCallback(osc[0],osc[1]);
		}

		socket.onerror = function(data){  
			console.log("Server Error: couldnt connect");
		}
	}
}

