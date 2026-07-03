import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FOUNDATION_LOGO from '@salesforce/resourceUrl/FoundationLogo';
import INCLUSIVE_HEART_LOGO from '@salesforce/resourceUrl/InclusiveHeartLogo';
import SITE_IMAGES from '@salesforce/resourceUrl/TWW_Site_Images';

const image = (fileName) => `${SITE_IMAGES}/${fileName}`;

const FOCUS_AREAS = [
    {
        id: 'education',
        title: 'Education',
        description: 'Empowering children with access to quality education, digital learning, and opportunities to achieve their full potential.',
        image: image('bal_shiksha.jpg')
    },
    {
        id: 'child-welfare',
        title: 'Child Welfare',
        description: 'Supporting vulnerable children through protection, care, development, and nurturing environments.',
        image: image('child_home.jpg')
    },
    {
        id: 'children-healthcare',
        title: 'Children Healthcare',
        description: 'Promoting healthier futures through health screenings, awareness, medical support, and preventive care.',
        image: image('healthcare.jpg')
    },
    {
        id: 'mental-wellbeing',
        title: 'Mental Well-being',
        description: 'Strengthening emotional resilience and mental wellness for children, youth, and communities.',
        image: image('psychology.jpg')
    },
    {
        id: 'skill-development',
        title: 'Skill Development',
        description: 'Transforming skills into livelihoods through vocational training, entrepreneurship, and empowerment programs.',
        image: image('skill_development.jpg')
    },
    {
        id: 'rural-transformation',
        title: 'Rural Transformation',
        description: 'Building sustainable and self-reliant communities through integrated rural development initiatives.',
        image: image('rural_library.jpg')
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

    handleDonate() {
        this.navigateTo('/togetherwewill/donate');
    }

    handleVolunteer() {
        this.navigateTo('/togetherwewill/get-involved');
    }

    handleContact() {
        this.navigateTo('/togetherwewill/contact');
    }

    handleShare() {
        const shareUrl = 'https://togetherwewillfoundation2--twwdev.sandbox.my.site.com/togetherwewill/';
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