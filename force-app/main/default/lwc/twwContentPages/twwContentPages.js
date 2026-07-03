import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FOUNDATION_LOGO from '@salesforce/resourceUrl/FoundationLogo';
import SITE_IMAGES from '@salesforce/resourceUrl/TWW_Site_Images';

const asset = (fileName) => `${SITE_IMAGES}/${fileName}`;

const REPORT_2021_22_URL = 'https://togetherwewillfoundation2--twwdev.sandbox.my.salesforce.com/sfc/p/7100000318hl/a/71000002Bg61/0rZvDEgI3qb2R63._wuKgTIi5fwmFydNz4YmUmDTSpk';
const REPORT_2022_23_URL = 'https://togetherwewillfoundation2--twwdev.sandbox.my.salesforce.com/sfc/p/7100000318hl/a/71000002Bg9F/entxdd6u3E1gUzRRVIdEcRiHwJmxJwaB78kXGAW_iNk';
const REPORT_2023_24_URL = 'https://togetherwewillfoundation2--twwdev.sandbox.my.salesforce.com/sfc/p/7100000318hl/a/71000002Bg7d/63hVMATSJJZW_.yHlF9Zcr_szTEiq8.McO0MgXNF.BU';
const REPORT_2024_25_URL = 'https://togetherwewillfoundation2--twwdev.sandbox.my.salesforce.com/sfc/p/7100000318hl/a/71000002BILR/V_3EQ_luGp.EFqVWctXvomUo9hklAbNJSFfsBR70bxk';

const NAV_ITEMS = [
    { key: 'home', label: 'Home', href: '/togetherwewill/' },
    { key: 'about', label: 'About', href: '/togetherwewill/about' },
    { key: 'working-model', label: 'Model', href: '/togetherwewill/working-model' },
    { key: 'initiatives', label: 'Initiatives', href: '/togetherwewill/initiatives' },
    { key: 'impact', label: 'Impact', href: '/togetherwewill/impact' },
    { key: 'partners', label: 'Partners', href: '/togetherwewill/partners' },
    { key: 'get-involved', label: 'Get Involved', href: '/togetherwewill/get-involved' },
    { key: 'contact', label: 'Contact', href: '/togetherwewill/contact' }
];

const IMPACT_STATS = [
    { id: 'beneficiaries', value: '10,000+', label: 'Lives impacted since inception' },
    { id: 'volunteers', value: '1000+', label: 'Volunteers across the globe' },
    { id: 'reunited', value: '600+', label: 'Children reunited with family' },
    { id: 'education-continuity', value: '60+', label: 'Students supported for education continuity' },
    { id: 'presence', value: '14 + 3', label: 'States in India and countries: India, USA, Kenya' },
    { id: 'projects', value: '20+', label: 'Projects executed' },
    { id: 'schools', value: '15+', label: 'Schools supported' },
    { id: 'health', value: '1000+', label: 'Health camp beneficiaries' }
];

const CORE_VALUES = [
    {
        id: 'compassion',
        title: 'Compassion',
        description: 'We place people at the center of everything we do and respond with empathy, care, and respect.'
    },
    {
        id: 'integrity',
        title: 'Integrity',
        description: 'We uphold the highest standards of transparency, accountability, and ethical conduct in all our actions.'
    },
    {
        id: 'inclusion',
        title: 'Inclusion',
        description: 'We believe every individual deserves equal opportunities regardless of their background, abilities, or circumstances.'
    },
    {
        id: 'collaboration',
        title: 'Collaboration',
        description: 'We create impact through partnerships with volunteers, communities, institutions, corporates, and government stakeholders.'
    },
    {
        id: 'empowerment',
        title: 'Empowerment',
        description: 'We focus on enabling individuals and communities to become self-reliant and build sustainable futures.'
    },
    {
        id: 'sustainability',
        title: 'Sustainability',
        description: 'We design initiatives that create lasting change and strengthen communities for generations to come.'
    }
];

const JOURNEY_ITEMS = [
    'Presence across 14 states in India and 3 countries',
    '1,000+ volunteers worldwide',
    '10,000+ lives impacted',
    'Support to child homes, schools, adoption agencies, and community institutions',
    'Government school transformation projects',
    'Education support programs for vulnerable children',
    'Women empowerment and livelihood initiatives',
    'Skill development programs for specially abled individuals',
    'Launch of Psychology and Mental Well-being Initiative',
    'Integrated Rural Transformation and Empowerment impacting 35,000 lives in a cluster of 6-8 villages',
    'Zero-operating-cost NGO model'
];

const WORKING_MODEL = [
    {
        id: 'volunteer-led',
        title: 'Volunteer-Led',
        description: 'A network of professionals, educators, psychologists, healthcare experts, students, corporate employees, and changemakers contributes time, skills, expertise, and resources.'
    },
    {
        id: 'partnership-driven',
        title: 'Partnership-Driven',
        description: 'TWW works with government institutions, schools, child care institutions, NGOs, corporates, healthcare professionals, and local leaders to maximize reach and avoid duplication.'
    },
    {
        id: 'zero-cost',
        title: 'Zero Operating Cost Model',
        description: 'Administrative and coordination functions are powered through volunteers and partner support so received funds and resources move toward beneficiary-centric work.'
    },
    {
        id: 'sustainable',
        title: 'Sustainable Development',
        description: 'Programs are designed to build local capacity, strengthen institutions, engage communities, and create benefits that continue after implementation.'
    },
    {
        id: 'scalable',
        title: 'Scalable Solutions',
        description: 'Successful models such as Bal Shiksha Kendras, eLearning, school transformation, mental health, skills, and rural transformation are refined for replication.'
    }
];

const IMPACT_CYCLE = [
    'Identify community needs',
    'Build strategic partnerships',
    'Mobilize volunteers and resources',
    'Implement sustainable solutions',
    'Measure impact',
    'Scale successful models'
];

const initiativeHref = (slug) => `/togetherwewill/initiatives/${slug}`;

const INITIATIVES = [
    {
        id: 'geographies',
        title: 'Geographies We Serve',
        category: 'Reach',
        metric: '14 states and 3 countries',
        image: asset('geographies.jpg'),
        href: initiativeHref('geographies-we-serve'),
        description: 'TWW has expanded from local community support into a growing movement across India, the USA, and Kenya.'
    },
    {
        id: 'child-welfare',
        title: 'Child Welfare',
        category: 'Protection and Care',
        metric: '600+ children reunited with families',
        image: asset('child_home_group.jpg'),
        href: initiativeHref('child-welfare'),
        description: 'Safe, nurturing, and inclusive environments for vulnerable children through institutional support, education, welfare, and reintegration.'
    },
    {
        id: 'education',
        title: 'Education',
        category: 'Learning Access',
        metric: 'Bal Shiksha, continuity, eLearning, and school transformation',
        image: asset('bal_shiksha.jpg'),
        href: initiativeHref('education'),
        description: 'Education initiatives help children enter school, stay in school, strengthen foundational learning, and access digital learning.'
    },
    {
        id: 'psychology',
        title: 'Psychology and Mental Well-being',
        category: 'Mental Health',
        metric: 'Safe spaces for children, youth, and caregivers',
        image: asset('psychology.jpg'),
        href: initiativeHref('psychology-mental-wellbeing'),
        description: 'Counseling, life skills, awareness, and resilience-building support for children, adolescents, caregivers, educators, and communities.'
    },
    {
        id: 'healthcare',
        title: 'Children Healthcare',
        category: 'Health',
        metric: '1000+ health camp beneficiaries',
        image: asset('healthcare.jpg'),
        href: initiativeHref('children-healthcare'),
        description: 'Screenings, medical support, health awareness, assistive devices, preventive care, nutrition, and hygiene initiatives.'
    },
    {
        id: 'skills',
        title: 'Skill Development and Empowerment',
        category: 'Livelihoods',
        metric: '100+ women and girls trained annually',
        image: asset('skill_development.jpg'),
        href: initiativeHref('skill-development-empowerment'),
        description: 'Vocational training, entrepreneurship support, and livelihood pathways for women, youth, and specially abled individuals.'
    },
    {
        id: 'rural',
        title: 'Rural Transformation',
        category: 'Integrated Development',
        metric: '35,000+ lives across 6-8 villages',
        image: asset('rural_library.jpg'),
        href: initiativeHref('rural-transformation'),
        description: 'Integrated rural transformation models around education, healthcare, women empowerment, child welfare, water, waste, skills, and solar energy.'
    }
];

const RURAL_PILLARS = [
    'Education',
    'Child Welfare',
    'Healthcare',
    'Skill Development and Livelihoods',
    'Water Conservation',
    'Waste Management',
    'Solar Power and Renewable Energy'
];

const HELP_ITEMS = [
    {
        id: 'volunteer',
        title: 'Volunteer',
        items: ['Individual volunteers', 'Student volunteers', 'Skilled volunteers', 'Psychologists', 'Corporate volunteers']
    },
    {
        id: 'donate',
        title: 'Donate',
        items: ['Support education', 'Support child welfare', 'Support healthcare', 'Support skill development', 'Support rural transformation']
    },
    {
        id: 'resources',
        title: 'Resource Donation',
        items: ['Books and stationery', 'Computers and digital equipment', 'Furniture and infrastructure', 'Healthcare supplies']
    }
];

const PARTNER_REASONS = [
    'Zero operating cost NGO model',
    'Diverse CSR opportunities',
    'Proven grassroots presence',
    'Scalable and sustainable impact',
    'Employee volunteering opportunities',
    'Transparency and accountability',
    'Customized CSR programs',
    'Multi-sector impact platform'
];

const CSR_AREAS = [
    'Education and eLearning',
    'Child Welfare',
    'Psychology and Mental Health',
    'Children Healthcare',
    'Skill Development and Women Empowerment',
    'Special Needs Inclusion',
    'Rural Transformation and Sustainability',
    'Environmental Sustainability'
];

const FUTURE_PLANS = [
    'Expand Child Home support to more cities',
    'Establish additional Bal Shiksha Kendras',
    'Adopt and transform more government schools',
    'Expand presence beyond 14 states and 3 countries',
    'Launch additional skill development centers',
    'Establish a holistic primary school for underprivileged children',
    'Scale mental health and psychology programs across India',
    'Establish replicable rural transformation models'
];

const REPORTS = [
    { id: '2021-22', label: 'Annual Report 2021-22', status: 'Open report', url: REPORT_2021_22_URL },
    { id: '2022-23', label: 'Annual Report 2022-23', status: 'Open report', url: REPORT_2022_23_URL },
    { id: '2023-24', label: 'Annual Report 2023-24', status: 'Open report', url: REPORT_2023_24_URL },
    { id: '2024-25', label: 'Annual Report 2024-25', status: 'Open report', url: REPORT_2024_25_URL }
];

const BANK_DETAILS = [
    { id: 'name', label: 'A/C Name', value: 'Together We Will Foundation' },
    { id: 'account', label: 'Current A/C No.', value: '921020051018100' },
    { id: 'ifsc', label: 'IFSC code', value: 'UTIB0001771' },
    { id: 'branch', label: 'Branch', value: 'Axis Bank, Mohan Cooperative Industrial Estate, New Delhi 110044' },
    { id: 'upi', label: 'UPI code', value: 'MAB.037111047990070@axisbank' }
];

const SOCIAL_LINKS = [
    { id: 'instagram', label: 'Instagram', image: asset('instagram_qr.jpg') },
    { id: 'facebook', label: 'Facebook', image: asset('facebook_qr.jpg') },
    { id: 'twitter', label: 'Twitter', image: asset('twitter_qr.jpg') }
];

const CONTACT_IMAGES = [
    { id: 'old-age-home', label: 'Community support and care outreach', image: asset('contact_old_age_home.png') },
    { id: 'social-qr', label: 'Follow TWW on social channels', image: asset('social_qr_strip.png') }
];

const LEGAL_ITEMS = [
    'Child Safeguarding Policy',
    'Privacy Policy',
    'Terms and Conditions',
    'Anti-Fraud Statement',
    'Refund / Cancellation Policy for donations'
];

const detailPage = ({ key, label, title, intro, image, stats, sections, relatedLinks }) => ({
    key,
    template: 'initiativeDetail',
    section: 'initiatives',
    label,
    title,
    intro,
    image,
    stats,
    sections,
    relatedLinks
});

const INITIATIVE_DETAIL_PAGES = {
    'geographies-we-serve': detailPage({
        key: 'geographies-we-serve',
        label: 'Geographies We Serve',
        title: 'A volunteer movement across India and beyond',
        intro: 'TWW serves communities across 14 states in India and 3 countries through local partnerships, volunteers, and program-specific collaborations.',
        image: asset('geographies.jpg'),
        stats: [
            { id: 'states', value: '14', label: 'States in India' },
            { id: 'countries', value: '3', label: 'Countries' },
            { id: 'volunteers', value: '1000+', label: 'Volunteers worldwide' }
        ],
        sections: [
            {
                id: 'reach',
                title: 'Growing reach through trusted local partnerships',
                paragraphs: [
                    'The Foundation has grown from local community service into a broader movement that connects children, families, schools, institutions, volunteers, corporates, and partner organizations.',
                    'This reach allows TWW to respond to needs in education, child welfare, healthcare, mental well-being, skill development, and rural transformation while keeping implementation close to the community.'
                ],
                bullets: ['India', 'USA', 'Kenya', 'Presence across 14 states in India']
            }
        ]
    }),
    'child-welfare': detailPage({
        key: 'child-welfare',
        label: 'Child Welfare',
        title: 'Safe, nurturing environments where every child can learn, heal, grow, and thrive',
        intro: 'TWW supports vulnerable children through protection, education, care, development, and institutional partnerships.',
        image: asset('child_home_group.jpg'),
        stats: [
            { id: 'reunited', value: '600+', label: 'Children reunited with families' },
            { id: 'homes', value: '3+', label: 'Child welfare institutions supported' },
            { id: 'care', value: 'Care', label: 'Protection, education, and development' }
        ],
        sections: [
            {
                id: 'overview',
                title: 'Holistic child welfare support',
                paragraphs: [
                    'TWW contributes to child welfare through volunteer engagement, educational support, nutrition, welfare resources, mental well-being support, and partnerships with child care institutions.',
                    'The goal is to help children rebuild their lives with dignity, confidence, safety, and hope.'
                ]
            }
        ],
        relatedLinks: [
            { id: 'children-homes', title: 'Children Homes Faridabad and Gurugram', href: initiativeHref('children-homes-faridabad-gurugram'), description: 'Government of Haryana homes for vulnerable boys and girls.' },
            { id: 'kanya', title: 'Kanya Ashram Jhajjar', href: initiativeHref('kanya-ashram-jhajjar-haryana'), description: 'Monthly ration support and care continuity for 12 girls.' },
            { id: 'safety', title: 'Place of Safety', href: initiativeHref('place-of-safety'), description: 'Support for nearly 200 children in conflict with law.' }
        ]
    }),
    'children-homes-faridabad-gurugram': detailPage({
        key: 'children-homes-faridabad-gurugram',
        label: 'Child Welfare',
        title: 'Children Homes Faridabad and Gurugram',
        intro: 'TWW supports Government of Haryana Children Homes in Faridabad and Gurugram, helping create safe and nurturing environments for orphaned, abandoned, surrendered, and vulnerable children.',
        image: asset('child_home.jpg'),
        stats: [
            { id: 'faridabad', value: '50', label: 'Faridabad boys home capacity' },
            { id: 'gurugram', value: '50', label: 'Gurugram girls home capacity' },
            { id: 'reunited', value: '600+', label: 'Children reunited with families' }
        ],
        sections: [
            {
                id: 'homes',
                title: 'Protection, education, care, and holistic development',
                paragraphs: [
                    'The Faridabad Home caters to boys aged 6-18 years, has a capacity of 50 children, and currently supports about 20 residents. Over the years, it has helped facilitate the reunification of more than 250 children with their families.',
                    'The Gurugram Home serves girls aged 6-18 years, has a capacity of 50 children, and currently supports about 15-20 residents. The home has played a significant role in successful reunification of more than 300 children with their families.',
                    'Through volunteer engagement, educational support, and welfare initiatives, TWW contributes to a caring environment that enables children to heal, learn, and thrive.'
                ],
                quote: 'Creating safe, nurturing environments where every child can learn, heal, grow, and thrive.'
            }
        ]
    }),
    'kanya-ashram-jhajjar-haryana': detailPage({
        key: 'kanya-ashram-jhajjar-haryana',
        label: 'Child Welfare',
        title: 'Kanya Ashram Jhajjar, Haryana',
        intro: 'Together We Will has supported Kanya Ashram, Jhajjar, a home for 12 girls from distressed and vulnerable families.',
        image: asset('kanya_ashram.jpg'),
        stats: [
            { id: 'girls', value: '12', label: 'Girls supported' },
            { id: 'years', value: '2+', label: 'Years of sustained support' },
            { id: 'support', value: 'Monthly', label: 'Ration support' }
        ],
        sections: [
            {
                id: 'support',
                title: 'Care and education support',
                paragraphs: [
                    'TWW provides monthly ration support to ensure nutritional needs are met, enabling the girls to focus on education, personal growth, and well-being.',
                    'The initiative promotes literacy, school readiness, life skills, and holistic development through a safe learning environment.'
                ],
                bullets: [
                    '12 girls supported through monthly ration assistance',
                    '2+ years of sustained support ensuring continuity of care and learning',
                    'Improved nutrition, well-being, literacy, and life skills among beneficiaries'
                ],
                quote: 'By addressing both care and education, TWW helps create lasting pathways of hope, dignity, and opportunity for children who need it most.'
            }
        ]
    }),
    'place-of-safety': detailPage({
        key: 'place-of-safety',
        label: 'Child Welfare',
        title: 'Place of Safety',
        intro: 'TWW initiated a partnership with the Place of Safety to strengthen care and dignity for vulnerable children and youth in institutional care.',
        image: asset('place_safety.jpg'),
        stats: [
            { id: 'children', value: '200', label: 'Children at the facility' },
            { id: 'thalis', value: '100', label: 'Stainless steel thalis provided' },
            { id: 'coolers', value: '7', label: 'Air coolers provided' }
        ],
        sections: [
            {
                id: 'support',
                title: 'Strengthening care and rehabilitation',
                paragraphs: [
                    'The Place of Safety houses nearly 200 children in conflict with law and provides a structured, secure, and rehabilitative environment focused on education, counseling, skill development, and reintegration into society.',
                    'This partnership opens avenues for future collaboration in education, life skills, rehabilitation, mentoring, and child welfare.'
                ],
                bullets: [
                    'Provided 2 casseroles and 100 stainless steel thalis to support daily operations',
                    'Provided 1 water cooler with RO',
                    'Provided 7 air coolers',
                    'Benefiting nearly 200 children in conflict with law residing at the facility'
                ],
                quote: 'Every child deserves an opportunity for rehabilitation, growth, and a second chance.'
            }
        ]
    }),
    education: detailPage({
        key: 'education',
        label: 'Education',
        title: 'Expanding access to education for vulnerable and underserved children',
        intro: 'TWW education work includes Bal Shiksha Kendras, education continuity support, government school transformation, eLearning, and support for tribal communities.',
        image: asset('bal_shiksha.jpg'),
        stats: [
            { id: 'centers', value: '5', label: 'Bal Shiksha Kendras' },
            { id: 'children', value: '150+', label: 'Children in learning centers' },
            { id: 'schools', value: '2', label: 'Government schools transformed' }
        ],
        sections: [
            {
                id: 'overview',
                title: 'Education as a pathway to opportunity',
                paragraphs: [
                    'TWW helps children enter school, stay enrolled, build foundational skills, access digital learning, and learn in safer, more supportive school environments.',
                    'The education portfolio is designed for children from economically disadvantaged backgrounds, migrant families, distressed families, vulnerable communities, and children with special needs.'
                ]
            }
        ],
        relatedLinks: [
            { id: 'bal-shiksha', title: 'Bal Shiksha Kendras', href: initiativeHref('bal-shiksha-kendras'), description: 'Five community learning centers supporting 150+ children.' },
            { id: 'continuity', title: 'Education Continuity Program', href: initiativeHref('education-continuity-program'), description: 'Support for vulnerable students to remain in school.' },
            { id: 'school-transformation', title: 'Government School Transformation', href: initiativeHref('government-school-transformation'), description: 'Infrastructure, safety, sanitation, water, and learning improvements.' },
            { id: 'elearning', title: 'eLearning Initiatives', href: initiativeHref('elearning-initiatives'), description: 'Digital learning support across India and Kenya.' },
            { id: 'tribal', title: 'Support for Tribal Communities', href: initiativeHref('support-for-tribal-communities'), description: 'Education and menstrual health support in Palghar District.' }
        ]
    }),
    'bal-shiksha-kendras': detailPage({
        key: 'bal-shiksha-kendras',
        label: 'Education',
        title: 'Bal Shiksha Kendras',
        intro: 'TWW runs 5 Bal Shiksha Kendras to provide educational support to children from underserved communities.',
        image: asset('bal_shiksha.jpg'),
        stats: [
            { id: 'centers', value: '5', label: 'Learning centers' },
            { id: 'children', value: '150+', label: 'Children supported' },
            { id: 'first-school', value: '25+', label: 'First-time school starters' }
        ],
        sections: [
            {
                id: 'centers',
                title: 'Community-based learning support',
                paragraphs: [
                    'The centers offer academic assistance, foundational learning, life skills, and a safe environment that encourages children to continue their education and realize their potential.',
                    'TWW helps bridge educational gaps for children from economically disadvantaged backgrounds, migrant families, vulnerable communities, and children with special needs.'
                ],
                bullets: [
                    'A C Nagar, Faridabad',
                    'Ankhir Village, Faridabad',
                    'SGM Nagar, Faridabad',
                    'Sainik Colony, Faridabad',
                    'Bata More Learning Center, Faridabad, supporting specially abled children',
                    'Improved access to quality education, remedial learning, and life skills',
                    'Strengthened community-based educational support systems'
                ],
                quote: 'Bal Shiksha Kendra represents a doorway to opportunity, empowering children with the knowledge, confidence, and skills needed to build a brighter future.'
            }
        ]
    }),
    'education-continuity-program': detailPage({
        key: 'education-continuity-program',
        label: 'Education',
        title: 'Education Continuity Program',
        intro: 'TWW ensures that financial hardship and challenging family circumstances do not interrupt a child education.',
        image: asset('education_continuity.jpg'),
        stats: [
            { id: 'school', value: '55', label: 'Students at Pt. Amarnath School' },
            { id: 'states', value: '65+', label: 'Children supported across states' },
            { id: 'up', value: '180+', label: 'Children supported in Uttar Pradesh' }
        ],
        sections: [
            {
                id: 'support',
                title: 'Supporting vulnerable students to stay in school',
                paragraphs: [
                    'TWW supports 55 students at Pt. Amarnath School, primarily children from economically vulnerable families, single-parent households, and families with a student with a disability.',
                    'Across various states in India, TWW has supported 65+ children from distressed and vulnerable families by helping reduce barriers to education and providing ongoing encouragement and mentorship.',
                    'In Village Lathor, Bulandshahr, Uttar Pradesh, TWW supported educational needs for 180+ children and helped enroll 100+ children through School Chalo Abhiyan.'
                ],
                bullets: [
                    'Reduced risk of school dropouts due to financial and social challenges',
                    'Improved educational continuity, attendance, and academic engagement',
                    'Outreach across 8-10 villages in the Bulandshahr region',
                    'Increased parent and community awareness about the importance of education'
                ],
                quote: 'When a child enters and stays in school, an entire future changes.'
            }
        ]
    }),
    'government-school-transformation': detailPage({
        key: 'government-school-transformation',
        label: 'Education',
        title: 'Government School Transformation',
        intro: 'TWW strengthens government school infrastructure and improves learning conditions so students can learn in safer, more inclusive environments.',
        image: asset('school_transformation.jpg'),
        stats: [
            { id: 'atmadpur', value: '1700+', label: 'Children impacted at Atmadpur' },
            { id: 'mawai', value: '550+', label: 'Children impacted at Mawai' },
            { id: 'cctv', value: '32', label: 'Cameras installed' }
        ],
        sections: [
            {
                id: 'work',
                title: 'Creating safe, inclusive, and conducive learning environments',
                paragraphs: [
                    'TWW undertook its first government school transformation initiative at Govt. Primary School Atmadpur, Faridabad, focusing on sanitation, safety, water access, infrastructure, and overall learning conditions.',
                    'TWW also completed a second school transformation at Govt. Primary School, Village Mawai, Faridabad, with school infrastructure, learning infrastructure, and facility improvements.'
                ],
                bullets: [
                    'Renovation of 6 toilets to improve sanitation and hygiene',
                    'Construction of a 1,000 sq. ft. shed for assemblies and activities',
                    'Installation of a submersible water pump for 1700+ children',
                    'Installation of 2 rainwater harvesting points',
                    'Deployment of 32 CCTV cameras to enhance campus safety',
                    'Provision of 20 chairs and 8 almirahs',
                    'Cleaning and beautification of outer walls of 6 school rooms'
                ],
                quote: 'A transformed school environment not only improves facilities - it inspires attendance, enhances learning, and creates opportunities for every child to succeed.'
            }
        ]
    }),
    'elearning-initiatives': detailPage({
        key: 'elearning-initiatives',
        label: 'Education',
        title: 'eLearning Initiatives',
        intro: 'TWW leverages technology to bridge educational gaps and provide quality learning opportunities to children from underserved communities.',
        image: asset('elearning.jpg'),
        stats: [
            { id: 'gaya', value: '175+', label: 'Children in Gaya, Bihar' },
            { id: 'kenya', value: '200+', label: 'Children planned in Kibera, Kenya' },
            { id: 'future', value: '2500+', label: 'Students in planned expansion sites' }
        ],
        sections: [
            {
                id: 'digital-learning',
                title: 'Digital learning beyond geography',
                paragraphs: [
                    'Through digital classrooms, online learning sessions, educational content, and volunteer-led virtual mentoring, TWW expands access to learning beyond geographical boundaries.',
                    'The initiative supports children in rural Bihar, community learning centers, and schools across India, while also extending educational support toward children in Kibera, Kenya.'
                ],
                bullets: [
                    'Currently teaching 175+ children in Gaya, Bihar with partner NGO Vriksh Be the Change',
                    'Plan to teach 200+ children in Kibera, Kenya with partner NGO Brainstorm Junior School',
                    'Future expansion: school in Malerkotla, Punjab - 800+ children',
                    'Future expansion: Pt. Amarnath School, Faridabad - 800+ children',
                    'Future expansion: Prakashdeep School, Faridabad - 600+ students',
                    'Future expansion: library for graduate students in Fatehpur Billoch - 200+ students',
                    'Future expansion: coaching at Bal Bhawan, Faridabad - 100+ students'
                ]
            }
        ]
    }),
    'support-for-tribal-communities': detailPage({
        key: 'support-for-tribal-communities',
        label: 'Education',
        title: 'Support for Tribal Communities',
        intro: 'TWW extended support to tribal communities in Palghar District, focusing on education access and menstrual health awareness.',
        image: asset('tribal.jpg'),
        stats: [
            { id: 'students', value: '370+', label: 'Students supported' },
            { id: 'women', value: '200+', label: 'Girls and women reached' },
            { id: 'solution', value: 'Reusable', label: 'Environment-friendly sanitary pads' }
        ],
        sections: [
            {
                id: 'dignity',
                title: 'Education and dignity go hand in hand',
                paragraphs: [
                    'TWW supported educational needs of 370+ students from tribal villages to create opportunities for learning, academic growth, and a brighter future.',
                    'The Foundation also distributed reusable, environment-friendly sanitary pads to 200+ girls and women to improve menstrual health management and reduce absenteeism among school-going girls.'
                ],
                bullets: [
                    'Improved access to learning opportunities for children in underserved tribal communities',
                    'Enhanced menstrual hygiene awareness and health practices',
                    'Reduced financial burden through sustainable menstrual hygiene solutions',
                    'Promoted environmental sustainability through reusable products',
                    'Supported girls education by helping reduce absenteeism related to menstrual health challenges'
                ],
                quote: 'True empowerment begins when education and dignity go hand in hand.'
            }
        ]
    }),
    'psychology-mental-wellbeing': detailPage({
        key: 'psychology-mental-wellbeing',
        label: 'Psychology and Mental Well-being',
        title: 'Making mental health support accessible',
        intro: 'TWW believes true empowerment requires emotional resilience, mental wellness, and a supportive environment.',
        image: asset('psychology.jpg'),
        stats: [
            { id: 'children', value: 'Children', label: 'Support for adolescents and youth' },
            { id: 'caregivers', value: 'Caregivers', label: 'Support for families and educators' },
            { id: 'communities', value: 'Communities', label: 'Awareness and resilience building' }
        ],
        sections: [
            {
                id: 'wellbeing',
                title: 'Safe spaces for emotional resilience',
                paragraphs: [
                    'Led by experienced psychologists and mental health professionals, the initiative focuses on emotional well-being, life skills, counseling support, mental health awareness, trauma-informed care, and resilience building.',
                    'Sessions are conducted in children homes, schools, colleges, community learning centers, and other institutions where individuals can express themselves, build confidence, develop healthy coping mechanisms, and strengthen overall well-being.',
                    'The vision is to integrate mental health into child welfare, education, and community development so every child and young person has the opportunity to heal, grow, and thrive.'
                ]
            }
        ]
    }),
    'children-healthcare': detailPage({
        key: 'children-healthcare',
        label: 'Children Healthcare',
        title: 'Helping children learn better, grow stronger, and build brighter futures',
        intro: 'TWW children health work improves physical, developmental, and emotional well-being by integrating healthcare support with child welfare and education programs.',
        image: asset('healthcare.jpg'),
        stats: [
            { id: 'hearing', value: '17', label: 'Children received hearing aids' },
            { id: 'health', value: '1000+', label: 'Health camp beneficiaries' },
            { id: 'future', value: 'Scale', label: 'Health screening and telehealth focus' }
        ],
        sections: [
            {
                id: 'health',
                title: 'Health screenings, awareness, and preventive care',
                paragraphs: [
                    'Through health screenings, medical camps, awareness sessions, assistive devices, and preventive healthcare interventions, TWW identifies health challenges early and helps children receive care and support.',
                    'The initiative promotes awareness on nutrition, hygiene, mental well-being, and healthy lifestyles among children, caregivers, and educators.'
                ],
                bullets: [
                    'Hearing Aid Distribution Program: provided hearing aids to 17 children with hearing impairment at Bal Bhawan Deaf and Dumb School, Faridabad',
                    'Health and hygiene awareness sessions for children and communities',
                    'Integrated healthcare support within children homes, adoption agencies, and community learning centers',
                    'Dedicated psychology and mental well-being initiative',
                    'Exploring healthcare partnerships with professionals, hospitals, CSR partners, and volunteers'
                ]
            },
            {
                id: 'future-focus',
                title: 'Future focus',
                paragraphs: [
                    'TWW aims to scale healthcare through regular health screenings, school health camps, vision and hearing assessments, nutrition support, mental health awareness, telehealth consultations, and preventive healthcare interventions across schools, children homes, and rural communities.'
                ]
            }
        ]
    }),
    'skill-development-empowerment': detailPage({
        key: 'skill-development-empowerment',
        label: 'Skill Development and Empowerment',
        title: 'Transforming skills into livelihoods',
        intro: 'TWW equips women, youth, and specially abled individuals with practical, market-relevant skills that enhance employability, entrepreneurship, and financial independence.',
        image: asset('skill_development.jpg'),
        stats: [
            { id: 'women', value: '100+', label: 'Women and girls trained annually' },
            { id: 'trades', value: '3+', label: 'Vocational pathways' },
            { id: 'empower', value: 'EMPOWER', label: 'Program for specially abled individuals' }
        ],
        sections: [
            {
                id: 'women',
                title: 'Women empowerment through skill development centers',
                paragraphs: [
                    'TWW supports vocational training centers that provide structured skill development opportunities for women and girls from economically disadvantaged backgrounds.',
                    'Training includes fashion designing, tailoring, stitching, beautician training, grooming, salon management, and entrepreneurship pathways.'
                ],
                bullets: [
                    '100+ women and girls trained annually',
                    'Enhanced employability, income-generation opportunities, and self-confidence',
                    'Promotion of women economic empowerment and self-reliance'
                ]
            },
            {
                id: 'empower',
                title: 'Project EMPOWER for specially abled individuals',
                paragraphs: [
                    'Project EMPOWER creates livelihood opportunities and promotes financial independence among specially abled individuals.',
                    'The candle making program at the Learning Centre for Special Children in Faridabad provides hands-on vocational training, creativity, confidence building, and income-generating opportunities.'
                ],
                bullets: [
                    'Supporting specially abled individuals through vocational training',
                    'Promoting inclusion, dignity, and economic participation',
                    'Creating pathways toward self-reliance and sustainable livelihoods'
                ]
            },
            {
                id: 'future',
                title: 'Future plans',
                paragraphs: [
                    'TWW aims to expand skill development by establishing additional vocational training centers in rural and underserved communities, introducing new trades and digital skills, supporting micro-enterprises, and creating stronger industry linkages.'
                ],
                quote: 'By transforming skills into opportunities and opportunities into livelihoods, we are empowering individuals to build brighter, more independent, and dignified futures.'
            }
        ]
    }),
    'rural-transformation': detailPage({
        key: 'rural-transformation',
        label: 'Rural Transformation',
        title: 'Integrated Rural Transformation and Empowerment',
        intro: 'TWW aims to establish community-centered rural transformation and empowerment centers as integrated hubs for development.',
        image: asset('rural_library.jpg'),
        stats: [
            { id: 'lives', value: '35,000+', label: 'Lives impacted' },
            { id: 'villages', value: '6-8', label: 'Villages in cluster' },
            { id: 'pillars', value: '7', label: 'Rural transformation pillars' }
        ],
        sections: [
            {
                id: 'need',
                title: 'A holistic response to interconnected rural challenges',
                paragraphs: [
                    'Rural communities face interconnected challenges related to healthcare access, educational inequality, women economic dependency, child welfare concerns, unemployment, water scarcity, electricity scarcity, waste management, and limited livelihood opportunities.',
                    'The initiative is rooted in a people-first development philosophy and aims to create empowered, self-reliant, healthy, environmentally responsible, and economically sustainable rural communities.'
                ],
                bullets: [
                    'Healthcare awareness and telemedicine support',
                    'Digital learning and library facilities',
                    'Women vocational and livelihood training',
                    'Youth employability and career guidance programs',
                    'Child development and nutrition support',
                    'Water conservation and rainwater harvesting awareness',
                    'Waste segregation, recycling, and sanitation awareness',
                    'Renewable energy using solar power',
                    'Community engagement and capacity-building activities'
                ]
            }
        ],
        relatedLinks: [
            { id: 'team', title: 'Our Team and Consortium Model', href: initiativeHref('our-team'), description: 'TWW as consortium secretariat and coordinating organization.' },
            { id: 'pillars', title: '7 Pillars of Rural Transformation', href: initiativeHref('rural-transformation-pillars'), description: 'The framework for sustainable village development.' }
        ]
    }),
    'our-team': detailPage({
        key: 'our-team',
        label: 'Rural Transformation',
        title: 'Our Team and Consortium Model',
        intro: 'TWW is contributing to the rural transformation vision in Village Fatehpur Billoch, Faridabad, where it serves as Consortium Secretariat in a community-led development model.',
        image: asset('rural_consortium_partners.png'),
        stats: [
            { id: 'role', value: 'Secretariat', label: 'TWW consortium role' },
            { id: 'model', value: 'Shared', label: 'Expertise and resources' },
            { id: 'governance', value: 'Transparent', label: 'Governance and accountability' }
        ],
        sections: [
            {
                id: 'philosophy',
                title: 'Consortium philosophy',
                paragraphs: [
                    'The model recognizes that no single organization can independently solve complex and interconnected rural challenges.',
                    'Healthcare, education, women empowerment, water sustainability, waste management, livelihood generation, and child welfare require integrated and collaborative solutions.'
                ],
                bullets: [
                    'Shared expertise and resources',
                    'Greater outreach and scalability',
                    'Specialized domain support',
                    'Community-driven implementation',
                    'Stronger governance and accountability',
                    'Sustainable long-term impact'
                ]
            },
            {
                id: 'tww-role',
                title: 'Role of Together We Will Foundation',
                paragraphs: [
                    'TWW coordinates partnerships, implementation planning, stakeholder engagement, volunteer mobilization, and overall program governance while ensuring transparency, accountability, and alignment with project objectives.'
                ],
                bullets: [
                    'Consortium Secretariat',
                    'Program Coordinator',
                    'Strategic Leadership',
                    'CSR Engagement and Reporting Lead',
                    'Subject Matter Expert network management',
                    'Global Partnerships and Linkages',
                    'Government Convergence',
                    'Monitoring and Impact Assessment Facilitator'
                ]
            }
        ]
    }),
    'rural-transformation-pillars': detailPage({
        key: 'rural-transformation-pillars',
        label: 'Rural Transformation',
        title: '7 Pillars of Rural Transformation',
        intro: 'The 7-pillar framework creates a scalable and sustainable model for inclusive rural development.',
        image: asset('rural_hospital.jpg'),
        stats: [
            { id: 'lives', value: '35,000+', label: 'Lives impacted' },
            { id: 'students', value: '200+', label: 'Graduate students supported' },
            { id: 'women', value: '100+', label: 'Women empowered' }
        ],
        sections: [
            {
                id: 'pillars',
                title: 'The seven pillars',
                paragraphs: [
                    'The rural transformation framework is designed to create self-reliant, inclusive, and thriving ecosystems where every child learns, every family lives with dignity, every woman is empowered, and every community has access to quality healthcare, education, sustainable livelihoods, and environmental resources.'
                ],
                bullets: [
                    'Education: school transformation, community learning centers, libraries, digital learning, enrollment drives, and educational support',
                    'Child Welfare: child protection, educational support, nutrition, mental well-being, and community engagement',
                    'Healthcare: hospitals, screenings, medical camps, hygiene, nutrition, preventive healthcare, and mental wellness',
                    'Skill Development and Livelihoods: vocational skills, entrepreneurship, employability, and self-reliance',
                    'Water Conservation: rainwater harvesting, groundwater recharge, awareness, and stewardship',
                    'Waste Management: segregation, recycling, sanitation awareness, plastic reduction, and responsible practices',
                    'Solar Power and Renewable Energy: clean energy for schools, healthcare facilities, community centers, and village infrastructure'
                ]
            },
            {
                id: 'impact',
                title: 'Rural transformation impact',
                bullets: [
                    '35,000+ lives impacted across a cluster of 6-8 villages',
                    '200+ graduate students supported through a community library and learning resource center',
                    '100+ women empowered through vocational training and livelihood programs',
                    'Community hospital operational for 3+ years',
                    'Girls child home supported with care, protection, education, and holistic development',
                    'Water conservation, waste management, and renewable energy solutions promoted',
                    'Consortium-based development model for scalable and sustainable replication'
                ]
            }
        ]
    })
};

const PAGES = {
    about: {
        key: 'about',
        section: 'about',
        template: 'about',
        label: 'About Us',
        title: 'Creating Opportunities. Transforming Lives.',
        intro: 'Together We Will Foundation is a volunteer-driven non-profit empowering underprivileged children, vulnerable families, women, and communities through sustainable interventions.',
        stats: [
            { id: 'volunteers', value: '1000+', label: 'Volunteers' },
            { id: 'states', value: '14', label: 'States in India' },
            { id: 'countries', value: '3', label: 'Countries' }
        ]
    },
    'working-model': {
        key: 'working-model',
        section: 'working-model',
        template: 'model',
        label: 'Our Working Model',
        title: 'Volunteer-powered. Partnership-driven. Zero operating cost.',
        intro: 'TWW combines volunteer leadership, strategic partnerships, community participation, and efficient resource utilization to create transparent, scalable, and sustainable impact.',
        stats: [
            { id: 'promise', value: '100%', label: 'Impact promise' },
            { id: 'steps', value: '6', label: 'Impact cycle steps' },
            { id: 'model', value: '0', label: 'Operating cost model' }
        ]
    },
    initiatives: {
        key: 'initiatives',
        section: 'initiatives',
        template: 'initiatives',
        label: 'Flagship Initiatives',
        title: 'Integrated programs across welfare, education, health, skills, and rural transformation',
        intro: 'Explore TWW flagship initiatives and open detailed sub-pages for each program area.',
        stats: [
            { id: 'initiatives', value: '20+', label: 'Projects executed' },
            { id: 'schools', value: '15+', label: 'Schools supported' },
            { id: 'villages', value: '6-8', label: 'Villages in rural model' }
        ]
    },
    programs: {
        key: 'programs',
        section: 'initiatives',
        template: 'initiatives',
        label: 'What We Do',
        title: 'Flagship Initiatives',
        intro: 'Explore the initiatives that define TWW work across education, welfare, healthcare, mental well-being, skill development, and rural transformation.',
        stats: [
            { id: 'initiatives', value: '20+', label: 'Projects executed' },
            { id: 'states', value: '14', label: 'States covered' },
            { id: 'countries', value: '3', label: 'Countries' }
        ]
    },
    projects: {
        key: 'projects',
        section: 'initiatives',
        template: 'initiatives',
        label: 'Our Projects',
        title: 'Flagship Initiatives',
        intro: 'A project-level view of TWW work, updated from the website amendment brief and supporting image library.',
        stats: [
            { id: 'initiatives', value: '20+', label: 'Projects executed' },
            { id: 'schools', value: '15+', label: 'Schools supported' },
            { id: 'health', value: '1000+', label: 'Health camp beneficiaries' }
        ]
    },
    ...INITIATIVE_DETAIL_PAGES,
    impact: {
        key: 'impact',
        section: 'impact',
        template: 'impact',
        label: 'Impact',
        title: 'Impact Dashboard',
        intro: 'The dashboard summarizes lives impacted, volunteers, children reunited with families, education continuity, reach, stories of change, and annual reports.',
        stats: IMPACT_STATS.slice(0, 5)
    },
    reports: {
        key: 'reports',
        section: 'impact',
        template: 'impact',
        label: 'Reports',
        title: 'Annual Reports and Impact',
        intro: 'Access public annual report links from 2021-22 through 2024-25.',
        stats: IMPACT_STATS.slice(0, 5)
    },
    stories: {
        key: 'stories',
        section: 'impact',
        template: 'impact',
        label: 'Stories of Change',
        title: 'Stories of Change',
        intro: 'Real stories show how timely education, mentoring, and skills support help beneficiaries become confident and self-reliant.',
        stats: IMPACT_STATS.slice(0, 5)
    },
    partners: {
        key: 'partners',
        section: 'partners',
        template: 'partners',
        label: 'Alliance and Partners',
        title: 'Partner With a Transparent, High-Impact Model',
        intro: 'TWW helps corporates, government institutions, NGOs, schools, and communities create measurable multi-sector impact.',
        stats: [
            { id: 'csr', value: 'CSR', label: 'Partnership opportunities' },
            { id: 'model', value: '0', label: 'Operating cost model' },
            { id: 'impact', value: '100%', label: 'Beneficiary-centric deployment' }
        ]
    },
    'get-involved': {
        key: 'get-involved',
        section: 'get-involved',
        template: 'getInvolved',
        label: 'Get Involved',
        title: 'Every contribution creates ripples of change',
        intro: 'Volunteer, donate, contribute resources, or bring your professional skills to education, child welfare, healthcare, skills, and rural transformation.',
        stats: [
            { id: 'volunteer', value: '5', label: 'Volunteer pathways' },
            { id: 'donate', value: '5', label: 'Donation focus areas' },
            { id: 'resources', value: '4', label: 'Resource categories' }
        ]
    },
    volunteer: {
        key: 'volunteer',
        section: 'get-involved',
        template: 'getInvolved',
        label: 'Volunteer',
        title: 'Volunteer With Us',
        intro: 'Join a volunteer-powered movement creating direct impact through teaching, mentoring, psychology support, corporate volunteering, and project execution.',
        stats: [
            { id: 'volunteers', value: '1000+', label: 'Volunteers' },
            { id: 'states', value: '14', label: 'States covered' },
            { id: 'countries', value: '3', label: 'Countries' }
        ]
    },
    'news-media': {
        key: 'news-media',
        section: 'news-media',
        template: 'news',
        label: 'News and Media',
        title: 'Stay connected with TWW updates and stories',
        intro: 'Explore project updates, stories, achievements, media coverage, newsletters, photographs, campaigns, partnerships, and event highlights.',
        stats: [
            { id: 'channels', value: '3', label: 'Social QR channels' },
            { id: 'updates', value: 'Live', label: 'Project updates' },
            { id: 'stories', value: 'Ongoing', label: 'Impact stories' }
        ]
    },
    contact: {
        key: 'contact',
        section: 'contact',
        template: 'contact',
        label: 'Contact Us',
        title: 'Connect With Together We Will',
        intro: 'Reach out to volunteer, donate, partner, or explore opportunities to create lasting impact.',
        stats: [
            { id: 'person', value: 'Munish Pandhi', label: 'Chairman and Managing Trustee' },
            { id: 'phone', value: '+91 9899703571', label: 'Mobile' },
            { id: 'whatsapp', value: '9220119110', label: 'WhatsApp chatbot' }
        ]
    },
    donate: {
        key: 'donate',
        section: 'donate',
        template: 'donate',
        label: 'Ways to Donate',
        title: 'Donate to Together We Will Foundation',
        intro: 'Support education, child welfare, healthcare, skill development, rural transformation, or contribute resources for program needs.',
        stats: [
            { id: 'promise', value: '100%', label: 'Impact promise' },
            { id: 'model', value: '0', label: 'Operating cost model' },
            { id: 'areas', value: '5', label: 'Donation focus areas' }
        ]
    },
    legal: {
        key: 'legal',
        section: 'legal',
        template: 'legal',
        label: 'Legal and Compliance',
        title: 'Policies, Transparency, and Donor Trust',
        intro: 'The site identifies key compliance pages for safeguarding, privacy, terms, fraud prevention, and donation refund or cancellation guidance.',
        stats: [
            { id: 'policies', value: '5', label: 'Policy areas' },
            { id: 'model', value: '0', label: 'Operating cost model' },
            { id: 'trust', value: '100%', label: 'Transparency commitment' }
        ]
    }
};

export default class TwwContentPages extends NavigationMixin(LightningElement) {
    foundationLogo = FOUNDATION_LOGO;
    heroBackground = asset('home_yoga.jpg');
    aboutImage = asset('about_cover.jpg');
    visionImage = asset('vision_graphic.jpg');
    missionImage = asset('mission_graphic.jpg');
    ruralHospitalImage = asset('rural_hospital.jpg');
    ruralLibraryImage = asset('rural_library.jpg');
    impactStoryImage = asset('impact_story.jpg');
    partnersCsrImage = asset('partners_csr.jpg');
    partnersGovtImage = asset('partners_govt_ngo.jpg');
    consortiumImage = asset('rural_consortium_partners.png');
    donationQrImage = asset('donation_qr.png');
    currentKey = 'about';

    connectedCallback() {
        this.currentKey = this.resolvePageKey();
    }

    resolvePageKey() {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const key = segments[segments.length - 1] || 'about';
        return PAGES[key] ? key : 'about';
    }

    get page() {
        return PAGES[this.currentKey] || PAGES.about;
    }

    get navItems() {
        const activeSection = this.page.section || this.currentKey;
        return NAV_ITEMS.map((item) => ({
            ...item,
            className: item.key === activeSection ? 'nav-link nav-link-active' : 'nav-link'
        }));
    }

    get heroStyle() {
        return `background-image: linear-gradient(90deg, rgba(18, 51, 35, 0.9), rgba(18, 51, 35, 0.64)), url(${this.heroBackground});`;
    }

    get isAbout() {
        return this.page.template === 'about';
    }

    get isModel() {
        return this.page.template === 'model';
    }

    get isInitiatives() {
        return this.page.template === 'initiatives';
    }

    get isInitiativeDetail() {
        return this.page.template === 'initiativeDetail';
    }

    get isImpact() {
        return this.page.template === 'impact';
    }

    get isPartners() {
        return this.page.template === 'partners';
    }

    get isGetInvolved() {
        return this.page.template === 'getInvolved';
    }

    get isNews() {
        return this.page.template === 'news';
    }

    get isContact() {
        return this.page.template === 'contact';
    }

    get isDonate() {
        return this.page.template === 'donate';
    }

    get isLegal() {
        return this.page.template === 'legal';
    }

    get showFuturePlans() {
        return this.currentKey === 'initiatives' || this.currentKey === 'programs' || this.currentKey === 'projects' || this.currentKey === 'partners';
    }

    get hasRelatedLinks() {
        return Boolean(this.page.relatedLinks && this.page.relatedLinks.length);
    }

    get coreValues() {
        return CORE_VALUES;
    }

    get journeyItems() {
        return JOURNEY_ITEMS;
    }

    get workingModel() {
        return WORKING_MODEL;
    }

    get impactCycle() {
        return IMPACT_CYCLE;
    }

    get initiatives() {
        return INITIATIVES;
    }

    get initiativeSections() {
        return this.page.sections || [];
    }

    get initiativeRelatedLinks() {
        return this.page.relatedLinks || [];
    }

    get ruralPillars() {
        return RURAL_PILLARS;
    }

    get impactStats() {
        return IMPACT_STATS;
    }

    get helpItems() {
        return HELP_ITEMS;
    }

    get partnerReasons() {
        return PARTNER_REASONS;
    }

    get csrAreas() {
        return CSR_AREAS;
    }

    get futurePlans() {
        return FUTURE_PLANS;
    }

    get reports() {
        return REPORTS;
    }

    get bankDetails() {
        return BANK_DETAILS;
    }

    get socialLinks() {
        return SOCIAL_LINKS;
    }

    get contactImages() {
        return CONTACT_IMAGES;
    }

    get legalItems() {
        return LEGAL_ITEMS;
    }

    get footerPrimaryLinks() {
        return [
            { id: 'about', label: 'About Us', href: '/togetherwewill/about' },
            { id: 'model', label: 'Working Model', href: '/togetherwewill/working-model' },
            { id: 'initiatives', label: 'Flagship Initiatives', href: '/togetherwewill/initiatives' },
            { id: 'impact', label: 'Impact', href: '/togetherwewill/impact' },
            { id: 'partners', label: 'Partners', href: '/togetherwewill/partners' }
        ];
    }

    get footerActionLinks() {
        return [
            { id: 'get-involved', label: 'Get Involved', href: '/togetherwewill/get-involved' },
            { id: 'donate', label: 'Donate', href: '/togetherwewill/donate' },
            { id: 'news', label: 'News and Media', href: '/togetherwewill/news-media' },
            { id: 'legal', label: 'Legal and Compliance', href: '/togetherwewill/legal' }
        ];
    }

    handleDonate() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/togetherwewill/donate'
            }
        });
    }
}
