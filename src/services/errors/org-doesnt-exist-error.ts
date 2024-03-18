class OrgDoesntExistError extends Error {
  constructor() {
    super("Organization does not exist.");
  }
}

export { OrgDoesntExistError };
