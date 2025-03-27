

interface Agendamento {
  _id: number;
  _nome_cliente: string;
  _telefone_cliente: string;
  _procedimento: string;
  _profissional: string;
  _data: string;
  _horario: string;
}

export default class Agendamentos {
  constructor() { }

  init(): void {
    this.exibirAgendamentos();
  }

  async buscarAgendamentos(): Promise<Agendamento[]> {
    try {
      const resposta = await fetch('http://localhost:3222/agendamentos');
      if (!resposta.ok) throw new Error('Erro ao buscar agendamentos');
      const data = await resposta.json();
      console.log('Dados recebidos do backend:', data);
      return data;
    } catch (erro) {
      console.error('Erro ao buscar agendamentos:', erro);
      return [];
    }
  }

  async exibirAgendamentos() {
    const lista = document.querySelector('tbody')!;
    const agendamentos = await this.buscarAgendamentos();

    lista.innerHTML = '';

    if (agendamentos.length === 0) {
      lista.innerHTML = '<li>Nenhum agendamento encontrado.</li>';
      return;
    }

    agendamentos.forEach((agendamento) => {
      const item = document.createElement('tr');
      item.innerHTML = `
      <td>${agendamento._nome_cliente ?? 'Nome não informado'}</td>
      <td>${agendamento._procedimento ?? 'Procedimento não informado'}</td>
      <td>${agendamento._profissional ?? 'Profissional não informado'}</td>
      <td>${agendamento._data ?? 'Data não informada'}</td>
      <td>${agendamento._horario ?? 'Horário não informado'}</td>
      `;
      lista.appendChild(item);
    });
  }
}

