const title = document.querySelector('#title');
const desc = document.querySelector('#desc');
const addButton = document.querySelector('#add');
const clearButton = document.querySelector('#clear');
const table = document.querySelector('#table-body');
const tableC = document.querySelector('#table-cont');
const thead = document.querySelector('.table-head');
const fieldErr = document.querySelector('#field-error');

//most used logic is made a function to prevent me from writing same code time to time
function mostUsedLogic(){
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos);
    }
}

addButton.addEventListener('click', ()=>{
    if(title.value === ""){
        fieldErr.classList.remove('hidden');
        title.focus();
    }else{
        fieldErr.classList.add('hidden');
        mostUsedLogic();
        let obj = {
            todoTitle: title.value,
            todoDesc: desc.value,
        }
        arr.push(obj);
        localStorage.setItem('todo', JSON.stringify(arr));
        title.value = "";
        desc.value = "";
        showTodo();
    }
})
function showTodo() {
    mostUsedLogic();
    let html = "";
    arr.forEach((element, index) => {
        html += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.todoTitle}</td>
            <td>${element.todoDesc}</td>
            <td><button id="${index}" onclick="statusFunc(this.id)" class="statusBtn status-incomplete">Not completed</button></td>
            <td>
                <button id="${index}" onclick="editFunc(this.id)" class="btn text-primary fs-5 ms-3 btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <div class="mb-3">
            <label for="title" class="form-label">Title <span id="edit-field-error" class="text-danger hidden fs-6">This field cannot be left empty!</span></label>
            <input type="text" class="form-control" id="editTitle">
        </div>
        <div class="mb-3">
                <label for="desc">Description</label>
                <textarea class="form-control" id="editDesc" style="height: 100px"></textarea>
        </div>
    </div>
      </div>
      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
</div>
            <td class="d-flex">
                <button id="${index}" onclick="deleteFunc(this.id)" class="btn text-body-tertiary ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>
            </td>
        </tr>     
    `;
    })


    if(localStorage.length !== 0){
        table.innerHTML = html;
        thead.classList.remove('hidden');
    }else {
        table.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-primary">"Add to todo"</span> to get started!</h2>`;
        thead.classList.add('hidden');
    }
}
//showTodo in default as well
showTodo();

//DELETE btn function
function deleteFunc(id){
    mostUsedLogic();
    arr.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(arr));
    showTodo();
    if( localStorage.getItem('todo') === '[]'){
        table.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-primary">"Add to todo"</span> to get started!</h2>`;
        thead.classList.add('hidden');
    }
}
//update btn function
function editFunc(id){
    const editTitle = document.querySelector('#editTitle');
    const editDesc = document.querySelector('#editDesc');
    const editBtn = document.querySelector('#editBtn');
    const editError = document.querySelector('#edit-field-error');

    editTitle.value = arr[id].todoTitle;
    editDesc.value = arr[id].todoDesc;

    editBtn.addEventListener("click", ()=>{
        if(editTitle.value === ""){
            editError.classList.remove('hidden');
        }else {
            editError.classList.add('hidden');
            mostUsedLogic();
            arr[id] = {
                todoTitle: editTitle.value,
                todoDesc: editDesc.value,
            };
            localStorage.setItem('todo', JSON.stringify(arr));
            showTodo();
            location.reload();
        }
    })
}

//status btn function
function statusFunc(id){
    const statusBtn = document.querySelectorAll('.statusBtn');
    statusBtn[id].classList.toggle("status-incomplete");
    statusBtn[id].classList.toggle("status-complete");
    if(statusBtn[id].classList.contains("status-complete")){
        statusBtn[id].innerText = "Completed";
    }else{
        statusBtn[id].innerText = "Not Completed";
    }
}

clearButton.addEventListener("click", ()=>{
    if(confirm("Do you want to delete all todo list? Once it's done it cannot be undone!")){
        localStorage.clear();
        showTodo();
    }
})