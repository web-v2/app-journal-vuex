import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state';


const createVuexStore = (inicialStore) => 
createStore({
    modules: { 
        journal: {
            ...journal,
            state: {...inicialStore}
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {
    /** Basicas ====================*/
    test('este es el estado inicial, debe de tener este estado', () => {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });

    /** Mutations ==================== */
    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading: true, entries: []})
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)
        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const pathStore = store.state.journal.entries        
        const updatedEntry = {
            id: "-NH7uKXKp-qWoAlduDNp",
            fecha: 1668744254460,
            picture: "https://res.cloudinary.com/db2h2aoif/image/upload/v1668745453/vuejs/app-journal/Samir_V2_uu1haw.png",
            text: "Hola mundo desde las Pruebas en UpdateEntry."
        }
        store.commit('journal/updateEntry', updatedEntry)        
        expect(pathStore.length).toBe(4)
        expect(pathStore.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    });

    test('mutation: addEntry', () => {
        const store = createVuexStore( journalState )        
        const entry = {id: 'A1B2C3D4E5', fecha: 1668744254460, picture: '', text: 'Hola Mundo'}
        store.commit('journal/addEntry', entry) 
        const pathStore = store.state.journal.entries        
        expect(pathStore.length).toBe(5)
        expect(pathStore.find( e => e.id === 'A1B2C3D4E5' )).toBeTruthy()       
    });

    test('mutation: deleteEntry', () => {
        const store = createVuexStore(journalState)          
        const idEntry = "A1B2C3D4E5"
        store.commit('journal/deleteEntry', idEntry) 
        const pathStore = store.state.journal.entries 
        expect(pathStore.length).toBe(4)
        expect(pathStore.find(e => e.id === 'A1B2C3D4E5')).toBeFalsy()
    });

    /** Getters ==================== */
    test('Getters getEntriesByTerm && getEntryById', () => {
        const store = createVuexStore(journalState)   
        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(4)
        expect( store.getters['journal/getEntriesByTerm']('claudinary').length ).toBe(1)        
        expect( store.getters['journal/getEntryById']('-NH7uKXKp-qWoAlduDNp')).toBeTruthy()
    });

    /** Actions ==================== */
});