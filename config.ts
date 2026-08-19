export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarConfig {
  brandName: string;
  brandHref: string;
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export interface HeroStat {
  label: string;
  value: string;
  colorScheme: "purple" | "blue" | "green";
}

export interface HeroConfig {
  badge: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  dashboard: {
    title: string;
    date: string;
    chartTitle: string;
    stats: HeroStat[];
  };
}

export interface TrustedByLogo {
  name: string;
  styleClass?: string;
}

export interface TrustedByConfig {
  title: string;
  logos: TrustedByLogo[];
}

export interface FeatureCard {
  number: string;
  title: string;
  description: string;
}

export interface WhyNexaflowConfig {
  badge: string;
  title: string;
  description: string;
  cards: FeatureCard[];
}

export interface PlatformConfig {
  badge: string;
  title: string;
  description: string;
  cards: {
    workflow: {
      title: string;
      description: string;
    };
    insights: {
      title: string;
      description: string;
      efficiencyText: string;
    };
  };
}

export interface CustomerStoryConfig {
  badge: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: {
    value: string;
    label: string;
  };
}

export interface CtaBannerConfig {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  copyright: string;
  bottomLinks: Array<{ label: string; href: string }>;
}

export const siteConfig = {
  navbar: {
    brandName: "NEXAFLOW",
    brandHref: "/",
    items: [
      { label: "Platform", href: "#platform" },
      { label: "Solutions", href: "#solutions" },
      { label: "Resources", href: "#resources" },
      { label: "Pricing", href: "#pricing" },
      { label: "Company", href: "#company" },
    ],
    cta: {
      label: "Book a Demo",
      href: "#book-a-demo",
    },
  },
  hero: {
    badge: "AI-POWERED OPERATIONS PLATFORM",
    title: "Turn complex work into simple growth.",
    description:
      "NexaFlow connects your teams, data and workflows so your business can move faster with less effort.",
    primaryCta: {
      label: "Start Free",
      href: "#start-free",
    },
    secondaryCta: {
      label: "See How It Works",
      href: "#how-it-works",
    },
    dashboard: {
      title: "Operations Overview",
      date: "Monday, August 17",
      chartTitle: "Weekly activity",
      stats: [
        {
          label: "Active workflows",
          value: "128",
          colorScheme: "purple",
        },
        {
          label: "Time saved",
          value: "42%",
          colorScheme: "blue",
        },
        {
          label: "Tasks automated",
          value: "3.8k",
          colorScheme: "green",
        },
      ] as HeroStat[],
    },
  },
  trustedBy: {
    title: "TRUSTED BY MODERN TEAMS",
    logos: [
      { name: "vertex", styleClass: "font-semibold lowercase tracking-tight" },
      { name: "northstar", styleClass: "font-bold lowercase tracking-normal" },
      { name: "Axiom", styleClass: "font-bold tracking-tight" },
      { name: "MOTION", styleClass: "font-extrabold uppercase tracking-wide" },
      { name: "LUMEN", styleClass: "font-bold uppercase tracking-wider" },
    ] as TrustedByLogo[],
  },
  whyNexaflow: {
    badge: "WHY NEXAFLOW",
    title: "One platform. Less operational friction.",
    description:
      "Bring fragmented workflows into one intelligent operating layer.",
    cards: [
      {
        number: "01",
        title: "Connect your tools",
        description:
          "Integrate the systems your team already uses without rebuilding your technology stack.",
      },
      {
        number: "02",
        title: "Automate repetitive work",
        description:
          "Replace manual handoffs with reliable workflows and intelligent decision support.",
      },
      {
        number: "03",
        title: "Measure what matters",
        description:
          "See performance, bottlenecks and opportunities from a single operational view.",
      },
    ] as FeatureCard[],
  },
  platform: {
    badge: "THE PLATFORM",
    title: "Designed for teams that move fast.",
    description: "Everything you need to orchestrate modern operations.",
    cards: {
      workflow: {
        title: "Workflow automation",
        description:
          "Build repeatable workflows with triggers, conditions and actions.",
      },
      insights: {
        title: "Intelligent insights",
        description:
          "Turn operational data into clear actions with real-time dashboards.",
        efficiencyText: "+28% efficiency",
      },
    },
  } as PlatformConfig,
  customerStory: {
    badge: "CUSTOMER STORY",
    quote: "“We reduced operational overhead and finally got one source of truth.”",
    author: "Sarah Chen",
    role: "COO",
    company: "Northstar",
    metric: {
      value: "41%",
      label: "less time spent on manual processes",
    },
  } as CustomerStoryConfig,
  ctaBanner: {
    title: "Ready to simplify the way your team works?",
    description: "See what NexaFlow can do for your organization.",
    cta: {
      label: "Book a Demo",
      href: "#book-a-demo",
    },
  } as CtaBannerConfig,
  footer: {
    brandName: "NEXAFLOW",
    tagline: "The operating layer for modern teams.",
    columns: [
      {
        title: "PRODUCT",
        links: [
          { label: "Platform", href: "#platform" },
          { label: "Solutions", href: "#solutions" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "COMPANY",
        links: [
          { label: "About", href: "#about" },
          { label: "Careers", href: "#careers" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "RESOURCES",
        links: [
          { label: "Blog", href: "#blog" },
          { label: "Guides", href: "#guides" },
          { label: "Help Center", href: "#help" },
        ],
      },
    ],
    copyright: "© 2026 NexaFlow. Design exercise.",
    bottomLinks: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  } as FooterConfig,
};

export default siteConfig;
