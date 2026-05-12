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

  // --- 2. ANIMAÇÃO DE CARREGAMENTO (PRELOADER) ---
  // Criamos uma "linha do tempo" para orquestrar a entrada
  const tl = gsap.timeline();

  tl.to(".preloader-text", {
    opacity: 0.2,
    duration: 0.6,
    yoyo: true,       // Efeito "vai e volta" (piscar)
    repeat: 3,        // Repete 3 vezes
    ease: "power1.inOut"
  })
  .to("#preloader", {
    y: "-100%",       // Puxa a tela preta inteira para cima (cortina abrindo)
    duration: 1.2,
    ease: "power3.inOut"
  })
  .from("#hero", {
    opacity: 0,
    scale: 1.05,      // Hannya dá um leve zoom out épico ao aparecer
    duration: 1.5,
    ease: "power2.out"
  }, "-=0.8"); // Inicia um pouco antes da cortina terminar de subir

  // Remove o preloader do caminho após a animação (evita travar cliques no site)
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if(preloader) preloader.style.display = 'none';
  }, 3500);


  // --- 3. ANIMAÇÃO DE ENTRADA DA GALERIA ---
  // Faz os itens da galeria surgirem em cascata suave
  gsap.to(".item", {
    delay: 2.5, // Aumentado para esperar o preloader terminar
    duration: 1.2,
    y: 0,
    opacity: 1, 
    stagger: 0.15,
    ease: "power2.out",
    startAt: { y: 50 } 
  });

  // --- 4. LÓGICA DE FILTROS ---
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

  // --- 5. LÓGICA DA LIGHTBOX (VISUALIZADOR) ---
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

 // --- 6. NAVEGAÇÃO (SCROLL SUAVE) ---
  if (btnAdentrar) {
    btnAdentrar.addEventListener('click', () => {
      const manifestoSection = document.getElementById('manifesto');
      if (manifestoSection) {
        // Rola até o começo da seção do manifesto
        manifestoSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  }
});