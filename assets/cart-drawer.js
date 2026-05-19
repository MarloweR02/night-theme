class CartDrawer extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.cart-open-trigger')
    this.overlay = this.querySelector('.cart-drawer__overlay')
    this.body = document.querySelector('body')
    this.cartDrawer = this.querySelector('.cart-drawer__main')
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
    const fakeCart = document.createElement('div')
    fakeCart =  e.detail.sections["cart-drawer"]

    console.log(fakeCart)
    
  }

  disconnectedCallback(){}
}

customElements.define("cart-drawer", CartDrawer)