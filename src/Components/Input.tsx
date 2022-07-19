import { Input as InputNB, IInputProps } from "native-base";

export function Input({ ...Rest }: IInputProps) {
  return (
    <InputNB
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      borderRadius={2}
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        background: "transparent",
        bg: "gray.700",
      }}
      {...Rest}
    />
  );
}
