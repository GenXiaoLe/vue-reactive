<template>
    <section>
        <button>+</button>
        <input type="text" v-model="number" style="text-align: center" >
        <button>-</button>
        <span>number double is {{double}}</span>
    </section>
</template>

<script>
import '../components/reactive';
import '../components/computed';
import '../components/effect';

export default {
    data() {
        return {
            number: 0,
            double: 0,
            number2: 0,
        }
    },
    mounted() {
        //
    },
}

</script>
