document.addEventListener('mousemove', (e) => {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(168,85,247,0.7);
    border-radius: 50%;
    pointer-events: none;
    left: ${e.clientX - 4}px;
    top: ${e.clientY - 4}px;
    transition: transform 0.3s, opacity 0.3s;
  `;
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.style.transform = 'scale(2)';
    cursor.style.opacity = '0';
    setTimeout(() => cursor.remove(), 300);
  }, 50);
});
document.querySelectorAll('details').forEach((el) => {
    el.addEventListener('toggle', () => {
        if (el.open) {
            el.style.transform = 'scale(1.02)';
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
        }
    });
});