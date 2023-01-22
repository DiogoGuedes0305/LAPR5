import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default class Roundabout {

	constructor(elemCoords, ri, INFINITESIMO) {
		let aux;
		this.object = new THREE.Group();

		const texture = new THREE.TextureLoader().load('./3dModels/armazem.jpg');

		let geometry = new THREE.CircleGeometry(ri, 40);
		let material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: texture });
		let mesh = new THREE.Mesh(geometry, material);
		this.object.add(mesh);

		this.object.position.set(elemCoords.x, elemCoords.y + INFINITESIMO, elemCoords.z);
		this.object.rotation.y = Math.PI;
		this.object.rotation.set(-Math.PI / 2, 0, 0);
		this.object.add(mesh);


		const fbxLoader = new GLTFLoader();
		fbxLoader.load(
			'./3dModels/uploads_files_3197447_factory.glb', function(gltf){
				console.log(gltf)
				aux = gltf
			}, function(xhr){
				console.log((xhr.loaded/xhr.total*100) + "%loader")
			},function(error){
				console.log('erro')
			});
			
		this.object.add(aux);	

	}

}