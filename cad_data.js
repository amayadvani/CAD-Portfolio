// CAD Portfolio Data
// HOW TO ADD YOUR ONSHAPE MODELS:
// 1. Open your model in Onshape
// 2. Click Share (top right) -> Embed -> Copy embed link
// 3. Replace the embedUrl below with your copied URL
// 4. Update the name, description, and tags fields
//
// Fields:
//   id          - unique number
//   name        - title shown on the card
//   embedUrl    - Onshape embed URL (must include ?rotatable=true for drag)
//   description - 1-3 sentence summary highlighting design intent or skills used
//   tags        - optional array of short skill/topic labels (omit if not needed)

const cadModels = [
    {
        id: 1,
        name: "Design 1",
        embedUrl: "https://cad.onshape.com/embed/dde9038862bc490892b78e12?background=ffffff&drawingBackground=ffffff&rotatable=true",
        description: "Parametric Onshape model showcasing surface modeling and assembly fit. Built around a fully constrained sketch tree so dimensions can be driven from a single configuration table.",
        tags: ["Onshape", "Parametric", "Assembly"]
    },
    {
        id: 2,
        name: "Design 2",
        embedUrl: "https://cad.onshape.com/embed/dde9038862bc490892b78e12?background=ffffff&drawingBackground=ffffff&rotatable=true",
        description: "Mechanism study with rotating linkages and tolerance-aware mates. Emphasis on manufacturability — features chosen to be machinable on a 3-axis mill.",
        tags: ["Mechanism", "DFM", "Tolerancing"]
    },
    {
        id: 3,
        name: "Design 3",
        embedUrl: "https://cad.onshape.com/embed/dde9038862bc490892b78e12?background=ffffff&drawingBackground=ffffff&rotatable=true",
        description: "Sheet-metal enclosure with flanges, bend reliefs, and a flat pattern ready for laser cutting. Modeled to maintain a single source of truth between the 3D body and the 2D drawing.",
        tags: ["Sheet Metal", "Drawings"]
    }
];
