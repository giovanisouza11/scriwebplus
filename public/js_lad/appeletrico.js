var AImage1 = new Image();
AImage1.src = "/img_lad/eletrico.png";
var valor_botao = new Array(7);
var M = new Array();
var I = new Array();
var R = new Array();
var Q = new Array();
var T = new Array();
var C = new Array();
var localizacao;
var comandos = 0; // 0:stop, 1: run 2: run ciclo, 3:Run Passo
var canvas;
var context;

function draw_eletrico() {
    canvas = document.getElementById("tela1");
	context= canvas.getContext("2d");
    canvas.width = 425;
    canvas.height = 500;
    canvas.top = 200;
	var i;
    for(i=0; i<12; i++){
	   	valor_botao[i] = 0;
	//	I[i] = 0;
	}
    for(i=0; i<12; i++)
       	context.drawImage(AImage1, (AImage1.width/5)*1, 0, AImage1.width/5, 110, 33+(i*32), 0, AImage1.width/5, 110);
	desenha_clp();
	for(i=0; i<12; i++)
		context.drawImage(AImage1, (AImage1.width/5)*1, 110, AImage1.width/5, 110, 33+i*32, 335, AImage1.width/5, 110);
    for(i=0; i<31; i++)
		valor_chave[i] = 0;
}
function Atualiza_Chaves(){
   for(i=0; i<12; i++){
   	valor_botao[i] = I[i];
       	context.drawImage(AImage1, (AImage1.width/5)*1, 0, AImage1.width/5, 110, 33+(i*32), 0, AImage1.width/5, 110);
   } 	
}
function desenha_clp(){
	context.font = '9pt Arial';
	context.lineWidth = 1;
	context.fillStyle = 'ivory';
	context.fillRect(5, 112, 415, 220);
	context.fillStyle = 'black';
	context.strokeRect(5, 112, 415, 220);
	context.lineWidth = 0.3;
	context.strokeRect(5, 132, 415, 40);
	context.strokeRect(5, 272, 415, 40);
	context.lineWidth = 1;
	for(var i=0; i<13; i++)
		desenha_borne_clp(i);
	context.font = '9pt Arial';

	context.fillStyle = 'red';
	context.fillRect(12, 203, 32, 18);
	context.fillStyle = 'black';
	context.strokeRect(10, 201, 36, 22);
	context.fillText('Power', 10, 195);
	context.strokeRect(10, 241, 36, 22);
	context.fillText('Run', 16, 235);
	context.fillText('Entradas - I0.', 86, 184);
	context.fillText('Memórias - M0.', 76, 201);
	context.fillText('M1.', 139, 211);
	context.fillText('M2.', 139, 221);
	context.fillText('Derivação - TR', 78, 247);
	context.fillText('Saídas  - Q0.', 90, 265);
	liga_led_CLP();


}

function desenha_borne_clp(i){
	context.lineWidth = 1;
	context.fillStyle = 'black';
	context.strokeRect(10+(i*32), 136, 16, 16);
	context.strokeRect(10+(i*32), 292, 16, 16);
	context.lineWidth = 0.5;
	context.shadowColor = 'black';
	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;
	context.strokeRect(10+(i*32), 114, 14, 14);
	context.strokeRect(10+(i*32), 316, 14, 14);
	context.beginPath();
	context.ellipse(17+(i*32), 122, 4, 4, 0, 0, 359);
	context.ellipse(17+(i*32), 122, 4, 2, i*30, 0, 359);
	context.stroke();
	context.beginPath();
	context.ellipse(17+(i*32), 322, 4, 4, 0, 0, 359);
	context.ellipse(17+(i*32), 322, 4, 2, i*30, 0, 359);
	context.stroke();
	context.lineWidth = 1;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.font = '7pt Arial';

	if (i==0){
		context.fillText('COM', 6, 167);
		context.fillText('COM', 6, 287);
	}
	else {
		context.fillText('I0.'+(i-1), 8+(i*32), 167);
		context.fillText('Q0.'+(i-1), 8+(i*32), 287);
	}
}



function draw_chave(posicaox, posisicaoy) {
        canvas = document.getElementById("tela1");
	context= canvas.getContext("2d");
	var index = posicaox;
	var i=posicaox;
	context.drawImage(AImage1, (AImage1.width/5)*(valor_botao[index]+1), 0, AImage1.width/5, 110, 33+i*32, 0, AImage1.width/5, 110);
}

function trocar() {
    var posicaox;
	posicaox = parseInt((window.event.clientX -33 )/ 32);
    var posicaoy=window.event.clientY;
	var index = posicaox;

    if ((posicaox >=0) && posicaox < 16)
    {
        if (valor_botao[index]==0) {
            valor_botao[index]=1;
		}
		else{
			valor_botao[index]=0;
		}
		draw_chave(posicaox, posicaoy);
	}
	Envia_Entrada_Ele(valor_botao);
	run_CLP();
}

function run_CLP(){
	if(comandos == 1) {
		context.fillStyle = 'green';
		context.fillRect(12, 243, 32, 18);
		context.font = '16pt Arial';
		context.fillStyle = 'black';
		context.fillText('A', 21, 261);
		liga_led_CLP();
	}
	if(comandos == 2) {
		context.fillStyle = 'green';
		context.fillRect(12, 243, 32, 18);
		context.font = '16pt Arial';
		context.fillStyle = 'black';
		context.fillText('1', 21, 261);
		liga_led_CLP();
	}
	if(comandos == 3) {
		context.fillStyle = 'green';
		context.fillRect(12, 243, 32, 18);
		context.font = '16pt Arial';
		context.fillStyle = 'black';
		context.fillText('P', 21, 261);
		liga_led_CLP();
	}
}

function liga_led_CLP(){
	for(var i=0; i <12; i++){
		if (valor_botao[i]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'white';
		context.fillRect(44+(i*32), 138, 12, 12);
	}
	context.font = '9pt Arial';

	for(var i=15; i >=0; i--){
		var j = (i<10) ? 4 : 0;
		if (I[i]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 179, 14, 5);
		context.fillText(i, j+403-(i*16), 194);
		if (M[i]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 196, 14, 5);
		if (M[i+16]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 205, 14, 5);
		if (M[i+32]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 215, 14, 5);
		if (R[i]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 242, 14, 5);
		if (Q[i]==1)
			context.fillStyle = 'green';
		else
			context.fillStyle = 'gray';
		context.fillRect(403-(i*16), 260, 14, 5);
		context.fillText(i, j+403-(i*16), 258);
	}
	if(comandos != 0) {
		for(var i=0; i <12; i++){
			if (Q[i]==1)
				context.fillStyle = 'green';
			else
				context.fillStyle = 'white';
			context.fillRect(44+(i*32), 294, 12, 12);

			context.drawImage(AImage1, (AImage1.width/5)+(AImage1.width/5)*Q[i], 110, AImage1.width/5, 110, 33+i*32, 335, AImage1.width/5, 110);
		}
	}

}

function stop_CLP(){
	context.fillStyle = 'red';
	context.fillRect(12, 243, 32, 18);
	for(var i=0; i <12; i++){
		context.fillStyle = 'white';
		context.fillRect(44+(i*32), 138, 12, 12);
	}
	for(var i=0; i <12; i++){
		context.fillStyle = 'white';
		context.fillRect(44+(i*32), 294, 12, 12);
		context.drawImage(AImage1, (AImage1.width/5)*0, 110, AImage1.width/5, 110, 33+i*32, 335, AImage1.width/5, 110);
	}
}
