import {useMemo, useRef, useState} from "react";
import {InstancedMesh, Object3D, Vector2} from "three";
import {Line} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {createNoise2D} from 'simplex-noise';

const noise2D = createNoise2D();
const noiseScale = 40;
const noiseSpeed = 0.005;
const noiseStrength = 0.5;


export default function FlowField({size: {width, height}}: { size: { width: number, height: number } }) {
    const pixelSize = 5;
    const particleCount = 5000;

    const [grid] = useState(createGrid(width, height, pixelSize));
    const particlesMesh = useRef<InstancedMesh>(null);

    // Generate Initial Particle Positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particleCount; i++) {
            temp.push({
                position: new Vector2(randomRange(0, width), randomRange(0, height)),
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
            const {position, velocity, acceleration} = particle;
            const x = Math.floor(position.x / pixelSize) * pixelSize;
            const y = Math.floor(position.y / pixelSize) * pixelSize;

            const direction = grid[x][y];
            acceleration.set(direction.x, direction.y);
            acceleration.multiplyScalar(0.1);

            velocity.clampLength(0, .25);
            velocity.add(acceleration);

            position.add(velocity);

            // Wrap the particle around the edges of the screen
            if (position.x > width) position.x = 0;
            if (position.x < 0) position.x = width;
            if (position.y > height) position.y = 0;
            if (position.y < 0) position.y = height;

            // Update the dummy object's position
            dummy.position.set(position.x, position.y, 0);

            dummy.updateMatrix();
            particlesMesh.current!.setMatrixAt(i, dummy.matrix);
        })
        particlesMesh.current!.instanceMatrix.needsUpdate = true;
    });


    return <>
        <group>
            {grid.map((row, x) => {
                return row.map((direction, y) => {
                    const pointB = new Vector2(x, y).add(direction);
                    return <Line key={`${x}-${y}`} points={[new Vector2(x, y), pointB]} color='white'/>
                })
            })}
        </group>

        <pointLight distance={40} intensity={8} color="lightblue"/>
        <instancedMesh ref={particlesMesh} args={[null, null, particleCount] as any}>
            <sphereGeometry args={[0.25, 8, 8]}/>
            <meshBasicMaterial color='red'/>
        </instancedMesh>
    </>;
}


// create a 2D grid of vectors with directions being set by Perlin noise
const createGrid = (width: number, height: number, pixelSize: number) => {
    const grid: Vector2[][] = [];
    for (let x = 0; x <= width; x += pixelSize) {
        grid[x] = [];
        for (let y = 0; y <= height; y += pixelSize) {
            grid[x][y] = generateVector(x, y);
        }
    }
    return grid;
}


// Generates the perlin noise at a particular point in the grid
const generateVector = (x: number, y: number) => {
    const direction = new Vector2();

    // Use Perlin noise to generate a wave-like pattern
    const noise = noise2D(x / 50, y / 50);
    const gradient = noise2D(y / 50, x / 50);
    direction.x = -gradient;
    direction.y = noise;

    // Normalize the vector to ensure it has a length of 1
    direction.normalize();
    return direction;
}


const randomRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}