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