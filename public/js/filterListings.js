const listings = document.querySelectorAll(".listing-card");
const countryFilter = document.getElementById("countryFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const taxSwitch = document.getElementById("taxSwitch");

// Update displayed price value
priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
  applyFilters();
});

// Filter whenever any input changes
[countryFilter, priceRange, taxSwitch].forEach(input =>
  input.addEventListener("change", applyFilters)
);

// Filtering logic
function applyFilters() {
  const selectedCountry = countryFilter.value;
  const maxPrice = parseInt(priceRange.value);
  const includeTax = taxSwitch.checked;

  listings.forEach(card => {
    const price = parseInt(card.dataset.price);
    const country = card.dataset.country;

    const showByCountry = !selectedCountry || country === selectedCountry;
    const showByPrice = price <= maxPrice;
    const shouldShow = showByCountry && showByPrice;

    card.style.display = shouldShow ? "" : "none";

    // Update price display with/without tax
    const priceText = card.querySelector(".price-text");
    const basePrice = parseInt(priceText.dataset.base);
    const finalPrice = includeTax ? Math.round(basePrice * 1.18) : basePrice;
    priceText.textContent = `₹ ${finalPrice} / night`;
  });
}

applyFilters(); // Run on load
