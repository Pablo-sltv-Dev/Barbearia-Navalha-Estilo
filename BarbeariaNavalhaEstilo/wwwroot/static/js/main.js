let dataAtual = new Date();
let diaSelecionado = null;
let horarioSelecionado = null;

const diasBloqueados = [0, 1];
const datasLotadas = [28];
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function abrirCalendario() {
  document.getElementById("modal-calendario").classList.add("active");
  renderizarCalendario();
}

function fecharCalendario() {
  document.getElementById("modal-calendario").classList.remove("active");
  diaSelecionado = null;
  horarioSelecionado = null;
  document.getElementById("horarios-col").classList.remove("show");
  document.getElementById("btn-finalizar").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal-calendario");
  if (event.target === modal) fecharCalendario();
};

function renderizarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  document.getElementById("calendar-month-year").innerText =
    `${meses[mes]} ${ano}`;

  const primeiroDiaMes = new Date(ano, mes, 1).getDay();
  const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

  const listaDias = document.getElementById("calendar-days");
  listaDias.innerHTML = "";

  for (let i = 0; i < primeiroDiaMes; i++) {
    const emptyDiv = document.createElement("div");
    listaDias.appendChild(emptyDiv);
  }

  const hoje = new Date();

  for (let dia = 1; dia <= ultimoDiaMes; dia++) {
    const diaDiv = document.createElement("div");
    diaDiv.innerText = dia;
    diaDiv.classList.add("calendar-day");

    const dataVerificacao = new Date(ano, mes, dia);
    const diaDaSemana = dataVerificacao.getDay();

    if (dataVerificacao.setHours(0, 0, 0, 0) < hoje.setHours(0, 0, 0, 0)) {
      diaDiv.classList.add("disabled");
    } else if (diasBloqueados.includes(diaDaSemana)) {
      diaDiv.classList.add("disabled");
      diaDiv.title = "Barbearia Fechada";
    } else if (mes === hoje.getMonth() && datasLotadas.includes(dia)) {
      diaDiv.classList.add("lotado");
      diaDiv.title = "Sem horários disponíveis";
    } else {
      diaDiv.onclick = () => selecionarDia(dia, diaDiv);
      if (diaSelecionado === dia) {
        diaDiv.classList.add("selected");
      }
    }

    listaDias.appendChild(diaDiv);
  }
}

function mudarMes(direcao) {
  dataAtual.setMonth(dataAtual.getMonth() + direcao);
  diaSelecionado = null;
  document.getElementById("horarios-col").classList.remove("show");
  renderizarCalendario();
}

function selecionarDia(dia, elemento) {
  diaSelecionado = dia;
  document
    .querySelectorAll(".calendar-day")
    .forEach((d) => d.classList.remove("selected"));
  elemento.classList.add("selected");

  const mesNome = meses[dataAtual.getMonth()];
  document.getElementById("dia-selecionado-label").innerText =
    `Dia ${dia} de ${mesNome}`;

  const horariosCol = document.getElementById("horarios-col");
  horariosCol.classList.add("show");

  const slotsContainer = document.getElementById("slots-horarios");
  slotsContainer.innerHTML = "";
  horarioSelecionado = null;
  document.getElementById("btn-finalizar").style.display = "none";

  const listaHorarios = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  listaHorarios.forEach((hora) => {
    const btnHora = document.createElement("button");
    btnHora.classList.add("hora-slot");
    btnHora.innerText = hora;
    btnHora.onclick = () => {
      document
        .querySelectorAll(".hora-slot")
        .forEach((b) => b.classList.remove("selected"));
      btnHora.classList.add("selected");
      horarioSelecionado = hora;
      document.getElementById("btn-finalizar").style.display = "block";
    };
    slotsContainer.appendChild(btnHora);
  });
}

function finalizarAgendamento() {
  if (diaSelecionado && horarioSelecionado) {
    const mesNome = meses[dataAtual.getMonth()];
    alert(
      `🎉 Reservado com sucesso!\n📅 Data: ${diaSelecionado} de ${mesNome}\n⏰ Horário: ${horarioSelecionado}\n\nTe esperamos na barbearia!`,
    );
    fecharCalendario();
  }
}
