/*
1. Método para rolagem automática ao clicar no elemento Dúvidas do cabeçalho
2. Função para mudar o data-theme de "light" para "dark" e vice-versa
3. Funções para criptografar e descriptografar texto
*/

const scrollToFaq = document.querySelector("#scroll-to-faq");

scrollToFaq.addEventListener("click", () => {
    const target = document.getElementById("secao-faq");
    if(target) target.scrollIntoView({ behavior: "smooth" });
});

const toggle = document.querySelector("#toggle-mode");

function switchTheme() {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;

    newTheme = dataTheme === "light" ? "dark" : "light";

    rootElem.setAttribute("data-theme", newTheme);
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

toggle.addEventListener("click", switchTheme);

const botaoCriptografar = document.querySelector("#btn-criptografar");
const botaoDescriptografar = document.querySelector("#btn-descriptografar");
const botaoCopiar = document.querySelector("#btn-copiar");
const mostrarTexto = document.querySelector("#texto-decodificado");
let textoResultado;

const arrayVogais = [
    {
        vogal: "a",
        replace: "ai"
    },
    {
        vogal: "e",
        replace: "enter"
    },
    {
        vogal: "i",
        replace: "imes"
    },
    {
        vogal: "o",
        replace: "ober"
    },
    {
        vogal: "u",
        replace: "ufat"
    },
];

function textoDecodificado(textoAlterado) {
    mostrarTexto.innerHTML = "";
    mostrarTexto.innerHTML += `
    <div class="conteudo__texto__decodificado__resultado">
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
};

function alteraTexto(parametro_de, parametro_para) {
    let texto = document.querySelector("#area-do-texto").value;
    const verificaMinusculas = /^[a-z]+$/;

    if(texto) {
        if(verificaMinusculas.test(texto)) {
            const vogais = arrayVogais.filter((vogal) => {
                return texto.includes(vogal[parametro_de]);
            }) // A constante "vogais" gera um array de objetos
            for (let i = 0; i < vogais.length; i++) {
                const elemento = vogais[i][parametro_de];
                texto = texto.replaceAll(elemento, vogais[i][parametro_para]);
            }
            textoDecodificado(texto)
        } else console.log("texto inválido"); // MOSTRAR AVISO NA TELA QUE O TEXTO POSSUI CARACTERES INVÁLIDOS
    } else console.log("campo de texto vazio!"); // MOSTRAR AVISO QUE A CAIXA DE TEXTO ESTÁ VAZIA
};

botaoCriptografar.addEventListener("click", () => {
    alteraTexto("vogal", "replace");
});
botaoDescriptografar.addEventListener("click", () => {
    alteraTexto("replace", "vogal");
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btn-copiar") {
        copiarTexto();
    }
});