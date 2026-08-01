export interface FAQ {
  question: string;
  answer: string;
}

export function getFaqs(postCapPrice: string, proShipTarget: string): FAQ[] {
  return [
    {
      question: "Do the nine blocks stay free?",
      answer: `Yes. All nine, complete, on WordPress.org, forever. No block gets moved behind Pro later. Free is not a trial and the free tier is not a countdown.`
    },
    {
      question: "It's GPL - why pay for it?",
      answer: `You're not paying for permission; the license already grants that. You're paying for the Hacks vault, the sidebar, and the ongoing work of testing against every WordPress release before it lands. The code is free. Someone maintaining it isn't.`
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
      question: "What if my license lapses?",
      answer: `Your site never stops working. Founder licenses are one payment with no renewal at all. After the first 100, Basalio moves to ${postCapPrice}/year. That covers updates and support, and if you stop paying, everything you've already built stays exactly as it is.`
    },
    {
      question: "Does my content break if I uninstall?",
      answer: `No. Basalio is theme-agnostic and your content survives uninstall. The interactions stop; the content stays.`
    },
    {
      question: "Is it actually lightweight?",
      answer: `One shared script, loaded only on pages that use a block. No jQuery, no framework, no bundle you didn't ask for.`
    },
    {
      question: "When does Pro ship?",
      answer: `${proShipTarget}. If it doesn't, see the refund terms above.`
    }
  ];
}
