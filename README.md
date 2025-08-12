# 🤖 AI Token Visualizer

An interactive web application that demonstrates how AI models convert text into tokens. Features a stunning neon green dark theme with shadow overlays and comprehensive tokenization visualization.

![AI Token Visualizer](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔄 Text to Token Encoding
- Convert any text into numerical tokens
- Step-by-step encoding sequence visualization
- Predefined vocabulary lookup with ASCII fallback
- Real-time encoding statistics

### 🔄 Token to Text Decoding
- Convert token arrays back to readable text
- Detailed decoding sequence display
- Support for vocabulary and ASCII tokens
- Error handling for invalid tokens

### 📚 Vocabulary Dictionary
- Browse the complete predefined vocabulary
- Search functionality with real-time filtering
- Toggle ASCII character range display
- Character-to-token mapping visualization

### 📊 Text Visualization
- Interactive token grid display
- Real-time statistics (character count, token count, compression ratio)
- Visual token representation with hover effects
- Comprehensive text analysis

### 📋 Copy to Clipboard
- One-click copy functionality for all sections
- Visual feedback with toast notifications
- Support for encoding results, decoding results, and statistics

### 🎨 Design Features
- **Neon Green Dark Theme**: Stunning cyberpunk-inspired design
- **Shadow Overlays**: Dynamic background with animated gradients
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging hover effects and transitions
- **Modern UI**: Clean, professional interface with intuitive navigation

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start exploring tokenization!

```bash
# Clone the repository
git clone <repository-url>
cd tokenvisualizer

# Open in browser
open index.html
```

## 📁 Project Structure

```
tokenvisualizer/
├── index.html          # Main HTML structure
├── styles.css          # Neon green dark theme styling
├── tokenizer.js        # Core tokenization logic
├── ui.js              # User interface management
├── app.js             # Main application controller
└── README.md          # Project documentation
```

## 🔧 How It Works

### Tokenization Process
1. **Text Input**: User enters text to be tokenized
2. **Word Splitting**: Text is split into words and punctuation
3. **Vocabulary Lookup**: Each word is checked against the predefined vocabulary
4. **ASCII Fallback**: Unknown characters are encoded using ASCII values + offset
5. **Token Generation**: Final array of numerical tokens is produced

### Vocabulary Structure
- **Special Tokens** (0-99): `<PAD>`, `<UNK>`, `<START>`, `<END>`, etc.
- **Common Words** (100-999): Frequently used English words
- **Punctuation** (1000-1099): Symbols and punctuation marks
- **ASCII Range** (2000+): ASCII characters with offset for unknown text

### Decoding Process
1. **Token Input**: User provides comma-separated token IDs
2. **Vocabulary Lookup**: Each token is mapped back to text
3. **ASCII Decoding**: ASCII tokens are converted to characters
4. **Text Reconstruction**: Final readable text is assembled

## 🎮 Usage Examples

### Basic Text Encoding
```
Input: "Hello, world!"
Tokens: [72, 101, 108, 108, 111, 1000, 32, 119, 111, 114, 108, 100, 1001]
```

### Token Decoding
```
Input: 72, 101, 108, 108, 111
Output: "Hello"
```

### Vocabulary Search
- Search for specific characters or words
- Toggle ASCII range display
- View token mappings

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Encode current text
- **Ctrl/Cmd + Shift + Enter**: Decode current tokens
- **Escape**: Clear active input field

## 🛠️ Technical Details

### Architecture
- **Modular Design**: Separated concerns with dedicated modules
- **Event-Driven**: Responsive UI with real-time updates
- **Memory Efficient**: Optimized vocabulary storage and lookup
- **Error Handling**: Comprehensive error management and user feedback

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Fast tokenization for texts up to 10,000 characters
- Efficient vocabulary search with O(1) lookup
- Smooth animations with CSS transforms
- Minimal memory footprint

## 🎨 Customization

### Theme Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --neon-green: #00ff41;
    --neon-green-glow: #00ff4180;
    --dark-bg: #0a0a0a;
    /* ... other variables */
}
```

### Vocabulary
Extend the vocabulary in `tokenizer.js`:
```javascript
const customWords = ['your', 'custom', 'words'];
// Add to vocabulary initialization
```

## 🐛 Debugging

Enable debug mode in browser console:
```javascript
enableDebug();  // Enable detailed logging
loadSample(0);  // Load sample text
getAppInfo();   // Get application info
exportSession(); // Export current session
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Made with ❤️ and lots of ☕ by the AI Token Visualizer Team**
