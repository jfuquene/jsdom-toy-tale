const BASE_URL = 'http://localhost:3000/toys/'

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
   document.querySelector('.add-toy-form').addEventListener('submit', createToy)
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch(BASE_URL)
.then(res => res.json())
.then(data => data.forEach(renderToy))

const index = document.getElementById('toy-collection');

function renderToy(toy){
  let card = document.createElement('div')
    card.className = "card"

  let toyName = document.createElement('h2')
      toyName.innerText = toy.name
  
  let toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"

  let toyLikes = document.createElement('p')
      toyLikes.id = toy.id
      toyLikes.innerText = `${toy.likes} Likes`

  let btn = document.createElement('button')
      btn.className = 'like-btn'
      btn.innerText = "Need the likes plssss";
      btn.dataset.id = toy.id
      btn.dataset.likes = toy.likes
      btn.addEventListener('click', (e) => {
        likeAToy(e)
      })

      card.append(toyName, toyImg, toyLikes, btn)
      index.appendChild(card)

}

function createToy(e){
  e.preventDefault()

  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }



  let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(newToy)
  }
  
  fetch(BASE_URL, reqObj)
  .then(res => res.json())
  .then(renderToy)
}

function likeAToy(e) {
  
    
   let newLikes = { 
    likes: +e.target.dataset.likes + 1
   }

   let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(newLikes)
   }

   fetch(BASE_URL+e.target.dataset.id, reqObj)
   .then(res => res.json())
   .then(updatedToy => {
    e.target.dataset.likes = updatedToy.likes
    document.getElementById(updatedToy.id).innerText = `${updatedToy.likes} Likes`
  }) 


} 



