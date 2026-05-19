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