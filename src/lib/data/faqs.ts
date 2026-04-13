export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'purchasing' | 'commissions' | 'shipping' | 'about' | 'general';
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How can I purchase a painting?',
    answer: 'You can purchase any painting marked as "Available" directly through our website using the "Purchase" button on the painting detail page. We accept all major credit cards through our secure Stripe checkout. For paintings marked as "Inquire," please use the contact form to discuss pricing and availability.',
    category: 'purchasing',
  },
  {
    id: 'faq-2',
    question: 'Do you accept commissions?',
    answer: 'Yes! Radha accepts commission requests for custom paintings. Commissions typically take 4-8 weeks depending on size and complexity. Please use the contact form to describe your vision, preferred size, color palette, and budget. Radha will follow up with a consultation to discuss the project in detail.',
    category: 'commissions',
  },
  {
    id: 'faq-3',
    question: 'How are paintings shipped?',
    answer: 'All paintings are carefully packaged with acid-free materials and shipped via insured carriers (UPS or FedEx). Paintings on canvas are shipped in custom-built crates for maximum protection. Standard shipping within the US takes 5-10 business days. International shipping is available upon request. Shipping costs are calculated based on painting size and destination.',
    category: 'shipping',
  },
  {
    id: 'faq-4',
    question: 'Can I see a painting in person before purchasing?',
    answer: 'Absolutely! If you are in the San Jose / Bay Area, Radha welcomes studio visits by appointment. Please reach out through the contact form to schedule a viewing. For collectors outside the area, we can arrange a video call to show the painting in detail, including close-ups of texture and color.',
    category: 'purchasing',
  },
  {
    id: 'faq-5',
    question: 'What is your return policy?',
    answer: 'We want you to love your painting. If for any reason you are not satisfied, you may return the painting within 14 days of delivery for a full refund (minus shipping costs). The painting must be in its original condition. Please contact us to initiate a return.',
    category: 'purchasing',
  },
  {
    id: 'faq-6',
    question: 'Are prints available?',
    answer: 'Currently, Radha sells only original paintings. High-quality giclée prints on archival paper are planned for a future release. Sign up for our newsletter to be notified when prints become available.',
    category: 'general',
  },
  {
    id: 'faq-7',
    question: 'What materials does Radha use?',
    answer: 'Radha works primarily in acrylic on canvas, which allows for vibrant color and rapid layering. She also creates mixed media pieces using charcoal, watercolor, torn paper, fabric, and textured materials. All canvases are stretched on kiln-dried wooden frames, and paintings are sealed with archival-quality varnish for long-term preservation.',
    category: 'about',
  },
  {
    id: 'faq-8',
    question: 'How should I care for my painting?',
    answer: 'Display your painting away from direct sunlight and extreme humidity. Acrylic paintings are durable and can be gently dusted with a soft, dry cloth. Avoid using cleaning chemicals. If you need to move or store the painting, wrap it in acid-free paper or bubble wrap with the painted surface facing inward.',
    category: 'general',
  },
  {
    id: 'faq-9',
    question: 'Does Radha provide a certificate of authenticity?',
    answer: 'Yes, every original painting comes with a signed Certificate of Authenticity that includes the title, medium, dimensions, year created, and a unique reference number. This document is important for insurance and resale purposes.',
    category: 'purchasing',
  },
  {
    id: 'faq-10',
    question: 'Can I request a specific size or color palette for a commission?',
    answer: 'Absolutely! Commission projects are fully customizable. You can specify the size, color palette, style (abstract, nature-inspired, or mixed media), and subject matter. Radha will provide sketches or color studies for your approval before beginning the final piece.',
    category: 'commissions',
  },
  {
    id: 'faq-11',
    question: 'What inspires Radha\'s work?',
    answer: 'Radha draws inspiration from the natural world — the changing light of California landscapes, memories of monsoon seasons in India, the textures of earth and water. She is also inspired by the emotional resonance of color itself, exploring how different palettes can evoke feelings of warmth, calm, energy, or wonder.',
    category: 'about',
  },
  {
    id: 'faq-12',
    question: 'Do the paintings come framed?',
    answer: 'Paintings on canvas are gallery-wrapped (painted edges) and ready to hang without a frame. However, framing can enhance the presentation. If you would like framing recommendations, Radha can suggest trusted framers in the Bay Area or provide guidance for your local framer on appropriate styles.',
    category: 'general',
  },
];
