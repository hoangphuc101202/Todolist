    let clockContainer = document.querySelector(".clock");
    let clocktitle = document.querySelector("h1");
    let btnPause = document.querySelector(".btn-pause");
    let currenttime;
    
    let LastPlayTime = null;
    let alarmTime, 
    ringTone = new Audio("./files/ringtone.mp3");
    let timeParts;

    let todos = JSON.parse(localStorage.getItem('items'));
    setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        result = minutes + 10;
        clocktitle.innerText = `${hours}:${minutes}:${seconds}`;
        todos = JSON.parse(localStorage.getItem('items'));
        // console.log(todos);
        todos.forEach(todo => {
            timeParts = todo.remind.split(':');
            let time = `${timeParts[0]}:${timeParts[1]}`;
            alarmTime = time;
            if (alarmTime == `${hours}:${minutes}`){
                ringTone.play();
                // LastPlayTime = `${hours}:${result}`
                // console.log(LastPlayTime);
            }
        });  
    }, 1000);

    // btnPause.addEventListener('click',pause)
    // function pause(){
    //     ringTone.pause();
    //     alarmTime = LastPlayTime;
    //     console.log(alarmTime);
    // }



