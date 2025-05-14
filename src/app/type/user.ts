export interface formattedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  profilePicture: string | null;
  isVerified: boolean;
}