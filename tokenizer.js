/**
 * ===== AI TOKEN VISUALIZER - TOKENIZER MODULE =====
 * 
 * This module handles the core tokenization logic including:
 * - Text to token encoding with predefined vocabulary
 * - Token to text decoding
 * - ASCII fallback for unknown characters
 * - Vocabulary management and search
 * 
 * Author: AI Token Visualizer
 * Version: 1.0.0
 */

class TokenVisualizer {
    constructor() {
        // Initialize predefined vocabulary with common words and characters
        this.initializeVocabulary();
        
        // Track encoding/decoding sequences for visualization
        this.encodingSteps = [];
        this.decodingSteps = [];
    }

    /**
     * Initialize the predefined vocabulary dictionary
     * Contains common words, punctuation, and special tokens
     */
    initializeVocabulary() {
        this.vocabulary = new Map();
        this.reverseVocabulary = new Map();
        
        // Special tokens (0-99)
        const specialTokens = [
            '<PAD>', '<UNK>', '<START>', '<END>', '<MASK>',
            '<CLS>', '<SEP>', '<NEWLINE>', '<TAB>', '<SPACE>'
        ];
        
        // Common words (100-999)
        const commonWords = [
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
            'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
            'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
            'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
            'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
            'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
            'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
            'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
            'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
            'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
            'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had',
            'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'if',
            'up', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would',
            'make', 'like', 'into', 'him', 'has', 'two', 'more', 'very', 'what', 'know',
            'just', 'first', 'get', 'over', 'think', 'where', 'much', 'go', 'well',
            'were', 'been', 'have', 'had', 'has', 'said', 'each', 'which', 'she',
            'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many'
        ];
        
        // Punctuation and symbols (1000-1099)
        const punctuation = [
            '.', ',', '!', '?', ';', ':', '"', "'", '(', ')', '[', ']', '{', '}',
            '-', '_', '+', '=', '*', '/', '\\', '|', '@', '#', '$', '%', '^', '&',
            '<', '>', '~', '`', '\n', '\t', ' '
        ];
        
        let tokenId = 0;
        
        // Add special tokens
        specialTokens.forEach(token => {
            this.vocabulary.set(token, tokenId);
            this.reverseVocabulary.set(tokenId, token);
            tokenId++;
        });
        
        // Add common words
        commonWords.forEach(word => {
            this.vocabulary.set(word.toLowerCase(), tokenId);
            this.reverseVocabulary.set(tokenId, word.toLowerCase());
            tokenId++;
        });
        
        // Add punctuation
        punctuation.forEach(punct => {
            this.vocabulary.set(punct, tokenId);
            this.reverseVocabulary.set(tokenId, punct);
            tokenId++;
        });
        
        // Reserve space for ASCII characters (starting from 2000)
        this.asciiOffset = 2000;
    }

    /**
     * Encode text to tokens using vocabulary with ASCII fallback
     * @param {string} text - Input text to encode
     * @returns {Object} - Encoding result with tokens and steps
     */
    encodeText(text) {
        if (!text) return { tokens: [], steps: [] };
        
        this.encodingSteps = [];
        const tokens = [];
        const words = this.tokenizeWords(text);
        
        words.forEach((word, index) => {
            const step = {
                step: index + 1,
                input: word,
                process: '',
                output: null
            };
            
            // Check if word exists in vocabulary
            if (this.vocabulary.has(word.toLowerCase())) {
                const tokenId = this.vocabulary.get(word.toLowerCase());
                tokens.push(tokenId);
                step.process = `Found "${word}" in vocabulary`;
                step.output = tokenId;
            } else {
                // Use ASCII encoding for unknown words/characters
                const asciiTokens = this.encodeToAscii(word);
                tokens.push(...asciiTokens);
                step.process = `"${word}" not in vocabulary, using ASCII encoding`;
                step.output = asciiTokens;
            }
            
            this.encodingSteps.push(step);
        });
        
        return {
            tokens: tokens,
            steps: this.encodingSteps,
            originalText: text,
            tokenCount: tokens.length,
            characterCount: text.length
        };
    }

    /**
     * Decode tokens back to text
     * @param {Array} tokens - Array of token IDs
     * @returns {Object} - Decoding result with text and steps
     */
    decodeTokens(tokens) {
        if (!tokens || tokens.length === 0) return { text: '', steps: [] };
        
        this.decodingSteps = [];
        let decodedText = '';
        
        tokens.forEach((token, index) => {
            const step = {
                step: index + 1,
                input: token,
                process: '',
                output: ''
            };
            
            if (this.reverseVocabulary.has(token)) {
                // Token found in vocabulary
                const text = this.reverseVocabulary.get(token);
                decodedText += text;
                step.process = `Token ${token} found in vocabulary`;
                step.output = text;
            } else if (token >= this.asciiOffset) {
                // ASCII encoded character
                const asciiChar = String.fromCharCode(token - this.asciiOffset);
                decodedText += asciiChar;
                step.process = `Token ${token} decoded from ASCII`;
                step.output = asciiChar;
            } else {
                // Unknown token
                const unknownText = '<UNK>';
                decodedText += unknownText;
                step.process = `Token ${token} not found, using <UNK>`;
                step.output = unknownText;
            }
            
            this.decodingSteps.push(step);
        });
        
        return {
            text: decodedText,
            steps: this.decodingSteps,
            tokenCount: tokens.length
        };
    }

    /**
     * Tokenize text into words and punctuation
     * @param {string} text - Input text
     * @returns {Array} - Array of tokens (words/punctuation)
     */
    tokenizeWords(text) {
        // Simple tokenization: split by spaces and separate punctuation
        const tokens = [];
        let currentToken = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (/\s/.test(char)) {
                // Whitespace
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }
                if (char !== ' ') tokens.push(char); // Keep tabs, newlines
            } else if (/[.,!?;:"'()\[\]{}\-_+=*\/\\|@#$%^&<>~`]/.test(char)) {
                // Punctuation
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }
                tokens.push(char);
            } else {
                // Regular character
                currentToken += char;
            }
        }
        
        if (currentToken) tokens.push(currentToken);
        return tokens;
    }

    /**
     * Encode word to ASCII tokens
     * @param {string} word - Word to encode
     * @returns {Array} - Array of ASCII token IDs
     */
    encodeToAscii(word) {
        return Array.from(word).map(char => char.charCodeAt(0) + this.asciiOffset);
    }

    /**
     * Get vocabulary for display
     * @param {string} searchTerm - Optional search term
     * @param {boolean} includeAscii - Whether to include ASCII range
     * @returns {Array} - Vocabulary entries
     */
    getVocabulary(searchTerm = '', includeAscii = false) {
        const vocab = [];
        
        // Add predefined vocabulary
        for (const [word, tokenId] of this.vocabulary.entries()) {
            if (!searchTerm || word.toLowerCase().includes(searchTerm.toLowerCase())) {
                vocab.push({
                    character: word,
                    token: tokenId,
                    type: 'vocabulary'
                });
            }
        }
        
        // Add ASCII range if requested
        if (includeAscii) {
            for (let i = 32; i <= 126; i++) { // Printable ASCII
                const char = String.fromCharCode(i);
                const tokenId = i + this.asciiOffset;
                
                if (!searchTerm || char.includes(searchTerm) || tokenId.toString().includes(searchTerm)) {
                    vocab.push({
                        character: char,
                        token: tokenId,
                        type: 'ascii'
                    });
                }
            }
        }
        
        return vocab.sort((a, b) => a.token - b.token);
    }

    /**
     * Get encoding statistics
     * @param {string} text - Input text
     * @returns {Object} - Statistics object
     */
    getEncodingStats(text) {
        const encoded = this.encodeText(text);
        const compressionRatio = text.length > 0 ? 
            ((text.length - encoded.tokens.length) / text.length * 100).toFixed(1) : 0;
        
        return {
            characterCount: text.length,
            tokenCount: encoded.tokens.length,
            compressionRatio: compressionRatio,
            tokens: encoded.tokens
        };
    }
}

// Create global instance
const tokenizer = new TokenVisualizer();
