(function ($) {

    $(document).ready(
        function () {

            /**************** Slider DEGRADE**********************/
            var colors = new Array(
[5, 4, 10],
[33, 28, 66],
[60, 51, 121],
[88, 74, 176],
[99, 86, 184],
[238, 68, 55]);

            var step = 0;
            var colorIndices = [0, 1, 2, 3];

            //transition speed
            var gradientSpeed = 0.004;

            function updateGradient() {

                if ($ === undefined) return;

                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

                $('.background').css({
                    background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
                }).css({
                    background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
                });

                step += gradientSpeed;
                if (step >= 1) {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];

                    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                }
            }

            /**************** ScrollReveal *****************/
            setInterval(updateGradient, 10);

            window.sr = ScrollReveal({
                reset: true
            });
            ScrollReveal().reveal('.headline', {
                delay: 100
            });
            ScrollReveal().reveal('.tagline', {
                delay: 500
            });
            ScrollReveal().reveal('.punchline', {
                delay: 1000
            });

            sr.reveal('.sc-item', {
                rotate: {
                    x: 100,
                    y: 100,
                    z: 0
                },
                duration: 1000
            });

            /**************** Menu Hamburger *****************/

            var content = document.querySelector('#hamburger-content');
            var sidebarBody = document.querySelector('#hamburger-sidebar-body');

            sidebarBody.innerHTML = content.innerHTML;


            var button = document.querySelector('#hamburger-button');
            var overlay = document.querySelector('#hamburger-overlay');
            var activatedClass = 'hamburger-activated';

            button.addEventListener('click', function (e) {
                e.preventDefault();

                this.parentNode.classList.add(activatedClass);
            });

            button.addEventListener('keydown', function (e) {
                if (this.parentNode.classList.contains(activatedClass)) {
                    if (e.repeat === false && e.which === 27)
                        this.parentNode.classList.remove(activatedClass);
                }
            });

            overlay.addEventListener('click', function (e) {
                e.preventDefault();

                this.parentNode.classList.remove(activatedClass);
            });

            /********** to TOP bouton **********/

            window.onscroll = function () {
                scrollFunction()
            };

            function scrollFunction() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    document.getElementById("toTop").style.display = "block";
                } else {
                    document.getElementById("toTop").style.display = "none";
                }
            }

            /*************************HEADER**********************/

            $('#header').hide();
            var hauteur = 580;
            $(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > hauteur) {
                        $('#header').css("display", "flex")
                         .fadeIn();
                    } else {
                        $('#header').hide();
                    }
                });
            });

            /********** Scroll smooth sections ************/

            $(document).on('click', 'a[href^="#"]:not(li.nav-item a)', function (e) {
                var id = $(this).attr('href');

                var $id = $(id);
                if ($id.length === 0) {
                    return;
                }

                e.preventDefault();

                var pos = $id.offset().top;

                $('body, html').animate({
                    scrollTop: pos
                }, 1000);
                
                if ($('#hamburger-overlay').length) {
                    $('#hamburger').removeClass('hamburger-activated');
                }

            });


            /**************** Competences items ***************/

            $(window).scroll(function () {
                var wPos = $(window).scrollTop();
                var rdPos = $('.compItems').offset().top;

                if (wPos + 500 >= rdPos) {
                    var art = $('.compItems').find('li');
                    art.addClass('inView');
                }
                
            });

            /********** Formulaire contact ************/
            $('input').blur(function () {
                if ($(this).val() == '') {
                    $(this).addClass('wrong');
                } else {
                    $(this).removeClass('worng');
                }
            });

            $("#contactForm").submit(function (e) {
                e.preventDefault();
                var nom = $("#nom").val();
                var email = $("#email").val();
                var message = $("#message").val();
                var dataString = nom + email + message;
                var msg;

                if (dataString == "") {
                    msg = $('<div class="echec">Vous devez remplir tous les champs</div>');

                } else if (nom == "") {
                    msg = $('<div class="echec">Vous devez saisir votre nom</div>');
                } else if (email == "") {
                    msg = $('<div class="echec">Vous devez saisir votre mail</div>');
                } else if (message == "") {
                    msg = $('<div class="echec">Vous devez saisir un message</div>');
                } else {
                    $.ajax({
                        type: "POST",
                        url: $(this).attr("action"),
                        data: $(this).serialize(),
                        success: function () {

                            var msgSuccess;
                            msgSuccess = $('<div class="merci">Merci ' + nom + ', votre message a bien été envoyé </div>');
                            $('body').append(msgSuccess);
                            setTimeout(function () {
                                    $(msgSuccess).fadeOut();
                                },
                                2300
                            );

                            document.getElementById("nom").value = "";
                            document.getElementById("email").value = "";
                            document.getElementById("message").value = "";
                        },
                        error: function () {
                            var msgError;
                            msgError = $('<div class="echec">Le message n\'a pas été envoyé </div>');
                            $('body').append(msgError);
                            setTimeout(function () {
                                    $(msgError).fadeOut();
                                },
                                2300
                            );
                        }
                    });
                }
                $('body').append(msg);

                setTimeout(function () {
                        $(msg).fadeOut();
                    },
                    2300
                );
                return false;
            });

            /********** Centre d'interet change **********/

            var TxtType = function (el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 800;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };

            TxtType.prototype.tick = function () {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];

                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.el.innerHTML = '<span class="wrap">j\'\aime ' + this.txt + '</span>';

                var that = this;
                var delta = 200 - Math.random() * 100;

                if (this.isDeleting) {
                    delta /= 2;
                }

                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500;
                }

                setTimeout(function () {
                    that.tick();
                }, delta);
            };

            window.onload = function () {
                var elements = document.getElementsByClassName('typewrite');
                for (var i = 0; i < elements.length; i++) {
                    var toRotate = elements[i].getAttribute('data-type');
                    var period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                        new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }

                // INJECT CSS
                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".typewrite > .wrap { border-right: .15em solid #fff; animation: blink-caret .75s step-end infinite;}";
                document.body.appendChild(css);
            };



        });

})(jQuery);
