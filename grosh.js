
let products = [

	{
		name : 'ONION',
		tag : 'onion',
		price :30,
		incart:0,
	},
	{
		name :'POTATO',
		tag : 'potato',
		price : 20,
		incart:0,
	}
];


let cart = document.querySelectorAll('.add-to-cart');

for(let i=0;i<cart.length;i++){
	cart[i].addEventListener('click',()=>{
		cartnumber(products[i]);
		updateprice(products[i]);
	
		
	})
}
function onloadcartnumbers(){
    let itemnumbers = localStorage.getItem('itemnumber');

    if(itemnumbers){
        document.querySelector('.fa-cart-arrow-down span').textContent = itemnumbers;
    }
}


function cartnumber(product){
  let itemnumber = localStorage.getItem('itemnumber');
	 itemnumber = parseInt(itemnumber);
	 console.log(typeof itemnumber)
	 if(itemnumber){
		 localStorage.setItem('itemnumber',itemnumber + 1);
		 document.querySelector('span').textContent = itemnumber + 1;
	 }else{
		localStorage.setItem('itemnumber',1);
		document.querySelector('span').textContent = 1;
	 }
	 showdata(product);
}

  function showdata(product){
	let cartitems =  localStorage.getItem('itemsincart');
	cartitems = JSON.parse(cartitems);
	 
	 if(cartitems != null){
		 if(cartitems[product.tag] == undefined){
              cartitems = {
				  ...cartitems,
				  [product.tag]:product
			  }
		 }
		 cartitems[product.tag].incart += 1;
	 }else{
		product.incart = 1;

		 cartitems = {
			 [product.tag]:product
					 }
	 }
	 localStorage.setItem('itemsincart',JSON.stringify(cartitems));
  }


 function updateprice(product){
	 let totalprice = localStorage.getItem('totalprice');

	 if(totalprice != null){
		totalprice = parseInt(totalprice);
		localStorage.setItem('totalprice', totalprice + product.price);
	 }else{
		localStorage.setItem('totalprice',product.price);
	 }
 }

 
onloadcartnumbers();



 //-----------------------------------------cart-----------------------------------//

 function displaycart(){
	let cartitems = localStorage.getItem('itemsincart');
	cartitems = JSON.parse(cartitems);
	let totalprice = localStorage.getItem('totalprice');

	let productsincart = document.querySelector('.product');

	if(cartitems && productsincart){
		productsincart.innerHTML = '';
		Object.values(cartitems).map( item =>{
			productsincart.innerHTML += `
			<div class="totalitems">
			<div><img src="${item.tag}.jpg">
				<div class="quantities">
					<i class="fa fa-minus-circle" aria-hidden="true"></i>
					<span class="numbersofitem">${item.incart}</span>
					<i class="fa fa-plus-circle" aria-hidden="true"></i></div></div>
		
			  
			   <div class="about">
					<p>${item.name}</p>
				<p class="quantity">1kg</p>
			   </div>
			
			<div class="price">
				   <p class="priceofitem">${item.price }/-</p>
			</div>
	
			<div class="totalprice">
				<p class="totalpriceofitem">${item.price * item.incart}/-</p>
			</div>
			<button class="remove">remove</button>
		</div>
			`

		});
		document.querySelector('.bill').innerHTML +=`
		<div class="baskettotalcontainer">
		<div><h4 class="baskettitle">Basket Total</h4></div>
		<div><h4 class="baskettotal">${totalprice}.00/-</h4></div>
		</div>
		`
	}
 }
 displaycart();


	var removeitems = document.querySelectorAll('.remove');
    for(let i=0;i<removeitems.length;i++){
		var button = removeitems[i];
		button.addEventListener('click', () =>{
		
			var buttonclicked =  event.target
			buttonclicked.parentElement.remove();
		})
	}

	
	document.querySelector('.fa-plus-circle').addEventListener('click', function(e) {
        e.preventDefault();
        var $input = $this.closest('.numbersofitem').find('input');
        var value = parseInt($input.val());

        if (value >= 1) {
        value = value + 1;
        } else {
            value =100;
        }

        $input.val(value);
    });