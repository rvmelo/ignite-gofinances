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


  const total = entriesTotal - expensiveTotal;

  setHighlightedData({entries: {
    amount: entriesTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }, 
    expenses: { 
      amount: expensiveTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    total: {
      amount: total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
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
                lastTransaction='Última entrada dia 13 de abril' 
              />
              <HighlightCard 
                type='down'
                title='Saídas' 
                amount={highLightedData?.expenses?.amount} 
                lastTransaction='Última saída dia 03 de abril' 
              />
              <HighlightCard 
                type='total'
                title='Total' 
                amount={highLightedData?.total?.amount} 
                lastTransaction='01 à 16 de abril' 
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
