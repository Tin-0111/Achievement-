// 탭 전환 기능
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });

    // 클릭한 탭의 섹션 표시
    const target = link.getAttribute('href').slice(1);
    document.getElementById(target).classList.remove('hidden');
  });
});

// 검색 및 필터 기능
const searchBar = document.querySelector('.search-bar');
const categoryButtons = document.querySelectorAll('.category-btn');
const achievementItems = document.querySelectorAll('.achievement-item');

// 검색 기능
searchBar.addEventListener('input', () => {
  const searchText = searchBar.value.toLowerCase();
  achievementItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    const isVisible = text.includes(searchText);
    const isHiddenByFilter = item.classList.contains('hidden-filter'); // 필터 상태 확인
    item.style.display = isVisible && !isHiddenByFilter ? '' : 'none';
  });
});

// 카테고리 필터링 기능
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');

    // 전체 버튼이 눌리면 모든 항목 표시
    if (selectedCategory === '0') {
      achievementItems.forEach(item => {
        item.classList.remove('hidden-filter');
      });
    } else {
      achievementItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        item.classList.toggle('hidden-filter', itemCategory !== selectedCategory);
      });
    }

    // 검색 조건과 함께 필터 적용
    searchBar.dispatchEvent(new Event('input'));
  });
});

// 업적 완료 체크 저장 및 로드
const checkboxes = document.querySelectorAll('.achievement-checkbox');
const textInputs = document.querySelectorAll('.achievement-input');

// 로컬스토리지에서 상태 로드
function loadAchievements() {
  checkboxes.forEach(checkbox => {
    const id = checkbox.getAttribute('data-id');
    const completed = localStorage.getItem(`${id}-completed`) === 'true';
    checkbox.checked = completed;
    checkbox.closest('.achievement-item').classList.toggle('completed', completed);
  });

  textInputs.forEach(input => {
    const id = input.getAttribute('data-id');
    const savedText = localStorage.getItem(`${id}-text`);
    if (savedText) {
      input.value = savedText;
    }
  });
}

// 체크 상태 저장
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const id = checkbox.getAttribute('data-id');
    const completed = checkbox.checked;
    localStorage.setItem(`${id}-completed`, completed);
    checkbox.closest('.achievement-item').classList.toggle('completed', completed);
    updateCounter();
  });
});

// 텍스트 저장
textInputs.forEach(input => {
  input.addEventListener('input', () => {
    const id = input.getAttribute('data-id');
    const text = input.value;
    localStorage.setItem(`${id}-text`, text);
  });
});

// 업적 카운터 업데이트
const counter = document.getElementById('achievement-counter');
function updateCounter() {
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  counter.textContent = `(${completed}/${total})`;
}

// 초기화
loadAchievements();
updateCounter();