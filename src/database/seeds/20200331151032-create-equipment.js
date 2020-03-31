module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'equipments',
      [
        {
          partnumber: '10RRS0JK1H',
          series: 'MJ09M4N2',
          model: 'ThinkCenter M920q',
          partnumber_serie: '1S10RRS0JK1HMJ09M4N2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
