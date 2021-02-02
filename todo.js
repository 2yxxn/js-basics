const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
// 해야할 일을 생성됐을 때 이 배열에 추가되도록 함

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
        /*
        parseInt : number로 바꾸는 거
        toDo.id는 int, li.id는 string
        */
    });
    toDos = cleanToDos;
    // filter : array에 담겨 있는 것들 각각에 한 번 씩 함수를 실행시켜 true인 아이템들만 가지고 새로운 array를 만듦
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON.stringify : 자바스크립트 object를 string으로 바꿔줌
}
function paintToDo(text) {
    const li = document.createElement("li");
    // createElement : element(li) 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    // delBtn이 click된다는 건 지운다는 거
    span.innerText = text;
    /*
    <h1>수박</h1>을 작성했을 때
    innerHTML : 인식하여 출력
    innerText : 텍스트로 인식하여 출력
    */
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    /*
    <ul class="js-toDoList">
        <li id="1">
            <button>❌</button><span>text</span>
        </li>
    </ul>
    */
   const toDoObj = {
       text: text,
       id: newId
   };
   toDos.push(toDoObj);
   saveToDos();
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // parse : object로 변환
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
        // forEach(array가 가진 거) : array에 담겨 있는 것들 각각에 한 번 씩 함수를 실행시켜 주는 거
    }
}
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();