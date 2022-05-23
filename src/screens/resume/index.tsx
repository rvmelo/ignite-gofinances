import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/historyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ChartContainer, Container, Content, Header, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from './styles';

import {categories} from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths } from 'date-fns/esm';
import { subMonths } from 'date-fns/esm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {

    if (action === 'next') {

      setSelectedDate(addMonths(selectedDate, 1));

    } else {

      setSelectedDate(subMonths(selectedDate, 1));

    }

  }


  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];


    const expenses = responseFormatted
    .filter((transaction: TransactionData) => 
    transaction.type === 'negative' && 
    new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
    new Date(transaction.date).getFullYear() === selectedDate.getFullYear());

    const totalExpenses = expenses.reduce((accumulator: number, expense: TransactionData) => {
      return accumulator + Number(expense.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {

        if (category.key === expense.category) {
          categorySum += Number(expense.amount);
        }
        
      });


      if (categorySum > 0) {

        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum/totalExpenses * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        });
      } 

    });

    setTotalByCategories(totalByCategory);

  }

  useEffect(() => {
    loadData();
  }, [selectedDate])

  return (
    <Container>
        <Header>
        <Title>Resumo por Categoria</Title>
        </Header>

        <Content 
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >

        <MonthSelect>

          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>

        </MonthSelect>

        <ChartContainer>
          <VictoryPie 
            data={totalByCategories} 
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                  fontSize: RFValue(18), 
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
            labelRadius={50}
            x="percent" // label
            y="total"  // value displayed on chart
          />
        </ChartContainer>

        

          {
            totalByCategories.map(item => (
              <HistoryCard 
                key={item.key}
                title={item.name} 
                amount={item.totalFormatted} 
                color={item.color}
              />
            ))
          }
        </Content>

      
    </Container>
  )
}
