// ==================== DATA INITIALIZATION ====================
// Data script - Bisa dikosongkan []
let scriptsData = [];

// Data demo awal (bisa dikomentari/dihapus jika ingin mulai dari kosong)
const initialScripts = [
    {
        id: 1,
        title: "WhatsApp MD Bot by Fatur",
        category: "whatsapp",
        type: "gratis",
        description: "Bot WhatsApp Multi Device dengan fitur lengkap: downloader, sticker, group manage, anti spam, dan 200+ fitur lainnya.",
        author: "Fatur",
        version: "3.2.1",
        downloads: 1534,
        rating: 4.9,
        tags: ["whatsapp", "multi-device", "nodejs", "baileys"],
        demo: "https://github.com/fatur/wabot-md",
        date: "2024-02-15",
        fileName: "wabot-md-v3.2.1.zip",
        fileSize: "3.4 MB",
        uploader: "Fatur"
    },
    {
        id: 2,
        title: "Telegram Group Manager Pro",
        category: "telegram",
        type: "premium",
        description: "Bot Telegram untuk manage grup dengan fitur anti spam, welcome, afk, warn, ban, mute, dan statistik lengkap.",
        author: "Rizki",
        version: "2.0.0",
        downloads: 856,
        rating: 4.7,
        tags: ["telegram", "group-manager", "python", "aiogram"],
        demo: "https://github.com/rizki/tg-manager",
        date: "2024-02-10",
        fileName: "tg-manager-pro.zip",
        fileSize: "1.8 MB",
        uploader: "Rizki"
    },
    {
        id: 3,
        title: "Discord Music Bot",
        category: "discord",
        type: "gratis",
        description: "Bot Discord dengan fitur musik dari YouTube, Spotify, SoundCloud. Support playlist, queue, filter suara.",
        author: "Cindy",
        version: "1.5.0",
        downloads: 2341,
        rating: 4.8,
        tags: ["discord", "music", "youtube", "spotify"],
        demo: "https://github.com/cindy/discord-music",
        date: "2024-02-05",
        fileName: "discord-music-bot.js",
        fileSize: "245 KB",
        uploader: "Cindy"
    },
    {
        id: 4,
        title: "Instagram Story Downloader",
        category: "instagram",
        type: "gratis",
        description: "Bot Instagram untuk download story, post, reel, dan IGTV. Support multiple akun.",
        author: "Budi",
        version: "1.2.0",
        downloads: 567,
        rating: 4.5,
        tags: ["instagram", "downloader", "python"],
        demo: "https://github.com/budi/ig-dl",
        date: "2024-02-01",
        fileName: "ig-downloader.py",
        fileSize: "156 KB",
        uploader: "Budi"
    }
];

// Inisialisasi data dari localStorage atau pake data demo
function initData() {
    const savedScripts = localStorage.getItem('gudangScripts');
    if (savedScripts) {
        scriptsData = JSON.parse(savedScripts);
    } else {
        scriptsData = [...initialScripts]; // Pake data demo kalo belum ada
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
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const uploadForm = document.getElementById('uploadForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ==================== CURRENT USER ====================
// Simulasi user - pake localStorage biar inget user
let currentUser = localStorage.getItem('currentUser') || 'Guest_' + Math.floor(Math.random() * 1000);
localStorage.setItem('currentUser', currentUser);

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateAllUI();
    setupEventListeners();
});

// Update semua UI
function updateAllUI() {
    updateStats();
    updateCategoryGrid();
    updateFilterButtons();
    displayScripts(scriptsData);
    displayMyUploads();
    updateFooterStats();
}

// ==================== STATS UPDATE ====================
function updateStats() {
    const totalScripts = scriptsData.length;
    const totalDownloads = scriptsData.reduce((sum, script) => sum + script.downloads, 0);
    const uniqueContributors = [...new Set(scriptsData.map(s => s.uploader || s.author))].length;
    
    document.getElementById('totalScripts').querySelector('h3').textContent = totalScripts;
    document.getElementById('totalDownloads').querySelector('h3').textContent = formatNumber(totalDownloads);
    document.getElementById('totalContributors').querySelector('h3').textContent = uniqueContributors;
}

// ==================== CATEGORY GRID - AUTO GENERATE ====================
function updateCategoryGrid() {
    // Hitung jumlah script per kategori
    const categoryCount = {};
    scriptsData.forEach(script => {
        categoryCount[script.category] = (categoryCount[script.category] || 0) + 1;
    });
    
    // Icon mapping
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
    
    // Tampilkan semua kategori yang ada scriptnya
    Object.keys(categoryCount).sort().forEach(category => {
        html += `
            <div class="category-card" data-category="${category}" onclick="filterByCategory('${category}')">
                <i class="${categoryIcons[category] || 'fas fa-code'}"></i>
                <h3>${categoryNames[category] || category}</h3>
                <p>${categoryCount[category]} script</p>
            </div>
        `;
    });
    
    // Kalo ga ada script, tampilkan empty state
    if (html === '') {
        html = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-folder-open"></i>
                <h3>Belum Ada Kategori</h3>
                <p>Upload script untuk membuat kategori baru!</p>
                <a href="#upload" class="btn btn-primary">Upload Sekarang</a>
            </div>
        `;
    }
    
    categoryGrid.innerHTML = html;
}

// ==================== FILTER BUTTONS - AUTO GENERATE ====================
function updateFilterButtons() {
    // Ambil unique categories
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

// ==================== DISPLAY SCRIPTS ====================
function displayScripts(scripts) {
    if (scripts.length === 0) {
        scriptsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>Belum Ada Script</h3>
                <p>Jadilah yang pertama upload script bot kamu!</p>
                <a href="#upload" class="btn btn-primary">
                    <i class="fas fa-upload"></i> Upload Script Sekarang
                </a>
            </div>
        `;
        return;
    }
    
    scriptsGrid.innerHTML = scripts.map(script => createScriptCard(script)).join('');
}

// Display My Uploads
function displayMyUploads() {
    const myScripts = scriptsData.filter(s => (s.uploader || s.author) === currentUser);
    
    if (myScripts.length === 0) {
        myUploadsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-cloud-upload-alt"></i>
                <h3>Kamu Belum Upload Script</h3>
                <p>Upload script pertamamu dan dapatkan credits!</p>
                <a href="#upload" class="btn btn-primary">
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
                    <span><i class="fas fa-calendar"></i> ${formatDate(script.date)}</span>
                </div>
                <div class="script-tags">
                    ${script.tags.map(tag => `<span class="script-tag">#${tag.trim()}</span>`).join('')}
                </div>
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

// Create script card
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

// ==================== FILTER & SEARCH ====================
// Filter scripts by category
window.filterScripts = function(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let filtered;
    if (category === 'all') {
        filtered = scriptsData;
    } else {
        filtered = scriptsData.filter(script => script.category === category);
    }
    
    displayScripts(filtered);
    
    // Scroll to scripts section
    document.getElementById('scripts').scrollIntoView({ behavior: 'smooth' });
}

// Filter by category (from category card)
window.filterByCategory = function(category) {
    filterScripts(category);
}

// Search scripts
window.searchScripts = function() {
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

// ==================== DOWNLOAD SCRIPT ====================
window.downloadScript = function(scriptId) {
    const script = scriptsData.find(s => s.id === scriptId);
    if (!script) return;
    
    if (script.type === 'premium') {
        showNotification('🔒 Script premium - Hubungi author untuk pembelian', 'warning');
        
        // Tampilkan modal premium
        showPremiumModal(script);
    } else {
        // Increment download counter
        script.downloads += 1;
        saveToLocalStorage();
        updateAllUI();
        
        // Simulasi download
        showNotification(`📥 Downloading ${script.title}...`, 'success');
        
        // Create dummy content for download
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

// Premium Modal
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
    
    // Cek kepemilikan
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
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil data form
    const fileInput = document.getElementById('scriptFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('❌ Pilih file script terlebih dahulu!', 'error');
        return;
    }
    
    // Validasi ukuran file (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
        showNotification('❌ Ukuran file maksimal 50MB!', 'error');
        return;
    }
    
    // Generate ID baru
    const newId = scriptsData.length > 0 ? Math.max(...scriptsData.map(s => s.id)) + 1 : 1;
    
    // Format tags
    const tagsInput = document.getElementById('scriptTags').value;
    const tags = tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    
    // Buat script baru
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
    
    // Tambah ke array
    scriptsData.unshift(newScript);
    saveToLocalStorage();
    
    // Reset form
    uploadForm.reset();
    
    // Update UI
    updateAllUI();
    
    // Notifikasi sukses
    showNotification('✅ Script berhasil diupload!', 'success');
    
    // Scroll ke my uploads
    document.getElementById('myuploads').scrollIntoView({ behavior: 'smooth' });
});

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
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ==================== RESET DATA ====================
window.resetData = function() {
    if (confirm('⚠️ Reset semua data? Semua script akan kembali ke data demo!')) {
        localStorage.removeItem('gudangScripts');
        initData();
        updateAllUI();
        showNotification('Data direset ke demo!', 'warning');
    }
}

// ==================== FOOTER STATS ====================
function updateFooterStats() {
    document.getElementById('footerTotalScripts').innerHTML = `<i class="fas fa-code"></i> Total Script: ${scriptsData.length}`;
    const totalDownloads = scriptsData.reduce((sum, s) => sum + s.downloads, 0);
    document.getElementById('footerTotalDownloads').innerHTML = `<i class="fas fa-download"></i> Total Download: ${formatNumber(totalDownloads)}`;
    const uniqueUsers = [...new Set(scriptsData.map(s => s.uploader || s.author))].length;
    document.getElementById('footerTotalUsers').innerHTML = `<i class="fas fa-users"></i> Contributors: ${uniqueUsers}`;
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Search
    searchBtn.addEventListener('click', searchScripts);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchScripts();
    });
    
    // Mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Reset data link
    document.getElementById('resetDataLink').addEventListener('click', (e) => {
        e.preventDefault();
        resetData();
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Export functions to global
window.filterByCategory = filterByCategory;
window.downloadScript = downloadScript;
window.deleteScript = deleteScript;
window.resetData = resetData;
