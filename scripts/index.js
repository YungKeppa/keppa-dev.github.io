$(function() {

    // Style toggle tooltips.
    $('[data-toggle="tooltip"]').tooltip({delay: {hide: 3000}});

    var timelineBoxes = $(".timeline-event, .timeline-line");
    var tl = new TimelineLite({
        onUpdate: updateSlider,
        onComplete: onComplete
    });

    // Create a Slider to Control Playback
    $("#slider").slider({
        range: false,
        min: 0,
        max: 100,
        step: .1,
        orientation: "vertical",
        slide: function(event, ui) {
            tl.pause();
            //adjust the timeline’s progress() based on slider value
            tl.progress(1 - ui.value / 100);
            $(".ui-slider-handle").css("background", "black");
        }
    });

    // updateSlider function
    function updateSlider() {
        $(".ui-slider-handle").css("background", "white");
        $("#slider").slider("value", 100 - tl.progress() * 100);
    };

    function onComplete() {
        $(".ui-slider-handle").css("background", "black");
    }

    $(".ui-slider-handle").click(function() {
        if (tl.progress() == 1) {
            tl.restart();
        }
        else {
            tl.resume();
        } 
    });

    tl.staggerFrom(timelineBoxes, 1, {x: '-=100', autoAlpha: 0, ease:Power1.easeInOut}, 0.5);

});
