import Button from "@/components/ui/Button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Button>Hello, next button</Button>
    </div>
  );
};

export default page;
