// Gestion des accordéons (volets)
(function() {
  function initAccordions() {
    const socialBtn = document.getElementById('social-accordion');
    const socialContent = document.getElementById('social-content');
    const servicesBtn = document.getElementById('services-accordion');
    const servicesContent = document.getElementById('services-content');

    // Bouton Réseaux sociaux
    if (socialBtn && socialContent) {
      socialBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = socialBtn.classList.contains('active');
        socialBtn.classList.toggle('active');
        socialContent.classList.toggle('active');
        
        // Fermer l'autre accordéon si on ouvre celui-ci
        if (!isActive) {
          if (servicesBtn) servicesBtn.classList.remove('active');
          if (servicesContent) servicesContent.classList.remove('active');
        }
      });
    }

    // Bouton Nos services
    if (servicesBtn && servicesContent) {
      servicesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = servicesBtn.classList.contains('active');
        servicesBtn.classList.toggle('active');
        servicesContent.classList.toggle('active');
        
        // Fermer l'autre accordéon si on ouvre celui-ci
        if (!isActive) {
          if (socialBtn) socialBtn.classList.remove('active');
          if (socialContent) socialContent.classList.remove('active');
        }
      });
    }

    // Fermer les accordéons si on clique en dehors
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.accordions-container')) {
        if (socialBtn) socialBtn.classList.remove('active');
        if (socialContent) socialContent.classList.remove('active');
        if (servicesBtn) servicesBtn.classList.remove('active');
        if (servicesContent) servicesContent.classList.remove('active');
      }
    });
  }

  // Initialiser quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
})();
