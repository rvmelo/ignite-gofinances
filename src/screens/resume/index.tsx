import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/historyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Content, Header, Title } from './styles';

import {categories} from '../../utils/categories';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const Resume: React.FC = () => {

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted
    .filter((transaction: TransactionData) => transaction.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {

        if (category.key === expense.category) {
          categorySum += Number(expense.amount);
        }
        
      });


      if (categorySum > 0) {

        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total
        });
      } 

    });

    setTotalByCategories(totalByCategory);

  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
        <Header>
        <Title>Resumo por Categoria</Title>
        </Header>

        <Content>
          {
            totalByCategories.map(item => (
              <HistoryCard 
                key={item.key}
                title={item.name} 
                amount={item.total} 
                color={item.color}
              />
            ))
          }
        </Content>

      
    </Container>
  )
}
