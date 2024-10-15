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
    description: 'Create Solana Blinks pre-configured to receive USDC donations on your wallet.',
    icon: '💰​',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #2',
    description: 'Reduce friction for your donors, by saving them from typing amounts and addresses.',
    icon: '🌟​',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #3',
    description: 'Your donors transact directly from their wallet, to yours.',
    icon: '✅​',
    href: DocsUrl,
  },
  {
    name: 'Cool Feature #4',
    description: 'You can manage your Solana USDC donation links in one place.',
    icon: '📊​',
    href: DocsUrl,
  },
];
export const testimonials = [
  {
    name: 'Joe User',
    role: 'Regular User',
    avatarSrc: avatarPlaceholder,
    socialUrl: 'https://twitter.com/wasplang',
    quote: '"Code? What is that? It just works!"',
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
    quote: '"Yeah, well, I miss assembling transaction bytes :/"',
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
