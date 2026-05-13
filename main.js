document.addEventListener('DOMContentLoaded', function() {
    createGrid();
});

function createGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';

    cadModels.forEach(model => {
        const card = document.createElement('div');
        card.className = 'cad-card';

        // Viewer wrapper with iframe
        const viewerWrapper = document.createElement('div');
        viewerWrapper.className = 'viewer-wrapper';

        const iframe = document.createElement('iframe');
        iframe.src = model.embedUrl;
        iframe.title = model.name;
        iframe.allow = 'fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        viewerWrapper.appendChild(iframe);

        // Drag hint tooltip
        const hint = document.createElement('div');
        hint.className = 'drag-hint';
        hint.textContent = 'Click & drag to rotate';
        viewerWrapper.appendChild(hint);

        // Hide hint once user starts interacting
        iframe.addEventListener('load', () => {
            setTimeout(() => { hint.style.opacity = '0'; }, 4000);
        });

        // Card info section
        const info = document.createElement('div');
        info.className = 'card-info';
        info.innerHTML = `<h3>${model.name}</h3><p>${model.description}</p>`;

        card.appendChild(viewerWrapper);
        card.appendChild(info);
        container.appendChild(card);
    });
}
