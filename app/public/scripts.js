const showAllBtn = document.querySelector('#show-all');
const form = document.querySelector('form');

showAllBtn.addEventListener('click', () => {
   fetch('/recipes/all')
      .then(res => res.json())
      .then(recipes => {
         recipes.forEach(recipe => {
            let method = '';
            for (let i = 0; i < recipe.method.length; i++) {
               method += `<p>${recipe.method[i]}</p>`;
            }

            // Create div element
            const div = document.createElement('div');

            // Set div innerHTML
            div.innerHTML = `
            <h2> ${recipe.name} </h2>
            ${method}
            `;

            // Add div to DOM
            form.insertAdjacentElement('beforeend', div);
         });
      });
});

form.addEventListener('submit', e => {
   e.preventDefault();

   const query = form.querySelector('#query').value;

   fetch(`/recipes/?tag=${query}`)
      .then(res => res.json())
      .then(recipes => console.log(recipes));
});
