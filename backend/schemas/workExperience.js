export default {
    name:'workExperience',
    title:'Work Experience',
    type:'document',
    fields:[
           {
               name:'name',
               title:'Position/Role',
               type:'string'
            },
            {
                name:'company',
                title:'Company',
                type:'string'
            },
            {
                name:'startDate',
                title:'Start Date',
                type:'string',
                description: 'e.g., March 2023'
            },
            {
                name:'endDate',
                title:'End Date',
                type:'string',
                description: 'e.g., November 2023 or "Present" if currently working'
            },
            {
                name:'desc',
                title:'Short Description',
                type:'string',
                description: 'Brief one-line description'
            },
            {
                name:'longDescription',
                title:'Detailed Description',
                type:'text',
                description: 'Full details about responsibilities, achievements, and projects'
            }
    ]
}