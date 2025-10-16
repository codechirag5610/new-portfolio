export default {
  name: 'certifications',
  title: 'Certifications',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Certificate Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'certificateImage',
      title: 'Certificate Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year of Certification',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      description: 'Optional: Organization that issued the certificate'
    },
    {
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Optional: Credential or Certificate ID'
    },
    {
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Optional: Link to verify the certificate'
    }
  ],
  orderings: [
    {
      title: 'Year, New to Old',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'}
      ]
    }
  ]
};

