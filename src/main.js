// src/main.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 1) renderer
const app = document.querySelector('#app')
app.innerHTML = '' // 清空 vite 模板
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
app.appendChild(renderer.domElement)

// 2) scene & camera
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x111111)

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(2, 1.5, 3)

// 3) controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 4) lights
scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1.2))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(5, 5, 5)
scene.add(dir)

// 5) a cube
const geo = new THREE.BoxGeometry(1, 1, 1)
const mat = new THREE.MeshStandardMaterial({ color: '#ffffffff', roughness: 0.4, metalness: 0.2 })
const cube = new THREE.Mesh(geo, mat)
scene.add(cube)

// 6) resize
function onResize() {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}
window.addEventListener('resize', onResize)

// 7) loop
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.y += 0.003
  cube.rotation.x += 0.002
  controls.update()
  renderer.render(scene, camera)
}
animate()
