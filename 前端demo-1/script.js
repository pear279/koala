document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.left-nav .nav-links li');
    const sections = document.querySelectorAll('.center-display .section');
    const homepageNavBtns = document.querySelectorAll('.homepage-nav-btn');
    const homepagePages = document.querySelectorAll('.homepage-content .homepage-page');

    // Function to hide all sections except the active one
    function showSection(targetSectionId) {
        sections.forEach(section => {
            if (section.dataset.section === targetSectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Function to hide all homepage pages except the active one
    function showHomepagePage(targetPageId) {
        homepagePages.forEach(page => {
            if (page.dataset.page === targetPageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    // Left Navigation Click Listener
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked nav link
            link.classList.add('active');

            // Show the corresponding section
            const targetSectionId = link.dataset.section;
            showSection(targetSectionId);

            // Special case for Homepage: ensure one of its pages is visible
            if (targetSectionId === 'homepage') {
                // Find the currently active homepage page or default to the first one
                const activeHomepagePage = document.querySelector('.homepage-content .homepage-page.active');
                if (!activeHomepagePage) {
                    // If no page is active, activate the first one ('start-recording')
                    showHomepagePage('start-recording');
                    const firstHomepageBtn = document.querySelector('.homepage-nav-btn[data-page="start-recording"]');
                    if (firstHomepageBtn) firstHomepageBtn.classList.add('active');
                }
                // If an active page exists, just keep it
            }
        });
    });

    // Homepage Navigation Click Listener
    homepageNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all homepage nav buttons
            homepageNavBtns.forEach(b => b.classList.remove('active'));
            // Add active class to the clicked button
            btn.classList.add('active');

            // Show the corresponding homepage page
            const targetPageId = btn.dataset.page;
            showHomepagePage(targetPageId);

            // Note: Clicking "Start Recording" technically shows a placeholder page
            // in the center, indicating interaction is in the right panel.
            // The actual chat UI is always in the right panel.
        });
    });

    // --- Initial Load ---
    // Set default active nav link and section (Homepage)
    const initialSectionId = 'homepage';
    const initialNavLink = document.querySelector(`.left-nav .nav-links li[data-section="${initialSectionId}"]`);
    if (initialNavLink) {
        initialNavLink.classList.add('active');
        showSection(initialSectionId);

        // For Homepage, set the initial active page (e.g., Start Recording)
        const initialHomepagePageId = 'start-recording';
        const initialHomepageBtn = document.querySelector(`.homepage-nav-btn[data-page="${initialHomepagePageId}"]`);
        if (initialHomepageBtn) {
            initialHomepageBtn.classList.add('active');
            showHomepagePage(initialHomepagePageId);
        } else {
            // Fallback: if 'start-recording' doesn't exist or isn't found, just activate the first homepage page
            const firstHomepagePage = document.querySelector('.homepage-content .homepage-page');
            if (firstHomepagePage) {
                firstHomepagePage.classList.add('active');
                const firstHomepageBtnFallback = document.querySelector(`.homepage-nav-btn[data-page="${firstHomepagePage.dataset.page}"]`);
                if (firstHomepageBtnFallback) firstHomepageBtnFallback.classList.add('active');
            }
        }
    } else {
        // If Homepage link not found, just activate the very first section available
        if (sections.length > 0) {
            sections[0].classList.add('active');
        }
    }


    // Basic interactivity for emotion tags (toggle active class)
    const emotionTags = document.querySelectorAll('.emotion-tags-list .tag');
    emotionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
        });
    });

    // Basic interactivity for AI selection buttons (toggle active class)
    const aiBtns = document.querySelectorAll('.ai-selection .ai-btn');
    aiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            aiBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Basic interactivity for section nav buttons (Story Library, Messages)
    const sectionNavContainers = document.querySelectorAll('.section-nav');
    sectionNavContainers.forEach(container => {
        const btns = container.querySelectorAll('.section-nav-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Add logic here to filter/show content based on '我的', '朋友', '社区'
                // For this visualization, we just toggle the active button class.
            });
        });
    });

});