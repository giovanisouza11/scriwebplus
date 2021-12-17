//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var AISfc = new Image();  
AISfc.src = "/img_sfc/sfc.png";
var lFuncaoSfc=0;
var canvasSfc;    
var contextSfc;
var lArraySfc = new Array();
var estadoX0;
var estadoY0;

//=====================================================================================
//Inicializa Canvas
//Desenha area de trabalho em branco
//=====================================================================================
function draw_sfc_inicio() {
	canvasSfc = document.getElementById("tela_sfc");
	contextSfc = canvasSfc.getContext("2d");
	canvasSfc.width = 600;
	canvasSfc.height = 60 * Num_Linhas;
	draw_sfc_fundo(0);
	inicializa_array_sfc();
}

//=====================================================================================
//Desenha area de trabalho em branco
//=====================================================================================
function draw_sfc_fundo(tipo) {
	for (var iy = 0; iy <(canvasSfc.height-59); iy=iy+60) {
		for (var ix = 0; ix <(canvasSfc.width-59); ix=ix+60){
		   	contextSfc.drawImage(AISfc, 60*tipo, 540, 60, 60, ix, iy, 60, 60);
		}
	}
}

//=====================================================================================
//funcao chamada ao dar um click na area do ladder
//=====================================================================================
function editar_sfc() {
	var yScrollsfc = document.body.scrollTop;
	var posicaoXSfc = parseInt((window.event.clientX-650)/60);
	var posicaoYSfc = parseInt(((window.event.clientY+yScrollsfc)-5)/60);
	var ICampo = document.getElementById('Campo');
	var CInput = document.getElementById('input_ladder');
	var IFigura = document.getElementById('Fig');
        	
	if ((window.event.clientX < 650) || (window.event.clientX > 1400)) {
		ICampo.style.display = "none";
		IFigura.style.display = "none";
		emEdicao = 0;
	}
	else {
                // desenha  a transição
		if (lFuncaoSfc >0 && lFuncaoSfc<3) {
			IFigura.style.display = "none";
			if (sfcTipo == 0){
				estadoX0 = posicaoXSfc;
				estadoY0 = posicaoYSfc;
				sfcTipo = 1;
			}
			else
				draw_transicao(contextSfc, posicaoXSfc, posicaoYSfc,'black');
		}
		// desenha o estado
		if (lFuncaoSfc >2 && lFuncaoSfc<5) {
			IFigura.style.display = "none";
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) + 5] = 0;
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +3] = 0;
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +1] = '';
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +2] = '';
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +4] = '';
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +7] = '';
			lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +8] = '';
			draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, lFuncaoSfc,'black');
		}
		lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9) +3] = lFuncaoSfc;
		lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)] = posicaoYSfc*10 + posicaoXSfc;
		switch (lFuncaoSfc) {
			case 1:
			case 2:
			case 9:
				lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)+ 6] = 1;
			break;
			case 11:
				lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)+ 6] = 0;
				lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)+ 4] = 0;
				break;
			default:
				lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)+ 6] = 2;
				lArraySfc[(posicaoYSfc*8*9) + (posicaoXSfc*9)+ 4] = 0;
		}
		if ( lFuncaoSfc > 2 && (tipo_funcao<5))
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";
			var tag;
			switch (lFuncaoSfc) {
				case 8:
				case 10:
					document.getElementById("label_input").innerHTML = "Função:";
					tag = lArraySfc[(posicaoysfc*8*9) + ((posicaoxsfc)*9)+8];
					break;
				default:
					document.getElementById("label_input").innerHTML = "Endereço:";
					tag = lArraySfc[(posicaoysfc*8*9) + ((posicaoxsfc)*9)+2];
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
function draw_sfc(fileArr) {
	lArraySfc.length = 0;
}
//=====================================================================================
//Desenho 
//=====================================================================================
function draw_estado(contexto, pos_X, pos_Y, texto,cor) {
	contexto.lineWidth = "2";
	contexto.strokeStyle = cor;
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60);
	contexto.lineTo(pos_X*60+55 ,pos_Y*60);
  	contexto.arcTo(pos_X*60+60,pos_Y*60, pos_X*60+60 ,pos_Y*60+5,10);
  	contexto.lineTo(pos_X*60+60,pos_Y*60+55);
  	contexto.arcTo(pos_X*60+60,pos_Y*60+60, pos_X*60 +55 ,pos_Y*60+60, 10);
  	contexto.lineTo(pos_X*60+5,pos_Y*60+60);
  	contexto.arcTo(pos_X*60,pos_Y*60+60,pos_X*60,pos_Y*60+55,10);
  	contexto.lineTo(pos_X*60,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60-5,pos_Y*60+30);
	contexto.lineTo(pos_X*60 ,pos_Y*60+30);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60-5,pos_Y*60+40);
	contexto.lineTo(pos_X*60 ,pos_Y*60+40);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+60,pos_Y*60+30);
	contexto.lineTo(pos_X*60+65 ,pos_Y*60+30);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+60,pos_Y*60+40);
	contexto.lineTo(pos_X*60+65 ,pos_Y*60+40);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+15,pos_Y*60+60);
	contexto.lineTo(pos_X*60+15 ,pos_Y*60+65);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+25,pos_Y*60+60);
	contexto.lineTo(pos_X*60+25 ,pos_Y*60+65);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+35,pos_Y*60+60);
	contexto.lineTo(pos_X*60+35 ,pos_Y*60+65);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+45,pos_Y*60+60);
	contexto.lineTo(pos_X*60+45 ,pos_Y*60+65);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+18,pos_Y*60);
	contexto.lineTo(pos_X*60+18,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+20,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+20,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+28,pos_Y*60);
	contexto.lineTo(pos_X*60+28,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+30,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+30,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+40,pos_Y*60);
	contexto.lineTo(pos_X*60+40,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+42,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+42,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60+10);
	contexto.lineTo(pos_X*60-5,pos_Y*60+10);
  	contexto.lineTo(pos_X*60-5,pos_Y*60+12);
  	contexto.lineTo(pos_X*60,pos_Y*60+12);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+60,pos_Y*60+10);
	contexto.lineTo(pos_X*60+65,pos_Y*60+10);
  	contexto.lineTo(pos_X*60+65,pos_Y*60+12);
  	contexto.lineTo(pos_X*60+60,pos_Y*60+12);
  	contexto.stroke();
		
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60+15);
	contexto.arcTo(pos_X*60+15,pos_Y*60+15, pos_X*60+15,pos_Y*60, 15);
  	contexto.stroke();
	contexto.fillStyle = 'black';
	contexto.fillText(texto, pos_X*60+1 , pos_Y*60+10);	
}
//=====================================================================================
//Desenho transição 
//=====================================================================================
function draw_transicao(contexto, pos_X, pos_Y, cor) {
	contexto.lineWidth = "2";
	contexto.strokeStyle = cor;
	contexto.beginPath();
  	contexto.moveTo(estadoX0*60+30 ,estadoY0*60+60);
	contexto.lineTo(pos_X*60+20,pos_Y*60-5);
	contexto.lineTo(pos_X*60+22,pos_Y*60-5);
 	contexto.lineTo(pos_X*60+20,pos_Y*60);
 	contexto.stroke();
	sfcTipo = 0;
}
//=====================================================================================
// verifica movimento do mouse
//=====================================================================================
function mouse_move_sfc(){
	canvas3 = document.getElementById("tela4");
	context3 = canvas3.getContext("2d");
	canvas3.width = 60;
	canvas3.height = 60;
    	var ICampo = document.getElementById('Campo');
	var IFigura = document.getElementById('Fig');
	var yTop = window.event.clientY + document.body.scrollTop - 20;
	lFuncaoSfc = 0;
	//emEdicao = 0;
	if (window.event.clientX >650 && emEdicao==0) {
		
		for (var i=11; i<21; i++) {
			if ( valor_chave_sfc[i] ==1) {
				lFuncaoSfc = i - 10;
				context3.drawImage(AISfc, 60*sfcTipo, 60*(i-11), 60, 60, 0, 0, 60, 60);
				ICampo.style.display = "none";
				IFigura.style.display = "block";
				IFigura.style.left = " "+(window.event.clientX-30) + "px";
				IFigura.style.top = " "+(yTop)  + "px";
			}

		}
	}
	else {
		IFigura.style.display = "none";
	}
	var posicaoXSfc = parseInt((window.event.clientX-700));
    	var posicaoYSfc = parseInt((yTop+15));
    	ICampo.style.display = "block";
	var ICampox = parseInt((parseInt(ICampo.style.left)-700));
	var ICampoy = parseInt((parseInt(ICampo.style.top)-5));
	if ((emEdicao > 0)  && ((ICampox != posicaoXSfc) || (ICampoy != posicaoYSfc))){
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
function inicializa_array_sfc(){
	lArraySfc.length = 0;
}

//=====================================================================================
// Monitora a tecla ENTER
// Quando aparece o campo INPUT
// Para entrada TAG e ENDERECO
//=====================================================================================
function entrada_input_sfc(event){
	lArraySfc.length = 0;
}

//=====================================================================================
//Desenho o circuito ladder apartir de uma matriz
// Apos RUN e STOP do CLP
//=====================================================================================
function monitora_sfc() {
	lArraySfc.length = 0;
}
