lets see how this would be set up

{
ratings: [
{
id: 0 // it would be in it's own table
rating: 5,
review: "string",
owner_id: 0 // id of the rater
}
],
recipes: [
{
"id": 1,
"author": 0 // id of the author
"name": "Chicken Tikka Masala",
"tags": ["chicken", "curry", "tomatoes", "spice"],
"method": [
"1. Get jar of Patak's Tikka Masala Spice Paste",
"2. Follow instructions on jar",
"3. Serve with Uncle Ben's microwave rice"
],
"ratings": []
},
{
"id": 2,
"author": 0 // id of the author
"name": "Ham & Pineapple Pizza",
"tags": ["pizza", "italian", "ham", "pineapple", "serial", "killer"],
"method": [
"1. Take Goodfellas Ham & Pineapple Pizza out of freezer",
"2. Follow instructions on box",
"3. Eat on sofa whilst binge-watching Friends"
],
"ratings": [
{
rating: 5,
review: "string",
owner_id: 0 // id of the rater
}
]
},
{
"id": 3,
"author": 0 // id of the author
"name": "Traditional English Breakfast",
"tags": ["breakfast", "bacon", "sausage", "egg", "beans", "tomatoes"],
"method": [
"1. Use ShopToDoor to order ingredients from local shop",
"2. Tip your delivery driver",
"3. Put all ingredients in microwave for 10mins until crispy",
"4. Leave positive feedback on your ShopToDoor experience"
],
"ratings": [
{
rating: 5,
review: "string",
owner_id: 0 // id of the rater
}
]
}
],

    users: [
       {
          name: "Dan",
          id: 0
       },
       {
          name: "Andrew",
          id: 1
       },
    ]

}
