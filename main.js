document.addEventListener('DOMContentLoaded', function() {
    let currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLang;
    updateContent(currentLang);
  
    document.querySelector('.ua').addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('ua');
    });
  
    document.querySelector('.eng').addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('en');
    });
  
    function setLanguage(lang) {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      updateContent(lang);
    }
  
    function updateContent(lang) {
      document.querySelector('.ua').classList.toggle('active', lang === 'ua');
      document.querySelector('.eng').classList.toggle('active', lang === 'en');
  
      updateElementText('nav-item', 'main-page', 0, lang);
      updateElementText('nav-item', 'benefits', 1, lang);
      updateElementText('nav-item', 'advantages', 2, lang);
      updateElementText('nav-item', 'reviews', 3, lang);
      updateElementText('nav-item', 'contacts', 4, lang);
      updateElementText('nav-item', 'order', 5, lang);
      
      updateElementByClass('under-main', 'under-main', lang);
      updateElementByClass('main-info', 'main-info', lang);
      updateElementByClass('buy-button', 'buy-button', lang);
      
      updateElementByClass('adv-p', 'premium-quality', lang);
      updateElementByClass('adv-p2', 'indelible-paint', lang);
      updateElementByClass('adv-p3', 'fast-shipping', lang);
      
      updateElementByClass('reviews', 'reviews-title', lang);
      
      document.querySelectorAll('.about')[0].textContent = translations[lang]['review1'];
      document.querySelectorAll('.about')[1].textContent = translations[lang]['review2'];
      document.querySelectorAll('.about')[2].textContent = translations[lang]['review3'];
      
      const withUsElements = document.querySelectorAll('.with-us');
      withUsElements.forEach(function(el) {
        const year = el.textContent.match(/\d{4}/)[0]; 
        el.textContent = `${translations[lang]['with-us']} ${year}`;
      });
      
      updateElementByClass('order', 'order-title', lang);
      updateElementByClass('accept', 'confirm', lang);
      
      updatePlaceholder('email', 'email-placeholder', lang);
      updatePlaceholder('country', 'country-placeholder', lang);
      updatePlaceholder('city', 'city-placeholder', lang);
      updatePlaceholder('adress', 'address-placeholder', lang);
      
      updateElementByClass('send-text', 'order-button', lang);
      
      updateElementsByClass('questions', ['question1', 'question2', 'question3'], lang);
      updateElementByClass('rights', 'rights', lang);
    }
  
    function updateElementText(className, translationKey, index, lang) {
      const elements = document.getElementsByClassName(className);
      if (elements[index]) {
        elements[index].textContent = translations[lang][translationKey];
      }
    }
  
    function updateElementByClass(className, translationKey, lang) {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.textContent = translations[lang][translationKey];
      }
    }
  
    function updateElementsByClass(className, translationKeys, lang) {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element, i) => {
        if (translationKeys[i]) {
          element.textContent = translations[lang][translationKeys[i]];
        }
      });
    }
  
    function updatePlaceholder(className, translationKey, lang) {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.placeholder = translations[lang][translationKey];
      }
    }
  });