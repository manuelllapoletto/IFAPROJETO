document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const aberto =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       LED RGB
    ===================================================== */

    const red = document.getElementById("red-range");
    const green = document.getElementById("green-range");
    const blue = document.getElementById("blue-range");

    const led = document.getElementById("rgb-light");
    const core = document.querySelector(".rgb-core");
    const rgbText = document.getElementById("rgb-value");


    /*
        Verifica se todos os elementos existem.
    */

    if (red && green && blue && led) {


        function atualizarLED() {

            /*
                Converte os valores das barras
                para números.
            */

            const R = parseInt(red.value, 10) || 0;
            const G = parseInt(green.value, 10) || 0;
            const B = parseInt(blue.value, 10) || 0;


            /*
                Monta a cor.
            */

            const cor = "rgb(" + R + ", " + G + ", " + B + ")";


            /*
                Monta o brilho do LED.
            */

            const brilho =
                "0 0 25px rgba(" + R + "," + G + "," + B + ",0.45)," +
                "0 0 70px rgba(" + R + "," + G + "," + B + ",0.25)";


            /*
                MUDA A COR DO LED PRINCIPAL
            */

            led.style.setProperty(
                "background",
                cor,
                "important"
            );

            led.style.setProperty(
                "background-color",
                cor,
                "important"
            );

            led.style.setProperty(
                "box-shadow",
                brilho,
                "important"
            );


            /*
                MUDA A COR DO NÚCLEO
            */

            if (core) {

                core.style.setProperty(
                    "background",
                    cor,
                    "important"
                );

                core.style.setProperty(
                    "background-color",
                    cor,
                    "important"
                );

                core.style.setProperty(
                    "box-shadow",
                    "0 0 20px " + cor,
                    "important"
                );

            }


            /*
                MUDA A VARIÁVEL USADA PELO
                BRILHO EXTERNO (::before)
            */

            led.style.setProperty(
                "--rgb-color",
                cor
            );


            /*
                MOSTRA O VALOR RGB NA TELA
            */

            if (rgbText) {

                rgbText.textContent =
                    "RGB(" + R + ", " + G + ", " + B + ")";

            }

        }


        /* =================================================
           EVENTO PRINCIPAL

           "input" funciona enquanto a barrinha
           está sendo arrastada.

           Funciona com:
           - mouse
           - touch
           - tela de celular
           ================================================= */

        red.addEventListener(
            "input",
            atualizarLED
        );

        green.addEventListener(
            "input",
            atualizarLED
        );

        blue.addEventListener(
            "input",
            atualizarLED
        );


        /*
            Também adicionamos "change" como
            segurança para alguns navegadores.
        */

        red.addEventListener(
            "change",
            atualizarLED
        );

        green.addEventListener(
            "change",
            atualizarLED
        );

        blue.addEventListener(
            "change",
            atualizarLED
        );


        /*
            Inicializa o LED com os valores
            que já estão no HTML.
        */

        atualizarLED();

    }


    /* =====================================================
       SIMULADOR DE TEMPERATURA
    ===================================================== */

    const temperatureSlider =
        document.getElementById("temperature-slider");

    const temperatureNumber =
        document.getElementById("temperature-number");

    const simTemperature =
        document.getElementById("sim-temperature");

    const heroTemperature =
        document.getElementById("hero-temperature");

    const systemStatus =
        document.getElementById("system-status");

    const statusLed =
        document.getElementById("status-led");

    const statusTitle =
        document.getElementById("status-title");

    const statusDescription =
        document.getElementById("status-description");


    if (temperatureSlider) {

        function atualizarTemperatura() {

            const temperatura =
                parseInt(
                    temperatureSlider.value,
                    10
                );


            /*
                Atualiza os números.
            */

            if (temperatureNumber) {

                temperatureNumber.textContent =
                    temperatura + "°C";

            }

            if (simTemperature) {

                simTemperature.textContent =
                    temperatura + "°C";

            }

            if (heroTemperature) {

                heroTemperature.textContent =
                    temperatura + "°C";

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
                FRIO
            */

            if (temperatura <= 22) {

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

            }


            /*
                IDEAL
            */

            else if (temperatura <= 29) {

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

            }


            /*
                QUENTE
            */

            else {

                if (systemStatus) {

                    systemStatus.classList.add(
                        "status-hot"
                    );

                }

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
                        "rgb(255, 75, 85)";

                    statusLed.style.boxShadow =
                        "0 0 18px rgba(255, 75, 85, 0.7)";

                }

            }

        }


        /*
            Funciona durante o movimento
            da barrinha.
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
       ANIMAÇÕES AO ROLAR
    ===================================================== */

    const elementos =
        document.querySelectorAll(
            ".info-card, .optic-card, .step, .impact-card, .flow-node, .color-science"
        );


    if (
        elementos.length > 0 &&
        "IntersectionObserver" in window
    ) {

        elementos.forEach(function (elemento) {

            elemento.classList.add(
                "before-scroll"
            );

        });


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show-on-scroll"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elementos.forEach(
            function (elemento) {

                observer.observe(elemento);

            }
        );

    }


    console.log(
        "AquaCEP carregado com sucesso!"
    );

});
