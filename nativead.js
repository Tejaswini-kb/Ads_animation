(function(){
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while(el.offsetParent) {
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

  function getElementBySrc(value){
    return document.querySelector("[src=\""+value+"\"]");
  }

  function setIframeDimension(data){
    var iframeid = getElementBySrc(data.value.href).id;
    document.getElementById(iframeid).style.height = data.value.height+"px";
  }

  var scrollTimeout = 0;

  function startWatching(data) {
    var iframeId = getElementBySrc(data.value.href).id;
    window.onscroll = function(event){
      clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function(){
          var childWindow = document.getElementById(iframeId).contentWindow;
          childWindow.postMessage('Stop animation','*');
        }, 100);

        scrollHandler(iframeId);
    };
  }

  var lastScrollTop = 0;

  function scrollHandler(iframeId){
    var divId = document.getElementById(iframeId).parentNode.id;
    var iframeDiv = document.getElementById(divId);
    var childWindow = document.getElementById(iframeId).contentWindow;
    var data;
    if(elementInViewport(iframeDiv)){
      scrolledTop = window.scrollY;
      if(scrolledTop < lastScrollTop){
        data = {'action' : 'Up'};
      }
      else{
        data = {'action' : 'Down'};
      }
      childWindow.postMessage(data,'*');
      lastScrollTop = scrolledTop;
    }
  }

  function listener(event){
    if( typeof(event.data) == 'object' && 'action' in event.data){
      if(event.data.action == 'init'){
        startWatching(event.data);
      }
      else if(event.data.action == 'height'){
        setIframeDimension(event.data);
      }
    }
  }

  if (window.addEventListener){ 
    addEventListener("message", listener, false);
  } 
  else{
    attachEvent("onmessage", listener);
  }
})();

