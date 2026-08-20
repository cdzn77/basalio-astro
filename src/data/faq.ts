export interface FAQ {
  question: string;
  answer: string;
}

export function getFaqs(postCapPrice: string, proShipTarget: string): FAQ[] {
  return [
    {
      question: "Do the nine blocks really stay free?",
      answer: `Yes. The blocks ship on WordPress.org under GPL-2.0-or-later: no locked blocks, no watermarks, no instance limits. Free is not a trial. Nothing in the free version expires or gets pulled into Pro later.`
    },
    {
      question: "What does the founder license actually buy?",
      answer: `The Pro layer: a control center in the editor sidebar for live-tuning all nine blocks, the full Hacks vault, one-click hack-trailer effects, and every future block. One payment, unlimited sites, refundable until the control center ships.`
    },
    {
      question: "Does it work with my theme?",
      answer: `Yes. Basalio blocks are native WordPress blocks. They work with any block theme or classic theme running the block editor. No page builder, no premium theme required.`
    },
    {
      question: "Is it actually lightweight?",
      answer: `A single shared script loads only on pages that use a block, and only the blocks on that page are initialized. There is no runtime framework, no jQuery, and no global stylesheet overriding your theme.`
    },
    {
      question: "What happens to my content if I uninstall?",
      answer: `Your content stays intact. Blocks degrade to static, semantic markup. Grids stay grids, text stays text. Nothing is stored in a proprietary format.`
    },
    {
      question: "It's GPL. Why pay for it?",
      answer: `You are paying for the control center, the Hacks vault, and a direct line to the person building it. Not for permission to use code you could already fork. If Basalio disappears tomorrow, what you have keeps working.`
    },
    {
      question: "How many sites?",
      answer: `Unlimited sites per license.`
    },
    {
      question: "What happens after the 100 founder licenses?",
      answer: `Price goes to ${postCapPrice}. Founder licenses stay valid, keep every future block and Hack, and are never re-billed.`
    },
    {
      question: "When does Pro ship?",
      answer: `${proShipTarget}. If it doesn't, see the refund terms above.`
    }
  ];
}
