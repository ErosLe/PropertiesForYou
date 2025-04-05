
document.addEventListener("DOMContentLoaded", async function () {
  const slidesContainer = document.querySelector(".slides");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let totalSlides = 0;
  let allProperties = [];

  async function fetchProperties() {
    try {
      const response = await fetch("../public/real_estates.json");
      allProperties = await response.json();
      renderSlider();
    } catch (error) {
      console.error("Hiba történt az ingatlanok lekérésekor:", error);
    }
  }

  function renderSlider() {
    slidesContainer.innerHTML = allProperties.map((property, index) => `
      <div class="slide" data-index="${index}">
        <img src="${property.image}" alt="${property.title}">
      </div>
    `).join("");
    totalSlides = allProperties.length;
    showSlide(currentIndex);

    document.querySelectorAll(".slide").forEach(slide => {
      slide.addEventListener("click", () => {
        const index = parseInt(slide.getAttribute("data-index"));
        openModal(allProperties[index]);
      });
    });
  }

  function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveSlide(step) {
    showSlide(currentIndex + step);
  }

  prevButton.addEventListener("click", () => moveSlide(-1));
  nextButton.addEventListener("click", () => moveSlide(1));
  setInterval(() => moveSlide(1), 3000);

  function openModal(property) {
    const modal = document.getElementById("propertyModal");
    document.getElementById("modalTitle").textContent = property.title;
    document.getElementById("modalLocation").textContent = property.location;
    document.getElementById("modalPrice").textContent = `$${property.price}`;
    document.getElementById("modalDescription").textContent = property.description;
    const gallery = document.getElementById("modalGallery");
    gallery.innerHTML = "";
    property.gallery.forEach(imgSrc => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = property.title;
      gallery.appendChild(img);
    });
    document.getElementById("gmap").src = `https://www.google.com/maps?q=${property.lat},${property.lng}&hl=hu&z=14&output=embed`;
    modal.style.display = "block";
  }

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("propertyModal").style.display = "none";
  });

  await fetchProperties();
});
