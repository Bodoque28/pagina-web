const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const menuLink = document.querySelector('a[href="#menu-panel"]');
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

if (menuLink) {
  menuLink.addEventListener("click", () => {
    activateTab("hamburguesas");
  });
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const nombre = formData.get("nombre");
    const asunto = formData.get("asunto");

    formMessage.textContent = `Gracias ${nombre}, recibimos tu mensaje sobre "${asunto}". Muy pronto te contactaremos desde Sabor Callejero.`;
    bookingForm.reset();
  });
}
