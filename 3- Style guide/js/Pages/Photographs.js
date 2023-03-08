export const Photographs = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="photographs">
    <div class="heading">
      <h2>photographs</h2>
    </div>
    <div class="body">
      <p>
        Bits & Bots is in an online virtual store, for pro and novice gamers
        to purchase games without having to visit the store physically and 
        saves them from the hatic of CD's and DVD'd etc. Where users can 
        find different types of games with different Genres add them to cart or 
        favourite items list for future purchase and can pay online without any worries.  
      </p>
    </div>
  </section>
  <section class="mainInfo">
    <div class="botique">
      <h3>Default</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/default.png" alt="Botique"  column="400px" />
      </div>
      <h3>Hover</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/hover.png" alt="Botique"  column="400px" />
      </div>
      
    </div>
  </section>
    `;
};
