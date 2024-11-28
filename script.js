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

// 업적 완료 체크 저장 및 로드
const checkboxes = document.querySelectorAll('.achievement-checkbox');

// 로컬스토리지에서 상태 로드
function loadAchievements() {
  checkboxes.forEach(checkbox => {
    const id = checkbox.getAttribute('data-id');
    const completed = localStorage.getItem(id) === 'true'; // 저장된 상태 확인
    checkbox.checked = completed;
    checkbox.closest('.achievement-item').classList.toggle('completed', completed);
  });
}

// 체크 상태 저장 및 스타일 적용
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const id = checkbox.getAttribute('data-id');
    const completed = checkbox.checked;
    localStorage.setItem(id, completed); // 로컬스토리지에 상태 저장
    checkbox.closest('.achievement-item').classList.toggle('completed', completed);
  });
});

// 페이지 로드 시 상태 적용
loadAchievements();

// 체크박스
const checkboxes = document.querySelectorAll('.achievement-checkbox');
const achievementItems = document.querySelectorAll('.achievement-item');
const counter = document.getElementById('achievement-counter');

// 업적 클릭 시 URL로 이동
achievementItems.forEach(item => {
  const textElement = item.querySelector('.achievement-text');
  textElement.addEventListener('click', () => {
    const url = textElement.getAttribute('data-url');
    if (url) window.open(url, '_blank');
  });
});
