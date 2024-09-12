const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "Tomar 3l de água por dia",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    console.log("A meta nao pode ser vazia");
    return;
  }
  metas.push({
    value: meta,
    checked: false,
  });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço pra desmarcar ou marcar e o Enter para finalizar a etapa",

    //Tem que ser um array
    choices: [...metas], //operador spread
    instructions: false,
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada!");
    return;
  }

  metas.forEach((m) => { //Essa logica é para percorrer a lista e deixar desmarcado o que está desmarcada
    m.checked = false
  });

  respostas.forEach((resposta) => {
    //Nesse ponto ira percorrer a lista de opcoes e irá marcar somente o que foi selecionado como true
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  console.log("Meta(s concluida(s)");
};

const start = async () => {
  while (true) {
    const opcao = await select({
      //Aguardando a escolha
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (
      opcao //A montagem do switch case é dessa forma
    ) {
      case "cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "listar":
        await listarMetas();
        console.log(metas);
        break;
      case "sair":
        console.log("vamos sair");
        return;
    }
  }
};

start();
