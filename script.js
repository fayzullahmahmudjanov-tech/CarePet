/* ============================================
   CarePet — Veterinary Clinic Website
   Vanilla JavaScript Application Logic
   ============================================ */

(function () {
  'use strict';

  /* ============ DATA ============ */

  var services = [
    { id: 'wellness', name: 'Wellness Exams', description: 'Comprehensive health check-ups to keep your pet thriving at every life stage.', icon: 'stethoscope', price: 'From $65', features: ['Full physical examination', 'Vaccination review', 'Nutritional counselling', 'Behaviour assessment'], image: 'https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { id: 'surgery', name: 'Surgical Procedures', description: 'State-of-the-art surgical suites for routine and complex procedures with expert aftercare.', icon: 'scissors', price: 'From $350', features: ['Spay & neuter', 'Soft-tissue surgery', 'Orthopaedic procedures', 'Post-op monitoring'], image: 'https://images.pexels.com/photos/6816862/pexels-photo-6816862.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { id: 'dental', name: 'Dental Care', description: 'Professional cleanings, extractions, and oral health assessments for a pain-free smile.', icon: 'heart', price: 'From $120', features: ['Dental scaling & polishing', 'Tooth extraction', 'Oral health assessment', 'Digital dental X-rays'], image: 'https://images.pexels.com/photos/6235017/pexels-photo-6235017.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { id: 'diagnostics', name: 'Diagnostics & Imaging', description: 'Advanced in-house lab and imaging technology for fast, accurate diagnoses.', icon: 'microscope', price: 'From $85', features: ['Digital X-ray', 'Ultrasound imaging', 'Blood & urine panels', 'Same-day results'], image: 'https://images.pexels.com/photos/6235234/pexels-photo-6235234.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { id: 'emergency', name: 'Emergency Care', description: 'Round-the-clock emergency and critical care when your pet needs us most.', icon: 'siren', price: '24/7 Available', features: ['24/7 intensive care', 'Trauma treatment', 'Poison control', 'Critical monitoring'], image: 'https://images.pexels.com/photos/3924779/pexels-photo-3924779.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { id: 'vaccination', name: 'Vaccinations', description: 'Tailored immunisation programs to protect your pet from preventable diseases.', icon: 'syringe', price: 'From $35', features: ['Core vaccines', 'Lifestyle vaccines', 'Titre testing', 'Vaccination reminders'], image: 'https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  ];

  var serviceIcons = {
    stethoscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>',
    scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
    microscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>',
    siren: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18v-6a5 5 0 0 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"/><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>',
    syringe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>',
  };

  var vets = [
    { id: 'v1', name: 'Dr. Sarah Mitchell', title: 'Senior Veterinarian', specialties: ['Internal Medicine', 'Cardiology'], experience: 12, rating: 4.9, reviews: 318, image: 'https://images.pexels.com/photos/29995629/pexels-photo-29995629.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Mitchell specialises in internal medicine and cardiology, with a passion for early detection and preventive care. She has published research on canine heart disease and mentors junior veterinarians.', education: 'DVM, University of California, Davis', languages: ['English', 'Spanish'], available: true },
    { id: 'v2', name: 'Dr. James Chen', title: 'Surgical Specialist', specialties: ['Surgery', 'Orthopaedics'], experience: 15, rating: 4.8, reviews: 256, image: 'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Chen is a board-certified surgeon with expertise in both soft-tissue and orthopaedic procedures. He has performed over 3,000 successful surgeries and pioneered minimally invasive techniques at CarePet.', education: 'DVM, Cornell University', languages: ['English', 'Mandarin'], available: true },
    { id: 'v3', name: 'Dr. Emily Rodriguez', title: 'Dental & Preventive Care', specialties: ['Dentistry', 'Preventive Care'], experience: 8, rating: 4.9, reviews: 192, image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Rodriguez is passionate about oral health and its connection to overall wellbeing. She runs our dental clinic and develops preventive care plans tailored to each pet.', education: 'DVM, Tufts University', languages: ['English', 'Spanish'], available: false },
    { id: 'v4', name: 'Dr. Michael Okafor', title: 'Emergency & Critical Care', specialties: ['Emergency', 'Critical Care'], experience: 10, rating: 4.7, reviews: 224, image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Okafor leads our 24/7 emergency department. His calm demeanour and rapid decision-making have saved countless lives. He is trained in advanced trauma and toxicology.', education: 'DVM, University of Pennsylvania', languages: ['English', 'French'], available: true },
    { id: 'v5', name: 'Dr. Aisha Patel', title: 'Exotic & Avian Specialist', specialties: ['Exotic Pets', 'Avian Medicine'], experience: 9, rating: 4.8, reviews: 145, image: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Patel cares for rabbits, birds, reptiles, and other exotic companions. She is one of the few avian-certified veterinarians in the region and volunteers at the local wildlife rescue.', education: 'DVM, University of Florida', languages: ['English', 'Hindi', 'Gujarati'], available: true },
    { id: 'v6', name: 'Dr. Olivia Bennett', title: 'Dermatology & Allergies', specialties: ['Dermatology', 'Allergology'], experience: 7, rating: 4.9, reviews: 168, image: 'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Dr. Bennett helps pets suffering from chronic skin conditions and allergies. Her holistic approach combines medical treatment with dietary and environmental management.', education: 'DVM, Michigan State University', languages: ['English'], available: true },
  ];

  var allSpecialties = ['Internal Medicine', 'Cardiology', 'Surgery', 'Orthopaedics', 'Dentistry', 'Preventive Care', 'Emergency', 'Critical Care', 'Exotic Pets', 'Avian Medicine', 'Dermatology', 'Allergology'];

  var pricingPlans = [
    { id: 'basic', name: 'Essential Care', price: 29, period: '/month', description: 'Perfect for healthy pets needing routine preventive care.', features: ['1 annual wellness exam', 'Core vaccinations included', 'Deworming & parasite control', '10% off all additional services', 'Online portal access'], highlighted: false },
    { id: 'premium', name: 'Complete Protection', price: 59, period: '/month', description: 'Comprehensive coverage for pets of all ages and breeds.', features: ['2 wellness exams per year', 'All vaccinations included', 'Annual dental cleaning', 'Unlimited telehealth consultations', '20% off all additional services', 'Priority appointment booking'], highlighted: true, badge: 'Most Popular' },
    { id: 'elite', name: 'Elite Companion', price: 99, period: '/month', description: 'Premium care with extended benefits and emergency coverage.', features: ['Unlimited wellness exams', 'All vaccinations & boosters', 'Bi-annual dental cleaning', '4 emergency visits included', '30% off all additional services', 'Same-day guarantee', 'Dedicated care coordinator'], highlighted: false },
  ];

  var defaultPets = [
    { id: 'p1', name: 'Max', species: 'Dog', breed: 'Labrador Retriever', age: '4 years', weight: '32 kg', image: 'https://images.pexels.com/photos/28683176/pexels-photo-28683176.jpeg?auto=compress&cs=tinysrgb&h=300&w=300', vaccinations: [{ name: 'Rabies', date: '2026-01-15', status: 'up-to-date' }, { name: 'DHPP', date: '2026-01-15', status: 'up-to-date' }, { name: 'Bordetella', date: '2025-06-20', status: 'due' }], lastVisit: '2026-08-12', notes: 'Healthy and active. Mild seasonal allergies managed with antihistamines.' },
    { id: 'p2', name: 'Whiskers', species: 'Cat', breed: 'Domestic Shorthair', age: '3 years', weight: '4.5 kg', image: 'https://images.pexels.com/photos/24843368/pexels-photo-24843368.jpeg?auto=compress&cs=tinysrgb&h=300&w=300', vaccinations: [{ name: 'Rabies', date: '2025-03-10', status: 'overdue' }, { name: 'FVRCP', date: '2026-02-01', status: 'up-to-date' }, { name: 'FeLV', date: '2026-02-01', status: 'up-to-date' }], lastVisit: '2026-06-05', notes: 'Indoor cat. Due for annual rabies booster. Weight is ideal.' },
  ];

  var petImageOptions = [
    { label: 'Dog', value: 'https://images.pexels.com/photos/28683176/pexels-photo-28683176.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'French Bulldog', value: 'https://images.pexels.com/photos/14234151/pexels-photo-14234151.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'Brown Dog', value: 'https://images.pexels.com/photos/34658892/pexels-photo-34658892.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'Cat', value: 'https://images.pexels.com/photos/24843368/pexels-photo-24843368.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'Tabby Cat', value: 'https://images.pexels.com/photos/20548749/pexels-photo-20548749.png?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'Rabbit', value: 'https://images.pexels.com/photos/19904640/pexels-photo-19904640.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
    { label: 'Parrot', value: 'https://images.pexels.com/photos/36947831/pexels-photo-36947831.jpeg?auto=compress&cs=tinysrgb&h=300&w=300' },
  ];

  var initialNotifications = [
    { id: 'n1', title: 'Appointment Confirmed', message: 'Your wellness exam for Max is confirmed for Sep 25, 2:00 PM with Dr. Sarah Mitchell.', time: '2 hours ago', read: false, type: 'appointment' },
    { id: 'n2', title: 'Vaccination Reminder', message: 'Whiskers is overdue for the Rabies booster. Schedule an appointment soon.', time: '1 day ago', read: false, type: 'vaccination' },
    { id: 'n3', title: 'Welcome to CarePet', message: 'Your account is set up. Add your pets to get personalized care recommendations.', time: '3 days ago', read: true, type: 'general' },
  ];

  var emergencyTypes = [
    { value: 'trauma', label: 'Trauma / Injury', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.1 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.1a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    { value: 'poisoning', label: 'Suspected Poisoning', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.1 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.1a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>' },
    { value: 'breathing', label: 'Breathing Difficulty', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
    { value: 'seizure', label: 'Seizure / Collapse', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
    { value: 'bleeding', label: 'Severe Bleeding', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="M12 22a8 8 0 0 1-8-8c0-3.5 3-6 8-10 5 4 8 6.5 8 10a8 8 0 0 1-8 8z"/></svg>' },
    { value: 'other', label: 'Other Emergency', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>' },
  ];

  var timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  /* ============ STATE ============ */

  var state = {
    currentPage: 'home',
    darkMode: false,
    user: null,
    pets: defaultPets.slice(),
    notifications: initialNotifications.slice(),
    vetFilter: { search: '', specialty: 'All', availability: 'all' },
    appointmentStep: 1,
    appointmentData: { petName: '', petType: '', service: '', vet: '', date: '', time: '', ownerName: '', email: '', phone: '', notes: '' },
    selectedPetPhoto: petImageOptions[0].value,
    selectedEmergencyType: '',
  };

  /* ============ HELPERS ============ */

  function $(id) { return document.getElementById(id); }
  function $$(selector) { return document.querySelectorAll(selector); }

  function showToast(message, type) {
    type = type || 'success';
    var container = $('toastContainer');
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    var icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };
    toast.innerHTML = icons[type] + '<span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3500);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function setFormError(id, message) {
    var el = $('error-' + id);
    if (el) el.textContent = message || '';
    var input = $(id);
    if (input) {
      if (message) input.classList.add('error');
      else input.classList.remove('error');
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ============ NAVIGATION ============ */

  window.navigateTo = function (page) {
    state.currentPage = page;
    $$('.page').forEach(function (p) { p.classList.remove('page-active'); });
    var target = $(page);
    if (target) target.classList.add('page-active');
    $$('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-page') === page);
    });
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'my-pets') updateMyPetsPage();
  };

  /* ============ DARK MODE ============ */

  function initDarkMode() {
    var saved = localStorage.getItem('carepet-dark');
    if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      state.darkMode = true;
      document.body.classList.add('dark');
    }
    updateDarkModeIcons();
  }

  function updateDarkModeIcons() {
    var moon = $('darkModeToggle').querySelector('.icon-moon');
    var sun = $('darkModeToggle').querySelector('.icon-sun');
    if (moon && sun) {
      moon.style.display = state.darkMode ? 'none' : '';
      sun.style.display = state.darkMode ? '' : 'none';
    }
  }

  $('darkModeToggle').addEventListener('click', function () {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark', state.darkMode);
    localStorage.setItem('carepet-dark', String(state.darkMode));
    updateDarkModeIcons();
  });

  /* ============ MOBILE MENU ============ */

  function closeMobileMenu() {
    $('navMenu').classList.remove('open');
    $('mobileMenuToggle').classList.remove('open');
  }

  $('mobileMenuToggle').addEventListener('click', function () {
    $('navMenu').classList.toggle('open');
    this.classList.toggle('open');
  });

  /* ============ NOTIFICATIONS ============ */

  function renderNotifications() {
    var list = $('notificationList');
    var unread = state.notifications.filter(function (n) { return !n.read; }).length;
    $('notificationBadge').textContent = unread;
    $('notificationBadge').classList.toggle('hidden', unread === 0);

    var iconSvg = {
      appointment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>',
      vaccination: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/></svg>',
      general: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };

    list.innerHTML = state.notifications.map(function (n) {
      return '<li><button class="notification-item' + (n.read ? '' : ' unread') + '" onclick="markNotificationRead(\'' + n.id + '\')">' +
        '<div class="notification-icon ' + n.type + '">' + iconSvg[n.type] + '</div>' +
        '<div class="notification-content"><p>' + escapeHtml(n.title) + '</p><p>' + escapeHtml(n.message) + '</p><p>' + escapeHtml(n.time) + '</p></div>' +
        (n.read ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0;margin-top:6px;opacity:0.4;"><polyline points="20 6 9 17 4 12"/></svg>' : '<span class="notification-dot"></span>') +
        '</button></li>';
    }).join('');
  }

  window.markNotificationRead = function (id) {
    var n = state.notifications.find(function (x) { return x.id === id; });
    if (n) n.read = true;
    renderNotifications();
  };

  window.markAllNotificationsRead = function () {
    state.notifications.forEach(function (n) { n.read = true; });
    renderNotifications();
  };

  $('notificationBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    $('notificationDropdown').classList.toggle('show');
    $('userDropdown').classList.remove('show');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.notification-wrapper')) $('notificationDropdown').classList.remove('show');
    if (!e.target.closest('.user-menu')) $('userDropdown').classList.remove('show');
  });

  /* ============ AUTH ============ */

  window.openAuthModal = function (mode) {
    var modal = $('authModal');
    modal.classList.remove('hidden');
    switchAuthMode(mode);
  };

  window.closeAuthModal = function () {
    $('authModal').classList.add('hidden');
    $('authForm').reset();
    ['auth-name', 'auth-email', 'auth-password'].forEach(function (id) { setFormError(id, ''); });
  };

  window.switchAuthMode = function (mode) {
    var isRegister = mode === 'register';
    $('authModalTitle').textContent = isRegister ? 'Create Account' : 'Welcome Back';
    $('authModalSubtitle').textContent = isRegister ? 'Join CarePet to start caring for your pets' : 'Sign in to manage your pets and appointments';
    $('authNameField').classList.toggle('hidden', !isRegister);
    var submitBtn = $('authForm').querySelector('.btn-primary');
    submitBtn.textContent = isRegister ? 'Create Account' : 'Sign In';
    var switchText = document.querySelector('.auth-switch');
    switchText.innerHTML = isRegister
      ? 'Already have an account? <button onclick="switchAuthMode(\'login\')">Sign in</button>'
      : 'Don\'t have an account? <button onclick="switchAuthMode(\'register\')">Sign up</button>';
    $('authForm').dataset.mode = mode;
  };

  window.togglePassword = function (inputId, btn) {
    var input = $(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  window.submitAuth = function () {
    var mode = $('authForm').dataset.mode || 'login';
    var name = $('auth-name').value.trim();
    var email = $('auth-email').value.trim();
    var password = $('auth-password').value;

    var hasError = false;
    if (mode === 'register' && name.length < 2) { setFormError('auth-name', 'Please enter your full name'); hasError = true; }
    else setFormError('auth-name', '');

    if (!isValidEmail(email)) { setFormError('auth-email', 'Please enter a valid email address'); hasError = true; }
    else setFormError('auth-email', '');

    if (password.length < 6) { setFormError('auth-password', 'Password must be at least 6 characters'); hasError = true; }
    else setFormError('auth-password', '');

    if (hasError) return;

    var displayName = mode === 'register' ? name : email.split('@')[0];
    state.user = { name: displayName, email: email };
    updateUserUI();
    closeAuthModal();
    showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success');
  };

  window.logout = function () {
    state.user = null;
    updateUserUI();
    $('userDropdown').classList.remove('show');
    showToast('You have been logged out.', 'info');
    if (state.currentPage === 'my-pets') updateMyPetsPage();
  };

  function updateUserUI() {
    if (state.user) {
      $('signinBtn').classList.add('hidden');
      $('userMenu').classList.remove('hidden');
      $('userAvatar').textContent = state.user.name.charAt(0).toUpperCase();
      $('userNameDisplay').textContent = state.user.name.split(' ')[0];
      $('userDropdownName').textContent = state.user.name;
      $('userDropdownEmail').textContent = state.user.email;
      var ctaSignup = $('ctaSignup');
      if (ctaSignup) ctaSignup.classList.add('hidden');
    } else {
      $('signinBtn').classList.remove('hidden');
      $('userMenu').classList.add('hidden');
      var ctaSignup2 = $('ctaSignup');
      if (ctaSignup2) ctaSignup2.classList.remove('hidden');
    }
  }

  $('userAvatarBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    $('userDropdown').classList.toggle('show');
    $('notificationDropdown').classList.remove('show');
  });

  /* ============ HOME SERVICES ============ */

  function renderHomeServices() {
    $('homeServicesGrid').innerHTML = services.map(function (s) {
      return '<article class="service-card card-hover" onclick="navigateTo(\'services\')">' +
        '<div class="service-card-icon">' + serviceIcons[s.icon] + '</div>' +
        '<h3>' + s.name + '</h3>' +
        '<p>' + s.description + '</p>' +
        '<div class="service-card-footer"><span class="service-card-price">' + s.price + '</span>' +
        '<span class="service-card-link">Learn more →</span></div></article>';
    }).join('');
  }

  /* ============ SERVICES PAGE ============ */

  function renderServicesDetailed() {
    $('servicesDetailedGrid').innerHTML = services.map(function (s, idx) {
      var reversed = idx % 2 === 1 ? ' reverse' : '';
      return '<article class="service-detailed' + reversed + ' card-hover">' +
        '<div class="service-detailed-img"><img src="' + s.image + '" alt="' + s.name + '"><div class="service-detailed-icon">' + serviceIcons[s.icon] + '</div></div>' +
        '<div class="service-detailed-body">' +
        '<div class="service-detailed-header"><h2>' + s.name + '</h2><span class="badge badge-brand">' + s.price + '</span></div>' +
        '<p>' + s.description + '</p>' +
        '<ul class="service-detailed-features">' + s.features.map(function (f) {
          return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' + f + '</li>';
        }).join('') + '</ul>' +
        '<button class="service-detailed-cta" onclick="navigateTo(\'appointment\')">Book this service →</button>' +
        '</div></article>';
    }).join('');
  }

  /* ============ VETERINARIANS PAGE ============ */

  function renderSpecialtyChips() {
    var chips = ['All'].concat(allSpecialties);
    $('specialtyChips').innerHTML = chips.map(function (spec) {
      return '<button class="filter-chip' + (state.vetFilter.specialty === spec ? ' active' : '') + '" onclick="filterBySpecialty(\'' + spec.replace(/'/g, "\\'") + '\')">' + spec + '</button>';
    }).join('');
  }

  window.filterBySpecialty = function (spec) {
    state.vetFilter.specialty = spec;
    renderSpecialtyChips();
    renderVets();
  };

  window.filterAvailability = function (avail) {
    state.vetFilter.availability = avail;
    $$('.filter-toggle').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-availability') === avail);
    });
    renderVets();
  };

  $('vetSearch').addEventListener('input', function () {
    state.vetFilter.search = this.value;
    renderVets();
  });

  function renderVets() {
    var filtered = vets.filter(function (v) {
      var matchesSearch = v.name.toLowerCase().indexOf(state.vetFilter.search.toLowerCase()) >= 0 ||
        v.specialties.some(function (s) { return s.toLowerCase().indexOf(state.vetFilter.search.toLowerCase()) >= 0; });
      var matchesSpecialty = state.vetFilter.specialty === 'All' || v.specialties.indexOf(state.vetFilter.specialty) >= 0;
      var matchesAvail = state.vetFilter.availability === 'all' || v.available;
      return matchesSearch && matchesSpecialty && matchesAvail;
    });

    $('vetResultsCount').innerHTML = 'Showing <strong>' + filtered.length + '</strong> veterinarian' + (filtered.length !== 1 ? 's' : '');

    if (filtered.length === 0) {
      $('vetsGrid').innerHTML = '<div class="no-results"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>No veterinarians found</p><p style="font-size:0.875rem;color:var(--text-secondary);">Try adjusting your filters or search terms.</p></div>';
      return;
    }

    $('vetsGrid').innerHTML = filtered.map(function (v) {
      return '<article class="vet-card card-hover">' +
        '<div class="vet-card-img-wrap"><img src="' + v.image + '" alt="' + v.name + '">' +
        '<div class="vet-availability">' + (v.available
          ? '<span class="badge badge-success"><span style="width:6px;height:6px;border-radius:999px;background:#fff;display:inline-block;"></span> Available</span>'
          : '<span class="badge" style="background:var(--ink-500);color:#fff;"><span style="width:6px;height:6px;border-radius:999px;background:#fff;display:inline-block;"></span> On Leave</span>') + '</div></div>' +
        '<h3>' + v.name + '</h3>' +
        '<p class="vet-card-title">' + v.title + '</p>' +
        '<div class="vet-card-rating"><span class="star">★</span><span>' + v.rating + '</span><span>(' + v.reviews + ' reviews)</span></div>' +
        '<div class="vet-card-specialties">' + v.specialties.map(function (s) { return '<span class="badge badge-brand">' + s + '</span>'; }).join('') + '</div>' +
        '<p class="vet-card-experience">' + v.experience + ' years of experience</p>' +
        '<div class="vet-card-actions">' +
        '<button class="btn btn-secondary" onclick="openVetModal(\'' + v.id + '\')">View Profile</button>' +
        '<button class="btn btn-primary" onclick="bookVet(\'' + v.id + '\')" ' + (v.available ? '' : 'disabled') + '>Book</button>' +
        '</div></article>';
    }).join('');
  }

  window.openVetModal = function (vetId) {
    var v = vets.find(function (x) { return x.id === vetId; });
    if (!v) return;
    $('vetModalContent').innerHTML =
      '<button class="modal-close" onclick="closeVetModal()" aria-label="Close profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
      '<div class="vet-modal-header"><img src="' + v.image + '" alt="' + v.name + '" class="vet-modal-avatar"></div>' +
      '<div class="vet-modal-body">' +
      '<div class="vet-modal-header-row"><div><h2 class="vet-modal-name">' + v.name + '</h2><p class="vet-modal-title">' + v.title + '</p></div>' +
      '<div class="vet-modal-rating"><span class="star">★</span><span>' + v.rating + '</span><span>(' + v.reviews + ')</span></div></div>' +
      '<div style="margin-top:12px;">' + (v.available
        ? '<span class="badge badge-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><polyline points="20 6 9 17 4 12"/></svg> Available for booking</span>'
        : '<span class="badge" style="background:var(--ink-100);color:var(--ink-600);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Currently on leave</span>') + '</div>' +
      '<p class="vet-modal-bio">' + v.bio + '</p>' +
      '<div class="vet-modal-info-grid">' +
      '<div class="vet-modal-info-item"><h4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> Education</h4><p>' + v.education + '</p></div>' +
      '<div class="vet-modal-info-item"><h4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1"/></svg> Experience</h4><p>' + v.experience + ' years</p></div>' +
      '<div class="vet-modal-info-item vet-modal-info-full"><h4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Languages</h4><div class="vet-modal-langs">' + v.languages.map(function (l) { return '<span class="badge">' + l + '</span>'; }).join('') + '</div></div>' +
      '</div>' +
      '<div class="vet-modal-specialties"><h3>Specialties</h3><div class="badges">' + v.specialties.map(function (s) { return '<span class="badge badge-brand">' + s + '</span>'; }).join('') + '</div></div>' +
      '<button class="btn btn-primary" onclick="bookVet(\'' + v.id + '\')" ' + (v.available ? '' : 'disabled') + '>Book Appointment with ' + v.name + '</button>' +
      '</div>';
    $('vetModal').classList.remove('hidden');
  };

  window.closeVetModal = function () { $('vetModal').classList.add('hidden'); };

  window.bookVet = function (vetId) {
    var v = vets.find(function (x) { return x.id === vetId; });
    closeVetModal();
    if (v) showToast('Starting booking with ' + v.name, 'info');
    navigateTo('appointment');
  };

  /* ============ PRICING PAGE ============ */

  function renderPricing() {
    $('pricingGrid').innerHTML = pricingPlans.map(function (plan) {
      return '<div class="pricing-card' + (plan.highlighted ? ' highlighted' : '') + '">' +
        (plan.badge ? '<div class="pricing-badge"><svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ' + plan.badge + '</div>' : '') +
        '<h3>' + plan.name + '</h3>' +
        '<p class="pricing-desc">' + plan.description + '</p>' +
        '<div class="pricing-price"><span class="pricing-amount">$' + plan.price + '</span><span class="pricing-period">' + plan.period + '</span></div>' +
        '<ul class="pricing-features">' + plan.features.map(function (f) {
          return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' + f + '</li>';
        }).join('') + '</ul>' +
        '<button class="btn ' + (plan.highlighted ? 'btn-white' : 'btn-primary') + '" onclick="choosePlan(\'' + plan.name + '\')">Choose ' + plan.name + '</button>' +
        '</div>';
    }).join('');
  }

  window.choosePlan = function (planName) {
    showToast(planName + ' plan selected! Sign in to complete your subscription.', 'success');
    navigateTo('appointment');
  };

  /* ============ APPOINTMENT PAGE ============ */

  function renderAppointmentVets() {
    var select = $('appt-vet');
    var current = select.value;
    select.innerHTML = '<option value="">Any available vet</option>' + vets.filter(function (v) { return v.available; }).map(function (v) {
      return '<option value="' + v.id + '">' + v.name + ' — ' + v.title + '</option>';
    }).join('');
    select.value = current;
  }

  function renderExistingPetsPicker() {
    var html = state.pets.map(function (pet) {
      return '<button type="button" class="existing-pet-pick" onclick="pickExistingPet(this,\'' + pet.name + '\',\'' + pet.species + '\')">' +
        '<img src="' + pet.image + '" alt="' + pet.name + '">' +
        '<div><p>' + pet.name + '</p><p>' + pet.species + '</p></div></button>';
    }).join('');
    $('existingPetsPicker').innerHTML = html;
  }

  window.pickExistingPet = function (btn, name, species) {
    $$('.existing-pet-pick').forEach(function (el) { el.classList.remove('selected'); });
    btn.classList.add('selected');
    $('appt-pet-name').value = name;
    $('appt-pet-type').value = species;
    setFormError('appt-pet-name', '');
    setFormError('appt-pet-type', '');
  };

  function renderServicePicker() {
    $('servicePickerGrid').innerHTML = services.map(function (s) {
      return '<button type="button" class="service-pick" onclick="pickService(this,\'' + s.id + '\')">' +
        '<div class="service-pick-icon">' + serviceIcons[s.icon] + '</div>' +
        '<div><h4>' + s.name + '</h4><p>' + s.price + '</p></div></button>';
    }).join('');
  }

  window.pickService = function (btn, serviceId) {
    $$('.service-pick').forEach(function (el) { el.classList.remove('selected'); });
    btn.classList.add('selected');
    state.appointmentData.service = serviceId;
    setFormError('appt-service', '');
  };

  function renderTimeSlots() {
    $('timeSlots').innerHTML = timeSlots.map(function (slot) {
      return '<button type="button" class="time-slot" onclick="pickTimeSlot(this,\'' + slot + '\')">' + slot + '</button>';
    }).join('');
  }

  window.pickTimeSlot = function (btn, slot) {
    $$('.time-slot').forEach(function (el) { el.classList.remove('selected'); });
    btn.classList.add('selected');
    state.appointmentData.time = slot;
    setFormError('appt-time', '');
  };

  function updateAppointmentProgress() {
    $$('.progress-step').forEach(function (step) {
      var stepNum = parseInt(step.getAttribute('data-step'));
      step.classList.toggle('active', stepNum === state.appointmentStep);
      step.classList.toggle('completed', stepNum < state.appointmentStep);
    });
    $$('.progress-line').forEach(function (line, idx) {
      line.classList.toggle('completed', idx < state.appointmentStep - 1);
    });
    $$('.form-step').forEach(function (step) {
      step.classList.toggle('active', parseInt(step.getAttribute('data-step')) === state.appointmentStep);
    });
  }

  function validateAppointmentStep(step) {
    var d = state.appointmentData;
    var ok = true;

    if (step === 1) {
      d.petName = $('appt-pet-name').value.trim();
      d.petType = $('appt-pet-type').value;
      if (!d.petName) { setFormError('appt-pet-name', 'Pet name is required'); ok = false; } else setFormError('appt-pet-name', '');
      if (!d.petType) { setFormError('appt-pet-type', 'Pet type is required'); ok = false; } else setFormError('appt-pet-type', '');
    }
    if (step === 2) {
      if (!d.service) { setFormError('appt-service', 'Please select a service'); ok = false; } else setFormError('appt-service', '');
    }
    if (step === 3) {
      d.vet = $('appt-vet').value;
      d.date = $('appt-date').value;
      if (!d.vet) { setFormError('appt-vet', 'Please select a veterinarian'); ok = false; } else setFormError('appt-vet', '');
      if (!d.date) { setFormError('appt-date', 'Please pick a date'); ok = false; } else setFormError('appt-date', '');
      if (!d.time) { setFormError('appt-time', 'Please pick a time'); ok = false; } else setFormError('appt-time', '');
    }
    if (step === 4) {
      d.ownerName = $('appt-owner-name').value.trim();
      d.email = $('appt-email').value.trim();
      d.phone = $('appt-phone').value.trim();
      d.notes = $('appt-notes').value.trim();
      if (!d.ownerName) { setFormError('appt-owner-name', 'Your name is required'); ok = false; } else setFormError('appt-owner-name', '');
      if (!isValidEmail(d.email)) { setFormError('appt-email', 'Valid email is required'); ok = false; } else setFormError('appt-email', '');
      if (!d.phone) { setFormError('appt-phone', 'Phone number is required'); ok = false; } else setFormError('appt-phone', '');
    }
    return ok;
  }

  window.appointmentNext = function () {
    if (!validateAppointmentStep(state.appointmentStep)) return;
    if (state.appointmentStep < 4) {
      state.appointmentStep++;
      updateAppointmentProgress();
    }
  };

  window.appointmentBack = function () {
    if (state.appointmentStep > 1) {
      state.appointmentStep--;
      updateAppointmentProgress();
    }
  };

  window.submitAppointment = function () {
    if (!validateAppointmentStep(4)) return;
    var d = state.appointmentData;
    var vet = vets.find(function (v) { return v.id === d.vet; });
    var service = services.find(function (s) { return s.id === d.service; });

    $('confirmEmail').textContent = d.email;
    $('confirmationDetails').innerHTML = '<h3>Appointment Details</h3><dl class="confirmation-detail-grid">' +
      '<div class="confirmation-detail-item"><dt>Pet</dt><dd>' + escapeHtml(d.petName) + ' (' + escapeHtml(d.petType) + ')</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Service</dt><dd>' + (service ? service.name : '') + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Veterinarian</dt><dd>' + (vet ? vet.name : 'Any available vet') + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Date & Time</dt><dd>' + d.date + ' at ' + d.time + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Owner</dt><dd>' + escapeHtml(d.ownerName) + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Phone</dt><dd>' + escapeHtml(d.phone) + '</dd></div>' +
      '</dl>';
    $('appointmentForm').classList.add('hidden');
    $('appointmentProgress').classList.add('hidden');
    $('appointmentConfirmation').classList.remove('hidden');
    showToast('Appointment booked successfully!', 'success');
  };

  window.resetAppointment = function () {
    state.appointmentStep = 1;
    state.appointmentData = { petName: '', petType: '', service: '', vet: '', date: '', time: '', ownerName: '', email: '', phone: '', notes: '' };
    $('appointmentForm').reset();
    $$('.existing-pet-pick').forEach(function (el) { el.classList.remove('selected'); });
    $$('.service-pick').forEach(function (el) { el.classList.remove('selected'); });
    $$('.time-slot').forEach(function (el) { el.classList.remove('selected'); });
    $('appointmentForm').classList.remove('hidden');
    $('appointmentProgress').classList.remove('hidden');
    $('appointmentConfirmation').classList.add('hidden');
    updateAppointmentProgress();
  };

  /* ============ MY PETS PAGE ============ */

  function updateMyPetsPage() {
    if (state.user) {
      $('signinGate').classList.add('hidden');
      $('addPetBtn').classList.remove('hidden');
      $('petsGrid').classList.remove('hidden');
      renderPets();
    } else {
      $('signinGate').classList.remove('hidden');
      $('addPetBtn').classList.add('hidden');
      $('petsGrid').classList.add('hidden');
    }
  }

  function renderPets() {
    if (state.pets.length === 0) {
      $('petsGrid').innerHTML = '<div class="no-results"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.76 5.46 16.67A3.5 3.5 0 0 1 9 10Z"/></svg><p>No pets yet</p><p style="font-size:0.875rem;color:var(--text-secondary);">Add your first pet to get started.</p></div>';
      return;
    }

    $('petsGrid').innerHTML = state.pets.map(function (pet) {
      var upToDate = pet.vaccinations.filter(function (v) { return v.status === 'up-to-date'; }).length;
      return '<article class="pet-card card-hover">' +
        '<div class="pet-card-img-wrap"><img src="' + pet.image + '" alt="' + pet.name + '"><span class="pet-card-species badge badge-white">' + pet.species + '</span></div>' +
        '<h3>' + pet.name + '</h3><p class="pet-card-breed">' + pet.breed + '</p>' +
        '<div class="pet-card-meta">' +
        '<div class="pet-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5h-3v6h3"/><path d="M15 5V2"/><path d="M3 19h18"/><path d="M9 5v6h6"/></svg><span>' + pet.age + '</span></div>' +
        '<div class="pet-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="M12 22a8 8 0 0 1-8-8c0-3.5 3-6 8-10 5 4 8 6.5 8 10a8 8 0 0 1-8 8z"/></svg><span>' + pet.weight + '</span></div>' +
        '</div>' +
        '<p class="pet-card-vaccines"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/></svg>' + upToDate + ' of ' + pet.vaccinations.length + ' vaccines up to date</p>' +
        '<div class="pet-card-actions">' +
        '<button class="btn btn-secondary" onclick="openPetModal(\'' + pet.id + '\')">View Profile</button>' +
        '<button class="pet-delete-btn" onclick="deletePet(\'' + pet.id + '\',\'' + pet.name.replace(/'/g, "\\'") + '\')" aria-label="Remove ' + pet.name + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div></article>';
    }).join('');
  }

  window.deletePet = function (id, name) {
    state.pets = state.pets.filter(function (p) { return p.id !== id; });
    renderPets();
    closePetModal();
    showToast(name + ' has been removed from your pets.', 'info');
  };

  window.openPetModal = function (petId) {
    var pet = state.pets.find(function (p) { return p.id === petId; });
    if (!pet) return;
    var vaccBadge = { 'up-to-date': 'badge-success', 'due': 'badge-warning', 'overdue': 'badge-danger' };
    var vaccLabel = { 'up-to-date': 'Up to date', 'due': 'Due soon', 'overdue': 'Overdue' };

    $('petModalContent').innerHTML =
      '<button class="modal-close" onclick="closePetModal()" aria-label="Close profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
      '<div class="pet-modal-header"><img src="' + pet.image + '" alt="' + pet.name + '"><div class="pet-modal-header-overlay"></div><div class="pet-modal-header-info"><h2>' + pet.name + '</h2><p>' + pet.breed + '</p></div></div>' +
      '<div class="pet-modal-body">' +
      '<div class="pet-modal-stats">' +
      '<div class="pet-modal-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg><p>Age</p><p>' + pet.age + '</p></div>' +
      '<div class="pet-modal-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="M12 22a8 8 0 0 1-8-8c0-3.5 3-6 8-10 5 4 8 6.5 8 10a8 8 0 0 1-8 8z"/></svg><p>Weight</p><p>' + pet.weight + '</p></div>' +
      '<div class="pet-modal-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p>Last Visit</p><p>' + pet.lastVisit + '</p></div>' +
      '</div>' +
      '<div class="pet-modal-section"><h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/></svg> Vaccination Record</h3>' +
      '<ul class="vaccination-list">' + pet.vaccinations.map(function (v) {
        return '<li class="vaccination-item"><div><p>' + v.name + '</p><p>' + v.date + '</p></div><span class="badge ' + vaccBadge[v.status] + '">' + vaccLabel[v.status] + '</span></li>';
      }).join('') + '</ul></div>' +
      '<div class="pet-modal-section"><h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1"/></svg> Health Notes</h3>' +
      '<p class="pet-modal-notes">' + escapeHtml(pet.notes) + '</p></div>' +
      '</div>';
    $('petModal').classList.remove('hidden');
  };

  window.closePetModal = function () { $('petModal').classList.add('hidden'); };

  /* ============ ADD PET MODAL ============ */

  window.openAddPetModal = function () {
    state.selectedPetPhoto = petImageOptions[0].value;
    renderPetPhotoPicker();
    $('addPetModal').classList.remove('hidden');
  };

  window.closeAddPetModal = function () {
    $('addPetModal').classList.add('hidden');
    $('addPetForm').reset();
    ['pet-form-name', 'pet-form-breed', 'pet-form-age', 'pet-form-weight'].forEach(function (id) { setFormError(id, ''); });
  };

  function renderPetPhotoPicker() {
    $('petPhotoPicker').innerHTML = petImageOptions.map(function (opt) {
      return '<button type="button" class="pet-photo-option' + (state.selectedPetPhoto === opt.value ? ' selected' : '') + '" onclick="pickPetPhoto(this,\'' + opt.value + '\')" aria-label="' + opt.label + '"><img src="' + opt.value + '" alt="' + opt.label + '"></button>';
    }).join('');
  }

  window.pickPetPhoto = function (btn, value) {
    $$('.pet-photo-option').forEach(function (el) { el.classList.remove('selected'); });
    btn.classList.add('selected');
    state.selectedPetPhoto = value;
  };

  window.submitAddPet = function () {
    var name = $('pet-form-name').value.trim();
    var species = $('pet-form-species').value;
    var breed = $('pet-form-breed').value.trim();
    var age = $('pet-form-age').value.trim();
    var weight = $('pet-form-weight').value.trim();
    var notes = $('pet-form-notes').value.trim();
    var ok = true;

    if (!name) { setFormError('pet-form-name', 'Pet name is required'); ok = false; } else setFormError('pet-form-name', '');
    if (!breed) { setFormError('pet-form-breed', 'Breed is required'); ok = false; } else setFormError('pet-form-breed', '');
    if (!age) { setFormError('pet-form-age', 'Age is required'); ok = false; } else setFormError('pet-form-age', '');
    if (!weight) { setFormError('pet-form-weight', 'Weight is required'); ok = false; } else setFormError('pet-form-weight', '');

    if (!ok) return;

    var today = new Date().toISOString().split('T')[0];
    var newPet = {
      id: 'p-' + Date.now(),
      name: name, species: species, breed: breed, age: age, weight: weight,
      image: state.selectedPetPhoto,
      vaccinations: [
        { name: 'Rabies', date: today, status: 'up-to-date' },
        { name: 'Initial Checkup', date: today, status: 'up-to-date' },
      ],
      lastVisit: today,
      notes: notes || 'New patient. Baseline health assessment recommended.',
    };

    state.pets.push(newPet);
    renderPets();
    closeAddPetModal();
    showToast(name + ' has been added to your pets!', 'success');
  };

  /* ============ EMERGENCY PAGE ============ */

  function renderEmergencyTypes() {
    $('emergencyTypesGrid').innerHTML = emergencyTypes.map(function (t) {
      return '<button type="button" class="emergency-type-pick" onclick="pickEmergencyType(this,\'' + t.value + '\')">' + t.icon + t.label + '</button>';
    }).join('');
  }

  window.pickEmergencyType = function (btn, value) {
    $$('.emergency-type-pick').forEach(function (el) { el.classList.remove('selected'); });
    btn.classList.add('selected');
    state.selectedEmergencyType = value;
    setFormError('em-type', '');
  };

  window.submitEmergency = function () {
    var ownerName = $('em-owner').value.trim();
    var phone = $('em-phone').value.trim();
    var petName = $('em-petname').value.trim();
    var petSpecies = $('em-petspecies').value.trim();
    var description = $('em-desc').value.trim();
    var address = $('em-address').value.trim();
    var ok = true;

    if (!ownerName) { setFormError('em-owner', 'Your name is required'); ok = false; } else setFormError('em-owner', '');
    if (!phone) { setFormError('em-phone', 'Phone number is required'); ok = false; } else setFormError('em-phone', '');
    if (!petName) { setFormError('em-petname', 'Pet name is required'); ok = false; } else setFormError('em-petname', '');
    if (!petSpecies) { setFormError('em-petspecies', 'Pet species is required'); ok = false; } else setFormError('em-petspecies', '');
    if (!state.selectedEmergencyType) { setFormError('em-type', 'Please select the type of emergency'); ok = false; } else setFormError('em-type', '');
    if (!description) { setFormError('em-desc', 'Please describe the situation'); ok = false; } else setFormError('em-desc', '');

    if (!ok) return;

    var typeLabel = emergencyTypes.find(function (t) { return t.value === state.selectedEmergencyType; }).label;
    $('emConfirmPhone').textContent = phone;
    var detailsHtml = '<h3>Request Summary</h3><dl class="confirmation-detail-grid">' +
      '<div class="confirmation-detail-item"><dt>Owner</dt><dd>' + escapeHtml(ownerName) + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Pet</dt><dd>' + escapeHtml(petName) + ' (' + escapeHtml(petSpecies) + ')</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Emergency Type</dt><dd>' + typeLabel + '</dd></div>' +
      '<div class="confirmation-detail-item"><dt>Phone</dt><dd>' + escapeHtml(phone) + '</dd></div>';
    if (address) detailsHtml += '<div class="confirmation-detail-item" style="grid-column:1/-1;"><dt>Address</dt><dd>' + escapeHtml(address) + '</dd></div>';
    detailsHtml += '<div class="confirmation-detail-item" style="grid-column:1/-1;"><dt>Description</dt><dd>' + escapeHtml(description) + '</dd></div></dl>';
    $('emConfirmationDetails').innerHTML = detailsHtml;

    $('emergencyForm').classList.add('hidden');
    $('emergencyConfirmation').classList.remove('hidden');
    showToast('Emergency request sent! Our team will call you shortly.', 'success');
  };

  window.resetEmergency = function () {
    state.selectedEmergencyType = '';
    $('emergencyForm').reset();
    $$('.emergency-type-pick').forEach(function (el) { el.classList.remove('selected'); });
    $('emergencyForm').classList.remove('hidden');
    $('emergencyConfirmation').classList.add('hidden');
  };

  /* ============ INIT ============ */

  function init() {
    initDarkMode();
    renderNotifications();
    renderHomeServices();
    renderServicesDetailed();
    renderSpecialtyChips();
    renderVets();
    renderPricing();
    renderAppointmentVets();
    renderExistingPetsPicker();
    renderServicePicker();
    renderTimeSlots();
    renderEmergencyTypes();
    updateAppointmentProgress();
    updateUserUI();

    var today = new Date().toISOString().split('T')[0];
    $('appt-date').setAttribute('min', today);

    // Close modals on overlay click
    $$('.modal-overlay-bg').forEach(function (bg) {
      bg.addEventListener('click', function () { this.parentNode.classList.add('hidden'); });
    });

    // Keyboard escape to close modals
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $$('.modal-overlay').forEach(function (m) { m.classList.add('hidden'); });
        $('notificationDropdown').classList.remove('show');
        $('userDropdown').classList.remove('show');
        closeMobileMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
