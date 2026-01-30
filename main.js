// NavAI Documentation Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Toggle mobile sidebar
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');

            // Update toggle icon
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        if (mobileMenuToggle) {
            const icon = mobileMenuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });

    // Sidebar navigation functionality
    const navItems = document.querySelectorAll('.nav-item.expandable');
    const subNavs = document.querySelectorAll('.sub-nav');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const isExpanded = this.classList.contains('expanded');
            const subNavId = this.getAttribute('data-section') + '-sub';
            const subNav = document.getElementById(subNavId);

            // Close all other expanded items
            navItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('expanded');
                }
            });

            subNavs.forEach(otherSubNav => {
                if (otherSubNav !== subNav) {
                    otherSubNav.classList.remove('active');
                }
            });

            // Toggle current item
            if (isExpanded) {
                this.classList.remove('expanded');
                if (subNav) subNav.classList.remove('active');
            } else {
                this.classList.add('expanded');
                if (subNav) subNav.classList.add('active');
            }
        });
    });

    // Sub-navigation item clicks
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();

            // Remove active class from all sub-nav items
            subNavItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Add active class to clicked item
            this.classList.add('active');

            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                if (mobileMenuToggle) {
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });

    // Top navigation active state
    const topNavLinks = document.querySelectorAll('.nav-link');
    topNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            topNavLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Update sidebar active state to match
            const section = this.textContent.toLowerCase().replace(/\s+/g, '-');
            updateSidebarActiveState(section);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            // Simple search through content cards
            const contentCards = document.querySelectorAll('.content-card');
            contentCards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
                const cardContent = card.querySelector('.card-content').textContent.toLowerCase();

                if (cardTitle.includes(searchTerm) || cardContent.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Smooth scroll for card links
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add smooth scroll behavior if needed for internal links
            // This can be extended based on specific requirements
        });
    });

    // Initialize sidebar state based on current page/section
    function updateSidebarActiveState(section) {
        const sidebarNavItems = document.querySelectorAll('.nav-item');
        sidebarNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === section) {
                item.classList.add('active');
            }
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close sidebar with Escape key
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Add loading animation for content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
