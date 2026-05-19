class CartDrawer extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.cart-open-trigger')
    this.overlay = this.querySelector('.cart-drawer__overlay')
    this.body = document.querySelector('body')
    this.cartDrawer = this.querySelector('.cart-drawer__main')
    this.cartCount = document.querySelector('.cart-count')
  }

  connectedCallback(){
    this.openTrigger.addEventListener("click", this.openCart.bind(this))
    this.overlay.addEventListener("click", this.closeCart.bind(this))
    document.addEventListener('cart:rerender', this.renderCart.bind(this))
  }

  openCart(){
    this.setAttribute("open", "")
    this.body.classList.add('no-scroll')

    if(this.hasAttribute('open')){
      document.addEventListener('click',(e)=>{
        if(e.target.closest('.cart-close-trigger')){
          this.closeCart()
        }
      })
    }
  }

  closeCart(){
    this.removeAttribute('open')
    this.body.classList.remove('no-scroll')
  }

  renderCart(e){
    this.openCart()
    let fakeCart = document.createElement('div')
    fakeCart.innerHTML =  e.detail.sections["cart-drawer"]
    
    this.cartDrawer.innerHTML = fakeCart.querySelector('.cart-drawer__main').innerHTML
    
    
    let fakeCount = document.createElement('div')
    fakeCount.innerHTML =  e.detail.sections["cart-count"]

    this.cartCount.innerHTML = fakeCount.querySelector('.cart-count').innerHTML
  }

  disconnectedCallback(){}
}

customElements.define("cart-drawer", CartDrawer)






class CartActions extends HTMLElement{
  constructor(){
    super()

    this.increase = this.querySelector('[increase]')
    this.decrease = this.querySelector('[decrease]')
    this.remove = this.querySelector('[remove]')
  }

  connectedCallback(){
    this.increase.addEventListener("click", this.handleClick.bind(this))
    this.decrease.addEventListener("click", this.handleClick.bind(this))
    this.remove.addEventListener("click", this.handleClick.bind(this))
  }

  handleClick(e){
    let formData = {
      'line': this.dataset.lineId,
      'quantity': parseInt(e.currentTarget.dataset.quantity),
      "sections": "cart-drawer,cart-count"
    }

    fetch(window.Shopify.routes.root + 'cart/change.js', {
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
      console.log(data)      
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
  disconnectedCallback(){}
}

customElements.define('cart-actions', CartActions)