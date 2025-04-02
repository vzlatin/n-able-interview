import { User } from "../types/user";
import { RequiredKeys, RequiredProp } from "../types/utils";

export function isPrivateUser(
  user: User,
  properties: Array<keyof RequiredKeys>,
): user is RequiredProp<User, Array<keyof RequiredKeys>[number]> {
  return properties.every((property) => user[property] !== undefined);
}
