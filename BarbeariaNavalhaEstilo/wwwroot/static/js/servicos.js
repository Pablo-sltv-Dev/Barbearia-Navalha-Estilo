function abrirAba(nomeAba) {
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));

  document.getElementById(nomeAba).classList.add("active");
  event.currentTarget.classList.add("active");
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get("categoria");
  if (cat) {
    const btn = Array.from(document.querySelectorAll(".tab-btn")).find((b) =>
      b.getAttribute("onclick").includes(cat),
    );
    if (btn) btn.click();
  }
};

function iniciarAgendamento(servico, valor) {
  document.getElementById("box-pagamento-corte").style.display = "block";
  document.getElementById("titulo-servico-selecionado").innerText =
    `${servico} - R$ ${valor},00`;
  window.scrollTo({
    top: document.getElementById("box-pagamento-corte").offsetTop - 100,
    behavior: "smooth",
  });
}

function confirmarAgendamento(e) {
  e.preventDefault();
  alert(
    "Agendamento Pré-Reservado! Mensagem de validação enviada no WhatsApp. Lembre-se: cancelamentos somente com até 2h de antecedência para devolução do valor.",
  );
}
