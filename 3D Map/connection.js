import * as THREE from 'three';

export default class Connection {
    
    constructor(connectionCoords, ri, angle, roadWidth, K_LIGACAO) {
        
        this.object = new THREE.Group();
        
        let geometry = new THREE.PlaneGeometry(roadWidth, ri * K_LIGACAO);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        this.object.add(mesh);

        this.object.position.set(ri * Math.cos(angle) + connectionCoords.x, connectionCoords.y, ri * Math.sin(angle) + connectionCoords.z);
        this.object.rotation.set(Math.PI/2, 0, angle + Math.PI/2);

    }

}