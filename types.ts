
export interface Bot {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  tags: string[];
  userCount: number;
  inviteUrl: string;
  isVerified: boolean;
}
