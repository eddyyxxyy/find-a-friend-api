class PetNotFoundError extends Error {
  constructor() {
    super("Pet not found.");
  }
}

export { PetNotFoundError };
