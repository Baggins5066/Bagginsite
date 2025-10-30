
export interface Bot {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  tags: string[];
  administratorInviteUrl:string;
  minimalInviteUrl:string;
  isVerified: boolean;
}