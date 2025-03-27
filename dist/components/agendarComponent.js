export default class Agendar {
    apiUrl;
    constructor() {
        this.apiUrl = 'http://localhost:3222';
    }
    async enviarFormulario(dados) {
        try {
            const resposta = await fetch(`${this.apiUrl}/agendar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });
            if (!resposta.ok)
                throw new Error('Erro ao enviar o agendamento');
            const respostaJson = await resposta.json();
            alert(respostaJson.mensagem);
        }
        catch (erro) {
            alert(`Erro ao enviar: ${erro.message}`);
        }
    }
    obterDadosDoFormulario() {
        const nome_cliente = document.getElementById('nome_cliente').value;
        const telefone_cliente = document.getElementById('telefone_cliente').value;
        const procedimento = document.getElementById('procedimento').value;
        const profissional = document.getElementById('profissional').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        if (!nome_cliente || !telefone_cliente || !procedimento || !profissional || !data || !horario) {
            alert('⚠️ Preencha todos os campos antes de enviar.');
            return null;
        }
        return { nome_cliente, telefone_cliente, procedimento, profissional, data, horario };
    }
    init() {
        const form = document.getElementById('form-agendamento');
        if (form) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const dados = this.obterDadosDoFormulario();
                if (dados) {
                    await this.enviarFormulario(dados);
                }
            });
        }
    }
}
