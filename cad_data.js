// CAD Portfolio Data
// Use relative paths so STL files load from GitHub Pages
// Files are in the cad_data/ folder

const cadModels = [
  {
    id: 1,
    name: "Angled Claw V1",
    stlPath: "cad_data/Angled Claw V1 (1).stl",
    description: "An angled claw mechanism designed for precision gripping operations."
  },
  {
    id: 2,
    name: "Cone Guider V1",
    stlPath: "cad_data/Cone Guider V1.stl",
    description: "A cone-shaped guiding component for directing parts along a specific path."
  },
  {
    id: 3,
    name: "Ergonomic Cone Guider",
    stlPath: "cad_data/Ergonomic cone guider (1).stl",
    description: "An ergonomically designed cone guider optimized for improved part handling."
  },
  {
    id: 4,
    name: "Horizontal Claw with Range Sensor",
    stlPath: "cad_data/Horizontal Claw with Range Sensor.stl",
    description: "A horizontal claw assembly integrated with a range sensor for autonomous operation."
  },
  {
    id: 5,
    name: "Inside Gusset VFinal",
    stlPath: "cad_data/Inside Gusset VFinal.stl",
    description: "Internal gusset structure providing reinforcement to load-bearing areas."
  },
  {
    id: 6,
    name: "Legal Guider VFinal",
    stlPath: "cad_data/Legal Guider VFinal.stl",
    description: "A competition-legal guider design meeting all regulatory specifications."
  },
  {
    id: 7,
    name: "Legal Pole Guider V1",
    stlPath: "cad_data/Legal Pole Guider V1.stl",
    description: "A pole-based guider design for linear motion guidance applications."
  },
  {
    id: 8,
    name: "Outside Gusset V1",
    stlPath: "cad_data/Outside Gusset V1.stl",
    description: "External gusset reinforcement for lateral stability in structural assemblies."
  },
  {
    id: 9,
    name: "Outside Gusset VFinal",
    stlPath: "cad_data/Outside Gusset VFinal.stl",
    description: "Final iteration of external gusset design with optimized material placement."
  },
  {
    id: 10,
    name: "Pole Guider VFinal",
    stlPath: "cad_data/Pole Guider VFinal.stl",
    description: "Final version of pole guider with refined tolerances for smooth operation."
  },
  {
    id: 11,
    name: "Pulley Driver",
    stlPath: "cad_data/Pulley Driver.stl",
    description: "Pulley-based drive mechanism for rotational power transmission."
  },
  {
    id: 12,
    name: "Translated Lazy Suzan",
    stlPath: "cad_data/Translated Lazy Suzan.stl",
    description: "A lazy susan mechanism redesigned for linear translation applications."
  }
];


// Expose to global scope for main.js (ES Module)
window.cadModels = cadModels;
