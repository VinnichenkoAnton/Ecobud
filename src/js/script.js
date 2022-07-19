'use strict';
import modals from './modules/modals';
import tabs from './modules/tabs';
import slider from './modules/slider';
import images from './modules/images';
import carousel from './modules/carousel';
import mask from './modules/mask';
import mailer from './modules/mailer';

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
};

window.addEventListener('DOMContentLoaded', () => {
    modals();
    tabs('.tabs-btn', '.tabs__content', '.tabs__list', 'tabs-btn_active');
    slider({
        container: '#tab_one',
        slide: '.tabs__library',
        nextArrow: '.tabs__controls_right',
        prevArrow: '.tabs__controls_left',
        totalCounter: '.tabs__numeration_total',
        currentCounter: '.tabs__numeration_concrete',
        wrapper: '.tabs__wrapper',
        field: '.tabs__inner'
    });
    slider({
        container: '#tab_two',
        slide: '.tabs__library-second',
        nextArrow: '.tabs__controls_right-second',
        prevArrow: '.tabs__controls_left-second',
        totalCounter: '.tabs__numeration_total-second',
        currentCounter: '.tabs__numeration_concrete-second',
        wrapper: '.tabs__wrapper-second',
        field: '.tabs__inner-second'
    });
    images('.tabs__wrapper');
    images('.tabs__wrapper-second');
    carousel({
        carouselContent: '.brandslider__content',
        nextSlide: '.brandslider__controls_right',
        prevSlide: '.brandslider__controls_left',
        dotsParent: '.brandslider__wrapper',
        firstPosition: '.brandslider__item',
        classForAnimation: '.fade'
    });
    mask();
    mask();
    mailer('.modal__form_proj', '../mailer/send.php', '.modal[data-modal="proj"]', '#userfile', '.modal__file_proj');
    mailer('.modal__form_tender', '../mailer/send-tender.php', '.modal[data-modal="tender"]', '#userfile-tender', '.modal__file_tender');

});