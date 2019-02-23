var person;

resetPerson();

$(function () {

    renderGrid();

    //register close event
    $("#solved").click(function () {
        imageSolved();
    });

    $(".gridtile").hover(
        function () {
            let x = "url(https://picsum.photos/300/300?image=" + $(this).data("number") + ")";
            $(this).css("background-image", x);
        },
        function () {
            $(this).css("background-color", "013A6B");
            $(this).css("background-image", "-webkit-linear-gradient(45deg, #004E95 50%, #013A6B 50%)");
        }
    );

    $(".gridtile").click(function () {

        person.curr = $(this);
        person.young = getYoungImage(person.curr.data("number"));
        person.old = getOldImage(person.curr.data("number"));


        let x = "-webkit-cross-fade(url('" + person.young + "'), url('" + person.old + "'), " + 0 + ")";
        $("#modal-content").css("background-image", x);

        $("#shwcounter").text(person.counter);

        $("#myModal").show();
    });

    $("#addcounter").click(function () {
        crossfadeImage();
    });
});


function renderGrid() {
    /* render the tiles */
    for (var i = 1; i <= data.length; i++) {
        $(".grid").append(
            '<div class="gridtile" data-number="' + i + '"><div class="gridtilecontent">' +
            i +
            "</div></div>"
        );
    }
}

function imageSolved() {

    //show name in picture
    $("#firstname").text(data[person.curr.data("number")-1].firstname);
    $("#lastname").text(data[person.curr.data("number")-1].lastname);
    $("#person").removeClass("w3-hide").addClass("w3-show");
    //close the picture
    window.setTimeout(resetAfterSolving, 3000);

}

function resetAfterSolving() {
    $("#person").removeClass("w3-show").addClass("w3-hide");
    $(person.curr).css("background-image", "url(https://picsum.photos/300/300?image=666)");
    $(person.curr).off();
    $(person.curr).find(".gridtilecontent").text(person.counter);
    $(person.curr).find(".gridtilecontent").css("color", "red");
    resetPerson();

    $("#myModal").removeClass("zoom").addClass("zoomout");

    window.setTimeout(function () {
        $("#myModal").hide();
        $("#myModal").removeClass("zoomout").addClass("zoom");
    }, 3000);
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

/* reset the global image variable */
function resetPerson() {
    person = {
        young: "",
        old: "",
        curr: "",
        counter: 0
    };
}

function getYoungImage(cnt) {
    return "./fotos/" + cnt + "Y.png";
}

function getOldImage(cnt) {
    return "./fotos/" + cnt + "O.png";
}