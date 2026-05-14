class SearchBar extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.search-open-trigger')
    this.overlay = this.querySelector('.search__overlay')
  }

  connectedCallback(){
    this.openTrigger.addEventListener('click', this.openSearch.bind(this))
    this.overlay.addEventListener('click', this.closeSearch.bind(this))
  }

  openSearch(){
    this.setAttribute('open', '')
  }
  closeSearch(){
    this.removeAttribute('open')
  }

  disconnectedCallback(){}
}

customElements.define("search-bar", SearchBar)