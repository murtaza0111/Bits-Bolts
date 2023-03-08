export const Logo = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="logos">
    <div class="heading">
      <h2>Logo</h2>
    </div>
    <div class="body">
      <p>
        Bits&Bolts is the name of our brand.
        The color in brand logo is Bullet Shell is of a high brightness and a medium saturation, 
        reflect the very popular, modern yet elegant style of international boutique hotels. 
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
      <h3>Word Mark</h3>
      <div class="botiqueColors">
        <div class="color1">White <br /> <br /> #ffffff</div>
        
        <div class="color2">Zeus <br /> <br /> #333333</div>
      </div>
      <div class="botiqueLogo">
        <img src="./../../assets/icons/logo.png" alt="Botique" />
      </div>
    </div>
  </section>
    `;
};
