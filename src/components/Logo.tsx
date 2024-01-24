type Props = {
  width: string;
};

const Logo = ({ width = "100px" }: Props) => {
  return <div className={`${width}`}>Logo</div>;
};

export default Logo;
