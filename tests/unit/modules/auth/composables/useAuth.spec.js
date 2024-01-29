import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "auth/currentState": "authenticated",
    "auth/username": "SamirV",
  },
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("Pruebas en useAuth", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createUser - Exitoso", async () => {
    const { createUser } = useAuth();
    const newUser = {
      name: "Juana",
      email: "j@gmail.com",
    };
    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await createUser(newUser);
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(resp).toEqual({ ok: true });
  });

  test("createUser - Fallido, xq ya existe el usuario ", async () => {
    const { createUser } = useAuth();
    const newUser = {
      name: "Juana",
      email: "j@gmail.com",
    };
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });
    const resp = await createUser(newUser);
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("Login: Exitoso", async () => {
    const { loginUser } = useAuth();
    const loginForm = {
      email: "j@gmail.com",
      password: "123456",
    };
    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await loginUser(loginForm);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(resp).toEqual({ ok: true });
  });

  test("Login: Fallido", async () => {
    const { loginUser } = useAuth();
    const loginForm = {
      email: "j@gmail.com",
      password: "123456",
    };
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL/PASSWORD do not exist",
    });
    const resp = await loginUser(loginForm);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(resp).toEqual({ ok: false, message: "EMAIL/PASSWORD do not exist" });
  });

  test("checkAuthState", async () => {
    const { checkAuthState } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await checkAuthState();
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication");
    expect(resp).toEqual({ ok: true });
  });

  test("Logout", () => {
    const { logout } = useAuth();
    logout();
    expect(mockStore.commit).toHaveBeenCalledWith("auth/logoutUser");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
  });

  test("Computed: authStatus, username", () => {
    const { authStatus, username } = useAuth();
    expect(authStatus.value).toBe("authenticated");
    expect(username.value).toBe("SamirV");
  });
});
