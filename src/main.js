import { gsap } from "gsap";

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SELEÇÃO DE ELEMENTOS ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.item');
  const btnAdentrar = document.getElementById('btn-adentrar');

  // Elementos da Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('close-lightbox');

  // --- 2. ANIMAÇÃO DE ENTRADA (GSAP) ---
  // Faz os itens da galeria surgirem em cascata suave
  gsap.to(".item", {
    delay: 0.4,
    duration: 1.2,
    y: 0,
    opacity: 1, 
    stagger: 0.15,
    ease: "power2.out",
    startAt: { y: 50 } 
  });

  // --- 3. LÓGICA DE FILTROS ---
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Atualiza estado visual dos botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        // Para qualquer animação em curso no item para evitar conflitos
        gsap.killTweensOf(item);

        if (filterValue === 'todos' || item.classList.contains(filterValue)) {
          item.classList.remove('hide');
          item.classList.add('show');
          
          // Animação suave de surgimento ao filtrar
          gsap.fromTo(item, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        } else {
          item.classList.add('hide');
          item.classList.remove('show');
        }
      });
    });
  });

  // --- 4. LÓGICA DA LIGHTBOX (VISUALIZADOR) ---
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const captionText = item.querySelector('.item-info').innerText;
      
      // Define a imagem e o texto no modal
      lightboxImg.src = imgSrc;
      lightboxCaption.innerText = captionText;
      
      // Ativa a visualização
      lightbox.classList.add('active');
    });
  });

  // Fechar no botão "X"
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Fechar ao clicar no fundo escuro (fora da imagem)
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== lightboxCaption) {
      lightbox.classList.remove('active');
    }
  });

  // --- 5. NAVEGAÇÃO (SCROLL SUAVE) ---
  if (btnAdentrar) {
    btnAdentrar.addEventListener('click', () => {
      window.scrollTo({ 
        top: window.innerHeight, 
        behavior: 'smooth' 
      });
    });
  }
});