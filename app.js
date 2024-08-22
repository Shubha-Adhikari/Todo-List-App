const title = document.querySelector('#title');
const desc = document.querySelector('#desc');
const addButton = document.querySelector('#add');
const clearButton = document.querySelector('#clear');
const todoCont = document.querySelector('.todoList-row');
const todoTopTitle = document.querySelector('.todo-top-title');
const fieldErr = document.querySelector('#field-error');
const statusInp = document.querySelector('#status');
const dateLine = document.querySelector('#dateLine');
const maxLenDisplay = document.querySelector('.maxLenDisplay');
//most used logic is made a function to prevent me from writing same code time to time
function mostUsedLogic() {
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos);
    }
}
maxLenDisplay.style.opacity = "0%";
title.addEventListener("keydown", () => {
    maxLenDisplay.style.opacity = "100%";
    maxLenDisplay.innerText = `${title.value.length}/${title.maxLength}`;
    if (title.value.length === title.maxLength) {
        fieldErr.classList.remove("hidden");
        fieldErr.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> You have reached the limit! Max Limit is: ${title.maxLength} characters`;
    }
})

addButton.addEventListener('click', () => {
    if (title.value === "") {
        fieldErr.classList.remove('hidden');
        fieldErr.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> This field cannot be left empty!`;
        title.focus();
    } else {
        fieldErr.classList.add('hidden');
        mostUsedLogic();

        let obj = {
            todoTitle: title.value,
            todoDesc: desc.value,
            todoStatus: statusInp.value,
            postedDate: date,
            postedTime: time,
            imp: ""
        }
        if (dateLine.value === "") {
            obj.todoDate = "Not Given";
        } else {
            obj.todoDate = dateLine.value;
        }
        arr.push(obj);
        localStorage.setItem('todo', JSON.stringify(arr));
        title.value = "";
        desc.value = "";
        dateLine.value = "";
        statusInp.value = "Not Completed";
        maxLenDisplay.style.opacity = "0";
        showTodo();
        location.reload();
    }
})

function showTodo() {
    mostUsedLogic();
    todoCont.innerHTML = "";
    if (arr.length !== 0) {
        todoTopTitle.classList.remove('hidden');
        arr.forEach(function (element, index) {
            if (element.imp === "Important") {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card d-flex">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;
            } else {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper hidden"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card d-flex">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
          <input class="form-check-input" type="checkbox" id="impCheck">
          <label class="form-check-label" for="flexCheckChecked">
            Mark as important
          </label>
        </div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;

            }
        })
    } else {
        todoTopTitle.classList.add('hidden');
        todoCont.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-purple-custom">"Add to todo"</span> to get started!</h2>`;
    }
}

//showTodo in default as well
showTodo();

//DELETE btn function
function deleteFunc(id) {
    mostUsedLogic();
    arr.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(arr));
    showTodo();
}
//update btn function
function editFunc(id) {
    const editTitle = document.querySelector('#editTitle');
    const editDesc = document.querySelector('#editDesc');
    const editStatus = document.querySelector('#editStatus');
    const editDate = document.querySelector('#editDate');
    const editBtn = document.querySelector('#editBtn');
    const editError = document.querySelector('#edit-field-error');
    const editMaxLenDisplay = document.querySelector('.editMaxLenDisplay');
    const impCheck = document.querySelector('#impCheck');

    editTitle.value = arr[id].todoTitle;
    editDesc.value = arr[id].todoDesc;
    editStatus.value = arr[id].todoStatus;
    editDate.value = arr[id].todoDate;

    if (arr[id].imp === "Important") {
        impCheck.checked = true;
    } else {
        impCheck.checked = false;
    }

    editMaxLenDisplay.style.opacity = "0%";
    editTitle.addEventListener("keydown", () => {
        editMaxLenDisplay.style.opacity = "100%";
        editMaxLenDisplay.innerText = `${editTitle.value.length}/${editTitle.maxLength}`;
        if (editTitle.value.length === editTitle.maxLength) {
            editError.classList.remove("hidden");
            editError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> You have reached the limit! Max Limit is: ${editTitle.maxLength} characters`;
        }
    })
    editBtn.addEventListener("click", () => {
        if (editTitle.value === "") {
            editError.classList.remove('hidden');
            editError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> This field cannot be left empty!`;
            editTitle.focus();
        } else {
            editError.classList.add('hidden');
            mostUsedLogic();
            arr[id] = {
                todoTitle: editTitle.value,
                todoDesc: editDesc.value,
                todoStatus: editStatus.value,
                postedDate: date,
                postedTime: time,
            };
            if (impCheck.checked === true) {
                arr[id].imp = "Important";
            } else {
                arr[id].imp = "";
            }
            if (editDate.value === "") {
                arr[id].todoDate = "Not Given";
            } else {
                arr[id].todoDate = editDate.value;
            }
            localStorage.setItem('todo', JSON.stringify(arr));

            showTodo();
        }
    })
}

//delete all function
clearButton.addEventListener("click", () => {
    if (confirm("Do you want to delete all todo list? Once it's done it cannot be undone!")) {
        localStorage.clear();
        showTodo();
    }
})

//search function
const todos = document.querySelectorAll('#todo-c');
const searchBar = document.querySelector('.search');
const searchResult = document.querySelector('.search-result');

searchBar.addEventListener("input", () => {
    let search = searchBar.value.toLowerCase();
    Array.from(todos).forEach(element => {
        let cardTitle = element.querySelectorAll('.todoContentx')[0].innerText.toLowerCase();
        let cardDesc = element.querySelectorAll('.todoContentx')[1].innerText.toLowerCase();
        let cardStatus = element.querySelectorAll('.todoContentx')[2].innerText.toLowerCase();

        searchResult.innerHTML = `<h6 class="search-result-title">Search results for <i class="text-purple-custom">"${searchBar.value}"</i></h6>`;
        if (cardTitle.includes(search) || cardDesc.includes(search) || cardStatus.includes(search)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})

//todolist nav menu sorting function
const sortByImp = document.querySelector('#sortByImp');
const sortByFirst = document.querySelector('#sortByFirst');
const sortByLast = document.querySelector('#sortByLast');
const sortByAlpha = document.querySelector('#sortByAlpha');
const sortByAlphaRev = document.querySelector('#sortByAlphaRev');

sortByImp.addEventListener("click", () => {
    console.log(todos);
    Array.from(todos).forEach(element => {
        const display = element.querySelector('.important-display').innerText;

        if (display.includes("Important")) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
sortByFirst.addEventListener("click", () => {
    showTodo();
})

function reverseOrder() {
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos).reverse();
    }
    todoCont.innerHTML = "";
    if (arr.length !== 0) {
        todoTopTitle.classList.remove('hidden');
        arr.forEach(function (element, index) {
            if (element.imp === "Important") {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;
            } else {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper hidden"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
          <input class="form-check-input" type="checkbox" id="impCheck">
          <label class="form-check-label" for="flexCheckChecked">
            Mark as important
          </label>
        </div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;

            }
        })
    } else {
        todoTopTitle.classList.add('hidden');
        todoCont.innerHTML = `<h2 class="text-center fs-4 text-sec ondary">Nothing to show here! Click on <span class="text-purple-custom">"Add to todo"</span> to get started!</h2>`;
    }
}
sortByLast.addEventListener('click', reverseOrder);

function alphabeticalOrder() {
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos).sort(function (a, b) {
            if (a.todoTitle > b.todoTitle) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    todoCont.innerHTML = "";
    if (arr.length !== 0) {
        todoTopTitle.classList.remove('hidden');
        arr.forEach(function (element, index) {
            if (element.imp === "Important") {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;
            } else {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper hidden"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
          <input class="form-check-input" type="checkbox" id="impCheck">
          <label class="form-check-label" for="flexCheckChecked">
            Mark as important
          </label>
        </div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;

            }
        })
    } else {
        todoTopTitle.classList.add('hidden');
        todoCont.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-purple-custom">"Add to todo"</span> to get started!</h2>`;
    }
}
sortByAlpha.addEventListener("click", alphabeticalOrder);

sortByAlphaRev.addEventListener("click", () => {
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos).sort(function (a, b) {
            if (a.todoTitle < b.todoTitle) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    todoCont.innerHTML = "";
    if (arr.length !== 0) {
        todoTopTitle.classList.remove('hidden');
        arr.forEach(function (element, index) {
            if (element.imp === "Important") {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;
            } else {
                todoCont.innerHTML += `        
        <div id="todo-c" class="col-md-4 mb-5">
        <div class="important-wrapper hidden"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
</div>
                     <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
</div>
                   

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
          <input class="form-check-input" type="checkbox" id="impCheck">
          <label class="form-check-label" for="flexCheckChecked">
            Mark as important
          </label>
        </div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;

            }
        })
    } else {
        todoTopTitle.classList.add('hidden');
        todoCont.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-purple-custom">"Add to todo"</span> to get started!</h2>`;
    }
})

//todolist menu customize view function (block view/list view)
const blockView = document.querySelector('#blockView');
const listView = document.querySelector('#listView');

listView.addEventListener('click', () => {
    let todos = localStorage.getItem('todo');
    if (todos == null) {
        arr = [];
    } else {
        arr = JSON.parse(todos);
    }
    todoCont.innerHTML = "";
    if (arr.length !== 0) {
        todoTopTitle.classList.remove('hidden');
        arr.forEach(function (element, index) {
            if (element.imp === "Important") {
                todoCont.innerHTML += `        
        <div id="todo-c" class="mb-5">
        <div class="important-wrapper"><p class="important-display m-0 text-center">${element.imp}</p></div>
            <div class="todos-card card d-flex">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                <div class="row">
                <div class="col-md-9">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
</div>

                <div class="col-md-3">
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
                    </div>
                                         <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
                     </div> 
</div>



              </div>     

                </div>
                <div class="footer-card d-flex">
                    <span class="dateTime mt-2 ms-auto">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-5 btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;
            } else {
                todoCont.innerHTML += `        
        <div id="todo-c" class="mb-5">
            <div class="todos-card card d-flex">
            <div class="btn-top d-flex">
             <div class="numbering ms-3 mt-2">${index + 1}</div>
                   
                    
                    <button id="${index}" onclick="deleteFunc(this.id)" class="btn ms-auto text-secondary fs-5"><i class="fa-solid fa-xmark"></i> </button>

                </div>


                <div class="card-body pb-0">
                <div class="row">
                <div class="col-md-9">
                    <p class="todoContentx card-title fs-2">${element.todoTitle}</p>
                    <p class="todoContentx card-text fs-6">Description: ${element.todoDesc}</p>
</div>

                <div class="col-md-3">
                    <div class="wrapper">
                    <p class="" ">Dateline: ${element.todoDate}</p>
                    </div>
                                         <div class="wrapper-status">
                      <p class="todoContentx">Status: <span class="extra-${element.todoStatus}">${element.todoStatus}</span> </p>
                     </div> 
</div>



              </div>     

                </div><hr>
                <div class="footer-card d-flex">
                    <span class="dateTime text-center mt-2 ms-3">Uploaded on ${element.postedDate} at ${element.postedTime}</span>
                    <button id="${index}" onclick="editFunc(this.id)" class="btn text-purple-custom fs-5 ms-auto btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>


<!--            modal-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit this Todo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="add-cont container">
    <div class="row">
                <div class="d-flex">
                    <span class="label-title input-group-text">Task Name: </span>
                    <input type="text" class="form-control title-inp" id="editTitle" maxlength="50">
                    <span class="editMaxLenDisplay text-purple-custom">50/50</span>
                </div>
                    <div id="edit-field-error" class="hidden mb-4 mt-1"></div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Select Status: </span>
                    <select id="editStatus" class="form-select title-inp status-inp" aria-label="Default select example">
                        <option value="Not Completed">Not Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="d-flex mt-4">
                    <span class="label-title input-group-text">Todo DateLine: </span>
                    <input type="date" name="dateTime" id="editDate" class="title-inp">
                </div>
                <div class="mb-3 mt-4">
                    <span class="edit-label-desc label-desc input-group-text">Add description of the task (optional) </span>
                    <textarea class="form-control desc-inp mb-5" id="editDesc" maxlength="200" style="height: 10vh"></textarea>
                </div>
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" id="impCheck">
  <label class="form-check-label" for="flexCheckChecked">
    Mark as important
  </label>
</div>
             

    </div>
</div>


      <div class="modal-footer">
        <button id="editBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </div>
</div>
    `;

            }
        })
    } else {
        todoTopTitle.classList.add('hidden');
        todoCont.innerHTML = `<h2 class="text-center fs-4 text-secondary">Nothing to show here! Click on <span class="text-purple-custom">"Add to todo"</span> to get started!</h2>`;
    }
})