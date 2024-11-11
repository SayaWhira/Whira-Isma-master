// <!-- java script Navbar -->
const stickytop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");
offcanvas.addEventListener("show.bs.offcanvas", function () {
  stickytop.style.overflow = "visible";
});
offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickytop.style.overflow = "hidden";
});
// java script Navbar End//

// <!-- java script section music start -->
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const music = document.querySelector("#music");
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();

  document.querySelector(".hero").classList.add("lift");

  setTimeout(function () {
    document.querySelector(".hero").classList.add("hero-hidden");
  }, 2000);

  document.getElementById("quran").classList.add("animate");
}

function playAudio() {
  music.volume = 0.5;
  audioIconWrapper.style.display = "flex";
  music.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    music.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    music.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};
disableScroll();
// <!-- POST goggle sheet section -->

window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!");
    });
  });
});

// <!-- POST goggle sheet section end -->
// untuk nama di URL
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("nama") || "";
const pronoun = urlParams.get("panggilan") || "Bapak/Ibu/Saudara/i";
const namaContainer = document.querySelector(".hero h4 span");

namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");

document.querySelector("#nama").value = nama;

// <!-- simplycount down Java Script -->
simplyCountdown(".simply-countdown", {
  year: 2024, // required
  month: 11, // required
  day: 30, // required
  hours: 8, // Default is 0 [0-23] integer
  minutes: 0, // Default is 0 [0-59] integer
  seconds: 0, // Default is 0 [0-59] integer
  words: {
    //words displayed into the countdown
    days: { singular: "Hari", plural: "Hari" },
    hours: { singular: "Jam", plural: "Jam" },
    minutes: { singular: "Menit", plural: "Menit" },
    seconds: { singular: "Detik", plural: "Detik" },
  },
});
// text quran//
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk memicu animasi ketika elemen quran masuk ke viewport
  let observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startTypingAnimation(); // Panggil fungsi animasi pengetikan
          observer.unobserve(entry.target); // Stop observing setelah animasi berjalan
        }
      });
    },
    {
      threshold: 0.0, // Elemen harus mulai terlihat sedikit di viewport
    }
  );

  // Targetkan section #quran
  let quranSection = document.getElementById("quran");
  observer.observe(quranSection); // Mulai memantau section quran

  // Fungsi untuk animasi pengetikan
  function startTypingAnimation() {
    const text =
      "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir";
    const reference = "Qs: Ar - Rum Ayat 21";
    const container = document.querySelector(".ayat");
    const referenceContainer = document.querySelector(".reference");

    container.innerHTML = ""; // Kosongkan konten awal
    let index = 0;

    function type() {
      if (index < text.length) {
        container.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 20); // Atur kecepatan munculnya huruf (ms)
      } else {
        container.classList.add("animate"); // Tampilkan ayat setelah selesai
        setTimeout(() => {
          referenceContainer.innerHTML = reference;
          referenceContainer.classList.add("animate"); // Tampilkan referensi setelah ayat
        }, 500); // Tambahkan delay sebelum referensi muncul
      }
    }

    type(); // Mulai animasi
  }
});

// Select all nav links inside the offcanvas
const navLinks = document.querySelectorAll(".offcanvas-body .nav-link");
const offcanvasElement = document.getElementById("offcanvasNavbar");

// Function to close the offcanvas
const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Close the offcanvas when any link is clicked
    bsOffcanvas.hide();
  });
});

// Function to add typing effect to each paragraph
function typeText(element, text, delay) {
  return new Promise((resolve) => {
    let index = 0;
    element.innerHTML = "";

    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
        resolve(); // Animation complete
      }
    }

    type();
  });
}

// Function to trigger the typing effect when the section is in the viewport
function triggerTypingEffect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const paragraphs = entry.target.querySelectorAll("p");

      paragraphs.forEach((p) => {
        const originalText = p.innerHTML;
        typeText(p, originalText, 50); // Adjust typing speed
      });

      observer.unobserve(entry.target); // Stop observing once the animation is triggered
    }
  });
}

// Set up observer for the section
document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver(triggerTypingEffect, options);
  const section = document.querySelector("#home");

  if (section) {
    observer.observe(section); // Start observing the section
  }
});

// java script Home Section//
// Function to add typing effect to each paragraph
function typeText(element, text, delay) {
  return new Promise((resolve) => {
    let index = 0;
    element.innerHTML = "";

    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
        resolve(); // Animation complete
      }
    }

    type();
  });
}

// Function to trigger animations (including typing) when section is visible
function triggerTypingEffect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const section = entry.target;
      const paragraphs = section.querySelectorAll("p");

      // Add the 'animate' class to trigger CSS animations
      section.classList.add("animate");

      // Trigger typing animation for each paragraph
      paragraphs.forEach((p) => {
        const originalText = p.innerHTML;
        typeText(p, originalText, 1); // Adjust typing speed
      });

      observer.unobserve(section); // Stop observing once animations are triggered
    }
  });
}

// Set up observer for the section
document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver(triggerTypingEffect, options);
  const section = document.querySelector("#home");

  if (section) {
    observer.observe(section); // Start observing the section
  }
});

// Function to add typing effect to each paragraph
// function typeText(element, text, delay) {
//   return new Promise((resolve) => {
//     let index = 0;
//     element.innerHTML = "";

//     function type() {
//       if (index < text.length) {
//         element.innerHTML += text.charAt(index);
//         index++;
//         setTimeout(type, delay);
//       } else {
//         resolve(); // Animation complete
//       }
//     }

//     type();
//   });
// }

// Function to trigger animations (including typing) when section is visible home
// function triggerTypingEffect(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const section = entry.target;
//       const paragraphs = section.querySelectorAll("p");

//       // Add the 'animate' class to trigger CSS animations
//       section.classList.add("animate");

//       // Trigger typing animation for each paragraph
//       paragraphs.forEach((p) => {
//         const originalText = p.innerHTML;
//         typeText(p, originalText, 1); // Adjust typing speed
//       });

//       observer.unobserve(section); // Stop observing once animations are triggered
//     }
//   });
// }

// Set up observer for the section
document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver(triggerTypingEffect, options);
  const section = document.querySelector("#home");

  if (section) {
    observer.observe(section); // Start observing the section
  }
});
//  slide foto di info
const imagesDesktop = [
  "img/slide/RJN06372.jpg",
  "img/slide/RJN06394.jpg",
  "img/slide/RJN06408.jpg",
  "img/slide/RJN06466.jpg",
  // "img/slide/RJN06389.jpg",
  // "img/slide/RJN06436.jpg",
];

const imagesMobile = [
  "img/slide/RJN06372_mobile.jpg",
  "img/slide/RJN06394_mobile.jpg",
  "img/slide/RJN06408_mobile.jpg",
  "img/slide/RJN06466_mobile.jpg",
  "img/slide/RJN06389_mobile.jpg",
  "img/slide/RJN06436_mobile.jpg",
];

let images = window.matchMedia("(max-width: 768px)").matches
  ? imagesMobile
  : imagesDesktop;
let currentIndex = 0;

function changeBackground() {
  const section = document.getElementById("info");

  // Ubah background sesuai dengan gambar dari array
  section.style.backgroundImage = `url(${images[currentIndex]})`;
  section.style.backgroundSize = "cover";
  section.style.backgroundPosition = "center";

  // Update index untuk gambar berikutnya
  currentIndex = (currentIndex + 1) % images.length; // Kembali ke 0 jika mencapai akhir array
}

// Ubah gambar setiap 5 detik
setInterval(changeBackground, 5000);

// Set background pertama kali saat halaman di-load
window.onload = changeBackground;

// Update gambar saat ukuran layar berubah
window.addEventListener("resize", () => {
  images = window.matchMedia("(max-width: 768px)").matches
    ? imagesMobile
    : imagesDesktop;
});
