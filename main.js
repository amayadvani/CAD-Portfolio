document.addEventListener('DOMContentLoaded', function() {
  createGrid();
});

function createGrid() {
  const container = document.getElementById('grid-container');
  container.innerHTML = '';

  cadModels.forEach(model => {
    const card = document.createElement('div');
    card.className = 'cad-card';

    // Viewer wrapper for STL 3D model
    const viewerWrapper = document.createElement('div');
    viewerWrapper.className = 'viewer-wrapper';

    const viewerContainer = document.createElement('div');
    viewerContainer.className = 'cad-viewer';
    viewerContainer.style.width = '100%';
    viewerContainer.style.height = '100%';
    viewerWrapper.appendChild(viewerContainer);

    // Drag hint tooltip
    const hint = document.createElement('div');
    hint.className = 'drag-hint';
    hint.textContent = 'Click & drag to rotate';
    viewerWrapper.appendChild(hint);

    // Card info section
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `<h3>${model.name}</h3><p>${model.description}</p>`;

    card.appendChild(viewerWrapper);
    card.appendChild(info);
    container.appendChild(card);

    // Initialize the STL viewer
    const viewer = new CADViewer(viewerContainer);
    viewer.loadModel(model.stlPath, () => {
      setTimeout(() => {
        hint.style.opacity = '0';
      }, 4000);
    });
  });
}
