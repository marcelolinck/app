
//Eu tenho esse objeto e vou injetar abaixo dentro de um array com outro objeto existente
let meta = {
    value: 'Ler um livro por mes',
    checked: false,
}

let metas = [
    meta, //Objeto anterior pos 0
    {   //Novo objeto pos 1
        value: "Caminhar 20 minutos todos os dias",
        checked: false,
    }
] 

console.log(metas[1].value)