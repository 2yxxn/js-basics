const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    // localStorage에 Key값을 USER_LS로 하는 Value(text)를 저장
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}
function askForName() {
    form.classList.add(SHOWING_CN);
    // currentUser가 없다면 form이 보여야 하니까 classList에 showing을 추가
    form.addEventListener("submit", handleSubmit);
    // form이 submit된다면 handleSubmit함수를 실행
}
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    // currentUser가 있다면 form이 안보여야 하니까 classList에서 showing을 삭제
    greeting.classList.add(SHOWING_CN);
    // .js-greetings 에 showing이라는 클래스를 추가한다
    greeting.innerText = `Hello ${text}`;
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    /*
    localStorage에서 정보를 가져오겠다
    이 때, Key == USER_LS에 따른 Value를 가져오겠다는 뜻
    저장이 안 되어 있으면 Value는 null
    */
    if (currentUser === null) {
        // 유저가 없는 경우
        askForName();
    }
    else {
        // 유저가 있는 경우
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();