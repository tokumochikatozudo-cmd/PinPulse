// PinPulse Configuration File
// Enhanced configuration for multiple map providers and features

const PinPulseConfig = {
    // Application Settings
    app: {
        name: 'PinPulse',
        version: '2.0.0',
        description: 'Platform Laporan Komunitas Cerdas',
        author: 'PinPulse Team',
        website: 'https://pinpulse.example.com',
        
        // Feature Flags
        features: {
            googleMaps: false,  // Disabled due to API issues
            leafletMaps: true,  // Primary map provider
            mapboxMaps: true,   // Alternative map provider
            userLocation: true,
            notifications: true,
            achievements: true,
            realTimeUpdates: true,
            offlineSupport: false,
            pwaSupport: true
        }
    },

    // Map Configuration
    maps: {
        // Leaflet Configuration (Primary)
        leaflet: {
            enabled: true,
            defaultCenter: [-6.2088, 106.8456], // Jakarta, Indonesia
            defaultZoom: 12,
            minZoom: 3,
            maxZoom: 18,
            
            // Tile Layer Options
            tileLayers: {
                streets: {
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 18
                },
                satellite: {
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    maxZoom: 18
                },
                dark: {
                    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                    attribution: '© OpenStreetMap contributors © CARTO',
                    maxZoom: 19
                },
                light: {
                    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                    attribution: '© OpenStreetMap contributors © CARTO',
                    maxZoom: 19
                },
                terrain: {
                    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
                    maxZoom: 17
                }
            }
        },

        // Mapbox Configuration (Alternative)
        mapbox: {
            enabled: true,
            accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN', // Replace with actual token
            defaultStyle: 'mapbox://styles/mapbox/streets-v11',
            
            // Available Styles
            styles: {
                streets: 'mapbox://styles/mapbox/streets-v11',
                satellite: 'mapbox://styles/mapbox/satellite-v9',
                dark: 'mapbox://styles/mapbox/dark-v10',
                light: 'mapbox://styles/mapbox/light-v10',
                outdoors: 'mapbox://styles/mapbox/outdoors-v11'
            }
        },

        // Google Maps Configuration (Currently Disabled)
        google: {
            enabled: false,
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
            defaultCenter: { lat: -6.2088, lng: 106.8456 },
            defaultZoom: 12,
            
            // Custom Map Styles
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry',
                    stylers: [{ color: '#f5f5f5' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#e9e9e9' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        }
    },

    // Report Types Configuration
    reports: {
        types: {
            emergency: {
                name: 'Darurat',
                icon: '🚨',
                color: '#ef4444',
                priority: 'high',
                description: 'Situasi darurat yang membutuhkan perhatian segera'
            },
            attention: {
                name: 'Perlu Perhatian',
                icon: '⚠️',
                color: '#f59e0b',
                priority: 'medium',
                description: 'Masalah yang perlu diperhatikan dalam waktu dekat'
            },
            positive: {
                name: 'Ide Positif',
                icon: '💡',
                color: '#10b981',
                priority: 'low',
                description: 'Ide atau saran positif untuk perbaikan komunitas'
            }
        },
        
        priorities: {
            low: {
                name: 'Rendah',
                color: '#10b981',
                icon: '🟢'
            },
            medium: {
                name: 'Sedang',
                color: '#f59e0b',
                icon: '🟡'
            },
            high: {
                name: 'Tinggi',
                color: '#ef4444',
                icon: '🔴'
            },
            urgent: {
                name: 'Darurat',
                color: '#dc2626',
                icon: '🚨'
            }
        }
    },

    // Achievement System
    achievements: {
        enabled: true,
        items: [
            {
                id: 'first_report',
                title: 'Pelapor Pertama',
                description: 'Anda telah menambahkan laporan pertama!',
                icon: '📝',
                threshold: 10,
                category: 'reporting'
            },
            {
                id: 'community_helper',
                title: 'Pembantu Komunitas',
                description: 'Skor komunitas Anda mencapai 50!',
                icon: '🤝',
                threshold: 50,
                category: 'community'
            },
            {
                id: 'local_hero',
                title: 'Pahlawan Lokal',
                description: 'Skor komunitas Anda mencapai 100!',
                icon: '🦸',
                threshold: 100,
                category: 'community'
            },
            {
                id: 'super_reporter',
                title: 'Super Reporter',
                description: 'Skor komunitas Anda mencapai 200!',
                icon: '⭐',
                threshold: 200,
                category: 'reporting'
            },
            {
                id: 'map_explorer',
                title: 'Penjelajah Peta',
                description: 'Anda telah menjelajahi berbagai area di peta!',
                icon: '🗺️',
                threshold: 150,
                category: 'exploration'
            },
            {
                id: 'community_leader',
                title: 'Pemimpin Komunitas',
                description: 'Anda adalah kontributor aktif dalam komunitas!',
                icon: '👑',
                threshold: 300,
                category: 'leadership'
            }
        ]
    },

    // Notification System
    notifications: {
        enabled: true,
        duration: 3000,
        position: 'top-right',
        
        types: {
            success: {
                icon: '✅',
                color: '#10b981',
                sound: false
            },
            error: {
                icon: '❌',
                color: '#ef4444',
                sound: false
            },
            warning: {
                icon: '⚠️',
                color: '#f59e0b',
                sound: false
            },
            info: {
                icon: 'ℹ️',
                color: '#3b82f6',
                sound: false
            }
        }
    },

    // Real-time Updates
    realtime: {
        enabled: true,
        interval: 30000, // 30 seconds
        
        // WebSocket Configuration (for future implementation)
        websocket: {
            enabled: false,
            url: 'wss://api.pinpulse.example.com/ws',
            reconnectInterval: 5000,
            maxReconnectAttempts: 10
        },
        
        // Polling Configuration
        polling: {
            enabled: true,
            interval: 30000,
            endpoint: '/api/reports/updates'
        }
    },

    // Performance Settings
    performance: {
        // Lazy Loading
        lazyLoad: {
            enabled: true,
            threshold: 100,
            rootMargin: '50px'
        },
        
        // Caching
        cache: {
            enabled: true,
            duration: 300000, // 5 minutes
            maxSize: 50 // Maximum cached items
        },
        
        // Image Optimization
        images: {
            enabled: true,
            quality: 80,
            format: 'webp',
            fallbackFormat: 'jpeg'
        }
    },

    // Accessibility Settings
    accessibility: {
        // Reduced Motion
        reducedMotion: {
            enabled: true,
            respectUserPreference: true
        },
        
        // High Contrast
        highContrast: {
            enabled: true,
            respectUserPreference: true
        },
        
        // Screen Reader Support
        screenReader: {
            enabled: true,
            announcements: true
        },
        
        // Keyboard Navigation
        keyboard: {
            enabled: true,
            shortcuts: true
        }
    },

    // Localization Settings
    localization: {
        defaultLanguage: 'id',
        supportedLanguages: ['id', 'en'],
        
        // Date/Time Format
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        timezone: 'Asia/Jakarta',
        
        // Number Format
        currency: 'IDR',
        decimalSeparator: ',',
        thousandSeparator: '.'
    },

    // Security Settings
    security: {
        // Content Security Policy
        csp: {
            enabled: true,
            policy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.mapbox.com https://events.mapbox.com; frame-src 'self' https://www.google.com;"
        },
        
        // API Security
        api: {
            timeout: 10000,
            retries: 3,
            rateLimit: {
                enabled: true,
                requests: 100,
                window: 60000 // 1 minute
            }
        }
    },

    // Error Handling
    errorHandling: {
        // Error Reporting
        reporting: {
            enabled: true,
            endpoint: '/api/errors/report',
            includeStackTrace: true
        },
        
        // Fallback Mechanisms
        fallback: {
            enabled: true,
            showUserFriendlyMessages: true,
            retryAttempts: 3
        }
    },

    // Development Settings
    development: {
        // Debug Mode
        debug: {
            enabled: false,
            verbose: false,
            showPerformanceMetrics: false
        },
        
        // Mock Data
        mockData: {
            enabled: true,
            generateReports: true,
            generateUsers: true
        },
        
        // Hot Reload
        hotReload: {
            enabled: false,
            port: 35729
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PinPulseConfig;
}

// Make configuration globally available
if (typeof window !== 'undefined') {
    window.PinPulseConfig = PinPulseConfig;
}