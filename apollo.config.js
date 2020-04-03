module.exports = {
  client: {
    service: {
      name: 'elenta',
      url: 'http://elenta.dev/graphql',
      headers: {
        authorization: 'Bearer lkjfalkfjadkfjeopknavadf'
      },
      skipSSLValidation: true
    },
    includes: ['./resources/js/**/*.ts', './resources/js/**/*.tsx'],
    tagName: "gql",
    addTypename: true
  }
};
