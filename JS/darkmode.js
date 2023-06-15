let darkmode = document.getElementById('dark-mode');
let container2 = document.querySelector('.container');
let todoapp2 = document.querySelector('.todo-app');
let headerTitle2 = document.getElementById("title-content");
/**
 * Còn đây là chế độ sáng tối. Theo thuật toán này thì tôi cho mặc định là chế độ tối.
 * Khi muốn bật chế độ sáng để dễ nhìn thì cứ bật thoai.
 */
let isLightMode = false;
darkmode.addEventListener('click',function(){
    darkmode.classList.toggle('active');
    isLightMode = !isLightMode;
    if(isLightMode){
        container2.style.background = "#b884ff";
        todoapp2.style.background = "#000";
        headerTitle2.style.color = "#2f79ef";
        
    }
    else{
        container2.style.background = "";
        todoapp2.style.background = "";
        headerTitle2.style.color = "";
 
    }

})