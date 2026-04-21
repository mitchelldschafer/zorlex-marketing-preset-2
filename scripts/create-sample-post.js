import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = createClient({
  projectId: 'xvq24507',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const samplePost = {
  _type: 'post',
  title: 'The Algorithmic Advantage: Why Cinematic Engineering is the Future of Marketing',
  slug: {
    _type: 'slug',
    current: 'algorithmic-advantage-cinematic-engineering',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'In an era of saturated digital noise, "standard" is no longer enough. We explore how merging high-fidelity cinematic engineering with data-driven strategy creates the ultimate conversion engine.',
  body: [
    {
      _key: 'b1',
      _type: 'block',
      children: [
        {
          _key: 'c1',
          _type: 'span',
          text: 'The digital marketing landscape has reached a point of absolute saturation. Every brand has a website, and every website follows the same predictable patterns. To truly dominate a niche, you have to move beyond "functional" and toward "experiential".',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
    {
      _key: 'b2',
      _type: 'block',
      children: [
        {
          _key: 'c2',
          _type: 'span',
          text: 'The Rise of Cinematic Engineering',
        },
      ],
      markDefs: [],
      style: 'h2',
    },
    {
      _key: 'b3',
      _type: 'block',
      children: [
        {
          _key: 'c3',
          _type: 'span',
          text: 'Cinematic engineering isn\'t just about aesthetics; it\'s about cognitive load and emotional resonance. When a user lands on a platform that feels alive—through fluid GSAP interactions, intentional glassmorphism, and rhythmic layout—they instantly assign a higher value to the brand.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
    {
      _key: 'b4',
      _type: 'block',
      children: [
        {
          _key: 'c4',
          _type: 'span',
          text: 'Data confirms that "premium feel" translates to "higher trust". By building websites that feel like high-end software rather than static brochures, we shorten the distance between initial impression and ultimate conversion.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
};

async function createPost() {
  console.log('🚀 Attempting to transmit sample post to Sanity...');
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is missing in .env');
    return;
  }

  try {
    const result = await client.create(samplePost);
    console.log(`✅ Success! Sample post created with ID: ${result._id}`);
    console.log(`🔗 Refresh your Sanity Studio or visit /blog/${samplePost.slug.current} to see it!`);
  } catch (error) {
    console.error('❌ Failed to create post:', error.message);
    console.log('\n💡 Tip: Ensure your Sanity API Token has "Editor" or "Admin" permissions in the Sanity Manage console.');
  }
}

createPost();
