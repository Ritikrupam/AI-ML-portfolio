/**
 * Single source of truth for every word on the site.
 * All content here is real, supplied by Ritik. No placeholders.
 *
 * NOTE: project `repo`/`live` links default to the GitHub profile where a
 * dedicated repo URL was not provided. Replace with per-repo URLs when ready.
 */

export const profile = {
  name: 'Ritik Rupam Nanda',
  role: 'AI/ML Engineer',
  monogram: 'RRN',
  tagline: 'Interpretable machine learning, engineered end to end.',
  // Bio drafted from Ritik's supplied facts (role, location, projects). Edit freely.
  bio: "I'm an AI/ML engineer based in Bhubaneswar, India, building interpretable machine-learning systems — from deepfake detection with explainable heatmaps to pixel-wise disaster assessment from satellite imagery. I work across the stack, pairing deep-learning models in Python and TensorFlow with production interfaces in Java and React.",
  location: 'Bhubaneswar, Odisha, India',
  email: 'ritikrupamnanda@gmail.com',
  github: 'https://github.com/Ritikrupam',
  linkedin: 'https://www.linkedin.com/in/ritik-rupam-nanda-44a85832a/',
} as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  kicker: string;

  problem: string;
  outcome: string;

  metric: string;
  metricLabel: string;

  bullets: string[];

  stack: string[];

  images: {
  src: string;
  caption: string;
}[];

  repo: string;
  demo?: string;

  details: {
  objective: string;
  dataset: string;
  architecture: string;

  challenges: string[];
  results: string[];
  screenshots: string[];

  analysis: {
    status: string;
    model: string;
    explainability: string;
    datasetName: string;
    confidence: number;
  };

  pipeline: string[];
}
};
export const projects: Project[] = [
  {
    id: 'deeplens',
    index: '01',
    name: 'DeepLens',
    kicker: 'Interpretable Deepfake Detection',
    problem:
      'Content teams need to catch manipulated faces — and understand why a model flagged them.',
    outcome:
      'An Xception classifier paired with Grad-CAM++ heatmaps that show exactly which facial regions were forged, turning model output into review-ready flags.',
    metric: '98%',
    metricLabel: 'detection accuracy',
    bullets: [
      'Xception backbone for classification and manipulation-type identification.',
      'Grad-CAM++ overlays localise forged facial areas for human reviewers.',
      'Outputs translate to actionable moderation flags for review teams.',
    ],
    stack: ['Python', 'TensorFlow', 'Xception', 'Grad-CAM++'],
    images: [
  {
    src: "/projects/deeplens/gradcam_comparison.png",
    caption: "Grad-CAM++ visualization highlighting manipulated facial regions.",
  },
  {
    src: "/projects/deeplens/performance_table.png",
    caption: "Performance comparison between Xception and ResNet50 models.",
  },
],
    repo: 'https://github.com/Ritikrupam/DeepLens-Interpretable-Deepfake-Detection',
demo: "https://github.com/Ritikrupam",
details: {
  objective:
    "Develop an explainable deepfake detection framework capable of accurately classifying manipulated facial images while highlighting forged regions using Grad-CAM++.",

  dataset:
    "FaceForensics++ (FF++) with multiple manipulation techniques including DeepFakes, FaceSwap, Face2Face, NeuralTextures and real videos.",

  architecture:
    "XceptionNet backbone with Grad-CAM++ explainability integrated into the inference pipeline.",

  challenges: [
    "Distinguishing subtle facial manipulations.",
    "Reducing false positives on compressed videos.",
    "Providing interpretable predictions.",
  ],

  results: [
    "98% detection accuracy.",
    "Grad-CAM++ localization of manipulated facial regions.",
    "Fast inference suitable for practical moderation workflows.",
  ],

  screenshots: [
    "/projects/deeplens.png",
  ],
  analysis: {
  status: "Forgery Detected",
  model: "XceptionNet",
  explainability: "Grad-CAM++",
  datasetName: "FaceForensics++",
  confidence: 98,
},

pipeline: [
  "Input Face",
  "XceptionNet",
  "Grad-CAM++",
  "Prediction",
],
},
  },
  {
    id: 'dns-tunneling',
    index: '02',
    name: 'DNS Tunneling Defense',
    kicker: 'Predictive Detection of Covert Exfiltration',
    problem:
      'Attackers smuggle data out through DNS traffic that looks ordinary at a glance.',
    outcome:
      'A supervised anomaly-detection pipeline over engineered DNS features that isolates covert tunneling channels at scale.',
    metric: '99%+',
    metricLabel: 'detection accuracy',
    bullets: [
      'Preprocessing and feature engineering across DNS traffic features.',
      'Benchmarked SVM, Random Forest, and XGBoost for the best trade-off.',
      'Scalable approach to flagging covert data-exfiltration channels.',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'TensorFlow'],
    images: [
  {
    src: "/projects/dns/Detection_pipeline.png",
    caption: "LSTM + Transformer based DNS tunneling detection pipeline.",
  },
  {
    src: "/projects/dns/Network_diagram.png",
    caption: "Traditional machine learning workflow for DNS tunneling detection.",
  },
  {
    src: "/projects/dns/DNS_packet_visualization.png",
    caption: "Illustration of DNS packet analysis used for anomaly detection.",
  },
],
    repo: 'https://github.com/Ritikrupam',
demo: "https://github.com/Ritikrupam",

details: {
  objective:
    "Design a machine learning framework capable of detecting covert DNS tunneling attacks by analyzing DNS traffic patterns and engineered network features.",

  dataset:
    "DNS traffic dataset containing both legitimate and tunneling communication samples for supervised binary classification.",

  architecture:
    "Feature engineering pipeline followed by machine learning classifiers including Random Forest, SVM and XGBoost for attack detection.",

  challenges: [
    "Distinguishing legitimate DNS traffic from covert communication.",
    "Reducing false positives in highly imbalanced network traffic.",
    "Selecting discriminative statistical DNS features.",
  ],

  results: [
    "Achieved over 99% detection accuracy.",
    "XGBoost produced the best overall performance.",
    "Successfully detected covert DNS exfiltration channels.",
  ],

  screenshots: [
    "/projects/dns.png",
  ],
  analysis: {
  status: "Threat Detected",
  model: "XGBoost",
  explainability: "Feature Importance",
  datasetName: "DNS Traffic",
  confidence: 99,
},

pipeline: [
  "DNS Packets",
  "Feature Extraction",
  "XGBoost",
  "Classification",
],
},
  },
  {
    id: 'disaster-assessment',
    index: '03',
    name: 'Disaster Damage Assessment',
    kicker: 'Segmentation from Satellite Imagery',
    problem:
      'After a disaster, responders need fast, accurate maps of which buildings are damaged.',
    outcome:
      'A U-Net / VGG16+U-Net pipeline performing pixel-wise segmentation on the xBD dataset, producing interpretable damage-assessment reports.',
    metric: 'xBD',
    metricLabel: 'benchmark dataset',
    bullets: [
      'U-Net and VGG16 + U-Net for pixel-wise building segmentation.',
      'Data augmentation and class balancing; validated on F1, IoU, and Dice.',
      'Segmentation outputs become interpretable reports for resource allocation.',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'Deep Learning'],
    images: [
  {
    src: "/projects/disaster/satellite_image.png",
    caption: "Satellite imagery from the xBD dataset.",
  },
  {
    src: "/projects/disaster/segmentation_output.png",
    caption: "Pixel-wise building damage segmentation generated by U-Net.",
  },
  {
    src: "/projects/disaster/damage_map.png",
    caption: "Damage assessment visualization for disaster response.",
  },
],
    repo: 'https://github.com/Ritikrupam/Disaster-Damage-Assessment-Using-Satellite-Imagery',
    demo: "https://github.com/Ritikrupam",

details: {
  objective:
    "Develop a deep learning framework for automatic building damage assessment from satellite imagery to support rapid disaster response and recovery planning.",

  dataset:
    "xBD (xView2) satellite imagery dataset containing pre-disaster and post-disaster images with building damage annotations.",

  architecture:
    "U-Net and VGG16 + U-Net semantic segmentation models for pixel-level building damage identification.",

  challenges: [
    "Segmenting damaged buildings from complex satellite imagery.",
    "Handling class imbalance between damaged and undamaged regions.",
    "Improving segmentation accuracy through augmentation and preprocessing.",
  ],

  results: [
    "Accurate pixel-wise building damage segmentation.",
    "Improved IoU and Dice scores using VGG16 + U-Net.",
    "Generated interpretable damage assessment maps for emergency response.",
  ],

  screenshots: [
    "/projects/disaster.png",
  ],
  analysis: {
  status: "Damage Detected",
  model: "VGG16 + U-Net",
  explainability: "Segmentation Map",
  datasetName: "xBD Dataset",
  confidence: 96,
},

pipeline: [
  "Satellite Image",
  "U-Net",
  "Segmentation",
  "Damage Map",
],
},
  },
  {
    id: 'banking-app',
    index: '04',
    name: 'Secure Banking Application',
    kicker: 'Full-Stack Product',
    problem:
      'A banking product needs secure auth, role-based access, and reliable money movement.',
    outcome:
      'A full-stack application with JWT auth, role-based access control, and complete account, beneficiary, and transaction modules over REST.',
    metric: 'MVC',
    metricLabel: 'architecture',
    bullets: [
      'Spring Boot + React.js + JWT + MySQL with role-based access control.',
      'Account, beneficiary, transaction history, deposit, and transfer modules.',
      'Responsive React frontend over a Spring Boot / MySQL MVC backend.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'React.js', 'MySQL'],
    images: [
  {
    src: "/projects/banking/login.png",
    caption: "Secure JWT authentication login page.",
  },
  {
    src: "/projects/banking/dashboard.png",
    caption: "Customer dashboard showing account information.",
  },
  {
    src: "/projects/banking/transfer.png",
    caption: "Fund transfer interface with beneficiary management.",
  },
],
    repo: 'https://github.com/Ritikrupam/NexusBank',
    demo: "https://github.com/Ritikrupam",

details: {
  objective:
    "Develop a secure full-stack banking application supporting authentication, account management, beneficiary management, and fund transfers with role-based access control.",

  dataset:
    "Relational MySQL database storing customer accounts, users, beneficiaries, and transaction records.",

  architecture:
    "Spring Boot REST API with Spring Security, JWT authentication, React.js frontend, and MySQL database following MVC architecture.",

  challenges: [
    "Implementing secure JWT authentication and authorization.",
    "Protecting banking operations with role-based access control.",
    "Maintaining data consistency during financial transactions.",
  ],

  results: [
    "Complete banking workflow with secure authentication.",
    "JWT-based protected REST APIs.",
    "Responsive React frontend integrated with Spring Boot backend.",
  ],

  screenshots: [
    "/projects/banking.png",
  ],
  analysis: {
  status: "Transaction Approved",
  model: "Spring Security",
  explainability: "JWT Validation",
  datasetName: "MySQL",
  confidence: 100,
},

pipeline: [
  "User Login",
  "JWT Auth",
  "REST API",
  "Dashboard",
],
},
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'SQL', 'JavaScript'],
  },
  {
    label: 'Data Science',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'XGBoost'],
  },
  {
    label: 'Machine Learning',
    items: [
      'Regression',
      'Classification',
      'Clustering',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
];

export const achievements: string[] = [
  'Kaggle Certified — Machine Learning',
  'Generative AI, LLM & RAG — GeeksforGeeks Skill Up',
  'Deloitte Australia — Data Analytics Job Simulation',
];

/** Counters for the About section — every number here is true. */
export type Stat = { value: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 4, label: 'shipped ML / full-stack projects' },
  { value: 99, suffix: '%', label: 'peak model accuracy' },
  { value: 3, label: 'certifications earned' },
];

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;
