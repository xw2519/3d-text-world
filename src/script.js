import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

/**
 * Shapes
 */
const cubes = new Array()
const donuts = new Array()
const dodecahedrons = new Array()

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.5)
const dodecahedronMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

for (let i = 0; i < 600; i++) {
    const scale = Math.random()*2

    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial)

    // Randomly place donuts around scene with random rotations and sizes
    donut.position.x = (Math.random() - 0.5) * 100
    donut.position.y = (Math.random() - 0.5) * 100
    donut.position.z = (Math.random() - 0.5) * 100

    donut.rotation.x = (Math.random() - 0.5) * 100
    donut.rotation.y = (Math.random() - 0.5) * 100
    donut.rotation.z = (Math.random() - 0.5) * 100

    donut.scale.set(scale, scale, scale)

    cube.position.x = (Math.random() - 0.5) * 100
    cube.position.y = (Math.random() - 0.5) * 100
    cube.position.z = (Math.random() - 0.5) * 100

    cube.rotation.x = (Math.random() - 0.5) * 100
    cube.rotation.y = (Math.random() - 0.5) * 100
    cube.rotation.z = (Math.random() - 0.5) * 100

    cube.scale.set(scale, scale, scale)

    dodecahedron.position.x = (Math.random() - 0.5) * 100
    dodecahedron.position.y = (Math.random() - 0.5) * 100
    dodecahedron.position.z = (Math.random() - 0.5) * 100

    dodecahedron.rotation.x = (Math.random() - 0.5) * 100
    dodecahedron.rotation.y = (Math.random() - 0.5) * 100
    dodecahedron.rotation.z = (Math.random() - 0.5) * 100

    dodecahedron.scale.set(scale, scale, scale)

    cubes.push(cube)
    donuts.push(donut)
    dodecahedrons.push(dodecahedron)
}

console.log(dodecahedrons)

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hey there!',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 13,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        // Move the text to center
        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        for (let i = 0; i < 600; i++) {
            scene.add(donuts[i])
            scene.add(cubes[i])
            scene.add(dodecahedrons[i])
        }
    }
)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for (let i = 0; i < 600; i++) {
        // cubes[i].rotation.x = Math.random() * Math.PI *
        // cubes[i].rotation.y = elapsedTime
        // cubes[i].rotation.z = elapsedTime

        // donuts[i].rotation.x = (Math.random() - 0.5) * elapsedTime
        // donuts[i].rotation.y = (Math.random() - 0.5) * elapsedTime
        // donuts[i].rotation.z = (Math.random() - 0.5) * elapsedTime
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
