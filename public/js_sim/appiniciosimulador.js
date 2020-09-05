	    	
function draw_inicio() {
	if (localStorage.tela_largura>199 && localStorage.tela_largura<2001)
		window.innerWidth = localStorage.tela_largura;
	else{
		window.innerWidth = 1400;
		localStorage.tela_largura = 1400;
	}
	if (localStorage.tela_altura>199 && localStorage.tela_altura<2001)
  		window.innerHeight= localStorage.tela_altura;
	else{
		window.innerWidth =900;
		localStorage.tela_altura = 900;
	}
	if (localStorage.num_clp > 0)
		num_clp = localStorage.num_clp;
	else
		num_clp = 0;
	
	draw_botoessim();
	draw_simulador_inicio();
	//redraw_processo();
}	
