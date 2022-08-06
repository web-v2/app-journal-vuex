export default { 
    name: 'dayboot',
    component: () => import(/* webpackChunkName: "dayboot" */ '@/modules/daybook/layouts/DayBootLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue')                        
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "no-entry" */ '@/modules/daybook/views/EntryView.vue')                        
        }
    ]
}