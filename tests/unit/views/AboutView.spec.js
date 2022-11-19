import {shallowMount} from '@vue/test-utils'
import About from '@/views/AboutView'

describe('Pruebas en el About View', () => {
    test('debe renderizar el componente correctamente', () => {
        const wrapper  = shallowMount(About)
            expect( wrapper.html() ).toMatchSnapshot()        
    })

})