import React from 'react';

//   components
import { HighlightCard } from '../../components/highlightCard';
import { TransactionCard } from '../../components/transactionCard';


import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export const Dashboard: React.FC = () => {

  const data = [
    {
      title:'Desenvolvimento de site', 
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date:'13/04/2020'
    },
    {
      title:'Desenvolvimento de site', 
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date:'13/04/2020'
    },
    {
      title:'Desenvolvimento de site', 
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date:'13/04/2020'
    },
  ]

  return (
    <Container>
      <Header>

       <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/9627469?v=4'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Roberto</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
       </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          type='up'
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 13 de abril' 
        />
        <HighlightCard 
          type='down'
          title='Saídas' 
          amount='R$ 1.259,00' 
          lastTransaction='Última saída dia 03 de abril' 
        />
        <HighlightCard 
          type='total'
          title='Total' 
          amount='R$ 16.141,00' 
          lastTransaction='01 à 16 de abril' 
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={data}
          // keyExtractor={item => item.title}
          renderItem={({item}) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingBottom: 20
          }}
        />
      </Transactions>
    </Container>
  )
}
