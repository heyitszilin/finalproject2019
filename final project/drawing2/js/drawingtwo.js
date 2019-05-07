var scene, camera, renderer, controls, raycaster;
var geometry, material, mesh;
var body = document.querySelector('body');
var mouse = new THREE.Vector2(), INTERSECTED;

// setting up the particles
var particleCount = 8;
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

//interactiveness - on mouse click / hovrer
raycaster.setFromCamera(mouse, camera);

				var intersects = raycaster.intersectObjects( scene.children );

				if ( intersects.length > 0 ) {

					if ( INTERSECTED != intersects[ 0 ].object ) {

						if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

						INTERSECTED = intersects[ 0 ].object;
            console.log(INTERSECTED);
            console.log(intersects);
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						INTERSECTED.material.emissive.setHex( 0xff0000 );

					}

				} else {

					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

					INTERSECTED = null;

				}

				renderer.render( scene, camera );


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

//time the animations - make the cubes disappear or fade out or something
