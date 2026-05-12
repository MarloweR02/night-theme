class AnnouncementBar extends HTMLElement{
  constructor(){
    super()

    this.prev = this.querySelector('[announcement-prev]')
    this.next = this.querySelector('[announcement-next]')
    this.remove = this.querySelector('[announcement-remove]')
    this.announcements = this.querySelectorAll('[announcement-message]')
    this.carousel = this.querySelector('[announcement-carousel]')
    this.currentIndex = 0
  }

  connectedCallback(){
    this.prev.addEventListener('click', this.slidePrev.bind(this))
    this.next.addEventListener('click', this.slideNext.bind(this))
    this.remove.addEventListener('click', this.removeAnnouncement.bind(this))

  }

  slidePrev(){
    this.currentIndex--

    if(this.currentIndex < 0){
      this.currentIndex = this.currentIndex + this.announcements.length 
    }

    this.updateSlide()
    
  }

  slideNext(){
    this.currentIndex++

    if(this.currentIndex >= this.announcements.length){
      this.currentIndex = 0
    }

    this.updateSlide()
  }

  updateSlide(){
    const offset = this.currentIndex * 100
    this.carousel.style.transform = `translateX(-${offset}%)`

  }

  removeAnnouncement(){
  }

  disconnectedCallback(){}
}

customElements.define('announcement-bar', AnnouncementBar)