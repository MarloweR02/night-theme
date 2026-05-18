class WelcomePopup extends HTMLElement{
  constructor(){
    super()
    this.closeTrigger = this.querySelector('.popup-close-trigger')
    this.body = document.querySelector('body')
    
  }

  connectedCallback(){
    document.addEventListener("DOMContentLoaded", this.showPopup.bind(this))
    this.closeTrigger.addEventListener("click", this.closePopup.bind(this))
  }

  showPopup(){
    setTimeout(() => {
      this.setAttribute("show", "")
      this.body.classList.add('no-scroll')
    }, 2000);
  }

  closePopup(){
    this.removeAttribute('show')
    this.body.classList.remove('no-scroll')
  }

  
  disconnectedCallback(){}
}

customElements.define("welcome-popup", WelcomePopup)