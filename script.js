// ==================== DATA INITIALIZATION ====================
let scriptsData = [];

// Data demo awal
const initialScripts = [];

// Inisialisasi data dari localStorage atau pake data demo
function initData() {
    try {
        const savedScripts = localStorage.getItem('gudangScripts');
        if (savedScripts) {
            scriptsData = JSON.parse(savedScripts);
        } else {
            scriptsData = [...initialScripts];
            saveToLocalStorage();
        }
    } catch (error) {
        console.error('Error loading data:', error);
        scriptsData = [...initialScripts];
        saveToLocalStorage();
    }
}

// Simpan ke localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('gudangScripts', JSON.stringify(scriptsData));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showNotification('❌ Gagal menyimpan data!', 'error');
    }
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
    // Initialize AOS jika tersedia
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
    
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
    const usernameDisplay = document.getElementById('usernameDisplay');
    const dropdownUsername = document.getElementById('dropdownUsername');
    const mobileUsername = document.getElementById('mobileUsername');
    
    if (usernameDisplay) usernameDisplay.textContent = currentUser;
    if (dropdownUsername) dropdownUsername.textContent = currentUser;
    if (mobileUsername) mobileUsername.textContent = currentUser;
    
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
    if (typeof Typed !== 'undefined' && document.getElementById('typingText')) {
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
    }
    
    // GSAP Animation - check if GSAP tersedia
    if (typeof gsap !== 'undefined') {
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
    }
    
    // Event Listeners
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            showLoading();
            if (typeof gsap !== 'undefined') {
                gsap.to(welcomeScreen, {
                    opacity: 0,
                    y: -50,
                    duration: 0.8,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        if (welcomeScreen) welcomeScreen.classList.add('hidden');
                        if (mainDashboard) mainDashboard.classList.remove('hidden');
                        document.body.style.overflow = 'auto';
                        hideLoading();
                        initScrollAnimations();
                    }
                });
            } else {
                welcomeScreen.classList.add('hidden');
                mainDashboard.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                hideLoading();
            }
        });
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showLoading();
            if (typeof gsap !== 'undefined') {
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
            } else {
                welcomeScreen.classList.add('hidden');
                mainDashboard.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                hideLoading();
            }
        });
    }
    
    if (backToWelcomeBtn) {
        backToWelcomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoading();
            if (typeof gsap !== 'undefined') {
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
                        if (typed) typed.reset();
                    }
                });
            } else {
                mainDashboard.classList.add('hidden');
                welcomeScreen.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                hideLoading();
            }
        });
    }
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
            
            if (!currentPage || !nextPage || currentPage === nextPage) return;
            
            if (typeof gsap !== 'undefined') {
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
                            if (typeof gsap !== 'undefined') {
                                gsap.to(mobileMenu, {
                                    x: '100%',
                                    duration: 0.3,
                                    onComplete: () => {
                                        mobileMenu.classList.add('hidden');
                                        if (hamburger) hamburger.classList.remove('active');
                                    }
                                });
                            } else {
                                mobileMenu.classList.add('hidden');
                                if (hamburger) hamburger.classList.remove('active');
                            }
                        }
                    }
                });
            } else {
                currentPage.classList.remove('active-page');
                nextPage.classList.add('active-page');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = pageId;
            }
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
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    try {
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
    } catch (error) {
        console.error('ScrollTrigger error:', error);
    }
}

// ==================== THEME SWITCHER ====================
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const themeStyle = document.getElementById('theme-style');
    
    if (!themeStyle) return;
    
    const savedTheme = localStorage.getItem('gudangTheme') || 'light';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = themeStyle.getAttribute('href') === 'theme-light.css' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            
            if (typeof gsap !== 'undefined') {
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
            }
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
            if (typeof gsap !== 'undefined') {
                gsap.to(backToTop, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                });
            }
        } else {
            if (typeof gsap !== 'undefined') {
                gsap.to(backToTop, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        backToTop.classList.add('hidden');
                    }
                });
            } else {
                backToTop.classList.add('hidden');
            }
        }
    });
    
    backToTop.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: 'power3.inOut'
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ==================== LOADING ====================
function showLoading() {
    if (!loadingOverlay) return;
    loadingOverlay.classList.remove('hidden');
    if (typeof gsap !== 'undefined') {
        gsap.to(loadingOverlay, {
            opacity: 1,
            duration: 0.3,
            display: 'flex'
        });
    }
}

function hideLoading() {
    if (!loadingOverlay) return;
    if (typeof gsap !== 'undefined') {
        gsap.to(loadingOverlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                loadingOverlay.classList.add('hidden');
            }
        });
    } else {
        loadingOverlay.classList.add('hidden');
    }
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
            
            if (typeof gsap !== 'undefined') {
                gsap.to(userDropdown, {
                    opacity: 1,
                    y: 10,
                    duration: 0.3,
                    ease: 'back.out'
                });
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && userDropdown) {
                userDropdown.classList.add('hidden');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = 'Guest_' + Math.floor(Math.random() * 1000);
            localStorage.setItem('currentUser', currentUser);
            const usernameDisplay = document.getElementById('usernameDisplay');
            const dropdownUsername = document.getElementById('dropdownUsername');
            const mobileUsername = document.getElementById('mobileUsername');
            
            if (usernameDisplay) usernameDisplay.textContent = currentUser;
            if (dropdownUsername) dropdownUsername.textContent = currentUser;
            if (mobileUsername) mobileUsername.textContent = currentUser;
            
            showNotification('👋 Berhasil logout!', 'info');
        });
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
            currentUser = 'Guest_' + Math.floor(Math.random() * 1000);
            localStorage.setItem('currentUser', currentUser);
            const usernameDisplay = document.getElementById('usernameDisplay');
            const dropdownUsername = document.getElementById('dropdownUsername');
            const mobileUsername = document.getElementById('mobileUsername');
            
            if (usernameDisplay) usernameDisplay.textContent = currentUser;
            if (dropdownUsername) dropdownUsername.textContent = currentUser;
            if (mobileUsername) mobileUsername.textContent = currentUser;
            
            showNotification('👋 Berhasil logout!', 'info');
            
            if (mobileMenu && typeof gsap !== 'undefined') {
                gsap.to(mobileMenu, {
                    x: '100%',
                    duration: 0.3,
                    onComplete: () => {
                        mobileMenu.classList.add('hidden');
                        if (hamburger) hamburger.classList.remove('active');
                    }
                });
            } else {
                mobileMenu.classList.add('hidden');
                if (hamburger) hamburger.classList.remove('active');
            }
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
        
        if (!mobileMenu.classList.contains('hidden') && typeof gsap !== 'undefined') {
            gsap.fromTo(mobileMenu,
                { x: '100%' },
                { x: 0, duration: 0.4, ease: 'power3.out' }
            );
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(mobileMenu, {
                    x: '100%',
                    duration: 0.3,
                    ease: 'power3.in',
                    onComplete: () => {
                        mobileMenu.classList.add('hidden');
                        hamburger.classList.remove('active');
                    }
                });
            } else {
                mobileMenu.classList.add('hidden');
                hamburger.classList.remove('active');
            }
        });
    }
}

// ==================== STATS UPDATE ====================
function updateStats() {
    const totalScripts = scriptsData.length;
    const totalDownloads = scriptsData.reduce((sum, script) => sum + (script.downloads || 0), 0);
    const uniqueContributors = [...new Set(scriptsData.map(s => s.uploader || s.author || 'Unknown'))].length;
    
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
    const totalDownloads = scriptsData.reduce((sum, s) => sum + (s.downloads || 0), 0);
    if (welcomeTotalDownloads) welcomeTotalDownloads.textContent = formatNumber(totalDownloads);
    const uniqueUsers = [...new Set(scriptsData.map(s => s.uploader || s.author || 'Unknown'))].length;
    if (welcomeTotalContributors) welcomeTotalContributors.textContent = uniqueUsers;
}

// Update footer stats
function updateFooterStats() {
    const footerTotalScripts = document.getElementById('footerTotalScripts');
    const footerTotalDownloads = document.getElementById('footerTotalDownloads');
    const footerTotalUsers = document.getElementById('footerTotalUsers');
    
    if (footerTotalScripts) footerTotalScripts.innerHTML = `<i class="fas fa-code"></i> Total Script: ${scriptsData.length}`;
    const totalDownloads = scriptsData.reduce((sum, s) => sum + (s.downloads || 0), 0);
    if (footerTotalDownloads) footerTotalDownloads.innerHTML = `<i class="fas fa-download"></i> Total Download: ${formatNumber(totalDownloads)}`;
    const uniqueUsers = [...new Set(scriptsData.map(s => s.uploader || s.author || 'Unknown'))].length;
    if (footerTotalUsers) footerTotalUsers.innerHTML = `<i class="fas fa-users"></i> Contributors: ${uniqueUsers}`;
}

// ==================== CATEGORY GRID ====================
function updateCategoryGrid() {
    if (!categoryGrid) return;
    
    const categoryCount = {};
    scriptsData.forEach(script => {
        const category = script.category || 'others';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
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
            <div class="category-card-enhanced" onclick="window.filterByCategory('${category}')">
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
        const category = script.category || 'others';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    const totalScripts = scriptsData.length || 1;
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
    
    const categories = ['all', ...new Set(scriptsData.map(s => s.category || 'others').filter(Boolean))];
    
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
        const count = category === 'all' ? scriptsData.length : scriptsData.filter(s => (s.category || 'others') === category).length;
        html += `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    data-filter="${category}"
                    onclick="window.filterScripts('${category}')">
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
        filtered = scriptsData.filter(script => (script.category || 'others') === category);
    }
    
    displayScripts(filtered);
    const scriptsPage = document.getElementById('scriptsPage');
    if (scriptsPage) {
        scriptsPage.scrollIntoView({ behavior: 'smooth' });
    }
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
        (script.title || '').toLowerCase().includes(query) ||
        (script.description || '').toLowerCase().includes(query) ||
        (script.author || '').toLowerCase().includes(query) ||
        (script.tags || []).some(tag => (tag || '').toLowerCase().includes(query))
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
            if (searchInput) searchInput.value = '';
        });
    }
}

// ==================== DISPLAY SCRIPTS ====================
function displayScripts(scripts) {
    if (!scriptsGrid) return;
    
    if (!scripts || scripts.length === 0) {
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
    
    const myScripts = scriptsData.filter(s => (s.uploader || s.author || '') === currentUser);
    
    const myUploadsCount = document.getElementById('myUploadsCount');
    const myDownloadsCount = document.getElementById('myDownloadsCount');
    const myRatingAvg = document.getElementById('myRatingAvg');
    
    if (myUploadsCount) myUploadsCount.textContent = myScripts.length;
    if (myDownloadsCount) myDownloadsCount.textContent = myScripts.reduce((sum, s) => sum + (s.downloads || 0), 0);
    if (myRatingAvg) {
        const avgRating = myScripts.length ? (myScripts.reduce((sum, s) => sum + (s.rating || 0), 0) / myScripts.length).toFixed(1) : 0;
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
                    <h3 class="script-title">${script.title || 'Untitled'}</h3>
                    <span class="script-category-badge">
                        <i class="fab fa-${getCategoryIcon(script.category)}"></i>
                        ${capitalizeFirst(script.category || 'others')}
                    </span>
                </div>
                <span class="script-badge badge-${script.type || 'gratis'}">
                    ${script.type === 'premium' ? '💰 Premium' : '🎁 Gratis'}
                </span>
            </div>
            <div class="script-body">
                <p class="script-description">${script.description || 'No description'}</p>
                <div class="script-meta">
                    <span><i class="fas fa-user"></i> ${script.author || 'Unknown'}</span>
                    <span><i class="fas fa-code-branch"></i> v${script.version || '1.0.0'}</span>
                    <span><i class="fas fa-download"></i> ${formatNumber(script.downloads || 0)}</span>
                    <span><i class="fas fa-star"></i> ${script.rating || 0}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(script.date) || 'Recently'}</span>
                </div>
                <div class="script-tags">
                    ${(script.tags || ['bot', 'script']).map(tag => `<span class="script-tag">#${tag.trim()}</span>`).join('')}
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
                    <button class="btn-delete" onclick="window.deleteScript(${script.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    <button class="btn-download" onclick="window.downloadScript(${script.id})">
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
        .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
        .slice(0, 3);
    
    trendingPreview.innerHTML = trending.map(script => createScriptCard(script)).join('');
}

function createScriptCard(script) {
    const isOwner = (script.uploader || script.author || '') === currentUser;
    
    return `
        <div class="script-card" data-category="${script.category || 'others'}" data-id="${script.id}">
            <div class="script-header">
                <div class="script-header-left">
                    <h3 class="script-title">${script.title || 'Untitled'}</h3>
                    <span class="script-category-badge">
                        <i class="fab fa-${getCategoryIcon(script.category)}"></i>
                        ${capitalizeFirst(script.category || 'others')}
                    </span>
                </div>
                <span class="script-badge badge-${script.type || 'gratis'}">
                    ${script.type === 'premium' ? '💰 Premium' : '🎁 Gratis'}
                </span>
            </div>
            <div class="script-body">
                <p class="script-description">${script.description || 'No description'}</p>
                <div class="script-meta">
                    <span title="Author"><i class="fas fa-user"></i> ${script.author || 'Unknown'}</span>
                    <span title="Versi"><i class="fas fa-code-branch"></i> v${script.version || '1.0.0'}</span>
                    <span title="Downloads"><i class="fas fa-download"></i> ${formatNumber(script.downloads || 0)}</span>
                    <span title="Rating"><i class="fas fa-star"></i> ${script.rating || 0}</span>
                    <span title="Upload"><i class="fas fa-calendar"></i> ${formatDate(script.date) || 'Recently'}</span>
                </div>
                <div class="script-tags">
                    ${(script.tags || ['bot', 'script']).map(tag => `<span class="script-tag">#${tag.trim()}</span>`).join('')}
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
                        <button class="btn-delete" onclick="window.deleteScript(${script.id})" title="Hapus script">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                    <button class="btn-download" onclick="window.downloadScript(${script.id})">
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
    if (!script) {
        showNotification('❌ Script tidak ditemukan!', 'error');
        return;
    }
    
    if (script.type === 'premium') {
        showNotification('🔒 Script premium - Hubungi author untuk pembelian', 'warning');
        showPremiumModal(script);
    } else {
        script.downloads = (script.downloads || 0) + 1;
        saveToLocalStorage();
        updateAllUI();
        
        showNotification(`📥 Downloading ${script.title}...`, 'success');
        
        const content = `Script: ${script.title || 'Untitled'}
Author: ${script.author || 'Unknown'}
Version: ${script.version || '1.0.0'}
Downloaded from: Gudang Script
Date: ${new Date().toLocaleString()}

=== SCRIPT CONTENT ===
// Ini adalah script dummy untuk demo
// Script asli: ${script.demo || 'No link'}

console.log("Hello from ${script.title || 'Script'}!");
console.log("Thanks for downloading!");

// Fitur-fitur:
${script.description || 'No description'}

// Tags: ${(script.tags || ['bot', 'script']).join(', ')}
`;
        
        try {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = script.fileName || `${(script.title || 'script').toLowerCase().replace(/\s+/g, '-')}.js`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('✅ Download selesai!', 'success');
        } catch (error) {
            console.error('Download error:', error);
            showNotification('❌ Gagal download script!', 'error');
        }
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
                    <h4>${script.title || 'Untitled'}</h4>
                    <p class="premium-author">👤 Author: ${script.author || 'Unknown'}</p>
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
                            <a href="https://wa.me/6283874350954?text=Saya%20tertarik%20dengan%20script%20${encodeURIComponent(script.title || '')}" 
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
    
    if (!script) {
        showNotification('❌ Script tidak ditemukan!', 'error');
        return;
    }
    
    if ((script.uploader || script.author || '') !== currentUser) {
        showNotification('❌ Kamu tidak punya izin untuk menghapus script ini!', 'error');
        return;
    }
    
    if (confirm(`Yakin ingin menghapus script "${script.title || 'Untitled'}"?`)) {
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
    
    if (nextBtns.length) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep < steps.length - 1) {
                    if (validateStep(currentStep)) {
                        if (typeof gsap !== 'undefined') {
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
                        } else {
                            steps[currentStep].classList.remove('active');
                            steps[currentStep + 1].classList.add('active');
                        }
                        
                        if (progressSteps.length) {
                            progressSteps[currentStep].classList.remove('active');
                            progressSteps[currentStep + 1].classList.add('active');
                        }
                        
                        currentStep++;
                    }
                }
            });
        });
    }
    
    if (prevBtns.length) {
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    if (typeof gsap !== 'undefined') {
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
                    } else {
                        steps[currentStep].classList.remove('active');
                        steps[currentStep - 1].classList.add('active');
                    }
                    
                    if (progressSteps.length) {
                        progressSteps[currentStep].classList.remove('active');
                        progressSteps[currentStep - 1].classList.add('active');
                    }
                    
                    currentStep--;
                }
            });
        });
    }
    
    function validateStep(step) {
        if (!steps.length) return true;
        
        const currentStepElement = steps[step];
        if (!currentStepElement) return true;
        
        const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        
        for (let input of inputs) {
            if (!input.value) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(input, {
                        x: [0, -10, 10, -5, 5, 0],
                        duration: 0.5,
                        borderColor: 'var(--danger-color)'
                    });
                }
                showNotification('❌ Harap isi semua field yang wajib!', 'error');
                return false;
            }
        }
        
        if (step === 0) {
            const description = document.getElementById('scriptDescription');
            if (description && description.value.length < 20) {
                showNotification('❌ Deskripsi minimal 20 karakter!', 'error');
                return false;
            }
        }
        
        return true;
    }
}

// ==================== FILE UPLOAD - FIXED VERSION ====================
function initFileUpload() {
    const fileInput = document.getElementById('scriptFile');
    const fileInfo = document.querySelector('.file-info');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeBtn = document.querySelector('.btn-remove-file');
    const uploadArea = document.querySelector('.upload-area');
    
    if (!fileInput) {
        console.error('File input tidak ditemukan!');
        return;
    }
    
    // Event listener untuk file input
    fileInput.addEventListener('change', function(e) {
        handleFileSelect(e);
    });
    
    // Drag and drop support
    if (uploadArea) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Highlight drop area
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('highlight');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('highlight');
            });
        });
        
        // Handle dropped files
        uploadArea.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length) {
                fileInput.files = files;
                handleFileSelect({ target: { files: files } });
            }
        });
        
        // Click on upload area to trigger file input
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            
            // Validasi ukuran file
            if (file.size > 50 * 1024 * 1024) {
                showNotification('❌ Ukuran file maksimal 50MB!', 'error');
                fileInput.value = ''; // Reset file input
                if (fileInfo) fileInfo.classList.remove('visible');
                return;
            }
            
            // Validasi tipe file
            const allowedTypes = [
                'text/javascript',
                'application/javascript',
                'text/plain',
                'application/zip',
                'application/x-zip-compressed',
                'application/json',
                'text/x-python',
                'text/x-java',
                'text/x-csharp',
                'text/x-php',
                'text/html',
                'text/css',
                'application/xml',
                'text/xml'
            ];
            
            const isAllowedType = allowedTypes.includes(file.type) || 
                                file.name.endsWith('.js') || 
                                file.name.endsWith('.py') || 
                                file.name.endsWith('.java') || 
                                file.name.endsWith('.cs') || 
                                file.name.endsWith('.php') || 
                                file.name.endsWith('.html') || 
                                file.name.endsWith('.css') || 
                                file.name.endsWith('.json') || 
                                file.name.endsWith('.xml') || 
                                file.name.endsWith('.zip') ||
                                file.name.endsWith('.rar') ||
                                file.name.endsWith('.7z');
            
            if (!isAllowedType) {
                showNotification('❌ Tipe file tidak didukung!', 'error');
                fileInput.value = ''; // Reset file input
                if (fileInfo) fileInfo.classList.remove('visible');
                return;
            }
            
            // Update UI dengan info file
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = formatFileSize(file.size);
            if (fileInfo) fileInfo.classList.add('visible');
            
            showNotification('✅ File berhasil dipilih!', 'success');
        }
    }
    
    // Remove file button
    if (removeBtn) {
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            fileInput.value = '';
            if (fileInfo) fileInfo.classList.remove('visible');
            if (fileName) fileName.textContent = '';
            if (fileSize) fileSize.textContent = '';
            showNotification('File dihapus', 'info');
        });
    }
}

// ==================== UPLOAD FORM SUBMIT - FIXED VERSION ====================
if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const fileInput = document.getElementById('scriptFile');
        const scriptName = document.getElementById('scriptName');
        const scriptCategory = document.getElementById('scriptCategory');
        const scriptDescription = document.getElementById('scriptDescription');
        const scriptVersion = document.getElementById('scriptVersion');
        const scriptAuthor = document.getElementById('scriptAuthor');
        const scriptTags = document.getElementById('scriptTags');
        const scriptDemo = document.getElementById('scriptDemo');
        const isPremium = document.getElementById('isPremium');
        
        // Validasi semua field yang diperlukan
        if (!fileInput || !scriptName || !scriptCategory || !scriptDescription || !scriptAuthor) {
            showNotification('❌ Form tidak lengkap!', 'error');
            return;
        }
        
        // Validasi file
        const file = fileInput.files[0];
        if (!file) {
            showNotification('❌ Pilih file script terlebih dahulu!', 'error');
            return;
        }
        
        // Validasi ukuran file
        if (file.size > 50 * 1024 * 1024) {
            showNotification('❌ Ukuran file maksimal 50MB!', 'error');
            return;
        }
        
        // Validasi nama script
        if (!scriptName.value.trim()) {
            showNotification('❌ Nama script harus diisi!', 'error');
            scriptName.focus();
            return;
        }
        
        // Validasi kategori
        if (!scriptCategory.value) {
            showNotification('❌ Pilih kategori script!', 'error');
            scriptCategory.focus();
            return;
        }
        
        // Validasi deskripsi
        if (!scriptDescription.value.trim() || scriptDescription.value.length < 20) {
            showNotification('❌ Deskripsi minimal 20 karakter!', 'error');
            scriptDescription.focus();
            return;
        }
        
        // Validasi author
        if (!scriptAuthor.value.trim()) {
            showNotification('❌ Nama author harus diisi!', 'error');
            scriptAuthor.focus();
            return;
        }
        
        // Buat ID baru
        const newId = scriptsData.length > 0 ? Math.max(...scriptsData.map(s => s.id || 0)) + 1 : 1;
        
        // Process tags
        const tagsInput = scriptTags.value || 'bot, script';
        const tags = tagsInput.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
        
        // Buat object script baru
        const newScript = {
            id: newId,
            title: scriptName.value.trim(),
            category: scriptCategory.value,
            type: isPremium && isPremium.checked ? 'premium' : 'gratis',
            description: scriptDescription.value.trim(),
            version: scriptVersion.value.trim() || '1.0.0',
            author: scriptAuthor.value.trim(),
            tags: tags.length > 0 ? tags : ['bot', 'script'],
            demo: scriptDemo ? scriptDemo.value.trim() || '#' : '#',
            downloads: 0,
            rating: 0,
            date: new Date().toISOString().split('T')[0],
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            uploader: currentUser
        };
        
        // Simpan ke localStorage
        try {
            scriptsData.unshift(newScript);
            saveToLocalStorage();
            
            // Reset form
            uploadForm.reset();
            
            // Reset file info
            const fileInfo = document.querySelector('.file-info');
            if (fileInfo) fileInfo.classList.remove('visible');
            
            // Reset file input
            fileInput.value = '';
            
            // Update UI
            updateAllUI();
            
            // Show success message
            showNotification('✅ Script berhasil diupload!', 'success');
            
            // Redirect ke My Uploads
            const targetLink = document.querySelector('[data-page="myuploads"]');
            if (targetLink) {
                targetLink.click();
            }
            
            console.log('Script uploaded successfully:', newScript);
            
        } catch (error) {
            console.error('Error saving script:', error);
            showNotification('❌ Gagal mengupload script!', 'error');
        }
    });
} else {
    console.error('Upload form tidak ditemukan!');
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
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatNumber(num) {
    if (typeof num !== 'number') return '0';
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function formatDate(dateString) {
    if (!dateString) return 'Recently';
    try {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
        return 'Recently';
    }
}

function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    if (!notificationContainer) {
        console.warn('Notification container tidak ditemukan!');
        alert(message);
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-exclamation-circle';
    else if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// ==================== RESET DATA ====================
window.resetData = function() {
    if (confirm('⚠️ Reset semua data? Semua script akan kembali ke data demo!')) {
        try {
            localStorage.removeItem('gudangScripts');
            initData();
            updateAllUI();
            updateWelcomeStats();
            showNotification('Data direset ke demo!', 'warning');
        } catch (error) {
            console.error('Error resetting data:', error);
            showNotification('❌ Gagal reset data!', 'error');
        }
    }
}

// Export functions to global
window.filterByCategory = filterByCategory;
window.filterScripts = filterScripts;
window.downloadScript = downloadScript;
window.deleteScript = deleteScript;
window.resetData = resetData;
