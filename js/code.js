"use strict";
const taskList = document.querySelector('ul');
loadData();
hidespisok();
//удаление
let delTask = document.getElementsByClassName('delete-task');
for (let delT of delTask){
    delT.onclick = function() {
    let div = this.parentElement.parentElement;
    div.innerHTML = '';
    let ul = div.parentElement;
    ul.removeChild(div);
    hidespisok();
   }
  saveData();
}
//выполнен
let redTask = document.getElementsByClassName('ready'); 
for (let redT of redTask){
    redT.onclick = function() {
    let span = this.parentElement.previousElementSibling;
    span.setAttribute('contenteditable',false);
    let li = span.parentElement;
    let ul = li.parentElement;
    ul.appendChild(li);
    span.className = "task-title--done";
    redT.remove();
    
}
  saveData();
}
//появление "дел нет"
function hidespisok(){
/*if(taskList.children.length>1)
{
    document.getElementById('empty-list-item').style.visibility = "hidden";
}
else{
    document.getElementById('empty-list-item').style.visibility ="visible";
}
  saveData();
}*/
//добавление новой задачи
let form = document.querySelector('#newTaskForm');
let taskText = document.querySelector('#addNewTask');
let firstel = document.querySelector('#empty-list-item');
function newElement(event){

    event.preventDefault();
    if (taskText === '') {
      alert("Вы должны заполнить поле!");
  }
    let task = taskText.value;
   let taskHTML = `<li class="list-group-item d-flex justify-content-between">\
    <span contenteditable="true" class="task-title">${task}</span>\
    <div>\
        <button type="button" class="ready" class="btn btn-light align-self-end">Готово</button>\
        <button type="button" class="delete-task" class="btn btn-light align-self-end">Удалить</button>\
    </div>\
</li>`;
firstel.insertAdjacentHTML('afterend',taskHTML);
hidespisok();
taskText.value='';
for (let delT of delTask) {
    delT.onclick = function() {
      let div = this.parentElement.parentElement;
    div.innerHTML = '';
    let ul = div.parentElement;
     ul.removeChild(div);
    hidespisok();
    }
  }
for (let redT of redTask) {
      redT.onclick = function() {
    let span = this.parentElement.previousElementSibling;
    span.setAttribute('contenteditable',false);
    span.className = "task-title--done";
    let li = span.parentElement;
    let ul = li.parentElement;
    ul.appendChild(li);
    redT.remove();
}
}
}
form.addEventListener('submit',newElement);
saveData();
//сохранение
function saveData(){
  localStorage.setItem('todoList',taskList.innerHTML);
}
//загрузка
function loadData(){
  if(localStorage.getItem('todoList')){
    taskList.innerHTML = localStorage.getItem('todoList');
  }
}
