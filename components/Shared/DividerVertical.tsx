export interface IDividerProps {
  className?: string;
}

const DividerVertical: React.FC<IDividerProps> = (props) => {
  const { className = "divider-vertical" } = props;
  return <div className={className}></div>;
};

export default DividerVertical;
