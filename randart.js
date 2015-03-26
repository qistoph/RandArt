var NW = 0;
var NE = 1;
var SW = 2;
var SE = 3;

function hex2dec(hex)
{
    var ints = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        ints.push(parseInt(hex.substr(i, 2), 16));

    return ints;
}

function randart(data) {
	var map = new Array(" ", ".", "o", "+", "=", "*", "B", "O", "X", "@", "%", "&", "#", "/", "^");
	var width = 17;
	var height = 9;

	var board = Array.apply(null, new Array(width * height)).map(Number.prototype.valueOf,0);
	var bytes = hex2dec(data);
	var pos = width * 4 + 8;
	var start = pos;
	
	for(var i=0; i<bytes.length; ++i) {
		var d = bytes[i];
		for(var j=0; j<8; j+=2) {
			var v = (d >> j) &0x3;
			var newpos = move(pos, v, width, height);
			board[newpos]++;
			pos = newpos;
		}
	}

	var art = "";
	for(var p=0; p<(width * height); ++p) {
		var m = board[p];
		if(m >= map.length) m = map.length - 1;

		var char = (p == start) ? "S" :
			(p == pos) ? "E" :
			map[m];

		art += char;

		if(p % width == width - 1) art += "\n";
	}

	return art;
}

function move(pos, move, width, height) {
	var posx = Math.floor(pos % width);
	var posy = Math.floor(pos / width);
	
	var newposx = posx + (
		(move == NW) ? -1 :
		(move == NE) ? +1 :
		(move == SW) ? -1 :
		(move == SE) ? +1 :
		NaN
	);
	
	var newposy = posy + (
		(move == NW) ? -1 :
		(move == NE) ? -1 :
		(move == SW) ? +1 :
		(move == SE) ? +1 :
		NaN
	);

	var newposx = Math.max(0, Math.min(width - 1, newposx));
	var newposy = Math.max(0, Math.min(height - 1, newposy));

	return newposx + newposy * width;
}
