function images(tabsWrapper) {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector(tabsWrapper),
        bigImage = document.createElement('img'),
        body = document.querySelector('body');

        imgPopup.classList.add('tabs__popup');
        workSection.appendChild(imgPopup);

        imgPopup.style.justifyContent = 'center';
        imgPopup.style.alignItems = 'center';
        imgPopup.style.display = 'none';

        imgPopup.appendChild(bigImage);

        workSection.addEventListener('click', (e)=> {
            e.preventDefault();
            let target = e.target;
            if(target && target.classList.contains('tabs__preview')) {
                imgPopup.style.display = 'flex';
                const path = target.getAttribute('src');
                bigImage.setAttribute('src', path);
                body.style.overflow = 'hidden';
            }
            if(target && target.matches('div.tabs__popup')){
                imgPopup.style.display = 'none';
                body.style.overflow = 'visible';
            }
        });
}

export default images;