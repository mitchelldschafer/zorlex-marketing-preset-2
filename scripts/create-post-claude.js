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
  createBlock("The AI revolution is often framed through the lens of extreme technical capability. We hear about AI writing thousands of lines of code, orchestrating complex cloud deployments, and solving mathematical proofs. Tools like Claude Code have undeniably supercharged the engineering world, acting as highly capable pairs of hands for developers. However, the true productivity multiplier for the global economy does not lie in tools built exclusively for engineers.", "normal"),
  createBlock("It lies in making elite AI accessible to everyone. Enter Claude Coworker.", "normal"),
  createBlock("The Problem with Developer-Centric AI", "h2"),
  createBlock("For the past few years, the most powerful AI capabilities have been locked behind terminal interfaces, API endpoints, and technical documentation. If you were a software engineer, you could leverage tools like GitHub Copilot or Claude Code to double your output. But if you were a marketing manager, an HR director, or a sales executive, your access to AI was largely limited to chatting with a basic web interface.", "normal"),
  createBlock("This created a \"productivity inequality.\" Engineers were moving at light speed, while the rest of the organization was still doing things the slow, manual way. The barrier to entry for advanced AI workflows—such as connecting an AI to an internal database or having it execute multi-step workflows—was simply too high for non-technical staff.", "normal"),
  createBlock("Claude Coworker: Democratizing the AI Agent", "h2"),
  createBlock("Claude Coworker bridges this gap by bringing agentic AI capabilities out of the terminal and into the mainstream workplace environment. It is designed to be an accessible, conversational entity that integrates seamlessly into the tools non-engineers already use: Slack, email, internal knowledge bases, and document drives.", "normal"),
  createBlock("Instead of requiring a user to write a Python script to fetch data, a project manager can simply ask Claude Coworker, 'Can you pull the latest customer feedback reports from last week, summarize the top three complaints, and draft a response email to the team?' Claude Coworker understands the context, navigates the integrated systems, performs the synthesis, and delivers the result in plain English.", "normal"),
  createBlock("The True Productivity Multiplier", "h2"),
  createBlock("Why is this more impactful than coding assistants? Simply because of scale. While engineers make up a crucial part of tech companies, the vast majority of the global workforce consists of operators, managers, marketers, and administrators.", "normal"),
  createBlock("When you give an engineer a tool that makes them 50% faster, you get more code. When you give an entire organization a tool that makes every single employee 50% faster, you fundamentally change the trajectory of the business.", "normal"),
  createBlock("Claude Coworker acts as a universal accelerator. It handles the 'glue work'—the endless synthesis of meeting notes, the drafting of standard operating procedures, the routing of information between departments, and the parsing of dense reports. By automating this cognitive overhead, employees are freed to focus on high-leverage strategic thinking.", "normal"),
  createBlock("A Partner, Not Just a Tool", "h2"),
  createBlock("What makes Claude Coworker unique is its positioning as a collaborative entity rather than a rigid software tool. It possesses the nuance and contextual awareness to hold long-running conversations, remember project constraints, and adapt to the specific communication style of its human counterparts.", "normal"),
  createBlock("You don't 'use' Claude Coworker; you collaborate with it. You delegate tasks to it just as you would to a junior analyst or a chief of staff. This paradigm shift—from using software to collaborating with intelligence—is what makes accessible AI so revolutionary.", "normal"),
  createBlock("The Accessible Future", "h2"),
  createBlock("The future of work is not one where everyone learns to code so they can talk to machines. The future is one where machines learn to communicate like us, integrating effortlessly into our existing workflows.", "normal"),
  createBlock("While developer-focused tools will continue to push the boundaries of technical achievement, tools like Claude Coworker represent the true democratization of AI. By giving every employee an elite, tireless, and infinitely knowledgeable colleague, organizations can unlock unprecedented levels of creativity and operational efficiency. The AI revolution isn't just for coders anymore; it's for all of us.", "normal")
];

const newPost = {
  _type: 'post',
  title: 'Meet Your New Colleague: Why Claude Coworker is the Accessible AI Multiplier',
  slug: {
    _type: 'slug',
    current: 'claude-coworker-accessible-ai-multiplier',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'While developer-focused tools like Claude Code have pushed boundaries, Anthropic\'s Claude Coworker brings elite AI assistance to everyone. Learn how accessible AI is changing the workplace for non-engineers.',
  body: postBody,
};

async function publishPost() {
  console.log('🚀 Publishing Claude Coworker Post...');
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
