/** Default portfolio entries — used until data is saved from Admin, or after reset. */

import imgGratia from '../assets/Ethiopia to the WorldNaturally Exporting.jpg.jpg';
import imgYosam from '../assets/Yosam Mechatronics Ethiopia leading Industry.jpg';
import imgAlmigan from '../assets/Connecting Global Manufacturers with High-Growth Markets.jpg.jpg';
import imgElway from '../assets/Empowering Global Education with Truth and Transparency.jpg.jpg';
import imgZigeba from '../assets/Find Your Perfect Home.jpg';
import imgMeasho from '../assets/Experiences Ethopia from the Volcanic glow of Erta Ale to the rock-hewn majesty of Lalibela.jpg.jpg';

export const DEFAULT_WEB_PROJECTS = [
  {
    id: 'web-gratia',
    name: 'Gratia Import & Export',
    url: 'https://www.exportinggratia.com/',
    description:
      'Ethiopian agricultural export — organic products, livestock, and ethical trade connecting farmers to global buyers.',
    image: imgGratia,
  },
  {
    id: 'web-yosam',
    name: 'Yosam Mechatronics',
    url: 'https://yosammecharonicstechnologysolutions.com/',
    description:
      'Industrial trading, import solutions, and expert machinery & ICT consultancy for Ethiopian enterprises.',
    image: imgYosam,
  },
  {
    id: 'web-almigan',
    name: 'Almigan Trading FZ-LLC',
    url: 'https://almigan.ae/',
    description:
      'UAE-based B2B trading — structured, compliant supply and logistics across Africa and global markets.',
    image: imgAlmigan,
  },
  {
    id: 'web-elway',
    name: 'EL WAY Consultancy',
    url: 'https://www.elwayconsultancy.com/',
    description:
      'Global education placement and academic consulting across Canada, USA, Europe, and the UK.',
    image: imgElway,
  },
  {
    id: 'web-zigeba',
    name: 'Zigeba House Agent',
    url: 'https://zigebahouseagent.com/',
    description:
      'Rent and sale — houses, apartments, villas, guest houses, and land in prime Addis Ababa locations.',
    image: imgZigeba,
  },
  {
    id: 'web-measho',
    name: 'Measho Tours',
    url: 'https://meashotours.com/',
    description:
      'Experience Ethiopia — from Erta Ale to Lalibela — curated tours and unforgettable travel.',
    image: imgMeasho,
  },
];

export const DEFAULT_ERP_PROJECTS = [
  {
    id: 'erp-addis-ketema',
    name: 'Addis Ketema Building',
    description: 'ERP for building administration — tenants, billing, and facility operations.',
    features: ['Tenant management', 'Payments & billing', 'Maintenance tracking', 'Reporting'],
    icon: '🏢',
  },
  {
    id: 'erp-pangea',
    name: 'Pangea School',
    description: 'School management system — academics, communication, and finance in one place.',
    features: ['Student information', 'Grades & attendance', 'Parent portal', 'Fee collection'],
    icon: '🏫',
  },
];

/** Fallback hero images when saved localStorage rows have empty `image` (same order as defaults). */
export const DEFAULT_WEB_IMAGES_BY_ID = Object.fromEntries(
  DEFAULT_WEB_PROJECTS.map((w) => [w.id, w.image])
);
