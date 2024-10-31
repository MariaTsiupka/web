const sortCheckbox = document.getElementById("sort_checkbox_input");
const searchButton = document.getElementById("search_button");
const countButton = document.getElementById("count_button");
const clearButton = document.getElementById("clear_button");
const findItem = document.getElementById("find_item");
const itemsContainer = document.getElementById("items_container");
const countClearButton = document.getElementById("count_clear_button");

document.addEventListener("DOMContentLoaded", function () {
    let perfumes = JSON.parse(localStorage.getItem("perfumes")) || [];
    let originalOrder = [...perfumes];
    let filteredPerfumes = [...perfumes];

    function renderPerfumes(perfumeArray = filteredPerfumes) {
        itemsContainer.innerHTML = "";

        perfumeArray.forEach((perfume, index) => {
            const perfumeHTML = `
                <li id="perfume${index + 1}" class="cards_content">
                    <img src="images/carolina-herrera-good-girl___220407.webp" alt="Perfume Image" class="cards_img">
                    <div class="cards_body">
                        <h2 class="cards_title">${perfume.title}</h2>
                        <p>${perfume.description}</p>
                        <p class="cards_price">Price: ${perfume.expense} $</p>
                        <div class="cards_buttons">
                            <button class="cards_edit">Edit</button>
                            <button class="cards_remove">Remove</button>
                        </div>
                    </div>
                </li>
            `;

            itemsContainer.insertAdjacentHTML("beforeend", perfumeHTML);

            const removeButton = itemsContainer.querySelector(`#perfume${index + 1} .cards_remove`);
            removeButton.addEventListener("click", () => {
                removePerfume(perfume);
            });

            const editButton = itemsContainer.querySelector(`#perfume${index + 1} .cards_edit`);
            editButton.addEventListener("click", () => {
                editPerfume(perfumes.indexOf(perfume));
            });
        });
    }

    function removePerfume(perfume) {
        const perfumeIndex = perfumes.indexOf(perfume);
        if (perfumeIndex > -1) {
            perfumes.splice(perfumeIndex, 1);
            filteredPerfumes = filteredPerfumes.filter(item => item !== perfume);
            renderPerfumes(filteredPerfumes);
            localStorage.setItem("perfumes", JSON.stringify(perfumes));
        }
    }
        function editPerfume(index) {
        const perfume = perfumes[index];
        localStorage.setItem('editPerfumeId', perfume.id);
        window.location.href = "edit.html";
    }
    

    function filterPerfumes() {
        const searchTerm = findItem.value.toLowerCase();
        filteredPerfumes = perfumes.filter(perfume => {
            const title = perfume.title.toLowerCase();
            return title.includes(searchTerm);
        });
        renderPerfumes(filteredPerfumes);
    }

    function sortPerfumesByPrice(descending = true) {
        if (descending) {
            filteredPerfumes.sort((a, b) => b.expense - a.expense);
        } else {
            filteredPerfumes = [...perfumes].filter(perfume => filteredPerfumes.includes(perfume));
        }

        renderPerfumes(filteredPerfumes);
    }

    sortCheckbox.addEventListener("change", (event) => {
        const descending = event.target.checked;
        sortPerfumesByPrice(descending);
    });

    function calculateTotalPrice() {
        let total = filteredPerfumes.reduce((sum, perfume) => {
            return sum + parseInt(perfume.expense);
        }, 0);
        return total;
    }

    function displayTotalPrice() {
        let totalPrice = calculateTotalPrice();
        let totalSumElement = document.getElementById("sumprice");
        totalSumElement.textContent = `${totalPrice} $`;
    }

    countButton.addEventListener("click", (event) => {
        event.preventDefault();
        displayTotalPrice();
    });

    countClearButton.addEventListener("click", (event) => {
        event.preventDefault();
        let totalSumElement = document.getElementById("sumprice");
        totalSumElement.textContent = "0 $";
    });

    searchButton.addEventListener("click", filterPerfumes);

    clearButton.addEventListener("click", () => {
        findItem.value = "";
        filteredPerfumes = [...perfumes];
        renderPerfumes(filteredPerfumes);
    });

    renderPerfumes();
});
