import { cart, addtoCart } from "../data/cart.js";
import { products } from "../data/products.js";


let productsHTML = ``;

products.forEach((product) =>{
    productsHTML += `
        <div class="product-container">
            <div class="product-position">
                <div class="product-img">
                    <img class="item-img" src="${product.image}" alt="">
                </div>
                <div class="img-info limit-to-2-lines">
                    ${product.name}
                </div>
                <div class="ratings">
                    <img class="ratings-img" src="images/ratings/rating-${(product.rating.stars)*10}.png" alt="">
                    <div class="product-rating-count">${product.rating.count}</div>
                </div>
                <div class="price-contanier">
                    ${(product.priceCents / 100).toFixed(2)}
                </div>
                <div class="selection-option js-selection-option">
                    <select id="mySelect">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>

            <div class="btn-container">
                <button class="btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>`;
})


document.querySelector('.js-main-section-grid').innerHTML = productsHTML;


function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantity;
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    });
}

function updateCartQuantityShow(){
    let cartQuantity = 0;
    cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantity;
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
}


document.querySelectorAll('.btn').forEach((button) =>{
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;
        addtoCart(productId);
        updateCartQuantity();
    });
})

