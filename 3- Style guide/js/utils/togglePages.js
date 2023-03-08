export function primaryMenu(itemClass, dataKey, toggle, callBackToMain) {
    var product = document.getElementsByClassName(itemClass);
  
    for (let i = 0; i < product.length; i++) {
      product[i].addEventListener("click", function () {
        toggle(this.getAttribute(dataKey),callBackToMain, product[i]);
      });
      
    }
    
  }
