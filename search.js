(() => {
  const input = document.getElementById('search-input');
  const cards = Array.from(document.querySelectorAll('.doc-card'));
  const emptyState = document.getElementById('search-empty');

  if (!input || cards.length === 0) return;

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function filterCards() {
    const query = normalize(input.value);
    let visibleCount = 0;

    cards.forEach(card => {
      const text = normalize(card.textContent);
      const isMatch = query === '' || text.includes(query);
      card.classList.toggle('is-hidden', !isMatch);
      if (isMatch) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
    }
  }

  input.addEventListener('input', filterCards);
})();
