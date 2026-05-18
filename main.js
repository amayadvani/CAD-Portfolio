document.addEventListener('DOMContentLoaded', function () {
    renderCadGrid();
    renderProjects();
});

// Derive a browser-friendly Onshape document URL from an embed URL so the
// "Open in Onshape" CTA works even if the iframe is blocked from rendering.
function onshapeDocumentUrlFromEmbed(embedUrl) {
    if (!embedUrl) return '';
    try {
        const u = new URL(embedUrl);
        if (!/onshape\.com$/i.test(u.hostname)) return embedUrl;
        const m = u.pathname.match(/\/embed\/([a-f0-9]+)/i);
        if (m) return 'https://cad.onshape.com/documents/' + m[1];
        return embedUrl;
    } catch (_) {
        return embedUrl;
    }
}

function buildPreviewOverlay(model, openUrl) {
    const preview = document.createElement('div');
    preview.className = 'viewer-preview';

    const top = document.createElement('div');
    top.className = 'preview-top';

    const label = document.createElement('span');
    label.className = 'preview-label';
    label.textContent = '3D CAD Model';
    top.appendChild(label);

    if (Array.isArray(model.tags) && model.tags.length) {
        const tagWrap = document.createElement('div');
        tagWrap.className = 'preview-tags';
        model.tags.forEach(t => {
            const tag = document.createElement('span');
            tag.textContent = t;
            tagWrap.appendChild(tag);
        });
        top.appendChild(tagWrap);
    }
    preview.appendChild(top);

    const art = document.createElement('div');
    art.className = 'preview-art';
    art.innerHTML = `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="cubeTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#9bdcff" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#5a9fc0" stop-opacity="0.85"/>
                </linearGradient>
                <linearGradient id="cubeLeft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#3d6f8a" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#1e3a5f" stop-opacity="0.85"/>
                </linearGradient>
                <linearGradient id="cubeRight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#5a9fc0" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#2b5876" stop-opacity="0.8"/>
                </linearGradient>
            </defs>
            <g stroke="#87CEEB" stroke-width="1.2" stroke-linejoin="round">
                <polygon points="60,18 100,38 60,58 20,38" fill="url(#cubeTop)"/>
                <polygon points="20,38 60,58 60,102 20,82" fill="url(#cubeLeft)"/>
                <polygon points="100,38 60,58 60,102 100,82" fill="url(#cubeRight)"/>
            </g>
        </svg>
    `;
    preview.appendChild(art);

    const bottom = document.createElement('div');
    bottom.className = 'preview-bottom';

    const title = document.createElement('span');
    title.className = 'preview-title';
    title.textContent = model.name || 'CAD Model';
    bottom.appendChild(title);

    if (openUrl) {
        const cta = document.createElement('a');
        cta.className = 'preview-cta';
        cta.href = openUrl;
        cta.target = '_blank';
        cta.rel = 'noopener';
        cta.textContent = 'Open in Onshape ↗';
        bottom.appendChild(cta);
    }
    preview.appendChild(bottom);

    return preview;
}

function renderCadGrid() {
    const container = document.getElementById('grid-container');
    if (!container || typeof cadModels === 'undefined') return;
    container.innerHTML = '';

    cadModels.forEach(model => {
        const card = document.createElement('div');
        card.className = 'cad-card';

        const openUrl = onshapeDocumentUrlFromEmbed(model.embedUrl);

        const viewerWrapper = document.createElement('div');
        viewerWrapper.className = 'viewer-wrapper';

        const preview = buildPreviewOverlay(model, openUrl);
        viewerWrapper.appendChild(preview);

        const iframe = document.createElement('iframe');
        iframe.title = model.name;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.allow = 'fullscreen';
        iframe.setAttribute('allowfullscreen', '');

        const hint = document.createElement('div');
        hint.className = 'drag-hint';
        hint.textContent = 'Click & drag to rotate';

        let revealed = false;
        const reveal = () => {
            if (revealed) return;
            revealed = true;
            iframe.classList.add('is-ready');
            preview.classList.add('is-hidden');
            hint.classList.add('is-visible');
            setTimeout(() => { hint.classList.remove('is-visible'); }, 4000);
        };

        // Only swap to the iframe once it actually loads. If the load event
        // never fires (blocked embed, validator sandboxing, offline), the
        // styled preview overlay stays put and nothing looks broken.
        iframe.addEventListener('load', () => {
            // Small delay so the Onshape app has a frame to paint.
            setTimeout(reveal, 250);
        });
        iframe.addEventListener('error', () => { /* keep preview visible */ });

        iframe.src = model.embedUrl;
        viewerWrapper.appendChild(iframe);
        viewerWrapper.appendChild(hint);

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

        if (openUrl) {
            const cta = document.createElement('a');
            cta.className = 'card-cta';
            cta.href = openUrl;
            cta.target = '_blank';
            cta.rel = 'noopener';
            cta.textContent = 'Open interactive Onshape model ↗';
            info.appendChild(cta);
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
