import { shallowMount } from "@vue/test-utils";

import Navbar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../mock-data/mock-store";

describe("Pruebas en el navbar component", () => {
  const store = createVuexStore({
    status: "authenticated", // 'authenticated','not-authenticated', 'authenticating'
    user: { name: "SamirV2", email: "svergara@mail.com" },
    idToken: "ABC-123",
    refreshToken: "XYZ-123",
  });
  beforeEach(() => jest.clearAllMocks());
  test("Debe de mostrar el componente correctamente", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("click en logout, debe de cerrar sesión y redireccionar", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "login" });

    expect(store.state.auth).toEqual({
      user: null,
      status: "not-authenticated",
      idToken: null,
      refreshToken: null,
    });
  });
});
