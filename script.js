// ==================== DATA INITIALIZATION ====================
let scriptsData = [];

// Data demo awal
const initialScripts = [];

// Inisialisasi data dari localStorage atau pake data demo
function initData() {
    const savedScripts = localStorage.getItem('gudangScripts');
    if (savedScripts) {
        scriptsData = JSON.parse(savedScripts);
    } else {
        scriptsData = [...initialScripts];
        saveToLocalStorage();
    }
}

// Simpan ke localStorage
function saveToLocalStorage() {
    localStorage.setItem('gudangScripts', JSON.stringify(scriptsData));
}

// ==================== DOM ELEMENTS ====================
const scriptsGrid = document.getElementById('scriptsGrid');
const myUploadsGrid = document.getElementById('myUploadsGrid');
const categoryGrid = document.getElementById('categoryGrid');
const filterButtons = document.getElementById('filterButtons');
const trendingPreview = document.getElementById('trendingPreview');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const uploadForm = document.getElementById('uploadForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTop = document.getElementById('backToTop');
const loadingOverlay = document.getElementById('loadingOverlay');
const notificationContainer = document.getElementById('notificationContainer');

// ==================== CURRENT USER ====================
let currentUser = localStorage.getItem('currentUser') || 'Guest_' + Math.floor(Math.random() * 1000);
localStorage.setItem('currentUser', currentUser);

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initData();
    initWelcomeScreen();
    initPageTransitions();
    initThemeSwitcher();
    initBackToTop();
    initUserMenu();
    initMobileMenu();
    initFormProgress();
    initFileUpload();
    initSearch();
    initResetFilter();
    updateAllUI();
    updateWelcomeStats();
    
    // Set username display
    document.getElementById('usernameDisplay').textContent = currentUser;
    document.getElementById('dropdownUsername').textContent = currentUser;
    document.getElementById('mobileUsername').textContent = currentUser;
    
    // Hide loading
    setTimeout(() => {
        hideLoading();
    }, 500);
});

// Update semua UI
function updateAllUI() {
    updateStats();
    updateCategoryGrid();
    updateFilterButtons();
    displayScripts(scriptsData);
    displayMyUploads();
    displayTrendingScripts();
    updateFooterStats();
    updateCategoryStats();
}

// ==================== WELCOME SCREEN ====================
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainDashboard = document.getElementById('mainDashboard');
    const enterBtn = document.getElementById('enterDashboardBtn');
    const exploreBtn = document.getElementById('exploreAsGuestBtn');
    const backToWelcomeBtn = document.getElementById('backToWelcomeBtn');
    
    // Typing Animation dengan Typed.js
    const typed = new Typed('#typingText', {
        strings: [
            'Selamat Datang di Gudang Script!',
            'Tempatnya <span style="color: #ffd700;">Developer Bot</span>',
            'Upload <i class="fas fa-cloud-upload-alt"></i>',
            'Download <i class="fas fa-download"></i>',
            'Delete Script <i class="fas fa-trash-alt"></i>',
            'Join Komunitas <i class="fas fa-users"></i>'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
    
    // GSAP Animation
    gsap.from('.welcome-logo', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.welcome-text h2', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.welcome-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.stat-circle', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Event Listeners
    enterBtn.addEventListener('click', () => {
        showLoading();
        gsap.to(welcomeScreen, {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                welcomeScreen.classList.add('hidden');
                mainDashboard.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                hideLoading();
                initScrollAnimations();
            }
        });
    });
    
    exploreBtn.addEventListener('click', () => {
        showLoading();
        gsap.to(welcomeScreen, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power3.in',
            onComplete: () => {
                welcomeScreen.classList.add('hidden');
                mainDashboard.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                hideLoading();
                initScrollAnimations();
            }
        });
    });
    
    backToWelcomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoading();
        gsap.to(mainDashboard, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
                mainDashboard.classList.add('hidden');
                welcomeScreen.classList.remove('hidden');
                welcomeScreen.style.opacity = 1;
                welcomeScreen.style.y = 0;
                document.body.style.overflow = 'hidden';
                hideLoading();
                typed.reset();
            }
        });
    });
}

// ==================== PAGE TRANSITIONS ====================
function initPageTransitions() {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link, [data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            
            if (!pageId) return;
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Page transition
            const currentPage = document.querySelector('.page.active-page');
            const nextPage = document.getElementById(`${pageId}Page`);
            
            if (currentPage === nextPage) return;
            
            gsap.to(currentPage, {
                opacity: 0,
                x: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    currentPage.classList.remove('active-page');
                    
                    gsap.set(nextPage, {
                        opacity: 0,
                        x: 20,
                        display: 'block'
                    });
                    
                    nextPage.classList.add('active-page');
                    
                    gsap.to(nextPage, {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = pageId;
                    
                    // Close mobile menu
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        gsap.to(mobileMenu, {
                            x: '100%',
                            duration: 0.3,
                            onComplete: () => {
                                mobileMenu.classList.add('hidden');
                                hamburger?.classList.remove('active');
                            }
                        });
                    }
                }
            });
        });
    });
    
    // Check hash on load
    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const targetLink = document.querySelector(`[data-page="${hash}"]`);
        if (targetLink) targetLink.click();
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    gsap.to('.hero-background .gradient-orb', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        scale: 1.5,
        opacity: 0.5
    });
}

// ==================== THEME SWITCHER ====================
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const themeStyle = document.getElementById('theme-style');
    
    const savedTheme = localStorage.getItem('gudangTheme') || 'light';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = themeStyle.getAttribute('href') === 'theme-light.css' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            
            gsap.to(themeToggle, {
                rotate: 360,
                scale: 1.1,
                duration: 0.5,
                ease: 'back.out',
                onComplete: () => {
                    gsap.to(themeToggle, {
                        rotate: 0,
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const currentTheme = themeStyle.getAttribute('href') === 'theme-light.css' ? 'light' : 'dark';
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        });
    }
    
    function setTheme(theme) {
        themeStyle.setAttribute('href', `theme-${theme}.css`);
        localStorage.setItem('gudangTheme', theme);
        
        const sunIcon = themeToggle?.querySelector('.fa-sun');
        const moonIcon = themeToggle?.querySelector('.fa-moon');
        const ball = themeToggle?.querySelector('.theme-toggle-ball');
        
        if (theme === 'dark') {
            if (sunIcon) sunIcon.style.opacity = '0.5';
            if (moonIcon) moonIcon.style.opacity = '1';
            if (ball) ball.style.left = 'calc(100% - 22px)';
        } else {
            if (sunIcon) sunIcon.style.opacity = '1';
            if (moonIcon) moonIcon.style.opacity = '0.5';
            if (ball) ball.style.left = '2px';
        }
    }
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.remove('hidden');
            gsap.to(backToTop, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        } else {
            gsap.to(backToTop, {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    backToTop.classList.add('hidden');
                }
            });
        }
    });
    
    backToTop.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power3.inOut'
        });
    });
}

// ==================== LOADING ====================
function showLoading() {
    if (!loadingOverlay) return;
    loadingOverlay.classList.remove('hidden');
    gsap.to(loadingOverlay, {
        opacity: 1,
        duration: 0.3,
        display: 'flex'
    });
}

function hideLoading() {
    if (!loadingOverlay) return;
    gsap.to(loadingOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            loadingOverlay.classList.add('hidden');
        }
    });
}

// ==================== USER MENU ====================
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.querySelector('.user-dropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
            
            gsap.to(userDropdown, {
                opacity: 1,
                y: 10,
                duration: 0.3,
                ease: 'back.out'
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = 'Guest_' + Math.floor(Math.random() * 1000);
            localStorage.setItem('currentUser', currentUser);
            document.getElementById('usernameDisplay').textContent = currentUser;
            document.getElementById('dropdownUsername').textContent = currentUser;
            document.getElementById('mobileUsername').textContent = currentUser;
            showNotification('👋 Berhasil logout!', 'info');
        });
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
            currentUser = 'Guest_' + Math.floor(Math.random() * 1000);
            localStorage.setItem('currentUser', currentUser);
            document.getElementById('usernameDisplay').textContent = currentUser;
            document.getElementById('dropdownUsername').textContent = currentUser;
            document.getElementById('mobileUsername').textContent = currentUser;
            showNotification('👋 Berhasil logout!', 'info');
            
            gsap.to(mobileMenu, {
                x: '100%',
                duration: 0.3,
                onComplete: () => {
                    mobileMenu.classList.add('hidden');
                    hamburger?.classList.remove('active');
                }
            });
        });
    }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    
    const closeBtn = document.querySelector('.mobile-menu-close');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        
        if (!mobileMenu.classList.contains('hidden')) {
            gsap.fromTo(mobileMenu,
                { x: '100%' },
                { x: 0, duration: 0.4, ease: 'power3.out' }
            );
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            gsap.to(mobileMenu, {
                x: '100%',
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    mobileMenu.classList.add('hidden');
                    hamburger.classList.remove('active');
                }
            });
        });
    }
}

// ==================== STATS UPDATE ====================
function updateStats() {
    const totalScripts = scriptsData.length;
    const totalDownloads = scriptsData.reduce((sum, script) => sum + script.downloads, 0);
    const uniqueContributors = [...new Set(scriptsData.map(s => s.uploader || s.author))].length;
    
    const homeTotalScripts = document.getElementById('homeTotalScripts');
    const homeTotalDownloads = document.getElementById('homeTotalDownloads');
    const homeTotalContributors = document.getElementById('homeTotalContributors');
    
    if (homeTotalScripts) homeTotalScripts.textContent = totalScripts;
    if (homeTotalDownloads) homeTotalDownloads.textContent = formatNumber(totalDownloads);
    if (homeTotalContributors) homeTotalContributors.textContent = uniqueContributors;
}

// Update welcome stats
function updateWelcomeStats() {
    const welcomeTotalScripts = document.getElementById('welcomeTotalScripts');
    const welcomeTotalDownloads = document.getElementById('welcomeTotalDownloads');
    const welcomeTotalContributors = document.getElementById('welcomeTotalContributors');
    
    if (welcomeTotalScripts) welcomeTotalScripts.textContent = scriptsData.length;
    const totalDownloads = scriptsData.reduce((sum, s) => sum + s.downloads, 0);
    if (welcomeTotalDownloads) welcomeTotalDownloads.textContent = formatNumber(totalDownloads);
    const uniqueUsers = [...new Set(scriptsData.map(s => s.uploader || s.author))].length;
    if (welcomeTotalContributors) welcomeTotalContributors.textContent = uniqueUsers;
}

// Update footer stats
function updateFooterStats() {
    const footerTotalScripts = document.getElementById('footerTotalScripts');
    const footerTotalDownloads = document.getElementById('footerTotalDownloads');
    const footerTotalUsers = document.getElementById('footerTotalUsers');
    
    if (footerTotalScripts) footerTotalScripts.innerHTML = `<i class="fas fa-code"></i> Total Script: ${scriptsData.length}`;
    const totalDownloads = scriptsData.reduce((sum, s) => sum + s.downloads, 0);
    if (footerTotalDownloads) footerTotalDownloads.innerHTML = `<i class="fas fa-download"></i> Total Download: ${formatNumber(totalDownloads)}`;
    const uniqueUsers = [...new Set(scriptsData.map(s => s.uploader || s.author))].length;
    if (footerTotalUsers) footerTotalUsers.innerHTML = `<i class="fas fa-users"></i> Contributors: ${uniqueUsers}`;
}

// ==================== CATEGORY GRID ====================
function updateCategoryGrid() {
    if (!categoryGrid) return;
    
    const categoryCount = {};
    scriptsData.forEach(script => {
        categoryCount[script.category] = (categoryCount[script.category] || 0) + 1;
    });
    
    const categoryIcons = {
        whatsapp: 'fab fa-whatsapp',
        telegram: 'fab fa-telegram',
        discord: 'fab fa-discord',
        instagram: 'fab fa-instagram',
        facebook: 'fab fa-facebook',
        twitter: 'fab fa-twitter',
        tiktok: 'fab fa-tiktok',
        line: 'fab fa-line',
        others: 'fas fa-code'
    };
    
    const categoryNames = {
        whatsapp: 'WhatsApp Bot',
        telegram: 'Telegram Bot',
        discord: 'Discord Bot',
        instagram: 'Instagram Bot',
        facebook: 'Facebook Bot',
        twitter: 'Twitter Bot',
        tiktok: 'TikTok Bot',
        line: 'LINE Bot',
        others: 'Lainnya'
    };
    
    let html = '';
    
    Object.keys(categoryCount).sort().forEach(category => {
        html += `
            <div class="category-card-enhanced" onclick="filterByCategory('${category}')">
                <div class="category-icon">
                    <i class="${categoryIcons[category] || 'fas fa-code'}"></i>
                </div>
                <h3>${categoryNames[category] || category}</h3>
                <span class="category-count">${categoryCount[category]} script</span>
            </div>
        `;
    });
    
    if (html === '') {
        html = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-folder-open"></i>
                <h3>Belum Ada Kategori</h3>
                <p>Upload script untuk membuat kategori baru!</p>
                <a href="#upload" class="btn btn-primary" data-page="upload">Upload Sekarang</a>
            </div>
        `;
    }
    
    categoryGrid.innerHTML = html;
}

// ==================== CATEGORY STATS ====================
function updateCategoryStats() {
    const statsBars = document.getElementById('categoryStats');
    if (!statsBars) return;
    
    const categoryCount = {};
    scriptsData.forEach(script => {
        categoryCount[script.category] = (categoryCount[script.category] || 0) + 1;
    });
    
    const totalScripts = scriptsData.length;
    let html = '';
    
    Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a]).forEach(category => {
        const percentage = (categoryCount[category] / totalScripts * 100).toFixed(1);
        html += `
            <div class="stat-bar-item">
                <span class="stat-bar-label">${capitalizeFirst(category)}</span>
                <div class="stat-bar-container">
                    <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="stat-bar-count">${categoryCount[category]} (${percentage}%)</span>
            </div>
        `;
    });
    
    statsBars.innerHTML = html;
}

// ==================== FILTER BUTTONS ====================
function updateFilterButtons() {
    if (!filterButtons) return;
    
    const categories = ['all', ...new Set(scriptsData.map(s => s.category))];
    
    const categoryNames = {
        all: 'Semua',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        discord: 'Discord',
        instagram: 'Instagram',
        facebook: 'Facebook',
        twitter: 'Twitter',
        tiktok: 'TikTok',
        line: 'LINE',
        others: 'Lainnya'
    };
    
    let html = '';
    categories.forEach(category => {
        const count = category === 'all' ? scriptsData.length : scriptsData.filter(s => s.category === category).length;
        html += `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    data-filter="${category}"
                    onclick="filterScripts('${category}')">
                ${categoryNames[category] || category} (${count})
            </button>
        `;
    });
    
    filterButtons.innerHTML = html;
}

// ==================== FILTER & SEARCH ====================
window.filterScripts = function(category) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    let filtered;
    if (category === 'all') {
        filtered = scriptsData;
    } else {
        filtered = scriptsData.filter(script => script.category === category);
    }
    
    displayScripts(filtered);
    document.getElementById('scriptsPage').scrollIntoView({ behavior: 'smooth' });
}

window.filterByCategory = function(category) {
    filterScripts(category);
    
    const scriptsPage = document.getElementById('scriptsPage');
    if (scriptsPage) {
        const targetLink = document.querySelector('[data-page="scripts"]');
        if (targetLink) targetLink.click();
    }
}

function initSearch() {
    if (!searchBtn || !searchInput) return;
    
    searchBtn.addEventListener('click', searchScripts);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchScripts();
    });
}

function searchScripts() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        displayScripts(scriptsData);
        return;
    }
    
    const filtered = scriptsData.filter(script => 
        script.title.toLowerCase().includes(query) ||
        script.description.toLowerCase().includes(query) ||
        script.author.toLowerCase().includes(query) ||
        script.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    displayScripts(filtered);
    
    if (filtered.length === 0) {
        scriptsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Script Tidak Ditemukan</h3>
                <p>Maaf, tidak ada script dengan kata kunci "${query}"</p>
                <button onclick="displayScripts(scriptsData)" class="btn btn-primary">
                    <i class="fas fa-undo"></i> Lihat Semua Script
                </button>
            </div>
        `;
    }
}

function initResetFilter() {
    const resetBtn = document.getElementById('resetFilterBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            displayScripts(scriptsData);
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                allBtn.classList.add('active');
            }
            searchInput.value = '';
        });
    }
}

// ==================== DISPLAY SCRIPTS ====================
function displayScripts(scripts) {
    if (!scriptsGrid) return;
    
    if (scripts.length === 0) {
        scriptsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>Belum Ada Script</h3>
                <p>Jadilah yang pertama upload script bot kamu!</p>
                <a href="#upload" class="btn btn-primary" data-page="upload">
                    <i class="fas fa-upload"></i> Upload Script Sekarang
                </a>
            </div>
        `;
        return;
    }
    
    scriptsGrid.innerHTML = scripts.map(script => createScriptCard(script)).join('');
}

function displayMyUploads() {
    if (!myUploadsGrid) return;
    
    const myScripts = scriptsData.filter(s => (s.uploader || s.author) === currentUser);
    
    const myUploadsCount = document.getElementById('myUploadsCount');
    const myDownloadsCount = document.getElementById('myDownloadsCount');
    const myRatingAvg = document.getElementById('myRatingAvg');
    
    if (myUploadsCount) myUploadsCount.textContent = myScripts.length;
    if (myDownloadsCount) myDownloadsCount.textContent = myScripts.reduce((sum, s) => sum + s.downloads, 0);
    if (myRatingAvg) {
        const avgRating = myScripts.length ? (myScripts.reduce((sum, s) => sum + s.rating, 0) / myScripts.length).toFixed(1) : 0;
        myRatingAvg.textContent = avgRating;
    }
    
    if (myScripts.length === 0) {
        myUploadsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-cloud-upload-alt"></i>
                <h3>Kamu Belum Upload Script</h3>
                <p>Upload script pertamamu dan dapatkan credits!</p>
                <a href="#upload" class="btn btn-primary" data-page="upload">
                    <i class="fas fa-upload"></i> Upload Sekarang
                </a>
            </div>
        `;
        return;
    }
    
    myUploadsGrid.innerHTML = myScripts.map(script => `
        <div class="script-card my-script" data-id="${script.id}">
            <div class="script-header">
                <div class="script-header-left">
                    <h3 class="script-title">${script.title}</h3>
                    <span class="script-category-badge">
                        <i class="fab fa-${getCategoryIcon(script.category)}"></i>
                        ${capitalizeFirst(script.category)}
                    </span>
                </div>
                <span class="script-badge badge-${script.type}">
                    ${script.type === 'premium' ? '💰 Premium' : '🎁 Gratis'}
                </span>
            </div>
            <div class="script-body">
                <p class="script-description">${script.description}</p>
                <div class="script-meta">
                    <span><i class="fas fa-user"></i> ${script.author}</span>
                    <span><i class="fas fa-code-branch"></i> v${script.version}</span>
                    <span><i class="fas fa-download"></i> ${formatNumber(script.downloads)}</span>
                    <span><i class="fas fa-star"></i> ${script.rating}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(script.date)}</span>
                </div>
                <div class="script-tags">
                    ${script.tags.map(tag => `<span class="script-tag">#${tag.trim()}</span>`).join('')}
                </div>
                ${script.demo && script.demo !== '#' ? `
                    <a href="${script.demo}" target="_blank" class="script-demo-link">
                        <i class="fas fa-external-link-alt"></i> Lihat Demo
                    </a>
                ` : ''}
            </div>
            <div class="script-footer">
                <div class="script-info">
                    <span><i class="fas fa-file"></i> ${script.fileName || 'script.zip'}</span>
                    <span><i class="fas fa-database"></i> ${script.fileSize || '1.2 MB'}</span>
                </div>
                <div class="my-script-actions">
                    <button class="btn-delete" onclick="deleteScript(${script.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    <button class="btn-download" onclick="downloadScript(${script.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayTrendingScripts() {
    if (!trendingPreview) return;
    
    const trending = [...scriptsData]
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 3);
    
    trendingPreview.innerHTML = trending.map(script => createScriptCard(script)).join('');
}

function createScriptCard(script) {
    const isOwner = (script.uploader || script.author) === currentUser;
    
    return `
        <div class="script-card" data-category="${script.category}" data-id="${script.id}">
            <div class="script-header">
                <div class="script-header-left">
                    <h3 class="script-title">${script.title}</h3>
                    <span class="script-category-badge">
                        <i class="fab fa-${getCategoryIcon(script.category)}"></i>
                        ${capitalizeFirst(script.category)}
                    </span>
                </div>
                <span class="script-badge badge-${script.type}">
                    ${script.type === 'premium' ? '💰 Premium' : '🎁 Gratis'}
                </span>
            </div>
            <div class="script-body">
                <p class="script-description">${script.description}</p>
                <div class="script-meta">
                    <span title="Author"><i class="fas fa-user"></i> ${script.author}</span>
                    <span title="Versi"><i class="fas fa-code-branch"></i> v${script.version}</span>
                    <span title="Downloads"><i class="fas fa-download"></i> ${formatNumber(script.downloads)}</span>
                    <span title="Rating"><i class="fas fa-star"></i> ${script.rating}</span>
                    <span title="Upload"><i class="fas fa-calendar"></i> ${formatDate(script.date)}</span>
                </div>
                <div class="script-tags">
                    ${script.tags.map(tag => `<span class="script-tag">#${tag.trim()}</span>`).join('')}
                </div>
                ${script.demo && script.demo !== '#' ? `
                    <a href="${script.demo}" target="_blank" class="script-demo-link">
                        <i class="fas fa-external-link-alt"></i> Lihat Demo
                    </a>
                ` : ''}
            </div>
            <div class="script-footer">
                <div class="script-info">
                    <span><i class="fas fa-file"></i> ${script.fileName || 'script.zip'}</span>
                    <span><i class="fas fa-database"></i> ${script.fileSize || '1.2 MB'}</span>
                </div>
                <div class="script-actions">
                    ${isOwner ? `
                        <button class="btn-delete" onclick="deleteScript(${script.id})" title="Hapus script">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                    <button class="btn-download" onclick="downloadScript(${script.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==================== DOWNLOAD SCRIPT ====================
window.downloadScript = function(scriptId) {
    const script = scriptsData.find(s => s.id === scriptId);
    if (!script) return;
    
    if (script.type === 'premium') {
        showNotification('🔒 Script premium - Hubungi author untuk pembelian', 'warning');
        showPremiumModal(script);
    } else {
        script.downloads += 1;
        saveToLocalStorage();
        updateAllUI();
        
        showNotification(`📥 Downloading ${script.title}...`, 'success');
        
        const content = `Script: ${script.title}
Author: ${script.author}
Version: ${script.version}
Downloaded from: Gudang Script
Date: ${new Date().toLocaleString()}

=== SCRIPT CONTENT ===
// Ini adalah script dummy untuk demo
// Script asli: ${script.demo || 'No link'}

console.log("Hello from ${script.title}!");
console.log("Thanks for downloading!");

// Fitur-fitur:
${script.description}

// Tags: ${script.tags.join(', ')}
`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = script.fileName || `${script.title.toLowerCase().replace(/\s+/g, '-')}.js`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('✅ Download selesai!', 'success');
    }
}

// ==================== PREMIUM MODAL ====================
function showPremiumModal(script) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-crown" style="color: gold;"></i> Script Premium</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="premium-details">
                    <h4>${script.title}</h4>
                    <p class="premium-author">👤 Author: ${script.author}</p>
                    <p class="premium-price">💰 Harga: Rp 100.000 - Rp 500.000</p>
                    <p class="premium-benefits">✨ Keuntungan:</p>
                    <ul>
                        <li><i class="fas fa-check"></i> Full source code</li>
                        <li><i class="fas fa-check"></i> Bebas edit</li>
                        <li><i class="fas fa-check"></i> Support instalasi</li>
                        <li><i class="fas fa-check"></i> Update gratis</li>
                    </ul>
                    <div class="premium-contact">
                        <p>Hubungi author untuk pembelian:</p>
                        <div class="contact-buttons">
                            <a href="https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20script%20${encodeURIComponent(script.title)}" 
                               target="_blank" class="btn btn-success">
                                <i class="fab fa-whatsapp"></i> WhatsApp Author
                            </a>
                            <button class="btn btn-primary" onclick="showNotification('Fitur chat sedang dikembangkan', 'info'); this.closest('.modal').remove();">
                                <i class="fas fa-comment"></i> Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ==================== DELETE SCRIPT ====================
window.deleteScript = function(scriptId) {
    const script = scriptsData.find(s => s.id === scriptId);
    
    if ((script.uploader || script.author) !== currentUser) {
        showNotification('❌ Kamu tidak punya izin untuk menghapus script ini!', 'error');
        return;
    }
    
    if (confirm(`Yakin ingin menghapus script "${script.title}"?`)) {
        scriptsData = scriptsData.filter(s => s.id !== scriptId);
        saveToLocalStorage();
        updateAllUI();
        showNotification('✅ Script berhasil dihapus!', 'success');
    }
}

// ==================== UPLOAD SCRIPT ====================
function initFormProgress() {
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    
    let currentStep = 0;
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                if (validateStep(currentStep)) {
                    gsap.to(steps[currentStep], {
                        opacity: 0,
                        x: -30,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            steps[currentStep].classList.remove('active');
                            steps[currentStep + 1].classList.add('active');
                            
                            gsap.fromTo(steps[currentStep + 1],
                                { opacity: 0, x: 30 },
                                { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                            );
                        }
                    });
                    
                    progressSteps[currentStep].classList.remove('active');
                    progressSteps[currentStep + 1].classList.add('active');
                    
                    currentStep++;
                }
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                gsap.to(steps[currentStep], {
                    opacity: 0,
                    x: 30,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        steps[currentStep].classList.remove('active');
                        steps[currentStep - 1].classList.add('active');
                        
                        gsap.fromTo(steps[currentStep - 1],
                            { opacity: 0, x: -30 },
                            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                        );
                    }
                });
                
                progressSteps[currentStep].classList.remove('active');
                progressSteps[currentStep - 1].classList.add('active');
                
                currentStep--;
            }
        });
    });
    
    function validateStep(step) {
        const currentStepElement = steps[step];
        const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        
        for (let input of inputs) {
            if (!input.value) {
                gsap.to(input, {
                    x: [0, -10, 10, -5, 5, 0],
                    duration: 0.5,
                    borderColor: 'var(--danger-color)'
                });
                showNotification('❌ Harap isi semua field yang wajib!', 'error');
                return false;
            }
        }
        
        if (step === 0) {
            const description = document.getElementById('scriptDescription');
            if (description.value.length < 20) {
                showNotification('❌ Deskripsi minimal 20 karakter!', 'error');
                return false;
            }
        }
        
        return true;
    }
}

function initFileUpload() {
    const fileInput = document.getElementById('scriptFile');
    const fileInfo = document.querySelector('.file-info');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeBtn = document.querySelector('.btn-remove-file');
    
    if (!fileInput) return;
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.add('visible');
        }
    });
    
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            fileInput.value = '';
            fileInfo.classList.remove('visible');
        });
    }
}

if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('scriptFile');
        const file = fileInput.files[0];
        
        if (!file) {
            showNotification('❌ Pilih file script terlebih dahulu!', 'error');
            return;
        }
        
        if (file.size > 50 * 1024 * 1024) {
            showNotification('❌ Ukuran file maksimal 50MB!', 'error');
            return;
        }
        
        const newId = scriptsData.length > 0 ? Math.max(...scriptsData.map(s => s.id)) + 1 : 1;
        
        const tagsInput = document.getElementById('scriptTags').value;
        const tags = tagsInput.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
        
        const newScript = {
            id: newId,
            title: document.getElementById('scriptName').value,
            category: document.getElementById('scriptCategory').value,
            type: document.getElementById('isPremium').checked ? 'premium' : 'gratis',
            description: document.getElementById('scriptDescription').value,
            version: document.getElementById('scriptVersion').value || '1.0.0',
            author: document.getElementById('scriptAuthor').value,
            tags: tags.length > 0 ? tags : ['bot', 'script'],
            demo: document.getElementById('scriptDemo').value || '#',
            downloads: 0,
            rating: 0,
            date: new Date().toISOString().split('T')[0],
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            uploader: currentUser
        };
        
        scriptsData.unshift(newScript);
        saveToLocalStorage();
        uploadForm.reset();
        
        const fileInfo = document.querySelector('.file-info');
        if (fileInfo) fileInfo.classList.remove('visible');
        
        updateAllUI();
        showNotification('✅ Script berhasil diupload!', 'success');
        
        const targetLink = document.querySelector('[data-page="myuploads"]');
        if (targetLink) targetLink.click();
    });
}

// ==================== HELPER FUNCTIONS ====================
function getCategoryIcon(category) {
    const icons = {
        whatsapp: 'whatsapp',
        telegram: 'telegram',
        discord: 'discord',
        instagram: 'instagram',
        facebook: 'facebook',
        twitter: 'twitter',
        tiktok: 'tiktok',
        line: 'line',
        others: 'code'
    };
    return icons[category] || 'code';
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 
                         type === 'warning' ? 'fa-exclamation-triangle' : 
                         'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ==================== RESET DATA ====================
window.resetData = function() {
    if (confirm('⚠️ Reset semua data? Semua script akan kembali ke data demo!')) {
        localStorage.removeItem('gudangScripts');
        initData();
        updateAllUI();
        updateWelcomeStats();
        showNotification('Data direset ke demo!', 'warning');
    }
}

// Export functions to global
window.filterByCategory = filterByCategory;
window.filterScripts = filterScripts;
window.downloadScript = downloadScript;
window.deleteScript = deleteScript;
window.resetData = resetData;
