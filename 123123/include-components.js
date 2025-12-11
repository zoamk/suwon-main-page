function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // 컴포넌트 로드 후 이벤트 트리거 (기존 JS가 실행될 수 있도록)
            const event = new CustomEvent('componentLoaded', { detail: { elementId, filePath } });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error('컴포넌트 로드 실패:', error);
        });
}

// DOM이 로드되면 자동으로 실행
document.addEventListener('DOMContentLoaded', function () {
    // Header 로드
    if (document.getElementById('header-container')) {
        loadComponent('header-container', 'header.html');
    }

    // Footer 로드
    if (document.getElementById('footer-container')) {
        loadComponent('footer-container', 'footer.html');
    }
});