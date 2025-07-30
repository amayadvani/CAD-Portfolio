// 3D CAD Viewer using Three.js
class CADViewer {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        
        this.init();
    }
    
    // Initialize the 3D scene
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000); // Black background
        
        // Create camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
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
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Fill light from opposite side
        const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.3);
        fillLight.position.set(-10, -10, -5);
        this.scene.add(fillLight);
        
        // Hemisphere light for natural lighting
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x000000, 0.4);
        this.scene.add(hemiLight);
    }
    
    // Setup mouse controls
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
        // Configure controls
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        
        // Set limits
        this.controls.maxDistance = 50;
        this.controls.minDistance = 1;
        this.controls.maxPolarAngle = Math.PI;
        
        console.log('Controls setup complete');
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
        
        console.log(`Viewer resized to ${width}x${height}`);
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
                this.displayModel(geometry);
                if (onComplete) onComplete();
            },
            (progress) => {
                console.log('Loading progress:', Math.round((progress.loaded / progress.total) * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                this.showPlaceholder();
                if (onComplete) onComplete();
            }
        );
    }
    
    // Display the loaded model
    displayModel(geometry) {
        // Create material
        const material = new THREE.MeshPhongMaterial({
            color: 0x87CEEB,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Center the model
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        geometry.translate(-center.x, -center.y, -center.z);
        
        // Scale model to reasonable size
        const size = geometry.boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 4;
        const scale = targetSize / maxDimension;
        mesh.scale.setScalar(scale);
        
        // Add to scene
        this.scene.add(mesh);
        this.currentModel = mesh;
        
        // Fit camera to model
        this.fitCameraToModel();
        
        console.log('Model displayed successfully');
    }
    
    // Show placeholder when model fails to load
    showPlaceholder() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x444444,
            wireframe: true 
        });
        const cube = new THREE.Mesh(geometry, material);
        
        this.scene.add(cube);
        this.currentModel = cube;
        
        console.log('Showing placeholder model');
    }
    
    // Fit camera to show the entire model
    fitCameraToModel() {
        if (!this.currentModel) return;
        
        // Reset controls target
        this.controls.target.set(0, 0, 0);
        
        // Position camera
        this.camera.position.set(6, 6, 6);
        this.camera.lookAt(0, 0, 0);
        
        // Update controls
        this.controls.update();
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