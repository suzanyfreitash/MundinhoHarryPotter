/**
 * Adiciona um efeito de rastro de partículas brilhantes que seguem o cursor do mouse,
 * simulando uma varinha mágica.
 */
document.addEventListener('mousemove', function(e) {
    // Seleciona o corpo do documento para adicionar as partículas
    let body = document.querySelector('body');
    
    // Cria um novo elemento 'span' para ser a partícula
    let sparkle = document.createElement('span');
    sparkle.className = 'sparkle'; // Adiciona uma classe para estilização
    sparkle.style.left = e.pageX + 'px'; // Posição horizontal baseada no cursor
    sparkle.style.top = e.pageY + 'px';  // Posição vertical baseada no cursor
    
    body.appendChild(sparkle); // Adiciona a partícula ao corpo do documento
    
    // Remove a partícula após 800ms para criar o efeito de rastro
    setTimeout(() => {
        sparkle.remove();
    }, 800);
});