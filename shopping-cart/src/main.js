let shop =document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = ()=>{
    return (
        shop.innerHTML= shopItemsData.map((x)=>{
        let{ id, name, price, desc, img} = x;

        let search = basket.find((x) => x.id === id) || [];

        // ${search.item === undefined? 0 : search.item} 原本用三元運算式的簡短寫法
        let quantityToShow;

        if (search.item === undefined) {
            quantityToShow = '0';
        } 
        else {
            quantityToShow = search.item;
        }


        return `
            <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${quantityToShow}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(" "));
};

generateShop();

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
   
   

   // console.log(basket);
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


    localStorage.setItem("data",JSON.stringify(basket));

};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
   // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;

    calculation();

};

let calculation = () => {

    let cartIcon = document.getElementById("cartAmount");

   // console.log(basket.map((x)=> x.item));

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((acc,curr) => acc+curr,0);

    //let amount = basket.map((x)=> x.item).reduce((acc,curr)=>acc+curr,0);

    //console.log(amount);
 
};

calculation();