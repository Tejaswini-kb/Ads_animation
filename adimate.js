function animateViaCss(options)
{
    options.div.classList.add(options.effect);
}
function animation(options)
{
    if(options.effect == 'zoom')
    {
        zoomHandler(options);
    }
    else if(options.event == 'scroll')
    {
        window.addEventListener('scroll', function() {
            scrollAnimation(options);
        }, false);
    }
    else if(options.event == 'mouseover')
    {
        options.div.addEventListener('mouseover', function() {
            hoverAnimation(options);
        }, false);
    }
  }
function defaultOptions(options)
{
    defaultObject = {
        div: document.getElementById('third_image'),
        effect: 'default_pulse',
        event: 'scroll',
        onAnimationStart: function() {},
        onAnimationStop: function() {},
    };
    for(var key in options)
    {
        defaultObject[key]=options[key];
    }
    return defaultObject;
}
 function adimate(options) {
    animation(defaultOptions(options));
 }
