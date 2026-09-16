import doctorAvatar from './assets/images/doctor_avatar_1783034650660.jpg';
import { Qualification, Experience, AcademicPresentation, Publication, InterventionalSkill, FAQ } from './types';

export const DOCTOR_INFO = {
  fullName: "Dr. Merugu Sai Sashank",
  shortName: "Dr. M. Sai Sashank",
  title: "Assistant Professor, Consultant Pulmonologist & Sleep Specialist",
  degreeShort: "MBBS, M.D PULMONOLOGY",
  contact: {
    phone: "+91 99087 62453",
    email: "bittu18.merugu@gmail.com",
    address: "H No. 6-59/1, Canara nagar, Near Srikara Hospital, Peerzadiguda 500098"
  },
  timings: {
    morning: "10:00 AM to 12:00 PM",
    evening: "06:30 PM to 09:30 PM",
    days: "Monday to Saturday (Sunday Closed)"
  },
  clinicName: "Sashank’s chest and Allergy Clinic"
};

export const QUALIFICATIONS: Qualification[] = [
  {
    id: "q3",
    degree: "Fellowship (Pursuing)",
    field: "Fellowship in Diabetes Mellitus",
    institute: "Specialised Course",
    year: "Started Feb 2025",
    details: "Ongoing advanced training in comprehensive diabetes care and comorbid metabolic management."
  },
  {
    id: "q2",
    degree: "MD Pulmonology",
    field: "Doctor of Medicine (Pulmonology)",
    institute: "Maharajahs Institute of Medical Sciences",
    year: "2017 - 2020",
    details: "Advanced specialisation in pulmonary diseases, critical care, and interventional procedures."
  },
  {
    id: "q1",
    degree: "MBBS",
    field: "Bachelor of Medicine and Bachelor of Surgery",
    institute: "Basaweshwara Medical College and Research Centre",
    university: "Rajiv Gandhi University of Health Sciences",
    year: "June 2012",
    details: "Successfully completed core medical and clinical training with extensive clinical rotations."
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "e6",
    period: "2023 - 2025",
    role: "Senior Resident & Assistant Professor (Jan 2025)",
    place: "Neelima Medical College",
    details: "Conducted clinical teaching, ran medical wards, and was promoted to Assistant Professor in January 2025 in recognition of outstanding clinical academic leadership."
  },
  {
    id: "e5",
    period: "Oct 2022 - Present",
    role: "Freelance Consultant Pulmonologist",
    place: "Multiple Premium Hospitals",
    location: "Uppal & LB Nagar",
    details: "Providing expert pulmonology consultations and interventional services on a freelancing basis across regional specialty hospitals."
  },
  {
    id: "e7",
    period: "2023 - 2024",
    role: "Consultant Pulmonologist (Part-time)",
    place: "Bhrungi Hospitals & Pulomi Hospitals",
    details: "Conducted outpatient clinics, diagnosed chronic airway diseases, and supervised therapeutic interventions."
  },
  {
    id: "e4",
    period: "Sep 2020 - Sep 2022",
    role: "Consultant Pulmonologist",
    place: "Medisys Hospital",
    location: "Hyderabad",
    details: "Headed the Pulmonary Medicine department, providing inpatient, outpatient, and critical care pulmonary services."
  },
  {
    id: "e3",
    period: "Jun 2015 - May 2017",
    role: "Duty Medical Officer",
    place: "Kamineni General Hospital",
    details: "Supervised clinical wards, handled inpatient emergencies, and monitored intensive care recovery protocols."
  },
  {
    id: "e2",
    period: "Jan 2014 - Mar 2015",
    role: "Casualty Medical Officer",
    place: "Nikhil Hospitals",
    details: "Managed emergency rooms, acute care admissions, trauma cases, and coordinated critical patient transfers."
  },
  {
    id: "e1",
    period: "Sep 2012 - Aug 2013",
    role: "Intern",
    place: "Basaweshwara Medical College and Research Centre",
    details: "Completed mandatory rotating internship gaining foundational clinical skills across primary and specialty departments."
  }
];

export const INTERVENTIONAL_SKILLS: InterventionalSkill[] = [
  {
    id: "s1",
    name: "Bronchoscopy & BAL Aspiration",
    description: "Bronchoscope guided BAL (Bronchoalveolar Lavage) fluid aspiration (both therapeutic and diagnostic) and expert mucus plug removal.",
    category: "Diagnostic"
  },
  {
    id: "s2",
    name: "Bronchoscopy Biopsy & Brushing",
    description: "Highly precise bronchoscope guided brushing and biopsies, including intrabronchial biopsies and TBNA (Transbronchial Needle Aspiration).",
    category: "Diagnostic"
  },
  {
    id: "s3",
    name: "Pleural Tapping",
    description: "Safe and effective pleural fluid aspiration for both diagnostic assessment of pleural effusions and therapeutic relief of breathlessness.",
    category: "Therapeutic"
  },
  {
    id: "s4",
    name: "Intercostal Drainage Tube Placement",
    description: "Placement of wide bore and pigtail catheters for managing pneumothorax, empyema, and massive pleural effusions.",
    category: "Therapeutic"
  },
  {
    id: "s5",
    name: "Polysomnography & Sleep Studies",
    description: "Detailed sleep study reporting (Polysomnography) for sleep apnea diagnostics, oxygen desaturation mapping, and therapeutic titrations.",
    category: "Advanced"
  },
  {
    id: "s6",
    name: "Pulmonary Function Testing (PFT)",
    description: "Interpretation and reporting of comprehensive Spirometry, lung volumes, and diffusion capacities to assess respiratory efficiency.",
    category: "Diagnostic"
  },
  {
    id: "s7",
    name: "ICU Ventilator Management",
    description: "Expert therapeutic management of both Invasive and Non-Invasive mechanical ventilation (BIPAP and CPAP devices) in critically ill patients.",
    category: "Advanced"
  }
];

export const ACADEMICS: AcademicPresentation[] = [
  {
    id: "a1",
    type: "Poster Presentation",
    title: "Squamous Cell Carcinoma Masquerading as Lung Abscess",
    topic: "Oncology & Pulmonary",
    forum: "APSACON 2018",
    year: "2018",
    details: "Presented a unique clinical case demonstrating high-index diagnostic challenges where lung malignancies mimic cavitary infectious lesions."
  },
  {
    id: "a2",
    type: "Paper Presentation",
    title: "Diagnostic Efficacy of Invasive vs Non Invasive Methods in Hemoptysis",
    topic: "Hemoptysis",
    forum: "TSTCCON 2019",
    year: "2019",
    details: "Evaluated clinical outcomes comparing fiberoptic bronchoscopy yield with contrast chest CT in mapping airway bleeding points."
  },
  {
    id: "a3",
    type: "Paper Presentation",
    title: "Patient Outcome after COPD Exacerbation Requiring Non Invasive Ventilation during Hospitalisation",
    topic: "COPD & NIV",
    forum: "APSACON 2019",
    year: "2019",
    details: "Highlighted critical parameters and recovery trajectories in patients undergoing active BiPAP therapy during acute exacerbations."
  },
  {
    id: "a4",
    type: "Paper Presentation",
    title: "Relationship Between Outcomes of 6-Minute Walk Test and DLCO in Patients with ILD",
    topic: "ILD",
    forum: "National Conference of Pulmonology (NAPCON 2019)",
    year: "2019",
    details: "Discussed mathematical and physiological correlations between walking oxygen saturation indices and pulmonary carbon monoxide diffusion capacity."
  },
  {
    id: "a5",
    type: "Dissertation",
    title: "Patient Outcome after COPD Exacerbation Requiring Non Invasive Ventilation during Hospitalisation",
    topic: "COPD Exacerbation",
    forum: "MIMS Hospital Nellimarla (RGUHS University Board)",
    year: "2018 - 2019",
    details: "A comprehensive prospective study conducted among 50 patients with acute exacerbation of COPD (AECOPD) admitted in the Department of Pulmonary Medicine between January 2018 and July 2019."
  },
  {
    id: "a6",
    type: "Award",
    title: "Runner Up in Pulmonology Quiz (South Zone CME 2019)",
    topic: "Clinical Excellence",
    forum: "Kamineni Hospitals, Hyderabad",
    year: "2019",
    details: "Recognised for high-speed clinical diagnostic reasoning in a competitive medical knowledge forum."
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "p1",
    title: "Diagnostic Efficacy of Bronchoscopy and Computed Tomography Guided Modalities In the Management of Bronchogenic Carcinoma In A Tertiary Care Hospital",
    journal: "IOSR Journal of Dental and Medical Sciences (IOSR-JDMS)",
    year: "2020",
    details: "Evaluated and established comparative diagnostic accuracy ranges for bronchial washings, forceps biopsy, and CT-guided lung needle aspirations."
  },
  {
    id: "p2",
    title: "Role of Tocilizumab in Combating Cytokine Storm in Moderate & Severe Covid 19 Patients: Retrospective Observational Study",
    journal: "Journal of Pharmaceutical Research International (JPRI)",
    year: "2021",
    details: "Assessed IL-6 receptor antagonists efficacy, optimal timing of delivery, and mortality outcomes in severe pulmonary inflammation cohorts."
  },
  {
    id: "p3",
    title: "Role of Cytosorb in Severe Covid 19 Patients to Combat Cytokine Storm– A Case Series of 3 Patients",
    journal: "Global Journal for Research Analysis",
    year: "2021",
    details: "Reported hemodiafiltration cytokine absorption outcomes demonstrating physiological stabilization and lung recovery indicators."
  },
  {
    id: "p4",
    title: "Relationship between outcomes of 6 MINUTE WALK TEST and DLCO in Patients with ILD",
    journal: "IOSR Journal of Dental and Medical Sciences (IOSR-JDMS)",
    year: "2019",
    details: "Published statistical correlation proving distance covered and oxygen de-saturation values strongly reflect gas transfer capabilities."
  }
];

export const FAQS: FAQ[] = [
  {
    category: "Asthma Care",
    question: "What is the difference between a simple cough and asthma?",
    answer: "A simple cough usually resolves in 1-2 weeks after a viral infection. Asthma is a chronic airway inflammation causing recurring episodes of wheezing, shortness of breath, chest tightness, and a dry or wet cough, which is often worse at night or early morning and is triggered by dust, pollen, cold air, or physical exertion."
  },
  {
    category: "Sleep Apnea",
    question: "When should I consult a pulmonologist for snoring or daytime sleepiness?",
    answer: "Loud, habitual snoring accompanied by witnessed gasping or breathing pauses during sleep (apneas), waking up choking, morning headaches, and excessive daytime sleepiness are classic indicators of Obstructive Sleep Apnea (OSA). You should consult a pulmonologist immediately for a comprehensive sleep study (Polysomnography)."
  },
  {
    category: "COPD & Bronchitis",
    question: "How is COPD managed, and can the lung damage be reversed?",
    answer: "COPD (Chronic Obstructive Pulmonary Disease) is a progressive lung condition, and while damaged alveoli cannot be fully restored, modern treatments like long-acting bronchodilator inhalers, inhaled corticosteroids, pulmonary rehabilitation exercises, and quitting smoking can halt further progression, dramatically improve breathing, and enhance your daily energy levels."
  },
  {
    category: "PFT & Diagnostics",
    question: "What is a PFT (Pulmonary Function Test) and how should I prepare?",
    answer: "A PFT or Spirometry is a simple, non-invasive breathing test that measures how much air your lungs can hold and how quickly you can blow it out. It is essential for diagnosing asthma, COPD, and lung fibrosis. To prepare, avoid heavy meals and smoking for 4-6 hours, and discuss with our clinic whether to temporarily hold your morning inhalers."
  }
];
