 var el = this;
 
  function setTransform(elem,value){
      elem.style.transform = value;
      elem.style.webkitTransform = value;
      elem.style.MozTransform = value;
      elem.style.msTransform = value;
  }
  var zoomAnimation = {
    zoom : 1.12,
    maxBoundary : 1.19,
    minBoundary : 1,
    zoom_rate : 0.0055,
    elem_id: "image-area",

    apply_scale: function() {
      var elem = document.getElementById(zoomAnimation.elem_id);
      setTransform(elem, "scale("+zoomAnimation.zoom+")");
    },

    in: function(){
      if(zoomAnimation.zoom < zoomAnimation.maxBoundary){
        zoomAnimation.apply_scale(zoomAnimation.zoom);
        zoomAnimation.zoom+=zoomAnimation.zoom_rate;
      }
      else{
        zoomAnimation.zoom = zoomAnimation.maxBoundary;
      }
    },

    out: function (){
      if(zoomAnimation.zoom > zoomAnimation.minBoundary){
        zoomAnimation.apply_scale(zoomAnimation.zoom);
        zoomAnimation.zoom-=zoomAnimation.zoom_rate;
      }
      else{
        zoomAnimation.zoom = zoomAnimation.minBoundary;
      }
    }
  };

  function sendHeight() {
      var body   = document.body,
          html   = document.documentElement,
          win    = window.parent;
          height = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
      var values = {'height': height,'href': window.location.href};
      var data = {'value': values, 'action' : 'height'};
      win.postMessage(data,'*');
  }

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
     if (mode == 'pulse') {
        div_id.classList.add(dir);
    } else if (mode == 'wobble') {
        div_id.classList.add(dir);
    } else if (mode == 'buzz') {
        div_id.classList.add(dir);
    }
}

function animation(options) {
    if (options.effect == 'zoom') {
        listener(event);
            } 
    else if (elementInViewport(options.div)) {
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

function listener(event){
    if(event.data.action == 'Up'){
      zoomAnimation.in();
    }
    else if(event.data.action == 'Down'){
      zoomAnimation.out();
    }
  }

function adimate(options) {
    if (options.event == 'scroll') {
        window.addEventListener('scroll', function() {
            animation(options);
        }, false);
    }
     else if (options.event == 'hover') {
        window.addEventListener('mouseover', function() {
            animation(options);
        }, false);
    }
    else if(options.event == 'message'){
         window.addEventListener('message', function() {
             animation(options);
         }, false);
        }
  }
  