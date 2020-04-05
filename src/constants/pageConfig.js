const pageConfig = {
    homePageConfig : {
        buttonConfig : ['edit', 'delete']
    },
    categoryConfig : {
        buttonConfig : ['edit', 'delete']
    },
    routes : [
        {
            path:'/home',
            name:'Home',
            icon: 'MdHome'
        },
        {path:'/addCategory',
            name:'Add Category',
            icon: 'MdLibraryAdd'
        },
        {
            path:'/profile',
            name:'Profile',
            icon: 'MdDescription'
        },
        {
            path:'/logOut',
            name:'Logout',
            icon: 'MdDesktopWindows'
        },
         {
            path:'/enquires',
            name:'Enquires',
            icon: 'MdRecordVoiceOver'
        }
    ]
}
export default  pageConfig  