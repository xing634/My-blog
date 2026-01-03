// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 1. 板块切换核心逻辑
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转
            
            // 获取目标板块ID
            const targetId = this.getAttribute('data-target');
            
            // 切换导航高亮
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 切换板块显示
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 2. 心情卡片hover动效
    const diaryCards = document.querySelectorAll('.diary-card');
    diaryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
        });
    });

    // 3. 新增心情功能（弹窗交互）
    const addDiaryBtn = document.getElementById('add-diary');
    const diaryContainer = document.getElementById('diary-container');
    
    if (addDiaryBtn && diaryContainer) {
        addDiaryBtn.addEventListener('click', function() {
            const title = prompt('请输入心情标题：');
            const content = prompt('请输入心情内容：');
            
            if (title && content) {
                // 获取当前日期（格式：YYYY-MM-DD）
                const date = new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '-');
                
                // 创建新的心情卡片
                const newCard = document.createElement('div');
                newCard.className = 'diary-card';
                newCard.style.cssText = `
                    background-color: #fff;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                    margin-bottom: 2.5rem;
                    transition: transform 0.3s ease;
                `;
                
                newCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 1rem;">
                        <h3 style="font-size: 1.5rem; color: #2d3748; font-weight: 600;">${title}</h3>
                        <span style="color: #718096; font-size: 0.95rem;">${date}</span>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; font-size: 1.05rem;">${content}</p>
                `;
                
                // 添加到列表最前面
                diaryContainer.insertBefore(newCard, diaryContainer.firstChild);
                
                // 为新卡片添加hover动效
                newCard.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px)';
                    this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                });
                newCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                });
                
                alert('心情记录添加成功！');
            } else {
                alert('标题和内容不能为空哦～');
            }
        });
    }
});