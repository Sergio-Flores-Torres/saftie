import { DocsUrl, BlogUrl } from '../shared/common';
import leetCoder from '../client/static/leetcoder.png';
import avatarPlaceholder from '../client/static/avatar-placeholder.png';
import founder from '../client/static/founder.png';
import { routes } from 'wasp/client/router';

export const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: routes.PricingPageRoute.build() },
  { name: 'Documentation', href: DocsUrl },
  { name: 'Blog', href: BlogUrl },
];
export const features = [
  {
    name: 'Cool Feature #1',
    description: 'Describe your cool feature here.',
    icon: '🤝',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #2',
    description: 'Describe your cool feature here.',
    icon: '🔐',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #3',
    description: 'Describe your cool feature here.',
    icon: '🥞',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #4',
    description: 'Describe your cool feature here.',
    icon: '💸',
    href: DocsUrl,
  },
];
export const testimonials = [
  {
    name: 'Joe User',
    role: 'Regular User',
    avatarSrc: avatarPlaceholder,
    socialUrl: 'https://twitter.com/wasplang',
    quote: '"I dont even know how to code. It just works!"',
  },
  {
    name: 'Mr. Foobar',
    role: 'Founder @ Cool Startup',
    avatarSrc: founder,
    socialUrl: '',
    quote: '"This product makes me cooler than I already am."',
  },
  {
    name: '0x1337C0DERFF0',
    role: 'Leet Coder',
    avatarSrc: leetCoder,
    socialUrl: '#',
    quote: '"I miss pushing random bytes into transactions :/"',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Whats the meaning of life?',
    answer: '42.',
    href: 'https://en.wikipedia.org/wiki/42_(number)',
  },
];
export const footerNavigation = {
  app: [
    { name: 'Documentation', href: DocsUrl },
    { name: 'Blog', href: BlogUrl },
  ],
  company: [
    { name: 'About', href: 'https://wasp-lang.dev' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};
