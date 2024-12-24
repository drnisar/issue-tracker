import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

const Link = ({ children, href }: { children: string; href: string }) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
