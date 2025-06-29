const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryBtns = document.querySelectorAll(".category-btn");

function filterProduct() {
  const searchValue = searchInput.value.toLowerCase();
  const productItems = document.querySelectorAll(".product-item");
  const activeBtn = document.querySelector(".category-btn.active");
  const activeCategory = activeBtn ? activeBtn.dataset.category : "all";

  productItems.forEach(item => {
    const titleEl = item.querySelector("h3");
    const title = titleEl.innerText.toLowerCase();
    const category = item.dataset.category.toLowerCase();

    const matchesSearch = title.includes(searchValue) || searchValue === "";
    const matchesCategory = category === activeCategory || activeCategory === "all";

    if (matchesSearch && matchesCategory) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function setCategory(e) {
  categoryBtns.forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");
  filterProduct();
}

// Event Listeners
searchBtn.addEventListener("click", filterProduct);
searchInput.addEventListener("keyup", filterProduct);
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") filterProduct();
});
categoryBtns.forEach(btn => btn.addEventListener("click", setCategory));

// Initial Run
filterProduct();
