document.addEventListener("DOMContentLoaded", async function () {
    const propertyList = document.getElementById("property-list");
    const paginationContainer = document.getElementById("pagination");
    const saleFilter = document.getElementById("for-sale");
    const rentFilter = document.getElementById("for-rent");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const slidesContainer = document.querySelector(".slides");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
  
    let currentPage = 1;
    const itemsPerPage = 10;
    let allProperties = [];
    let currentIndex = 0;
    let totalSlides = 0;
  
    async function fetchProperties() {
      try {
        const response = await fetch("../public/real_estates.json");
        allProperties = await response.json();
        renderProperties();
        renderPagination();
        renderSlider();
      } catch (error) {
        console.error("Hiba történt az ingatlanok lekérésekor:", error);
      }
    }
  
    function getFilteredProperties() {
      return allProperties
        .filter(property => {
          if (saleFilter.checked && rentFilter.checked) return true;
          if (saleFilter.checked) return property.status === "for sale";
          if (rentFilter.checked) return property.status === "for rent";
          return true;
        })
        .filter(property => {
          const query = searchInput.value.toLowerCase();
          return (
            property.title.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query)
          );
        })
        .sort((a, b) => {
          if (sortSelect.value === "price-asc") return a.price - b.price;
          if (sortSelect.value === "price-desc") return b.price - a.price;
          return 0;
        });
    }
  
    function renderProperties() {
      const filteredProperties = getFilteredProperties();
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProperties = filteredProperties.slice(start, end);
  
      propertyList.innerHTML = "";
      paginatedProperties.forEach(property => {
        const propertyCard = document.createElement("div");
        propertyCard.classList.add("property-card");
        propertyCard.innerHTML = `
          <img src="${property.image}" alt="${property.title}">
          <h2>${property.title}</h2>
          <p>${property.location}</p>
          <p>Ár: $${property.price.toLocaleString()}</p>
          <p>${property.description}</p>
        `;
        propertyCard.addEventListener("click", () => openModal(property));
        propertyList.appendChild(propertyCard);
      });
    }
  
    function renderPagination() {
      const totalPages = Math.ceil(getFilteredProperties().length / itemsPerPage);
      paginationContainer.innerHTML = "";
  
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        currentPage--;
        renderProperties();
        renderPagination();
      });
      paginationContainer.appendChild(prevButton);
  
      const totalPagesText = document.createElement("span");
      totalPagesText.innerText = `${currentPage} / ${totalPages}`;
      paginationContainer.appendChild(totalPagesText);
  
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        currentPage++;
        renderProperties();
        renderPagination();
      });
      paginationContainer.appendChild(nextButton);
    }
  

  
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
  
    saleFilter.addEventListener("change", fetchProperties);
    rentFilter.addEventListener("change", fetchProperties);
    searchInput.addEventListener("input", fetchProperties);
    sortSelect.addEventListener("change", fetchProperties);
  
    await fetchProperties();
  });
  