export interface Project {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  category: 'Enterprise Automation' | 'Full-Stack Web' | 'Data & Financial' | 'Systems & Tooling';
  tags: string[];
  role: string;
  context: string;
  problem: string;
  companies?: string[];
  architecture: {
    steps: {
      phase: string;
      title: string;
      description: string;
      tech: string;
    }[];
  };
  technicalHighlights: string[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  outcome: string;
  metrics?: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  links?: {
    label: string;
    url: string;
    type: 'github' | 'live' | 'case-study';
  }[];
  featured: boolean;
}

export interface SecondaryProject {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  status: 'Production' | 'Deployed' | 'Prototyped' | 'Exploratory Concept';
  description: string;
  technologies: string[];
  highlights: string[];
  links?: {
    label: string;
    url: string;
    type: 'github' | 'live';
  }[];
}

export interface FieldNote {
  id: string;
  index: string;
  date: string;
  title: string;
  category: string;
  systemContext: string;
  problem: string;
  constraint: string;
  approach: string;
  lesson: string;
  sanitizedSnippet?: {
    language: string;
    caption: string;
    code: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  type: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Core Production' | 'Proficient' | 'Familiar';
    context?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  highlights?: string[];
}

export const PERSONAL_INFO = {
  name: "Abdul Samad Khan",
  handle: "wyacoomz",
  title: "Automation Developer & Full-Stack Engineer",
  headline: "Software for the work that doesn't happen by itself.",
  shortBio: "I build software applications and automate complex business workflows—from multi-entity document processing and enterprise ERP integrations to reliable full-stack web applications. Most of my work involves building dependable unattended systems with Power Automate, AI Builder, and Dynamics 365, alongside applications built with React, Node.js, and SQL Server. I focus on engineering systems that handle messy real-world data without breaking.",
  location: "Bhopal, Madhya Pradesh, India",
  timezone: "IST (UTC +05:30)",
  email: "abdulischad@gmail.com",
  phone: "+91 6264892207",
  github: "https://github.com/wyacoomz",
  linkedin: "https://linkedin.com/in/abdul-samad-khan-08a925261",
  resumePath: "/Abdul_Samad_Khan_Resume.pdf",
  status: "Open to full-time engineering and automation roles",
  languages: [
    { name: "English", level: "Professional Working" },
    { name: "Hindi", level: "Native" },
    { name: "Japanese", level: "Conversational" }
  ],
  competitiveMetrics: [
    { label: "LeetCode", value: "150+", detail: "Algorithmic problems solved" },
    { label: "Maristo ERP", value: "5 Entities", detail: "Single upload pipeline" },
    { label: "Banking Flows", value: "SNB & Al Rajhi", detail: "Statement & balance automation" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "maristo-invoice-dynamics",
    index: "01",
    title: "Maristo AI Invoice Processing & Dynamics 365 Bulk Uploader",
    shortDescription: "An integrated end-to-end invoice automation workflow spanning SharePoint file intake, AI Builder extraction, confidence validation, exception routing, and Power Automate Desktop uploading into Dynamics 365 across five operating companies.",
    category: "Enterprise Automation",
    tags: ["Power Automate Cloud", "AI Builder", "Power Automate Desktop", "MS Dynamics 365", "SharePoint", "Excel", "OpenPyXL", "APIs"],
    role: "Lead RPA Developer",
    featured: true,
    companies: [
      "Sisi's Eatery",
      "Maristo Interior Design",
      "Ring Gelene",
      "Maristo Hospitality",
      "Al Yasat Catering & Restaurant Supplies LLC (AYC)"
    ],
    context: "A multi-entity organization required a unified accounting automation pipeline to process vendor invoices received across five distinct operating businesses: Sisi's Eatery, Maristo Interior Design, Ring Gelene, Maristo Hospitality, and Al Yasat Catering & Restaurant Supplies LLC (AYC).",
    problem: "Accounting teams manually transcribed multi-page PDF invoices from different vendors with varying layouts, currencies, and tax formats, prepared manual Excel ledgers, and keyed entries into Microsoft Dynamics 365. Transcription errors and missing invoice fields caused recurring batch upload failures and audit delays.",
    architecture: {
      steps: [
        {
          phase: "01. Intake & Normalization",
          title: "SharePoint Document Ingestion",
          description: "Incoming invoice PDFs land in designated SharePoint document libraries. An event-driven Cloud Flow triggers on file creation, normalizes file streams, assigns tracking UUIDs, and stages documents for extraction.",
          tech: "Power Automate Cloud & SharePoint API"
        },
        {
          phase: "02. AI Document Intelligence",
          title: "AI Builder Custom Model Extraction",
          description: "Trained AI Builder models extract header fields (Invoice Number, Vendor Name, Tax ID, Dates, PO References), line-item tables, and tax summaries, capturing machine confidence ratings for every entity.",
          tech: "Microsoft AI Builder & Form Recognizer"
        },
        {
          phase: "03. Quality & Validation Gate",
          title: "Confidence Scoring & Missing-Field Checks",
          description: "Enforces strict validation thresholds: extractions scoring ≥ 0.90 confidence with all mandatory fields advance automatically. Low-confidence or incomplete invoices trigger an Outlook Adaptive Card approval flow for human review.",
          tech: "Cloud Approval Flows & Adaptive Cards"
        },
        {
          phase: "04. Multi-Company Routing",
          title: "Entity Routing & Standardized Excel Generation",
          description: "Maps validated records across five distinct operating companies (Sisi's Eatery, Maristo Interior Design, Ring Gelene, Maristo Hospitality, AYC) and generates schema-validated bulk-upload Excel workbooks.",
          tech: "Python, OpenPyXL & Excel Automation"
        },
        {
          phase: "05. Desktop Batch Execution",
          title: "Unattended Dynamics 365 Bulk Ingestion",
          description: "Power Automate Desktop launches unattended via Task Scheduler, authenticates into Dynamics 365, navigates to target ledger modules, uploads the prepared workbooks, and logs transaction audit results.",
          tech: "Power Automate Desktop & D365 UI Automation"
        }
      ]
    },
    technicalHighlights: [
      "Treated as ONE integrated end-to-end bot uniting cloud document intake with unattended desktop ERP batch execution.",
      "Engineered automated company/vendor routing mapping invoices across 5 operating companies to their specific Dynamics 365 charts of accounts.",
      "Hardened unattended desktop execution with visual element waiting loops, session keep-alive monitors, and automated failure screenshot reporting."
    ],
    challengesAndSolutions: [
      {
        challenge: "Vendor layout discrepancies across catering, interior design, and hospitality subsidiaries causing line-item wrapping across pagination.",
        solution: "Trained AI Builder custom models on diverse cross-subsidiary samples and applied secondary Python regex post-processing to reconcile multi-page tabular wraps."
      },
      {
        challenge: "Unannounced modal dialogues and occasional Windows session locks terminating unattended desktop uploads.",
        solution: "Implemented deterministic exception recovery blocks, element polling loops, and Task Scheduler Windows session orchestration."
      }
    ],
    outcome: "Successfully deployed a unified production bot that automated invoice processing across all five operating companies, standardizing bulk-upload Excel generation and establishing an auditable human-in-the-loop exception review channel.",
    metrics: [
      { label: "Entities Covered", value: "5 Companies", subtext: "Sisi's, Maristo Design, Ring Gelene, Hospitality, AYC" },
      { label: "Architecture", value: "End-to-End Bot", subtext: "Cloud trigger to Desktop D365 upload" },
      { label: "Exception Gate", value: "Confidence &ge; 0.90", subtext: "Automated human review routing" }
    ]
  },
  {
    id: "multi-bank-automation",
    index: "02",
    title: "Multi-Bank Financial Reporting Automation",
    shortDescription: "Bank-specific financial reporting workflows deployed for Saudi National Bank (SNB) and Al Rajhi Bank, featuring date-based opening/closing balance logic, weekend/holiday scheduling, and discrepancy reporting.",
    category: "Data & Financial",
    tags: ["Power Automate Desktop", "Python", "SQL Server", "SNB Portal", "Al Rajhi Portal", "Excel Automation"],
    role: "RPA Developer",
    featured: true,
    context: "Treasury operations required automated daily statement downloads and ledger reconciliation across two major financial institutions: Saudi National Bank (SNB) and Al Rajhi Bank, each with divergent authentication mechanisms and non-standard reporting formats.",
    problem: "Treasury accountants manually accessed SNB and Al Rajhi portals each morning, navigating divergent security token prompts, downloading statements in disparate formats, and reconciling opening balances against previous closing balances. Weekend timing differences in the region caused frequent false-alarm script failures.",
    architecture: {
      steps: [
        {
          phase: "01. Calendar & Weekend Logic",
          title: "Regional Holiday & Weekend Gatekeeper",
          description: "Engineered date calculation logic that assesses Friday/Saturday weekend schedules in the region and Saudi central bank settlement calendars to trigger runs only on active banking days.",
          tech: "Python & Schedule Logic"
        },
        {
          phase: "02. Bank-Specific Navigation",
          title: "SNB & Al Rajhi Portal Automation",
          description: "Constructed dedicated UI automation sequences tailored to individual bank interfaces, handling session token verification, deep account navigation, and dynamic download dialogues.",
          tech: "Power Automate Desktop & Web Selectors"
        },
        {
          phase: "03. Data Extraction & Validation",
          title: "Transaction & Excel Balancing Check",
          description: "Extracted transactional data from downloaded statements, computing opening and closing balances and validating that cumulative debits and credits match reported net movements.",
          tech: "Python (Pandas) & Excel Automation"
        },
        {
          phase: "04. Persistence & Audit Reporting",
          title: "SQL Server Storage & Discrepancy Reporting",
          description: "Logged normalized financial data and ingestion timestamps into SQL Server tables, dispatching automated balance summaries and discrepancy alerts to finance controllers.",
          tech: "Microsoft SQL Server & Automated Reporting"
        }
      ]
    },
    technicalHighlights: [
      "Custom-tailored automation paths for Saudi National Bank (SNB) and Al Rajhi Bank interfaces.",
      "Algorithmic opening and closing balance validation confirming mathematical parity before database write.",
      "Regional calendar logic handling Friday/Saturday weekend rules and local public bank holidays."
    ],
    challengesAndSolutions: [
      {
        challenge: "Periodic security token re-verification and multi-factor session timeouts during banking portal navigation.",
        solution: "Engineered dedicated standby checkpoints with encrypted credential pass-through and automated notification to treasury operators when session approval is required."
      },
      {
        challenge: "Variances between SNB statement layouts and Al Rajhi transaction exports.",
        solution: "Built a Python normalization parser standardizing both bank outputs into a unified relational schema."
      }
    ],
    outcome: "Replaced daily manual portal logins across SNB and Al Rajhi with an automated, verified reporting pipeline that enforces opening/closing balance integrity and logs clean records to SQL Server.",
    metrics: [
      { label: "Bank Portals", value: "SNB & Al Rajhi", subtext: "Bank-specific navigation & rules" },
      { label: "Scheduling", value: "Weekend-Aware", subtext: "Regional banking calendar logic" },
      { label: "Storage", value: "SQL Server", subtext: "Auditable financial ledger logs" }
    ]
  },
  {
    id: "ecommerce-mern-app",
    index: "03",
    title: "E-Commerce Web Application & Admin Dashboard",
    shortDescription: "Production-ready MERN stack e-commerce platform with product browsing, categorized catalog, shopping cart state management, and a secure administrative dashboard for inventory and order management.",
    category: "Full-Stack Web",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
    role: "Full-Stack Developer",
    featured: true,
    context: "Developed a modern, responsive full-stack e-commerce web storefront and administration system designed for reliable product catalog browsing, checkout orchestration, and inventory management.",
    problem: "Businesses require fast, responsive web storefronts that handle product variations and cart operations smoothly, paired with an administrative interface for tracking order states and updating inventory in real time.",
    architecture: {
      steps: [
        {
          phase: "01. Architecture & Modeling",
          title: "MongoDB Schema & Express REST Services",
          description: "Engineered relational-style document models for products, categories, users, and orders, backed by modular Express.js controllers and middleware.",
          tech: "Node.js, Express.js & MongoDB Mongoose"
        },
        {
          phase: "02. Client-Side Storefront",
          title: "React & Redux Toolkit State Architecture",
          description: "Built responsive user interface using Tailwind CSS and Redux Toolkit, managing global cart state, price calculations, and category filtering.",
          tech: "React, Redux Toolkit & Tailwind CSS"
        },
        {
          phase: "03. Administration Dashboard",
          title: "Backoffice Inventory & Order Management",
          description: "Engineered administrative dashboard for store managers to add, update, and categorize products, manage stock levels, and review incoming customer orders.",
          tech: "React Component Library & REST Endpoints"
        }
      ]
    },
    technicalHighlights: [
      "Predictable state management using Redux Toolkit for cart synchronization and filter states.",
      "RESTful API design with structured error-handling middleware and schema validation.",
      "Responsive layout optimized for desktop and mobile viewports using Tailwind CSS."
    ],
    challengesAndSolutions: [
      {
        challenge: "Maintaining cart consistency and responsive UI updates across multiple categories and price variations.",
        solution: "Centralized cart computations and persistence using Redux Toolkit slices with localized optimistic UI updates."
      }
    ],
    outcome: "Built and delivered a complete full-stack e-commerce application demonstrating solid software engineering across React, Node.js, Express, and MongoDB.",
    metrics: [
      { label: "Frontend", value: "React + Redux", subtext: "Tailwind CSS responsive design" },
      { label: "Backend", value: "Node & Express", subtext: "MongoDB REST architecture" },
      { label: "Backoffice", value: "Admin Portal", subtext: "Stock & order management" }
    ]
  },
  {
    id: "cash-flow-reconciliation",
    index: "04",
    title: "Cash-Flow Reconciliation Automation",
    shortDescription: "Automated treasury cash-flow reconciliation workflow extracting transaction data from Excel, calculating opening and closing balances with date-based logic, and logging verified records into SQL Server.",
    category: "Data & Financial",
    tags: ["Excel Automation", "Python", "SQL Server", "Treasury Ops", "Data Validation"],
    role: "Automation Engineer",
    featured: true,
    context: "Treasury departments monitor extensive daily liquidity movements. Reconciling opening balances against daily cash inflows, disbursements, and expected closing balances was previously performed manually across complex spreadsheets.",
    problem: "Manual spreadsheet reconciliation was vulnerable to formula drift, missing transaction dates, inconsistent debit/credit formatting, and lack of historical version control. Undetected ledger errors distorted daily cash positioning.",
    architecture: {
      steps: [
        {
          phase: "01. Ledger Extraction",
          title: "Automated Transaction Parsing",
          description: "Extracted transactional data from disparate treasury Excel sheets, standardizing varied date conventions and transaction categories.",
          tech: "Python (Pandas, OpenPyXL) & Excel"
        },
        {
          phase: "02. Mathematical Validation",
          title: "Date-Based Balance Calculation Engine",
          description: "Applied chronologically sequenced opening-to-closing balance calculation logic, computing running balances and verifying equation parity across all transaction subsets.",
          tech: "Algorithmic Accounting Logic"
        },
        {
          phase: "03. Discrepancy Investigation",
          title: "Anomaly Pre-Flight Check",
          description: "Executed pre-flight checks to flag missing transaction dates, anomalous sums, orphaned line items, or balance misalignments prior to permanent record commit.",
          tech: "Data Integrity Validation"
        },
        {
          phase: "04. SQL Persistence",
          title: "SQL Server Ingestion & Audit Trail",
          description: "Stored clean, validated reconciliation records into structured SQL Server tables, establishing a tamper-evident audit history accessible by financial controllers.",
          tech: "Microsoft SQL Server"
        }
      ]
    },
    technicalHighlights: [
      "Chronological ledger sorting ensuring opening balance roll-forwards match closing figures precisely.",
      "Automated anomaly detection identifying data gaps and formula discrepancies before database write.",
      "Auditable SQL Server schema with transaction metadata, processing timestamps, and reconciliation status."
    ],
    challengesAndSolutions: [
      {
        challenge: "Legacy Excel workbooks containing merged cells, varied currency symbols, and manual formula overrides.",
        solution: "Built a robust data sanitization layer that extracts raw cell values, strips non-numeric formatting, and recalculates totals programmatically."
      }
    ],
    outcome: "Replaced manual spreadsheet checks with an automated, verified reconciliation pipeline that maintains complete SQL Server auditability.",
    metrics: [
      { label: "Core Processing", value: "Automated", subtext: "Excel to SQL Server pipeline" },
      { label: "Integrity", value: "Zero Formula Drift", subtext: "Programmatic balance verification" },
      { label: "Data Store", value: "SQL Server", subtext: "Structured audit tracking" }
    ]
  },
  {
    id: "customer-creation-keyloop",
    index: "05",
    title: "Customer Creation & Reporting Automation",
    shortDescription: "Customer master data standardization, STD mapping, discrepancy investigation between database records and Keyloop DMS source data, and automated management reporting.",
    category: "Enterprise Automation",
    tags: ["Python", "SQL Server", "Keyloop DMS", "Data Standardization", "Excel Reporting"],
    role: "Automation Developer",
    featured: true,
    context: "Automotive retail and service operations rely on accurate customer profiles across their Dealer Management System (Keyloop) and relational operational databases. Discrepancies between sources impaired billing and customer communications.",
    problem: "Customer records entered at branch dealerships frequently lacked standardized naming, address conventions, or STD codes. Variations between Keyloop source data and central database tables caused customer duplication and reporting mismatches.",
    architecture: {
      steps: [
        {
          phase: "01. Source Data Ingestion",
          title: "Keyloop DMS Extraction",
          description: "Extracted customer master data records, contact entries, and account identifiers from Keyloop DMS exports.",
          tech: "Keyloop Source Data & Python"
        },
        {
          phase: "02. Standardization & Mapping",
          title: "Customer Standardization & STD Mapping",
          description: "Applied normalization algorithms to cleanse names, standardize telephone prefixes and STD codes, and format addresses according to corporate conventions.",
          tech: "Python Data Cleansing Rules"
        },
        {
          phase: "03. Discrepancy Investigation",
          title: "Cross-Database Discrepancy Analysis",
          description: "Compared normalized Keyloop records against existing SQL Server customer tables to identify conflicting attributes, missing identifiers, or orphaned profiles.",
          tech: "SQL Server Queries & Data Reconciliation"
        },
        {
          phase: "04. Automated Reporting",
          title: "Management Report Generation",
          description: "Generated structured discrepancy reports and customer creation logs, delivering summary analytics to operational leadership.",
          tech: "Excel Automation & Email Reporting"
        }
      ]
    },
    technicalHighlights: [
      "Engineered automated STD code mapping and address normalization for automotive dealership customer profiles.",
      "Constructed reconciliation queries identifying data divergences between Keyloop DMS and central SQL databases.",
      "Automated recurring management discrepancy reports highlighting customer profiles requiring manual verification."
    ],
    challengesAndSolutions: [
      {
        challenge: "Phonetic variations in customer names and non-standard mobile number formats in dealer entries.",
        solution: "Implemented regex pattern matching and fuzzy matching checks to cluster potential duplicates before updating master records."
      }
    ],
    outcome: "Standardized customer profile creation and established automated discrepancy tracking between Keyloop source data and relational SQL databases.",
    metrics: [
      { label: "Source System", value: "Keyloop DMS", subtext: "Dealer Management System" },
      { label: "Mapping", value: "STD & Format", subtext: "Standardized customer profiles" },
      { label: "Audit", value: "SQL Server", subtext: "Discrepancy tracking & reports" }
    ]
  },
  {
    id: "email-to-database",
    index: "06",
    title: "Email-to-Database Automation Bot",
    shortDescription: "End-to-end autonomous email pipeline retrieving transactional messages, downloading and parsing attachments, extracting structured datasets, and writing records to SQL Server.",
    category: "Enterprise Automation",
    tags: ["Power Automate", "SQL Server", "IMAP/SMTP", "Python", "Data Extraction"],
    role: "Automation Developer",
    featured: true,
    context: "Corporate departments regularly received mission-critical transactional files (invoices, daily branch summaries, vendor logs) via dedicated corporate inboxes that required continuous manual monitoring and database entry.",
    problem: "Delayed processing occurred whenever operators were away, attachments were occasionally misplaced, and manual entry into databases created data latency and operational bottlenecks.",
    architecture: {
      steps: [
        {
          phase: "01. Mailbox Monitoring",
          title: "Autonomous Message Retrieval",
          description: "Configured resilient polling of business email channels filtering by specific subject keywords, sender addresses, and attached file types.",
          tech: "IMAP/Exchange Protocols & Power Automate"
        },
        {
          phase: "02. Attachment Handling",
          title: "Secure File Download & Validation",
          description: "Automatically decoupled attachments, verified file signatures and MIME types, and staged them in a secure processing queue.",
          tech: "File Processing & Storage"
        },
        {
          phase: "03. Structured Extraction",
          title: "Schema Parsing & Cleansing",
          description: "Extracted tabular and key-value records from CSV, Excel, and structured text attachments, performing type coercion and null-value sanitation.",
          tech: "Python & Regex Parsers"
        },
        {
          phase: "04. Database Persistence",
          title: "SQL Server Commit & Response Dispatch",
          description: "Committed cleansed data rows into SQL Server with transaction rollbacks on failure, automatically sending receipt confirmation or error diagnostic emails.",
          tech: "SQL Server & SMTP Automated Dispatch"
        }
      ]
    },
    technicalHighlights: [
      "Engineered automated response handling informing senders of successful ingestion or specific rejection reasons.",
      "Implemented comprehensive error logging and admin notifications for malformed attachments.",
      "Preserved transactional consistency using SQL transactions to prevent partial writes."
    ],
    challengesAndSolutions: [
      {
        challenge: "Occasional email duplicates or re-sent attachments risking double-entry into production database tables.",
        solution: "Calculated SHA-256 payload hashes and unique transaction identifier deduplication checks prior to SQL insertion."
      }
    ],
    outcome: "Built an unattended email processing pipeline that eliminated manual file downloading and transcription while guaranteeing zero lost attachments.",
    metrics: [
      { label: "Workflow", value: "Fully Unattended", subtext: "Real-time inbox listener" },
      { label: "Notification", value: "Auto-Response", subtext: "Automated status reporting" },
      { label: "Target DB", value: "SQL Server", subtext: "Transactional persistence" }
    ]
  },
  {
    id: "job-sky-portal",
    index: "07",
    title: "Job-Sky — Recruitment & Careers Platform",
    shortDescription: "Full-stack career marketplace with user, recruiter, and administrator roles, JWT authentication, MongoDB persistence, candidate resume applications, and Razorpay payment integration.",
    category: "Full-Stack Web",
    tags: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay"],
    role: "Full-Stack Developer",
    featured: false,
    context: "Engineered a recruitment web platform connecting candidates with hiring companies, featuring job vacancy administration, applicant tracking, and paid premium postings.",
    problem: "Recruitment marketplaces require strict data isolation between candidate profiles and recruiter dashboards, fast multi-attribute filtering, reliable file uploads for resumes, and secure checkout for paid employer features.",
    architecture: {
      steps: [
        {
          phase: "01. Auth & Security",
          title: "Role-Based Access Control",
          description: "Architected secure authentication flows with JWT tokens, password hashing with bcrypt, and role guards (Job Seeker, Recruiter, Admin).",
          tech: "Node.js, Express, JWT & Bcrypt"
        },
        {
          phase: "02. Candidate Experience",
          title: "Dynamic Search, Facets & Resume Submission",
          description: "Built responsive frontend with real-time text query filtering by location, role type, and compensation, coupled with a resume upload pipeline.",
          tech: "React, Redux Toolkit & Tailwind CSS"
        },
        {
          phase: "03. Recruiter Administration",
          title: "Job Post Lifecycle & Applicant Tracking",
          description: "Engineered an employer management suite to draft, publish, edit, and archive job requisitions, as well as review candidate resumes.",
          tech: "Express REST APIs & MongoDB Aggregations"
        },
        {
          phase: "04. Monetization & Checkout",
          title: "Razorpay Payment Gateway Integration",
          description: "Integrated Razorpay checkout with webhook order verification, enabling recruiters to purchase highlighted job listings securely.",
          tech: "Razorpay Webhooks & Payment APIs"
        }
      ]
    },
    technicalHighlights: [
      "State management powered by Redux Toolkit for seamless cart, filters, and authentication state transitions.",
      "Optimized MongoDB indexing across job titles, company names, and geographic parameters for sub-50ms search responses.",
      "Configured robust multipart file handling for PDF resume uploads with file size and format validation."
    ],
    challengesAndSolutions: [
      {
        challenge: "Handling secure payment status reconciliation without exposing endpoints to client-side manipulation.",
        solution: "Implemented cryptographic Razorpay signature verification on backend webhooks before updating employer posting tiers."
      }
    ],
    outcome: "Built and deployed a production recruitment web application with complete candidate application tracking and verified payment workflows.",
    metrics: [
      { label: "Frontend", value: "React + Redux", subtext: "Tailwind CSS responsive design" },
      { label: "Backend", value: "Node & Express", subtext: "MongoDB REST architecture" },
      { label: "Payments", value: "Razorpay", subtext: "Verified webhook checkout" }
    ]
  }
];

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: "station-7-game",
    index: "01",
    title: "Station-7 — 3D Atmospheric Horror Game",
    category: "Game Engineering & 3D Systems",
    role: "Lead Game Developer",
    status: "Prototyped",
    description: "Atmospheric 3D survival horror game developed in Godot Engine 4.7 featuring sound/hearing-based enemy behavior (Echo), 3D environment architecture, custom shaders, and cross-platform compilation.",
    technologies: ["Godot 4.7", "GDScript", "GLSL Shaders", "3D Modeling", "Procedural Audio"],
    highlights: [
      "Designed acoustic-responsive monster AI reacting to player noise and environmental sound thresholds.",
      "Implemented atmospheric retro PS1 dither shaders and volumetric flashlight lighting.",
      "Dual-export pipeline targeting Windows desktop (.exe) and Android mobile (.apk) builds."
    ]
  },
  {
    id: "note-sharing-platform",
    index: "02",
    title: "Academic Note Sharing Platform",
    category: "Web Application",
    role: "Frontend Developer",
    status: "Deployed",
    description: "Web application built with React and JavaScript allowing students to browse, upload, and organize study notes, utilizing Google Sheets API as a structured, serverless data persistence layer.",
    technologies: ["React", "JavaScript", "Google Sheets API", "HTML5", "CSS3"],
    highlights: [
      "Integrated Google Sheets API for serverless data storage and document metadata retrieval.",
      "Responsive user interface for viewing subject notes and semester materials.",
      "Open-source repository available on GitHub."
    ],
    links: [
      { label: "GitHub Codebase", url: "https://github.com/wyacoomz/major-project--frontend-notesharing", type: "github" }
    ]
  },
  {
    id: "koke-game",
    index: "03",
    title: "KOKE — Japanese Historical Game Concept",
    category: "Game Design & Prototyping",
    role: "Creative Developer",
    status: "Exploratory Concept",
    description: "Historical narrative game concept set in Japan circa 1860 exploring Jil's story. Features a distinctive 'no eyes' character art direction and exploratory prototype planning across Godot, Unreal Engine, and Roblox.",
    technologies: ["Godot Engine", "Pixel Art", "Storybook Mechanics", "Unreal Engine (Exploration)", "Roblox Studio (Exploration)"],
    highlights: [
      "Crafted stylized 1860 Feudal Japan art direction and character lore.",
      "Explored mechanical prototypes and engine capabilities across Godot and 3D sandbox engines.",
      "Preserved as an active creative design and prototyping archive."
    ]
  },
  {
    id: "java-billing-system",
    index: "04",
    title: "Java Enterprise Billing & Payment System",
    category: "Backend & Systems",
    role: "Software Developer",
    status: "Deployed",
    description: "Desktop billing application implemented in Java demonstrating object-oriented architecture, itemized transaction calculations, tax processing, and relational database persistence via JDBC.",
    technologies: ["Java", "JDBC", "MySQL", "OOP Design Patterns"],
    highlights: [
      "Structured data access layer using JDBC and connection pooling.",
      "Itemized calculation of taxes, totals, and receipts.",
      "Open-source repository on GitHub."
    ],
    links: [
      { label: "GitHub Codebase", url: "https://github.com/wyacoomz/payment_services", type: "github" }
    ]
  },
  {
    id: "ft-automation-pipeline",
    index: "05",
    title: "FT Automation — Resilient Multi-Part Download Pipeline",
    category: "Systems & Automation",
    role: "Automation Engineer",
    status: "Production",
    description: "High-speed automation pipeline using Python 3, Selenium WebDriver, and 8 concurrent HTTP Range chunk workers to reliably ingest large multi-part archive sets with atomic byte-level integrity verification.",
    technologies: ["Python 3", "Selenium WebDriver", "HTTP Range", "Multi-Threading", "File Integrity I/O"],
    highlights: [
      "Dynamic wait orchestration bypassing countdown timers and anti-bot sessions.",
      "Multi-threaded range chunking achieving 3–5x single-connection throughput with byte-level resume.",
      "Atomic finalization preventing corrupt or partial download saves."
    ]
  }
];

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "trufe",
    company: "Trufe",
    role: "RPA Developer",
    type: "Full-time",
    period: "Aug 2025 – Present",
    location: "India",
    summary: "Spearheading the engineering, deployment, and ongoing maintenance of enterprise RPA bots and business process automation solutions spanning financial reconciliation, document intelligence, and ERP integrations.",
    achievements: [
      "Design, develop, deploy, and support automation workflows using Power Automate Cloud and Desktop, Python, Excel, SQL Server, SharePoint, and REST APIs.",
      "Build end-to-end workflows for invoice/document extraction, data validation, email handling, financial processing, and cross-application data transfer.",
      "Implement exception handling, confidence-based review paths, data checks, and error reporting to improve the reliability of business-critical automations.",
      "Troubleshoot and support unattended desktop automation, including Windows session configuration, Task Scheduler orchestration, and runtime issue recovery."
    ],
    technologies: [
      "Power Automate Cloud",
      "Power Automate Desktop",
      "AI Builder",
      "Microsoft Dynamics 365",
      "Python",
      "SQL Server",
      "SharePoint",
      "Excel Automation",
      "REST APIs"
    ]
  },
  {
    id: "skyinfo",
    company: "Skyinfo-group",
    role: "MERN Full Stack Developer",
    type: "Employment",
    period: "Jun 2025 – Aug 2025",
    location: "India",
    summary: "Engineered responsive full-stack web applications and REST APIs, optimizing front-end performance, component architecture, and database integrations for client web products.",
    achievements: [
      "Built and maintained full-stack web applications using React, Node.js, Express, and MongoDB.",
      "Developed REST APIs and responsive user interfaces; supported client website delivery, performance improvements, and SEO structure.",
      "Collaborated on database schema design, client-side state management, and reusable UI component libraries."
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "JavaScript",
      "Git"
    ]
  },
  {
    id: "elevated-labs",
    company: "Elevated Labs",
    role: "Java Intern",
    type: "Remote Internship",
    period: "May 2025 – Jun 2025",
    location: "Remote",
    summary: "Contributed to backend Java services and relational database integration for client applications.",
    achievements: [
      "Implemented Java business logic and APIs, integrated MySQL for data persistence, and resolved bugs in client projects.",
      "Authored unit tests and data access layer modules using JDBC for relational persistence.",
      "Participated in agile code reviews and backend performance debugging."
    ],
    technologies: [
      "Java",
      "MySQL",
      "JDBC",
      "Object-Oriented Programming",
      "REST APIs"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "RPA & Business Automation",
    description: "Enterprise workflow automation, unattended desktop orchestration, and exception architecture.",
    skills: [
      { name: "Power Automate Cloud", level: "Core Production", context: "Cloud flows, HTTP triggers, SharePoint & Approval gates" },
      { name: "Power Automate Desktop", level: "Core Production", context: "UI automation, session management, Excel manipulation" },
      { name: "Workflow Architecture", level: "Core Production", context: "End-to-end multi-system integration & exception paths" },
      { name: "Exception Handling", level: "Core Production", context: "Confidence scoring, human-in-the-loop review, retry loops" },
      { name: "Unattended Automation", level: "Core Production", context: "Task Scheduler, Windows session management, VM runtimes" }
    ]
  },
  {
    category: "AI & Document Intelligence",
    description: "Machine learning document processing, prompt engineering, and agentic protocols.",
    skills: [
      { name: "AI Builder", level: "Core Production", context: "Invoice & receipt models, custom entity extraction, confidence thresholds" },
      { name: "AI-Assisted Development", level: "Proficient", context: "Accelerated prototyping, prompt-based workflows, automated debugging" },
      { name: "Model Context Protocol (MCP)", level: "Proficient", context: "Tool calling schemas, agentic toolchain integration" },
      { name: "Document Parsing", level: "Core Production", context: "Multi-page PDF extraction, tabular reconciliation, schema validation" }
    ]
  },
  {
    category: "Full-Stack Web Development",
    description: "Modern component-driven web interfaces, state management, and backend RESTful services.",
    skills: [
      { name: "React", level: "Core Production", context: "Functional components, custom hooks, context, dynamic rendering" },
      { name: "Node.js & Express.js", level: "Core Production", context: "REST API design, middleware, JWT authentication, error handling" },
      { name: "Redux Toolkit & Zustand", level: "Proficient", context: "Predictable client-side state architecture" },
      { name: "Tailwind CSS & Modern CSS", level: "Core Production", context: "Responsive grids, design tokens, micro-interactions" },
      { name: "JavaScript (ES6+) & TypeScript", level: "Core Production", context: "Async/await, strict typing, functional paradigms" }
    ]
  },
  {
    category: "Databases & Data Integration",
    description: "Relational and document storage, tabular data processing, and enterprise ERP integration.",
    skills: [
      { name: "SQL Server (T-SQL)", level: "Core Production", context: "Audit tables, schema design, stored procedures, data validation" },
      { name: "MongoDB", level: "Proficient", context: "Mongoose models, aggregation pipelines, document indexing" },
      { name: "MySQL", level: "Proficient", context: "Relational modeling, JDBC integration, queries" },
      { name: "SharePoint & Dynamics 365", level: "Core Production", context: "Doc libraries, lists, D365 accounting ledger bulk ingestion" },
      { name: "Excel Automation (Pandas, OpenPyXL)", level: "Core Production", context: "Standardized bulk template generation & balance calculations" }
    ]
  },
  {
    category: "Languages & Engineering Systems",
    description: "Multi-paradigm programming languages, version control, and system protocols.",
    skills: [
      { name: "Python", level: "Core Production", context: "Automation scripts, Selenium, data pipelines, web scrapers" },
      { name: "JavaScript", level: "Core Production", context: "Full-stack web applications, runtime scripts" },
      { name: "Java", level: "Proficient", context: "OOP principles, backend business logic, JDBC" },
      { name: "SQL", level: "Core Production", context: "Complex joins, analytical queries, ledger auditing" },
      { name: "Git & GitHub", level: "Core Production", context: "Branching workflows, version control, release pipelines" },
      { name: "IMAP / SMTP & REST APIs", level: "Core Production", context: "Mailbox listeners, JSON/XML payload serialization" }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "Truba Institute of Engineering and Information Technology",
    location: "Bhopal, Madhya Pradesh, India",
    period: "2022 – 2025",
    highlights: [
      "Rigorous specialization in machine learning foundations, algorithms, and data engineering architectures.",
      "150+ LeetCode algorithmic problem solutions across data structures and graph algorithms."
    ]
  },
  {
    degree: "Diploma in Computer Science Engineering",
    institution: "Peoples School of Research and Technology",
    location: "Bhopal, Madhya Pradesh, India",
    period: "2019 – 2022",
    score: "GPA: 7.14",
    highlights: [
      "Core training in computer system architecture, object-oriented programming, operating systems, and database systems."
    ]
  }
];

export const FIELD_NOTES: FieldNote[] = [
  {
    id: "note-low-confidence-ocr",
    index: "01",
    date: "2025-10",
    title: "Handling Low-Confidence Document AI Extractions & Adaptive Review Loops",
    category: "Document Intelligence",
    systemContext: "Maristo AI Invoice Processing & Dynamics 365 Pipeline",
    problem: "Committing raw OCR-extracted financial fields directly to Dynamics 365 led to failed batch uploads and ledger discrepancies whenever low-quality scans, non-standard layouts, or faint character print distorted tax numbers or line totals.",
    constraint: "Human accounting personnel cannot feasibly review 100% of high-volume incoming invoices, but automated systems must enforce an absolute zero-bad-data policy on the central ERP.",
    approach: "Designed a two-tiered gatekeeper. First, an evaluation script checks floating-point confidence scores across mandatory accounting keys (Invoice #, Tax ID, Dates, Net/Gross), requiring all scores >= 0.90. Second, an arithmetic checksum compares the sum of extracted line items against the reported gross total. Only records passing both criteria advance to automated Excel generation. Failing records trigger an Outlook Adaptive Card with pre-filled candidate values, enabling one-click human verification without leaving the inbox.",
    lesson: "High OCR confidence scores can still harbor arithmetic drift on multi-column tables. Combining statistical confidence ratings with deterministic mathematical checksums is essential before batch database ingestion.",
    sanitizedSnippet: {
      language: "python",
      caption: "Sanitized Dual-Condition Confidence & Arithmetic Checksum Gatekeeper",
      code: `def evaluate_invoice_gatekeeper(extracted_fields, line_items, gross_total):
    mandatory_keys = ['invoice_number', 'vendor_tax_id', 'invoice_date', 'total_amount']
    
    # 1. Floating-point confidence thresholding
    for key in mandatory_keys:
        score = extracted_fields.get(key, {}).get('confidence', 0.0)
        if score < 0.90:
            return {"status": "DIVERT_ADAPTIVE_CARD", "reason": f"Low confidence on {key} ({score:.2f})"}
    
    # 2. Arithmetic checksum parity validation
    line_sum = sum(item.get('line_amount', 0.0) for item in line_items)
    if abs(round(line_sum, 2) - round(gross_total, 2)) > 0.01:
        return {"status": "DIVERT_ADAPTIVE_CARD", "reason": f"Line items ({line_sum}) != Gross ({gross_total})"}
        
    return {"status": "AUTO_APPROVE_FOR_EXCEL"}`
    }
  },
  {
    id: "note-unattended-desktop-resilience",
    index: "02",
    date: "2025-11",
    title: "Hardening Unattended Desktop RPA Sessions in Windows Environments",
    category: "Desktop Automation",
    systemContext: "Power Automate Desktop & MS Dynamics 365 Batch Uploader",
    problem: "Unattended desktop automations running overnight on virtualized Windows machines suffered intermittent halts due to unexpected OS modal dialogues, session lockouts, and fluctuating ERP network latency.",
    constraint: "Unattended bots execute with zero human operators present to dismiss unexpected dialogues, accept certificate prompts, or unlock desktop sessions.",
    approach: "Eliminated all arbitrary sleep delays in favor of dynamic UI element polling loops bounded by strict retry thresholds. Orchestrated active session state through Windows Task Scheduler with keep-alive routines, and encapsulated every UI interaction step within deterministic recovery blocks. If an unrecoverable state is hit, the runner captures a full-resolution failure screenshot, writes the selector state to SQL Server logs, and safely terminates the session.",
    lesson: "Arbitrary delay timers are an anti-pattern in desktop RPA. Deterministic element polling, automated diagnostic screenshots, and graceful failure logs are mandatory for unattended stability.",
    sanitizedSnippet: {
      language: "python",
      caption: "Sanitized Dynamic Selector Polling with Diagnostic Screenshot Recovery",
      code: `def wait_and_interact(session, selector_name, action_fn, max_retries=6, interval=5):
    for attempt in range(1, max_retries + 1):
        if session.find_element(selector_name, timeout=interval):
            action_fn()
            return True
        session.log(f"Waiting for {selector_name}... attempt {attempt}/{max_retries}")
    
    # Diagnostic recovery on timeout
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    screenshot_path = f"diagnostics/err_{selector_name}_{timestamp}.png"
    session.capture_screen(screenshot_path)
    session.sql_log("TIMEOUT_FAILURE", selector_name, screenshot_path)
    raise TimeoutError(f"UI element {selector_name} failed to mount within allotted window")`
    }
  },
  {
    id: "note-regional-calendar-rules",
    index: "03",
    date: "2025-12",
    title: "Regional Calendar & Weekend Gating in Multi-Bank Workflows",
    category: "Financial Systems",
    systemContext: "Multi-Bank Financial Reporting (SNB & Al Rajhi Portals)",
    problem: "Standard cron schedules trigger daily, but regional banking in Saudi Arabia operates on a Sunday–Thursday business week (Friday/Saturday weekend) alongside non-uniform central bank clearing holidays.",
    constraint: "Firing portal automation scripts on non-clearing days triggered false-alarm failure alerts and risked locking out security credentials due to abnormal off-hour portal sessions.",
    approach: "Built a calendar gatekeeper script in Python that evaluates regional weekday indices (accounting for Friday/Saturday weekends) and queries an official settlement calendar table before launching web automation sequences. On non-banking days, the system enters a verified standby mode and reconciles transactions against the last active business day's recorded closing balance.",
    lesson: "Automation workflows must model the operational calendar of the business sector, not merely the technical availability of the web portal.",
    sanitizedSnippet: {
      language: "python",
      caption: "Sanitized Regional Weekend & Clearing Holiday Gatekeeper",
      code: `def check_regional_settlement_calendar(target_date, central_bank_holidays):
    # Saudi banking week: Sunday (6) through Thursday (3)
    # Friday (4) and Saturday (5) are weekend non-settlement days
    weekday = target_date.weekday()
    if weekday in (4, 5):
        return False, "REGIONAL_WEEKEND_STANDBY"
    
    date_str = target_date.strftime("%Y-%m-%d")
    if date_str in central_bank_holidays:
        return False, f"CENTRAL_BANK_CLEARING_HOLIDAY ({central_bank_holidays[date_str]})"
        
    return True, "ACTIVE_BANKING_DAY"`
    }
  },
  {
    id: "note-email-deduplication",
    index: "04",
    date: "2026-01",
    title: "Preventing Duplicate Ingestion in Asynchronous Email Pipelines",
    category: "Data Integrity",
    systemContext: "Email-to-Database Autonomous Ingestion Bot",
    problem: "Corporate mailboxes regularly receive forwarded email chains, re-sent vendor attachments, or repeated customer updates, threatening duplicate row insertions into SQL Server production tables.",
    constraint: "Email subject lines, thread IDs, and filenames are non-deterministic and can be altered by mail clients, making them unsafe identifiers for deduplication.",
    approach: "Computed a compound SHA-256 cryptographic hash from the normalized sender email address, extracted invoice/transaction identifier, and the raw binary attachment byte stream. The pipeline queries SQL Server for existing hashes prior to parsing, and encapsulates database insertions inside atomic SQL transactions with rollback protection.",
    lesson: "Never trust transport-layer headers for business deduplication. Hash the actual payload bytes and let database uniqueness constraints guarantee idempotency.",
    sanitizedSnippet: {
      language: "python",
      caption: "Sanitized SHA-256 Payload Compound Hashing for Idempotent Ingestion",
      code: `import hashlib

def compute_payload_signature(sender_email, transaction_ref, raw_attachment_bytes):
    hasher = hashlib.sha256()
    # Normalize sender and reference to prevent whitespace/case collisions
    hasher.update(sender_email.strip().lower().encode('utf-8'))
    hasher.update(transaction_ref.strip().upper().encode('utf-8'))
    # Hash binary file payload
    hasher.update(raw_attachment_bytes)
    return hasher.hexdigest()

# SQL Transaction Guard:
# INSERT INTO IngestionLedger (PayloadHash, Status, CreatedAt)
# VALUES (@PayloadHash, 'PROCESSING', GETUTCDATE());
# IF @@ROWCOUNT = 0 ROLLBACK TRANSACTION;`
    }
  }
];
