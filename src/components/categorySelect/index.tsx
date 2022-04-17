import React from 'react';

import {Category, Container, Icon} from './styles';

interface Props {
  title: string;
}

export const CategorySelect: React.FC<Props> = ({title}) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down"/>
    </Container>
  );
};
