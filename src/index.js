import "./style.css";

const todos = [
    { text: "Todo 1", done: false, edit: false },
    { text: "Todo 2", done: true, edit: false },
    { text: "Todo 3", done: false, edit: false },
];

const form = document.querySelector("form");
const formInput = form.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const value = input.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    input.value = "";
    addTodo(value2);
});

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        if (todo.edit) {
            return createElementEditTodo(todo, index);
        } else {
            return createElementTodo(todo, index);
        }
    });
    ul.innerHTML = "";
    ul.append(...todosNode);
};

const createElementTodo = (todo, index) => {
    const li = document.createElement("li");
    const editTodoBtn = document.createElement("button");
    editTodoBtn.setAttribute("class", "editTodo");
    editTodoBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        editTodo(index);
    });
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.setAttribute("class", "deleteTodo");
    deleteTodoBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteTodo(index);
    });
    li.innerHTML = `
        <span class="complete ${
            todo.done ? "validate-true" : "validate-false"
        }"></span>
        <p class="${todo.done ? "validate-true" : ""}">${todo.text}</p>`;
    li.addEventListener("click", (event) => {
        let timer;
        if (event.detail === 1) {
            timer = setTimeout(() => {
                doneTodo(index);
            }, 200);
        } else if (event.detail > 1) {
            clearTimeout(timer);
            editTodo(index);
        }
    });

    li.append(editTodoBtn, deleteTodoBtn);
    return li;
};

const createElementEditTodo = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    input.className = "editInput";
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEdit(index, input);
        }
    });
    inputFocus(input);
    const saveTodoBtn = document.createElement("button");
    saveTodoBtn.innerHTML = "Save";
    saveTodoBtn.addEventListener("click", () => {
        saveEdit(index, input);
    });
    const cancelTodoBtn = document.createElement("button");
    cancelTodoBtn.innerHTML = "Cancel";
    cancelTodoBtn.addEventListener("click", () => {
        editTodo(index);
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            editTodo(index);
        }
    });
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.setAttribute("class", "deleteTodo");
    deleteTodoBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteTodo(index);
    });

    li.append(input, saveTodoBtn, cancelTodoBtn, deleteTodoBtn);
    return li;
};

const addTodo = (text) => {
    if (text) {
        const todo = { text, done: false };
        todos.push(todo);
        displayTodo();
    }
};

const doneTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
};

const editTodo = (index) => {
    todos[index].edit = !todos[index].edit;
    displayTodo();
};

const deleteTodo = (index) => {
    todos.splice(index, 1);
    displayTodo();
};

const saveEdit = (index, input) => {
    todos[index].text = input.value;
    todos[index].edit = !todos[index].edit;
    displayTodo();
};

const inputFocus = (input) => {
    setTimeout(() => {
        input.focus();
    }, 0);
};

displayTodo();
inputFocus(formInput);
