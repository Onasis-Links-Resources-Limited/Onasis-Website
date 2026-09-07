export const CATEGORIES = [
  {
    id: 1,
    name: "RF Materials",
    slug: "rf-materials",
    icon: "📡",
    image: "/images/Categories/rf-materials.jpg",
    description: "Radio frequency components and materials for telecommunications",
    productCount: 12,
  },
  {
    id: 2,
    name: "Power",
    slug: "power",
    icon: "⚡",
    image: "/images/Categories/power.jpg",
    description: "Power supply units and distribution equipment",
    productCount: 10,
  },
  {
    id: 3,
    name: "Fiber Optical Materials",
    slug: "fiber-optical",
    icon: "🔦",
    image: "/images/Categories/fiber-optical.jpg",
    description: "Fiber optic cables, transceivers, and accessories",
    productCount: 12,
  },
  {
    id: 4,
    name: "Miscellaneous",
    slug: "miscellaneous",
    icon: "📦",
    image: "/images/Categories/miscellaneous.jpg",
    description: "Various accessories and supplies",
    productCount: 10,
  },
  {
    id: 5,
    name: "Network Materials",
    slug: "network-materials",
    icon: "🌐",
    image: "/images/Categories/network-materials.jpg",
    description: "Network switches, routers, and infrastructure",
    productCount: 10,
  },
];

// Helper function for product images - uses placeholder if image doesn't exist
<<<<<<< HEAD
// const getProductImage = (productName, imagePath) => {
//   // If image path is provided, use it
//   if (imagePath) return imagePath;
//   // Otherwise use placeholder with product name
//   return `https://via.placeholder.com/400x300?text=${encodeURIComponent(productName)}`;
// };
=======
const getProductImage = (productName, imagePath) => {
  // If image path is provided, use it
  if (imagePath) return imagePath;
  // Otherwise use placeholder with product name
  return `https://via.placeholder.com/400x300?text=${encodeURIComponent(productName)}`;
};
>>>>>>> origin/main

export const PRODUCTS = [
  // ============================================================
  // RF MATERIALS (12 products)
  // ============================================================
  
  // Sub-heading: Amplifiers
  {
    id: 1,
    name: "RF Amplifier",
    category: "RF Materials",
    subHeading: "Amplifiers",
    brand: "Onasis",
    sku: "RF-001",
    image: "/images/Products/rf-amplifier.jpg",
    description: "High-performance RF amplifier for telecommunications. Delivers exceptional signal clarity and power efficiency.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "800MHz - 2.5GHz",
      gain: "20dB",
      powerOutput: "10W",
      impedance: "50Ω",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/rf-amplifier-datasheet.pdf" },
    ],
  },
  {
    id: 2,
    name: "Low Noise Amplifier",
    category: "RF Materials",
    subHeading: "Amplifiers",
    brand: "Onasis",
    sku: "RF-006",
    image: null, // Will use placeholder
    description: "Low noise amplifier for sensitive receiver applications. Minimizes signal degradation.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "100MHz - 2GHz",
      noiseFigure: "0.8dB",
      gain: "25dB",
      powerOutput: "5W",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/lna-datasheet.pdf" },
    ],
  },
  {
    id: 3,
    name: "RF Power Amplifier",
    category: "RF Materials",
    subHeading: "Amplifiers",
    brand: "Onasis",
    sku: "RF-004",
    image: null, // Will use placeholder
    description: "High-power RF amplifier for broadcast applications. Delivers exceptional power output with efficient cooling.",
    isAvailable: false,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "500MHz - 2.5GHz",
      gain: "30dB",
      powerOutput: "50W",
      cooling: "Active fan cooling",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/power-amp-datasheet.pdf" },
    ],
  },

  // Sub-heading: Connectors & Adapters
  {
    id: 4,
    name: "RF Connector Kit",
    category: "RF Materials",
    subHeading: "Connectors & Adapters",
    brand: "Onasis",
    sku: "RF-002",
    image: "/images/Products/rf-connector.jpg",
    description: "Complete RF connector kit for various applications. Includes all essential connectors.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      connectors: "N-type, SMA, BNC, TNC",
      impedance: "50Ω",
      frequency: "DC - 18GHz",
      material: "Brass with gold plating",
    },
    downloads: [
      { name: "Kit Contents", url: "/downloads/connector-kit-contents.pdf" },
    ],
  },
  {
    id: 5,
    name: "SMA Adapter Set",
    category: "RF Materials",
    subHeading: "Connectors & Adapters",
    brand: "Onasis",
    sku: "RF-007",
    image: null,
    description: "Complete SMA adapter set for various RF applications. High-quality gold-plated connectors.",
    isAvailable: true,
    minOrder: 1,
    unit: "set",
    specifications: {
      connectors: "SMA male/female, SMA to N-type",
      impedance: "50Ω",
      frequency: "DC - 18GHz",
      material: "Stainless steel with gold plating",
    },
    downloads: [
      { name: "Spec Sheet", url: "/downloads/sma-adapter-specs.pdf" },
    ],
  },
  {
    id: 6,
    name: "BNC Connector Pack",
    category: "RF Materials",
    subHeading: "Connectors & Adapters",
    brand: "Onasis",
    sku: "RF-008",
    image: null,
    description: "High-quality BNC connectors in various configurations for professional use.",
    isAvailable: true,
    minOrder: 10,
    unit: "pack",
    specifications: {
      type: "BNC male/female",
      impedance: "50Ω/75Ω",
      frequency: "DC - 4GHz",
      material: "Nickel-plated brass",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/bnc-datasheet.pdf" },
    ],
  },

  // Sub-heading: Signal Generators & Test Equipment
  {
    id: 7,
    name: "RF Signal Generator",
    category: "RF Materials",
    subHeading: "Signal Generators & Test Equipment",
    brand: "Onasis",
    sku: "RF-003",
    image: null,
    description: "Precision RF signal generator for testing and calibration. Wide frequency range with high accuracy.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "100kHz - 6GHz",
      output: "-120dBm to +15dBm",
      modulation: "AM/FM/PM",
      accuracy: "±0.5dB",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/signal-generator-datasheet.pdf" },
    ],
  },
  {
    id: 8,
    name: "Spectrum Analyzer",
    category: "RF Materials",
    subHeading: "Signal Generators & Test Equipment",
    brand: "Onasis",
    sku: "RF-009",
    image: null,
    description: "Professional spectrum analyzer for RF signal analysis and troubleshooting.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "9kHz - 3GHz",
      resolution: "1Hz",
      display: "10.1 inch color",
      features: "Tracking generator, pre-amplifier",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/spectrum-datasheet.pdf" },
    ],
  },
  {
    id: 9,
    name: "RF Power Meter",
    category: "RF Materials",
    subHeading: "Signal Generators & Test Equipment",
    brand: "Onasis",
    sku: "RF-010",
    image: null,
    description: "High-precision RF power meter for accurate power measurements in RF systems.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      frequency: "10MHz - 18GHz",
      powerRange: "-60dBm to +30dBm",
      accuracy: "±0.2dB",
      display: "LCD with backlight",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/power-meter-datasheet.pdf" },
    ],
  },

  // Sub-heading: Antennas & Accessories
  {
    id: 10,
    name: "RF Antenna",
    category: "RF Materials",
    subHeading: "Antennas & Accessories",
    brand: "Onasis",
    sku: "RF-005",
    image: null,
    description: "High-gain RF antenna for long-range communication. Weatherproof design for outdoor installations.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      gain: "8dB",
      frequency: "800MHz - 2.5GHz",
      connector: "N-type female",
      mounting: "Pole mount included",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/antenna-installation.pdf" },
    ],
  },
  {
    id: 11,
    name: "Yagi Antenna",
    category: "RF Materials",
    subHeading: "Antennas & Accessories",
    brand: "Onasis",
    sku: "RF-011",
    image: null,
    description: "High-gain directional Yagi antenna for point-to-point communication.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      gain: "12dB",
      frequency: "800MHz - 1.2GHz",
      beamwidth: "45°",
      connector: "N-type female",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/yagi-installation.pdf" },
    ],
  },
  {
    id: 12,
    name: "Antenna Mounting Kit",
    category: "RF Materials",
    subHeading: "Antennas & Accessories",
    brand: "Onasis",
    sku: "RF-012",
    image: null,
    description: "Complete antenna mounting kit for professional installations.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      includes: "Mounting bracket, Hardware, Grounding kit",
      material: "Galvanized steel",
      weight: "2.5kg",
      compatibility: "All standard antennas",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/mount-kit-guide.pdf" },
    ],
  },

  // ============================================================
  // POWER (10 products)
  // ============================================================
  
  // Sub-heading: Power Supply Units
  {
    id: 13,
    name: "Power Supply Unit",
    category: "Power",
    subHeading: "Power Supply Units",
    brand: "Onasis",
    sku: "PW-001",
    image: "/images/Products/power-supply.jpg",
    description: "Industrial power supply unit with surge protection and high efficiency. Reliable power for critical equipment.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      input: "100-240V AC",
      output: "48V DC, 10A",
      efficiency: ">90%",
      protection: "Surge, overcurrent, overvoltage",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/psu-datasheet.pdf" },
    ],
  },
  {
    id: 14,
    name: "Industrial Power Supply",
    category: "Power",
    subHeading: "Power Supply Units",
    brand: "Onasis",
    sku: "PW-004",
    image: null,
    description: "Heavy-duty industrial power supply for harsh environments. IP67 rated for outdoor use.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      input: "85-265V AC",
      output: "24V DC, 20A",
      efficiency: "93%",
      rating: "IP67",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/industrial-psu-datasheet.pdf" },
    ],
  },
  {
    id: 15,
    name: "DIN Rail Power Supply",
    category: "Power",
    subHeading: "Power Supply Units",
    brand: "Onasis",
    sku: "PW-005",
    image: null,
    description: "Compact DIN rail power supply for control panel installations.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      input: "100-240V AC",
      output: "24V DC, 5A",
      mounting: "DIN rail",
      efficiency: "88%",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/din-rail-psu.pdf" },
    ],
  },

  // Sub-heading: Power Distribution
  {
    id: 16,
    name: "Power Distribution Panel",
    category: "Power",
    subHeading: "Power Distribution",
    brand: "Onasis",
    sku: "PW-002",
    image: null,
    description: "Power distribution panel with 12 outlets. Perfect for data centers and telecommunications rooms.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      outlets: "12 x IEC C13",
      voltage: "240V AC",
      current: "16A",
      features: "Circuit protection, LED indicators",
    },
    downloads: [
      { name: "Spec Sheet", url: "/downloads/panel-specs.pdf" },
    ],
  },
  {
    id: 17,
    name: "Power Distribution Unit",
    category: "Power",
    subHeading: "Power Distribution",
    brand: "Onasis",
    sku: "PW-006",
    image: null,
    description: "Advanced PDU with remote monitoring and individual outlet control.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      outlets: "8 x IEC C13 + 4 x IEC C19",
      voltage: "240V AC",
      current: "32A",
      features: "Remote monitoring, Web interface, SNMP",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/pdu-datasheet.pdf" },
    ],
  },

  // Sub-heading: Backup Systems
  {
    id: 18,
    name: "UPS Backup System",
    category: "Power",
    subHeading: "Backup Systems",
    brand: "Onasis",
    sku: "PW-003",
    image: null,
    description: "Uninterruptible power supply for critical systems. Keeps your equipment running during power outages.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      capacity: "2000VA / 1600W",
      runtime: "30 minutes at full load",
      waveform: "Pure sine wave",
      outlets: "4 x IEC C13",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/ups-datasheet.pdf" },
    ],
  },
  {
    id: 19,
    name: "Industrial UPS",
    category: "Power",
    subHeading: "Backup Systems",
    brand: "Onasis",
    sku: "PW-007",
    image: null,
    description: "Heavy-duty UPS for industrial applications with extended runtime.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      capacity: "5000VA / 4000W",
      runtime: "60 minutes",
      waveform: "Pure sine wave",
      features: "Isolation transformer, Remote monitoring",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/industrial-ups.pdf" },
    ],
  },
  {
    id: 20,
    name: "Battery Backup Unit",
    category: "Power",
    subHeading: "Backup Systems",
    brand: "Onasis",
    sku: "PW-008",
    image: null,
    description: "External battery backup for extended UPS runtime and critical systems.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      batteryType: "Lithium-ion",
      capacity: "1500Wh",
      voltage: "48V DC",
      cycleLife: "1500 cycles",
    },
    downloads: [
      { name: "Spec Sheet", url: "/downloads/battery-backup-specs.pdf" },
    ],
  },

  // Sub-heading: Power Accessories
  {
    id: 21,
    name: "Power Cables Set",
    category: "Power",
    subHeading: "Power Accessories",
    brand: "Onasis",
    sku: "PW-009",
    image: null,
    description: "Complete set of power cables for server racks and network equipment.",
    isAvailable: true,
    minOrder: 1,
    unit: "set",
    specifications: {
      lengths: "1m, 2m, 3m",
      connectors: "IEC C13 to C14, C19 to C20",
      gauge: "14 AWG",
      rating: "10A / 250V",
    },
    downloads: [
      { name: "Spec Sheet", url: "/downloads/power-cables-specs.pdf" },
    ],
  },
  {
    id: 22,
    name: "Power Monitoring Kit",
    category: "Power",
    subHeading: "Power Accessories",
    brand: "Onasis",
    sku: "PW-010",
    image: null,
    description: "Advanced power monitoring system for real-time energy usage tracking.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      measurement: "Voltage, Current, Power, Energy",
      accuracy: "±0.5%",
      interface: "Ethernet, Modbus",
      display: "LCD touchscreen",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/power-monitor-datasheet.pdf" },
    ],
  },

  // ============================================================
  // FIBER OPTICAL MATERIALS (12 products)
  // ============================================================
  
  // Sub-heading: Fiber Cables
  {
    id: 23,
    name: "Fiber Optic Cable",
    category: "Fiber Optical Materials",
    subHeading: "Fiber Cables",
    brand: "Onasis",
    sku: "FO-001",
    image: null,
    description: "High-speed fiber optic cable for data centers and long-distance communication.",
    isAvailable: false,
    minOrder: 100,
    unit: "meters",
    specifications: {
      type: "Single-mode",
      fiberCount: "12",
      wavelength: "1310nm / 1550nm",
      attenuation: "<0.35dB/km",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/fiber-cable-datasheet.pdf" },
    ],
  },
  {
    id: 24,
    name: "Multi-Mode Fiber Cable",
    category: "Fiber Optical Materials",
    subHeading: "Fiber Cables",
    brand: "Onasis",
    sku: "FO-005",
    image: null,
    description: "High-bandwidth multi-mode fiber cable for data center applications.",
    isAvailable: true,
    minOrder: 100,
    unit: "meters",
    specifications: {
      type: "Multi-mode OM4",
      fiberCount: "12",
      wavelength: "850nm",
      attenuation: "<2.8dB/km",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/multimode-datasheet.pdf" },
    ],
  },
  {
    id: 25,
    name: "Outdoor Fiber Cable",
    category: "Fiber Optical Materials",
    subHeading: "Fiber Cables",
    brand: "Onasis",
    sku: "FO-006",
    image: null,
    description: "Armored outdoor fiber cable for harsh environmental conditions.",
    isAvailable: true,
    minOrder: 50,
    unit: "meters",
    specifications: {
      type: "Single-mode",
      fiberCount: "24",
      armor: "Steel wire armor",
      rating: "IP68",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/outdoor-fiber.pdf" },
    ],
  },

  // Sub-heading: Transceivers & Modules
  {
    id: 26,
    name: "Fiber Optic Transceiver",
    category: "Fiber Optical Materials",
    subHeading: "Transceivers & Modules",
    brand: "Onasis",
    sku: "FO-002",
    image: null,
    description: "High-speed fiber optic transceiver module for data centers and enterprise networks.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      formFactor: "SFP+",
      dataRate: "10Gbps",
      wavelength: "850nm / 1310nm",
      distance: "Up to 10km",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/transceiver-datasheet.pdf" },
    ],
  },
  {
    id: 27,
    name: "QSFP Transceiver",
    category: "Fiber Optical Materials",
    subHeading: "Transceivers & Modules",
    brand: "Onasis",
    sku: "FO-007",
    image: null,
    description: "High-density QSFP transceiver for 40GbE and 100GbE applications.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      formFactor: "QSFP+",
      dataRate: "40Gbps",
      wavelength: "850nm / 1310nm",
      distance: "Up to 40km",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/qsfp-datasheet.pdf" },
    ],
  },
  {
    id: 28,
    name: "Bi-Directional SFP",
    category: "Fiber Optical Materials",
    subHeading: "Transceivers & Modules",
    brand: "Onasis",
    sku: "FO-008",
    image: null,
    description: "Bi-directional SFP for single-fiber applications reducing cable cost.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      formFactor: "SFP",
      dataRate: "1.25Gbps",
      wavelength: "Tx:1310nm / Rx:1550nm",
      distance: "Up to 20km",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/bidi-sfp.pdf" },
    ],
  },

  // Sub-heading: Patch Cables
  {
    id: 29,
    name: "Fiber Patch Cable",
    category: "Fiber Optical Materials",
    subHeading: "Patch Cables",
    brand: "Onasis",
    sku: "FO-003",
    image: null,
    description: "High-quality fiber patch cable for data center connections. Low insertion loss.",
    isAvailable: true,
    minOrder: 10,
    unit: "pieces",
    specifications: {
      type: "Duplex",
      length: "1m, 2m, 3m, 5m",
      connector: "LC-LC, SC-SC",
      jacket: "LSZH",
    },
    downloads: [
      { name: "Data Sheet", url: "/downloads/patch-cable-sheet.pdf" },
    ],
  },
  {
    id: 30,
    name: "Armored Patch Cable",
    category: "Fiber Optical Materials",
    subHeading: "Patch Cables",
    brand: "Onasis",
    sku: "FO-009",
    image: null,
    description: "Durable armored patch cable for high-traffic areas requiring extra protection.",
    isAvailable: true,
    minOrder: 1,
    unit: "pieces",
    specifications: {
      armor: "Stainless steel",
      length: "2m, 5m, 10m",
      connector: "LC-LC, SC-SC",
      rating: "IP67",
    },
    downloads: [
      { name: "Spec Sheet", url: "/downloads/armored-patch.pdf" },
    ],
  },

  // Sub-heading: Splicing & Installation
  {
    id: 31,
    name: "Fiber Optic Splice Kit",
    category: "Fiber Optical Materials",
    subHeading: "Splicing & Installation",
    brand: "Onasis",
    sku: "FO-004",
    image: null,
    description: "Complete fiber optic splicing kit for field installations. Includes all essential tools.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      includes: "Cleaver, splicer, cleaning kit, case",
      batteries: "Rechargeable lithium-ion",
      display: "LCD touchscreen",
      warranty: "2 years",
    },
    downloads: [
      { name: "Kit Contents", url: "/downloads/splice-kit-contents.pdf" },
    ],
  },
  {
    id: 32,
    name: "Fiber Cleaver",
    category: "Fiber Optical Materials",
    subHeading: "Splicing & Installation",
    brand: "Onasis",
    sku: "FO-010",
    image: null,
    description: "Precision fiber cleaver for clean and accurate fiber end preparation.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      fiberType: "Single-mode, Multi-mode",
      angle: "0° - 15°",
      cleaveLength: "5-20mm",
      bladeLife: "60,000 cleaves",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/cleaver-datasheet.pdf" },
    ],
  },
  {
    id: 33,
    name: "Fiber Tester Kit",
    category: "Fiber Optical Materials",
    subHeading: "Splicing & Installation",
    brand: "Onasis",
    sku: "FO-011",
    image: null,
    description: "Complete fiber testing kit for installation verification and troubleshooting.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      includes: "Power meter, Light source, Visual fault locator",
      wavelength: "850nm, 1310nm, 1550nm",
      accuracy: "±0.2dB",
      display: "LCD backlit",
    },
    downloads: [
      { name: "User Guide", url: "/downloads/fiber-tester-guide.pdf" },
    ],
  },

  // Sub-heading: Distribution & Management
  {
    id: 34,
    name: "Fiber Distribution Panel",
    category: "Fiber Optical Materials",
    subHeading: "Distribution & Management",
    brand: "Onasis",
    sku: "FO-012",
    image: null,
    description: "Professional fiber distribution panel for organized cable management.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      ports: "24 ports",
      type: "LGX compatible",
      material: "Steel with powder coat",
      mounting: "19-inch rack",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/distribution-panel.pdf" },
    ],
  },

  // ============================================================
  // NETWORK MATERIALS (10 products)
  // ============================================================
  
  // Sub-heading: Network Switches
  {
    id: 35,
    name: "Network Switch",
    category: "Network Materials",
    subHeading: "Network Switches",
    brand: "Onasis",
    sku: "NW-001",
    image: null,
    description: "Enterprise network switch with 48 ports. High-performance switching for demanding environments.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      ports: "48 x Gigabit Ethernet",
      type: "Managed",
      throughput: "96Gbps",
      features: "VLAN, QoS, Link aggregation",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/switch-datasheet.pdf" },
    ],
  },
  {
    id: 36,
    name: "10GbE Network Switch",
    category: "Network Materials",
    subHeading: "Network Switches",
    brand: "Onasis",
    sku: "NW-005",
    image: null,
    description: "High-performance 10 Gigabit Ethernet switch for demanding data center environments.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      ports: "24 x 10GbE SFP+",
      type: "Managed Layer 3",
      throughput: "480Gbps",
      features: "VXLAN, BGP, MPLS",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/10gbe-switch.pdf" },
    ],
  },
  {
    id: 37,
    name: "PoE Network Switch",
    category: "Network Materials",
    subHeading: "Network Switches",
    brand: "Onasis",
    sku: "NW-006",
    image: null,
    description: "Power over Ethernet switch for IP cameras, phones, and wireless access points.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      ports: "24 x Gigabit PoE+",
      powerBudget: "370W",
      type: "Managed",
      features: "PoE scheduling, Auto-negotiation",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/poe-switch.pdf" },
    ],
  },

  // Sub-heading: Routers & Gateways
  {
    id: 38,
    name: "Network Router",
    category: "Network Materials",
    subHeading: "Routers & Gateways",
    brand: "Onasis",
    sku: "NW-002",
    image: null,
    description: "High-performance network router for enterprises. Dual-band with VPN support.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      ports: "4 x Gigabit Ethernet",
      wireless: "Dual-band WiFi 6",
      vpn: "IPsec, OpenVPN",
      security: "Firewall, IDS/IPS",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/router-datasheet.pdf" },
    ],
  },
  {
    id: 39,
    name: "Industrial Router",
    category: "Network Materials",
    subHeading: "Routers & Gateways",
    brand: "Onasis",
    sku: "NW-007",
    image: null,
    description: "Industrial-grade 4G/LTE router for remote and harsh environment deployments.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      cellular: "4G/LTE Cat 4",
      ports: "2 x Gigabit Ethernet",
      features: "GPS, IPsec VPN, Modbus",
      rating: "IP67",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/industrial-router.pdf" },
    ],
  },
  {
    id: 40,
    name: "WiFi Access Point",
    category: "Network Materials",
    subHeading: "Routers & Gateways",
    brand: "Onasis",
    sku: "NW-008",
    image: null,
    description: "High-density WiFi 6 access point for enterprise wireless networks.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      standard: "WiFi 6 (802.11ax)",
      bands: "2.4GHz, 5GHz",
      userCapacity: "256 devices",
      features: "MU-MIMO, OFDMA, BSS coloring",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/wifi-ap.pdf" },
    ],
  },

  // Sub-heading: Security & Firewalls
  {
    id: 41,
    name: "Network Firewall",
    category: "Network Materials",
    subHeading: "Security & Firewalls",
    brand: "Onasis",
    sku: "NW-003",
    image: null,
    description: "Enterprise-grade network firewall with advanced threat protection and high throughput.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      throughput: "10Gbps",
      connections: "2M concurrent",
      features: "Next-gen firewall, VPN, IPS",
      availability: "Active/Active HA",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/firewall-datasheet.pdf" },
    ],
  },
  {
    id: 42,
    name: "UTM Security Appliance",
    category: "Network Materials",
    subHeading: "Security & Firewalls",
    brand: "Onasis",
    sku: "NW-009",
    image: null,
    description: "Unified Threat Management appliance with comprehensive security features.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      throughput: "4Gbps",
      features: "Anti-virus, Anti-spam, Web filtering, DLP",
      interfaces: "8 x Gigabit Ethernet",
      storage: "2TB HDD",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/utm-datasheet.pdf" },
    ],
  },

  // Sub-heading: Network Testing & Tools
  {
    id: 43,
    name: "Network Cable Tester",
    category: "Network Materials",
    subHeading: "Network Testing & Tools",
    brand: "Onasis",
    sku: "NW-004",
    image: null,
    description: "Professional network cable tester for diagnostics. Tests wiremap, length, and TDR.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      tests: "Wiremap, length, TDR",
      display: "LCD backlit",
      batteries: "AAA x 4",
      features: "Auto-shutdown, remote unit",
    },
    downloads: [
      { name: "User Manual", url: "/downloads/cable-tester-manual.pdf" },
    ],
  },
  {
    id: 44,
    name: "Network Speed Tester",
    category: "Network Materials",
    subHeading: "Network Testing & Tools",
    brand: "Onasis",
    sku: "NW-010",
    image: null,
    description: "Advanced network speed tester for validating network performance.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      speed: "Up to 10Gbps",
      protocols: "TCP, UDP",
      features: "Latency, Jitter, Packet loss",
      display: "Color touchscreen",
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/speed-tester.pdf" },
    ],
  },

  // ============================================================
  // MISCELLANEOUS (10 products)
  // ============================================================
  
  // Sub-heading: Cable Management
  {
    id: 45,
    name: "Cable Management Kit",
    category: "Miscellaneous",
    subHeading: "Cable Management",
    brand: "Onasis",
    sku: "MC-001",
    image: null,
    description: "Complete cable management kit for tidy installations. Professional organization.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      includes: "Cable ties, Velcro straps, Labels, Cable clips",
      materials: "Nylon, PET plastic",
      colors: "Black, White, Assorted",
    },
    downloads: [
      { name: "Kit Contents", url: "/downloads/cable-kit-contents.pdf" },
    ],
  },
  {
    id: 46,
    name: "Cable Raceway",
    category: "Miscellaneous",
    subHeading: "Cable Management",
    brand: "Onasis",
    sku: "MC-003",
    image: null,
    description: "Professional cable raceway for clean and organized cable routing.",
    isAvailable: true,
    minOrder: 1,
    unit: "meter",
    specifications: {
      material: "PVC, Aluminum",
      sizes: "1-4 inch",
      colors: "Black, White, Grey",
      rating: "UL94 V-0",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/raceway-guide.pdf" },
    ],
  },
  {
    id: 47,
    name: "Cable Labels Kit",
    category: "Miscellaneous",
    subHeading: "Cable Management",
    brand: "Onasis",
    sku: "MC-004",
    image: null,
    description: "Complete cable labeling kit for professional cable identification.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      labels: "Pre-printed, Write-on, Color-coded",
      materials: "Vinyl, Polyester",
      includes: "Label printer, Labels, Marker",
      durability: "5 years",
    },
    downloads: [
      { name: "User Guide", url: "/downloads/cable-labels-guide.pdf" },
    ],
  },

  // Sub-heading: Tools & Equipment
  {
    id: 48,
    name: "Tool Set",
    category: "Miscellaneous",
    subHeading: "Tools & Equipment",
    brand: "Onasis",
    sku: "MC-002",
    image: null,
    description: "Professional tool set for telecommunications. Complete toolkit for installation.",
    isAvailable: true,
    minOrder: 1,
    unit: "set",
    specifications: {
      includes: "Crimping tool, Wire stripper, Punchdown tool, Carrying case",
      materials: "Steel, Aluminum",
      warranty: "3 years",
    },
    downloads: [
      { name: "Tool Guide", url: "/downloads/tool-set-guide.pdf" },
    ],
  },
  {
    id: 49,
    name: "Crimping Tool",
    category: "Miscellaneous",
    subHeading: "Tools & Equipment",
    brand: "Onasis",
    sku: "MC-005",
    image: null,
    description: "Professional crimping tool for RJ45 and RJ11 connectors with precision die.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      connectors: "RJ45, RJ11, RJ12",
      material: "Steel with comfort grip",
      features: "Interchangeable dies, Ratchet mechanism",
      warranty: "2 years",
    },
    downloads: [
      { name: "User Guide", url: "/downloads/crimping-tool-guide.pdf" },
    ],
  },
  {
    id: 50,
    name: "Wire Stripper",
    category: "Miscellaneous",
    subHeading: "Tools & Equipment",
    brand: "Onasis",
    sku: "MC-006",
    image: null,
    description: "Precision wire stripper for various cable gauges with built-in cutter.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      gauges: "10-26 AWG",
      features: "Strip, Cut, Crimp",
      material: "Steel with grips",
      warranty: "2 years",
    },
    downloads: [
      { name: "User Guide", url: "/downloads/wire-stripper-guide.pdf" },
    ],
  },

  // Sub-heading: Mounting & Hardware
  {
    id: 51,
    name: "Rack Mount Kit",
    category: "Miscellaneous",
    subHeading: "Mounting & Hardware",
    brand: "Onasis",
    sku: "MC-007",
    image: null,
    description: "Complete rack mount kit for standard 19-inch racks. Includes hardware.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      type: "19-inch rack mount",
      includes: "Mounting ears, Screws, Cage nuts",
      material: "Steel, Powder coated",
      weight: "2.5kg",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/rack-mount-guide.pdf" },
    ],
  },
  {
    id: 52,
    name: "Wall Mount Bracket",
    category: "Miscellaneous",
    subHeading: "Mounting & Hardware",
    brand: "Onasis",
    sku: "MC-008",
    image: null,
    description: "Heavy-duty wall mount bracket for networking equipment.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      weight: "50kg capacity",
      material: "Steel with powder coat",
      features: "Adjustable, Cable management",
      compatibility: "All standard equipment",
    },
    downloads: [
      { name: "Installation Guide", url: "/downloads/wall-bracket-guide.pdf" },
    ],
  },

  // Sub-heading: Safety & Protection
  {
    id: 53,
    name: "ESD Protection Kit",
    category: "Miscellaneous",
    subHeading: "Safety & Protection",
    brand: "Onasis",
    sku: "MC-009",
    image: null,
    description: "Electrostatic discharge protection kit for sensitive equipment handling.",
    isAvailable: true,
    minOrder: 1,
    unit: "kit",
    specifications: {
      includes: "ESD mat, Wrist strap, Grounding cord",
      material: "Anti-static rubber",
      resistance: "1 x 10^6Ω - 1 x 10^9Ω",
      size: "2ft x 3ft",
    },
    downloads: [
      { name: "User Guide", url: "/downloads/esd-kit-guide.pdf" },
    ],
  },
  {
    id: 54,
    name: "Safety Glasses",
    category: "Miscellaneous",
    subHeading: "Safety & Protection",
    brand: "Onasis",
    sku: "MC-010",
    image: null,
    description: "Professional safety glasses with impact-resistant lenses for workshop use.",
    isAvailable: true,
    minOrder: 1,
    unit: "unit",
    specifications: {
      lens: "Polycarbonate",
      protection: "ANSI Z87.1",
      features: "Anti-fog, Scratch resistant",
      colors: "Clear, Tinted",
    },
    downloads: [
      { name: "Product Info", url: "/downloads/safety-glasses-info.pdf" },
    ],
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

export const getProductsByCategory = (slug) => {
  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) return [];
  return PRODUCTS.filter(product => product.category === category.name);
};

export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id);
};

export const getCategoryBySlug = (slug) => {
  return CATEGORIES.find(category => category.slug === slug);
};

export const getProductSubHeadings = (categorySlug) => {
  const products = getProductsByCategory(categorySlug);
  const subHeadings = [...new Set(products.map(p => p.subHeading))];
  return subHeadings;
};

export const searchProducts = (query) => {
  const searchLower = query.toLowerCase();
  return PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower) ||
    product.sku.toLowerCase().includes(searchLower) ||
    product.brand.toLowerCase().includes(searchLower)
  );
};