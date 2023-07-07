export type UserDetails = {
  username: string;
  password: string;
};

export const adminDetails: UserDetails = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASSWORD,
};
