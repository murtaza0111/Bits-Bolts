export const PagesLayouts = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="pagesLayout">
    <div class="heading">
      <h2>Layout</h2>
    </div>
    <div class="body">
      <p>
      The grid system used in this design system has an 8px base.
      </p>
      <p>All elements must be distributed with the factors and multiples of 8.
      </p>
    </div>
  </section>
  <section class="mainInfo">

  <div class="botique">
    <h3>Grid System</h3>
    <div class="botiqueGrid">
    <img src="./../../assets/images/grid.png" alt="Botique" width="400px" column="400px" />
    
    <img src="./../../assets/images/view.png" alt="Botique" width="400" column="700" />
    </div>
    
    </div>

</section>
    `;
};
