import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0.7,0.7,0.7)

//ジオメトリ
const geometry=new THREE.SphereGeometry(300,30,30)
//マテリアル
const material =new THREE.MeshStandardMaterial({color:0xff0000, roughness:0.0, metalness: 0.0})
//メッシュ
const sphere=new THREE.Mesh(geometry,material)
//シーンにメッシュ追加
scene.add(sphere)

//平行光源
const directionalLight =new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(1,1,1)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(0,0,1000)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls( camera, renderer.domElement )

/**
 * Animate
 */
const animate = () =>
{
    controls.update()
    // Render
    renderer.render(scene, camera)

    sphere.rotation.y+=0.01;
    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()