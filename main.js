/* ============================================
   在地共生型服務專題網站 - 共用腳本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- 行動裝置導覽切換 ----- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  /* ----- 標記當前頁面導覽連結 ----- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----- 滾動觸發進場動畫 ----- */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        /* 觸發長條圖填充動畫 */
        const bars = entry.target.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            setTimeout(() => {
              bar.style.width = targetWidth + '%';
            }, 150);
          }
        });

        /* 觸發數字滾動 */
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach(counter => {
          if (counter.dataset.counted) return;
          counter.dataset.counted = 'true';
          const target = parseFloat(counter.getAttribute('data-count'));
          const duration = 1400;
          const isFloat = target % 1 !== 0;
          let startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            counter.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .bar-chart, .stats-grid').forEach(el => {
    observer.observe(el);
  });

  /* ----- 標籤頁切換 ----- */
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const contents = tabContainer.querySelectorAll('.tab-content');

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        if (contents[idx]) contents[idx].classList.add('active');
      });
    });
  });

});
