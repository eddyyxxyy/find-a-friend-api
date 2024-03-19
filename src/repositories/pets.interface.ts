import type { Pet, Prisma } from "@prisma/client";
import {
  TEnergyAndIndependenceLevels,
  TEnvironmentMinimumSize,
  TSizes,
} from "@tests/make-pet";

export type CreatePetInput = Prisma.PetUncheckedCreateInput;

export interface IFindAllData {
  age?: number,
  city: string,
  energyLevel?: TEnergyAndIndependenceLevels,
  environmentMinimumSize?: TEnvironmentMinimumSize,
  independenceLevel?: TEnergyAndIndependenceLevels,
  size?: TSizes,
}

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
   * Finds all pet by its city name and other characteristics.
   *
   * @param data - An object containing the id property.
   * - `city` (string): Required.
   * - `age` (number): Optional.
   * - `energyLevel` (string): Optional.
   * - `independentLevel` (string): Optional.
   * - `environmentMinimumSize` (string): Optional.
   * - `size` (string): Optional.
   *
   * @returns A Promise that resolves to the matching `Pet`s object array
   * or an empty array if no pets are found.
   */
  findAll(data: IFindAllData): Promise<Pet[] | []>;
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
