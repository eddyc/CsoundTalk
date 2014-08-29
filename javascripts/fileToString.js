
function xhrSuccess () { this.callback.apply(this, this.arguments);  }

function xhrError () { console.error(this.statusText);  }

function loadFile (sURL, responseType, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
	var oReq = new XMLHttpRequest();
	oReq.callback = fCallback;
	oReq.arguments = Array.prototype.slice.call(arguments, 2);
	oReq.onload = xhrSuccess;
	oReq.onerror = xhrError;
	oReq.open("get", sURL, true);
	oReq.responseType = responseType;
	oReq.send(null);

}
