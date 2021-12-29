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
	//var booleano = new Array();
	var index_bool = 0;
	var transicaoLocalSfc;
	while( si < (lArrayEstado.length/30)) {
		for (var sj=0; sj<8; sj++){
			transicaoLocalSfc = lArrayEstado[si*30+17+sj];
			//alert("ola mendo");
			if( transicaoLocalSfc != undefined){
				if ( lArrayTransicao[transicaoLocalSfc*20] != (-1)) {
					booleano[index_bool] = "LD";
					index_bool++;				
					booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
					index_bool++ ;
				}
				else {
					booleano[index_bool] = "LD";
					index_bool++;
					booleano[index_bool] = 1;
					index_bool++;
				}
					
				for(var sz=0; sz<6; sz++){
					if ( lArrayTransicao[transicaoLocalSfc*20+2+sz] != undefined) { 
						booleano[index_bool] = "AND";
					        index_bool++ ;
						booleano[index_bool] = lArrayTransicao[transicaoLocalSfc*20+2+sz];
						index_bool++ ;
					}
				}
				booleano[index_bool] = "SET";
				index_bool++ ;
				booleano[index_bool] = "R" + si;
				index_bool++ ;
			}
		}
	        booleano[index_bool] = "LD";
		index_bool++ ;
		booleano[index_bool] = "R"+si;
		index_bool++ ;
		booleano[index_bool] = "SET";
		index_bool++ ;
		booleano[index_bool] = lArrayEstado[si*30+2];
		index_bool++ ;
		for(var sj=0; sj<6; j++){
			transicaoLocalSfc = lArrayEstado[si*30+17+sj];
			if ( transicaoLocalSfc != undefined) { 
				booleano[index_bool] = "RST";
				index_bool++ ;
			        booleano[index_bool] = lArrayEstado[lArrayTransicao[transicaoLocalSfc*20]*30+2];
				index_bool++ ;
			}
		}
		si++;					
	}
}

//--------------------------------------------------
// funcao compila e pre-compila logicas ladder
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
	inicializa_array();
	for( var csl=0; csl<booleano.length; csl++){
	      switch (booleano[csl]){
		      case ld:
			      
		
	}
	monitora_ladder();
}
