import type { Pet, Prisma } from "@prisma/client";

export type CreatePetInput = Prisma.PetUncheckedCreateInput;

/**
 * Interface defining the contract for a Pet repository.
 *
 * This interface specifies the methods that any Pet
 * repository implementation must provide.
 */
interface IPetsRepository {
  /**
   * Creates a new pet in the persistent storage.
   *
   * @param data An object containing the data required to create
   * a new pet.
   *
   * The structure of this data should conform
   * to the `Prisma.PetUncheckedCreateInput` type.
   *
   * @returns A Promise that resolves to the newly created `Pet` object.
   */
  create(data: CreatePetInput): Promise<Pet>;
  /**
   * Finds a pet by its id.
   *
   * @param data - An object containing the id property.
   * - `id` (string): The id of the pet to search for.
   *
   * @returns A Promise that resolves to the matching `Pet` object
   * or `null` if no pet is found.
   */
  findById(data: { id: string }): Promise<Pet | null>;
}

export { IPetsRepository };
