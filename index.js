function initiateSite() {
  let screenWidth = window.innerWidth;
  let menuVisible = false;
  
  const burger = document.querySelector('.burger');
  const menuItems = document.querySelector('.nav-links');
  const aboutMenuLink = document.getElementById("about_link")
  const featuresMenuLink = document.getElementById("features_link")
  const pollMenuLink = document.getElementById("poll_link")
  const waitlistForm = document.getElementById("home_content_cta_form")
  const emailInput = document.getElementById("home_content_cta_input")

  
  displayBurgerOrMenuItems(screenWidth);
  window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    displayBurgerOrMenuItems(screenWidth);
  })

  aboutMenuLink.addEventListener('click', toggleMenu)
  featuresMenuLink.addEventListener('click', toggleMenu)
  pollMenuLink.addEventListener('click', toggleMenu)
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return;
    }
    try {
      await fetch('https://talo-backend.onrender.com/waitlist', { email }, { method: 'POST', Headers: { 'Content-Type': 'application/json' }})
      alert("Thank you for submitting your email! If you are selected to participate in the beta, you will receive an email from us.")
    } catch (err) {
      alert("Error occurred while submitting email. Please try again later.")
    }
    emailInput.value = ""  
  })


  function toggleMenu() {
    if(screenWidth < 600) {
      if(!menuVisible) {
        menuItems.style.display = 'flex'
        menuVisible = true;
      } else {
        menuItems.style.display = 'none'
        menuVisible = false;
      }
    }
  }

  function displayBurgerOrMenuItems(screenWidth) {
    if(screenWidth > 600) {
      burger.style.display = 'none'
      menuItems.style.display = 'flex'
  
    } else {
      menuItems.style.display = 'none'
      burger.style.display = 'flex'
    }

    burger.addEventListener('click', toggleMenu);
  }
}


initiateSite();