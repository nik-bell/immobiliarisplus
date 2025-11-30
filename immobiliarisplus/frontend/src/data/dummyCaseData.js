export default [
  {
    id: "C001",
    property: {
      address: "Via Dante Alighieri 15, Milano",
      propertyType: "Appartamento",
      condition: "Buono",
      sizeMq: 85,
    },
    details: {
      rooms: 3,
      bathrooms: 1,
      floor: 2,
      features: {
        balcone: true,
        garage: false,
        giardino: false,
        parcheggio: true,
        terrazzo: false,
        ascensore: true,
        cantina: false,
      },
    },
    contact: {
      name: "Marco",
      surname: "Bianchi",
      email: "marco@example.com",
      phone: "3331122334",
    },

    // DATI AGENTE
    assignedAgent: "Alessia Verdi",
    valuationRange: "220.000 - 255.000 €",
    valuationFinal: null,

    status: "in_corso",
    documents: [],
  },

  {
    id: "C002",
    property: {
      address: "Via Roma 42, Torino",
      propertyType: "Villa",
      condition: "Da ristrutturare",
      sizeMq: 120,
    },
    details: {
      rooms: 5,
      bathrooms: 2,
      floor: 1,
      features: {
        balcone: false,
        garage: true,
        giardino: true,
        parcheggio: false,
        terrazzo: false,
        ascensore: false,
        cantina: true,
      },
    },
    contact: {
      name: "Laura",
      surname: "Gallo",
      email: "laura@example.com",
      phone: "3395566778",
    },

    assignedAgent: null,
    valuationRange: "180.000 - 210.000 €",
    valuationFinal: null,

    status: "non_assegnati",
    documents: [],
  },
];
