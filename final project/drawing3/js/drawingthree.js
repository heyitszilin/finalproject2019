var scene, camera, renderer, controls, raycaster;
var geometry, material, mesh;
var body = document.querySelector('body');

// setting up the particles
var particleCount = 10;
var particles = [];

init();
animate();

// initiating everything
function init() {
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(100, width/height, 1, 20000 ); // FOV, aspect ration, near, far
  camera.position.set(0,0,1000); //x,y,z
  scene.add(camera);

  //creating light & shadows
  let light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(1, 1, 1); // x,y, z locatoin
  light.castShadow = true;
  scene.add(light);

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height);
  renderer.setClearColor( 0x000000, 0 ); // the default


  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;

  document.body.appendChild(renderer.domElement);
  raycaster = new THREE.Raycaster();
  renderer.render(scene, camera);

  fillScene();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}

function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

function fillScene() {

  var particleGeometry = new THREE.BoxGeometry(400, 400, 400);
  var particleMaterial = new THREE.MeshPhongMaterial (
    {
    color: 0xD4AF37,
    transparent: true,
    opacity: 0.5
    }
  );

  // adding images to faces
  var textureLoader = new THREE.TextureLoader();

  var pictures = [
  textureLoader.load( 'media/1.jpg' ),
  textureLoader.load( 'media/2.jpg' ),
  textureLoader.load( 'media/3.jpg' ),
  textureLoader.load( 'media/4.jpg' ),
  textureLoader.load( 'media/5.jpg' ),
  textureLoader.load( 'media/6.jpg' ),
  textureLoader.load( 'media/7.jpg' ),
  textureLoader.load( 'media/8.jpg' ),
  textureLoader.load( 'media/9.jpg' ),
  textureLoader.load( 'media/10.jpg' ),
  textureLoader.load( 'media/11.jpg' ),
  textureLoader.load( 'media/12.jpg' ),
  textureLoader.load( 'media/13.jpg' ),
  textureLoader.load( 'media/14.jpg' ),
  textureLoader.load( 'media/15.jpg' ),
  textureLoader.load( 'media/16.jpg' ),
  textureLoader.load( 'media/17.jpg' ),
  textureLoader.load( 'media/18.jpg' ),
  textureLoader.load( 'media/19.jpg' ),
  textureLoader.load( 'media/20.jpg' ),
  textureLoader.load( 'media/21.jpg' ),
  textureLoader.load( 'media/22.jpg' ),
  textureLoader.load( 'media/23.jpg' ),
  textureLoader.load( 'media/24.jpg' ),
  textureLoader.load( 'media/25.jpg' ),
  textureLoader.load( 'media/26.jpg' ),
  textureLoader.load( 'media/27.jpg' ),
  textureLoader.load( 'media/28.jpg' ),
  textureLoader.load( 'media/29.jpg' ),
  textureLoader.load( 'media/30.jpg' ),
  ];

  var geometry = new THREE.BoxGeometry( 400, 400, 400 );

// randomizing particles
for (var i = 0; i < particleCount; i++) {
  var materials = [];

  for (var j = 0; j < 6; j++) {
    randomPhoto = Math.floor(Math.random() * pictures.length);
    materials.push(new THREE.MeshBasicMaterial({ map: pictures[randomPhoto] }));
  }

  particles[i] = new THREE.Mesh( geometry, materials );

  particles[i].position.x = Math.random() * window.innerWidth * 2 - window.innerWidth;;
  particles[i].position.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
  particles[i].position.z = Math.random() * window.innerWidth * 2 - window.innerWidth;

  particles[i]. direction = {
    x: Math.random(),
    y: Math.random()
  }

  scene.add(particles[i]);
  }
}


// animating stuff, making particles move
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    for (var i = 0; i < particleCount; i++) {
      particles[i].rotation.z += 0.008;
      particles[i].position.x += particles[i].direction.x;
      particles[i].position.y += particles[i].direction.y;
    }
}
