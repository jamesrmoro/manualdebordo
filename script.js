/**
 * CONFIGURAÇÃO DO WHATSAPP
 * Troque o valor abaixo pelo número que receberá os pedidos.
 * Use apenas números, com DDI + DDD. Exemplo: 5511999999999
 *
 * Enquanto estiver vazio, o botão abre o WhatsApp e permite escolher
 * um contato para enviar a mensagem.
 */
const WHATSAPP_NUMBER = "";

const WHATSAPP_MESSAGE =
  "Olá! Quero comprar o e-book Manual de Bordo por R$ 10,90. Pode me passar as informações para pagamento?";

function buildWhatsAppUrl() {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);

  return cleanNumber
    ? `https://wa.me/${cleanNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

function configureWhatsAppLinks() {
  const url = buildWhatsAppUrl();

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute(
      "aria-label",
      "Comprar o e-book Manual de Bordo por R$ 10,90 pelo WhatsApp"
    );

    link.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("ebook:whatsapp-click", {
          detail: { product: "Manual de Bordo", price: 10.9 }
        })
      );
    });
  });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMobileBuyBar() {
  const bar = document.querySelector(".mobile-buy-bar");
  const hero = document.querySelector(".hero");

  if (!bar || !hero || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  observer.observe(hero);
}

function setCurrentYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

configureWhatsAppLinks();
setupRevealAnimation();
setupMobileBuyBar();
setCurrentYear();
