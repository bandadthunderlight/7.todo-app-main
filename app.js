const todoListUL = document.querySelector('.todoList-ul')
const todoListInput = document.querySelector('#todoListInput')

const todoListItemCount = document.querySelector('.todoList-itemCount')
const todoListTypeItems = document.querySelectorAll('.todoList-Type')


var todoListArray = []
var typeFlag = 'All'


function inputPressKey(event) {
    if (event.keyCode === 13) {
        addItemtoList()
    }
}

function addItemtoList() {
    if (todoListInput.value) {
        let newItem = {
            id: todoListArray.length + 1,
            text: todoListInput.value,
            isActive: true
        }
        todoListArray.push(newItem)
        console.log(todoListArray);

        showTodosInDom(todoListArray)
        clearInput()
    }
}

function showTodosInDom(selectedArray) {
    todoListUL.innerHTML = ''
    selectedArray.forEach(item => {
        if (item.isActive) {
            todoListUL.insertAdjacentHTML('beforeend', `
            <li class="todoList-item" name="${item.id}">
            <div class="todoList-item-wrapper">
              <div class="todoList-item-radio" onclick="toggleTodo(event)"></div>
              <p class="todoList-item-text">${item.text}</p>
            </div>
        
            <img class="todoList-item-close" src="./images/icon-cross.svg" onclick="removeItem(event)" />
            </li>
            `)
        } else {
            todoListUL.insertAdjacentHTML('beforeend', `
            <li class="todoList-item" name="${item.id}">
            <div class="todoList-item-wrapper">
              <div class="todoList-item-radio selected" onclick="toggleTodo(event)"><img class="todoList-item-radioImg visible" src="./images/icon-check.svg" /></div>
              <p class="todoList-item-text linethrow">${item.text}</p>
            </div>
        
            <img class="todoList-item-close" src="./images/icon-cross.svg" onclick="removeItem(event)" />
            </li>
            `)
        }

    })
    todoListItemCount.textContent = todoListArray.length + ' ' + 'items left'
}

function clearInput() {
    todoListInput.value = ''
}

function toggleTodo(event) {
    console.log(event.target.parentElement.parentElement);
    let selectedIndex = todoListArray.findIndex(item => {
        if (event.target.parentElement.parentElement.getAttribute('name')) {
            return (item.id == Number(event.target.parentElement.parentElement.getAttribute('name')))
        } else {
            return (item.id == Number(event.target.parentElement.parentElement.parentElement.getAttribute('name')))
        }

    })
    todoListArray[selectedIndex].isActive = !todoListArray[selectedIndex].isActive
    console.log(todoListArray);
    showTodosInDom(todoListArray)
}

function removeItem(event) {
    let selectedIndex = todoListArray.findIndex(item => {
        return (item.id == Number(event.target.parentElement.getAttribute('name')))
    })
    todoListArray.splice(selectedIndex, 1)
    showTodosInDom(todoListArray)
}


function clearComleted() {
    let completedArray = todoListArray.filter(item => {
        console.log(item.isActive);
        return (!item.isActive == false)
    })
    todoListArray = completedArray
    console.log(completedArray);
    showTodosInDom(todoListArray)
}

function changeTheme() {
    document.querySelector('.todoList-section').classList.toggle('lightBackground')
    document.querySelector('.todoList-input').classList.toggle('whiteBg')
    document.querySelector('.todoList-inputs-container').classList.toggle('whiteBg')
    document.querySelector('.todoList-listContainer').classList.toggle('whiteBg')
    document.querySelector('.todoList-footer').classList.toggle('whiteBg')
    document.querySelector('.extra-selectType-footer').classList.toggle('whiteBg')
    if (document.querySelector('.todoList-footer').classList.contains('whiteBg')) {
        document.querySelector('.todoList-themeBtn').src = './images/icon-moon.svg'
    } else {
        document.querySelector('.todoList-themeBtn').src = './images/icon-sun.svg'
    }
}


function setTypes(event) {
    todoListTypeItems.forEach(item => {
        item.classList.remove('activeType')
        event.target.classList.add('activeType')
    })
    if (event.target.textContent == 'All') {
        typeFlag = 'All'
        showTodosInDom(todoListArray)
    }
    else if (event.target.textContent == 'Active') {
        typeFlag = 'Active'

        let uncompletedArray = todoListArray.filter(item => {
            console.log(item.isActive);
            return (!item.isActive == false)
        })
        showTodosInDom(uncompletedArray)
    }
    else if (event.target.textContent == 'Completed') {
        typeFlag = 'Completed'
        let completedArray = todoListArray.filter(item => {
            console.log(item.isActive);
            return (item.isActive == false)
        })
        showTodosInDom(completedArray)
    }
}
