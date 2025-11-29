import { T as TSS_SERVER_FUNCTION, g as getServerFnById } from '../virtual/entry.mjs';

const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};

export { createSsrRpc as c };
//# sourceMappingURL=createSsrRpc-B7i2AQJQ.mjs.map
