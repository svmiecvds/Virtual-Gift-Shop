const fs = require('fs');
const path = 'c:/Users/user/Desktop/Virtual-Gift-Shop/notes.html';

let content = fs.readFileSync(path, 'utf8');

const HTML_TO_INJECT = `
            <div id="itemRotateBtn" style="display: none; position: absolute; z-index: 1000; cursor: pointer; background: white; border-radius: 50%; padding: 4px; border: 1px solid #fac5cf; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B71A3D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.67-1.36"/></svg>
            </div>
            <div id="itemResizeBtn" style="display: none; position: absolute; z-index: 1000; cursor: nwse-resize; background: white; border-radius: 50%; padding: 4px; border: 1px solid #fac5cf; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B71A3D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </div>
`;

// Insert HTML after itemDeleteBtn
content = content.replace(
    /(<div id="itemDeleteBtn"[\s\S]*?<\/div>)/,
    `$1\n${HTML_TO_INJECT}`
);


const SCRIPT_REPLACEMENT = `
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
    const itemRotateBtn = document.getElementById('itemRotateBtn');
    const itemResizeBtn = document.getElementById('itemResizeBtn');

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
            
            img.dataset.angle = 0;
            img.dataset.scale = 1;
            img.style.transform = \`translate(-50%, -50%) rotate(0rad) scale(1)\`;
            
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
            noteText.style.lineHeight = '1.2'; 
            
            if (!noteText.dataset.scale) {
                noteText.dataset.angle = 0;
                noteText.dataset.scale = 1;
                noteText.style.transform = \`translate(-50%, -50%) rotate(0rad) scale(1)\`;
            }
            
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
        
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        
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

    // Dragging / Rotate / Resize Logic
    let isDragging = false;
    let isRotating = false;
    let isResizing = false;
    let dragStartX, dragStartY;
    let initialLeft, initialTop;
    let startAngle = 0;
    let startScale = 1;

    function selectElement(el) {
        if (selectedElement) {
            selectedElement.classList.remove('canvas-selected');
        }
        selectedElement = el;
        if (el && el !== mainNote) {
            el.classList.add('canvas-selected');
            updateControls();
        } else {
            itemDeleteBtn.style.display = 'none';
            itemRotateBtn.style.display = 'none';
            itemResizeBtn.style.display = 'none';
        }
    }

    function updateControls() {
        if (!selectedElement || selectedElement === mainNote) {
            itemDeleteBtn.style.display = 'none';
            itemRotateBtn.style.display = 'none';
            itemResizeBtn.style.display = 'none';
            return;
        }
        const rect = selectedElement.getBoundingClientRect();
        const parentRect = customScene.getBoundingClientRect();
        
        itemDeleteBtn.style.left = (rect.right - parentRect.left - 12) + 'px';
        itemDeleteBtn.style.top = (rect.top - parentRect.top - 12) + 'px';
        itemDeleteBtn.style.display = 'block';

        itemRotateBtn.style.left = (rect.left - parentRect.left - 12) + 'px';
        itemRotateBtn.style.top = (rect.bottom - parentRect.top - 12) + 'px';
        itemRotateBtn.style.display = 'block';

        itemResizeBtn.style.left = (rect.right - parentRect.left - 12) + 'px';
        itemResizeBtn.style.top = (rect.bottom - parentRect.top - 12) + 'px';
        itemResizeBtn.style.display = 'block';
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

        if (e.target.closest('#itemRotateBtn')) {
            isRotating = true;
            const rect = selectedElement.getBoundingClientRect();
            dragStartX = rect.left + rect.width / 2;
            dragStartY = rect.top + rect.height / 2;
            startAngle = Math.atan2(e.clientY - dragStartY, e.clientX - dragStartX);
            e.preventDefault();
            return;
        }

        if (e.target.closest('#itemResizeBtn')) {
            isResizing = true;
            const rect = selectedElement.getBoundingClientRect();
            dragStartX = rect.left + rect.width / 2;
            dragStartY = rect.top + rect.height / 2;
            startScale = parseFloat(selectedElement.dataset.scale || 1);
            selectedElement.dataset.startDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
            e.preventDefault();
            return;
        }

        if (e.target.classList.contains('draggableSticker') || e.target === noteText) {
            isDragging = true;
            selectElement(e.target);
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            initialLeft = selectedElement.offsetLeft;
            initialTop = selectedElement.offsetTop;
            e.preventDefault();
        } else if (e.target === mainNote) {
            selectElement(null); 
        } else if (!e.target.closest('#addTextBtn') && !e.target.closest('.canvas-placeholder')) {
            selectElement(null);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!selectedElement) return;

        if (isRotating) {
            const angle = Math.atan2(e.clientY - dragStartY, e.clientX - dragStartX);
            const currentAngle = parseFloat(selectedElement.dataset.angle || 0);
            const delta = angle - startAngle;
            const newAngle = currentAngle + delta;
            
            selectedElement.dataset.angle = newAngle;
            const scale = selectedElement.dataset.scale || 1;
            selectedElement.style.transform = \`translate(-50%, -50%) rotate(\${newAngle}rad) scale(\${scale})\`;
            
            startAngle = angle;
            updateControls();
        } else if (isResizing) {
            const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
            const startDist = parseFloat(selectedElement.dataset.startDist);
            
            let newScale = startScale * (dist / startDist);
            newScale = Math.max(0.2, Math.min(newScale, 5));
            
            selectedElement.dataset.scale = newScale;
            const angle = selectedElement.dataset.angle || 0;
            selectedElement.style.transform = \`translate(-50%, -50%) rotate(\${angle}rad) scale(\${newScale})\`;
            
            updateControls();
        } else if (isDragging) {
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            
            selectedElement.style.left = (initialLeft + dx) + 'px';
            selectedElement.style.top = (initialTop + dy) + 'px';
            
            updateControls();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isRotating = false;
        isResizing = false;
    });

</script>
`;

const startIndex = content.indexOf('<script>');
const endIndex = content.lastIndexOf('</script>') + 9;

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + SCRIPT_REPLACEMENT + content.substring(endIndex);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated JS in notes.html');
} else {
    console.error('Could not find script block');
}
