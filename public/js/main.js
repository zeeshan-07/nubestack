/*
    Arcana by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body');

    // Breakpoints.
        breakpoints({
            wide:      [ '1281px',  '1680px' ],
            normal:    [ '981px',   '1280px' ],
            narrow:    [ '841px',   '980px'  ],
            narrower:  [ '737px',   '840px'  ],
            mobile:    [ '481px',   '736px'  ],
            mobilep:   [ null,      '480px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Dropdowns.
        $('#nav > ul').dropotron({
            offsetY: -15,
            hoverDelay: 0,
            alignment: 'center'
        });

    // Nav.

        // Bar.
            $(
                '<div id="titleBar">' +
                    '<a href="#navPanel" class="toggle"></a>' +
                    '<span class="title">' + $('#logo-wrapper').html() + '</span>' +
                '</div>'
            )
                .appendTo($body);

        // Toolbox.
            let toolBoxElement = '<div class="toolbox">';
            let multilingual = $('#multilingual');
            if (multilingual[0]){
                toolBoxElement +=
                    '<div class="dropdown">' +
                        multilingual.html() +
                    '</div>';
            }

            toolBoxElement += '</div>';

        // Panel.
            var $navPanel = $(
                '<div id="navPanel">' +
                    '<nav>' +
                        $('#nav').navList() +
                    '</nav>' +
                    toolBoxElement +
                '</div>'
            )
                .appendTo($body)
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
                });

        // Mobile menu submenu collapse/expand functionality
            $navPanel.on('click', '.has-submenu', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var $link = $(this);
                var depth = parseInt($link.attr('data-depth'));
                var $allLinks = $navPanel.find('nav a');
                var currentIndex = $allLinks.index($link);
                var isCollapsed = $link.hasClass('collapsed');
                
                if (isCollapsed) {
                    // Expand: show child items
                    $link.removeClass('collapsed');
                    $link.find('.submenu-toggle').text('‹').css('transform', 'rotate(270deg)');
                    
                    // Show immediate children (depth + 1)
                    for (var i = currentIndex + 1; i < $allLinks.length; i++) {
                        var $nextLink = $allLinks.eq(i);
                        var nextDepth = parseInt($nextLink.attr('data-depth'));
                        
                        if (nextDepth <= depth) break; // Stop at same or parent level
                        if (nextDepth === depth + 1) {
                            $nextLink.removeClass('hidden-submenu');
                        }
                    }
                } else {
                    // Collapse: hide all descendants
                    $link.addClass('collapsed');
                    $link.find('.submenu-toggle').text('›').css('transform', 'rotate(90deg)');
                    
                    for (var i = currentIndex + 1; i < $allLinks.length; i++) {
                        var $nextLink = $allLinks.eq(i);
                        var nextDepth = parseInt($nextLink.attr('data-depth'));
                        
                        if (nextDepth <= depth) break; // Stop at same or parent level
                        $nextLink.addClass('hidden-submenu');
                        
                        // Also mark nested submenus as collapsed
                        if ($nextLink.hasClass('has-submenu')) {
                            $nextLink.addClass('collapsed');
                            $nextLink.find('.submenu-toggle').text('›').css('transform', 'rotate(90deg)');
                        }
                    }
                }
            });
            
            // Initialize all submenus as collapsed on mobile - run immediately after panel creation
            $navPanel.find('.has-submenu').each(function() {
                var $link = $(this);
                $link.addClass('collapsed');
                $link.find('.submenu-toggle').text('›').css('transform', 'rotate(90deg)');
                
                var depth = parseInt($link.attr('data-depth'));
                var $allLinks = $navPanel.find('nav a');
                var currentIndex = $allLinks.index($link);
                
                // Hide all children
                for (var i = currentIndex + 1; i < $allLinks.length; i++) {
                    var $nextLink = $allLinks.eq(i);
                    var nextDepth = parseInt($nextLink.attr('data-depth'));
                    
                    if (nextDepth <= depth) break;
                    $nextLink.addClass('hidden-submenu');
                }
            });

    // Dropdown buttons.
        $('a#languageDropdown').click(function (e) {
            $('ul#languageContent').toggleClass("show");
            e.stopPropagation();
        });
        $(document).click(function() {
            $('ul#languageContent').removeClass("show");
        });

})(jQuery);
