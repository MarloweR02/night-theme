const fadeInUpEls = document.querySelectorAll('.fade-in-up')

const observerFadeInUp = new IntersectionObserver((entries, observer)=>{
  entries.forEach((entry, index)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('animate')
      entry.target.style.animationDelay = `${index * 100}ms`
      observer.unobserve(entry.target)
    }
  })
},
{
  threshold: 0.7
})

fadeInUpEls.forEach((el)=>{
  observerFadeInUp.observe(el)
})