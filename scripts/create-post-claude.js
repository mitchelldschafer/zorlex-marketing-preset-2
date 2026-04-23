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
  createBlock("The AI revolution has frequently been framed through the lens of specialized tools. We hear about AI writing thousands of lines of code, orchestrating complex cloud deployments, and solving mathematical proofs. Tools like Claude Code have undeniably supercharged the engineering world, acting as highly capable pairs of hands for developers. However, the true productivity multiplier for the global economy lies in making agentic, file-system-level AI accessible to everyone.", "normal"),
  createBlock("Enter Claude Cowork.", "normal"),
  createBlock("Beyond the Chatbot: True Agentic Collaboration", "h2"),
  createBlock("For the past few years, the majority of AI interactions have been confined to web browsers and isolated chat windows. While powerful for brainstorming or generating text, this paradigm required constant copying, pasting, and manual context-switching. You were not collaborating with an AI; you were just querying a database.", "normal"),
  createBlock("Claude Cowork fundamentally breaks this barrier. It transforms Claude from a chatbot into an autonomous agent that operates directly on your local machine. Operating in a secure, containerized environment, Claude Cowork is granted access to designated local folders on your file system, allowing it to autonomously read, write, edit, and organize files.", "normal"),
  createBlock("How People Are Using Claude Cowork Today", "h2"),
  createBlock("The shift from a chat interface to an autonomous desktop collaborator has unlocked entirely new workflows across industries:", "normal"),
  createBlock("1. Autonomous File Management & Synthesis", "h3"),
  createBlock("Instead of manually uploading five different PDFs to summarize a project, a project manager can simply point Claude Cowork to a directory and say, 'Review all the discovery notes in this folder, extract the key deliverables, and draft a formal Statement of Work in a new Word document.' Claude Cowork will autonomously read the files, synthesize the data, and create the deliverable in the file system without any further human intervention.", "normal"),
  createBlock("2. Complex Multi-Step Workflows", "h3"),
  createBlock("For marketers and content creators, Claude Cowork acts as a tireless editorial assistant. Users are instructing the agent to batch-process files. For example, 'Take these 10 raw interview transcripts, clean up the grammar, extract three pull quotes from each, and save them as individual markdown files in the /processed folder.' Tasks that previously took hours of tedious labor are now executed autonomously in the background.", "normal"),
  createBlock("3. Code and Context Collaboration for Non-Engineers", "h3"),
  createBlock("While Claude Code is built for software engineers, Claude Cowork brings repository-level understanding to everyone else. Technical writers, QA testers, and product managers are using Cowork to navigate complex codebases, document architectures, and sync documentation alongside the engineering team's output, bridging the gap between technical and non-technical staff.", "normal"),
  createBlock("A Partner, Not Just a Tool", "h2"),
  createBlock("What makes Claude Cowork unique is its positioning as a collaborative entity. You delegate tasks to it just as you would to a junior analyst. Because it has direct file system access, it works *alongside* you in your local environment. You can go grab a coffee while Claude Cowork iterates through a directory of spreadsheets, restructures the data, and saves the finalized reports.", "normal"),
  createBlock("The Accessible Future of Work", "h2"),
  createBlock("The future of work is not one where everyone learns to code so they can talk to machines. The future is one where machines integrate effortlessly into our existing local environments, manipulating files and executing workflows just as a human colleague would.", "normal"),
  createBlock("By giving every employee an elite, tireless, and infinitely capable local agent, organizations can unlock unprecedented levels of operational efficiency. The AI revolution isn't just happening in the cloud anymore; it's happening right on your desktop.", "normal")
];

const newPost = {
  _type: 'post',
  title: 'Meet Your New Colleague: How Claude Cowork is Revolutionizing Autonomous AI',
  slug: {
    _type: 'slug',
    current: 'claude-cowork-accessible-ai-multiplier',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'Moving beyond the chatbot, Anthropic\'s Claude Cowork brings autonomous, file-system-level AI agents directly to your desktop. Discover how people are using it to automate complex workflows.',
  body: postBody,
};

async function publishPost() {
  console.log('🚀 Publishing Claude Cowork Post...');
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is missing in .env');
    return;
  }
  try {
    // Check if a post with this slug already exists to prevent duplicates
    const existing = await client.fetch(`*[_type == "post" && slug.current == "claude-cowork-accessible-ai-multiplier"][0]`);
    
    if (existing) {
      console.log(`Found existing post with ID: ${existing._id}. Updating...`);
      newPost._id = existing._id;
      const result = await client.createOrReplace(newPost);
      console.log(`✅ Success! Post updated.`);
    } else {
      const result = await client.create(newPost);
      console.log(`✅ Success! Post published.`);
    }
    
    // Also try to delete the old "claude-coworker" post if it exists
    const oldPost = await client.fetch(`*[_type == "post" && slug.current == "claude-coworker-accessible-ai-multiplier"][0]`);
    if (oldPost) {
      await client.delete(oldPost._id);
      console.log(`🗑️ Deleted old 'claude-coworker' post.`);
    }
    
    console.log(`🔗 Live at /blog/${newPost.slug.current}`);
  } catch (error) {
    console.error('❌ Failed to publish post:', error.message);
  }
}

publishPost();
