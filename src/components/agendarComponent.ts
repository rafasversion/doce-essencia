interface DadosAgendamento {
  nome_cliente: string;
  telefone_cliente: string;
  procedimento: string;
  profissional: string;
  data: string;
  horario: string;
}

export default class Agendar {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:3222'
  }

  // Método para enviar o agendamento
  async enviarFormulario(dados: DadosAgendamento): Promise<void> {
    try {
      const resposta = await fetch(`${this.apiUrl}/agendar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error('Erro ao enviar o agendamento');

      const respostaJson = await resposta.json();
      alert(respostaJson.mensagem);
    } catch (erro) {
      alert(`Erro ao enviar: ${(erro as Error).message}`);
    }
  }

  // Método para capturar e validar os dados do formulário
  obterDadosDoFormulario(): DadosAgendamento | null {
    const nome_cliente = (document.getElementById('nome_cliente') as HTMLInputElement).value;
    const telefone_cliente = (document.getElementById('telefone_cliente') as HTMLInputElement).value; // Ajustado para string
    const procedimento = (document.getElementById('procedimento') as HTMLSelectElement).value;
    const profissional = (document.getElementById('profissional') as HTMLSelectElement).value;
    const data = (document.getElementById('data') as HTMLInputElement).value;
    const horario = (document.getElementById('horario') as HTMLSelectElement).value; // Garante o formato TIME

    if (!nome_cliente || !telefone_cliente || !procedimento || !profissional || !data || !horario) {
      alert('⚠️ Preencha todos os campos antes de enviar.');
      return null;
    }

    return { nome_cliente, telefone_cliente, procedimento, profissional, data, horario };
  }

  // Método para inicializar o evento do formulário
  init(): void {
    const form = document.getElementById('form-agendamento') as HTMLFormElement;

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