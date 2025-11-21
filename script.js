// PinPulse - Smart Community Reporting Platform
// Enhanced JavaScript with Multiple Map Providers

class PinPulse {
    constructor() {
        this.map = null;
        this.leafletMap = null;
        this.mapboxMap = null;
        this.currentMapProvider = 'leaflet'; // Default to Leaflet (more reliable)
        this.markers = [];
        this.reports = [];
        this.userScore = 0;
        this.achievements = [];
        this.mapClusters = null;
        this.userLocation = null;
        this.clickLocation = null;
        
        // Initialize the application
        this.init();
    }

    init() {
        this.loadUserData();
        this.initializeEventListeners();
        this.initializeAnimations();
        this.loadSampleData();
        this.updateStats();
        this.initParticles();
        this.initializeMap();
        this.startPeriodicUpdates();
    }

    // Initialize map with enhanced features
    initializeMap() {
        this.showMapLoading();
        
        // Try to initialize with Leaflet first (more reliable)
        try {
            this.initializeLeafletMap();
        } catch (error) {
            console.error('Leaflet initialization failed:', error);
            this.showMapError();
        }
    }

    // Initialize Leaflet Map with custom styling
    initializeLeafletMap() {
        // Default center on Jakarta, Indonesia
        const defaultCenter = [-6.2088, 106.8456];
        
        this.leafletMap = L.map('map', {
            center: defaultCenter,
            zoom: 12,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true,
            dragging: true,
            touchZoom: true
        });

        // Add custom tile layers
        this.addLeafletTileLayers();
        
        // Add custom controls
        this.addLeafletControls();
        
        // Add event listeners
        this.leafletMap.on('click', (e) => {
            this.handleMapClick(e);
        });

        this.leafletMap.on('locationfound', (e) => {
            this.handleLocationFound(e);
        });

        this.leafletMap.on('locationerror', (e) => {
            this.handleLocationError(e);
        });

        // Load markers
        this.loadLeafletMarkers();
        
        // Hide loading state
        this.hideMapLoading();
        
        // Update map status
        this.updateMapStatus('Leaflet Map berhasil dimuat!');
    }

    // Add multiple tile layer options for Leaflet
    addLeafletTileLayers() {
        const tileLayers = {
            streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
                tileSize: 512,
                zoomOffset: -1
            }),
            
            satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                maxZoom: 18
            }),
            
            dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors © CARTO',
                subdomains: 'abcd',
                maxZoom: 19
            }),
            
            light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors © CARTO',
                subdomains: 'abcd',
                maxZoom: 19
            })
        };

        // Add default layer
        tileLayers.streets.addTo(this.leafletMap);
        
        // Store layers for later use
        this.leafletTileLayers = tileLayers;
    }

    // Add custom controls to Leaflet map
    addLeafletControls() {
        // Custom locate control
        const locateControl = L.control({ position: 'topleft' });
        locateControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            div.innerHTML = '<button class="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md text-sm font-medium text-gray-700 border border-gray-300">📍</button>';
            div.onclick = () => this.locateUser();
            return div;
        };
        locateControl.addTo(this.leafletMap);

        // Custom add report control
        const addControl = L.control({ position: 'topright' });
        addControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            div.innerHTML = '<button class="bg-green-600 hover:bg-green-700 p-2 rounded-lg shadow-md text-sm font-medium text-white">➕</button>';
            div.onclick = () => this.showReportModal();
            return div;
        };
        addControl.addTo(this.leafletMap);
    }

    // Load markers for Leaflet map
    loadLeafletMarkers() {
        // Clear existing markers
        if (this.markerCluster) {
            this.leafletMap.removeLayer(this.markerCluster);
        }

        // Create marker cluster group
        this.markerCluster = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50
        });

        this.reports.forEach((report, index) => {
            const marker = this.createLeafletMarker(report, index);
            this.markerCluster.addLayer(marker);
        });

        this.leafletMap.addLayer(this.markerCluster);
    }

    // Create individual Leaflet marker
    createLeafletMarker(report, index) {
        const icon = this.getMarkerIcon(report.type);
        const marker = L.marker([report.lat, report.lng], { icon });
        
        const popupContent = this.createPopupContent(report, index);
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
            this.highlightReport(index);
        });

        return marker;
    }

    // Get custom marker icon based on report type
    getMarkerIcon(type) {
        const colors = {
            emergency: '#ef4444',
            attention: '#f59e0b',
            positive: '#10b981'
        };

        const icons = {
            emergency: '🚨',
            attention: '⚠️',
            positive: '💡'
        };

        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${colors[type]}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${icons[type]}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    }

    // Create popup content for markers
    createPopupContent(report, index) {
        const priorityColors = {
            low: 'text-green-600',
            medium: 'text-yellow-600',
            high: 'text-red-600',
            urgent: 'text-red-800 font-bold'
        };

        return `
            <div class="p-3 min-w-64">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="text-lg">${this.getTypeIcon(report.type)}</span>
                    <h3 class="font-bold text-gray-800">${report.title}</h3>
                </div>
                <p class="text-gray-600 text-sm mb-2">${report.description}</p>
                <div class="flex items-center justify-between text-xs">
                    <span class="${priorityColors[report.priority]}">Prioritas: ${report.priority}</span>
                    <span class="text-gray-500">${this.formatTime(report.timestamp)}</span>
                </div>
                <div class="mt-3 flex space-x-2">
                    <button onclick="pinPulse.upvoteReport(${index})" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                        👍 ${report.upvotes || 0}
                    </button>
                    <button onclick="pinPulse.focusOnReport(${index})" class="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600">
                        🎯 Fokus
                    </button>
                </div>
            </div>
        `;
    }

    // Handle map click events
    handleMapClick(e) {
        this.clickLocation = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
        this.showReportModal();
    }

    // Show report modal
    showReportModal() {
        const modal = document.getElementById('reportModal');
        modal.classList.remove('hidden');
        
        // Animate modal appearance
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    // Hide report modal
    hideReportModal() {
        const modal = document.getElementById('reportModal');
        
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInBack',
            complete: () => {
                modal.classList.add('hidden');
                this.resetReportForm();
            }
        });
    }

    // Submit report form
    submitReportForm(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('reportType').value,
            title: document.getElementById('reportTitle').value,
            description: document.getElementById('reportDescription').value,
            priority: document.getElementById('reportPriority').value,
            lat: this.clickLocation?.lat || -6.2088,
            lng: this.clickLocation?.lng || 106.8456,
            timestamp: new Date(),
            upvotes: 0,
            id: Date.now()
        };

        if (!formData.title.trim()) {
            alert('Judul laporan tidak boleh kosong!');
            return;
        }

        // Add report to the list
        this.reports.unshift(formData);
        
        // Update map markers
        this.loadLeafletMarkers();
        
        // Update stats
        this.updateStats();
        
        // Update reports list
        this.updateReportsList();
        
        // Hide modal
        this.hideReportModal();
        
        // Show success notification
        this.showNotification('Laporan berhasil ditambahkan! 🎉', 'success');
        
        // Add user score
        this.addUserScore(10);
        
        // Clear click location
        this.clickLocation = null;
    }

    // Locate user
    locateUser() {
        this.showNotification('Mencari lokasi Anda... 📍', 'info');
        this.leafletMap.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true,
            timeout: 10000
        });
    }

    // Handle location found
    handleLocationFound(e) {
        this.userLocation = e.latlng;
        
        // Add user location marker
        const userMarker = L.marker(e.latlng, {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: '<div style="background-color: #3b82f6; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">👤</div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(this.leafletMap);
        
        userMarker.bindPopup('Lokasi Anda Saat Ini');
        
        this.showNotification('Lokasi ditemukan! 🎯', 'success');
    }

    // Handle location error
    handleLocationError(e) {
        this.showNotification('Gagal mendapatkan lokasi. Pastikan GPS aktif. 🗺️', 'error');
    }

    // Focus on specific report
    focusOnReport(index) {
        const report = this.reports[index];
        if (report) {
            this.leafletMap.setView([report.lat, report.lng], 16);
            this.showNotification(`Fokus pada laporan: ${report.title} 🎯`, 'info');
        }
    }

    // Upvote report
    upvoteReport(index) {
        if (this.reports[index]) {
            this.reports[index].upvotes = (this.reports[index].upvotes || 0) + 1;
            this.loadLeafletMarkers();
            this.updateReportsList();
            this.addUserScore(1);
            this.showNotification('Terima kasih atas dukungannya! 👍', 'success');
        }
    }

    // Show map loading state
    showMapLoading() {
        document.getElementById('mapLoading').classList.remove('hidden');
        document.getElementById('mapError').classList.add('hidden');
    }

    // Hide map loading state
    hideMapLoading() {
        document.getElementById('mapLoading').classList.add('hidden');
    }

    // Show map error state
    showMapError() {
        document.getElementById('mapLoading').classList.add('hidden');
        document.getElementById('mapError').classList.remove('hidden');
    }

    // Update map status
    updateMapStatus(message) {
        console.log(`Map Status: ${message}`);
        // You can add a status indicator in the UI if needed
    }

    // Get type icon
    getTypeIcon(type) {
        const icons = {
            emergency: '🚨',
            attention: '⚠️',
            positive: '💡'
        };
        return icons[type] || '📍';
    }

    // Format time
    formatTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit yang lalu`;
        if (hours < 24) return `${hours} jam yang lalu`;
        return `${days} hari yang lalu`;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 p-4 rounded-2xl shadow-xl z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add user score
    addUserScore(points) {
        this.userScore += points;
        document.getElementById('communityScore').textContent = this.userScore;
        
        // Check for achievements
        this.checkAchievements();
    }

    // Check achievements
    checkAchievements() {
        const achievements = [
            { id: 'first_report', threshold: 10, title: 'Pelapor Pertama', description: 'Anda telah menambahkan laporan pertama!' },
            { id: 'community_helper', threshold: 50, title: 'Pembantu Komunitas', description: 'Skor komunitas Anda mencapai 50!' },
            { id: 'local_hero', threshold: 100, title: 'Pahlawan Lokal', description: 'Skor komunitas Anda mencapai 100!' },
            { id: 'super_reporter', threshold: 200, title: 'Super Reporter', description: 'Skor komunitas Anda mencapai 200!' }
        ];

        achievements.forEach(achievement => {
            if (this.userScore >= achievement.threshold && !this.achievements.includes(achievement.id)) {
                this.achievements.push(achievement.id);
                this.showAchievement(achievement);
            }
        });
    }

    // Show achievement
    showAchievement(achievement) {
        const notification = document.getElementById('achievementNotification');
        document.getElementById('achievementText').textContent = achievement.description;
        
        notification.classList.remove('translate-x-full');
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
        }, 4000);
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Report form
        document.getElementById('reportForm').addEventListener('submit', (e) => this.submitReportForm(e));
        document.getElementById('closeModal').addEventListener('click', () => this.hideReportModal());
        document.getElementById('cancelReport').addEventListener('click', () => this.hideReportModal());

        // Map controls
        document.getElementById('locateBtn').addEventListener('click', () => this.locateUser());
        document.getElementById('addReportBtn').addEventListener('click', () => this.showReportModal());
        document.getElementById('retryMapBtn').addEventListener('click', () => this.initializeMap());

        // Map style selector
        document.getElementById('mapStyleSelect').addEventListener('change', (e) => {
            this.changeMapStyle(e.target.value);
        });

        // Surprise button
        document.getElementById('surpriseBtn').addEventListener('click', () => this.triggerSurprise());

        // Modal backdrop click
        document.getElementById('reportModal').addEventListener('click', (e) => {
            if (e.target.id === 'reportModal') {
                this.hideReportModal();
            }
        });
    }

    // Change map style
    changeMapStyle(style) {
        if (this.leafletTileLayers && this.leafletTileLayers[style]) {
            this.leafletMap.eachLayer((layer) => {
                if (layer instanceof L.TileLayer) {
                    this.leafletMap.removeLayer(layer);
                }
            });
            
            this.leafletTileLayers[style].addTo(this.leafletMap);
            this.showNotification(`Gaya peta diubah ke: ${style} 🎨`, 'info');
        }
    }

    // Reset report form
    resetReportForm() {
        document.getElementById('reportForm').reset();
        this.clickLocation = null;
    }

    // Load sample data
    loadSampleData() {
        const sampleReports = [
            {
                id: 1,
                type: 'emergency',
                title: 'Lampu Jalan Mati di Jalan Sudirman',
                description: 'Beberapa lampu jalan di sepanjang Jalan Sudirman mati sejak kemarin, mengganggu keamanan warga saat malam hari.',
                priority: 'high',
                lat: -6.2088,
                lng: 106.8456,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                upvotes: 15
            },
            {
                id: 2,
                type: 'attention',
                title: 'Taman Bermain Anak Perlu Perbaikan',
                description: 'Beberapa peralatan di taman bermain anak di RW 05 perlu perbaikan untuk keamanan anak-anak.',
                priority: 'medium',
                lat: -6.2150,
                lng: 106.8500,
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
                upvotes: 8
            },
            {
                id: 3,
                type: 'positive',
                title: 'Usaha Kerja Bakti Bersih-bersih Lingkungan',
                description: 'Mengajak warga untuk berpartisipasi dalam kerja bakti membersihkan lingkungan setiap Minggu pagi.',
                priority: 'low',
                lat: -6.2020,
                lng: 106.8400,
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                upvotes: 23
            },
            {
                id: 4,
                type: 'emergency',
                title: 'Saluran Air Tersumbat di Depan Rumah',
                description: 'Saluran air di depan rumah nomor 15 tersumbat menyebabkan genangan saat hujan.',
                priority: 'urgent',
                lat: -6.2100,
                lng: 106.8480,
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                upvotes: 12
            },
            {
                id: 5,
                type: 'attention',
                title: 'Pengadaan Tempat Sampah Baru',
                description: 'Perlu ditambahkan tempat sampah di beberapa titik strategis untuk menjaga kebersihan lingkungan.',
                priority: 'medium',
                lat: -6.2050,
                lng: 106.8420,
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                upvotes: 6
            }
        ];

        this.reports = sampleReports;
    }

    // Update statistics
    updateStats() {
        const totalReports = this.reports.length;
        const emergencyCount = this.reports.filter(r => r.type === 'emergency').length;
        const attentionCount = this.reports.filter(r => r.type === 'attention').length;
        const positiveCount = this.reports.filter(r => r.type === 'positive').length;

        // Animate counter updates
        this.animateCounter('totalReports', totalReports);
        this.animateCounter('emergencyCount', emergencyCount);
        this.animateCounter('attentionCount', attentionCount);
        this.animateCounter('positiveCount', positiveCount);

        // Update reports list
        this.updateReportsList();
    }

    // Animate counter
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        
        anime({
            targets: { value: currentValue },
            value: targetValue,
            duration: 1000,
            easing: 'easeOutQuart',
            update: function(anim) {
                element.textContent = Math.round(anim.animatables[0].target.value);
            }
        });
    }

    // Update reports list
    updateReportsList() {
        const container = document.getElementById('reportsList');
        container.innerHTML = '';

        this.reports.slice(0, 5).forEach((report, index) => {
            const reportElement = this.createReportElement(report, index);
            container.appendChild(reportElement);
        });

        // Add click animations to report cards
        const reportCards = container.querySelectorAll('.report-card');
        reportCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.focusOnReport(index);
            });
        });
    }

    // Create report element
    createReportElement(report, index) {
        const div = document.createElement('div');
        div.className = 'report-card bg-white/50 rounded-2xl p-4 shadow-lg border border-white/30 cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl';
        
        const priorityColors = {
            low: 'text-green-600 bg-green-100',
            medium: 'text-yellow-600 bg-yellow-100',
            high: 'text-red-600 bg-red-100',
            urgent: 'text-red-800 bg-red-200 font-bold'
        };

        div.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <span class="text-2xl">${this.getTypeIcon(report.type)}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-800 truncate">${report.title}</h3>
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${priorityColors[report.priority]}">
                            ${report.priority}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${report.description}</p>
                    <div class="flex items-center justify-between text-xs text-gray-500">
                        <span>${this.formatTime(report.timestamp)}</span>
                        <div class="flex items-center space-x-3">
                            <span>👍 ${report.upvotes || 0}</span>
                            <button onclick="pinPulse.upvoteReport(${index}); event.stopPropagation();" class="text-blue-600 hover:text-blue-800 font-medium">
                                Dukung
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return div;
    }

    // Initialize animations
    initializeAnimations() {
        // Animate stats cards on load
        anime({
            targets: '.stat-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuart'
        });

        // Animate map section
        anime({
            targets: '#map',
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuart'
        });

        // Animate header
        anime({
            targets: 'header',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutQuart'
        });
    }

    // Initialize particles
    initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        // Animate particles
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Trigger surprise animation
    triggerSurprise() {
        const button = document.getElementById('surpriseBtn');
        
        // Animate button
        anime({
            targets: button,
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            duration: 600,
            easing: 'easeOutBack'
        });

        // Create floating emojis
        this.createFloatingEmojis();

        // Add random score
        const randomScore = Math.floor(Math.random() * 20) + 5;
        this.addUserScore(randomScore);
        
        this.showNotification(`Kejutan! Anda mendapat ${randomScore} poin! 🎉`, 'success');
    }

    // Create floating emojis
    createFloatingEmojis() {
        const emojis = ['🎉', '✨', '🎊', '💫', '🌟', '🎈'];
        const container = document.body;

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.position = 'fixed';
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = window.innerHeight + 'px';
                emoji.style.fontSize = '24px';
                emoji.style.pointerEvents = 'none';
                emoji.style.zIndex = '1000';

                container.appendChild(emoji);

                anime({
                    targets: emoji,
                    translateY: -window.innerHeight - 100,
                    translateX: (Math.random() - 0.5) * 200,
                    opacity: [1, 0],
                    duration: 3000,
                    easing: 'easeOutQuart',
                    complete: () => {
                        container.removeChild(emoji);
                    }
                });
            }, i * 100);
        }
    }

    // Start periodic updates
    startPeriodicUpdates() {
        // Update every 30 seconds
        setInterval(() => {
            // Simulate real-time updates
            this.updateStats();
        }, 30000);

        // Add random reports occasionally
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.addRandomReport();
            }
        }, 60000);
    }

    // Add random report (for demo purposes)
    addRandomReport() {
        const types = ['emergency', 'attention', 'positive'];
        const priorities = ['low', 'medium', 'high', 'urgent'];
        const sampleTitles = [
            'Trotoar Rusak Perlu Perbaikan',
            'Pengadaan Lampu Jalan LED',
            'Pembersihan Saluran Air',
            'Perbaikan Jalan Berlubang',
            'Pemasangan Speed Bump'
        ];

        const randomReport = {
            id: Date.now(),
            type: types[Math.floor(Math.random() * types.length)],
            title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
            description: 'Laporan otomatis dari sistem monitoring komunitas.',
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            lat: -6.2088 + (Math.random() - 0.5) * 0.02,
            lng: 106.8456 + (Math.random() - 0.5) * 0.02,
            timestamp: new Date(),
            upvotes: Math.floor(Math.random() * 10)
        };

        this.reports.unshift(randomReport);
        this.loadLeafletMarkers();
        this.updateStats();
        this.updateReportsList();
    }

    // Load user data
    loadUserData() {
        // Simulate loading user data from localStorage or API
        const savedScore = localStorage.getItem('pinpulse_user_score');
        const savedAchievements = localStorage.getItem('pinpulse_achievements');
        
        if (savedScore) {
            this.userScore = parseInt(savedScore);
        }
        
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }
        
        // Update UI
        document.getElementById('communityScore').textContent = this.userScore;
    }

    // Save user data
    saveUserData() {
        localStorage.setItem('pinpulse_user_score', this.userScore.toString());
        localStorage.setItem('pinpulse_achievements', JSON.stringify(this.achievements));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pinPulse = new PinPulse();
});

// Save user data before page unload
window.addEventListener('beforeunload', () => {
    if (window.pinPulse) {
        window.pinPulse.saveUserData();
    }
});