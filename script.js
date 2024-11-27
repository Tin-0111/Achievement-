document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href').slice(1);
    
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });
    
    document.getElementById(target).classList.remove('hidden');
  });
});
