const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


const loader = new THREE.GLTFLoader();
loader.load('./Model5.glb', function(gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); 
    model.position.set(0, 0, 63); 
    scene.add(model);

    animate(); 
}, undefined, function(error) {
    console.error('An error occurred while loading the model:', error);
});


const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(30, 0, 0); 


controls.update();


window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = function() {
  
  setTimeout(function() {
      document.getElementById('welcome-message').style.display = 'block'; 
  }, 4000); 
  
  setTimeout(function() {
      document.getElementById('welcome-message').style.display = 'none';
  }, 6000);
};




function createStars() {
    const numberOfStars = 100; 
    const cosmosBackground = document.getElementById('cosmos-background');

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        

        const size = Math.random() * 3 + 1; 
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`; 
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`; 

        cosmosBackground.appendChild(star);
    }
}

createStars();