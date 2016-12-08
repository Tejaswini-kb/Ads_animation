function setTransform(elem, value)
{
     elem.style.transform = value;
     elem.style.webkitTransform = value;
     elem.style.MozTransform = value;
     elem.style.msTransform = value;
 }
 var zoomAnimation = {
     zoom: 1.12,
     maxBoundary: 1.19,
     minBoundary: 1,
     zoom_rate: 0.0055,
     elem_id: 'image-area',
     apply_scale: function() {
         var elem = document.getElementById(zoomAnimation.elem_id);
         setTransform(elem, 'scale(' + zoomAnimation.zoom + ')');
     },
     in: function() {
         if (zoomAnimation.zoom < zoomAnimation.maxBoundary) {
             zoomAnimation.apply_scale(zoomAnimation.zoom);
             zoomAnimation.zoom += zoomAnimation.zoom_rate;
         } else {
             zoomAnimation.zoom = zoomAnimation.maxBoundary;
         }
     },

     out: function() {
         if (zoomAnimation.zoom > zoomAnimation.minBoundary) {
             zoomAnimation.apply_scale(zoomAnimation.zoom);
             zoomAnimation.zoom -= zoomAnimation.zoom_rate;
         } else {
             zoomAnimation.zoom = zoomAnimation.minBoundary;
         }
     },
    };

function sendHeight()
{
     var body = document.body,
         html = document.documentElement,
         win = window.parent;
     height = Math.max(body.scrollHeight, body.offsetHeight,
         html.clientHeight, html.scrollHeight, html.offsetHeight);
     var values = {
         'height': height,
         'href': window.location.href,
     };
     var data = {
         'value': values,
         'action': 'height',
     };
     win.postMessage(data, '*');
 }
function listener(event)
{
    if(event.data.action == 'Up')
    {
            zoomAnimation.in();
    }
    else if(event.data.action == 'Down')
    {
            zoomAnimation.out();
    }
}
function zoomHandler(options)
{
    if(options.event !== 'message')
    {
        return false;
    }

    window.addEventListener('message', listener, false);
}
