(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const navbar = document.getElementById('storeNavbar');
        if (!navbar) return;

        // 1. Add CSS for sidebar and hamburger
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                /* Hide regular nav links and navBrand */
                nav#storeNavbar > *:not(.mobile-menu-btn):not(#cartButton):not(#checkoutNavActions):not(#giftNavLeft):not(#giftNavRight) { 
                    display: none !important; 
                }
                
                nav#storeNavbar {
                    justify-content: space-between !important;
                    padding: 0 20px !important;
                }

                /* Cart button consistent size on mobile */
                nav#storeNavbar #cartButton {
                    display: inline-flex !important;
                    padding: 8px 14px !important;
                    font-size: 13px !important;
                }
                
                /* Hamburger menu */
                .mobile-menu-btn {
                    display: flex !important;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 22px;
                    height: 16px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 10001;
                    order: -1;
                    flex-shrink: 0;
                }
                .mobile-menu-btn span {
                    width: 22px;
                    height: 2px;
                    background: white;
                    border-radius: 10px;
                    transition: all 0.3s linear;
                    display: block;
                    transform-origin: 1px;
                }
                .mobile-menu-btn.open span:nth-child(1) { transform: rotate(45deg); }
                .mobile-menu-btn.open span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
                .mobile-menu-btn.open span:nth-child(3) { transform: rotate(-45deg); }

                /* Sidebar overlay */
                .mobile-sidebar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 9999;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                .mobile-sidebar-overlay.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                /* Sidebar panel */
                .mobile-sidebar {
                    position: fixed !important;
                    top: 0 !important;
                    left: -260px !important;
                    width: 240px !important;
                    height: 100vh !important;
                    background: #fef2f4 !important;
                    border-right: 2px solid #fac5cf !important;
                    box-shadow: 4px 0 30px rgba(0, 0, 0, 0.15) !important;
                    transition: left 0.3s ease-in-out !important;
                    z-index: 10000 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: flex-start !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                }
                .mobile-sidebar.open {
                    left: 0 !important;
                }
                
                /* Sidebar header area */
                .mobile-sidebar-header {
                    width: 100%;
                    background: #900C3F;
                    padding: 18px 20px;
                    box-sizing: border-box;
                }

                .mobile-sidebar-title {
                    font-family: 'Pinyon Script', cursive;
                    font-size: 26px;
                    color: #ffffff;
                    text-decoration: none;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.2;
                }

                /* Divider */
                .mobile-sidebar-divider {
                    width: calc(100% - 40px);
                    height: 1px;
                    background: #fac5cf;
                    margin: 0 20px;
                    flex-shrink: 0;
                }
                
                /* Nav links in sidebar */
                .mobile-sidebar-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    width: 100%;
                    padding: 10px 0;
                }

                .mobile-sidebar-link {
                    display: block !important;
                    font-size: 18px !important;
                    font-family: 'Fredoka', sans-serif !important;
                    font-weight: 600 !important;
                    color: #B71A3D !important;
                    text-decoration: none !important;
                    padding: 14px 24px !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    transition: background 0.2s ease !important;
                    border: none !important;
                    margin: 0 !important;
                    letter-spacing: 0.3px;
                }
                .mobile-sidebar-link:hover {
                    background: rgba(183, 26, 61, 0.08) !important;
                }
                .mobile-sidebar-link.active {
                    background: rgba(183, 26, 61, 0.12) !important;
                    border-left: 3px solid #B71A3D !important;
                    padding-left: 21px !important;
                }
            }
            @media (min-width: 769px) {
                .mobile-menu-btn,
                .mobile-sidebar,
                .mobile-sidebar-overlay {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        // 2. Add hamburger button to navbar
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.setAttribute('aria-label', 'Open menu');
        menuBtn.innerHTML = '<span></span><span></span><span></span>';
        navbar.appendChild(menuBtn);

        // 3. Build sidebar
        const overlay = document.createElement('div');
        overlay.className = 'mobile-sidebar-overlay';

        const sidebar = document.createElement('div');
        sidebar.className = 'mobile-sidebar';

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        sidebar.innerHTML = `
            <div class="mobile-sidebar-header">
                <a href="index.html" class="mobile-sidebar-title">The Gifting Co.</a>
            </div>
            <div class="mobile-sidebar-divider"></div>
            <div class="mobile-sidebar-links">
                <a href="plushies.html" class="mobile-sidebar-link ${currentPath === 'plushies.html' ? 'active' : ''}">Plushies</a>
                <a href="flowers.html" class="mobile-sidebar-link ${currentPath === 'flowers.html' ? 'active' : ''}">Flowers</a>
                <a href="notes.html" class="mobile-sidebar-link ${currentPath === 'notes.html' ? 'active' : ''}">Notes</a>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(sidebar);

        // 4. Toggle logic
        function openSidebar() {
            menuBtn.classList.add('open');
            sidebar.classList.add('open');
            overlay.classList.add('open');
        }

        function closeSidebar() {
            menuBtn.classList.remove('open');
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        }

        menuBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) closeSidebar();
            else openSidebar();
        });
        overlay.addEventListener('click', closeSidebar);
    });
})();
