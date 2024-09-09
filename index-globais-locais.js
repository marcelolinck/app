//Hello world

//Escopo global pois está disponivel para toda a aplicacao
const mensagem = "Olá eu";

{
    //escopo local, pois executa somente aqui
    const mensagem = "Olá, mundo" //Uma const nao muda o valor/tipo
    console.log(mensagem)
}
console.log(mensagem)