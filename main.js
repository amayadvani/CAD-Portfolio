function createGrid() {
    var container = document.getElementById('grid-container');
    container.innerHTML = '';
    console.log('cadModels:', typeof cadModels, cadModels ? cadModels.length : 'none');
    if (!cadModels || !cadModels.forEach) {
        container.innerHTML = '<div class="cad-card"><div class="card-info"><h3>Error</h3><p>cadModels not loaded</p></div></div>';
        return;
    }

    function loadViewer(viewerContainer) {
        var model = viewerContainer._model;
        var hint = viewerContainer._hint;
        try {
            var viewer = new CADViewer(viewerContainer, model.id);
            viewer.loadModel(model.stlPath, function() {
                hint.style.opacity = '1';
                setTimeout(function() { hint.style.opacity = '0'; }, 4000);
            });
            viewerContainer._viewer = viewer;
        } catch (e) {
            console.error('Viewer error:', model.name, e);
        }
    }

    function disposeViewer(viewerContainer) {
        var viewer = viewerContainer._viewer;
        if (!viewer) return;
        try {
            if (viewer.renderer) {
                viewer.renderer.dispose();
                if (typeof viewer.renderer.forceContextLoss === 'function') {
                    viewer.renderer.forceContextLoss();
                }
                if (viewer.renderer.domElement && viewer.renderer.domElement.parentNode) {
                    viewer.renderer.domElement.parentNode.removeChild(viewer.renderer.domElement);
                }
            }
        } catch (e) {
            console.warn('Dispose error:', e);
        }
        viewerContainer._viewer = null;
        viewerContainer.innerHTML = '';
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var viewerContainer = entry.target;
            if (entry.isIntersecting) {
                if (!viewerContainer._viewer) {
                    loadViewer(viewerContainer);
                }
            } else {
                if (viewerContainer._viewer) {
                    disposeViewer(viewerContainer);
                }
            }
        });
    }, { rootMargin: '300px' });

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

        viewerContainer._model = model;
        viewerContainer._hint = hint;
        viewerContainer._viewer = null;
        observer.observe(viewerContainer);

        console.log('Card created for:', model.name);
    });
    console.log('Total cards:', container.children.length);
}

// Module executes after DOM is ready (deferred), so just run directly
console.log('main.js loaded');
createGrid();
