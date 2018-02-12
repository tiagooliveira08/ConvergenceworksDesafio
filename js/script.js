
//Adicionando escopo local!!
(function(){

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
    var linkReq  = "https://apiadvisor.climatempo.com.br";

    var $imgFavorite  = $("[data-js='imageFavorite']");
    var $cityFavorite  = $("[data-js='cityFavorite']");
    var $temperatureFavorite = $("[data-js='temperatureFavorite']");
    var $checkFavorite = $("[data-js='checkFavorite']");
    var $displayFavorite = $("[data-js='favorite']");
    var $closeFavorite = $("[data-js='closeFavorite']");
    var $clickSearchFavorite =  $("[data-js='displayFavoriteClick']");


    var idFavorited;
    var cityFavorited;
    var IdlastFavorite;
    var imgFavorite;
    var cityFavorite;
    var temperatureFavorite;
    
    //Inicio eventos click
    $btn.on("click",() => execReq($textSearch.val()));

    $textSearch.keydown((e)=>{
        console.log($textSearch.val());
        let enter = 13;
        if(e.which == enter){
            execReq($textSearch.val());
        }
    });

    $checkFavorite.on("click",()=>{
        if($($checkFavorite.is(":checked"))){
            $($displayFavorite).fadeIn("slow");
            $imgFavorite.attr("src",`img/realistic/70px/${imgFavorite}.png`);
            $cityFavorite.text(cityFavorite);
            $temperatureFavorite.text(`${temperatureFavorite}º`);
            idFavorited = IdlastFavorite;
            cityFavorited = cityFavorite;
            showFavorite();
            console.log($($checkFavorite.is(":checked")));
            $checkFavorite.prop("checked",true);
        }
    });
    
    $close.on("click",()=>{
        $blockRight.detach();
        $tipMain.detach();
        $status.attr("src","img/down.png");
    });

    $closeFavorite.on("click",()=>{
        $($displayFavorite).fadeOut("slow");
        resetFavorite();
    });

    $clickSearchFavorite.on("click",()=>{
        execReq(cityFavorited);
    });

    //Fim eventos click

    //funções
        $("img").on("error",function(){
            $(this).attr("src","./img/invalideimage.png");
        });

    function showFavorite(){
        $displayFavorite
            .css({display:"flex"})
            .fadeIn("slow");
    }

    function hideFavorite(){
        $displayFavorite.fadeOut(1000);
    }

    function resetFavorite(){
        idFavorited = null;
        cityFavorited = "";
        $checkFavorite.prop("checked",false);
    }

    function isFavorited(param){
        if(param !== idFavorited){
            $checkFavorite.prop("checked",false);
            return
        }
        $checkFavorite.prop("checked",true);
    }
    
    function checkRight(){
        if($blockRight.length === 1){
            $blockRight.detach();
            $tipMain.detach();
        }
    }
    
    function loadStart(){
        $(".button").fadeOut(1,function(){
            $(".loader--loading").fadeIn("fast");
        });
    }

    function loadEnd(){
        $(".loader--loading").fadeOut("slow",function(){
            $(".button").fadeIn("fast");
        });
    }
    
    function errorSearch(data){
            if(data.length === 0){
                $errorMessage.text(`Cidade ${$textSearch.val()} não existe.`);
                $status.attr("src","img/error.png");
                loadEnd();
                checkRight();
                return true;
            }
        return
    }

    function writeRight(data){
        $(".background").append($blockRight);
        $city.text(`${data.name} - ${data.state}`);
        $description.text(data.data.condition);
        $imgTemp.attr("src",`img/realistic/70px/${data.data.icon}.png`);
        $tempC.text(`${data.data.temperature}º`);
        $sensation.text(`${data.data.sensation}º`);
        $humidity.text(`${data.data.humidity}%`);
        $wind.text(`${data.data.wind_velocity} km/h`);
        $errorMessage.text("");
        $status.attr("src","img/sucess.png")
        $blockRight.css({"display":"block"});
        $textSearch.val("");

         IdlastFavorite  = data.id;
         imgFavorite = data.data.icon;
         cityFavorite = data.name;
         temperatureFavorite = data.data.temperature;
    }

    function writeTips(data){
        $(".background").append($tipMain);
        $prevImg1.attr("src",`img/realistic/70px/${data.data[0].text_icon.icon.day}.png`);
        $prevImg2.attr("src", `img/realistic/70px/${data.data[1].text_icon.icon.day}.png`);
        $prevImg3.attr("src", `img/realistic/70px/${data.data[2].text_icon.icon.day}.png`);
        $prevCMax1.text(`Max: ${data.data[0].temperature.max}º`);
        $prevCMax2.text(`Max: ${data.data[1].temperature.max}º`);
        $prevCMax3.text(`Max: ${data.data[2].temperature.max}º`);
        $prevCMin1.text(`Min: ${data.data[0].temperature.min}º`);
        $prevCMin2.text(`Min: ${data.data[1].temperature.min}º`);
        $prevCMin3.text(`Min: ${data.data[2].temperature.min}º`);
        $dayLast.text(`${data.data[2].date_br}`);
        $descritionPrev1.text(`${data.data[0].text_icon.text.phrase.reduced}`);
        $descritionPrev2.text(`${data.data[1].text_icon.text.phrase.reduced}`);
        $descritionPrev3.text(`${data.data[2].text_icon.text.phrase.reduced}`);
        $tipMain.css({display:"flex"});
    }
    //fim funções


    //requisições get
    function execReq(searchValue){
        checkRight();
        loadStart();

       $.get(`${linkReq}/api/v1/locale/city?name=${searchValue}&token=1db6b6239f44145c4ae69aac35b437a6`, data =>{
            if(errorSearch(data))
                return
            let idCity = data[0].id;
            isFavorited(idCity);
            
                $.get(`${linkReq}/api/v1/weather/locale/${idCity}/current?token=1db6b6239f44145c4ae69aac35b437a6`,data =>{
                    writeRight(data);

                        $.get(`${linkReq}/api/v1/forecast/locale/${idCity}/days/15?token=1db6b6239f44145c4ae69aac35b437a6`,data =>{
                            writeTips(data);
                        })  
                        .always(() => loadEnd())
                    }
                )
            }).fail(() => {
                $errorMessage.text(`Falha na conexão com o servidor!`); 
                loadEnd()
                $status.attr("src","img/error.png");
                })
    }

})()