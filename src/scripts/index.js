/*
    1. Método para rolagem automática ao clicar no elemento Dúvidas do cabeçalho
    2. Função para mudar o data-theme de "light" para "dark" e vice-versa
    3. Funções para criptografar e descriptografar texto
*/
const scrollToFaq = document.querySelector("#scroll-to-faq");

function scrollTo(id) {
    const target = document.getElementById(id);
    if(target) target.scrollIntoView({ behavior: "smooth" });
};

scrollToFaq.addEventListener("click", () => {
    scrollTo("secao-faq");
});

const toggle = document.querySelector("#toggle-mode");

function mudarTema() {
    let dataTheme = document.documentElement.getAttribute("data-theme"), newTheme;

    newTheme = dataTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
};

document.addEventListener("DOMContentLoaded", () => {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");

        const icon = document.querySelector("#icon-mode").innerText;
        if(icon === "light_mode") {
            document.querySelector("#icon-mode").innerText = "dark_mode";
        } else {
            document.querySelector("#icon-mode").innerText = "light_mode";
        }        
    });
});

toggle.addEventListener("click", mudarTema);

const botaoCriptografar = document.querySelector("#btn-criptografar");
const botaoDescriptografar = document.querySelector("#btn-descriptografar");
const botaoLimpar = document.querySelector("#btn-limpar");
const botaoCopiar = document.querySelector("#btn-copiar");
const mostrarTexto = document.querySelector("#texto-decodificado");
const mensagemAviso = document.querySelector("#texto-aviso");
const svgAviso = document.querySelector(".svg__aviso path");
const areaDoTexto = document.querySelector("#area-do-texto");

let textoResultado;

const arrayVogais = [
    { vogal: "e", replace: "enter" },
    { vogal: "i", replace: "imes" },
    { vogal: "a", replace: "ai" },
    { vogal: "o", replace: "ober" },
    { vogal: "u", replace: "ufat" },
];

function editarMensagemAviso(texto, tamanho, cor) {
    mensagemAviso.innerText = texto;
    mensagemAviso.style.fontSize = tamanho;
    mensagemAviso.style.color = cor;
    svgAviso.style.fill = cor;
};

function mostrarMensagemAviso(mensagem) {
    editarMensagemAviso(mensagem, "1.1rem", "#D04848");

    setTimeout(() => {
        editarMensagemAviso("Apenas letras minúsculas e sem acento.", ".9rem", "#343A40");
    }, 3000);
};

function textoDecodificado(textoAlterado) {
    mostrarTexto.innerHTML = "";
    mostrarTexto.innerHTML += `
    <div class="conteudo__texto__decodificado__resultado" id="secao-resultado">
        <p class="conteudo__texto__decodificado__resultado__texto" id="texto-resultado">
            ${textoAlterado}
        </p>
        <button class="conteudo__texto__decodificado__resultado__copiar" id="btn-copiar">
            <span class="material-symbols-outlined">
                copy_all
            </span>
            Copiar
        </button>
    </div>
    `;

    textoResultado = document.querySelector("#texto-resultado");
};

function copiarTexto() {
    navigator.clipboard.writeText(textoResultado.innerText);
    
    document.querySelector("#texto__copiado").style.display = "block";

    setTimeout(() => {
        document.querySelector("#texto__copiado").style.display = "none";
    }, 1500);
};

function alteraTexto(parametro_de, parametro_para) {
    let texto = areaDoTexto.value, novoTexto = texto;
    const verificaMinusculas = /^[a-z ]+$/;

    if(texto) {
        if(verificaMinusculas.test(texto)) {
            const vogais = arrayVogais.filter((vogal) => {
                return texto.includes(vogal[parametro_de]);
            }); // A constante "vogais" gera um array de objetos
            for (let i = 0; i < vogais.length; i++) {
                const elemento = vogais[i][parametro_de];
                novoTexto = novoTexto.replaceAll(elemento, vogais[i][parametro_para]);
            }
            textoDecodificado(novoTexto);
        } else mostrarMensagemAviso("Existe caracteres inválidos no texto.");
    } else mostrarMensagemAviso("Você precisa inserir um texto.");
};

botaoCriptografar.addEventListener("click", () => {
    alteraTexto("vogal", "replace");
    const larguraTela = window.innerWidth;
    if (larguraTela < 1280) scrollTo("secao-resultado");
});
botaoDescriptografar.addEventListener("click", () => {
    alteraTexto("replace", "vogal");
    const larguraTela = window.innerWidth;
    if (larguraTela < 1280) scrollTo("secao-resultado");
});

areaDoTexto.addEventListener("input", () => {
    if(areaDoTexto.value.length > 0) botaoLimpar.style.display = "block";
    else botaoLimpar.style.display = "none";
});

botaoLimpar.addEventListener("click", () => {
    document.querySelector("#area-do-texto").value = "";
    botaoLimpar.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btn-copiar") copiarTexto();
});