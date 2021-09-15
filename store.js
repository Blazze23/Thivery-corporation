if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    if(localStorage.getItem("lastAlbum")!= null) {
        const lastAlbum = document.getElementById("latestAlbum")
        const title = lastAlbum.getElementsByClassName("shop-item-title")[0].innerText;
        const price = lastAlbum.getElementsByClassName("shop-item-price")[0].innerText;
        const imageSrc = lastAlbum.getElementsByClassName("shop-item-img")[0].src;
        addItemToCart(title, price, imageSrc);
        updateCartTotal();
        localStorage.removeItem("lastAlbum");
    }
    const removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for(let i=0; i<removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem)
    }

    const quantityInput = document.getElementsByClassName("cart-quant-input");
    for(let i=0; i<quantityInput.length; i++) {
        const input = quantityInput[i];
        input.addEventListener("change", quantityChanged)
    }

    const addToCartButtons = document.getElementsByClassName("shop-item-btn");
    for(let i=0; i<addToCartButtons.length; i++) {
        const button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked)
    }
    
    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseCliked);

}

function removeCartItem(event) {
        const buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    const imageSrc = shopItem.getElementsByClassName("shop-item-img")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    swal.fire("Info","Item added to the cart!", "success");
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    const cartItems = document.getElementsByClassName("cart-items")[0];
    const cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for(let i = 0; i<cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            swal.fire("Oops...", "This item has already been added to the cart!", "error");
            return;
        }
    }
    const cartRowContents = `
    <div class="cart-item cart-colum">
        <img class="cart-item-img" src="${imageSrc}" alt="album7" width="100" height="100" />
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-colum">${price}</span>
    <div class="cart-quant cart-colum">
        <input class="cart-quant-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-quant-input")[0].addEventListener("change", quantityChanged);
    
}

function purchaseCliked() {
    const totalPrice = document.getElementsByClassName("cart-total-price")[0].innerText;
    if(totalPrice == "$0") {
        swal.fire("Oops...","Please add items to the cart first", "error");
    } else {
        swal.fire("Info","Thank you for your purchase", "success");
        const cartItems = document.getElementsByClassName("cart-items")[0];
        while(cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
    }
 
}

function updateCartTotal() {
    let total = 0;
    const cartItemContainer = document.getElementsByClassName("cart-items")[0];
    const cartRows = cartItemContainer.getElementsByClassName("cart-row");
    for(let i=0; i<cartRows.length; i++) {
        const cartRow = cartRows[i];
        const priceElement = cartRow.getElementsByClassName("cart-price")[0];
        const quantityElement = cartRow.getElementsByClassName("cart-quant-input")[0];
        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const quantity = quantityElement.value;
        total= total +(price * quantity);
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total;
}
