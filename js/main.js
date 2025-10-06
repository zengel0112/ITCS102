document.addEventListener('DOMContentLoaded', function() {
    // Add highlight class for styling and disable image dragging
    const style = document.createElement('style');
    style.textContent = `
        .code-block [data-line].highlight {
            background: rgba(255, 255, 0, 0.25);
        }
        img:not(#kara-pet) {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            pointer-events: none;
        }
        #kara-pet {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
        }
    `;
    
    // Prevent image dragging
    document.querySelectorAll('img').forEach(img => {
        img.draggable = false;
        img.addEventListener('dragstart', e => e.preventDefault());
    });
    document.head.appendChild(style);

    // Time mappings for each task
    const taskMappings = {
        'kara1': [
            [0.0, 6.0, 0],  // while not kara.treeFront(): (throughout)
            [2.5, 5.0, 1],  // if kara.onLeaf(): (2.5-5s)
            [2.5, 5.0, 2],  // kara.removeLeaf() (2.5-5s)
            [0.0, 2.5, 4],  // kara.putLeaf() (first 2.5s)
            [5.0, 5.5, 4],  // kara.putLeaf() (5-5.5s)
            [0.0, 2.5, 3],  // else: (first 2.5s)
            [5.0, 5.5, 3],  // else: (5-5.5s)
            [0.0, 6.0, 5]   // kara.move() (throughout)
        ],
        'kara2a': [
            // Placeholder mapping for task 2a - you can edit these timings later
            [0.0, 2.3, 0],  // while not kara.treeFront():
            [0.0, 2.3, 1],  // if not (kara.treeLeft() and kara.treeRight()):
            [0.0, 2.3, 2],  // kara.move()
            [2.3, 4.0, 3],  // else:
            [2.3, 4.0, 4]   // break
        ],
        'kara2b': [
            [0.0, 3.0, 0],  // while not kara.treeFront()
            [0.0, 3.0, 1],  // kara.move()
            [3.0, 7.8, 2],  // if kara.treeLeft() and kara.treeRight()
            [3.0, 7.8, 3],  // while kara.treeLeft() and kara.treeRight()
            [3.0, 7.8, 4],  // kara.move()
            [7.8, 11.0, 5],  // if not kara.treeFront()
            [7.8, 11.0, 6]   // break
        ],
        'kara3a': [
            [0.0, 2.3, 0], [8.6, 9.0, 0],  // while not kara.onLeaf()
            [0.0, 2.3, 1], [8.6, 9.0, 1],  // if not kara.treeFront()
            [0.0, 2.3, 2], [8.6, 9.0, 2],  // kara.move()
            [2.3, 8.6, 3],  // else:
            [2.3, 8.6, 4],  // kara.turnLeft()
            [2.3, 8.6, 5],  // kara.move()
            [2.3, 8.6, 6],  // kara.turnRight()
            [2.3, 8.6, 7],  // kara.move()
            [2.3, 8.6, 8],  // kara.move()
            [2.3, 8.6, 9],  // kara.turnRight()
            [2.3, 8.6, 10], // kara.move()
            [2.3, 8.6, 11]  // kara.turnLeft()
        ],
        'kara3b': [
            [0.0, 2.3, 0], [10.3, 10.8, 0],  // while not kara.onLeaf()
            [0.0, 2.3, 1], [10.3, 10.8, 1],  // if not kara.treeFront()
            [0.0, 2.3, 2], [10.3, 10.8, 2],  // kara.move()
            [2.3, 3.0, 3], [4.7, 5.7, 3], [7.8, 8.5, 3],   // else
            [2.3, 3.0, 4], [4.7, 5.7, 4], [7.8, 8.5, 4],   // kara.turnLeft()
            [2.3, 3.0, 5], [4.7, 5.7, 5], [7.8, 8.5, 5],   // kara.move()
            [2.3, 3.0, 6], [4.7, 5.7, 6], [7.8, 8.5, 6],   // kara.turnRight()
            [2.3, 3.0, 7], [4.7, 5.7, 7], [7.8, 8.5, 7],  // kara.move()
            [3.0, 3.4, 8], [5.7, 6.5, 8], [8.5, 9.3, 8], // while kara.treeRight()
            [3.0, 3.4, 9], [5.7, 6.5, 9], [8.5, 9.3, 9], // kara.move()
            [3.4, 3.9, 10], [6.5, 7.0, 10], [9.3, 9.8, 10], // if not kara.treeRight()
            [3.4, 3.9, 11], [6.5, 7.0, 11], [9.3, 9.8, 11], // break
            [3.9, 4.7, 12], [7.0, 7.8, 12], [9.8, 10.3, 12], // kara.turnRight()
            [3.9, 4.7, 13], [7.0, 7.8, 13], [9.8, 10.3, 13], // kara.move()
            [3.9, 4.7, 14], [7.0, 7.8, 14], [9.8, 10.3, 14], // kara.turnLeft()
        ],
        'kara4': [
            // Placeholder mapping for task 4 - you can edit these timings later
            [0.0, 0.0, 0],  // while True:
            [0.0, 0.0, 1],  // if not kara.treeFront():
            [0.0, 0.0, 2]   // kara.move()
        ]
    };

    // Initialize highlighting for each task
    document.querySelectorAll('.flex-row-container').forEach((container, index) => {
        const video = container.querySelector('.kara-gif');
        const codeBlock = container.querySelector('.code-block');
        
        if (!video || !codeBlock) return;

        // Extract task number from video source
        const videoSrc = video.getAttribute('src');
        const taskMatch = videoSrc.match(/kara(\d+[ab]?)\.webm/);
        if (!taskMatch) return;
        
        const taskKey = `kara${taskMatch[1]}`;
        const mapping = taskMappings[taskKey];
        if (!mapping) return;

        // Process code lines
        const codeLines = codeBlock.innerHTML
            .split('\n')
            .filter(line => line.trim());

        // Add data-line attributes to code lines
        codeBlock.innerHTML = codeLines
            .map((line, index) => `<span data-line="${index}">${line}</span>`)
            .join('\n');

        // Add timeupdate listener to video
        video.addEventListener('timeupdate', function() {
            const t = this.currentTime;
            // Remove previous highlights
            codeBlock.querySelectorAll('[data-line]').forEach(el => {
                el.classList.remove('highlight');
            });
            
            // Find and highlight current lines
            for (const [start, end, idx] of mapping) {
                if (t >= start && t < end) {
                    const lineElement = codeBlock.querySelector(`[data-line="${idx}"]`);
                    if (lineElement) {
                        lineElement.classList.add('highlight');
                    }
                }
            }
        });
    });
});

// Desktop pet: container-bounded, 1fps movement for both pointer and touch devices
(function desktopPetController(){
    const pet = document.getElementById('kara-pet');
    if (!pet) return;

    // find bounding container (fallback to body)
    const container = document.querySelector('.content-container') || document.body;

    // appearance (smaller)
    const PET_SIZE = 36; // px
    pet.style.width = PET_SIZE + 'px';
    pet.style.height = PET_SIZE + 'px';
    pet.style.position = 'absolute'; // use absolute inside content-container
    pet.style.zIndex = 9999;
    pet.style.display = 'block';
    // no smoothing for left/top — movement snaps each 1s tick (neko-like)
    // pet will face movement direction via scaleX
    pet.style.transition = 'transform 0.0s linear';
    pet.style.touchAction = 'none';

    // state
    let rect = container.getBoundingClientRect();
    let x = 0, y = 0; // current top-left (viewport coords)
    let targetX = 0, targetY = 0; // desired top-left (viewport coords)
    let moving = true;

    // helper to recompute container bounds
    function updateRect() {
        rect = container.getBoundingClientRect();
    }

    // convert page coordinates to container-relative
    function pageToContainer(pageX, pageY) {
        return [
            pageX - rect.left,
            pageY - rect.top
        ];
    }

    // clamp a position inside container
    function clampToContainer(px, py) {
        const minX = 0;
        const maxX = rect.width - PET_SIZE;
        const minY = 0;
        const maxY = rect.height - PET_SIZE;
        return [Math.max(minX, Math.min(maxX, px)), Math.max(minY, Math.min(maxY, py))];
    }

    // Check for saved position or use initial position
    updateRect();
    const savedPos = localStorage.getItem('karaPetPosition');
    if (savedPos) {
        const pos = JSON.parse(savedPos);
        [x, y] = clampToContainer(pos.x, pos.y);
        targetX = x; targetY = y;
        pet.style.left = x + 'px';
        pet.style.top = y + 'px';
        pet.style.transform = 'rotate(0deg)';
    } else {
        const initialLeft = Math.floor(Math.random() * Math.max(1, (rect.width - PET_SIZE)));
        const initialTop = rect.height - PET_SIZE - 8; // 8px padding from bottom
        [x, y] = clampToContainer(initialLeft, initialTop);
        targetX = x; targetY = y;
        pet.style.left = x + 'px';
        pet.style.top = y + 'px';
        pet.style.transform = 'rotate(0deg)';
    }

    // Save position before page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('karaPetPosition', JSON.stringify({ x, y }));
    });

    // Movement tick: twice per second (2fps), move a limited step toward target
    const STEP = 24; // pixels per second (one step per tick)
    const TICK_MS = 500;  // reduced to 500ms for 2fps

    function moveStep() {
        if (!moving) return;
        updateRect();
        // compute vector toward target
        const dx = targetX - x;
        const dy = targetY - y;
        if (Math.abs(dx) <= STEP && Math.abs(dy) <= STEP) {
            x = targetX; y = targetY;
        } else {
            const ang = Math.atan2(dy, dx);
            x += Math.round(Math.cos(ang) * STEP);
            y += Math.round(Math.sin(ang) * STEP);
        }
        // clamp to container
        [x, y] = clampToContainer(x, y);
        pet.style.left = x + 'px';
        pet.style.top = y + 'px';
        
        // update rotation based on movement direction (8-way facing)
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // convert angle to 8 directions (45 degree segments)
            let rotation = 0;
            
            if (angle < -157.5 || angle > 157.5) rotation = 270;        // left
            else if (angle < -112.5) rotation = 315;                     // up-left
            else if (angle < -67.5)  rotation = 0;                       // up
            else if (angle < -22.5)  rotation = 45;                      // up-right
            else if (angle < 22.5)   rotation = 90;                      // right
            else if (angle < 67.5)   rotation = 135;                     // down-right
            else if (angle < 112.5)  rotation = 180;                     // down
            else if (angle < 157.5)  rotation = 225;                     // down-left
            
            // apply rotation
            pet.style.transform = `rotate(${rotation}deg)`;
        }
    }

    const tickId = setInterval(moveStep, TICK_MS);

    // input handlers set target (center pet on pointer/touch)
    function setTargetFromClient(clientX, clientY) {
        updateRect();
        // convert page coordinates to container-relative
        const [containerX, containerY] = pageToContainer(clientX, clientY);
        const desiredX = containerX - PET_SIZE / 2;
        const desiredY = containerY - PET_SIZE / 2;
        // clamp desired inside container
        [targetX, targetY] = clampToContainer(desiredX, desiredY);
    }

    // pointer (mouse) events
    window.addEventListener('mousemove', (e) => {
        // set target but do not move immediately; movement occurs on 1s ticks
        setTargetFromClient(e.clientX, e.clientY);
    });

    // touch events: update last touch position
    window.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        setTargetFromClient(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        setTargetFromClient(t.clientX, t.clientY);
    }, { passive: true });

    // click/tap: rotate 360deg then fall to bottom of container, then respawn near top
    function playRotateAndFall() {
        if (!moving) return;
        moving = false;
        updateRect();
        
        // Get current position and rotation
        const currentRotation = pet.style.transform.match(/rotate\(([-\d.]+)deg\)/);
        const startDeg = currentRotation ? parseFloat(currentRotation[1]) : 0;
        const startY = parseInt(pet.style.top);
        const bottomY = rect.height - PET_SIZE - 4;
        
        // Remove transitions for manual animation
        pet.style.transition = 'none';
        
        // Constants for animation
        const FALL_SPEED = 600; // pixels per second (2x faster)
        const ROTATION_SPEED = 720; // two full rotations per second (2x faster)
        let startTime = null;
        let currentY = startY;
        let currentDeg = startDeg;
        
        // Animation frame function
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000; // convert to seconds
            
            // Update position with constant fall speed
            currentY = startY + (FALL_SPEED * elapsed);
            currentDeg = startDeg + (ROTATION_SPEED * elapsed);
            
            // Apply changes
            if (currentY >= bottomY) {
                // Reached bottom - stop and cleanup
                pet.style.top = bottomY + 'px';
                pet.style.transform = 'rotate(' + (startDeg + 360) % 360 + 'deg)';
                
                // Update state
                y = bottomY;
                targetY = bottomY;
                
                // Resume normal movement
                setTimeout(() => { moving = true; }, 50);
            } else {
                // Still falling - update position and rotation
                pet.style.top = currentY + 'px';
                pet.style.transform = 'rotate(' + currentDeg + 'deg)';
                requestAnimationFrame(animate);
            }
        }
        
        // Start animation
        requestAnimationFrame(animate);
    }

    pet.addEventListener('click', playRotateAndFall);
    pet.addEventListener('touchstart', (e) => { e.preventDefault(); playRotateAndFall(); }, { passive: false });

    // keep bounding rect up to date on resize/scroll
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    // cleanup if element removed
    const observer = new MutationObserver(() => {
        if (!document.body.contains(pet)) {
            clearInterval(tickId);
            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
