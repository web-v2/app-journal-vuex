import journalApi from "@/api/journalAPI"
/*
export const myAction = async ({ commit }) => {

}
https://vue-demos-v2-default-rtdb.firebaseio.com/entries.json
*/

export const loadEntries = async ({ commit }) => {
    const {data} = await journalApi.get('/entries.json')
    if(!data){
        commit('setEntries', [])
        return
    }
    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entrada) => {
    const {fecha, picture, text} = entrada
    const dataToSave = {fecha, picture, text}
    const resp = await journalApi.put(`/entries/${entrada.id}.json`, dataToSave)    
    commit('updateEntry', {...entrada}) //commit updateEntry en Mutaciones para actualizar el state.
}

export const createEntry = async ({ commit }, entrada) => {
    const {fecha, picture, text} = entrada
    const dataToSave = {fecha, picture, text}
    //console.log(dataToSave);
    const {data} = await journalApi.post(`/entries.json`, dataToSave)    
    dataToSave.id = data.name;
    commit('addEntry', dataToSave)
    return data.name;
}

export const deleteEntry = async ({ commit }, id) => {
    const resp = await journalApi.delete(`/entries/${id}.json`)    
    commit('deleteEntry', id) //commit deleteEntry en Mutaciones para actualizar el state.
    return resp
}