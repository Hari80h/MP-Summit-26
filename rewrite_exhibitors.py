import json

companies_data = [
    {"company": "Google Cloud", "slug": "googlecloud", "booth": "A-01", "cat": "Cloud & AI", "prod": "Vertex AI", "tagline": "Enterprise Generative AI Platform", "desc": "Google Cloud platform for building, deploying and scaling generative AI applications.", "features": ["Model deployment and inference", "Enterprise data integration", "Generative AI tooling"]},
    {"company": "Amazon Web Services", "slug": "amazonaws", "booth": "A-02", "cat": "Cloud Infrastructure", "prod": "Amazon SageMaker", "tagline": "Build, train, and deploy machine learning models", "desc": "Fully managed machine learning service.", "features": ["Fully managed infrastructure", "Integrated Jupyter notebooks", "Distributed training"]},
    {"company": "Microsoft", "slug": "microsoft", "booth": "A-03", "cat": "Cloud & AI", "prod": "GitHub Copilot", "tagline": "Your AI pair programmer", "desc": "AI pair programmer that offers autocomplete-style suggestions as you code.", "features": ["Code completion", "Chat assist", "Enterprise security"]},
    {"company": "OpenAI", "slug": "openai", "booth": "A-04", "cat": "Artificial Intelligence", "prod": "ChatGPT Enterprise", "tagline": "Enterprise-grade AI assistant", "desc": "The most powerful version of ChatGPT yet, with enterprise-grade security and privacy.", "features": ["Unlimited high-speed GPT-4", "Advanced data analysis", "Enterprise privacy"]},
    {"company": "Stripe", "slug": "stripe", "booth": "B-01", "cat": "Payments", "prod": "Stripe Checkout", "tagline": "Optimized payment flow", "desc": "A prebuilt, hosted payment page optimized for conversion.", "features": ["One-click payments", "Global payment methods", "Fraud protection"]},
    {"company": "Razorpay", "slug": "razorpay", "booth": "B-02", "cat": "Payments", "prod": "RazorpayX", "tagline": "Business banking hub", "desc": "Supercharge your business banking with RazorpayX.", "features": ["Automated payroll", "Vendor payments", "Corporate cards"]},
    {"company": "Postman", "slug": "postman", "booth": "B-03", "cat": "API Platform", "prod": "Postman Enterprise", "tagline": "The API platform for developers", "desc": "Comprehensive platform for building and using APIs.", "features": ["API testing", "Documentation", "Mock servers"]},
    {"company": "Vercel", "slug": "vercel", "booth": "B-04", "cat": "Web Framework", "prod": "Next.js 14", "tagline": "The React Framework for the Web", "desc": "Used by some of the world's largest companies to build highly interactive web applications.", "features": ["Server Actions", "Partial Prerendering", "App Router"]},
    {"company": "Databricks", "slug": "databricks", "booth": "C-01", "cat": "Data & Analytics", "prod": "Data Intelligence Platform", "tagline": "Unified data + AI platform", "desc": "Built on a lakehouse architecture for big data processing and machine learning.", "features": ["Delta Lake", "Machine Learning workspace", "SQL Analytics"]},
    {"company": "Anthropic", "slug": "anthropic", "booth": "C-02", "cat": "Artificial Intelligence", "prod": "Claude 3.5 Sonnet", "tagline": "Advanced AI model", "desc": "Industry-leading intelligence with enhanced coding capabilities.", "features": ["200K context window", "Advanced reasoning", "Vision capabilities"]},
    {"company": "Zoho", "slug": "zoho", "booth": "C-03", "cat": "SaaS", "prod": "Zoho One", "tagline": "Operating system for business", "desc": "A comprehensive suite of business applications.", "features": ["40+ applications", "Unified administration", "AI assistant Zia"]},
    {"company": "Freshworks", "slug": "freshworks", "booth": "C-04", "cat": "SaaS", "prod": "Freshdesk Omni", "tagline": "Customer service software", "desc": "Omnichannel customer service platform powered by AI.", "features": ["Ticketing system", "Freddy AI", "Automated workflows"]},
    {"company": "Atlassian", "slug": "atlassian", "booth": "D-01", "cat": "SaaS", "prod": "Jira Software", "tagline": "Project and issue tracking", "desc": "The #1 software development tool used by agile teams.", "features": ["Scrum boards", "Roadmaps", "Agile reporting"]},
    {"company": "Salesforce", "slug": "salesforce", "booth": "D-02", "cat": "Enterprise Software", "prod": "Einstein 1 Platform", "tagline": "Trusted AI for CRM", "desc": "Integrated AI across the entire customer 360 platform.", "features": ["Generative AI", "Predictive scoring", "Automated insights"]},
    {"company": "Adobe", "slug": "adobe", "booth": "D-03", "cat": "Enterprise Software", "prod": "Adobe Firefly", "tagline": "Generative AI for creators", "desc": "Creative generative AI models designed for commercial safe use.", "features": ["Text to image", "Generative fill", "Text effects"]},
    {"company": "Infosys", "slug": "infosys", "booth": "E-01", "cat": "IT Services", "prod": "Infosys Topaz", "tagline": "AI-first set of services", "desc": "An AI-first suite utilizing generative AI technologies.", "features": ["AI solutions", "Data analytics", "Cognitive automation"]},
    {"company": "TCS", "slug": "tata", "booth": "E-02", "cat": "IT Services", "prod": "TCS BaNCS", "tagline": "Core banking software", "desc": "Comprehensive core banking platform for financial institutions.", "features": ["Digital banking", "Payments processing", "Wealth management"]},
    {"company": "Wipro", "slug": "wipro", "booth": "E-03", "cat": "IT Services", "prod": "Wipro Holmes", "tagline": "AI and Automation", "desc": "Artificial intelligence and automation platform.", "features": ["Cognitive search", "Virtual agents", "Predictive maintenance"]},
    {"company": "Tech Mahindra", "slug": "techmahindra", "booth": "E-04", "cat": "IT Services", "prod": "netOps.ai", "tagline": "Network automation", "desc": "Telco network automation and managed services platform.", "features": ["5G rollout", "Network orchestration", "AI analytics"]},
    {"company": "HCLTech", "slug": "hcl", "booth": "E-05", "cat": "IT Services", "prod": "HCLSoftware", "tagline": "Enterprise software portfolio", "desc": "Software products for automation, digital transformation, and more.", "features": ["Security", "Automation", "Marketing technology"]},
    {"company": "Cognizant", "slug": "cognizant", "booth": "E-06", "cat": "IT Services", "prod": "Neuro AI", "tagline": "Enterprise AI platform", "desc": "Accelerates the adoption of generative AI in enterprises.", "features": ["Use case discovery", "Model fine-tuning", "AI governance"]},
    {"company": "Accenture", "slug": "accenture", "booth": "E-07", "cat": "IT Services", "prod": "myWizard", "tagline": "Intelligent automation", "desc": "Platform for intelligent IT operations and automation.", "features": ["AIOps", "DevSecOps", "Cloud management"]},
    {"company": "IBM", "slug": "ibm", "booth": "E-08", "cat": "IT Services", "prod": "IBM watsonx", "tagline": "AI and data platform", "desc": "Next generation AI and data platform for enterprise.", "features": ["watsonx.ai", "watsonx.data", "watsonx.governance"]},
    {"company": "Capgemini", "slug": "capgemini", "booth": "E-09", "cat": "IT Services", "prod": "Capgemini Engineering", "tagline": "R&D and Engineering", "desc": "Intelligent industry and engineering research services.", "features": ["Digital manufacturing", "Software engineering", "System integration"]},
    {"company": "Oracle", "slug": "oracle", "booth": "E-10", "cat": "Cloud Infrastructure", "prod": "OCI Generative AI", "tagline": "Enterprise generative AI", "desc": "Fully managed service providing LLMs.", "features": ["Cohere models", "Meta Llama", "Dedicated clusters"]},
    {"company": "Intel", "slug": "intel", "booth": "F-01", "cat": "Hardware & AI", "prod": "Intel Gaudi 3", "tagline": "AI accelerator", "desc": "Advanced AI accelerator for deep learning training and inference.", "features": ["High performance", "Cost efficiency", "Scalable networking"]},
    {"company": "NVIDIA", "slug": "nvidia", "booth": "F-02", "cat": "Hardware & AI", "prod": "H100 Tensor Core GPU", "tagline": "Unprecedented AI performance", "desc": "The world's most advanced GPU for enterprise AI workloads.", "features": ["Hopper architecture", "Transformer Engine", "NVLink"]},
    {"company": "AMD", "slug": "amd", "booth": "F-03", "cat": "Hardware & AI", "prod": "Instinct MI300X", "tagline": "Generative AI accelerator", "desc": "High-performance AI accelerator for large language models.", "features": ["192GB HBM3", "High memory bandwidth", "CDNA 3 architecture"]},
    {"company": "Qualcomm", "slug": "qualcomm", "booth": "F-04", "cat": "Hardware & AI", "prod": "Snapdragon X Elite", "tagline": "PC processor", "desc": "ARM-based processor for next-gen AI PCs.", "features": ["Custom Oryon CPU", "45 TOPS NPU", "Power efficiency"]},
    {"company": "Cisco", "slug": "cisco", "booth": "F-05", "cat": "Enterprise Networking", "prod": "Webex AI Assistant", "tagline": "AI for collaboration", "desc": "Generative AI capabilities built into the Webex platform.", "features": ["Meeting summaries", "Message tone change", "Action items"]}
]

exhibitors = []
products = []

import random

for i, data in enumerate(companies_data):
    exhibitor_id = f"exh-{i}"
    product_id = f"prod-{i}"
    logo = f"https://cdn.simpleicons.org/{data['slug']}"
    if data['slug'] == 'hcl':
        logo = f"https://ui-avatars.com/api/?name=HCL+Tech&background=F3F4F6&color=181818"
    
    exhibitors.append({
        "id": exhibitor_id,
        "company": data['company'],
        "logo": logo,
        "booth": data['booth'],
        "category": data['cat'],
        "visits": random.randint(300, 1500),
        "leads": random.randint(100, 500),
        "enquiries": random.randint(50, 200),
        "teamSize": random.randint(5, 20),
        "status": "Setup"
    })
    
    products.append({
        "id": product_id,
        "name": data['prod'],
        "tagline": data['tagline'],
        "company": data['company'],
        "category": data['cat'],
        "booth": data['booth'],
        "image": logo,
        "views": random.randint(200, 1000),
        "enquiries": random.randint(10, 100),
        "interestedVisitorsCount": random.randint(20, 150),
        "overview": data['desc'],
        "features": data['features']
    })

import re
with open('src/lib/generatedData.ts', 'r') as f:
    ts_code = f.read()

new_code = re.sub(
    r"const exhibitorCategories = \['Cloud.*?export const GENERATED_EXHIBITORS = generateExhibitors\(30\);",
    f"export const GENERATED_EXHIBITORS: ExhibitorStats[] = {json.dumps(exhibitors, indent=2)};\n\nexport const GENERATED_PRODUCTS: Product[] = {json.dumps(products, indent=2)};",
    ts_code,
    flags=re.DOTALL
)

with open('src/lib/generatedData.ts', 'w') as f:
    f.write(new_code)
