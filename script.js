/* =========================================================
   AQUACEP — SCRIPT.JS
   Projeto Integrador | CEP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENU MOBILE
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Fecha o menu ao clicar em um link
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


    /* =====================================================
       2. LED RGB INTERATIVO
    ===================================================== */

    const redRange = document.getElementById("red-range");
    const greenRange = document.getElementById("green-range");
    const blueRange = document.getElementById("blue-range");

    const rgbLight = document.getElementById("rgb-light");
    const rgbValue = document.getElementById("rgb-value");

    const rgbCore = rgbLight
        ? rgbLight.querySelector(".rgb-core")
        : null;


    /*
        Função responsável por atualizar o LED.
    */

    function updateRGB() {

        // Verifica se todos os elementos existem
        if (
            !redRange ||
            !greenRange ||
            !blueRange ||
            !rgbLight
        ) {
            return;
        }


        const red = Number(redRange.value);
        const green = Number(greenRange.value);
        const blue = Number(blueRange.value);


        const rgb = `rgb(${red}, ${green}, ${blue})`;

        const shadow = `
            0 0 25px rgba(${red}, ${green}, ${blue}, 0.45),
            0 0 70px rgba(${red}, ${green}, ${blue}, 0.25)
        `;


        /*
            Atualiza o LED principal.
        */

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


        /*
            Atualiza as variáveis CSS.
            Isso também faz o brilho externo
            (::before) acompanhar a cor.
        */

        rgbLight.style.setProperty(
            "--rgb-color",
            rgb
        );

        rgbLight.style.setProperty(
            "--rgb-shadow",
            shadow
        );


        /*
            Atualiza o núcleo interno.
        */

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


        /*
            Mostra o valor RGB abaixo das barras.
        */

        if (rgbValue) {

            rgbValue.textContent =
                `RGB(${red}, ${green}, ${blue})`;

        }

    }


    /*
        IMPORTANTE:
        usamos tanto "input" quanto "change".

        "input" funciona enquanto a barrinha
        está sendo arrastada.

        "change" funciona quando o valor
        termina de ser alterado.

        Isso deixa o comportamento consistente
        em computador e celular.
    */

    [redRange, greenRange, blueRange].forEach(slider => {

        if (!slider) return;

        slider.addEventListener(
            "input",
            updateRGB
        );

        slider.addEventListener(
            "change",
            updateRGB
        );

    });


    // Inicializa o LED imediatamente
    updateRGB();


    /* =====================================================
       3. SIMULADOR DE TEMPERATURA
    ===================================================== */

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

    const miniPool =
        document.querySelector(".mini-pool");

    const heroTemperature =
        document.getElementById("hero-temperature");


    function updateTemperature() {

        if (!temperatureSlider) {
            return;
        }


        const temperature =
            Number(temperatureSlider.value);


        /*
            Atualiza os números.
        */

        if (temperatureNumber) {

            temperatureNumber.textContent =
                `${temperature}°C`;

        }


        if (simTemperature) {

            simTemperature.textContent =
                `${temperature}°C`;

        }


        /*
            Também atualiza a temperatura
            mostrada no topo do site.
        */

        if (heroTemperature) {

            heroTemperature.textContent =
                `${temperature}°C`;

        }


        /*
            Remove estados anteriores.
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
            15°C até 22°C
        */

        if (temperature <= 22) {

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
                    "A temperatura está baixa. O sistema deve iniciar o aquecimento.";

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
            TEMPERATURA IDEAL
            23°C até 29°C
        */

        else if (temperature <= 29) {

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
                    "A água está dentro de uma faixa confortável.";

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
            30°C até 35°C
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
                    "A temperatura está alta. O aquecimento deve ser interrompido.";

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
            updateTemperature
        );

        temperatureSlider.addEventListener(
            "change",
            updateTemperature
        );

    }


    // Inicializa o simulador
    updateTemperature();


    /* =====================================================
       4. BOTÃO "TESTAR O SISTEMA"
    ===================================================== */

    const testButton =
        document.querySelector(
            'a[href="#simulador"]'
        );


    if (testButton) {

        testButton.addEventListener(
            "click",
            () => {

                setTimeout(() => {

                    if (temperatureSlider) {

                        temperatureSlider.focus();

                    }

                }, 500);

            }
        );

    }


    /* =====================================================
       5. ANIMAÇÕES AO ROLAR
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".info-card, .optic-card, .step, .impact-card, .flow-node, .color-science"
        );


    animatedElements.forEach(element => {

        element.classList.add(
            "before-scroll"
        );

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

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
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add(
                "show-on-scroll"
            );

        });

    }


    /* =====================================================
       6. CONFIRMAÇÃO NO CONSOLE
    ===================================================== */

    console.log(
        "AquaCEP — JavaScript carregado corretamente."
    );

    console.log(
        "LED RGB:",
        !!redRange,
        !!greenRange,
        !!blueRange,
        !!rgbLight
    );

    console.log(
        "Simulador:",
        !!temperatureSlider
    );

});
