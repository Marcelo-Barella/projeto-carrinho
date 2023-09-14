const produtos = localStorage.getItem('produtos');
const listaProdutos = JSON.parse(produtos);

const items = [...listaProdutos];

const containerCarrinho = document.querySelector('.container');
const pagamentoCarrinho1 = document.querySelector('.pagamento');

let valorProduto = 0;
let descontoValor = 0;
carrinho = () => {
    items.forEach((value) => {
        valorProduto = value.valor * value.quantidade;
        containerCarrinho.innerHTML += `
                <div key="${value.id}" class="box">
                <button class="remove">X</button>
                <img src="${value.img}" class="image">
                <div  class="text">
                    <h2>${value.nome}</h2>
                    <p class="valorUnitario ">Valor unitário: R$ ${value.valor},00</p>
                    <p class="valorTotal">Valor total do produto: R$ ${valorProduto}</p>
                    Quantidade:<input type="text" key="${value.id}" value="${value.quantidade}" class="quantidade">
                    <br>
                </div>
            </div>`;
        let total = + valorProduto;

        pagamentoText(total);
    })
    if (items.length <= 0) {
        containerCarrinho.innerHTML = `
            <h1>Carrinho Vazio</h1>
            `;
        pagamentoCarrinho1.innerHTML = `<h1>Volte ao Catálogo e Adicione Mais Itens</h1>`
        pagamentoCarrinho2.innerHTML = ``
        document.querySelector('.clear').innerHTML = '';
        document.querySelector('.clear').style.background = 'white';
        return;
    }
}

calcularTotal = () => {
    let total = 0;
    items.map((value) => {
        valorProduto = value.valor * value.quantidade;
        total = total + valorProduto;
    })
    return total;
}

const inputDesconto = pagamentoCarrinho1.querySelector('.cupom');
const pagamentoCarrinho2 = pagamentoCarrinho1.querySelector('#pagamento');

document.addEventListener('click', function (e) {
    let el = e.target;

    let produtoSelecionado = el.parentElement;

    let key = produtoSelecionado.getAttribute('key');
    if (e.target.classList.contains('quantidade')) {

        let inputQnt = produtoSelecionado.querySelector('.quantidade');

        let quantidadeP = inputQnt.value;

        let valorProduto = 0;

        items.map((value) => {
            if (value.id == key) {
                value.quantidade = Number(quantidadeP);
                valorProduto = value.valor * value.quantidade;
                pagamentoText();
                produtoSelecionado.querySelector(".valorTotal").innerHTML = `Valor total do produto: R$ ${valorProduto}`;

            }
        });
    }
    else if (e.target.classList.contains('remove')) {
        items.map((value) => {
            if (value.id == key) {
                let x = items.indexOf(value);
                items.splice(x, 1);
                let itemsJSON = JSON.stringify(items);
                localStorage.setItem('produtos', itemsJSON);
            }
        });
        document.location.reload()

    }
    else if (e.target.classList.contains('clear')) {
        localStorage.removeItem('produtos');
        window.location.href = "http://127.0.0.1:5500";


    }
})

pagamentoText = () => {
    inputDesconto.addEventListener('blur', blurEvent = (e) => {

        const pValido = pagamentoCarrinho1.querySelector('.valido');

        let descontoValido = e.target.value === "10presentao" ? true : false;
        if (descontoValido === true) {
            e.target.style.color = 'green';
            pValido.innerHTML = "Cupom Válido!";
            descontoValor = 10;
        }
        else {
            pValido.innerHTML = "Cupom Inválido!";
            e.target.style.color = 'red';
        }
        inserirTextoPagamento(descontoValor);

    });
    inserirTextoPagamento(descontoValor);
}

inserirTextoPagamento = (descontoValor) => {
    let total = calcularTotal();
    let descontoText = ''
    if (descontoValor !== 0) descontoText = `Desconto: R$ ${descontoValor}`;
    console.log(descontoText)
    pagamentoCarrinho2.innerHTML = `
    <br>
    <h3 class="valorCarrinho">Valor Carrinho: R$ ${total},00</h3>
    <h3 class="desconto">${descontoText}</h3>
    <h1 class="valorTotal">Valor Total: R$ ${total - descontoValor},00</h1>

    <button class="concluir-pagamento">Concluir Pagamento</button>
    `;

}

pagamentoCarrinho1.addEventListener('click', function (e) {
    console.log(e.target.classList)
    if (e.target.classList.contains('concluir-pagamento') === false) return;
    alert('Pedido confirmado!');
    window.location.href = 'http://127.0.0.1:5500';
})


carrinho();