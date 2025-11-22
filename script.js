/**
 * Inicia a busca quando o botão "Accio" é clicado.
 */
async function IniciarBusca() {
    const termoBusca = document.getElementById('CampoBusca').value.toLowerCase();
    const mainContent = document.querySelector('main');

    if (!termoBusca) {
        mainContent.innerHTML = '<h2>Por favor, digite algo no campo de busca.</h2>';
        return;
    }

    mainContent.innerHTML = '<h2>Buscando...</h2>';

    try {
        const response = await fetch('/base de conhecimento/data.json');
        const data = await response.json();
        const resultados = buscarEmDados(termoBusca, data.houses);

        exibirResultados(resultados, mainContent);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        mainContent.innerHTML = '<h2>Ocorreu um erro ao realizar a busca. Tente novamente mais tarde.</h2>';
    }
}

/**
 * Procura o termo de busca nos dados das casas.
 * @param {string} termo - O termo a ser buscado.
 * @param {object} casas - O objeto contendo os dados de todas as casas.
 * @returns {Array} - Uma lista de resultados encontrados.
 */
function buscarEmDados(termo, casas) {
    const resultados = [];

    for (const houseKey in casas) {
        const casa = casas[houseKey];
        let textoCompleto = JSON.stringify(casa).toLowerCase();

        if (textoCompleto.includes(termo)) {
            resultados.push({
                nome: casa.name,
                slogan: casa.slogan,
                link: `${houseKey}.html`
            });
        }
    }
    return resultados;
}

/**
 * Exibe os resultados da busca na página.
 * @param {Array} resultados - A lista de resultados.
 * @param {HTMLElement} container - O elemento onde os resultados serão exibidos.
 */
function exibirResultados(resultados, container) {
    if (resultados.length === 0) {
        container.innerHTML = '<h2>Nenhum resultado encontrado. Tente um feitiço diferente!</h2>';
        return;
    }

    let htmlResultados = '<h2>Resultados da Busca:</h2>';
    resultados.forEach(resultado => {
        htmlResultados += `
            <a href="${resultado.link}" class="house-link">
                <section class="search-result">
                    <h3>${resultado.nome}</h3>
                    <p>${resultado.slogan}</p>
                </section>
            </a>
        `;
    });

    container.innerHTML = htmlResultados;
}

/* === EFEITOS ESPECIAIS === */

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

/* === CONTROLE DE MÚSICA DE FUNDO === */

/**
 * Aguarda o carregamento do DOM para configurar o controle de música.
 */
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');

    if (music && musicToggleBtn) {
        // Tenta tocar a música automaticamente
        let playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay iniciado com sucesso
                musicToggleBtn.textContent = '🔇';
            }).catch(error => {
                // Autoplay foi bloqueado pelo navegador
                console.log("Autoplay da música foi bloqueado pelo navegador.");
                musicToggleBtn.textContent = '🎵';
            });
        }

        musicToggleBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicToggleBtn.textContent = '🔇';
            } else {
                music.pause();
                musicToggleBtn.textContent = '🎵';
            }
        });
    }
});