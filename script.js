$(document).ready(function() {
    
    // 1. Preloader
    setTimeout(function(){
        $('#preloader').fadeOut('slow');
    }, 1500);

    // 2. THEME TOGGLE LOGIC
    const themeBtn = $('#themeToggle');
    const themeIcon = $('#themeIcon');
    const html = $('html');
    const navbar = $('.navbar');

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeBtn.click(function() {
        const currentTheme = html.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        html.attr('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'light') {
            themeIcon.removeClass('bi-moon-stars-fill').addClass('bi-sun-fill text-warning');
            // Adjust navbar text color for visibility on light background
            if (navbar.hasClass('scrolled')) {
                $('.nav-link').css('color', '#333');
            }
        } else {
            themeIcon.removeClass('bi-sun-fill text-warning').addClass('bi-moon-stars-fill text-white');
            $('.nav-link').css('color', '#fff');
        }
    }

    // 3. Typing Effect
    const textToType = "Computer Engineering Student | Photo & Videography Enthusiast";
    const typingElement = $('#typing-text');
    let i = 0;
    function typeWriter() {
        if (i < textToType.length) {
            typingElement.text(typingElement.text() + textToType.charAt(i));
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 2000);

    // 4. Navbar & Link Color Management on Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            navbar.addClass('scrolled');
            // If light mode, make nav text dark when scrolled
            if (html.attr('data-theme') === 'light') {
                $('.nav-link').css('color', '#333');
                $('.navbar-toggler span').css('color', '#333');
            }
        } else {
            navbar.removeClass('scrolled');
            // Always white text on Hero section (transparent navbar)
            $('.nav-link').css('color', '#fff');
            $('.navbar-toggler span').css('color', '#fff');
        }
    });

    // 5. Scroll Reveal
    $(window).scroll(function() {
        $('.reveal').each(function() {
            var bottom_of_object = $(this).offset().top + 50;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('active');
                $(this).find('.progress-bar').each(function() {
                    var width = $(this).attr('data-width');
                    $(this).css('width', width);
                });
            }
        });
    });

    // 6. 3D Tilt Effect
    const tiltContainer = $('#profileTilt');
    tiltContainer.mousemove(function(e) {
        const width = tiltContainer.width();
        const height = tiltContainer.height();
        const offset = tiltContainer.offset();
        const xPos = e.pageX - offset.left;
        const yPos = e.pageY - offset.top;
        const xRotate = ((yPos - height / 2) / height) * 20;
        const yRotate = ((xPos - width / 2) / width) * 20;
        tiltContainer.css('transform', `perspective(500px) rotateX(${-xRotate}deg) rotateY(${yRotate}deg) scale(1.05)`);
    });
    tiltContainer.mouseleave(function() {
        tiltContainer.css('transform', 'perspective(500px) rotateX(0) rotateY(0) scale(1)');
    });

});