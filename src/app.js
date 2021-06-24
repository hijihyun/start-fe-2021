import date_descending from './utils.js';
import './app.css';

// ========== 0. 변수선언 ==========
let $studySelect = null; // 클릭할 때마다 저장되어야 하므로 전역변수
let $quizSelect = null;
let tempStudyData = '';
let tempQuizData = '';

const $studyFilters = document.querySelector('#studyFilters').children;
const studyFiltersLength = $studyFilters.length;
const $quizFilters = document.querySelector('#quizFilters').children;
const quizFiltersLength = $quizFilters.length;
const $studyLoading = document.querySelector('#studyLoading');
const $studyTable = document.querySelector('#studyTable');
const $quizLoading = document.querySelector('#quizLoading');
const $quizTable = document.querySelector('#quizTable');
const $tStudyBody = document.querySelector('#tStudyBody');
const $tQuizBody = document.querySelector('#tQuizBody');

// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
function addStudyFilterActive(event) {
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

	$tStudyBody.innerHTML = '';
	filterStudyJson(el.id);
}

function addQuizFilterActive(event) {
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

	$tQuizBody.innerHTML = '';
	filterQuizJson(el.id);
}

for (let i = 0; i < studyFiltersLength; i++) {
	$studyFilters[i].addEventListener('click', addStudyFilterActive);
}

for (let i = 0; i < quizFiltersLength; i++) {
	$quizFilters[i].addEventListener('click', addQuizFilterActive);
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
function loadStudyJson() {
	return fetch('class.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);
				displayStudyAll(data);
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

function loadQuizJson() {
	return fetch('quiz.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);
				displayQuizAll(data);
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

// ========== 4. 필터링 ==========
function filterStudyJson(btnId) {
	return fetch('class.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);

				if (btnId === 'studyAllBtn') {
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

function filterQuizJson(btnId) {
	return fetch('quiz.json').then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log('json data:', data);

				if (btnId === 'quizAllBtn') {
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

function displayStudyAll(data) {
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

		tempStudyData += `</td><td>${data[i].date}</td><td>`;

		if (data[i].gitUrl.length > 0) {
			tempStudyData += `<a href="${data[i].gitUrl}">git</a>`;
		}
		tempStudyData += `</td></tr>`;
	}
	$tStudyBody.innerHTML = tempStudyData;
	tempStudyData = '';
}

function displayStudyLink(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].links.length === 0) {
			continue;
		}
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
	$tStudyBody.innerHTML = tempStudyData;
	tempStudyData = '';
}

function displayStudyGit(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].gitUrl.length === 0) {
			continue;
		}
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
	$tStudyBody.innerHTML = tempStudyData;
	tempStudyData = '';
}

function displayStudyNew(data) {
	data.sort(date_descending);

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
	$tStudyBody.innerHTML = tempStudyData;
	tempStudyData = '';
}

function displayQuizAll(data) {
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
	tempQuizData = '';
}

function displayQuizGit(data) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].gitUrl.length === 0) {
			continue;
		}
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
	tempQuizData = '';
}

// 초기화면
studyLoaded();
quizLoaded();
loadStudyJson();
loadQuizJson();
