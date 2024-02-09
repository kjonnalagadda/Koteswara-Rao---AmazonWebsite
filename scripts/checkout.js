import { cart, cart as myCart,removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import Dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const currentDate = Dayjs();

let checkoutHTML = ``;
myCart.forEach((cartItems)=>{
    let productId = cartItems.productId;

    let matchingProduct;
    products.forEach((item) =>{
        if (productId === item.id){
            matchingProduct = item;
        }
    });
    console.log(matchingProduct);

    const oneDayAfter = formatDeliveryDate(1);
    const fiveDaysAfter = formatDeliveryDate(5);
    const nindeDaysAfter = formatDeliveryDate(9);


    checkoutHTML += `
        <div class="order-summary js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date-info">
                Delivery date: Friday, February 16
            </div>

            <div class="product-full-order-summary">
                <div>
                    <img src="${matchingProduct.image}" alt="" class="product-checkout-img" />
                </div>
                <div class="product-info">
                    <div class="prdouct-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-choice">
                        <div class="product-quantity">
                            Quantity: ${cartItems.quantity}
                        </div>
                        <div class="product-updation">
                            <span class="update-product">Update</span>
                            <span class="delete-product js-delete-product" data-product-id="${matchingProduct.id}">Delete</span>
                        </div>
                    </div>
                </div>

                <div class="product-delivery-option">
                    <div class="delivery-option">
                        Choose a delivery option:
                    </div>
                    <div class="product-free-shipping">
                        <div class="free-shipping-radio-btn">
                            <input type="radio" name="shippingOption-${matchingProduct.id}" id="freeShipping">
                        </div>
                        <div>
                            <div class="week-date-info js-nine-days-shipping"> ${nindeDaysAfter} </div>
                            <div>FREE Shipping</div>
                        </div>
                    </div>
                    <div class="product-within-fivedays-shipping">
                        <div class="fivedays-shipping-radio-btn">
                            <input type="radio" name="shippingOption-${matchingProduct.id}" id="withinFiveDaysShipping">
                        </div>
                        <div>
                            <div class="week-date-info js-five-days-shipping"> ${fiveDaysAfter} </div>
                            <div>$4.99 - Shipping</div>
                        </div>
                    </div>
                    <div class="product-oneday-shipping">
                        <div class="oneday-shipping-radio-btn">
                            <input type="radio" name="shippingOption-${matchingProduct.id}" id="oneDayShipping">
                        </div>
                        <div>
                            <div class="week-date-info js-one-day-shipping"> ${oneDayAfter} </div>
                            <div>$9.99 Shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
});


document.querySelector('.js-checkout-order-info').innerHTML = checkoutHTML;

document.querySelectorAll('.js-delete-product').
forEach((link) =>{
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId
        removeFromCart(productId)
        console.log(cart);

        const removeContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        console.log(removeContainer);
        removeContainer.remove();
    });
})

let cartQuantity = 0;
cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
});

document.querySelector('.js-items-quantity').innerHTML = `(${cartQuantity} items)`;

function formatDeliveryDate(days) {
    return (cart.length > 0) ? currentDate.add(days, 'day').format('dddd MMMM D') : '';
}





// const currentDateFormat = currentDate.format('dddd MMMM D');

// document.querySelector('.js-one-day-shipping').innerHTML = oneDayAfter;
// document.querySelector('.js-five-days-shipping').innerHTML = fiveDaysAfter;
// document.querySelector('.js-nine-days-shipping').innerHTML = nindeDaysAfter;


// console.log(oneDayAfter);
// console.log(fiveDaysAfter);
// console.log(nindeDaysAfter);