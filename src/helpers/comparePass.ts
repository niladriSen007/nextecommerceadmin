import bcrypt from "bcryptjs";
export const comparePass = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
