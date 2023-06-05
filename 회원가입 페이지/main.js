const formLogin = document.querySelector(".form-login");
const inputId = document.querySelector(".input_id");
const inputPwd = document.querySelector(".input_pwd");
const form_login = document.querySelector(".form-login");

const userInfo = [];

//로컬 스토리지 / 세션 스토리지 / 토큰 / 쿠키 공부

//input 이벤트 발생
//유효성 검사 / 길이도 검사해야함

//제일 먼저 onSubmit 이벤트 발생
//아이디의 값과 비밀번호를 비교

//유효성 검사하는 함수 ture나 false 이용
function checkVaildId(id) {
  //아이디 유효성 검사
  //아이디 -> 영문자로 시작하고, 영문/숫자 조합 5~20 글자 정도
  const regId = /^[a-zA-Z0-9!@#$%^&*()?_~]{6,20}$/;
  const result = regId.test(id);
  return result;
}
function checkVaildPwd(pwd) {
  //영문과 숫자 조합의 8~20자의 비밀번호 설정
  const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  const result = regPwd.test(pwd);
  return result;
}

inputId.addEventListener("input", (e) => {
  //value가 이거나
  if (inputId.value === "") {
    alert("유효한 아이디를 입력해주세요");
  }
});
inputPwd.addEventListener("input", (e) => {
  if (inputPwd.value === "") {
    alert("유효한 비밀번호를 입력해주세요");
  }
});

form_login.addEventListener("submit", (e) => {
  e.preventDefault();
  //아이디의 값과 비밀번호의 값이 들어온 경우
  if (inputId.value && inputPwd.value) {
    //아이디의 값과 inputPwd의 값이 있을 경우
    //유효성 검사에 성공할 시에 로컬스토리지에 저장
    //아니면 return 반환
    if (checkVaildId(inputId.value) && checkVaildPwd(inputPwd.value)) {
      let users = { id: inputId.value, pwd: inputPwd.value };
      userInfo.push(users);
      //유저들의 정보가 push로 들어간 배열을 두 번째 인자로 넣어준다.
      //key를 유저의 아이디로 사용할 수 있음 -> inputId

      localStorage.setItem(inputId.value, JSON.stringify(userInfo));
      inputId.value = "";
      inputPwd.value = "";
    } else {
      alert("아이디 또한 비밀번호를 올바르게 입력해주세요 ");
      return false;
    }
  } else {
    //둘 다 들어오지 않은 경우
    console.log("아이디와 비밀번호를 입력해주세요");
    return false;
  }
});
