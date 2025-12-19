// Animation des cartes au scroll - Optimisé pour performance
(function() {
  'use strict';
  
  const cards = document.querySelectorAll('.card');
  
  if (cards.length === 0) return;
  
  // Utiliser requestIdleCallback si disponible pour meilleure performance
  const observeCards = function() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          // Désobserver après animation pour économiser les ressources
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '50px'
    });

    cards.forEach(card => observer.observe(card));
  };

  if (window.requestIdleCallback) {
    requestIdleCallback(observeCards);
  } else {
    setTimeout(observeCards, 100);
  }
})();
