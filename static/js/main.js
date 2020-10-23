$(document).ready(function () {
    const content = $('.cup-search-content-inner');
    const par_el = $('.depth-one');
    var current_pos = 0;
    var lastScrollPosition = 0;

    const heightContainer = $('.cup-search-content-outer');
    const depthOneHeight = 1070;

    initialHeight = $('.depth-one').height();
    heightContainer.css('min-height', initialHeight);

    const answerId = '#' + window.location.hash.substr(1);
    const directLink = answerId.includes('q');

    function isDoubleClicked(element) {
        /*
         * if already clicked, return TRUE to
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
        setDivHeight($(this), 'fwd');
        // content_el

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
        setDivHeight($(this), 'bck');

        // hide topic
        setTimeout(function () {
            content_el.addClass('v-hide');
        }, 500);

        // move element out of view
        current_pos += 100;
        par_el.css('left', current_pos + '%');
    });

    $('.scroll-up').click(() => {
        // remember current scroll Y position and then
        // scroll to top of page
        lastScrollPosition = window.scrollY;
        window.scrollTo(0, 0);
    });

    $('.scroll-reset').click(() => {
        // scroll to last saved scrtoll Y position
        window.scrollTo(0, lastScrollPosition);
    });

    // science container toggle
    $('.science-title').click(function () {
        $(this).next().slideToggle();
        $(this).find('.icon-arrow').toggleClass('rotate-180');
    });

    // Navigate to new question from a 'related question' link
    $('.related-question').click(function () {
        let targetId = this.dataset.dest;
        let answerContainer = $(this).closest('.depth-three');
        $(answerContainer).toggleClass('v-hide');
        content.find('#' + targetId).toggleClass('v-hide');
        window.scrollTo(0, 0);

        setDivHeight($(this), targetId);
    });

    function setDivHeight(el, dir) {
        // find and set height of element being brought into view
        if (dir == 'fwd') {
            var foo = el.next();
            heightContainer.css('min-height', foo.height());
        }

        // find and set height of element user is going back to
        else if (dir == 'bck') {
            var foo = el.parent();
            // if going baclk to top level, set base height
            if (foo.hasClass('depth-two')) {
                heightContainer.css('min-height', depthOneHeight);
            }
            // if going back to q category, set height for that category
            if (foo.hasClass('depth-three')) {
                qqq = foo.closest('.depth-two');
                heightContainer.css('min-height', qqq.height());
            }

            // to capture and set heights when navigating between
            // 'related-questions' and when a user us linked directly
            // to an answer.
        } else {
            foo = $('#' + dir).height();
            heightContainer.css('min-height', foo);
        }
    }

    // Dynamically adjust container height based on content
    // const heightContainer = $('.cup-search-content-outer');
    // const depthOneHeight = 1070;

    // eee = $('.depth-one').height();
    // console.log(eee);
    // heightContainer.css('min-height', eee);

    // const answerId = '#' + window.location.hash.substr(1);
    // const directLink = answerId.includes('q');

    // if the url contains an anchor to a question that exists
    if (directLink && $(answerId).length) {
        answerElement = content.find(answerId);
        // unhide the answer element and its parent category container
        answerElement.closest('.depth-two').toggleClass('v-hide');
        answerElement.toggleClass('v-hide');
        // shift the elements over to bring into view
        current_pos -= 200;
        par_el.css('left', current_pos + '%');

        // set container height
        setDivHeight(null, answerId.substring(1));
    }
});



// Build links for share icons - build dynamically when clicked

$('.share-icon').click(function () {
    let pageUrl = 'https://beyouonline.co.uk/pages/menstrual-cup-search';
    let answer = $(this).closest('.depth-three').attr('id');
    let question = $(this).closest('.depth-three').find('h4').text();
    let qUrl = encodeURIComponent(`${pageUrl}#${answer}`.trim());
    let qText = encodeURIComponent(`${question}`.trim());
    let shareMedia = encodeURIComponent('https://cdn.shopify.com/s/files/1/0004/9659/9091/products/Menstrual_Cup_-_Main_Image-womenshealth3_b7325c0e-bebc-43e9-9a77-edfc184f2779.jpg?v=1588437734'.trim());

    switch (this.className.split(' ')[1]) {
        case 'share-fb':
            let fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?';
            var url = `${fbShareUrl}u=${qUrl}&t=${qText}`
            window.open(url, '_blank');
            break;
        case 'share-tw':
            let twShareUrl = 'https://twitter.com/intent/tweet?'
            var url = `${twShareUrl}text=${qText}?%0D%0A${qUrl}`
            window.open(url, '_blank');
            break;
        case 'share-pn':
            console.log(url)
            PinUtils.pinOne({
                'url': qUrl,
                'description': qText,
                'media': shareMedia
             });
            break;
        case 'share-wa':
            let waShareUrl = 'https://wa.me/?';
            var url = `${waShareUrl}text=${qText}? ${qUrl}`
            window.open(url, '_blank');
            break;
    }
});


// https://wa.me/?text=urlencodedtext

