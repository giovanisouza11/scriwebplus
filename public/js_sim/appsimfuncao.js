var index_var_config = 0;
var novaFuncao = 1;
var simTitulo = "sem titulo";

function simFuncao() {
	simArvore();
	var modal = document.getElementById("myModal");
	var modalc = document.getElementById("myColuna");
	var t_modal = modal.getElementsByTagName("h2");
	t_modal[0].innerHTML = simTitulo;	
	cSimIHM();
	
	modal.style.display = "block";
	modalc.style.display = "block";
	// Get the <Close> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		modal.style.display = "none";
		modalc.style.display = "none";
	}
	// Get the <OK> element that closes the modal
	var ok = document.getElementsByClassName("ok")[0];
	ok.onclick = function() {
		simOk();
	}
	// Get the <Apagar> element that closes the modal
	var apagar = document.getElementsByClassName("apagar")[0];
	apagar.onclick = function() {
		simApagar();
	}
	// Get the <Novo> element that closes the modal
	var novo = document.getElementsByClassName("novo")[0];
	document.getElementsByClassName("novo")[0].style.visibility = "visible";
	novo.onclick = function() {
		simNovo(novaFuncao);
	}
	// Get the <Para Cima> element that closes the modal
	var up = document.getElementsByClassName("up")[0];
	document.getElementsByClassName("up")[0].style.visibility = "visible";
	up.onclick = function() {
		simUp();
	}
	// Get the <Para Baixo> element that closes the modal
	var dw = document.getElementsByClassName("dw")[0];
	document.getElementsByClassName("dw")[0].style.visibility = "visible";
	dw.onclick = function() {
		simDw();
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			modalc.style.display = "none";
		}
	}
}
//_______________________________________________________
//Desenha  a Arvore de elementos do supervisorio
//-------------------------------------------------------
function simArvore() {
	var Ccanvas  = document.getElementById("tela3");
	Ccontext = Ccanvas.getContext("2d");
	Ccanvas.width = 70;
	Ccanvas.height = (ArrayObjStatic.length/20)*15+10;
	if (ArrayObjStatic.length >0)
		for (var i=0; i<(ArrayObjStatic.length/20); i++){
			if (i == index_var_config)
				Ccontext.fillStyle = 'red';
			else
				Ccontext.fillStyle = 'black';

			Ccontext.strokeRect(10, ((i+1)*15)-10, 10, 10);
			Ccontext.font = '10pt Arial';
			Ccontext.fillText('+', 0, ((i+1)*15));
			Ccontext.fillText(ArrayObjStatic[i*20], 23, (i+1)*15);
			Ccontext.font = '7pt Arial';
			Ccontext.fillText(ArrayObjStatic[i*20+17], 11, (i+1)*15);
		}
}
//-------------------------------------------------------------
//Click na área do simulador
//------------------------------------------------------------
function cSimFuncao() {
  	//propriedadas das figuras dinâmicas. 0_nome, 1_tipo(1:fig1, 2:fig2, etc), 2_Timer(uso da monitoracao), 3_PosX, 4_PosY,
	// 5_Pos_ArrayImagens, 6_funcao, 7_PosX_Ant, 8_PosY_ant, 9_reserva

	//propriedades estáticas. 0_nome, 1_var_1, 2_var_2, 3_pos_X_nicial,4_dpos_x,5_pos_x_final,6_pos_y_nicial, 7_dpos_y,
	// 8_posicao_y_final, 9_inc_x1, 10_inc_x2, 11_inc_y1, 12_inc_y2, 13_var1_associada, 14_var2_associada, 15_piscar,
	// 16_tempo, 17_tipo, 18_reserva, 19_reserva
	var modalc = document.getElementById("myColuna");
	var yScroll = modalc.scrollTop;
	var posicaoy = parseInt(window.event.clientY+yScroll-125);
	var posicaox = parseInt(window.event.clientX-modalc.style.left);
  	if (ArrayObjDinamic.length > 0){
		for( var i=0; i < ((ArrayObjDinamic.length/10)+1); i++){
			if ((posicaoy > ((i *15)-10)) && (posicaoy < (i *15)))
				index_var_config = i;
   		}
	}
	cSimIHM();
}
//-------------------------------------------------------------
//Desenha atela Html para edicao do supervisorio
//-------------------------------------------------------------
function cSimIHM() {
	var modalb = document.getElementById("myBody");
	modalb.innerHTML = "<p>Id <input type='text' id='input01' name='input01' maxlength=3 size=1 disabled />Tipo <select id='input02' name='input02'><option value='0'>---</option><option value='1'>Texto</option><option value='2'>Figura</option><option value='3'>Animacão</option><option value='4'>Interativo</option><option value='5'>IntNãoVisual</option><option value='6'>Display</option><option value='7'>BarGraph</option>  </select> nome:<input type='text' id='input1' name='input1' maxlength=10 size=10 autofocus /> </p>";
	modalb.innerHTML += "<p>Variável1:<input type='text' id='input2' maxlength=5 size=5/> Variável2:<input type='text' id='input3' name='input3' maxlength=5 size=5 /> </p>";
	modalb.innerHTML += "<p>Posição x:<input type='text' id='input4' name='input4' maxlength=4 size=4 /> Largura:<input type='text' id='input5' name='input5' maxlength=4 size=4 /> Posição x final:<input type='text' id='input6' name='input6' maxlength=4 size=4 /></p>";
	modalb.innerHTML += "<p>Posição y:<input type='text' id='input7' name='input7' maxlength=4 size=4 /> Altura :<input type='text' id='input8' name='input8' maxlength=4 size=4 /> Posição y final:<input type='text' id='input9' nameid='input9' maxlength=4 size=4 /></p>";
	if (ArrayObjStatic[index_var_config*20+17]>1 && ArrayObjStatic[index_var_config*20+17]<6) {
		modalb.innerHTML += "<p>Inc X1:<input type='text' id='input10' name='input10' maxlength=3 size=3 /> Inc Y1:<input type='text' id='input12' name='input12' maxlength=3 size=3 /> Variável 1:<input type='text' id='input14' name='input14' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Inc X2:<input type='text' id='input11' name='input11' maxlength=3 size=3 /> Inc Y2:<input type='text' id='input13' name='input13'  maxlength=3 size=3 /> Variável 2:<input type='text' id='input15' name='input15' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Piscar:<input type='text' id='input16' name='input16' maxlength=3 size=3 /> Tempo:<input type='text' id='input17' name='input17' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<p>Figura:<input type='text' id='input18' name='input18' maxlength=15 size=15 onkeyup='leFigura(event)' /> Função:<input type='text' id='input19' name='input19' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<canvas id='tela4' class='modal_figura'></canvas>";
	}
	if (ArrayObjStatic[index_var_config*20+17]==1) {
		modalb.innerHTML += "<p>Cor fonte: <input type='color' id='input10' name='input10' maxlength=10 size=10 /> Tamanho Fonte: <input type='text' id='input11' name='input11' maxlength=3 size=3 /> </p>";
		modalb.innerHTML += "<p>Cor de Fundo 1: <input type='color' id='input12' name='input12' maxlength=10 size=5 /> Cor de Fundo 2: <input type='color' id='input13' name='input13' maxlength=10 size=5 /></p>";
		modalb.innerHTML += "<p>Variável 1 <input type='text' id='input14' name='input14' maxlength=6 size=6 /> Variável 2: <input type='text' id='input15' name='input15' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Label <input type='text' id='input18' name='input18' maxlength=15 size=15 /> Função: <input type='text' id='input19' name='input19' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<p>Piscar <input type='text' id='input16' name='input16'  maxlength=3 size=3 /> Tempo: <input type='text' id='input17' name='input17' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<canvas id='tela4' class='modal_figura'></canvas>";
	}
	if (ArrayObjStatic[index_var_config*20+17]==6) {
		modalb.innerHTML += "<p>Cor fonte: <input type='color' id='input10' name='input10' maxlength=`10 size=10 /> Tamanho Fonte: <input type='text' id='input11' name='input11' maxlength=3 size=3 /> </p>";
		modalb.innerHTML += "<p>Variável <input type='text' id='input14' name='input14' maxlength=6 size=6 /> Incremento: <input type='text' id='input15' name='input13' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<p>Piscar <input type='text' id='input16' name='input16' maxlength=3 size=3 /> Precisão: <input type='text' id='input17' name='input17' maxlength=5 size=5 /></p>";
		modalb.innerHTML += "<p>Função: <input type='text' id='input19' name='input19' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<canvas id='tela4' class='modal_figura'></canvas>";
		modalb.innerHTML += "<p></p><p>---: <input type='text' id='input18' maxlength=3 size=3>--: <input type='text' id='input12' maxlength=3 size=3> -: <input type='text' id='input13' name='input12' maxlength=3 size=3></p>";
	}
	if (ArrayObjStatic[index_var_config*20+17]==7) {
		modalb.innerHTML += "<p>Incrementa X: <input type='text' id='input10' name='input10' maxlength=3 size=3 /> Variável 1 <input type='text' id='input14' name='input14' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Incrementa Y: <input type='text' id='input12' name='input12' maxlength=3 size=3 />  Variável 2: <input type='text' id='input15' name='input15' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Cor 1: <input type='color' id='input11' name='input11' maxlength=6 size=6 /> Cor 2: <input type='color' id='input13' name='input13' maxlength=6 size=6 /></p>";
		modalb.innerHTML += "<p>Piscar <input type='text' id='input16' name='input16' maxlength=3 size=3 /> Precisão AD: <input type='text' id='input17' name='input17' maxlength=5 size=5 /></p>";
		modalb.innerHTML += "<p> Função: <input type='text' id='input19' name='input19' maxlength=3 size=3 />--- <input type='text' id='input18' name='input16' maxlength=3 size=3 /></p>";
		modalb.innerHTML += "<canvas id='tela4' class='modal_figura'></canvas>";
	}
	modalb.innerHTML += "<p></p>";
	
	var CcanvasFig  = document.getElementById("tela4");
	var CcontextFig = CcanvasFig.getContext("2d");
	CcanvasFig.width = 100;
	CcanvasFig.height = 100;
		
	document.getElementById('input01').value = index_var_config;
	document.getElementById('input02').selectedIndex = ArrayObjStatic[index_var_config*20+17];
	for (var i=0; i <17; i++)
		document.getElementById('input'+(i+1)).value = ArrayObjStatic[index_var_config*20+i];
	document.getElementById('input19').value = ArrayObjDinamic[index_var_config*10+6];
	if (ArrayObjStatic[index_var_config*20+17]>1 && ArrayObjStatic[index_var_config*20+17]<5) {
		if (ArrayImagens[ArrayObjDinamic[(index_var_config)*10+5]]!=undefined){
			document.getElementById('input18').value = ArrayImagens[ArrayObjDinamic[(index_var_config)*10+5]];
			var lar= 0;
			var alt= 0;
			var alt_fig = Imagens_Real[ArrayObjDinamic[index_var_config*10+5]].height;
			var lar_fig = Imagens_Real[ArrayObjDinamic[index_var_config*10+5]].width;
	
			if (lar_fig >alt_fig) {
				if (lar_fig >100) {
					lar = 100;
					alt = parseInt(100 * alt_fig/lar_fig); 
				}
				else{ 
					alt = alt_fig;
					lar = lar_fig;
				}	
			}
			else {
				if (alt_fig >100) {
					alt = 100;
					lar = parseInt(100 * lar_fig/alt_fig); 
				}
				else{ 
					alt = alt_fig;
					lar = lar_fig;
				}
			}
			CcontextFig.drawImage(Imagens_Real[ArrayObjDinamic[index_var_config*10+5]], 0,0, lar, alt);		
		}
		else{
			document.getElementById('input18').value = "";
		}
	}
	if (ArrayObjStatic[index_var_config*20+17]==1) { 
		if (ArrayLabel[ArrayObjDinamic[(index_var_config)*10+5]]!= undefined){
			document.getElementById('input18').value = ArrayLabel[ArrayObjDinamic[(index_var_config)*10+5]];
		}
		else{
			document.getElementById('input18').value = "";
		}
	}
	if (ArrayObjStatic[index_var_config*20+17]==6 || ArrayObjStatic[index_var_config*20+17]==7) 
		document.getElementById('input18').value = ArrayObjDinamic[(index_var_config)*10+5];
	document.getElementById('input1').focus();
}
function leFigura(event) {
	if( event.keyCode == 13) {
		var inputPNG= document.createElement('input');
		inputPNG.type = 'file';
		inputPNG.accept = '.PNG';
		inputPNG.click();
		inputPNG.onchange = function() {
			var file = this.files[0];
			confirm(readAsreadAsArrayBuffer(file));
			leitorDePNG.readAsreadAsArrayBuffer(file);
		};
	};
}
//------------------------------------------------------------------
//Botao OK
//------------------------------------------------------------------
function simOk() {
	var r=confirm("Confirme se queres gravar esta alteração!");
	if (r==true)
	{
		ArrayObjStatic[index_var_config*20+17]  = document.getElementById('input02').value;
		for (var i=0; i <17; i++)
			ArrayObjStatic[index_var_config*20+i] = document.getElementById('input'+(i+1)).value;
		ArrayObjDinamic[index_var_config*10+6] = document.getElementById('input19').value;
		if (ArrayObjStatic[index_var_config*20+17]>1 && ArrayObjStatic[index_var_config*20+17]<5){ 
			ArrayObjDinamic[(index_var_config)*10+5] = ArrayImagens.length;
			ArrayImagens[ArrayObjDinamic[(index_var_config)*10+5]] = document.getElementById('input18').value;
			LoadImageConfig(simPath + document.getElementById('input18').value+ Extensao[ArrayObjDinamic[index_var_config*10+1]] + '.png', index_var_config);
		}
		if (ArrayObjStatic[index_var_config*20+17]==1) {
			ArrayObjDinamic[(index_var_config)*10+5] = ArrayLabel.length;
			ArrayLabel[ArrayObjDinamic[(index_var_config)*10+5]] = document.getElementById('input18').value;
		}
		if (ArrayObjStatic[index_var_config*20+17]>4) 
			ArrayObjDinamic[(index_var_config)*10+5] = document.getElementById('input18').value;
		ArrayObjDinamic[index_var_config*10+3] = ArrayObjStatic[index_var_config*20+3];
		ArrayObjDinamic[index_var_config*10+4] = ArrayObjStatic[index_var_config*20+6];
		simArvore();
		cSimIHM();
	}
}
//------------------------------------------------
//carrega figura
//-------------------------------------------------
function LoadImageConfig(imagefile, index) {
	var image1 = new Image();
	//image1 = Imagens_Real[ArrayObjDinamic[index*10+5]]
   	image1.onload = function() {
		CcontextFig.drawImage(Imagens_Real[ArrayObjDinamic[index*10+5]], 0,0, 50,100);
	};
	//image1 = Imagens_Real[ArrayObjDinamic[index*10+5]]
    	image1.src = imagefile;
    	Imagens[Imagens.length] = image1;
}
//-----------------------------------------------
//Botao para cima
//----------------------------------------------
function simUp() {
	if (index_var_config > 0){
		var auxiliar;
		for(var i= index_var_config*20; i < ((index_var_config*20)+20); i++){
			auxiliar = ArrayObjStatic[i];
			ArrayObjStatic[i] = ArrayObjStatic[i-20];
			ArrayObjStatic[i-20] = auxiliar;
		}
		for(var i= index_var_config*10; i < ((index_var_config*10)+10); i++){
			auxiliar = ArrayObjDinamic[i];
			ArrayObjDinamic[i] = ArrayObjDinamic[i-10];
			ArrayObjDinamic[i-10] = auxiliar;
		}
		index_var_config--;
		simArvore();
		cSimIHM();
	}
}
//-------------------------------------------------
//Botao oara baix0
//-------------------------------------------------
function simDw() {
	if (index_var_config < (ArrayObjStatic.length/20)){
		var auxiliar;
		for( var i= index_var_config*20; i < ((index_var_config*20)+20); i++){
			auxiliar = ArrayObjStatic[i];
			ArrayObjStatic[i] = ArrayObjStatic[i+20];
			ArrayObjStatic[i+20] = auxiliar;
		}
		for( var i= index_var_config*10; i < ((index_var_config*10)+10); i++){
			auxiliar = ArrayObjDinamic[i];
			ArrayObjDinamic[i] = ArrayObjDinamic[i+10];
			ArrayObjDinamic[i+10] = auxiliar;
		}
		index_var_config++;
	
		simArvore();
		cSimIHM();
	}
}
//--------------------------------------------------
//Botao Apagar
//-------------------------------------------------
function simApagar() {
	var r=confirm("Confirme: remover linha "+index_var_config+"!");
	if (r==true){
		index_var_config
		ArrayObjStatic.splice(index_var_config*20, 20);
		ArrayObjDinamic.splice(index_var_config*10, 10);
			
		simArvore();
		cSimIHM();
	}
}
//---------------------------------------------------
//Novo Item
//---------------------------------------------------
function simNovo(novaFuncao) {
	if( novaFuncao ==1) 
		ArrayObjDinamic.push(0,0,0,0,0,ArrayLabel.length,0,0,0,0);
	else{
		if ( novFuncao>1 && novaFuncao < 5)
			ArrayObjDinamic.push(0,0,0,0,0,ArrayImagens.length,0,0,0,0);
		else	
			ArrayObjDinamic.push(0,0,0,0,0,0,0,0,0,0);
	}
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,novaFuncao,0,0)/20)-1;
	
	simArvore();
	cSimIHM();
}
//------------------------------------------------------
//Chama a tela de configuracao se clicar no item da tela
//---------------------------------------------------------
function simApontador(apontador){
	var modal = document.getElementById("myModal");
	var t_modal = modal.getElementsByTagName("h2");
	switch (ArrayObjStatic[apontador*20+17]) {
		case '1':
			t_modal[0].innerHTML = "Edição de Labbel";
		break;
		case '2':
			t_modal[0].innerHTML = "Edição de Desenho";
		break;
		case '3':
			t_modal[0].innerHTML = "Figura Dinâmica - Sensor";
		break;
		case '4':
			t_modal[0].innerHTML = "Obj Interativo - Botão";
		break;
		case '5':
			t_modal[0].innerHTML = "Edição Objeto Não Visual";
		break;
		case '6':
			t_modal[0].innerHTML = "Edição de Display";
		break;
		case '7':
			t_modal[0].innerHTML = "Edição De BarGraph";
		break;
	}
	
	index_var_config = apontador;
	cSimIHM();
	
	modal.style.display = "block";
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		modal.style.display = "none";
	}
	var ok = document.getElementsByClassName("ok")[0];
	ok.onclick = function() {
		simOk();
		modal.style.display = "none";
	}
	var apagar = document.getElementsByClassName("apagar")[0];
	apagar.onclick = function() {
		simApagar();
		modal.style.display = "none";
	}
	document.getElementsByClassName("novo")[0].style.visibility = "hidden";
	document.getElementsByClassName("up")[0].style.visibility = "hidden";
	document.getElementsByClassName("dw")[0].style.visibility = "hidden";
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
}
//Label
function simFuncao1(){
	simTitulo = "Novo Label";
	novaFuncao = 1;
	ArrayObjDinamic.push(0,0,0,0,0,ArrayLabel.length,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0)/20)-1;
	simFuncao();
}
//desenho
function simFuncao2(){
	simTitulo = "Novo Desenho";
	novaFuncao = 2;
	ArrayObjDinamic.push(0,0,0,0,0,ArrayImagens.length,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0)/20)-1;
	simFuncao();
}
//figura dinamica
function simFuncao3(){
	simTitulo = "Nova Figura - Sensor";
	novaFuncao = 3;
	ArrayObjDinamic.push(0,0,0,0,0,ArrayImagens.length,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0)/20)-1;
	simFuncao();
}
//objeto interativo
function simFuncao4(){
	simTitulo = "Novo Objeto - Botão";
	novaFuncao = 4;
	ArrayObjDinamic.push(0,0,0,0,0,ArrayImagens.length,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0)/20)-1;
	simFuncao();
}
//interativo não visual
function simFuncao5(){
	simTitulo = "Novo Objeto não Visual";
	novaFuncao = 5;
	ArrayObjDinamic.push(0,0,0,0,0,0,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0)/20)-1;
	simFuncao();
}
//display
function simFuncao6(){
	simTitulo = "Novo Display";
	novaFuncao = 6;
	ArrayObjDinamic.push(0,0,0,0,0,0,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0)/20)-1;
	simFuncao();
}
//grafico de barras
function simFuncao7(){
	simTitulo = "Novo Bargraph";
	novaFuncao = 7;
	ArrayObjDinamic.push(0,0,0,0,0,0,0,0,0,0);
	index_var_config = parseInt(ArrayObjStatic.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0)/20)-1;
	simFuncao();
}
var leitorDePNG = new FileReader();
leitorDePNG.addEventListener('onloadend', lePNG);

function lePNG(evt) {
	Imagens_Real[ArrayObjDinamic[(index_var_config)*10+5]] = evt.target.result;

	//draw_processo(fileArr);
	
}
