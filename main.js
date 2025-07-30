document.addEventListener('DOMContentLoaded', function() {
    console.log('CAD Portfolio loaded!');
    
    // Initialize the portfolio
    createGrid();
    setupModalHandlers();
});

// Create the grid of CAD models
function createGrid() {
    const container = document.getElementById('grid-container');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create grid items from cadModels array
    cadModels.forEach(model => {
        const item = document.createElement('div');
        item.className = 'cad-item';
        item.innerHTML = `
            <img src="${model.thumbnail}" alt="${model.name}" loading="lazy">
            <h3>${model.name}</h3>
            <p>${model.description}</p>
        `;
        
        // Add click handler to open 3D viewer
        item.addEventListener('click', () => openModel(model));
        
        // Add to grid
        container.appendChild(item);
    });
    
    console.log(`Created grid with ${cadModels.length} CAD models`);
}

// Open a model in the 3D viewer
function openModel(model) {
    console.log('Opening model:', model.name);
    
    // Show modal
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    
    // Update model info
    document.getElementById('model-name').textContent = model.name;
    document.getElementById('model-description').textContent = model.description;
    
    // Show loading indicator
    showLoading();
    
    // Clear previous viewer
    const viewerContainer = document.getElementById('viewer-container');
    viewerContainer.innerHTML = '';
    
    // Initialize 3D viewer
    try {
        const viewer = new CADViewer(viewerContainer);
        viewer.loadModel(model.modelPath, () => {
            hideLoading();
        });
    } catch (error) {
        console.error('Error creating viewer:', error);
        hideLoading();
        alert('Error loading 3D model. Please try again.');
    }
}

// Set up modal event handlers
function setupModalHandlers() {
    // Close button
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside modal content
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    
    // Clean up 3D viewer to free memory
    const viewerContainer = document.getElementById('viewer-container');
    viewerContainer.innerHTML = '';
    
    hideLoading();
}

// Show loading indicator
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Handle window resize
window.addEventListener('resize', () => {
    // If modal is open, resize the 3D viewer
    const modal = document.getElementById('modal');
    if (!modal.classList.contains('hidden')) {
        // Trigger resize event for 3D viewer
        window.dispatchEvent(new Event('viewerResize'));
    }
});