export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'field',
      title: 'Field of Study',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional: City, State/Country'
    },
    {
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'endYear',
      title: 'End Year',
      type: 'string',
      description: 'Use "Present" if still ongoing'
    },
    {
      name: 'grade',
      title: 'Grade/GPA',
      type: 'string',
      description: 'Optional: Grade, GPA, or performance metric'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional: Additional details, achievements, coursework, etc.'
    }
  ],
  orderings: [
    {
      title: 'Start Year, New to Old',
      name: 'startYearDesc',
      by: [
        {field: 'startYear', direction: 'desc'}
      ]
    }
  ]
};

