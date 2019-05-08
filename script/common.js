var person, data;

resetPerson();

$(function () {

    data = shuffle(xdata);

    renderBackground();

    renderGrid();

    $(".col").click(function () {
        openSingle(this);
    }); 

    $(".col").bind('touchstart', function () {
        this.classList.toggle('hover');
    });

});


function openSingle(elem){

    //render black background
    renderBackground1();

    person.curr = $(elem);
    person.young = getYoungImage(person.curr.data("number"));
    person.old = getOldImage(person.curr.data("number"));

    $("#imgY").attr("src",person.young).css("opacity", 1);
    $("#imgO").attr("src",person.old ).css("opacity", 0);

    $("#mimgY").attr("src",person.young).css("opacity", 1);
    $("#mimgO").attr("src",person.old ).css("opacity", 0);


    $(".single").show();
    $(".wrapper").hide();

    $("#div1").click(function () {
        crossfadeImage();
    });

    $("#shwcounter").click(function () {
        crossfadeImage();
    });

    //register close event
    $(".solved").click(function () {
        imageSolved();
    });

}

function renderGrid() {

    /* render the tiles */
    for (var i = 0; i < data.length; i++) {
        $(".cols").append(getTile(i, data[i]));
    }
}

function getTile(cnt, data) {

    var myvar = '<div class="col" data-number="' + (cnt) + '">' +
        '                      <div class="container">' +
        '                          <div class="front" ><div class="topright"></div>' +
        '                              <div class="inner">' +
        '                                  <p>' + (cnt + 1) + '</p>' +
        '                    <span>' + data.txt1 + '</span>' +
        '                              </div>' +
        '                          </div>' +
        '                          <div class="back w3-sepia-max" style="background-image: url(' + "./fotos/" + data.imgY + ')">' +
        '                              <div class="inner">' +
        '                                <p id="mt">' + data.txt2 + '</p>' +
        '                              </div>' +
        '                          </div>' +
        '                      </div>' +
        '                  </div>';

    return myvar;
}

function imageSolved() {

    //show name in picture
    $("#firstname").text(data[person.curr.data("number")].firstname);
    $("#lastname").text(data[person.curr.data("number")].lastname);
    $("#person").removeClass("w3-hide").addClass("w3-show");
    //close the picture
    window.setTimeout(resetAfterSolving, 3000);

}

function resetAfterSolving() {
    $("#person").removeClass("w3-show").addClass("w3-hide");
    $(person.curr).css("background-image", "url('" + person.young + "')");
    $(person.curr).css("background-size", "cover");
    $(person.curr).find(".inner").empty();
    $(person.curr).find(".back").removeClass("w3-sepia-max").css("background-image", "url('" + person.old + "')");
    $(person.curr).find(".topright").text(person.counter);
    $(person.curr).off().unbind().addClass("w3-round-large");

    resetPerson();

    $(".single").removeClass("zoom").addClass("zoomout");

    window.setTimeout(function () {
        $(".single").hide();
        $(".wrapper").show();
        $(".single").removeClass("zoomout").addClass("zoom");
    }, 2000);
}

/* increase the counter and cross fade the persons images */
function crossfadeImage() {

    person.counter = person.counter + 2;

    if (person.counter <= 100) {
        $("#shwcounter").text(person.counter);

        $("#imgY").css("opacity", 1 - (person.counter / 100));
        $("#imgO").css("opacity", 0 + (person.counter / 100));

    } else {
        person.counter = 100;
    }
}

function getYoungImage(cnt) {
    return "./fotos/" + data[cnt].imgY;
}

function getOldImage(cnt) {
    return "./fotos/" + data[cnt].imgO;
}

/* reset the global image variable */
function resetPerson() {
    person = {
        young: "",
        old: "",
        curr: "",
        counter: 0
    };
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}