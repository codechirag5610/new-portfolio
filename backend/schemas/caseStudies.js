export default {
  name: 'caseStudies',
  title: 'Case Studies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'profilePicture',
      title: 'Profile Picture / Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image that appears on cards and the top of the detail page',
      validation: Rule => Rule.required()
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'A catchy one-line description of the case study'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for cards and listings (keep it under 200 characters)',
      validation: Rule => Rule.required().max(250)
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed description with rich text formatting'
    },
    {
      name: 'caseStudyDiagram',
      title: 'Architecture / Case Study Diagram',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Diagram illustrating the solution architecture or workflow'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Cloud Infrastructure', value: 'Cloud Infrastructure'},
          {title: 'DevOps & CI/CD', value: 'DevOps & CI/CD'},
          {title: 'Kubernetes', value: 'Kubernetes'},
          {title: 'Full Stack Development', value: 'Full Stack Development'},
          {title: 'System Design', value: 'System Design'},
          {title: 'Automation', value: 'Automation'},
        ]
      },
      description: 'Category for filtering case studies'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Tags for technologies, tools, or topics'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Higher numbers appear first',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this case study on the homepage (top 3 by order)'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      }
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage'
    }
  }
}

