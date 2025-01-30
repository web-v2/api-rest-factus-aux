export interface Bill {
  id: number;
  number: string;
  reference_code: string;
  status: number;
  send_email: number;
  qr: string;
  cufe: string;
  validated: string;
  total: string;
  observation: null | string;
  created_at: string;
  public_url: string;
}
