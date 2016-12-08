function removeAnimation(options)
{
    options.div.classList.remove(options.effect);
}
function hoverAnimation(options)
{
    animateViaCss(options);
    setTimeout(function() {
		removeAnimation(options);
 }, 5000);
}
