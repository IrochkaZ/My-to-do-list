var todoList = document.querySelector('.to_do ul');
var inProgressList = document.querySelector('.in_prog ul');
var inDoneList = document.querySelector('.done ul');
var todoInput = document.getElementById('todoInput');
var addTodoButton = document.getElementById('createTodo');
var clearListButtonAll = document.querySelectorAll('.delete_all');
var dateAdd = document.getElementById('dates');
var countTodo = document.querySelector('.to_do h2 span');
var countInProgress = document.querySelector('.in_prog h2 span');
var countInDone = document.querySelector('.done h2 span');
var consist = document.querySelector('.consist');
var modal = document.getElementById("myModal");
var buttonOk =document.querySelector(".btnok");
var btnCancel = document.querySelector('.btn:first-child');

var modalTask = '';
var nodeToDel ='';

//функция для задания счетчика:
function countTasks(cont, cont2){
    cont.innerText = cont2.childElementCount;
}
//функция для создания списка:
function createToDo(text, date){
    var newTodo = document.createElement('li');
    var newTodoText = document.createElement('p');
    newTodoText.innerText = text;
    newTodo.append(newTodoText);
    var newTodoDate = document.createElement('p');
    newTodoDate.innerText = date;
    newTodo.append(newTodoDate);
    createDeleteButton(newTodo);
    createMoveButton(newTodo);
    createEditButton(newTodo);
    return newTodo;
}
//функция которая задает кнопку удаления
function createDeleteButton(cont){
    var deleteBut = document.createElement('button');
    deleteBut.classList.add('del');
    cont.append(deleteBut);
    deleteBut.title = 'Delete task';
}
//функция которая задает кнопку перемещения
function createMoveButton(cont){
    var moveBut = document.createElement('button');
    moveBut.classList.add('move');
    cont.append(moveBut);
    moveBut.title = 'Move task to the next block';
}
//функция которая создает кнопку Изменить
function createEditButton(cont){
    var editButton = document.createElement('button');
    editButton.classList.add('edit');
    cont.append(editButton);
    editButton.title = 'Edit task';
}

addTodoButton.addEventListener('click', function(event){
    event.preventDefault(); //отмена Действия браузера по умолчанию
    if(dateAdd.value==""){
        var d = new Date();
        if(d.getDate()<=9){
            var getDay = '0'+d.getDate();
        }else{
            var getDay = d.getDate();
        }

        if(d.getMonth()<=9){
            var getMonth = '0'+parseInt(d.getMonth()+1);
        }else{
            var getMonth = d.getMonth()+1;
        }
        var now = getDay+"-"+getMonth+"-"+d.getFullYear();
        var newDate = now;
    }else{
        newDate = dateAdd.value;
    }
    if(todoInput.value !== ''){
        todoList.append(createToDo(todoInput.value, newDate));
    countTasks(countTodo, todoList);
    todoInput.value = '';
    }else {
        alert('Please,fill required fields');
    }
});
//делегирование событий:
consist.addEventListener('click', removeAll);

function removeAll(event){
    var elem =  event.target;
        if(elem.classList.contains('delete_all') && elem.parentNode.classList.contains('to_do')){
            todoList.innerHTML ='';
            countTasks(countTodo, todoList);
        }
        if(elem.classList.contains('delete_all') && elem.parentNode.classList.contains('in_prog')){
                var modalBody = document.querySelector('.modalBody > p').innerText = 'Want to delete all tasks?';
                modal.querySelector('.cancel').style.display = '';
                modal.style.display = 'block';
                modalTask ='in_prog';

    }

        if(elem.classList.contains('delete_all') && elem.parentNode.classList.contains('done')){
            inDoneList.innerHTML ='';
            countTasks(countInDone, inDoneList);
    }
}
//навешивание событий:
todoList.addEventListener('click', function(event){
	if(event.target.className == "del"){
        todoList.removeChild(event.target.parentNode);
        countTasks(countTodo, todoList);
    }

    if(event.target.className == "move"){
        if(inProgressList.childElementCount<=5){
            if(event.target.parentElement.parentElement.parentElement.className=='to_do'){
                var toProgress = event.target.parentElement;
                todoList.removeChild(event.target.parentNode);
                inProgressList.append(toProgress);
                countTasks(countTodo, todoList);
                countTasks(countInProgress, inProgressList);
            }

            if(inProgressList.childElementCount>5){
                var modalHeader = document.querySelector('.modalHeader');
                modalHeader.innerHTML = "NOTE";
                var modalBody = document.querySelector('.modalBody');
                modalBody.innerHTML = "<p>Please, complete tasks in progress tab. In Progress tab could be only 6 tasks</p>";
                document.querySelector('.cancel').style.display = 'none';
                modal.style.display = 'block';
                modalTask = '6taskcom';
            }
        }
    }

    if(event.target.className == "edit"){
        var getTask = event.target.parentNode.querySelector('p:first-child');
        if (getTask.contentEditable == "true") {
            getTask.contentEditable = "false";
            getTask.style.border = 'none';
            } else {
                getTask.contentEditable = "true";
                getTask.style.border = '2px solid #000';
            }
    }
});

inProgressList.addEventListener('click', function(event){
	if(event.target.className == "del"){
        var modalBody = document.querySelector('.modalBody > p').innerText = 'Want to delete?';
        modal.querySelector('.cancel').style.display = '';
        modal.style.display = 'block';
        modalTask ='in_prog_one';
        nodeToDel =event.target.parentNode;
    }
    if(event.target.className == "move"){
        if(event.target.parentElement.parentElement.parentElement.className=='in_prog'){
            var toDone = event.target.parentElement;
            inProgressList.removeChild(event.target.parentNode);
            inDoneList.append(toDone);
            countTasks(countInProgress, inProgressList);
            countTasks(countInDone, inDoneList);
        }
    }
    if(event.target.className == "edit"){
        var getTask = event.target.parentNode.querySelector('p:first-child');
        if (getTask.contentEditable == "true") {
            getTask.contentEditable = "false";
            getTask.style.border = 'none';
            } else {
                getTask.contentEditable = "true";
                getTask.style.border = '2px solid #000';
            }
    }
});

inDoneList.addEventListener('click', function(event){
	if(event.target.className == "del"){
        this.removeChild(event.target.parentNode);
        countTasks(countInDone, inDoneList);
    }
    if(event.target.className == "move"){
        if(event.target.parentElement.parentElement.parentElement.className=='done'){
            var toList = event.target.parentElement;
            this.removeChild(event.target.parentNode);
            todoList.append(toList);
            countTasks(countInDone, inDoneList);
            countTasks(countTodo, todoList);
        }
    }
})

modal.addEventListener('click', function(event){
    if(event.target.classList.contains('btnok') && modalTask === 'in_prog'){
        inProgressList.innerHTML = '';
        countTasks(countInProgress, inProgressList);
        modal.style.display = 'none';
    }

    if(event.target.classList.contains('btnok') && modalTask === '6taskcom'){
        modal.style.display = 'none';
    }

    if(event.target.classList.contains('btnok') && modalTask === 'in_prog_one'){
        modal.style.display = 'none';
        nodeToDel.remove();
        countTasks(countInProgress, inProgressList);
    }

    if(event.target.classList.contains('cancel')) {
        modal.style.display = 'none';
    }
});
