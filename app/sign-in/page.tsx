import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const AuthPage = dynamic(() => import("@/modules/auth"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const SignInPage: React.FC = () => {

  return (
    <div>
      <AuthPage />
    </div>
  );
};

export default SignInPage;
