const {select, input} = require('@inquirer/prompts')



let meta = {
  value: 'Tomar 3l de água por dia',
  checked: false,
}

let metas = [ meta ]


const cadastrarMeta = async() =>{
  const meta = await input({message: "Digite a meta: "})

  if (meta.length == 0) {
    console.log('A meta nao pode ser vazia')
    return
    
  }
  metas.push({
    value: meta, 
    checked: false
  })

}

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
        await cadastrarMeta();
        console.log(metas);
        break;
      case "Listar":
        console.log("vamos listar");
        console.log(metas);
        break;
      case "sair":
        console.log("vamos sair");
        return;
    }
  }
};

start();
