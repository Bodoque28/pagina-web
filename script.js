const page = document.body.dataset.page;
const navLinks = document.querySelectorAll("[data-link]");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sliders = document.querySelectorAll("[data-slider]");
const orderToast = document.getElementById("orderToast");
const paymentTabs = document.querySelectorAll("[data-payment-tab]");
const paymentPanels = document.querySelectorAll("[data-payment-panel]");
const cardPaymentForm = document.getElementById("cardPaymentForm");
const cardNumberInput = document.getElementById("cardNumber");
const cardExpiryInput = document.getElementById("cardExpiry");
const cardBrand = document.getElementById("cardBrand");
const cardBank = document.getElementById("cardBank");
const cardHint = document.getElementById("cardHint");
const cardMasked = document.getElementById("cardMasked");
const yapeModal = document.getElementById("yapeModal");
const openYapeModalButton = document.getElementById("openYapeModal");
const yapeReceiptInput = document.getElementById("yapeReceiptInput");
const receiptPreview = document.getElementById("receiptPreview");
const yapeCloseButtons = document.querySelectorAll("[data-close-yape]");
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
const teamModalMessage = document.getElementById("teamModalMessage");
const teamModalImage = document.getElementById("teamModalImage");
const teamModalCloseButtons = document.querySelectorAll("[data-close-team-modal]");

navLinks.forEach((link) => {
  if (link.dataset.link === page) {
    link.classList.add("active");
  }
});

const showToast = (message) => {
  if (!orderToast) {
    return;
  }

  orderToast.textContent = message;
  orderToast.classList.add("show");
  setTimeout(() => orderToast.classList.remove("show"), 4200);
};

sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const slidesTrack = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".prev");
  const nextButton = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".slider-dots");
  let currentIndex = 0;

  if (!slides.length) {
    return;
  }

  if (!prevButton || !nextButton || !dotsContainer || slides.length === 1) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === 0);
    });
    return;
  }

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

    if (slider.classList.contains("showcase-slider") && slidesTrack) {
      slidesTrack.style.transform = "";
    }

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  showSlide(0);
  setInterval(() => showSlide(currentIndex + 1), 3000);
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
  const buildCertificatePlaceholder = (member, certificate) => {
    const safeMember = member || "Desarrollador";
    const safeCertificate = certificate || "Agrega aqui la imagen del certificado";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1a120e" />
            <stop offset="100%" stop-color="#5a301f" />
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffc247" />
            <stop offset="100%" stop-color="#ff7a1a" />
          </linearGradient>
        </defs>
        <rect width="900" height="620" rx="36" fill="url(#bg)" />
        <rect x="24" y="24" width="852" height="572" rx="28" fill="none" stroke="rgba(255,194,71,0.35)" stroke-width="4" />
        <rect x="54" y="54" width="792" height="512" rx="24" fill="none" stroke="rgba(255,194,71,0.18)" stroke-width="2" stroke-dasharray="10 10" />
        <circle cx="450" cy="134" r="52" fill="url(#accent)" />
        <text x="450" y="146" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" font-weight="700" fill="#120c08">CERT</text>
        <text x="450" y="238" text-anchor="middle" font-size="44" font-family="Arial, sans-serif" font-weight="800" fill="#fff7ea">${safeMember}</text>
        <text x="450" y="302" text-anchor="middle" font-size="26" font-family="Arial, sans-serif" fill="#ffc247">Imagen de certificado</text>
        <text x="450" y="348" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="#d3bfae">${safeCertificate}</text>
        <text x="450" y="458" text-anchor="middle" font-size="24" font-family="Arial, sans-serif" font-weight="700" fill="#fff7ea">Coloca tu archivo en:</text>
        <text x="450" y="496" text-anchor="middle" font-size="22" font-family="Arial, sans-serif" fill="#ffb347">Productos/Desarrolladores/</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const openTeamModal = (card) => {
    const member = card.dataset.member || card.querySelector("h3")?.textContent || "";
    const role = card.dataset.role || "Integrante del equipo desarrollador.";
    const certificate = card.dataset.certificate || "Certificado profesional del integrante.";
    const detail = card.dataset.certificateDetail || "Su perfil aporta valor al proyecto con habilidades tecnicas y enfoque profesional.";
    const image = card.dataset.certificateImage || "";

    teamModalTitle.textContent = member;
    teamModalRole.textContent = role;
    teamModalCertificate.textContent = certificate;
    if (teamModalMessage) {
      teamModalMessage.textContent = detail;
    }

    if (teamModalImage) {
      teamModalImage.alt = `Certificado de ${member}`;
      teamModalImage.src = image || buildCertificatePlaceholder(member, certificate);
      teamModalImage.onerror = () => {
        teamModalImage.onerror = null;
        teamModalImage.src = buildCertificatePlaceholder(member, certificate);
      };
    }

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

if (paymentTabs.length && paymentPanels.length) {
  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.paymentTab;

      paymentTabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      paymentPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.paymentPanel === target);
      });
    });
  });
}

const detectCardInfo = (digits) => {
  let type = "Tarjeta";
  let bankName = "Banco por reconocer";

  if (/^4/.test(digits)) {
    type = "Visa";
  } else if (/^(5[1-5]|2[2-7])/.test(digits)) {
    type = "Mastercard";
  } else if (/^3[47]/.test(digits)) {
    type = "American Express";
  } else if (/^6/.test(digits)) {
    type = "Discover";
  }

  const bankRules = [
    { pattern: /^(4557|4919|4213)/, name: "BCP" },
    { pattern: /^(4484|4540|5522)/, name: "Interbank" },
    { pattern: /^(4899|4539|5442)/, name: "BBVA" },
    { pattern: /^(4120|5310|5406)/, name: "Scotiabank" },
    { pattern: /^(5221|5275|5339)/, name: "Banco de la Nacion" },
  ];

  const matchedBank = bankRules.find((rule) => rule.pattern.test(digits));
  if (matchedBank) {
    bankName = matchedBank.name;
  } else if (digits.length >= 6) {
    bankName = "Banco no registrado";
  }

  return { type, bankName };
};

if (cardNumberInput && cardBrand && cardBank && cardMasked) {
  cardNumberInput.addEventListener("input", () => {
    const digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    cardNumberInput.value = groups.join(" ");

    const { type, bankName } = detectCardInfo(digits);
    cardBrand.textContent = type;
    cardBank.textContent = bankName;
    cardMasked.textContent = groups.concat(["****", "****", "****", "****"]).slice(0, 4).join(" ");

    if (cardHint) {
      cardHint.textContent = digits.length >= 6
        ? "Deteccion referencial segun los primeros digitos de la tarjeta."
        : "Ingresa al menos 6 digitos para estimar el banco emisor.";
    }
  });
}

if (cardExpiryInput) {
  cardExpiryInput.addEventListener("input", () => {
    const digits = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
    cardExpiryInput.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  });
}

if (cardPaymentForm) {
  cardPaymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Tarjeta validada correctamente. Metodo de pago listo para el pedido.");
  });
}

if (yapeModal && openYapeModalButton) {
  const closeYapeModal = () => {
    yapeModal.classList.remove("open");
    yapeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openYapeModalButton.addEventListener("click", () => {
    yapeModal.classList.add("open");
    yapeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  yapeCloseButtons.forEach((button) => {
    button.addEventListener("click", closeYapeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && yapeModal.classList.contains("open")) {
      closeYapeModal();
    }
  });
}

if (yapeReceiptInput && receiptPreview) {
  yapeReceiptInput.addEventListener("change", () => {
    const file = yapeReceiptInput.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      receiptPreview.innerHTML = `<img src="${reader.result}" alt="Comprobante de pago Yape">`;
      showToast("Comprobante de Yape cargado correctamente.");
    });
    reader.readAsDataURL(file);
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
    showToast("Gracias por su compra. Vuelva pronto.");
    contactForm.reset();
  });
}
