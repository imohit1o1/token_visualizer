/**
 * ===== AI TOKEN VISUALIZER - UI MODULE =====
 * 
 * This module handles all user interface interactions including:
 * - DOM element management
 * - Event listeners
 * - Display formatting
 * - Copy to clipboard functionality
 * - Toast notifications
 * 
 * Author: AI Token Visualizer
 * Version: 1.0.0
 */

class UIManager {
    constructor() {
        this.elements = {};
        this.initializeElements();
        this.attachEventListeners();
        this.initializeVocabularyDisplay();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Text to Token elements
        this.elements.inputText = document.getElementById('input-text');
        this.elements.encodeBtn = document.getElementById('encode-btn');
        this.elements.clearBtn = document.getElementById('clear-btn');
        this.elements.encodingSequence = document.getElementById('encoding-sequence');
        this.elements.encodingResult = document.getElementById('encoding-result');

        // Token to Text elements
        this.elements.inputTokens = document.getElementById('input-tokens');
        this.elements.decodeBtn = document.getElementById('decode-btn');
        this.elements.clearDecodeBtn = document.getElementById('clear-decode-btn');
        this.elements.decodingSequence = document.getElementById('decoding-sequence');
        this.elements.decodingResult = document.getElementById('decoding-result');

        // Vocabulary elements
        this.elements.vocabSearch = document.getElementById('vocab-search');
        this.elements.showAsciiBtn = document.getElementById('show-ascii-btn');
        this.elements.vocabDisplay = document.getElementById('vocab-display');

        // Visualization elements
        this.elements.charCount = document.getElementById('char-count');
        this.elements.tokenCount = document.getElementById('token-count');
        this.elements.compressionRatio = document.getElementById('compression-ratio');
        this.elements.tokenVisualization = document.getElementById('token-visualization');
        this.elements.visualizationStats = document.getElementById('visualization-stats');

        // Toast notification
        this.elements.toast = document.getElementById('toast');

        // Copy buttons
        this.elements.copyButtons = document.querySelectorAll('.copy-btn');
    }

    /**
     * Attach event listeners to UI elements
     */
    attachEventListeners() {
        // Text to Token encoding
        this.elements.encodeBtn.addEventListener('click', () => this.handleTextEncoding());
        this.elements.clearBtn.addEventListener('click', () => this.handleClearAll());
        this.elements.inputText.addEventListener('input', () => this.handleTextInput());

        // Token to Text decoding
        this.elements.decodeBtn.addEventListener('click', () => this.handleTokenDecoding());
        this.elements.clearDecodeBtn.addEventListener('click', () => this.handleClearDecoding());

        // Vocabulary search and ASCII toggle
        this.elements.vocabSearch.addEventListener('input', () => this.handleVocabularySearch());
        this.elements.showAsciiBtn.addEventListener('click', () => this.handleAsciiToggle());

        // Copy to clipboard functionality
        this.elements.copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCopyToClipboard(e));
        });

        // Real-time text analysis
        this.elements.inputText.addEventListener('input', () => this.updateVisualization());

        // Tab navigation
        this.initializeTabNavigation();
    }

    /**
     * Handle text encoding process
     */
    handleTextEncoding() {
        const text = this.elements.inputText.value.trim();
        if (!text) {
            this.showToast('Please enter some text to encode', 'warning');
            return;
        }

        // Show loading state
        this.elements.encodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encoding...';
        this.elements.encodeBtn.disabled = true;

        // Simulate processing delay for better UX
        setTimeout(() => {
            const result = tokenizer.encodeText(text);
            this.displayEncodingResult(result);
            this.updateVisualization();

            // Reset button
            this.elements.encodeBtn.innerHTML = '<i class="fas fa-cogs"></i> Encode Text';
            this.elements.encodeBtn.disabled = false;
        }, 300);
    }

    /**
     * Handle token decoding process
     */
    handleTokenDecoding() {
        const tokenInput = this.elements.inputTokens.value.trim();
        if (!tokenInput) {
            this.showToast('Please enter tokens to decode', 'warning');
            return;
        }

        try {
            // Parse comma-separated tokens
            const tokens = tokenInput.split(',').map(t => {
                const num = parseInt(t.trim());
                if (isNaN(num)) throw new Error(`Invalid token: ${t.trim()}`);
                return num;
            });

            // Show loading state
            this.elements.decodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Decoding...';
            this.elements.decodeBtn.disabled = true;

            setTimeout(() => {
                const result = tokenizer.decodeTokens(tokens);
                this.displayDecodingResult(result);

                // Reset button
                this.elements.decodeBtn.innerHTML = '<i class="fas fa-magic"></i> Decode Tokens';
                this.elements.decodeBtn.disabled = false;
            }, 300);

        } catch (error) {
            this.showToast(`Error: ${error.message}`, 'error');
        }
    }

    /**
     * Handle clear/reset functionality
     */
    handleClearAll() {
        // Clear input field
        this.elements.inputText.value = '';

        // Clear encoding results
        this.elements.encodingSequence.innerHTML = '';
        this.elements.encodingResult.innerHTML = '';

        // Reset visualization
        this.elements.charCount.textContent = '0';
        this.elements.tokenCount.textContent = '0';
        this.elements.compressionRatio.textContent = '0%';
        this.elements.tokenVisualization.innerHTML = '';

        // Show success message
        this.showToast('All fields cleared successfully', 'success');

        // Focus back to input
        this.elements.inputText.focus();
    }

    /**
     * Handle clear/reset functionality for decoding section
     */
    handleClearDecoding() {
        // Clear input field
        this.elements.inputTokens.value = '';

        // Clear decoding results
        this.elements.decodingSequence.innerHTML = '';
        this.elements.decodingResult.innerHTML = '';

        // Show success message
        this.showToast('Decoding fields cleared successfully', 'success');

        // Focus back to input
        this.elements.inputTokens.focus();
    }

    /**
     * Handle real-time text input for visualization
     */
    handleTextInput() {
        this.updateVisualization();
    }

    /**
     * Handle vocabulary search
     */
    handleVocabularySearch() {
        const searchTerm = this.elements.vocabSearch.value;
        const showAscii = this.elements.showAsciiBtn.classList.contains('active');
        this.displayVocabulary(searchTerm, showAscii);
    }

    /**
     * Handle ASCII range toggle
     */
    handleAsciiToggle() {
        this.elements.showAsciiBtn.classList.toggle('active');
        const isActive = this.elements.showAsciiBtn.classList.contains('active');
        
        this.elements.showAsciiBtn.innerHTML = isActive ? 
            '<i class="fas fa-eye-slash"></i> Hide ASCII Range' : 
            '<i class="fas fa-eye"></i> Show ASCII Range';

        const searchTerm = this.elements.vocabSearch.value;
        this.displayVocabulary(searchTerm, isActive);
    }

    /**
     * Display encoding results with sequence visualization
     * @param {Object} result - Encoding result from tokenizer
     */
    displayEncodingResult(result) {
        // Display encoding sequence
        let sequenceHTML = '<div class="sequence-steps">';
        result.steps.forEach(step => {
            sequenceHTML += `
                <div class="sequence-step">
                    <span class="step-number">Step ${step.step}:</span>
                    <span class="step-input">"${step.input}"</span>
                    <span class="step-arrow">→</span>
                    <span class="step-process">${step.process}</span>
                    <span class="step-arrow">→</span>
                    <span class="step-output">[${Array.isArray(step.output) ? step.output.join(', ') : step.output}]</span>
                </div>
            `;
        });
        sequenceHTML += '</div>';
        this.elements.encodingSequence.innerHTML = sequenceHTML;

        // Display token result
        this.elements.encodingResult.textContent = `[${result.tokens.join(', ')}]`;
    }

    /**
     * Display decoding results with sequence visualization
     * @param {Object} result - Decoding result from tokenizer
     */
    displayDecodingResult(result) {
        // Display decoding sequence
        let sequenceHTML = '<div class="sequence-steps">';
        result.steps.forEach(step => {
            sequenceHTML += `
                <div class="sequence-step">
                    <span class="step-number">Step ${step.step}:</span>
                    <span class="step-input">[${step.input}]</span>
                    <span class="step-arrow">→</span>
                    <span class="step-process">${step.process}</span>
                    <span class="step-arrow">→</span>
                    <span class="step-output">"${step.output}"</span>
                </div>
            `;
        });
        sequenceHTML += '</div>';
        this.elements.decodingSequence.innerHTML = sequenceHTML;

        // Display text result
        this.elements.decodingResult.textContent = result.text;
    }

    /**
     * Initialize and display vocabulary
     */
    initializeVocabularyDisplay() {
        this.displayVocabulary('', false);
    }

    /**
     * Display vocabulary dictionary
     * @param {string} searchTerm - Search filter
     * @param {boolean} includeAscii - Whether to show ASCII range
     */
    displayVocabulary(searchTerm = '', includeAscii = false) {
        const vocab = tokenizer.getVocabulary(searchTerm, includeAscii);
        
        if (vocab.length === 0) {
            this.elements.vocabDisplay.innerHTML = '<div class="no-results">No vocabulary entries found</div>';
            return;
        }

        let vocabHTML = '';
        vocab.forEach(entry => {
            const displayChar = entry.character === ' ' ? '&nbsp;' : 
                               entry.character === '\n' ? '\\n' :
                               entry.character === '\t' ? '\\t' :
                               this.escapeHtml(entry.character);
            
            const typeClass = entry.type === 'ascii' ? 'ascii-entry' : 'vocab-entry';
            
            vocabHTML += `
                <div class="vocab-item ${typeClass}">
                    <span class="vocab-char">${displayChar}</span>
                    <span class="vocab-code">${entry.token}</span>
                </div>
            `;
        });

        this.elements.vocabDisplay.innerHTML = vocabHTML;
    }

    /**
     * Update text visualization and statistics
     */
    updateVisualization() {
        const text = this.elements.inputText.value;
        
        if (!text) {
            this.elements.charCount.textContent = '0';
            this.elements.tokenCount.textContent = '0';
            this.elements.compressionRatio.textContent = '0%';
            this.elements.tokenVisualization.innerHTML = '<div class="empty-state">Enter text to see visualization</div>';
            this.elements.visualizationStats.textContent = '';
            return;
        }

        const stats = tokenizer.getEncodingStats(text);
        
        // Update statistics
        this.elements.charCount.textContent = stats.characterCount;
        this.elements.tokenCount.textContent = stats.tokenCount;
        this.elements.compressionRatio.textContent = `${stats.compressionRatio}%`;

        // Create token visualization
        const result = tokenizer.encodeText(text);
        let vizHTML = '<div class="token-grid">';
        
        result.tokens.forEach((token, index) => {
            const tokenText = tokenizer.reverseVocabulary.has(token) ? 
                tokenizer.reverseVocabulary.get(token) : 
                String.fromCharCode(token - tokenizer.asciiOffset);
            
            const displayText = tokenText === ' ' ? '&nbsp;' :
                               tokenText === '\n' ? '\\n' :
                               tokenText === '\t' ? '\\t' :
                               this.escapeHtml(tokenText);
            
            vizHTML += `
                <div class="token-item" title="Token: ${token}, Text: '${tokenText}'">
                    <div class="token-text">${displayText}</div>
                    <div class="token-id">${token}</div>
                </div>
            `;
        });
        
        vizHTML += '</div>';
        this.elements.tokenVisualization.innerHTML = vizHTML;

        // Update hidden stats for copying
        this.elements.visualizationStats.textContent = 
            `Characters: ${stats.characterCount}, Tokens: ${stats.tokenCount}, Compression: ${stats.compressionRatio}%`;
    }

    /**
     * Handle copy to clipboard functionality
     * @param {Event} event - Click event
     */
    async handleCopyToClipboard(event) {
        const button = event.currentTarget;
        const targetId = button.getAttribute('data-copy');
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;

        try {
            let textToCopy = targetElement.textContent || targetElement.innerText;
            
            if (!textToCopy.trim()) {
                this.showToast('Nothing to copy', 'warning');
                return;
            }

            await navigator.clipboard.writeText(textToCopy);
            this.showToast('Copied to clipboard!', 'success');
            
            // Visual feedback on button
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 1000);

        } catch (error) {
            this.showToast('Failed to copy to clipboard', 'error');
        }
    }

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, warning, error)
     */
    showToast(message, type = 'success') {
        const toast = this.elements.toast;
        const icon = type === 'success' ? 'fas fa-check' : 
                    type === 'warning' ? 'fas fa-exclamation-triangle' : 
                    'fas fa-times';
        
        toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Escape HTML characters for safe display
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Initialize tab navigation functionality
     */
    initializeTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                if (!targetTab) return;

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
}

// Initialize UI Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager();
});
