<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed>
    
        <v-toolbar-title class="ml-0">
            <v-toolbar-side-icon @click.stop="toggle"></v-toolbar-side-icon>
            <span class="font-weight-bold title">Cinema City &#127871;</span>
        </v-toolbar-title>
    
        <v-spacer></v-spacer>

    </v-toolbar>
</template>


<script>
    export default {
        name: 'app-header',
        props: ['value'],
        data() {
            return {
                drawer: this.value
            }
        },
        methods: {
            toggle() {
                this.drawer = !this.drawer;
                this.$emit('input', this.drawer);
            }
        },
        watch: {
            value(newValue) {
                this.drawer = newValue;
            }
        }
    }
</script>

