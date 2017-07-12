function $(selector){
  return document.querySelector(selector);
}

function $parent(ele, tagName){
  var parent = ele.parentNode;
  while(parent && parent!=document.body && parent.tagName.toLowerCase() !== tagName){
      parent = parent.parentNode;
  }
  if(parent.tagName.toLowerCase() == tagName){
    return parent;
  }
  return null;
}

function getTpl(todo){
  var li = document.createElement("li");
  li.innerHTML = [
      '<label>',
        '<input type="checkbox" />',
        '<span>' + todo + '</span>',
      '</label>'
  ].join('');
  return li;
}

window.onload = function(){
  var ul = $("ul");
  var insertBtn = $(".insert-btn");
  var modifyBtn = $(".modify-btn");
  var deleteBtn = $(".delete-btn");
  var doneBtn = $(".done-btn");
  var input = $("input[type='text']");
  ul.addEventListener("click", function(e){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    var checkedNum = checkedInputs.length;


    //选中一个的时候，可以插入和修改
    if(checkedNum == 1){
        modifyBtn.disabled = false;
    } else{
        modifyBtn.disabled = true;
    }

  });

  //删除
  deleteBtn.addEventListener("click", function(e){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    checkedInputs.forEach(ele => {
      var li = $parent(ele, "li");
      li.parentNode.removeChild(li);
    })
  });

  //修改
  modifyBtn.addEventListener("click", function(e){
    var text = this.innerText;
    var checked = $("input[type='checkbox']:checked");

    if(text == "修改"){
      this.innerText = "保存";
      input.value = checked.nextElementSibling.innerText;
    }else{
      this.innerText = "修改";
      checked.nextElementSibling.innerText = input.value;
      input.value = "";
    }

  });


  //插入
  insertBtn.addEventListener("click", function(e){
    var todo = input.value;
    if(!todo){
      return false;
    }
    ul.appendChild(getTpl(todo));
    input.value = "";
  });


  //完成
  doneBtn.addEventListener("click", function(){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    checkedInputs.forEach(checkbox => {
      checkbox.parentNode.classList.add("completed");
    })
  })
}