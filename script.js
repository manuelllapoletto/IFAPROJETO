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

        const aberto = navLinks.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );
    });


    // Fecha o menu quando clicar em um link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });

}


/* =========================================================
   2. ANIMAÇÕES AO ROLAR
========================================================= */

const elementosAnimados =
    document.querySelectorAll(".before-scroll");


if (elementosAnimados.length > 0) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-on-scroll"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

}


/* =========================================================
   3. LED RGB
========================================================= */

const redSlider =
    document.getElementById("red");

const greenSlider =
    document.getElementById("green");

const blueSlider =
    document.getElementById("blue");

const rgbLight =
    document.querySelector(".rgb-light");

const rgbCore =
    document.querySelector(".rgb-core");

const rgbValue =
    document.getElementById("rgb-value");


function atualizarLED() {

    // Se os controles não existirem, não faz nada
    if (
        !redSlider ||
        !greenSlider ||
        !blueSlider
    ) {
        return;
    }


    const r = Number(redSlider.value);
    const g = Number(greenSlider.value);
    const b = Number(blueSlider.value);


    const rgb =
        `rgb(${r}, ${g}, ${b})`;


    const brilho =
        Math.max(r, g, b);


    /*
        Intensidade proporcional do brilho.
    */

    const intensidade =
        0.25 + (brilho / 255) * 0.75;


    if (rgbLight) {

        rgbLight.style.setProperty(
            "--rgb-color",
            rgb
        );


        rgbLight.style.setProperty(
            "background-color",
            rgb,
            "important"
        );


        rgbLight.style.setProperty(
            "background",
            rgb,
            "important"
        );


        rgbLight.style.setProperty(
            "box-shadow",
            `
                0 0 25px rgba(${r}, ${g}, ${b}, ${intensidade}),
                0 0 70px rgba(${r}, ${g}, ${b}, ${intensidade * 0.65})
            `,
            "important"
        );

    }


    if (rgbCore) {

        rgbCore.style.setProperty(
            "background-color",
            rgb,
            "important"
        );


        rgbCore.style.setProperty(
            "background",
            rgb,
            "important"
        );


        rgbCore.style.setProperty(
            "box-shadow",
            `0 0 20px ${rgb}`,
            "important"
        );

    }


    if (rgbValue) {

        rgbValue.textContent =
            `RGB: (${r}, ${g}, ${b})`;

    }

}


/*
    Atualiza enquanto o usuário
    movimenta cada controle.
*/

[
    redSlider,
    greenSlider,
    blueSlider
].forEach(slider => {

    if (slider) {

        slider.addEventListener(
            "input",
            atualizarLED
        );

    }

});


/*
    Inicializa o LED com os valores
    que já estão no HTML.
*/

atualizarLED();


/* =========================================================
   4. SIMULADOR DE TEMPERATURA
========================================================= */

const temperatureSlider =
    document.getElementById(
        "temperature-slider"
    );


const temperatureValue =
    document.querySelector(
        ".temperature-display strong"
    );


const poolTemperature =
    document.querySelector(
        ".pool-temperature"
    );


const miniPool =
    document.querySelector(
        ".mini-pool"
    );


const systemStatus =
    document.querySelector(
        ".system-status"
    );


const statusLed =
    document.querySelector(
        ".status-led"
    );


const statusTitle =
    document.querySelector(
        ".status-content strong"
    );


const statusDescription =
    document.querySelector(
        ".status-content p"
    );


function atualizarTemperatura() {

    if (!temperatureSlider) {
        return;
    }


    const temperatura =
        Number(temperatureSlider.value);


    /*
        Atualiza os números da interface.
    */

    if (temperatureValue) {

        temperatureValue.textContent =
            `${temperatura}°C`;

    }


    if (poolTemperature) {

        poolTemperature.textContent =
            `${temperatura}°C`;

    }


    /*
        Remove os estados anteriores.
    */

    if (systemStatus) {

        systemStatus.classList.remove(
            "status-cold",
            "status-warm",
            "status-hot"
        );

    }


    /*
        TEMPERATURA BAIXA
    */

    if (temperatura < 25) {

        if (systemStatus) {
            systemStatus.classList.add(
                "status-cold"
            );
        }


        if (statusTitle) {
            statusTitle.textContent =
                "Aquecimento necessário";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A temperatura está baixa. O sistema deve ativar o aquecimento.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(40, 130, 255)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(40, 130, 255, 0.7)";

        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #9eddec, #168bab)";

        }

    }


    /*
        TEMPERATURA ADEQUADA
    */

    else if (temperatura < 30) {

        if (systemStatus) {
            systemStatus.classList.add(
                "status-warm"
            );
        }


        if (statusTitle) {
            statusTitle.textContent =
                "Temperatura adequada";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A piscina está em uma faixa confortável. O sistema pode reduzir o aquecimento.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(255, 205, 55)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(255, 205, 55, 0.7)";

        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #c8edf7, #35acc9)";

        }

    }


    /*
        TEMPERATURA ALTA
    */

    else {

        if (systemStatus) {
            systemStatus.classList.add(
                "status-hot"
            );
        }


        if (statusTitle) {
            statusTitle.textContent =
                "Temperatura elevada";
        }


        if (statusDescription) {
            statusDescription.textContent =
                "A temperatura está alta. O sistema deve interromper o aquecimento.";
        }


        if (statusLed) {

            statusLed.style.background =
                "rgb(255, 75, 85)";

            statusLed.style.boxShadow =
                "0 0 18px rgba(255, 75, 85, 0.7)";

        }


        if (miniPool) {

            miniPool.style.background =
                "linear-gradient(135deg, #ffdc68, #f7c948)";

        }

    }

}


if (temperatureSlider) {

    temperatureSlider.addEventListener(
        "input",
        atualizarTemperatura
    );


    /*
        Inicializa o simulador.
    */

    atualizarTemperatura();

}


/* =========================================================
   5. BOTÃO "TESTAR SISTEMA"
========================================================= */

const testButton =
    document.getElementById("test-system");


if (testButton) {

    testButton.addEventListener(
        "click",
        () => {

            /*
                Pequena animação visual
                para indicar que o teste iniciou.
            */

            testButton.disabled = true;

            const textoOriginal =
                testButton.innerHTML;

            testButton.innerHTML =
                "⏳ Testando sistema...";


            /*
                Simula o processamento
                do sistema.
            */

            setTimeout(() => {

                testButton.innerHTML =
                    "✓ Sistema funcionando!";


                /*
                    Depois de alguns segundos,
                    volta ao texto original.
                */

                setTimeout(() => {

                    testButton.innerHTML =
                        textoOriginal;

                    testButton.disabled =
                        false;

                }, 2000);

            }, 1200);

        }
    );

}


/* =========================================================
   6. FEEDBACK DE HOVER NOS NÓS DO FLUXOGRAMA
========================================================= */

const flowNodes =
    document.querySelectorAll(".flow-node");


flowNodes.forEach(node => {

    node.addEventListener(
        "mouseenter",
        () => {

            node.style.zIndex = "5";

        }
    );


    node.addEventListener(
        "mouseleave",
        () => {

            node.style.zIndex = "";

        }
    );

});


/* =========================================================
   7. ATUALIZAÇÃO AUTOMÁTICA DO LED RGB
      DE ACORDO COM A TEMPERATURA
========================================================= */

function sincronizarLedComTemperatura() {

    if (
        !temperatureSlider ||
        !redSlider ||
        !greenSlider ||
        !blueSlider
    ) {
        return;
    }


    const temperatura =
        Number(temperatureSlider.value);


    /*
        Não altera os controles automaticamente.
        Apenas atualiza o LED se houver um
        modo de demonstração específico.

        O usuário continua podendo controlar
        o RGB manualmente.
    */

}


/* =========================================================
   8. INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarLED();

        atualizarTemperatura();

    }
);
