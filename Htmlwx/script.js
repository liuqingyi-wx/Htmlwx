document.addEventListener('DOMContentLoaded', function() {
    // 七鹤的轮播作品数据
    const portfolioItems = [
        { title: '七鹤作品1', description: '七鹤作品1的简短描述', image: 'IMGs/dennisberger_Elon_musk_and_Neuralink_brain_implant.png' },
        // 删除了第二张图片
        { title: '七鹤作品3', description: '七鹤作品3的简短描述', image: 'IMGs/hq720.jpg' },
        { title: '七鹤作品4', description: '七鹤作品4的简短描述', image: 'IMGs/maxresdefault.jpg' }
    ];

    // 动态添加七鹤的轮播作品
    const carouselInner = document.querySelector('#portfolioCarousel .carousel-inner');
    portfolioItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <img src="${item.image}" class="d-block w-100 carousel-image" alt="${item.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });

    // 初始化作品集轮播
    var portfolioCarousel = new bootstrap.Carousel(document.getElementById('portfolioCarousel'), {
        interval: 3000, // 每3秒切换一次
        wrap: true // 循环播放
    });

    // 处理联系表单提交
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里添加表单提交逻辑，例如发送到服务器或显示感谢信息
        alert('感谢您的留言！我会尽快回复您。');
        contactForm.reset();
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 返回顶部按钮
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ... 其他现有的 JavaScript 代码 ...
});