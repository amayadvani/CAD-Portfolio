// CAD Portfolio Data - use raw.githubusercontent.com URLs to bypass GitHub Pages serving issue
// All models are loaded as STL files from raw.githubusercontent.com
// Paths are URL-encoded for spaces
const BASE_URL = 'https://raw.githubusercontent.com/amayadvani/CAD-Portfolio/main/cad_data/';
const cadModels = [
  {
    id: 1,
    name: "Angled Claw V1",
    stlPath: BASE_URL + 'Angled%20Claw%20V1%20(1).stl',
    description: "An angled claw mechanism designed for precision gripping operations."
  },
  {
    id: 2,
    name: "Cone Guider V1",
    stlPath: BASE_URL + 'Cone%20Guider%20V1.stl',
    description: "A cone-shaped guiding component for directing parts along a specific path."
  },
  {
    id: 3,
    name: "Ergonomic Cone Guider",
    stlPath: BASE_URL + 'Ergonomic%20cone%20guider%20(1).stl',
    description: "An ergonomically designed cone guider optimized for improved part handling."
  },
  {
    id: 4,
    name: "Horizontal Claw with Range Sensor",
    stlPath: BASE_URL + 'Horizontal%20Claw%20with%20Range%20Sensor.stl',
    description: "A horizontal claw assembly integrated with a range sensor for autonomous operation."
  },
  {
    id: 5,
    name: "Inside Gusset VFinal",
    stlPath: BASE_URL + 'Inside%20Gusset%20VFinal.stl',
    description: "Internal gusset structure providing reinforcement to load-bearing areas."
  },
  {
    id: 6,
    name: "Legal Guider VFinal",
    stlPath: BASE_URL + 'Legal%20Guider%20VFinal.stl',
    description: "A competition-legal guider design meeting all regulatory specifications."
  },
  {
    id: 7,
    name: "Legal Pole Guider V1",
    stlPath: BASE_URL + 'Legal%20Pole%20Guider%20V1.stl',
    description: "A pole-based guider design for linear motion guidance applications."
  },
  {
    id: 8,
    name: "Outside Gusset V1",
    stlPath: BASE_URL + 'Outside%20Gusset%20V1.stl',
    description: "External gusset reinforcement for lateral stability in structural assemblies."
  },
  {
    id: 9,
    name: "Outside Gusset VFinal",
    stlPath: BASE_URL + 'Outside%20Gusset%20VFinal.stl',
    description: "Final iteration of external gusset design with optimized material placement."
  },
  {
    id: 10,
    name: "Pole Guider VFinal",
    stlPath: BASE_URL + 'Pole%20Guider%20VFinal.stl',
    description: "Final version of pole guider with refined tolerances for smooth operation."
  },
  {
    id: 11,
    name: "Pulley Driver",
    stlPath: BASE_URL + 'Pulley%20Driver.stl',
    description: "Pulley-based drive mechanism for rotational power transmission."
  },
  {
    id: 12,
    name: "Translated Lazy Suzan",
    stlPath: BASE_URL + 'Translated%20Lazy%20Suzan.stl',
    description: "A lazy susan mechanism redesigned for linear translation applications."
  }
];
