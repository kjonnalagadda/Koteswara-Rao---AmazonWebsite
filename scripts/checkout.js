import { cart, cart as myCart,removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import Dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

    const deliveryOptionId = cartItems.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) =>{
        if (option.id === deliveryOptionId){
            deliveryOption = option;
            console.log(option, 'fddfssdfds')
        }
    });

    const currentDate = Dayjs();
    const deliveryDate = deliveryOption ? currentDate.add(deliveryOption.deliveryDays, 'days') : currentDate;  // Check if deliveryOption is defined
    // const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');


    checkoutHTML += `
        <div class="order-summary js-cart-item-container-${matchingProduct.id}">

            <div class="delivery-date-info js-delivery-date-${matchingProduct.id}">
                Delivery date: ${dateString}
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
                    
                    ${deliveryOptionsHTML(matchingProduct, cartItems)}

                </div>
            </div>
        </div>`
});

// let deliveryHTML = ``;
function deliveryOptionsHTML(matchingProduct, cartItems){
    let html = '';

    deliveryOptions.forEach((deliveryOption) =>{
        const currentDate = Dayjs();
        const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM, D');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`

        const isChecked = deliveryOption.id === cartItems.deliveryOptionId;

        html += `
        <div class="product-shipping">
            <div class="shipping-radio-btn js-delivery-option" 
            data-product-id = "${matchingProduct.id}" data-delivery-option-id=${deliveryOption.id}>
                <input type="radio" 
                ${isChecked ? 'checked': ''} name="shippingOption-${matchingProduct.id}">
            </div>
            <div>
                <div class="week-date-info"> ${dateString} </div>
                <div class="price-info">${priceString} Shipping</div>
            </div>
        </div>`
    });

    return html;
};


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

// document.querySelectorAll('.js-delivery-option').forEach((element) =>{
//     element.addEventListener('click', () =>{
//         const {productId, deliveryOptionId} = element.dataset;
//         updateDeliveryOption(productId, deliveryOptionId);
//     })
// })

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        updateDeliveryDate(productId);
    });
});

function updateDeliveryDate(productId) {
    const matchingItem = myCart.find((cartItem) => cartItem.productId === productId);

    if (matchingItem) {
        const deliveryOption = deliveryOptions.find((option) => option.id === matchingItem.deliveryOptionId);

        if (deliveryOption) {
            const currentDate = Dayjs();
            const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
            if (deliveryDateElement) {
                deliveryDateElement.textContent = `Delivery date: ${dateString}`;
            }
        }
    }
}



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


// const oneDayAfter = formatDeliveryDate(1);
// const fiveDaysAfter = formatDeliveryDate(5);
// const nindeDaysAfter = formatDeliveryDate(9);
