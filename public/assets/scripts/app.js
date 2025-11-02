const API_URL = 'http://localhost:3000';

// Função para carregar todas as personalidades
async function carregarPersonalidades() {
    const loadingEl = document.getElementById('loading');
    const containerEl = document.getElementById('personalidades-container');
    const errorEl = document.getElementById('error-message');

    try {
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';

        const response = await fetch(`${API_URL}/personalidades`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const personalidades = await response.json();
        loadingEl.style.display = 'none';

        if (personalidades.length === 0) {
            containerEl.innerHTML = '<p class="no-data">Nenhuma personalidade cadastrada ainda.</p>';
            return;
        }

        containerEl.innerHTML = personalidades.map(personalidade => `
            <div class="personalidade-card">
                <div class="personalidade-header">
                    <h3>${escapeHtml(personalidade.nome)}</h3>
                </div>
                <div class="personalidade-body">
                    <p><strong>Nacionalidade:</strong> ${escapeHtml(personalidade.nacionalidade)}</p>
                    <p><strong>Profissão:</strong> ${escapeHtml(personalidade.profissao)}</p>
                    <p><strong>Nascimento:</strong> ${formatarData(personalidade.nascimento)}</p>
                    ${personalidade.falecimento ? `<p><strong>Falecimento:</strong> ${formatarData(personalidade.falecimento)}</p>` : ''}
                    <p class="contribuicao-preview"><strong>Contribuição:</strong> ${escapeHtml(personalidade.contribuicao.substring(0, 100))}${personalidade.contribuicao.length > 100 ? '...' : ''}</p>
                </div>
                <div class="personalidade-actions">
                    <a href="detalhes.html?id=${personalidade.id}" class="btn btn-primary btn-small">Ver Detalhes</a>
                </div>
            </div>
        `).join('');

    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Erro ao carregar personalidades: ' + error.message;
        errorEl.style.display = 'block';
        console.error('Erro ao carregar personalidades:', error);
    }
}

// Função para carregar detalhes de uma personalidade
async function carregarDetalhesPersonalidade(id) {
    const loadingEl = document.getElementById('loading');
    const containerEl = document.getElementById('detalhes-container');
    const errorEl = document.getElementById('error-message');

    try {
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';

        const response = await fetch(`${API_URL}/personalidades/${id}`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const personalidade = await response.json();
        loadingEl.style.display = 'none';

        containerEl.innerHTML = `
            <div class="detalhes-content">
                ${personalidade.imagem ? `<div class="personalidade-imagem"><img src="${escapeHtml(personalidade.imagem)}" alt="${escapeHtml(personalidade.nome)}" onerror="this.style.display='none'"></div>` : ''}
                <div class="detalhes-item">
                    <label>ID:</label>
                    <span>${escapeHtml(personalidade.id)}</span>
                </div>
                <div class="detalhes-item">
                    <label>Nome:</label>
                    <span>${escapeHtml(personalidade.nome)}</span>
                </div>
                <div class="detalhes-item">
                    <label>Nacionalidade:</label>
                    <span>${escapeHtml(personalidade.nacionalidade)}</span>
                </div>
                <div class="detalhes-item">
                    <label>Profissão:</label>
                    <span>${escapeHtml(personalidade.profissao)}</span>
                </div>
                <div class="detalhes-item">
                    <label>Data de Nascimento:</label>
                    <span>${formatarData(personalidade.nascimento)}</span>
                </div>
                ${personalidade.falecimento ? `
                <div class="detalhes-item">
                    <label>Data de Falecimento:</label>
                    <span>${formatarData(personalidade.falecimento)}</span>
                </div>
                ` : ''}
                <div class="detalhes-item full-width">
                    <label>Contribuição Histórica:</label>
                    <span>${escapeHtml(personalidade.contribuicao)}</span>
                </div>
            </div>
        `;

    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Erro ao carregar detalhes da personalidade: ' + error.message;
        errorEl.style.display = 'block';
        console.error('Erro ao carregar detalhes:', error);
    }
}

// Função auxiliar para escape de HTML (prevenir XSS)
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Função para formatar data
function formatarData(data) {
    if (!data) return 'Não informado';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// Função para mostrar erros
function mostrarErro(mensagem) {
    const errorEl = document.getElementById('error-message');
    if (errorEl) {
        errorEl.textContent = mensagem;
        errorEl.style.display = 'block';
    } else {
        alert(mensagem);
    }
}

