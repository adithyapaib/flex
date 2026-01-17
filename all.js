/*
 * ====================================================================================
 * ETS KINETIC TYPOGRAPHY ANIMATION CATALOGUE
 * ====================================================================================
 *
 * AVAILABLE ANIMATIONS:
 *
 * 1.  intro-joiner-cycle (alias: hello-cycler)
 *     - "Hello" in different languages or cycling words, followed by names.
 *     - Props: words (array), title, sub, names (array), suffix.
 *
 * 2.  title
 *     - Big bold title with optional subtitle.
 *     - Props: title, sub, slide (bool).
 *
 * 3.  title-zoom
 *     - Title that zooms out from huge to normal.
 *     - Props: title, sub, duration.
 *
 * 4.  mask-reveal
 *     - Text revealed by a gradient mask.
 *     - Props: title.
 *
 * 5.  scene
 *     - Standard typing title followed by slide-up subtitle.
 *     - Props: title, sub, invert (bool).
 *
 * 6.  glitch-text
 *     - Cyberpunk style glitch effect.
 *     - Props: title, sub.
 *
 * 7.  split
 *     - Two titles appearing one after another.
 *     - Props: title1, title2, sub.
 *
 * 8.  grid-list
 *     - Grid of text items zooming out.
 *     - Props: items (array).
 *
 * 9.  typing-scroller
 *     - Typing title followed by a marquee scroller.
 *     - Props: title, items (array).
 *
 * 10. fast-sequence
 *     - Rapid fire words flashing on screen.
 *     - Props: items (array).
 *
 * 11. info-card
 *     - Icon + Title + Bullet points.
 *     - Props: icon, title, bullets (array).
 *
 * 12. counter
 *     - Animated number counter.
 *     - Props: start, end, suffix, label, duration.
 *
 * 13. progress-bar
 *     - Loading bar animation.
 *     - Props: title, percent, color, sub.
 *
 * 14. flip-cards
 *     - Grid of cards that flip 180deg.
 *     - Props: cards (array of {front, back}).
 *
 * 15. timeline
 *     - Vertical timeline of events.
 *     - Props: title, events (array of {time, text}).
 *
 * 16. quote
 *     - Italicized quote with author.
 *     - Props: text, author.
 *
 * 17. comparison
 *     - Left (Red/X) vs Right (Green/Check) comparison.
 *     - Props: left {title, points}, right {title, points}.
 *
 * 18. stat-cards
 *     - Grid of colorful statistic cards.
 *     - Props: stats (array of {value, label, bg}).
 *
 * 19. icon-grid
 *     - Grid of icons with labels.
 *     - Props: title, columns, icons (array of {icon, label}).
 *
 * 20. code-block
 *     - Typewriter code effect.
 *     - Props: title, code (string), typeSpeed.
 *
 * 21. pulse
 *     - Pulsing rings around an icon.
 *     - Props: icon, title, sub.
 *
 * 22. reveal-list
 *     - List of items sliding in one by one.
 *     - Props: title, items (array).
 *
 * 23. spotlight
 *     - Spotlight effect with radial gradient background.
 *     - Props: icon, title, sub, color, fontColor, iconColor.
 *
 * 24. matrix
 *     - Matrix rain effect.
 *     - Props: title.
 *
 * 25. final
 *     - Final logo reveal scene.
 *     - Props: title, sub (html/img).
 *
 * NEW KINETIC SERIES:
 *
 * 26. kinetic-bold
 *     - Massive text scaling down with impact.
 *     - Props: text, sub.
 *
 * 27. shutter-reveal
 *     - Text revealed by vertical shutters.
 *     - Props: text.
 *
 * 28. stack-echo
 *     - 3-layer text stack (Top/Main/Bottom) sliding apart.
 *     - Props: text, sub.
 *
 * 29. kinetic-sequence
 *     - Full screen rapid word sequence (Stomp effect).
 *     - Props: items (array of string or {text, bg, color}).
 *
 * 30. duo-slide
 *     - Top and bottom words slide in to lock center.
 *     - Props: top, bottom, sub, color1, color2.
 *
 * 31. kinetic-burst
 *     - Black text on White -> Burst -> White text on Black.
 *     - Props: title, sub.
 *
 * 32. kinetic-drop
 *     - "Coming Soon" style drop with motion blur.
 *     - Props: title, sub, tilt (deg).
 *
 * 33. kinetic-annotation
 *     - Main text with handwritten annotation and caret.
 *     - Props: text (use '^' for split), annotation, icon.
 *
 * 34. kinetic-underline
 *     - Text with highlighted word and drawn underline.
 *     - Props: text, highlight, markColor.
 *
 * 35. kinetic-wobble-align
 *     - Scattered words snapping into alignment.
 *     - Props: text, highlightIndex.
 *
 * 36. kinetic-arrow-cycle
 *     - Text cycle with hand-drawn arrow connectors.
 *     - Props: prefix, items (array of {text, type: straight|curve|chaos|multi}).
 *
 * 37. kinetic-insert-arrow
 *     - "But it's [STILL] not enough" text insertion logic.
 *     - Props: N/A (Hardcoded logic for now, or generalize later).
 *
 * 38. kinetic-url-reveal
 *     - Text that slides up, then suffix reveals.
 *     - Props: text, suffix.
 *
 * 39. kinetic-names
 *     - "Hello" looping cycle -> "Meet" -> Name sequence.
 *     - Props: names (array), sub, suffix.
 *
 * 40. kinetic-flash-zoom
 *     - Extreme zoom in -> Flash -> Extreme zoom out.
 *     - Props: text1, joiner, text2.
 *
 * 41. kinetic-typing
 *     - Simple monochrome typewriter cursor effect.
 *     - Props: text, bg, color.
 *
 * ====================================================================================
 */

var data = null;

async function loadData() {
    try {
        const resp = await fetch('./master.json');
        if (!resp.ok) throw new Error(`Failed to load master.json: ${resp.status}`);
        data = await resp.json();
    } catch (err) {
        console.error('Error loading master.json', err);
        data = [];
    }
}

// Load data immediately
loadData();

const container = document.getElementById('container');

// Timing configuration (ms)
const BEAT = 1500;
const FAST_BEAT = 1200;
const SLOW_BEAT = 2500;

// Palette of spotlight accent colors
const SPOTLIGHT_PALETTE = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181',
    '#AA96DA', '#FF9F43', '#00D9FF', '#A8E6CF', '#FF78C4',
    '#6C5CE7', '#00B894', '#E17055', '#0984E3', '#FDCB6E'
];

function getRandomSpotlightColor() {
    return SPOTLIGHT_PALETTE[Math.floor(Math.random() * SPOTLIGHT_PALETTE.length)];
}

function getContrastColor(hex) {
    if (!hex) return '#ffffff';
    let sanitized = hex.toString().trim().replace('#', '');
    if (sanitized.length === 3) {
        sanitized = sanitized.split('').map(c => c + c).join('');
    }
    if (sanitized.length !== 6) return '#ffffff';

    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);

    // Calculate relative luminance
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? '#0b0b0b' : '#ffffff';
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createElement(tag, className, text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.innerHTML = text;
    return el;
}

// ====================================================================================
// ANIMATION HANDLERS
// ====================================================================================

const ANIMATIONS = {

    'intro-joiner-cycle': async (scene, item) => {
        // Alias support: master.json uses 'words', script logic used 'names'
        const words = item.words || item.names || ["Hello", "Welcome"];
        
        scene.style.backgroundColor = 'white';
        scene.style.color = 'black';

        // 1. Typing Title
        const h1 = createElement('h1', 'typing-line', item.title || item.finalTitle || "Welcome");
        h1.style.fontFamily = 'var(--font-main)';
        h1.style.textTransform = 'none';
        h1.style.fontWeight = '900';
        h1.style.fontSize = '6rem';
        h1.style.lineHeight = '1.1';
        
        // Use exact pixel width for accurate typing cursor
        document.body.appendChild(h1);
        h1.style.position = 'absolute'; 
        h1.style.width = 'auto';
        h1.style.visibility = 'hidden'; // Hide while measuring
        const w1 = h1.offsetWidth; // Get precise width including layout
        document.body.removeChild(h1);
        
        h1.style.position = '';
        h1.style.visibility = '';
        h1.style.width = '0px';
        h1.style.setProperty('--target-width', (w1 + 10) + 'px'); // Add small buffer

        h1.classList.add('typing-active');
        scene.appendChild(h1);
        await wait(1500);
        h1.classList.remove('typing-active');
        h1.classList.add('typing-done');

        // 2. Subtitle
        if (item.sub || item.finalSub) {
            const p = createElement('p', 'slide-up', item.sub || item.finalSub);
            p.style.fontFamily = 'var(--font-main)';
            p.style.fontSize = '1.8rem';
            p.style.fontWeight = '400';
            p.style.textAlign = 'center';
            p.style.lineHeight = '1.5';
            p.style.color = '#333'; // Slightly softer black
            p.style.marginBottom = '2rem';
            scene.appendChild(p);
            await wait(1500);
        }

        // 3. Cycle Sentence
        const sentenceDiv = createElement('div', 'pop-in');
        sentenceDiv.style.display = 'flex';
        sentenceDiv.style.alignItems = 'baseline'; // Align baseline for mixed fonts
        sentenceDiv.style.fontSize = '5rem';
        sentenceDiv.style.fontWeight = '800'; // Bolder
        sentenceDiv.style.gap = '1rem'; // Tighter gap
        sentenceDiv.style.justifyContent = 'center';
        sentenceDiv.style.fontFamily = 'var(--font-main)';
        sentenceDiv.style.textTransform = 'none';
        sentenceDiv.style.flexWrap = 'wrap'; // Allow wrapping on small screens

        const cyclerWrapper = createElement('div', 'word-cycler-wrapper');
        const cyclerList = createElement('div', ''); // Removed hardcoded animation class
        cyclerList.style.display = 'flex';
        cyclerList.style.flexDirection = 'column';
        cyclerList.style.textAlign = 'center';

        // Add first word to end for seamless loop
        const cycleWords = [...words, words[0]]; 
        const count = cycleWords.length;

        for (const word of cycleWords) {
            const span = createElement('div', '', word);
            span.style.color = '#590867';
            span.style.fontFamily = 'var(--font-main)';
            span.style.textTransform = 'none';
            cyclerList.appendChild(span);
        }

        cyclerWrapper.appendChild(cyclerList);
        sentenceDiv.appendChild(cyclerWrapper);
        
        if (item.suffix) {
             const suffix = createElement('div', '', item.suffix);
             sentenceDiv.appendChild(suffix);
        }

        scene.appendChild(sentenceDiv);
        
        // Dynamic Animation using Web Animations API
        // Move from 0% to -(100% - 1 item height)
        // Each step matches the array index
        const keyframes = [];
        const step = 100 / count;
        
        // Simple cycle logic: pause on each item
        for (let i = 0; i < count; i++) {
             // Stay at current item
             keyframes.push({ transform: `translateY(-${i * 100}%)`, offset: i / count });
             // Start moving to next (small gap for transition?) 
             // Simplification: CSS steps logic was complex, we'll just slide up continuously or stepping
             // Let's replicate the CSS step-like behavior: 
             // 0% -> Y=0
             // 20% -> Y=0
             // 25% -> Y=-100% (relative to item height? No, translateY uses % of element height usually, but here flex column)
             // Using translateY(-X%) on the list where list height is count * item_height.
             // Actually, simplest is to use steps or keyframes manually.
        }
        
        // We'll trust the CSS logic wasn't fully broken, but let's just make sure it loops correctly.
        // We will animate translateY from 0 to -((count-1)/count)*100 %.
        // height of list is count * 1.2em.
        // We want to show 1 item at a time.
        
        cyclerList.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(-${100 * (count - 1) / count}%)` }
        ], {
            duration: 2000 * (count - 1), // duration proportional to items
            iterations: Infinity,
            easing: `steps(${count - 1}, end)` 
        });

        await wait(4000);
    },

    'hello-cycler': async (scene, item) => {
        // Redirect to intro-joiner-cycle
        return ANIMATIONS['intro-joiner-cycle'](scene, item);
    },

    'title': async (scene, item) => {
        const animClass = item.slide ? 'slide-in-left' : 'pop-in';
        const h1 = createElement('h1', animClass, item.text || item.title);
        scene.appendChild(h1);
        if (item.sub) {
            await wait(200);
            const p = createElement('p', 'slide-up', item.sub);
            scene.appendChild(p);
        }
        await wait(BEAT);
    },

    'title-zoom': async (scene, item) => {
        const h1 = createElement('h1', 'zoom-out', item.text || item.title);
        if (item.sub) {
            h1.innerHTML += `<br/><span style="font-size: 4rem;">${item.sub}</span>`;
        }
        scene.appendChild(h1);
        await wait(item.duration || BEAT);
    },

    'mask-reveal': async (scene, item) => {
        const h1 = createElement('h1', 'mask-reveal', item.title);
        h1.style.fontSize = '8rem';
        scene.appendChild(h1);
        await wait(FAST_BEAT);
    },

    'scene': async (scene, item) => {
        const h1 = createElement('h1', 'typing-line', item.title);
        // Measure logic
        document.body.appendChild(h1);
        h1.style.position = 'absolute';
        h1.style.width = 'auto';
        h1.style.visibility = 'hidden';
        const width = h1.offsetWidth;
        document.body.removeChild(h1);
        
        h1.style.position = '';
        h1.style.visibility = '';
        h1.style.width = '0px';
        h1.style.setProperty('--target-width', (width + 10) + 'px');
        
        h1.style.animationDuration = '0.4s';
        h1.classList.add('typing-active');
        scene.appendChild(h1);
        await wait(400);

        h1.classList.remove('typing-active');
        h1.style.width = chApprox + 'ch';
        h1.classList.add('typing-done');

        if (item.sub) {
            const h2 = createElement('h2', 'slide-up', item.sub);
            scene.appendChild(h2);
        }
        await wait(FAST_BEAT);
    },

    'glitch-text': async (scene, item) => {
        const wrapper = createElement('div', 'pop-in');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';

        const h1 = createElement('h1', 'glitch', item.title);
        wrapper.appendChild(h1);
        
        if (item.sub) {
            await wait(200);
            const p = createElement('p', 'slide-up', item.sub);
            wrapper.appendChild(p);
        }
        
        scene.appendChild(wrapper);
        await wait(BEAT);
    },

    'split': async (scene, item) => {
        const h1 = createElement('h1', 'slide-up', item.title1);
        scene.appendChild(h1);
        await wait(200);
        const h2 = createElement('h1', 'slide-up', item.title2);
        h2.style.marginTop = '1rem';
        scene.appendChild(h2);
        if (item.sub) {
            await wait(200);
            const p = createElement('p', 'pop-in', item.sub);
            scene.appendChild(p);
        }
        await wait(BEAT);
    },

    'grid-list': async (scene, item) => {
        scene.classList.add('grid-scene');
        scene.style.display = 'grid'; // Ensure grid display
        
        for (const text of item.items) {
            const div = createElement('h1', 'zoom-out', text);
            scene.appendChild(div);
            await wait(300);
        }
        await wait(FAST_BEAT);
    },

    'typing-scroller': async (scene, item) => {
        const h2 = createElement('h2', 'typing-line', item.title);
        h2.style.fontSize = '3rem';
        h2.style.marginBottom = '3rem';

        document.body.appendChild(h2);
        h2.style.position = 'absolute'; 
        h2.style.width = 'auto';
        h2.style.visibility = 'hidden';
        const width = h2.offsetWidth;
        document.body.removeChild(h2);
        
        h2.style.position = '';
        h2.style.visibility = '';
        h2.style.width = '0px';
        h2.style.setProperty('--target-width', (width + 10) + 'px');

        h2.classList.add('typing-active');
        scene.appendChild(h2);
        await wait(800);

        const tickerWrap = createElement('div', 'ticker-wrap');
        const content = item.items.join('   •   ');
        const repeatedContent = `${content}   •   ${content}   •   ${content}   •   ${content}`;

        const tickerItem = createElement('div', 'ticker-item', repeatedContent);
        tickerWrap.appendChild(tickerItem);
        scene.appendChild(tickerWrap);

        await wait(2500);
    },

    'fast-sequence': async (scene, item) => {
        // Fast sequence manages its own sub-scenes usually, 
        // but here playScene clears container. 
        // Logic in original was removing scene. We'll stick to a local replacement.
        
        for (const text of item.items) {
             scene.innerHTML = '';
             scene.className = 'scene invert active'; // Force active to show
             scene.style.backgroundColor = 'white';
             scene.style.color = 'black';
             
             const h1 = createElement('h1', 'pop-in', text);
             h1.style.fontSize = '5rem';
             scene.appendChild(h1);
             
             await wait(400); 
        }
    },

    'info-card': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.gap = '1.5rem';

        const iconEl = createElement('div', 'pop-in', item.icon);
        iconEl.style.fontSize = '6rem';
        scene.appendChild(iconEl);
        await wait(200);

        const titleEl = createElement('h1', 'slide-up', item.title);
        titleEl.style.fontSize = '4rem';
        titleEl.style.marginBottom = '1rem';
        scene.appendChild(titleEl);
        await wait(200);

        const bulletContainer = createElement('div', '');
        bulletContainer.style.display = 'flex';
        bulletContainer.style.flexDirection = 'column';
        bulletContainer.style.gap = '0.8rem';
        bulletContainer.style.alignItems = 'center';

        for (const bullet of item.bullets) {
            const bulletEl = createElement('p', 'slide-up', `• ${bullet}`);
            bulletEl.style.fontSize = '2rem';
            bulletEl.style.opacity = '0.9';
            bulletContainer.appendChild(bulletEl);
            await wait(150);
        }
        scene.appendChild(bulletContainer);
        await wait(BEAT);
    },

    'counter': async (scene, item) => {
        const h1 = createElement('h1', 'pop-in', '');
        h1.style.fontSize = '10rem';
        h1.style.fontWeight = '900';
        scene.appendChild(h1);

        const start = item.start || 0;
        const end = item.end || 100;
        const duration = item.duration || 2000;
        const steps = 30;
        const stepTime = duration / steps;
        const increment = (end - start) / steps;

        let current = start;
        for (let i = 0; i <= steps; i++) {
            h1.textContent = Math.round(current) + (item.suffix || '');
            current += increment;
            await wait(stepTime);
        }
        h1.textContent = end + (item.suffix || '');

        if (item.label) {
            const label = createElement('p', 'slide-up', item.label);
            label.style.fontSize = '2.5rem';
            scene.appendChild(label);
        }
        await wait(FAST_BEAT);
    },

    'progress-bar': async (scene, item) => {
        const titleEl = createElement('h1', 'slide-up', item.title);
        titleEl.style.marginBottom = '2rem';
        titleEl.style.color = item.fontColor || '#fff';
        scene.appendChild(titleEl);
        await wait(300);

        const barContainer = createElement('div', '');
        barContainer.style.width = '80%';
        barContainer.style.height = '40px';
        barContainer.style.backgroundColor = 'rgba(255,255,255,0.2)';
        barContainer.style.borderRadius = '20px';
        barContainer.style.overflow = 'hidden';

        const barFill = createElement('div', '');
        barFill.style.height = '100%';
        barFill.style.width = '0%';
        barFill.style.backgroundColor = item.color || '#00ff88';
        barFill.style.borderRadius = '20px';
        barFill.style.transition = 'width 1.5s ease-out';

        barContainer.appendChild(barFill);
        scene.appendChild(barContainer);

        await wait(100);
        barFill.style.width = (item.percent || 100) + '%';

        if (item.sub) {
            await wait(500);
            const subEl = createElement('p', 'slide-up', item.sub);
            scene.appendChild(subEl);
        }
        await wait(SLOW_BEAT);
    },

    'flip-cards': async (scene, item) => {
        scene.style.flexDirection = 'row';
        scene.style.flexWrap = 'wrap';
        scene.style.gap = '2rem';
        scene.style.justifyContent = 'center';

        for (const card of item.cards) {
            const cardWrapper = createElement('div', 'flip-card pop-in');
            cardWrapper.style.width = '200px';
            cardWrapper.style.height = '250px';
            cardWrapper.style.perspective = '1000px';

            const cardInner = createElement('div', 'flip-card-inner');
            Object.assign(cardInner.style, {
                position: 'relative', width: '100%', height: '100%',
                transition: 'transform 0.6s', transformStyle: 'preserve-3d'
            });

            const front = createElement('div', '', card.front);
            Object.assign(front.style, {
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', backgroundColor: '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '4rem', borderRadius: '15px'
            });

            const back = createElement('div', '', card.back);
            Object.assign(back.style, {
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', backgroundColor: '#590867',
                transform: 'rotateY(180deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', padding: '1rem', textAlign: 'center',
                borderRadius: '15px'
            });

            cardInner.appendChild(front);
            cardInner.appendChild(back);
            cardWrapper.appendChild(cardInner);
            scene.appendChild(cardWrapper);
            await wait(200);
        }

        await wait(500);
        const cards = scene.querySelectorAll('.flip-card-inner');
        cards.forEach(c => c.style.transform = 'rotateY(180deg)');
        await wait(SLOW_BEAT);
    },

    'timeline': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'flex-start';
        scene.style.padding = '2rem 4rem';

        const titleEl = createElement('h1', 'slide-in-left', item.title);
        titleEl.style.marginBottom = '2rem';
        scene.appendChild(titleEl);
        await wait(300);

        const timelineContainer = createElement('div', '');
        timelineContainer.style.display = 'flex';
        timelineContainer.style.flexDirection = 'column';
        timelineContainer.style.gap = '1rem';
        timelineContainer.style.borderLeft = '4px solid #590867';
        timelineContainer.style.paddingLeft = '2rem';

        for (const event of item.events) {
            const eventEl = createElement('div', 'slide-in-left');
            eventEl.style.display = 'flex';
            eventEl.style.alignItems = 'center';
            eventEl.style.gap = '1rem';

            const dot = createElement('div', '');
            Object.assign(dot.style, {
                width: '16px', height: '16px', backgroundColor: '#590867',
                borderRadius: '50%', marginLeft: '-2.5rem'
            });

            const timeEl = createElement('span', '', event.time);
            Object.assign(timeEl.style, {
                fontWeight: '700', fontSize: '1.5rem', minWidth: '100px'
            });

            const textEl = createElement('span', '', event.text);
            textEl.style.fontSize = '1.8rem';

            eventEl.appendChild(dot);
            eventEl.appendChild(timeEl);
            eventEl.appendChild(textEl);
            timelineContainer.appendChild(eventEl);
            await wait(250);
        }
        scene.appendChild(timelineContainer);
        await wait(BEAT);
    },

    'quote': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.padding = '3rem';

        const quoteEl = createElement('h1', 'pop-in', `"${item.text}"`);
        Object.assign(quoteEl.style, {
             fontSize: '3.5rem', fontStyle: 'italic', fontWeight: '400',
             textAlign: 'center', lineHeight: '1.4'
        });
        scene.appendChild(quoteEl);

        if (item.author) {
            await wait(500);
            const authorEl = createElement('p', 'slide-up', `— ${item.author}`);
            authorEl.style.fontSize = '2rem';
            authorEl.style.opacity = '0.8';
            authorEl.style.marginTop = '2rem';
            scene.appendChild(authorEl);
        }
        await wait(SLOW_BEAT);
    },

    'comparison': async (scene, item) => {
        scene.style.flexDirection = 'row';
        scene.style.gap = '2rem';
        scene.style.padding = '2rem';

        // Left
        const leftSide = createElement('div', 'slide-in-left');
        Object.assign(leftSide.style, {
             flex: '1', backgroundColor: 'rgba(255,0,0,0.2)',
             padding: '2rem', borderRadius: '20px',
             display: 'flex', flexDirection: 'column', alignItems: 'center'
        });

        const leftTitle = createElement('h2', '', item.left.title);
        leftTitle.style.fontSize = '2.5rem';
        leftTitle.style.marginBottom = '1rem';
        leftSide.appendChild(leftTitle);

        for (const point of item.left.points) {
            const p = createElement('p', '', `❌ ${point}`);
            p.style.fontSize = '1.5rem';
            p.style.margin = '0.5rem 0';
            leftSide.appendChild(p);
        }
        scene.appendChild(leftSide);

        await wait(300);

        // VS
        const vsEl = createElement('div', 'pop-in', 'VS');
        vsEl.style.fontSize = '3rem';
        vsEl.style.fontWeight = '900';
        vsEl.style.alignSelf = 'center';
        scene.appendChild(vsEl);

        await wait(300);

        // Right
        const rightSide = createElement('div', 'slide-in-right');
        Object.assign(rightSide.style, {
             flex: '1', backgroundColor: 'rgba(0,255,0,0.2)',
             padding: '2rem', borderRadius: '20px',
             display: 'flex', flexDirection: 'column', alignItems: 'center'
        });

        const rightTitle = createElement('h2', '', item.right.title);
        rightTitle.style.fontSize = '2.5rem';
        rightTitle.style.marginBottom = '1rem';
        rightSide.appendChild(rightTitle);

        for (const point of item.right.points) {
            const p = createElement('p', '', `✅ ${point}`);
            p.style.fontSize = '1.5rem';
            p.style.margin = '0.5rem 0';
            rightSide.appendChild(p);
        }
        scene.appendChild(rightSide);

        await wait(SLOW_BEAT);
    },

    'stat-cards': async (scene, item) => {
        scene.style.flexDirection = 'row';
        scene.style.flexWrap = 'wrap';
        scene.style.gap = '2rem';
        scene.style.justifyContent = 'center';

        for (const stat of item.stats) {
            const card = createElement('div', 'pop-in');
            Object.assign(card.style, {
                backgroundColor: stat.bg || '#590867', padding: '2rem 3rem',
                borderRadius: '20px', textAlign: 'center', minWidth: '200px'
            });

            const valueEl = createElement('div', '', stat.value);
            valueEl.style.fontSize = '4rem';
            valueEl.style.fontWeight = '900';
            card.appendChild(valueEl);

            const labelEl = createElement('div', '', stat.label);
            labelEl.style.fontSize = '1.5rem';
            labelEl.style.opacity = '0.9';
            card.appendChild(labelEl);

            scene.appendChild(card);
            await wait(200);
        }
        await wait(BEAT);
    },

    'icon-grid': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.gap = '2rem';

        if (item.title) {
            const titleEl = createElement('h1', 'slide-up', item.title);
            scene.appendChild(titleEl);
            await wait(300);
        }

        const grid = createElement('div', '');
        Object.assign(grid.style, {
             display: 'grid', gridTemplateColumns: `repeat(${item.columns || 4}, 1fr)`,
             gap: '2rem', padding: '1rem'
        });

        for (const icon of item.icons) {
            const iconCard = createElement('div', 'pop-in');
            Object.assign(iconCard.style, {
                 display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
            });

            const iconEl = createElement('div', '', icon.icon);
            iconEl.style.fontSize = '3rem';
            iconCard.appendChild(iconEl);

            const labelEl = createElement('div', '', icon.label);
            labelEl.style.fontSize = '1.2rem';
            labelEl.style.textAlign = 'center';
            iconCard.appendChild(labelEl);

            grid.appendChild(iconCard);
            await wait(100);
        }
        scene.appendChild(grid);
        await wait(BEAT);
    },

    'code-block': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.gap = '1rem';

        if (item.title) {
            const titleEl = createElement('h2', 'slide-up', item.title);
            scene.appendChild(titleEl);
            await wait(200);
        }

        const codeContainer = createElement('div', 'pop-in');
        Object.assign(codeContainer.style, {
             backgroundColor: '#1e1e1e', borderRadius: '15px', padding: '2rem',
             fontFamily: 'monospace', fontSize: '1.5rem', maxWidth: '90%', overflow: 'auto'
        });

        const pre = createElement('pre', '', '');
        pre.style.margin = '0';
        pre.style.color = '#d4d4d4';
        codeContainer.appendChild(pre);
        scene.appendChild(codeContainer);

        const lines = item.code.split('\n');
        for (const line of lines) {
            pre.textContent += line + '\n';
            await wait(item.typeSpeed || 100);
        }
        await wait(BEAT);
    },

    'pulse': async (scene, item) => {
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
             position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
        });

        for (let i = 0; i < 3; i++) {
            const ring = createElement('div', '');
            Object.assign(ring.style, {
                 position: 'absolute', width: '200px', height: '200px',
                 border: '3px solid #590867', borderRadius: '50%',
                 animation: `pulse-ring 1.5s ease-out infinite`,
                 animationDelay: `${i * 0.3}s`, opacity: '0'
            });
            wrapper.appendChild(ring);
        }

        const centerEl = createElement('div', 'pop-in', item.icon || '🚀');
        centerEl.style.fontSize = '5rem';
        centerEl.style.zIndex = '10';
        wrapper.appendChild(centerEl);

        scene.appendChild(wrapper);

        if (item.title) {
            await wait(300);
            const titleEl = createElement('h1', 'slide-up', item.title);
            scene.appendChild(titleEl);
        }
        if (item.sub) {
            await wait(200);
            const subEl = createElement('p', 'slide-up', item.sub);
            scene.appendChild(subEl);
        }
        await wait(SLOW_BEAT);
    },

    'reveal-list': async (scene, item) => {
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.gap = '1rem';

        if (item.title) {
            const titleEl = createElement('h1', 'slide-up', item.title);
            scene.appendChild(titleEl);
            await wait(400);
        }

        for (let i = 0; i < item.items.length; i++) {
            const itemEl = createElement('h2', 'slide-in-left', item.items[i]);
            Object.assign(itemEl.style, {
                 fontSize: '2.5rem', padding: '0.5rem 2rem',
                 backgroundColor: 'rgba(89, 8, 103, 0.3)', borderRadius: '10px',
                 animationDelay: `${i * 0.1}s`
            });
            scene.appendChild(itemEl);
            await wait(300);
        }
        await wait(BEAT);
    },

    'spotlight': async (scene, item) => {
        const bgColor = item.color || getRandomSpotlightColor();
        const fontColor = item.fontColor || item.textColor || getContrastColor(bgColor);
        scene.style.background = `radial-gradient(circle at center, ${bgColor} 0%, #000 70%)`;

        const iconEl = createElement('div', 'zoom-out', item.icon || '⭐');
        iconEl.style.fontSize = '8rem';
        iconEl.style.color = item.iconColor || fontColor;
        scene.appendChild(iconEl);

        await wait(300);

        const titleEl = createElement('h1', 'pop-in', item.title);
        titleEl.style.fontSize = '4rem';
        titleEl.style.color = fontColor;
        scene.appendChild(titleEl);

        if (item.sub) {
            await wait(200);
            const subEl = createElement('p', 'slide-up', item.sub);
            subEl.style.fontSize = '2rem';
            subEl.style.color = fontColor;
            scene.appendChild(subEl);
        }

        await wait(item.duration || SLOW_BEAT);
    },

    'matrix': async (scene, item) => {
        scene.style.overflow = 'hidden';
        scene.style.position = 'relative';

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const columns = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < columns; i++) {
            const column = createElement('div', '');
            Object.assign(column.style, {
                position: 'absolute', left: `${i * 20}px`, top: `-${Math.random() * 500}px`,
                color: '#00ff00', fontFamily: 'monospace', fontSize: '16px',
                animation: `matrix-fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
            });

            let text = '';
            for (let j = 0; j < 30; j++) {
                text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
            }
            column.innerHTML = text;
            scene.appendChild(column);
        }

        await wait(500);

        const overlay = createElement('div', 'pop-in', item.title || 'WELCOME TO THE MATRIX');
        Object.assign(overlay.style, {
             position: 'absolute', fontSize: '4rem', fontWeight: '900',
             textShadow: '0 0 20px #00ff00', zIndex: '100'
        });
        scene.appendChild(overlay);

        await wait(SLOW_BEAT);
    },

    'final': async (scene, item) => {
        const wrapper = createElement('div', 'zoom-out');
        Object.assign(wrapper.style, {
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             gap: '2rem', width: '100%'
        });

        const h1 = createElement('h1', '', item.title);
        h1.style.fontSize = '4.5rem';
        h1.style.margin = '0';
        h1.style.textAlign = 'right';
        wrapper.appendChild(h1);

        const sep = createElement('div', '');
        Object.assign(sep.style, {
             width: '6px', height: '5rem', backgroundColor: item.color || '#fff'
        });
        wrapper.appendChild(sep);

        const subDiv = createElement('div', '', item.sub);
        subDiv.style.display = 'flex';
        subDiv.style.alignItems = 'center';

        // Check for images and style them
        const imgs = subDiv.querySelectorAll('img');
        imgs.forEach(img => {
            img.style.height = '3.5rem';
            img.style.width = 'auto';
            img.style.margin = '0';
            img.style.verticalAlign = 'middle';
        });
        
        wrapper.appendChild(subDiv);
        scene.appendChild(wrapper);
        await wait(3000);
    },

    // ==================== NEW ANIMATIONS ====================

    'kinetic-bold': async (scene, item) => {
        // Massive text that slams into view
        const wrapper = createElement('div', 'zoom-out'); // Reuse zoom-out but customize
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        
        const h1 = createElement('h1', '', item.text || item.title);
        Object.assign(h1.style, {
            fontSize: '12rem', fontWeight: '900', lineHeight: '0.9',
            textTransform: 'uppercase', letterSpacing: '-0.05em'
        });
        
        // Custom keyframe for slam effect
        h1.animate([
            { transform: 'scale(5)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fill: 'forwards'
        });
        
        wrapper.appendChild(h1);
        
        if (item.sub) {
            const sub = createElement('p', 'slide-up', item.sub);
            sub.style.fontSize = '3rem';
            sub.style.marginTop = '2rem';
            wrapper.appendChild(sub);
        }
        
        scene.appendChild(wrapper);
        await wait(FAST_BEAT);
    },

    'shutter-reveal': async (scene, item) => {
        // Text behind slats that rotate to reveal
        const container = createElement('div', '');
        container.style.position = 'relative';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        
        const text = item.text || item.title;
        const h1 = createElement('h1', '', text);
        h1.style.fontSize = '6rem';
        h1.style.opacity = '1';
        container.appendChild(h1);
        
        // Create shutters
        const shutterCount = 5;
        const shutterContainer = createElement('div', '');
        Object.assign(shutterContainer.style, {
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', pointerEvents: 'none'
        });
        
        for(let i=0; i<shutterCount; i++) {
            const slat = createElement('div', '');
            Object.assign(slat.style, {
                flex: 1, backgroundColor: 'var(--bg-color)', 
                transformOrigin: 'left',
                borderRight: '1px solid var(--bg-color)' // slight overlap
            });
            
            // Animate slat opening
            slat.animate([
                 { transform: 'scaleX(1)' },
                 { transform: 'scaleX(0)' }
            ], {
                duration: 600,
                delay: i * 100,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            shutterContainer.appendChild(slat);
        }
        
        container.appendChild(shutterContainer);
        scene.appendChild(container);
        await wait(FAST_BEAT);
    },

    'stack-echo': async (scene, item) => {
        // Based on "iPhone SE" stacked/echo text effect
        // Three lines: Top (Fade), Center (Bold), Bottom (Fade)
        
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center',
            position: 'relative'
        });

        const text = item.text || item.title || "TEXT";
        
        // Helper to create the lines
        const createLine = (content, opacity, role) => {
            const div = createElement('h1', '', content);
            Object.assign(div.style, {
                margin: '0', 
                lineHeight: '0.85', // Tight stacking
                textTransform: 'uppercase',
                fontSize: '8rem',
                fontWeight: '900',
                opacity: opacity,
                color: role === 'main' ? 'var(--text-color)' : 'grey', // Fallback color
                position: 'relative',
                zIndex: role === 'main' ? '10' : '1'
            });
            if (role !== 'main') {
                // Slightly blur standard echo lines? 
                // Image didn't show blur, just opacity/color change.
                // div.style.filter = 'blur(1px)';
            }
            return div;
        };

        const top = createLine(text, '0.4', 'top');
        const main = createLine(text, '1.0', 'main');
        const bottom = createLine(text, '0.4', 'bottom');

        // Initial positions (condensed behind main)
        // We will animate them sliding out vertically
        
        // Hide mainly to start animation
        top.style.transform = 'translateY(100%)';
        bottom.style.transform = 'translateY(-100%)';
        
        // Add to wrapper
        wrapper.appendChild(top);
        wrapper.appendChild(main);
        wrapper.appendChild(bottom);
        
        scene.appendChild(wrapper);
        
        // Animate
        // Main pops in
        main.animate([
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 400, fill: 'forwards', easing: 'ease-out' });
        
        await wait(200);

        // Top slides up
        top.animate([
            { transform: 'translateY(100%)' },
            { transform: 'translateY(0)' }
        ], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.19, 1, 0.22, 1)' });

        // Bottom slides down
        bottom.animate([
            { transform: 'translateY(-100%)' },
            { transform: 'translateY(0)' }
        ], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.19, 1, 0.22, 1)' });

        if (item.sub) {
            await wait(400);
            const sub = createElement('p', 'slide-up', item.sub);
            sub.style.marginTop = '2rem';
            scene.appendChild(sub);
        }

        await wait(SLOW_BEAT);
    },

    'kinetic-sequence': async (scene, item) => {
        // Rapid fire sequence with high impact (Stomp effect)
        // Best for: "FAST. SECURE. RELIABLE."
        
        // We need to manage the container directly to allow full screen flashes
        // But to play nice with 'playScene' which creates 'scene', 
        // we can just use the scene element provided.
        // We will clear the scene for each word.
        
        scene.style.backgroundColor = item.bg || '#000';
        scene.style.color = item.color || '#fff';
        
        for (const seqItem of item.items) {
             scene.innerHTML = ''; // Next word
             
             const text = typeof seqItem === 'string' ? seqItem : seqItem.text;
             const bg = (typeof seqItem === 'object' && seqItem.bg) ? seqItem.bg : (item.bg || '#000');
             const color = (typeof seqItem === 'object' && seqItem.color) ? seqItem.color : (item.color || '#fff');
             const duration = (typeof seqItem === 'object' && seqItem.duration) ? seqItem.duration : 400;
             
             scene.style.backgroundColor = bg;
             scene.style.color = color;
             
             const h1 = createElement('h1', '', text);
             h1.style.fontSize = '12rem'; 
             h1.style.fontWeight = '900';
             h1.style.lineHeight = '0.9';
             h1.style.textTransform = 'uppercase';
             
             scene.appendChild(h1);
             
             // Stomping animation (Large to Normal)
             h1.animate([
                 { transform: 'scale(2.5)', opacity: 0 },
                 { transform: 'scale(1)', opacity: 1 }
             ], { 
                 duration: 250, 
                 easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                 fill: 'forwards' 
             });
             
             await wait(duration);
        }
    },

    'duo-slide': async (scene, item) => {
        // Two huge words sliding in from left and right to lock in center
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        scene.style.overflow = 'hidden';

        const d1 = createElement('div', '', item.top);
        const d2 = createElement('div', '', item.bottom);
        
        const commonStyle = {
             fontSize: '10rem', fontWeight: '900', textTransform: 'uppercase',
             lineHeight: '0.8', position: 'relative', margin: '0'
        };
        
        Object.assign(d1.style, commonStyle);
        Object.assign(d2.style, commonStyle);
        
        // Initial state
        d1.style.transform = 'translateX(-150%)';
        d2.style.transform = 'translateX(150%)';
        
        if (item.color1) d1.style.color = item.color1;
        if (item.color2) d2.style.color = item.color2;
        
        scene.appendChild(d1);
        scene.appendChild(d2);
        
        await wait(100);

        // Animate
        const timing = { duration: 800, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' };
        
        d1.animate([{ transform: 'translateX(-150%)' }, { transform: 'translateX(0)' }], timing);
        d2.animate([{ transform: 'translateX(150%)' }, { transform: 'translateX(0)' }], timing);
        
        if (item.sub) {
             await wait(600);
             const p = createElement('p', 'slide-up', item.sub);
             p.style.marginTop = '2rem';
             scene.appendChild(p);
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-burst': async (scene, item) => {
        // Inspired by iPhone SE promo: Black on White -> Burst -> White on Black
        scene.style.backgroundColor = '#fff';
        scene.style.color = '#000';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        scene.style.overflow = 'hidden';
        
        const text = item.text || item.title;
        
        // 1. Initial State: Clean Black Text
        const main = createElement('h1', '', text);
        Object.assign(main.style, {
            fontSize: '10rem', fontWeight: '900', textTransform: 'uppercase',
            lineHeight: '0.8', position: 'relative', zIndex: '10', margin: '0',
            color: '#000'
        });
        scene.appendChild(main);
        
        await wait(600); 

        // 2. Burst Echoes
        const echoes = [];
        const offsets = [-1.2, -0.6, 0.6, 1.2]; // vertical offsets in em
        
        for (const off of offsets) {
            const echo = main.cloneNode(true);
            Object.assign(echo.style, {
                position: 'absolute', zIndex: '1', opacity: '0.8',
                transform: 'translateY(0)', color: '#000'
            });
            scene.appendChild(echo);
            
            // Animate expansion & blur
            echo.animate([
                { transform: 'translateY(0)', opacity: 0.8, filter: 'blur(0px)' },
                { transform: `translateY(${off}em)`, opacity: 0, filter: 'blur(4px)' }
            ], {
                duration: 400,
                easing: 'ease-out',
                fill: 'forwards'
            });
            echoes.push(echo);
        }
        
        await wait(350); 
        
        // 3. Invert Snap
        scene.style.backgroundColor = '#000';
        main.style.color = '#fff';
        
        // Remove echoes instantly for the snap effect
        echoes.forEach(e => e.remove());
        
        // Visual Pop Impact
        main.animate([
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ], { duration: 150 });
        
        if (item.sub) {
             await wait(300);
             const sub = createElement('p', 'slide-up', item.sub);
             sub.style.marginTop = '2rem';
             sub.style.color = '#fff';
             scene.appendChild(sub);
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-drop': async (scene, item) => {
        // "Coming Soon" drop effect with motion blur/tilt from iPhone SE
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        // 1. Title ("COMING") - Tilted and Slammed
        const title = createElement('h1', '', item.title || 'COMING');
        Object.assign(title.style, {
            fontSize: '12rem', fontWeight: '900', textTransform: 'uppercase',
            lineHeight: '0.8', zIndex: '10', position: 'relative',
            transformOrigin: 'center center'
        });
        scene.appendChild(title);
        
        const tilt = item.tilt !== undefined ? item.tilt : -5;
        
        title.animate([
            { transform: 'scale(3) rotate(0deg)', opacity: 0, filter: 'blur(10px)' },
            { transform: `scale(1) rotate(${tilt}deg)`, opacity: 1, filter: 'blur(0px)' }
        ], { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
        
        await wait(250);
        
        // 2. Sub ("SOON") - Drops with heavy motion blur
        if (item.sub) {
            const sub = createElement('h1', '', item.sub);
             Object.assign(sub.style, {
                fontSize: '12rem', fontWeight: '900', textTransform: 'uppercase',
                lineHeight: '0.8', zIndex: '1', color: item.subColor || '#888',
                marginTop: '-0.2em' // Tight stack
            });
            
            scene.appendChild(sub);
            
            sub.animate([
                { transform: `rotate(${tilt}deg) translateY(-80%)`, opacity: 0, filter: 'blur(20px)' },
                { transform: `rotate(${tilt}deg) translateY(0)`, opacity: 1, filter: 'blur(0px)' }
            ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-annotation': async (scene, item) => {
        // Replicates "Apple has a plan ^ AND A PROMISE" style
        // Clean main text, with a handwritten annotation popping in
        
        scene.style.backgroundColor = item.bg || '#f2f2f2'; // Light gray background
        scene.style.color = '#000';
        scene.style.display = 'flex';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const wrapper = createElement('div', '');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'baseline'; // Align text baselines
        wrapper.style.flexWrap = 'wrap'; // Allow wrapping for long sentences
        wrapper.style.justifyContent = 'center';
        wrapper.style.maxWidth = '90%';
        
        // 1. Icon (Optional)
        if (item.icon) {
            const icon = createElement('span', '', item.icon);
            icon.style.fontSize = '8rem';
            icon.style.marginRight = '2rem';
            wrapper.appendChild(icon);
        }

        // 2. Main Text
        // Force Uppercase for impact
        const textContent = item.text.replace('^', '').trim(); // Remove caret marker for main text? No, user might want split.
        // Actually, previous logic didn't split text by caret in the DOM. It just appended the caret. 
        // Let's assume the caret is inserted logically or visual.
        // The previous implementation appended "text" then "caret" then "note".
        // This implies the text needs to be split if the caret is in the middle.
        
        // BETTER LOGIC: Split by '^'
        const parts = item.text.split('^');
        
        const mainText = createElement('h1', '', parts[0]);
        Object.assign(mainText.style, {
            fontSize: '7rem', fontWeight: '900', 
            letterSpacing: '-0.05em', margin: '0',
            fontFamily: 'var(--font-main)',
            textTransform: 'uppercase'
        });
        wrapper.appendChild(mainText);

        scene.appendChild(wrapper);

        // Animate Main Text In
        wrapper.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 600, easing: 'ease-out' });

        await wait(800);

        // 3. The Caret ^
        // Insert caret relative to where it should be.
        // If we want it inline:
        const caret = createElement('div', '', '^');
        Object.assign(caret.style, {
            position: 'relative', // Inline
            color: '#00d044', // Bright green
            fontSize: '6rem',
            fontWeight: 'bold',
            fontFamily: '"Permanent Marker", cursive',
            zIndex: '10',
            marginLeft: '0.2em', marginRight: '0.2em'
        });
        
        wrapper.appendChild(caret);
        
        // Caret Pop
        caret.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });

        // If there is a second part of text (after caret)
        if (parts[1]) {
             const secondText = createElement('h1', '', parts[1]);
             Object.assign(secondText.style, {
                fontSize: '7rem', fontWeight: '900', 
                letterSpacing: '-0.05em', margin: '0',
                fontFamily: 'var(--font-main)',
                textTransform: 'uppercase'
            });
            wrapper.appendChild(secondText);
            
            // Animate 2nd part? OR Just have it there?
            // "Apple has a plan" (wait) ^ "AND A PROMISE"
            // Usually the caret inserts something.
            // If the text is present, maybe the caret implies the annotation refers to it?
            // Let's reveal the second part with the first for now (already appended).
             secondText.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 600, easing: 'ease-out' });
        }

        await wait(200);

        // 4. Handwritten Annotation
        if (item.annotation) {
            const note = createElement('span', '', item.annotation); 
            Object.assign(note.style, {
                position: 'relative', // Flow naturally instead of absolute
                color: '#00d044',
                fontSize: '4rem',
                fontFamily: '"Permanent Marker", cursive',
                whiteSpace: 'nowrap',
                marginLeft: '0.4em', // Gap from text
                transform: 'rotate(-5deg)',
                alignSelf: 'center' // Align with text
            });
            
            wrapper.appendChild(note);

            note.animate([
                { clipPath: 'polygon(0 0, 0 100%, 0 100%, 0 0)' },
                { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }
            ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-underline': async (scene, item) => {
        // Green background, white text, black marker underline
        scene.style.backgroundColor = item.bg || '#00C853'; // Apple-ish Green
        scene.style.color = '#fff';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            fontSize: '8rem', fontWeight: '900', 
            fontFamily: 'var(--font-main)',
            position: 'relative', display: 'flex', alignItems: 'baseline', gap: '0.3em'
        });
        
        const spanText = createElement('span', '', item.text || '');
        const spanHigh = createElement('span', '', item.highlight || '');
        spanHigh.style.position = 'relative'; 
        
        wrapper.appendChild(spanText);
        wrapper.appendChild(spanHigh);
        scene.appendChild(wrapper);
        
        // Slide Up Fade In
        wrapper.animate([
            { opacity: 0, transform: 'translateY(40px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
        
        await wait(700);
        
        // Create SVG Underline
        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns, "svg");
        svg.setAttribute("viewBox", "0 0 100 20");
        svg.setAttribute("preserveAspectRatio", "none");
        Object.assign(svg.style, {
            position: 'absolute', bottom: '-10px', left: '-5%', 
            width: '110%', height: '25px',
            overflow: 'visible', pointerEvents: 'none'
        });
        
        const path = document.createElementNS(svgns, "path");
        // A slight arch/messy line
        path.setAttribute("d", "M0,10 Q50,20 100,5"); 
        path.setAttribute("stroke", item.markColor || "#000");
        path.setAttribute("stroke-width", "8");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("fill", "none");
        
        // Prepare draw animation
        const len = 150;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        
        svg.appendChild(path);
        spanHigh.appendChild(svg);
        
        // Draw it
        path.animate([
            { strokeDashoffset: len },
            { strokeDashoffset: 0 }
        ], { duration: 350, easing: 'ease-out', fill: 'forwards' });
        
        await wait(SLOW_BEAT);
    },

    'kinetic-wobble-align': async (scene, item) => {
        // Scattered words align into sentence
        // Ref: "it's also how they're made"
        // Start: Black text, scattered/angled positions
        // End: White text (except highlight), Aligned, Highlight word changes font
        
        scene.style.backgroundColor = item.bg || '#00C853';
        scene.style.display = 'flex';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        scene.style.overflow = 'hidden';

        const words = (item.text || '').split(' ');
        const highlightIndex = item.highlightIndex || 2; // Default to 3rd word "how"
        
        const wordEls = [];
        
        // Wrapper to hold them for final alignment check
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            display: 'flex', gap: '0.4em', alignItems: 'baseline',
            position: 'relative'
        });
        scene.appendChild(wrapper);

        // CREATE WORDS
        words.forEach((w, i) => {
            const el = createElement('span', '', w);
            Object.assign(el.style, {
                fontSize: '7rem', fontWeight: '900', 
                fontFamily: 'var(--font-main)',
                color: '#000', // Initial color
                display: 'inline-block',
                transformOrigin: 'center center'
            });
            
            // Random scatter start state
            // We want them to visually start chaotic but be in the DOM flow for easier final target calculation?
            // Or we force absolute then move to relative? 
            // Web Animations API "flip" technique is best here.
            
            wrapper.appendChild(el);
            wordEls.push(el);
        });

        // 1. SCATTER PHASE (Using Transforms)
        // We will animate FROM a scattered state TO the default (0,0) state.
        
        wordEls.forEach((el, i) => {
            // Generate random offsets
            const y = (Math.random() - 0.5) * 150; // +/- 75px
            const r = (Math.random() - 0.5) * 40;  // +/- 20deg
            const x = (Math.random() - 0.5) * 50;
            
            // Apply initial scattered look instantly? Or animate to it?
            // The request implies "It's also how... -> Snap"
            // So let's start them scattered.
            
            // We set the initial chaotic state keyframe
            el.animate([
                { transform: `translate(${x}px, ${y}px) rotate(${r}deg)`, color: '#000' },
                { transform: 'translate(0, 0) rotate(0)', color: i === highlightIndex ? '#000' : '#fff' }
            ], {
                duration: 800,
                delay: i * 50, // Slight ripple
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-ish snap
                fill: 'forwards'
            });

            // Special handling for the Highlight Word (Change font mid-flight or at end?)
            // The image shows a font change.
            if (i === highlightIndex) {
                 setTimeout(() => {
                     el.style.fontFamily = '"Permanent Marker", cursive';
                     el.style.transform = 'scale(1.1)'; // Slight bump size
                     
                     // Add underline
                     const u = document.createElement('div');
                     Object.assign(u.style, {
                         height: '6px', background: '#fff', 
                         width: '100%', position: 'absolute', bottom: '-10px', left: 0,
                         borderRadius: '4px'
                     });
                     el.appendChild(u);
                     
                 }, 400); // Change halfway through snap
            }
        });
        
        await wait(SLOW_BEAT + 500);
    },

    'kinetic-arrow-cycle': async (scene, item) => {
        // "Hundreds of [Target]" with sketching arrows (green marker style)
        scene.style.backgroundColor = item.bg || '#f2f2f2';
        scene.style.color = '#000';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            display: 'flex', alignItems: 'center', gap: '0.4em',
            fontSize: '7rem', fontWeight: '900', fontFamily: 'var(--font-main)',
            flexWrap: 'wrap', justifyContent: 'center'
        });
        
        const prefix = createElement('span', '', item.prefix || 'Hundreds of');
        const targetWrapper = createElement('div', '');
        Object.assign(targetWrapper.style, {
            position: 'relative', minWidth: '150px', display: 'flex', justifyContent: 'center'
        });
        
        wrapper.appendChild(prefix);
        wrapper.appendChild(targetWrapper);
        scene.appendChild(wrapper);
        
        await wait(200);

        // Helper to draw random hand-drawn looking arrow
        const svgns = "http://www.w3.org/2000/svg";
        
        const addArrow = (svg, angleDeg, distance, curvature = 0) => {
            const rad = angleDeg * (Math.PI / 180);
            const ex = 0; // End X (center relative to text)
            const ey = 0; // End Y
            
            // Start point
            const sx = Math.cos(rad) * distance;
            const sy = Math.sin(rad) * distance;
            
            // Control point for curve (randomize slightly)
            const cx = (sx + ex) / 2 + (Math.random()-0.5)*curvature; 
            const cy = (sy + ey) / 2 + (Math.random()-0.5)*curvature;
            
            const path = document.createElementNS(svgns, "path");
            // Quadratic curve D: M start Q control end
            path.setAttribute("d", `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`);
            path.setAttribute("stroke", "#00C853");
            path.setAttribute("stroke-width", "8");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            
            // Manual Arrowhead (Wings) logic
            // Tangent at end (for Quadratic Bezier at t=1 is P2 - P1 i.e. End - Control)
            const tx = ex - cx;
            const ty = ey - cy;
            const endAngle = Math.atan2(ty, tx);
            
            const headLen = 25;
            const wing1x = ex - headLen * Math.cos(endAngle - Math.PI/6);
            const wing1y = ey - headLen * Math.sin(endAngle - Math.PI/6);
            const wing2x = ex - headLen * Math.cos(endAngle + Math.PI/6);
            const wing2y = ey - headLen * Math.sin(endAngle + Math.PI/6);
            
            // Append arrowhead to path D
            const d = path.getAttribute("d");
            path.setAttribute("d", `${d} M${wing1x},${wing1y} L${ex},${ey} L${wing2x},${wing2y}`);
            
            const len = 600;
            path.style.strokeDasharray = len;
            path.style.strokeDashoffset = len;
            
            svg.appendChild(path);
            
            path.animate([
                { strokeDashoffset: len },
                { strokeDashoffset: 0 }
            ], { duration: 400 + Math.random()*200, easing: 'ease-out', fill: 'forwards' });
        };

        // Loop through items
        for (const [idx, wordItem] of item.items.entries()) {
            // Clear old
            targetWrapper.innerHTML = '';
            
            // Text
            const text = createElement('span', '', wordItem.text);
            targetWrapper.appendChild(text);
            
            // Animate text in
            text.animate([
                { opacity: 0, transform: 'scale(0.8) translateY(20px)', filter: 'blur(10px)' },
                { opacity: 1, transform: 'scale(1) translateY(0)', filter: 'blur(0px)' }
            ], { duration: 400, easing: 'back-out' });
            
            // SVG Container for Arrows
            const svg = document.createElementNS(svgns, "svg");
             Object.assign(svg.style, {
                position: 'absolute', top: '50%', left: '50%',
                width: '800px', height: '800px', // Large canvas
                transform: 'translate(-50%, -50%)', pointerEvents: 'none',
                overflow: 'visible', zIndex: '1'
            });
            targetWrapper.appendChild(svg);
            
            // Logic based on type
            const type = wordItem.type || 'straight';
            if (type === 'straight') {
                addArrow(svg, 180, 200, 20); // From Left
            } else if (type === 'curve') {
                 // From top-left looping
                addArrow(svg, 225, 220, 150); 
            } else if (type === 'chaos') {
                // "Followers/Testers" - Everywhere
                for(let k=0; k<8; k++) {
                    addArrow(svg, k * 45 + Math.random()*20, 280 + Math.random()*40, 80);
                }
            } else if (type === 'multi') {
                 // 3 arrows
                 addArrow(svg, 160, 250, 50);
                 addArrow(svg, 200, 250, 50);
                 addArrow(svg, 130, 250, 50);
            }
            
            await wait(1400); // Read time
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-insert-arrow': async (scene, item) => {
        // "But it's [STILL] not enough"
        // Black background, white text
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        scene.style.display = 'flex';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        scene.style.overflow = 'visible';
        
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            display: 'flex', alignItems: 'baseline', gap: '0.3em',
            fontSize: '8rem', fontWeight: '900', fontFamily: 'var(--font-main)',
            position: 'relative'
        });
        scene.appendChild(wrapper);

        const w1 = createElement('span', '', 'But');
        const w2 = createElement('span', '', "it's");
        const gap = createElement('div', '', '');
        gap.style.width = '0.5em'; // Space for insertion
        gap.style.position = 'relative';
        const w3 = createElement('span', '', 'not enough');

        // 1. Reveal "But"
        wrapper.appendChild(w1);
        w1.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400 });
        await wait(400);

        // 2. Reveal "it's"
        wrapper.appendChild(w2);
        w2.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400 });
        wrapper.appendChild(gap); // Add gap
        await wait(200);

        // 3. Green Annotation "STILL" + Arrow
        const annotation = createElement('div', '');
        Object.assign(annotation.style, {
            position: 'absolute', top: '-1.8em', left: '60%', 
            transform: 'translateX(-50%) rotate(-5deg)',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        });
        
        const noteText = createElement('span', '', 'STILL');
        Object.assign(noteText.style, {
            color: '#00C853', fontFamily: '"Permanent Marker", cursive',
            fontSize: '5rem', lineHeight: '1', whiteSpace: 'nowrap'
        });
        
        // Underline for STILL
        const noteLine = document.createElement('div');
        Object.assign(noteLine.style, {
            width: '100%', height: '5px', backgroundColor: '#00C853',
            borderRadius: '2px', marginTop: '5px'
        });

        annotation.appendChild(noteText);
        annotation.appendChild(noteLine);
        gap.appendChild(annotation); // Attach to gap for positioning? 
        
        // Animate Annotation In
        annotation.animate([
            { opacity: 0, transform: 'translateX(-50%) rotate(-5deg) scale(0.5)' },
            { opacity: 1, transform: 'translateX(-50%) rotate(-5deg) scale(1)' }
        ], { duration: 300, easing: 'back-out' });

        await wait(300);

        // Arrow from annotation to gap
        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns, "svg");
        Object.assign(svg.style, {
            position: 'absolute', top: '20px', left: '-50px',
            width: '150px', height: '150px', overflow: 'visible',
            pointerEvents: 'none'
        });
        
        const path = document.createElementNS(svgns, "path");
        // Curved arrow pointing down-left
        path.setAttribute("d", "M100,0 Q60,20 60,80");
        path.setAttribute("stroke", "#00C853");
        path.setAttribute("stroke-width", "6");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        
        // Arrow head
        const d = path.getAttribute("d");
        path.setAttribute("d", `${d} M40,60 L60,80 L80,60`); // Simple head

        const len = 200;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        
        svg.appendChild(path);
        annotation.appendChild(svg); // Append to annotation wrapper
        
        path.animate([
            { strokeDashoffset: len },
            { strokeDashoffset: 0 }
        ], { duration: 300, easing: 'ease-out', fill: 'forwards' });

        await wait(500);

        // 4. Reveal "not enough"
        wrapper.appendChild(w3);
        w3.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400 });
        
    },

    'kinetic-url-reveal': async (scene, item) => {
        // "apple.com" -> "apple.com/2030" style
        scene.style.backgroundColor = item.bg || '#f2f2f2';
        scene.style.color = '#000';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const wrapper = createElement('div', '');
        Object.assign(wrapper.style, {
            display: 'flex', alignItems: 'baseline',
            fontSize: '8rem', fontWeight: '900', fontFamily: 'var(--font-main)',
            letterSpacing: '-0.04em'
        });
        scene.appendChild(wrapper);

        // 1. Base Text
        const base = createElement('span', '', item.text);
        wrapper.appendChild(base);
        
        base.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 500, easing: 'ease-out' });
        
        await wait(600);
        
        // 2. Suffix (Colored)
        if (item.suffix) {
            const suffix = createElement('span', '', item.suffix);
            suffix.style.color = item.highlightColor || '#00C853';
            // suffix.style.marginLeft = '0.05em'; // Connected or slight gap? Images show connected
            
            wrapper.appendChild(suffix);
            
            // Typing/Reveal effect for suffix (Slide out from behind or just wipe?)
            // Image implies a simple appearance.
            suffix.animate([
                { clipPath: 'inset(0 100% 0 0)', transform: 'translateY(0)' },
                { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)' }
            ], { duration: 800, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'forwards' });
        }
        
        await wait(SLOW_BEAT);
    },

    'kinetic-names': async (scene, item) => {
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        scene.style.display = 'flex';
        scene.style.flexDirection = 'column';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const greetings = [
            'Hello', 'Hola', 'Bonjour', 'Ciao', 'Olá', 
            'Namaste', 'Salaam', '안녕', 'Hallo', 'Hej', 'Guten Tag'
        ];
        
        const helloEl = createElement('h1', '', '');
        Object.assign(helloEl.style, {
            fontSize: '10rem', fontWeight: '900', margin: '0',
            fontFamily: 'var(--font-main)', lineHeight: '1'
        });
        scene.appendChild(helloEl);
        
        for (const word of greetings) {
            helloEl.textContent = word;
            await wait(120); 
        }
        
        scene.style.backgroundColor = '#fff';
        scene.style.color = '#000';
        helloEl.style.color = '#000';
        helloEl.textContent = 'Hello Everyone';
        
        helloEl.animate([
             { transform: 'scale(1.5)', opacity: 0 },
             { transform: 'scale(1)', opacity: 1 }
        ], { duration: 500, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
        
        await wait(1200);
        
        if (item.sub) {
            const sub = createElement('p', 'slide-up', item.sub);
            sub.style.fontSize = '2.5rem';
            sub.style.color = '#555';
            sub.style.marginTop = '2rem';
            sub.style.textAlign = 'center';
            sub.style.maxWidth = '80%';
            sub.innerHTML = item.sub; 
            scene.appendChild(sub);
            
            helloEl.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-50px)' }
            ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
            
            await wait(2000);
        }
        
        const colors = ['#FF3B30', '#007AFF', '#FF9500', '#5856D6', '#4CD964'];
        
        for (const [i, name] of item.names.entries()) {
            scene.innerHTML = '';
            
            const bg = colors[i % colors.length];
            scene.style.backgroundColor = bg;
            scene.style.color = '#fff';
            
            const header = createElement('div', '', 'MEET');
            Object.assign(header.style, {
                fontSize: '3rem', fontWeight: '700', opacity: '0.8',
                marginBottom: '1rem', textTransform: 'uppercase'
            });
            scene.appendChild(header);
            
            const nameEl = createElement('h1', '', name);
            Object.assign(nameEl.style, {
                fontSize: '12rem', fontWeight: '900', lineHeight: '0.9',
                textTransform: 'uppercase'
            });
            scene.appendChild(nameEl);
            
            nameEl.animate([
                { transform: 'scale(0.5)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
            
            await wait(900); 
        }
        
        scene.innerHTML = '';
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        
        const suffix = createElement('h1', 'pop-in', item.suffix);
        suffix.style.fontSize = '6rem';
        suffix.style.textAlign = 'center';
        suffix.style.maxWidth = '80%';
        scene.appendChild(suffix);
        
        await wait(2000);
    },

    'kinetic-flash-zoom': async (scene, item) => {
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        scene.style.display = 'flex';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        scene.style.overflow = 'hidden';
        
        const t1 = createElement('h1', '', item.text1 || 'TOOLS');
        t1.style.fontSize = '4rem'; 
        t1.style.fontWeight = '700';
        scene.appendChild(t1);
        
        t1.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(60)', opacity: 0 } 
        ], { duration: 1000, easing: 'cubic-bezier(0.7, 0, 0.84, 0)', fill: 'forwards' });
        
        await wait(850);
        
        scene.innerHTML = '';
        scene.style.backgroundColor = '#fff';
        scene.style.color = '#000';
        
        const t2 = createElement('h1', '', item.joiner || '&');
        t2.style.fontSize = '15rem';
        t2.style.fontWeight = '900';
        scene.appendChild(t2);
        
        await wait(300); 
        
        scene.innerHTML = '';
        scene.style.backgroundColor = '#000';
        scene.style.color = '#fff';
        
        const t3 = createElement('h1', '', item.text2 || 'SERVICES');
        Object.assign(t3.style, {
             fontSize: '25rem',
             fontWeight: '900',
             lineHeight: '0.75',
             textAlign: 'center',
             letterSpacing: '-0.06em'
        });
        scene.appendChild(t3);
        
        t3.animate([
            { transform: 'scale(4)', opacity: 0, filter: 'blur(10px)' },
            { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }
        ], { duration: 600, easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)' });
        
        await wait(1500);
    },

    'kinetic-typing': async (scene, item) => {
        scene.style.backgroundColor = item.bg || '#fff';
        scene.style.color = item.color || '#000';
        scene.style.display = 'flex';
        scene.style.alignItems = 'center';
        scene.style.justifyContent = 'center';
        
        const text = createElement('h1', '', '');
        Object.assign(text.style, {
            fontSize: '8rem', fontWeight: '900', 
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'pre',
            borderRight: '0.1em solid currentColor'
        });
        scene.appendChild(text);
        
        const content = item.text || "Typewriter";
        
        for (let i = 0; i <= content.length; i++) {
            text.textContent = content.slice(0, i);
            await wait(50 + Math.random() * 50);
        }
        
        const blink = text.animate([
            { borderRightColor: 'currentColor' },
            { borderRightColor: 'transparent' }
        ], { duration: 500, iterations: Infinity });
        
        await wait(1500); 
        blink.cancel();
    }
};

async function playScene(item) {
    container.innerHTML = '';
    
    // Default scene setup
    const scene = createElement('div', `scene ${item.invert ? 'invert' : ''}`);
    if (item.invert) {
        scene.style.backgroundColor = 'white';
        scene.style.color = 'black';
    }
    if (item.bg) scene.style.backgroundColor = item.bg;
    if (item.color) scene.style.color = item.color;
    
    container.appendChild(scene);
    
    // Force reflow for initial state
    void scene.offsetWidth;
    scene.classList.add('active');

    const handler = ANIMATIONS[item.type];
    if (handler) {
        await handler(scene, item);
    } else {
        console.warn(`Unknown animation type: ${item.type}`);
        // Fallback to simple title
        await ANIMATIONS['title'](scene, { ...item, slide: false });
    }
}

async function runAnimation() {
    await wait(500);
    if (!data || data.length === 0) {
        console.log("No data loaded, waiting...");
        await wait(1000);
        if(!data) {
             // Fallback for demo if json fails
             data = [
                 { type: 'title', title: 'Start', sub: 'Loading data failed...' }
             ];
        }
    }
    
    for (const item of data) {
        try {
            await playScene(item);
        } catch (err) {
            console.error(`Error playing scene ${item.type}:`, err);
        }
    }
}

// Start the show
runAnimation();
