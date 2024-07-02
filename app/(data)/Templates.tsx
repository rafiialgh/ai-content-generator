export default [
  {
    name: 'Blog Title',
    desc: 'An AI tool that generates blog titles based on your blog information',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/2800/2800205.png',
    aiPrompt: 'Give me 5 blog topic ideas in bullet points based on the given niche & outline and present the results in rich text editor format',
    slug: 'generate-blog-title',
    form: [
      {
        label: 'Enter your blog niche',
        field: 'input',
        name: 'niche',
        required: true
      },
      {
        label: 'Enter blog outline',
        field: 'textarea',
        name: 'outline',
      }
    ]
  },
  {
    name: 'Article Writer',
    desc: 'An AI tool that generates full articles based on the given topic and outline',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921285.png',
    aiPrompt: 'Write a detailed article based on the given topic and outline, and present the result in rich text editor format',
    slug: 'generate-article',
    form: [
      {
        label: 'Enter your article topic',
        field: 'input',
        name: 'topic',
        required: true
      },
      {
        label: 'Enter article outline',
        field: 'textarea',
        name: 'outline',
      }
    ]
  },
  {
    name: 'Social Media Post',
    desc: 'An AI tool that generates engaging social media posts based on the provided information',
    category: 'Social Media',
    icon: 'https://cdn-icons-png.flaticon.com/128/1828/1828757.png',
    aiPrompt: 'Create a social media post based on the given details and present the result in a format suitable for platforms like Twitter, Facebook, and Instagram',
    slug: 'generate-social-media-post',
    form: [
      {
        label: 'Enter your social media post topic',
        field: 'input',
        name: 'topic',
        required: true
      },
      {
        label: 'Enter additional details or hashtags',
        field: 'textarea',
        name: 'details',
      }
    ]
  },
  {
    name: 'Product Description',
    desc: 'An AI tool that generates compelling product descriptions based on product details',
    category: 'E-commerce',
    icon: 'https://cdn-icons-png.flaticon.com/128/3528/3528136.png',
    aiPrompt: 'Write a product description based on the provided product details, including features, benefits, and target audience, and present it in a rich text editor format',
    slug: 'generate-product-description',
    form: [
      {
        label: 'Enter product name',
        field: 'input',
        name: 'productName',
        required: true
      },
      {
        label: 'Enter product features and benefits',
        field: 'textarea',
        name: 'productDetails',
      }
    ]
  },
  {
    name: 'Blog Topic Ideas',
    desc: 'An AI tool that generates creative and relevant blog topic ideas based on the given niche',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/857/857681.png',
    aiPrompt: 'Provide 10 blog topic ideas based on the given niche and keywords',
    slug: 'generate-blog-topic-ideas',
    form: [
      {
        label: 'Enter your blog niche',
        field: 'input',
        name: 'niche',
        required: true
      },
      {
        label: 'Enter keywords or themes',
        field: 'textarea',
        name: 'keywords',
      }
    ]
  },
  {
    name: 'YouTube SEO Title',
    desc: 'An AI tool that generates catchy and viral YouTube video titles for better SEO',
    category: 'Video',
    icon: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png',
    aiPrompt: 'Generate 5 catchy and SEO-optimized YouTube video titles based on the given video topic and keywords',
    slug: 'generate-youtube-seo-title',
    form: [
      {
        label: 'Enter your video topic',
        field: 'input',
        name: 'topic',
        required: true
      },
      {
        label: 'Enter keywords or themes',
        field: 'textarea',
        name: 'keywords',
      }
    ]
  },
  {
    name: 'Rewrite Article',
    desc: 'An AI tool that rewrites articles to make them plagiarism-free while retaining the original meaning',
    category: 'Writing',
    icon: 'https://cdn-icons-png.flaticon.com/128/2704/2704663.png',
    aiPrompt: 'Rewrite the given article to make it plagiarism-free while retaining the original meaning and present the result in rich text editor format',
    slug: 'rewrite-article',
    form: [
      {
        label: 'Enter the article text',
        field: 'textarea',
        name: 'article',
        required: true
      }
    ]
  },
  {
    name: 'Text Improver',
    desc: 'An AI tool that enhances the quality of your text by improving grammar, style, and readability',
    category: 'Writing',
    icon: 'https://cdn-icons-png.flaticon.com/128/2331/2331716.png',
    aiPrompt: 'Improve the given text by enhancing grammar, style, and readability and present the result in rich text editor format',
    slug: 'text-improver',
    form: [
      {
        label: 'Enter the text to improve',
        field: 'textarea',
        name: 'text',
        required: true
      }
    ]
  }
];
