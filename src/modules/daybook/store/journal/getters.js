/*
export const myGetter = ( state ) => {

    return state

}
*/

export const getEntriesByTerm = ( state ) => ( term = '') =>{
    if ( term.length === 0 ) return state.entries

    return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLocaleLowerCase() ))
}

export const getEntryById = ( state ) => (id = '') => {
    const ent = state.entries.find( entry => entry.id === id );
    if(!ent) return
    
    return { ...ent }
}