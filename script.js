/* =========================================================
   AQUACEP — SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. MENU MOBILE
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const aberto =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

        });


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

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
       2. LED RGB
    ===================================================== */

    const redSlider =
        document.getElementById("red-range");

    const greenSlider =
        document.getElementById("green-range");

    const blueSlider =
        document.getElementById("blue-range");


    const led =
        document.getElementById("rgb-light");

    const rgbCore =
        document.querySelector(".rgb-core");

    const rgbValue =
        document.getElementById("rgb-value");


    /*
        Só executa se os elementos existirem.
    */

    if (
        redSlider &&
        greenSlider &&
        blueSlider &&
        led
    ) {


        function atualizarLED() {


            /*
                Lê as três barrinhas.
            */

            const vermelho =
                Number(redSlider.value);

            const verde =
                Number(greenSlider.value);

            const azul =
                Number(blueSlider.value);


            /*
                Cria a cor.
            */

            const cor =
                `rgb(${vermelho}, ${verde}, ${azul})`;


            /*
                Calcula o brilho.

                O valor da cor também é usado
                para o brilho do LED.
            */

            const brilho =
                `0 0 25px rgba(${vermelho}, ${verde}, ${azul}, .45),
                 0 0 70px rgba(${vermelho}, ${verde}, ${azul}, .25)`;


            /*
                AQUI ESTÁ O PRINCIPAL.

                O CSS usa --led-color.

                O JavaScript só altera essa variável.
            */

            led.style.setProperty(
                "--led-color",
                cor
            );


            led.style.setProperty(
                "--led-glow",
                brilho
            );


            /*
                O núcleo também acompanha
                a mesma variável.
            */

            if (rgbCore) {

                rgbCore.style.setProperty(
                    "background",
                    cor
                );

                rgbCore.style.setProperty(
                    "box-shadow",
                    `0 0 18px ${cor}`
                );

            }


            /*
                Mostra o valor RGB.
            */

            if (rgbValue) {

                rgbValue.textContent =
                    `RGB(${vermelho}, ${verde}, ${azul})`;

            }

        }


        /*
        =====================================================
        EVENTO "INPUT"

        Esse é o evento correto para range.

        Ele acontece enquanto a pessoa arrasta:

        🖱️ mouse
        👆 dedo
        📱 touchscreen
        💻 trackpad
        =====================================================
        */

        redSlider.addEventListener(
            "input",
            atualizarLED
        );


        greenSlider.addEventListener(
            "input",
            atualizarLED
        );


        blueSlider.addEventListener(
            "input",
            atualizarLED
        );


        /*
            "change" fica como segurança.
        */

        redSlider.addEventListener(
            "change",
            atualizarLED
        );


        greenSlider.addEventListener(
            "change",
            atualizarLED
        );


        blueSlider.addEventListener(
            "change",
            atualizarLED
        );


        /*
            Inicializa o LED.
        */

        atualizarLED();

    }



    /* =====================================================
       3. SIMULADOR DE TEMPERATURA
    ===================================================== */

    const temperatureSlider =
        document.getElementById(
            "temperature-slider"
        );


    const temperatureNumber =
        document.getElementById(
            "temperature-number"
        );


    const simTemperature =
        document.getElementById(
            "sim-temperature"
        );


    const heroTemperature =
        document.getElementById(
            "hero-temperature"
        );


    const systemStatus =
        document.getElementById(
            "system-status"
        );


    const statusLed =
        document.getElementById(
            "status-led"
        );


    const statusTitle =
        document.getElementById(
            "status-title"
        );


    const statusDescription =
        document.getElementById(
            "status-description"
        );


    const miniPool =
        document.querySelector(
            ".mini-pool"
        );


    if (temperatureSlider) {


        function atualizarTemperatura() {


            const temperatura =
                Number(
                    temperatureSlider.value
                );


            /*
                Números.
            */

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


            /*
                Limpa estados anteriores.
            */

            if (systemStatus) {

                systemStatus.classList.remove(
                    "status-cold",
                    "status-warm",
                    "status-hot"
                );

            }


            /*
                FRIO
            */

            if (temperatura <= 22) {


                systemStatus?.classList.add(
                    "status-cold"
                );


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
                        "rgb(40,130,255)";

                    statusLed.style.boxShadow =
                        "0 0 18px rgba(40,130,255,.7)";

                }

            }


            /*
                IDEAL
            */

            else if (temperatura <= 29) {


                systemStatus?.classList.add(
                    "status-warm"
                );


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
                        "rgb(255,205,55)";

                    statusLed.style.boxShadow =
                        "0 0 18px rgba(255,205,55,.7)";

                }

            }


            /*
                QUENTE
            */

            else {


                systemStatus?.classList.add(
                    "status-hot"
                );


                if (statusTitle) {

                    statusTitle.textContent =
                        "Aquecimento interrompido";

                }


                if (statusDescription) {

                    statusDescription.textContent =
                        "A temperatura está alta. O sistema deve interromper o aquecimento.";

                }


                if (statusLed) {

                    statusLed.style.background =
                        "rgb(255,75,85)";

                    statusLed.style.boxShadow =
                        "0 0 18px rgba(255,75,85,.7)";

                }

            }


            /*
                Altera a aparência da piscina.
            */

            if (miniPool) {


                const proporcao =
                    (temperatura - 15) / 20;


                const vermelho =
                    Math.round(
                        60 + proporcao * 180
                    );


                const azul =
                    Math.round(
                        220 - proporcao * 100
                    );


                miniPool.style.background =
                    `linear-gradient(
                        135deg,
                        rgb(${vermelho},180,${azul}),
                        rgb(${vermelho},${150 + Math.round(proporcao * 40)},190)
                    )`;

            }

        }


        /*
            Funciona no computador e no celular.
        */

        temperatureSlider.addEventListener(
            "input",
            atualizarTemperatura
        );


        temperatureSlider.addEventListener(
            "change",
            atualizarTemperatura
        );


        atualizarTemperatura();

    }



    /* =====================================================
       4. ANIMAÇÕES AO ROLAR
    ===================================================== */

    const elementos =
        document.querySelectorAll(
            ".info-card, " +
            ".optic-card, " +
            ".step, " +
            ".impact-card, " +
            ".flow-node, " +
            ".color-science"
        );


    if (
        elementos.length &&
        "IntersectionObserver" in window
    ) {


        elementos.forEach(elemento => {

            elemento.classList.add(
                "before-scroll"
            );

        });


        const observer =
            new IntersectionObserver(
                entradas => {

                    entradas.forEach(
                        entrada => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "show-on-scroll"
                                );


                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12
                }
            );


        elementos.forEach(elemento => {

            observer.observe(elemento);

        });

    }


    console.log(
        "AquaCEP carregado corretamente."
    );

});
