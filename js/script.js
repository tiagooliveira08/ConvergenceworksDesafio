
    //Algumas observações:
    //Bom decidi fazer em javascript puro pois é o que realmente domino, poderia fazer em jQuery também,
    //porem acredito que meu conhecimento em puro javascript ainda é mais predominante.
    //usei apenas o metodo get do jquery devido a praticidade de fazer requisições.

//Adicionando escopo local!!
(function(doc){

    //Setando variaveis para melhor manipulação.
    var $btn = doc.querySelector("[data-js='btnSearch']");
    var $textSearch = doc.querySelector("[data-js='textSearch']");
    var $city = doc.querySelector("[data-js='locate']");
    var $imgTemp = doc.querySelector("[data-js='imgTemp']");
    var $tempC = doc.querySelector("[data-js='tempC']");
    var $description = doc.querySelector("[data-js='description']");
    var $close = doc.querySelector("[data-js='close']");
    var $blockRight = doc.querySelector("[data-js='blockRight']");
    var $sensation = doc.querySelector("[data-js='sensation']");
    var $humidity = doc.querySelector("[data-js='humidity']");
    var $wind = doc.querySelector("[data-js='wind']");
    var $errorMessage = doc.querySelector("[data-js='errorMessage']");
    var $status = doc.querySelector("[data-js='status']");
    //variaveis tips
    var $tipMain = doc.querySelector("[data-js='tipMain']");
    var $prevImg1 = doc.querySelector("[data-js='prevImg1']");
    var $prevImg2 = doc.querySelector("[data-js='prevImg2']");
    var $prevImg3 = doc.querySelector("[data-js='prevImg3']");
    var $prevCMax1 = doc.querySelector("[data-js='prevCMax1']");
    var $prevCMax2 = doc.querySelector("[data-js='prevCMax2']");
    var $prevCMax3 = doc.querySelector("[data-js='prevCMax3']");
    var $prevCMin1 = doc.querySelector("[data-js='prevCMin1']");
    var $prevCMin2 = doc.querySelector("[data-js='prevCMin2']");
    var $prevCMin3 = doc.querySelector("[data-js='prevCMin3']");
    var $dayLast = doc.querySelector("[data-js='dayLast']");
    var $descritionPrev1 = doc.querySelector("[data-js='descriptionPrevision1']");
    var $descritionPrev2 = doc.querySelector("[data-js='descriptionPrevision2']");
    var $descritionPrev3 = doc.querySelector("[data-js='descriptionPrevision3']");
    var linkReq  = "https://apiadvisor.climatempo.com.br";
    
    //Inicio eventos click
    $btn.addEventListener("click",execAjax,false);

    $textSearch.addEventListener("keydown",(e)=>{
        let enter = 13;
        if(e.which == enter){
            execAjax();
        }
    });



    $close.addEventListener("click",function(e){
        doc.querySelector(".background").removeChild($blockRight);
        doc.querySelector(".background").removeChild($tipMain);
        $status.src = "img/down.png";
        showFavorite();
    },false)
    //Fim eventos click

    function showFavorite(){
        $("[data-js='favorite']").fadeIn(1000);
    }
    function hideFavorite(){
        $("[data-js='favorite']").fadeOut(1000);
    }
    
    function checkModal(){
        if(doc.querySelectorAll("[data-js='blockRight']").length === 1){
            doc.querySelector(".background").removeChild($blockRight);
            doc.querySelector(".background").removeChild($tipMain);
            showFavorite();
        }
    }
    function loadEnd(){
        $(".loader--loading").fadeOut("slow",function(){
            $(".button").fadeIn("fast");
        });
    }

    function errorSearch(data){
            if(data.length === 0){
                $errorMessage.textContent = `Cidade ${$textSearch.value} não existe.`
                $status.src = "img/error.png";
                loadEnd();
                checkModal();
                return true;
            }
        return
    }


    function execAjax(){
        //carregar
        checkModal();
        $(".button").fadeOut(1,function(){
            $(".loader--loading").fadeIn("fast");
        });
        hideFavorite();

       $.get(`${linkReq}/api/v1/locale/city?name=${$textSearch.value}&token=1db6b6239f44145c4ae69aac35b437a6`, (data) =>{
            if(errorSearch(data)){
                return
            }
            let idCity = data[0].id; 
            $.get(`${linkReq}/api/v1/weather/locale/${idCity}/current?token=1db6b6239f44145c4ae69aac35b437a6`,(data)=>{
                doc.querySelector(".background").appendChild($blockRight);
                $city.textContent = `${data.name} - ${data.state}` 
                $description.textContent = data.data.condition;
                $imgTemp.src = `img/realistic/70px/${data.data.icon}.png`
                $tempC.textContent = `${data.data.temperature}º`
                $sensation.textContent = `${data.data.sensation}º`
                $sensation.textContent = `${data.data.sensation}º`
                $humidity.textContent = `${data.data.humidity}%`
                $wind.textContent = `${data.data.wind_velocity} km/h`
                $errorMessage.textContent = "";
                $status.src = "img/sucess.png";
                $blockRight.style.display = "block";
                $textSearch.value = "";

                $.get(`${linkReq}/api/v1/forecast/locale/${idCity}/days/15?token=1db6b6239f44145c4ae69aac35b437a6`,(data) =>{
                    $prevImg1.src = `img/realistic/70px/${data.data[0].text_icon.icon.day}.png`;
                    $prevImg2.src = `img/realistic/70px/${data.data[1].text_icon.icon.day}.png`;
                    $prevImg3.src = `img/realistic/70px/${data.data[2].text_icon.icon.day}.png`;
                    $prevCMax1.textContent = `Max: ${data.data[0].temperature.max}º`
                    $prevCMax2.textContent = `Max: ${data.data[1].temperature.max}º`
                    $prevCMax3.textContent = `Max: ${data.data[2].temperature.max}º`
                    $prevCMin1.textContent = `Min: ${data.data[0].temperature.min}º`
                    $prevCMin2.textContent = `Min: ${data.data[1].temperature.min}º`
                    $prevCMin3.textContent = `Min: ${data.data[2].temperature.min}º`
                    $dayLast.textContent = `${data.data[2].date_br}`
                    $descritionPrev1.textContent = `${data.data[0].text_icon.text.phrase.reduced}`
                    $descritionPrev2.textContent = `${data.data[1].text_icon.text.phrase.reduced}`
                    $descritionPrev3.textContent = `${data.data[2].text_icon.text.phrase.reduced}`
                    $tipMain.style.display = "flex";
                    doc.querySelector(".background").appendChild($tipMain);
                }).always(function(){
                    loadEnd();
                })
            }
            )
       })
    }

})(document)