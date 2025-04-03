import { User } from "../types/user";
import { requiredKeys, RequiredKeys, RequiredProp } from "../types/utils";

export function isPrivateUser(
  user: User,
  properties: Array<keyof RequiredKeys> = requiredKeys,
): user is RequiredProp<User, Array<keyof RequiredKeys>[number]> {
  return properties.every((property) => user[property] !== undefined);
}
