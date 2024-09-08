import { FC, ReactNode } from "react";
import {
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

interface ISidebarAccordionProps {
  children: ReactNode;
  groupTitle: string;
}

export const SidebarAccordion: FC<ISidebarAccordionProps> = ({
  children,
  groupTitle,
}) => {
  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text flex="1" textAlign="left">
                {groupTitle}
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box
              id="scrollbar"
              maxHeight="210px"
              display="flex"
              flexDirection="column"
              gap="2px"
              overflowY="auto"
            >
              {children}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
