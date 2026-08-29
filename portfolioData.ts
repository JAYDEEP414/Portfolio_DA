import { 
  PersonalInfo, 
  SkillCategory, 
  ExperienceItem, 
  ProjectItem, 
  CertificationItem, 
  EducationItem,
  CameraWaypoint
} from '../types';

export const personalInfo: PersonalInfo = {
  name: "Jaydeep Sutar",
  title: "Data Analyst | Power BI Developer | SQL & Python Specialist",
  subtitles: [
    "Data Analyst",
    "Power BI Developer",
    "SQL & Python Specialist",
    "Business Intelligence Architect"
  ],
  location: "Pune, MH 411046, India",
  phone: "+91 9022869184",
  email: "jaydeepsutar0001@gmail.com",
  github: "https://github.com/JAYDEEP414",
  linkedin: "https://www.linkedin.com/in/jaydeep-sutar-74143b371",
  summary: "Results-driven Data Analyst with hands-on experience transforming raw datasets of 50,000+ records into revenue-driving insights. Proficient in Python (Pandas, NumPy, Seaborn), SQL, Excel, and Power BI. Delivered dashboards that improved decision-making efficiency by ~35% and surfaced insights with projected 18% profitability gains. BSc Computer Science graduate seeking to bring analytical rigour and business impact to a high-growth IT organisation.",
  quickStats: [
    { label: "Data Records Processed", value: "50K+", suffix: "rows", detail: "Cleaned, transformed & analyzed" },
    { label: "Decision Efficiency", value: "35%", suffix: "boost", detail: "Via interactive Power BI models" },
    { label: "Projected Profit Impact", value: "18%", suffix: "gain", detail: "Identified via discount & CLV analysis" },
    { label: "Return Rate Reduction", value: "12%", suffix: "cut", detail: "E-commerce loss mitigation" }
  ]
};

export const cameraWaypoints: CameraWaypoint[] = [
  {
    id: 'hero',
    position: [0, 0, 7.5],
    target: [0, 0, 0],
    fov: 50,
    particleForm: 'constellation',
    accentColor: '#38bdf8', // Electric Cyan
    ambientLight: 0.8
  },
  {
    id: 'about',
    position: [2.8, 0.6, 6.2],
    target: [0.6, 0.1, 0],
    fov: 48,
    particleForm: 'prism',
    accentColor: '#818cf8', // Indigo
    ambientLight: 0.9
  },
  {
    id: 'skills',
    position: [-3.2, 1.4, 5.8],
    target: [-0.6, 0.4, 0],
    fov: 45,
    particleForm: 'barchart',
    accentColor: '#06b6d4', // Cyan
    ambientLight: 1.0
  },
  {
    id: 'experience',
    position: [3.4, -0.8, 6.4],
    target: [0.8, -0.3, 0],
    fov: 46,
    particleForm: 'timeline',
    accentColor: '#a855f7', // Purple
    ambientLight: 0.85
  },
  {
    id: 'projects',
    position: [0, 1.8, 6.8],
    target: [0, 0.4, 0],
    fov: 52,
    particleForm: 'grid',
    accentColor: '#38bdf8', // Sky Blue
    ambientLight: 0.95
  },
  {
    id: 'education',
    position: [-2.4, -1.2, 5.9],
    target: [-0.3, -0.4, 0],
    fov: 47,
    particleForm: 'orbit',
    accentColor: '#34d399', // Emerald Teal
    ambientLight: 0.9
  },
  {
    id: 'contact',
    position: [0, 0, 5.4],
    target: [0, 0, 0],
    fov: 45,
    particleForm: 'vortex',
    accentColor: '#38bdf8', // Electric Blue Callback
    ambientLight: 1.1
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Analytics & BI",
    description: "Enterprise dashboard engineering, DAX modeling, KPI architectures and executive data storytelling.",
    iconName: "BarChart3",
    skills: [
      { name: "Power BI (Dashboards & KPIs)", level: 95, category: "analytics", description: "Interactive report design, DAX calculated measures, relationship data modeling and drill-through matrices.", tag: "Core" },
      { name: "Advanced Excel", level: 90, category: "analytics", description: "XLOOKUP, Nested Formulas, Pivot Tables, Power Query ETL, Scenario Manager & What-If analysis.", tag: "Expert" },
      { name: "Exploratory Data Analysis (EDA)", level: 92, category: "analytics", description: "Univariate/Bivariate analysis, IQR outlier detection, skewness handling and trend decomposition.", tag: "Specialist" },
      { name: "Data Storytelling & Reporting", level: 88, category: "analytics", description: "Executive summary decks, stakeholder data briefings and decision-support visual narratives.", tag: "Leadership" }
    ]
  },
  {
    title: "Programming & Querying",
    description: "High-speed data manipulation, statistical scripting, relational database queries and ETL pipelines.",
    iconName: "Code2",
    skills: [
      { name: "Python (Pandas, NumPy)", level: 90, category: "programming", description: "Vectorized transformations, missing value imputation, multi-index aggregations and dataset slicing.", tag: "High Demand" },
      { name: "SQL (MySQL / Relational)", level: 94, category: "programming", description: "Complex multi-table JOINs, subqueries, window functions (ROW_NUMBER, RANK), GROUP BY aggregations.", tag: "Advanced" },
      { name: "Data Visualization (Seaborn & Matplotlib)", level: 88, category: "programming", description: "Custom heatmaps, violin plots, distribution curves, regression scatterplots and pairplots.", tag: "Visuals" },
      { name: "ETL & Scripting Workflows", level: 85, category: "programming", description: "Automated CSV parsing, schema validation, data pipeline standardisation and cleaning scripts.", tag: "Automation" }
    ]
  },
  {
    title: "Core Competencies",
    description: "Business metric frameworks, financial metric synthesis, statistical rigor and cross-team execution.",
    iconName: "Cpu",
    skills: [
      { name: "Data Cleaning & Preprocessing", level: 96, category: "competencies", description: "Standardizing heterogeneous datasets, deduplication, datetime formatting and validation rules.", tag: "Pristine Data" },
      { name: "KPI Development (AOV, CLV, ROI)", level: 92, category: "competencies", description: "Formulating Average Order Value, Customer Lifetime Value, Churn & Return Loss metrics.", tag: "Business ROI" },
      { name: "Statistical Hypothesis & Testing", level: 86, category: "competencies", description: "Variance analysis, correlation matrices, lifespan distribution analysis across cohort groups.", tag: "Analytical Rigour" },
      { name: "Cross-functional Reporting", level: 90, category: "competencies", description: "Translating technical statistical outputs into clear action plans for operations & product teams.", tag: "Collaboration" }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "decodelabs",
    role: "Data Analyst Intern",
    company: "DecodeLabs",
    period: "May 2026 – Jun 2026",
    programType: "Virtual Internship Program",
    location: "Remote / Hybrid",
    summary: "Spearheaded end-to-end e-commerce data pipeline optimization and executive intelligence dashboard creation for a 50,000+ transaction dataset.",
    achievements: [
      "Cleaned and standardized raw e-commerce dataset in Python & Pandas (resolving missing values, duplicate entries, ISO date parsing, and TotalPrice validation).",
      "Conducted extensive EDA using Pandas, Matplotlib, and Seaborn — utilized IQR outlier pruning, correlation heatmaps, and price-elasticity distribution curves.",
      "Engineered optimized MySQL queries using JOINs, window functions, and GROUP BY rollups to deliver revenue breakdowns across payment channels and product tiers.",
      "Constructed interactive Power BI executive dashboard featuring dynamic KPI cards (Total Revenue, Total Orders, AOV, Total Quantity Sold) and sliceable regional visuals."
    ],
    skillsUsed: ["Power BI", "Python (Pandas/NumPy)", "MySQL", "Seaborn", "EDA", "Data Modeling"],
    kpis: [
      { label: "Dataset Scale", value: "50,000+", change: "Transactions" },
      { label: "KPI Accuracy", value: "99.8%", change: "+Zero Missing" },
      { label: "Query Efficiency", value: "2.4x", change: "Indexed SQL" }
    ],
    sqlSnippet: `SELECT 
    p.category_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.quantity * o.unit_price) AS gross_revenue,
    ROUND(AVG(o.quantity * o.unit_price), 2) AS avg_order_value,
    SUM(CASE WHEN o.status = 'Returned' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS return_rate_pct
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.order_date >= '2026-01-01'
GROUP BY p.category_name
ORDER BY gross_revenue DESC;`
  },
  {
    id: "sanity-tech",
    role: "Data Analyst Intern",
    company: "Sanity Technologies Pvt Ltd",
    period: "Aug 2024 – Jan 2025",
    programType: "Corporate Internship",
    location: "Pune, India",
    summary: "Built foundational business intelligence pipelines and streamlined ad-hoc reporting cadence to support weekly managerial decision sprints.",
    achievements: [
      "Standardized data extraction, cleaning, and transformation workflows across multiple CSV/Excel data feeds, cutting pipeline execution errors.",
      "Authored and delivered 10+ custom ad-hoc SQL reports weekly for department heads to monitor operational bottlenecks and regional throughput.",
      "Developed foundational BI dashboards in Power BI and Advanced Excel, consolidating siloed departmental spreadsheets into single-source-of-truth visuals.",
      "Documented data dictionary and standard operating procedures (SOPs) for incoming business metrics and tracking definitions."
    ],
    skillsUsed: ["Power BI", "SQL", "Advanced Excel", "Data Pipeline SOPs", "Ad-hoc Reporting"],
    kpis: [
      { label: "Weekly SQL Reports", value: "10+", change: "Delivered on-time" },
      { label: "Pipeline Errors", value: "-40%", change: "Standardized ETL" },
      { label: "Team Adoption", value: "100%", change: "Single Source of Truth" }
    ]
  },
  {
    id: "medtoureasy",
    role: "Data Analytics Trainee Intern",
    company: "MedTourEasy",
    period: "Jan 2025 – Feb 2025",
    programType: "Healthcare Analytics Trainee",
    location: "Pune, India",
    summary: "Conducted cohort lifespan variance analysis and sanitized high-volume clinical records with statistical validation.",
    achievements: [
      "Cleaned and standardized 10,000+ medical and demographic records, lifting overall data consistency and analytical accuracy by ~20%.",
      "Conducted rigorous Exploratory Data Analysis (EDA) on human lifespan datasets across handedness and demographic cohorts.",
      "Uncovered a statistically significant ~9% average lifespan variance between study cohorts, compiled and delivered into a formal stakeholder research report.",
      "Built automated data quality validation checks in Python to detect corrupt patient timestamps and impossible clinical readings."
    ],
    skillsUsed: ["Python", "Pandas", "Healthcare Analytics", "Statistical Testing", "Data Quality Assurance"],
    kpis: [
      { label: "Clinical Records Cleaned", value: "10,000+", change: "+20% Accuracy" },
      { label: "Lifespan Variance Surfaced", value: "~9%", change: "Validated Insight" },
      { label: "Automated Checks", value: "15+", change: "Data Quality Gates" }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "flipkart-sales",
    title: "Flipkart Sales Data Analysis & Profit Optimization",
    category: "E-Commerce Analytics & BI",
    subtitle: "50,000+ Records Analyzed | Python, Pandas, Seaborn & Power BI",
    description: "Comprehensive end-to-end sales intelligence investigation analyzing 50,000+ consumer transactions. Uncovered core drivers of product returns, calculated customer lifetime value segments, and identified critical discounting inflection points that projected an 18% net profitability increase while cutting return-related logistics losses by 12%.",
    metrics: [
      { label: "Analyzed Dataset", value: "50,000+", context: "Multi-category sales records" },
      { label: "Projected Profit Gain", value: "+18%", context: "Via discount calibration" },
      { label: "Return Loss Cut", value: "-12%", context: "Identified high-return skus" },
      { label: "Custom Charts & KPIs", value: "25+", context: "AOV, CLV, Margin, Churn" }
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "DAX", "Advanced SQL"],
    highlights: [
      "Engineered automated Python ETL pipeline parsing 50k+ raw transactions, resolving date anomalies and invalid currency characters.",
      "Formulated 25+ dynamic KPIs including Average Order Value (AOV), Customer Lifetime Value (CLV), Return Rate by Category, and Net Contribution Margin.",
      "Identified that discounts over 35% on electronics yielded negative unit economics and triggered 3x higher return rates.",
      "Created an interactive Power BI dashboard with dynamic parameter what-if sliders for managerial pricing strategies."
    ],
    demoVisual: {
      type: "bar",
      title: "Category Revenue vs Return Loss Mitigation",
      dataPoints: [
        { label: "Electronics", value: 1420, secondary: 110 },
        { label: "Fashion", value: 980, secondary: 240 },
        { label: "Home & Kitchen", value: 760, secondary: 65 },
        { label: "Beauty & Personal", value: 520, secondary: 30 },
        { label: "Books & Media", value: 310, secondary: 12 }
      ]
    },
    githubUrl: "https://github.com/JAYDEEP414",
    linkUrl: "#"
  },
  {
    id: "heart-disease",
    title: "Heart Disease Risk Diagnostic Dashboard",
    category: "Healthcare Predictive Analytics",
    subtitle: "5,000+ Patient Records | Power BI, Python, Pandas, Seaborn",
    description: "Clinical decision support analytics platform examining 5,000+ multi-parameter patient records. Evaluated non-linear risk correlations among cholesterol levels, resting BP, thalium stress results, and age cohorts to assist diagnostic triage and boost clinical triage efficiency by ~35%.",
    metrics: [
      { label: "Patient Cohort", value: "5,000+", context: "Clinical diagnostic records" },
      { label: "Decision Efficiency", value: "+35%", context: "Faster triage diagnosis" },
      { label: "High Risk Indicators", value: "4 Key", context: "Chest pain, ST depression, Chol" },
      { label: "Accuracy of Model", value: "93.4%", context: "Validated statistical fit" }
    ],
    tools: ["Power BI", "Python", "Pandas", "Seaborn", "Statistical EDA", "Healthcare BI", "Excel"],
    highlights: [
      "Conducted multivariate correlation matrix in Seaborn identifying chest pain type 4 and ST segment depression as primary risk markers.",
      "Synthesized interactive Power BI dashboard featuring patient risk tier segmentation (Low, Moderate, Critical) for hospital intake.",
      "Implemented dynamic DAX measures calculating patient age group risk ratios and resting blood pressure thresholds.",
      "Streamlined doctor consultation triage by visually highlighting anomalies before physical examination."
    ],
    demoVisual: {
      type: "kpi-grid",
      title: "Clinical Risk Stratification",
      dataPoints: [
        { label: "Critical Risk Cohort", value: 34 },
        { label: "Moderate Risk", value: 42 },
        { label: "Low Risk Normal", value: 24 }
      ]
    },
    githubUrl: "https://github.com/JAYDEEP414",
    linkUrl: "#"
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: "pbi-cert",
    name: "Microsoft Certified Power BI Data Analyst",
    issuer: "Microsoft / Industry Credential",
    year: "2025",
    verificationId: "PL-300 Certified",
    skillsGained: ["DAX Measure Architecture", "Power Query ETL", "Data Modeling", "Dashboard Governance"],
    icon: "Award"
  },
  {
    id: "da-cert",
    name: "Certified Data Analyst Specialist",
    issuer: "Professional Analytics Institute",
    year: "2025",
    verificationId: "DA-PRO-8891",
    skillsGained: ["SQL Query Optimization", "Python Data Wrangling", "EDA & Statistical Modeling", "Business Intelligence"],
    icon: "CheckCircle2"
  },
  {
    id: "decode-cert",
    name: "DecodeLabs Virtual Internship Graduate",
    issuer: "DecodeLabs Data Analytics Program",
    year: "2026",
    verificationId: "DCL-VIP-2026-904",
    skillsGained: ["E-Commerce Data Strategy", "MySQL Pipeline Construction", "Power BI Executive Portals"],
    icon: "FileCheck"
  }
];

export const educationData: EducationItem = {
  degree: "Bachelor of Science in Computer Science (BSc CS)",
  institution: "Savitribai Phule Pune University (SPPU)",
  year: "Graduation: 2025",
  grade: "First Class with Distinction",
  coursework: [
    "Data Analysis & Processing",
    "Business Intelligence (Power BI)",
    "Database Management Systems (RDBMS & SQL)",
    "Statistical Methods & Probability",
    "Data Structures & Python Scripting",
    "Software Engineering & System Design"
  ]
};
