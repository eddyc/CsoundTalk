var keyboard;

function drawPiano()
{
	function drawOctave(positionX, positionY, width, height) {
		var blackKeyHeight = height / 2;
		var whiteKeys = 7;
		var keyWidth = width / whiteKeys;
		var blackKeyWidth = keyWidth * (2/3);
		var octaveArray = new Array();
		octaveArray.push(drawRectangleMissingRight(height, keyWidth , positionX + 0, positionY + 0));
		octaveArray.push(drawRectangle(blackKeyHeight, blackKeyWidth, positionX + blackKeyWidth , positionY));
		octaveArray.push(drawRectangleMissingBoth(height, keyWidth , positionX + keyWidth, positionY + 0));
		octaveArray.push(drawRectangle(blackKeyHeight, blackKeyWidth, positionX + keyWidth +  blackKeyWidth , positionY));
		octaveArray.push(drawRectangleMissingLeft(height, keyWidth , positionX + keyWidth * 2, positionY + 0));
		octaveArray.push(drawRectangleMissingRight(height, keyWidth , positionX + keyWidth * 3, positionY + 0));
		octaveArray.push(drawRectangle(blackKeyHeight, blackKeyWidth, positionX + (keyWidth * 3) +  blackKeyWidth , positionY));
		octaveArray.push(drawRectangleMissingBoth(height, keyWidth , positionX + keyWidth * 4, positionY + 0));
		octaveArray.push(drawRectangle(blackKeyHeight, blackKeyWidth, positionX + (keyWidth * 4) +  blackKeyWidth , positionY));
		octaveArray.push(drawRectangleMissingBoth(height, keyWidth , positionX + keyWidth * 5, positionY + 0));
		octaveArray.push(drawRectangle(blackKeyHeight, blackKeyWidth, positionX + (keyWidth * 5) +  blackKeyWidth , positionY));
		octaveArray.push(drawRectangleMissingLeft(height, keyWidth , positionX + keyWidth * 6, positionY + 0));
		return octaveArray;
	}

	Raphael.fn.roundedRectangle = function (x, y, width, height, radius){
		var array = [];
		array = array.concat(["M", x, radius + y, "Q", x, y, x + radius, y]); //A
		array = array.concat(["L", x + width - radius, y, "Q", x + width, y, x + width, y + radius]); //B
		array = array.concat(["L", x + width, y + height - radius, "Q", x + width, y + height, x + width - radius, y + height]); //C
		array = array.concat(["L",x + radius, y + height, "Q", x , y + height, x , y + height - radius]); //D
		array = array.concat([" Z"]);
		return this.path(array);
	};
	Raphael.fn.roundedRectangleRightMissing = function (x, y, width, height, radius){
		var array = [];
		var oneThirdWidth = width/3;
		var halfHeight = height / 2;
		array = array.concat(["M", x, radius + y, "Q", x, y, x + radius, y]); //A
		array = array.concat(["L", x + width - oneThirdWidth - radius, y, "Q", x + width - oneThirdWidth, y, x + width - oneThirdWidth, y + radius]); //B
		array = array.concat(["L", x + width - oneThirdWidth, y + halfHeight - radius, "Q", x + width - oneThirdWidth, y + halfHeight, x + width - oneThirdWidth + radius, y + halfHeight]); //C
		array = array.concat(["L",x + width -  radius, y + halfHeight, "Q", x + width , y + halfHeight, x + width , y + halfHeight + radius]); //D
		array = array.concat(["L",x + width, y + height - radius, "Q", x + width , y + height, x + width - radius , y + height]); //D
		array = array.concat(["L",x + radius, y + height, "Q", x , y + height, x , y + height - radius]); //D
		array = array.concat([" Z"]);
		return this.path(array);
	};

	Raphael.fn.roundedRectangleLeftMissing = function (x, y, width, height, radius){
		var array = [];
		var oneThirdWidth = width/3;
		var halfHeight = height / 2;
		array = array.concat(["M", x,  y + height - radius, "Q", x, y + height, x + radius, y + height]); //A
		array = array.concat(["L", x + width - radius,  y + height, "Q", x + width, y + height, x + width, y + height - radius]); //A
		array = array.concat(["L", x + width,  y + radius, "Q", x + width, y, x + width - radius, y]); //A
		array = array.concat(["L", x + oneThirdWidth + radius,  y, "Q", x + oneThirdWidth, y, x + oneThirdWidth, y + radius]); //A
		array = array.concat(["L", x + oneThirdWidth,  y + halfHeight - radius, "Q", x + oneThirdWidth, y + halfHeight, x + oneThirdWidth - radius, y + halfHeight]); //A
		array = array.concat(["L", x + radius,  y + halfHeight, "Q", x, y + halfHeight, x, y + halfHeight + radius]); //A
		array = array.concat([" Z"]);
		return this.path(array);
	};

	Raphael.fn.roundedRectangleBothMissing = function (x, y, width, height, radius){
		var array = [];
		var oneThirdWidth = width/3;
		var halfHeight = height / 2;
		array = array.concat(["M", x,  y + height - radius, "Q", x, y + height, x + radius, y + height]); //A
		array = array.concat(["L", x + width - radius,  y + height, "Q", x + width, y + height, x + width, y + height - radius]); //A
		array = array.concat(["L", x + width,  y + halfHeight + radius, "Q", x + width, y + halfHeight, x + width - radius, y + halfHeight]); //A
		array = array.concat(["L", x + width + radius - oneThirdWidth,  y + halfHeight, "Q", x + width - oneThirdWidth, y + halfHeight, x + width - oneThirdWidth, y + halfHeight - radius]); //A
		array = array.concat(["L", x + width - oneThirdWidth,  y + radius, "Q", x + width - oneThirdWidth, y, x + width - oneThirdWidth - radius, y]); //A
		array = array.concat(["L", x + oneThirdWidth + radius,  y, "Q", x + oneThirdWidth, y, x + oneThirdWidth, y + radius]); //A
		array = array.concat(["L", x + oneThirdWidth,  y + halfHeight - radius, "Q", x + oneThirdWidth, y + halfHeight, x + oneThirdWidth - radius, y + halfHeight]); //A
		array = array.concat(["L", x + radius,  y + halfHeight, "Q", x, y + halfHeight, x, y + halfHeight + radius]); //A
		array = array.concat([" Z"]);
		return this.path(array);
	};

	function drawOctave(positionX, positionY, width, height, curve) {
		var blackKeyHeight = height / 2;
		var whiteKeys = 7;
		var keyWidth = width / whiteKeys;
		var blackKeyWidth = keyWidth * (2/3);
		octaveArray = new Array();
		octaveArray.push(paper.roundedRectangleRightMissing(positionX, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangle(positionX + blackKeyWidth , positionY, blackKeyWidth, blackKeyHeight, curve));
		octaveArray.push(paper.roundedRectangleBothMissing(positionX + keyWidth, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangle(positionX + keyWidth + blackKeyWidth , positionY, blackKeyWidth, blackKeyHeight, curve));
		octaveArray.push(paper.roundedRectangleLeftMissing(positionX + keyWidth * 2, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangleRightMissing(positionX + keyWidth * 3, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangle(positionX + (keyWidth * 3) + blackKeyWidth , positionY, blackKeyWidth, blackKeyHeight, curve));
		octaveArray.push(paper.roundedRectangleBothMissing(positionX + keyWidth * 4, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangle(positionX + (keyWidth * 4) + blackKeyWidth , positionY, blackKeyWidth, blackKeyHeight, curve));
		octaveArray.push(paper.roundedRectangleBothMissing(positionX + keyWidth * 5, positionY, keyWidth, height, curve));
		octaveArray.push(paper.roundedRectangle(positionX + (keyWidth * 5) + blackKeyWidth , positionY, blackKeyWidth, blackKeyHeight, curve));
		octaveArray.push(paper.roundedRectangleLeftMissing(positionX + keyWidth * 6, positionY, keyWidth, height, curve));


		return octaveArray;
	}

	this.makeOctave = function(width, height, positionX, positionY, curve) {


		octave = drawOctave(positionX, positionY, width, height, curve);
		var whiteKeys = [true, false, true, false, true, true, false, true, false, true, false, true];
		strokeWidth = 3;
		for (var i = 0; i < octave.length; ++i) {
			octave[i].attr({fill: 'white', stroke:'rgba(0, 0, 0, 1)', 'stroke-width':strokeWidth});
			octave[i].mousedown(function(){

				var textArea = document.getElementById("keyboardtext");
				var string = textArea.value;
				var cps = midiToCps(this.id + 48);
				string = string.replace("<KEY>", cps);
				csoundObj.readScore(string);
				console.log(string);
				console.log(this.id);
				this.attr({fill: 'black', stroke:'rgba(0, 0, 0, 1)', 'stroke-width':strokeWidth});
			});


			octave[i].mouseup(function(){
				
				this.attr({fill: 'white', stroke:'rgba(0,0,0, 1)', 'stroke-width':strokeWidth});
			});

			octave[i].mouseout(function(){

				this.attr({fill: 'white', stroke:'rgba(0,0,0, 1)', 'stroke-width':strokeWidth});
			});

			octave[i].mouseover(function(){

				this.attr({fill: 'grey', stroke:'rgba(0,0,0, 1)', 'stroke-width':strokeWidth});
			});
		}
		return octave;
	}
	var positionX = 5;
	var positionY = 5;
	var width = 500;
	var height = 80;
	var curve = 5;
	var octaves = 2;

	var paper = Raphael("footer", width + 20, 100);
	this.makeKeyboard = function(width, height, positionX, positionY, curve, octaves) {

		var keyboard = new Array();
		var octaveWidth = width / octaves;

		for (var  i = 0; i < octaves; ++i) {

			keyboard.push(this.makeOctave(octaveWidth, height, positionX + (octaveWidth * i), positionY, curve));
		}

		return keyboard;
	}

	var octaveWidth = width / octaves;
	keyboard = this.makeKeyboard(width, height, positionX, positionY, curve, octaves);
	
}



var loadContent = function(page)
{
	$("#content").load(page);	
}
$(document).ready(function(){
	// HTML markup implementation, overlap mode
	drawPiano();

});

