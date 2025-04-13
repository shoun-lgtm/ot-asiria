document.addEventListener('DOMContentLoaded', function() {
    // ローディングアニメーション
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loader-wrapper').style.opacity = '0';
            document.querySelector('.loader-wrapper').style.visibility = 'hidden';
            
            // ヒーローアニメーション
            const heroTitle = document.querySelectorAll('.hero-title .reveal-text');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroCta = document.querySelector('.hero-cta');
            
            gsap.to(heroTitle, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
            
            gsap.to(heroSubtitle, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });
            
            gsap.to(heroCta, {
                opacity: 1,
                duration: 1,
                delay: 0.8,
                ease: "power3.out"
            });
        }, 2000);
    });

    // AOSアニメーション初期化
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // ナビゲーションスクロール効果
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('active');
        }
        
        // ナビゲーションリンクのアクティブ状態
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // スクロールトップボタン
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // モバイルメニュー
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // オーバーレイ作成と削除
        if (nav.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.classList.add('active');
            }, 50);
            
            overlay.addEventListener('click', function() {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                
                setTimeout(() => {
                    body.removeChild(overlay);
                }, 300);
            });
        } else {
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                
                setTimeout(() => {
                    body.removeChild(overlay);
                }, 300);
            }
        }
        
        // ハンバーガーアニメーション
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // ナビゲーションリンククリック
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // モバイルメニューが開いている場合は閉じる
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    
                    setTimeout(() => {
                        body.removeChild(overlay);
                    }, 300);
                }
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // 実績フィルター
    const filterBtns = document.querySelectorAll('.filter-btn');
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // アクティブクラスを切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            achievementItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // スクロールトリガーアニメーション
    gsap.registerPlugin(ScrollTrigger);
    
    // パララックス効果
    gsap.utils.toArray('.image-wrapper').forEach(wrapper => {
        gsap.to(wrapper, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // 数字カウントアップアニメーション
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                let count = 0;
                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            },
            once: true
        });
    });
    
    // フォームラベルアニメーション
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    group.classList.remove('focused');
                }
            });
            
            // 初期値があれば
            if (input.value !== '') {
                group.classList.add('focused');
            }
        }
    });
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ハンバーガーボタンアニメーション
const hamburger = document.querySelector('.hamburger');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// CSS用クラス追加
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.hamburger').innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
});

// ハンバーガーメニューのCSS
document.head.insertAdjacentHTML('beforeend', `
<style>
.hamburger {
    width: 30px;
    height: 25px;
    position: relative;
    cursor: pointer;
    z-index: 100;
}

.hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 0;
    transition: all 0.3s ease;
}

.hamburger span:nth-child(1) {
    top: 0;
}

.hamburger span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
}

.hamburger span:nth-child(3) {
    bottom: 0;
}

.hamburger.active span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
}
</style>
`);
