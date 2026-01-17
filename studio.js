
const AVAILABLE_TYPES = [
    'Code Block',
    'Comparison',
    'Counter',
    'Duo Slide',
    'Final',
    'Flip Cards',
    'Glitch Text',
    'Grid List',
    'Icon Grid',
    'Info Card',
    'Introduction Cycle',
    'Kinetic Annotation',
    'Kinetic Arrow Cycle',
    'Kinetic Bold',
    'Kinetic Burst',
    'Kinetic Drop',
    'Kinetic Flash Zoom',
    'Kinetic Greeting',
    'Kinetic Insert Arrow',
    'Kinetic Names',
    'Kinetic Sequence',
    'Kinetic Typing',
    'Kinetic URL Reveal',
    'Kinetic Underline',
    'Kinetic Wobble Align',
    'Mask Reveal',
    'Matrix',
    'Progress Bar',
    'Pulse',
    'Quote',
    'Reveal List',
    'Shutter Reveal',
    'Split',
    'Spotlight',
    'Stack Echo',
    'Stat Cards',
    'Timeline',
    'Title',
    'Title Zoom',
    'Typing Scroller'
];

const AVAILABLE_FONTS = [
    'Abril Fatface',
    'Anton',
    'Arial',
    'Arvo',
    'Audiowide',
    'Bangers',
    'Barlow',
    'Bebas Neue',
    'Bitter',
    'Courier New',
    'Creepster',
    'Crimson Text',
    'Dosis',
    'Exo 2',
    'Faster One',
    'Fira Sans',
    'Fredoka One',
    'Georgia',
    'Helvetica',
    'IBM Plex Mono',
    'Impact',
    'Inconsolata',
    'Inter',
    'JetBrains Mono',
    'Josefin Sans',
    'Lato',
    'Libre Baskerville',
    'Lobster',
    'Lora',
    'Merriweather',
    'Merriweather Sans',
    'Monoton',
    'Montserrat',
    'Noto Sans',
    'Nunito',
    'Open Sans',
    'Oswald',
    'Pacifico',
    'Permanent Marker',
    'Playfair Display',
    'Poppins',
    'Press Start 2P',
    'PT Sans',
    'PT Serif',
    'Quicksand',
    'Raleway',
    'Righteous',
    'Roboto',
    'Roboto Mono',
    'Roboto Slab',
    'Rock Salt',
    'Ruslan Display',
    'Source Sans Pro',
    'Space Mono',
    'Times New Roman',
    'Ubuntu',
    'Verdana',
    'VT323',
    'Work Sans'
];

const DEFAULT_SCENE = {
    type: 'Kinetic Bold',
    text: 'HELLO',
    sub: 'WORLD',
    background: '#000000',
    color: '#ffffff',
    fontSize: '1em',
    fontFamily: 'Inter'
};

// Define fields available for each animation type
// Standardized schema: text, sub, background, color, accent, subColor, fontSize, fontFamily, + BG props
const BASE_PROPS = ['duration', 'fontFamily', 'backgroundImage', 'backgroundSize'];

const SCHEMA = {
    'Introduction Cycle': ['text', 'sub', 'words', 'suffix', 'background', 'color', 'accent', 'subColor', 'fontSize', ...BASE_PROPS],
    'Kinetic Bold': ['text', 'sub', 'background', 'color', 'fontSize', 'subSize', 'subColor', ...BASE_PROPS],
    'Kinetic Burst': ['text', 'sub', 'background', 'color', 'secondaryBackground', 'secondaryColor', 'fontSize', 'subSize', ...BASE_PROPS],
    'Matrix': ['text', 'background', 'color', 'accent', 'fontSize', ...BASE_PROPS],
    'Title': ['text', 'sub', 'background', 'color', 'subColor', 'fontSize', ...BASE_PROPS],
    'Kinetic Drop': ['text', 'sub', 'background', 'color', 'subColor', 'tilt', 'fontSize', 'subSize', ...BASE_PROPS],
    'Kinetic Sequence': ['items', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Spotlight': ['text', 'sub', 'background', 'color', 'accent', 'icon', ...BASE_PROPS],
    'Duo Slide': ['top', 'bottom', 'sub', 'background', 'color', 'color1', 'color2', 'fontSize', ...BASE_PROPS],
    'Title Zoom': ['text', 'sub', 'background', 'color', ...BASE_PROPS],
    'Mask Reveal': ['text', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Glitch Text': ['text', 'sub', 'background', 'color', 'subColor', ...BASE_PROPS],
    'Split': ['title1', 'title2', 'sub', 'background', 'color', 'subColor', ...BASE_PROPS],
    'Grid List': ['items', 'background', 'color', ...BASE_PROPS],
    'Info Card': ['icon', 'text', 'bullets', 'background', 'color', ...BASE_PROPS],
    'Info Card': ['icon', 'text', 'bullets', 'background', 'color', ...BASE_PROPS],
    'Counter': ['start', 'end', 'suffix', 'label', 'labelFont', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic Greeting': ['text', 'sub', 'subColor', ...BASE_PROPS],
    'Kinetic Names': ['names', 'title', 'suffix', ...BASE_PROPS],
    'Progress Bar': ['text', 'percent', 'sub', 'color', 'fontColor', 'subColor', 'background', ...BASE_PROPS],
    'Flip Cards': ['cards', 'background', ...BASE_PROPS],
    'Timeline': ['text', 'events', 'background', 'color', ...BASE_PROPS],
    'Quote': ['text', 'author', 'background', 'color', ...BASE_PROPS],
    'Comparison': ['left', 'right', 'background', ...BASE_PROPS],
    'Stat Cards': ['stats', 'background', ...BASE_PROPS],
    'Icon Grid': ['text', 'icon', 'columns', 'icons', 'background', ...BASE_PROPS],
    'Code Block': ['text', 'code', 'typeSpeed', 'background', ...BASE_PROPS],
    'Pulse': ['icon', 'text', 'sub', 'subColor', 'background', 'color', ...BASE_PROPS],
    'Reveal List': ['text', 'items', 'background', 'color', ...BASE_PROPS],
    'Final': ['text', 'sub', 'color', 'subColor', 'background', ...BASE_PROPS],
    'Typing Scroller': ['text', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Shutter Reveal': ['text', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Stack Echo': ['text', 'sub', 'background', 'color', 'subColor', 'fontSize', ...BASE_PROPS],
    'Kinetic Annotation': ['text', 'textAfter', 'icon', 'annotation', 'accent', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic Underline': ['text', 'highlight', 'markColor', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic Wobble Align': ['text', 'highlightIndex', 'color', 'background', 'fontSize', ...BASE_PROPS],
    'Kinetic Arrow Cycle': ['prefix', 'items', 'accent', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic Insert Arrow': ['text', 'insertIndex', 'insertText', 'accent', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic URL Reveal': ['text', 'suffix', 'highlightColor', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'Kinetic Flash Zoom': ['text1', 'joiner', 'text2', 'background', 'color', ...BASE_PROPS],
    'Kinetic Typing': ['text', 'background', 'color', 'fontSize', ...BASE_PROPS],
    'default': ['text', 'background', 'color', ...BASE_PROPS]
};

const STORAGE_KEY = 'flexPlaylist';

// Load initial playlist from storage or default
let savedPlaylist = localStorage.getItem(STORAGE_KEY);
let playlist = savedPlaylist ? JSON.parse(savedPlaylist) : [
    {
        type: 'Kinetic Greeting',
        text: 'HELLO',
        sub: 'WELCOME EVERYONE',
        subColor: '#555555',
        background: '#000000',
        color: '#ffffff'
    },
    {
        type: 'Kinetic Names',
        title: 'MEET',
        names: ['Alice', 'Bob', 'Charlie', 'David'],
        suffix: 'LET\'S START',
        background: '#000000',
        color: '#ffffff'
    },
    { 
        type: 'Kinetic Burst', 
        text: "FLEX", 
        sub: "STUDIO", 
        background: '#000000', 
        color: '#ffffff',
        secondaryBackground: '#FFDE00',
        secondaryColor: '#000000',
        fontSize: '12',
        subSize: '4'
    },
    {
        type: 'Matrix',
        text: 'CREATE',
        background: '#000000',
        color: '#ffffff',
        accent: '#00ff00',
        fontSize: '6'
    },
    {
        type: 'Kinetic Sequence',
        items: ['FAST', 'BOLD', 'EPIC'],
        background: '#ffffff',
        color: '#000000',
        fontSize: '12'
    },
    {
        type: 'Spotlight',
        text: 'READY?',
        sub: 'LETS GO',
        icon: '🚀',
        background: '#590867',
        color: '#ffffff',
        duration: 3000
    }
];
let selectedIndex = 0;
let flex = null;
let audio = document.getElementById('bg-music');

// DOM Elements
const sceneListEl = document.getElementById('scene-list');
const propsFormEl = document.getElementById('props-form');
const addBtn = document.getElementById('add-scene-btn');
const playBtn = document.getElementById('play-btn');
const replayBtn = document.getElementById('replay-btn');
const stopBtn = document.getElementById('stop-btn');
const exportBtn = document.getElementById('export-btn');
const audioInput = document.getElementById('audio-upload');
const jsonInput = document.getElementById('json-upload');
const downloadJsonBtn = document.getElementById('download-json-btn');

document.addEventListener('DOMContentLoaded', () => {
    flex = new Flex('preview-canvas');
    render();
    previewCurrent(); // Initial preview
});

// ===========================================
// Render Logic
// ===========================================

function render() {
    // Auto-save on every render
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
    renderSceneList();
    renderProps();
}

function renderSceneList() {
    sceneListEl.innerHTML = '';
    playlist.forEach((scene, index) => {
        const item = document.createElement('div');
        item.className = `scene-item ${index === selectedIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div style="font-weight:bold;">${index + 1}. ${scene.type}</div>
            <div style="font-size:0.8rem; margin-top:0.2rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                ${scene.text || scene.title || 'Untitled'}
            </div>
            <div class="scene-controls" style="${index === selectedIndex ? 'display:flex' : 'display:none'}">
                <button onclick="moveScene(${index}, -1)" class="small-btn">▲</button>
                <button onclick="moveScene(${index}, 1)" class="small-btn">▼</button>
                <button onclick="cloneScene(${index})" class="small-btn" title="Duplicate">❐</button>
                <button onclick="deleteScene(${index})" class="small-btn" style="background:red;">✕</button>
            </div>
        `;
        item.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON') {
                selectedIndex = index;
                render();
                previewCurrent();
            }
        };
        sceneListEl.appendChild(item);
    });
}

function renderProps() {
    propsFormEl.innerHTML = '';
    if (selectedIndex < 0 || selectedIndex >= playlist.length) return;

    const scene = playlist[selectedIndex];
    
    // Type Selector
    const typeGroup = createFormGroup('Type', 'select');
    const typeSelect = typeGroup.querySelector('select');
    AVAILABLE_TYPES.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t; // Display
        if (t === scene.type) opt.selected = true;
        typeSelect.appendChild(opt);
    });
    typeSelect.onchange = (e) => updateField('type', e.target.value);
    propsFormEl.appendChild(typeGroup);

    // Determine fields to show
    let fieldsToShow = SCHEMA[scene.type] || SCHEMA['default'];

    const renderedProps = new Set();

    fieldsToShow.forEach(field => {
        if (renderedProps.has(field)) return;

        let type = 'text';
        // Auto-detect type
        if (field.toLowerCase().includes('color') || field.includes('background') || field.includes('accent') || field.includes('subColor')) type = 'color';
        // Force text input for backgroundImage so it doesn't get color picker
        if (field === 'backgroundImage') type = 'text';
        if (field === 'fontFamily' || field === 'labelFont') type = 'select'; // Font selector
        if (['start', 'end', 'duration'].includes(field)) type = 'number';
        
        // Value Handling
        let val = scene[field];
        if (val === undefined) {
             if (type === 'color') val = '#000000';
             else if (field === 'background') val = '#ffffff';
             else val = '';
        }
        if (Array.isArray(val)) val = val.join(', ');

        // COMPOSITE GROUPING LOGIC
        // Case 1: 'text' field + 'color'
        if (field === 'text' && fieldsToShow.includes('color')) {
            const colorVal = scene['color'] || '#ffffff';
            const group = createCompositeFormGroup('Text', val, colorVal, 
                (v) => updateField('text', v),
                (c) => updateField('color', c)
            );
            propsFormEl.appendChild(group);
            renderedProps.add('text');
            renderedProps.add('color');
            return;
        }

        // Case 2: 'sub' field + 'subColor'
        if (field === 'sub' && fieldsToShow.includes('subColor')) {
            const colorVal = scene['subColor'] || '#ffffff';
            const group = createCompositeFormGroup('Sub', val, colorVal,
                (v) => updateField('sub', v),
                (c) => updateField('subColor', c)
            );
            propsFormEl.appendChild(group);
            renderedProps.add('sub');
            renderedProps.add('subColor');
            return;
        }

        const group = createFormGroup(formatLabel(field), type, val);
        const input = group.querySelector(type === 'select' ? 'select' : 'input');
        
        // Populate Font Select
        if ((field === 'fontFamily' || field === 'labelFont') && type === 'select') {
            AVAILABLE_FONTS.forEach(font => {
                const opt = document.createElement('option');
                opt.value = font;
                opt.textContent = font;
                if (font === val) opt.selected = true;
                input.appendChild(opt);
            });
            input.onchange = (e) => updateField(field, e.target.value);
        } else {
            // Normal Inputs
            input.oninput = (e) => {
                let newVal = e.target.value;
                if (field === 'words' || field === 'names' || field === 'items') {
                    newVal = newVal.split(',').map(s => s.trim());
                }
                updateField(field, newVal);
            };
        }
        
        propsFormEl.appendChild(group);
        renderedProps.add(field);
    });

    const jsonGroup = createFormGroup('Raw JSON (Advanced)', 'textarea', JSON.stringify(scene, null, 2));
    const textArea = jsonGroup.querySelector('textarea');
    textArea.rows = 8;
    textArea.style.fontFamily = 'monospace';
    textArea.style.fontSize = '0.9rem';
    textArea.onchange = (e) => {
        try {
            const updated = JSON.parse(e.target.value);
            playlist[selectedIndex] = updated;
            render();
        } catch (err) {
            alert('Invalid JSON');
        }
    };
    propsFormEl.appendChild(jsonGroup);
}

function formatLabel(str) {
    // "secondaryBackground" -> "Secondary Background"
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

function createFormGroup(label, type, value) {
    const div = document.createElement('div');
    div.className = 'form-group';
    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    
    let input;
    if (type === 'textarea') {
        input = document.createElement('textarea');
        input.value = value;
    } else if (type === 'select') {
        input = document.createElement('select');
    } else {
        input = document.createElement('input');
        input.type = type;
        if (type === 'color') {
            input.style.height = '40px';
            input.style.width = '100%';
            input.style.cursor = 'pointer';
        }
        input.value = value;
    }
    
    div.appendChild(labelEl);
    div.appendChild(input);
    return div;
}

function createCompositeFormGroup(label, textVal, colorVal, onTextChange, onColorChange) {
    const div = document.createElement('div');
    div.className = 'form-group';
    
    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    div.appendChild(labelEl);

    const row = document.createElement('div');
    row.style.cssText = 'display:flex; gap:0.5rem; align-items:center;';
    
    // Text Input
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = textVal;
    textInput.style.flex = '1';
    textInput.oninput = (e) => onTextChange(e.target.value);

    // Color Picker
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = colorVal;
    colorInput.style.cssText = 'width:40px; height:40px; border:2px solid black; padding:0; cursor:pointer; flex-shrink:0;';
    colorInput.oninput = (e) => onColorChange(e.target.value);

    row.appendChild(textInput);
    row.appendChild(colorInput);
    div.appendChild(row);
    
    return div;
}

// ===========================================
// Actions
// ===========================================

// Helper to play just the current scene
async function previewCurrent() {
    if (!playlist[selectedIndex]) return;
    // We don't want to stop background music if it's unrelated to preview? 
    // Usually previewing a scene implies stopping the full playback flow.
    await flex.play(playlist[selectedIndex]);
}

let debounceTimer;
function updateField(key, value) {
    if (playlist[selectedIndex]) {
        playlist[selectedIndex][key] = value;
    }
    // If type changed, we need full re-render
    if (key === 'type') render();
    // For text/title updates, update list header
    if (key === 'text' || key === 'title') renderSceneList();
    
    // Live Preview on change (Debounced)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        previewCurrent();
    }, 500);
}

window.moveScene = (index, dir) => {
    if (index + dir < 0 || index + dir >= playlist.length) return;
    const temp = playlist[index];
    playlist[index] = playlist[index + dir];
    playlist[index + dir] = temp;
    selectedIndex += dir; // Follow selection
    render();
    previewCurrent();
};

window.cloneScene = (index) => {
    const clone = JSON.parse(JSON.stringify(playlist[index]));
    playlist.splice(index + 1, 0, clone);
    selectedIndex = index + 1;
    render();
    previewCurrent();
};

window.deleteScene = (index) => {
    if (confirm('Delete this scene?')) {
        playlist.splice(index, 1);
        if (selectedIndex >= playlist.length) selectedIndex = playlist.length - 1;
        if (selectedIndex < 0) selectedIndex = 0; // if list empty
        render();
        previewCurrent();
    }
};

addBtn.onclick = () => {
    const newScene = { ...DEFAULT_SCENE, type: AVAILABLE_TYPES[0], text: 'NEW SCENE' };
    playlist.push(newScene);
    selectedIndex = playlist.length - 1;
    render();
    previewCurrent();
};

playBtn.onclick = async () => {
    if (flex.isPlaying) return;
    
    if (audio.src) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed', e));
    }
    
    await flex.play(playlist);
    
    if (!audio.paused) audio.pause();
};

replayBtn.onclick = () => {
    previewCurrent();
};

stopBtn.onclick = () => {
    flex.stop();
    audio.pause();
    audio.currentTime = 0;
    // Clear canvas
    document.getElementById('preview-canvas').innerHTML = '';
};

audioInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
    }
};

exportBtn.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { cursor: "never" },
            audio: true
        });
        
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        const chunks = [];
        
        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) chunks.push(e.data);
        };
        
        mediaRecorder.onstop = e => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'flex_export_' + Date.now() + '.webm';
            a.click();
            exportBtn.textContent = '🔴 Rec & Export';
            exportBtn.onclick = originExportHandler;
            stopBtn.click();
        };
        
        mediaRecorder.start();
        playBtn.click();
        
        const originExportHandler = exportBtn.onclick;
        exportBtn.textContent = '⏹ Stop Recording';
        exportBtn.onclick = () => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
        };
        
        stream.getVideoTracks()[0].onended = () => {
             if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
        };

    } catch (err) {
        console.error("Error exporting:", err);
    }
};

// JSON Export
downloadJsonBtn.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(playlist, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "flex_project.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// JSON Import
jsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                playlist = imported;
                selectedIndex = 0;
                render();
                previewCurrent();
                alert('Project loaded successfully!');
            } else {
                alert('Invalid JSON file format. Expected an array of scenes.');
            }
        } catch (err) {
            console.error(err);
            alert('Error parsing JSON file.');
        }
    };
    reader.readAsText(file);
});

// ===========================================
// AI Prompt Generation
// ===========================================

const aiPromptBtn = document.getElementById('ai-prompt-btn');
const aiModal = document.getElementById('ai-modal');
const closeAiModalBtn = document.getElementById('close-ai-modal');
const aiPromptText = document.getElementById('ai-prompt-text');
const copyPromptBtn = document.getElementById('copy-prompt-btn');

function generateSystemPrompt() {
    const typesList = AVAILABLE_TYPES.map(t => `- ${t}`).join('\n');
    
    return `You are an expert Kinetic Typography engineer using the 'Flex' animation engine.
Your task is to generate a JSON playlist for a video based on a user's story or request.

OUTPUT FORMAT:
The output must be a RAW JSON array of objects. Do not include markdown formatting (like \`\`\`json).
Example:
[
  {
    "type": "Kinetic Bold",
    "text": "HELLO",
    "sub": "WORLD",
    "background": "#000000",
    "color": "#ffffff"
  },
  {
    "type": "Spotlight",
    "text": "FOCUS",
    "icon": "🎯",
    "background": "#ffffff",
    "color": "#000000"
  }
]

AVAILABLE ANIMATION TYPES:
${typesList}

COMMON PROPERTIES:
- text: Main text string (e.g. "HELLO")
- sub: Subtitle text (e.g. "Welcome")
- background: Hex color (e.g. "#000000")
- color: Hex color (e.g. "#ffffff")
- subColor: Hex color for subtitle (e.g. "#888888")
- accent: Hex color for highlights
- fontSize: number (size in rem, e.g. 10)

INSTRUCTIONS:
1. Analyze the user's request.
2. Select the best animation types to tell the story.
3. Use a mix of "Kinetic" types for energy and "UI" types (like "Stat Cards", "Social Post") for data/info.
4. Ensure good color contrast (Light on Dark or Dark on Light).
5. Return ONLY the valid JSON array.

USER REQUEST:
[INSERT YOUR STORY HERE. E.g. "A promotional video for a new energy drink called ZAP. It's fast, strong, and tasty."]`;
}

aiPromptBtn.addEventListener('click', () => {
    aiPromptText.value = generateSystemPrompt();
    aiModal.style.display = 'flex';
});

closeAiModalBtn.addEventListener('click', () => {
    aiModal.style.display = 'none';
});

copyPromptBtn.addEventListener('click', () => {
    aiPromptText.select();
    document.execCommand('copy');
    const originalText = copyPromptBtn.textContent;
    copyPromptBtn.textContent = '✅ Copied!';
    setTimeout(() => {
        copyPromptBtn.textContent = originalText;
    }, 2000);
});

// ===========================================
// Global Paste Handler
// ===========================================

document.addEventListener('paste', (e) => {
    // Ignore if user is editing a field
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    
    try {
        const imported = JSON.parse(pasteData);
        // Basic validation: must be array and first item should look like a scene (have a type)
        if (Array.isArray(imported) && imported.length > 0 && imported[0].type) {
            e.preventDefault(); // Prevent default paste behavior
            
            if (confirm(`Found a valid Flex playlist with ${imported.length} scenes in clipboard. Import and overwrite current?`)) {
                playlist = imported;
                selectedIndex = 0;
                render();
                previewCurrent();
                alert('Project imported successfully from clipboard!');
            }
        }
    } catch (err) {
        // Not valid JSON, ignore
    }
});
