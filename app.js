/**
 * ===== AI TOKEN VISUALIZER - MAIN APPLICATION =====
 * 
 * This is the main application entry point that coordinates between
 * the tokenizer and UI modules. It handles application initialization,
 * global state management, and provides utility functions.
 * 
 * Features:
 * - Text to token encoding with vocabulary lookup
 * - Token to text decoding with sequence visualization
 * - Predefined vocabulary dictionary with search
 * - ASCII fallback for unknown characters
 * - Real-time text analysis and statistics
 * - Copy to clipboard functionality
 * - Responsive neon green dark theme
 * 
 * Author: AI Token Visualizer
 * Version: 1.0.0
 */

class TokenVisualizerApp {
    constructor() {
        this.version = '1.0.0';
        this.initialized = false;
        this.debugMode = false;
        
        // Initialize application when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    /**
     * Initialize the application
     */
    initialize() {
        if (this.initialized) return;

        try {
            this.log('Initializing AI Token Visualizer...');
            
            // Check if required modules are loaded
            this.validateDependencies();
            
            // Initialize application state
            this.initializeState();
            
            // Setup global event handlers
            this.setupGlobalHandlers();
            
            // Load sample data if needed
            this.loadSampleData();
            
            this.initialized = true;
            this.log('Application initialized successfully');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            this.handleError('Failed to initialize application', error);
        }
    }

    /**
     * Validate that required dependencies are loaded
     */
    validateDependencies() {
        const requiredGlobals = ['tokenizer', 'uiManager'];
        const missing = requiredGlobals.filter(dep => !window[dep]);
        
        if (missing.length > 0) {
            throw new Error(`Missing dependencies: ${missing.join(', ')}`);
        }
    }

    /**
     * Initialize application state
     */
    initializeState() {
        this.state = {
            currentText: '',
            currentTokens: [],
            lastEncodingResult: null,
            lastDecodingResult: null,
            vocabularyFilter: '',
            showAsciiRange: false,
            statistics: {
                totalEncodings: 0,
                totalDecodings: 0,
                totalCharactersProcessed: 0,
                totalTokensGenerated: 0
            }
        };
    }

    /**
     * Setup global event handlers
     */
    setupGlobalHandlers() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Handle window resize for responsive design
        window.addEventListener('resize', () => this.handleWindowResize());
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Handle errors globally
        window.addEventListener('error', (e) => this.handleGlobalError(e));
    }

    /**
     * Load sample data for demonstration
     */
    loadSampleData() {
        const sampleTexts = [
            "Hello, world! This is a sample text for tokenization.",
            "The quick brown fox jumps over the lazy dog.",
            "AI tokenization converts text into numerical representations.",
            "Machine learning models process tokens instead of raw text."
        ];
        
        // Store sample texts for quick access
        this.sampleTexts = sampleTexts;
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + Enter: Encode text
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            const encodeBtn = document.getElementById('encode-btn');
            if (encodeBtn && !encodeBtn.disabled) {
                encodeBtn.click();
            }
        }
        
        // Ctrl/Cmd + Shift + Enter: Decode tokens
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            const decodeBtn = document.getElementById('decode-btn');
            if (decodeBtn && !decodeBtn.disabled) {
                decodeBtn.click();
            }
        }
        
        // Escape: Clear current input
        if (event.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
                activeElement.value = '';
                activeElement.dispatchEvent(new Event('input'));
            }
        }
    }

    /**
     * Handle window resize events
     */
    handleWindowResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.log('Window resized, updating layout...');
            // Add any responsive layout updates here
        }, 250);
    }

    /**
     * Handle visibility change (tab switching)
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.log('Application hidden');
        } else {
            this.log('Application visible');
        }
    }

    /**
     * Handle global errors
     * @param {ErrorEvent} event - Error event
     */
    handleGlobalError(event) {
        this.handleError('Global error occurred', event.error);
    }

    /**
     * Show welcome message to users
     */
    showWelcomeMessage() {
        // Only show on first visit
        if (!localStorage.getItem('tokenizer-visited')) {
            setTimeout(() => {
                if (window.uiManager) {
                    uiManager.showToast('Welcome to AI Token Visualizer! Try encoding some text.', 'success');
                }
                localStorage.setItem('tokenizer-visited', 'true');
            }, 1000);
        }
    }

    /**
     * Get application statistics
     * @returns {Object} - Application statistics
     */
    getStatistics() {
        return {
            ...this.state.statistics,
            version: this.version,
            initialized: this.initialized,
            vocabularySize: tokenizer ? tokenizer.vocabulary.size : 0,
            uptime: Date.now() - this.startTime
        };
    }

    /**
     * Load a sample text into the input
     * @param {number} index - Index of sample text to load
     */
    loadSampleText(index = 0) {
        if (index >= 0 && index < this.sampleTexts.length) {
            const inputText = document.getElementById('input-text');
            if (inputText) {
                inputText.value = this.sampleTexts[index];
                inputText.dispatchEvent(new Event('input'));
                
                if (window.uiManager) {
                    uiManager.showToast(`Loaded sample text ${index + 1}`, 'success');
                }
            }
        }
    }

    /**
     * Export current session data
     * @returns {Object} - Session data
     */
    exportSession() {
        return {
            timestamp: new Date().toISOString(),
            version: this.version,
            state: this.state,
            statistics: this.getStatistics()
        };
    }

    /**
     * Enable/disable debug mode
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Log messages (only in debug mode)
     * @param {string} message - Message to log
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            console.log(`[TokenVisualizer] ${message}`, data || '');
        }
    }

    /**
     * Handle and log errors
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    handleError(message, error) {
        console.error(`[TokenVisualizer Error] ${message}:`, error);
        
        if (window.uiManager) {
            uiManager.showToast(`Error: ${message}`, 'error');
        }
    }

    /**
     * Get application version and info
     * @returns {Object} - Application info
     */
    getInfo() {
        return {
            name: 'AI Token Visualizer',
            version: this.version,
            description: 'Interactive tool for understanding AI text tokenization',
            features: [
                'Text to token encoding',
                'Token to text decoding',
                'Vocabulary dictionary viewer',
                'Real-time text visualization',
                'Copy to clipboard functionality',
                'ASCII fallback support'
            ],
            author: 'AI Token Visualizer Team',
            initialized: this.initialized
        };
    }
}

// Initialize the application
const app = new TokenVisualizerApp();

// Expose app instance globally for debugging
window.tokenVisualizerApp = app;

// Add some utility functions to global scope
window.loadSample = (index) => app.loadSampleText(index);
window.exportSession = () => app.exportSession();
window.getAppInfo = () => app.getInfo();
window.enableDebug = () => app.setDebugMode(true);
window.disableDebug = () => app.setDebugMode(false);

// Log initialization
console.log('🤖 AI Token Visualizer loaded successfully!');
console.log('💡 Try these commands in console:');
console.log('   - loadSample(0) - Load sample text');
console.log('   - exportSession() - Export current session');
console.log('   - getAppInfo() - Get application info');
console.log('   - enableDebug() - Enable debug logging');
