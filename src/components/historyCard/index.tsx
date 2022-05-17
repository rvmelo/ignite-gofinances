import React from 'react';
import { Amount, Container, Title } from './styles';

interface Props {
    color: string;
    title: string;
    amount: string;
}

export const HistoryCard: React.FC<Props> = ({title,color,amount}) => {
  return( 
    <Container color={color}>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>
    </Container>
  );
}
