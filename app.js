// ========== 0. 변수선언 ==========
let $studySelect = null; // 클릭할 때마다 저장되어야 하므로 전역변수
let $quizSelect = null;
let studyData = null;
let quizData = null;
let tempStudyData = "";
let tempQuizData = "";

const $studyFilters = document.querySelector("#study-filter").children;
const studyFiltersLength = $studyFilters.length;
const $quizFilters = document.querySelector("#quiz-filter").children;
const quizFiltersLength = $quizFilters.length;

const $studyLoading = document.querySelector("#study-loading");
const $studyTable = document.querySelector("#studyTable");
const $quizLoading = document.querySelector("#quiz-loading");
const $quizTable = document.querySelector("#quizTable");
const $tStudyBody = document.querySelector("#tStudyBody");
const $tQuizBody = document.querySelector("#tQuizBody");

// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
function addStudyFilterActive(event) {
  studyLoading();
  setTimeout(studyLoaded, 500);

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
  quizLoading();
  setTimeout(quizLoaded, 500);
  $quizFilters[0].className = $quizFilters[0].className.replace(" active", ""); // default active 제거

  if ($quizSelect) {
    $quizSelect.className = $quizSelect.className.replace(" active", ""); // 선택되었던 active 제거
  }

  const el = event.currentTarget;
  el.className += " active";
  $quizSelect = el;
}

for (let i = 0; i < studyFiltersLength; i++) {
  $studyFilters[i].addEventListener("click", addStudyFilterActive);
}

for (let i = 0; i < quizFiltersLength; i++) {
  $quizFilters[i].addEventListener("click", addQuizFilterActive);
}

// ========== 2. 로딩 ==========
function studyLoading() {
  $studyLoading.style.display = "";
  $studyTable.style.display = "none";
}

function studyLoaded() {
  $studyLoading.style.display = "none";
  $studyTable.style.display = "";
}

function quizLoading() {
  $quizLoading.style.display = "";
  $quizTable.style.display = "none";
}

function quizLoaded() {
  $quizLoading.style.display = "none";
  $quizTable.style.display = "";
}

studyLoaded();
quizLoaded();

// ========== 3. fetch로 json 로드 ==========
function loadStudyJson() {
  return fetch("class.json").then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log("json data:", data);
        displayStudyItems(data);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  });
}

function loadQuizJson() {
  return fetch("quiz.json").then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log("json data:", data);
        displayQuizItems(data);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  });
}

function displayStudyItems(data) {
  for (let i = 0; i < data.length; i++) {
    tempStudyData += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${data[i].title}</td>
      <td>
      <a href="${data[i].docUrl}"
      class="badge bg-secondary">
      문서</a></td>
      <td>`;

    if (data[i].links.length > 0) {
      for (let j = 0; j < data[i].links.length; j++) {
        tempStudyData += `
        <a href="${data[i].links[j]}"
        class="badge bg-secondary">${j + 1}
        </a>`;
      }
    }

    tempStudyData += `</td>
      <td>${data[i].date}</td>
      <td><a href="${data[i].gitUrl}">git</a></td>
    </tr>`;
  }
  $tStudyBody.innerHTML = tempStudyData;
}

function displayQuizItems(data) {
  for (let i = 0; i < data.length; i++) {
    tempQuizData += `
    <tr>
      <td>${data[i].title}</td>
      <td>
      <a href="${data[i].docUrl}"
      class="badge bg-secondary">
      문서</a></td>
      <td><a href="${data[i].previewUrl}">보기</a></td>
      <td><a href="${data[i].gitUrl}">git</a></td>
    </tr>`;
  }
  $tQuizBody.innerHTML = tempQuizData;
}

loadStudyJson();
loadQuizJson();
