class ProductCardAtc extends HTMLElement{
  constructor(){
    super()
    
    this.form = this.querySelector('form[action="/cart/add"]')
  }

  connectedCallback(){
    this.form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  handleSubmit(e){
    e.preventDefault()

    let formData = {
      'items': [{
       'id': this.form.querySelector("input[name='id']").value,
       'quantity': this.form.querySelector("input[name='quantity']").value
       }],
       "sections":"cart-drawer,cart-count"
     };
     
     fetch(window.Shopify.routes.root + 'cart/add.js', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })
     .then(response => {
       return response.json();
     })
     .then((data)=>{
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:rerender",{
          detail:data,
          bubbles:true
        })
      )
     })
     .catch((error) => {
       console.error('Error:', error);
     });
  }
  disconnectedCallback(){}
}

customElements.define('product-card-atc', ProductCardAtc)