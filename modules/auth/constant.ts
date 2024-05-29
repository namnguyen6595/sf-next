export type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export interface IAuthProps {
  onSubmit: (data: any) => void;
}
