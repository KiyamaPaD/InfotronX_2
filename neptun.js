const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Load the GLTF model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('./Model5.glb', function(gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale as necessary
    model.position.set(84, 0, 100); // Adjust position as necessary
    scene.add(model);

    animate(); // Start animation/render loop
}, undefined, function(error) {
    console.error('An error occurred while loading the model:', error);
});

// Setup OrbitControls to allow rotation and zoom
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(10, 1, 28); // Adjust camera position (z = 5 means zoomed out)

// Update the controls in the render loop
controls.update();

// Handle window resizing
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop for rendering
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = function() {
  // Set a timer for the message to appear after UFO reaches the center
  setTimeout(function() {
      document.getElementById('welcome-message').style.display = 'block'; // Show the message
  }, 4000); // 4 seconds (just before the UFO stops at the center)
  
  // Set a timer to hide the message after it's shown for 2 seconds
  setTimeout(function() {
      document.getElementById('welcome-message').style.display = 'none'; // Hide the message
  }, 6000); // Show for 2 seconds after 4 seconds
};



// Generate random stars
function createStars() {
    const numberOfStars = 100; // Adjust this for more or fewer stars
    const cosmosBackground = document.getElementById('cosmos-background');

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize the position and size of the stars
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`; // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random twinkle duration

        cosmosBackground.appendChild(star);
    }
}

// Call the function to create stars
createStars();