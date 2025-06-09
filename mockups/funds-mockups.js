export const mockFunds15 = {
  data: {
    byFund: {
      1: {
        nombre: "FONDO ALFA FI",
        totalPendiente: 2000,
        totalEnviado: 5000,
        totalRecuperado: 1000,
      },
      2: {
        nombre: "FONDO BETA FI",
        totalPendiente: 0,
        totalEnviado: 7000,
        totalRecuperado: 2000,
      },
      3: {
        nombre: "FONDO GAMMA FI",
        totalPendiente: 1500,
        totalEnviado: 4000,
        totalRecuperado: 500,
      },
      4: {
        nombre: "FONDO DELTA FI",
        totalPendiente: 300,
        totalEnviado: 8000,
        totalRecuperado: 10000,
      },
      5: {
        nombre: "FONDO EPSILON FI",
        totalPendiente: 0,
        totalEnviado: 0,
        totalRecuperado: 0,
      },
      6: {
        nombre: "FONDO ZETA FI",
        totalPendiente: 2500,
        totalEnviado: 3500,
        totalRecuperado: 1200,
      },
      7: {
        nombre: "FONDO ETA FI",
        totalPendiente: 0,
        totalEnviado: 10000,
        totalRecuperado: 3000,
      },
      8: {
        nombre: "FONDO THETA FI",
        totalPendiente: 900,
        totalEnviado: 1300,
        totalRecuperado: 800,
      },
      9: {
        nombre: "FONDO IOTA FI",
        totalPendiente: 200,
        totalEnviado: 0,
        totalRecuperado: 150,
      },
      10: {
        nombre: "FONDO KAPPA FI",
        totalPendiente: 1100,
        totalEnviado: 1700,
        totalRecuperado: 600,
      },
      11: {
        nombre: "FONDO LAMBDA FI",
        totalPendiente: 1300,
        totalEnviado: 800,
        totalRecuperado: 400,
      },
      12: {
        nombre: "FONDO MU FI",
        totalPendiente: 1700,
        totalEnviado: 700,
        totalRecuperado: 100,
      },
      13: {
        nombre: "FONDO NU FI",
        totalPendiente: 0,
        totalEnviado: 2300,
        totalRecuperado: 2500,
      },
      14: {
        nombre: "FONDO XI FI",
        totalPendiente: 600,
        totalEnviado: 1500,
        totalRecuperado: 1100,
      },
      15: {
        nombre: "FONDO OMICRON FI",
        totalPendiente: 800,
        totalEnviado: 900,
        totalRecuperado: 300,
      },
    },
  },
};

export const mockFunds40 = {
  data: {
    byFund: Object.fromEntries(
      Array.from({ length: 40 }, (_, i) => [
        1000 + i,
        {
          nombre: `FONDO ${i + 1}`,
          totalPendiente: Math.floor(Math.random() * 10000),
          totalEnviado: Math.floor(Math.random() * 20000),
          totalRecuperado: Math.floor(Math.random() * 15000),
        },
      ])
    ),
  },
};

export const mockFunds150 = {
  data: {
    byFund: Object.fromEntries(
      Array.from({ length: 150 }, (_, i) => [
        2000 + i,
        {
          nombre: `FONDO DEMO ${i + 1}`,
          totalPendiente: Math.floor(Math.random() * 10000),
          totalEnviado: Math.floor(Math.random() * 50000),
          totalRecuperado: Math.floor(Math.random() * 30000),
        },
      ])
    ),
  },
};
