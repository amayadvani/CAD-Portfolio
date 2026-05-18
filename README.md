# CAD Portfolio — Amay Advani

An employer-facing portfolio site showcasing mechanical engineering CAD work (Onshape) and supporting coding projects.

**Live:** enable GitHub Pages (Settings → Pages → Branch: `main`, root) to publish at `https://amayadvani.github.io/CAD-Portfolio/`.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, styles, and section layout (nav, hero, CAD grid, projects, footer). |
| `cad_data.js` | List of CAD models — `{ id, name, embedUrl, description, tags? }`. |
| `projects_data.js` | List of coding projects — `{ name, description, repo?, demo?, tags? }`. |
| `main.js` | Renders both grids from the data files on DOMContentLoaded. |
| `cad_viewer.js` | Legacy Three.js STL viewer (not used by the current iframe-based flow). |

## Adding a CAD model

1. Open the model in Onshape.
2. Share → Embed → copy the URL (make sure `rotatable=true` is in the query string).
3. Append a new object to `cadModels` in `cad_data.js`.

## Adding a coding project

Append a new object to `codingProjects` in `projects_data.js`. Set `repo` and/or `demo` to add link buttons.

## Local preview

No build step. Serve the directory with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Push to `main` and enable GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root).

## Contact

- GitHub: <https://github.com/amayadvani>
- LinkedIn: <https://www.linkedin.com/in/amayadvani>
