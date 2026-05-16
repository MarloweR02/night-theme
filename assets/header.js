class HeaderSection extends HTMLElement{
  constructor(){
    super()

    this.announcement = document.querySelector('.announcement-bar')



  }

  connectedCallback(){
    const offsetTop = this.announcement ? this.announcement.offsetHeight : 0

    this.style.top = `${offsetTop}px`
  }
  disconnectedCallback(){}
}

customElements.define('header-section', HeaderSection)