const { select, input, checkbox } = require("@inquirer/prompts");

const fs = require("fs").promises



let mensagem = 'Bem vindo ao App de Metas';

let metas

const carregarMetas = async()=>{
  try {
    const dados = await fs.readFile("metas.json", "utf-8") //Para carregar o json para o app
    metas = JSON.parse(dados)
    
  } catch (erro){
    
    metas = []
  }
}

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null,2)) //Para gravar as metas, eu preciso converter o array em json dessa forma
}

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    mensagem = "A meta nao pode ser vazia";
    return;
  }
  metas.push({
    value: meta,
    checked: false,
  });

  mensagem = 'Meta cadastrada com sucesso!';
};

const listarMetas = async () => {

  if (metas.length == 0) {
    mensagem = "Não existem metas!"
    return   
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço pra desmarcar ou marcar e o Enter para finalizar a etapa",

    //Tem que ser um array
    choices: [...metas], //operador spread
    instructions: false,
  });

  metas.forEach((m) => {
    //Essa logica é para percorrer a lista e deixar desmarcado o que está desmarcada
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada!";
    return;
  }

  respostas.forEach((resposta) => {
    //Nesse ponto ira percorrer a lista de opcoes e irá marcar somente o que foi selecionado como true
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  mensagem = "Meta(s) concluida(s) com sucesso";
};

const metasRealizadas = async () => {

  if (metas.length == 0) {
    mensagem = "Não existem metas!"
    return   
  }

  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas! :(";
    return;
  }

  await select({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas], ///spread operator para adicoonar a lista original dentro de choices
  });
};
const metasAbertas = async () => {

  if (metas.length == 0) {
    mensagem = "Não existem metas!"
    return   
  }

  const abertas = metas.filter((meta) => {
    // return !meta.checked;
    return meta.checked != true;
  });

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas! :)";
    return;
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas], ///spread operator para adicoonar a lista original dentro de choices
  });
};
const deletarMetas = async () => {

  if (metas.length == 0) {
    mensagem = "Não existem metas!"
    return   
  }

  const metasDesmarcadas = metas.map((meta)=>{ // nesse caso irá criar um novo array para que nào apresente falha ao carregar a lista de meta
    return {value: meta.value, checked: false}
  })

  const itensADeletar = await checkbox({
    message:
      "Selecione item para deletar",

    //Tem que ser um array
    choices: [...metasDesmarcadas], //operador spread para carregar as metas cadastradas, mas todas desmarcadas
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    mensagem = 'Nenhum item para deletar!'
    return
    
  }

  ///Logica para deletar
  itensADeletar.forEach((item)=>{

    metas = metas.filter((meta)=>{ //Ira permanecer na lista somente os itens que foram diferentes do item deletado
      return meta.value != item
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"


  })

};

const mostrarMensagem = () =>{
  console.clear();

  if (mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
    
  }

}
const start = async () => {
  await carregarMetas() //somente para carregar as metas
  
  while (true) {
    mostrarMensagem()
    await salvarMetas()

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
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Excluir metas",
          value: "excluir",
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
        //console.log(metas);
        break;
      case "listar":
        await listarMetas();
        
        //console.log(metas);
        break;
      case "realizadas":
        await metasRealizadas();
        // console.log(metas);
        break;
      case "abertas":
        await metasAbertas();
        // console.log(metas);
        break;
      case "excluir":
        await deletarMetas();
        // console.log(metas);
        break;
      case "sair":
        mensagem = "Saindo, até mais!";
        return;
    }
  }
};

start();
