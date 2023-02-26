
const itemsData = [
    {
        name: "Pizza",
        ingredients: ["pepperoni, mushroom, mozarella, tomato"],
        id: 0,
        price: 15,
        emoji: "🍕",
        image: 'pizza.png'
    },
    {
        name: "Hamburger",
        ingredients: ["beef, cheese, lettuce"],
        price: 8,
        emoji: "🍔",
        id: 1,
        image: 'burger.png'
    },
    {
        name: "Juice",
        ingredients: ["water, sugar, apple"],
        price: 5,
        emoji: "🍺",
        id: 2,
        image: 'juice.png'
    }
]

const itemsDiv = document.querySelector('.items');
const ordersDiv = document.querySelector('.orders');
const yourOrderDiv = document.querySelector('.your-order');
const removebtn = document.querySelector('.remove');
const totalPriceDiv = document.querySelector('.total-price');
const completeOrderBtn = document.querySelector('.complete-order-btn');
const payForm = document.querySelector('.form');
const formCloseBtn = document.querySelector('.form-close-btn')
const payBtn = document.querySelector('.pay')
const cardDetailsDiv = document.querySelector('.card-details-form');
const main = document.querySelector('main');
const wrapper = document.querySelector('.wrapper');
const thankYouDiv = document.querySelector('.thank-you');
let orderCount = 0;
let totalPrice = 0;
let customerName = '';



document.addEventListener('click', (e) => {
    if (e.target.dataset.plus) {
        yourOrderDiv.style.display = 'block'
        ordersDiv.innerHTML += getOrderHtml(e.target.dataset.plus)
        orderCount += 1
        window.scrollTo(0, 100000)
        totalPriceDiv.innerText = '$' + totalPrice
        thankYouDiv.style.visibility = 'hidden'
    }
    else if (e.target.dataset.remove) {
        e.target.parentElement.parentElement.style.display = 'none';
        let toBedeductedTotal = e.target.parentElement.parentElement.querySelector('.order-price').innerText
        toBedeductedTotal = Number(toBedeductedTotal.substr(1, toBedeductedTotal.length - 1))
        totalPrice -= toBedeductedTotal
        totalPriceDiv.innerText = '$' + totalPrice
        orderCount -= 1
        if (orderCount === 0) {
            yourOrderDiv.style.display = 'none'
        }
    }
})



completeOrderBtn.addEventListener('click', () => {
    cardDetailsDiv.style.visibility = 'visible';
    main.scrollIntoView();
    wrapper.style.filter = 'blur(3px)';

})


payForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cardDetailsDiv.style.visibility = 'hidden';
    wrapper.style.filter = 'none';
    window.scrollTo(0, 10000);
    orderCount = 0
    totalPrice = 0
    ordersDiv.innerHTML = ''
    yourOrderDiv.style.display = 'none';
    customerName = document.querySelector('.customer-name').value;
    thankYouDiv.innerHTML = `Thank you ${customerName}, your order is on its way!`;
    thankYouDiv.style.visibility = 'visible';
})

formCloseBtn.addEventListener('click', () => {
    cardDetailsDiv.style.visibility = 'hidden';
    wrapper.style.filter = 'none';
})




const getItems = () => {


    let itemsHtml = ``
    itemsData.forEach(i => {

        itemsHtml +=
            `
        <div class="item">
        <div>

            <img src="${i.image}">
        </div>
        <div class="details">
        <div>
                <p class="name">${i.name}</p>
                
            </div>
            <div>
                <p class="ingredients">${i.ingredients}</p>

                </div>
                <div>
                <p class="price">$${i.price}</p>

                </div>
        </div>
        <div class="plus" data-plus="${i.id}">+</div>
    </div>
    

        `

    })
    return itemsHtml
}



const render = () => {
    itemsDiv.innerHTML = getItems()
}

const getOrderHtml = (id) => {
    let orderHtml = ``;

    itemsData.forEach(i => {
        if (id == i.id) {
            orderHtml =
                `
                <div class="single-order">
                    <div class="name-and-remove">
                        <div class="order-name">${i.name}</div>
                        <div data-remove="${true}" class="remove">remove</div> 
                    </div>

                    <div class="order-price">$${i.price}</div>
                
                </div>

                `
            totalPrice += i.price
        }
    })

    return orderHtml
}



render()







