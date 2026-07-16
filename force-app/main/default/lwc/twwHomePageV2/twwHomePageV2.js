import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FOUNDATION_LOGO from '@salesforce/resourceUrl/FoundationLogo';
import INCLUSIVE_HEART_LOGO from '@salesforce/resourceUrl/InclusiveHeartLogo';
import SITE_IMAGES from '@salesforce/resourceUrl/TWW_Site_Images';

const image = (fileName) => `${SITE_IMAGES}/${fileName}`;
const CUSTOM_DOMAIN = 'togetherwewill.org.in';
const FALLBACK_SITE_PREFIX = '/togetherwewill';

const normalizePath = (path) => {
    if (!path || path === '/') {
        return '/';
    }

    return `/${path.replace(/^\/+/, '')}`;
};

const isCustomDomain = () => window.location.hostname.endsWith(CUSTOM_DOMAIN);

const sitePath = (path) => {
    const normalized = normalizePath(path);

    if (isCustomDomain()) {
        return normalized;
    }

    return normalized === '/' ? `${FALLBACK_SITE_PREFIX}/` : `${FALLBACK_SITE_PREFIX}${normalized}`;
};

const NAV_ITEMS = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'about', label: 'About', path: '/about' },
    { key: 'working-model', label: 'Model', path: '/working-model' },
    { key: 'initiatives', label: 'Initiatives', path: '/initiatives' },
    { key: 'impact', label: 'Impact', path: '/impact' },
    { key: 'partners', label: 'Partners', path: '/partners' },
    { key: 'contact', label: 'Contact', path: '/contact' }
];

const FOOTER_PRIMARY_LINKS = [
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'model', label: 'Working Model', path: '/working-model' },
    { id: 'initiatives', label: 'Flagship Initiatives', path: '/initiatives' },
    { id: 'impact', label: 'Impact', path: '/impact' },
    { id: 'partners', label: 'Partners', path: '/partners' }
];

const FOOTER_ACTION_LINKS = [
    { id: 'get-involved', label: 'Volunteer', path: '/get-involved' },
    { id: 'donate', label: 'Donate', path: '/donate' },
    { id: 'news', label: 'News and Media', path: '/news-media' },
    { id: 'legal', label: 'Legal and Compliance', path: '/legal' }
];

const FOCUS_AREAS = [
    {
        id: 'education',
        title: 'Education',
        description: 'Empowering children with access to quality education, digital learning, and opportunities to achieve their full potential.',
        image: image('bal_shiksha.jpg'),
        imageAlt: 'Children participating in a Together We Will education program',
        linkLabel: 'Explore Together We Will education initiatives'
    },
    {
        id: 'child-welfare',
        title: 'Child Welfare',
        description: 'Supporting vulnerable children through protection, care, development, and nurturing environments.',
        image: image('child_home.jpg'),
        imageAlt: 'Children supported through Together We Will child welfare programs',
        linkLabel: 'Explore Together We Will child welfare initiatives'
    },
    {
        id: 'children-healthcare',
        title: 'Children Healthcare',
        description: 'Promoting healthier futures through health screenings, awareness, medical support, and preventive care.',
        image: image('healthcare.jpg'),
        imageAlt: 'Healthcare support activity for children and families',
        linkLabel: 'Explore Together We Will children healthcare initiatives'
    },
    {
        id: 'mental-wellbeing',
        title: 'Mental Well-being',
        description: 'Strengthening emotional resilience and mental wellness for children, youth, and communities.',
        image: image('psychology.jpg'),
        imageAlt: 'Mental well-being and counseling support session',
        linkLabel: 'Explore Together We Will mental well-being initiatives'
    },
    {
        id: 'skill-development',
        title: 'Skill Development',
        description: 'Transforming skills into livelihoods through vocational training, entrepreneurship, and empowerment programs.',
        image: image('skill_development.jpg'),
        imageAlt: 'Skill development and livelihood training session',
        linkLabel: 'Explore Together We Will skill development initiatives'
    },
    {
        id: 'rural-transformation',
        title: 'Rural Transformation',
        description: 'Building sustainable and self-reliant communities through integrated rural development initiatives.',
        image: image('rural_library.jpg'),
        imageAlt: 'Rural community learning space supported by Together We Will',
        linkLabel: 'Explore Together We Will rural transformation initiatives'
    }
];

const IMPACT_STATS = [
    { id: 'lives', value: '10,000+', label: 'Lives impacted since inception' },
    { id: 'volunteers', value: '1000+', label: 'Volunteers across the globe' },
    { id: 'reunited', value: '600+', label: 'Children reunited with family' },
    { id: 'education-continuity', value: '60+', label: 'Students supported for education continuity' },
    { id: 'presence', value: '14 + 3', label: 'States in India and countries: India, USA, Kenya' }
];

const FUTURE_PLANS = [
    'Expand Child Home support to more cities',
    'Establish additional Bal Shiksha Kendras',
    'Adopt and transform more government schools',
    'Expand presence beyond 14 states and 3 countries',
    'Launch additional skill development centers',
    'Establish a holistic primary school for underprivileged children',
    'Scale mental health and psychology programs across India',
    'Build replicable rural transformation models'
];

export default class TwwHomePageV2 extends NavigationMixin(LightningElement) {
    foundationLogo = FOUNDATION_LOGO;
    inclusiveHeartLogo = INCLUSIVE_HEART_LOGO;
    heroImage = image('home_yoga.jpg');
    aboutImage = image('about_cover.jpg');
    impactStoryImage = image('impact_story.jpg');
    focusAreas = FOCUS_AREAS;
    impactStats = IMPACT_STATS;
    futurePlans = FUTURE_PLANS;

    get heroSectionStyle() {
        return `background-image: linear-gradient(90deg, rgba(18, 51, 35, 0.9), rgba(18, 51, 35, 0.62)), url(${this.heroImage});`;
    }

    get homeHref() {
        return sitePath('/');
    }

    get initiativesHref() {
        return sitePath('/initiatives');
    }

    get impactHref() {
        return sitePath('/impact');
    }

    get navItems() {
        return NAV_ITEMS.map((item) => ({
            ...item,
            href: sitePath(item.path),
            className: item.key === 'home' ? 'nav-link nav-link-active' : 'nav-link',
            ariaCurrent: item.key === 'home' ? 'page' : null
        }));
    }

    get footerPrimaryLinks() {
        return FOOTER_PRIMARY_LINKS.map((link) => ({
            ...link,
            href: sitePath(link.path)
        }));
    }

    get footerActionLinks() {
        return FOOTER_ACTION_LINKS.map((link) => ({
            ...link,
            href: sitePath(link.path)
        }));
    }

    handleDonate() {
        this.navigateTo(sitePath('/donate'));
    }

    handleVolunteer() {
        this.navigateTo(sitePath('/get-involved'));
    }

    handleContact() {
        this.navigateTo(sitePath('/contact'));
    }

    handleShare() {
        const shareUrl = `${window.location.origin}${sitePath('/')}`;
        const shareText = 'Join Together We Will Foundation in transforming lives through education, child welfare, healthcare, skill development, and rural empowerment.';

        if (navigator.share) {
            navigator.share({
                title: 'Together We Will Foundation',
                text: shareText,
                url: shareUrl
            });
            return;
        }

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank'
        );
    }

    navigateTo(url) {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url
            }
        });
    }
}
