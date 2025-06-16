// Sidebar functionality
let sidebarOpen = false;
const openDropdowns = new Set();

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (sidebarOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar.classList.add('active');
  overlay.classList.add('active');
  sidebarOpen = true;
  
  // Prevent body scroll when sidebar is open
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  sidebarOpen = false;
  
  // Restore body scroll
  document.body.style.overflow = '';
}

function toggleDropdown(dropdownName) {
  const dropdown = document.getElementById(dropdownName + '-dropdown');
  const parent = dropdown.parentElement;
  
  if (openDropdowns.has(dropdownName)) {
    // Close dropdown
    dropdown.classList.remove('active');
    parent.classList.remove('active');
    openDropdowns.delete(dropdownName);
  } else {
    // Open dropdown
    dropdown.classList.add('active');
    parent.classList.add('active');
    openDropdowns.add(dropdownName);
  }
}

// Close sidebar when clicking on links
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a:not(.dropdown-btn)');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeSidebar();
    });
  });
  
  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebarOpen) {
      closeSidebar();
    }
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close sidebar if open
        if (sidebarOpen) {
          closeSidebar();
        }
      }
    });
  });
});
const images = [
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
];


let currentIndex = 0;

const preloadImages = () => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

function changeImage() {
  const slider = document.getElementById("slider");


  slider.style.opacity = 0;
  setTimeout(() => {
    slider.style.backgroundImage = `url('${images[currentIndex]}')`;
    slider.style.opacity = 1;
  }, 0);

  currentIndex = (currentIndex + 1) % images.length;
}

document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  changeImage();
  setInterval(changeImage, 10000);
});

var typed = new Typed(".typed-text", {
  strings: ["", ",we are Innovaters"],
  typeSpeed: 40,
  backSpeed: 40,
  backDelay: 2000,
  smartbackspace: true,
  loop: true,
  showCursor: false,

});
const container = document.getElementById("About-us-container-right");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(0xffffff);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);


const geometry = new THREE.BufferGeometry();
const vertices = [];

const size = 1;
const points4D = [];
for (let i = 0; i < 16; i++) {
  const x = (i & 1 ? 0.8 : -1) * size;
  const y = (i & 2 ? 0.8 : -1) * size;
  const z = (i & 4 ? 0.8 : -1) * size;
  const w = (i & 8 ? 0.8 : -1) * size;

  const factor = 1 / (2 - w / size);
  points4D.push(new THREE.Vector3(x * factor, y * factor, z * factor));
}

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 4; j++) {
    const neighbor = i ^ (1 << j);
    if (i < neighbor) {
      vertices.push(points4D[i].x, points4D[i].y, points4D[i].z);
      vertices.push(points4D[neighbor].x, points4D[neighbor].y, points4D[neighbor].z);
    }
  }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.LineBasicMaterial({ color: 0x00BFFF });
const cube = new THREE.LineSegments(geometry, material);
scene.add(cube);


camera.position.z = 5.2;
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
function updateCardColors() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
  document.querySelectorAll('.card').forEach(card => {
    let color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    while(color2 === color1) color2 = colors[Math.floor(Math.random() * colors.length)];
    card.style.setProperty('--card-color-1', color1);
    card.style.setProperty('--card-color-2', color2);
  });
}

async function fetchEvents() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { 
    events: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Event ${i + 1}`,
      description: `This is the description for event ${i + 1}. Enjoy the activities!`,
      date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
      location: ["New York", "London", "Tokyo", "Paris"][i % 4],
      category: ["music", "tech", "food", "art", "sports"][i % 5],
      price: `$${Math.floor(20 + Math.random() * 80)}`,
      image: `https://picsum.photos/400/250?random=${i + 1}`
    }))
  };
}

async function renderEvents() {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = '<div class="loading">Loading events...</div>';
  try {
    const { events } = await fetchEvents();
    cardsContainer.innerHTML = '';    
    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" style="width:100%; border-radius:10px; margin-bottom:12px;">
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
      `;
      cardsContainer.appendChild(card);
    });
    updateCardColors();
    cardsContainer.scrollLeft = 0;
  } catch (error) {
    cardsContainer.innerHTML = '<div class="error">Failed to load events. Please try again later.</div>';
    console.error(error);
  }
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cardsContainer = document.getElementById("cardsContainer");

function getScrollStep() {
  const card = document.querySelector(".card");
  const gap = 20;
  return card ? card.offsetWidth + gap : 320;
}

nextBtn.addEventListener("click", () => {
  const step = getScrollStep();
  if (cardsContainer.scrollLeft + cardsContainer.clientWidth >= cardsContainer.scrollWidth - 10) {
    cardsContainer.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    cardsContainer.scrollBy({ left: step, behavior: "smooth" });
  }
});

prevBtn.addEventListener("click", () => {
  const step = getScrollStep();
  if (cardsContainer.scrollLeft <= 0) {
    cardsContainer.scrollTo({ left: cardsContainer.scrollWidth, behavior: "smooth" });
  } else {
    cardsContainer.scrollBy({ left: -step, behavior: "smooth" });
  }
});

const resizeObserver = new ResizeObserver(() => {
  cardsContainer.scrollLeft = 0;
});
resizeObserver.observe(cardsContainer);

window.addEventListener('DOMContentLoaded', renderEvents);
