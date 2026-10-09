import urllib.request
import json
import random

companies = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant', 'Accenture', 'IBM', 'Capgemini', 'Oracle', 'Microsoft', 'Google', 'Amazon', 'Flipkart', 'Zoho', 'Freshworks', 'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Uber', 'Intel', 'AMD', 'NVIDIA', 'Qualcomm', 'Cisco', 'Juniper', 'VMware', 'Red Hat', 'SAP', 'Salesforce', 'Adobe', 'Intuit', 'Atlassian', 'ThoughtWorks', 'Mindtree', 'L&T Infotech', 'Mphasis', 'Hexaware', 'Cyient', 'Tata Elxsi', 'KPIT', 'Zensar', 'Persistent', 'Coforge', 'Birlasoft', 'Sonata', 'Mastek', 'Datamatics', 'Ramco', 'Razorpay', 'Cred', 'Groww', 'Postman']
designations = ['Software Engineer', 'Senior Software Engineer', 'Tech Lead', 'Engineering Manager', 'Director of Engineering', 'VP of Engineering', 'CTO', 'Product Manager', 'Senior Product Manager', 'Group Product Manager', 'Director of Product', 'VP of Product', 'CPO', 'Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist', 'AI/ML Engineer', 'Data Engineer', 'Cloud Architect', 'Solutions Architect', 'DevOps Engineer', 'SRE', 'Security Engineer', 'UX Designer', 'UI Designer', 'Product Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer']
interestsList = ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Data Science', 'Web Development', 'Mobile Development', 'DevOps', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR', 'Quantum Computing', 'SaaS', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'Enterprise Software', 'Open Source', 'UI/UX Design', 'Product Management', 'Agile Methodologies', 'Startup Ecosystem', 'Venture Capital', 'Angel Investing']

url = "https://randomuser.me/api/?results=400&nat=in,us"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read())

attendees = []
for i, user in enumerate(data['results']):
    name = f"{user['name']['first']} {user['name']['last']}"
    company = random.choice(companies)
    designation = random.choice(designations)
    score = random.randint(80, 100) if i < 30 else random.randint(30, 99)
    num_interests = random.randint(2, 4)
    interests = random.sample(interestsList, num_interests)
    
    attendees.append({
        "id": f"gen-att-{i}",
        "name": name,
        "designation": designation,
        "company": company,
        "avatar": user['picture']['large'],
        "role": "delegate",
        "interests": interests,
        "relevanceScore": score
    })

exhibitorCategories = ['Cloud & AI', 'IT Services', 'Payments', 'Consumer Tech', 'Cloud Infrastructure', 'Artificial Intelligence', 'Data & Analytics', 'SaaS', 'Cybersecurity', 'DevOps']
exhibitorBoothPrefixes = ['A', 'B', 'C', 'D', 'E', 'F']
exhibitors = []
for i in range(30):
    companyName = random.choice(companies) + " " + str(random.randint(10, 999))
    prefix = random.choice(exhibitorBoothPrefixes)
    boothNum = random.randint(1, 50)
    # Use real logos where possible, but UI avatars is fine for fake companies. Wait, let's use UI avatars for exhibitors as before.
    exhibitors.append({
        "id": f"gen-ex-{i}",
        "company": companyName,
        "logo": f"https://ui-avatars.com/api/?name={companyName.replace(' ', '+')}&background=F3F4F6&color=181818&font-size=0.33",
        "booth": f"{prefix}-{boothNum}",
        "category": random.choice(exhibitorCategories),
        "visits": random.randint(100, 500),
        "leads": random.randint(20, 100),
        "enquiries": random.randint(10, 50),
        "teamSize": random.randint(1, 10),
        "status": "Setup"
    })

ts_code = f"""import {{ Person, ExhibitorStats }} from '../types';

export const GENERATED_ATTENDEES: Person[] = {json.dumps(attendees, indent=2)};

export const GENERATED_EXHIBITORS: ExhibitorStats[] = {json.dumps(exhibitors, indent=2)};
"""

with open('src/lib/generatedData.ts', 'w') as f:
    f.write(ts_code)

print("Real people data fetched and generated.")
