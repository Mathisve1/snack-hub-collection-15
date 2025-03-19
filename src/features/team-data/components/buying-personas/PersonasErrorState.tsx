
type PersonasErrorStateProps = {
  error: string;
};

export const PersonasErrorState = ({ error }: PersonasErrorStateProps) => {
  return (
    <div className="text-red-500 p-4">
      Error loading buying personas data: {error}
    </div>
  );
};
