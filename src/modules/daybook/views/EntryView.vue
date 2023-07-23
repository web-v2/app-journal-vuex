<template>
    <template v-if="entry">
        <div>
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
            <div>
                <input type="file" name="carga" @change="onSelectedImagen" ref="imageSelector" v-show="false" accept="image/png, image/jpeg">
                <button class="btn btn-danger mx-2" v-if="entry.id" @click="onDeleteEntry">Borrar <i class="fa fa-trash-alt"></i></button>
                <button class="btn btn-primary" @click="onSelectImagen">Subir foto <i class="fa fa-upload"></i></button>
            </div>
        </div> 
        <hr>
        <div v-if="entry" class="d-flex flex-column px-3 h-75">
            <textarea name="post" id="post" cols="10" rows="3" placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>            
        </div>
        <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture"
            alt="entry-pinture"
            class="img thumbnail"
        >
        <img 
            v-if="localImage"
            :src="localImage"
            alt="entry-pinture"
            class="img thumbnail"
        >  
    </template>
    <Fab icon="fa-save" @on:click="saveEntry"/>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(()=>import('../components/Fab.vue'))
    },
    data(){
        return {
            entry: null,
            localImage: null,
            fileGeneral: null
        }
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
        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),

        loadEntry(){
            let ent;
            if( this.id === 'new' ){
                ent = {
                    text : '',
                    fecha : new Date().getTime()
                }
            }else{
                ent = this.getEntryById( this.id )
                if(!ent) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = ent
        },

        async saveEntry(){   
            new Swal({
                title : 'Espere por favor...',
                AllowOutsideClick : false
            })         
            Swal.showLoading()
            
            //Carga de imagen
            const picture = await uploadImage(this.fileGeneral)            
            this.entry.picture = picture

            if(this.entry.id){
                //Actualizar
                await this.updateEntry(this.entry); //updateEntry en Store/app-journal/Actions
            }else{
                //Crear nueva entradas
                const idNewReg = await this.createEntry(this.entry);
                this.$router.push({ name: 'entry', params: {id: idNewReg}})
            }
            this.fileGeneral = null
            Swal.fire('Guardado', 'Entrada registrada con éxito!', 'success')
        },
        async onDeleteEntry(){              
            const {isConfirmed} = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro!'                
            })              
            if(isConfirmed){
                Swal.fire({
                    title : 'Espere por favor...',
                    AllowOutsideClick : false
                }) 
                Swal.showLoading()                
                await this.deleteEntry(this.entry.id);                
                this.$router.push({name: 'no-entry'})
                Swal.fire('Eliminado', '', 'success')
            }     
        },
        onSelectedImagen(event){
            const file = event.target.files[0];
            if(!file){
                this.localImage = null
                this.fileGeneral = null
                return
            }
            this.fileGeneral = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },
        onSelectImagen(){
          this.$refs.imageSelector.click()
        }
    },
    created() {
        this.loadEntry()
    },
    watch:{
        id(){
            this.loadEntry()
        }
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
