export const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    qualifications: 'MBBS, MD (Cardiology), FACC',
    experience: 15,
    fee: 1500,
    bio: 'Renowned cardiologist with 15 years of experience in interventional cardiology and heart failure management. Formerly at AIIMS Delhi.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM'
    ]
  },
  {
    id: 2,
    name: 'Dr. Rahul Verma',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    qualifications: 'MBBS, DM (Neurology)',
    experience: 12,
    fee: 1800,
    bio: 'Specializes in epilepsy, stroke management, and movement disorders. Published 30+ research papers internationally.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    slots: [
      '08:30 AM',
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '11:00 AM',
      '11:30 AM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM'
    ]
  },
  {
    id: 3,
    name: 'Dr. Anita Patel',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    qualifications: 'MBBS, MD (Pediatrics)',
    experience: 10,
    fee: 1000,
    bio: 'Compassionate pediatrician specializing in child development, immunization, and adolescent health.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    slots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '05:00 PM',
      '05:30 PM',
      '06:00 PM',
      '06:30 PM'
    ]
  },
  {
    id: 4,
    name: 'Dr. Sanjay Kumar',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    qualifications: 'MBBS, MS (Orthopedics), FRCS',
    experience: 18,
    fee: 2000,
    bio: 'Highly skilled orthopedic surgeon specializing in joint replacement and sports injuries. Over 3000 successful surgeries.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: [
      '08:00 AM',
      '08:30 AM',
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM'
    ]
  },
  {
    id: 5,
    name: 'Dr. Meera Nair',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400',
    qualifications: 'MBBS, DVD, FRCP',
    experience: 8,
    fee: 1200,
    bio: 'Leading dermatologist specializing in cosmetic dermatology, skin cancer detection, and chronic skin conditions.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    slots: [
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '04:00 PM',
      '04:30 PM',
      '05:00 PM',
      '05:30 PM'
    ]
  },
  {
    id: 6,
    name: 'Dr. Arjun Singh',
    specialty: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    qualifications: 'MBBS, MD (Psychiatry), MRCPsych',
    experience: 14,
    fee: 2200,
    bio: 'Specializes in mood disorders, anxiety, and cognitive behavioral therapy. Advocates for mental health awareness.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    slots: [
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM'
    ]
  },
  {
    id: 7,
    name: 'Dr. Kavita Reddy',
    specialty: 'Gynecologist',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400',
    qualifications: 'MBBS, MS (Obs & Gyn), FICOG',
    experience: 20,
    fee: 1600,
    bio: 'Experienced gynecologist with expertise in high-risk pregnancy, laparoscopic surgery, and reproductive endocrinology.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM'
    ]
  },
  {
    id: 8,
    name: 'Dr. Vikram Joshi',
    specialty: 'Ophthalmologist',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
    qualifications: 'MBBS, MS (Ophthalmology), FICO',
    experience: 11,
    fee: 1100,
    bio: 'Skilled eye specialist with expertise in LASIK surgery, cataract treatment, and glaucoma management.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    slots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '11:00 AM',
      '11:30 AM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '05:00 PM'
    ]
  }
];

export const specialties = [
  'All Specialties',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Dermatologist',
  'Psychiatrist',
  'Gynecologist',
  'Ophthalmologist'
];
