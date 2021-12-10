//add items to cart when button is clicked
let carts = document.querySelectorAll(".add-cart");
//Products
let products = [{
        name: "Green Dress",
        tag: "greendress",
        price: 750,
        inCart: 0,
    },

    {
        name: "Mustard Dress",
        tag: "mustarddress",
        price: 1450,
        inCart: 0,
    },

    {
        name: "Pleated Skirt",
        tag: "pleatedskirt",
        price: 1220,
        inCart: 0,
    },

    {
        name: "Denim Skirt",
        tag: "denimskirt",
        price: 600,
        inCart: 0,
    },

    {
        name: "Black Heels",
        tag: "blackheels",
        price: 850,
        inCart: 0,
    },

    {
        name: "Leather Bag",
        tag: "leatherbag",
        price: 2200,
        inCart: 0,
    },

    {
        name: "Block Sandal",
        tag: "blocksandal",
        price: 760,
        inCart: 0,
    },

    {
        name: "Snakeskin Bag",
        tag: "snakeskinbag",
        price: 2400,
        inCart: 0,
    },
];
//coupon discount vouchers
let coupons = [{
        name: "FREEDEC01",
        percentage: 10,
    },
    {
        name: "FREEDEC02",
        percentage: 15,
    },
    {
        name: "FREEDEC03",
        percentage: 20,
    },
];
//Delivery options and cost
let delivery = [{
        name: "Same day",
        cost: 150,
    },

    {
        name: "Standard",
        cost: 75,
    },

    {
        name: "Overnight",
        cost: 110,
    },

    {
        name: "Click and collect",
        cost: 0,
    },
];

//on click of add to cart button, items and price increase/are added to the cart
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}
//storage for cart items
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    //changed to number from string
    productNumbers = parseInt(productNumbers);
    //item number increase in cart when clicked
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(product);
}
//keep clicked items in the cart, avoid initial item being overriden when new item is added
function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    //item not clicked before to be added to the cart as well
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product,
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//show cost of items and alert total cost when items are added to cart
function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    alert("Your total cost is" + " " + cartCost);

    //Price of items increases on adding them to the cart
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
//function to calculate discount

let updateTotal = document.getElementById(".amtIn");
updateTotal = addEventListener("onChange", function () {
    document.querySelector(".basketTotal").innerHTML =
        document.getElementById("amtIn").value;
});
let applyDiscount = document.querySelector(".apply");
applyDiscount = addEventListener("click", function () {
    let coupon = document.getElementById("coupon").value;

    let amount = Number(localStorage.getItem("totalCost"));
    for (let i = 0; i < coupons.length; i++) {
        if (coupon == coupons[i].name) {
            console.log(coupons[i].name);
            let discount = Math.floor(amount * (coupons[i].percentage / 100));
            let finalDiscount = amount - discount;
            localStorage.setItem("totalCost", finalDiscount);
            console.log(localStorage.getItem("totalCost"));
        }
    }

});
//Confirm order and generate a reference number when order confirmed.

function myFunction() {
    let txt;
    let r = confirm("Confirm your order");
    if (r == true) {
        txt = `Your order number is: ${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}${Math.floor(Math.random() * 200000)}`;
    } else {
        txt = "Return to cart";
    }
    document.querySelector(".confirmOrder").innerHTML = txt;
}

let shipping = 0;
// shipping cost
function shippingCost() {
    let shippingID = document.getElementById("deliveryOptions");
    let shippingCost = shippingID.options[shippingID.selectedIndex];
    shipping = Number(shippingCost.value);
    localStorage.setItem("shippingCost", shipping)
    document.getElementById("shipAmt").innerHTML = shippingCost.value;
}

//function to display cart items to run on the cart page as well as allow VAT to be added to total price
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = Number(localStorage.getItem("totalCost"));
    let shippingCost = Number(localStorage.getItem("shippingCost"));
    const vat = 0.14;
    let totalAmount = cartCost + (cartCost * vat) + shippingCost


    //show product details, price and total when in the cart
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map((item) => {
            productContainer.innerHTML += `
         <div class = "product">
         <ion-icon name="close-circle"></ion-icon>
         <img src="./media/${item.tag}.jpg">
         <span>${item.name}</span>
         </div>
         <div class="cart-price">R${item.price},00</div>
         <div class="quantity">
         <ion-icon name="arrow-dropleft-circle"></ion-icon>
         <span>${item.inCart}</span>
         <ion-icon name="arrow-dropright-circle"></ion-icon>
         </div>
         <div class="total">
         R${item.inCart * item.price},00
         </div
      
      
      `;
        });
        //Basket total html created as well as allow total to show when items are added to cart
        productContainer.innerHTML += `
        
        <div class="valueTax">
        <h5 class="taxTitle">VAT</h5>
        <h5 class="vatAmt">${Math.floor(vat * 100)}%</h5>
        </div>
        <div class="shippingCost">
        <p class="shipping">Shipping</p>
        <h5 class="shipAmt" id="shipAmt">R${shippingCost}</h5>
        </div>
        <div class="discount">
        <form>
            <input type="text" id="coupon" placeholder="Enter Voucher">
        </form>
        <button class="apply">Apply</button>
       </div>
       
       
        <div class ="basketTotalContainer">
        <h5 class ="basketTotalTitle">Basket Total</h5>
        <h5 class ="basketTotal">
            R${totalAmount}
         </h5> 
         </div> 

         
     
     
     `;
    }
}

onLoadCartNumbers();
displayCart();

//Dropdown menu
$(document).ready(function () {
    $("li").hover(function () {
        $(this).find("ul>li").fadeToggle(400);
    })
})
//Function to show and hide on mouse over
$(document).ready(function () {
    $(".heading").hover(function () {
        $(".heading").fadeToggle(3000).fadeToggle(3000);
    });
});
//Animation Effects, on mouse over the section moves to the left
$(document).ready(function () {
    $(".text-box").click(function () {
        $("div").animate({
            left: '250px'
        });
    });
});
//Chained effects on click section moves up and text color changes
$(document).ready(function () {
    $(".about-section").hover(function () {
        $("#p1").css("color", "brown").slideUp(2000).slideDown(2000);
    });
});


/*Sources used in this task include previous tasks, Hyperiondev notes, You Tube, 
Stackoverflow, W3Schools, Google.com, Codepen, Morzilla*/