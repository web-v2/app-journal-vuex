import { shallowMount } from "@vue/test-utils";
import { journal } from "@/modules/daybook/store/journal";
import { createStore } from "vuex";
import { journalState } from "../../../mock-data/test-journal-state";
import EntryList from '@/modules/daybook/components/EntryList';

const createVuexStore = (initialState) =>
createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Pruebas en el EntryList', () => {

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = shallowMount(EntryList, {
        global: {
            mocks: {
                $router: mockRouter
            }, 
            plugins: [ store ]
        }
    })
    
    test('debe de llamar al getEntriesByTerm sin termino y mostrar 2 entradas', () => {
        console.log( wrapper.html() )
    });    
});