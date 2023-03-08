export const FormElements = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="formElements">
    <div class="heading">
      <h2>Form Element</h2>
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
      <h3>Input Form Field</h3>
      <div class="botiqueForm">
        <input type="text" placeholder="Text here.">
        <code>
        <pre>
          input {
            margin: 1rem;
            font-size: 1.8rem;
            font-family: SourceSansPro;
            color: #231f20;
            border: 0.1rem solid #000000;
            padding: 1rem 2rem;
            border-radius: 3rem;
          }
        </pre>
        </code>
      </div>
     
    </div>

    <div class="botique">
    <h3>Text Area</h3>
    <div class="botiqueForm">
      <textarea>Text here. </textarea>
      <code>
      <pre>
        textarea {
            margin: 1rem;
            font-size: 1.8rem;
            font-family: SourceSansPro;
            color: #231f20;
            border: 0.1rem solid #000000;
            border-radius: 3rem;
            padding: 2rem 2rem;
            height: 8rem;
        }        
      </pre>
      </code>
    </div>
  </div>
  </section>
    `;
};
