
var socket = io(); //('http://192.168.0.100:4333');
//var num_clp1;

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
socket.on('saida', function(data) {
       Q = data.split(',');
});
socket.on('config_socket_r', function(data) {
        num_clp1 = data;
});
function Enviar(){
    socket.emit('entradax', I.join()+ ','+  num_clp);
}
function Config_Socket(dado){
    socket.emit('sup', dado);
}

function envia_entrada(data){
	while (data.length < I.length) {
		data[data.length] = I[data.length];
	}
     	socket.emit('entradax', data.join()+ ','+  num_clp);
}

function envia_memoria(data){
	//while (data.length < M.length) {
	//	data[data.length] = M[data.length];
	//}
     	socket.emit('memoriax', data+','+enderecoCT(data,0)+ ','+  num_clp);
}
