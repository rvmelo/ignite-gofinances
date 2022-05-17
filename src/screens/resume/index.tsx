import React from 'react';
import { HistoryCard } from '../../components/historyCard';

import { Container, Header, Title } from './styles';

export const Resume: React.FC = () => {
  return (
    <Container>
        <Header>
        <Title>Resumo por Categoria</Title>
        </Header>

        <HistoryCard title='Compras' amount='R$ 150,50' color='red' />
    </Container>
  )
}
