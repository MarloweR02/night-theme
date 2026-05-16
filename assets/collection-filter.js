class CollectionFilter extends HTMLElement{
  constructor(){
    super()

    this.openTrigger = document.querySelector('.filter-open-trigger')
    this.overlay = this.querySelector('.collection-filter__overlay')
  }

  connectedCallback(){
    this.openTrigger.addEventListener('click', this.openFilter.bind(this))
    this.overlay.addEventListener('click', this.closeFilter.bind(this))
  }

  openFilter(){
    this.setAttribute('open', '')
  }

  closeFilter(){
    this.removeAttribute('open')
  }

  disconnectedCallback(){}
}

customElements.define('collection-filter', CollectionFilter)