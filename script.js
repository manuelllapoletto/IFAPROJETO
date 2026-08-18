/* =========================================================
   AQUACEP — SCRIPT.JS
   Projeto Integrador | CEP
========================================================= */


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const redRange = document.getElementById("red-range");
    const greenRange = document.getElementById("green-range");
    const blueRange = document.getElementById("blue-range");

    const rgbLight = document.getElementById("rgb-light");
    const rgbCore = document.querySelector(".rgb-core");
    const rgbValue = document.getElementById("rgb-value");

    const temperatureSlider =
        document.getElementById("temperature-slider");

    const temperatureNumber =
        document.getElementById("temperature-number");

    const simTemperature =
        document.getElementById("sim-temperature");

    const systemStatus =
        document.getElementById("system-status");

    const statusLed =
        document.getElementById("status-led");

    const statusTitle =
        document.getElementById("status-title");

    const statusDescription =
        document.getElementById("status-description");

    const heroTemperature =
        document.getElementById("hero-temperature");

    const miniPool =
        document.querySelector(".mini-pool");

    const statusDot =
        document.querySelector(".status-dot");


    /* =====================================================
       1. MENU MOBILE
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        /* Fechar menu ao clicar em um link */

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================================
       2. LED RGB
    ===================================================== */

    function updateRGB() {

        if (
            !redRange ||
            !greenRange ||
            !blueRange ||
            !rgbLight
        ) {
            return;
        }


        const red =
            Number(redRange.value);

        const green =
            Number(greenRange.value);

        const blue =
            Number(blueRange.value);


        const rgb =
            `rgb(${red}, ${green}, ${blue})`;


        /*
            Intensidade usada para o brilho.
            Evita que o LED fique praticamente
            invisível quando os valores são baixos.
        */

        const glowRed =
            Math.max(red, 30);

        const glowGreen =
            Math.max(green, 30);

        const glowBlue =
            Math.max(blue, 30);


        const shadow =
            `0 0 25px rgba(${glowRed}, ${glowGreen}, ${glowBlue}, 0.45),
             0 0 70px rgba(${glowRed}, ${glowGreen}, ${glowBlue}, 0.25)`;


        /* LED externo */

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
            shadow,
            "important"
        );


        /* Núcleo interno */

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
                `0 0 15px ${rgb}`,
                "important"
            );

        }


        /* Variável usada pelo brilho externo */

        rgbLight.style.setProperty(
            "--rgb-color",
            rgb
        );


        rgbLight.style.setProperty(
            "--rgb-shadow",
            shadow
        );


        /* Texto RGB */

        if (rgbValue) {

            rgbValue.textContent =
                `RGB(${red}, ${green}, ${blue})`;

        }

    }


    /*
        Atualiza o LED enquanto o usuário
        movimenta qualquer controle.
    */

    if (redRange) {
        redRange.addEventListener(
            "input",
            updateRGB
        );
    }

    if (greenRange) {
        greenRange.addEventListener(
            "input",
            updateRGB
        );
    }

    if (blueRange) {
        blueRange.addEventListener(
            "input",
            updateRGB
        );
    }


    /*
        Executa uma vez ao abrir a página
        para o LED começar com os valores
        definidos no HTML.
    */

    updateRGB();


    /* =====================================================
       3. SIMULADOR DE TEMPERATURA
    ===================================================== */

    function updateTemperature() {

        if (!temperatureSlider) {
            return;
        }


        const temperature =
            Number(temperatureSlider.value);


        const temperatureText =
            `${temperature}°C`;


        /*
            Atualiza os números da temperatura
        */

        if (temperatureNumber) {

            temperatureNumber.textContent =
                temperatureText;

        }


        if (simTemperature) {

            simTemperature.textContent =
                temperatureText;

        }


        if (heroTemperature) {

            heroTemperature.textContent =
                temperatureText;

        }


        /* =================================================
           TEMPERATURA BAIXA
           15°C — 22°C
        ================================================= */

        if (temperature <= 22) {

            if (systemStatus) {

                systemStatus.classList.remove(
                    "status-warm",
                    "status-hot"
                );

                systemStatus.classList.add(
                    "status-cold"
                );

            }


            if (statusLed) {

                statusLed.style.background =
                    "rgb(40, 130, 255)";

                statusLed.style.boxShadow =
                    "0 0 18px rgba(40, 130, 255, 0.7)";

            }


            if (statusTitle) {

                statusTitle.textContent =
                    "Aquecimento necessário";

            }


            if (statusDescription) {

                statusDescription.textContent =
                    "A temperatura está baixa. O sistema deve iniciar o aquecimento.";

            }


            /*
                Piscina mais azul quando está fria.
            */

            if (miniPool) {

                miniPool.style.background =
                    "linear-gradient(135deg, #9eddec, #168bab)";

            }

        }


        /* =================================================
           TEMPERATURA IDEAL / INTERMEDIÁRIA
           23°C — 28°C
        ================================================= */

        else if (temperature <= 28) {

            if (systemStatus) {

                systemStatus.classList.remove(
                    "status-cold",
                    "status-hot"
                );

                systemStatus.classList.add(
                    "status-warm"
                );

            }


            if (statusLed) {

                statusLed.style.background =
                    "rgb(255, 205, 55)";

                statusLed.style.boxShadow =
                    "0 0 18px rgba(255, 205, 55, 0.7)";

            }


            if (statusTitle) {

                statusTitle.textContent =
                    "Aquecimento em andamento";

            }


            if (statusDescription) {

                statusDescription.textContent =
                    "A temperatura está se aproximando da faixa desejada.";

            }


            /*
                Piscina assume uma tonalidade
                intermediária.
            */

            if (miniPool) {

                miniPool.style.background =
                    "linear-gradient(135deg, #9eddec, #35acc9)";

            }

        }


        /* =================================================
           TEMPERATURA ALTA
           29°C — 35°C
        ================================================= */

        else {

            if (systemStatus) {

                systemStatus.classList.remove(
                    "status-cold",
                    "status-warm"
                );

                systemStatus.classList.add(
                    "status-hot"
                );

            }


            if (statusLed) {

                statusLed.style.background =
                    "rgb(255, 75, 85)";

                statusLed.style.boxShadow =
                    "0 0 18px rgba(255, 75, 85, 0.7)";

            }


            if (statusTitle) {

                statusTitle.textContent =
                    "Temperatura adequada";

            }


            if (statusDescription) {

                statusDescription.textContent =
                    "A água está quente o suficiente. O aquecimento pode ser interrompido.";

            }


            /*
                Piscina ganha uma aparência
                mais quente.
            */

            if (miniPool) {

                miniPool.style.background =
                    "linear-gradient(135deg, #66c8df, #35acc9)";

            }

        }


        /*
            Pequeno indicador do Hero.
        */

        if (statusDot) {

            if (temperature <= 22) {

                statusDot.style.background =
                    "#2882ff";

                statusDot.style.boxShadow =
                    "0 0 0 5px rgba(40, 130, 255, 0.12)";

            }

            else if (temperature <= 28) {

                statusDot.style.background =
                    "#f7c948";

                statusDot.style.boxShadow =
                    "0 0 0 5px rgba(247, 201, 72, 0.12)";

            }

            else {

                statusDot.style.background =
                    "#45c77a";

                statusDot.style.boxShadow =
                    "0 0 0 5px rgba(69, 199, 122, 0.12)";

            }

        }

    }


    /*
        Atualiza enquanto o slider é movimentado.
    */

    if (temperatureSlider) {

        temperatureSlider.addEventListener(
            "input",
            updateTemperature
        );

    }


    /*
        Estado inicial: 28°C.
    */

    updateTemperature();


    /* =====================================================
       4. ANIMAÇÕES AO ROLAR
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".info-card, .optic-card, .step, .impact-card, .flow-node, .color-science, .simulator"
        );


    animatedElements.forEach(element => {

        element.classList.add(
            "before-scroll"
        );

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show-on-scroll"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }

    else {

        /*
            Fallback para navegadores antigos.
        */

        animatedElements.forEach(element => {

            element.classList.add(
                "show-on-scroll"
            );

        });

    }


    /* =====================================================
       5. NAVEGAÇÃO SUAVE
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       6. TECLADO — ACESSIBILIDADE DO MENU
    ===================================================== */

    if (menuToggle && navLinks) {

        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                    menuToggle.textContent =
                        "☰";

                }

            }
        );

    }


    /* =====================================================
       7. FECHAR MENU AO REDIMENSIONAR
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                navLinks &&
                menuToggle
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuToggle.textContent =
                    "☰";

            }

        }
    );


    /* =====================================================
       8. CONSOLE — CONFIRMAÇÃO
    ===================================================== */

    console.log(
        "AquaCEP iniciado com sucesso! ☀️🏊"
    );

});
