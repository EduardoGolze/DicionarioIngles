document.addEventListener('DOMContentLoaded', function() {
    const dadosDaPalavra = JSON.parse(localStorage.getItem('wordData'));

    if (dadosDaPalavra) {
        const containerDetalhes = document.getElementById('word-details');
        containerDetalhes.innerHTML = '';

        // Adiciona os arquivos de áudio
        const listaAudio = document.createElement('div');
        listaAudio.className = 'details-audio';
        dadosDaPalavra.phonetics.forEach(phonetic => {
            if (phonetic.audio) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = phonetic.audio;
                listaAudio.appendChild(audio);
            }
        });
        containerDetalhes.appendChild(listaAudio);

        // Adiciona as definições
        dadosDaPalavra.meanings.forEach(significado => {
            significado.definitions.forEach(definicao => {
                const itemDefinicao = document.createElement('div');
                itemDefinicao.className = 'details-definition';
                itemDefinicao.textContent = definicao.definition;
                containerDetalhes.appendChild(itemDefinicao);
            });
        });
    } else {
        const mensagemSemDados = document.createElement('div');
        mensagemSemDados.className = 'error-message';
        mensagemSemDados.textContent = 'Nenhum dado encontrado.';
        containerDetalhes.appendChild(mensagemSemDados);
    }

    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
