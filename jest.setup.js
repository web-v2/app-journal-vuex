import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
  } from "vue-router-mock";
  import { config } from "@vue/test-utils";
  
  // create one router per test file
  const router = createRouterMock();
  beforeEach(() => {
    router.reset(); // reset the router state
    injectRouterMock(router);
  });
  
  // Add properties to the wrapper
  config.plugins.VueWrapper.install(VueRouterMock);
  