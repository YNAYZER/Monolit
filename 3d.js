import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(new THREE.AmbientLight(0xffffff, 2));

const loader = new GLTFLoader();
let mixer;

loader.load('non_stop_energy.glb', function (gltf) {
  const model = gltf.scene;
  scene.add(model);
  model.scale.set(2, 2, 2);

  mixer = new THREE.AnimationMixer(model);
  gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
});

camera.position.z = 5;

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}
animate();
