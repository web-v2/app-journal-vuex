import { shallowMount } from "@vue/test-utils";
import Fab from '@/modules/daybook/components/Fab.vue';
//desc
describe('Pruebas en el Fab component', () => {
    test('debe mostrar el icono por defecto', () => {
        const wrapper = shallowMount(Fab) 
        const itag = wrapper.find('i')       

        expect(itag.classes('fa-plus')).toBeTruthy()
    });
    test('debe mostrar el icono por argumento fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {icon: 'fa-circle'}
        }) 
        const itag = wrapper.find('i')       

        expect(itag.classes('fa-circle')).toBeTruthy()        
    });
    test('debe emitir el evento on:click cuando hace click', () => {
        const wrapper = shallowMount(Fab) 
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1);
    });
});