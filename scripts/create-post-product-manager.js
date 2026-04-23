import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xvq24507',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Helper to generate portable text blocks
const createBlock = (text, style = 'normal') => {
  return {
    _key: Math.random().toString(36).substring(7),
    _type: 'block',
    style,
    markDefs: [],
    children: [
      {
        _key: Math.random().toString(36).substring(7),
        _type: 'span',
        marks: [],
        text,
      },
    ],
  };
};

const postBody = [
  createBlock("For decades, the modern workplace has heavily rewarded the 'doers'—the people who put their heads down and execute. Whether it was writing lines of code, drafting marketing copy, building financial models, or designing pitch decks, your value as an employee was largely tied to your ability to produce output through manual effort. But as artificial intelligence reaches parity with human execution across these domains, a profound shift is occurring in how we define valuable work.", "normal"),
  createBlock("We are transitioning from an economy of execution to an economy of direction. As AI takes over the busywork, it is forcing humans to level up, shifting our roles from individual contributors to product managers, project directors, and thought leaders.", "normal"),
  createBlock("The End of Execution as a Moat", "h2"),
  createBlock("In the past, being a fast writer or a quick coder gave you a competitive edge. Today, an AI can generate a thousand-word article or scaffold a React component in seconds. When the marginal cost of creating 'good enough' content or code drops to zero, the ability to simply execute tasks is no longer a sustainable career moat.", "normal"),
  createBlock("This reality can be daunting, but it is ultimately liberating. When you are no longer bogged down by the mechanics of execution, you are forced to focus on the 'why' rather than the 'how.' The premium is no longer on how fast you can type; it is on your ability to define the problem, set the strategy, and determine what should be built in the first place.", "normal"),
  createBlock("Everyone is Now a Product Manager", "h2"),
  createBlock("If AI is an infinitely capable intern that can do the work instantly, your job becomes managing that intern. This is the essence of product management. A product manager doesn't necessarily write the code or design the interface; they define the vision, understand the user's needs, set the requirements, and coordinate resources to deliver the final outcome.", "normal"),
  createBlock("With AI, this dynamic applies to everyone. A marketer using AI is no longer just a copywriter; they are managing a suite of AI agents to produce a campaign. They must define the target audience, set the brand voice, critique the AI's output, and iterate based on performance. A financial analyst becomes a director of automated modeling, focusing on the narrative the data tells rather than the mechanics of the spreadsheet.", "normal"),
  createBlock("The skill set required for success is evolving. Empathy, strategic vision, prompt engineering, and the ability to critique and refine AI outputs are becoming far more valuable than raw execution speed.", "normal"),
  createBlock("The Rise of the Thought Leader", "h2"),
  createBlock("When AI can synthesize existing information perfectly, rehashing known facts provides zero value. The internet is already flooding with AI-generated summaries and generic advice. In this environment, true thought leadership becomes the ultimate differentiator.", "normal"),
  createBlock("A thought leader provides what an AI cannot: lived experience, contrarian perspectives, human empathy, and visionary foresight. AI trains on the past to predict the next word; humans look to the future to imagine new possibilities. By outsourcing the mundane synthesis of information to AI, humans are freed to engage in deep, creative thinking.", "normal"),
  createBlock("Professionals who will thrive in the AI era are those who cultivate strong opinions, share unique insights based on personal experience, and build authentic human connections. They will use AI to handle the logistics of their work, allowing their human voice to shine brighter.", "normal"),
  createBlock("Embracing the Shift", "h2"),
  createBlock("The transition from 'doer' to 'director' is not automatic. It requires a conscious effort to let go of the comfort of busywork. It is often easier to check off a list of menial tasks and feel 'productive' than it is to sit down and tackle an ambiguous, high-level strategic problem.", "normal"),
  createBlock("However, those who lean into this discomfort will find themselves exponentially more effective. By delegating execution to AI, you are not losing your job; you are being promoted. You are stepping into the role of a visionary, a manager, and a leader. The future belongs to those who tell the AI what to build.", "normal")
];

const newPost = {
  _type: 'post',
  title: 'From Doer to Director: How AI is Forcing Us to Become Product Managers and Thought Leaders',
  slug: {
    _type: 'slug',
    current: 'ai-from-doer-to-director-product-managers',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'As AI autonomously handles the execution of mundane tasks, the value of human labor is shifting. Discover why the future belongs to those who can direct AI, manage products, and lead with visionary thinking.',
  body: postBody,
};

async function publishPost() {
  console.log('🚀 Publishing Product Manager Post...');
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is missing in .env');
    return;
  }
  try {
    const result = await client.create(newPost);
    console.log(`✅ Success! Post published.`);
    console.log(`🔗 Live at /blog/${newPost.slug.current}`);
  } catch (error) {
    console.error('❌ Failed to publish post:', error.message);
  }
}

publishPost();
