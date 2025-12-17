// my.js - 탭 제어 스크립트
document.addEventListener('DOMContentLoaded', function () {
    const titles = {
        1: '자주찾는 서비스',
        2: '생활정보',
        3: '맞춤복지',
        4: '청년지원'
    };

    const buttons = Array.from(document.querySelectorAll('.nav-link'));
    const titleEl = document.getElementById('my-tab-title');
    const wrapper = document.getElementById('my-sections-wrapper');
    if (!wrapper || buttons.length === 0 || !titleEl) return;

    // 섹션 요소들(탭으로 제어할 4개 블록) — wrapper의 직계 자식 중 d-flex 클래스를 가진 것들로 간주
    const sections = Array.from(wrapper.children).filter(el => el.classList && el.classList.contains('d-flex'));

    function showTab(index) {
        // index는 1~4
        sections.forEach((sec, i) => {
            if (i === index - 1) sec.classList.remove('d-none');
            else sec.classList.add('d-none');
        });

        buttons.forEach(btn => {
            const btnIndex = Number(btn.getAttribute('data-index'));
            btn.classList.toggle('active', btnIndex === index);
            btn.setAttribute('aria-current', btnIndex === index ? 'page' : 'false');
        });

        titleEl.textContent = titles[index] || '';

        // 선택한 섹션으로 스크롤 (부드럽게)
        const activeSection = sections[index - 1];
        if (activeSection) activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 초기 상태: 1번 탭 표시
    showTab(1);

    // 이벤트 바인딩
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const idx = Number(this.getAttribute('data-index')) || 1;
            showTab(idx);
        });
    });
});