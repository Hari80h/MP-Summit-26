import json
import re
import random

companies_data = [
    {
        "company": "Google Cloud", "slug": "googlecloud", "booth": "A-01", "cat": "Cloud & AI",
        "products": [
            {"prod": "Vertex AI", "tagline": "Enterprise Generative AI Platform", "desc": "Platform for building, deploying and scaling AI."},
            {"prod": "BigQuery", "tagline": "Serverless Enterprise Data Warehouse", "desc": "Highly scalable, cost-effective, and serverless data warehouse."},
            {"prod": "Google Kubernetes Engine", "tagline": "Managed Kubernetes", "desc": "Secure and managed Kubernetes service with automated operations."}
        ]
    },
    {
        "company": "Amazon Web Services", "slug": "amazonaws", "booth": "A-02", "cat": "Cloud Infrastructure",
        "products": [
            {"prod": "Amazon SageMaker", "tagline": "Build, train, and deploy ML models", "desc": "Fully managed machine learning service."},
            {"prod": "Amazon EC2", "tagline": "Secure and resizable compute capacity", "desc": "Virtual servers in the cloud to run your applications."},
            {"prod": "Amazon S3", "tagline": "Object storage built to retrieve any amount of data", "desc": "Industry-leading scalability, data availability, and security."}
        ]
    },
    {
        "company": "Microsoft", "slug": "microsoft", "booth": "A-03", "cat": "Cloud & AI",
        "products": [
            {"prod": "GitHub Copilot", "tagline": "Your AI pair programmer", "desc": "AI pair programmer that offers autocomplete-style suggestions as you code."},
            {"prod": "Azure OpenAI Service", "tagline": "Advanced language models", "desc": "Access OpenAI models securely with Azure's enterprise-grade capabilities."},
            {"prod": "Microsoft Fabric", "tagline": "Unified data analytics", "desc": "An end-to-end analytics platform that brings together all data tools."}
        ]
    },
    {
        "company": "OpenAI", "slug": "openai", "booth": "A-04", "cat": "Artificial Intelligence",
        "products": [
            {"prod": "ChatGPT Enterprise", "tagline": "Enterprise-grade AI assistant", "desc": "The most powerful version of ChatGPT yet, with enterprise security."},
            {"prod": "OpenAI API", "tagline": "Access the world's most capable models", "desc": "Integrate advanced AI models directly into your products."},
            {"prod": "Sora", "tagline": "Creating video from text", "desc": "An AI model that can create realistic and imaginative scenes from text."}
        ]
    },
    {
        "company": "Stripe", "slug": "stripe", "booth": "B-01", "cat": "Payments",
        "products": [
            {"prod": "Stripe Checkout", "tagline": "Optimized payment flow", "desc": "A prebuilt, hosted payment page optimized for conversion."},
            {"prod": "Stripe Billing", "tagline": "Smart subscriptions and billing", "desc": "Build and scale your recurring revenue business."},
            {"prod": "Stripe Connect", "tagline": "Payments for platforms and marketplaces", "desc": "Route funds, onboard users, and handle compliance globally."}
        ]
    },
    {
        "company": "Razorpay", "slug": "razorpay", "booth": "B-02", "cat": "Payments",
        "products": [
            {"prod": "RazorpayX", "tagline": "Business banking hub", "desc": "Supercharge your business banking with automated payouts."},
            {"prod": "Payment Gateway", "tagline": "Accept online payments", "desc": "Fastest and safest way to accept payments online in India."},
            {"prod": "Razorpay Payroll", "tagline": "Automated payroll processing", "desc": "Manage compliance, taxes, and salary disbursements in one click."}
        ]
    },
    {
        "company": "Postman", "slug": "postman", "booth": "B-03", "cat": "API Platform",
        "products": [
            {"prod": "Postman Enterprise", "tagline": "The API platform for developers", "desc": "Comprehensive platform for building and using APIs."},
            {"prod": "Postman API Network", "tagline": "Discover public APIs", "desc": "The world's largest public directory of APIs and workspaces."},
            {"prod": "Postman CLI", "tagline": "Command-line companion", "desc": "Automate API tests and integrate with CI/CD pipelines."}
        ]
    },
    {
        "company": "Vercel", "slug": "vercel", "booth": "B-04", "cat": "Web Framework",
        "products": [
            {"prod": "Next.js 14", "tagline": "The React Framework", "desc": "Build highly interactive web applications instantly."},
            {"prod": "Vercel Edge Functions", "tagline": "Compute at the edge", "desc": "Run server-side logic close to your users globally."},
            {"prod": "v0 by Vercel", "tagline": "Generative UI", "desc": "Generate tailored React components with AI in seconds."}
        ]
    },
    {
        "company": "Databricks", "slug": "databricks", "booth": "C-01", "cat": "Data & Analytics",
        "products": [
            {"prod": "Data Intelligence Platform", "tagline": "Unified data + AI platform", "desc": "Built on a lakehouse architecture for big data processing."},
            {"prod": "Delta Lake", "tagline": "Open source storage layer", "desc": "Brings reliability to data lakes with ACID transactions."},
            {"prod": "Databricks SQL", "tagline": "Serverless data warehouse", "desc": "Run all your SQL workloads directly on your data lake."}
        ]
    },
    {
        "company": "Anthropic", "slug": "anthropic", "booth": "C-02", "cat": "Artificial Intelligence",
        "products": [
            {"prod": "Claude 3.5 Sonnet", "tagline": "Advanced AI model", "desc": "Industry-leading intelligence with enhanced coding capabilities."},
            {"prod": "Claude 3 Opus", "tagline": "Most capable model", "desc": "Anthropic's most powerful AI for complex reasoning tasks."},
            {"prod": "Claude 3 Haiku", "tagline": "Fastest and most compact", "desc": "Lightning-fast responsiveness for near-instant answers."}
        ]
    },
    {
        "company": "Zoho", "slug": "zoho", "booth": "C-03", "cat": "SaaS",
        "products": [
            {"prod": "Zoho One", "tagline": "Operating system for business", "desc": "A comprehensive suite of 40+ business applications."},
            {"prod": "Zoho CRM", "tagline": "Close more deals", "desc": "Empower your sales team with AI-driven insights."},
            {"prod": "Zoho Desk", "tagline": "Customer service software", "desc": "Context-aware customer service desk software."}
        ]
    },
    {
        "company": "Freshworks", "slug": "freshworks", "booth": "C-04", "cat": "SaaS",
        "products": [
            {"prod": "Freshdesk Omni", "tagline": "Customer service software", "desc": "Omnichannel customer service platform powered by AI."},
            {"prod": "Freshsales", "tagline": "Sales CRM", "desc": "Context-driven sales CRM to grow revenue faster."},
            {"prod": "Freshservice", "tagline": "IT service management", "desc": "Right-sized IT service management that works out of the box."}
        ]
    },
    {
        "company": "Atlassian", "slug": "atlassian", "booth": "D-01", "cat": "SaaS",
        "products": [
            {"prod": "Jira Software", "tagline": "Project and issue tracking", "desc": "The #1 software development tool used by agile teams."},
            {"prod": "Confluence", "tagline": "Team workspace", "desc": "Remote-friendly team workspace where knowledge and collaboration meet."},
            {"prod": "Trello", "tagline": "Visual collaboration", "desc": "Manage projects and organize anything, instantly."}
        ]
    },
    {
        "company": "Salesforce", "slug": "salesforce", "booth": "D-02", "cat": "Enterprise Software",
        "products": [
            {"prod": "Einstein 1 Platform", "tagline": "Trusted AI for CRM", "desc": "Integrated AI across the entire customer 360 platform."},
            {"prod": "Sales Cloud", "tagline": "Grow sales faster", "desc": "The world's leading sales force automation solution."},
            {"prod": "Service Cloud", "tagline": "Service from anywhere", "desc": "Deliver personalized support across every channel."}
        ]
    },
    {
        "company": "Adobe", "slug": "adobe", "booth": "D-03", "cat": "Enterprise Software",
        "products": [
            {"prod": "Adobe Firefly", "tagline": "Generative AI for creators", "desc": "Creative generative AI models designed for commercial safe use."},
            {"prod": "Creative Cloud", "tagline": "All creative apps", "desc": "Get 20+ creative apps including Photoshop and Illustrator."},
            {"prod": "Experience Manager", "tagline": "Content management", "desc": "Combine digital asset management and a powerful CMS."}
        ]
    },
    {
        "company": "Infosys", "slug": "infosys", "booth": "E-01", "cat": "IT Services",
        "products": [
            {"prod": "Infosys Topaz", "tagline": "AI-first set of services", "desc": "An AI-first suite utilizing generative AI technologies."},
            {"prod": "Infosys Cobalt", "tagline": "Cloud services", "desc": "A set of services, solutions and platforms for enterprises."},
            {"prod": "Infosys Finacle", "tagline": "Digital banking", "desc": "Industry-leading digital banking solution suite."}
        ]
    },
    {
        "company": "TCS", "slug": "tata", "booth": "E-02", "cat": "IT Services",
        "products": [
            {"prod": "TCS BaNCS", "tagline": "Core banking software", "desc": "Comprehensive core banking platform for financial institutions."},
            {"prod": "TCS ignio", "tagline": "AIOps software", "desc": "Closed-loop, autonomous enterprise IT operations."},
            {"prod": "TCS TwinX", "tagline": "Enterprise digital twin", "desc": "AI-powered digital twin solution for business experimentation."}
        ]
    },
    {
        "company": "Wipro", "slug": "wipro", "booth": "E-03", "cat": "IT Services",
        "products": [
            {"prod": "Wipro Holmes", "tagline": "AI and Automation", "desc": "Artificial intelligence and automation platform."},
            {"prod": "Wipro FullStride", "tagline": "Cloud services", "desc": "End-to-end cloud transformation services."},
            {"prod": "CyberSecurists", "tagline": "Cybersecurity services", "desc": "Enterprise security and risk management."}
        ]
    },
    {
        "company": "Tech Mahindra", "slug": "techmahindra", "booth": "E-04", "cat": "IT Services",
        "products": [
            {"prod": "netOps.ai", "tagline": "Network automation", "desc": "Telco network automation and managed services platform."},
            {"prod": "TechM amplifAI", "tagline": "AI suite", "desc": "Comprehensive suite of AI offerings and platforms."},
            {"prod": "BPS", "tagline": "Business Process Services", "desc": "Next-gen customer experience and back-office solutions."}
        ]
    },
    {
        "company": "HCLTech", "slug": "hcl", "booth": "E-05", "cat": "IT Services",
        "products": [
            {"prod": "HCLSoftware", "tagline": "Enterprise software portfolio", "desc": "Software products for automation, digital transformation, and more."},
            {"prod": "DryICE", "tagline": "Autonomics & Orchestration", "desc": "AI-driven enterprise automation framework."},
            {"prod": "CloudSmart", "tagline": "Cloud consulting", "desc": "Comprehensive suite of cloud consulting services."}
        ]
    },
    {
        "company": "Cognizant", "slug": "cognizant", "booth": "E-06", "cat": "IT Services",
        "products": [
            {"prod": "Neuro AI", "tagline": "Enterprise AI platform", "desc": "Accelerates the adoption of generative AI in enterprises."},
            {"prod": "TriZetto", "tagline": "Healthcare IT", "desc": "Software solutions for the healthcare industry."},
            {"prod": "NetCentric", "tagline": "Digital experience", "desc": "Digital marketing and experience management."}
        ]
    },
    {
        "company": "Accenture", "slug": "accenture", "booth": "E-07", "cat": "IT Services",
        "products": [
            {"prod": "myWizard", "tagline": "Intelligent automation", "desc": "Platform for intelligent IT operations and automation."},
            {"prod": "Cloud First", "tagline": "Cloud migration", "desc": "Accelerated cloud transformation services."},
            {"prod": "Accenture Song", "tagline": "Digital marketing", "desc": "Tech-powered creative group and marketing agency."}
        ]
    },
    {
        "company": "IBM", "slug": "ibm", "booth": "E-08", "cat": "IT Services",
        "products": [
            {"prod": "IBM watsonx", "tagline": "AI and data platform", "desc": "Next generation AI and data platform for enterprise."},
            {"prod": "IBM Cloud", "tagline": "Secure open cloud", "desc": "Full stack cloud platform with 170+ products."},
            {"prod": "Red Hat OpenShift", "tagline": "Hybrid cloud container platform", "desc": "The leading enterprise Kubernetes platform."}
        ]
    },
    {
        "company": "Capgemini", "slug": "capgemini", "booth": "E-09", "cat": "IT Services",
        "products": [
            {"prod": "Capgemini Engineering", "tagline": "R&D and Engineering", "desc": "Intelligent industry and engineering research services."},
            {"prod": "Capgemini Invent", "tagline": "Digital innovation", "desc": "Digital innovation, consulting and transformation brand."},
            {"prod": "Cloud Platform", "tagline": "Cloud services", "desc": "End-to-end cloud solutions tailored for enterprises."}
        ]
    },
    {
        "company": "Oracle", "slug": "oracle", "booth": "E-10", "cat": "Cloud Infrastructure",
        "products": [
            {"prod": "OCI Generative AI", "tagline": "Enterprise generative AI", "desc": "Fully managed service providing LLMs."},
            {"prod": "Autonomous Database", "tagline": "Self-driving database", "desc": "Cloud database that uses machine learning to automate tuning."},
            {"prod": "NetSuite", "tagline": "Cloud ERP", "desc": "Leading cloud business software suite."}
        ]
    },
    {
        "company": "Intel", "slug": "intel", "booth": "F-01", "cat": "Hardware & AI",
        "products": [
            {"prod": "Intel Gaudi 3", "tagline": "AI accelerator", "desc": "Advanced AI accelerator for deep learning training and inference."},
            {"prod": "Xeon Scalable", "tagline": "Data center processors", "desc": "Processors with built-in AI acceleration capabilities."},
            {"prod": "OpenVINO", "tagline": "AI inferencing toolkit", "desc": "Optimize and deploy AI inference across hardware."}
        ]
    },
    {
        "company": "NVIDIA", "slug": "nvidia", "booth": "F-02", "cat": "Hardware & AI",
        "products": [
            {"prod": "H100 Tensor Core GPU", "tagline": "Unprecedented AI performance", "desc": "The world's most advanced GPU for enterprise AI workloads."},
            {"prod": "Omniverse", "tagline": "3D computing platform", "desc": "Platform for developing OpenUSD applications."},
            {"prod": "NVIDIA NIM", "tagline": "Inference microservices", "desc": "Accelerated AI inference microservices for developers."}
        ]
    },
    {
        "company": "AMD", "slug": "amd", "booth": "F-03", "cat": "Hardware & AI",
        "products": [
            {"prod": "Instinct MI300X", "tagline": "Generative AI accelerator", "desc": "High-performance AI accelerator for large language models."},
            {"prod": "EPYC Processors", "tagline": "Server CPUs", "desc": "World's highest performing x86 server processors."},
            {"prod": "Ryzen AI", "tagline": "AI PCs", "desc": "The world's first dedicated AI engine on an x86 processor."}
        ]
    },
    {
        "company": "Qualcomm", "slug": "qualcomm", "booth": "F-04", "cat": "Hardware & AI",
        "products": [
            {"prod": "Snapdragon X Elite", "tagline": "PC processor", "desc": "ARM-based processor for next-gen AI PCs."},
            {"prod": "Snapdragon 8 Gen 3", "tagline": "Mobile platform", "desc": "Premium mobile platform with on-device AI."},
            {"prod": "Qualcomm AI Hub", "tagline": "Model optimization", "desc": "Library of pre-optimized AI models for Snapdragon."}
        ]
    },
    {
        "company": "Cisco", "slug": "cisco", "booth": "F-05", "cat": "Enterprise Networking",
        "products": [
            {"prod": "Webex AI Assistant", "tagline": "AI for collaboration", "desc": "Generative AI capabilities built into the Webex platform."},
            {"prod": "Cisco Meraki", "tagline": "Cloud-controlled networking", "desc": "Comprehensive set of solutions managed from the cloud."},
            {"prod": "Cisco Catalyst", "tagline": "Enterprise switches", "desc": "Next-generation switching platform for the enterprise."}
        ]
    }
]

products = []

import random

for data in companies_data:
    logo = f"https://cdn.simpleicons.org/{data['slug']}"
    if data['slug'] == 'hcl':
        logo = f"https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818"
    
    for idx, prod_info in enumerate(data['products']):
        product_id = f"prod-{data['slug']}-{idx}"
        
        products.append({
            "id": product_id,
            "name": prod_info['prod'],
            "tagline": prod_info['tagline'],
            "company": data['company'],
            "category": data['cat'],
            "booth": data['booth'],
            "image": logo,
            "views": random.randint(200, 1000),
            "enquiries": random.randint(10, 100),
            "interestedVisitorsCount": random.randint(20, 150),
            "overview": prod_info['desc'],
            "features": ["Enterprise Ready", "Highly Scalable", "Secure"]
        })

with open('src/lib/generatedData.ts', 'r') as f:
    ts_code = f.read()

# Replace everything after export const GENERATED_PRODUCTS
new_code = re.sub(
    r"export const GENERATED_PRODUCTS: Product\[\] = \[.*",
    f"export const GENERATED_PRODUCTS: Product[] = {json.dumps(products, indent=2)};",
    ts_code,
    flags=re.DOTALL
)

with open('src/lib/generatedData.ts', 'w') as f:
    f.write(new_code)
