'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')
const operationColor = document.querySelector('.operations')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



const btnScrollTo  = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('.section--1')

// smooth scrolling 

btnScrollTo.addEventListener('click',function(e){
  section1.scrollIntoView({behavior: 'smooth'})
})


// page navigation using event delegation 

document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();
     const id = this.getAttribute('href')
     document.querySelector(id).scrollIntoView({behavior : 'smooth'})
      

  })

})
 
// tabbed components 

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')




// using event delegation

tabsContainer.addEventListener('click', function(e){
  
  const clicked = e.target.closest('.operations__tab');
   

  // Guard clause

  if(!clicked) return;

  tabs.forEach(e => e.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')
  operationColor.style.backgroundColor = "white"

  // Active content
  
  const clickedContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`)

  tabsContent.forEach(e => e.classList.remove('operations__content--active'))

  clickedContent.classList.add('operations__content--active')

})

 

//  fade navigation  when hovering


const navigate = document.querySelector('.nav')

navigate.addEventListener('mouseover', function(e){

 
   
  if(e.target.classList.contains('nav__logo') || e.target.classList.contains('nav__link'))
  {
    const navLinkHover = e.target
    const parent =navLinkHover.closest('.nav')
    const siblings = parent.querySelectorAll('.nav__link')
    const logoo = parent.querySelector('img')
    siblings.forEach(el => {
    
      if (el !== navLinkHover )
         { 
            el.style.opacity = 0.5
         }
       })
  }
})

navigate.addEventListener('mouseout', function(e){
    
  const navLinkHover = e.target 
  const parent = navLinkHover.closest('.nav')
  const siblings = parent.querySelectorAll('.nav__link')
  const logo = parent.querySelector('img')
   
  siblings.forEach(el => {
    if (el !== navLinkHover){
      el.style.opacity = 1
    }
    logo.style.opacity = 1

  })
   


})

 

// sticky navigation


const mainHeader = document.querySelector('.header')

// navheight is for  getting sticky nav in mobile devices
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){

  
  const [entry] = entries;//[0]
  
 if(entry.isIntersecting == false)
 {
  nav.classList.add('sticky')
 }
else{
   nav.classList.remove('sticky')
}


}


const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(mainHeader)



// reveal each section when reaching



const allSection = document.querySelectorAll('.section')

 const revealSection = function(entries,obs){
  
  const [entry]  = entries
  
  if(entry.isIntersecting == true){
    entry.target.classList.remove('section--hidden')
    obs.unobserve(entry.target)

  }
 }



const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.
})

  allSection.forEach(function(sect){
  
   sectionObserver.observe(sect)


  })



  // lazy loading images 


  const allImages = document.querySelectorAll('img[data-src]')

  const lazyLoad = function(entries,obs){
    const [entry] = entries
    if(entry.isIntersecting == true)
    {
        entry.target.src = entry.target.dataset.src
    
         // to load faster in 3g network
        
      entry.target.addEventListener('load',function(){
        entry.target.classList.remove('lazy-img')
      })
  
      obs.unobserve(entry.target)
    }
  }

 const imageObserver = new IntersectionObserver(lazyLoad,{
  root:null,
  threshold:0,
  rootMargin:'300px'
})
  allImages.forEach(function(image){
  
     imageObserver.observe(image)

  })


// slider
const slides = document.querySelectorAll('.slide')
 let currentSlide = 1;
 let maxSlide = slides.length-1
 let minSlide = 0


 
const gotoNextSlide = function(curr){
  
  slides.forEach(function(slide,i)

  {     
    slide.style.transform = `translateX(${100*(i - curr)}%)`
   
  })
  
}
 
  // right slider button



 const slideRightBtn = document.querySelector('.slider__btn--right')
  

    const rightMove = function()
  {
    currentSlide++;
    if(currentSlide <= maxSlide)
      {
        
        gotoNextSlide(currentSlide)
      }
    else 
    {  
      
       currentSlide=0
       gotoNextSlide(currentSlide)
    }  
 }
 slideRightBtn.addEventListener('click',rightMove)

 

// first loading slide 

slides.forEach(function(slide,i){

  slide.style.transform = `translateX(${100*i}%)`

}
)


// left slider button


const slideLeftBtn = document.querySelector('.slider__btn--left')

  const leftMove = function()
  {
   currentSlide--; 

    if(currentSlide >= minSlide)
      {
       
       gotoNextSlide(currentSlide)
      }
      else 
      {   
          
        currentSlide= slides.length-1
        gotoNextSlide(currentSlide)

      }
     
}
slideLeftBtn.addEventListener('click',leftMove)


//moving  to next slide using keypress left arrow and right arrow

document.addEventListener('keydown',function(e){
  if(e.key == 'ArrowLeft')
  {
    leftMove()
    
  }
  else if(e.key == 'ArrowRight')
  {
    rightMove()
    
  }
})






 


  
