function checarLeituraTermos() {
  const box = document.getElementById("terms-box");
  if (box.scrollTop + box.clientHeight >= box.scrollHeight - 5) {
    document.getElementById("aceite-termos").disabled = false;
  }
}

function verificarClienteExistente() {
  const cpf = document.getElementById("cpf").value;
  const phone = document.getElementById("whatsapp").value;

  const clientesSalvos = JSON.parse(
    localStorage.getItem("clientesNavalha") || "[]",
  );
  const encontrado = clientesSalvos.find(
    (c) => c.cpf === cpf || c.phone === phone,
  );

  if (encontrado) {
    document.getElementById("nome").value = encontrado.nome;
    document.getElementById("email").value = encontrado.email;
    document.getElementById("whatsapp").value = encontrado.phone;
    document.getElementById("secao-termos").style.display = "none";
    document.getElementById("aceite-termos").required = false;
  }
}

function salvarCadastro(event) {
  event.preventDefault();
  const cliente = {
    cpf: document.getElementById("cpf").value,
    nome: document.getElementById("nome").value,
    phone: document.getElementById("whatsapp").value,
    email: document.getElementById("email").value,
  };

  let clientes = JSON.parse(localStorage.getItem("clientesNavalha") || "[]");
  clientes.push(cliente);
  localStorage.setItem("clientesNavalha", JSON.stringify(clientes));

  alert(
    "Cadastro efetuado com sucesso! Confirmação enviada de guilhermesilvacredito@gmail.com para " +
      cliente.email,
  );

  document.getElementById("cadastro-container").style.display = "none";
  document.getElementById("feed-planos").style.display = "block";
}

function selecionarPlano(nome, valor) {
  document.getElementById("checkout-container").style.display = "block";
  document.getElementById("plano-selecionado-titulo").innerText =
    `Assinar ${nome} - R$ ${valor}/mês`;
}
