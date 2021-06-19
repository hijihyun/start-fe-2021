// ========== 0. 변수선언 ==========
let $studySelect = null; // 클릭할 때마다 저장되어야 하므로 전역변수
let $quizSelect = null;

const $studyFilters = document.querySelector(".btn-group").children;
const studyFiltersLength = $studyFilters.length;
const $quizFilters = document.querySelector("#quiz-filter").children;
const quizFiltersLength = $quizFilters.length;

// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
function addStudyFilterActive(event) {
  $studyFilters[0].className = $studyFilters[0].className.replace(
    " active",
    ""
  ); // default active 제거

  if ($studySelect) {
    $studySelect.className = $studySelect.className.replace(" active", ""); // 선택되었던 active 제거
  }

  const el = event.currentTarget;
  el.className += " active"; // className에 active 추가
  $studySelect = el; // 클릭할 때마다 $select에 저장
}

function addQuizFilterActive(event) {
  $quizFilters[0].className = $quizFilters[0].className.replace(" active", ""); // default active 제거

  if ($quizSelect) {
    $quizSelect.className = $quizSelect.className.replace(" active", ""); // 선택되었던 active 제거
  }

  const el = event.currentTarget;
  el.className += " active";
  $quizSelect = el;
}

// ========== 2. 이벤트 처리 ==========
for (let i = 0; i < studyFiltersLength; i++) {
  $studyFilters[i].addEventListener("click", addStudyFilterActive);
}
for (let i = 0; i < quizFiltersLength; i++) {
  $quizFilters[i].addEventListener("click", addQuizFilterActive);
}
