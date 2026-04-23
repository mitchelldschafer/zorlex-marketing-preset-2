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
  createBlock("For centuries, the accounting profession has been synonymous with meticulous, manual labor. From the hand-written ledgers of the Renaissance to the endless spreadsheets of the modern corporate era, the fundamental task has remained the same: manually moving data from one place to another, reconciling discrepancies, and building reports row by row. But in the span of just a few years, artificial intelligence has fundamentally disrupted this paradigm.", "normal"),
  createBlock("We are standing at the precipice of a new era where manual bookkeeping is no longer a requirement. Instead of humans acting as calculators and data processors, AI agents are stepping in to automate the entire lifecycle of financial data entry, reconciliation, and basic reporting. This shift is not just about saving time; it's about redefining the value of accounting professionals.", "normal"),
  createBlock("The Automation of Data Ingestion", "h2"),
  createBlock("Historically, the most time-consuming aspect of bookkeeping has been data ingestion. Receipts, invoices, bank statements, and payroll logs poured in from different channels, requiring a human to read the document, decipher the relevant information, and key it into accounting software like QuickBooks or Xero.", "normal"),
  createBlock("Today, AI-driven Optical Character Recognition (OCR) combined with Large Language Models (LLMs) can ingest unstructured data with near-perfect accuracy. These systems do not just 'read' a receipt; they understand the context. If an invoice from 'AWS' comes in, the AI knows it belongs in 'Cloud Infrastructure' rather than 'Office Supplies.' It can automatically extract line items, calculate tax distributions, and prepare the entry for human review in a fraction of a second.", "normal"),
  createBlock("Real-Time Reconciliation", "h2"),
  createBlock("Month-end close has always been the bane of an accountant's existence. The process of matching thousands of bank transactions against internal ledger entries is tedious and prone to human error. AI systems now handle continuous, real-time reconciliation. By integrating directly with bank feeds via APIs, AI matching algorithms can instantly pair payments to invoices, flag anomalies, and handle currency conversions dynamically.", "normal"),
  createBlock("When a discrepancy occurs—for example, a payment that is three cents off from the invoice total—the AI can automatically flag it, apply a pre-approved variance rule, or route it to a human for intervention. What used to take two weeks at the end of every month is now happening continuously in the background.", "normal"),
  createBlock("Predictive Cash Flow and Anomaly Detection", "h2"),
  createBlock("Beyond just recording history, AI is transforming how businesses look forward. Traditional accounting is inherently backwards-looking; you only know how you performed last month after the books are closed. AI models, however, are constantly analyzing historical trends, seasonality, and upcoming liabilities to forecast cash flow with astonishing precision.", "normal"),
  createBlock("Furthermore, AI is the ultimate auditor. Machine learning algorithms can detect fraudulent patterns or accidental duplicates that a human reviewer might miss when scanning thousands of rows of data. If an employee suddenly submits a dinner expense that is 400% higher than their historical average, the system flags it automatically before the reimbursement is issued.", "normal"),
  createBlock("The Shift from Number Cruncher to Strategic Advisor", "h2"),
  createBlock("A common fear is that AI will replace accountants. The reality is quite the opposite. AI is replacing the *tasks* that accountants hate doing, freeing up their time to do the work that actually provides value.", "normal"),
  createBlock("When a bookkeeper no longer has to spend 30 hours a week doing data entry, they can step into the role of a fractional CFO. They can spend their time advising clients on capital allocation, tax strategies, and business growth. They can use the data the AI has prepared to tell a compelling story about the financial health of the company.", "normal"),
  createBlock("The barrier to entry for strategic advisory is lowering, and financial professionals who embrace AI tools will find themselves doing more intellectually stimulating work while managing far more clients than was previously possible.", "normal"),
  createBlock("The Future of Financial Automation", "h2"),
  createBlock("We are rapidly approaching a state of 'zero-touch accounting' for small and medium-sized businesses. In this future, the entire pipeline from transaction origin to tax filing will be seamlessly automated. Humans will only step in to set the rules, define the strategy, and provide the human judgment that machines still lack.", "normal"),
  createBlock("For businesses, this means lower overhead, fewer errors, and real-time financial clarity. For accountants, it means the death of the busy-season grind and the birth of the strategic advisory era. AI hasn't killed accounting; it has finally allowed accountants to do what they were meant to do: guide businesses to success.", "normal")
];

const newPost = {
  _type: 'post',
  title: 'The End of Manual Data Entry: How AI is Automating Bookkeeping and Accounting',
  slug: {
    _type: 'slug',
    current: 'ai-automating-bookkeeping-accounting',
  },
  publishedAt: new Date().toISOString(),
  excerpt: 'Accounting and bookkeeping have historically been defined by tedious, manual data entry. Today, AI is completely automating the busywork, allowing financial professionals to transition from human calculators to strategic advisors.',
  body: postBody,
};

async function publishPost() {
  console.log('🚀 Publishing Accounting Post...');
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
