
var socket = io(); //('http://192.168.0.100:4333');
//var num_clp = 0;
socket.emit('connect', num_clp);
socket.on('memoria', function(data) {
	   M = data.split(',');
});
socket.on('timer', function(data) {
	   T = data.split(',');
});
socket.on('counter', function(data) {
	   C = data.split(',');
});
socket.on('entrada', function(data) {
       I = data.split(',');
});
socket.on('tr', function(data) {
       R = data.split(',');
});
socket.on('localizacao', function(data) {
       localizacao = data;
});
socket.on('config_retorno', function(data) {
       	num_clp = data;
	context.fillStyle = 'ivory';
  	context.fillRect(86, 202, 45, 31);
    	context.font = '32pt Arial';
  	context.fillStyle = 'red';
	context.fillText(data, 86, 233);
});

socket.on('saida', function(data) {
       Q = data.split(',');
	 liga_led_CLP();
	if (comandos != 0) {
			monitora_ladder();
	};
});

function config(dado){
    	socket.emit('clp', dado);
}

function Enviar(){
	var data = I.join()+ ','+ num_clp;
    socket.emit('programax', programa+ ','+ num_clp);
    socket.emit('comandosx', comando+ ','+ num_clp);
    socket.emit('entradax',data);
}

function envia_entrada(data){
	while (data.length < I.length) {
		data[data.length] = I[data.length];
	}
     socket.emit('entradax', data.join()+ ','+ num_clp);
}


socket.on('config_socket_r', function(data) {
	localStorage.setItem("num_clp1", data);
});

function Config_Socket(dado){
	socket.emit('sup', dado);
}

/*function envia_entrada(data){
	while (data.length < I.length) {
		data[data.length] = I[data.length];
	}
     	socket.emit('entradax', data.join()+ ','+  localStorage.num_clp1);
}
*/
function envia_memoria(data){
	//while (data.length < M.length) {
	//	data[data.length] = M[data.length];
	//}
     	socket.emit('memoriax', data+','+enderecoCT(data,0)+ ','+  localStorage.num_clp1);
}

