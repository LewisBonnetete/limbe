const width = window.innerWidth
const height = window.innerHeight

// sphere
var canvas
var renderer


const step = 0.01
let time = 0
let time2 = 0

let maxLow = 80
let minLow = -100
let low = minLow
let lowStep = 1

let highStep = 1
let maxHigh = 200
let minHigh = 100
let high = maxHigh

let mincapA = 10
let maxcapA= 27
let capA = maxcapA
let capStepA = step

let mincapB = 5
let maxcapB = 11
let capB = maxcapB
let capStepB = step

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function setup() {
    canvas = createCanvas(width, height)
    renderer = new THREE.WebGLRenderer({
        canvas: canvas.canvas
      });
      // Créer une sphère
      var geometry = new THREE.SphereGeometry( 5, 32, 32 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      var sphere = new THREE.Mesh( geometry, material );
      renderer.scene.add( sphere );
      background(51)
}

function  draw() {
    time += step
    time2 -= step
    background(51)

    if (high > maxHigh) {
        highStep *= -1
        high = maxHigh
    }
    if (high < minHigh) {
        highStep *= -1
        high = minHigh
    }
    high += highStep

    if (low > maxLow) {
        lowStep *= -1
        low = maxLow
    }
    if (low < minLow) {
        lowStep *= -1
        low = minLow
    }
    low += lowStep

    if (capA > maxcapA) {
        capStepA *= -1
        capA = maxcapA
    }
    if (capA < mincapA) {
        capStepA *= -1
        capA = mincapA
    }
    capA += capStepA

    if (capB > maxcapB) {
        capStepB *= -1
        capB = maxcapB
    }
    if (capB < mincapB) {
        capStepB *= -1
        capB = mincapB
    }
    capB += capStepB

    loadPixels()
    for (let x = 0; x < width; x += 4) {
        for (let y = 0; y < height; y += 4) {

            const perlinX = map(x, 0, width, 0, capA)
            const perlinY = map(y, 0, width, 0, capB)
            const nX = noise(perlinX + 100)
            const nY = noise(perlinY + time)
            const nZ = noise(time + perlinX)
            const nZ2 = noise(time2 + perlinX)

            const n = map((nX + nY) * (nX + nY) + nZ * nZ * nZ * nZ - nZ2 * nZ2 * nZ2 * nZ2, 0, 7, 0, 500)
            const c = color(
                n + map(y, 0, height * 3, low, high), // Red
                0, // Green
                n + map(y, height * 3, 0, low, high), // Blue
            )
            
            set(x, y, c)
            set(x + 1, y, c)
            set(x, y + 1, c)
            set(x + 1, y + 1, c)
            set(x + 2, y, c)
            set(x, y + 2, c)
            set(x + 2, y + 2, c)
       }
    }
    updatePixels()
    // Animer la sphère
    renderer.scene.children[0].rotation.x += 0.01;
    renderer.scene.children[0].rotation.y += 0.01;
    renderer.render(renderer.scene, renderer.camera);
}