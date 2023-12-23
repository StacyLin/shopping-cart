let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {

    let cartIcon = document.getElementById("cartAmount");

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((acc,curr) => acc+curr,0);

};

calculation();

let generateCartItems = () => {

  if(basket.length !==0 ){

    return  (shoppingCart.innerHTML = basket.map((x) => {

      let { id, item } = x;

      let search = shopItemsData.find((y) => y.id === id) || [];
      
      //console.log(search);

       return `
        <div class="cart-item">
          <img width="100" src="${search.img}" alt="">
          <div class="details">

            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</P>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${search.id})" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
              <i onclick="decrement(${search.id})" class="bi bi-dash-lg"></i>
              <div id=${search.id} class="quantity">${item}</div>
              <i onclick="increment(${search.id})" class="bi bi-plus-lg"></i>
            </div>

            <h3 class="zzz">$ ${search.price*item}</h3>
          </div>
        </div>

       `;


    }).join(""));
  
  }
  else{
    shoppingCart.innerHTML = ``;

    label.innerHTML =`
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }

};

generateCartItems();


let increment = (id) =>{
   
  let selectedItem = id;
  //selectedItem.innerHTML = parseInt(selectedItem.innerHTML)+1;

  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined){
      basket.push({
          id:selectedItem.id,
          item:1
      });
  }
  else{
      search.item += 1;
  }
 

  generateCartItems();

  update(selectedItem.id);

  localStorage.setItem("data",JSON.stringify(basket));

};

let decrement = (id) =>{

  let selectedItem = id;
  //selectedItem.innerHTML = parseInt(selectedItem.innerHTML)-1;

  //if (selectedItem.innerHTML <= 0)
  //selectedItem.innerHTML = 0;
  

  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined) return;
  else if (search.item === 0) return;
  else{
      search.item -= 1;
      
  }  

  //console.log(basket);
  update(selectedItem.id);


  basket = basket.filter((x) => x.item !== 0);

  generateCartItems();

  localStorage.setItem("data",JSON.stringify(basket));

};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
 // console.log(search.item);
  document.getElementById(id).innerHTML=search.item;

  calculation();
  TotalAmount();

};


let removeItem = (id) => {

  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined) return;
  else{
      search.item -= search.item;   
  }  

  update(selectedItem.id);

  basket = basket.filter((x) =>  x.id !== selectedItem.id);

  generateCartItems();

  localStorage.setItem("data",JSON.stringify(basket));

};


let TotalAmount = () => {

   if(basket.length !== 0){

    /*** 
    let amount = basket.map((x) => {
     // console.log("x:",x);
      return x;
    }).reduce((acc,curr) => {

        let search = shopItemsData.find((y) => y.id === curr.id);
    
        if (search) {
          // 如果购物篮中的商品在商店中找到了匹配项
          acc += curr.item * search.price;
        
        }
    
        return acc;

      }, 0);   ***/

      let amount = basket.map((x) => {
        let { id, item} = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      }).reduce((acc,curr) => { return acc + curr},0);


      return  label.innerHTML =`
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;

   }
   else return;

}

TotalAmount();

let clearCart = () => {
  
  basket = [];

  calculation();

  generateCartItems();

  localStorage.setItem("data",JSON.stringify(basket));

/***
  let del = basket.map((x) =>{

    x.item -= x.item;   

    update(x.id);

    basket = basket.filter((y) =>  y.id !== x.id);

    generateCartItems();

    localStorage.setItem("data",JSON.stringify(basket));

  });
  ***/

};