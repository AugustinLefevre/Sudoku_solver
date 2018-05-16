var tab = [
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],

	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],

	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"],
	["0", "0", "0", "0", "0", "0", "0", "0", "0"]
];
var value = 0;
var count = 0;
var counti = 0;
var line = 0;
var col = 0;

function putRes(){
	count = 0;
	counti = 0;
	while(count < 9){
		while(counti < 9){
			$("#" + count + "" + counti).text(tab[count][counti]);
			counti++;
		}
		counti = 0;
		count++;
	}
}

function updateTable(){
	count = 0;
	counti = 0;
	while(count < 9){
		while(counti < 9){
			tab[count][counti] = $("#" + count + "" + counti).text();
			counti++;
		}
		counti = 0;
		count++;
	}
}

function absentSurLigne(val, tab, line){
	for(col = 0; col < 9; col++)
		if(tab[line][col] == val)
			return false;
	return true;
}

function checkAbsentSurLigne(val, tab, line, col){
	for(_col = 0; _col < 9; _col++)
		if(tab[line][_col] == val && _col != col)
			return false;
	return true;
}

function absentSurColonne(val, tab, col){
	for(line = 0; line < 9; line++)
		if(tab[line][col] == val)
			return false;
	return true;
}

function checkAbsentSurColonne(val, tab, line, col){
	for(_line = 0; _line < 9; _line++)
		if(tab[_line][col] == val && _line != line)
			return false;
	return true;
}

function absentSurBloc(val, tab, line, col){
	var _line = line-(line % 3);
	var _col = col-(col % 3);
	for(var line = _line; line < _line + 3; line++)
		for(var col = _col; col < _col + 3; col++)
			if(tab[line][col] == val)
				return false;
	return true;
}

function checkAbsentSurBloc(val, tab, line, col, refLine, refCol){
	var _line = line-(line % 3);
	var _col = col-(col % 3);
	for(var line = _line; line < _line + 3; line++)
		for(var col = _col; col < _col + 3; col++)
			if(tab[line][col] == val && line != refLine && col != refCol)
				return false;
	return true;
}

function solve(tab, position){
	if(position == 81)
		return true;

	var line_float = position / 9;
	var line = parseInt(line_float);
	var col = position % 9;
	console.log(position);
	console.log(line);
	console.log(line_float);
	if(tab[line][col] != 0)
		return solve(tab, position + 1);

	for(var val = 1; val <= 9; val++){
		if(absentSurLigne(val, tab, line) && absentSurColonne(val, tab, col) && absentSurBloc(val, tab, line, col)){
			tab[line][col] = val;
			if(solve(tab, position + 1))
				return true;
		}
	}
	tab[line][col] = 0;
	return false;
}

$(document).ready(function(){
			/*        selector           */
	$(".selector").hover(function(){
		if($(this).attr("class") != 'selector select'){
		$(this).css("background-color", "LightBlue");}
	}, function(){
		if($(this).attr("class") != 'selector select'){
		$(this).css("background-color", "white");}
	});
	$(".selector").click(function(){
		count = 0;
		while(count <= 9){
			$("#" + count).attr("class", "selector");
			$("#" + count).css("background-color", "white");
			count++;
		}
		value = $(this).attr("id");
		$(this).css("background-color", "Blue");
		$(this).attr("class", "selector select");
	});
			/*        put number      */
	$(".case").click(function(){
		$(this).html(value);
		updateTable();
		line = parseInt($(this).attr('id') / 10);
		col = parseInt($(this).attr('id') % 10);
		if((checkAbsentSurLigne(value, tab, line, col) == false || checkAbsentSurColonne(value, tab, line, col) == false || checkAbsentSurBloc(value, tab, line, col, line, col) == false) && value != 0){
			console.log(line);
			$(this).attr("class", "case blocked");
		}else{
			$(this).attr("class", "case");
		}
	});
	
	$("button").click(function(){
		solve(tab, 0);
		count = 0;
		while(count < 9){
			console.log(tab[count]);
			count++;
		}
		putRes();
	});
});
