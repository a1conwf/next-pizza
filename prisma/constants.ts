export const categories = [
  {
    name: "Combo",
  },
  {
    name: "Pizza",
  },
  {
    name: "Snacks",
  },
  {
    name: "Desserts",
  },
  {
    name: "Drinks",
  },
  {
    name: "Coffee",
  },
];

export const ingredients = [
  {
    name: "Shrimps",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/c95d501214db42ff8e67a915d89cdda6.png",
  },
  {
    name: "Garlic",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/d2540b63fd5243a49ce8cb4f1fbf908e.png",
  },
  {
    name: "Pickles",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/64bf864e631a45a493653b0bb5e7891a.png",
  },
  {
    name: "Paprika",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/023cbaeb61f140139bdc1f5f54dc0633.png",
  },
  {
    name: "Bacon",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/419ba07585834b3abd0833c64f0106de.png",
  },

  {
    name: "Pepperoni",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/07e5208df6164cc3aca1f451313123b6.png",
  },
  {
    name: "Red onion",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/e5c17ba0a8114e11a50b82e57a448063.png",
  },
  {
    name: "Grated Italian hard cheese",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/29cc92468b234921a9f7fbfce5d3f122.png",
  },
  {
    name: "Champignons",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/7365d2de335f4ede89cdce6a4654022f.png",
  },
  {
    name: "Chicken",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/dc9acf4932a24a54890abed1bcdf2da8.png",
  },
  {
    name: "Mozarella cheese",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/c56e697199554cb18d1f8552c75310fd.png",
  },
  {
    name: "Blue cheese",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/98359b102a4f42e0aea815bcab52e822.png",
  },
  {
    name: "Ham",
    price: 2,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/303e37da474746dcb32f8cb30af6fdeb.png",
  },
  {
    name: "Tomatoes",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/da3e3756f08b44a7bfe58773438deeb5.png",
  },
  {
    name: "Pineapples",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/e1c04415c4624200b1703fa0e2358843.png",
  },
  {
    name: "Jalapeno",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b95474057ca04007a9bed5037b0c282d.png",
  },
  {
    name: "Cherry tomatoes",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/f71aeb915133495c988fa57069a53497.png",
  },
  {
    name: "Ground beef",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/138bf1c7f7e54b89885275f37f44f9d1.jpg",
  },
  {
    name: "Beef",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/79e591db824e4c44b0b37a9182279a93.jpg",
  },
  {
    name: "Rucola",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/3ec7536525a64bb68dded588f616b2f6.png",
  },
  {
    name: "Black olives",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/300468676adf430990656c0b9e2311fe.png",
  },
  {
    name: "Soft cheese",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/c0b05086706a44ad97f5b927d7848b9c.png",
  },
  {
    name: "Cheddar cheese",
    price: 1.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/d08f04377914445eaf93ccf71f442f31.png",
  },
  {
    name: "Hunter's sausages",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/2229c2d5972f4759b831a0185cd4b0ff.png",
  },
  {
    name: "Chorizo",
    price: 2.0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/9dc56a13558340a687d53f1ca00dfbaf.png",
  },
].map((obj, index) => ({ ...obj, id: index + 1 }));

export const products = [
  {
    name: "Sea Buckthorn Mango Punch",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF37E65771CBA08B1FCC3117697EED.avif",
    categoryId: 5,
  },
  {
    name: "Spicy Mango Punch",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF2048A7191C75AE5E4F74808D6DA2.avif",
    categoryId: 5,
  },
  {
    name: "Raspberry-honey tea",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF204897DE9B1DAEAA687FB3D739CC.avif",
    categoryId: 5,
  },
  {
    name: "Bubble Tea Passion fruit-Lychee",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF2D476AF2EAD18BE4EF71E99BC96F.avif",
    categoryId: 5,
  },
  {
    name: "Bubble Tea Strawberry-Lychee",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF2D47339ED34BBBE2056BDDFC34F4.avif",
    categoryId: 5,
  },
  {
    name: "Espresso-tonic",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF27F3AA8EDF5599EB335AE0326B6B.avif",
    categoryId: 5,
  },
  {
    name: 'Wrap  "Caesar"',
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EE7D5F5814F8AE95BD55A91B773AFF.avif",
    categoryId: 3,
  },
  {
    name: "Cheese starter",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EED23FDB5774A6B40A8E591D512DC6.avif",
    categoryId: 3,
  },
  {
    name: "Creamy baked potatoes with chicken",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EE7D5F59380C12B63A72B59131C822.avif",
    categoryId: 3,
  },
  {
    name: "Fondant",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EEEDC83C85E47C98B1CE69CBFAADCF.avif",
    categoryId: 4,
  },
  {
    name: "Chocolate donut",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EF2046BF2F3150ABF3E681BBFD7513.avif",
    categoryId: 4,
  },
  {
    name: "Sweet cinnamon rolls",
    imageUrl:
      "https://media.dodostatic.com/image/r:292x292/11EE96C5B9B5593A953DD3B99D1021B9.avif",
    categoryId: 4,
  },
];
