const par_el = $('.depth-one');
var current_pos = 0;
var lastScrollPosition = 0;

function isDoubleClicked(element) {
    /*
     * if already clicked return TRUE to
     * indicate this click is not allowed
     */
    if (element.data('isclicked')) return true;

    // set time to remain 'clicked'
    element.data('isclicked', true);
    setTimeout(function () {
        element.removeData('isclicked');
    }, 1000);

    // return FALSE if NOT a double click
    return false;
}

$('.btn-fwd').click(function () {
    // Stop double clickings
    if (isDoubleClicked($(this))) return;

    // set consts
    const content_el = $(this).next();

    // show topic
    content_el.removeClass('v-hide');

    // move element into view
    current_pos -= 100;
    par_el.css('left', current_pos + '%');
});

$('.btn-bck').click(function () {
    // Stop double clickings
    if (isDoubleClicked($(this))) return;

    // set consts
    const content_el = $(this).parent();

    // hide topic
    setTimeout(function () {
        content_el.addClass('v-hide');
    }, 500);

    // move element out of view
    current_pos += 100;
    par_el.css('left', current_pos + '%');
});

$('.scroll-up').click( () => {
    // remember current scroll Y position and then
    // scroll to top of page
    lastScrollPosition = window.scrollY;
    window.scrollTo(0, 0);
});

$('.scroll-reset').click( () => {
    // scroll to last saved scrtoll Y position
    window.scrollTo(0, lastScrollPosition);
});

// science container toggle
$('.science-title').click(function() {
    $(this).next().slideToggle();
    $(this).find('.icon-arrow').toggleClass('rotate-180');
})

function relatedQuestionBtn (el) {
    let targetId = el.dataset.dest;
    var foo = $(el).closest('.depth-three');
    $(foo).toggleClass('v-hide');
    $('.cup-search-content-inner').find('#' + targetId).toggleClass('v-hide');
    window.scrollTo(0, 0);
}