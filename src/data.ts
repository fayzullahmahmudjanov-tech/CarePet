export type PageId =
  | 'home'
  | 'services'
  | 'veterinarians'
  | 'pricing'
  | 'appointment'
  | 'my-pets'
  | 'emergency';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
  image: string;
}

export interface Vet {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  education: string;
  languages: string[];
  available: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  image: string;
  vaccinations: { name: string; date: string; status: 'up-to-date' | 'due' | 'overdue' }[];
  lastVisit: string;
  notes: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'vaccination' | 'general';
}

export interface User {
  name: string;
  email: string;
}

export const services: Service[] = [
  {
    id: 'wellness',
    name: 'Wellness Exams',
    description: 'Comprehensive health check-ups to keep your pet thriving at every life stage.',
    icon: 'Stethoscope',
    price: 'From $65',
    features: ['Full physical examination', 'Vaccination review', 'Nutritional counselling', 'Behaviour assessment'],
    image: 'https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'surgery',
    name: 'Surgical Procedures',
    description: 'State-of-the-art surgical suites for routine and complex procedures with expert aftercare.',
    icon: 'Scissors',
    price: 'From $350',
    features: ['Spay & neuter', 'Soft-tissue surgery', 'Orthopaedic procedures', 'Post-op monitoring'],
    image: 'https://images.pexels.com/photos/6816862/pexels-photo-6816862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'dental',
    name: 'Dental Care',
    description: 'Professional cleanings, extractions, and oral health assessments for a pain-free smile.',
    icon: 'Heart',
    price: 'From $120',
    features: ['Dental scaling & polishing', 'Tooth extraction', 'Oral health assessment', 'Digital dental X-rays'],
    image: 'https://images.pexels.com/photos/6235017/pexels-photo-6235017.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics & Imaging',
    description: 'Advanced in-house lab and imaging technology for fast, accurate diagnoses.',
    icon: 'Microscope',
    price: 'From $85',
    features: ['Digital X-ray', 'Ultrasound imaging', 'Blood & urine panels', 'Same-day results'],
    image: 'https://images.pexels.com/photos/6235234/pexels-photo-6235234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'emergency',
    name: 'Emergency Care',
    description: 'Round-the-clock emergency and critical care when your pet needs us most.',
    icon: 'Siren',
    price: '24/7 Available',
    features: ['24/7 intensive care', 'Trauma treatment', 'Poison control', 'Critical monitoring'],
    image: 'https://images.pexels.com/photos/3924779/pexels-photo-3924779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'vaccination',
    name: 'Vaccinations',
    description: 'Tailored immunisation programs to protect your pet from preventable diseases.',
    icon: 'Syringe',
    price: 'From $35',
    features: ['Core vaccines', 'Lifestyle vaccines', 'Titre testing', 'Vaccination reminders'],
    image: 'https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const vets: Vet[] = [
  {
    id: 'v1',
    name: 'Dr. Sarah Mitchell',
    title: 'Senior Veterinarian',
    specialties: ['Internal Medicine', 'Cardiology'],
    experience: 12,
    rating: 4.9,
    reviews: 318,
    image: 'https://images.pexels.com/photos/29995629/pexels-photo-29995629.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Mitchell specialises in internal medicine and cardiology, with a passion for early detection and preventive care. She has published research on canine heart disease and mentors junior veterinarians.',
    education: 'DVM, University of California, Davis',
    languages: ['English', 'Spanish'],
    available: true,
  },
  {
    id: 'v2',
    name: 'Dr. James Chen',
    title: 'Surgical Specialist',
    specialties: ['Surgery', 'Orthopaedics'],
    experience: 15,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Chen is a board-certified surgeon with expertise in both soft-tissue and orthopaedic procedures. He has performed over 3,000 successful surgeries and pioneered minimally invasive techniques at CarePet.',
    education: 'DVM, Cornell University',
    languages: ['English', 'Mandarin'],
    available: true,
  },
  {
    id: 'v3',
    name: 'Dr. Emily Rodriguez',
    title: 'Dental & Preventive Care',
    specialties: ['Dentistry', 'Preventive Care'],
    experience: 8,
    rating: 4.9,
    reviews: 192,
    image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Rodriguez is passionate about oral health and its connection to overall wellbeing. She runs our dental clinic and develops preventive care plans tailored to each pet.',
    education: 'DVM, Tufts University',
    languages: ['English', 'Spanish'],
    available: false,
  },
  {
    id: 'v4',
    name: 'Dr. Michael Okafor',
    title: 'Emergency & Critical Care',
    specialties: ['Emergency', 'Critical Care'],
    experience: 10,
    rating: 4.7,
    reviews: 224,
    image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Okafor leads our 24/7 emergency department. His calm demeanour and rapid decision-making have saved countless lives. He is trained in advanced trauma and toxicology.',
    education: 'DVM, University of Pennsylvania',
    languages: ['English', 'French'],
    available: true,
  },
  {
    id: 'v5',
    name: 'Dr. Aisha Patel',
    title: 'Exotic & Avian Specialist',
    specialties: ['Exotic Pets', 'Avian Medicine'],
    experience: 9,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Patel cares for rabbits, birds, reptiles, and other exotic companions. She is one of the few avian-certified veterinarians in the region and volunteers at the local wildlife rescue.',
    education: 'DVM, University of Florida',
    languages: ['English', 'Hindi', 'Gujarati'],
    available: true,
  },
  {
    id: 'v6',
    name: 'Dr. Olivia Bennett',
    title: 'Dermatology & Allergies',
    specialties: ['Dermatology', 'Allergology'],
    experience: 7,
    rating: 4.9,
    reviews: 168,
    image: 'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Dr. Bennett helps pets suffering from chronic skin conditions and allergies. Her holistic approach combines medical treatment with dietary and environmental management.',
    education: 'DVM, Michigan State University',
    languages: ['English'],
    available: true,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Essential Care',
    price: 29,
    period: '/month',
    description: 'Perfect for healthy pets needing routine preventive care.',
    features: [
      '1 annual wellness exam',
      'Core vaccinations included',
      'Deworming & parasite control',
      '10% off all additional services',
      'Online portal access',
    ],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Complete Protection',
    price: 59,
    period: '/month',
    description: 'Comprehensive coverage for pets of all ages and breeds.',
    features: [
      '2 wellness exams per year',
      'All vaccinations included',
      'Annual dental cleaning',
      'Unlimited telehealth consultations',
      '20% off all additional services',
      'Priority appointment booking',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'elite',
    name: 'Elite Companion',
    price: 99,
    period: '/month',
    description: 'Premium care with extended benefits and emergency coverage.',
    features: [
      'Unlimited wellness exams',
      'All vaccinations & boosters',
      'Bi-annual dental cleaning',
      '4 emergency visits included',
      '30% off all additional services',
      'Same-day guarantee',
      'Dedicated care coordinator',
    ],
    highlighted: false,
  },
];

export const defaultPets: Pet[] = [
  {
    id: 'p1',
    name: 'Max',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: '4 years',
    weight: '32 kg',
    image: 'https://images.pexels.com/photos/28683176/pexels-photo-28683176.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
    vaccinations: [
      { name: 'Rabies', date: '2026-01-15', status: 'up-to-date' },
      { name: 'DHPP', date: '2026-01-15', status: 'up-to-date' },
      { name: 'Bordetella', date: '2025-06-20', status: 'due' },
    ],
    lastVisit: '2026-08-12',
    notes: 'Healthy and active. Mild seasonal allergies managed with antihistamines.',
  },
  {
    id: 'p2',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '3 years',
    weight: '4.5 kg',
    image: 'https://images.pexels.com/photos/24843368/pexels-photo-24843368.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
    vaccinations: [
      { name: 'Rabies', date: '2025-03-10', status: 'overdue' },
      { name: 'FVRCP', date: '2026-02-01', status: 'up-to-date' },
      { name: 'FeLV', date: '2026-02-01', status: 'up-to-date' },
    ],
    lastVisit: '2026-06-05',
    notes: 'Indoor cat. Due for annual rabies booster. Weight is ideal.',
  },
];

export const initialNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Appointment Confirmed',
    message: 'Your wellness exam for Max is confirmed for Sep 25, 2:00 PM with Dr. Sarah Mitchell.',
    time: '2 hours ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 'n2',
    title: 'Vaccination Reminder',
    message: 'Whiskers is overdue for the Rabies booster. Schedule an appointment soon.',
    time: '1 day ago',
    read: false,
    type: 'vaccination',
  },
  {
    id: 'n3',
    title: 'Welcome to CarePet',
    message: 'Your account is set up. Add your pets to get personalized care recommendations.',
    time: '3 days ago',
    read: true,
    type: 'general',
  },
];

export const petImageOptions = [
  { label: 'Dog', value: 'https://images.pexels.com/photos/28683176/pexels-photo-28683176.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'French Bulldog', value: 'https://images.pexels.com/photos/14234151/pexels-photo-14234151.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'Brown Dog', value: 'https://images.pexels.com/photos/34658892/pexels-photo-34658892.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'Cat', value: 'https://images.pexels.com/photos/24843368/pexels-photo-24843368.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'Tabby Cat', value: 'https://images.pexels.com/photos/20548749/pexels-photo-20548749.png?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'Rabbit', value: 'https://images.pexels.com/photos/19904640/pexels-photo-19904640.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  { label: 'Parrot', value: 'https://images.pexels.com/photos/36947831/pexels-photo-36947831.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Jennifer Adams',
    pet: 'Owner of Buddy & Luna',
    avatar: 'https://images.pexels.com/photos/29995629/pexels-photo-29995629.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    quote: 'CarePet has been a lifesaver for my two rescues. The team is incredibly compassionate and the online booking makes everything so easy.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Thompson',
    pet: 'Owner of Rocky',
    avatar: 'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    quote: 'When Rocky had an emergency at 2 AM, Dr. Okafor was there within minutes. The level of care and follow-up was outstanding.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Sharma',
    pet: 'Owner of Mochi',
    avatar: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&h=100&w=100',
    quote: 'Dr. Patel is the only vet in town who truly understands my rabbit. The exotic pet expertise here is unmatched.',
    rating: 5,
  },
];
