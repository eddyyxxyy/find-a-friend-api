import type { Org, Prisma } from "@prisma/client";

/**
 * Interface defining the contract for an Org repository.
 *
 * This interface specifies the methods that any Org
 * repository implementation must provide.
 */
interface IOrgsRepository {
  /**
   * Creates a new organization in the persistent storage.
   *
   * @param data An object containing the data required to create
   * a new organization.
   *
   * The structure of this data should conform
   * to the `Prisma.OrgCreateInput` type.
   *
   * @returns A Promise that resolves to the newly created `Org` object.
   */
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  /**
   * Finds an organization by its email address.
   *
   * @param data - An object containing the email property.
   * - `email` (string): The email address of the organization to search for.
   *
   * @returns A Promise that resolves to the matching `Org` object
   * or `null` if no organization is found.
   */
  findByEmail(data: { email: string }): Promise<Org | null>;
  /**
   * Finds an organization by its id.
   *
   * @param data - An object containing the id property.
   * - `id` (string): The id of the organization to search for.
   *
   * @returns A Promise that resolves to the matching `Org` object
   * or `null` if no organization is found.
   */
  findById(data: { id: string }): Promise<Org | null>;
}

export { IOrgsRepository };
