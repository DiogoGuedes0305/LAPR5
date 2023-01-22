import * as THREE from 'three';

export default class Road {
    
    constructor(elemCoords, connectCoords, connectAngle, ri, roadWidth, K_LIGACAO) {

        let projSize = Math.sqrt(Math.pow(connectCoords.x - elemCoords.x, 2) + Math.pow(connectCoords.z - elemCoords.z, 2));

        if (projSize > 0)
            projSize -= (ri * K_LIGACAO) * 2;
        else
            projSize += (ri * K_LIGACAO) * 2;
            
        let decline = connectCoords.y - elemCoords.y;
        let length = Math.sqrt(Math.pow(projSize, 2) + Math.pow(decline, 2));
        let slope = Math.atan(decline / projSize);

        this.object = new THREE.Group();

        let geometry = new THREE.PlaneGeometry(length, roadWidth);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        this.object.add(mesh);

        this.object.position.set((elemCoords.x + connectCoords.x)/2, (elemCoords.y + connectCoords.y)/2, (elemCoords.z + connectCoords.z)/2);
        this.object.rotation.set( 0, -connectAngle, slope);
        this.object.rotateX(Math.PI/2)

    }

}