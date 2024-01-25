import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";
import authApi from "@/api/authAPI";

const createVuexStore = (inicialStore) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...inicialStore },
      },
    },
  });

describe("Vuex - Pruebas en el Journal Module", () => {
  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "user@test.com",
      password: "123456",
      returnSecureToken: true,
    });
    localStorage.setItem('idToken', data.idToken);
  });

  /** Basicas ====================*/
  test("este es el estado inicial, debe de tener este estado", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  /** Mutations ==================== */
  test("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(4);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("mutation: updateEntry", () => {
    const store = createVuexStore(journalState);
    const pathStore = store.state.journal.entries;
    const updatedEntry = {
      id: "-NH7uKXKp-qWoAlduDNp",
      fecha: 1668744254460,
      picture:
        "https://res.cloudinary.com/db2h2aoif/image/upload/v1668745453/vuejs/app-journal/Samir_V2_uu1haw.png",
      text: "Hola mundo desde las Pruebas en UpdateEntry.",
    };
    store.commit("journal/updateEntry", updatedEntry);
    expect(pathStore.length).toBe(4);
    expect(pathStore.find((e) => e.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test("mutation: addEntry", () => {
    const store = createVuexStore(journalState);
    const entry = {
      id: "A1B2C3D4E5",
      fecha: 1668744254460,
      picture: "",
      text: "Hola Mundo",
    };
    store.commit("journal/addEntry", entry);
    const pathStore = store.state.journal.entries;
    expect(pathStore.length).toBe(5);
    expect(pathStore.find((e) => e.id === "A1B2C3D4E5")).toBeTruthy();
  });

  test("mutation: deleteEntry", () => {
    const store = createVuexStore(journalState);
    const idEntry = "A1B2C3D4E5";
    store.commit("journal/deleteEntry", idEntry);
    const pathStore = store.state.journal.entries;
    expect(pathStore.length).toBe(4);
    expect(pathStore.find((e) => e.id === "A1B2C3D4E5")).toBeFalsy();
  });

  /** Getters ==================== */
  test("getters: getEntriesByTerm && getEntryById", () => {
    const store = createVuexStore(journalState);
    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(4);
    expect(store.getters["journal/getEntriesByTerm"]("claudinary").length).toBe(
      1
    );
    expect(
      store.getters["journal/getEntryById"]("-NH7uKXKp-qWoAlduDNp")
    ).toBeTruthy();
  });

  /** Actions ==================== */
  test("actions: loadEntries ", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries.length).toBe(5);
  });

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);
    const updateEntryData = {
      id: "-NH7uKXKp-qWoAlduDNp",
      fecha: 1668744254460,
      text: "update data desde testing.",
    };
    await store.dispatch("journal/updateEntry", updateEntryData);
    expect(store.state.journal.entries.length).toBe(4);
    expect(
      store.state.journal.entries.find((e) => e.id === updateEntryData.id)
    ).toEqual({
      id: "-NH7uKXKp-qWoAlduDNp",
      fecha: 1668744254460,
      text: "update data desde testing.",
    });
  });

  test("Actions: createEntry deleteEntry", async () => {
    const store = createVuexStore(journalState);
    const newEntryData = {
      fecha: 1668744254460,
      text: "Nueva data desde testing.",
    };
    const id = await store.dispatch("journal/createEntry", newEntryData);
    expect(typeof id).toBe("string");
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch("journal/deleteEntry", id);
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
