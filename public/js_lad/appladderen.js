//=====================================================================================
//Inicializa variaveis
//=====================================================================================

var AILadder = new Image();    //objetos de programacao Ladder
AILadder.src = "/img_lad/ladder.png";
var AIVertical = new Image();  //linha vertical do diagrama ladder
AIVertical.src = "/img_lad/LLV.png";
var canvas2;    //local desenho programa
var context2;
var canvas3;    // desenho da funcao a ser inserida
var context3;
document.addEventListener('mousemove', mouse_move);
var emEdicao = 0; //0:desabilitado, 1-5: Entra funcao,tag1,end1,tag2 e end2
var lfuncao = 0;	//funcao selecionada para entrada no ladder
//var Num_Linhas = 100;
var larray = new Array(); //Array que identifica o programa ladder
//{ _id, tag1, var_1, tipo, var_2, ver, R-W, tag2, funcao};
// ._id = Identificado XXY, onde XX=linha e Y=coluna
// .nome = nome do tag
// .var_1 = variavel principal.
// .tipo = 0:nao usado, 1:NA, 2:NF, 3-Bobina, 4:Set, 5:Reset, 6:Timer, 7:Counter,8-funcao,9-pulso, 10-compaacao, 11-Horizontal,
// .var2 = vari�vel secund�rio, no timer e counter o valor de preset
// .ver = liga��o vertical, 0:false, 1: true. Na derivacao 10-90: numero do TR (derivacao), multiplicado por 10, colocando durante a compilacao.
// .R-W = Leitura(1) ou Escrita(2)
// .tag2 = nome da variavel 2
// .funcao = nome funcao genérica se tipo igual 8, (MOV,<,>,=,<= e >=).

//=====================================================================================
//Inicializa Canvas
//Desenha area de trabalho em branco
//=====================================================================================
function draw_ladder_inicio() {
	canvas2 = document.getElementById("tela3");
	context2 = canvas2.getContext("2d");
	canvas2.width = 600;
	canvas2.height = 60 * Num_Linhas;
	draw_ladder_fundo(0);
	inicializa_array();
}

//=====================================================================================
//Desenha area de trabalho em branco
//=====================================================================================
function draw_ladder_fundo(tipo){
    for (var i=0; i<(Num_Linhas-1); i++) {
		context2.drawImage(AIVertical, (AIVertical.width/6)*tipo, 0, AIVertical.width/6, 56, 60, i*60, 5, 56);
		for (var j=0; j<8; j++) {
			context2.drawImage(AILadder, (AILadder.width/7)*tipo, 780, AILadder.width/7, 60, 65+(j*60), (i)*60, 60, 60);
		}
		context2.drawImage(AIVertical, (AIVertical.width/6)*tipo, 0, AIVertical.width/6, 56, 540, i*60, 5, 56);
	}
}

//=====================================================================================
//funcao chamada ao dar um click na area do ladder
//=====================================================================================
//com problema
function editar_ladder() {
	var yScroll = document.body.scrollTop;

	var posicaox = parseInt((window.event.clientX-700)/60);
	var posicaoy = parseInt(((window.event.clientY+yScroll)-5)/60);
	var ICampo = document.getElementById('Campo');
	var CInput = document.getElementById('input_ladder');
	var IFigura = document.getElementById('Fig');

	if ((window.event.clientX <700) || (posicaox > 7)) {
		ICampo.style.display = "none";
		IFigura.style.display = "none";
		emEdicao = 0;
	}
	else {
		if (lfuncao > 0) {
			IFigura.style.display = "none";
			var tipo = 2;
			if ( lfuncao == 13 ){
				larray[(posicaoy*8*9) + (posicaox*9) + 5] = 0;
				larray[(posicaoy*8*9) + (posicaox*9) +3] = 0;
				larray[(posicaoy*8*9) + (posicaox*9) +1] = '';
				larray[(posicaoy*8*9) + (posicaox*9) +2] = '';
				larray[(posicaoy*8*9) + (posicaox*9) +4] = '';
				larray[(posicaoy*8*9) + (posicaox*9) +7] = '';
				larray[(posicaoy*8*9) + (posicaox*9) +8] = '';
				context2.drawImage(AIVertical, (AIVertical.width/6)*5, 0, AIVertical.width/6, 56, 120+((posicaox)*60), ((posicaoy)*60)+42, 5, 56);
			    context2.drawImage(AILadder, (AILadder.width/7)*2, 60*13, 57, 60, 65+((posicaox)*60), (posicaoy)*60, 57, 60);			
			}
			if ( lfuncao == 12 ){
				context2.drawImage(AIVertical, (AIVertical.width/6)*tipo, 0, AIVertical.width/6, 56, 120+((posicaox)*60), ((posicaoy)*60)+42, 5, 56);
			    larray[(posicaoy*8*9) + (posicaox*9) + 5] = 1;
				larray[(posicaoy*8*9) + (posicaox*9)] = posicaoy*10 + posicaox;
			}
			if (lfuncao <12){
				if (lfuncao == 7)
					context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(lfuncao-1), 57, 120, 65+((posicaox)*60), (posicaoy)*60, 57, 120);
				else {
					if ((lfuncao > 7) && (lfuncao<12))
						context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(lfuncao), 57, 60, 65+((posicaox)*60), (posicaoy)*60, 57, 60);
					else
						context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(lfuncao-1), 57, 60, 65+((posicaox)*60), (posicaoy)*60, 57, 60);
				}
				//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
				larray[(posicaoy*8*9) + (posicaox*9) +3] = lfuncao;
				larray[(posicaoy*8*9) + (posicaox*9)] = posicaoy*10 + posicaox;
				switch (lfuncao) {
					case 1:
				case 2:
					case 9:
						larray[(posicaoy*8*9) + (posicaox*9)+ 6] = 1;
						larray[(posicaoy*8*9) + (posicaox*9)+ 4] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 7] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 8] = 0;
						break;
					case 11:
						larray[(posicaoy*8*9) + (posicaox*9)+ 6] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 4] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 7] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 8] = 0;
						break;
					case 8:
					case 10:
						larray[(posicaoy*8*9) + (posicaox*9)+ 6] = 1;
						break;
					case 6:
					case 7:
						larray[(posicaoy*8*9) + (posicaox*9)+ 6] = 2;
						larray[(posicaoy*8*9) + (posicaox*9)+ 8] = 0;
						break;
					default:
						larray[(posicaoy*8*9) + (posicaox*9)+ 6] = 2;
						larray[(posicaoy*8*9) + (posicaox*9)+ 4] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 7] = 0;
						larray[(posicaoy*8*9) + (posicaox*9)+ 8] = 0;
				}
			}
		}
		var tipo_funcao = larray[(posicaoy*8*9) + (posicaox*9) + 3];
		if ( tipo_funcao > 0 && (tipo_funcao<11))
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaox*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoy*60))  + "px";
			var tag;
			switch (tipo_funcao) {
				case 8:
				case 10:
					document.getElementById("label_input").innerHTML = "Function:";
					tag = larray[(posicaoy*8*9) + ((posicaox)*9)+8];
					break;
				default:
					document.getElementById("label_input").innerHTML = "Address:";
					tag = larray[(posicaoy*8*9) + ((posicaox)*9)+2];
			}
			if (tag != undefined && tag != "undefined")
				document.getElementById('input_ladder').value = tag;
			else
				document.getElementById('input_ladder').value = "";
			CInput.focus();
			emEdicao = 1;
		}
		else {
			ICampo.style.display = "none";
			emEdicao = 0;
		}
	}
}

//=====================================================================================
//Desenho o circuito ladder apartir de uma matriz
// Apos leitura do arquivo
//=====================================================================================
function draw_ladder(fileArr) {
	inicializa_array();
	draw_ladder_fundo(1);
	context2.font = '9pt Arial';
	for (var i=0; i<fileArr.length; i++) {
		var fileLine = fileArr[i].split(',');
		var tipo = 0;
		var linha = parseInt(parseInt(fileLine[0],10)/10,10);
		var coluna = parseInt(fileLine[0], 10) - (linha*10) + 1;
		if ( fileLine[5] > 0 ){
			context2.drawImage(AIVertical, (AIVertical.width/6)*tipo, 0, AIVertical.width/6, 56, 60+(coluna*60), ((linha)*60)+42, 5, 56);
		}
		if (fileLine[3] !=7 && fileLine[3]>0 && fileLine[3]<20) {
			if (fileLine[3]<7)
				context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(fileLine[3]-1), AILadder.width/7, 60, 5+(coluna*60), (linha)*60, 56, 60);
			else
				context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(fileLine[3]), AILadder.width/7, 60, 5+(coluna*60), (linha)*60, 56, 60);
		}
		if (fileLine[3] ==7 && fileLine[3]>0)
			context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(fileLine[3]-1), AILadder.width/7, 120, 5+(coluna*60), (linha)*60, 56, 120);

		if((fileLine[3] != 11) && (fileLine[3] != "undefined")){
			if (fileLine[3] <6  || fileLine[3]==9) {
				context2.fillStyle = 'black';
				context2.fillText(fileLine[2], 15+(coluna*60), (15+(linha)*60));
				context2.fillStyle = 'blue';
				context2.fillText(fileLine[1], 15+(coluna*60), (25+(linha)*60));
			}
			else {
				if (fileLine[3]<9){
					context2.fillStyle = 'black';
					context2.fillText(fileLine[2], 10+(coluna*60), (37+(linha)*60));
					context2.fillStyle = 'blue';
					context2.fillText(fileLine[1], 38+(coluna*60), (37+(linha)*60));
					context2.fillText(fileLine[4], 10+(coluna*60), (55+(linha)*60));
					context2.fillText(fileLine[7], 38+(coluna*60), (55+(linha)*60));
				}
				else{
					if (fileLine[3]<10){
						context2.fillStyle = 'black';
						context2.fillText(fileLine[2], 10+(coluna*60), (25+(linha)*60));
						context2.fillStyle = 'blue';
						context2.fillText(fileLine[1], 38+(coluna*60), (25+(linha)*60));
						context2.fillText(fileLine[4], 10+(coluna*60), (60+(linha)*60));
						context2.fillText(fileLine[7], 38+(coluna*60), (60+(linha)*60));
						context2.fillText(fileLine[8], 30+(coluna*60), (45+(linha)*60));
					}
				}
			}
		}
		if (i>0) {
			for (var j=0; j<9; j++)
				larray[((i-1)*9)+j] = fileLine[j]; //{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
		}
	}
}

//=====================================================================================
// verifica movimento do mouse
//=====================================================================================
//com problema
function mouse_move(){
	canvas3 = document.getElementById("tela4");
	context3 = canvas3.getContext("2d");
	canvas3.width = 60;
	canvas3.height = 60;
    var ICampo = document.getElementById('Campo');
	var IFigura = document.getElementById('Fig');
	var yTop = window.event.clientY + document.body.scrollTop - 20;
	lfuncao = 0;
	if (window.event.clientX >650 && emEdicao==0) {
		
		for (var i=21; i<31; i++) {
			if ( valor_chave[i] ==1) {
				lfuncao = i - 20;
				context3.drawImage(AILadder, 60*4, 60*(i-21), 60, 60, 0, 0, 60, 60);
				ICampo.style.display = "none";
				IFigura.style.display = "block";
				IFigura.style.left = " "+(window.event.clientX-30) + "px";
				IFigura.style.top = " "+(yTop)  + "px";
				if (lfuncao<8)
					context3.drawImage(AILadder, 60*4, 60*(i-21), 60, 60, 0, 0, 60, 60);
				else
					context3.drawImage(AILadder, 60*4, 60*(i-20), 60, 60, 0, 0, 60, 60);
			}

		}
		if ( valor_chave[11] ==1 || valor_chave[12] ==1) {
			lfuncao = 11;
			if (valor_chave[12] ==1)
				lfuncao = 12;
			context3.drawImage(AILadder, 60*4, 60*(lfuncao), 60, 60, 0, 0, 60, 60);
			ICampo.style.display = "none";
			IFigura.style.display = "block";
			IFigura.style.left = " "+(window.event.clientX-30) + "px";
			IFigura.style.top = " "+(yTop)  + "px";
		}
		if ( valor_chave[13] ==1) {
			lfuncao = 13;
			context3.drawImage(AILadder, 60*4, 60*(lfuncao), 60, 60, 0, 0, 60, 60);
			ICampo.style.display = "none";
			IFigura.style.display = "block";
			IFigura.style.left = " "+(window.event.clientX-30) + "px";
			IFigura.style.top = " "+(yTop)  + "px";
		}
	}
	else {
		IFigura.style.display = "none";
	}
	var posicaox = parseInt((window.event.clientX-700)/60);
    var posicaoy = parseInt((yTop+15)/60);
    ICampo.style.display = "block";
	var ICampox = parseInt((parseInt(ICampo.style.left)-700)/60);
	var ICampoy = parseInt((parseInt(ICampo.style.top)-5)/60);
	if ((emEdicao > 0)  && ((ICampox != posicaox) || (ICampoy != posicaoy))){
		ICampo.style.display = "none";
		ICampo.style.top = "680px";
		ICampo.style.left = "100px";
		var CInput = document.getElementById('input_ladder');
		document.getElementById('input_ladder').value = "";
		CInput.blur();
		emEdicao = 0;
	}
}

//=====================================================================================
// Inicializa o array
//=====================================================================================
function inicializa_array(){
    //larray = new Array();
	larray.length = 0;
}

//=====================================================================================
// Monitora a tecla ENTER
// Quando aparece o campo INPUT
// Para entrada TAG e ENDERECO
//=====================================================================================
function entrada_input(event){
	if (event.keyCode == 13) { //Tecla enter
		var ICampo = document.getElementById('Campo');
		var posicaox = parseInt((parseInt(ICampo.style.left)-700)/60);
		var posicaoy = parseInt((parseInt(ICampo.style.top)-5)/60);
		context2.font = '9pt Arial';
		var CInput = document.getElementById('input_ladder');
		var tipo_funcao = larray[(posicaoy*(8*9)) + (posicaox*9) + 3];

		var tag = CInput.value.toUpperCase();
		if (emEdicao == 5) {
			larray[(posicaoy*8*9) + (posicaox*9) + 7] = tag;
			context2.fillStyle = 'white';
			context2.rect(98+(posicaox*60), (43+(posicaoy)*60), 20, 12);
			context2.fillStyle = 'blue';
			context2.fillText(tag, 98+(posicaox*60), (55+(posicaoy)*60));
			ICampo.style.display = "none";
			ICampo.style.top = "680px";
			ICampo.style.left = "100px";
			CInput.blur();
			emEdicao = 0;
		}
		if (emEdicao == 4) {
			switch (tipo_funcao) {
				case 8:
					larray[(posicaoy*8*9) + (posicaox*9) + 4] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (43+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 70+(posicaox*60), (55+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Tag2:";
					emEdicao = 5;
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 7];
					if (array[(posicaoy*8*9) + (posicaox*9) + 7] == undefined || larray[(posicaoy*8*9) + (posicaox*9) + 7] == "undefined")
						document.getElementById('input_ladder').value = "";
					break;
				case 10:
					larray[(posicaoy*8*9) + (posicaox*9) + 4] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (43+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 70+(posicaox*60), (55+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Tag2:";
					emEdicao = 5;
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 7];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 7] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 7] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				default:
					larray[(posicaoy*8*9) + (posicaox*9) + 7] = tag;
					context2.fillStyle = 'white';
					context2.rect(98+(posicaox*60), (43+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'blue';
					context2.fillText(tag, 98+(posicaox*60), (55+(posicaoy)*60));
					ICampo.style.display = "none";
					ICampo.style.top = "680px";
					ICampo.style.left = "100px";
					CInput.blur();
					emEdicao = 0;
			}
		}
		if (emEdicao == 3) {
			switch (tipo_funcao) {
				case 8:
					larray[(posicaoy*8*9) + (posicaox*9) + 1] = tag;
					context2.fillStyle = 'white';
					context2.rect(98+(posicaox*60), (25+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'blue';
					context2.fillText(tag, 98+(posicaox*60), (37+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Addres_End:";
					emEdicao = 4;
					document.getElementById('input_ladder').value =larray[(posicaoy*8*9) + (posicaox*9) + 4];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 4] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 4] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				case 10:
					larray[(posicaoy*8*9) + (posicaox*9) + 1] = tag;
					context2.fillStyle = 'white';
					context2.rect(98+(posicaox*60), (13+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'blue';
					context2.fillText(tag, 98+(posicaox*60), (25+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Addres_End:";
					emEdicao = 4;
					document.getElementById('input_ladder').value =larray[(posicaoy*8*9) + (posicaox*9) + 4];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 4] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 4] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				default:
					larray[(posicaoy*8*9) + (posicaox*9) + 4] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (43+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 70+(posicaox*60), (55+(posicaoy)*60));
					ICampo.style.top = " "+(25+(posicaoy*60))  + "px";
					document.getElementById("label_input").innerHTML = "Tag_Limit:";
					emEdicao = 4;
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 7];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 7] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 7] == "undefined")
						document.getElementById('input_ladder').value ="";
			}
		}
		if (emEdicao == 2) {
			switch (tipo_funcao) {
				case 6:
				case 7:
					larray[(posicaoy*8*9) + (posicaox*9) + 1] = tag;
					context2.fillStyle = 'white';
					context2.rect(98+(posicaox*60), (25+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'blue';
					context2.fillText(tag, 98+(posicaox*60), (37+(posicaoy)*60));
					emEdicao = 3;
					ICampo.style.top = " "+(25+(posicaoy*60))  + "px";
					document.getElementById("label_input").innerHTML = "Limit:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 4];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 4] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 4] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				case 8:
					larray[(posicaoy*8*9) + (posicaox*9) + 2] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (25+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 70+(posicaox*60), (37+(posicaoy)*60));
					emEdicao = 3;
					ICampo.style.top = " "+(25+(posicaoy*60))  + "px";
					document.getElementById("label_input").innerHTML = "Tag1:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 1];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 1] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 1] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				case 10:
					larray[(posicaoy*8*9) + (posicaox*9) + 2] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (13+(posicaoy)*60), 25, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 70+(posicaox*60), (25+(posicaoy)*60));
					emEdicao = 3;
					ICampo.style.top = " "+(25+(posicaoy*60))  + "px";
					document.getElementById("label_input").innerHTML = "Tag1:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 1];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 1] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 1] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				default:
					larray[(posicaoy*8*9) + (posicaox*9) + 1] = tag;
					context2.fillStyle = 'white';
					context2.rect(70+(posicaox*60), (15+(posicaoy)*60), 50, 12);
					context2.fillStyle = 'blue';
					context2.fillText(tag, 75+(posicaox*60), (25+(posicaoy)*60));
					ICampo.style.display = "none";	
					ICampo.style.top = "680px";
					ICampo.style.left = "100px";
					CInput.blur();
					emEdicao = 0;
			}
		}
		//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
		if (emEdicao == 1) {
			switch (tipo_funcao) {
				case 6:
				case 7:
					larray[(posicaoy*8*9) + (posicaox*9) + 2] = tag;
					context2.fillStyle = 'white';
					context2.rect(90+(posicaox*60), (25+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'black';
					context2.fillText(tag, 90+(posicaox*60), (37+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Tag1:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 1];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 1] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 1] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				case 8:
					larray[(posicaoy*8*9) + (posicaox*9) + 8] = tag;
					context2.fillStyle = 'white';
					context2.rect(75+(posicaox*60), (8+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'magenta';
					context2.fillText(tag, 75+(posicaox*60), (20+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "End_Origem:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 2];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 2] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 2] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				case 10:
					larray[(posicaoy*8*9) + (posicaox*9) + 8] = tag;
					context2.fillStyle = 'white';
					context2.rect(90+(posicaox*60), (33+(posicaoy)*60), 20, 12);
					context2.fillStyle = 'magenta';
					context2.fillText(tag, 90+(posicaox*60), (45+(posicaoy)*60));
					document.getElementById("label_input").innerHTML = "Add_Start:";
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 2];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 2] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 2] == "undefined")
						document.getElementById('input_ladder').value ="";
					break;
				default:
					larray[(posicaoy*8*9) + (posicaox*9) + 2] = tag;
					if (larray[((posicaoy)*(8*9)) + (posicaox*9) + 3] < 11){
						context2.fillStyle = 'white';
						context2.rect(70+(posicaox*60), (5+(posicaoy)*60), 35, 12);
						context2.fillStyle = 'black';
						context2.fillText(tag, 75+(posicaox*60), (17+(posicaoy)*60));
						document.getElementById("label_input").innerHTML = "Tag:";
					}
					document.getElementById('input_ladder').value = larray[(posicaoy*8*9) + (posicaox*9) + 1];
					if (larray[(posicaoy*8*9) + (posicaox*9) + 1] == undefined  || larray[(posicaoy*8*9) + (posicaox*9) + 1] == "undefined")
						document.getElementById('input_ladder').value ="";
			}
			emEdicao = 2;
			ICampo.style.display = "block";
			ICampo.style.top = " "+(15+(posicaoy*60))  + "px";
			CInput.focus();
		}
		
	}
}

//=====================================================================================
//Desenho o circuito ladder apartir de uma matriz
// Apos RUN e STOP do CLP
//=====================================================================================
function monitora_ladder() {
	var mfuncao;
	//inicializa_array();
	if (comandos != 0)
		draw_ladder_fundo(2);
	else
		draw_ladder_fundo(0);

	context2.font = '9pt Arial';
	for (var linha=0; linha<((larray.length/(9*8))); linha++) {
		for (var coluna=0; coluna<8; coluna++) {
			var coluna1 = coluna +1;
			var auxiliar;
			if (larray[(linha*9*8)+ (coluna*9)+5] != "undefined"){
			    auxiliar = parseInt(R[larray[(linha*9*8)+ (coluna*9)+5]/10]);
				if (isNaN(auxiliar))
					auxiliar = 4;
				else
					auxiliar ++;
			}
			else
				auxiliar = 3;

			if ( larray[(linha*9*8)+ (coluna*9)+5] > 0 ){
				context2.drawImage(AIVertical, (AIVertical.width/6)*auxiliar, 0, AIVertical.width/6, 56, 60+(coluna1*60), ((linha)*60)+42, 5, 56);
			}
			if (larray[(linha*9*8)+ (coluna*9)+2] != "undefined") {
				if (comandos != 0) {
					tipo = endereco(larray[(linha*9*8)+ (coluna*9)+2]);
					if (larray[(linha*9*8)+ (coluna*9)+3]== 8) {
						if (coluna == 0)
							tipo = 2;
						else {
							if (larray[(linha*9*8)+ ((coluna-1)*9)+5]>0) {
								tipo = parseInt(R[larray[(linha*9*8)+ ((coluna-1)*9)+5]/10]) + 1;
							}
							else {
								if (larray[((linha-1)*9*8)+ ((coluna-1)*9)+5]>0) {
									tipo = parseInt(R[larray[((linha-1)*9*8)+ ((coluna-1)*9)+5]/10]) + 1;
								}
								else {
									if (larray[(linha*9*8)+ ((coluna-1)*9)+2]!="undefined")
										tipo = endereco(larray[(linha*9*8)+ ((coluna-1)*9)+2]);
									else
										tipo = 3;
								}
							}
						}
					}
					if (larray[(linha*9*8)+ (coluna*9)+3]== 10) {
						switch(larray[(linha*9*8)+ (coluna*9)+8]) {
							case '>':
								tipo = (enderecoCT(larray[(linha*9*8)+ (coluna*9)+2],1) > enderecoCT(larray[(linha*9*8)+ (coluna*9)+4],1) ? 2 : 1);
								break;
							case '<':
								tipo = (enderecoCT(larray[(linha*9*8)+ (coluna*9)+2],1) < enderecoCT(larray[(linha*9*8)+ (coluna*9)+4],1) ? 2 : 1);
								break;
							case '=':
								tipo = (enderecoCT(larray[(linha*9*8)+ (coluna*9)+2],1) == enderecoCT(larray[(linha*9*8)+ (coluna*9)+4],1) ? 2 : 1);
								break;
							case '>=':
								tipo = (enderecoCT(larray[(linha*9*8)+ (coluna*9)+2],1) >= enderecoCT(larray[(linha*9*8)+ (coluna*9)+4],1) ? 2 : 1);
								break;
							case '<=':
								tipo = (enderecoCT(larray[(linha*9*8)+ (coluna*9)+2],1) <= enderecoCT(larray[(linha*9*8)+ (coluna*9)+4],1) ? 2 : 1);
								break;
						}
					}
				}
				else
					tipo = 0;
			}
			else
				tipo = 4;
			if ((tipo == 2 || tipo== 1) && (posicao_ladder[localizacao-1] == (linha *10 + coluna)) && (localizacao>0))
				tipo = tipo +4;

			if (larray[(linha*9*8)+ (coluna*9)+3] !=7 && larray[(linha*9*8)+ (coluna*9)+3]>0 && larray[(linha*9*8)+ (coluna*9)+3] <20) {
				if (larray[(linha*9*8)+ (coluna*9)+3] < 7 )
					context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(larray[(linha*9*8)+ (coluna*9)+3]-1), AILadder.width/7, 60, 5+(coluna1*60), (linha)*60, 56, 60);
				else
					context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(larray[(linha*9*8)+ (coluna*9)+3]), AILadder.width/7, 60, 5+(coluna1*60), (linha)*60, 56, 60);
			}
			if (larray[(linha*9*8)+ (coluna*9)+3] == 25 && tipo>4 )
					context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*((larray[(linha*9*8)+ (coluna*9)+3]-20)-1), AILadder.width/7, 60, 5+(coluna1*60), (linha)*60, 56, 60);
			if (larray[(linha*9*8)+ (coluna*9)+3] ==7 && larray[(linha*9*8)+ (coluna*9)+3]>0)
				context2.drawImage(AILadder, (AILadder.width/7)*tipo, 60*(larray[(linha*9*8)+ (coluna*9)+3]-1), AILadder.width/7, 120, 5+(coluna1*60), (linha)*60, 56, 120);

			if((larray[(linha*9*8)+ (coluna*9)+3] != 11) && (larray[(linha*9*8)+ (coluna*9)+3] > 0) && (larray[(linha*9*8)+ (coluna*9)+3] <20)){
				mfuncao = ''+larray[(linha*9*8)+ (coluna*9)+3];
				switch (mfuncao) {
					case '6':
					case '7':
						context2.fillStyle = 'black';
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+2], 10+(coluna1*60), (37+(linha)*60));
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+4], 10+(coluna1*60), (55+(linha)*60));
						context2.fillStyle = 'cyan';
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+2], 1), 38+(coluna1*60), (37+(linha)*60));
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+4], 1), 38+(coluna1*60), (55+(linha)*60));
						break;
					case '8':
						context2.fillStyle = 'black';
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+8], 30+(coluna1*60), (20+(linha)*60));
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+2], 10+(coluna1*60), (37+(linha)*60));
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+4], 10+(coluna1*60), (55+(linha)*60));
						context2.fillStyle = 'cyan';
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+2], 1), 38+(coluna1*60), (37+(linha)*60));
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+4], 1), 38+(coluna1*60), (55+(linha)*60));
						break;
					case '10':
						context2.fillStyle = 'black';
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+8], 30+(coluna1*60), (45+(linha)*60));
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+2], 10+(coluna1*60), (25+(linha)*60));
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+4], 10+(coluna1*60), (60+(linha)*60));
						context2.fillStyle = 'cyan';
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+2], 1), 38+(coluna1*60), (25+(linha)*60));
						context2.fillText(enderecoCT(larray[(linha*9*8)+ (coluna*9)+4], 1), 38+(coluna1*60), (60+(linha)*60));
						break;
					default:
						context2.fillStyle = 'black';
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+2], 15+(coluna1*60), (15+(linha)*60));
						context2.fillStyle = 'cyan';
						context2.fillText(larray[(linha*9*8)+ (coluna*9)+1], 15+(coluna1*60), (25+(linha)*60));
						//context2.fillText(endereco(larray[(linha*9*8)+ (coluna*9)+2]), 15+(coluna1*60), (25+(linha)*60));
				}
			}
		}
	}
}

//======================================================================
//retira o valor da funcao Q/E/T/C/M
//=======================================================================
function endereco(Aux_data){
	var tamanho = Aux_data.length;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T'){
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
	}
	else
		index = parseInt(Aux_data.substr(1));


	switch (primeiro_char) {
		case 'Q':
			retorno = Q[index];
			break;
		case 'I':
			//document.getElementById("label_input").innerHTML = 'I -' + I.length;
			retorno = I[index];
			break;
		case 'M':
			retorno = M[index];
			break;
		case 'R':
			retorno = R[index];
			break;
		case 'T':
			retorno = T[3*index];
			break;
		case 'C':
			retorno = C[4*index];
			break;
		default:
			retorno = 3;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 2;
	return parseInt(retorno) + 1;
}
//======================================================================
//retira o valor da funcao T/C
//=======================================================================
function enderecoCT(Aux_data, index1) {
  var tamanho = Aux_data.length;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T') {
		var ponto = Aux_data.indexOf('.');
		//index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
		//document.getElementById("label_input").innerHTML = ponto +'-'+ Aux_data.charAt(0) + "[" + index + "]=" + I[index];
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			retorno = 3;
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}


	switch (primeiro_char) {
		case 'I':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + I[index+ ia]* (2**ia);
			break;
		case 'Q':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + Q[index+ ia]* (2**ia);
		  break;
		case 'M':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + M[index+ ia]* (2**ia);
			break;
		case 'T':
			retorno = T[3*index+index1];
			break;
		case 'C':
			retorno = C[4*index+index1];
			break;
		default:
			if (isNaN(parseInt(Aux_data)))
				retorno = 3;
			else
				if (parseInt(Aux_data) < 32767)
					retorno = Aux_data;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 2;
	return retorno;
}
