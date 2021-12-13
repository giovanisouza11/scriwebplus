//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var AISfc = new Image();    //objetos de programacao Ladder
AISfc.src = "/img_sfc/sfc.png";
var lfuncaosfc=0;
var canvassfc;    //local desenho programa
var contextsfc;
var lArraySfc;

//=====================================================================================
//Inicializa Canvas
//Desenha area de trabalho em branco
//=====================================================================================
function draw_sfc_inicio() {
	canvassfc = document.getElementById("tela_sfc");
	contextsfc = canvassfc.getContext("2d");
	canvassfc.width = 600;
	canvassfc.height = 60 * Num_Linhas;
	draw_sfc_fundo(0);
	inicializa_array_sfc();
}

//=====================================================================================
//Desenha area de trabalho em branco
//=====================================================================================
function draw_sfc_fundo(tipo) {
	for (var iy = 0; iy <(canvassfc.height-59); iy=iy+60) {
		for (var ix = 0; ix <(canvassfc.width-59); ix=ix+60){
		   	//var i_x = 100;
			//var i_y = 100;
			contextsfc.drawImage(AISfc, 60*tipo, 540, 60, 60, ix, iy, 60, 60);
			//contextsfc.drawImage(AISfc, 60*tipo, 540, 60, 60, 0, 0, 60, 60);
			//contextsfc.drawImage(AISfc, 60*tipo, 540, 60, 60, 100, 100, 60, 60);
			//contextsfc.drawImage(AISfc, 60*tipo, 540, 60, 60, 300, 500, 60, 60);
		}
	}
}

//=====================================================================================
//funcao chamada ao dar um click na area do ladder
//=====================================================================================
function editar_sfc() {
	var yScrollsfc = document.body.scrollTop;
	var posicaoxsfc = parseInt((window.event.clientX-700)/60);
	var posicaoysfc = parseInt(((window.event.clientY+yScrollsfc)-5)/60);
	var ICampo = document.getElementById('Campo');
	var CInput = document.getElementById('input_ladder');
	var IFigura = document.getElementById('Fig');

	if ((window.event.clientX < 650) || (window.event.clientX > 1400)) {
		ICampo.style.display = "none";
		IFigura.style.display = "none";
		emEdicao = 0;
	}
	else {
		if (lfuncaosfc >0) {
			IFigura.style.display = "none";
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) + 5] = 0;
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +3] = 0;
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +1] = '';
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +2] = '';
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +4] = '';
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +7] = '';
			lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +8] = '';
			contextsfc.drawImage(AISfc, (AISfc.width/7)*2, 60*(lfuncaosfc-1), 57, 60, 65+((posicaoxsfc)*60), (posicaoysfc)*60, 57, 60);			
		}
		//{ _id, nome, var_1, tipo, var_2, ver, R-W, tag2, funcao};
		lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) +3] = lfuncaosfc;
		lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)] = posicaoysfc*10 + posicaoxsfc;
		switch (lfuncaosfc) {
			case 1:
			case 2:
			case 9:
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 6] = 1;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 4] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 7] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 8] = 0;
			break;
			case 11:
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 6] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 4] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 7] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 8] = 0;
				break;
			default:
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 6] = 2;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 4] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 7] = 0;
				lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9)+ 8] = 0;
		}
		var tipo_funcao = lArraySfc[(posicaoysfc*8*9) + (posicaoxsfc*9) + 3];
		if ( tipo_funcao > 0 && (tipo_funcao<11))
		{
			ICampo.style.display = "block";
			ICampo.style.left = " "+(700 +(posicaoxsfc*60)) + "px";
			ICampo.style.top = " "+(05+(posicaoysfc*60))  + "px";
			var tag;
			switch (tipo_funcao) {
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
// verifica movimento do mouse
//=====================================================================================
function mouse_move_sfc(){
	//canvas3 = document.getElementById("tela4");
	//context3 = canvas3.getContext("2d");
	//canvas3.width = 60;
	//canvas3.height = 60;
    	var ICampo = document.getElementById('Campo');
	var IFigura = document.getElementById('Fig');
	var yTop = window.event.clientY + document.body.scrollTop - 20;
	lfuncaosfc = 0;
	//emEdicao = 0;
	if (window.event.clientX >650 && emEdicao==0) {
		
		for (var i=11; i<21; i++) {
			if ( valor_chave_sfc[i] ==1) {
				lfuncaosfc = i - 10;
				context3.drawImage(AISfc, 0, 60*(i-11), 60, 60, 0, 0, 60, 60);
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
	var posicaoxsfc = parseInt((window.event.clientX-700));
    	var posicaoysfc = parseInt((yTop+15));
    	ICampo.style.display = "block";
	var ICampox = parseInt((parseInt(ICampo.style.left)-700));
	var ICampoy = parseInt((parseInt(ICampo.style.top)-5));
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
