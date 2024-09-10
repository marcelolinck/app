//Arrays, objetos

let metas = ["Marcelo", "Aloo"] //Array

//isso é  um objeto
let meta = {
    value: 'Ler um livro por mes',
    checked: false,
    address: 2,

    //Agora estando aqui dentro se trata de um metodo
    log: (info) =>{
        console.log(info)
    }
}
//console.log(metas[0])
//console.log(meta.value)
meta.log(meta.value)

//metodo está dentro de um objeto agora funcao fica fora

//Function //Arrow Function
//const criarMeta = () => {}

//Pode se usar dessa forma tbm
//function criarMeta() {}