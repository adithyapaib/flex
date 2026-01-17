
/**
 * Flex.js - Kinetic Typography & Animation Engine
 * A simple, neo-brutalist automation library for web animations.
 */

class Flex {
    constructor(containerId, options = {}) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        if (!this.container) throw new Error(`Flex: Container not found`);
        
        // Mobile/Showcase Fix: Use container queries for sizing
        if (!this.container.style.containerType) {
            this.container.style.containerType = 'inline-size';
        }

        this.options = {
            beat: 1500,
            fastBeat: 1200,
            slowBeat: 2500,
            ...options
        };

        this.ctx = {
            wait: this.wait.bind(this),
            createElement: this.createElement.bind(this),
            getContrastColor: this.getContrastColor.bind(this),
            getSize: this.getSize.bind(this),
            beat: this.options.beat,
            fastBeat: this.options.fastBeat,
            slowBeat: this.options.slowBeat,
            getRandomSpotlightColor: this.getRandomSpotlightColor.bind(this)
        };

        this.animations = {}; // Registry
        this.registerDefaultAnimations();
        
        this.isPlaying = false;
        this.abortController = null;
    }

    // ==========================================
    // Public API
    // ==========================================

    register(name, handler) {
        this.animations[name] = handler;
    }

    async play(playlist) {
        if (this.isPlaying) this.stop();
        this.isPlaying = true;
        this.abortController = new AbortController();
        const signal = this.abortController.signal;

        try {
            if (Array.isArray(playlist)) {
                for (const item of playlist) {
                    if (signal.aborted) break;
                    await this.playScene(item, signal);
                }
            } else {
                await this.playScene(playlist, signal);
            }
        } catch (err) {
            if (err.message !== 'Aborted') console.error(err);
        } finally {
            this.isPlaying = false;
        }
    }

    stop() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
        this.isPlaying = false;
    }

    // ==========================================
    // Internal Helpers
    // ==========================================

    async playScene(item, signal) {
        const type = item.type || 'scene';
        const handler = this.animations[type];
        
        if (!handler) {
            console.warn(`Flex: Animation type '${type}' not found.`);
            return;
        }

        // Setup Scene Container
        const sceneEl = this.createElement('div', 'scene active');
        
        // Standardized Global Styling
        sceneEl.style.backgroundColor = item.background || '#000000'; 
        if (item.backgroundImage) {
            sceneEl.style.backgroundImage = `url('${item.backgroundImage}')`;
            sceneEl.style.backgroundSize = item.backgroundSize || 'cover';
            sceneEl.style.backgroundPosition = item.backgroundPosition || 'center';
            sceneEl.style.backgroundRepeat = item.backgroundRepeat || 'no-repeat';
        }
        
        sceneEl.style.color = item.color || '#ffffff';
        sceneEl.style.fontFamily = item.fontFamily || 'Inter';
        sceneEl.style.textTransform = 'uppercase';
        
        if (item.invert) {
            sceneEl.classList.add('invert');
        }

        this.container.innerHTML = '';
        this.container.appendChild(sceneEl);

        const controlledCtx = {
            ...this.ctx,
            wait: (ms) => this.wait(ms, signal)
        };

        await handler(sceneEl, item, controlledCtx);
    }

    async wait(ms, signal) {
        return new Promise((resolve, reject) => {
            if (signal?.aborted) return reject(new Error('Aborted'));
            
            const timer = setTimeout(resolve, ms);
            
            if (signal) {
                signal.addEventListener('abort', () => {
                    clearTimeout(timer);
                    reject(new Error('Aborted'));
                }, { once: true });
            }
        });
    }

    createElement(tag, className, text = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.innerHTML = text;
        return el;
    }

    getContrastColor(hex) {
        if (!hex) return '#ffffff';
        let sanitized = hex.toString().trim().replace('#', '');
        if (sanitized.length === 3) sanitized = sanitized.split('').map(c => c + c).join('');
        if (sanitized.length !== 6) return '#ffffff';
        const r = parseInt(sanitized.slice(0, 2), 16);
        const g = parseInt(sanitized.slice(2, 4), 16);
        const b = parseInt(sanitized.slice(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155 ? '#0b0b0b' : '#ffffff';
    }

    getSize(val, defaultVal) {
        if (val === undefined || val === null || val === '') return defaultVal;

        // If explicitly a number (e.g. 10), treat as rem but make it responsive.
        if (/^-?\d+(\.\d+)?$/.test(val)) {
            // Use CQW (Container Query Width) so it works in small boxes (Showcase) AND full screen
            // 100cqw = 100% of container width
            // 15cqw is roughly 15% of width.
            return `min(${val}rem, 18cqw)`; 
        }
        return val;
    }
    
    getRandomSpotlightColor() {
        const palette = [
            '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181',
            '#AA96DA', '#FF9F43', '#00D9FF', '#A8E6CF', '#FF78C4',
            '#6C5CE7', '#00B894', '#E17055', '#0984E3', '#FDCB6E'
        ];
        return palette[Math.floor(Math.random() * palette.length)];
    }

    // ==========================================
    // Standardized Animations
    // Props: text, sub, background, color, subColor, accent, secondaryBackground, secondaryColor
    // ==========================================
    
    registerDefaultAnimations() {
        const { wait, createElement, getContrastColor, getRandomSpotlightColor, getSize, beat, fastBeat, slowBeat } = this.ctx;

        this.animations = {
            'Introduction Cycle': async (scene, item, ctx) => {
                const words = item.words || item.names || ["Hello", "Welcome"];
                
                // Allow overrides, but default to white/black for this specific style unless specified
                if (!item.background) scene.style.backgroundColor = 'white';
                if (!item.color) scene.style.color = 'black';

                const h1 = ctx.createElement('h1', 'typing-line', item.text || item.title || "Welcome");
                h1.style.fontFamily = 'var(--font-main)';
                h1.style.fontWeight = '900';
                h1.style.fontSize = ctx.getSize(item.fontSize, '6rem');
                h1.style.lineHeight = '1.1';
                
                // Measure
                document.body.appendChild(h1);
                h1.style.position = 'absolute'; h1.style.visibility = 'hidden'; h1.style.width = 'auto';
                const w1 = h1.offsetWidth;
                document.body.removeChild(h1);
                
                h1.style.position = ''; h1.style.visibility = ''; h1.style.width = '0px';
                h1.style.setProperty('--target-width', (w1 + 10) + 'px');

                h1.classList.add('typing-active');
                scene.appendChild(h1);
                await ctx.wait(1500);
                h1.classList.remove('typing-active');
                h1.classList.add('typing-done');

                if (item.sub) {
                    const p = ctx.createElement('p', 'slide-up', item.sub);
                    p.style.fontSize = '1.8rem';
                    p.style.marginBottom = '2rem';
                    p.style.color = item.subColor || '#333';
                    scene.appendChild(p);
                    await ctx.wait(1500);
                }

                // Cycle
                const sentenceDiv = ctx.createElement('div', 'pop-in');
                sentenceDiv.style.cssText = 'display:flex; align-items:baseline; font-size:5rem; font-weight:800; gap:1rem; justify-content:center; flex-wrap:wrap;';
                
                const cyclerWrapper = ctx.createElement('div', 'word-cycler-wrapper');
                const cyclerList = ctx.createElement('div', '');
                cyclerList.style.display = 'flex';
                cyclerList.style.flexDirection = 'column';
                cyclerList.style.textAlign = 'center';

                const cycleWords = [...words, words[0]]; 
                for (const word of cycleWords) {
                    const span = ctx.createElement('div', '', word);
                    span.style.color = item.accent || '#590867'; 
                    cyclerList.appendChild(span);
                }

                cyclerWrapper.appendChild(cyclerList);
                sentenceDiv.appendChild(cyclerWrapper);
                if (item.suffix) sentenceDiv.appendChild(ctx.createElement('div', '', item.suffix));

                scene.appendChild(sentenceDiv);

                const count = cycleWords.length;
                cyclerList.animate([
                    { transform: 'translateY(0)' },
                    { transform: `translateY(-${100 * (count - 1) / count}%)` }
                ], {
                    duration: 2000 * (count - 1),
                    iterations: Infinity,
                    easing: `steps(${count - 1}, end)` 
                });

                await ctx.wait(4000);
            },

            'Title': async (scene, item, ctx) => {
                const animClass = item.slide ? 'slide-in-left' : 'pop-in';
                const h1 = ctx.createElement('h1', animClass, item.text || item.title);
                h1.style.fontSize = ctx.getSize(item.fontSize, '5rem');
                scene.appendChild(h1);
                if (item.sub) {
                    await ctx.wait(200);
                    const p = ctx.createElement('p', 'slide-up', item.sub);
                    p.style.color = item.subColor || 'inherit';
                    scene.appendChild(p);
                }
                await ctx.wait(item.duration || ctx.beat);
            },

            'Kinetic Bold': async (scene, item, ctx) => {
                const wrapper = ctx.createElement('div', 'zoom-out');
                wrapper.style.cssText = 'display:flex; flex-direction:column; align-items:center;';
                
                const h1 = ctx.createElement('h1', '', item.text || item.title);
                h1.style.cssText = `font-size:${ctx.getSize(item.fontSize, '12rem')}; font-weight:900; line-height:0.9; text-transform:uppercase; letter-spacing:-0.05em;`;
                
                h1.animate([
                    { transform: 'scale(5)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 600, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
                
                wrapper.appendChild(h1);
                if (item.sub) {
                    const sub = ctx.createElement('p', 'slide-up', item.sub);
                    sub.style.cssText = `font-size:${ctx.getSize(item.subSize, '3rem')}; margin-top:2rem; color:${item.subColor || 'inherit'};`;
                    wrapper.appendChild(sub);
                }
                scene.appendChild(wrapper);
                await ctx.wait(ctx.fastBeat);
            },

            'Kinetic Burst': async (scene, item, ctx) => {
                // Initial State
                scene.style.backgroundColor = item.background || '#fff';
                scene.style.color = item.color || '#000';
                scene.style.cssText += 'display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden;';
                
                const text = item.text || item.title;
                const main = ctx.createElement('h1', '', text);
                main.style.cssText = `font-size:${ctx.getSize(item.fontSize, '10rem')}; font-weight:900; text-transform:uppercase; line-height:0.8; position:relative; z-index:10; margin:0; color:inherit;`;
                scene.appendChild(main);
                
                await ctx.wait(600); 

                const echoes = [];
                const offsets = [-1.2, -0.6, 0.6, 1.2];
                for (const off of offsets) {
                    const echo = main.cloneNode(true);
                    echo.style.position = 'absolute'; echo.style.zIndex = '1'; echo.style.opacity = '0.8';
                    scene.appendChild(echo);
                    echo.animate([
                        { transform: 'translateY(0)', opacity: 0.8, filter: 'blur(0px)' },
                        { transform: `translateY(${off}em)`, opacity: 0, filter: 'blur(4px)' }
                    ], { duration: 400, easing: 'ease-out', fill: 'forwards' });
                    echoes.push(echo);
                }
                
                await ctx.wait(350); 
                
                // Burst Switched State: Uses secondaryBackground / secondaryColor
                scene.style.backgroundColor = item.secondaryBackground || '#000';
                main.style.color = item.secondaryColor || '#fff';
                echoes.forEach(e => e.remove());
                
                main.animate([{ transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 150 });
                
                if (item.sub) {
                    await ctx.wait(300);
                    const sub = ctx.createElement('p', 'slide-up', item.sub);
                    sub.style.cssText = `margin-top:2rem; color:${item.secondaryColor || '#fff'}; font-size:${ctx.getSize(item.subSize, '2rem')}`;
                    scene.appendChild(sub);
                }
                await ctx.wait(ctx.slowBeat);
            },
               
             'Matrix': async (scene, item, ctx) => {
                scene.style.overflow = 'hidden';
                scene.style.position = 'relative'; 
                scene.style.backgroundColor = item.background || 'black';

                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
                const columns = Math.floor(window.innerWidth / 20);
                const rainColor = item.accent || '#00ff00';

                for (let i = 0; i < columns; i++) {
                    const column = ctx.createElement('div', '');
                    column.style.cssText = `position:absolute; left:${i * 20}px; top:-${Math.random() * 500}px; color:${rainColor}; font-family:monospace; font-size:16px;`;
                    column.style.animation = `matrix-fall ${2 + Math.random() * 3}s linear infinite`;
                    column.style.animationDelay = `${Math.random() * 2}s`;

                    let text = '';
                    for (let j = 0; j < 30; j++) text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
                    column.innerHTML = text;
                    scene.appendChild(column);
                }

                await ctx.wait(500);
                const overlay = ctx.createElement('div', 'pop-in', item.text || item.title || 'MATRIX');
                // The 'color' prop controls the big text
                overlay.style.cssText = `position:absolute; font-size:${ctx.getSize(item.fontSize, '4rem')}; font-weight:900; text-shadow:0 0 20px ${rainColor}; z-index:100; color: ${item.color || '#fff'};`;
                scene.appendChild(overlay);
                await ctx.wait(ctx.slowBeat);
            },
            
            'Spotlight': async (scene, item, ctx) => {
                const bgColor = item.background || ctx.getRandomSpotlightColor();
                const fontColor = item.color || ctx.getContrastColor(bgColor);
                scene.style.background = `radial-gradient(circle at center, ${bgColor} 0%, #000 70%)`;
                
                // Icon Color -> Accent or Font
                const iconColor = item.accent || fontColor;

                const iconEl = ctx.createElement('div', 'zoom-out', item.icon || '⭐');
                iconEl.style.fontSize = '8rem';
                iconEl.style.color = iconColor;
                scene.appendChild(iconEl);

                await ctx.wait(300);

                const titleEl = ctx.createElement('h1', 'pop-in', item.text || item.title || 'Spotlight');
                titleEl.style.fontSize = '4rem';
                titleEl.style.color = fontColor;
                scene.appendChild(titleEl);

                if (item.sub) {
                    await ctx.wait(200);
                    const subEl = ctx.createElement('p', 'slide-up', item.sub);
                    subEl.style.fontSize = '2rem';
                    subEl.style.color = fontColor;
                    scene.appendChild(subEl);
                }

                await ctx.wait(item.duration || ctx.slowBeat);
            },

            'Title Zoom': async (scene, item, ctx) => {
                const h1 = ctx.createElement('h1', 'zoom-out', item.text || item.title);
                if (item.sub) {
                    h1.innerHTML += `<br/><span style="font-size: 0.5em;">${item.sub}</span>`;
                }
                scene.appendChild(h1);
                await ctx.wait(item.duration || ctx.beat);
            },

            'Mask Reveal': async (scene, item, ctx) => {
                const h1 = ctx.createElement('h1', 'mask-reveal', item.text || item.title);
                h1.style.fontSize = ctx.getSize(item.fontSize, '8rem');
                scene.appendChild(h1);
                await ctx.wait(ctx.fastBeat);
            },

            'Glitch Text': async (scene, item, ctx) => {
                const wrapper = ctx.createElement('div', 'pop-in');
                wrapper.style.display = 'flex';
                wrapper.style.justifyContent = 'center';
                wrapper.style.flexDirection = 'column';
                wrapper.style.alignItems = 'center';

                const h1 = ctx.createElement('h1', 'glitch', item.text || item.title);
                wrapper.appendChild(h1);
                
                if (item.sub) {
                    await ctx.wait(200);
                    const p = ctx.createElement('p', 'slide-up', item.sub);
                    p.style.color = item.subColor || 'inherit';
                    wrapper.appendChild(p);
                }
                
                scene.appendChild(wrapper);
                await ctx.wait(ctx.beat);
            },

            'Split': async (scene, item, ctx) => {
                const h1 = ctx.createElement('h1', 'slide-up', item.title1 || item.top);
                scene.appendChild(h1);
                await ctx.wait(200);
                const h2 = ctx.createElement('h1', 'slide-up', item.title2 || item.bottom);
                h2.style.marginTop = '1rem';
                scene.appendChild(h2);
                if (item.sub) {
                    await ctx.wait(200);
                    const p = ctx.createElement('p', 'pop-in', item.sub);
                    p.style.color = item.subColor || 'inherit';
                    scene.appendChild(p);
                }
                await ctx.wait(ctx.beat);
            },
            
            'Grid List': async (scene, item, ctx) => {
                scene.style.display = 'grid'; 
                scene.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
                scene.style.gap = '2rem';
                scene.style.alignContent = 'center';
                
                const items = item.items || [];
                for (const text of items) {
                    const div = ctx.createElement('h1', 'zoom-out', text);
                    div.style.fontSize = '4rem';
                    scene.appendChild(div);
                    await ctx.wait(300);
                }
                await ctx.wait(ctx.fastBeat);
            },

            'Info Card': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.gap = '1.5rem';

                const iconEl = ctx.createElement('div', 'pop-in', item.icon);
                iconEl.style.fontSize = '6rem';
                scene.appendChild(iconEl);
                await ctx.wait(200);

                const titleEl = ctx.createElement('h1', 'slide-up', item.text || item.title);
                titleEl.style.fontSize = '4rem';
                titleEl.style.marginBottom = '1rem';
                scene.appendChild(titleEl);
                await ctx.wait(200);

                const bulletContainer = ctx.createElement('div', '');
                bulletContainer.style.display = 'flex';
                bulletContainer.style.flexDirection = 'column';
                bulletContainer.style.gap = '0.8rem';
                bulletContainer.style.alignItems = 'center';
                
                const bullets = item.bullets || [];
                for (const bullet of bullets) {
                    const bulletEl = ctx.createElement('p', 'slide-up', `• ${bullet}`);
                    bulletEl.style.fontSize = '2rem';
                    bulletEl.style.opacity = '0.9';
                    bulletContainer.appendChild(bulletEl);
                    await ctx.wait(150);
                }
                scene.appendChild(bulletContainer);
                await ctx.wait(ctx.beat);
            },

            'Counter': async (scene, item, ctx) => {
                const h1 = ctx.createElement('h1', 'pop-in', '');
                h1.style.fontSize = ctx.getSize(item.fontSize, '8rem');
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
                    await ctx.wait(stepTime);
                }
                h1.textContent = end + (item.suffix || '');

                if (item.label) {
                    const label = ctx.createElement('p', 'slide-up', item.label);
                    label.style.fontSize = '2.5rem';
                    scene.appendChild(label);
                }
                await ctx.wait(ctx.fastBeat);
            },

            'Kinetic Drop': async (scene, item, ctx) => {
                const title = ctx.createElement('h1', '', item.text || item.title || 'COMING');
                title.style.cssText = `font-size:${ctx.getSize(item.fontSize, '10rem')}; fontWeight:900; text-transform:uppercase; lineHeight:0.8; zIndex:10; position:relative; transformOrigin:center center; text-align:center;`;
                scene.appendChild(title);
                
                const tilt = item.tilt !== undefined ? item.tilt : -5;
                
                title.animate([
                    { transform: 'scale(3) rotate(0deg)', opacity: 0, filter: 'blur(10px)' },
                    { transform: `scale(1) rotate(${tilt}deg)`, opacity: 1, filter: 'blur(0px)' }
                ], { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
                
                await ctx.wait(250);
                
                if (item.sub) {
                    const sub = ctx.createElement('h1', '', item.sub);
                    sub.style.cssText = `font-size:${ctx.getSize(item.subSize, '8rem')}; fontWeight:900; text-transform:uppercase; lineHeight:0.8; zIndex:1; color:${item.subColor || '#888'}; marginTop:-0.2em; text-align:center;`;
                    scene.appendChild(sub);
                    
                    sub.animate([
                        { transform: `rotate(${tilt}deg) translateY(-80%)`, opacity: 0, filter: 'blur(20px)' },
                        { transform: `rotate(${tilt}deg) translateY(0)`, opacity: 1, filter: 'blur(0px)' }
                    ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
                }
                
                await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Sequence': async (scene, item, ctx) => {
                const items = item.items || [];
                for (const seqItem of items) {
                     scene.innerHTML = ''; 
                     
                     const text = typeof seqItem === 'string' ? seqItem : seqItem.text;
                     const bg = (typeof seqItem === 'object' && seqItem.bg) ? seqItem.bg : (item.background || '#000');
                     const color = (typeof seqItem === 'object' && seqItem.color) ? seqItem.color : (item.color || '#fff');
                     const duration = (typeof seqItem === 'object' && seqItem.duration) ? seqItem.duration : 400;
                     
                     scene.style.backgroundColor = bg;
                     scene.style.color = color;
                     
                     const h1 = ctx.createElement('h1', '', text);
                    h1.style.fontSize = ctx.getSize(item.fontSize, '10rem'); 
                     h1.style.fontWeight = '900';
                     h1.style.lineHeight = '0.9';
                     h1.style.textTransform = 'uppercase';
                     
                     scene.appendChild(h1);
                     
                     h1.animate([
                         { transform: 'scale(2.5)', opacity: 0 },
                         { transform: 'scale(1)', opacity: 1 }
                     ], { 
                         duration: 250, 
                         easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                         fill: 'forwards' 
                     });
                     
                     await ctx.wait(duration);
                }
            },

            'Spotlight': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                scene.style.textAlign = 'center';

                // Spotlight Effect
                const accent = item.accent || 'rgba(255,255,255,0.15)';
                scene.style.background = `radial-gradient(circle at center, ${accent} 0%, ${item.background || '#000'} 70%)`;

                if (item.icon) {
                    const icon = ctx.createElement('img', '', '');
                    icon.src = item.icon;
                    icon.style.cssText = 'height: 15vh; margin-bottom: 2rem; object-fit: contain; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));';
                    scene.appendChild(icon);

                    icon.animate([
                        { transform: 'scale(0) translateY(50px)', opacity: 0 },
                        { transform: 'scale(1) translateY(0)', opacity: 1 }
                    ], { duration: 600, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });

                    await ctx.wait(300);
                }

                if (item.text) {
                    const h1 = ctx.createElement('h1', '', item.text);
                    h1.style.cssText = `font-size:${ctx.getSize(item.fontSize, '5rem')}; font-weight:900; line-height:1; margin-bottom:0.5rem; text-transform:uppercase; text-shadow: 0 4px 10px rgba(0,0,0,0.3);`;
                    scene.appendChild(h1);

                    h1.animate([
                        { transform: 'translateY(20px)', opacity: 0, filter: 'blur(10px)' },
                        { transform: 'translateY(0)', opacity: 1, filter: 'blur(0px)' }
                    ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
                }

                if (item.sub) {
                    const p = ctx.createElement('p', '', item.sub);
                    p.style.cssText = `font-size:${ctx.getSize(item.subSize, '2rem')}; font-weight:500; opacity:0;`;
                    scene.appendChild(p);

                    await ctx.wait(200);
                    p.animate([
                        { transform: 'translateY(10px)', opacity: 0 },
                        { transform: 'translateY(0)', opacity: 0.8 }
                    ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
                }

                await ctx.wait(item.duration || 2000);
            },

            'Progress Bar': async (scene, item, ctx) => {
                const titleEl = ctx.createElement('h1', 'slide-up', item.text || item.title);
                titleEl.style.marginBottom = '2rem';
                titleEl.style.color = item.fontColor || '#fff';
                scene.appendChild(titleEl);
                await ctx.wait(300);

                const barContainer = ctx.createElement('div', '');
                barContainer.style.width = '80%';
                barContainer.style.height = '40px';
                barContainer.style.backgroundColor = 'rgba(255,255,255,0.2)';
                barContainer.style.borderRadius = '20px';
                barContainer.style.overflow = 'hidden';

                const barFill = ctx.createElement('div', '');
                barFill.style.height = '100%';
                barFill.style.width = '0%';
                barFill.style.backgroundColor = item.color || '#00ff88';
                barFill.style.borderRadius = '20px';
                barFill.style.transition = 'width 1.5s ease-out';

                barContainer.appendChild(barFill);
                scene.appendChild(barContainer);

                await ctx.wait(100);
                barFill.style.width = (item.percent || 100) + '%';

                if (item.sub) {
                    await ctx.wait(500);
                    const subEl = ctx.createElement('p', 'slide-up', item.sub);
                    scene.appendChild(subEl);
                }
                await ctx.wait(ctx.slowBeat);
            },

            'Counter': async (scene, item, ctx) => {
                const h1 = ctx.createElement('h1', 'pop-in', '');
                h1.style.fontSize = ctx.getSize(item.fontSize, '10rem');
                h1.style.fontWeight = '900';
                scene.appendChild(h1);

                const start = parseInt(item.start) || 0;
                const end = parseInt(item.end) || 100;
                const duration = parseInt(item.duration) || 2000;
                const steps = 30;
                const stepTime = duration / steps;
                const increment = (end - start) / steps;

                let current = start;
                for (let i = 0; i <= steps; i++) {
                    h1.textContent = Math.round(current) + (item.suffix || '');
                    current += increment;
                    await ctx.wait(stepTime);
                }
                h1.textContent = end + (item.suffix || '');

                if (item.label) {
                    const label = ctx.createElement('p', 'slide-up', item.label);
                    label.style.fontSize = '2.5rem';
                    if (item.labelFont) label.style.fontFamily = item.labelFont;
                    scene.appendChild(label);
                }
                await ctx.wait(ctx.fastBeat);
            },

            'Flip Cards': async (scene, item, ctx) => {
                scene.style.flexDirection = 'row';
                scene.style.flexWrap = 'wrap';
                scene.style.gap = '2rem';
                scene.style.justifyContent = 'center';

                const cards = item.cards || [];
                for (const card of cards) {
                    const cardWrapper = ctx.createElement('div', 'flip-card pop-in');
                    cardWrapper.style.width = '200px';
                    cardWrapper.style.height = '250px';
                    cardWrapper.style.perspective = '1000px';

                    const cardInner = ctx.createElement('div', 'flip-card-inner');
                    cardInner.style.cssText = 'position:relative; width:100%; height:100%; transition:transform 0.6s; transform-style:preserve-3d;';

                    const front = ctx.createElement('div', '', card.front);
                    front.style.cssText = 'position:absolute; width:100%; height:100%; backface-visibility:hidden; background-color:#333; display:flex; align-items:center; justify-content:center; font-size:4rem; border-radius:15px;';

                    const back = ctx.createElement('div', '', card.back);
                    back.style.cssText = 'position:absolute; width:100%; height:100%; backface-visibility:hidden; background-color:#590867; transform:rotateY(180deg); display:flex; align-items:center; justify-content:center; font-size:1.5rem; padding:1rem; text-align:center; border-radius:15px;';

                    cardInner.appendChild(front);
                    cardInner.appendChild(back);
                    cardWrapper.appendChild(cardInner);
                    scene.appendChild(cardWrapper);
                    await ctx.wait(200);
                }

                await ctx.wait(500);
                const allCards = scene.querySelectorAll('.flip-card-inner');
                allCards.forEach(c => c.style.transform = 'rotateY(180deg)');
                await ctx.wait(ctx.slowBeat);
            },

            'Timeline': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'flex-start';
                scene.style.padding = '2rem 4rem';

                const titleEl = ctx.createElement('h1', 'slide-in-left', item.text || item.title);
                titleEl.style.marginBottom = '2rem';
                scene.appendChild(titleEl);
                await ctx.wait(300);

                const timelineContainer = ctx.createElement('div', '');
                timelineContainer.style.display = 'flex';
                timelineContainer.style.flexDirection = 'column';
                timelineContainer.style.gap = '1rem';
                timelineContainer.style.borderLeft = '4px solid #590867';
                timelineContainer.style.paddingLeft = '2rem';

                const events = item.events || [];
                for (const event of events) {
                    const eventEl = ctx.createElement('div', 'slide-in-left');
                    eventEl.style.display = 'flex';
                    eventEl.style.alignItems = 'center';
                    eventEl.style.gap = '1rem';

                    const dot = ctx.createElement('div', '');
                    dot.style.cssText = 'width:16px; height:16px; background-color:#590867; border-radius:50%; margin-left:-2.5rem;';

                    const timeEl = ctx.createElement('span', '', event.time);
                    timeEl.style.cssText = 'font-weight:700; font-size:1.5rem; min-width:100px;';

                    const textEl = ctx.createElement('span', '', event.text);
                    textEl.style.fontSize = '1.8rem';

                    eventEl.appendChild(dot);
                    eventEl.appendChild(timeEl);
                    eventEl.appendChild(textEl);
                    timelineContainer.appendChild(eventEl);
                    await ctx.wait(250);
                }
                scene.appendChild(timelineContainer);
                await ctx.wait(ctx.beat);
            },

            'Quote': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.padding = '3rem';

                const quoteEl = ctx.createElement('h1', 'pop-in', `"${item.text}"`);
                quoteEl.style.cssText = 'font-size:3.5rem; font-style:italic; font-weight:400; text-align:center; line-height:1.4;';
                scene.appendChild(quoteEl);

                if (item.author) {
                    await ctx.wait(500);
                    const authorEl = ctx.createElement('p', 'slide-up', `— ${item.author}`);
                    authorEl.style.cssText = 'font-size:2rem; opacity:0.8; margin-top:2rem;';
                    scene.appendChild(authorEl);
                }
                await ctx.wait(ctx.slowBeat);
            },

            'Comparison': async (scene, item, ctx) => {
                scene.style.flexDirection = 'row';
                scene.style.gap = '2rem';
                scene.style.padding = '2rem';

                // Left
                const leftSide = ctx.createElement('div', 'slide-in-left');
                leftSide.style.cssText = 'flex:1; background-color:rgba(255,0,0,0.2); padding:2rem; border-radius:20px; display:flex; flex-direction:column; align-items:center;';

                const leftTitle = ctx.createElement('h2', '', item.left?.title || 'Left');
                leftTitle.style.cssText = 'font-size:2.5rem; margin-bottom:1rem;';
                leftSide.appendChild(leftTitle);

                const leftPoints = item.left?.points || [];
                for (const point of leftPoints) {
                    const p = ctx.createElement('p', '', `❌ ${point}`);
                    p.style.cssText = 'font-size:1.5rem; margin:0.5rem 0;';
                    leftSide.appendChild(p);
                }
                scene.appendChild(leftSide);

                await ctx.wait(300);

                // VS
                const vsEl = ctx.createElement('div', 'pop-in', 'VS');
                vsEl.style.cssText = 'font-size:3rem; font-weight:900; align-self:center;';
                scene.appendChild(vsEl);

                await ctx.wait(300);

                // Right
                const rightSide = ctx.createElement('div', 'slide-in-right');
                rightSide.style.cssText = 'flex:1; background-color:rgba(0,255,0,0.2); padding:2rem; border-radius:20px; display:flex; flex-direction:column; align-items:center;';

                const rightTitle = ctx.createElement('h2', '', item.right?.title || 'Right');
                rightTitle.style.cssText = 'font-size:2.5rem; margin-bottom:1rem;';
                rightSide.appendChild(rightTitle);

                const rightPoints = item.right?.points || [];
                for (const point of rightPoints) {
                    const p = ctx.createElement('p', '', `✅ ${point}`);
                    p.style.cssText = 'font-size:1.5rem; margin:0.5rem 0;';
                    rightSide.appendChild(p);
                }
                scene.appendChild(rightSide);

                await ctx.wait(ctx.slowBeat);
            },

            'Stat Cards': async (scene, item, ctx) => {
                scene.style.flexDirection = 'row';
                scene.style.flexWrap = 'wrap';
                scene.style.gap = '2rem';
                scene.style.justifyContent = 'center';

                const stats = item.stats || [];
                for (const stat of stats) {
                    const card = ctx.createElement('div', 'pop-in');
                    card.style.cssText = `background-color:${stat.bg || '#590867'}; padding:2rem 3rem; border-radius:20px; text-align:center; min-width:200px;`;

                    const valueEl = ctx.createElement('div', '', stat.value);
                    valueEl.style.cssText = 'font-size:4rem; font-weight:900;';
                    card.appendChild(valueEl);

                    const labelEl = ctx.createElement('div', '', stat.label);
                    labelEl.style.cssText = 'font-size:1.5rem; opacity:0.9;';
                    card.appendChild(labelEl);

                    scene.appendChild(card);
                    await ctx.wait(200);
                }
                await ctx.wait(ctx.beat);
            },

            'Icon Grid': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.gap = '2rem';

                if (item.text || item.title) {
                    const titleEl = ctx.createElement('h1', 'slide-up', item.text || item.title);
                    scene.appendChild(titleEl);
                    await ctx.wait(300);
                }

                const grid = ctx.createElement('div', '');
                grid.style.cssText = `display:grid; grid-template-columns:repeat(${item.columns || 4}, 1fr); gap:2rem; padding:1rem;`;

                const icons = item.icons || [];
                for (const icon of icons) {
                    const iconCard = ctx.createElement('div', 'pop-in');
                    iconCard.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:0.5rem;';

                    const iconEl = ctx.createElement('div', '', icon.icon);
                    iconEl.style.fontSize = '3rem';
                    iconCard.appendChild(iconEl);

                    const labelEl = ctx.createElement('div', '', icon.label);
                    labelEl.style.cssText = 'font-size:1.2rem; text-align:center;';
                    iconCard.appendChild(labelEl);

                    grid.appendChild(iconCard);
                    await ctx.wait(100);
                }
                scene.appendChild(grid);
                await ctx.wait(ctx.beat);
            },

            'Code Block': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.gap = '1rem';

                if (item.text || item.title) {
                    const titleEl = ctx.createElement('h2', 'slide-up', item.text || item.title);
                    scene.appendChild(titleEl);
                    await ctx.wait(200);
                }

                const codeContainer = ctx.createElement('div', 'pop-in');
                codeContainer.style.cssText = 'background-color:#1e1e1e; border-radius:15px; padding:2rem; font-family:monospace; font-size:1.5rem; max-width:90%; overflow:auto;';

                const pre = ctx.createElement('pre', '', '');
                pre.style.cssText = 'margin:0; color:#d4d4d4;';
                codeContainer.appendChild(pre);
                scene.appendChild(codeContainer);

                const lines = (item.code || '').split('\n');
                for (const line of lines) {
                    pre.textContent += line + '\n';
                    await ctx.wait(item.typeSpeed || 50);
                }
                await ctx.wait(ctx.beat);
            },

            'Pulse': async (scene, item, ctx) => {
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = 'position:relative; display:flex; align-items:center; justify-content:center;';

                for (let i = 0; i < 3; i++) {
                    const ring = ctx.createElement('div', '');
                    ring.style.cssText = `position:absolute; width:200px; height:200px; border:3px solid #590867; border-radius:50%; animation:pulse-ring 1.5s ease-out infinite; animation-delay:${i * 0.3}s; opacity:0;`;
                    wrapper.appendChild(ring);
                }

                const centerEl = ctx.createElement('div', 'pop-in', item.icon || '🚀');
                centerEl.style.cssText = 'font-size:5rem; z-index:10;';
                wrapper.appendChild(centerEl);

                scene.appendChild(wrapper);

                if (item.text || item.title) {
                    await ctx.wait(300);
                    const titleEl = ctx.createElement('h1', 'slide-up', item.text || item.title);
                    scene.appendChild(titleEl);
                }
                if (item.sub) {
                    await ctx.wait(200);
                    const subEl = ctx.createElement('p', 'slide-up', item.sub);
                    subEl.style.color = item.subColor || 'inherit';
                    scene.appendChild(subEl);
                }
                await ctx.wait(ctx.slowBeat);
            },

            'Reveal List': async (scene, item, ctx) => {
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.gap = '1rem';

                if (item.text || item.title) {
                    const titleEl = ctx.createElement('h1', 'slide-up', item.text || item.title);
                    scene.appendChild(titleEl);
                    await ctx.wait(400);
                }

                const items = item.items || [];
                for (let i = 0; i < items.length; i++) {
                    const itemEl = ctx.createElement('h2', 'slide-in-left', items[i]);
                    itemEl.style.cssText = `font-size:2.5rem; padding:0.5rem 2rem; background-color:rgba(89, 8, 103, 0.3); border-radius:10px; animation-delay:${i * 0.1}s;`;
                    scene.appendChild(itemEl);
                    await ctx.wait(300);
                }
                await ctx.wait(ctx.beat);
            },

            'Final': async (scene, item, ctx) => {
                const wrapper = ctx.createElement('div', 'zoom-out');
                wrapper.style.cssText = 'display:flex; align-items:center; justify-content:center; gap:2rem; width:100%;';

                const h1 = ctx.createElement('h1', '', item.text || item.title || 'END');
                h1.style.cssText = 'font-size:4.5rem; margin:0; text-align:right;';
                wrapper.appendChild(h1);

                const sep = ctx.createElement('div', '');
                sep.style.cssText = `width:6px; height:5rem; background-color:${item.color || '#fff'};`;
                wrapper.appendChild(sep);

                const subDiv = ctx.createElement('div', '', item.sub || '');
                subDiv.style.cssText = `display:flex; align-items:center; color:${item.subColor || 'inherit'};`;
                
                 // Check for images and style them if they exist in HTML
                 // (Basic innerHTML allow)
                
                wrapper.appendChild(subDiv);
                scene.appendChild(wrapper);
                await ctx.wait(3000);
            },

            'Kinetic Greeting': async (scene, item, ctx) => {
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
                
                const helloEl = ctx.createElement('h1', '', '');
                Object.assign(helloEl.style, {
                    fontSize: '10rem', fontWeight: '900', margin: '0',
                    fontFamily: 'var(--font-main)', lineHeight: '1'
                });
                scene.appendChild(helloEl);
                
                for (const word of greetings) {
                    helloEl.textContent = word;
                    await ctx.wait(120); 
                }
                
                scene.style.backgroundColor = '#fff';
                scene.style.color = '#000';
                helloEl.style.color = '#000';
                helloEl.textContent = item.text || 'Hello Everyone';
                
                helloEl.animate([
                     { transform: 'scale(1.5)', opacity: 0 },
                     { transform: 'scale(1)', opacity: 1 }
                ], { duration: 500, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
                
                await ctx.wait(1200);
                
                if (item.sub) {
                    const sub = ctx.createElement('p', 'slide-up', item.sub);
                    sub.style.fontSize = '2.5rem';
                    sub.style.color = item.subColor || '#555';
                    sub.style.marginTop = '2rem';
                    sub.style.textAlign = 'center';
                    sub.style.maxWidth = '80%';
                    sub.innerHTML = item.sub; 
                    scene.appendChild(sub);
                    
                    helloEl.animate([
                        { transform: 'translateY(0)' },
                        { transform: 'translateY(-50px)' }
                    ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
                    
                    await ctx.wait(2000);
                }
            },

            'Kinetic Names': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';

                const colors = ['#FF3B30', '#007AFF', '#FF9500', '#5856D6', '#4CD964'];
                const names = item.names || ["Someone", "Anyone"];
                
                for (const [i, name] of names.entries()) {
                    scene.innerHTML = '';
                    
                    const bg = colors[i % colors.length];
                    scene.style.backgroundColor = bg;
                    scene.style.color = '#fff';
                    
                    const header = ctx.createElement('div', '', item.title || 'MEET');
                    Object.assign(header.style, {
                        fontSize: '3rem', fontWeight: '700', opacity: '0.8',
                        marginBottom: '1rem', textTransform: 'uppercase'
                    });
                    scene.appendChild(header);
                    
                    const nameEl = ctx.createElement('h1', '', name);
                    Object.assign(nameEl.style, {
                        fontSize: '12rem', fontWeight: '900', lineHeight: '0.9',
                        textTransform: 'uppercase'
                    });
                    scene.appendChild(nameEl);
                    
                    nameEl.animate([
                        { transform: 'scale(0.5)', opacity: 0 },
                        { transform: 'scale(1)', opacity: 1 }
                    ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
                    
                    await ctx.wait(900); 
                }
                
                scene.innerHTML = '';
                scene.style.backgroundColor = '#000';
                scene.style.color = '#fff';
                
                if (item.suffix) {
                    const suffix = ctx.createElement('h1', 'pop-in', item.suffix);
                    suffix.style.fontSize = '6rem';
                    suffix.style.textAlign = 'center';
                    suffix.style.maxWidth = '80%';
                    scene.appendChild(suffix);
                    await ctx.wait(2000);
                }
            },

            'Typing Scroller': async (scene, item, ctx) => {
                scene.style.alignItems = 'flex-start';
                scene.style.justifyContent = 'flex-start';
                scene.style.padding = '4rem';
                scene.style.overflow = 'hidden';
                scene.style.fontFamily = 'monospace';

                const container = ctx.createElement('div', '');
                container.style.cssText = 'width:100%; height:100%; overflow:hidden; position:relative;';
                scene.appendChild(container);

                const lines = (item.text || "Initializing...\nLoading modules...\nSystem ready.").split('\n');
                
                for (const line of lines) {
                    const p = ctx.createElement('div', '', '> ' + line);
                    p.style.cssText = 'margin-bottom:0.5rem; font-size:1.5rem; opacity:0; transform:translateY(10px);';
                    container.appendChild(p);

                    // Typewriter effect
                    p.animate([
                         { opacity: 1, transform: 'translateY(0)' }
                    ], { duration: 100, fill: 'forwards' });

                    await ctx.wait(50 + Math.random() * 50);
                    
                    // Auto scroll
                    if (container.scrollHeight > container.clientHeight) {
                         container.scrollTop = container.scrollHeight;
                    }
                }
                
                const cursor = ctx.createElement('span', 'blink', '_');
                container.appendChild(cursor);
                
                await ctx.wait(ctx.slowBeat);
            },

            'Shutter Reveal': async (scene, item, ctx) => {
                const container = ctx.createElement('div', '');
                container.style.cssText = 'position:relative; display:flex; justify-content:center; align-items:center;';
                
                const text = item.text || item.title;
                const h1 = ctx.createElement('h1', '', text);
                h1.style.fontSize = ctx.getSize(item.fontSize, '6rem');
                h1.style.opacity = '1';
                container.appendChild(h1);
                
                const shutterCount = 5;
                const shutterContainer = ctx.createElement('div', '');
                shutterContainer.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; display:flex; pointer-events:none;';
                
                for(let i=0; i<shutterCount; i++) {
                    const slat = ctx.createElement('div', '');
                    slat.style.cssText = `flex:1; background-color:${item.background || '#000'}; transform-origin:left; border-right:1px solid ${item.background || '#000'};`;
                    
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
                await ctx.wait(ctx.beat);
            },

            'Stack Echo': async (scene, item, ctx) => {
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative;';

                const text = item.text || item.title || "TEXT";
                
                const createLine = (content, opacity, role) => {
                    const div = ctx.createElement('h1', '', content);
                    div.style.cssText = `margin:0; line-height:0.85; text-transform:uppercase; font-size:${ctx.getSize(item.fontSize, '8rem')}; font-weight:900; opacity:${opacity}; color:${role === 'main' ? (item.color || '#fff') : (item.subColor || '#888')}; position:relative; z-index:${role === 'main' ? '10' : '1'};`;
                    return div;
                };

                const top = createLine(text, '0.4', 'top');
                const main = createLine(text, '1.0', 'main');
                const bottom = createLine(text, '0.4', 'bottom');

                top.style.transform = 'translateY(100%)';
                bottom.style.transform = 'translateY(-100%)';
                
                wrapper.appendChild(top);
                wrapper.appendChild(main);
                wrapper.appendChild(bottom);
                
                scene.appendChild(wrapper);
                
                main.animate([
                    { transform: 'scale(0.8)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 400, fill: 'forwards', easing: 'ease-out' });
                
                await ctx.wait(200);

                top.animate([
                    { transform: 'translateY(100%)' },
                    { transform: 'translateY(0)' }
                ], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.19, 1, 0.22, 1)' });

                bottom.animate([
                    { transform: 'translateY(-100%)' },
                    { transform: 'translateY(0)' }
                ], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.19, 1, 0.22, 1)' });

                if (item.sub) {
                    await ctx.wait(400);
                    const sub = ctx.createElement('p', 'slide-up', item.sub);
                    sub.style.marginTop = '2rem';
                    scene.appendChild(sub);
                }

                await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Annotation': async (scene, item, ctx) => {
                 scene.style.display = 'flex';
                 scene.style.alignItems = 'center';
                 scene.style.justifyContent = 'center';
                 
                 const wrapper = ctx.createElement('div', '');
                 wrapper.style.cssText = 'position:relative; display:flex; alignItems:baseline; flex-wrap:wrap; justify-content:center; max-width:90%;';
                 
                 if (item.icon) {
                     const icon = ctx.createElement('span', '', item.icon);
                     icon.style.cssText = 'font-size:8rem; margin-right:2rem;';
                     wrapper.appendChild(icon);
                 }
         
                let parts;
                if (item.textAfter) {
                    parts = [item.text || '', item.textAfter];
                } else {
                    parts = (item.text || '').split('^');
                }

                const size = ctx.getSize(item.fontSize, '7rem');
                 
                 const mainText = ctx.createElement('h1', '', parts[0]);
                mainText.style.cssText = `font-size:${size}; font-weight:900; letter-spacing:-0.05em; margin:0; text-transform:uppercase;`;
                 wrapper.appendChild(mainText);
         
                 scene.appendChild(wrapper);
         
                 wrapper.animate([
                     { opacity: 0, transform: 'translateY(20px)' },
                     { opacity: 1, transform: 'translateY(0)' }
                 ], { duration: 600, easing: 'ease-out' });
         
                 await ctx.wait(800);
         
                 // Caret
                 const caret = ctx.createElement('div', '', '^');
                caret.style.cssText = `position:relative; color:${item.accent || '#00d044'}; font-size:${size}; font-weight:bold; font-family:"Permanent Marker", cursive; z-index:10; margin-left:0.1em; margin-right:0.1em; line-height: 1;`;
                 
                 wrapper.appendChild(caret);
                 
                 caret.animate([
                     { transform: 'scale(0)', opacity: 0 },
                     { transform: 'scale(1)', opacity: 1 }
                 ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
         
                 if (parts[1]) {
                      const secondText = ctx.createElement('h1', '', parts[1]);
                      secondText.style.cssText = `font-size:${ctx.getSize(item.fontSize, '7rem')}; font-weight:900; letter-spacing:-0.05em; margin:0; text-transform:uppercase;`;
                     wrapper.appendChild(secondText);
                     
                      secondText.animate([
                         { opacity: 0, transform: 'translateY(20px)' },
                         { opacity: 1, transform: 'translateY(0)' }
                     ], { duration: 600, easing: 'ease-out' });
                 }
         
                 await ctx.wait(200);
         
                 if (item.annotation) {
                     const note = ctx.createElement('div', '', item.annotation);
                     // Changed bottom:0.8em to top:-1.2em to lift it higher
                     // Increased font-size to 0.7em for legibility
                     note.style.cssText = `position:absolute; top:-1.2em; left:50%; transform:translateX(-50%) rotate(-5deg); color:${item.accent || '#00d044'}; font-size:0.7em; font-family:"Permanent Marker", cursive; white-space:nowrap; text-shadow: 2px 2px 0px #000; pointer-events:none;`;
                     
                     caret.appendChild(note);
         
                     note.animate([
                         { opacity: 0, transform: 'translateX(-50%) rotate(-5deg) translateY(20px)' },
                         { opacity: 1, transform: 'translateX(-50%) rotate(-5deg) translateY(0)' }
                     ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
                 }
                 
                 await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Underline': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = `font-size:${ctx.getSize(item.fontSize, '8rem')}; font-weight:900; position:relative; display:flex; alignItems:baseline; gap:0.3em;`;
                
                const spanText = ctx.createElement('span', '', item.text || '');
                const spanHigh = ctx.createElement('span', '', item.highlight || '');
                spanHigh.style.position = 'relative'; 
                
                wrapper.appendChild(spanText);
                wrapper.appendChild(spanHigh);
                scene.appendChild(wrapper);
                
                wrapper.animate([
                    { opacity: 0, transform: 'translateY(40px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
                
                await ctx.wait(700);
                
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
                path.setAttribute("d", "M0,10 Q50,20 100,5"); 
                path.setAttribute("stroke", item.markColor || "#000");
                path.setAttribute("stroke-width", "8");
                path.setAttribute("stroke-linecap", "round");
                path.setAttribute("fill", "none");
                
                const len = 150;
                path.style.strokeDasharray = len;
                path.style.strokeDashoffset = len;
                
                svg.appendChild(path);
                spanHigh.appendChild(svg);
                
                path.animate([
                    { strokeDashoffset: len },
                    { strokeDashoffset: 0 }
                ], { duration: 350, easing: 'ease-out', fill: 'forwards' });
                
                await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Wobble Align': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                scene.style.overflow = 'hidden';

                const words = (item.text || '').split(' ');
                const highlightIndex = item.highlightIndex || 2;
                const wordEls = [];
                
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = 'display:flex; gap:0.4em; align-items:baseline; position:relative;';
                scene.appendChild(wrapper);

                words.forEach((w, i) => {
                    const el = ctx.createElement('span', '', w);
                    el.style.cssText = `font-size:${ctx.getSize(item.fontSize, '7rem')}; font-weight:900; color:inherit; display:inline-block; transform-origin:center center;`;
                    wrapper.appendChild(el);
                    wordEls.push(el);
                });

                wordEls.forEach((el, i) => {
                    const y = (Math.random() - 0.5) * 150;
                    const r = (Math.random() - 0.5) * 40;
                    const x = (Math.random() - 0.5) * 50;
                    
                    el.animate([
                        { transform: `translate(${x}px, ${y}px) rotate(${r}deg)`, opacity: 0.5 },
                        { transform: 'translate(0, 0) rotate(0)', opacity: 1 }
                    ], {
                        duration: 800,
                        delay: i * 50,
                        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        fill: 'forwards'
                    });

                    if (i === highlightIndex) {
                         setTimeout(() => {
                             el.style.fontFamily = '"Permanent Marker", cursive';
                             el.style.transform = 'scale(1.1)'; 
                             
                             const u = document.createElement('div');
                             Object.assign(u.style, {
                                 height: '6px', background: item.color || '#fff',
                                 width: '100%', position: 'absolute', bottom: '-10px', left: 0,
                                 borderRadius: '4px'
                             });
                             el.appendChild(u);
                         }, 400);
                    }
                });
                
                await ctx.wait(ctx.slowBeat + 500);
            },

            'Kinetic Arrow Cycle': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = `display:flex; align-items:center; gap:0.4em; font-size:${ctx.getSize(item.fontSize, '7rem')}; font-weight:900; flex-wrap:wrap; justify-content:center;`;
                
                const prefix = ctx.createElement('span', '', item.prefix || 'Hundreds of');
                const targetWrapper = ctx.createElement('div', '');
                targetWrapper.style.cssText = 'position:relative; min-width:150px; display:flex; justify-content:center;';
                
                wrapper.appendChild(prefix);
                wrapper.appendChild(targetWrapper);
                scene.appendChild(wrapper);
                
                await ctx.wait(200);

                const svgns = "http://www.w3.org/2000/svg";
                const addArrow = (svg, angleDeg, distance, curvature = 0) => {
                    const rad = angleDeg * (Math.PI / 180);
                    const sx = Math.cos(rad) * distance;
                    const sy = Math.sin(rad) * distance;
                    const cx = sx / 2 + (Math.random()-0.5)*curvature; 
                    const cy = sy / 2 + (Math.random()-0.5)*curvature;
                    
                    const path = document.createElementNS(svgns, "path");
                    path.setAttribute("d", `M${sx},${sy} Q${cx},${cy} 0,0`);
                    path.setAttribute("stroke", item.accent || "#00C853");
                    path.setAttribute("stroke-width", "8");
                    path.setAttribute("fill", "none");
                    path.setAttribute("stroke-linecap", "round");
                    
                    const len = 600;
                    path.style.strokeDasharray = len;
                    path.style.strokeDashoffset = len;
                    svg.appendChild(path);
                    
                    path.animate([
                        { strokeDashoffset: len },
                        { strokeDashoffset: 0 }
                    ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
                };

                const items = item.items || [];
                for (const wordItem of items) {
                    targetWrapper.innerHTML = '';
                    const text = ctx.createElement('span', '', wordItem.text || wordItem);
                    targetWrapper.appendChild(text);
                    
                    text.animate([
                        { opacity: 0, transform: 'scale(0.8) translateY(20px)', filter: 'blur(10px)' },
                        { opacity: 1, transform: 'scale(1) translateY(0)', filter: 'blur(0px)' }
                    ], { duration: 400, easing: 'back-out' });
                    
                    const svg = document.createElementNS(svgns, "svg");
                    svg.style.cssText = 'position:absolute; top:50%; left:50%; width:800px; height:800px; transform:translate(-50%, -50%); pointer-events:none; overflow:visible; z-index:1;';
                    targetWrapper.appendChild(svg);
                    
                    // Always add a random arrow
                    addArrow(svg, Math.random() * 360, 200, 50);
                    
                    await ctx.wait(1400); 
                }
                
                await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Insert Arrow': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                scene.style.overflow = 'visible';
                
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = `display:flex; align-items:baseline; gap:0.3em; font-size:${ctx.getSize(item.fontSize, '8rem')}; font-weight:900; position:relative;`;
                scene.appendChild(wrapper);

                const parts = (item.text || "But it's not enough").split(' ');
                const gapIndex = item.insertIndex || 2; // Insert after 2nd word
                
                for(let i=0; i<parts.length; i++) {
                    const w = ctx.createElement('span', '', parts[i]);
                    wrapper.appendChild(w);
                    w.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300 });
                    
                    if (i === gapIndex - 1) {
                        const gap = ctx.createElement('div', '', '');
                        gap.style.cssText = 'width:0.5em; position:relative;';
                        wrapper.appendChild(gap);
                        
                        // Wait a bit then insert annotation
                        await ctx.wait(500);
                        
                        const annotation = ctx.createElement('div', '');
                        annotation.style.cssText = 'position:absolute; top:-1.8em; left:50%; transform:translateX(-50%) rotate(-5deg); display:flex; flex-direction:column; align-items:center; width:300px;';
                        
                        const noteText = ctx.createElement('span', '', item.insertText || 'STILL');
                        noteText.style.cssText = `color:${item.accent || '#00C853'}; font-family:"Permanent Marker", cursive; font-size:5rem; line-height:1; white-space:nowrap;`;
                        
                        const noteLine = document.createElement('div');
                        noteLine.style.cssText = `width:100%; height:5px; background-color:${item.accent || '#00C853'}; border-radius:2px; margin-top:5px;`;

                        annotation.appendChild(noteText);
                        annotation.appendChild(noteLine);
                        gap.appendChild(annotation);
                        
                        annotation.animate([
                            { opacity: 0, transform: 'translateX(-50%) rotate(-5deg) scale(0.5)' },
                            { opacity: 1, transform: 'translateX(-50%) rotate(-5deg) scale(1)' }
                        ], { duration: 300, easing: 'back-out' });

                        // Arrow
                        const svgns = "http://www.w3.org/2000/svg";
                        const svg = document.createElementNS(svgns, "svg");
                        svg.style.cssText = 'position:absolute; top:20px; left:-50px; width:150px; height:150px; overflow:visible; pointer-events:none;';
                        
                        const path = document.createElementNS(svgns, "path");
                        path.setAttribute("d", "M100,0 Q60,20 60,80");
                        path.setAttribute("stroke", item.accent || "#00C853");
                        path.setAttribute("stroke-width", "6");
                        path.setAttribute("fill", "none");
                        
                        const len = 200;
                        path.style.strokeDasharray = len;
                        path.style.strokeDashoffset = len;
                        
                        svg.appendChild(path);
                        annotation.appendChild(svg);
                        
                        path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 300, easing: 'ease-out', fill: 'forwards' });
                        await ctx.wait(500);
                    } else {
                        await ctx.wait(200);
                    }
                }
            },
            
            'Kinetic URL Reveal': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.flexDirection = 'column';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                
                const wrapper = ctx.createElement('div', '');
                wrapper.style.cssText = `display:flex; align-items:baseline; font-size:${ctx.getSize(item.fontSize, '6rem')}; font-weight:900; letter-spacing:-0.04em;`;
                scene.appendChild(wrapper);

                const base = ctx.createElement('span', '', item.text);
                wrapper.appendChild(base);
                
                base.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 500, easing: 'ease-out' });
                
                await ctx.wait(600);
                
                if (item.suffix) {
                    const suffix = ctx.createElement('span', '', item.suffix);
                    suffix.style.color = item.highlightColor || '#00C853';
                    wrapper.appendChild(suffix);
                    
                    suffix.animate([
                        { clipPath: 'inset(0 100% 0 0)', transform: 'translateY(0)' },
                        { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)' }
                    ], { duration: 800, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'forwards' });
                }
                
                await ctx.wait(ctx.slowBeat);
            },

            'Kinetic Flash Zoom': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                scene.style.overflow = 'hidden';
                
                const t1 = ctx.createElement('h1', '', item.text1 || 'TOOLS');
                t1.style.fontSize = '4rem'; 
                t1.style.fontWeight = '700';
                scene.appendChild(t1);
                
                t1.animate([
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(60)', opacity: 0 } 
                ], { duration: 1000, easing: 'cubic-bezier(0.7, 0, 0.84, 0)', fill: 'forwards' });
                
                await ctx.wait(850);
                
                scene.innerHTML = '';
                const bg = scene.style.backgroundColor;
                const fg = scene.style.color;
                
                // Invert flash?
                scene.style.backgroundColor = fg;
                scene.style.color = bg;
                
                const t2 = ctx.createElement('h1', '', item.joiner || '&');
                t2.style.fontSize = '15rem';
                t2.style.fontWeight = '900';
                scene.appendChild(t2);
                
                await ctx.wait(300); 
                
                scene.innerHTML = '';
                scene.style.backgroundColor = bg;
                scene.style.color = fg;
                
                const t3 = ctx.createElement('h1', '', item.text2 || 'SERVICES');
                // Use default size of 15rem, but let getSize handle the scaling
                const size = ctx.getSize(item.fontSize, '15rem');
                t3.style.cssText = `fontSize: ${size}; fontWeight: 900; lineHeight: 0.75; textAlign: center; letterSpacing: -0.06em;`;
                scene.appendChild(t3);
                
                t3.animate([
                    { transform: 'scale(4)', opacity: 0, filter: 'blur(10px)' },
                    { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }
                ], { duration: 600, easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)' });
                
                await ctx.wait(1500);
            },

            'Kinetic Typing': async (scene, item, ctx) => {
                scene.style.display = 'flex';
                scene.style.alignItems = 'center';
                scene.style.justifyContent = 'center';
                
                const text = ctx.createElement('h1', '', '');
                text.style.cssText = `font-size:${ctx.getSize(item.fontSize, '8rem')}; font-weight:900; font-family:monospace; white-space:pre; border-right:0.1em solid currentColor;`;
                scene.appendChild(text);
                
                const content = item.text || "Typewriter";
                
                for (let i = 0; i <= content.length; i++) {
                    text.textContent = content.slice(0, i);
                    await ctx.wait(50 + Math.random() * 50);
                }
                
                const blink = text.animate([
                    { borderRightColor: 'currentColor' },
                    { borderRightColor: 'transparent' }
                ], { duration: 500, iterations: Infinity });
                
                await ctx.wait(1500); 
                blink.cancel();
            }
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Flex;
} else {
    window.Flex = Flex;
}
