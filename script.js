document.getElementById('search-btn').addEventListener('click', function() {
    const termo = document.getElementById('search-term').value;
    const entradaPesquisa = document.getElementById('search-term');
    const containerResultados = document.getElementById('results');
    const mensagemErro = document.querySelector('.error-message');

    // Remove mensagens de erro anteriores e limpa resultados
    entradaPesquisa.classList.remove('error');
    containerResultados.innerHTML = '';
    if (mensagemErro) {
        mensagemErro.remove();
    }

    if (termo.trim() === '') {
        entradaPesquisa.classList.add('error');
        const divErro = document.createElement('div');
        divErro.className = 'error-message';
        divErro.textContent = 'Digite uma palavra válida';
        entradaPesquisa.parentElement.insertBefore(divErro, entradaPesquisa.nextSibling);
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${termo}`)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Palavra não encontrada');
            }
            return resposta.json();
        })
        .then(dados => {
            dados.forEach(entrada => {
                // Adiciona os tipos de dicionário como opções em português
                entrada.meanings.forEach((significado, index) => {
                    const opcaoSignificado = document.createElement('div');
                    opcaoSignificado.className = 'meaning-option';
                    opcaoSignificado.textContent = traduzirTipoDePalavra(significado.partOfSpeech) + ' - ' + (index + 1);
                    opcaoSignificado.dataset.index = index;

                    opcaoSignificado.addEventListener('click', function() {
                        localStorage.setItem('wordData', JSON.stringify({
                            phonetics: entrada.phonetics,
                            meanings: [entrada.meanings[this.dataset.index]]
                        }));
                        window.location.href = 'details.html';
                    });

                    containerResultados.appendChild(opcaoSignificado);
                });
            });
        })
        .catch(erro => {
            console.error('Erro ao buscar dados:', erro);
            entradaPesquisa.classList.add('error');
            const divErro = document.createElement('div');
            divErro.className = 'error-message';
            divErro.textContent = 'Palavra não encontrada';
            entradaPesquisa.parentElement.insertBefore(divErro, entradaPesquisa.nextSibling);
        });
});

function traduzirTipoDePalavra(tipoDePalavra) {
    switch (tipoDePalavra) {
        case 'noun':
            return 'Substantivo';
        case 'verb':
            return 'Verbo';
        case 'adjective':
            return 'Adjetivo';
        case 'adverb':
            return 'Advérbio';
        default:
            return tipoDePalavra;
    }
}
