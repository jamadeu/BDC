module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'localities',
      [
        {
          locality: 'LAHQ',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
