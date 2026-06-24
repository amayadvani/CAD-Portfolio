// CAD Portfolio Data
// Use relative paths so STL files load from GitHub Pages
// Files are in the cad_data/ folder

const cadModels = [
    ,
    {
    id: 11,
    name: "Custom Drivetrain Left Pod Assembly",
    stlPath: "cad_data/Custom Drivetrain Left Pod Assembly.stl",
    description: "Lowered polygons from 3 million to 0.5 million for github upload"
  },
  {
    id: 13,
    name: "V4 Bar Single Motor Design",
    stlPath: "cad_data/V4 BAR design with motor.stl",
    description: "V4 bar assembly integrated with a motor to optimize battery power and open up more servos to be used in throughout other designs."
  },
  {
    id: 7,
    name: "V4 Bar Double Servo Assembly",
    stlPath: "cad_data/V4_Bar_Assembly_CORRECTED.stl",
    description: "Four-bar linkage assembly with servo actuation."
  },
  {
    id: 1,
    name: "Angled Claw V1 Assembly",
    stlPath: "cad_data/Angled_Claw_V1_1.stl",
    description: "An angled claw mechanism designed for precision gripping operations."
  },
  {
    id: 2,
    name: "Horizontal Claw with Range Sensor Assembly",
    stlPath: "cad_data/Horizontal_Claw_with_Range_Sensor.stl",
    description: "A servo powered horizontal claw assembly integrated with a range sensor for autonomous operation."
  },
  {
    id: 3,
    name: "Ergonomic Cone Guider V3",
    stlPath: "cad_data/Ergonomic_Cone_Guider_1.stl",
    description: "An ergonomically designed cone guider optimized for improved part handling."
  },
  {
    id: 5,
    name: "Inside Gusset V2",
    stlPath: "cad_data/Inside_Gusset_VFinal.stl",
    description: "Internal gusset structure providing reinforcement to load-bearing areas."
  },
  {
    id: 9,
    name: "Outside Gusset V1",
    stlPath: "cad_data/Outside_Gusset_V1.stl",
    description: "External gusset reinforcement for lateral stability in structural assemblies."
  },
  {
    id: 10,
    name: "Outside Gusset VFinal",
    stlPath: "cad_data/Outside_Gusset_VFinal.stl",
    description: "Final iteration of external gusset design with optimized material placement."
  },
  {
    id: 4,
    name: "Cone Guider V1",
    stlPath: "cad_data/Cone_Guider_V1.stl",
    description: "A cone-shaped guiding component designed for directing parts along a specific path."
  },
  {
    id: 6,
    name: "Cone Guider V2",
    stlPath: "cad_data/Legal_Guider_VFinal.stl",
    description: "A competition-legal guider design meeting all regulatory specifications."
  },
  {
    id: 8,
    name: "Pole Guider VFinal",
    stlPath: "cad_data/Pole_Guider_VFinal.stl",
    description: "Final version of pole guider with refined tolerances for smooth operation."
  },
  {
    id: 11,
    name: "Pulley Driver",
    stlPath: "cad_data/Pulley_Driver.stl",
    description: "Pulley-based drive mechanism for rotational power transmission."
  },
  {
    id: 12,
    name: "Translated Lazy Suzan",
    stlPath: "cad_data/Translated_Lazy_Suzan.stl",
    description: "A lazy susan mechanism redesigned for linear translation applications."
  }
];

// Expose to global scope for main.js (ES Module)
window.cadModels = cadModels;
