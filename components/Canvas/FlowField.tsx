import {useMemo, useRef, useState} from "react";
import {InstancedMesh, Object3D, Vector2} from "three";
import {Line, OrthographicCamera} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {createNoise2D} from "simplex-noise";


const noise2D = createNoise2D();

const angleZoom = 100;
const fieldForce = 100;

const gridSections = 200;

const particleCount = 100;
const particleSpeed = 100;
const particleSize = 20;

export default function FlowField() {
    const {size} = useThree();
    const {width, height} = size;
    const [grid] = useState(createGrid(width, height, gridSections));
    const particlesMesh = useRef<InstancedMesh>(null);

    // Generate Initial Particle Positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particleCount; i++) {

            temp.push({
                position: new Vector2(200, 200),
                prevPosition: new Vector2(200, 200),
                velocity: new Vector2(0, 0),
                acceleration: new Vector2(0, 0),
            })
        }

        return temp;
    }, [height, width])


    // Update the particles position based on the grid
    const dummy = useMemo(() => new Object3D(), []);

    useFrame(() => {
        particles.forEach((particle, i) => {
            const {position, prevPosition, velocity, acceleration} = particle;

            const gridX = Math.floor(position.x / gridSections) * gridSections;
            const gridY = Math.floor(position.y / gridSections) * gridSections;
            const vectorData = grid[200][200];


            // Move particle based on Vector Data
            if (vectorData) acceleration.add(vectorData);
            velocity.add(acceleration);
            position.add(velocity);

            if (velocity.length() > particleSpeed / 50) {
                velocity.setLength(particleSpeed / 50);
            }

            acceleration.multiplyScalar(0);

            // Wrap the particle around the edges of the screen
            if (position.x > width) {
                prevPosition.x = position.x = 0;
            } else if (position.x < -particleSize) {
                prevPosition.x = position.x = width - 1;
            }

            if (position.y > height) {
                prevPosition.y = position.y = 0;
            } else if (position.y < -particleSize) {
                prevPosition.y = position.y = height - 1;
            }

            // Update the dummy object's position
            dummy.position.set(position.x, position.y, 0);

            dummy.updateMatrix();
            particlesMesh.current!.setMatrixAt(i, dummy.matrix);
        })
        particlesMesh.current!.instanceMatrix.needsUpdate = true;
    });

    return <OrthographicCamera makeDefault near={-1} left={-50} right={width} bottom={-50} top={height}>
        <group>
            {grid.map((row, x) => {
                return row.map(([angle, length], y) => {
                    const pointB = new Vector2(x, y).add(new Vector2(Math.cos(angle), Math.sin(angle)).multiplyScalar(length + 25));
                    return <Line key={`${x}-${y}`} points={[new Vector2(x, y), pointB]} color='white'/>
                })
            })}
        </group>

        <pointLight distance={40} intensity={8} color="lightblue"/>
        <instancedMesh ref={particlesMesh} args={[null, null, particleCount] as any}>
            <sphereGeometry args={[particleSize, 8, 8]}/>
            <meshBasicMaterial color='red'/>
        </instancedMesh>
    </OrthographicCamera>;
}


// create a 2D grid of vectors with directions being set by Perlin noise
const createGrid = (width: number, height: number, gridSection: number): any[][] => {
    const grid: any[][] = [];

    for (let x = 0; x <= width; x += gridSection) {
        grid[x] = [];
        for (let y = 0; y <= height; y += gridSection) {
            grid[x][y] = generateVector(x, y);
        }
    }
    return grid;
}


// Generates the perlin noise at a particular point in the grid
const generateVector = (x: number, y: number): any => {
    let angle = noise2D(x / angleZoom / 5, y / angleZoom / 5) * Math.PI * 2;
    let length = noise2D(x / 50 + 40000, y / 50 + 40000) * fieldForce / 20;

    return [angle, length];
}