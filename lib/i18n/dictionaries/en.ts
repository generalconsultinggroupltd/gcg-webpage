// English is the source every other dictionary is translated from, so this
// file also defines the shape (see Dictionary in ../index.ts). Add a string
// here and TypeScript points at every other language until it has it.
//
// Placeholders in {braces} are filled at render time; keep them as they are.
// Brand names (General Consulting Group, SoftsCreatix, Penja Peppers, MyStay)
// are never translated.

const en = {
  meta: {
    homeTitle: "General Consulting Group — Building Value. Creating Impact.",
    description:
      "General Consulting Group provides strategic consulting, innovation and international development solutions to help companies and institutions achieve their objectives and create sustainable value.",
    keywords: [
      "strategic consulting",
      "import-export",
      "consulting",
      "representation",
      "sustainable development",
      "Rwanda",
      "Cameroon",
      "Africa",
    ],
    slogan: "Building Value. Creating Impact.",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    partners: "Partners",
    gallery: "Gallery",
    contact: "Contact",
  },

  header: {
    mainNav: "Main",
    mobileNav: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Select language",
    languages: "Languages",
    homeLink: "{name} — home",
  },

  common: {
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    contactUs: "Contact us",
    getInTouch: "Get in touch",
    allServices: "All services",
    visitWebsite: "Visit website",
    opensInNewTab: "{name} (opens in a new tab)",
    close: "Close",
  },

  footer: {
    nav: "Footer",
    rights: "© {year} {name}. All rights reserved.",
    developedBy: "Developed by",
    cookieSettings: "Cookie settings",
    legal: {
      "ethics-charter": "Ethics Charter",
      "internal-regulations": "Internal Regulations",
      "general-policy": "General Charter Policy",
      "privacy-policy": "Privacy Policy",
    },
  },

  cookies: {
    region: "Cookie consent",
    title: "Help us improve this website",
    text: "With your permission we use Google Analytics cookies to count visits and see which pages are useful. No advertising, and nothing that identifies you.",
    privacyPolicy: "Privacy policy",
    current: "Current choice: {choice}.",
    accepted: "accepted",
    declined: "declined",
    decline: "Decline",
    accept: "Accept",
  },

  hero: {
    pillars: ["Strategy", "Innovation", "Sustainable Impact"],
    titleLine1: "Building Value.",
    titleLine2: "Creating Impact.",
    text: "{name} provides strategic consulting, innovation and international development solutions to help companies and institutions achieve their objectives and create sustainable value.",
    discover: "Discover GCG",
    ourServices: "Our Services",
    tagline: "Africa and the world together for a better tomorrow",
  },

  services: {
    eyebrow: "Our Services",
    title: "Solutions for a Wider Tomorrow",
    description:
      "We offer a diverse range of services designed to support your growth, facilitate international opportunities and create lasting value.",
    metaDescription:
      "Consulting, import & export, representation, models & hostesses, SoftsCreatix, Penja Peppers and MyStay: the services and ventures of General Consulting Group.",
    items: {
      consulting: {
        name: "Consulting",
        summary: "Strategic advice and tailored solutions to help you achieve your goals.",
      },
      "import-export": {
        name: "Import & Export",
        summary: "Facilitating international trade and global opportunities.",
      },
      representation: {
        name: "Representation",
        summary: "Connecting your business with the right partners and markets.",
      },
      "models-hostesses": {
        name: "Models & Hostesses",
        summary: "Professional representation for your events and campaigns.",
      },
      softscreatix: {
        name: "SoftsCreatix",
        summary: "Innovative digital solutions for a connected future.",
      },
      "penja-peppers": {
        name: "Penja Peppers",
        summary: "Premium quality peppers, from our land to the world.",
      },
      mystay: {
        name: "MyStay",
        summary: "Comfortable stays for business and leisure.",
      },
    },
  },

  impact: {
    eyebrow: "Our Impact",
    title: "Driving Sustainable Growth Across Africa and Beyond",
    stats: [
      { label: "Countries of operation", text: "Rooted in Rwanda and Cameroon." },
      { label: "Continents in our network", text: "Suppliers across Asia, Europe and America." },
      { label: "Services & ventures", text: "From strategy to trade, digital and hospitality." },
      { label: "Committed to sustainability", text: "For a better future and lasting value." },
    ],
  },

  projects: {
    eyebrow: "Our Work",
    title: "Results we have delivered",
    description: "A look at the projects and ventures our teams have taken from idea to launch.",
    whatWeDid: "What we did",
    result: "The result",
    visit: "Visit {site}",
    visitLabel: "Visit {name} (opens in a new tab)",
    imageAlt: "{name} website home page",
    items: {
      "step-for-the-future": {
        client: "Step for the Future Foundation",
        context:
          "A Cameroonian humanitarian foundation supporting orphans, people living with disabilities and families facing rare diseases.",
        sector: "Non-profit · Social impact",
        location: "Yaoundé, Cameroon",
        deliveredBy: "SoftsCreatix",
        challenge:
          "The foundation needed a credible online home to present its mission, programmes and field results to donors, volunteers and partners — in French and English.",
        work: [
          "Brand-aligned website design and development",
          "Bilingual content structure (French / English)",
          "Pages for programmes, projects, impact, gallery and news",
          "Donation and get-involved journeys",
        ],
        results: [
          "Six programme areas presented clearly, from education to economic empowerment",
          "Impact figures published: 109+ children and 40 families supported",
          "Visitors reached from 23 countries",
        ],
      },
      softscreatix: {
        client: "SoftsCreatix",
        context:
          "The software and digital studio of General Consulting Group, building websites, applications and digital platforms for businesses and institutions.",
        sector: "Technology · Digital services",
        location: "Kigali, Rwanda",
        deliveredBy: "General Consulting Group",
        challenge:
          "Our clients kept asking for a trusted partner to take their projects online. We launched SoftsCreatix to give them one: a dedicated team that brings the same standards as our consulting work to software and the web.",
        work: [
          "Venture launch: positioning, offer and brand identity",
          "Company website presenting its services and work",
          "Service line covering web, mobile, e-commerce, AI and system integration",
          "Modern stack: Next.js, React Native, Node.js, Go, Python, PostgreSQL",
        ],
        results: [
          "5+ projects delivered, including this website and stepfuture.org",
          "Platforms built for Home Abomo Law Firm and Models & Hostesses",
          "Active in 3 countries",
        ],
      },
    },
  },

  audience: {
    eyebrow: "Our Reach",
    title: "Read in Kigali, Douala and far beyond",
    description:
      "People from around the world visit this site to learn about our work. These are the real figures.",
    visitors: "Visitors",
    countries: "Countries",
    lastMonth: "Visitors in the last 30 days",
    note: "Traffic figures from Google Analytics, refreshed every hour.",
  },

  partners: {
    eyebrow: "Our Partners",
    title: "Trusted by Global Partners",
    description:
      "We collaborate with a network of trusted partners to deliver exceptional value and sustainable solutions.",
    metaDescription:
      "General Consulting Group collaborates with a network of trusted partners to deliver exceptional value and sustainable solutions.",
    previous: "Previous partners",
    next: "Next partners",
    becomeTitle: "Become a partner",
    becomeText:
      "Interested in collaborating with General Consulting Group? We would love to hear from you.",
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "Learn about General Consulting Group: a collaborative, results-driven team turning ideas into tangible outcomes across Africa and beyond.",
    eyebrow: "About us",
    titlePrefix: "About",
    intro:
      "We are committed to providing high-level consulting expertise to support businesses and institutions in achieving their strategic goals. Our solutions, designed to meet contemporary challenges, aim to maximize our clients' performance while creating sustainable value.",
    leadership: "Leadership",
    founderRole: "Founder & CEO",
    founderPhotoAlt: "Portrait of {name}, {role} of {company}",
    founderBio1:
      "{name} founded {company} with a simple conviction: African businesses and institutions deserve a partner that understands local realities and can open doors to the rest of the world.",
    founderBio2:
      "He leads the group’s strategy and its ventures, from consulting and international trade to digital services with SoftsCreatix.",
    whyEyebrow: "Why choose us",
    whyTitle: "Why choose General Consulting Group?",
    reasons: [
      {
        title: "Collaboration",
        text: "We stand out for our collaborative approach, adaptability, and commitment to delivering tailored solutions that meet the specific needs of each client.",
      },
      {
        title: "Expert team",
        text: "By working with us, you benefit from a team of dedicated experts, a results-oriented approach, and solid experience in managing high-impact projects.",
      },
      {
        title: "Transforming ideas",
        text: "General Consulting Group is dedicated to turning ideas into tangible results and building lasting relationships with our clients, while positively contributing to the economic development of Africa and beyond.",
      },
    ],
    approachEyebrow: "Our approach",
    approachTitle: "How we work with you",
    approachText: "Every engagement is tailored, but most follow the same five steps.",
    approach: [
      {
        title: "Listen & diagnose",
        text: "We start with your objectives, your market and your constraints, and agree on what success looks like.",
      },
      {
        title: "Design the strategy",
        text: "We turn the diagnosis into a clear, costed plan with priorities, owners and milestones.",
      },
      {
        title: "Mobilise the network",
        text: "We bring in the right suppliers, partners, institutions and specialists from our network in Africa and abroad.",
      },
      {
        title: "Deliver alongside you",
        text: "We stay involved during execution, managing risks and keeping you informed at every step.",
      },
      {
        title: "Measure & sustain",
        text: "We measure the results against the goals set at the start and hand over what you need to keep the value growing.",
      },
    ],
    ctaTitle: "Ready to work with us?",
    ctaText: "Tell us about your project and let's create sustainable value together.",
  },

  servicePages: {
    eyebrow: "Services",
    whatWeDo: "What we do",
    whyUs: "Why us",
    ourMission: "Our mission",
    ourApproach: "Our approach",
    ctaTitle: "Let’s discuss your project",
    ctaText: "Our team is ready to support you at every step.",
    consulting: {
      title: "Consulting",
      intro:
        "We are committed to providing top-level consulting expertise to help businesses and institutions achieve their strategic goals. Our solutions, designed to meet contemporary challenges, aim to maximize our clients' performance while creating sustainable value.",
      sectionTitle: "Our Services",
      items: [
        {
          title: "Business Strategy and Organizational Transformation",
          text: "We help businesses identify and seize new growth opportunities, redesign their business models, and implement strategies that ensure long-term competitiveness. Our services include:",
          points: [
            "Business model evaluation",
            "Development and implementation of growth strategies",
            "Digital transformation and strategic innovation",
            "Change management and performance optimization",
          ],
        },
        {
          title: "Financial Advisory and Risk Management",
          text: "With an analytical approach, we support our clients in financial management and risk control. Our services include:",
          points: [
            "Financial audits and performance analysis",
            "Management of financial and operational risks",
            "Cost optimization and resource allocation",
            "Tax and financial planning",
          ],
        },
        {
          title: "Human Resources Management and Talent Development",
          text: "Our HR experts work with companies to attract, develop, and retain key talent. We offer:",
          points: [
            "Recruitment strategies and skill development",
            "Training and personal development",
            "Retention programs and employee satisfaction improvement",
            "Support for conflict management and employee engagement",
          ],
        },
        {
          title: "Marketing and Communication Advisory",
          text: "We provide marketing expertise to help our clients better understand their target markets and enhance their brand image. Our services include:",
          points: [
            "Market analysis and brand positioning",
            "Development of digital marketing strategies",
            "Internal and external communication strategies",
            "Customer relationship management and loyalty programs",
          ],
        },
        {
          title: "Technology Advisory and Digital Transformation",
          text: "In an increasingly digital world, we help our clients leverage technology to boost their performance. Our services include:",
          points: [
            "Development of custom IT solutions",
            "Systems integration and process automation",
            "IT security and data management",
            "E-commerce solutions and implementation of digital platforms",
          ],
        },
      ] as ContentBlock[],
    },
    importExport: {
      title: "Import & Export",
      intro:
        "At General Consulting Group, we leverage our diverse expertise to provide strategic support that helps our clients maximize their growth potential and achieve their business goals in a constantly evolving environment. With a strong presence in Cameroon and Rwanda and a network of international partners, we are ideally positioned to serve our clients across sectors.",
      sectionTitle: "Our Services",
      items: [
        {
          title: "Sourcing and International Procurement",
          text: "Through our strong collaborations with leading suppliers across Asia, Europe and America, we ensure direct access to a wide range of top-quality products. Whether for food products, construction materials, industrial equipment or consumer goods, we are committed to finding reliable and cost-effective sources.",
        },
        {
          title: "Logistics and Transportation Management",
          text: "Logistics is the cornerstone of our service. With tailored solutions for every shipment, we organize end-to-end international transport in partnership with sea, air and land carriers. We manage every step of the shipment, ensuring timely and secure deliveries regardless of volume or destination.",
        },
        {
          title: "Customs Support",
          text: "Navigating customs procedures can be complex. That is why our specialized team supports you to ensure full compliance with local and international regulations. We handle import and export formalities, minimizing risks and optimizing costs.",
        },
        {
          title: "International Trade Advisory",
          text: "With multi-sector expertise, we help companies optimize their import-export strategies. We carry out market studies, analyze opportunities and propose strategies for effective expansion into new markets, giving our clients a clear vision for their international operations.",
        },
        {
          title: "Financing and Insurance Solutions",
          text: "Thanks to our partnerships with trusted financial institutions, we facilitate access to financing options tailored to each project. We also offer insurance coverage to protect goods throughout the supply chain, reducing the risks linked to incidents or unforeseen events.",
        },
      ] as ContentBlock[],
      advantagesTitle: "Our Advantages",
      advantages: [
        {
          title: "Quality and Reliability",
          text: "By working with trusted suppliers, we ensure that every product meets strict quality standards.",
        },
        {
          title: "Agility and Speed",
          text: "Our optimized processes enable us to respond quickly to urgent needs, with a responsiveness that makes a difference.",
        },
        {
          title: "Transparency and Tracking",
          text: "Our clients have access to real-time reports on the progress of their orders and shipments, ensuring total transparency.",
        },
        {
          title: "Ethics and Sustainability",
          text: "Aware of our impact on the environment and local communities, we prioritize sustainable import-export practices.",
        },
      ] as ContentBlock[],
      missionTitle: "Commitment to Africa",
      mission: [
        "Our mission goes beyond commercial transactions. As a globally-minded African company, we invest in initiatives that strengthen intra-African trade and promote the continent's economic growth. With our presence in Cameroon and Rwanda, we have a unique understanding of local challenges, and we are committed to applying our expertise to support regional growth.",
        "With General Consulting Group, you have a reliable partner for all your import-export operations. Whether you are a growing company or an international player seeking to enter the African market, we provide you with our expertise, our network and our commitment to sustainable success.",
      ],
    },
    representation: {
      title: "Representation",
      intro:
        "At General Consulting Group, we leverage our diverse expertise to provide strategic representation that helps our clients maximize their growth potential and achieve their business goals in a constantly evolving environment.",
      sectionTitle: "Our representation approach is based on key pillars",
      items: [
        {
          title: "In-depth market and local culture understanding",
          text: "We work to understand the subtleties of the markets where our clients want to establish themselves, so that every decision is grounded in local realities.",
        },
        {
          title: "Communication strategy and brand positioning",
          text: "We develop communication strategies that enhance the visibility and recognition of our clients with their target audiences.",
        },
        {
          title: "Management of governmental and institutional relations",
          text: "Often essential for growing businesses, we help our clients build and maintain strong relationships with public and institutional stakeholders.",
        },
        {
          title: "Partnership strategies and business development",
          text: "To ensure sustainable success, we identify and facilitate strategic partnerships for our clients.",
        },
        {
          title: "We believe in our clients",
          text: "We firmly believe that every client has a unique potential, and our role is to maximize that potential.",
        },
        {
          title: "We are your partner",
          text: "Whether you are a business looking to expand into new markets or strengthen your presence, we stand by your side at every step.",
        },
      ] as ContentBlock[],
    },
  },

  gallery: {
    eyebrow: "Gallery",
    titlePrefix: "Visualize",
    titleHighlight: "our results",
    description:
      "We offer strategic solutions to help businesses and institutions achieve their goals and maximize their performance.",
    metaDescription:
      "Visualize our results: photos and videos from General Consulting Group missions and working sessions.",
    open: "Open: {item}",
    items: [
      "General Consulting Group working session",
      "General Consulting Group strategy meeting",
      "General Consulting Group team at work",
      "General Consulting Group in action",
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Contact us",
    description:
      "We offer strategic solutions to help businesses and institutions achieve their goals and maximize their performance.",
    metaDescription: "Contact General Consulting Group in Kigali, Rwanda: {email}.",
    address: "KN 4 Av 22, Kigali - Rwanda",
    location: "Location",
    email: "Email",
    phone: "Phone",
    formTitle: "Send us a message",
    formText: "Fill in the form below and our team will get back to you.",
    form: {
      name: "Your name",
      email: "Your email",
      service: "Service of interest (optional)",
      partnership: "Partnership",
      other: "Other",
      subject: "Subject of your message",
      message: "Write your message here...",
      consent:
        "By sending this form you agree that we use your details to answer your enquiry, as described in our {link}.",
      privacyPolicy: "privacy policy",
      send: "Send message",
      sending: "Sending...",
      success: "Your message has been sent successfully.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        subject: "Please enter a subject for your message.",
        message: "Please write your message.",
        tooMany: "Too many messages sent. Please try again in a few minutes.",
        unavailable: "The contact form is not available right now. Please email us directly.",
        failed: "Your message could not be sent. Please try again later.",
      },
    },
  },

  legalPage: {
    translationNotice:
      "This translation is provided for convenience. In case of any difference, the English version prevails.",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
  },
};

type ContentBlock = { title: string; text: string; points?: string[] };

export default en;
