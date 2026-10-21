
const URL_API = "https://fakestoreapi.com/products";

async function buscarProduto() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  if (!id || !/^[1-9]\d*$/.test(id)) {
    exibirMensagem("ID do produto inválido ou não informado.");
    return;
  }

  try {
    const resposta = await fetch(`${URL_API}/${id}`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const produto = await resposta.json();

    if (!produto || !produto.id) {
      exibirMensagem("Produto não encontrado.");
      return;
    }

    exibirDetalhesProduto(produto);
  } catch (error) {
    exibirMensagem(
      "Erro ao carregar os detalhes do produto. Tente novamente mais tarde."
    );

    console.error("Erro ao buscar produto:", error);
  }
}

function exibirDetalhesProduto(produto) {
  const containerDetalhe =
    document.getElementById("detalhe-produto");

  containerDetalhe.replaceChildren();

  const imagem = document.createElement("img");
  imagem.classList.add("detalhe-imagem");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const informacoes = document.createElement("div");
  informacoes.classList.add("detalhe-informacoes");

  const categoria = document.createElement("p");
  categoria.classList.add("detalhe-categoria");
  categoria.textContent = produto.category;

  const titulo = document.createElement("h2");
  titulo.classList.add("detalhe-titulo");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.classList.add("detalhe-preco");
  preco.textContent = produto.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  const descricaoTitulo = document.createElement("h3");
  descricaoTitulo.classList.add("detalhe-subtitulo");
  descricaoTitulo.textContent = "Descrição";

  const descricao = document.createElement("p");
  descricao.classList.add("detalhe-descricao");
  descricao.textContent = produto.description;

  const avaliacao = document.createElement("p");
  avaliacao.classList.add("detalhe-avaliacao");

  if (produto.rating) {
    avaliacao.textContent =
      `★ ${produto.rating.rate} de 5 ` +
      `(${produto.rating.count} avaliações)`;
  } else {
    avaliacao.textContent = "Avaliação indisponível.";
  }

  const botao = document.createElement("button");
  botao.classList.add("botao-carrinho");
  botao.textContent = "Adicionar ao carrinho";

  botao.addEventListener("click", function () {
    adicionarAoCarrinho(produto);
  });

  informacoes.append(
    categoria,
    titulo,
    preco,
    descricaoTitulo,
    descricao,
    avaliacao,
    botao
  );

  containerDetalhe.append(imagem, informacoes);

  document.title = `${produto.title} - Minha Loja`;
}

function exibirMensagem(mensagem) {
  const containerDetalhe =
    document.getElementById("detalhe-produto");

  containerDetalhe.replaceChildren();

  const paragrafo = document.createElement("p");
  paragrafo.textContent = mensagem;

  containerDetalhe.appendChild(paragrafo);
}

let quantidadeCarrinho = 0;

function adicionarAoCarrinho(produto) {
  quantidadeCarrinho++;

  const contador =
    document.getElementById("quantidade-carrinho");

  contador.textContent = quantidadeCarrinho;

  console.log("Produto adicionado:", produto.title);
}

buscarProduto();
