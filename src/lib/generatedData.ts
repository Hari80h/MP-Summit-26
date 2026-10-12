import { Person, ExhibitorStats, Product } from '../types';

const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Kabir', 'Saanvi', 'Aanya', 'Aadhya', 'Aaradhya', 'Ananya', 'Pari', 'Anika', 'Navya', 'Avni', 'Diya', 'Shruti', 'Neha', 'Rohan', 'Vikram', 'Priya', 'Kavya', 'Siddharth', 'Amit', 'Sunita', 'Rajesh', 'Pooja', 'Deepak', 'Sneha', 'Rahul', 'Nisha', 'Ravi', 'Ritu', 'Akash', 'Kiran', 'Tarun', 'Manoj', 'Prakash', 'Gaurav', 'Vinay', 'Ashok', 'Sanjay', 'Geeta', 'Sita', 'Anita', 'Sunil', 'Anil', 'Naveen', 'Vijay', 'Vikas', 'Ajay'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Bansal', 'Agarwal', 'Singh', 'Kumar', 'Das', 'Bose', 'Chatterjee', 'Sengupta', 'Patil', 'Deshmukh', 'Joshi', 'Kulkarni', 'Reddy', 'Rao', 'Naidu', 'Chowdary', 'Menon', 'Nair', 'Pillai', 'Iyer', 'Iyengar', 'Natarajan', 'Gowda', 'Hegde', 'Shenoy', 'Prabhu', 'Mehta', 'Shah', 'Patel', 'Desai', 'Parekh', 'Gandhi', 'Chauhan', 'Rajput', 'Yadav', 'Ahir', 'Bhatt', 'Trivedi', 'Vyas', 'Mukherjee', 'Banerjee', 'Ganguly', 'Kaur', 'Gill', 'Dhillon', 'Sandhu'];

const companies = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant', 'Accenture', 'IBM', 'Capgemini', 'Oracle', 'Microsoft', 'Google', 'Amazon', 'Flipkart', 'Zoho', 'Freshworks', 'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Uber', 'Intel', 'AMD', 'NVIDIA', 'Qualcomm', 'Cisco', 'Juniper', 'VMware', 'Red Hat', 'SAP', 'Salesforce', 'Adobe', 'Intuit', 'Atlassian', 'ThoughtWorks', 'Mindtree', 'L&T Infotech', 'Mphasis', 'Hexaware', 'Cyient', 'Tata Elxsi', 'KPIT', 'Zensar', 'Persistent', 'Coforge', 'Birlasoft', 'Sonata', 'Mastek', 'Datamatics', 'Ramco'];

const designations = ['Software Engineer', 'Senior Software Engineer', 'Tech Lead', 'Engineering Manager', 'Director of Engineering', 'VP of Engineering', 'CTO', 'Product Manager', 'Senior Product Manager', 'Group Product Manager', 'Director of Product', 'VP of Product', 'CPO', 'Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist', 'AI/ML Engineer', 'Data Engineer', 'Cloud Architect', 'Solutions Architect', 'DevOps Engineer', 'SRE', 'Security Engineer', 'UX Designer', 'UI Designer', 'Product Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer'];

const interestsList = ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Data Science', 'Web Development', 'Mobile Development', 'DevOps', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR', 'Quantum Computing', 'SaaS', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'Enterprise Software', 'Open Source', 'UI/UX Design', 'Product Management', 'Agile Methodologies', 'Startup Ecosystem', 'Venture Capital', 'Angel Investing'];

// Use a simple seeded PRNG so it's consistent across hot reloads
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
const rng = mulberry32(42);

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function generateAttendees(count: number): Person[] {
  const attendees: Person[] = [];
  for (let i = 0; i < count; i++) {
    const fn = randomElement(firstNames);
    const ln = randomElement(lastNames);
    const name = `${fn} ${ln}`;
    const company = randomElement(companies);
    const designation = randomElement(designations);
    const score = (i < 20) ? Math.floor(rng() * 20) + 80 : Math.floor(rng() * 100);
    const numInterests = Math.floor(rng() * 3) + 2;
    const interests: string[] = [];
    for (let j = 0; j < numInterests; j++) {
      const interest = randomElement(interestsList);
      if (!interests.includes(interest)) {
        interests.push(interest);
      }
    }
    
    attendees.push({
      id: `gen-att-${i}`,
      name: name,
      designation: designation,
      company: company,
      avatar: `https://i.pravatar.cc/150?u=${fn}+${ln}`,
      interests: interests,
      relevanceScore: score,
      bio: `Professional at ${company} focusing on ${interests[0] || 'technology'}.`,
      skills: interests,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      mobile: '+91 98765 43210',
      linkedin: `linkedin.com/in/${fn.toLowerCase()}${ln.toLowerCase()}`,
      privacy: {
        shareEmail: true,
        sharePhone: false,
        shareLinkedIn: true,
        preset: 'Connections Only'
      },
      checkedIn: i < 1115,
      registrationId: `#${String(1000 + i).padStart(4, '0')}`,
      ticketType: (i % 12 === 0 ? 'VIP' : i % 8 === 0 ? 'Exhibitor' : 'Delegate'),
      role: (i % 12 === 0 ? 'vip' : i % 8 === 0 ? 'exhibitor_staff' : 'delegate'),
    });
  }
  return attendees;
}

export const GENERATED_EXHIBITORS: ExhibitorStats[] = [
  {
    "id": "exh-0",
    "company": "Google Cloud",
    "logo": "https://cdn.simpleicons.org/googlecloud",
    "booth": "A-01",
    "category": "Cloud & AI",
    "visits": 600,
    "leads": 226,
    "enquiries": 179,
    "teamSize": 10,
    "status": "Setup"
  },
  {
    "id": "exh-1",
    "company": "Amazon Web Services",
    "logo": "https://cdn.simpleicons.org/amazonaws",
    "booth": "A-02",
    "category": "Cloud Infrastructure",
    "visits": 601,
    "leads": 230,
    "enquiries": 114,
    "teamSize": 19,
    "status": "Setup"
  },
  {
    "id": "exh-2",
    "company": "Microsoft",
    "logo": "https://cdn.simpleicons.org/microsoft",
    "booth": "A-03",
    "category": "Cloud & AI",
    "visits": 748,
    "leads": 171,
    "enquiries": 96,
    "teamSize": 11,
    "status": "Setup"
  },
  {
    "id": "exh-3",
    "company": "OpenAI",
    "logo": "https://cdn.simpleicons.org/openai",
    "booth": "A-04",
    "category": "Artificial Intelligence",
    "visits": 351,
    "leads": 282,
    "enquiries": 94,
    "teamSize": 12,
    "status": "Setup"
  },
  {
    "id": "exh-4",
    "company": "Stripe",
    "logo": "https://cdn.simpleicons.org/stripe",
    "booth": "B-01",
    "category": "Payments",
    "visits": 433,
    "leads": 410,
    "enquiries": 92,
    "teamSize": 6,
    "status": "Setup"
  },
  {
    "id": "exh-5",
    "company": "Razorpay",
    "logo": "https://cdn.simpleicons.org/razorpay",
    "booth": "B-02",
    "category": "Payments",
    "visits": 928,
    "leads": 371,
    "enquiries": 65,
    "teamSize": 8,
    "status": "Setup"
  },
  {
    "id": "exh-6",
    "company": "Postman",
    "logo": "https://cdn.simpleicons.org/postman",
    "booth": "B-03",
    "category": "API Platform",
    "visits": 622,
    "leads": 275,
    "enquiries": 121,
    "teamSize": 18,
    "status": "Setup"
  },
  {
    "id": "exh-7",
    "company": "Vercel",
    "logo": "https://cdn.simpleicons.org/vercel",
    "booth": "B-04",
    "category": "Web Framework",
    "visits": 817,
    "leads": 172,
    "enquiries": 94,
    "teamSize": 8,
    "status": "Setup"
  },
  {
    "id": "exh-8",
    "company": "Databricks",
    "logo": "https://cdn.simpleicons.org/databricks",
    "booth": "C-01",
    "category": "Data & Analytics",
    "visits": 950,
    "leads": 258,
    "enquiries": 96,
    "teamSize": 12,
    "status": "Setup"
  },
  {
    "id": "exh-9",
    "company": "Anthropic",
    "logo": "https://cdn.simpleicons.org/anthropic",
    "booth": "C-02",
    "category": "Artificial Intelligence",
    "visits": 504,
    "leads": 380,
    "enquiries": 184,
    "teamSize": 16,
    "status": "Setup"
  },
  {
    "id": "exh-10",
    "company": "Zoho",
    "logo": "https://cdn.simpleicons.org/zoho",
    "booth": "C-03",
    "category": "SaaS",
    "visits": 935,
    "leads": 309,
    "enquiries": 84,
    "teamSize": 14,
    "status": "Setup"
  },
  {
    "id": "exh-11",
    "company": "Freshworks",
    "logo": "https://cdn.simpleicons.org/freshworks",
    "booth": "C-04",
    "category": "SaaS",
    "visits": 484,
    "leads": 232,
    "enquiries": 78,
    "teamSize": 20,
    "status": "Setup"
  },
  {
    "id": "exh-12",
    "company": "Atlassian",
    "logo": "https://cdn.simpleicons.org/atlassian",
    "booth": "D-01",
    "category": "SaaS",
    "visits": 850,
    "leads": 212,
    "enquiries": 56,
    "teamSize": 17,
    "status": "Setup"
  },
  {
    "id": "exh-13",
    "company": "Salesforce",
    "logo": "https://cdn.simpleicons.org/salesforce",
    "booth": "D-02",
    "category": "Enterprise Software",
    "visits": 471,
    "leads": 160,
    "enquiries": 117,
    "teamSize": 8,
    "status": "Setup"
  },
  {
    "id": "exh-14",
    "company": "Adobe",
    "logo": "https://cdn.simpleicons.org/adobe",
    "booth": "D-03",
    "category": "Enterprise Software",
    "visits": 396,
    "leads": 323,
    "enquiries": 65,
    "teamSize": 8,
    "status": "Setup"
  },
  {
    "id": "exh-15",
    "company": "Infosys",
    "logo": "https://cdn.simpleicons.org/infosys",
    "booth": "E-01",
    "category": "IT Services",
    "visits": 1270,
    "leads": 443,
    "enquiries": 75,
    "teamSize": 11,
    "status": "Setup"
  },
  {
    "id": "exh-16",
    "company": "TCS",
    "logo": "https://cdn.simpleicons.org/tata",
    "booth": "E-02",
    "category": "IT Services",
    "visits": 799,
    "leads": 237,
    "enquiries": 88,
    "teamSize": 6,
    "status": "Setup"
  },
  {
    "id": "exh-17",
    "company": "Wipro",
    "logo": "https://cdn.simpleicons.org/wipro",
    "booth": "E-03",
    "category": "IT Services",
    "visits": 1437,
    "leads": 424,
    "enquiries": 82,
    "teamSize": 16,
    "status": "Setup"
  },
  {
    "id": "exh-18",
    "company": "Tech Mahindra",
    "logo": "https://cdn.simpleicons.org/techmahindra",
    "booth": "E-04",
    "category": "IT Services",
    "visits": 597,
    "leads": 317,
    "enquiries": 72,
    "teamSize": 15,
    "status": "Setup"
  },
  {
    "id": "exh-19",
    "company": "HCLTech",
    "logo": "https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818",
    "booth": "E-05",
    "category": "IT Services",
    "visits": 1007,
    "leads": 187,
    "enquiries": 110,
    "teamSize": 17,
    "status": "Setup"
  },
  {
    "id": "exh-20",
    "company": "Cognizant",
    "logo": "https://cdn.simpleicons.org/cognizant",
    "booth": "E-06",
    "category": "IT Services",
    "visits": 971,
    "leads": 202,
    "enquiries": 192,
    "teamSize": 17,
    "status": "Setup"
  },
  {
    "id": "exh-21",
    "company": "Accenture",
    "logo": "https://cdn.simpleicons.org/accenture",
    "booth": "E-07",
    "category": "IT Services",
    "visits": 607,
    "leads": 394,
    "enquiries": 143,
    "teamSize": 15,
    "status": "Setup"
  },
  {
    "id": "exh-22",
    "company": "IBM",
    "logo": "https://cdn.simpleicons.org/ibm",
    "booth": "E-08",
    "category": "IT Services",
    "visits": 758,
    "leads": 446,
    "enquiries": 130,
    "teamSize": 15,
    "status": "Setup"
  },
  {
    "id": "exh-23",
    "company": "Capgemini",
    "logo": "https://cdn.simpleicons.org/capgemini",
    "booth": "E-09",
    "category": "IT Services",
    "visits": 439,
    "leads": 312,
    "enquiries": 190,
    "teamSize": 19,
    "status": "Setup"
  },
  {
    "id": "exh-24",
    "company": "Oracle",
    "logo": "https://cdn.simpleicons.org/oracle",
    "booth": "E-10",
    "category": "Cloud Infrastructure",
    "visits": 519,
    "leads": 124,
    "enquiries": 99,
    "teamSize": 11,
    "status": "Setup"
  },
  {
    "id": "exh-25",
    "company": "Intel",
    "logo": "https://cdn.simpleicons.org/intel",
    "booth": "F-01",
    "category": "Hardware & AI",
    "visits": 580,
    "leads": 125,
    "enquiries": 186,
    "teamSize": 7,
    "status": "Setup"
  },
  {
    "id": "exh-26",
    "company": "NVIDIA",
    "logo": "https://cdn.simpleicons.org/nvidia",
    "booth": "F-02",
    "category": "Hardware & AI",
    "visits": 468,
    "leads": 441,
    "enquiries": 160,
    "teamSize": 13,
    "status": "Setup"
  },
  {
    "id": "exh-27",
    "company": "AMD",
    "logo": "https://cdn.simpleicons.org/amd",
    "booth": "F-03",
    "category": "Hardware & AI",
    "visits": 463,
    "leads": 214,
    "enquiries": 106,
    "teamSize": 5,
    "status": "Setup"
  },
  {
    "id": "exh-28",
    "company": "Qualcomm",
    "logo": "https://cdn.simpleicons.org/qualcomm",
    "booth": "F-04",
    "category": "Hardware & AI",
    "visits": 942,
    "leads": 304,
    "enquiries": 165,
    "teamSize": 16,
    "status": "Setup"
  },
  {
    "id": "exh-29",
    "company": "Cisco",
    "logo": "https://cdn.simpleicons.org/cisco",
    "booth": "F-05",
    "category": "Enterprise Networking",
    "visits": 1196,
    "leads": 156,
    "enquiries": 133,
    "teamSize": 14,
    "status": "Setup"
  }
];

export const GENERATED_PRODUCTS: Product[] = [
  {
    "id": "prod-googlecloud-0",
    "name": "Vertex AI",
    "tagline": "Enterprise Generative AI Platform",
    "company": "Google Cloud",
    "category": "Cloud & AI",
    "booth": "A-01",
    "image": "https://cdn.simpleicons.org/googlecloud",
    "views": 900,
    "enquiries": 10,
    "interestedVisitorsCount": 118,
    "overview": "Platform for building, deploying and scaling AI.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-googlecloud-1",
    "name": "BigQuery",
    "tagline": "Serverless Enterprise Data Warehouse",
    "company": "Google Cloud",
    "category": "Cloud & AI",
    "booth": "A-01",
    "image": "https://cdn.simpleicons.org/googlecloud",
    "views": 918,
    "enquiries": 26,
    "interestedVisitorsCount": 74,
    "overview": "Highly scalable, cost-effective, and serverless data warehouse.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-googlecloud-2",
    "name": "Google Kubernetes Engine",
    "tagline": "Managed Kubernetes",
    "company": "Google Cloud",
    "category": "Cloud & AI",
    "booth": "A-01",
    "image": "https://cdn.simpleicons.org/googlecloud",
    "views": 612,
    "enquiries": 48,
    "interestedVisitorsCount": 125,
    "overview": "Secure and managed Kubernetes service with automated operations.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amazonaws-0",
    "name": "Amazon SageMaker",
    "tagline": "Build, train, and deploy ML models",
    "company": "Amazon Web Services",
    "category": "Cloud Infrastructure",
    "booth": "A-02",
    "image": "https://cdn.simpleicons.org/amazonaws",
    "views": 264,
    "enquiries": 81,
    "interestedVisitorsCount": 42,
    "overview": "Fully managed machine learning service.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amazonaws-1",
    "name": "Amazon EC2",
    "tagline": "Secure and resizable compute capacity",
    "company": "Amazon Web Services",
    "category": "Cloud Infrastructure",
    "booth": "A-02",
    "image": "https://cdn.simpleicons.org/amazonaws",
    "views": 905,
    "enquiries": 60,
    "interestedVisitorsCount": 39,
    "overview": "Virtual servers in the cloud to run your applications.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amazonaws-2",
    "name": "Amazon S3",
    "tagline": "Object storage built to retrieve any amount of data",
    "company": "Amazon Web Services",
    "category": "Cloud Infrastructure",
    "booth": "A-02",
    "image": "https://cdn.simpleicons.org/amazonaws",
    "views": 224,
    "enquiries": 66,
    "interestedVisitorsCount": 100,
    "overview": "Industry-leading scalability, data availability, and security.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-microsoft-0",
    "name": "GitHub Copilot",
    "tagline": "Your AI pair programmer",
    "company": "Microsoft",
    "category": "Cloud & AI",
    "booth": "A-03",
    "image": "https://cdn.simpleicons.org/microsoft",
    "views": 638,
    "enquiries": 64,
    "interestedVisitorsCount": 84,
    "overview": "AI pair programmer that offers autocomplete-style suggestions as you code.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {
      "websiteUrl": "https://example.com",
      "brochureUrl": "https://github.com/features/copilot/copilot-enterprise-brochure.pdf"
    }
  },
  {
    "id": "prod-microsoft-1",
    "name": "Azure OpenAI Service",
    "tagline": "Advanced language models",
    "company": "Microsoft",
    "category": "Cloud & AI",
    "booth": "A-03",
    "image": "https://cdn.simpleicons.org/microsoft",
    "views": 854,
    "enquiries": 14,
    "interestedVisitorsCount": 82,
    "overview": "Access OpenAI models securely with Azure's enterprise-grade capabilities.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-microsoft-2",
    "name": "Microsoft Fabric",
    "tagline": "Unified data analytics",
    "company": "Microsoft",
    "category": "Cloud & AI",
    "booth": "A-03",
    "image": "https://cdn.simpleicons.org/microsoft",
    "views": 429,
    "enquiries": 77,
    "interestedVisitorsCount": 137,
    "overview": "An end-to-end analytics platform that brings together all data tools.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-microsoft-3",
    "name": "Surface Pro 10",
    "tagline": "The ultimate 2-in-1 AI PC for business",
    "company": "Microsoft",
    "category": "Hardware",
    "booth": "B-14",
    "image": "https://cdn.simpleicons.org/microsoft",
    "views": 1056,
    "enquiries": 120,
    "interestedVisitorsCount": 204,
    "overview": "Unlock AI capabilities with the most versatile Surface yet.",
    "features": ["Intel Core Ultra", "NPU for AI", "All-day Battery"],
    "benefits": ["Mobility", "Performance", "Security"],
    "useCases": ["Field Work", "Executives", "Design"],
    "resources": {"websiteUrl": "https://microsoft.com/surface"}
  },
  {
    "id": "prod-microsoft-4",
    "name": "Microsoft 365 Copilot",
    "tagline": "Your everyday AI companion",
    "company": "Microsoft",
    "category": "Productivity",
    "booth": "B-14",
    "image": "https://cdn.simpleicons.org/microsoft",
    "views": 2100,
    "enquiries": 340,
    "interestedVisitorsCount": 500,
    "overview": "Copilot integrates into Word, Excel, PowerPoint, Outlook, and Teams.",
    "features": ["Contextual AI", "Enterprise Security", "Cross-app intelligence"],
    "benefits": ["Time Savings", "Creativity", "Data Privacy"],
    "useCases": ["Information Workers", "Marketing", "Finance"],
    "resources": {"websiteUrl": "https://microsoft.com/microsoft-365"}
  },
  {
    "id": "prod-openai-0",
    "name": "ChatGPT Enterprise",
    "tagline": "Enterprise-grade AI assistant",
    "company": "OpenAI",
    "category": "Artificial Intelligence",
    "booth": "A-04",
    "image": "https://cdn.simpleicons.org/openai",
    "views": 964,
    "enquiries": 50,
    "interestedVisitorsCount": 93,
    "overview": "The most powerful version of ChatGPT yet, with enterprise security.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-openai-1",
    "name": "OpenAI API",
    "tagline": "Access the world's most capable models",
    "company": "OpenAI",
    "category": "Artificial Intelligence",
    "booth": "A-04",
    "image": "https://cdn.simpleicons.org/openai",
    "views": 912,
    "enquiries": 62,
    "interestedVisitorsCount": 96,
    "overview": "Integrate advanced AI models directly into your products.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-openai-2",
    "name": "Sora",
    "tagline": "Creating video from text",
    "company": "OpenAI",
    "category": "Artificial Intelligence",
    "booth": "A-04",
    "image": "https://cdn.simpleicons.org/openai",
    "views": 874,
    "enquiries": 30,
    "interestedVisitorsCount": 74,
    "overview": "An AI model that can create realistic and imaginative scenes from text.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-stripe-0",
    "name": "Stripe Checkout",
    "tagline": "Optimized payment flow",
    "company": "Stripe",
    "category": "Payments",
    "booth": "B-01",
    "image": "https://cdn.simpleicons.org/stripe",
    "views": 903,
    "enquiries": 94,
    "interestedVisitorsCount": 37,
    "overview": "A prebuilt, hosted payment page optimized for conversion.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-stripe-1",
    "name": "Stripe Billing",
    "tagline": "Smart subscriptions and billing",
    "company": "Stripe",
    "category": "Payments",
    "booth": "B-01",
    "image": "https://cdn.simpleicons.org/stripe",
    "views": 319,
    "enquiries": 91,
    "interestedVisitorsCount": 126,
    "overview": "Build and scale your recurring revenue business.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-stripe-2",
    "name": "Stripe Connect",
    "tagline": "Payments for platforms and marketplaces",
    "company": "Stripe",
    "category": "Payments",
    "booth": "B-01",
    "image": "https://cdn.simpleicons.org/stripe",
    "views": 893,
    "enquiries": 80,
    "interestedVisitorsCount": 127,
    "overview": "Route funds, onboard users, and handle compliance globally.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-razorpay-0",
    "name": "RazorpayX",
    "tagline": "Business banking hub",
    "company": "Razorpay",
    "category": "Payments",
    "booth": "B-02",
    "image": "https://cdn.simpleicons.org/razorpay",
    "views": 331,
    "enquiries": 10,
    "interestedVisitorsCount": 62,
    "overview": "Supercharge your business banking with automated payouts.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-razorpay-1",
    "name": "Payment Gateway",
    "tagline": "Accept online payments",
    "company": "Razorpay",
    "category": "Payments",
    "booth": "B-02",
    "image": "https://cdn.simpleicons.org/razorpay",
    "views": 300,
    "enquiries": 18,
    "interestedVisitorsCount": 22,
    "overview": "Fastest and safest way to accept payments online in India.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-razorpay-2",
    "name": "Razorpay Payroll",
    "tagline": "Automated payroll processing",
    "company": "Razorpay",
    "category": "Payments",
    "booth": "B-02",
    "image": "https://cdn.simpleicons.org/razorpay",
    "views": 670,
    "enquiries": 79,
    "interestedVisitorsCount": 79,
    "overview": "Manage compliance, taxes, and salary disbursements in one click.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-postman-0",
    "name": "Postman Enterprise",
    "tagline": "The API platform for developers",
    "company": "Postman",
    "category": "API Platform",
    "booth": "B-03",
    "image": "https://cdn.simpleicons.org/postman",
    "views": 977,
    "enquiries": 62,
    "interestedVisitorsCount": 62,
    "overview": "Comprehensive platform for building and using APIs.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-postman-1",
    "name": "Postman API Network",
    "tagline": "Discover public APIs",
    "company": "Postman",
    "category": "API Platform",
    "booth": "B-03",
    "image": "https://cdn.simpleicons.org/postman",
    "views": 275,
    "enquiries": 72,
    "interestedVisitorsCount": 101,
    "overview": "The world's largest public directory of APIs and workspaces.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-postman-2",
    "name": "Postman CLI",
    "tagline": "Command-line companion",
    "company": "Postman",
    "category": "API Platform",
    "booth": "B-03",
    "image": "https://cdn.simpleicons.org/postman",
    "views": 205,
    "enquiries": 33,
    "interestedVisitorsCount": 94,
    "overview": "Automate API tests and integrate with CI/CD pipelines.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-vercel-0",
    "name": "Next.js 14",
    "tagline": "The React Framework",
    "company": "Vercel",
    "category": "Web Framework",
    "booth": "B-04",
    "image": "https://cdn.simpleicons.org/vercel",
    "views": 243,
    "enquiries": 58,
    "interestedVisitorsCount": 33,
    "overview": "Build highly interactive web applications instantly.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-vercel-1",
    "name": "Vercel Edge Functions",
    "tagline": "Compute at the edge",
    "company": "Vercel",
    "category": "Web Framework",
    "booth": "B-04",
    "image": "https://cdn.simpleicons.org/vercel",
    "views": 972,
    "enquiries": 39,
    "interestedVisitorsCount": 20,
    "overview": "Run server-side logic close to your users globally.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-vercel-2",
    "name": "v0 by Vercel",
    "tagline": "Generative UI",
    "company": "Vercel",
    "category": "Web Framework",
    "booth": "B-04",
    "image": "https://cdn.simpleicons.org/vercel",
    "views": 985,
    "enquiries": 100,
    "interestedVisitorsCount": 149,
    "overview": "Generate tailored React components with AI in seconds.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-databricks-0",
    "name": "Data Intelligence Platform",
    "tagline": "Unified data + AI platform",
    "company": "Databricks",
    "category": "Data & Analytics",
    "booth": "C-01",
    "image": "https://cdn.simpleicons.org/databricks",
    "views": 209,
    "enquiries": 49,
    "interestedVisitorsCount": 97,
    "overview": "Built on a lakehouse architecture for big data processing.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-databricks-1",
    "name": "Delta Lake",
    "tagline": "Open source storage layer",
    "company": "Databricks",
    "category": "Data & Analytics",
    "booth": "C-01",
    "image": "https://cdn.simpleicons.org/databricks",
    "views": 848,
    "enquiries": 51,
    "interestedVisitorsCount": 116,
    "overview": "Brings reliability to data lakes with ACID transactions.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-databricks-2",
    "name": "Databricks SQL",
    "tagline": "Serverless data warehouse",
    "company": "Databricks",
    "category": "Data & Analytics",
    "booth": "C-01",
    "image": "https://cdn.simpleicons.org/databricks",
    "views": 721,
    "enquiries": 53,
    "interestedVisitorsCount": 83,
    "overview": "Run all your SQL workloads directly on your data lake.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-anthropic-0",
    "name": "Claude 3.5 Sonnet",
    "tagline": "Advanced AI model",
    "company": "Anthropic",
    "category": "Artificial Intelligence",
    "booth": "C-02",
    "image": "https://cdn.simpleicons.org/anthropic",
    "views": 790,
    "enquiries": 60,
    "interestedVisitorsCount": 94,
    "overview": "Industry-leading intelligence with enhanced coding capabilities.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-anthropic-1",
    "name": "Claude 3 Opus",
    "tagline": "Most capable model",
    "company": "Anthropic",
    "category": "Artificial Intelligence",
    "booth": "C-02",
    "image": "https://cdn.simpleicons.org/anthropic",
    "views": 548,
    "enquiries": 19,
    "interestedVisitorsCount": 109,
    "overview": "Anthropic's most powerful AI for complex reasoning tasks.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-anthropic-2",
    "name": "Claude 3 Haiku",
    "tagline": "Fastest and most compact",
    "company": "Anthropic",
    "category": "Artificial Intelligence",
    "booth": "C-02",
    "image": "https://cdn.simpleicons.org/anthropic",
    "views": 581,
    "enquiries": 96,
    "interestedVisitorsCount": 90,
    "overview": "Lightning-fast responsiveness for near-instant answers.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-zoho-0",
    "name": "Zoho One",
    "tagline": "Operating system for business",
    "company": "Zoho",
    "category": "SaaS",
    "booth": "C-03",
    "image": "https://cdn.simpleicons.org/zoho",
    "views": 224,
    "enquiries": 50,
    "interestedVisitorsCount": 29,
    "overview": "A comprehensive suite of 40+ business applications.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-zoho-1",
    "name": "Zoho CRM",
    "tagline": "Close more deals",
    "company": "Zoho",
    "category": "SaaS",
    "booth": "C-03",
    "image": "https://cdn.simpleicons.org/zoho",
    "views": 752,
    "enquiries": 97,
    "interestedVisitorsCount": 47,
    "overview": "Empower your sales team with AI-driven insights.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-zoho-2",
    "name": "Zoho Desk",
    "tagline": "Customer service software",
    "company": "Zoho",
    "category": "SaaS",
    "booth": "C-03",
    "image": "https://cdn.simpleicons.org/zoho",
    "views": 745,
    "enquiries": 82,
    "interestedVisitorsCount": 59,
    "overview": "Context-aware customer service desk software.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-freshworks-0",
    "name": "Freshdesk Omni",
    "tagline": "Customer service software",
    "company": "Freshworks",
    "category": "SaaS",
    "booth": "C-04",
    "image": "https://cdn.simpleicons.org/freshworks",
    "views": 752,
    "enquiries": 58,
    "interestedVisitorsCount": 38,
    "overview": "Omnichannel customer service platform powered by AI.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-freshworks-1",
    "name": "Freshsales",
    "tagline": "Sales CRM",
    "company": "Freshworks",
    "category": "SaaS",
    "booth": "C-04",
    "image": "https://cdn.simpleicons.org/freshworks",
    "views": 719,
    "enquiries": 24,
    "interestedVisitorsCount": 103,
    "overview": "Context-driven sales CRM to grow revenue faster.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-freshworks-2",
    "name": "Freshservice",
    "tagline": "IT service management",
    "company": "Freshworks",
    "category": "SaaS",
    "booth": "C-04",
    "image": "https://cdn.simpleicons.org/freshworks",
    "views": 747,
    "enquiries": 17,
    "interestedVisitorsCount": 108,
    "overview": "Right-sized IT service management that works out of the box.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-atlassian-0",
    "name": "Jira Software",
    "tagline": "Project and issue tracking",
    "company": "Atlassian",
    "category": "SaaS",
    "booth": "D-01",
    "image": "https://cdn.simpleicons.org/atlassian",
    "views": 325,
    "enquiries": 18,
    "interestedVisitorsCount": 110,
    "overview": "The #1 software development tool used by agile teams.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-atlassian-1",
    "name": "Confluence",
    "tagline": "Team workspace",
    "company": "Atlassian",
    "category": "SaaS",
    "booth": "D-01",
    "image": "https://cdn.simpleicons.org/atlassian",
    "views": 783,
    "enquiries": 55,
    "interestedVisitorsCount": 75,
    "overview": "Remote-friendly team workspace where knowledge and collaboration meet.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-atlassian-2",
    "name": "Trello",
    "tagline": "Visual collaboration",
    "company": "Atlassian",
    "category": "SaaS",
    "booth": "D-01",
    "image": "https://cdn.simpleicons.org/atlassian",
    "views": 296,
    "enquiries": 39,
    "interestedVisitorsCount": 58,
    "overview": "Manage projects and organize anything, instantly.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-salesforce-0",
    "name": "Einstein 1 Platform",
    "tagline": "Trusted AI for CRM",
    "company": "Salesforce",
    "category": "Enterprise Software",
    "booth": "D-02",
    "image": "https://cdn.simpleicons.org/salesforce",
    "views": 246,
    "enquiries": 80,
    "interestedVisitorsCount": 74,
    "overview": "Integrated AI across the entire customer 360 platform.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-salesforce-1",
    "name": "Sales Cloud",
    "tagline": "Grow sales faster",
    "company": "Salesforce",
    "category": "Enterprise Software",
    "booth": "D-02",
    "image": "https://cdn.simpleicons.org/salesforce",
    "views": 451,
    "enquiries": 94,
    "interestedVisitorsCount": 30,
    "overview": "The world's leading sales force automation solution.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-salesforce-2",
    "name": "Service Cloud",
    "tagline": "Service from anywhere",
    "company": "Salesforce",
    "category": "Enterprise Software",
    "booth": "D-02",
    "image": "https://cdn.simpleicons.org/salesforce",
    "views": 731,
    "enquiries": 59,
    "interestedVisitorsCount": 101,
    "overview": "Deliver personalized support across every channel.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-adobe-0",
    "name": "Adobe Firefly",
    "tagline": "Generative AI for creators",
    "company": "Adobe",
    "category": "Enterprise Software",
    "booth": "D-03",
    "image": "https://cdn.simpleicons.org/adobe",
    "views": 561,
    "enquiries": 10,
    "interestedVisitorsCount": 141,
    "overview": "Creative generative AI models designed for commercial safe use.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-adobe-1",
    "name": "Creative Cloud",
    "tagline": "All creative apps",
    "company": "Adobe",
    "category": "Enterprise Software",
    "booth": "D-03",
    "image": "https://cdn.simpleicons.org/adobe",
    "views": 393,
    "enquiries": 74,
    "interestedVisitorsCount": 106,
    "overview": "Get 20+ creative apps including Photoshop and Illustrator.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-adobe-2",
    "name": "Experience Manager",
    "tagline": "Content management",
    "company": "Adobe",
    "category": "Enterprise Software",
    "booth": "D-03",
    "image": "https://cdn.simpleicons.org/adobe",
    "views": 896,
    "enquiries": 97,
    "interestedVisitorsCount": 88,
    "overview": "Combine digital asset management and a powerful CMS.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-infosys-0",
    "name": "Infosys Topaz",
    "tagline": "AI-first set of services",
    "company": "Infosys",
    "category": "IT Services",
    "booth": "E-01",
    "image": "https://cdn.simpleicons.org/infosys",
    "views": 557,
    "enquiries": 10,
    "interestedVisitorsCount": 135,
    "overview": "An AI-first suite utilizing generative AI technologies.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-infosys-1",
    "name": "Infosys Cobalt",
    "tagline": "Cloud services",
    "company": "Infosys",
    "category": "IT Services",
    "booth": "E-01",
    "image": "https://cdn.simpleicons.org/infosys",
    "views": 754,
    "enquiries": 62,
    "interestedVisitorsCount": 78,
    "overview": "A set of services, solutions and platforms for enterprises.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-infosys-2",
    "name": "Infosys Finacle",
    "tagline": "Digital banking",
    "company": "Infosys",
    "category": "IT Services",
    "booth": "E-01",
    "image": "https://cdn.simpleicons.org/infosys",
    "views": 253,
    "enquiries": 92,
    "interestedVisitorsCount": 138,
    "overview": "Industry-leading digital banking solution suite.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-tata-0",
    "name": "TCS BaNCS",
    "tagline": "Core banking software",
    "company": "TCS",
    "category": "IT Services",
    "booth": "E-02",
    "image": "https://cdn.simpleicons.org/tata",
    "views": 648,
    "enquiries": 86,
    "interestedVisitorsCount": 70,
    "overview": "Comprehensive core banking platform for financial institutions.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-tata-1",
    "name": "TCS ignio",
    "tagline": "AIOps software",
    "company": "TCS",
    "category": "IT Services",
    "booth": "E-02",
    "image": "https://cdn.simpleicons.org/tata",
    "views": 857,
    "enquiries": 71,
    "interestedVisitorsCount": 81,
    "overview": "Closed-loop, autonomous enterprise IT operations.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-tata-2",
    "name": "TCS TwinX",
    "tagline": "Enterprise digital twin",
    "company": "TCS",
    "category": "IT Services",
    "booth": "E-02",
    "image": "https://cdn.simpleicons.org/tata",
    "views": 637,
    "enquiries": 55,
    "interestedVisitorsCount": 114,
    "overview": "AI-powered digital twin solution for business experimentation.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-wipro-0",
    "name": "Wipro Holmes",
    "tagline": "AI and Automation",
    "company": "Wipro",
    "category": "IT Services",
    "booth": "E-03",
    "image": "https://cdn.simpleicons.org/wipro",
    "views": 241,
    "enquiries": 36,
    "interestedVisitorsCount": 34,
    "overview": "Artificial intelligence and automation platform.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-wipro-1",
    "name": "Wipro FullStride",
    "tagline": "Cloud services",
    "company": "Wipro",
    "category": "IT Services",
    "booth": "E-03",
    "image": "https://cdn.simpleicons.org/wipro",
    "views": 732,
    "enquiries": 95,
    "interestedVisitorsCount": 62,
    "overview": "End-to-end cloud transformation services.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-wipro-2",
    "name": "CyberSecurists",
    "tagline": "Cybersecurity services",
    "company": "Wipro",
    "category": "IT Services",
    "booth": "E-03",
    "image": "https://cdn.simpleicons.org/wipro",
    "views": 553,
    "enquiries": 42,
    "interestedVisitorsCount": 68,
    "overview": "Enterprise security and risk management.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-techmahindra-0",
    "name": "netOps.ai",
    "tagline": "Network automation",
    "company": "Tech Mahindra",
    "category": "IT Services",
    "booth": "E-04",
    "image": "https://cdn.simpleicons.org/techmahindra",
    "views": 645,
    "enquiries": 74,
    "interestedVisitorsCount": 24,
    "overview": "Telco network automation and managed services platform.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-techmahindra-1",
    "name": "TechM amplifAI",
    "tagline": "AI suite",
    "company": "Tech Mahindra",
    "category": "IT Services",
    "booth": "E-04",
    "image": "https://cdn.simpleicons.org/techmahindra",
    "views": 294,
    "enquiries": 60,
    "interestedVisitorsCount": 135,
    "overview": "Comprehensive suite of AI offerings and platforms.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-techmahindra-2",
    "name": "BPS",
    "tagline": "Business Process Services",
    "company": "Tech Mahindra",
    "category": "IT Services",
    "booth": "E-04",
    "image": "https://cdn.simpleicons.org/techmahindra",
    "views": 867,
    "enquiries": 84,
    "interestedVisitorsCount": 84,
    "overview": "Next-gen customer experience and back-office solutions.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-hcl-0",
    "name": "HCLSoftware",
    "tagline": "Enterprise software portfolio",
    "company": "HCLTech",
    "category": "IT Services",
    "booth": "E-05",
    "image": "https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818",
    "views": 424,
    "enquiries": 36,
    "interestedVisitorsCount": 37,
    "overview": "Software products for automation, digital transformation, and more.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-hcl-1",
    "name": "DryICE",
    "tagline": "Autonomics & Orchestration",
    "company": "HCLTech",
    "category": "IT Services",
    "booth": "E-05",
    "image": "https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818",
    "views": 405,
    "enquiries": 21,
    "interestedVisitorsCount": 100,
    "overview": "AI-driven enterprise automation framework.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-hcl-2",
    "name": "CloudSmart",
    "tagline": "Cloud consulting",
    "company": "HCLTech",
    "category": "IT Services",
    "booth": "E-05",
    "image": "https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818",
    "views": 407,
    "enquiries": 24,
    "interestedVisitorsCount": 139,
    "overview": "Comprehensive suite of cloud consulting services.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cognizant-0",
    "name": "Neuro AI",
    "tagline": "Enterprise AI platform",
    "company": "Cognizant",
    "category": "IT Services",
    "booth": "E-06",
    "image": "https://cdn.simpleicons.org/cognizant",
    "views": 429,
    "enquiries": 60,
    "interestedVisitorsCount": 69,
    "overview": "Accelerates the adoption of generative AI in enterprises.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cognizant-1",
    "name": "TriZetto",
    "tagline": "Healthcare IT",
    "company": "Cognizant",
    "category": "IT Services",
    "booth": "E-06",
    "image": "https://cdn.simpleicons.org/cognizant",
    "views": 505,
    "enquiries": 47,
    "interestedVisitorsCount": 129,
    "overview": "Software solutions for the healthcare industry.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cognizant-2",
    "name": "NetCentric",
    "tagline": "Digital experience",
    "company": "Cognizant",
    "category": "IT Services",
    "booth": "E-06",
    "image": "https://cdn.simpleicons.org/cognizant",
    "views": 508,
    "enquiries": 58,
    "interestedVisitorsCount": 35,
    "overview": "Digital marketing and experience management.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-accenture-0",
    "name": "myWizard",
    "tagline": "Intelligent automation",
    "company": "Accenture",
    "category": "IT Services",
    "booth": "E-07",
    "image": "https://cdn.simpleicons.org/accenture",
    "views": 441,
    "enquiries": 15,
    "interestedVisitorsCount": 144,
    "overview": "Platform for intelligent IT operations and automation.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-accenture-1",
    "name": "Cloud First",
    "tagline": "Cloud migration",
    "company": "Accenture",
    "category": "IT Services",
    "booth": "E-07",
    "image": "https://cdn.simpleicons.org/accenture",
    "views": 223,
    "enquiries": 42,
    "interestedVisitorsCount": 104,
    "overview": "Accelerated cloud transformation services.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-accenture-2",
    "name": "Accenture Song",
    "tagline": "Digital marketing",
    "company": "Accenture",
    "category": "IT Services",
    "booth": "E-07",
    "image": "https://cdn.simpleicons.org/accenture",
    "views": 500,
    "enquiries": 90,
    "interestedVisitorsCount": 83,
    "overview": "Tech-powered creative group and marketing agency.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-ibm-0",
    "name": "IBM watsonx",
    "tagline": "AI and data platform",
    "company": "IBM",
    "category": "IT Services",
    "booth": "E-08",
    "image": "https://cdn.simpleicons.org/ibm",
    "views": 367,
    "enquiries": 67,
    "interestedVisitorsCount": 119,
    "overview": "Next generation AI and data platform for enterprise.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-ibm-1",
    "name": "IBM Cloud",
    "tagline": "Secure open cloud",
    "company": "IBM",
    "category": "IT Services",
    "booth": "E-08",
    "image": "https://cdn.simpleicons.org/ibm",
    "views": 758,
    "enquiries": 78,
    "interestedVisitorsCount": 50,
    "overview": "Full stack cloud platform with 170+ products.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-ibm-2",
    "name": "Red Hat OpenShift",
    "tagline": "Hybrid cloud container platform",
    "company": "IBM",
    "category": "IT Services",
    "booth": "E-08",
    "image": "https://cdn.simpleicons.org/ibm",
    "views": 494,
    "enquiries": 65,
    "interestedVisitorsCount": 96,
    "overview": "The leading enterprise Kubernetes platform.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-capgemini-0",
    "name": "Capgemini Engineering",
    "tagline": "R&D and Engineering",
    "company": "Capgemini",
    "category": "IT Services",
    "booth": "E-09",
    "image": "https://cdn.simpleicons.org/capgemini",
    "views": 378,
    "enquiries": 48,
    "interestedVisitorsCount": 72,
    "overview": "Intelligent industry and engineering research services.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-capgemini-1",
    "name": "Capgemini Invent",
    "tagline": "Digital innovation",
    "company": "Capgemini",
    "category": "IT Services",
    "booth": "E-09",
    "image": "https://cdn.simpleicons.org/capgemini",
    "views": 905,
    "enquiries": 36,
    "interestedVisitorsCount": 104,
    "overview": "Digital innovation, consulting and transformation brand.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-capgemini-2",
    "name": "Cloud Platform",
    "tagline": "Cloud services",
    "company": "Capgemini",
    "category": "IT Services",
    "booth": "E-09",
    "image": "https://cdn.simpleicons.org/capgemini",
    "views": 866,
    "enquiries": 41,
    "interestedVisitorsCount": 93,
    "overview": "End-to-end cloud solutions tailored for enterprises.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-oracle-0",
    "name": "OCI Generative AI",
    "tagline": "Enterprise generative AI",
    "company": "Oracle",
    "category": "Cloud Infrastructure",
    "booth": "E-10",
    "image": "https://cdn.simpleicons.org/oracle",
    "views": 234,
    "enquiries": 64,
    "interestedVisitorsCount": 27,
    "overview": "Fully managed service providing LLMs.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-oracle-1",
    "name": "Autonomous Database",
    "tagline": "Self-driving database",
    "company": "Oracle",
    "category": "Cloud Infrastructure",
    "booth": "E-10",
    "image": "https://cdn.simpleicons.org/oracle",
    "views": 463,
    "enquiries": 55,
    "interestedVisitorsCount": 96,
    "overview": "Cloud database that uses machine learning to automate tuning.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-oracle-2",
    "name": "NetSuite",
    "tagline": "Cloud ERP",
    "company": "Oracle",
    "category": "Cloud Infrastructure",
    "booth": "E-10",
    "image": "https://cdn.simpleicons.org/oracle",
    "views": 693,
    "enquiries": 71,
    "interestedVisitorsCount": 69,
    "overview": "Leading cloud business software suite.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-intel-0",
    "name": "Intel Gaudi 3",
    "tagline": "AI accelerator",
    "company": "Intel",
    "category": "Hardware & AI",
    "booth": "F-01",
    "image": "https://cdn.simpleicons.org/intel",
    "views": 359,
    "enquiries": 46,
    "interestedVisitorsCount": 56,
    "overview": "Advanced AI accelerator for deep learning training and inference.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-intel-1",
    "name": "Xeon Scalable",
    "tagline": "Data center processors",
    "company": "Intel",
    "category": "Hardware & AI",
    "booth": "F-01",
    "image": "https://cdn.simpleicons.org/intel",
    "views": 540,
    "enquiries": 51,
    "interestedVisitorsCount": 150,
    "overview": "Processors with built-in AI acceleration capabilities.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-intel-2",
    "name": "OpenVINO",
    "tagline": "AI inferencing toolkit",
    "company": "Intel",
    "category": "Hardware & AI",
    "booth": "F-01",
    "image": "https://cdn.simpleicons.org/intel",
    "views": 225,
    "enquiries": 69,
    "interestedVisitorsCount": 80,
    "overview": "Optimize and deploy AI inference across hardware.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-nvidia-0",
    "name": "H100 Tensor Core GPU",
    "tagline": "Unprecedented AI performance",
    "company": "NVIDIA",
    "category": "Hardware & AI",
    "booth": "F-02",
    "image": "https://cdn.simpleicons.org/nvidia",
    "views": 989,
    "enquiries": 74,
    "interestedVisitorsCount": 122,
    "overview": "The world's most advanced GPU for enterprise AI workloads.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-nvidia-1",
    "name": "Omniverse",
    "tagline": "3D computing platform",
    "company": "NVIDIA",
    "category": "Hardware & AI",
    "booth": "F-02",
    "image": "https://cdn.simpleicons.org/nvidia",
    "views": 667,
    "enquiries": 95,
    "interestedVisitorsCount": 107,
    "overview": "Platform for developing OpenUSD applications.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-nvidia-2",
    "name": "NVIDIA NIM",
    "tagline": "Inference microservices",
    "company": "NVIDIA",
    "category": "Hardware & AI",
    "booth": "F-02",
    "image": "https://cdn.simpleicons.org/nvidia",
    "views": 821,
    "enquiries": 52,
    "interestedVisitorsCount": 44,
    "overview": "Accelerated AI inference microservices for developers.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amd-0",
    "name": "Instinct MI300X",
    "tagline": "Generative AI accelerator",
    "company": "AMD",
    "category": "Hardware & AI",
    "booth": "F-03",
    "image": "https://cdn.simpleicons.org/amd",
    "views": 542,
    "enquiries": 32,
    "interestedVisitorsCount": 48,
    "overview": "High-performance AI accelerator for large language models.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amd-1",
    "name": "EPYC Processors",
    "tagline": "Server CPUs",
    "company": "AMD",
    "category": "Hardware & AI",
    "booth": "F-03",
    "image": "https://cdn.simpleicons.org/amd",
    "views": 812,
    "enquiries": 76,
    "interestedVisitorsCount": 119,
    "overview": "World's highest performing x86 server processors.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-amd-2",
    "name": "Ryzen AI",
    "tagline": "AI PCs",
    "company": "AMD",
    "category": "Hardware & AI",
    "booth": "F-03",
    "image": "https://cdn.simpleicons.org/amd",
    "views": 837,
    "enquiries": 35,
    "interestedVisitorsCount": 140,
    "overview": "The world's first dedicated AI engine on an x86 processor.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-qualcomm-0",
    "name": "Snapdragon X Elite",
    "tagline": "PC processor",
    "company": "Qualcomm",
    "category": "Hardware & AI",
    "booth": "F-04",
    "image": "https://cdn.simpleicons.org/qualcomm",
    "views": 598,
    "enquiries": 90,
    "interestedVisitorsCount": 41,
    "overview": "ARM-based processor for next-gen AI PCs.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-qualcomm-1",
    "name": "Snapdragon 8 Gen 3",
    "tagline": "Mobile platform",
    "company": "Qualcomm",
    "category": "Hardware & AI",
    "booth": "F-04",
    "image": "https://cdn.simpleicons.org/qualcomm",
    "views": 722,
    "enquiries": 78,
    "interestedVisitorsCount": 65,
    "overview": "Premium mobile platform with on-device AI.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-qualcomm-2",
    "name": "Qualcomm AI Hub",
    "tagline": "Model optimization",
    "company": "Qualcomm",
    "category": "Hardware & AI",
    "booth": "F-04",
    "image": "https://cdn.simpleicons.org/qualcomm",
    "views": 950,
    "enquiries": 81,
    "interestedVisitorsCount": 55,
    "overview": "Library of pre-optimized AI models for Snapdragon.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cisco-0",
    "name": "Webex AI Assistant",
    "tagline": "AI for collaboration",
    "company": "Cisco",
    "category": "Enterprise Networking",
    "booth": "F-05",
    "image": "https://cdn.simpleicons.org/cisco",
    "views": 841,
    "enquiries": 69,
    "interestedVisitorsCount": 69,
    "overview": "Generative AI capabilities built into the Webex platform.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cisco-1",
    "name": "Cisco Meraki",
    "tagline": "Cloud-controlled networking",
    "company": "Cisco",
    "category": "Enterprise Networking",
    "booth": "F-05",
    "image": "https://cdn.simpleicons.org/cisco",
    "views": 737,
    "enquiries": 43,
    "interestedVisitorsCount": 118,
    "overview": "Comprehensive set of solutions managed from the cloud.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  },
  {
    "id": "prod-cisco-2",
    "name": "Cisco Catalyst",
    "tagline": "Enterprise switches",
    "company": "Cisco",
    "category": "Enterprise Networking",
    "booth": "F-05",
    "image": "https://cdn.simpleicons.org/cisco",
    "views": 538,
    "enquiries": 97,
    "interestedVisitorsCount": 124,
    "overview": "Next-generation switching platform for the enterprise.",
    "features": [
      "Enterprise Ready",
      "Highly Scalable",
      "Secure"
    ],
    "benefits": ["Improved Efficiency", "Cost Reduction", "Scalability"],
    "useCases": ["Enterprise IT", "Startups", "Digital Transformation"],
    "resources": {"websiteUrl": "https://example.com"}
  }
];
export const GENERATED_ATTENDEES = generateAttendees(2389);
