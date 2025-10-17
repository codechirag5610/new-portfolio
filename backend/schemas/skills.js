export default{
    name:'skills',
    title:'Skills',
    type: 'document',
    fields:[
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'category',
            title:'Category',
            type:'string',
            options: {
                list: [
                    {title: 'Development', value: 'Development'},
                    {title: 'Databases', value: 'Databases'},
                    {title: 'Languages', value: 'Languages'},
                    {title: 'CI/CD and Automations', value: 'CICD'},
                    {title: 'Infrastructure as Code', value: 'Infrastructure-as-Code'},
                    {title: 'Monitoring and Observability', value: 'Monitoring-and-Observability'},
                    {title: 'Containerization and Orchestration', value: 'Containerization-and-Orchestration'},
                    {title: 'Cloud Platforms', value: 'Cloud-Platforms'}
                ],
            },
            validation: Rule => Rule.required()
        },
        {
            name:'bgColor',
            title:'BgColor',
            type:'string'
        },
        {
            name:'icon',
            title:'Icon',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}