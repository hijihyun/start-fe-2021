import date_descending from './utils.js';
import './app.css';

// ========== 0. 변수선언 ==========
let $studySelect = null; // 클릭할 때마다 저장
let $quizSelect = null;
let tempStudyData = '';
let tempQuizData = '';

const $studyFilters = document.querySelector('#studyFilters').children;
const studyFiltersLength = $studyFilters.length;
const $studyLoading = document.querySelector('#studyLoading');
const $studyTable = document.querySelector('#studyTable');
const $studyTableBody = document.querySelector('#studyTableBody');

const $quizFilters = document.querySelector('#quizFilters').children;
const quizFiltersLength = $quizFilters.length;
const $quizLoading = document.querySelector('#quizLoading');
const $quizTable = document.querySelector('#quizTable');
const $quizTableBody = document.querySelector('#quizTableBody');

// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
function studyFilter(event) {
	// 로딩 스피너
	studyLoading();
	setTimeout(studyLoaded, 500);

	$studyFilters[0].className = $studyFilters[0].className.replace(
		' active',
		'',
	); // default active 제거

	if ($studySelect) {
		$studySelect.className = $studySelect.className.replace(' active', ''); // 선택되었던 active 제거
	}

	const el = event.currentTarget;
	el.className += ' active'; // className에 active 추가
	$studySelect = el; // 클릭할 때마다 $select에 저장

	// json 로드
	$studyTableBody.innerHTML = '';
	loadStudyJson(el.id);
}

function quizFilter(event) {
	// 로딩 스피너
	quizLoading();
	setTimeout(quizLoaded, 500);

	$quizFilters[0].className = $quizFilters[0].className.replace(
		' active',
		'',
	); // default active 제거

	if ($quizSelect) {
		$quizSelect.className = $quizSelect.className.replace(' active', ''); // 선택되었던 active 제거
	}

	const el = event.currentTarget;
	el.className += ' active';
	$quizSelect = el;

	// json 로드
	$quizTableBody.innerHTML = '';
	loadQuizJson(el.id);
}

// ========== 2. 로딩 ==========
function studyLoading() {
	$studyLoading.style.display = '';
	$studyTable.style.display = 'none';
}

function studyLoaded() {
	$studyLoading.style.display = 'none';
	$studyTable.style.display = '';
}

function quizLoading() {
	$quizLoading.style.display = '';
	$quizTable.style.display = 'none';
}

function quizLoaded() {
	$quizLoading.style.display = 'none';
	$quizTable.style.display = '';
}

// ========== 3. fetch로 json 로드 ==========
// ========== 4. 필터링 ==========
function loadStudyJson(btnId) {
	return fetch('class.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);

				if (btnId === 'studyAllBtn' || btnId === '') {
					displayStudyAll(data);
				} else if (btnId === 'studyLinkBtn') {
					displayStudyLink(data);
				} else if (btnId === 'studyGitBtn') {
					displayStudyGit(data);
				} else if (btnId === 'studyNewBtn') {
					displayStudyNew(data);
				}
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

function loadQuizJson(btnId) {
	return fetch('quiz.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);

				if (btnId === 'quizAllBtn' || btnId === '') {
					displayQuizAll(data);
				} else if (btnId === 'quizGitBtn') {
					displayQuizGit(data);
				}
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

// 학습 모두 버튼
function displayStudyAll(data) {
	for (let i = 0; i < data.length; i++) {
		createStudyHTML(data, i);
	}
	addStudyHTML();
}

// 학습 도움링크 버튼
function displayStudyLink(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].links.length === 0) {
			continue;
		}
		createStudyHTML(data, i);
	}
	addStudyHTML();
}

// 학습 git 버튼
function displayStudyGit(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].gitUrl.length === 0) {
			continue;
		}
		createStudyHTML(data, i);
	}
	addStudyHTML();
}

// 학습 최신순 버튼
function displayStudyNew(data) {
	// ========== 5. 모듈화, 함수화 ==========
	data.sort(date_descending);
	for (let i = 0; i < data.length; i++) {
		createStudyHTML(data, i);
	}
	addStudyHTML();
}

// 퀴즈 모두 버튼
function displayQuizAll(data) {
	for (let i = 0; i < data.length; i++) {
		createQuizHTML(data, i);
	}
	addQuizHTML();
}

// 퀴즈 git 버튼
function displayQuizGit(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].gitUrl.length === 0) {
			continue;
		}
		createQuizHTML(data, i);
	}
	addQuizHTML();
}

// 중복 되는 코드 함수화
function createStudyHTML(data, i) {
	tempStudyData += `
    <tr>
		<th scope="row">${i + 1}</th>
		<td>${data[i].title}</td>
		<td>
		<a href="${data[i].docUrl}"
		class="badge bg-secondary">
		문서</a></td>
		<td>`;

	for (let j = 0; j < data[i].links.length; j++) {
		tempStudyData += `
        <a href="${data[i].links[j]}"
        class="badge bg-secondary">${j + 1}
        </a>`;
	}

	tempStudyData += `</td><td>${data[i].date}</td><td>`;

	if (data[i].gitUrl.length > 0) {
		tempStudyData += `<a href="${data[i].gitUrl}">git</a>`;
	}
	tempStudyData += `</td></tr>`;
}

function addStudyHTML() {
	$studyTableBody.innerHTML = tempStudyData;
	tempStudyData = '';
}

function createQuizHTML(data, i) {
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

function addQuizHTML() {
	$quizTableBody.innerHTML = tempQuizData;
	tempQuizData = '';
}

// ========== 0. 초기 화면 ==========
// 이벤트 추가
for (let i = 0; i < studyFiltersLength; i++) {
	$studyFilters[i].addEventListener('click', studyFilter);
}

for (let i = 0; i < quizFiltersLength; i++) {
	$quizFilters[i].addEventListener('click', quizFilter);
}

studyLoaded();
quizLoaded();
loadStudyJson('');
loadQuizJson('');
