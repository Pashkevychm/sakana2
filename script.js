function createTask(text) {
    let task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
    <div class="task-content">
        
        <span>${text}</span>
    </div>
    <div class="task-controls">
        <button class="move_right"></button>
        <button class="delete_btn"></button>
    </div>
    `;
    return task

}

function saveTasks(){
    let encodedHTML=encodeURIComponent(blocks.innerHTML);
    document.cookie= `tasks=${encodedHTML}; max-age=31536000; path=/`;
}

let blocks = document.querySelector(".blocks")

let cookies=document.cookie.split(';')
let savedTasks=false;
for(let i=0; i<cookies.length;i++){
    let key_vaule=cookies[i].trim().split("=")
    if(key_vaule[0]=='tasks'){
        savedTasks=decodeURIComponent(key_vaule[1])
        break
    }
}
if(savedTasks){
    blocks.innerHTML=savedTasks;
}

let todo_list= document.querySelector("#todo-list")
let inprogress_list= document.querySelector("#inprogress-list")
let done_list= document.querySelector("#done-list")
let input_field = document.querySelector(".inner_task")
let add_btn = document.querySelector(".button1")



add_btn.addEventListener("click", function(){
    let taskText = input_field.value.trim();
    if (taskText !== '') {
        let newTask = createTask(taskText);
        todo_list.appendChild(newTask)
        input_field.value = '';
    }
    saveTasks();
})


function taskHandler(e) {
    let task = e.target.closest(".task")
    if (!task) return;
    if (e.target.classList.contains('delete_btn')){
        task.remove();
        saveTasks()
        return;
    }
    if (e.target.classList.contains('move_right')) {
        let current_list_id = e.target.closest(".task-list").id
        if (current_list_id == "todo-list"){
            inprogress_list.appendChild(task)
        }
        if (current_list_id == "inprogress-list") {
            done_list.appendChild(task)
        }
        saveTasks()
    }
}

todo_list.addEventListener("click", taskHandler)
inprogress_list.addEventListener("click", taskHandler)
done_list.addEventListener("click", taskHandler)
