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
    const textInput = item.querySelector('.achievement-input'); // 텍스트 입력 필드
    const inputText = textInput.value.toLowerCase(); // 입력 필드 내용
    const isVisible = inputText.includes(searchText); // 검색어와 일치 여부
    const isHiddenByFilter = item.classList.contains('hidden-filter'); // 필터 상태 확인
    item.style.display = isVisible && !isHiddenByFilter ? '' : 'none';
  });
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');

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

    searchBar.dispatchEvent(new Event('input'));
  });
});

const checkboxes = document.querySelectorAll('.achievement-checkbox');
const textInputs = document.querySelectorAll('.achievement-input');

// 로컬스토리지에서 상태 로드
function loadAchievements() {
  checkboxes.forEach(checkbox => {
    const id = checkbox.getAttribute('data-id');
    const completed = localStorage.getItem(`${id}-completed`) === 'true'; // 저장된 값 확인
    checkbox.checked = completed; // 저장된 값에 따라 체크 상태 설정
    checkbox.closest('.achievement-item').classList.toggle('completed', completed); // 스타일 업데이트
  });

  textInputs.forEach(input => {
    const id = input.getAttribute('data-id');
    const savedText = localStorage.getItem(`${id}-text`);
    if (savedText !== null) { // 저장된 값이 있을 때만 설정
      input.value = savedText;
    }
  });

  updateCounter(); // 상태에 따라 카운터 업데이트
}

// 체크 상태 저장
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const id = checkbox.getAttribute('data-id');
    const completed = checkbox.checked;
    localStorage.setItem(`${id}-completed`, completed); // 로컬스토리지에 상태 저장
    checkbox.closest('.achievement-item').classList.toggle('completed', completed); // 스타일 적용
    updateCounter(); // 카운터 업데이트
  });
});

textInputs.forEach(input => {
  input.addEventListener('input', () => {
    const id = input.getAttribute('data-id');
    const text = input.value;
    localStorage.setItem(`${id}-text`, text);
    searchBar.dispatchEvent(new Event('input'));
  });
});

const counter = document.getElementById('achievement-counter');
function updateCounter() {
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  counter.textContent = `(${completed}/${total})`;
}

loadAchievements();
updateCounter();
