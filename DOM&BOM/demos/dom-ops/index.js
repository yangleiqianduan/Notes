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

function getTodoItemHTML(todo){
  var li = document.createElement("li");
  li.innerHTML = [
      '<input type="checkbox" />',
      '<div contenteditable class="todo-item-content">' + todo + '</div>'
  ].join('');
  return li;
}

window.onload = function(){
  var ul = $("ul");
  var insertBtn = $(".insert-btn");
  var deleteBtn = $(".delete-btn");
  var doneBtn = $(".done-btn");
  var unDoneBtn = $(".undone-btn");
  var input = $("input[type='text']");


  //删除
  deleteBtn.addEventListener("click", function(e){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    checkedInputs.forEach(ele => ele.parentNode.remove())
  });


  //插入
  insertBtn.addEventListener("click", function(e){
    var todo = input.value;
    if(!todo){
      return false;
    }
    ul.appendChild(getTodoItemHTML(todo));
    input.value = "";
  });


  //完成
  doneBtn.addEventListener("click", function(){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    checkedInputs.forEach(checkbox => {
      checkbox.parentNode.classList.add("completed");
      checkbox.nextElementSibling.setAttribute("contenteditable", false);
    })
  });

  //open
  unDoneBtn.addEventListener("click", function(){
    var checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    checkedInputs.forEach(checkbox => {
      checkbox.parentNode.classList.remove("completed");
      checkbox.nextElementSibling.setAttribute("contenteditable", true);
    })
  })
}