import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 5.011;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 5, 5, 5 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

}

function animation( time ) {

    mesh.rotation.x = time / 5000;
    mesh.rotation.y = time / 5000;

    renderer.render( scene, camera );

}

const onWinResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener("resize",onWinResize,false);