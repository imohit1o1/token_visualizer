# 🤖 AI Token Visualizer

An interactive web application that demonstrates how AI models convert text into tokens. Features a stunning warm amber dark theme with comprehensive tokenization visualization and real-time text analysis.

![AI Token Visualizer](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔄 Text to Token Encoding
- Convert any text into numerical tokens with step-by-step visualization
- Real-time encoding sequence display with detailed process explanation
- Predefined vocabulary lookup with ASCII fallback for unknown characters
- Interactive token grid display with hover effects and statistics

### 🔄 Token to Text Decoding
- Convert token arrays back to readable text with detailed decoding steps
- Support for vocabulary tokens and ASCII-encoded characters
- Error handling for invalid or out-of-range tokens
- Visual representation of the decoding process

### 📚 Vocabulary Dictionary
- Browse the complete predefined vocabulary with search functionality
- Real-time filtering as you type
- Toggle ASCII character range display (32-126)
- Character-to-token mapping visualization with type indicators

### 📊 Text Visualization & Statistics
- Interactive token grid with visual representation
- Real-time statistics including:
  - Character count
  - Token count
  - Compression ratio calculation
- Visual token representation with hover tooltips

### 📋 Copy to Clipboard
- One-click copy functionality for all sections
- Visual feedback with toast notifications
- Support for encoding results, decoding results, and vocabulary entries

### 🎨 Design Features
- **Warm Amber Dark Theme**: Modern, professional design with amber accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Tab Navigation**: Clean separation between encoding and decoding sections
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
├── index.html          # Main HTML structure with tab navigation
├── styles.css          # Warm amber dark theme styling
├── tokenizer.js        # Core tokenization logic and vocabulary
├── ui.js              # User interface management and DOM updates
├── app.js             # Main application controller and utilities
└── README.md          # Project documentation
```

## 🔧 How It Works

### Tokenization Process
1. **Text Input**: User enters text in the encoding section
2. **Word Splitting**: Text is split into words and punctuation
3. **Vocabulary Lookup**: Each word is checked against the predefined vocabulary
4. **ASCII Fallback**: Unknown characters are encoded using ASCII values + 2000 offset
5. **Token Generation**: Final array of numerical tokens is produced

### Vocabulary Structure
- **Special Tokens** (0-99): `<PAD>`, `<UNK>`, `<START>`, `<END>`, `<MASK>`, etc.
- **Common Words** (100-999): Frequently used English words
- **Punctuation** (1000-1099): Symbols and punctuation marks
- **ASCII Range** (2000+): ASCII characters with offset for unknown text

## 🎮 Usage Examples

### Basic Text Encoding
```
Input: "Hello world"
Tokens: [2000, 2001, 2002, 2002, 2003, 2004, 2005, 2006, 2007, 2002, 2008]
```

### Token Decoding
```
Input: 72, 101, 108, 108, 111
Output: "Hello"
```

## 🛠️ Technical Details

### Architecture
- **Modular Design**: Separated concerns with dedicated modules
- **Event-Driven**: Responsive UI with real-time updates
- **Class-Based**: Object-oriented JavaScript with ES6 classes
- **Error Handling**: Comprehensive error management and user feedback

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Made with ❤️ by Mohit Kumar**
