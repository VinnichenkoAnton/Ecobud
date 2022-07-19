function carousel({carouselContent, nextSlide, prevSlide, dotsParent, firstPosition, classForAnimation}) {
  const content = document.querySelector(carouselContent);
      const next = document.querySelector(nextSlide),
      prev = document.querySelector(prevSlide),
      dotsContainer = document.querySelector(dotsParent),
      animationClass = classForAnimation.slice(1);
  let firstSlide = document.querySelector(firstPosition),
      contentArr = [...(content.children)];

  const dots = document.createElement('ol'),
    indicators = [];

  dots.classList.add('brandslider__dots');
  dotsContainer.append(dots);

  contentArr.forEach((number, index) => {
    for (let i = 0; i < content.children.length; i++) {
      number.setAttribute('slide-number', index);      
  }
  });  

  for (let i = 0; i < content.children.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i);
    dot.classList.add('brandslider__dot');
    if (i == 0) {
        dot.classList.add('brandslider__dot_active');
    }
    dots.append(dot);
    indicators.push(dot);
  }

  indicators.forEach(dot => {
      dot.addEventListener('click', (e) => {
        let slideDot = e.target.getAttribute('data-slide-to');
        let newArr = contentArr.filter(number => {
          if(number.getAttribute('slide-number') === slideDot) {
            return number;
          } else { 
            return;
          }
        });

        let newContentList = contentArr.slice(0, newArr[0].getAttribute('slide-number'));
        content.prepend(newArr[0]);
        content.append(...newContentList);

        indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));
        indicators[slideDot].classList.add('brandslider__dot_active');

        contentArr.forEach(child => child.classList.remove(animationClass));
        content.firstChild.classList.add(animationClass);
      });
  });

  const slide = event => {
    event.preventDefault();
      if (event.currentTarget.className == next.className) {
        firstSlide = document.querySelector(firstPosition);
        content.append(firstSlide);
        
        contentArr.forEach(child => child.classList.remove(animationClass));
        content.firstChild.classList.add(animationClass);

        let slideDot = +firstSlide.getAttribute('slide-number');
        indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));
        
        if(slideDot + 1 == indicators.length ) {
          slideDot = 0;
          indicators[slideDot].classList.add('brandslider__dot_active'); 

        } else {
          indicators[slideDot + 1].classList.add('brandslider__dot_active');
        } 
      } else if(event.currentTarget.className == prev.className) {
        firstSlide = document.querySelector(firstPosition);
        content.prepend(content.lastChild);

        contentArr.forEach(child => child.classList.remove(animationClass));
        content.firstChild.classList.add(animationClass);

        let slideDot = firstSlide.getAttribute('slide-number');
        indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));
        
        if(slideDot == 0) {
          slideDot = indicators.length -1;
          indicators[slideDot].classList.add('brandslider__dot_active'); 

        } else {
          indicators[slideDot -1].classList.add('brandslider__dot_active');
        } 
        
      } else {
        return;
      }
  };

   
  prev.addEventListener("click", slide);
  next.addEventListener("click", slide);
}
export default carousel;