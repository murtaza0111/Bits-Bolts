export const Buttons = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="coreElements">
    <div class="heading">
      <h2>Buttons</h2>
    </div>
    <div class="body">
    <p>
    Bits&Bolts is the name of our brand.
    The color in brand logo is Bullet Shell is of a high brightness and a medium saturation, 
    reflect the very popular, modern yet elegant style of Bits&Bolts e-store. 
    A symbol of belonging is our strong wordmark and our most recognizable brand assets.
  </p>
  <p>
    The preferred approach is to use the Botique logo by itself, unlocked
    from the wordmark. This allows flexibility to present the Botique with
    greater prominence while maintaining a considered, open and modern
    presentation.
  </p>
    </div>
  </section>
  <section class="mainInfo">
    <div class="botique">
      <h3>Primary</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/primary.png" alt="primary"  column="400px" />
      </div>
      <h3>Secondary</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/secondary.png" alt="secondary"  column="400px" />
      </div>
      
      <h3>Other</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/others.png" alt="others"  column="400px" />
      </div>
    </div>
  </section>
  
    `;
};
