import { Heading } from '@chakra-ui/react';

type PageTitleProps = {
  title: string;
};
export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Heading as={'h1'} mb={4}>
      {title}
    </Heading>
  );
};
