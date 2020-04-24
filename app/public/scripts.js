const showAllBtn = document.querySelector('#show-all');
const searchForm = document.querySelector('form#search-recipes');
const addForm = document.querySelector('form#add-recipe');

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
            searchForm.insertAdjacentElement('beforeend', div);
         });
      });
});

searchForm.addEventListener('submit', e => {
   e.preventDefault();

   const query = searchForm.querySelector('#query').value;

   fetch(`/recipes/?tag=${query}`)
      .then(res => res.json())
      .then(recipes => console.log(recipes));
});

addForm.addEventListener('submit', e => {
   e.preventDefault();

   // Get form data
   const name = addForm.querySelector('#name').value;
   let method = addForm.querySelector('#method').value;
   let tags = addForm.querySelector('#tags').value;

   // Split method by new lines
   method = method.split(/\n/);
   // Split tags by commas
   tags = tags.split(',');

   // Create recipe object
   const recipe = {
      name,
      method,
      tags,
   };

   // POST JSON
   fetch('/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
   })
      .then(res => res.json())
      .then(data => {
         // Create p element
         const p = document.createElement('p');
         // Add text to p
         p.textContent = data.result;
         // Add p to DOM
         addForm.insertAdjacentElement('beforeend', p);
      });
});
