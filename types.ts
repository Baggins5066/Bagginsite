
export interface Tag {
  name: string;
  icon?: string;
}

export interface Bot {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  tags: Tag[];
  administratorInviteUrl:string;
  minimalInviteUrl:string;
  isVerified: boolean;
  repoUrl?: string;
  lastUpdated?: string;
  isOnline?: boolean;
}