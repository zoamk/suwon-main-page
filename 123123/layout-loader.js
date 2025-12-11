// layout-loader.js - Handles loading header and footer
(function () {
    // Load header and footer
    function loadLayouts() {
        // Load header without executing scripts
        $.ajax({
            url: 'header.html',
            dataType: 'html',
            success: function (data) {
                // Remove script tags from the loaded content
                var tempDiv = $('<div>').html(data);
                tempDiv.find('script').remove();
                $('#header-placeholder').html(tempDiv.html());

                // Initialize header-related scripts after loading
                initializeHeader();
            },
            error: function (xhr, status, error) {
                console.log("Error loading header: " + xhr.status + " " + xhr.statusText);
            }
        });

        // Load footer without executing scripts
        $.ajax({
            url: 'footer.html',
            dataType: 'html',
            success: function (data) {
                // Remove script tags from the loaded content
                var tempDiv = $('<div>').html(data);
                tempDiv.find('script').remove();
                $('#footer-placeholder').html(tempDiv.html());

                // Initialize footer-related scripts after loading
                initializeFooter();
            },
            error: function (xhr, status, error) {
                console.log("Error loading footer: " + xhr.status + " " + xhr.statusText);
            }
        });
    }

    function initializeHeader() {
        // Initialize header-specific functionality
        if (typeof krds_pcGnb !== 'undefined') {
            krds_pcGnb.init();
        }
        if (typeof krds_moGnb !== 'undefined') {
            krds_moGnb.init();
        }
        if (typeof comLayout !== 'undefined' && comLayout.target.header !== null) {
            comLayout.init();
        }
    }

    function initializeFooter() {
        // Initialize footer-specific functionality if needed
        console.log('Footer loaded and initialized');
    }

    // Wait for DOM to be ready
    $(document).ready(function () {
        loadLayouts();
    });
})();