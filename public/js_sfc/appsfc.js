//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var AISfc = new Image();  
AISfc.src = "/img_sfc/sfc.png";
var lFuncaoSfc=0;
var canvasSfc;    
var contextSfc;
// lArrayEstado = (LinhaColuna, 1-NUM_ESTADO,2-Memoria,3-se estado 0 númerodememórias, 4-TAMANHO,5-Reserva,6-Reserva,7-Reserva,8-Reserva,
//                 9-Estado_Destino 1,..,..,..,..,..,..,16-Estado_DEstino8,
//                 17-Ação1,..,..,..,..,..,..,24-Ação 8,25-Estado de chegada1,..,..,..,..,32-Estado de chegada8
var lArrayEstado = new Array();
// lArrayTransiçao = (Estado origem, 1-estado destino, 2-Condoção 1,..,..,..,..,7-Condicao 6,..,9-ponto1,10-ponto2,11-ponto3,12-ponto4,13-ponto5,14ponto6,15-Res,16-Res,17-Res,18-Res,19-res)
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
var auxiliar_sfc = [0,0,0,0,0,0,0,0,0,0];
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
					linhaEstado += 33;
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
					linhaEstado += 33;
				};
				ver_posicao_estado(posicaoXSfc, posicaoYSfc);
				switch (saida_sfc) {
					case 'baixo':
						if (lArrayEstado[numeroEstadoOrigem*33+28] == '')
							lArrayEstado[numeroEstadoOrigem*33+28] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*33+29] == '')
							 	lArrayEstado[numeroEstadoOrigem*33+29] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*33+27] == '')
							 		lArrayEstado[numeroEstadoOrigem*33+27] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*33+30] =  indexTransicao;
							}
						}
					        break;
					case 'esquerda':
						if (lArrayEstado[numeroEstadoOrigem*33+25] == '') 
							lArrayEstado[numeroEstadoOrigem*33+25] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*33+26] == '')
							 	lArrayEstado[numeroEstadoOrigem*33+26] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*33+27] == '')
							 		lArrayEstado[numeroEstadoOrigem*33+27] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*33+28] =  indexTransicao;
							}
						}
						break;
					case 'direita':
						if (lArrayEstado[numeroEstadoOrigem*33+32] == '') 
							lArrayEstado[numeroEstadoOrigem*33+32] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstadoOrigem*33+31] == '')
							 	lArrayEstado[numeroEstadoOrigem*33+31] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstadoOrigem*33+30] == '')
							 		lArrayEstado[numeroEstadoOrigem*33+30] =  indexTransicao;
								else
									lArrayEstado[numeroEstadoOrigem*33+29] =  indexTransicao;
							}
						}
						break;
				}
				switch (entrada_sfc) {
					case 'cima':
						if (lArrayEstado[numeroEstado*33+12] == '') 
							lArrayEstado[numeroEstado*33+12] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*33+13] == '')
							 	lArrayEstado[numeroEstado*33+13] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*33+11] == '')
							 		lArrayEstado[numeroEstado*33+11] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*33+14] =  indexTransicao;
							}
						}
					        break;
					case 'esquerda':
						if (lArrayEstado[numeroEstado*33+9] == '') 
							lArrayEstado[numeroEstado*33+9] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*33+10] == '')
							 	lArrayEstado[numeroEstado*33+10] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*33+11] == '')
							 		lArrayEstado[numeroEstado*33+11] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*33+12] =  indexTransicao;
							}
						}
					        break;
					case 'direita':
						if (lArrayEstado[numeroEstado*33+16] == '') 
							lArrayEstado[numeroEstado*33+16] =  indexTransicao;
						else {
							if (lArrayEstado[numeroEstado*33+15] == '')
							 	lArrayEstado[numeroEstado*33+15] =  indexTransicao;
							else {
	      							if (lArrayEstado[numeroEstado*33+14] == '')
							 		lArrayEstado[numeroEstado*33+14] =  indexTransicao;
								else
									lArrayEstado[numeroEstado*33+13] =  indexTransicao;
							}
						}
					        break;
				}
				for(var i=0; i<20; i++)
					lArrayTransicao[indexTransicao*20+i] = '';
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
					if (tag != '' ) 
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
		var tag;
		if (lFuncaoSfc==4) {
			IFigura.style.display = "none";
			for(var i=0; i<33; i++)
				lArrayEstado[indexEstado*33+i] = '';
			lArrayEstado[indexEstado*33] = posicaoYSfc +' '+ posicaoXSfc ;
			lArrayEstado[indexEstado*33+1] =  indexEstado;
			lArrayEstado[indexEstado*33+4] =  60;
			draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, indexEstado,'black',60);
			indexEstado++;
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";

			document.getElementById("label_input").innerHTML = "Memória:";
			tag = lArrayEstado[(indexEstado-1)*33+2];
			if (tag != '') 
				document.getElementById('input_ladder').value = tag;
			else
				document.getElementById('input_ladder').value = "";
			CInput.focus();
			emEdicao = 1;
		}
		if (lFuncaoSfc==3) {
			IFigura.style.display = "none";
			for(var i=0; i<33; i++)
				lArrayEstado[indexEstado*33+i] = '';
			lArrayEstado[indexEstado*33] = posicaoYSfc +' '+ posicaoXSfc ;
			lArrayEstado[indexEstado*33+1] =  indexEstado;
			lArrayEstado[indexEstado*33+4] =  60;
			draw_estado_zero(contextSfc, posicaoXSfc, posicaoYSfc, indexEstado,'black',60);
			indexEstado++;
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoXSfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoYSfc*60))  + "px";
			document.getElementById("label_input").innerHTML = "NumEstados:";
			tag = lArrayEstado[(indexEstado-1)*33+3];
			if (tag != '')
				document.getElementById('input_ladder').value = tag;
			else
				document.getElementById('input_ladder').value = "";
			CInput.focus();
			emEdicao = 11;
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
	inicializa_array_sfc();
	draw_sfc_fundo(1);
	contextSfc.font = '9pt Arial';
	var posicaoXSfc;
	var posicaoYSfc
	indexTransicao = 0;
	var sfcString;
	var indexSfcString;
	var tamanhoSfcString;

	for (var i=1; i<fileArr.length; i++) {
		var fileLine = fileArr[i].split(',');
		if (fileLine[0] != null) {
			var tamanho_array_sfc= fileLine.length;
			if (tamanho_array_sfc ==34){
				sfcString = fileLine[0];
				indexSfcString =  sfcString.indexOf(' ');
				tamanhoSfcString = sfcString.length;
				posicaoYSfc = sfcString.substring(0, indexSfcString);
				posicaoXSfc = sfcString.substring(indexSfcString+1, tamanhoSfcString);
				indexEstado = fileLine[1];
				var tamanho = parseInt(fileLine[4]);
				if (fileLine[3] != '' && fileLine[3] != null) 
					draw_estado_zero(contextSfc, posicaoXSfc, posicaoYSfc, fileLine[1],'black',tamanho);
				else	
					draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, fileLine[1],'black',tamanho);
                
				for(var j=0; j<33; j++)
					lArrayEstado[fileLine[1]*33+j] = fileLine[j];
				for(var j=0; j<4; j++){
					if (fileLine[17+j] != '') 
						contextSfc.fillText(fileLine[17+j],posicaoXSfc*60+10, posicaoYSfc*60+12+j*10);
					if (fileLine[20+j] != '') 
						contextSfc.fillText(fileLine[20+j],posicaoXSfc*60+70, posicaoYSfc*60+12+j*10);
				}
				indexEstado++;
				if (fileLine[2] != '')
					contextSfc.fillText(fileLine[2],posicaoXSfc*60+2, posicaoYSfc*60+50);
			}
			if (tamanho_array_sfc ==21) {
				//alert(tamanho_array_sfc);
				numeroEstadoOrigem = fileLine[0];
				if (numeroEstadoOrigem >-1) {
					sfcString = lArrayEstado[numeroEstadoOrigem*33];
					indexSfcString = sfcString.indexOf(' ');
					tamanhoSfcString = sfcString.length;
					estadoY0 = sfcString.substring(0, indexSfcString);
					estadoX0 = sfcString.substring(indexSfcString+1, tamanhoSfcString);
				}
				numeroEstado = fileLine[1];
				sfcString = lArrayEstado[numeroEstado*33];
				indexSfcString = sfcString.indexOf(' ');
				tamanhoSfcString = sfcString.length;
				posicaoYSfc = parseInt(sfcString.substring(0, indexSfcString));
				posicaoXSfc = sfcString.substring(indexSfcString+1, tamanhoSfcString);
			
				draw_transicao(contextSfc, posicaoXSfc, posicaoYSfc, "black");
				for(var j=0; j<20; j++)
					lArrayTransicao[indexTransicao*20+j] = fileLine[j];
				for(var j=0; j<6; j++)
					if (fileLine[2+j] != '') {
						posicao_sfc(indexTransicao);
						contextSfc.fillText(fileLine[2+j],(resultado[0]+resultado[2])/2+5, (resultado[1]+resultado[3])/2-30+j*10);
					}
				indexTransicao++;
			}
		}
	}	
}
//=====================================================================================
//Desenho ESTADO
//=====================================================================================
function draw_estado(contexto, pos_X, pos_Y, texto,cor,tamanho) {
	contexto.lineWidth = "2";
	contexto.strokeStyle = cor;
	contexto.beginPath();
	contexto.moveTo(pos_X*60,pos_Y*60);
	contexto.lineTo((pos_X*60)+tamanho-5 ,pos_Y*60);
  	contexto.arcTo((pos_X*60)+tamanho,pos_Y*60, (pos_X*60)+tamanho ,pos_Y*60+5,10);
  	contexto.lineTo((pos_X*60)+tamanho,pos_Y*60+55);
  	contexto.arcTo((pos_X*60)+tamanho,pos_Y*60+60, (pos_X*60)+tamanho-5 ,pos_Y*60+60, 10);
  	contexto.lineTo(pos_X*60+5,pos_Y*60+60);
  	contexto.arcTo(pos_X*60,pos_Y*60+60,pos_X*60,pos_Y*60+55,10);
  	contexto.lineTo(pos_X*60,pos_Y*60);
  	contexto.stroke();
	
	contexto.fillStyle = 'red';
	contexto.beginPath();
  	contexto.moveTo(pos_X*60-5,pos_Y*60+50);
	contexto.lineTo(pos_X*60 ,pos_Y*60+50);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+tamanho,pos_Y*60+50);
	contexto.lineTo(pos_X*60+tamanho+5 ,pos_Y*60+50);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60-5,pos_Y*60+40);
	contexto.lineTo(pos_X*60 ,pos_Y*60+40);
  	contexto.stroke();
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+tamanho,pos_Y*60+40);
	contexto.lineTo(pos_X*60+tamanho+5 ,pos_Y*60+40);
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
	contexto.fillStyle = 'green';
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
//Desenho estado zero
//=====================================================================================
function draw_estado_zero(contexto, pos_X, pos_Y, texto,cor,tamanho) {
	draw_estado(contexto, pos_X, pos_Y, texto,cor,tamanho);
	contexto.lineWidth = "1";
	contexto.strokeStyle = cor;
	contexto.beginPath();
  	contexto.moveTo(pos_X*60+15,pos_Y*60+3);
	contexto.lineTo(pos_X*60+tamanho-8 ,pos_Y*60+3);
  	contexto.arcTo(pos_X*60-3+tamanho,pos_Y*60+3, pos_X*60-3+tamanho ,pos_Y*60+8,9);
  	contexto.lineTo(pos_X*60-3+tamanho,pos_Y*60+52);
  	contexto.arcTo(pos_X*60-3+tamanho,pos_Y*60+57, pos_X*60+tamanho-8 ,pos_Y*60+57, 9);
  	contexto.lineTo(pos_X*60+8,pos_Y*60+57);
  	contexto.arcTo(pos_X*60+3,pos_Y*60+57,pos_X*60+3,pos_Y*60+52,9);
  	contexto.lineTo(pos_X*60+3,pos_Y*60+15);
  	contexto.stroke();
}
//=====================================================================================
//Desenho transição 
//=====================================================================================
function draw_transicao(contexto, pos_X, pos_Y, cor) {
	contexto.lineWidth = "2";
	contexto.strokeStyle = cor;
	var i =0;
	var tamanho;
	contexto.beginPath();
	if (numeroEstadoOrigem > -1){
		while (i<8) {
			i ++;
			if (lArrayEstado[numeroEstadoOrigem*33 + 2 + i] == indexTransicao)
				break;
		}
		//alert("estado origem "+ i);
		tamanho = parseInt(lArrayEstado[numeroEstadoOrigem*33 + 4]); 
		switch (i) {
			case 1:
				contexto.moveTo(estadoX0*60 ,estadoY0*60+40);
				contexto.lineTo(estadoX0*60-15,estadoY0*60+40);
				break;
			case 2:
				contexto.moveTo(estadoX0*60 ,estadoY0*60+50);
				contexto.lineTo(estadoX0*60-15,estadoY0*60+50);
				break;
			case 3:
				contexto.moveTo(estadoX0*60+15 ,estadoY0*60+60);
				contexto.lineTo(estadoX0*60+15,estadoY0*60+75);
				break;
			case 4:
	               		contexto.moveTo(estadoX0*60+25 ,estadoY0*60+60);
				contexto.lineTo(estadoX0*60+25,estadoY0*60+80);
				break;
			case 5:
				contexto.moveTo(estadoX0*60+35 ,estadoY0*60+60);
				contexto.lineTo(estadoX0*60+35,estadoY0*60+80);
				break;
			case 6:
				contexto.moveTo(estadoX0*60+45 ,estadoY0*60+60);
				contexto.lineTo(estadoX0*60+45,estadoY0*60+75);
				break;
			case 7:
				contexto.moveTo(estadoX0*60+tamanho,estadoY0*60+50);
				contexto.lineTo(estadoX0*60+tamanho+15,estadoY0*60+50);
				break
			case 8:
				contexto.moveTo(estadoX0*60+tamanho,estadoY0*60+40);
				contexto.lineTo(estadoX0*60+tamanho+15,estadoY0*60+40);
				break
		}
	}
	else {
		contexto.moveTo(pos_X*60+25,(pos_Y-1)*60);
	}
	var j =0;
	while (j<8) {
		j ++;
		if (lArrayEstado[numeroEstado*33 + 8 + j] == indexTransicao)
			break;
	}
	tamanho = parseInt(lArrayEstado[numeroEstado*33 + 26]);
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
			contexto.lineTo(pos_X*60+tamanho+15,pos_Y*60+20);
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
	indexEstado = 0;
	indexTransicao = 0;
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
        	if (emEdicao == 10)
                        eInputS(event);
		var auxIndexTransicao = indexTransicao - 1;
		var auxIndexEstado = indexEstado -1;
		if (lFuncaoSfc < 3) {
			posicao_sfc(auxIndexTransicao);
			if (emEdicao == 6) {
				lArrayTransicao[auxIndexTransicao*20+7] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2+20);
				ICampo.style.display = "none";
				ICampo.style.top = "680px";
				ICampo.style.left = "100px";
				CInput.blur();
				emEdicao = 0;
			}
			if (emEdicao == 5) {
				lArrayTransicao[auxIndexTransicao*20+6] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2+10);
				document.getElementById("label_input").innerHTML = "Condição 6:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+7];
				if (lArrayTransicao[auxIndexTransicao*20+7] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 6;
			}
			if (emEdicao == 4) {
				lArrayTransicao[auxIndexTransicao*20+5] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2);
				document.getElementById("label_input").innerHTML = "Condição 5:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+6];
				if (lArrayTransicao[auxIndexTransicao*20+6] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 5;
			}
			if (emEdicao == 3) {
				lArrayTransicao[auxIndexTransicao*20+4] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2-10);
				document.getElementById("label_input").innerHTML = "Condição 4:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+5];
				if (lArrayTransicao[auxIndexTransicao*20+5] ==  '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 4;
			}
			if (emEdicao == 2) {
				lArrayTransicao[auxIndexTransicao*20+3] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2-20);
				document.getElementById("label_input").innerHTML = "Condição 3:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+4];
				if (lArrayTransicao[auxIndexTransicao*20+4] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 3;
			}
			//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
			if (emEdicao == 1) {
				lArrayTransicao[auxIndexTransicao*20+2] = tag;
				contextSfc.fillStyle = 'white';
				//contextSfc.rect((estadoX0+((posicaoXSfc-estadoX0)/2)+1)*60, (estadoY0+((posicaoYSfc-estadoY0)/2)+1)*50, 20, 12);
				contextSfc.fillStyle = 'red';
				contextSfc.fillText(tag,(resultado[0]+resultado[2])/2+10, (resultado[1]+resultado[3])/2-30);
				document.getElementById("label_input").innerHTML = "Condição 2:";
				document.getElementById('input_ladder').value = lArrayTransicao[auxIndexTransicao*20+3];
				if (lArrayTransicao[auxIndexTransicao*20+3] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 2;
			}
		}
		else {
			if (emEdicao == 9) {
				lArrayEstado[auxIndexEstado*33+24] = tag;
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
			if (emEdicao == 8) {
				lArrayEstado[auxIndexEstado*33+23] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+30, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+36);
				document.getElementById("label_input").innerHTML = "Ação 8:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+24];
				if (lArrayEstado[auxIndexEstado*33+24] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 9;
			}
			if (emEdicao == 7) {
				lArrayEstado[auxIndexEstado*33+22] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+25, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+24);
				document.getElementById("label_input").innerHTML = "Ação 7:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+23];
				if (lArrayEstado[auxIndexEstado*33+23] =='' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 8;
			}
			if (emEdicao == 6) {
				lArrayEstado[auxIndexEstado*33+21] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+20, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+70, posicaoYSfc*60+12);
				document.getElementById("label_input").innerHTML = "Ação 6:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+22];
				if (lArrayEstado[auxIndexEstado*33+22] == '' )
					document.getElementById('input_ladder').value ="";
				lArrayEstado[auxIndexEstado*33+4] =  120;
				draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, auxIndexEstado,'black',120);
				emEdicao = 7;
			}
			if (emEdicao == 5) {
				lArrayEstado[auxIndexEstado*33+20] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+15, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+48);
				document.getElementById("label_input").innerHTML = "Ação 5:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+21];
				if (lArrayEstado[auxIndexEstado*33+21] ==  '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 6;
			}
			if (emEdicao == 4) {
				lArrayEstado[auxIndexEstado*33+19] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+10, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+36);
				document.getElementById("label_input").innerHTML = "Ação 4:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+20];
				if (lArrayEstado[auxIndexEstado*33+20] =='' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 5;
			}
			if (emEdicao == 3) {
				lArrayEstado[auxIndexEstado*33+18] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60+5, 20, 12);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+24);
				document.getElementById("label_input").innerHTML = "Ação 3:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+24];
				if (lArrayEstado[auxIndexEstado*33+19] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 4;
			}
			//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
			if (emEdicao == 2) {
				lArrayEstado[auxIndexEstado*33+17] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60, posicaoYSfc*60, 20, 10);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+10, posicaoYSfc*60+12);
				document.getElementById("label_input").innerHTML = "Ação 2:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+18];
				if (lArrayEstado[auxIndexEstado*33+18] ==  '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 3;
			}
			if (emEdicao == 1) {
				lArrayEstado[auxIndexEstado*33+2] = tag;
				contextSfc.fillStyle = 'white';
				contextSfc.rect(posicaoXSfc*60+2, posicaoYSfc*60+58, 20, 10);
				contextSfc.fillStyle = 'black';
				contextSfc.fillText(tag,posicaoXSfc*60+2, posicaoYSfc*60+58);
				document.getElementById("label_input").innerHTML = "Ação 1:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+17];
				if (lArrayEstado[auxIndexEstado*33+17] ==  '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 2;
			}
			if (emEdicao == 11) {
				lArrayEstado[auxIndexEstado*33+3] = tag;
				document.getElementById("label_input").innerHTML = "Memória:";
				document.getElementById('input_ladder').value = lArrayEstado[auxIndexEstado*33+2];
				if (lArrayEstado[auxIndexEstado*33+2] == '' )
					document.getElementById('input_ladder').value ="";
				emEdicao = 1;
			}
  		}  
	
	}
}
//=====================================================================================
//Ve a posicao inicial e final da Transicao
// Retorna [x-ini, yini, xFim, yFim]
//=====================================================================================
function posicao_sfc(transicao) {
	var i =0;
	var tamanho = parseInt(lArrayEstado[lArrayTransicao[transicao*20]*33  + 4]);
	var posSfcX = [-25,-25,15,25,35,45,tamanho+25,tamanho+25];
	var posSfcY = [40,50,85,85,85,85,50,40];
	if (lArrayTransicao[transicao*20]>-1){
		while (i<8) {
			i ++;
			if (lArrayEstado[lArrayTransicao[transicao*20]*33 + 24 + i] == transicao)
				break;
		}
		var sfcString = lArrayEstado[lArrayTransicao[transicao*20]*33];
		var indexSfcString =  sfcString.indexOf(' ');
		var tamanhoSfcString = sfcString.length;
		resultado[1] = lArrayEstado[lArrayTransicao[transicao*20]*33].substring(0, indexSfcString)*60 + posSfcY[i-1];
		resultado[0] = lArrayEstado[lArrayTransicao[transicao*20]*33].substring(indexSfcString+1, tamanhoSfcString)*60 + posSfcX[i-1];
	}
	tamanho = parseInt(lArrayEstado[lArrayTransicao[transicao*20+1]*33  + 4]);
	posSfcX = [-5,-5,15,25,35,45,tamanho+5,tamanho+5];
	posSfcY = [30,15,-5,-5,-5,-5,15,30];
	i = 0;
	while (i<8) {
		i ++;
		if (lArrayEstado[lArrayTransicao[transicao*20+1]*33+8+i] == transicao)
			break;
	}
	sfcString = lArrayEstado[lArrayTransicao[transicao*20+1]*33];
	indexSfcString = sfcString.indexOf(' ');
	tamanhoSfcString = sfcString.length;
	resultado[3] = lArrayEstado[lArrayTransicao[transicao*20+1]*33].substring(0, indexSfcString)*60 + posSfcY[i-1];
	resultado[2] = lArrayEstado[lArrayTransicao[transicao*20+1]*33].substring(indexSfcString+1, tamanhoSfcString)*60 + posSfcX[i-1];
	if ( diferenca(resultado[2],resultado[0]) < diferenca(resultado[3],resultado[1])) {
	    	if (resultado[3] > resultado[1])
			resultado[3] += 30;
	}
	else {
		if (resultado[2] > resultado[0])
			resultado[2] -= 30;
		if (resultado[2] < resultado[0])
			resultado[2] +=30;
    	}
	    
	if (lArrayTransicao[transicao*20]==-1){
		resultado[1] = (lArrayEstado[lArrayTransicao[transicao*20+1]*33].substring(0, indexSfcString)-1)*60 + 20;
		resultado[0] = lArrayEstado[lArrayTransicao[transicao*20+1]*33].substring(indexSfcString+1, tamanhoSfcString)*60 + posSfcX[i-1];
	}
}
function diferenca(op1, op2) {
	var res;
	if (op1 > op2)
		res = op1 - op2;
	else
		res = op2 - op1;
	return res;
}
//=====================================================================================
//Desenho o DIAGRMA SFC a partir de uma matriz, COM CORES DIFERENTE
//SENDO: PRETO:off, VERDE:ON, VERMELHO: ERRO, AMARELO: VARIAVEL ERRADA
// Apos RUN e STOP do CLP
//=====================================================================================
function monitora_sfc() {
	contextSfc.font = '9pt Arial';
	var posicaoXSfc;
	var posicaoYSfc;
	var sfcString;
	var indexSfcString;
	var tamanhoSfcString;
	var cor_sfc = ['silver', 'black','green','red','yellow'];
	draw_sfc_fundo(2);
	for(var i=0; i < (lArrayEstado.length/30); i++) {
		sfcString = lArrayEstado[33*i];
		if (sfcString != null) {
			indexSfcString =  sfcString.indexOf(' ');
			tamanhoSfcString = sfcString.length;
			posicaoYSfc = sfcString.substring(0, indexSfcString);
			posicaoXSfc = sfcString.substring(indexSfcString+1, tamanhoSfcString);
			var tamanho = parseInt(lArrayEstado[33*i+4]);
			verificaEstado(i);
			if (lArrayEstado[33*i+3] != '' ) 
				draw_estado_zero(contextSfc, posicaoXSfc, posicaoYSfc, lArrayEstado[33*i+1],cor_sfc[auxiliar_sfc[0]],tamanho);
			else	
				draw_estado(contextSfc, posicaoXSfc, posicaoYSfc, lArrayEstado[33*i+1],cor_sfc[auxiliar_sfc[0]],tamanho);
        		for(var j=0; j<4; j++){
				if (lArrayEstado[33*i+17+j] != ''){ 
					contextSfc.fillStyle = cor_sfc[auxiliar_sfc[j+1]];
					contextSfc.fillText(lArrayEstado[33*i+17+j],posicaoXSfc*60+10, posicaoYSfc*60+12+j*10);
				}
				if (lArrayEstado[33*i+21+j] != ''){ 
					contextSfc.fillStyle = cor_sfc[auxiliar_sfc[j+4]];
					contextSfc.fillText(lArrayEstado[33*i+21+j],posicaoXSfc*60+70, posicaoYSfc*60+12+j*10);
				}
			}
			if (lArrayEstado[33*i+2] != ''){
				contextSfc.fillStyle = cor_sfc[auxiliar_sfc[0]];
				contextSfc.fillText(lArrayEstado[33*i+2],posicaoXSfc*60+2, posicaoYSfc*60+50);
			}
		}
	}
	for(var i=0; i < (lArrayTransicao.length/20); i++) {
		numeroEstadoOrigem = lArrayTransicao[20*i];
		if (numeroEstadoOrigem >(-1)) {
			sfcString = lArrayEstado[numeroEstadoOrigem*33];
			indexSfcString = sfcString.indexOf(' ');
			tamanhoSfcString = sfcString.length;
			estadoY0 = sfcString.substring(0, indexSfcString);
			estadoX0 = sfcString.substring(indexSfcString+1, tamanhoSfcString);
		}
		numeroEstado = lArrayTransicao[20*i+1];
		sfcString = lArrayEstado[numeroEstado*33];
		indexSfcString = sfcString.indexOf(' ');
		tamanhoSfcString = sfcString.length;
		posicaoYSfc = parseInt(sfcString.substring(0, indexSfcString));
		posicaoXSfc = sfcString.substring(indexSfcString+1, tamanhoSfcString);
		verificaTransicao(i);	
		indexTransicao = i;
		draw_transicao(contextSfc, posicaoXSfc, posicaoYSfc, cor_sfc[auxiliar_sfc[0]]);
		for(var j=0; j<6; j++){
			posicao_sfc(i);
			if (lArrayTransicao[20*i+2+j] != '') {
				contextSfc.fillStyle = cor_sfc[auxiliar_sfc[j+1]];
				contextSfc.fillText(lArrayTransicao[20*i+2+j],(resultado[0]+resultado[2])/2+5, (resultado[1]+resultado[3])/2-30+j*10);
			}
		}
	}
}	
//------------------------------------------------------------------------
//VERIFICA ESTADO
//RETORNA  [ ESTADO, ACAO1, ACAO2, ACAO3,ACAO4,ACAO5, ACAO6, ACAO7, ACAO8]
//------------------------------------------------------------------------
function verificaEstado(apontEstado){
	auxiliar_sfc[0] =  endereco(lArrayEstado[apontEstado*33+2]);
	for (var i=0; i<8; i++) {
		var auxData = lArrayEstado[apontEstado*33 + 17 + i];
		var igual = auxData.indexOf('=');
		if (igual == -1){
			auxiliar_sfc[i+1] = endereco(auxData);
		}
		else {
			auxiliar_sfc[i+1] = endereco(auxData.substring(0,igual));
		}
		
	}
}
//------------------------------------------------------------------------------------------
//VERIFICA TRANSICAO
//RETORNA  [ ESTADO QUE HABILITA  TRANSICAO, CONDICAO1, COND2, COND3,COND4,COND5, CONDICAO6]
//------------------------------------------------------------------------------------------
function verificaTransicao(apontTransicao){
	if (lArrayTransicao[apontTransicao*20] > -1)
		auxiliar_sfc[0] =  endereco(lArrayEstado[lArrayTransicao[apontTransicao*20]*33+2]);
	else
		auxiliar_sfc[0] = 2;
	for (var i=0; i<6; i++) {
		var auxData = lArrayTransicao[apontTransicao*20 + 2 + i];
		var igual = auxData.indexOf('=');
		if (igual == -1){
			auxiliar_sfc[i+1] = endereco(auxData);
		}
		else {
			auxiliar_sfc[i+1] = endereco(auxData.substring(0,igual));
		}
	}
}
