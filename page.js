// fetch data from api
function loadGallery(type) {
  fetch(`https://freetestapi.com/api/v1/${type}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('response not ok');
    }
    return response.json(); 
  })
  .then((data) => {     
    displayCards(data)
    showSearchBar() 
  })
  .catch((error) => {
    console.error('Error while fetching data:', error);
  });
}


// create cards for fetched data
function displayCards(animals) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  animals.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${animal.image}" alt="pet">
            <h2>${animal.name}</h2>
            <p>Origin: ${animal.origin}</p>
        `;
    card.addEventListener("click", () => showPopup(animal));
    container.appendChild(card);
  });
}

function showPopup(animal) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
          <h2>${animal.name}</h2>
          <img src="${animal.image}" alt="pet">
          <p>Origin: ${animal.origin}</p>
          <p>${animal.description}</p>
          <button onclick="closePopup()">
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
      `;
    document.body.appendChild(popup);
    document.getElementById("popup-bg").style.display = "block";
    popup.style.display = "block";
  }
  
  function closePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
      popup.remove();
    }
    document.getElementById("popup-bg").style.display = "none";
  }
//   search animal
function searchAnimals(event) {
  const input = event.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const name = card.querySelector("h2").textContent.toLowerCase();
    if (name.includes(input)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", searchAnimals);
});

// show search bar only after pet category is selected
function showSearchBar() {
  const searchBar = document.getElementById("search-bar");
  searchBar.classList.add("visible");

  console.log("Test");
}
