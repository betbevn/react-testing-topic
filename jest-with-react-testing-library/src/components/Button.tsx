interface ButtonProps {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, primary, onClick }) => {
  const buttonStyle = primary
    ? { backgroundColor: "blue", color: "white" }
    : { backgroundColor: "white", color: "blue" };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
