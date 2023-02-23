"use strict"

window.addEventListener('DOMContentLoaded', () => {
    // mobile or pc device
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');
    } else {
        document.body.classList.add('pc');
    }

    // mobile menu 
    const mobileMenuIcon = document.querySelector('.menu-icon'),
          mobileMenuLinks = document.querySelectorAll('.header-link'),
          menuWindow = document.querySelector('.header-links');

    if (mobileMenuIcon) mobileMenuIcon.addEventListener('click', mobileMenuOpen);
    if ( mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => link.addEventListener('click', scrollToSection))
    }
    if (menuWindow) {
        menuWindow.addEventListener('click', (e) => {
            if (e.target == menuWindow) {
                mobileMenuClose();
            }
        })
    }

    function mobileMenuOpen () {
        mobileMenuIcon.parentElement.classList.toggle('active');
        document.body.classList.toggle('_lock')
    }
    function mobileMenuClose () {
        mobileMenuIcon.parentElement.classList.remove('active');
        document.body.classList.remove('_lock')
    }

    function scrollToSection(e){
        const menuLink = e.target;
        
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
        mobileMenuIcon.parentElement.classList.remove('active');
        document.body.classList.remove('_lock');
        e.preventDefault();
    }

    // tell, email, request modals
    const modalMessages = {
        thankSubscr: `Thank you for subscribing to the latest news of our project!`,
        thankRequest: 'Thank you, we will contact you soon',
        thankTelephone: 'Thank you, we will call you back soon',
        thankMail: 'Thank you for your inquiry, you will receive the details by email',
    }

    const getNowBtn = document.querySelector('.content-button'),
          getNowWindow = document.querySelector('.get-now-window'),
          getNowForm = document.querySelector('.get-now-form'),
          getNowMessage = document.querySelector('.getnow-message'),
          getNowClose = document.querySelector('.form-close');

    if (getNowBtn) {
        getNowBtn.addEventListener('click', () => {
            openModalWindow(getNowWindow);
        });
    }
    if (getNowClose) {
        getNowClose.addEventListener('click', () => {
            closeModalWindow(getNowWindow);
        });
    }
    if (getNowForm) {
        getNowForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showThankMessage(getNowForm, getNowMessage, modalMessages.thankTelephone);
            setTimeout(() => {
                closeModalWindow(getNowWindow);
            },3200)
        });
    } 
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.get-now-window') && !e.target.closest('.content-button')) {
            getNowWindow.classList.remove('_show-window');
        }
    });

    const learnMorebtn = document.querySelector('#learn-more'),
          learnMoreWindow = document.querySelector('.learn-more-window'),
          learnMoreForm = document.querySelector('.learn-more-form'),
          learnMoreMessage = document.querySelector('.learnmore-message'),
          learnMoreClose = document.querySelector('.learn-more-close');

    if (learnMorebtn) {
        learnMorebtn.addEventListener('click', () => {
            openModalWindow(learnMoreWindow);
        });
    }
    if (learnMoreClose) {
        learnMoreClose.addEventListener('click', () => {
            closeModalWindow(learnMoreWindow);
        });
    }
    if (learnMoreForm) {
        learnMoreForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showThankMessage(learnMoreForm, learnMoreMessage, modalMessages.thankMail);
            setTimeout(() => {
                closeModalWindow(learnMoreWindow);
            },3200)
        });
    }
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.learn-more-window') && !e.target.closest('#learn-more')){
            learnMoreWindow.classList.remove('_show-window');
        }
    });

    // news modal
    const newsForm = document.querySelector('.news-form'),
          thankMessage = document.querySelector('.whoweare-message');

    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showThankMessage(newsForm, thankMessage, modalMessages.thankSubscr);
            
        })
    }

    // submit request 
    const requestBtn = document.querySelectorAll('.getintouch-card-button'),
          requestFormWindow = document.querySelector('.submit-request-window'),
          requestForm = document.querySelector('.submit-request-form'),
          messageRequest = document.querySelector('.request-message'),
          requestFormClose = document.querySelector('.submit-request-window-close');

    if (requestBtn.length > 0) {
        requestBtn.forEach(button => button.addEventListener('click', () => {
            openModalWindow(requestFormWindow);
        }));
    }
    if (requestFormClose) {
        requestFormClose.addEventListener('click', () => {
            closeModalWindow(requestFormWindow);
        });
    }
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showThankMessage(requestForm, messageRequest, modalMessages.thankSubscr);
            setTimeout(() => {
                closeModalWindow(requestFormWindow);
            },3200)
        })
    }
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.submit-request-window') && !e.target.closest('.getintouch-card-button')) {
            requestFormWindow.classList.remove('_show-window');
        }
    });


    // show contacts modal
    const contactsBtn = document.querySelector('.contact-us-button'),
          closeContactsWindowBtn = document.querySelector('.contact-window-close'),
          contactsWindow = document.querySelector('.contact-window');

    if(contactsBtn) {
        contactsBtn.addEventListener('click', () => {
            contactsWindow.classList.toggle('_active-window');
        });
    }
    if (closeContactsWindowBtn) {
        closeContactsWindowBtn.addEventListener('click', () => {
            contactsWindow.classList.toggle('_active-window');
        });
    }

    function openModalWindow (window) {
        window.classList.toggle('_show-window');
    }
    function closeModalWindow (window) {
        window.classList.remove('_show-window');
    }

    function showThankMessage ( form, messageblock, message) {
        form.reset();
        messageblock.classList.add('_active-window');
        messageblock.innerHTML = message;
        setTimeout(() => {
            messageblock.classList.remove('_active-window');
        },3500);
    }

    // footer links arrow 
    const linkArrow = document.querySelectorAll('._links-title');

    if (linkArrow.length > 0) {
        linkArrow.forEach( arrow => arrow.addEventListener('click', () => {
            arrow.parentElement.classList.toggle('active')
        }));
    }

    // scroll top arrow
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (scrollArrow) scrollArrow.addEventListener('click', scrollToSection );

    window.addEventListener('scroll', showScrollArrow);

    function showScrollArrow () {
        let scrollTop = window.scrollY;
        
        if (scrollTop > 1500) {
            scrollArrow.classList.add('_show-arrow');
        } else {
            scrollArrow.classList.remove('_show-arrow');
        }
    }


});