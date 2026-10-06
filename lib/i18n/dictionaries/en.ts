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
      "General Consulting Group provides strategic consulting, innovation and international development solutions to grow businesses, connect markets and create new opportunities.",
    keywords: [
      "strategic consulting",
      "business development",
      "international trade",
      "import-export",
      "representation",
      "investment",
      "Rwanda",
      "Cameroon",
      "Africa",
    ],
    slogan: "Building Value. Creating Impact.",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Our Branches",
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
    allServices: "All branches",
    visitWebsite: "Visit website",
    opensInNewTab: "{name} (opens in a new tab)",
    close: "Close",
    /** Quotation marks around a quote, in this language's style. */
    quote: "“{text}”",
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
    pillars: [
      "Consulting",
      "Business development",
      "International trade",
      "Technology",
      "Representation",
    ],
    titleLine1: "Building Value.",
    titleLine2: "Creating Impact.",
    text: "{name} provides strategic consulting, innovation and international development solutions to grow businesses, connect markets and create new opportunities.",
    text2:
      "We support companies, institutions and investors in their development in Africa and internationally, from strategy to execution.",
    discover: "Discover GCG",
    ourServices: "Our Branches",
    tagline: "Africa and the world together for a better tomorrow",
  },

  services: {
    eyebrow: "Our Branches",
    title: "Solutions for a Wider Tomorrow",
    description:
      "Our branches cover a diverse range of activities designed to support your growth, facilitate international opportunities and create lasting value.",
    metaDescription:
      "Consulting, import & export, representation, models & hostesses, SoftsCreatix, Penja Peppers and MyStay: the branches and ventures of General Consulting Group.",
    items: {
      consulting: {
        name: "Consulting",
        summary: "Strategic advice and tailored solutions to help you achieve your goals.",
      },
      "import-export": {
        name: "International Trade",
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
      "Who is GCG? An African group with an international outlook: consulting, business development and investment, with a presence in Cameroon and Rwanda.",
    eyebrow: "Who is GCG?",
    title: "An African group with an international outlook",
    intro: [
      "General Consulting Group is a consulting, business development and investment group based in Africa, with a presence in Cameroon and Rwanda and an international network of partners.",
      "We help our clients identify opportunities, enter new markets, grow their business and turn their projects into concrete results.",
    ],
    leadership: "Leadership",
    founderRole: "Founder & Managing Director",
    founderPhotoAlt: "Portrait of {name}, {role} of {company}",
    founderBio: [
      "As head of {company}, {name} carries an entrepreneurial vision built on growing businesses, creating strategic partnerships and connecting African markets to international opportunities.",
      "An entrepreneur, executive and consultant, he leads the development of GCG with an approach focused on strategy, business development, international trade, company representation and the creation of new business opportunities.",
      "His background and experience in different African settings allow him to understand the realities of local markets while building an international perspective. His vision is to build an African group able to connect businesses, investors, partners and markets across borders.",
    ],
    visionTitle: "Vision",
    vision:
      "To build an African group able to create connections, develop opportunities and support businesses for the long term, across borders.",
    expertiseTitle: "Areas of expertise",
    expertise: [
      "Strategic consulting and business development",
      "Commercial development and opportunity sourcing",
      "International trade and business matchmaking",
      "Representation and market development",
      "Strategic partnerships and international expansion",
      "Technology and digital solutions through the Group’s companies",
    ],
    presenceTitle: "Presence & international outlook",
    presence: [
      "General Consulting Group operates from Cameroon and Rwanda, with the ambition of growing and extending its network across Africa and internationally.",
      "Through its different activities and companies, GCG is steadily building an ecosystem that connects businesses, markets, technologies, talent, products and opportunities.",
    ],
    messageTitle: "A word from the founder",
    message:
      "I believe that Africa lacks neither talent, nor ideas, nor opportunities. What it needs above all are strong connections, the right strategies and partners able to turn ideas into results. This conviction guides the building of General Consulting Group.",
    whyEyebrow: "Why choose us",
    whyTitle: "Why choose General Consulting Group?",
    reasons: [
      {
        title: "A presence in Central and East Africa",
        text: [
          "General Consulting Group SARL in Cameroon and General Consulting Group Ltd in Rwanda are both led by their founder, Patrick Junior Njambe II. This gives our clients a clearly identified point of contact, efficient decision-making and a consistent vision across two strategic markets of the African continent.",
        ],
      },
      {
        title: "A legally established group",
        text: [
          "Our entities are officially registered in their respective countries. In Cameroon, General Consulting Group SARL is registered under RCCM RC/DLA/2022/B/4336. In Rwanda, General Consulting Group Ltd is registered with the Rwanda Development Board under company code 122882138.",
          "Our business relationships therefore rest on legally constituted structures that are identifiable and accountable for their commitments.",
        ],
      },
      {
        title: "Expertise that supports your projects end to end",
        text: [
          "Our group brings together several complementary fields: international consulting, recruitment and professional mobility, international trade, information technology, real estate, talent management and support for companies and investors.",
          "This complementarity lets our clients bring several needs to a single partner, especially when setting up or growing in Africa.",
        ],
      },
      {
        title: "Hands-on knowledge of African markets",
        text: [
          "Our presence in Cameroon and Rwanda keeps us close to the administrative, commercial and cultural realities of Central and East Africa.",
          "We support companies and investors who want to find partners, access new markets, recruit talent or grow their business in these regions.",
        ],
      },
      {
        title: "Integrity as the foundation of our relationships",
        text: [
          "Our approach rests on four principles: excellence, integrity, innovation and lasting partnership.",
          "We favour building strong professional relationships over one-off deals. We engage with clarity, assess possibilities realistically and communicate transparently about what can be achieved before making any commitment.",
        ],
      },
    ] as Reason[],
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
    eyebrow: "Our Branches",
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
      title: "International Trade",
      activitiesTitle: "Our activities",
      activities: [
        "Import / Export",
        "International sourcing",
        "Supplier search",
        "Business matchmaking",
        "Logistics and coordination",
        "Market development",
      ],
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
    empty: "No photos or videos yet. Come back soon.",
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
    metaDescription: "Contact General Consulting Group in Kigali (Rwanda) and Douala (Cameroon): {email}.",
    addresses: ["KN 4 Av 22, Kigali — Rwanda", "Akwa, Douala — Cameroon"],
    location: "Our offices",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp (Cameroon)",
    formTitle: "Send us a message",
    formText: "Fill in the form below and our team will get back to you.",
    form: {
      name: "Your name",
      email: "Your email",
      service: "Branch of interest (optional)",
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
    englishOnly: "This document is currently available in English only.",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
  },
};

type ContentBlock = { title: string; text: string; points?: string[] };
/** A "why choose us" reason; `text` is one or more paragraphs. */
type Reason = { title: string; text: string[] };

export default en;
