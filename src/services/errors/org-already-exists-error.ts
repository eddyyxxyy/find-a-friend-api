class OrgAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already in use.");
  }
}

export { OrgAlreadyExistsError };
