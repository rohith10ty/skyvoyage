export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Fallback safe image handler
export function handleImageError(e, fallbackGradient = 'linear-gradient(135deg, #0A1128, #1E3A8A)') {
  e.target.style.display = 'none';
  if (e.target.parentNode) {
    e.target.parentNode.style.background = fallbackGradient;
  }
}
