//선택자
const todo_form = document.querySelector(".todo-form");
const todo_btn = document.querySelector(".todo-btn");
const todo_input = document.querySelector(".todo-input");
const todo_item = document.querySelector(".todo-item");
const todo_search = document.querySelector(".todo-search");

//todos에는 각각의 아이템의 정보가 들어감
let todos = [];
let listSwitch = false;

//리스트 뿌리는 함수
//로컬 스토리지 저장 함수
const localSave = () => {
  //로컬 스토리지에 저장해주는 함수
  //객체 -> string 화 시켜줘야함
  localStorage.setItem("todos", JSON.stringify(todos));
};

//로컬 스토리지에 저장을 하기 위해서 todo 객체를 생성해준다

//검색 필터링 함수
const searchItem = (e) => {
  const search = e.target.value;
  //filter
  //대소문자 구별 방지 -> 소문자로 바꿔줌
  const searchTodo = todos.filter(
    (todo) => todo.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  renderItem(searchTodo);
};

const renderItem = (todo) => {
  todo_item.textContent = "";
  todo.map((it) => {
    createItem(it);
  });
};

//upDate 함수
const updateItem = (e) => {
  //클릭한 영역에만 class추가
  //span 태그에 .active 클래스 생성
  let target = e.target;
  if (!target.classList.contains("active")) {
    //active 클래스가 존재할 경우에
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }
};

//아이템  함수
const deleteItem = (e) => {
  //삭제를 하기 위해서는 클릭한 요소가 어디 있는지 알아야한다
  let target = e.target.parentElement;
  //document에서 제거
  //삭제 -> target.id(li의 id)와 todo.id가 일치하지 않는 것만
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  //setItem
  localSave();
  target.remove();
};
//아이템 생성 함수
const createItem = (todo) => {
  //list 생성 -> 동적으로 생성
  //input.value을 인자로 받아옴(text)
  if (todo.text !== "") {
    //text가 공백이 아닐 때
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todo.text;
    const btn = document.createElement("button");
    btn.textContent = "삭제";
    //삭제 버튼을 누르면 이벤트 리스너 발생함(click);
    btn.addEventListener("click", deleteItem);
    li.appendChild(span);
    li.appendChild(btn);
    //search 함수
    todo_search.addEventListener("input", searchItem);
    li.id = todo.id;
    todo_item.appendChild(li);
    //upDate 함수
    span.addEventListener("click", updateItem);
  }
};

const submitHandler = (e) => {
  e.preventDefault();
  //버튼을 눌렀을 때 새로운 아이템 객체를 생성함
  const todo = {
    //임시로 id 값 지정
    id: Date.now(),
    text: todo_input.value,
  };
  //todos 객체에 push해줌
  //[...todo]
  todos.push(todo);
  localSave();
  createItem(todo);
  todo_input.value = "";
  //아이템 생성 함수
};
//form -> submit
//btn -> click
todo_form.addEventListener("submit", submitHandler);

window.onload = () => {
  //페이지가 로드되면 자동으로 실행되는 전역 콜백함수
  //getItem을 이용해서 item을 가져옴
  //배열 함수로 데이터를 뿌리기 위해 문자열을 파싱한다
  const getTodo = JSON.parse(localStorage.getItem("todos"));
  //키 값을 이용해서 찾아옴
  if (getTodo) {
    getTodo.forEach((item) => {
      //데이터를 가져온 후 -> 아이템 생성 함수 호출
      createItem(item);
    });
  }
  //받아온 데이터를 todos 변수에 담는다
  //새로고침해도 리스트는 바뀌지 않음
  todos = getTodo;
};

// todo_input.value -> li에 추가할 텍스트
//li는 ul 태그의 자식 태그이므로, 반드시 자식으로 붙여줘야함
//삭제 버튼도 같이 생성
//삭제 버튼은 li 안에 들어있어야 함
// ul  - li  - btn
// li 안에는 텍스트의 내용이 담긴 span 태그 / btn 태그가 있어야 할 예정

/*
const deleteItem = (e) => {
    //삭제를 하기 위해서는 클릭한 요소가 어디 있는지 알아야한다
    console.log(e.target.parentElement);
  };
  
.parentElement
-부모 태그 찾기
-버튼을 클릭했을 때의 e.target은 버튼 자기 자신을 나타낸다
e.target.parentElement은 버튼을 포함하고 있는 list!

todos- 아이템을 담은 배열
todo - 각각의아 아이템



*/
