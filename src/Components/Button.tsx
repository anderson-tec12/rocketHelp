import { Button as ButtonNB, IButtonProps, Heading } from "native-base";

interface I_PROPS extends IButtonProps {
  title: string;
}
export function Button({ title, ...rest }: I_PROPS) {
  return (
    <ButtonNB
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{
        bg: "green.500",
      }}
      {...rest}
    >
      <Heading fontSize={"sm"} color="white">
        {title}
      </Heading>
    </ButtonNB>
  );
}
