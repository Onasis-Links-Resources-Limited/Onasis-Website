export const PRODUCTS = [
  {
    id: 1,
    name: "Fiber Optic Cable - 4 Core",
    category: "Fiber Optic",
    brand: "Corning",
    sku: "FO-4C-1000",
    stock: 45,
    rating: 4.8,
    description: "High-quality 4-core single-mode fiber optic cable. Ideal for long-distance data transmission with minimal signal loss.",
    specifications: {
      cores: 4,
      type: "Single Mode",
      length: "1000m",
      jacket: "LSZH",
      connector: "SC/APC",
      attenuation: "0.35dB/km"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/fiber-optic-datasheet.pdf" },
      { name: "Installation Guide", url: "/downloads/fiber-optic-installation.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    isAvailable: true,
    minOrder: 50,
    unit: "Meters"
  },
  {
    id: 2,
    name: "Outdoor Telecom Cabinet",
    category: "Network Infrastructure",
    brand: "Huawei",
    sku: "HWC-OC-12U",
    stock: 12,
    rating: 4.7,
    description: "Weatherproof outdoor cabinet for telecom equipment. IP65 rated with 12U rack space.",
    specifications: {
      type: "Outdoor",
      rackUnits: 12,
      protection: "IP65",
      material: "Galvanized Steel",
      cooling: "Passive",
      mounting: "Wall/Floor"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/outdoor-cabinet-datasheet.pdf" },
      { name: "Installation Manual", url: "/downloads/outdoor-cabinet-manual.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1581092335874-5b5e9c0c2167?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1581092335874-5b5e9c0c2167?w=800&q=80",
    isAvailable: true,
    minOrder: 1,
    unit: "Unit"
  },
  {
    id: 3,
    name: "5G NR Antenna",
    category: "5G Equipment",
    brand: "Ericsson",
    sku: "ERC-5G-ANT-28",
    stock: 8,
    rating: 4.9,
    description: "High-gain 5G NR antenna supporting 28GHz band. Designed for mmWave deployments.",
    specifications: {
      frequency: "28GHz",
      gain: "24dBi",
      polarization: "Dual",
      beamwidth: "8°",
      connectors: "2x 2.92mm",
      mounting: "Pole Mount"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/5g-antenna-datasheet.pdf" },
      { name: "Mounting Guide", url: "/downloads/5g-antenna-mounting.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isAvailable: true,
    minOrder: 2,
    unit: "Unit"
  },
  {
    id: 4,
    name: "Solar Power Controller",
    category: "Power Solutions",
    brand: "SMA",
    sku: "SMA-SPC-48V",
    stock: 20,
    rating: 4.6,
    description: "MPPT solar charge controller for telecom sites. Supports up to 48V battery systems.",
    specifications: {
      voltage: "48V",
      maxInput: "150V",
      current: "60A",
      efficiency: "98%",
      display: "LCD",
      protection: "IP65"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/solar-controller-datasheet.pdf" },
      { name: "User Manual", url: "/downloads/solar-controller-manual.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    isAvailable: true,
    minOrder: 1,
    unit: "Unit"
  },
  {
    id: 5,
    name: "CAT6 Ethernet Cable",
    category: "Cabling",
    brand: "Belden",
    sku: "BLD-CAT6-305",
    stock: 100,
    rating: 4.5,
    description: "Premium CAT6 Ethernet cable for high-speed network connectivity. 305m box.",
    specifications: {
      category: "CAT6",
      length: "305m",
      conductor: "23 AWG",
      jacket: "LSZH",
      frequency: "250MHz",
      color: "Blue"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/cat6-datasheet.pdf" },
      { name: "Installation Guide", url: "/downloads/cat6-installation.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isAvailable: true,
    minOrder: 50,
    unit: "Meters"
  },
  {
    id: 6,
    name: "Cloud Server Rack",
    category: "Network Infrastructure",
    brand: "Dell",
    sku: "DELL-CSR-42U",
    stock: 5,
    rating: 4.8,
    description: "Enterprise-grade 42U server rack with advanced cooling and cable management.",
    specifications: {
      rackUnits: 42,
      depth: "1000mm",
      cooling: "Active",
      material: "Steel",
      loadCapacity: "800kg",
      color: "Black"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/server-rack-datasheet.pdf" },
      { name: "Assembly Guide", url: "/downloads/server-rack-assembly.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    isAvailable: true,
    minOrder: 1,
    unit: "Unit"
  },
  {
    id: 7,
    name: "Cybersecurity Firewall Appliance",
    category: "Security",
    brand: "Fortinet",
    sku: "FORT-60F",
    stock: 15,
    rating: 4.7,
    description: "Next-generation firewall appliance with advanced threat protection for telecom networks.",
    specifications: {
      throughput: "10Gbps",
      connections: "5M",
      vpn: "SSL/IPSec",
      management: "Cloud/On-prem",
      interfaces: "8x 1GbE",
      power: "Redundant"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/firewall-datasheet.pdf" },
      { name: "Configuration Guide", url: "/downloads/firewall-config.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    isAvailable: true,
    minOrder: 1,
    unit: "Unit"
  },
  {
    id: 8,
    name: "IoT Gateway Device",
    category: "IoT Solutions",
    brand: "Siemens",
    sku: "SIE-IOT-GW",
    stock: 30,
    rating: 4.6,
    description: "Industrial IoT gateway for smart city and industrial applications. Supports multiple protocols.",
    specifications: {
      protocols: "MQTT, Modbus, OPC UA",
      connectivity: "4G/5G, Ethernet",
      memory: "4GB RAM, 32GB Storage",
      power: "12-48V DC",
      temperature: "-40°C to 85°C",
      certification: "CE, UL"
    },
    downloads: [
      { name: "Datasheet", url: "/downloads/iot-gateway-datasheet.pdf" },
      { name: "Developer Guide", url: "/downloads/iot-gateway-dev.pdf" }
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    categoryImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    isAvailable: true,
    minOrder: 5,
    unit: "Unit"
  }
];

// Categories with images
export const CATEGORIES = [
  {
    id: 1,
    name: "Fiber Optic",
    slug: "fiber-optic",
    icon: "📡",
    description: "High-speed fiber optic cables and accessories",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    productCount: 1
  },
  {
    id: 2,
    name: "Network Infrastructure",
    slug: "network-infrastructure",
    icon: "🏗️",
    description: "Cabinets, racks, and infrastructure equipment",
    image: "https://images.unsplash.com/photo-1581092335874-5b5e9c0c2167?w=800&q=80",
    productCount: 2
  },
  {
    id: 3,
    name: "5G Equipment",
    slug: "5g-equipment",
    icon: "📶",
    description: "5G antennas, radios, and accessories",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    productCount: 1
  },
  {
    id: 4,
    name: "Power Solutions",
    slug: "power-solutions",
    icon: "⚡",
    description: "Solar controllers, power supplies, and batteries",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    productCount: 1
  },
  {
    id: 5,
    name: "Security",
    slug: "security",
    icon: "🔒",
    description: "Firewalls, surveillance, and security systems",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    productCount: 1
  }
];