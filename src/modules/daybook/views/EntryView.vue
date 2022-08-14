<template>
<div>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{day}}</span>
            <span class="mx-1 fs-3">{{month}}</span>
            <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
        </div>
        <div>
            <button class="btn btn-danger mx-2">Borrar <i class="fa fa-trash-alt"></i></button>
            <button class="btn btn-primary">Subir foto <i class="fa fa-upload"></i></button>
        </div>
    </div> 
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea name="post" id="post" cols="10" rows="3" placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <Fab icon="fa-save"/>
    <img 
    src="data:image/png;base64,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"
    alt="entry-pinture"
    class="img thumbnail"
    >  
</div>   
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            entry: null
        }
    },
    components: {
        Fab: defineAsyncComponent(()=>import('../components/Fab.vue'))
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day(){
            const { day } = getDayMonthYear( this.entry.fecha )
            return day
        },
        month(){
            const { month } = getDayMonthYear( this.entry.fecha )
            return month
        },
        yearDay(){
            const { yearDay } = getDayMonthYear( this.entry.fecha )
            return yearDay
        },                
    },
    methods:{
        loadEntry(){
            const ent = this.getEntryById( this.id )
            if(!ent) this.$router.push({ name: 'no-entry' })
            this.entry = ent
        }
    },
    created() {
        this.loadEntry()
    }
}
</script>

<style lang="scss" scoped>
    textarea{
        font: size 20px;
        border: none;
        height: 100%;

        &:focus{
            outline: none;
        }
    }
    img{ 
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);        
    }
</style>
