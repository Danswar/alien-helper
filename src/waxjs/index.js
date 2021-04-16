import * as waxjs from "@waxio/waxjs/dist";

// --
// Initialize wax instance
export const wax = new waxjs.WaxJS(
  "https://wax.greymass.com",
  null,
  null,
  false
);

// --
// Sugar to login
export const login = async () => {
  await wax.login();

  return wax.userAccount;
};

// --
// Sugar to set bag in aliens world
export const setBag = async items => {
  if (!wax || !wax.userAccount || !items) return null;

  const result = wax.api.transact(
    {
      actions: [
        {
          account: "m.federation",
          name: "setbag",
          authorization: [
            {
              actor: wax.userAccount,
              permission: "active",
            },
          ],
          data: {
            account: wax.userAccount,
            items,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 1200,
    }
  );

  return result;
};
