var person;
resetPerson();

$(function () {

    renderGrid();

    $(".col").click(function () {
        openModal(this);
    });

    $(".col").bind('touchstart', function () {
        this.classList.toggle('hover');
    });

});

function openModal(elem) {
    person.curr = $(elem);
    person.young = getYoungImage(person.curr.data("number"));
    person.old = getOldImage(person.curr.data("number"));


    let x = "-webkit-cross-fade(url('" + person.young + "'), url('" + person.old + "'), " + 0 + ")";
    $("#modal-content").css("background-image", x);

    $("#shwcounter").text(person.counter);

    $("#myModal").show();

    $("#addcounter").click(function () {
        crossfadeImage();
    });

    //register close event
    $("#solved").click(function () {
        imageSolved();
    });
}


function renderGrid() {
    /* render the tiles */
    for (var i = 1; i <= data.length; i++) {
        $(".cols").append(getTile(i, data[i - 1]));
    }
}


function getTile(cnt, data) {

    var myvar = '<div class="col" data-number="' + cnt + '">' +
        '                      <div class="container">' +
        '                          <div class="front" >' +
        '                              <div class="inner">' +
        '                                  <p>' + cnt + '</p>' +
        '                    <span>' + data.txt1 + '</span>' +
        '                              </div>' +
        '                          </div>' +
        '                          <div class="back w3-sepia-max" style="background-image: url(' + getYoungImage(cnt) + ')">' +
        '                              <div class="topright"></div>' +
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
    $("#firstname").text(data[person.curr.data("number") - 1].firstname);
    $("#lastname").text(data[person.curr.data("number") - 1].lastname);
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

    $("#myModal").removeClass("zoom").addClass("zoomout");

    window.setTimeout(function () {
        $("#myModal").hide();
        $("#myModal").removeClass("zoomout").addClass("zoom");
    }, 2000);
}

/* increase the counter and cross fade the persons images */
function crossfadeImage() {

    person.counter = person.counter + 2;

    if (person.counter <= 100) {
        $("#shwcounter").text(person.counter);
        let x = "-webkit-cross-fade(url('" + person.young + "'), url('" + person.old + "'), " + (person.counter / 100) + ")"
        $("#modal-content").css("background-image", x);
    } else {
        person.counter = 100;
    }
}

function getYoungImage(cnt) {
    return "./fotos/" + cnt + "Y.png";
}

function getOldImage(cnt) {
    return "./fotos/" + cnt + "O.png";
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