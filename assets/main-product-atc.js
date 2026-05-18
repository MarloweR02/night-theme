class MainProductAtc extends HTMLElement{
  constructor(){
    super()

    this.form = this.querySelector('form[action="/cart/add"]')
    this.increaseBtn = this.form.querySelector('[increase]')
    this.decreaseBtn = this.form.querySelector('[decrease]')
    this.quantity = this.form.querySelector('[quantity]')
    this.mainQuantityInput = this.form.querySelector('input[name="quantity"]')
  }

  connectedCallback(){
    this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.increaseBtn.addEventListener('click', this.updateQuantity.bind(this))
    this.decreaseBtn.addEventListener('click', this.updateQuantity.bind(this))
  }

  handleSubmit(e){
    e.preventDefault()

    let formData = {
      'items': [{
       'id': this.form.querySelector("input[name='id']").value,
       'quantity': this.form.querySelector("input[name='quantity']").value
       }],
       "sections":"cart-drawer,cart-count"
     };
     
     fetch(window.Shopify.routes.root + 'cart/add.js', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })
     .then(response => {
       return response.json();
     })
     .then((data)=>{
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:rerender",{
          detail:data,
          bubbles:true
        })
      )
     })
     .catch((error) => {
       console.error('Error:', error);
     });
  }

  updateQuantity(e){
    this.clickedAction = e.currentTarget

    let currentQuantity = parseInt(this.quantity.value)
    
    if(this.clickedAction.hasAttribute("increase")){
      currentQuantity++
    } else if(this.clickedAction.hasAttribute("decrease")){
      currentQuantity = Math.max(1, currentQuantity - 1)
    }

    this.quantity.value = currentQuantity
    this.mainQuantityInput.value = currentQuantity

  }
  disconnectedCallback(){}
}

customElements.define('main-product-atc', MainProductAtc)
