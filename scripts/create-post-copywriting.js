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
  createBlock("We have all visited a website and left after ten seconds because we could not figure out what the company actually does. They might have had beautiful graphics and a sleek tagline like \"Synergizing the Future of Enterprise Solutions,\" but they lacked clarity. Confusing your visitors is the fastest way to lose them.", "normal"),
  
  createBlock("The Cost of Being Clever", "h2"),
  createBlock("In digital marketing, when you make your visitors think too hard, they click away. Many businesses prioritize creative slogans over clear explanations. Conversion copywriting is not about writing literature. It is about guiding a visitor to take a single action. If your value proposition is buried under marketing jargon, your conversion rates will suffer.", "normal"),
  createBlock("If you have to choose between being clear and being clever, always choose clarity.", "normal"),

  createBlock("1. Sell the Outcome, Not the Feature", "h3"),
  createBlock("Features explain what your product does. Benefits explain what that means for your customer. Focus on the transformation. Instead of saying \"We feature an automated daily database syncing protocol,\" say \"Get your client reporting done in 15 minutes instead of four hours.\"", "normal"),
  createBlock("When visitors see how their lives improve, they buy.", "normal"),

  createBlock("2. Replace Vague Claims with Specificity", "h3"),
  createBlock("Vague claims like \"we help you optimize your workflow\" are forgettable and hard to believe. Specific claims build immediate trust. Instead of telling visitors you will save them time, tell them exactly how much: \"Our automation saves operations teams an average of 12 hours every week.\"", "normal"),
  createBlock("Specific numbers are memorable and carry weight.", "normal"),

  createBlock("3. Use the Words Your Customers Use", "h3"),
  createBlock("Stop writing in company jargon. Read your customer support tickets, review transcripts, and look at online reviews. See how your clients describe their pain points. Mirror their exact language in your copy. When visitors see their own challenges written on your page, they feel understood and are more likely to convert.", "normal"),

  createBlock("How to Edit Your Copy Today", "h2"),
  createBlock("Take a look at your homepage. Scan the headings and paragraphs for empty words like \"streamline,\" \"leverage,\" \"utilize,\" and \"optimize.\" Remove them. Replace them with simple, active verbs like \"save,\" \"build,\" and \"use.\" Keep your sentences short, focus on one idea per section, and guide the reader directly to your call to action.", "normal"),
  createBlock("Clear copywriting is direct, simple, and entirely focused on the user. If you want to increase your website's conversion rates, start by making your message simple.", "normal"),
];

const newPost = {
  _type: 'post',
  title: 'Clarity Over Cleverness: The Copywriting Strategy Your Website is Missing',
  slug: {
    _type: 'slug',
    current: 'clarity-over-cleverness-website-conversion',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'Many businesses lose customers to confusing, jargon-filled website copy. Discover why clear copywriting beats clever slogans, and how to write text that converts.',
  body: postBody,
};

async function publishPost() {
  console.log('🚀 Publishing Copywriting Post...');
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is missing in .env');
    return;
  }
  try {
    const existing = await client.fetch(`*[_type == "post" && slug.current == "${newPost.slug.current}"][0]`);
    
    if (existing) {
      console.log(`Found existing post with ID: ${existing._id}. Updating...`);
      newPost._id = existing._id;
      const result = await client.createOrReplace(newPost);
      console.log(`✅ Success! Post updated.`);
    } else {
      const result = await client.create(newPost);
      console.log(`✅ Success! Post published.`);
    }
    
    console.log(`🔗 Live at /blog/${newPost.slug.current}`);
  } catch (error) {
    console.error('❌ Failed to publish post:', error.message);
  }
}

publishPost();
