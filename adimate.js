 var el = this;
function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}
function animate(mode, dir, div_id) {
    if (mode == 'zoom') {
        if (dir == 'up') {
            zoomAnimation.in();
        } else if (dir == 'down') {
            zoomAnimation.out();
        }
    } else if (mode == 'pulse') {
        div_id.classList.add(dir)
            //console.log(image_div.classList);
    } else if (mode == 'wobble') {
        div_id.classList.add(dir);
    } else if (mode == 'buzz') {
        div_id.classList.add(dir);
    }

}

function animation(options) {
    console.log(options.effect);
    if (elementInViewport(options.div)) {
        if (!(options.div.classList.contains(options.effect))) {
            if (options.effect == 'hvr-buzz-out') {
                animate('buzz', options.effect, options.div);
            } else if (options.effect == 'hvr-pulse') {
                animate('pulse', options.effect, options.div);
            } else if (options.effect == 'hvr-wobble-vertical') {
                animate('wobble', options.effect, options.div);
            }
        }
    } else {
        options.div.classList.remove(options.effect);
    }
}

function adimate(options) {
    $('head').append('<link rel="stylesheet" type="text/css" href="style.css">');
    if (options.event == 'scroll') {
        console.log('scroll');
        window.addEventListener('scroll', function() {
            animation(options);
        }, false);
    }
     if (options.event == 'hover') {
        console.log("hover");
        window.addEventListener('mouseover', function() {
            animation(options);
        }, false);
    }

}
