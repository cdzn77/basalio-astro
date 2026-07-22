export interface CourseModule {
  number: number;
  title: string;
}

export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  enrollLabel: string;
  descriptionTitle: string;
  descriptionText: string;
  highlights: string[];
  heroImage: string;
  whoIsThisFor: {
    icon: string;
    title: string;
    description: string;
  }[];
  courseOverviewHeading: string;
  courseOverviewDescription: string;
  downloadLabel: string;
  modules: CourseModule[];
  moduleImage: string;
  tools: {
    title: string;
    description: string;
  }[];
  toolsImage: string;
  instructor: {
    name: string;
    image: string;
    title: string;
    years: number;
    expertise: string;
    industry: string;
    bio: string;
  };
  instructorImage: string;
  closingImage: string;
  tag: string;
}

export const courses: Record<string, Course> = {
  'social-media': {
    slug: 'social-media',
    title: 'Social Media Growth',
    shortDescription: 'Learn the fundamentals of building a strong social media presence',
    fullDescription: 'Turn views into followers and followers into buyers with a content strategy built around psychology, storytelling, and conversion design.',
    enrollLabel: 'ENROLL TODAY',
    descriptionTitle: 'DESCRIPTION',
    descriptionText: 'Step into the heart of social media foundation.',
    highlights: [
      'Conversion-Backed Frameworks',
      'Messaging & CTA Formulas',
      'Analytics-Driven Optimization'
    ],
    heroImage: '/assets/images/lguwh6gjbkswahnbzm6wiklse7e.jpeg',
    whoIsThisFor: [
      {
        icon: '👨‍🎨',
        title: "It\'s a Designer",
        description: 'Posting consistently but not seeing growth'
      },
      {
        icon: '🎬',
        title: "It\'s a Creative",
        description: 'Feeling lost about what to post'
      },
      {
        icon: '📱',
        title: "It\'s a Social Media Manager",
        description: 'Poor content planning results in low conversions'
      },
      {
        icon: '💼',
        title: "It\'s a Freelancer",
        description: 'Limited understanding of audience behavior'
      }
    ],
    courseOverviewHeading: 'COURSE OVERVIEW',
    courseOverviewDescription: 'This course is designed to give you the clarity, confidence, and strategy you\'ve been missing.',
    downloadLabel: 'DOWNLOAD',
    modules: [
      { number: 1, title: 'Content Strategy Foundations' },
      { number: 2, title: "Defining Your Brand's Messaging" },
      { number: 3, title: 'Planning High-Converting Content' },
      { number: 4, title: 'Hook, Caption & CTA Frameworks' },
      { number: 5, title: 'Building Your Monthly Calendar' }
    ],
    moduleImage: '/assets/images/mtgtbdnjaof929atjpy1noqquia.jpeg',
    tools: [
      {
        title: 'Content Creation',
        description: 'Canva, Figma, Adobe Creative Suite'
      },
      {
        title: 'Content Automation',
        description: 'Later, Buffer, Hootsuite'
      },
      {
        title: 'Analytics & Insights',
        description: 'Google Analytics, Instagram Insights, Social Blade'
      }
    ],
    toolsImage: '/assets/images/ey0lplz9tdxyviykxypoozpnsng.png',
    instructor: {
      name: 'Avery Liu',
      image: '/assets/images/qnyuwslblxxvocmutu89ykmf8.png',
      title: 'Marketing Strategist',
      years: 8,
      expertise: 'Content Strategy & Social Media',
      industry: 'SaaS & E-commerce',
      bio: 'With 8+ years of experience, Avery has helped 200+ brands scale their social media presence from 0 to 100k+ followers. Specializing in audience psychology and conversion optimization.'
    },
    instructorImage: '/assets/images/wwm2waimiwnvahhxgmjc07jgew.jpg',
    closingImage: '/assets/images/ey0lplz9tdxyviykxypoozpnsng.png',
    tag: 'Beginner Friendly'
  },
  'content-101': {
    slug: 'content-101',
    title: 'Content Creation 101',
    shortDescription: 'Teaches you how to create content that feels intentional and on-brand',
    fullDescription: 'Master the art of creating compelling, on-brand content that resonates with your audience and drives meaningful engagement.',
    enrollLabel: 'ENROLL TODAY',
    descriptionTitle: 'DESCRIPTION',
    descriptionText: 'Learn to create content that tells your story.',
    highlights: [
      'Brand Voice Development',
      'Content Pillars Framework',
      'Storytelling Techniques'
    ],
    heroImage: '/assets/course-2.png',
    whoIsThisFor: [
      {
        icon: '👩‍💼',
        title: 'Content Creators',
        description: 'Develop a systematic approach to content creation'
      },
      {
        icon: '📝',
        title: 'Copywriters',
        description: 'Learn brand-aligned writing frameworks'
      },
      {
        icon: '🎤',
        title: 'Thought Leaders',
        description: 'Build authority through consistent content'
      },
      {
        icon: '🚀',
        title: 'Entrepreneurs',
        description: 'Create content that sells without selling'
      }
    ],
    courseOverviewHeading: 'COURSE OVERVIEW',
    courseOverviewDescription: 'Learn to create a content system that works for you, not against you.',
    downloadLabel: 'DOWNLOAD',
    modules: [
      { number: 1, title: 'Finding Your Content Voice' },
      { number: 2, title: 'Building Your Content Pillars' },
      { number: 3, title: 'Creating Cornerstone Content' },
      { number: 4, title: 'Content Distribution Strategy' },
      { number: 5, title: 'Measuring & Optimizing Performance' }
    ],
    moduleImage: '/assets/course-3.png',
    tools: [
      {
        title: 'Writing Tools',
        description: 'Notion, Google Docs, Hemingway App'
      },
      {
        title: 'Design Tools',
        description: 'Canva, Adobe InDesign'
      },
      {
        title: 'Analytics',
        description: 'Google Analytics, SEMrush'
      }
    ],
    toolsImage: '/assets/course-4.png',
    instructor: {
      name: 'Marcus Chen',
      image: '/assets/instructor-marcus.png',
      title: 'Content Strategist',
      years: 7,
      expertise: 'Content Strategy & Copywriting',
      industry: 'Technology & SaaS',
      bio: 'Marcus has helped 150+ teams develop content strategies that generate 10x more engagement. Known for making content strategy accessible to everyone.'
    },
    instructorImage: '/assets/course-1.png',
    closingImage: '/assets/course-2.png',
    tag: 'Beginner Friendly'
  },
  'branding-101': {
    slug: 'branding-101',
    title: 'Branding 101',
    shortDescription: 'Focus on positioning, messaging, and consistency across every touchpoint.',
    fullDescription: 'Build a cohesive brand identity that stands out, resonates with your audience, and commands premium pricing.',
    enrollLabel: 'ENROLL TODAY',
    descriptionTitle: 'DESCRIPTION',
    descriptionText: 'Create a brand that people actually remember.',
    highlights: [
      'Brand Positioning Framework',
      'Visual Identity System',
      'Brand Voice Guidelines'
    ],
    heroImage: '/assets/course-3.png',
    whoIsThisFor: [
      {
        icon: '🎨',
        title: 'Designers',
        description: 'Build comprehensive brand systems'
      },
      {
        icon: '💡',
        title: 'Entrepreneurs',
        description: 'Define your unique market position'
      },
      {
        icon: '📊',
        title: 'Business Owners',
        description: 'Create brand consistency across channels'
      },
      {
        icon: '🔧',
        title: 'Creatives',
        description: 'Understand brand strategy fundamentals'
      }
    ],
    courseOverviewHeading: 'COURSE OVERVIEW',
    courseOverviewDescription: 'A comprehensive guide to building a brand that lasts.',
    downloadLabel: 'DOWNLOAD',
    modules: [
      { number: 1, title: 'Understanding Brand Strategy' },
      { number: 2, title: 'Market Positioning & Differentiation' },
      { number: 3, title: 'Developing Your Brand Visual Identity' },
      { number: 4, title: 'Creating Brand Guidelines' },
      { number: 5, title: 'Brand Consistency Across Touchpoints' }
    ],
    moduleImage: '/assets/course-4.png',
    tools: [
      {
        title: 'Design Tools',
        description: 'Figma, Adobe XD, Illustrator'
      },
      {
        title: 'Brand Tools',
        description: 'Brand.ai, Brandfolder'
      },
      {
        title: 'Planning',
        description: 'Miro, Notion, Asana'
      }
    ],
    toolsImage: '/assets/course-1.png',
    instructor: {
      name: 'Sarah Williams',
      image: '/assets/instructor-sarah.png',
      title: 'Brand Strategist',
      years: 10,
      expertise: 'Brand Strategy & Design',
      industry: 'Luxury & Premium Brands',
      bio: 'Sarah has built recognizable brands for 100+ companies ranging from startups to Fortune 500s. Specializes in positioning premium brands in competitive markets.'
    },
    instructorImage: '/assets/course-2.png',
    closingImage: '/assets/course-3.png',
    tag: 'Self Paced'
  },
  'best-practices': {
    slug: 'best-practices',
    title: 'Email Marketing 101',
    shortDescription: 'Learn how to use email lists to actually support and grow your business',
    fullDescription: 'Discover email marketing strategies that build relationships, increase revenue, and create raving fans of your business.',
    enrollLabel: 'ENROLL TODAY',
    descriptionTitle: 'DESCRIPTION',
    descriptionText: 'Email is still the highest ROI channel.',
    highlights: [
      'List Building Strategies',
      'Email Copywriting Formulas',
      'Automation & Segmentation'
    ],
    heroImage: '/assets/course-4.png',
    whoIsThisFor: [
      {
        icon: '📧',
        title: 'Email Marketers',
        description: 'Master advanced email strategies'
      },
      {
        icon: '🛍️',
        title: 'E-commerce Owners',
        description: 'Increase customer lifetime value'
      },
      {
        icon: '📱',
        title: 'Social Media Managers',
        description: 'Build owned channels with email'
      },
      {
        icon: '💰',
        title: 'Business Owners',
        description: 'Create predictable revenue streams'
      }
    ],
    courseOverviewHeading: 'COURSE OVERVIEW',
    courseOverviewDescription: 'Build an email strategy that generates consistent revenue.',
    downloadLabel: 'DOWNLOAD',
    modules: [
      { number: 1, title: 'Email Fundamentals & Setup' },
      { number: 2, title: 'Building Your Email List' },
      { number: 3, title: 'Welcome Series & Onboarding' },
      { number: 4, title: 'Segmentation & Personalization' },
      { number: 5, title: 'Email Automation Workflows' }
    ],
    moduleImage: '/assets/course-1.png',
    tools: [
      {
        title: 'Email Platforms',
        description: 'ConvertKit, ActiveCampaign, Klaviyo'
      },
      {
        title: 'Analytics',
        description: 'Email analytics, UTM tracking'
      },
      {
        title: 'List Building',
        description: 'Typeform, ConvertKit Landing Pages'
      }
    ],
    toolsImage: '/assets/course-2.png',
    instructor: {
      name: 'David Kim',
      image: '/assets/instructor-david.png',
      title: 'Email Marketing Specialist',
      years: 9,
      expertise: 'Email Marketing & Growth',
      industry: 'E-commerce & SaaS',
      bio: 'David has built email strategies that generated $50M+ in revenue. Known for creating email systems that feel personal, not pushy.'
    },
    instructorImage: '/assets/course-3.png',
    closingImage: '/assets/course-4.png',
    tag: 'Self Paced'
  }
};

export function getCourse(slug: string): Course | undefined {
  return courses[slug];
}
