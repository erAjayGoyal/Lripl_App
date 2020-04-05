const config = {
    routes : {
        home : {
            path:'/home',
            name:'Home',
            icon: 'MdHome'
        },
        addCategory : {
            path:'/addCategory',
            name:'Add Category',
            icon: 'MdLibraryAdd'
        },
        profile : {
            path:'/profile',
            name:'Profile',
            icon: 'MdDescription'
        },
        logOut : {
            path:'/logOut',
            name:'Logout',
            icon: 'MdDesktopWindows'
        },
        enquires : {
            path:'/enquires',
            name:'Enquires',
            icon: 'MdRecordVoiceOver'
        },
    },

    idMapping : {
        Category : 'item_type_id',
        subCategory : 'item_id',
        Product : 'product_id'
    }
}
export default  config
  