
export interface Bot {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  tags: string[];
  inviteUrl: string;
  isVerified: boolean;
}