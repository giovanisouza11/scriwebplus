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

 	while( si < ((lArrayEstado.length/30))) {
		
		for (var sj=0; sj<6; sj++){
			transicaoLocalSfc = lArrayEstado[si*30+9+sj];
			if( transicaoLocalSfc != ''){
				//o estado anterior
				if ( lArrayTransicao[transicaoLocalSfc*20] != '-1') {
					booleano[index_bool] = 'LD';
					index_bool++;			
					booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
					index_bool++ ;
				}
				else {
					booleano[index_bool] = 'LD';
					index_bool++;
					booleano[index_bool] = 1;
					index_bool++;
				}
				//condicoes da transicao	
				for(var sz=0; sz<6; sz++){
					if (lArrayTransicao[transicaoLocalSfc*20+2+sz] != '') { 
						var  strinx = lArrayTransicao[transicaoLocalSfc*20+2+sz];
						var igual = strinx.indexOf('=');
						var substring = strinx.substring(igual+1,strinx.length);
						if (igual > (-1)){
							if (substring == '0')
								booleano[index_bool] = 'ANDN';
							else
								booleano[index_bool] = 'AND';
							index_bool++ ;
							booleano[index_bool] = strinx.substring(0, igual);
						}
						else {
							booleano[index_bool] = 'AND';
							index_bool++ ;
							booleano[index_bool] = strinx;
						}
						index_bool++ ;
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
		if (lArrayEstado[si*30+25]>0) {
			booleano[index_bool] = 'SET';
			index_bool++ ;
			booleano[index_bool] = lArrayEstado[si*30+2];
			index_bool++ ;
			for(var sj=0; sj<6; sj++){
				transicaoLocalSfc = lArrayEstado[si*30+9+sj];
				if (transicaoLocalSfc != '-1' && transicaoLocalSfc != '' ) { 
					booleano[index_bool] = 'RST';
					index_bool++ ;
			    		booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
					index_bool++ ;
				}
			}
		}
		else {
			var  strinx = lArrayEstado[si*30+2];
			var igual = strinx.indexOf('.');
			var substring = strinx.substring(0, igual);
			for (var is = 0; is< lArrayEstado[si*30+25]; i++) {
				booleano[booleano.length] = 'MOV';
				booleano[booleano.length] = substring;
				index_bool += 2;
			}
			booleano[booleano.length] = substring;
			booleano[index_bool] = 'SET';
			index_bool++ ;
			booleano[index_bool] = lArrayEstado[si*30+2];
			index_bool++ ;	
		}
	    //Acoes dos estados
		booleano[index_bool] = 'LD';
		index_bool++;
		booleano[index_bool] = lArrayEstado[si*30 +2];
		index_bool++;
		for(var sj=0; sj<8; sj++){
			if ( lArrayEstado[si*30+17+sj] != '') { 
				var strinx = lArrayEstado[si*30+17+sj];
				var igual = strinx.indexOf('=');
				var substring = strinx.substring(igual+1,strinx.length);
				if (igual > (-1)) {
					if (substring == '0')
						booleano[index_bool] = 'RST';
					else
						booleano[index_bool] = 'SET';
					index_bool++ ;
		        		booleano[index_bool] = strinx.substring(0, igual);
				}
				else {
					booleano[index_bool] = 'SET';
					index_bool++ ;
		        		booleano[index_bool] = strinx;
				}	
				index_bool++ ;
			}
		}
		
		//procura um novo estado
		si++;		
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
	//varre toda o array BOOLEANO
	for( var csl=0; csl<booleano.length; csl++) {
		switch (booleano[csl]){
			case 'LD': 
			    	// caso ser LD é um inicio de linha ou um fim de o operando "R"
	
				if (booleano[csl+1].charAt(0) == 'R' || booleano[csl+2] == 'SET' ){
					 for(var csl1=linhaAnteriorSfc; csl1 < linha; csl1++)
						larray[csl1*8*9+maximoColuna*9+5] = 1;
				     	maximoLinha = linha+1;
				     	linha = linhaAnteriorSfc;
				     	if (coluna <6)
					     for(var csl1=maximoColuna; csl1<7; csl1++)
						     larray[linha*8*9+csl1*9+3] = 11;
				     	maximoColuna= 0;
					coluna = 7;
					csl++;
			    	}
			    	else {
			     		coluna = 0;
					linha  = maximoLinha;
					//alert('coluna '+coluna+' Linha '+linha);
					larray[linha*8*9+coluna*9] = coluna + linha*10;
			    		larray[linha*8*9+coluna*9+ 1] = '';
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
		   	case 'AND':
			    	//alert('AND');
			    	larray[linha*8*9+coluna*9] = coluna + linha*10;
			   	larray[linha*8*9+coluna*9+ 1] = '';
			    	larray[linha*8*9+coluna*9+2] = booleano[csl+1];
			    	larray[linha*8*9+coluna*9+3] = 1;
			    	larray[linha*8*9+coluna*9+4] = '';
			    	larray[linha*8*9+coluna*9+5] = 0;
			    	larray[linha*8*9+coluna*9+6] = 0;
			    	larray[linha*8*9+coluna*9+7] = '';
			    	larray[linha*8*9+coluna*9+8] = '';
			    	csl++;
				coluna++;
			    	break;			
			case 'ANDN':
		        	//alert('ANDN');
				larray[linha*8*9+coluna*9] = coluna + linha*10;
			    	larray[linha*8*9+coluna*9+ 1] = '';
			    	larray[linha*8*9+coluna*9+2] = booleano[csl+1];
			    	larray[linha*8*9+coluna*9+3] = 2;
			    	larray[linha*8*9+coluna*9+4] = '';
			    	larray[linha*8*9+coluna*9+5] = 0;
			    	larray[linha*8*9+coluna*9+6] = 0;
			    	larray[linha*8*9+coluna*9+7] = '';
			    	larray[linha*8*9+coluna*9+8] = '';
			    	csl++;
				coluna++;
			    	break;
		    	case 'SET':
			    	//alert('SET');
			   	
				alert('SET coluna '+coluna+' Linha '+linha);
				if(coluna == 7) {
					larray[linha*8*9+7*9] = coluna + linha*10;
			     		larray[linha*8*9+7*9+ 1] = '';
			     		larray[linha*8*9+7*9+2] = booleano[csl+1];
			     		larray[linha*8*9+7*9+3] = 4;
			     		larray[linha*8*9+7*9+4] = '';
			     		larray[linha*8*9+7*9+5] = 0;
			     		larray[linha*8*9+7*9+6] = 0;
			     		larray[linha*8*9+7*9+7] = '';
			     		larray[linha*8*9+7*9+8] = '';
					linha ++;
				}
			    	else {
			      		linha++;
					if (coluna > maximoColuna)
			      			maximoColuna = coluna;
			    	}
				csl++;
			    	break;
		    	case 'RST':
			    	//alert('RST');
			   	
				alert('RST coluna '+coluna+' Linha '+linha);
				if(coluna== 7) {
					larray[linha*8*9+7*9] = coluna + linha*10;
			     		larray[linha*8*9+7*9+ 1] = '';
			     		larray[linha*8*9+7*9+2] = booleano[csl+1];
			     		larray[linha*8*9+7*9+3] = 5;
			     		larray[linha*8*9+7*9+4] = '';
			     		larray[linha*8*9+7*9+5] = 0;
			     		larray[linha*8*9+7*9+6] = 0;
			     		larray[linha*8*9+7*9+7] = '';
			     		larray[linha*8*9+7*9+8] = '';
					linha ++;
				}
			    	else {
			      		linha++;
			      		if (coluna > maximoColuna)
			      			maximoColuna = coluna;
			    	}
				csl++;
			    	break;
			default:
				//larray[linha*8*9+coluna*9]= 'ERRO';
				alert('ERRO');
				csl++;
		}	     
	}
	//alerta('monitora');
	var texto = '';
	for (var i=0; i<(larray.length/9); i++) {
		for (var j=0; j<9; j++)
		    texto += larray[(i*9)+j]+',';
		texto += '\n';
	} 
	alert('saiu ' + texto);
	//monitora_ladder();
}
