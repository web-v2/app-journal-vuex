import createVuexStore from "../../../mock-data/mock-store";

describe("Vuex: Pruebas en el auth-module", () => {
  test("estado inicial", () => {
    const store = createVuexStore({
      status: "authenticating", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  //Mutaciones
  test("Mutation: loginUser", () => {
    const store = createVuexStore({
      status: "authenticating", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });
    const payload = {
      user: { name: "SamirV2", email: "svergara@mail.com" },
      idToken: "ABC-1234",
      refreshToken: "XYZ-1234",
    };
    store.commit("auth/loginUser", payload);
    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "SamirV2", email: "svergara@mail.com" });
    expect(idToken).toBe("ABC-1234");
    expect(refreshToken).toBe("XYZ-1234");
  });

  test("Mutation: logout", () => {
    localStorage.setItem("idToken", "ABC-123");
    localStorage.setItem("refreshToken", "XYZ-123");

    const store = createVuexStore({
      status: "authenticated", // 'authenticated','not-authenticated', 'authenticating'
      user: { name: "SamirV2", email: "svergara@mail.com" },
      idToken: "ABC-1234",
      refreshToken: "XYZ-1234",
    });

    store.commit("auth/logoutUser", store);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);

    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  //Getters
  test("Getters: username currentState", () => {
    const store = createVuexStore({
      status: "authenticated", // 'authenticated','not-authenticated', 'authenticating'
      user: { name: "SamirV2", email: "svergara@mail.com" },
      idToken: "ABC-1234",
      refreshToken: "XYZ-1234",
    });

    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/username"]).toBe("SamirV2");
  });
});
