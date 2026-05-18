document.addEventListener('DOMContentLoaded', function () {
    renderCadGrid();
    renderProjects();
});

function renderCadGrid() {
    const container = document.getElementById('grid-container');
    if (!container || typeof cadModels === 'undefined') return;
    container.innerHTML = '';

    cadModels.forEach(model => {
        const card = document.createElement('div');
        card.className = 'cad-card';

        const viewerWrapper = document.createElement('div');
        viewerWrapper.className = 'viewer-wrapper';

        const iframe = document.createElement('iframe');
        iframe.src = model.embedUrl;
        iframe.title = model.name;
        iframe.loading = 'lazy';
        iframe.allow = 'fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        viewerWrapper.appendChild(iframe);

        const hint = document.createElement('div');
        hint.className = 'drag-hint';
        hint.textContent = 'Click & drag to rotate';
        viewerWrapper.appendChild(hint);

        iframe.addEventListener('load', () => {
            setTimeout(() => { hint.style.opacity = '0'; }, 4000);
        });

        const info = document.createElement('div');
        info.className = 'card-info';

        const title = document.createElement('h3');
        title.textContent = model.name;
        info.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = model.description;
        info.appendChild(desc);

        if (Array.isArray(model.tags) && model.tags.length) {
            const tagWrap = document.createElement('div');
            tagWrap.className = 'card-tags';
            model.tags.forEach(t => {
                const tag = document.createElement('span');
                tag.textContent = t;
                tagWrap.appendChild(tag);
            });
            info.appendChild(tagWrap);
        }

        card.appendChild(viewerWrapper);
        card.appendChild(info);
        container.appendChild(card);
    });
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container || typeof codingProjects === 'undefined') return;
    container.innerHTML = '';

    codingProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const title = document.createElement('h3');
        title.textContent = project.name;
        card.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = project.description;
        card.appendChild(desc);

        if (Array.isArray(project.tags) && project.tags.length) {
            const tagWrap = document.createElement('div');
            tagWrap.className = 'card-tags';
            project.tags.forEach(t => {
                const tag = document.createElement('span');
                tag.textContent = t;
                tagWrap.appendChild(tag);
            });
            card.appendChild(tagWrap);
        }

        const links = document.createElement('div');
        links.className = 'project-links';
        if (project.repo) {
            const a = document.createElement('a');
            a.href = project.repo;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = 'Code →';
            links.appendChild(a);
        }
        if (project.demo) {
            const a = document.createElement('a');
            a.href = project.demo;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = 'Demo →';
            links.appendChild(a);
        }
        if (links.children.length) card.appendChild(links);

        container.appendChild(card);
    });
}
