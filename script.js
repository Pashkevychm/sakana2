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
})