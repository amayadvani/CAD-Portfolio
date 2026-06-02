// 3D CAD Viewer using Three.js - V2
// Features: per-model random colors, center-focused rotation, smart zoom, proper shading

class CADViewer {
    constructor(container, colorSeed = null) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.modelBounds = null;
        this.colorSeed = colorSeed;
        this.init();
    }

    // Initialize the 3D scene
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        // Warm dark gray background (not pitch black)
        this.scene.background = new THREE.Color(0x1a1a2e);

        // Create camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(6, 6, 6);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Add renderer to container
        this.container.appendChild(this.renderer.domElement);

        // Setup lighting
        this.setupLighting();
        // Setup controls
        this.setupControls();
        // Setup resize handler
        this.setupResize();
        // Start render loop
        this.animate();
        console.log('CAD Viewer initialized');
    }
    // Setup lighting for the scene
    setupLighting() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Main directional light - warm white
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Fill light from opposite side
        const fillLight = new THREE.DirectionalLight(0xffeebb, 0.5);
        fillLight.position.set(-10, -10, -5);
        this.scene.add(fillLight);

        // Hemisphere light for natural lighting
        const hemiLight = new THREE.HemisphereLight(0xffeebb, 0x1a1a2e, 0.5);
        this.scene.add(hemiLight);

        // Additional point light for better illumination
        const pointLight = new THREE.PointLight(0xffa500, 0.8, 50);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);
    }

    // Setup mouse controls - center-focused rotation
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // Configure controls for smooth, center-focused operation
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = false; // Disable panning to keep model centered
        this.controls.enableRotate = true;
        this.controls.autoRotate = false;
        // Set initial zoom limits (will be refined per model)
        this.controls.maxDistance = 50;
        this.controls.minDistance = 1;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minPolarAngle = 0;
        // Rotate around model center
        this.controls.target.set(0, 0, 0);
        console.log('Controls setup complete - center-focused rotation enabled');
    }

    // Setup window resize handling
    setupResize() {
        window.addEventListener('viewerResize', () => {
            this.onWindowResize();
        });
        // Initial resize
        setTimeout(() => this.onWindowResize(), 100);
    }

    // Handle window resize
    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        console.log('Viewer resized to ' + width + 'x' + height);
    }
    // Load and display a 3D model
    loadModel(modelPath, onComplete) {
        console.log('Loading model:', modelPath);
        // Remove existing model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.currentModel = null;
        }

        // Create STL loader
        const loader = new THREE.STLLoader();

        // Load the model
        loader.load(
            modelPath,
            (geometry) => {
                console.log('Model loaded successfully');
                console.log('Geometry has', geometry.attributes.position.count, 'vertices');
                this.displayModel(geometry);
                if (onComplete) onComplete();
            },
            (progress) => {
                console.log('Loading progress:', Math.round((progress.loaded / progress.total) * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                this.showErrorPlaceholder();
                if (onComplete) onComplete();
            }
        );
    }
    // Display the loaded model with per-model random color
    displayModel(geometry) {
        // Generate a unique, pleasing color for this model based on its geometry
        const modelColor = this.getModelColor();

        // Create a nice material with shading to reveal assembly details
        const material = new THREE.MeshPhongMaterial({
            color: modelColor,
            shininess: 80,
            specular: new THREE.Color(0x333333),
            side: THREE.DoubleSide,
            flatShading: false
        });

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Center the geometry at origin for consistent rotation/zoom
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        geometry.translate(-center.x, -center.y, -center.z);

        // Compute model size for camera framing
        const size = geometry.boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        this.modelBounds = maxDimension;

        // Scale model to reasonable display size
        const targetSize = 4;
        const scale = targetSize / maxDimension;
        mesh.scale.setScalar(scale);

        // Add to scene
        this.scene.add(mesh);
        this.currentModel = mesh;

        // Fit camera to model with proper centering
        this.fitCameraToModel();
        console.log('Model displayed with color #' + modelColor.getHexString());
    }
    // Generate a pleasing random color for each model
    // Uses a seeded approach so the same viewer instance always gets the same color
    getModelColor() {
        // Palette of warm, professional CAD colors
        const palette = [
            0x3498db, // Blue
            0x2ecc71, // Green
            0xe74c3c, // Red
            0x9b59b6, // Purple
            0xf39c12, // Orange
            0x1abc9c, // Teal
            0xe67e22, // Dark Orange
            0x34495e, // Dark Blue-Gray
            0x27ae60, // Dark Green
            0x8e44ad, // Dark Purple
            0xc0392b, // Dark Red
            0x7f8c8d  // Gray
        ];

        // Use the colorSeed if provided, otherwise use a hash of the model bounds
        // to get a deterministic but varied color across model instances
        let index = 0;
        if (this.colorSeed !== null) {
            // If a seed was passed to the constructor, use it
            index = this.colorSeed % palette.length;
        } else if (this.modelBounds) {
            // Use model bounds to create a semi-deterministic index
            index = Math.floor(this.modelBounds * 17) % palette.length;
        } else {
            // Fallback: random index
            index = Math.floor(Math.random() * palette.length);
        }

        return palette[index];
    }
    // Fit camera to frame the model properly, centered on model center
    fitCameraToModel() {
        if (!this.currentModel || !this.modelBounds) return;

        // Reset controls target to model center
        this.controls.target.set(0, 0, 0);

        // Calculate optimal camera distance based on model size
        // FOV is 75 degrees, so we need distance to fit the model in the view
        const fov = this.camera.fov * (Math.PI / 180);
        const scale = this.modelBounds / 4; // model is scaled to target size of 4
        const distance = (scale * 2) / (2 * Math.tan(fov / 2)) * 1.5;

        // Position camera at appropriate distance
        this.camera.position.set(distance, distance, distance);
        this.camera.lookAt(0, 0, 0);

        // Set zoom limits based on model size
        this.controls.maxDistance = distance * 2.5;
        this.controls.minDistance = distance * 0.3;

        // Update controls
        this.controls.update();
        console.log('Camera fitted to model at distance ' + distance.toFixed(2));
    }

    // Show error placeholder when model fails to load
    showErrorPlaceholder() {
        // Remove any existing model first
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
        }

        // Create a warning cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ color: 0xff6b6b, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.currentModel = cube;
        console.error('Error loading model - showing error placeholder');
    }

    // Animation loop
    animate() {
        requestAnimationFrame(() => this.animate());
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Clean up resources
    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
        console.log('CAD Viewer disposed');
    }
}
