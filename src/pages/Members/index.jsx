import React, { useEffect, useRef, useState } from 'react'
import Banner from '../../components/Banner'
import './index.css'
import member1 from '../../assets/Img/leaders/Ankit.jpeg'

// Combined member data from both screenshots
const membersData = [
  // First screenshot data
  {
    name: "Naveen",
    tradeName: "Sunrise Developers & Builders",
    business: "Real Estate",
    phone: "9700726648"
  },
  {
    name: "Sundar",
    tradeName: "Tumbledry",
    business: "Laundry and Dry Cleaning",
    phone: "8008033919"
  },
  {
    name: "Dr.Renuka",
    tradeName: "Vagdevi Speech & Hearing",
    business: "Speech Therapy",
    phone: "8143963899"
  },
  {
    name: "Vijay Kiran",
    tradeName: "Star Insurance",
    business: "Insurance",
    phone: "8185883149"
  },
  {
    name: "Trinadh",
    tradeName: "Studio3",
    business: "Photography",
    phone: "9494700011"
  },
  {
    name: "Raju",
    tradeName: "Spectsworld",
    business: "Specs",
    phone: "9063334444"
  },
  {
    name: "Y.Prasad",
    tradeName: "Hanu Packers & Movers",
    business: "Packers & Movers",
    phone: "9912255777"
  },
  // Second screenshot data
  {
    name: "Dr.Badam Balakrishna",
    tradeName: "Badam Balakrishna Clinical Lab",
    business: "Laboratory Tests",
    phone: "9848160999"
  },
  {
    name: "Ankur Surana",
    tradeName: "Ankur Plastics",
    business: "Plastics and Gift Items",
    phone: "9000470000"
  },
  {
    name: "P.Ravi Teja",
    tradeName: "Teja's Interior Solutions",
    business: "Interiors",
    phone: "9963348999"
  },
  {
    name: "Dr.Siraj Mohiddin",
    tradeName: "Siraj Dental Care",
    business: "Dental Surgeon",
    phone: "08842364442"
  },
  {
    name: "A.V.V Satish Kumar",
    tradeName: "Srirasthu Creative Craft Gallery",
    business: "Memento's Manufacturing",
    phone: "9866462929"
  },
  {
    name: "Ankit Jain",
    tradeName: "Mohankheda Marketing",
    business: "Waterproofing and construction Chemicals",
    phone: "7028825558"
  },
  {
    name: "CA.Sama Surya",
    tradeName: "Sama School",
    business: "School",
    phone: "9290266699"
  },
  {
    name: "T.Satyam",
    tradeName: "Woodpecker Men's wear and Uniforms",
    business: "Uniforms",
    phone: "9849991836"
  },
  {
    name: "V.Badri",
    tradeName: "Maruthi Associates",
    business: "Architect",
    phone: "9989186999"
  },
  {
    name: "M.Venkatesh",
    tradeName: "Dev Designing and Printing",
    business: "Design And Printing",
    phone: "9553887108"
  },
  {
    name: "Mallikarjun",
    tradeName: "EswarSai Eco products",
    business: "Manufacturing and printing of non-woven and jute Bags",
    phone: "9290268046"
  },
  {
    name: "Balveer",
    tradeName: "Enchanted Events",
    business: "Events",
    phone: "9642452786"
  },
  {
    name: "Dr.M.Ganesh",
    tradeName: "Ganesh Physiotherapy Clinic",
    business: "Physiotherapy",
    phone: "8074068072"
  },
  {
    name: "Raju",
    tradeName: "HomeEase Guru",
    business: "Home services",
    phone: "8500970789"
  },
  {
    name: "Ram Kumar",
    tradeName: "Hotel IRAA",
    business: "Luxury Rooms",
    phone: "9885466668"
  },
  {
    name: "Jashwinth",
    tradeName: "Sri Venkateswara Jewellery",
    business: "Jewellery",
    phone: "7799644700"
  },
  {
    name: "U.Prem Kumar",
    tradeName: "Keerthi Computers-Sales and Service",
    business: "Computers sales and Service",
    phone: "9948030031"
  },
  {
    name: "Naresh",
    tradeName: "Miracle Salon",
    business: "Salon & Makeup Studio",
    phone: "7660099699"
  },
  {
    name: "Kiran",
    tradeName: "Mobile Mania",
    business: "Mobiles",
    phone: "9059867789"
  },
  {
    name: "K.Mahesh",
    tradeName: "Nagarjuna Digitals",
    business: "Flex Printing",
    phone: "9000606262"
  },
  {
    name: "Vara Vinod",
    tradeName: "Odigos",
    business: "Career",
    phone: "8886935558"
  },
  {
    name: "J.P. Gootam",
    tradeName: "Omega Elevators",
    business: "Elevators",
    phone: "9030189006"
  },
  {
    name: "Krishna Sen",
    tradeName: "Ramdev Stickers",
    business: "All Sign Materials",
    phone: "8328131912"
  },
  {
    name: "Ramesh Choraria",
    tradeName: "RH Electronics",
    business: "Electronics",
    phone: "9885172089"
  },
  {
    name: "Vickey Jain",
    tradeName: "Ridhi Sidhi Traders",
    business: "Air Conditioning Spares & Gases",
    phone: "9246781008"
  },
  {
    name: "Vippin Jain",
    tradeName: "Rishabh Electricals",
    business: "Electrical Items",
    phone: "8099605099"
  },
  {
    name: "Rishi Jain",
    tradeName: "Rishi Enterprises",
    business: "Sanitary",
    phone: "9701067887"
  },
  {
    name: "Satish",
    tradeName: "Meena Interiors",
    business: "Plasters",
    phone: "9666251495"
  }
];

// Function to get icon based on business category
const getCategoryIcon = (business) => {
  const businessLower = business.toLowerCase();

  if (businessLower.includes('real estate') || businessLower.includes('architect') || businessLower.includes('interior'))
    return 'fa-building';
  if (businessLower.includes('laundry') || businessLower.includes('dry cleaning'))
    return 'fa-soap';
  if (businessLower.includes('speech') || businessLower.includes('therapy') || businessLower.includes('physiotherapy') || businessLower.includes('dental') || businessLower.includes('laboratory') || businessLower.includes('health'))
    return 'fa-heartbeat';
  if (businessLower.includes('insurance'))
    return 'fa-shield-alt';
  if (businessLower.includes('photography'))
    return 'fa-camera';
  if (businessLower.includes('specs') || businessLower.includes('jewellery'))
    return 'fa-gem';
  if (businessLower.includes('packers') || businessLower.includes('movers'))
    return 'fa-truck';
  if (businessLower.includes('plastics') || businessLower.includes('gift'))
    return 'fa-gift';
  if (businessLower.includes('school') || businessLower.includes('career'))
    return 'fa-graduation-cap';
  if (businessLower.includes('uniforms') || businessLower.includes('wear'))
    return 'fa-tshirt';
  if (businessLower.includes('printing') || businessLower.includes('design'))
    return 'fa-print';
  if (businessLower.includes('events'))
    return 'fa-calendar-alt';
  if (businessLower.includes('computers') || businessLower.includes('mobile') || businessLower.includes('electronics'))
    return 'fa-laptop';
  if (businessLower.includes('salon') || businessLower.includes('makeup'))
    return 'fa-cut';
  if (businessLower.includes('hotel') || businessLower.includes('luxury'))
    return 'fa-hotel';
  if (businessLower.includes('elevators'))
    return 'fa-elevator';
  if (businessLower.includes('electrical') || businessLower.includes('sanitary'))
    return 'fa-bolt';
  if (businessLower.includes('chemicals') || businessLower.includes('waterproofing'))
    return 'fa-flask';

  return 'fa-briefcase'; // default icon
};

// Function to format phone number for WhatsApp
const formatPhoneForWhatsApp = (phone) => {
  // Remove any special characters and spaces
  let cleaned = phone.replace(/[-\s]/g, '');

  // Handle landline numbers (starting with 0)
  if (cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.substring(1); // Add India country code
  }
  // Handle mobile numbers (if they don't have country code)
  else if (!cleaned.startsWith('91') && cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }

  return cleaned;
};

function Members() {
  // ===== Stats Counter Logic =====
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const [counts, setCounts] = useState({
    members: 0,
    industries: 0,
    connections: 0,
    meetings: 0,
  });

  // detect when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // animate numbers
  useEffect(() => {
    if (!startCount) return;

    const targets = {
      // members: membersData.length,
      members: 50,
      industries: 50,
      connections: 500,
      meetings: 65,
    };

    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;

    let currentStep = 0;

    const counter = setInterval(() => {
      currentStep++;

      setCounts({
        members: Math.min(Math.ceil((targets.members / steps) * currentStep), targets.members),
        industries: Math.min(Math.ceil((targets.industries / steps) * currentStep), targets.industries),
        connections: Math.min(Math.ceil((targets.connections / steps) * currentStep), targets.connections),
        meetings: Math.min(Math.ceil((targets.meetings / steps) * currentStep), targets.meetings),
      });

      if (currentStep >= steps) clearInterval(counter);
    }, intervalTime);

    return () => clearInterval(counter);
  }, [startCount]);

  return (
    <div>
      <Banner title="Members" />
      <main className="members-page flex-grow-1">
        <section className="members-section">
          <div className="container-fluid">
            <div className="section-header" data-aos="fade-up" data-aos-duration="600">
              <h2><span className="gradient-text">Meet Our Network</span></h2>
              <p>Connect with talented professionals and business owners from diverse industries who are part of our
                thriving community</p>
            </div>

            <div className="row g-4 members-grid">
              {membersData.map((member, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 50 + 100}
                  data-aos-duration="600"
                >
                  <div className="member-card">
                    <div className="category-badge">
                      <i className={`fas ${getCategoryIcon(member.business)}`}></i>
                      <span>{member.business.split(' ')[0]}</span>
                    </div>
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member1} alt={member.name} className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">{member.name}</h3>
                      <div className="member-role">{member.tradeName}</div>
                      <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a
                          href={`https://wa.me/${formatPhoneForWhatsApp(member.phone)}`}
                          className="social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`WhatsApp: ${member.phone}`}
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600">
              <button className="btn-load-more">
                <i className="fas fa-users"></i>
                Load More Members
              </button>
            </div>
          </div>
        </section>

        <section className="stats-section" ref={statsRef}>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-duration="600">
                <div className="stat-box">
                  <h3 className="stat-number gradient-text">{counts.members}+</h3>
                  <p className="stat-label">Active Members</p>
                </div>
              </div>
              <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="600">
                <div className="stat-box">
                  <h3 className="stat-number gradient-text">{counts.industries}+</h3>
                  <p className="stat-label">Industries</p>
                </div>
              </div>
              <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="600">
                <div className="stat-box">
                  <h3 className="stat-number gradient-text">{counts.connections}+</h3>
                  <p className="stat-label">Connections Made</p>
                </div>
              </div>
              <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="600">
                <div className="stat-box">
                  <h3 className="stat-number gradient-text">{counts.meetings}+</h3>
                  <p className="stat-label">Meetings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Members