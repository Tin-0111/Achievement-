// 탭
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


// 검색 기능
const searchBar = document.querySelector('.search-bar');
const achievementItems = document.querySelectorAll('.achievement-item');

searchBar.addEventListener('input', () => {
  const searchText = searchBar.value.toLowerCase();
  achievementItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchText) ? '' : 'none';
  });
});

// 카테고리 필터링 기능
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');
    achievementItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      item.classList.toggle('hidden', itemCategory !== selectedCategory);
    });
  });
});
