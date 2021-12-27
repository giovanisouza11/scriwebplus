//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var AISfc = new Image();  
AISfc.src = "/img_sfc/sfc.png";
var lFuncaoSfc=0;
var canvasSfc;    
var contextSfc;
// lArrayEstado = (LinhaColuna, 1-NUM_ESTADO,2-Memoria,3-Estado de chegada1,..,..,..,..,8-Estado de chegada5,
//                 9-Estado_Destino 1,..,..,..,..,..,..,16-Estado_DEstino8,
//                 17-Ação1,..,..,..,..,..,..,24-Ação 8,25-se estado 0 númerodememórias, 26-TAMANHO,27-Reserva,28-Reserva,29-Reserva
var lArrayEstado = new Array();
// lArrayTransiçao = (Estado origem, 1-estado destino, 2-Condoção 1,..,..,..,..,..,8-Condição 7,9-ponto1,10-ponto2,11-ponto3,12-ponto4,13-ponto5,14ponto6,15-PosInicial,16-PosFinal,17-Res,18-Res,19-res)
var lArrayTransicao = new Array();
var estadoX0;
var estadoY0;
var numeroEstado;
var numeroEstadoOrigem;
var indexEstado = 0;
var indexTransicao = 0;
var saida_sfc;
var entrada_sfc;
var resultado= [0,0,0,0];
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
		var linhaEstado = 0;
		if (lFuncaoSfc >0 && lFuncaoSfc<3) {
			IFigura.style.display = "none";
			if (sfcTipo == 0){
				linhaEstado = 0;
				numeroEstadoOrigem = -1;
			 	estadoX0 = posicaoXSfc;
				estadoY0 = posicaoYSfc;
				while ((lArrayEstado.length > linhaEstado)) {
					if  (lArrayEstado[linhaEstado] == (estadoY0 +' '+ estadoX0 )) 
						numeroEstadoOrigem = lArrayEstado[linhaEstado+1];
					linhaEstado += 30;
				};

				if ((lFuncaoSfc ==1 &&  numeroEstadoOrigem == -1) || (lFuncaoSfc ==2 && numeroEstadoOrigem > -1)) {
					sfcTipo = 1;
				}
			}
			else {
				linhaEstado = 0;
				while ( (lArrayEstado.length > linhaEstado)) {
					if (lArrayEstado[linhaEstado] == (posicaoYSfc +' '+ posicaoXSfc))
						numeroEstado = lArrayEstado[linhaEstado+1];
					linhaEstado += 30;
				};
				ver_posicao_estado(posicaoXSfc, posicaoYSfc);
				switch (saida_sfc) {
					case 'baixo':
						if (lArrayEstado[numeroEstadoOrigem*30+5] == undefined)
							lArrayEstado[numeroEstadoOrigem*30+5] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*30+6] == undefined)
							 	lArrayEstado[numeroEstadoOrigem*30+6] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*30+4] == undefined)
							 		lArrayEstado[numeroEstadoOrigem*30+4] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*30+7] =  indexTransicao;
							}
						}
					        break;
					case 'esquerda':
						if (lArrayEstado[numeroEstadoOrigem*30+3] == undefined) 
							lArrayEstado[numeroEstadoOrigem*30+3] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*30+4] == undefined)
							 	lArrayEstado[numeroEstadoOrigem*30+4] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*30+5] == undefined)
							 		lArrayEstado[numeroEstadoOrigem*30+5] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*30+6] =  indexTransicao;
							}
						}
						break;
					case 'direita':
						if (lArrayEstado[numeroEstadoOrigem*30+8] == undefined) 
							lArrayEstado[numeroEstadoOrigem*30+8] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*30+7] == undefined)
							 	lArrayEstado[numeroEstadoOrigem*30+7] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*30+6] == undefined)
							 		lArrayEstado[numeroEstadoOrigem*30+6] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*30+5] =  indexTransicao;
							}
						}
						break;
				}
				switch (entrada_sfc) {
					case 'cima':
						if (lArrayEstado[numeroEstado*30+12] == undefined) 
							lArrayEstado[numeroEstado*30+12] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*30+13] == undefined)
							 	lArrayEstado[numeroEstado*30+13] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*30+11] == undefined)
							 		lArrayEstado[numeroEstado*30+11] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*30+14] =  indexTransicao;
							}
						}
					        break;
					case 'esquerda':
						if (lArrayEstado[numeroEstado*30+9] == undefined) 
							lArrayEstado[numeroEstado*30+9] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*30+10] == undefined)
							 	lArrayEstado[numeroEstado*30+10] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*30+11] == undefined)
							 		lArrayEstado[numeroEstado*30+11] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*30+12] =  indexTransicao;
							}
						}
					        break;
					case 'direita':
						if (lArrayEstado[numeroEstado*30+16] == undefined) 
							lArrayEstado[numeroEstado*30+16] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*30+15] == undefined)
							 	lArrayEstado[numeroEstado*30+15] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*30+14] == undefined)
							 		lArrayEstado[numeroEstado*30+14] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*30+13] =  indexTransicao;
							}
						}
					        break;
				}
				lArrayTransicao[indexTransicao*20] =  numeroEstadoOrigem;
				lArrayTransicao[indexTransicao*20+1] =  numeroEstado;
				draw_transicao(contextSfc, posicaoXSfc, posicaoYSfc,'black');
				indexTransicao++;

			if ( lFuncaoSfc > 0 && (lFuncaoSfc<3) && sfcTipo == 1)
			{
				ICampo.style.display = "block";
				ICampo.style.left = " "+(700 +((estadoX0+((posicaoXSfc-estadoX0)/2))*60)) + "px";
				ICampo.style.top = " "+(05+((estadoY0 +((posicaoYSfc-estadoY0)/2))*60))  + "px";
				var tag;
				document.getElementById("label_input").innerHTML = "Condição 1:";
				tag = lArrayTransicao[(indexTransicao-1)*20+8];
				if (tag != undefined && tag != "undefined")
					document.getElementById('input_ladder').value = tag;
				else
					document.getElementById('input_ladder').value = "";
				CInput.focus();
				emEdicao = 1;
				sfcTipo = 0;
			}
			else {
				ICampo.style.display = "none";
				emEdicao = 0;
			}
			}
		}
		// desenha o estado
		if (lFuncaoSfc >2 && lFuncaoSfc<5) {
			IFigura.style.display = "none";
			lArrayEstado[indexEstado*30] = posicaoYSfc +' '+ posicaoXSfc ;
			lArrayEstado[indexEstado*30+1] =  indexEstado;
			lArrayEstado[indexEstado*30+26] =  60;
			draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, indexEstado,'black',60);
			indexEstado++;
		}
		if ( lFuncaoSfc > 2 && (lFuncaoSfc<5))
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";
			var tag;
			document.getElementById("label_input").innerHTML = "Ação 1:";
			tag = lArrayEstado[(indexEstado-1)*30+17];
			if (tag != undefined && tag != "undefined")
				document.getElementById('input_ladder').value = tag;
			else
				document.getElementById('input_ladder').value = "";
			CInput.focus();
			emEdicao = 1;
		}
		else {
		}
	}	
}
//=====================================================================================
//funcao ver local de saida entrada no estado
//=====================================================================================
function ver_posicao_estado(pos_X, pos_Y) {
	if (estadoY0 == (pos_Y)) {
  		if (pos_X < estadoX0) {
			saida_sfc = 'esquerda';
			entrada_sfc = 'direita';
		}
		else {
			saida_sfc = 'direita';
			entrada_sfc = 'esquerda';
		}
	}
	else{
		if (estadoY0 < (pos_Y+1)) {
  			saida_sfc = 'baixo';
			entrada_sfc = 'cima';
		}
		else {
			if (pos_X > estadoX0) {
				saida_sfc = 'esquerda';
				entrada_sfc = 'direita';
			}
			else {
				if (pos_X == estadoX0) {
					saida_sfc = 'esquerda';
					entrada_sfc = 'esquerda';
				}
				else {
					saida_sfc = 'direita';
					entrada_sfc = 'esquerda';
				}
			}
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
function draw_estado(contexto, pos_X, pos_Y, texto,cor,tamanho) {
	contexto.lineWidth = "2";
	contexto.strokeStyle = cor;
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60);
	contexto.lineTo(pos_X*60+tamanho-5 ,pos_Y*60);
  	contexto.arcTo(pos_X*60+tamanho,pos_Y*60, pos_X*60+tamanho ,pos_Y*60+5,10);
  	contexto.lineTo(pos_X*60+tamanho,pos_Y*60+55);
  	contexto.arcTo(pos_X*60+tamanho,pos_Y*60+60, pos_X*60+tamanho-5 ,pos_Y*60+60, 10);
  	contexto.lineTo(pos_X*60+5,pos_Y*60+60);
  	contexto.arcTo(pos_X*60,pos_Y*60+60,pos_X*60,pos_Y*60+55,10);
  	contexto.lineTo(pos_X*60,pos_Y*60);
  	contexto.stroke();
	
	contexto.beginPath();
  	contexto.moveTo(pos_X*60-5,pos_Y*60+45);
	contexto.lineTo(pos_X*60 ,pos_Y*60+45);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+tamanho,pos_Y*60+45);
	contexto.lineTo(pos_X*60+tamanho+5 ,pos_Y*60+45);
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
  	contexto.moveTo(pos_X*60+15,pos_Y*60);
	contexto.lineTo(pos_X*60+15,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+13,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+13,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+24,pos_Y*60);
	contexto.lineTo(pos_X*60+24,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+26,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+26,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+34,pos_Y*60);
	contexto.lineTo(pos_X*60+34,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+36,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+36,pos_Y*60);
  	contexto.stroke();
	contexto.moveTo(pos_X*60+45,pos_Y*60);
	contexto.lineTo(pos_X*60+45,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+47,pos_Y*60-5);
  	contexto.lineTo(pos_X*60+47,pos_Y*60);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60+15);
	contexto.lineTo(pos_X*60-5,pos_Y*60+15);
  	contexto.lineTo(pos_X*60-5,pos_Y*60+13);
  	contexto.lineTo(pos_X*60,pos_Y*60+13);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+tamanho,pos_Y*60+15);
	contexto.lineTo(pos_X*60+tamanho+5,pos_Y*60+15);
  	contexto.lineTo(pos_X*60+tamanho+5,pos_Y*60+13);
  	contexto.lineTo(pos_X*60+tamanho,pos_Y*60+13);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60,pos_Y*60+30);
	contexto.moveTo(pos_X*60-5,pos_Y*60+30);
	contexto.lineTo(pos_X*60-5 ,pos_Y*60+28);
  	contexto.lineTo(pos_X*60 ,pos_Y*60+28);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+tamanho,pos_Y*60+30);
	contexto.moveTo(pos_X*60+tamanho+5,pos_Y*60+30);
	contexto.lineTo(pos_X*60+tamanho+5 ,pos_Y*60+28);
  	contexto.lineTo(pos_X*60+tamanho ,pos_Y*60+28);
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
	var i =0;
	while (i<6) {
		i ++;
		if (lArrayEstado[numeroEstadoOrigem*30 + 2 + i] == indexTransicao)
			break;
	}
	//alert("estado origem "+ i);
	var tamanho = lArrayEstado[numeroEstadoOrigem*30 + 26]; 
	switch (i) {
		case 1:
			contexto.moveTo(estadoX0*60 ,estadoY0*60+45);
			contexto.lineTo(estadoX0*60-15,estadoY0*60+45);
			break;
		case 2:
			contexto.moveTo(estadoX0*60+15 ,estadoY0*60+60);
			contexto.lineTo(estadoX0*60+15,estadoY0*60+75);
			break;
		case 3:
	               	contexto.moveTo(estadoX0*60+25 ,estadoY0*60+60);
			contexto.lineTo(estadoX0*60+25,estadoY0*60+80);
			break;
		case 4:
			contexto.moveTo(estadoX0*60+35 ,estadoY0*60+60);
			contexto.lineTo(estadoX0*60+35,estadoY0*60+80);
			break;
		case 5:
			contexto.moveTo(estadoX0*60+45 ,estadoY0*60+60);
			contexto.lineTo(estadoX0*60+45,estadoY0*60+75);
			break;
		case 6:
			contexto.moveTo(estadoX0*60+tamanho,estadoY0*60+45);
			contexto.lineTo(estadoX0*60+tamanho+15,estadoY0*60+45);
			break
	}
	var j =0;
	while (j<8) {
		j ++;
		if (lArrayEstado[numeroEstado*30 + 8 + j] == indexTransicao)
			break;
	}
	//alert("estado destino "+ j);
	tamanho = lArrayEstado[numeroEstado*30 + 26];
	if (i>1 && i<6){
		if (pos_X == estadoX0 && pos_Y < estadoY0){ 
			contexto.lineTo(estadoX0*60-30,estadoY0*60+80);
			if (j<3)
				contexto.lineTo(estadoX0*60-30,pos_Y*60+25);
			if (j>2)
				contexto.lineTo(estadoX0*60-30,pos_Y*60-30);
		}
	}
	switch (j) {
		case 1:
			contexto.lineTo(pos_X*60-25,pos_Y*60+30);
			contexto.lineTo(pos_X*60-10,pos_Y*60+30);
			contexto.lineTo(pos_X*60-10,pos_Y*60+32);
 			contexto.lineTo(pos_X*60,pos_Y*60+30);
 			contexto.lineTo(pos_X*60-10,pos_Y*60+28);
			break;
		case 2:
			contexto.lineTo(pos_X*60-20,pos_Y*60+20);
			contexto.lineTo(pos_X*60-10,pos_Y*60+20);
			contexto.lineTo(pos_X*60-10,pos_Y*60+18);
 			contexto.lineTo(pos_X*60,pos_Y*60+20);
 			contexto.lineTo(pos_X*60-10,pos_Y*60+22);
			break;
		case 3:
	               	contexto.lineTo(pos_X*60+15,pos_Y*60-20);
			contexto.lineTo(pos_X*60+15,pos_Y*60-10);
			contexto.lineTo(pos_X*60+10,pos_Y*60-10);
 			contexto.lineTo(pos_X*60+15,pos_Y*60);
 			contexto.lineTo(pos_X*60+10,pos_Y*60-10);
			break;
		case 4:
	               	contexto.lineTo(pos_X*60+25,pos_Y*60-25);
			contexto.lineTo(pos_X*60+25,pos_Y*60-10);
			contexto.lineTo(pos_X*60+20,pos_Y*60-10);
 			contexto.lineTo(pos_X*60+25,pos_Y*60);
 			contexto.lineTo(pos_X*60+20,pos_Y*60-10);
			break;
		case 5:
	               	contexto.lineTo(pos_X*60+35,pos_Y*60-25);
			contexto.lineTo(pos_X*60+35,pos_Y*60-10);
			contexto.lineTo(pos_X*60+30,pos_Y*60-10);
 			contexto.lineTo(pos_X*60+35,pos_Y*60);
 			contexto.lineTo(pos_X*60+30,pos_Y*60-10);
			break;
		case 6:
	               	contexto.lineTo(pos_X*60+45,pos_Y*60-20);
			contexto.lineTo(pos_X*60+45,pos_Y*60-10);
			contexto.lineTo(pos_X*60+40,pos_Y*60-10);
 			contexto.lineTo(pos_X*60+45,pos_Y*60);
 			contexto.lineTo(pos_X*60+40,pos_Y*60-10);
			break;
		case 7:
			contexto.lineTo(pos_X*60+tamanho+20,pos_Y*60+30);
			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+30);
			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+32);
 			contexto.lineTo(pos_X*60+tamanho,pos_Y*60+30);
 			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+28);
			break;
		case 8:
			contexto.lineTo(pos_X*60+tamango+15,pos_Y*60+20);
			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+20);
			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+18);
 			contexto.lineTo(pos_X*60+tamanho,pos_Y*60+20);
 			contexto.lineTo(pos_X*60+tamanho+10,pos_Y*60+22);
			break;
	}
	contexto.stroke();
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
	//lFuncaoSfc = 0;
	//emEdicao = 0;
	
	if (window.event.clientX >650 && emEdicao==0) {
		
		for (var i=11; i<21; i++) {
			if ( valor_chave_sfc[i] ==1) {
				lFuncaoSfc = i - 10;
				context3.drawImage(AISfc, 60*sfcTipo, 60*(i-11), 60, 60, 0, 0, 60, 60);
				ICampo.style.display = "none";
				IFigura.style.display = "block";
				IFigura.style.left = " "+(window.event.clientX-30) + "px";
				IFigura.style.top = 30+(yTop)  + "px";
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
	if ((emEdicao > 0)  && (((ICampox+60) < posicaoXSfc) || ((ICampoy+60) < posicaoYSfc) || ((ICampox-60) > posicaoXSfc) || ((ICampoy-60) > posicaoYSfc))){
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
	if (event.keyCode == 13) { //Tecla enter
		var ICampo = document.getElementById('Campo');
		var posicaoXSfc = parseInt((parseInt(ICampo.style.left)-700)/60);
		var posicaoYSfc = parseInt((parseInt(ICampo.style.top)-5)/60);
		contextSfc.font = '9pt Arial';
		contextSfc.lineWidth = "1";
		var CInput = document.getElementById('input_ladder');
		var tag = CInput.value.toUpperCase();
                //alert(lFuncaoSfc);
		if (emEdicao == 10)
                        eInputS(event);
		var auxIndexTransicao = indexTransicao - 1;
		var auxIndexEstado = indexEstado -1;
		if (lFuncaoSfc < 3) {
			//alert(auxIndexTransicao);
			if (emEdicao == 7) {
				lArrayTransicao[auxIndexTransicao*20+8] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+50, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+90);
				ICampo.style.display = "none";
				ICampo.style.top = "680px";
				ICampo.style.left = "100px";
				CInput.blur();
				emEdicao = 0;
			}
			if (emEdicao == 6) {
				lArrayTransicao[auxIndexTransicao*20+7] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+42, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+82);
				document.getElementById("label_input").innerHTML = "Condição 7:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+8];
				if (lArrayTransicao[auxIndexTransicao*20+8] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 7;
			}
			if (emEdicao == 5) {
				lArrayTransicao[auxIndexTransicao*20+6] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+32, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+72);
				document.getElementById("label_input").innerHTML = "Condição 6:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+7];
				if (lArrayTransicao[auxIndexTransicao*20+7] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 6;
			}
			if (emEdicao == 4) {
				lArrayTransicao[auxIndexTransicao*20+5] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+22, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+62);
				document.getElementById("label_input").innerHTML = "Condição 5:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+6];
				if (lArrayTransicao[auxIndexTransicao*20+6] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 5;
			}
			if (emEdicao == 3) {
				lArrayTransicao[auxIndexTransicao*20+4] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+12, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+52);
				document.getElementById("label_input").innerHTML = "Condição 4:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+5];
				if (lArrayTransicao[auxIndexTransicao*20+5] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 4;
			}
			if (emEdicao == 2) {
				lArrayTransicao[auxIndexTransicao*20+3] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*60+02, 20, 10);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+42);
				document.getElementById("label_input").innerHTML = "Condição 3:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+4];
				if (lArrayTransicao[auxIndexTransicao*20+4] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 3;
			}
			//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
			if (emEdicao == 1) {
				lArrayTransicao[auxIndexTransicao*20+2] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*50, 20, 12);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,((posicaoXSfc+estadoX0)/2)*60+30, ((posicaoYSfc+estadoY0)/2)*60+32);
				document.getElementById("label_input").innerHTML = "Condição 2:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+3];
				if (lArrayTransicao[auxIndexTransicao*20+3] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 2;
			}
		}
		else {
			if (emEdicao == 8) {
				lArrayEstado[auxIndexEstado*30+24] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+35, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+48);
				ICampo.style.display = "none";
				ICampo.style.top = "680px";
				ICampo.style.left = "100px";
				CInput.blur();
				emEdicao = 0;
			}
			if (emEdicao == 7) {
				lArrayEstado[auxIndexEstado*30+23] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+30, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+36);
				document.getElementById("label_input").innerHTML = "Ação 8:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+24];
				if (lArrayEstado[auxIndexEstado*30+24] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 8;
			}
			if (emEdicao == 6) {
				lArrayEstado[auxIndexEstado*30+22] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+25, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+24);
				document.getElementById("label_input").innerHTML = "Ação 7:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+23];
				if (lArrayEstado[auxIndexEstado*30+23] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 7;
			}
			if (emEdicao == 5) {
				lArrayEstado[auxIndexEstado*30+21] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+20, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+12);
				document.getElementById("label_input").innerHTML = "Ação 6:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+22];
				if (lArrayEstado[auxIndexEstado*30+22] == undefined )
					document.getElementById('input_ladder').value ="";
				lArrayEstado[auxIndexEstado*30+26] =  120;
				draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, auxIndexEstado,'black',120);
				emEdicao = 6;
			}
			if (emEdicao == 4) {
				lArrayEstado[auxIndexEstado*30+20] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+15, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+48);
				document.getElementById("label_input").innerHTML = "Ação 5:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+21];
				if (lArrayEstado[auxIndexEstado*30+21] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 5;
			}
			if (emEdicao == 3) {
				lArrayEstado[auxIndexEstado*30+19] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+10, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+36);
				document.getElementById("label_input").innerHTML = "Ação 4:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+20];
				if (lArrayEstado[auxIndexEstado*30+20] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 4;
			}
			if (emEdicao == 2) {
				lArrayEstado[auxIndexEstado*30+18] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+5, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+24);
				document.getElementById("label_input").innerHTML = "Ação 3:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+24];
				if (lArrayEstado[auxIndexEstado*30+19] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 3;
			}
			//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
			if (emEdicao == 1) {
				lArrayEstado[auxIndexEstado*30+17] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60, 20, 10);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+12);
				document.getElementById("label_input").innerHTML = "Ação 2:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*30+18];
				if (lArrayEstado[auxIndexEstado*30+18] == undefined )
					document.getElementById('input_ladder').value ="";
				emEdicao = 2;
			}
  		}  
	
	//posicao_sfc(0);
	}
}
//=====================================================================================
//Ve a posicao inicial e final da Transicao
// Retorna [x-ini, yini, xFim, yFim]
//=====================================================================================
function posicao_sfc(transicao) {
	/*var i =0;
	//var resultado= [0,0,0,0];
	var posSfcX = [0,15,25,35,45,0];
	var posSfcY =[45,0,0,0,0,45];
	while (i<6) {
		i ++;
		if (lArrayEstado[lArrayTransicao[transicao*20]*30 + 2 + i] == transicao)
			break;
	}
	var indexSfcString = lArrayEstado[lArrayTransicao[transicao*20]*30].indexOf(' ');
	var tamanhoSfcString = lArrayEstado[lArrayTransicao[transicao"20]*30].length();
	resultado[0] = lArrayEstado[lArrayTransicao[transicao*20]*30].substr(0, indexSfcString)*60 + posSfcX[i-1];
	resultado[1] = lArrayEstado[lArrayTransicao[transicao*20]*30].substr(indexSfcString, tamanhoSfcString)*60 + posSfcY[i-1];
	posSfcX = [0,0,15,25,35,45,0,0];
	posSfcY =[30,15,0,0,0,0,15,30];
	i = 0;
	while (i<8) {
		i ++;
		if (lArrayEstado[lArrayTransicao[transicao*20+1]*30+8+i] == transicao)
			break;
	}
	indexSfcString = lArrayEstado[lArrayTransicao[transicao*20+1]*30].indexOf(' ');
	tamanhoSfcString = lArrayEstado[lArrayTransicao[transicao*20+1]*30].length();
	resultado[2] = lArrayEstado[lArrayTransicao[transicao*20+1]*30].substr(0, indexSfcString)*60 + posSfcX[i-1];
	resultado[3] = lArrayEstado[lArrayTransicao[transicao*20+1]*30].substr(indexSfcString, tamanhoSfcString)*60 + posSfcY[i-1];
	alert(resultado[0]);
	//return resultado[0];*/
}
//=====================================================================================
//Desenho o circuito ladder apartir de uma matriz
// Apos RUN e STOP do CLP
//=====================================================================================
function monitora_sfc() {
	lArrayEstado.length = 0;
	lArrayTransicao.length = 0;
}
