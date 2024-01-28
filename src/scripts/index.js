// Scroll to...
const scrollToFaq = document.querySelector("#scroll-to-faq");

scrollToFaq.addEventListener("click", () => {
    const target = document.getElementById("secao-faq");
    if(target) target.scrollIntoView({ behavior: "smooth" });
});

// Toggle
const toggle = document.querySelector("#toggle-mode");

const switchTheme = () => {
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

// Criptografar e Descriptografar
const botaoCriptografar = document.querySelector("#btn-criptografar");
const botaoDescriptografar = document.querySelector("#btn-descriptografar");

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
                const regex = new RegExp(elemento, "g");
                texto = texto.replace(regex, vogais[i][parametro_para]);
            }
            // MOSTRAR RESULTADO NA TELA
            console.log(texto);
        } else console.log("texto inválido"); // MOSTRAR AVISO NA TELA QUE O TEXTO POSSUI CARACTERES INVÁLIDOS
    } else console.log("campo de texto vazio!"); // MOSTRAR QUE A CAIXA DE TEXTO ESTÁ VAZIA
}

botaoCriptografar.addEventListener("click", () => {
    alteraTexto("vogal", "replace");
});
botaoDescriptografar.addEventListener("click", () => {
    alteraTexto("replace", "vogal");
});