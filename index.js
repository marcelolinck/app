const {select} = require('@inquirer/prompts')


const start = async() => {

 
  while (true) {
    const opcao =  await select({ //Aguardando a escolha
      message: 'Menu >',
      choices:[
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Sair",
          value: "sair"
        },
      ]
    })


    switch (opcao) { //A montagem do switch case é dessa forma
      case "cadastrar":
        console.log("vamos cadastrar");
        break;
      case "Listar":
        console.log("vamos listar");
        break;
      case "sair":
        console.log("vamos sair");
        return;
    }
  }
};

start();
