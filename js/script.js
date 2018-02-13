//Adicionando escopo local!!
(function () {

    //Setando variaveis para melhor manipulação.
    var $btn = $("[data-js='btnSearch']");
    var $textSearch = $("[data-js='textSearch']");
    var $city = $("[data-js='locate']");
    var $imgTemp = $("[data-js='imgTemp']");
    var $tempC = $("[data-js='tempC']");
    var $description = $("[data-js='description']");
    var $close = $("[data-js='close']");
    var $blockRight = $("[data-js='blockRight']");
    var $sensation = $("[data-js='sensation']");
    var $humidity = $("[data-js='humidity']");
    var $wind = $("[data-js='wind']");
    var $errorMessage = $("[data-js='errorMessage']");
    var $status = $("[data-js='status']");
    //variaveis tips
    var $tipMain = $("[data-js='tipMain']");
    var $prevImg1 = $("[data-js='prevImg1']");
    var $prevImg2 = $("[data-js='prevImg2']");
    var $prevImg3 = $("[data-js='prevImg3']");
    var $prevCMax1 = $("[data-js='prevCMax1']");
    var $prevCMax2 = $("[data-js='prevCMax2']");
    var $prevCMax3 = $("[data-js='prevCMax3']");
    var $prevCMin1 = $("[data-js='prevCMin1']");
    var $prevCMin2 = $("[data-js='prevCMin2']");
    var $prevCMin3 = $("[data-js='prevCMin3']");
    var $dayLast = $("[data-js='dayLast']");
    var $descritionPrev1 = $("[data-js='descriptionPrevision1']");
    var $descritionPrev2 = $("[data-js='descriptionPrevision2']");
    var $descritionPrev3 = $("[data-js='descriptionPrevision3']");
    var linkReq = "https://apiadvisor.climatempo.com.br";

    var $imgFavorite = $("[data-js='imageFavorite']");
    var $cityFavorite = $("[data-js='cityFavorite']");
    var $temperatureFavorite = $("[data-js='temperatureFavorite']");
    var $checkFavorite = $("[data-js='checkFavorite']");
    var $displayFavorite = $("[data-js='favorite']");
    var $closeFavorite = $("[data-js='closeFavorite']");
    var $clickSearchFavorite = $("[data-js='displayFavoriteClick']");


    var idFavorited;
    var cityFavorited;
    var IdlastFavorite;
    var imgFavorite;
    var cityFavorite;
    var temperatureFavorite;

    //Inicio eventos click
    $btn.on("click", () => execReq($textSearch.val()));

    $textSearch.keydown((e) => {
        let enter = 13;
        if (e.which == enter) {
            execReq($textSearch.val());
        }
    });

    $checkFavorite.on("click", () => {
        if ($($checkFavorite.is(":checked"))) {
            $($displayFavorite).fadeIn("slow");
            $imgFavorite.attr("src", `img/realistic/70px/${imgFavorite}.png`);
            $cityFavorite.text(cityFavorite);
            $temperatureFavorite.text(`${temperatureFavorite}º`);
            idFavorited = IdlastFavorite;
            cityFavorited = cityFavorite;
            showFavorite();
            console.log($($checkFavorite.is(":checked")));
            $checkFavorite.prop("checked", true);
        }
    });

    $close.on("click", () => {
        $blockRight.hide(300, () =>
            $tipMain.fadeOut(700));
        $status.attr("src", "img/down.png");
    });

    $closeFavorite.on("click", () => {
        $($displayFavorite).hide("slow");
        resetFavorite();
    });

    $clickSearchFavorite.on("click", () => {
        execReq(cityFavorited);
    });

    //Fim eventos click

    //funções genericas
    $("img").on("error", function () {
        $(this).attr("src", "./img/invalideimage.png");
    });

    $(window).on("load", function () {
        $(".loader-extern__loading").delay(2000).fadeOut("slow", function () {
            $(".display__display-all").fadeIn("slow", function () {
                //...
            })
        });
    })
    //fim Funções genericas



    //Funções do sistema

    function showFavorite() {
        $displayFavorite
            .show("slow");
    }

    function hideFavorite() {
        $displayFavorite.fadeOut(1000);
    }

    function resetFavorite() {
        idFavorited = null;
        cityFavorited = "";
        $checkFavorite.prop("checked", false);
    }

    function isFavorited(param) {
        if (param !== idFavorited) {
            $checkFavorite.prop("checked", false);
            return
        }
        $checkFavorite.prop("checked", true);
    }

    function checkRight() {
        if ($blockRight.length === 1) {
            $blockRight.hide();
            $tipMain.hide();
            $(".tips").remove();

        }
    }

    function loadStart() {
        $btn.fadeOut(1, function () {
            $(".loader--loading").fadeIn("fast");
        });
    }

    function loadEnd() {
        $(".loader--loading").fadeOut("slow", function () {
            $btn.fadeIn("fast");
        });
    }

    function errorSearch(data) {
        if (data.length === 0) {
            $errorMessage.text(`Cidade ${$textSearch.val()} não existe.`);
            $status.attr("src", "img/error.png");
            loadEnd();
            checkRight();
            return true;
        }
        return
    }

    function writeRight(data) {
        $blockRight.show(300);
        $city.text(`${data.name} - ${data.state}`);
        $description.text(data.data.condition);
        $imgTemp.attr("src", `img/realistic/70px/${data.data.icon}.png`);
        $tempC.text(`${data.data.temperature}º`);
        $sensation.text(`${data.data.sensation}º`);
        $humidity.text(`${data.data.humidity}%`);
        $wind.text(`${data.data.wind_velocity} km/h`);
        $errorMessage.text("");
        $status.attr("src", "img/sucess.png")
        $textSearch.val("");
        IdlastFavorite = data.id;
        imgFavorite = data.data.icon;
        cityFavorite = data.name;
        temperatureFavorite = data.data.temperature;

    }


    function writing(title, cMax, cMin, img, info) {
        var temp = `<div class="tips" data-js="tip1">
        <div class="img-responsive">
            <img class="img-today" data-js="prevImg1" src="img/realistic/70px/${img}.png" />
        </div>
        <div class="flex-column">
            <span class="day-today bolder">${title}</span>
            <span class="max">
                <div class="arrow-reponsive d-block">
                    <img src="img/myArrow.png" alt="seta para cima" />
                </div>
                <span class="block-right__sensation-regular" data-js="prevCMax1">Max: ${cMax}º</span>
            </span>
            <span class="max mt10">
                <div class="arrow-reponsive d-block">
                    <img src="img/myArrow2.png" alt="seta para baixo" />
                </div>
                <span class="block-right__sensation-regular" data-js="prevCMin1">Min: ${cMin}º</span>
            </span>
        </div>
        <span class="description-prev pd10 mt10 " data-js="descriptionPrevision1">${info}</span>
    </div>`;
        return temp;
    }

    var days = ['Domingãoo!', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabadãoo!'];

    function writeTips(data) {
        for (var i = 0; i < data.data.length; i++) {
            let d;
            d = new Date(data.data[i].date);
            console.log(days[d.getUTCDay()]);
            daysReformuled = days[d.getUTCDay()]

            $tipMain.append(writing(
                daysReformuled,
                data.data[i].temperature.max,
                data.data[i].temperature.min,
                data.data[i].text_icon.icon.day,
                data.data[i].text_icon.text.phrase.reduced
            ));

            if (i >= 6)
                break;
            //endLoop
        }
        $tipMain.css({
            display: "flex"
        });
    }

    //fim funções do sistema


    //requisições get
    function execReq(searchValue) {
        checkRight();
        loadStart();

        $.get(`${linkReq}/api/v1/locale/city?name=${searchValue}&token=1db6b6239f44145c4ae69aac35b437a6`, data => {
            if (errorSearch(data))
                return
            let idCity = data[0].id;
            isFavorited(idCity);

            $.get(`${linkReq}/api/v1/weather/locale/${idCity}/current?token=1db6b6239f44145c4ae69aac35b437a6`, data => {
                writeRight(data);

                $.get(`${linkReq}/api/v1/forecast/locale/${idCity}/days/15?token=1db6b6239f44145c4ae69aac35b437a6`, data => {
                        writeTips(data);
                    })
                    .always(() => loadEnd())
            })
        }).fail(() => {
            $errorMessage.text(`Falha na conexão com o servidor!`);
            loadEnd()
            $status.attr("src", "img/error.png");
        })
    }

})()