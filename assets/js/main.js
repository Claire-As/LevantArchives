import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

/*

<script type="importmap">
	{
		"imports": {
			"three": "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js",
			"GLTFLoader": "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js"
		}
	}
</script>

"imports": {
	"three": "https://unpkg.com/three@0.160/build/three.module.js",
	"GLTFLoader": "https://unpkg.com/three@0.160/examples/jsm/loaders/GLTFLoader.js"
}
*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);


const loader = new GLTFLoader();

// Fonction pour charger et ajouter un modèle à la scène
function loadModel(url, position, rotation, scale) {
    loader.load(url, function (gltf) {
        const model = gltf.scene;
        
        // Appliquer les propriétés uniques à chaque modèle
        model.position.copy(position);
        model.rotation.set(rotation.x, rotation.y, rotation.z);
        model.scale.set(scale, scale, scale);
        
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });
}

// Charger et ajouter plusieurs modèles avec des propriétés uniques
loadModel('assets/3d/glb/silent_hill_2_baldwin_study_room_normal.glb', new THREE.Vector3(-40, -15, -5), new THREE.Vector3(0, -0.5, 0), 0.5);
loadModel('assets/3d/glb/office_drawer.glb', new THREE.Vector3(2, -2, -1), new THREE.Vector3(0, 1, 0), 1);
//loadModel('assets/3d/glb/office_room.glb', new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -0.5, 0), 1);


const ambientLight = new THREE.AmbientLight(0x404040); // Couleur ambiante
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Couleur et intensité
directionalLight.position.set(1, 1, 1); // Position de la lumière
scene.add(directionalLight);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Pour un mouvement doux et fluide
controls.dampingFactor = 0.25; // Ajustez la vitesse de damping si nécessaire

camera.position.set(0, 0, 5); // Position initiale de la caméra
camera.position.z = 3;


function animate() {
    requestAnimationFrame(animate);
    // Ajoutez des transformations, animations, etc., selon votre besoin
    requestAnimationFrame(animate);
    controls.update(); // Mettre à jour les contrôles de la caméra
    renderer.render(scene, camera);
}
animate();


/************************* INTERACTIONS ******************************/

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    if (selectedObject) {
        // Réagir au clic sur l'objet sélectionné
        console.log('Objet sélectionné :', selectedObject);
    }
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);

function pick(event) {
    if (event.target.tagName.toLowerCase() === 'canvas') {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            selectedObject = intersects[0].object;
        } else {
            selectedObject = null;
        }
    }
}

window.addEventListener('click', pick, false);