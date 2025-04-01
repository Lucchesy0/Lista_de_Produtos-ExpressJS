document.addEventListener('DOMContentLoaded', carregarProdutos);

function carregarProdutos() {
    fetch('/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            const lista = document.getElementById('product-list');
            lista.innerHTML = '';

            if (produtos.length === 0) {
                lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            } else {
                produtos.forEach(produto => {
                    const div = document.createElement('div');
                    div.classList.add('product');
                    div.innerHTML = `
                        <h3>${produto.nome}</h3>
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                        <p>${produto.descricao}</p>
                    `;
                    lista.appendChild(div);
                });
            }
        });
}

function mostrarFormulario() {
    document.getElementById('form-container').style.display = 'block';
}

function fecharFormulario() {
    document.getElementById('form-container').style.display = 'none';
}

function adicionarProduto() {
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    if (nome && preco && descricao) {
        fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, descricao })
        })
        .then(response => response.json())
        .then(() => {
            fecharFormulario();
            carregarProdutos();
        });
    } else {
        alert('Preencha todos os campos!');
    }
}
