document.addEventListener('DOMContentLoaded', () => {

    // 1. 魔法阵 Loading 动画
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 800);
        }, 1000);
    }

    // 2. 视差滚动特效
    document.addEventListener('mousemove', (e) => {
        const bg = document.getElementById('layer-bg');
        const fg = document.getElementById('layer-fg');
        if (!bg || !fg) return;

        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        bg.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        fg.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px)`;
    });

    // 3. 樱花飘落特效
    const container = document.getElementById('sakura-container');
    if (container) {
        for (let i = 0; i < 30; i++) {
            let petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.width = `${Math.random() * 10 + 5}px`;
            petal.style.height = petal.style.width;
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
            petal.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(petal);
        }
    }

    // 4. 翻转卡片跳转逻辑 (添加防御性检查)
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', function(e) {
            e.preventDefault();
            setTimeout(() => { window.location.href = 'detail.html'; }, 600);
        });
    }

    // 5. 视频遮罩点击逻辑
    document.addEventListener('click', (e) => {
        const videoOverlay = document.getElementById('video-overlay');
        const secretVideo = document.getElementById('secret-video');
        if (!videoOverlay || !secretVideo) return;

        if (e.target.tagName === 'BODY' || e.target.classList.contains('works-grid-container')) {
            videoOverlay.style.display = 'flex';
            secretVideo.play();
        }
    });

    // 6. BGM 控制逻辑 (整合并优化)
    const audio = document.getElementById('bgm-audio');
    const bgmBtn = document.getElementById('bgm-toggle');
    
    if (audio && bgmBtn) {
        const isPlaying = sessionStorage.getItem('bgm_playing') === 'true';
        const savedTime = sessionStorage.getItem('bgm_time');

        audio.onloadedmetadata = () => {
            if (savedTime) audio.currentTime = parseFloat(savedTime);
            if (isPlaying) {
                bgmBtn.classList.add('playing');
                audio.play().catch(e => console.log("需用户手动交互以播放"));
            }
        };

        bgmBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                bgmBtn.classList.add('playing');
                sessionStorage.setItem('bgm_playing', 'true');
            } else {
                audio.pause();
                bgmBtn.classList.remove('playing');
                sessionStorage.setItem('bgm_playing', 'false');
            }
        });

        audio.addEventListener('timeupdate', () => {
            sessionStorage.setItem('bgm_time', audio.currentTime);
        });
    }
});

// 7. 全局魔法阵点击特效 (保持原样)
function playMagicEffect(event) {
    const circle = document.createElement('div');
    circle.classList.add('click-magic-circle');
    circle.style.left = `${event.clientX}px`;
    circle.style.top = `${event.clientY}px`;
    document.body.appendChild(circle);
    setTimeout(() => { circle.remove(); }, 800);
}

function closeVideo() {
    const videoOverlay = document.getElementById('video-overlay');
    const secretVideo = document.getElementById('secret-video');
    if (videoOverlay) videoOverlay.style.display = 'none';
    if (secretVideo) {
        secretVideo.pause();
        secretVideo.currentTime = 0;
    }
}