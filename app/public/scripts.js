const elements = {
   user: document.getElementById('usersSelect'),
   name: document.getElementById('recipeName'),
   description: document.getElementById('recipeDescription'),
   button: document.getElementById('addRecipeButton'),
};

// body for adding new recipe
// what doo we need to create a new recipe?
// nope, i mean it does in the sense that we need to populate the db with the data
// but they can be named differently
// we will initialise the object with zero values for the fields
// zero values are empty values
// or just null
// Does that data need to line up with our database or not?
let body = {
   owner: null,
   name: null,
   description: null,
};

// set user for adding a new recipe
elements.user.addEventListener('change', e => {
   body.owner = +elements.user.value;
});

// set name for adding a new recipe
elements.name.addEventListener('input', e => {
   body.name = elements.name.value;
});

// set description for adding a new recipe
elements.description.addEventListener('input', e => {
   body.description = elements.description.value;
});

// want to do description?
// not that i can think of
// but you wouldn't typically have elemts object
// yeah that works too! Is there another way?

elements.button.addEventListener('click', async e => {
   const response = await fetch('/recipes', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
   });
   const json = await response.json();

   if (json.error) {
      alert(json.error);
      // we return here
      return;
   }
   // so this doesn't get run

   // do something on success
   alert('it worked');
});

const initializeInputs = async () => {
   // because we initialize the body object with a null user,
   //  we should reflect that in the ui with the input starting blank
   let users = await fetch(`/users`);
   users = await users.json();
   let option = document.createElement('option');
   option.value = null;
   option.innerHTML = 'select a user';
   option.disabled = true;
   option.selected = true;
   elements.user.appendChild(option);
   for (let user in users) {
      let option = document.createElement('option');
      option.value = users[user].id;
      option.innerHTML = users[user].name;
      elements.user.appendChild(option);
   }
};

initializeInputs();

// for adding a recipe, we don't yet have that route.
// but we will be posting a body, you know what that looks like?

// okay lets have a look

// Yeah I think I've touched on that before when I had a play...this is the bit that pickles me going between front and back end
// Get confused over what should be where lol
// what do we do with these values? no good just console logging lmao
// Haha always feels like an achievement though...
// They need to be part of our request...would they go in the url params?
// nice
// lets see if we have the id

// so we have users now

// see the issue it keeps going out ->
// Yeah that looks like a nightmare...top one's a lot cleaner
// the issue with promises is that you end up doing this..
// a more realistic usage of async await
// It just looks a lot like standard code apart from the async await keywords
// ...a lot easier to read and get your head around
// let me clean this up a sec
//okay that's a lot to take in
// lets go with that, let me show you a more realistic usage of it

// Yeah I had watched a few videos on asnyc and promises etc after you mentioned them ast time
// what about error handling in async await?

// end of 2. async await

// we can get around this by
// 1. using promises
// 2. using async await

// let me show you both ways and let you decide which you want to continue with

// what do you expect to be logged out here?
// you got it, so javascript isn't going to wait for get users to
// finish it's just going to execute the next line
// First one empty array, second one...maybe the data if it returns in time!?

// keeps things tidy ;D yep :D
// Never seen them stored in an object like that...i like that...Im borrowing that

// const showAllBtn = document.querySelector('#show-all');
// const searchForm = document.querySelector('form#search-recipes');
// const addForm = document.querySelector('form#add-recipe');

// showAllBtn.addEventListener('click', () => {
//    fetch('/recipes/all')
//       .then(res => res.json())
//       .then(recipes => {
//          recipes.forEach(recipe => {
//             let method = '';
//             for (let i = 0; i < recipe.method.length; i++) {
//                method += `<p>${recipe.method[i]}</p>`;
//             }

//             // Create div element
//             const div = document.createElement('div');

//             // Set div innerHTML
//             div.innerHTML = `
//             <h2> ${recipe.name} </h2>
//             ${method}
//             `;

//             // Add div to DOM
//             searchForm.insertAdjacentElement('beforeend', div);
//          });
//       });
// });

// searchForm.addEventListener('submit', e => {
//    e.preventDefault();

//    const query = searchForm.querySelector('#query').value;

//    fetch(`/recipes/?tag=${query}`)
//       .then(res => res.json())
//       .then(recipes => console.log(recipes));
// });

// addForm.addEventListener('submit', e => {
//    e.preventDefault();

//    // Get form data
//    const name = addForm.querySelector('#name').value;
//    let method = addForm.querySelector('#method').value;
//    let tags = addForm.querySelector('#tags').value;

//    // Split method by new lines
//    method = method.split(/\n/);
//    // Split tags by commas
//    tags = tags.split(',');

//    // Create recipe object
//    const recipe = {
//       name,
//       method,
//       tags,
//    };

//    // POST JSON
//    fetch('/recipes', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(recipe),
//    })
//       .then(res => res.json())
//       .then(data => {
//          // Create p element
//          const p = document.createElement('p');
//          // Add text to p
//          p.textContent = data.result;
//          // Add p to DOM
//          addForm.insertAdjacentElement('beforeend', p);
//       });
// });
