type File = {
  id: number;
  file_name: string;
  file_base64: string;
  file_type: string;
  receiver_id: number;
  sender_id: number;
  signature: string;
  public_key: string;
};

export type { File };
