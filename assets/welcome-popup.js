class WelcomePopup extends HTMLElement{
  constructor(){
    super()
    this.closeTrigger = this.querySelector('.popup-close-trigger')
    this.body = document.querySelector('body')
    
  }

  connectedCallback(){
    this.showPopup()
    this.closeTrigger.addEventListener("click", this.closePopup.bind(this))
  }

  showPopup(){
    const isShown = sessionStorage.getItem('WelcomePopup')

    if(isShown) return

    setTimeout(() => {
      this.setAttribute("show", "")
      this.body.classList.add('no-scroll')

      sessionStorage.setItem("WelcomePopup", "true")
    }, 2000);
  }

  closePopup(){
    this.removeAttribute('show')
    this.body.classList.remove('no-scroll')
  }

  
  disconnectedCallback(){}
}

customElements.define("welcome-popup", WelcomePopup)