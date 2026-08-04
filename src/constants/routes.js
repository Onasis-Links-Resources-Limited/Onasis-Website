// src/constants/routes.js
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PRODUCTS: '/products',
  CONTACT: '/contact',
  NOT_FOUND: '*',
};

export const routeConfig = {
  home: {
    path: ROUTES.HOME,
    title: 'Home - Onasis Links',
    description: 'Leading telecom solutions provider in Africa'
  },
  about: {
    path: ROUTES.ABOUT,
    title: 'About Us - Onasis Links',
    description: 'Learn about our company mission and vision'
  },
  services: {
    path: ROUTES.SERVICES,
    title: 'Services - Onasis Links',
    description: 'Explore our telecommunication services'
  },
  products: {
    path: ROUTES.PRODUCTS,
    title: 'Products - Onasis Links',
    description: 'Discover our innovative telecom products'
  },
  contact: {
    path: ROUTES.CONTACT,
    title: 'Contact - Onasis Links',
    description: 'Get in touch with our team'
  }
};