export default {
    methods:{
        goToRoute(routeName){
            this.$router.push({ name: routeName });
        },
    }
}