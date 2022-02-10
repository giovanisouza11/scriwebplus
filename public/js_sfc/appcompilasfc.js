//-----------------------------------------------------------------------------------
//Vari�veis utilizadas na convers�o
//-----------------------------------------------------------------------------------
// lArrayEstado = (LinhaColuna, 1-NUM_ESTADO,2-Memoria,3-Estado de chegada1,..,..,..,..,8-Estado de chegada5,
//                 9-Estado_Destino 1,..,..,..,..,..,..,16-Estado_DEstino8,
//                 17-Ação1,..,..,..,..,..,..,24-Ação 8,25-se estado 0 númerodememórias, 26-TAMANHO,27-Reserva,28-Reserva,29-Reserva
// lArrayTransiçao = (Estado origem, 1-estado destino, 2-Condoção 1,..,..,..,..,..,8-Condição 7,9-ponto1,10-ponto2,11-ponto3,12-ponto4,13-ponto5,14ponto6,15-Res,16-Res,17-Res,18-Res,19-res)

//=====================================================================================
// Converte programa LADDER -> BOOLEANO
// A cada deriva��o vertical coloca uma fun��o SET
// Na primeira liga��o horizontal da linha, tamb�m coloco fun��o SET, despreza as outras
//======================================================================================
function compila_sfc(){
	var si = 0;
	booleano.length = 0;
	var index_bool = 0;
	var transicaoLocalSfc;
	//alert(lArrayEstado);
	//alert(lArrayTransicao);
 	while( si < ((lArrayEstado.length/30))) {
		if (lArrayEstado[si*30] != null) {
			for (var sj=0; sj<8; sj++){
				transicaoLocalSfc = lArrayEstado[si*30+9+sj];
				//alert(transicaoLocalSfc);
				if( transicaoLocalSfc != '' && transicaoLocalSfc != null){
					//o estado anterior
					if ( lArrayTransicao[transicaoLocalSfc*20] != '-1') {
						booleano[index_bool] = 'LD';
						index_bool++;			
						booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
						index_bool++ ;
						for(var sz=0; sz<6; sz++){
							if (lArrayTransicao[transicaoLocalSfc*20+2+sz] != '') { 
								verificaCondicao(lArrayTransicao[transicaoLocalSfc*20+2+sz]);
								for (var szi = 0; szi<4; szi++) {
									if (resultado[szi] != ''){
										booleano[index_bool] = resultado[szi];
										index_bool++;
									}
								}
							}
						}
					}
					else {
						if (lArrayTransicao[transicaoLocalSfc*20+2] != '' && lArrayTransicao[transicaoLocalSfc*20+2] != null) { 
							verificaCondicao(lArrayTransicao[transicaoLocalSfc*20+2]);
							if (resultado[0] == 'AND')
								booleano[index_bool] = 'LD';
							if (resultado[0] == 'ANDN')
								booleano[index_bool] = 'LDN';
							index_bool++;
							booleano[index_bool] = resultado[1];
							index_bool++;
						}
					
						//condicoes da transicao	
						for(var sz=1; sz<6; sz++){
							if (lArrayTransicao[transicaoLocalSfc*20+2+sz] != '' && lArrayTransicao[transicaoLocalSfc*20+2+sz] != null) { 
								verificaCondicao(lArrayTransicao[transicaoLocalSfc*20+2+sz]);
								for (var szi = 0; szi<4; szi++) {
									if (resultado[szi] != ''){
										booleano[index_bool] = resultado[szi];
										index_bool++;
									}
								}
							}
						}
					}
					//encerra a transicao
					booleano[index_bool] = 'SET';
					index_bool++ ;
					booleano[index_bool] = 'R' + si;
					index_bool++ ;
				}
			}
	    		//set o atual e resetase os anteriores
			booleano[index_bool] = 'LD';
			index_bool++ ;
			booleano[index_bool] = 'R'+si;
			index_bool++ ;
			if (lArrayEstado[si*30+25]> 0) {
				var strinx = lArrayEstado[si*30+2];
				var igual = strinx.indexOf('.');
				var substring1= strinx.substring(1, igual);
				var substring2= strinx.substring(0, 1);
				for (var is = 0; is < lArrayEstado[si*30+25]; is++) {
					booleano[index_bool] = 'MOV';
					index_bool++;
					booleano[index_bool] = '0';
					index_bool++;
					booleano[index_bool] = substring2 + (parseInt(substring1) + is);
					index_bool++;
				}
				booleano[index_bool] = 'SET';
				index_bool++ ;
				booleano[index_bool] = lArrayEstado[si*30+2];
				index_bool++ ;
			}
			else {
				booleano[index_bool] = 'SET';
				index_bool++ ;
				booleano[index_bool] = lArrayEstado[si*30+2];
				index_bool++ ;
				for(var sj=0; sj<6; sj++){
					transicaoLocalSfc = lArrayEstado[si*30+9+sj];
					if (transicaoLocalSfc != '-1' && transicaoLocalSfc != ''  && transicaoLocalSfc != null) { 
						booleano[index_bool] = 'RST';
						index_bool++ ;
			    			booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
						index_bool++ ;
					}
				}	
			}
	    		//Acoes dos estados
			booleano[index_bool] = 'LD';
			index_bool++;
			booleano[index_bool] = lArrayEstado[si*30 +2];
			index_bool++;
			for(var sj=0; sj<8; sj++){
				if ( lArrayEstado[si*30+17+sj] != '' && lArrayEstado[si*30+17+sj] != null) {
					verificaAcao(lArrayEstado[si*30+17+sj]);
					for (var szi = 0; szi<4; szi++) {
						if (resultado[szi] != ''){
							booleano[index_bool] = resultado[szi];
							index_bool++;
						}
					}
				}
			}
		}
		//procura um novo estado
		si++;		
	}
	//alert(booleano);
}

//=====================================================================================
// Verifica Acao
// 
// 
//======================================================================================
function verificaAcao(apontAcao){
	var igual = apontAcao.indexOf('=');
	var ponto = apontAcao.indexOf('.');
	var espaco = apontAcao.indexOf(' ');
	var mais = apontAcao.indexOf('+');
	var menos = apontAcao.indexOf('-');
	resultado = ['','','',''];
	if (ponto > -1) {
		if (igual > (-1)) {
			if (apontAcao.substring(igual+1,apontAcao.length) == '0')
				resultado[0] = 'RST';
			else
				resultado[0] = 'SET';
			resultado[1] = apontAcao.substring(0, igual);
		}
		else {
			resultado[0] = 'SET';
			resultado[1] = apontAcao;
		}
	}
	else {
		if (igual > (-1) && mais == -1 && menos == -1) {
			if ( apontAcao.charAt(0) == 'T') {
				resultado[0] = 'TMR';
				resultado[1] = apontAcao.substring(0, igual);
				resultado[2] = apontAcao.substring(igual+1, apontAcao.length);
			}
			else {
				if ( apontAcao.charAt(0) == 'C') {
					resultado[0] = 'CNR';
					resultado[1] = apontAcao.substring(0, igual);
					resultado[2] = apontAcao.substring(igual+1, apontAcao.length);
				}
				else {
					resultado[0] = 'MOV';
					resultado[1] = apontAcao.substring(0, igual);
					resultado[2] = apontAcao.substring(igual+1, apontAcao.length);
				}
			}
		}
		if (igual == (-1) && espaco > -1 && mais == -1 && menos == -1) {
			if ( apontAcao.charAt(0) == 'T') {
				resultado[0] = 'TMR';
				resultado[1] = apontAcao.substring(0, espaco);
				resultado[2] = apontAcao.substring(espaco+1, apontAcao.length);
			}
			else {
				if ( apontAcao.charAt(0) == 'C') {
					resultado[0] = 'CNR';
					resultado[1] = apontAcao.substring(0, espaco);
					resultado[2] = apontAcao.substring(espaco+1, apontAcao.length);
				}
				else {
					resultado[0] = 'MOV';
					resultado[1] = apontAcao.substring(0, espaco);
					resultado[2] = apontAcao.substring(espaco+1, apontAcao.length);
				}
			}
		}
		if (igual > (-1) && mais > -1) {
			resultado[0] = '+';
			if (igual < mais) {
				resultado[1] = apontAcao.substring(0, igual);
				resultado[2] = apontAcao.substring(mais+1, apontAcao.length);
			}
			else{
				resultado[1] = apontAcao.substring(0, mais);
				resultado[2] = apontAcao.substring(igual+1, apontAcao.length);
			}
		}
		if (igual > (-1) && menos > -1) {
			resultado[0] = '-';
			if (igual < menos) {
				resultado[1] = apontAcao.substring(0, igual);
				resultado[2] = apontAcao.substring(menos+1, apontAcao.length);
			}
			else{
				resultado[1] = apontAcao.substring(0, menos);
				resultado[2] = apontAcao.substring(igual+1, apontAcao.length);
			}
		}
		if (igual == -1) {
			resultado[0] = 'SET';
			resultado[1] = apontAcao;
		}
	} 
		
}

//=====================================================================================
// Verifica Condicao
// 
// 
//======================================================================================
function verificaCondicao(apontCondicao){
	var igual = apontCondicao.indexOf('=');
	var ponto = apontCondicao.indexOf('.');
	var maior = apontCondicao.indexOf('>');
	var menor = apontCondicao.indexOf('<');
	resultado = ['','','',''];
	if (ponto > -1) {
		if (igual > (-1)) {
			if (apontCondicao.substring(igual+1,apontCondicao.length) == '0')
				resultado[0] = 'ANDN';
			else
				resultado[0] = 'AND';
			resultado[1] = apontCondicao.substring(0, igual);
		}
		else {
			resultado[0] = 'AND';
			resultado[1] = apontCondicao;
		}
	}
	else {
		if (igual > (-1) && maior == -1 && menor == -1) {
			if ( apontCondicao.charAt(0) == 'T' || apontCondicao.charAt(0) == 'C') {
				if (apontCondicao.substring(igual+1,apontCondicao.length) == '0')
					resultado[0] = 'ANDN';
				else
					resultado[0] = 'AND';
				resultado[1] = apontCondicao.substring(0, igual);
			}
			else{
				resultado[0] = '=';
				resultado[1] = apontCondicao.substring(0, igual);
				resultado[2] = apontCondicao.substring(igual+1, apontCondicao.length);
			}
		}
		if (menor > (-1) && maior > -1) {
			resultado[0] = '<>';
			resultado[1] = apontCondicao.substring(0, menor);
			resultado[2] = apontCondicao.substring(maior+1, apontCondicao.length);
		}
		else {
			if (igual == (-1) && maior > -1) {
				resultado[0] = '>';
				resultado[1] = apontCondicao.substring(0, maior);
				resultado[2] = apontCondicao.substring(maior+1, apontCondicao.length);
			}
			if (igual > (-1) && maior > -1) {
				resultado[0] = '>=';
				resultado[1] = apontCondicao.substring(0, maior);
				resultado[2] = apontCondicao.substring(igual+1, apontCondicao.length);
			}
			if (igual == (-1) && menor > -1) {
				resultado[0] = '<';
				resultado[1] = apontCondicao.substring(0, menor);
				resultado[2] = apontCondicao.substring(menor+1, apontCondicao.length);
			}
			if (igual > (-1) && menor > -1) {
				resultado[0] = '<=';
				resultado[1] = apontCondicao.substring(0, menor);
				resultado[2] = apontCondicao.substring(igual+1, apontCondicao.length);
			}
		}
		if (igual == -1 && maior ==-1 && menor == -1) {
			resultado[0] = 'AND';
			resultado[1] = apontCondicao;
		}
	} 
		
}


//--------------------------------------------------
// funcao cONVERTE  DIAGRAMA DE ESTADO PARA LADDER
//----------------------------------------------
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
function converte_sfc_ladder(){
	//inicializa_array();
	larray.length = 0;
	compila_sfc();
	var linha = 0;
	var coluna = 0;
	var linhaAnteriorSfc = 0;
	var maximoColuna = 0;
	var maximoLinha=0;
	var flag = 1;
	//varre toda o array BOOLEANO
	for( var csl=0; csl<booleano.length; csl++) {
		//alert(booleano[csl]+' '+booleano[csl+1]);
		switch (booleano[csl]){
			case 'LD': 
			    	// caso ser LD é um inicio de linha ou um fim de o opando "R"
				if (booleano[csl+1].charAt(0) == 'R') { 
					if (booleano[csl+2] == 'SET' || booleano[csl+2] == 'MOV' ){
						//flag = 1;
						coluna = maximoColuna;
						for(var csl1=linhaAnteriorSfc; csl1 < (linha-1); csl1++)
							larray[csl1*8*9+(maximoColuna-1)*9+5] = 1;
				     		maximoLinha = linha;
				 		if (maximoColuna <6)
					     		for(var csl1=maximoColuna; csl1<7; csl1++)
						     		larray[linhaAnteriorSfc*8*9+csl1*9+3] = 11;
						var maximoColunaAuxiliar;
						for(var csl1=linhaAnteriorSfc; csl1<linha; csl1++){
							maximoColunaAuxiliar = maximoColuna-1;
							while ((larray[csl1*8*9+maximoColunaAuxiliar*9+3] == null) ||((larray[csl1*8*9+maximoColunaAuxiliar*9+3] < 1) && (larray[csl1*8*9+maximoColunaAuxiliar*9+3] > 11) && (maximoColunaAuxiliar > 0))) {
								larray[csl1*8*9+maximoColunaAuxiliar*9+3] = 11;
								maximoColunaAuxiliar--;
							}
						}
						linha = linhaAnteriorSfc;
					}
					maximoColuna= 0;
					csl ++;
			    	}
			    	else {
					if (flag ==1) {
						if (maximoLinha > linha)
							linha = maximoLinha;
						linhaAnteriorSfc = linha;
						flag = 0;
					}
			     		coluna = 0;
					larray[linha*8*9+coluna*9] = coluna + linha*10;
			    		larray[linha*8*9+coluna*9+1] = '';
			    		larray[linha*8*9+coluna*9+2] = booleano[csl+1];
			    		larray[linha*8*9+coluna*9+3] = 1;
			    		larray[linha*8*9+coluna*9+4] = '';
			    		larray[linha*8*9+coluna*9+5] = 0;
			    		larray[linha*8*9+coluna*9+6] = 0;
			    		larray[linha*8*9+coluna*9+7] = '';
			    		larray[linha*8*9+coluna*9+8] = '';
			    		csl++;
					coluna++;
			    	}
			    	break;			
		   	case 'LDN': 
			    	coluna = 0;
				ladderCondicao(linha, coluna, 2, '', booleano[csl+1], '');
				csl++;
				coluna++;
			    	break;			
			case 'AND':
			    	ladderCondicao(linha, coluna, 1, '', booleano[csl+1], '');
				csl++;
				coluna++;
			    	break;			
			case 'ANDN':
		        	ladderCondicao(linha, coluna, 2, '', booleano[csl+1], '');
				csl++;
				coluna++;
			    	break;
		    	case '=':
		        	ladderCondicao(linha, coluna, 10, '=', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
		    	case '<':
		        	ladderCondicao(linha, coluna, 10, '<', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
			case '<=':
		        	ladderCondicao(linha, coluna, 10, '<=', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
			case '>':
		        	ladderCondicao(linha, coluna, 10, '>', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
			case '>=':
		        	ladderCondicao(linha, coluna, 10, '>=', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
			case '<>':
		        	ladderCondicao(linha, coluna, 10, '<>', booleano[csl+1], booleano[csl+2]);
				csl++;
				coluna++;
			    	break;
			case 'SET':
			    	//alert('SET coluna '+coluna+' Linha '+linha);
				if (booleano[csl+1].charAt(0) == 'R'){
					if (coluna > maximoColuna)
			      			maximoColuna = coluna;
			    	}
				else {
					coluna = ladderAcao(coluna,linha,4, booleano[csl+1], 0,'');
					flag =1;
				}
				linha ++;
				csl++;
			    	break;
		    	case 'RST':
			    	coluna = ladderAcao(coluna,linha,5, booleano[csl+1], 0,'');
				linha ++;
				csl++;
				flag =1;
			    	break;
			case 'MOV':
			    	coluna = ladderAcao(coluna,linha,8, booleano[csl+1], booleano[csl+2],'MOV');
				linha ++;
				csl += 2;
				flag =1;
			    	break;
			case 'TMR':
			    	coluna = ladderAcao(coluna,linha,6, booleano[csl+1], booleano[csl+2],'TMR');
				linha ++;
				csl += 2;
				flag =1;
			    	break;
			case 'CNR':
				coluna = ladderAcao(coluna,linha,7, booleano[csl+1], booleano[csl+2],'CNR');
			    	linha ++;
				csl += 2;
				flag =1;
			    	break;
			case '+':
				coluna = ladderAcao(coluna,linha,8, booleano[csl+1], booleano[csl+2],'+');
			    	linha ++;
				csl += 2;
				flag =1;
			    	break;
			case '-':
				coluna = ladderAcao(coluna,linha,8, booleano[csl+1], booleano[csl+2],'-');
			    	linha ++;
				csl += 2;
				flag =1;
			    	break;
			default:
				alert('ERRO');
				csl++;
		}	     
	}
	var texto = '';
	for (var i=0; i<(larray.length/9); i++) {
		for (var j=0; j<9; j++)
		    texto += larray[(i*9)+j]+',';
		texto += '\n';
	} 
	alert(texto);
}
//---------------------------------------------------------
//Transforma a ACAO em LADDER
//--------------------------------------------------------
function ladderAcao(coluna,linha,funcao, operando1, operando2, funcao2) {
	if(coluna < 7) {
		var mCAuxiliar = 6;
		while ((larray[linha*8*9+mCAuxiliar*9+3] == null) ||((larray[linha*8*9+mCAuxiliar*9+3] < 1) && (larray[linha*8*9+mCAuxiliar*9+3] > 11) && (mCAuxiliar > 0))) {
			larray[linha*8*9+mCAuxiliar*9+3] = 11;
			mCAuxiliar --;
		}
		coluna = 7;
	}
	larray[linha*8*9+7*9] = coluna + linha*10;
	larray[linha*8*9+7*9+1] = '';
	larray[linha*8*9+7*9+2] = operando1;
	larray[linha*8*9+7*9+3] = funcao;
	larray[linha*8*9+7*9+6] = '';
	larray[linha*8*9+7*9+5] = 0;
	larray[linha*8*9+7*9+4] = operando2;
	larray[linha*8*9+7*9+7] = '';
	larray[linha*8*9+7*9+8] = funcao2;
	if (larray[linha*8*9+6*9+3] != 11) 
		larray[(linha-1)*8*9+6*9+5] = 1;
	return coluna;
}
//---------------------------------------------------------
//Transforma a CONDICAO em LADDER
//--------------------------------------------------------
function ladderCondicao(linha, coluna, funcao1, funcao2, operando1, operando2) {
	larray[linha*8*9+coluna*9] = coluna + linha*10;
	larray[linha*8*9+coluna*9+1] = '';
	larray[linha*8*9+coluna*9+2] = operando1;
	larray[linha*8*9+coluna*9+3] = funcao1;
	larray[linha*8*9+coluna*9+6] = '';
	larray[linha*8*9+coluna*9+5] = 0;
	larray[linha*8*9+coluna*9+4] = operando2;
	larray[linha*8*9+coluna*9+7] = '';
	larray[linha*8*9+coluna*9+8] = funcao2;
}    
	
	
