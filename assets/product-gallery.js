class ProductGallery extends HTMLElement{
  constructor(){
    super()

    this.navLeft = this.querySelector('[nav-left]')
    this.navRight = this.querySelector('[nav-right]')
    this.featuredImage = this.querySelectorAll('.product-gallery__image')
    this.featureCarousel = this.querySelector('.product-gallery__carousel')

    this.galleryImages = this.querySelectorAll(".product-gallery__storage-image")

    this.currentIndex = 0
  }


  connectedCallback(){
    this.navLeft.addEventListener('click', this.slideLeft.bind(this))
    this.navRight.addEventListener('click', this.slideRight.bind(this))
    this.galleryImages.forEach((image)=>{
      image.addEventListener('click', this.galleryUpdate.bind(this))
    })
  }


  slideLeft(){
    this.currentIndex--

    if( this.currentIndex < 0){
      this.currentIndex = this.featuredImage.length - 1
    }

    this.updateFeaturedImage()
    this.galleryActiveUpdate()
  }


  slideRight(){
    this.currentIndex++

    if( this.currentIndex >= this.featuredImage.length){
      this.currentIndex = 0
    }

    this.updateFeaturedImage()

    this.galleryActiveUpdate()
  }


  updateFeaturedImage(){
    const offset = this.currentIndex * 100
    this.featureCarousel.style.transform = `translateX(-${offset}%)`
  }


  galleryUpdate(e){
    this.clickedImage = e.currentTarget

    const index = Array.from(this.galleryImages).indexOf(this.clickedImage)

    this.galleryImages.forEach((img)=>{
      img.classList.remove('active')
    })

    this.clickedImage.classList.add('active')

    this.currentIndex = index
    this.updateFeaturedImage()
  }

  galleryActiveUpdate(){
    this.galleryImages.forEach((img, index)=>{
      img.classList.remove('active')

      if(index == this.currentIndex){
        img.classList.add('active')
      }
    })
  }


  disconnectedCallback(){}
}

customElements.define("product-gallery", ProductGallery)