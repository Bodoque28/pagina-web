const page = document.body.dataset.page;
const navLinks = document.querySelectorAll("[data-link]");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sliders = document.querySelectorAll("[data-slider]");
const productCards = document.querySelectorAll(".catalog-card");
const productModal = document.getElementById("productModal");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalMessage = document.getElementById("modalMessage");
const modalPrice = document.getElementById("modalPrice");
const modalDiscount = document.getElementById("modalDiscount");
const modalOrderBtn = document.getElementById("modalOrderBtn");
const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
const teamMemberCards = document.querySelectorAll(".team-member-card");
const teamModal = document.getElementById("teamModal");
const teamModalTitle = document.getElementById("teamModalTitle");
const teamModalRole = document.getElementById("teamModalRole");
const teamModalCertificate = document.getElementById("teamModalCertificate");
const teamModalCloseButtons = document.querySelectorAll("[data-close-team-modal]");

navLinks.forEach((link) => {
  if (link.dataset.link === page) {
    link.classList.add("active");
  }
});

sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevButton = slider.querySelector(".prev");
  const nextButton = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".slider-dots");
  let currentIndex = 0;

  const dots = slides.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
    button.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(button);
    return button;
  });

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  showSlide(0);
  setInterval(() => showSlide(currentIndex + 1), 5000);
});

if (productModal && productCards.length) {
  const openProductModal = (card) => {
    const mediaSource = card.querySelector(".product-image, .thumb");
    const title = card.dataset.product || card.querySelector("h3")?.textContent || "";
    const description = card.dataset.description || card.querySelector("p")?.textContent || "";
    const message = card.dataset.message || "Una gran eleccion para disfrutar sabor, calidad y una compra rapida.";
    const price = card.querySelector(".price-row strong")?.textContent || "";
    const discount = card.querySelector(".price-row span")?.textContent || "";

    modalMedia.innerHTML = mediaSource ? mediaSource.outerHTML : "";
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalMessage.textContent = message;
    modalPrice.textContent = price;
    modalDiscount.textContent = discount;
    modalOrderBtn.href = `contactos.html?producto=${encodeURIComponent(title)}#pedido-formulario`;

    productModal.classList.add("open");
    productModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    productModal.classList.remove("open");
    productModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  productCards.forEach((card) => {
    card.addEventListener("click", () => openProductModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductModal(card);
      }
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProductModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && productModal.classList.contains("open")) {
      closeProductModal();
    }
  });
}

if (teamModal && teamMemberCards.length) {
  const openTeamModal = (card) => {
    teamModalTitle.textContent = card.dataset.member || card.querySelector("h3")?.textContent || "";
    teamModalRole.textContent = card.dataset.role || "Integrante del equipo desarrollador.";
    teamModalCertificate.textContent = card.dataset.certificate || "Certificado profesional del integrante.";

    teamModal.classList.add("open");
    teamModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeTeamModal = () => {
    teamModal.classList.remove("open");
    teamModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  teamMemberCards.forEach((card) => {
    card.addEventListener("click", () => openTeamModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTeamModal(card);
      }
    });
  });

  teamModalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeTeamModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && teamModal.classList.contains("open")) {
      closeTeamModal();
    }
  });
}

if (contactForm && formMessage) {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto");
  const asuntoInput = contactForm.querySelector('input[name="asunto"]');
  const mensajeInput = contactForm.querySelector('[name="mensaje"]');

  if (producto) {
    if (asuntoInput) {
      asuntoInput.value = `Pedido de ${producto}`;
    }

    if (mensajeInput) {
      mensajeInput.value = `Hola, quiero pedir el producto ${producto}. Por favor, brindarme mas informacion sobre disponibilidad y entrega.`;
    }
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre");
    const asunto = formData.get("asunto");

    formMessage.textContent = `Gracias ${nombre}. Tu mensaje sobre "${asunto}" fue registrado correctamente.`;
    contactForm.reset();
  });
}
