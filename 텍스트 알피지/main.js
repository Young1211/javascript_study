const startScreen = document.querySelector("#start-screen");
const playInput = document.querySelector("#player-input");
const gameMenu = document.querySelector("#game-menu");
const gameInput = document.querySelector("#game-input");
const battleMenu = document.querySelector("#battle-menu");
const battleInput = document.querySelector("#battle-input");

//이벤트 위임을 이용해 자식 버튼을 제어한다
const battleText = document.querySelector("#battle-text");
const gameText = document.querySelector("#game-text");

//버튼들
const gameMenuBtn = document.querySelectorAll(".game");
const battleMenuBtn = document.querySelectorAll(".battle");

//player의 스탯
const playerStat = document.querySelector("#play-stat");
const playerName = document.querySelector("#player-name");
const playerLevel = document.querySelector("#play-level");
const playerHp = document.querySelector("#play-Hp");
const playerXp = document.querySelector("#play-xp");
const playerAtt = document.querySelector("#play-att");

//몬스터의 스탯

//메시지 -> 게임의 모든 상황을 알려준다!
const messageBox = document.querySelector("#message-box");

class Game {
  constructor(name) {
    //이름을 받아옴(플레이어의 이름)
    this.name = name;
    this.player = null;
    this.monster = null;
    this.monsterList = [
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];
  }
}

class Player {
  //플레이어의 클래스
  constructor(name, lev, hp, xp, att) {
    this.name = name;
    this.lev = 1;
    this.hp = 100;
    this.maxHp = 100;
    this.xp = 20;
    this.att = 10;
  }
  //플레이어의 공격
  atttack() {}
  //플레이어의 회복
  heal() {}
}

class Monster {
  //몬스터의 클래스
  constructor(name, hp, xp, att) {
    this.name = name;
    this.hp = hp;
    this.xp = att;
  }

  attack() {}
}

//몬스터 리스트
monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];
//랜덤으로 하나 생성 -> 깊은 복사가 나와줘야 함
let monsterIndex = Math.floor(Math.random() * monsterList.length);
console.log(monsterIndex);
//숫자 하나 랜덤으로 만듦
//0~2까지, 0부터 시작함
let monster = JSON.parse(JSON.stringify(monsterList[monsterIndex]));
console.log(monster);

startScreen.addEventListener("submit", function (e) {
  //

  e.preventDefault();
  if (playInput.value === "") {
    alert("이름을 입력해주세요");
  }
  playerName.textContent = playInput.value;
  startScreen.style.display = "none";
  gameMenu.style.display = "block";
});

gameText.addEventListener("click", function (e) {
  e.preventDefault();
  const menuValue = e.target.value;
  if (menuValue === "1") {
    gameMenu.style.display = "none";
    battleMenu.style.display = "block";
    //모험을 눌렀을 때만 몬스터를 생성한다.
  } else if (menuValue === "2") {
    //휴식 중 -> 캐릭터의 체력 회복(전부를 회복)
  } else if (menuValue === "3") {
    //종료 첫 화면으로 돌아감
    gameMenu.style.display = "none";
    startScreen.style.display = "flex";
  }
});

// //배틀메뉴
battleText.addEventListener("click", function (e) {
  const battleValue = e.target.value;
  console.log(battleValue);
  e.preventDefault();
  if (battleValue === "1") {
    //전투 개시
  } else if (battleValue === "2") {
    //체력을 회복한다.
  } else if (battleValue === "3") {
    battleMenu.style.display = "none";
    gameMenu.style.display = "block";
  }
});
