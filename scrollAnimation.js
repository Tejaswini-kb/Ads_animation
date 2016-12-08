var el = this;
function elementInViewport(el)
{
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
function scrollAnimation(options)
{
    if(elementInViewport(options.div))
    {
        animateViaCss(options);
    }
    else if(!elementInViewport(options.div))
    {
        options.div.classList.remove(options.effect);
    }
}
