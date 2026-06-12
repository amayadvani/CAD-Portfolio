function createGrid() {
    var container = document.getElementById('grid-container');
    container.innerHTML = '';
    console.log('cadModels:', typeof cadModels, cadModels ? cadModels.length : 'none');
    if (!cadModels || !cadModels.forEach) {
        container.innerHTML = '<div class="cad-card"><div class="card-info"><h3>Error</h3><p>cadModels not loaded</p></div></div>';
        return;
    }
    cadModels.forEach(function(model) {
        var card = document.createElement('div');
        card.className = 'cad-card';
        var viewerWrapper = document.createElement('div');
        viewerWrapper.className = 'viewer-wrapper';
        var viewerContainer = document.createElement('div');
        viewerContainer.className = 'cad-viewer';
        viewerContainer.style.width = '100%';
        viewerContainer.style.height = '100%';
        viewerWrapper.appendChild(viewerContainer);
        var hint = document.createElement('div');
        hint.className = 'drag-hint';
        hint.textContent = 'Click & drag to rotate';
        viewerWrapper.appendChild(hint);
        var info = document.createElement('div');
        info.className = 'card-info';
        info.innerHTML = '<h3>' + model.name + '</h3><p>' + model.description + '</p>';
        card.appendChild(viewerWrapper);
        card.appendChild(info);
        container.appendChild(card);
        console.log('Card created for:', model.name);
        try {
            var viewer = new CADViewer(viewerContainer, model.id);
            viewer.loadModel(model.stlPath, function() {
                setTimeout(function() { hint.style.opacity = '0'; }, 4000);
            });
        } catch (e) {
            console.error('Viewer error:', model.name, e);
        }
    });
    console.log('Total cards:', container.children.length);
}

// Module executes after DOM is ready (deferred), so just run directly
console.log('main.js loaded');
createGrid();
