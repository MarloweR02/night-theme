class CartDrawer extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.cart-open-trigger')
    this.overlay = this.querySelector('.cart-drawer__overlay')
  }

  connectedCallback(){
    this.openTrigger.addEventListener("click", this.openCart.bind(this))
    this.overlay.addEventListener("click", this.closeCart.bind(this))
  }

  openCart(){
    this.setAttribute("open", "")
  }

  closeCart(){
    this.removeAttribute('open')
  }

  disconnectedCallback(){}
}

customElements.define("cart-drawer", CartDrawer)