function $(selector){
  return document.querySelector(selector);
}

const CLEAR_COOKIE_CLASS = ".clear-cookie",
      CLEAR_LOCAL_STORAGE_CLASS = ".clear-local",
      CLEAR_SESSION_STORAGE_CLASS = ".clear-session";


class Cookie {
    getCookie(name){
        let cookies = this.getCookies();
        return cookies[name];
    }

    getCookies(){
        let arr = document.cookie.split(";"),
            cookies = {};
        arr.forEach(str => {
            if(!str || !str.trim())
                return false;
            let temp = str.split("=");
            var name = temp[0] && temp[0].trim();
            var value = temp[1] && temp[1].trim();
            cookies[name] = value;
        });
        return cookies;
    }

    setCookie(cookie){
        document.cookie = `${cookie.name}=${cookie.value}`;
    }
}

function setCount(space, num){
  $(`#${space} .count`).innerHTML = `${space}记录的访问次数：${num}`;
}


window.onload = function(){

  var ck = new Cookie();
  var visit_num = ck.getCookie("visit_num") || 0;
  setCount("cookie", visit_num);
  ck.setCookie({name: "visit_num", value: ++visit_num});

  var visit_num_local = localStorage.getItem("visit_num") || 0;
  localStorage.setItem("visit_num", ++visit_num_local);
  setCount("local-storage", visit_num_local);

  var visit_num_session = sessionStorage.getItem("visit_num") || 0;
  sessionStorage.setItem("visit_num", ++visit_num_session);
  setCount("session-storage", visit_num_session);


  [CLEAR_COOKIE_CLASS, CLEAR_LOCAL_STORAGE_CLASS, CLEAR_SESSION_STORAGE_CLASS].forEach(selector => {
    $(selector).addEventListener("click", function(){
      switch (selector){
        case CLEAR_COOKIE_CLASS:
          ck.setCookie({name: "visit_num", value: 0});
          setCount("cookie", 0);
          break;
        case CLEAR_LOCAL_STORAGE_CLASS:
          localStorage.setItem("visit_num", 0);
          setCount("local-storage", 0);
          break;
        case CLEAR_SESSION_STORAGE_CLASS:
          sessionStorage.setItem("visit_num", 0);
          setCount("session-storage", 0);
          break;
      }
    })
  })
}


