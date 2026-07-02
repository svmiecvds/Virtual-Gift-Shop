const fs = require('fs');
const file = 'c:/Users/user/Desktop/Virtual-Gift-Shop/notes.html';
let content = fs.readFileSync(file, 'utf8');

const newBody = `
<body class="giftPage no-scroll">

    <!-- Baby Pink Navbar -->
    <nav id="storeNavbar">
        <a href="index.html" class="navBrand" style="text-decoration: none;">The Gifting Co.</a>
        <div style="margin-left: auto; display: flex; align-items: center; gap: 15px;">
            <a href="plushies.html" class="navLink">Plushies</a>
            <a href="flowers.html" class="navLink">Flowers</a>
            <a href="treats.html" class="navLink">Treats</a>
            <a href="notes.html" class="navLink active">Notes</a>
            <button id="saveCustomization" class="shiny-cta" style="padding: 8px 16px; font-size: 14px;">
                <span>Save Changes</span>
            </button>
        </div>
    </nav>

    <!-- Header Text -->
    <h1 class="storeHeader">add notes and stickers</h1>

    <div id="mainContainer" style="display: flex; gap: 20px; justify-content: center; align-items: stretch; max-width: 1200px; margin: 0 auto; height: 600px;">
        
        <!-- Left Panel: Notes -->
        <div id="leftPanel" style="width: 280px; flex-shrink: 0; background: rgba(144, 12, 63, 0.15) !important; border-radius: 24px; padding: 24px; display: flex; flex-direction: column; overflow-y: auto;">
            <h2 style="color: var(--heading-color); margin-bottom: 15px; text-align: center; font-family: var(--font-ui);">Notes</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="box-option noteTemplate" data-src="assets/final page/note1.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note1.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option noteTemplate" data-src="assets/final page/note2.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note2.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option noteTemplate" data-src="assets/final page/note3.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note3.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option noteTemplate" data-src="assets/final page/note4.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note4.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option noteTemplate" data-src="assets/final page/note5.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note5.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option noteTemplate" data-src="assets/final page/note6.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/note6.png" style="width: 100%; height: auto; object-fit: contain;"></div>
            </div>
        </div>

        <!-- Center Panel: Canvas -->
        <div id="customScene" style="position: relative; flex: 1; max-width: 600px; background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%) !important; backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4) !important; border-radius: 40px; display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: inset 0 4px 10px rgba(255, 255, 255, 0.6), inset 0 -4px 10px rgba(255, 182, 193, 0.2) !important;">
            <div id="itemDeleteBtn" style="display: none; position: absolute; z-index: 1000; cursor: pointer; background: white; border-radius: 50%; padding: 4px; border: 1px solid #fac5cf; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B71A3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            
            <div class="canvas-placeholder" id="placeholderMsg">
                <span style="font-family: var(--font-heading); font-size: 30px; color: var(--heading-color);">Write a note for someone</span>
                <span style="font-size: 15px; font-family: var(--font-body); margin-top: 15px; opacity: 0.8;">
                    Select a note to start. Then add custom text and stickers!
                </span>
            </div>
            
            <button id="addTextBtn" class="giftControlBtn" style="display: none; position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 999; border: none; border-radius: 50px; background: var(--btn-bg); color: var(--btn-text); padding: 10px 20px; font-family: var(--font-ui); font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 2px solid rgba(255, 182, 217, 0.25);">
                 Add Custom Text
            </button>
            
            <div id="canvasContent" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none;">
                <img id="mainNote" src="" style="display: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 250px; pointer-events: auto;">
                <div id="noteText" style="display: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: auto; cursor: move; text-align: center; white-space: pre-wrap; font-size: 24px; min-width: 100px;"></div>
            </div>
        </div>

        <!-- Right Panel: Stickers -->
        <div id="rightPanel" style="width: 280px; flex-shrink: 0; background: rgba(144, 12, 63, 0.15) !important; border-radius: 24px; padding: 24px; display: flex; flex-direction: column; overflow-y: auto;">
            <h2 style="color: var(--heading-color); margin-bottom: 15px; text-align: center; font-family: var(--font-ui);">Stickers</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker1.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker1.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker 2.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker 2.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker3.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker3.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_clip_purple.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_clip_purple.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_pin_red.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_pin_red.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_clip_beige.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_clip_beige.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_clip_pink.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_clip_pink.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_clip_blue.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_clip_blue.png" style="width: 100%; height: auto; object-fit: contain;"></div>
                <div class="box-option stickerTemplate" data-src="assets/final page/sticker_camera.png" style="justify-content: center; padding: 10px;"><img src="assets/final page/sticker_camera.png" style="width: 100%; height: auto; object-fit: contain;"></div>
            </div>
        </div>

    </div>

    <!-- Note Editor Modal -->
    <div id="noteEditor" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--popup-bg); padding: 25px; border-radius: 25px; z-index: 99999; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h2 style="color: var(--heading-color); margin-bottom: 15px; font-family: var(--font-ui);">Edit Text</h2>
        <textarea id="noteMessage" placeholder="Write your message..." style="width: 320px; height: 130px; margin-bottom: 15px; resize: none; border-radius: 10px; padding: 10px; border: 1px solid rgba(183, 26, 61, 0.2);"></textarea>
        <br>
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
            <select id="fontSelect" style="flex: 1; padding: 10px; border-radius: 10px; border: 1px solid rgba(183, 26, 61, 0.2); font-family: var(--font-ui);">
                <option value="Pacifico">Pacifico</option>
                <option value="Fredoka">Fredoka</option>
                <option value="Quicksand">Quicksand</option>
                <option value="Ribeye">Ribeye</option>
            </select>
            <input type="color" id="textColorPicker" value="#B71A3D" style="width: 40px; height: 40px; border: none; cursor: pointer; padding: 0; background: transparent;">
        </div>
        <button id="saveNoteText" style="width: 100%; border: none; border-radius: 50px; padding: 12px; background: #ffffff; color: #B71A3D; font-weight: bold; font-family: var(--font-ui); cursor: pointer; border: 1.5px solid rgba(255, 182, 217, 0.25);">Save</button>
    </div>

    <!-- Toast Notification -->
    <div id="toast" style="display: none; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: var(--toast-bg); color: white; padding: 15px 25px; border-radius: 50px; z-index: 9999; font-family: var(--font-ui); font-weight: 600;">
        Note saved to cart!
    </div>
    
    <style>
        #leftPanel::-webkit-scrollbar, #rightPanel::-webkit-scrollbar { width: 6px; }
        #leftPanel::-webkit-scrollbar-track, #rightPanel::-webkit-scrollbar-track { background: transparent; }
        #leftPanel::-webkit-scrollbar-thumb, #rightPanel::-webkit-scrollbar-thumb { background: #900C3F; border-radius: 10px; }
        .draggableSticker { position: absolute; width: 60px; height: auto; cursor: move; pointer-events: auto; }
        .canvas-selected { outline: 2px dashed #B71A3D; outline-offset: 4px; }
    </style>

<script>
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
    const mainNote = document.getElementById('mainNote');
    const placeholderMsg = document.getElementById('placeholderMsg');
    const addTextBtn = document.getElementById('addTextBtn');
    const noteEditor = document.getElementById('noteEditor');
    const noteText = document.getElementById('noteText');
    const canvasContent = document.getElementById('canvasContent');
    const customScene = document.getElementById('customScene');
    const itemDeleteBtn = document.getElementById('itemDeleteBtn');

    let stickers = [];
    let noteData = {
        src: null,
        text: '',
        font: 'Pacifico',
        color: '#B71A3D'
    };
    
    let selectedElement = null;

    // Note Selection
    document.querySelectorAll('.noteTemplate').forEach(el => {
        el.addEventListener('click', () => {
            noteData.src = el.dataset.src;
            mainNote.src = noteData.src;
            mainNote.style.display = 'block';
            placeholderMsg.style.display = 'none';
            addTextBtn.style.display = 'block';
        });
    });

    // Sticker Selection
    document.querySelectorAll('.stickerTemplate').forEach(el => {
        el.addEventListener('click', () => {
            if (!noteData.src) {
                alert("Please select a note first to place stickers on!");
                return;
            }
            const img = document.createElement('img');
            img.src = el.dataset.src;
            img.className = 'draggableSticker';
            img.style.left = '50%';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            canvasContent.appendChild(img);
            stickers.push(img);
            selectElement(img);
        });
    });

    // Add Custom Text
    addTextBtn.addEventListener('click', () => {
        noteEditor.style.display = 'block';
    });

    // Save Text from Modal
    document.getElementById('saveNoteText').addEventListener('click', () => {
        const text = document.getElementById('noteMessage').value;
        const font = document.getElementById('fontSelect').value;
        const color = document.getElementById('textColorPicker').value;
        
        if (text.trim() !== '') {
            noteData.text = text;
            noteData.font = font;
            noteData.color = color;
            
            noteText.innerText = text;
            noteText.style.fontFamily = font;
            noteText.style.color = color;
            
            // Adjust line height for different fonts if needed
            noteText.style.lineHeight = '1.2'; 
            noteText.style.display = 'block';
        } else {
            noteText.style.display = 'none';
        }
        noteEditor.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') noteEditor.style.display = 'none';
    });

    // Save Changes
    document.getElementById('saveCustomization').addEventListener('click', () => {
        if (!noteData.src) {
            alert('Please compose a note before saving!');
            return;
        }
        
        const noteId = Math.random().toString(36).substr(2, 9);
        
        // Save the note background + text
        cart.push({
            id: noteId,
            type: 'note',
            src: noteData.src,
            noteTextDetails: {
                text: noteData.text,
                fontFamily: noteData.font,
                color: noteData.color
            },
            quantity: 1,
            name: 'Custom Note'
        });

        // Add stickers directly too, or associate them. We'll add them to cart directly 
        // to simplify the data structure and preserve existing behavior.
        stickers.forEach(s => {
            cart.push({
                id: Math.random().toString(36).substr(2, 9),
                type: 'sticker',
                src: s.src,
                quantity: 1,
                name: 'Sticker'
            });
        });
        
        sessionStorage.setItem("cart", JSON.stringify(cart));
        
        // Show Toast
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        
        // Clear canvas
        mainNote.style.display = 'none';
        noteData.src = null;
        noteData.text = '';
        noteText.style.display = 'none';
        placeholderMsg.style.display = 'flex';
        addTextBtn.style.display = 'none';
        stickers.forEach(s => s.remove());
        stickers = [];
        selectElement(null);
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2500);
    });

    // Dragging Logic
    let isDragging = false;
    let dragStartX, dragStartY;
    let initialLeft, initialTop;

    function selectElement(el) {
        if (selectedElement) {
            selectedElement.classList.remove('canvas-selected');
        }
        selectedElement = el;
        if (el && el !== mainNote) {
            el.classList.add('canvas-selected');
            updateDeleteBtn();
        } else {
            itemDeleteBtn.style.display = 'none';
        }
    }

    function updateDeleteBtn() {
        if (!selectedElement || selectedElement === mainNote) {
            itemDeleteBtn.style.display = 'none';
            return;
        }
        const rect = selectedElement.getBoundingClientRect();
        const parentRect = customScene.getBoundingClientRect();
        
        itemDeleteBtn.style.left = (rect.right - parentRect.left - 12) + 'px';
        itemDeleteBtn.style.top = (rect.top - parentRect.top - 12) + 'px';
        itemDeleteBtn.style.display = 'block';
    }

    customScene.addEventListener('mousedown', (e) => {
        if (e.target.closest('#itemDeleteBtn')) {
            if (selectedElement && selectedElement.classList.contains('draggableSticker')) {
                selectedElement.remove();
                stickers = stickers.filter(s => s !== selectedElement);
            } else if (selectedElement === noteText) {
                noteText.style.display = 'none';
                noteData.text = '';
            }
            selectElement(null);
            return;
        }

        if (e.target.classList.contains('draggableSticker') || e.target === noteText) {
            isDragging = true;
            selectElement(e.target);
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            initialLeft = selectedElement.offsetLeft;
            initialTop = selectedElement.offsetTop;
            // Prevent default image drag
            e.preventDefault();
        } else if (e.target === mainNote) {
            // Can select main note to show its borders but not drag it.
            // Wait, mainNote should stay centered, no dragging for background note.
            selectElement(null); 
        } else if (!e.target.closest('#addTextBtn') && !e.target.closest('.canvas-placeholder')) {
            selectElement(null);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !selectedElement) return;
        
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        
        selectedElement.style.left = (initialLeft + dx) + 'px';
        selectedElement.style.top = (initialTop + dy) + 'px';
        
        updateDeleteBtn();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

</script>
</body>
`;

const startIndex = content.indexOf('<body');
const endIndex = content.indexOf('</html>');

const newContent = content.substring(0, startIndex) + newBody + '\n</html>';

fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully updated notes.html');
