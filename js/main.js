/* Start Section Settings Box */

// Check If There's Local Storage Color Option
let mainColorLocalStorage = localStorage.getItem("color_option");
if (mainColorLocalStorage !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    mainColorLocalStorage
  );

  // Loop On Lis Colors
  document.querySelectorAll(".colors-list li").forEach((element) => {
    // reomve class active form all lis
    element.classList.remove("active");
    //add class active to element
    if (mainColorLocalStorage == element.dataset.color) {
      element.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;
let stop;

// Check If There's Local Storage Random Background Option
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Loop On  Background Options
  document.querySelectorAll(".random-background span").forEach((element) => {
    // reomve class active form all lis
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else if (backgroundLocalItem === "false") {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// add toggle class to settings-box and settings-option (gear)
let settingsBox = document.querySelector(".settings-box");
let settingOption = document.querySelector(".settings-box .gear");

settingOption.onclick = () => {
  settingsBox.classList.toggle("open");
  settingOption.children[0].classList.toggle("fa-spin");
};
// switch color
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    /* //remove class active form all
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    //add class active to li color option
    e.target.classList.add("active"); */
    handleActive(e);
  });
});
// switch Random Background Imgs Option
let randomBackground = document.querySelectorAll(".random-background span");
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    /* // remove class active
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // add class actvie
    e.target.classList.add("active"); */
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomImgs();
    } else {
      backgroundOption = false;

      clearInterval(stop);
    }
    localStorage.setItem("background_option", backgroundOption);
  });
});
/* End Section Settings Box */
/* Start Bullets */
let bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
/* End Bullets */
/* Start landing Section */
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgs = [
  "../imgs/1.jpg",
  "../imgs/2.jpg",
  "../imgs/3.jpg",
  "../imgs/4.jpg",
  "../imgs/5.jpg",
  "../imgs/6.jpg",
];

// Funtion To Randomize Imgs
function randomImgs() {
  if (backgroundOption === true) {
    // Change Background Image URL
    stop = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgs.length);
      landingPage.style.backgroundImage = `url(${imgs[randomNumber]})`;
    }, 2000);
  }
}
randomImgs();
/* End landing Section */

/* Start Our Skills Section */
let progress = document.querySelectorAll(".our-skills span");
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills offset Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  // The Resulte Of Scrolling
  let resulte = skillsOffsetTop + skillsOuterHeight - windowHeight;
  if (windowScrollTop >= resulte - 300) {
    progress.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else if (windowScrollTop < resulte - 300) {
    progress.forEach((span) => {
      span.style.width = 0;
    });
  }
};
/* End Our Skills Section */
/* Start Our Gallary */
let imgClicked = document.querySelectorAll(".our-gallary img");
imgClicked.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create PopUP overlay
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.appendChild(overLay);

    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      let textHeading = document.createTextNode(img.alt);

      // Append Child
      imgHeading.appendChild(textHeading);
      popupBox.appendChild(imgHeading);
    }
    // Create Popup Image
    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    // Append Child
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // Create The Close Span
    let close = document.createElement("span");
    close.className = "close";
    close.textContent = "x";
    popupBox.appendChild(close);
  });
});
// Close PopUp
document.addEventListener("click", function (e) {
  if (e.target.className === "close") {
    /* e.target.parentNode.remove(); */
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});
/* End Our Gallary */
/* Start Links */
let links = document.querySelectorAll(".links a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
/* End Links */
///// Function Handle Active State
function handleActive(ev) {
  // Remove Class Active Form All Chlidren
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //add class active to li color option
  ev.target.classList.add("active");
}

let bulletsOption = document.querySelectorAll(".show-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsOptionLocalStorage = localStorage.getItem("bullets-option");

if (bulletsOptionLocalStorage !== null) {
  // Loop On  Bullets Options
  bulletsOption.forEach((element) => {
    // reomve class active form all lis
    element.classList.remove("active");
  });
  if (bulletsOptionLocalStorage == "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".show-bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".show-bullets .no").classList.add("active");
  }
}

bulletsOption.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    if (e.target.dataset.display === "hide") {
      bulletsContainer.style.display = "none";
    } else {
      bulletsContainer.style.display = "block";
    }
    localStorage.setItem("bullets-option", e.target.dataset.display);
    handleActive(e);
  });
});

///// Reset Button
document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("bullets-option");

  localStorage.removeItem("background_option");

  localStorage.removeItem("color_option");

  window.location.reload();
};
/* Start Drop Down Menu */
let menu = document.querySelector(".toggle-menu");
let linksOpen = document.querySelector(".links");
/* menu.addEventListener("click", () => {
  linksOpen.classList.toggle("open");
  menu.classList.toggle("menu-active");
}); */
menu.onclick = function (e) {
  e.stopPropagation();
  linksOpen.classList.toggle("open");
  menu.classList.toggle("menu-active");
};
linksOpen.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  /* if (e.target !== menu && e.target !== linksOpen) {
    linksOpen.classList.remove("open");
    menu.classList.remove("menu-active");
  } */
  if (
    !(
      e.target.classList.contains("open") ||
      e.target.classList.contains("menu-active")
    )
  ) {
    linksOpen.classList.remove("open");
    menu.classList.remove("menu-active");
  }
});

/* End Drop Down Menu */
