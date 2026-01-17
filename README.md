# Flex - Kinetic Typography & Animation Engine

**Flex** is a powerful, lightweight, and hackable JavaScript engine for creating neo-brutalist kinetic typography and web animations. It comes with **Flex Studio**, a visual editor to craft, sequence, and record your animations without writing code.

![Flex Banner](https://via.placeholder.com/1200x400/000000/ffffff?text=FLEX+ENGINE)

## 🚀 Features

### Flex Engine (`flex.js`)
- **Neo-Brutalist Aesthetic**: Built-in bold, high-contrast styles.
- **40+ Pre-built Animations**: From `Kinetic Bold` and `Matrix` to `Flip Cards` and `Typing Scroller`.
- **Vanilla JS**: No heavy dependencies, logic is pure JavaScript.
- **Async/Await Driven**: Easy to sequence scenes using clean, readable syntax.

### Flex Studio (`studio.html`)
- **Visual Editor**: Real-time property editing for all animation types.
- **Timeline Management**: Reorder, clone, and delete scenes.
- **✨ AI Prompt Generation**: Built-in prompt generator to create scenes using ChatGPT/Claude.
- **💾 Save & Load**: Auto-saves to LocalStorage, plus Import/Export projects as JSON.
- **🔴 Recording**: Export your animations directly to `.webm` video.
- **📋 Paste-to-Import**: Simply copy a JSON playlist and paste it anywhere in the Studio to load it.

## 📦 Installation

No build steps required. It's just HTML, CSS, and JS.

1. **Clone the repo**
   ```bash
   git clone https://github.com/adithyapaib/flex.git
   cd flex
   ```

2. **Run it**
   Simply open `studio.html` (for the editor) or `index.html` (for the demo) in your browser.
   
   *Tip: For the best experience, use a local server (like Live Server in VS Code) to avoid CORS issues with modules or audio.*

## 🎮 Usage

### Using the Studio
1. Open `studio.html`.
2. Use the **Timeline** on the left to add scenes.
3. Select a scene to edit its **Properties** on the right.
4. Click **▶ Play All** to preview.
5. Use **✨ AI Prompt** to get a JSON template for your story.

### Using the Engine Programmatically

```javascript
const flex = new Flex('container-id');

const playlist = [
    {
        type: 'Kinetic Bold',
        text: 'HELLO',
        sub: 'WORLD',
        background: '#000',
        color: '#fff'
    },
    {
        type: 'Spotlight',
        text: 'FOCUS',
        icon: '🎯'
    }
];

// Play the sequence
await flex.play(playlist);
```

## 🛠️ Customization

- **Add New Animations**: Define new handlers in `flex.js` using `flex.register()`.
- **Modify Studio**: Update `AVAILABLE_TYPES` and `SCHEMA` in `studio.js` to expose new properties to the UI.

## 📄 License

MIT © [Adithya Pai B](https://github.com/adithyapaib)
