import React, { useCallback, useEffect, useState } from 'react';

//   components
import { HighlightCard } from '../../components/highlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/transactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  LogoutButton,
  LoadContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { isLoaded, isLoading } from 'expo-font';
import { useTheme } from 'styled-components';
import theme from '../../global/styles/theme';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightedProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightedData {
  entries: HighlightedProps;
  expenses: HighlightedProps;
  total: HighlightedProps;
}

export const Dashboard: React.FC = () => {

 const [transactions, setTransactions] = useState<DataListProps[]>([]);
 const [highLightedData, setHighlightedData] = useState<HighlightedData>({} as HighlightedData);
 const [isLoading, setIsLoading] = useState(true);

 const theme = useTheme();

 function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {

  const lastTransaction = new Date (Math.max.apply(Math, collection.filter(transaction => transaction.type === type)
  .map(transaction => new Date (transaction.date).getTime())));

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`;

 }


 async function loadTransactions() {
  const dataKey = '@gofinances:transactions';
  const result = await AsyncStorage.getItem(dataKey);


  const transactions = result ? JSON.parse(result) : [];

  let entriesTotal = 0;
  let expensiveTotal = 0;

  const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

    if (item.type === 'positive') {
      entriesTotal += Number(item.amount);
    } else {
      expensiveTotal += Number(item.amount);
    }

    const amount = Number(item.amount).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const date = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(item.date));

    return {
      ...item,
      amount,
      date,
      category: item.category
    }

  });

  const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
  const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');

  const totalInterval = `01 a ${lastTransactionExpenses}`;

  const total = entriesTotal - expensiveTotal;

  setHighlightedData({
  entries: {
    amount: entriesTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }),
    lastTransaction: `Última entrada dia ${lastTransactionEntries}`
  }, 
    expenses: { 
      amount: expensiveTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: `Última saída dia ${lastTransactionExpenses}`
    },
    total: {
      amount: total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: totalInterval
    }
  });
  setTransactions(transactionsFormatted);
  setIsLoading(false);

 }

 useEffect(() => {
  loadTransactions();
 }, []);

 useFocusEffect(useCallback(() => {
   loadTransactions();
  }, []));

  return (
    <Container>
        {isLoading ? 
          <LoadContainer>
            <ActivityIndicator size='large' color={theme.colors.primary} /> 
          </LoadContainer>
          :
          <>
            <Header>
            <UserWrapper>
                <UserInfo>
                  <Photo source={{uri: 'https://avatars.githubusercontent.com/u/9627469?v=4'}} />
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Roberto</UserName>
                  </User>
                </UserInfo>
                <LogoutButton>
                  <Icon name="power" />
                </LogoutButton>
            </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard 
                type='up'
                title='Entradas' 
                amount={highLightedData?.entries?.amount} 
                lastTransaction={highLightedData?.entries?.lastTransaction} 
              />
              <HighlightCard 
                type='down'
                title='Saídas' 
                amount={highLightedData?.expenses?.amount} 
                lastTransaction={highLightedData?.expenses?.lastTransaction} 
              />
              <HighlightCard 
                type='total'
                title='Total' 
                amount={highLightedData?.total?.amount} 
                lastTransaction={highLightedData?.total?.lastTransaction}
              />
            </HighlightCards>
            <Transactions>
              <Title>Listagem</Title>
              <TransactionList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({item}) => <TransactionCard data={item} />}         
              />
            </Transactions>
          </>
        }
    </Container>
  )
}
