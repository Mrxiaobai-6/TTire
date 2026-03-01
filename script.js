// 导航切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 关键修复：根据URL显示对应板块
    function showSectionFromURL() {
        const path = window.location.pathname.replace('/', '') || 'home';
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // 移除所有active类
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        
        // 根据路径显示对应板块
        const targetSection = document.getElementById(path) || document.getElementById('home');
        const targetLink = document.querySelector(`a[href="/${path}"]`) || document.querySelector('a[href="/"]');
        
        if (targetSection) targetSection.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
    }
    
    // 初始化时根据URL显示板块
    showSectionFromURL();
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('/')) {
                e.preventDefault();
                // 使用pushState改变URL而不刷新页面
                history.pushState(null, null, href);
                showSectionFromURL();
            }
        });
    });
    
    // 处理浏览器前进后退
    window.addEventListener('popstate', function() {
        showSectionFromURL();
    });
    
    // 观察者动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .tech-card, .product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 购买按钮交互
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '已添加购物车 ✓';
            this.style.background = '#27ae60';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = originalText;
                this.style.background = '';
            }, 1000);
        });
    });
    
    // 表单提交模拟
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            if (!phone.match(/^1[3-9]\d{9}$/)) {
                alert('请输入有效的手机号码（11位数字）');
                return;
            }
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = '发送中...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                successMessage.textContent = `✓ 感谢您的留言，${name}！请直接拨打电话 19859828498 与我们联系。`;
                
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    }
});