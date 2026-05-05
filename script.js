const page = document.body.dataset.page;
const navLinks = document.querySelectorAll("[data-link]");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

navLinks.forEach((link) => {
  if (link.dataset.link === page) {
    link.classList.add("active");
  }
});

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre");
    const asunto = formData.get("asunto");

    formMessage.textContent = `Gracias ${nombre}, tu mensaje sobre "${asunto}" fue enviado correctamente.`;
    contactForm.reset();
  });
}
