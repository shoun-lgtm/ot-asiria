document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // ローディングアニメーション
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loader-wrapper').style.opacity = '0';
            document.querySelector('.loader-wrapper').style.visibility = 'hidden';
            
            // ヒーローアニメーション
            animateHero();
        }, 2000);
    });

    // AOSアニメーション初期化
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // ヒーローアニメーション関数
    function animateHero() {
        const heroTitles = document.querySelectorAll('.hero-title .reveal-text');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        
        // タイトルアニメーション
        gsap.to(heroTitles, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
        
        // サブタイトルアニメーション
        gsap.to(heroSubtitle, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });
        
        // CTAボタンアニメーション
        gsap.to(heroCta, {
            opacity: 1,
            duration: 1,
            delay: 0.8,
            ease: "power3.out"
        });
    }

    // ナビゲーションスクロール効果
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        // ヘッダースクロール効果
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
    const hamburger = document.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', function() {
        // ナビゲーションの表示/非表示
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // オーバーレイ作成と削除
        if (nav.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.classList.add('active');
            }, 50);
            
            overlay.addEventListener('click', function() {
                closeMenu(overlay);
            });
        } else {
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                closeMenu(overlay);
            }
        }
    });
    
    // メニューを閉じる関数
    function closeMenu(overlay) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        
        setTimeout(() => {
            body.removeChild(overlay);
        }, 300);
    }
    
    // ナビゲーションリンククリック
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // モバイルメニューが開いている場合は閉じる
            if (nav.classList.contains('active')) {
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    closeMenu(overlay);
                }
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
    
    // GSAP ScrollTrigger
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
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // プレースホルダー属性を空に設定
        input.setAttribute('placeholder', ' ');
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // 初期値があれば
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // お問い合わせフォーム送信
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォーム送信処理をここに追加
            // 通常はここでAjaxを使ってサーバーにデータを送信
            
            // 送信完了メッセージ（デモ用）
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>送信完了</h3>
                <p>お問い合わせありがとうございます。担当者からご連絡いたします。</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // 3秒後にフォームをリセット
            setTimeout(() => {
                contactForm.reset();
                formGroups.forEach(group => group.style.display = 'block');
                contactForm.removeChild(successMessage);
            }, 3000);
        });
    }
    
    // ニュースレターフォーム送信
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォーム送信処理
            
            // 送信完了メッセージ（デモ用）
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            const originalValue = input.value;
            
            input.disabled = true;
            button.disabled = true;
            
            input.value = 'ご登録ありがとうございます！';
            
            setTimeout(() => {
                input.disabled = false;
                button.disabled = false;
                input.value = '';
                newsletterForm.reset();
            }, 3000);
        });
    }
    
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
    
    // ホバーエフェクト強化
    function enhanceHoverEffects() {
        // サービスアイテムのホバーエフェクト
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.icon-container'), {
                    rotate: 0,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.icon-container'), {
                    rotate: 5,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // 実績アイテムのホバーエフェクト
        const achievementImages = document.querySelectorAll('.achievement-image');
        achievementImages.forEach(image => {
            image.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.hover-content'), {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            image.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.hover-content'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
    
    enhanceHoverEffects();
    
    // ページが完全に読み込まれたときのアニメーション
    window.addEventListener('load', function() {
        // スクロールトリガーアニメーションを追加
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.fromTo(section.querySelector('.section-header'), 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    });
    
    // リサイズイベント対応
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
});
