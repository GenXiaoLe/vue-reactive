<template>
    <section>
        <router-view></router-view>
    </section>
</template>

<script>

export default {
    data() {
        return {
            data: {
                price: 0,
                number: 0,
                count: 0
            }
        }
    },
    mounted() {
        //
    },
}

</script>