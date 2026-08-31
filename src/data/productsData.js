// Product categories - DO NOT CHANGE
export const CATEGORIES = [
  'RF Materials',
  'Power',
  'Fiber Optical Materials',
  'Miscellaneous',
  'Network Materials'
];

// Sample product data - Replace with actual products later
export const PRODUCTS = [
  // RF Materials
  {
    id: 1,
    name: 'RF Coaxial Cable - RG-58',
    category: 'RF Materials',
    description: 'High-quality RG-58 coaxial cable for RF applications. 50 ohm impedance, suitable for radio communications and test equipment.',
    image: '/images/products/rg58-cable.jpg',
    badge: 'Featured',
    specifications: [
      'Impedance: 50Ω',
      'Frequency range: DC to 1 GHz',
      'Shield: Braided copper',
      'Temperature: -40°C to +85°C'
    ],
    features: [
      'Low signal loss',
      'Flexible design',
      'UV resistant jacket'
    ]
  },
  {
    id: 2,
    name: 'N-Type Connector Male',
    category: 'RF Materials',
    description: 'Precision N-type male connector for RF applications. Features excellent VSWR and low insertion loss.',
    image: '/images/products/n-type-connector.jpg',
    badge: 'New',
    specifications: [
      'Impedance: 50Ω',
      'Frequency: DC to 11 GHz',
      'Material: Brass with silver plating',
      'IP Rating: IP67'
    ],
    features: [
      'Weatherproof design',
      'Low VSWR',
      'Durable construction'
    ]
  },
  {
    id: 3,
    name: 'RF Attenuator - 10dB',
    category: 'RF Materials',
    description: 'Precision 10dB RF attenuator for signal level control. N-type connectors, 50 ohm impedance.',
    image: '/images/products/rf-attenuator.jpg',
    badge: null,
    specifications: [
      'Attenuation: 10dB ±0.5dB',
      'Impedance: 50Ω',
      'Frequency: DC to 6 GHz',
      'Power: 2W'
    ],
    features: [
      'High accuracy',
      'Low VSWR',
      'Compact design'
    ]
  },

  // Power
  {
    id: 4,
    name: 'Power Distribution Unit - 8 Port',
    category: 'Power',
    description: 'Professional 8-port power distribution unit for network equipment and telecom infrastructure.',
    image: '/images/products/pdu-8port.jpg',
    badge: 'Featured',
    specifications: [
      'Input: 230V AC',
      'Output: 8 x C13 outlets',
      'Max load: 16A',
      'Mounting: 19" rack'
    ],
    features: [
      'Surge protection',
      'LED indicators',
      'Overload protection'
    ]
  },
  {
    id: 5,
    name: 'Rectifier Module - 48V/100A',
    category: 'Power',
    description: 'High-efficiency rectifier module for telecom power systems. 48V output, 100A capacity.',
    image: '/images/products/rectifier-module.jpg',
    badge: null,
    specifications: [
      'Output: 48V DC',
      'Current: 100A',
      'Efficiency: >96%',
      'Cooling: Fan cooled'
    ],
    features: [
      'Hot-swappable',
      'Redundant operation',
      'Remote monitoring'
    ]
  },
  {
    id: 6,
    name: 'Solar Charge Controller - 60A',
    category: 'Power',
    description: 'MPPT solar charge controller for off-grid telecom sites. 60A capacity, compatible with 12V/24V systems.',
    image: '/images/products/solar-controller.jpg',
    badge: 'New',
    specifications: [
      'Max current: 60A',
      'Voltage: 12/24V auto-detect',
      'Efficiency: >98%',
      'Protection: IP65'
    ],
    features: [
      'MPPT technology',
      'LCD display',
      'Temperature compensation'
    ]
  },

  // Fiber Optical Materials
  {
    id: 7,
    name: 'Fiber Optic Patch Cord - LC-LC',
    category: 'Fiber Optical Materials',
    description: 'Premium LC to LC fiber optic patch cord. OS2 single-mode, low insertion loss for high-speed networks.',
    image: '/images/products/fiber-patch-cord.jpg',
    badge: 'Featured',
    specifications: [
      'Connector: LC to LC',
      'Fiber: OS2 single-mode',
      'Length: 3m',
      'Insertion loss: <0.3dB'
    ],
    features: [
      'Low loss',
      'Flexible design',
      'Premium quality'
    ]
  },
  {
    id: 8,
    name: 'Fiber Optic Splice Tray',
    category: 'Fiber Optical Materials',
    description: '24-position fiber optic splice tray for network cabinets. Supports up to 24 fusion splices.',
    image: '/images/products/splice-tray.jpg',
    badge: null,
    specifications: [
      'Capacity: 24 splices',
      'Material: ABS plastic',
      'Temperature: -40°C to +85°C',
      'Compatible with: 12mm tubing'
    ],
    features: [
      'Easy organization',
      'Secure splices',
      'Durable design'
    ]
  },
  {
    id: 9,
    name: 'Fiber Optic Termination Kit',
    category: 'Fiber Optical Materials',
    description: 'Complete termination kit for fiber optic installations. Includes cleaning supplies, cleaver, and tools.',
    image: '/images/products/termination-kit.jpg',
    badge: 'New',
    specifications: [
      'Includes: Cleaver, stripper, cleaner',
      'Case: Hard case',
      'Weight: 2.5kg',
      'Compatible: All common connectors'
    ],
    features: [
      'Complete solution',
      'Professional quality',
      'Portable case'
    ]
  },

  // Miscellaneous
  {
    id: 10,
    name: 'Telecom Test Set - Digital Multimeter',
    category: 'Miscellaneous',
    description: 'Professional digital multimeter for telecom testing. Measures voltage, current, resistance, and more.',
    image: '/images/products/test-set.jpg',
    badge: 'Featured',
    specifications: [
      'DC voltage: 1000V',
      'AC voltage: 750V',
      'Resistance: 40MΩ',
      'Display: True RMS'
    ],
    features: [
      'Auto-ranging',
      'Backlit display',
      'Data hold'
    ]
  },
  {
    id: 11,
    name: 'Network Cable Tester',
    category: 'Miscellaneous',
    description: 'Comprehensive network cable tester for Ethernet, coaxial, and telephone cables.',
    image: '/images/products/cable-tester.jpg',
    badge: null,
    specifications: [
      'Cable types: UTP, STP, Coax',
      'Test: Continuity, short, open',
      'Display: LCD',
      'Power: 9V battery'
    ],
    features: [
      'Easy to use',
      'Quick results',
      'Remote testing'
    ]
  },

  // Network Materials
  {
    id: 12,
    name: 'Network Cabinet - 42U',
    category: 'Network Materials',
    description: 'Professional 42U network cabinet with glass front door and comprehensive cable management.',
    image: '/images/products/network-cabinet.jpg',
    badge: 'Featured',
    specifications: [
      'Size: 42U',
      'Dimensions: 600x1000x2000mm',
      'Load capacity: 800kg',
      'Material: Steel with powder coating'
    ],
    features: [
      'Glass front door',
      'Cable management',
      'Ventilation top'
    ]
  },
  {
    id: 13,
    name: 'Patch Panel - 24 Port Cat6',
    category: 'Network Materials',
    description: '24-port Cat6 patch panel with integrated cable management and labeling system.',
    image: '/images/products/patch-panel.jpg',
    badge: null,
    specifications: [
      'Ports: 24',
      'Category: Cat6',
      'Termination: 110 punch down',
      'Mounting: 19" rack'
    ],
    features: [
      'Color-coded',
      'Easy termination',
      'Cable management'
    ]
  },
  {
    id: 14,
    name: 'Cable Management Tray - Horizontal',
    category: 'Network Materials',
    description: '1U horizontal cable management tray with finger duct system for organized rack cabling.',
    image: '/images/products/cable-tray.jpg',
    badge: null,
    specifications: [
      'Size: 1U',
      'Material: Steel',
      'Mounting: 19" rack',
      'Color: Black'
    ],
    features: [
      'Finger duct design',
      'Easy installation',
      'Clean organization'
    ]
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return PRODUCTS.filter(product => product.category === category);
};

// Helper function to get category product count
export const getCategoryCount = (category) => {
  return PRODUCTS.filter(product => product.category === category).length;
};

// Helper function to search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return PRODUCTS;
  
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id);
};