//

//store.json에 있는 데이터를 가져와야함
async function storeDataJson() {
  const store = await fetch("store.json");
  const data = await store.json();
  return data;
}
storeDataJson().then((data) => {
  //console.log(data.products);
  shopItemData(data.products);
});

//데이터를 받아왔으면 사용해야함
//data.products의 데이터를 가져와서
//화면에다 뿌려주는 함수 만들기

let copy;
const shop_ul = document.querySelector(".shop_List");
function shopItemData(list) {
  //console.log(list); // 4개의 데이터가 정상적으로 받아와짐
  list.forEach((item, i) => {
    copy = ` <li class="item" draggalbe="true" id=${i}>
    <div class="item_img">
      <img src=img/${item.photo} data-cartid=${i} alt=""/>
    </div>
    <p class="item_title">${item.title}</p>
    <p class="item_shop">${item.brand}</p>
    <p class="item_price">${item.price}</p>
    <button class="buy_btn" data-id="${item.id}">담기</button>
  </li>`;
    shop_ul.insertAdjacentHTML("beforeend", copy);
  });
  searchFilter(list, copy);
  shopItemCart(list);
  dragCart(list);
}

//필터링 함수
function searchFilter(itemList, copy) {
  //input의 value값을 가져오기
  const search_text = document.querySelector(".search_text");
  search_text.addEventListener("input", function (e) {
    //만약 현재의 값- 검색어가 제목이나 브랜드 중에서 일치하는 게 있다면
    //그것만 출력하기
    let textFilter = itemList.filter((item, i) => {
      return (
        item.title.indexOf(e.target.value) !== -1 ||
        item.brand.indexOf(e.target.value) !== -1
      );
    });

    console.log(textFilter);
    //아무것도 없을 때 -> 배열의 데이터가 4개가 됨
    //이걸 출력해야함
    shop_ul.innerHTML = "";
    textFilter.forEach((item, i) => {
      //e.target.value.
      let copy2 = ` <li class="item">
        <div class="item_img">
          <img src="img/${item.photo}"alt=""/>
        </div>
        <p class="item_title">${item.title}</p>
        <p class="item_shop">${item.brand}</p>
        <p class="item_price">${item.price}</p>
        <button class="buy_btn">담기</button>
      </li>`;
      shop_ul.insertAdjacentHTML("beforeend", copy2);
    });
  });
}

//장바구니 기능
function shopItemCart(itemList) {
  console.log(itemList); //정상적으로 출력이 됨
  const buyBtn = document.querySelectorAll(".buy_btn");

  //버튼마다 이벤트 리스너 달기
  //빈 배열 만들기 -> 클릭한 아이템을 장바구니에 집어넣을 거임
  let cart = [];
  for (let btn of buyBtn) {
    btn.addEventListener("click", function (e) {
      //console.log(e.target.dataset.id);
      //   cart.push(e.target.dataset.id);
      //   console.log(cart);
      //console.log(itemList[e.target.dataset.id]);
      cart.push(itemList[e.target.dataset.id]);
      //console.log(cart);
      cartList(cart);
    });
  }
}

//말 그대로 화면에 바인딩해주는 함수
//장바구니 데이터 뿌리기
const cart_drop = document.querySelector(".cart_drop");
function cartList(cartData) {
  console.log(cartData);
  cart_drop.innerHTML = "";
  //중간에 비워줘야함
  //1 -> 2개가 되었으면, 내용을 비운다음에 처음부터 카드를 다시 그림
  cartData.forEach((item, i) => {
    let copy3 = ` <li class="item" id=${i}>
          <div class="item_img">
            <img src=img/${item.photo}  data-cartid=${i} alt=""/>
          </div>
          <p class="item_title">${item.title}</p>
          <p class="item_shop">${item.brand}</p>
          <p class="item_price">${item.price}</p>
          <button class="buy_btn" data-id="${item.id}">담기</button>
        </li>`;
    cart_drop.insertAdjacentHTML("beforeend", copy3);
  });
}

//드래그앤 드롭 장바구니 기능 구현 함수
//드롭 시작 => dragstart 발생
//e.dataTransfer.setData("Text". e.target.id)를 넣기

//쇼핑몰 아이템을 장바구니에 드래그하면, 카드가 하나씩 생성이 되어야 한다.
//만약에 똑같은 아이템이라면 수량을 1씩 늘리자
function dragCart(list) {
  //장바구니에 드래그 하는 순간 -> 드래그 이벤트가 발생
  //드래그하는 항목은 li 태그고, 드롭을 하는 공간은 cart_drag
  //아이템을 담을 배열을 하나 생성해줌줌

  const itemDrag = document.querySelectorAll(".item");
  itemDrag.forEach((item) => {
    //forEach문을 돌면서 addEventListenr를 달아줌
    item.addEventListener("dragstart", dragStart);
  });

  //dragstart 함수
  function dragStart(e) {
    //console.log(e.target.dataset.cartid);
    e.dataTransfer.setData("text", e.target.dataset.cartid);
  }

  //drop;
  cart_drop.addEventListener("drop", drop);
  cart_drop.addEventListener("dragover", dragOver);

  //쇼핑 아이템을 담을 배열
  let cartArray = [];

  function drop(e) {
    let dragData = e.dataTransfer.getData("text");
    cartArray.push(list[dragData]);
    //console.log(cartArray);
    cartDropData(cartArray);
    //이번에 dragData의 값을 이용해서
    //아이템 리스트에 접근하기
    //cartArray에 저장되어 있는 값을 뿌리는 함수
  }

  function cartDropData(data) {
    console.log(data);
    cart_drop.innerHTML = "";
    data.forEach((item, i) => {
      let dropCopy = ` <li class="item" id=${i}>
            <div class="item_img">
              <img src=img/${item.photo}  data-cartid=${i} alt=""/>
            </div>
            <p class="item_title">${item.title}</p>
            <p class="item_shop">${item.brand}</p>
            <p class="item_price">${item.price}</p>
            <button class="buy_btn" data-id="${item.id}">담기</button>
          </li>`;
      cart_drop.insertAdjacentHTML("beforeend", dropCopy);
    });
  }

  function dragOver(e) {
    //이후 이벤트 방지하는 함수
    e.preventDefault();
    //저장되어 있는 값을 꺼내오기
  }
}

//드래그가 아니라 드롭을 하는 순간에,
