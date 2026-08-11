/* =========================================================
   AQUACEP — SCRIPT.JS
   Projeto Integrador | CEP
========================================================= */


/* =========================================================
   1. MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });


    // Fecha o menu ao clicar em algum link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";
        });

    });

}


/* =========================================================
   2. LED RGB INTERATIVO
========================================================= */

const redRange = document.getElementById("red-range");
const greenRange = document.getElementById("green-range");
const blueRange = document.getElementById("blue-range");

const rgbLight = document.getElementById("rgb-light");
const rgbValue = document.getElementById("rgb-value");


function updateRGB() {

    if (!redRange || !greenRange || !blueRange || !rgbLight) {
        return;
    }


    const red = Number(redRange.value);
    const green = Number(greenRange.value);
    const blue = Number(blueRange.value);


    // Define a cor do LED

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;

    rgbLight.style.background = rgbColor;


    // Cria um brilho proporcional à cor escolhida

    rgbLight.style.boxShadow = `
        0 0 25px rgba(${red}, ${green}, ${blue}, 0.45),
        0 0 70px rgba(${red}, ${green}, ${blue}, 0.25)
    `;


    // Mostra os valores RGB

    if (rgbValue) {
        rgbValue.textContent =
            `RGB(${red}, ${green}, ${blue})`;
    }

}


// Atualiza sempre que algum controle mudar

if (redRange) {
    redRange.addEventListener("input", updateRGB);
}

if (greenRange) {
    greenRange.addEventListener("input", updateRGB);
}

if (blueRange) {
    blueRange.addEventListener("input", updateRGB);
}


// Inicializa o LED

updateRGB();



/* =========================================================
   3. SIMULADOR DE TEMPERATURA
========================================================= */

const temperatureSlider =
    document.getElementById("temperature-slider");

const temperatureNumber =
    document.getElementById("temperature-number");

const simTemperature =
    document.getElementById("sim-temperature");

const statusTitle =
    document.getElementById("status-title");

const statusDescription =
    document.getElementById("status-description");

const statusLed =
    document.getElementById("status-led");

const systemStatus =
    document.getElementById("system-status");

const miniPool =
    document.querySelector(".mini-pool");

const heroTemperature =
    document.getElementById("hero-temperature");


/*
    Atualiza todos os elementos do simulador
    de acordo com a temperatura.
*/

function updateTemperature() {

    if (!temperatureSlider) {
        return;
    }


    const temperature =
        Number(temperatureSlider.value);


    /* -----------------------------------------
       Atualiza números
    ----------------------------------------- */

    if (temperatureNumber) {
        temperatureNumber.textContent =
            `${temperature}°C`;
    }


    if (simTemperature) {
        simTemperature.textContent =
            `${temperature}°C`;
    }


    /* -----------------------------------------
       Atualiza o indicador do Hero
    ----------------------------------------- */

    if (heroTemperature) {
        heroTemperature.textContent =
            `${temperature}°C`;
    }


    /* -----------------------------------------
       TEMPERATURA BAIXA
       15°C até 23°C
    ----------------------------------------- */

    if (temperature <= 23) {

        if (statusTitle) {
            statusTitle.textContent =
                "Temperatura baixa";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A piscina está fria. O sistema deve continuar o aquecimento.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(40, 130, 255)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(40, 130, 255, 0.75)";
        }


        if (systemStatus) {
            systemStatus.className =
                "system-status status-cold";
        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #9eddec, #168bab)";
        }

    }


    /* -----------------------------------------
       TEMPERATURA INTERMEDIÁRIA
       24°C até 28°C
    ----------------------------------------- */

    else if (temperature <= 28) {

        if (statusTitle) {
            statusTitle.textContent =
                "Aquecimento em andamento";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A temperatura está se aproximando da faixa desejada.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(255, 205, 55)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(255, 205, 55, 0.75)";
        }


        if (systemStatus) {
            systemStatus.className =
                "system-status status-warm";
        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #9eddec, #35acc9)";
        }

    }


    /* -----------------------------------------
       TEMPERATURA IDEAL
       Acima de 28°C
    ----------------------------------------- */

    else {

        if (statusTitle) {
            statusTitle.textContent =
                "Temperatura ideal";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A temperatura desejada foi alcançada. O aquecimento pode ser reduzido ou interrompido.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(255, 75, 85)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(255, 75, 85, 0.75)";
        }


        if (systemStatus) {
            systemStatus.className =
                "system-status status-hot";
        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #66c8df, #35acc9)";
        }

    }

}


/* Atualiza o simulador enquanto o usuário arrasta */

if (temperatureSlider) {

    temperatureSlider.addEventListener(
        "input",
        updateTemperature
    );

}


/* Inicializa o simulador */

updateTemperature();



/* =========================================================
   4. EFEITO DE APARECER AO ROLAR A PÁGINA
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".info-card, .optic-card, .impact-card, .step, .flow-node"
    );


/*
    Verifica se o navegador suporta
    IntersectionObserver.
*/

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-on-scroll"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(element => {

        element.classList.add(
            "before-scroll"
        );

        observer.observe(element);

    });

}


/* =========================================================
   5. ANIMAÇÃO SUAVE DOS LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});



/* =========================================================
   6. EFEITO DO HEADER AO ROLAR
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }


    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(22, 56, 77, 0.08)";

    } else {

        header.style.boxShadow =
            "none";

    }

});



/* =========================================================
   7. SISTEMA DE CORES DO LED RGB
========================================================= */

/*
    Esta função permite testar rapidamente
    algumas cores relacionadas ao projeto.
*/

function setLEDColor(red, green, blue) {

    if (!rgbLight) {
        return;
    }


    if (redRange) {
        redRange.value = red;
    }


    if (greenRange) {
        greenRange.value = green;
    }


    if (blueRange) {
        blueRange.value = blue;
    }


    updateRGB();

}


/*
    Estado inicial:
    vermelho = sistema em temperatura ideal.
*/

setLEDColor(255, 0, 0);



/* =========================================================
   8. ATUALIZAÇÃO AUTOMÁTICA DO LED DO SIMULADOR
========================================================= */

/*
    O LED do simulador utiliza três estados:

    🔵 Azul → temperatura baixa
    🟡 Amarelo → aquecimento
    🔴 Vermelho → temperatura ideal
*/

function updateStatusLED(temperature) {

    if (!statusLed) {
        return;
    }


    if (temperature <= 23) {

        statusLed.style.background =
            "rgb(40, 130, 255)";

    }

    else if (temperature <= 28) {

        statusLed.style.background =
            "rgb(255, 205, 55)";

    }

    else {

        statusLed.style.background =
            "rgb(255, 75, 85)";

    }

}


/* =========================================================
   9. INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateRGB();
    updateTemperature();

});


console.log(
    "🌊 AquaCEP iniciado com sucesso!"
);
