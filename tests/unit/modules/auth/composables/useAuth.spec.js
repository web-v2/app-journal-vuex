import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  //Getters
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
});
