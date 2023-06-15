//** Khai báo các ID mình sẽ sử dụng. */

let title = document.getElementById('title');
let btn = document.getElementById('add');
let output = document.getElementById('addTodolist');
let container = document.querySelector('.container');
let todoapp = document.querySelector('.todo-app');
let headerTitle = document.getElementById("title-content");
let titleOutput = document.querySelector(".title-output");
let remindContainer = document.querySelector(".reminderContainer");
let remindInput = document.querySelector(".reminderInput");
// let flag = false;

/**
 * Khai báo một mảng TaskList 
 * Ta kiểm tra xem trong Local Storage trong trang web có tên Item đã có chưa ?
 * Nếu có thì Local Storage trong item sẽ đưọc lấy ra sử dụng 
 * Và nó sẽ được chuyển từ chuỗi JSON thành mảng của JavaScript bằng dòng JSON.parse
 * Nếu không thì vẫn giữ là một mảng TaskList rỗng.
 */

let taskList = [];
if (localStorage.getItem('items')) {
    taskList = JSON.parse(localStorage.getItem('items'));
}
/**
 * Xử lí sự kiện nếu ô input rỗng hoặc xóa đi tất cả => Ô input nhập thời gian sẽ ẩn
 */
title.addEventListener("input",()=>{
    if(title.value == ""){
        remindContainer.style.display = "none";
    }
    else{
        remindContainer.style.display= "block";
    }
})

/**
 * Khi ta nhấn vào nút add. Nếu title rỗng. Hiển thị alert.
 * Nếu không rỗng thì nội dung từ ô title sẽ được thêm vào một mảng Tasklist.
 * Sau đó ta sử dụng localStorage để xử lí mảng Tasklist và lưu trữ mảng.
 * Trước khi lưu ta phải chuyển từ mảng Tasklist sang chuỗi JSON vì local Storage chỉ lưu trữ dưới dạng chuỗi.
 * và sau đó là show ra màn hình.
 * Nhưng tránh tình trạng show ra màn hình bị lặp lại ta dùng 1 biến để show ra màn hình là 1 giá trị rỗng để không bị lặp lại các thành phần trước đó
 * 
 */
btn.addEventListener('click', addTodoList);
function addTodoList(){
    if(title.value == ""){
        alert("Bạn nên viết cái gì đó!");
        return;
    }
    if(remindInput.value == ""){
        alert("Bạn cần nhập thời gian vào!");
        return;
    }
     /**
    * Ở đây ta xử lí todo, và todo ta tạo là 1 đối tượng, gồm nội dung và thời gian. 
    * Sau đó ta thêm đối tượng này vào 1 mảng taskList.
    */
    const todo = {
        content: title.value,
        remind : remindInput.value,
    };
        taskList.push(todo);
        localStorage.setItem('items', JSON.stringify(taskList));
        title.value = "";
        remindContainer.style.display = "none";
         let prevTodo = document.getElementById("addTodolist");
        prevTodo.innerHTML="";
       displayTasks();
}
/**
 * Đây là hàm xóa Task
 * @param {number} index Chỉ số trong mảng cần xóa.
 * Ta xét nếu tìm thấy index trong mảng cần xóa ta sẽ xóa phần tử ngay vị trí index và cập nhật lại local storage.
 */
function DeleteTodo(index){
    if (index !=-1) {
        taskList.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(taskList));
}
}
/**
 * Đay là hàm Show ra màn hình với các phần tử ta CSS và tạo ra button xóa.
 * Khi ta load lại trang thì hàm Display Task này sẽ được chạy ngay khi ta load lại trang. Và show ra các phần tử trong local storage trước đó đã lưu.
 * 
 */

let clickIndex = -1;
function displayTasks() {
   
    for (let i = 0; i < taskList.length; i++) {
        let div = document.createElement('div');
        div.className = "title-output"; 
        let p = document.createElement('p');
        p.textContent = taskList[i].content ;
        p.style.color = "black";
        p.style.marginLeft = "50px";
        p.style.fontFamily = "Arial, Helvetica, sans-serif";
        p.style.fontWeight = "700";

        const reminder = document.createElement('p');
        reminder.textContent = taskList[i].remind;
        reminder.style.color = "gray";
        reminder.style.marginLeft = "250px";
        reminder.style.position ="absolute";
        reminder.style.fontFamily = "Arial, Helvetica, sans-serif";
        
        
        div.addEventListener('click',function(){
            ClickEvent(div,p,reminder);
        });
      

        // Tạo ra nút button delete và CSS cho nút button
        //  Khúc này em sử lí cách xóa TodoID bằng Clousure, giữ lại giá trị của taskList[i]
        // truyền vào TodoID, và sử dụng nó trong sự kiện delete để đảm bảo xóa 1 cách chính xác.


         let todoID = taskList[i];
         let btnDelete = document.createElement('button');
         btnDelete.className ="btn-delete";
         btnDelete.classList.add('fa', 'fa-trash-alt')
         // Tạo sự kiện xóa cho button xóa.
         btnDelete.addEventListener('click', () => {
             let index = taskList.indexOf(todoID);
             div.remove();
             ringTone.pause();
             DeleteTodo(index);
        
           }); 
        output.appendChild(div);
        div.appendChild(p);
        div.appendChild(reminder)
        div.appendChild(btnDelete);
        
    }
  }
 function ClickEvent(div, p, reminder){  
                let iconCheck = document.createElement("i");
                iconCheck.classList.add('fa-solid','fa-check', 'icon-check');
                p.style.textDecoration = " line-through";
                reminder.style.textDecoration = "line-through"
                div.appendChild(iconCheck);
        }
displayTasks();






