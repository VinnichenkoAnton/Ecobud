const modals =() => {
    const showModalByTime = setTimeout(function(){
        document.querySelector('.modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 6000);

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, window) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll(window),
            scroll = calcScroll();
        
        trigger.forEach(item => {
            item.addEventListener('click', (e)=> {
                if(e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                clearInterval(showModalByTime);
            });
        });

        close.addEventListener('click', ()=> {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            clearInterval(showModalByTime);
        });

        modal.addEventListener('click', (e)=>{
            if(e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                clearInterval(showModalByTime);
            }
        });
    } 

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        return scrollWidth;
    }

    bindModal('.calculate__btn', '.modal', '.modal__close', '[data-modal]');
    bindModal('.tender__btn_first', '.modal[data-modal="proj"]', '.modal__close_proj', '[data-modal]');
    bindModal('.tender__btn_second', '.modal[data-modal="tender"]', '.modal__close_tender', '[data-modal]');
    bindModal('.build__btn', '.modal', '.modal__close', '[data-modal]');
    bindModal('.interest__btn', '.modal', '.modal__close', '[data-modal]');
    
};

export default modals;