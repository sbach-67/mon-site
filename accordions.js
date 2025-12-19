// Gestion des accordéons (volets) - Optimisé pour performance
(function() {
  'use strict';
  
  let socialBtn, socialContent, servicesBtn, servicesContent;
  let clickOutsideHandler;

  function initAccordions() {
    socialBtn = document.getElementById('social-accordion');
    socialContent = document.getElementById('social-content');
    servicesBtn = document.getElementById('services-accordion');
    servicesContent = document.getElementById('services-content');

    // Bouton Réseaux sociaux
    if (socialBtn && socialContent) {
      socialBtn.addEventListener('click', handleSocialClick, { passive: false });
    }

    // Bouton Nos services
    if (servicesBtn && servicesContent) {
      servicesBtn.addEventListener('click', handleServicesClick, { passive: false });
    }

    // Fermer les accordéons si on clique en dehors
    clickOutsideHandler = function(e) {
      if (!e.target.closest('.accordions-container')) {
        closeAll();
      }
    };
    document.addEventListener('click', clickOutsideHandler, { passive: true });
  }

  function handleSocialClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const isActive = socialBtn.classList.contains('active');
    socialBtn.classList.toggle('active');
    socialContent.classList.toggle('active');
    
    if (!isActive) {
      closeServices();
    }
  }

  function handleServicesClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const isActive = servicesBtn.classList.contains('active');
    servicesBtn.classList.toggle('active');
    servicesContent.classList.toggle('active');
    
    if (!isActive) {
      closeSocial();
    }
  }

  function closeSocial() {
    if (socialBtn) socialBtn.classList.remove('active');
    if (socialContent) socialContent.classList.remove('active');
  }

  function closeServices() {
    if (servicesBtn) servicesBtn.classList.remove('active');
    if (servicesContent) servicesContent.classList.remove('active');
  }

  function closeAll() {
    closeSocial();
    closeServices();
  }

  // Initialiser quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
})();
