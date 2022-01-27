import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class RotatingRooms {
  scene;
  camera;
  renderer;
  lightSource;
  rooms = {};

  constructor() {
    this.initEnviroment();
    this.createCubicRoom();
    this.createHexaShapedRoom();
    this.renderer.render(this.scene, this.camera);
    this.addRotationFunctionality();
    OrbitControls
  }

  initEnviroment() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#squareRoom')
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.setZ(30);
    this.addLightSource();
  }

  createCubicRoom() {
    const cubeGeometry = new THREE.BoxGeometry(10, 10);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.setRoomPosition(cube, {
      x: -30,
      y: 5
    });
    this.rooms.cubeRoom = cube;
    this.scene.add(cube);
  }

  createHexaShapedRoom() { // L shaped room
    const coordinatesListOne = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(3, 10, 0),
      new THREE.Vector3(3, 3, 0),
      new THREE.Vector3(10, 3, 0),
      new THREE.Vector3(10, 0, 0)
    ];
    const hexaGeometry = extrudeHexa(new THREE.Shape(coordinatesListOne));
    const hexaMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const hexa = new THREE.Mesh(hexaGeometry, hexaMaterial);
    this.setRoomPosition(hexa, {
      x: -10,
    });
    this.rooms.hexaRoom = hexa;
    this.scene.add(hexa);

    function extrudeHexa(shape) { // function to make hexa room look 3d
      const extrudeSettings = {
        depth: 2,
        bevelEnabled: false,
      };

      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
  }

  setRoomPosition(room, position) { // position type = {x: number, y: number, z: number}
    room.position.setX(position.x || 0);
    room.position.setY(position.y || 0);
    room.position.setZ(position.z || 0);
  }

  addLightSource() {
    this.lightSource = new THREE.PointLight(0xffffff);
    this.lightSource.position.set(0, 0, 20)
    this.scene.add(this.lightSource);
  }

  addRotationFunctionality() { //with button
    const rotateBtn = document.querySelector(".btn");
    rotateBtn.addEventListener("click", () => {
      this.rooms.hexaRoom.rotateZ(-90);
      this.rooms.cubeRoom.rotateZ(-90);

      this.renderer.render(this.scene, this.camera);
    })
  }
}

const rooms = new RotatingRooms();
