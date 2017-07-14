function $(selector){
  return document.querySelector(selector);
}

window.onload = function(){
  $("button").addEventListener("click", function(){
    var url = $("input").value;
    $(".res1 .url-encoded").innerHTML = escape(url);
    $(".res2 .url-encoded").innerHTML = encodeURI(url);
    $(".res3 .url-encoded").innerHTML = encodeURIComponent(url);
  })
}