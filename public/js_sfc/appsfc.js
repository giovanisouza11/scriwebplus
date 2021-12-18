//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var AISfc = new Image();  
AISfc.src = "/img_sfc/sfc.png";
var lFuncaoSfc=0;
var canvasSfc;    
var contextSfc;
// lArrayEstado = (LinhaColuna, NUM_ESTADO,Memoria, Estado de chegada1,..,..,..,..,Estado de chegada5,Estado_Destino 1,..,..,..,..,..,..,Estado_DEstino8,Ação1,..,..,..,..,..,..,Ação 8, se estado 0 númerodememórias
var lArrayEstado = new Array();
// lArrayTransiçao = (Estado origem, estado destino,  Condoção 1,..,..,..,..,..,Condição 7,ponto1,ponto2,ponto3´ponto4,ponto5,ponto6)
var lArrayTransicao = new Array();
var estadoX0;
var estadoY0;
var numeroEstado;
var numeroEstadoOrigem;
var indexEstado = 0;
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
			else{
				var linhaEstado = 0;
				do {
					numeroEstado = lArrayEstado[linhaEstado+1];
					linhaEstado += 26;
				}while ( (lArrayEstado[linhaEstado] != (posicaoYSfc + posicaoXSfc)) && (lArrayEstado.length > linhaEstado));
				linhaEstado = 0;
				do {
					numeroEstadoOrigem = lArrayEstado[linhaEstado+1];
					linhaEstado += 26;
				}while ( (lArrayEstado[linhaEstado] != (estadoY0 + estadoX0 )) && (lArrayEstado.length > linhaEstado));
				draw_transicao(contextSfc, posicaoXSfc, posicaoYSfc,'black');
			}
		}
		// desenha o estado
		if (lFuncaoSfc >2 && lFuncaoSfc<5) {
			IFigura.style.display = "none";
			lArrayEstado[(posicaoYSfc*8*26) + (posicaoXSfc*26)] =  posicaoYSfc + posicaoXSfc ;
			lArrayEstado[(posicaoYSfc*8*26) + (posicaoXSfc*26)+1] =  indexEstado;
			draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, indexEstado,'black');
			indexEstado++;
		}
		if ( lFuncaoSfc > 2 && (lFuncaoSfc<5))
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";
			var tag;
			document.getElementById("label_input").innerHTML = "Ação 1:";
			tag = lArraySfc[(posicaoysfc*8*26) + ((posicaoxsfc)*26)+1];
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
		if ( lFuncaoSfc > 0 && (lFuncaoSfc<3) && sfcTipo == 0)
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";
			var tag;
			document.getElementById("label_input").innerHTML = "Condição 1:";
			tag = lArraySfc[(posicaoysfc*8*9) + ((posicaoxsfc)*9)+8];
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
	lArrayEstado.length = 0;
	lArrayTransicao.length = 0;
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
	if (pos_Y < (estadoY0+2)) {
		contexto.beginPath();
  		if (pos_X > estadoX0) {
			contexto.moveTo(estadoX0*60+60 ,estadoY0*60+30);
			contexto.lineTo(estadoX0*60+75,estadoY0*60+30);
			contexto.lineTo(estadoX0*60+75,pos_Y*60+30);
			contexto.lineTo(pos_X*60-20,pos_Y*60+30);
			contexto.lineTo(pos_X*60-10,pos_Y*60+30);
			contexto.lineTo(pos_X*60-10,pos_Y*60+32);
 			contexto.lineTo(pos_X*60,pos_Y*60+30);
 			contexto.lineTo(pos_X*60-10,pos_Y*60+28);
		}
		else {
			contexto.moveTo(estadoX0*60 ,estadoY0*60+30);
			contexto.lineTo(estadoX0*60-15,estadoY0*60+30);
			if (pos_X == estadoX0) {
				contexto.lineTo(pos_X*60-20,pos_Y*60+30);
				contexto.lineTo(pos_X*60-10,pos_Y*60+30);
				contexto.lineTo(pos_X*60-10,pos_Y*60+32);
 				contexto.lineTo(pos_X*60,pos_Y*60+30);
 				contexto.lineTo(pos_X*60-10,pos_Y*60+28);
			}
			else {
				contexto.lineTo(estadoX0*60-15,pos_Y*60+30);
				contexto.lineTo(pos_X*60+80,pos_Y*60+30);
				contexto.lineTo(pos_X*60+70,pos_Y*60+30);
				contexto.lineTo(pos_X*60+70,pos_Y*60+32);
 				contexto.lineTo(pos_X*60+60,pos_Y*60+30);
 				contexto.lineTo(pos_X*60+70,pos_Y*60+28);
			}
		}
		contexto.stroke();
	}
	else{
		contexto.beginPath();
  		contexto.moveTo(estadoX0*60+30 ,estadoY0*60+60);
		contexto.lineTo(estadoX0*60+30,estadoY0*60+75);
		contexto.lineTo(pos_X*60+20,estadoY0*60+75);
		contexto.lineTo(pos_X*60+20,pos_Y*60-15);
		contexto.lineTo(pos_X*60+20,pos_Y*60-10);
		contexto.lineTo(pos_X*60+23,pos_Y*60-10);
 		contexto.lineTo(pos_X*60+20,pos_Y*60);
 		contexto.lineTo(pos_X*60+17,pos_Y*60-10);
 		contexto.stroke();
	}
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
	lArrayEstado.length = 0;
	lArrayTransicao.length = 0;
}

//=====================================================================================
// Monitora a tecla ENTER
// Quando aparece o campo INPUT
// Para entrada TAG e ENDERECO
//=====================================================================================
function entrada_input_sfc(event){
	lArrayEstado.length = 0;
	lArrayTransicao.length = 0;
}

//=====================================================================================
//Desenho o circuito ladder apartir de uma matriz
// Apos RUN e STOP do CLP
//=====================================================================================
function monitora_sfc() {
	lArrayEstado.length = 0;
	lArrayTransicao.length = 0;
}
