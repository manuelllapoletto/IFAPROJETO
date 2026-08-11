document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MENU MOBILE
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const aberto = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", aberto);

            menuToggle.textContent = aberto ? "✕" : "☰";

        });

    }


    /* =========================================
       2. BOTÃO "TESTAR O SISTEMA"
    ========================================== */

    const testarSistema =
        document.querySelector('a[href="#simulador"]');

    const simulador =
        document.getElementById("simulador");

    if (testarSistema && simulador) {

        testarSistema.addEventListener("click", function (event) {

            event.preventDefault();

            simulador.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =========================================
       3. LED RGB
    ========================================== */

    const redRange =
        document.getElementById("red-range");

    const greenRange =
        document.getElementById("green-range");

    const blueRange =
        document.getElementById("blue-range");

    const rgbLight =
        document.getElementById("rgb-light");

    const rgbValue =
        document.getElementById("rgb-value");

    const rgbCore =
        document.querySelector(".rgb-core");


    function atualizarLED() {

        if (
            !redRange ||
            !greenRange ||
            !blueRange
        ) {
            return;
        }

        const red = Number(redRange.value);
        const green = Number(greenRange.value);
        const blue = Number(blueRange.value);

        const cor = `rgb(${red}, ${green}, ${blue})`;


        /*
            Aplica a cor tanto no LED externo
            quanto no núcleo do LED.
        */

        if (rgbLight) {

            rgbLight.style.setProperty(
                "background",
                cor,
                "important"
            );

            rgbLight.style.setProperty(
                "box-shadow",
                `
                0 0 25px rgba(${red}, ${green}, ${blue}, 0.7),
                0 0 70px rgba(${red}, ${green}, ${blue}, 0.4)
                `,
                "important"
            );

        }


        if (rgbCore) {

            rgbCore.style.setProperty(
                "background",
                cor,
                "important"
            );

        }


        if (rgbValue) {

            rgbValue.textContent =
                `RGB(${red}, ${green}, ${blue})`;

        }

    }


    if (redRange) {
        redRange.addEventListener(
            "input",
            atualizarLED
        );
    }


    if (greenRange) {
        greenRange.addEventListener(
            "input",
            atualizarLED
        );
    }


    if (blueRange) {
        blueRange.addEventListener(
            "input",
            atualizarLED
        );
    }


    // Cor inicial: vermelha

    atualizarLED();



    /* =========================================
       4. SIMULADOR DE TEMPERATURA
    ========================================== */

    const temperatureSlider =
        document.getElementById("temperature-slider");

    const temperatureNumber =
        document.getElementById("temperature-number");

    const simTemperature =
        document.getElementById("sim-temperature");

    const heroTemperature =
        document.getElementById("hero-temperature");

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


    function atualizarTemperatura() {

        if (!temperatureSlider) {
            return;
        }


        const temperatura =
            Number(temperatureSlider.value);


        // Atualiza os números

        if (temperatureNumber) {

            temperatureNumber.textContent =
                `${temperatura}°C`;

        }


        if (simTemperature) {

            simTemperature.textContent =
                `${temperatura}°C`;

        }


        if (heroTemperature) {

            heroTemperature.textContent =
                `${temperatura}°C`;

        }


        /* =====================================
           TEMPERATURA BAIXA
        ===================================== */

        if (temperatura <= 23) {

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
                    "0 0 18px rgba(40, 130, 255, 0.7)";

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


        /* =====================================
           TEMPERATURA INTERMEDIÁRIA
        ===================================== */

        else if (temperatura <= 28) {

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
                    "0 0 18px rgba(255, 205, 55, 0.7)";

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


        /* =====================================
           TEMPERATURA IDEAL
        ===================================== */

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
                    "0 0 18px rgba(255, 75, 85, 0.7)";

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


    if (temperatureSlider) {

        temperatureSlider.addEventListener(
            "input",
            atualizarTemperatura
        );

    }


    atualizarTemperatura();



    /* =========================================
       5. ANIMAÇÕES AO ROLAR
    ========================================== */

    const elementos =
        document.querySelectorAll(
            ".info-card, .optic-card, .impact-card, .step, .flow-node"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

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


        elementos.forEach(function (elemento) {

            elemento.classList.add(
                "before-scroll"
            );

            observer.observe(elemento);

        });

    }


    /* =========================================
       6. LINKS INTERNOS
    ========================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const id =
                    this.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }


                const destino =
                    document.querySelector(id);

                if (!destino) {
                    return;
                }


                event.preventDefault();


                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    console.log(
        "🌊 AquaCEP funcionando corretamente!"
    );

});
