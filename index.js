const start = () => {
  while (true) {
    let opcao = "sair";
    switch (opcao) { //A montagem do switch case é dessa forma
      case "cadastrar":
        console.log("vamos cadastrar");
        break;
      case "Listar":
        console.log("vamos listar");
        break;
        case "sair":
            console.log("Sair")
            break
    }
  }
};

start();
