var num_clp;	    	
function draw_inicio() {
	if (localStorage.tela_largura<200 || localStorage.tela_largura>2000)
		localStorage.tela_largura = 1400;
	if (localStorage.tela_altura<200 || localStorage.tela_altura>2000)
		localStorage.tela_altura = 900;
	//window.resizeTo(localStorage.tela_largura, localStorage.tela_altura);
	if (localStorage.num_clp > 0)
		num_clp = localStorage.num_clp;
	else
		num_clp = 0;
	
	draw_botoessim();
	draw_simulador_inicio();
	Config_Socket(num_clp);
}	
