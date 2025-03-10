
export interface FolderItem {
  id: string;
  folder_id: string;
  business_name: string;
  team: string;
  added_at: string;
}

export interface Folder {
  id: string;
  team: string;
  name: string;
  created_at: string;
  items?: FolderItem[];
}
