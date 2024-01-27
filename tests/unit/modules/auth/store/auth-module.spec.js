import axios from "axios";
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

  //Acciones
  test("Actions: createUser - Error usuario ya existe", async () => {
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "User Test",
      email: "user@test.com",
      password: "123456",
    };

    const resp = await store.dispatch("auth/createUser", newUser);

    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("Actions: createUser signInUser - Crea el usuario", async () => {
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Sara V",
      email: "sara@gmail.com",
      password: "123456",
    };
    //SignIn
    await store.dispatch("auth/signInUser", newUser);
    const { idToken } = store.state.auth;
    //Delete User
    const deleteUser = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAOxYPhEnTJr-qgnlABcswibSGUtFnTvyk`,
      {
        idToken,
      }
    );
    //console.log({ idToken });
    //Create User
    const newUserCreate = {
      name: "Sara V",
      email: "sara@gmail.com",
      password: "123456",
    };
    const resp = await store.dispatch("auth/createUser", newUserCreate);
    //console.log({ resp });
    expect(resp).toEqual({ ok: true });

    const { status, user, idToken: token, refreshToken } = store.state.auth;
    expect(status).toBe("authenticated");
    expect(user).toMatchObject({ name: "Sara V", email: "sara@gmail.com" });
    expect(typeof token).toBe("string");
    expect(typeof refreshToken).toBe("string");
  });

  test("Actions: checkAuthentication - POSITIVA", async () => {
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    //SignIn
    await store.dispatch("auth/signInUser", {
      email: "sara@gmail.com",
      password: "123456",
    });
    const { idToken } = store.state.auth;
    store.commit("auth/logoutUser");
    localStorage.setItem("idToken", idToken);
    const checkResp = await store.dispatch("auth/checkAuthentication");
    const { status, user, idToken: token, refreshToken } = store.state.auth;

    expect(checkResp).toEqual({ ok: true });
    expect(status).toBe("authenticated");
    expect(user).toMatchObject({ name: "Sara V", email: "sara@gmail.com" });
    expect(typeof token).toBe("string");
  });
  test("Actions: checkAuthentication - NEGATIVA", async () => {
    const store = createVuexStore({
      status: "authenticating", // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });
    localStorage.removeItem("idToken");
    const checkResp1 = await store.dispatch("auth/checkAuthentication");
    expect(checkResp1).toEqual({ ok: false, message: "No hay token" });
    expect(store.state.auth.status).toBe("not-authenticated");

    localStorage.setItem("idToken", "ABC-123");
    const checkResp2 = await store.dispatch("auth/checkAuthentication");
    expect(checkResp2).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
    expect(store.state.auth.status).toBe("not-authenticated");
  });
});
