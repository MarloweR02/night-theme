class CartDrawer extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.cart-open-trigger')
    this.overlay = this.querySelector('.cart-drawer__overlay')
  }

  connectedCallback(){
    this.openTrigger.addEventListener("click", this.openCart.bind(this))
    this.overlay.addEventListener("click", this.closeCart.bind(this))
    document.addEventListener('cart:rerender', this.renderCart.bind(this))
    
  }

  openCart(){
    this.setAttribute("open", "")

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
  }

  renderCart(){
    this.openCart()
  }

  disconnectedCallback(){}
}

customElements.define("cart-drawer", CartDrawer)