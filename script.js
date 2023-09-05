function Produto(id, nome, img, quantidade, valor) {
    this.id = id;
    this.nome = nome;
    this.img = img;
    this.quantidade = quantidade;
    this.valor = valor;
}

const produto1 = new Produto(0, "Hambúrguer 1", "Images/Hambúrguer-1.jpg", 0, 20);
const produto2 = new Produto(1, 'Hambúrguer 2', 'Images/Hambúrguer-2.jpg', 0, 15);
const produto3 = new Produto(2, 'Hambúrguer 3', 'Images/Hambúrguer-3.jpeg', 0, 32);
const produto4 = new Produto(3, 'Combo', 'Images/Combo.jpg', 0, 65);
const produto5 = new Produto(4, 'Hambúrguer 4', 'Images/Hambúrguer-4.jpeg', 0, 30);
const produto6 = new Produto(5, 'Hambúrguer 5', 'Images/Hambúrguer-5.jpg', 0, 27);
const produto7 = new Produto(6, 'Porção de Fritas P', 'Images/Fritas.jpg', 0, 7);
const produto8 = new Produto(7, 'Coca-Cola 2L', 'Images/Refrigerante.jpg', 0, 10);

const items = [produto1, produto2, produto3, produto4, produto5, produto6, produto7, produto8]
const containerLoja = document.querySelector('.container');
loja = () => {
    items.map((value) => {
        containerLoja.innerHTML += `
                    <div class="box boxCatalogo">
                    <img src="${value.img}" class="image">
                    <div class="text">
                        <h2>${value.nome}</h2>
                        <p>R$ ${value.valor},00</p>
                        Quantidade:<input type="text" class="quantidade">
                        <br>
                        <button key="${value.id}" class="btnCarrinho" >Adicionar ao Carrinho</button>
                    </div>
                </div>`
    })
}

pegarItensSalvos = (id) => {
    let listaProdutos = [];
    if (localStorage.produtos) {
        console.log(localStorage.produtos);
        let storageJSON = JSON.parse(localStorage.produtos);
        for (let x = 0; x < storageJSON.length; x++) {
            console.log(storageJSON[x]);
            listaProdutos.push(storageJSON[x]);
        }
    }
    listaProdutos.push(items[id]);

    console.log(listaProdutos)
    let listaProdutosJSON = JSON.stringify(listaProdutos);
    localStorage.setItem('produtos', listaProdutosJSON);

}

containerLoja.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnCarrinho') === false) return;
    let el = e.target;

    let produtoSelecionado = el.parentElement;

    let inputQnt = produtoSelecionado.querySelector('.quantidade');

    let quantidadeP = inputQnt.value;

    let key = el.getAttribute('key');

    console.log(items)
    items[key].quantidade = Number(quantidadeP);
    console.log(items[key])

    pegarItensSalvos(key);
        window.location.href = "http://127.0.0.1:5500/carrinho.html";
})

loja();