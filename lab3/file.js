// Отримуємо елементи з HTML
const priceSortCheckbox = document.getElementById("sort_checkbox_input");
const searchBtn = document.getElementById("search_button");
const totalCountBtn = document.getElementById("count_button");
const resetSearchBtn = document.getElementById("clear_button");
const searchField = document.getElementById("find_item");
const resetTotalCountBtn = document.getElementById("count_clear_button");

let perfumeCards = document.querySelectorAll(".cards_content");

let initialOrder = Array.from(perfumeCards);

let perfumePrices = Array.from(perfumeCards).map(card => {
  return {
    element: card,
    price: parseInt(card.querySelector(".cards__price").textContent.replace("Price: ", "").replace("грн", ""))
  };
});

function arrangeCardsByPrice(isDescending = true) {
  if (isDescending) {
    perfumePrices.sort((a, b) => b.price - a.price);
  } else {
    perfumePrices = initialOrder.map(card => {
      return {
        element: card,
        price: parseInt(card.querySelector(".cards__price").textContent.replace("Price: ", "").replace("грн", ""))
      };
    });
  }

  let container = document.getElementById("items_container");
  perfumePrices.forEach(cardObj => {
    container.appendChild(cardObj.element);
  });
}

priceSortCheckbox.addEventListener("change", (event) => {
  const isDescending = event.target.checked;
  arrangeCardsByPrice(isDescending);
});

function searchPerfumeCards() {
    const query = searchField.value.toLowerCase();
    
    let matchedCards = Array.from(perfumeCards).filter(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        return title.includes(query);
    });
    
    perfumeCards.forEach(card => card.style.display = "none");
    matchedCards.forEach(card => card.style.display = "block");
}

searchBtn.addEventListener("click", searchPerfumeCards);

resetSearchBtn.addEventListener("click", () => {
  searchField.value = "";
  searchPerfumeCards();
});

function computeVisibleTotalPrice() {
    let total = perfumePrices.reduce((sum, cardObj) => {
        if (cardObj.element.style.display !== "none") {
            return sum + cardObj.price;
        }
        return sum;
    }, 0);
    return total;
}

function showTotalPrice() {
  let totalPrice = computeVisibleTotalPrice();
  let totalSumElement = document.getElementById("sumprice");
  totalSumElement.textContent = `${totalPrice} грн`;

}

totalCountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showTotalPrice();
});

resetTotalCountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let totalSumElement = document.getElementById("sumprice");
    totalSumElement.textContent = "0";
});