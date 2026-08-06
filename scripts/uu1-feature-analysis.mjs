import { chromium } from 'playwright';

async function uu1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const analysis = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    
    return cards.map((card, cardIdx) => {
      const title = card.querySelector('.testimonial-name-v2')?.textContent.trim();
      const desc = card.querySelector('.testimonial-description-v2')?.textContent.trim();
      const features = Array.from(card.querySelectorAll('.testimonial-feature-v2')).map(f => f.textContent.trim());
      
      // Determine which feature is most redundant/weakest
      let recommendation = null;
      let reasoning = '';
      
      if (cardIdx === 0) {
        // Portfolio & Brand Designers
        // Features: Grid Reveal, Case Study Transition, Text Reveal, Magnetic Button
        // "portfolio is the pitch" + "feel considered"
        // Magnetic Button is about CTA feel, slightly echoes the "pitch" concept
        recommendation = 3; // Magnetic Button
        reasoning = 'Echoes description ("feel like software rather than a link" vs "feel considered"). Others are core to portfolio presentation.';
      } else if (cardIdx === 1) {
        // Videographers & Motion Designers
        // Only 2 features: Scroll Sequence, Pinned Scroll
        // Both directly support "work moves" / "behaves like your reel"
        // If forced to drop: Pinned Scroll is less about motion, more about layout
        recommendation = 1;
        reasoning = 'Pinned Scroll is about pacing/layering. Scroll Sequence is core to "work moves." Drop Pinned Scroll.';
      } else if (cardIdx === 2) {
        // Art & Creative Directors
        // Features: Case Study Transition, Pinned Scroll, Text Reveal, Custom Cursor
        // "pacing is part of the argument" + "read as directed"
        // Text Reveal is most about pacing (supports description directly)
        // Custom Cursor is about feel/authorship (nice-to-have)
        recommendation = 3;
        reasoning = 'Custom Cursor is about surface feel. Text Reveal, Pinned Scroll, and Case Study Transition are core to pacing/direction.';
      } else if (cardIdx === 3) {
        // Studios & Agencies
        // Features: Nine blocks theme-agnostic, Content survives uninstall, One license covers every site
        // "must work when you're not there"
        // All three are about durability/reliability, none is weaker
        // "Nine blocks theme-agnostic" is most about breadth, least about survival
        recommendation = 0;
        reasoning = 'All three support robustness. "Theme-agnostic" is least about survival; other two directly address handoff concerns.';
      }
      
      return {
        cardIndex: cardIdx,
        title,
        featureCount: features.length,
        features,
        recommendDropIndex: recommendation,
        recommendDropText: features[recommendation],
        reasoning
      };
    });
  });

  console.log('UU1.1: Weakest feature per card\n');
  
  analysis.forEach(card => {
    console.log(`═══════════════════════════════════`);
    console.log(`Card ${card.cardIndex + 1}: ${card.title} (${card.featureCount} features)`);
    console.log(`\nFeatures in order:`);
    card.features.forEach((f, idx) => {
      const marker = idx === card.recommendDropIndex ? '❌ RECOMMEND DROP' : '✅';
      console.log(`  [${idx}] ${marker} "${f}"`);
    });
    console.log(`\nReasoning: ${card.reasoning}\n`);
  });

  await browser.close();
}

uu1().catch(err => console.error(err.message));
