const clockContainer = document.querySelector(".js-clock");
/*
querySelector : element의 자식을 탐색
이 경우에는 js-clock의 자식
*/
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
    /*
    innerText : 객체 안에 텍스트를 넣기 위함
    02:02:05 이런 식으로 표시되게 함
    */
}
function init() {
    getTime();
    setInterval(getTime, 1000)
    /*
    첫 번째 인자는 함수, 두 번째 인자는 실행할 시간 간격
    1000 == 1s
    */
}

init();